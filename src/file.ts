import Properties from "./properties";
import {ByteVector} from "./byteVector";
import {IFileAbstraction, LocalFileAbstraction} from "./fileAbstraction";
import {Stream} from "./stream";
import {Tag, TagTypes} from "./tag";

/**
 * Specifies the options to use when reading the media. Can be treated as flags.
 */
export enum ReadStyle {
    /**
     * The media properties will not be read.
     */
    None = 0,

    // Fast = 1,

    /**
     * The media properties will be read with average accuracy.
     */
    Average = 2,

    /**
     * Use the {@see PictureLazy} class in the the property {@see Tag.Pictures}. This will avoid
     * loading picture content when reading the tag. Picture will be read lazily, when the picture
     * content is accessed.
     */
    PictureLazy = 4
}

/**
 * Specifies the type of file access operations currently permitted on an instance of {@see File}
 */
export enum FileAccessMode {
    /**
     * Read operations can be performed.
     */
    Read,

    /**
     * Read and write operations can be performed
     */
    Write,

    /**
     * The file is closed for both read and write operations
     */
    Closed
}

/**
 * Delegate is used for intervening in {@see File.createFromPath} by resolving the filetype before
 * any standard resolution operations.
 * @param abstraction File to be read.
 * @param mimeType MimeType of the file.
 * @param style How to read media properties from the file
 * @return New instance of {@see File} or `undefined` if the resolver could not be matched
 * @description A FileTypeResolver is one way of altering the behavior of
 *     {@see File.createFromPath} When {@see File.createFromPath} is called, the registered
 *     resolvers are invoked in reverse order in which they were registered. The resolver may then
 *     perform any operations necessary, including other type-finding methods. If the resolver
 *     returns a new {@see File} it will instantly be returned, by {@see File.createFromPath}. If
 *     it returns `undefined`, {@see File.createFromPath} will continue to process. If the resolver
 *     throws an exception, it will be uncaught. To register a resolver, use
 *     {@see File.addFileTypeResolver}.
 */
export type FileTypeResolver = (abstraction: IFileAbstraction, mimetype: string, style: ReadStyle) => File;

export abstract class File {
    // #region Member Variables

    private static readonly _bufferSize: number = 1024;
    private static readonly _fileTypeResolvers: FileTypeResolver[] = [];

    protected _fileAbstraction: IFileAbstraction;
    protected _invariantEndPosition: number = -1;
    protected _invariantStartPosition: number = -1;
    protected _tagTypesOnDisk: TagTypes = TagTypes.None;

    private _corruptionReasons: string[] = [];
    private _fileStream: Stream;
    private _mimeType: string;

    // #endregion

    protected constructor(file: IFileAbstraction | string) {
        if (!file) {
            throw new Error("Argument null: file not provided");
        }
        this._fileAbstraction = typeof(file) === "string"
            ? <IFileAbstraction> new LocalFileAbstraction(file)
            : <IFileAbstraction> file;
    }

    // #region Properties

    /**
     * Gets the buffer size to use when reading large blocks of data
     */
    public static get bufferSize(): number { return File._bufferSize; }

    /**
     * Reasons for which this file is marked as corrupt.
     */
    public get corruptionReasons(): string[] { return this._corruptionReasons; }

    /**
     * Gets the {@see IFileAbstraction} representing the file.
     */
    public get fileAbstraction(): IFileAbstraction { return this._fileAbstraction; }

    /**
     * Gets the position at which the invariant (media) portion of the current instance ends. If
     * the value could not be determined, `-1` is returned;
     */
    public get invariantEndPosition(): number { return this._invariantEndPosition; }

    /**
     * Gets the position at which the invariant (media) portion of the current instance begins. If
     * the value could not be determined, `-1` is returned.
     */
    public get invariantStartPosition(): number { return this._invariantStartPosition; }

    /**
     * Indicates whether or not this file may be corrupt. Files with unknown corruptions should not
     * be written.
     */
    public get isPossiblyCorrupt(): boolean { return this._corruptionReasons && this._corruptionReasons.length > 0; }

    /**
     * Indicates whether or not tags can be written back to the current file.
     */
    public get isWritable(): boolean { return !this.isPossiblyCorrupt; }

    /**
     * Gets the length of the file represented by the current instance. Value will be 0 if the file
     * is not open for reading;
     */
    public get length(): number { return this.mode === FileAccessMode.Closed ? 0 : this._fileStream.length; }

    /**
     * Gets the MimeType of the file as determined by {@see File.create} if that method was used to
     * create the current instance.
     */
    public get mimeType(): string { return this._mimeType; }

    /**
     * Gets the file access mode in use by the current instance.
     */
    public get mode(): FileAccessMode {
        if (!this._fileStream) {
            return FileAccessMode.Closed;
        }
        if (!this._fileStream.canWrite) {
            return FileAccessMode.Write;
        }
        return FileAccessMode.Read;
    }

    /**
     * Sets the file access mode in use by the current instance. Changing the value will cause the
     * stream currently in use to be closed, except when a change is made from
     * {@see FileAccessMode.Write} to {@see FileAccessMode.Read} which has no effect.
     * @param val File access mode to change to
     */
    public set mode(val: FileAccessMode) {
        // Skip processing if the mode we're changing to is the same as what we're already on, or
        // if we're in write mode changing to read mode (requesting less access)
        if (this.mode === val || (this.mode === FileAccessMode.Write && val === FileAccessMode.Read)) {
            return;
        }

        // Close any existing stream
        if (this._fileStream) {
            this._fileAbstraction.closeStream(this._fileStream);
        }

        this._fileStream = null;

        // Open a new stream that corresponds to the access mode requested
        if (val === FileAccessMode.Read) {
            this._fileStream = this._fileAbstraction.readStream;
        } else if (val === FileAccessMode.Write) {
            this._fileStream = this._fileAbstraction.writeStream;
        }

        // @TODO: Verify if we need this recursive call. I don't know what it intends to do for us
        this.mode = val;
    }

    /**
     * Gets the name of the file as stored in its file abstraction.
     */
    public get name(): string { return this._fileAbstraction.name; }

    /**
     * Gets the seek position in the internal stream used by the current instance. Value will be 0
     * if the file is not open for reading
     */
    public get position(): number { return this.mode === FileAccessMode.Closed ? 0 : this._fileStream.position; }

    /**
     * Gets the media properties of the file represented by the current instance.
     */
    public abstract get properties(): Properties;

    /**
     * Gets an abstract representaion of all tags stored in the current instance.
     * @description This property provides generic and general access to the most common tagging
     *     features of a file. To access or add a specific type of tag in the file, use
     *     {@see File.getTag}.
     */
    public abstract get tag(): Tag;

    /**
     * Gets the tag typescontained in the current instance.
     */
    public get tagTypes(): TagTypes { return !this.tag ? TagTypes.None : this.tag.tagTypes; }

    /**
     * Gets the tag types contained in the physical file represented by the current instance.
     */
    public get tagTypesOnDisk(): TagTypes { return this._tagTypesOnDisk; }

    // #endregion

    // #region Public Methods

    /**
     * Dispose the current instance. Equivalent to setting the mode to closed.
     */
    public dispose() {
        this.mode = FileAccessMode.Closed;
    }

    /**
     * Gets a tag of the specified type from the current instance, optionally creating a new tag if
     * possible.
     * @param types Type of tag to read.
     * @param create Whether or not to try and create the tag if one is not found. `true` does not
     *     guarantee the tag will be created. For example, trying to create an ID3v2 tag on an OGG
     *     Vorbis file will always fail.
     * @returns Tag object containing the tag that was found in or added to the current instance.
     *     If no matching tag was found and none was created, `undefined` is returned. It is safe
     *     to assume that if `undefined` is not returned, the returned tag can be cast to the
     *     appropriate type.
     * @example ```
     *     id3 = file.getTag(TagTypes.ID3v2, true);
     *     if (id3) { (<ID3v2.Tag> id3).setTextFrame("TMOO", moods); }
     *
     *     asf = file.getTag(TagTypes.Asf, true);
     *     if (asf) { (<Asf.Tag> adf).setDescriptorStrings(moods, "WM/Mood", "Mood"); }
     *
     *     ape = file.getTag(TagTypes.Ape);
     *     if (ape) { (<Ape.Tag>).setValue("MOOD", moods); }
     * ```
     */
    public abstract getTag(types: TagTypes, create: boolean = false): Tag

    /**
     * Mark the current instance as corrupt. NOTE: Not intended to be used outside of this library.
     * @param reason Reason why this file is considered to be corrupt
     */
    public markAsCorrupt(reason: string): void {
        this._corruptionReasons.push(reason);
    }

    /**
     * Reads a specified number of bytes at the current seek position from the current position.
     * This method reads the block of data at the current seek position. To change the seek
     * position, use {@see File.seek}.
     * @param length Number of bytes to read.
     * @returns ByteVector Object containing the data read from the current instance.
     * @throws Error Thrown when {@param length} is not a positive, safe integer.
     */
    public readBlock(length: number): ByteVector {
        if (!Number.isSafeInteger(length) || length < 0) {
            throw new Error("Argument out of range: length must be a positive, safe integer");
        }
        if (length === 0) {
            return ByteVector.fromSize(0);
        }

        this.mode = FileAccessMode.Read;

        const buffer = new Uint8Array(length);
        let count = 0;
        let read = 0;
        let needed = length;
        do {
            count = this._fileStream.read(buffer, read,  needed);
            read += count;
            needed -= count;
        } while (needed > 0 && count !== 0);

        return ByteVector.fromByteArray(buffer);
    }

    /**
     * Removes a set of tag types from the current instance. In order to remove all tags from a
     * file, pass {@see TagTypes.AllTags} as {@param types}
     * @param types Bitwise combined {@see TagTypes} value containing the tag types to be removed
     *     from the file
     */
    public abstract removeTags(types: TagTypes): void;

    /**
     * Saves the changes made in the current instance to the file it represents.
     */
    public abstract save(): void;

    /**
     * Writes a block of data to the file represented by the current instance at the current seek
     * posiotion. This will overwrite any existing data at the seek position and append new data to
     * the file if writing past the current end.
     * @param data ByteVector containing data to the current instance.
     * @throws Error Thrown when {@param data} is not provided.
     */
    public writeBlock(data: ByteVector): void {
        if (!data) {
            throw new Error("Argument null: data was not provided");
        }

        this.mode = FileAccessMode.Write;

        this._fileStream.write(data.data, 0, data.Count);
    }

    // #endregion
}
