import * as path from "path";

import Properties from "./properties";
import {ByteVector} from "./byteVector";
import {IFileAbstraction, LocalFileAbstraction} from "./fileAbstraction";
import {SeekOrigin, Stream} from "./stream";
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
     * Use the {@see PictureLazy} class in the the property {@see Tag.pictures}. This will avoid
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

export type FileTypeConstructor = new (abstraction: IFileAbstraction, style: ReadStyle) => File;

/**
 * This abstract class provides a basic framework for reading and writing to a file, as well as
 * accessing basic tagging and media properties.
 * @description This class is agnostic to all specific media types. Its child classes, on the other
 *     hand, support the intricacies of different media and tagging formats. For example
 *     {@see Mpeg4File} supports the MPEG-4 specification and Apple's tagging format. Each file
 *     type can be created using its format specific constructors, but the preferred method is to
 *     use {@see File.createFromPath} or {@see File.createFromAbstraction} as it automatically
 *     detects the appropriate class from the file extension or provided MimeType.
 */
export abstract class File {
    // #region Member Variables

    private static readonly _bufferSize: number = 1024;
    private static readonly _fileTypes: {[mimeType: string]: FileTypeConstructor} = {};
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

    /**
     * Creates a new instance of a {@see File} subclass for a specified file abstraction, MimeType,
     * and property read style.
     * @param abstraction Object to use when reading/writing from the current instance.
     * @param mimeType Optional, MimeType to use for determining the subclass of {@see File} to
     *     return. If omitted, the MimeType will be guessed based on the file's extension.
     * @param propertiesStyle Optional, level of detail to use when reading the media information
     *     from the new instance. If omitted, {@see ReadStyle.Average} is used.
     * @returns New instance of {@see File} as read from the specified abstraction.
     */
    public static createFromAbstraction(
        abstraction: IFileAbstraction,
        mimeType?: string,
        propertiesStyle: ReadStyle = ReadStyle.Average
    ): File {
        return File.createInternal(abstraction, mimeType, propertiesStyle);
    }

    /**
     * Creates a new instance of {@see File} subclass for a specified file path, MimeType, and
     * property read style.
     * @param filePath Path to the file to read/write.
     * @param mimeType Optional, MimeType to use for determining the subclass of {@see File} to
     *     return. If omitted, the MimeType will be guessed based on the file's extension.
     * @param propertiesStyle Optional, level of detail to use when reading the media information
     *     from the new instance. If omitted {@see ReadStyle.Average} is used.
     * @returns New instance of {@see File} as read from the specified path.
     */
    public static createFromPath(
        filePath: string,
        mimeType?: string,
        propertiesStyle: ReadStyle = ReadStyle.Average
    ): File {
        return File.createInternal(new LocalFileAbstraction(filePath), mimeType, propertiesStyle);
    }

    private static createInternal(abstraction: IFileAbstraction, mimeType: string, propertiesStyle: ReadStyle): File {
        // Step 1) Calculate the MimeType based on the extension of the file if it was not provided
        if (!mimeType) {
            const ext = path.extname(abstraction.name);
            mimeType = `taglib/${ext.toLowerCase()}`;
        }

        // Step 2) Use file type resolvers if we have any
        for (const resolver of File._fileTypeResolvers) {
            const file = resolver(abstraction, mimeType, propertiesStyle);
            if (file) {
                return file;
            }
        }

        // Step 3) Use the lookup table of MimeTypes => types and attempt to instantiate it
        const fileType = File._fileTypes[mimeType];
        if (!fileType) {
            throw new Error(`Unsupported format: mimetype for ${abstraction} (${mimeType}) is not supported`);
        }
        return new fileType(abstraction, propertiesStyle);
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
     * Registers the constructor for a subclass of {@see File} with the MimeType it is associated
     * with. Optionally, the MimeType can be forcefully overridden if it was already registered.
     * @param mimeType MimeType to register this subclass constructor to.
     * @param constructor Constructor for a subclass of {@see File} that will be called if a file
     *     with a MimeType of {@param mimeType} is created.
     * @param override If `true` and a subclass of {@see File} was already registered to
     *     {@param mimeType}, it will be forcefully overridden. If `false`, an {@see Error} will be
     *     thrown if a subclass already registered to the MimeType.}
     */
    public static AddFileType(mimeType: string, constructor: FileTypeConstructor, override: boolean = false): void {
        if (!mimeType) {
            throw new Error("Argument null: mimeType was not provided");
        }
        if (!constructor) {
            throw new Error("Argument null: constructor was not provided");
        }
        if (!override && File._fileTypes[mimeType]) {
            throw new Error(`Invalid operation: MimeType ${mimeType} already has a file type associated with it`);
        }
        File._fileTypes[mimeType] = constructor;
    }

    /**
     * Registers a {@see FileTypeResolver} to the front of the list of file type resolvers.
     * @param resolver Function to handle resolving a subclass of {@see File} from an
     *     {@see IFileAbstraction}
     */
    public static AddFileTypeResolver(resolver: FileTypeResolver): void {
        if (!resolver) {
            throw new Error("Argument null: resolver was not provided");
        }
        File._fileTypeResolvers.unshift(resolver);
    }

    /**
     * Dispose the current instance. Equivalent to setting the mode to closed.
     */
    public dispose() {
        this.mode = FileAccessMode.Closed;
    }

    /**
     * Searches forward through a file for a specified pattern, starting at a specified offset.
     * @param pattern Pattern to search for in the current instance.
     * @param startPosition Seek position to start searching. Must be positive, safe integer.
     * @param before Optional pattern that the searched for pattern must appear before. If this
     *     pattern is found first, `-1` is returned.
     * @throws Error Thrown if {@param pattern} is not provided or {@param startPosition} is not a
     *     positive, safe integer.
     * @returns Index at which the value was found. If not found, `-1` is returned.
     */
    public find(pattern: ByteVector, startPosition: number = 0, before?: ByteVector): number {
        if (!pattern) {
            throw new Error("Argument null: pattern was not provided");
        }
        if (!Number.isSafeInteger(startPosition) || startPosition < 0) {
            throw new Error("Argument out of range: startPosition is not a positive, safe integer");
        }

        this.mode = FileAccessMode.Read;

        if (pattern.length > File._bufferSize) {
            return -1;
        }

        // The position in the file that the current buffer starts at
        const originalPosition = this._fileStream.position;
        let bufferOffset = startPosition;

        try {
            // Start the search at the offset.
            this._fileStream.position = startPosition;
            let buffer = this.readBlock(File._bufferSize);
            for (buffer; buffer.length > 0; buffer = this.readBlock(File._bufferSize)) {
                const location = buffer.find(pattern);
                if (!before) {
                    const beforeLocation = buffer.find(before);
                    if (beforeLocation < location) {
                        return -1;
                    }
                }

                if (location >= 0) {
                    return bufferOffset + location;
                }

                // Ensure that we always rewind the stream a little so we never have a partial
                // match where our data exists between the end of read A and the start of read B.
                bufferOffset += File._bufferSize - pattern.length;
                if (before != null && before.length > pattern.length) {
                    bufferOffset -= before.length - pattern.length;
                }
                this._fileStream.position = bufferOffset;
            }

            return -1;
        } finally {
            this._fileStream.position = originalPosition;
        }
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
    // @TODO Implementation should define a default for create
    public abstract getTag(types: TagTypes, create: boolean): Tag;

    /**
     * Inserts a specified block of data into the file represented by the current instance, at a
     * specified location, replacing a specified number of bytes.
     * @param data Data to insert into the file.
     * @param start Index into the file at which to insert the data. Must be safe positive integer.
     * @param replace Number of bytes to replace. Typically this is the original size of the data
     *     block so that a new block will replace the old one.
     * @throws Error Thrown when: 1) data is falsey, 2) start is not a safe, positive number, or 3)
     *     replace is not a safe, positive number
     */
    public insert(data: ByteVector, start: number, replace: number = 0): void {
        if (!data) {
            throw new Error("Argument null: data was not provided");
        }
        if (!Number.isSafeInteger(start) || start < 0) {
            throw new Error("Argument out of range: start must be a safe, positive integer");
        }
        if (!Number.isSafeInteger(replace) || replace < 0) {
            throw new Error("Argument out of range: replace must be a safe, positive integer");
        }

        this.insertInternal(data, data.length, start, replace);
    }

    /**
     * Inserts a specified block-size into the file represented by the current instance, at a
     * specified location. Former data at this location is not overwritten and may then contain
     * random content. This method is useful to reserve some space in the file.
     * @param size Number of bytes of the block to be inserted. Must be safe, positive integer.
     * @param start Index into the file at which to insert the data. Must be safe positive integer.
     */
    public insertBlank(size: number, start: number): void {
        if (!Number.isSafeInteger(start) || start < 0) {
            throw new Error("Argument out of range: start must be a safe, positive integer");
        }
        if (!Number.isSafeInteger(size) || size < 0) {
            throw new Error("Argument out of range: size must be a safe, positive integer");
        }

        this.insertInternal(undefined, size, start, 0);
    }

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
     * Removes a specified block of data from the file represented by the current instance.
     * @param start Index into the file at which to remove data. Must be safe, positive integer.
     * @param length Number of bytes to remove. Must be a safe integer.
     * @throws Error thrown if 1) start is not a safe, positive integer or 2) length must be a safe
     *     integer.
     */
    public removeBlock(start: number, length: number): void {
        if (!Number.isSafeInteger(start) || start < 0) {
            throw new Error("Argument out of range: start must be a safe, positive integer.");
        }
        if (!Number.isSafeInteger(length)) {
            throw new Error("Argument out of range: length must be a safe integer.");
        }

        if (length <= 0) {
            return;
        }

        this.mode = FileAccessMode.Write;

        const bufferLength = File._bufferSize;
        let readPosition = start + length;
        let writePosition = start;
        let buffer = ByteVector.fromSize(1);
        while(buffer.length !== 0) {
            this._fileStream.position = readPosition;
            buffer = this.readBlock(bufferLength);
            readPosition += buffer.length;

            this._fileStream.position = writePosition;
            this.writeBlock(buffer);
            writePosition += buffer.length;
        }

        this.truncate(writePosition);
    }

    /**
     * Removes a set of tag types from the current instance. In order to remove all tags from a
     * file, pass {@see TagTypes.AllTags} as {@param types}
     * @param types Bitwise combined {@see TagTypes} value containing the tag types to be removed
     *     from the file
     */
    public abstract removeTags(types: TagTypes): void;

    /**
     * Searched backwards through a file for a specified patterh, starting at a specified offset
     * @param pattern Pattern to search for in the current instance.
     * @param startPosition Seek position from which to start searching.
     * @param after Pattern that the searched for pattern must appear after. If this pattern is
     *     found first, `-1` is returned.
     * @throws Error Thrown if {@param pattern} was not provided or if {@param startPosition} is
     *     not a safe, positive integer.
     * @returns Index at which the value wa found. If not found, `-1` is returned.
     */
    public rFind(pattern: ByteVector, startPosition: number = 0, after?: ByteVector): number {
        if (!pattern) {
            throw new Error("Argument null: pattern was not provided");
        }
        if (!Number.isSafeInteger(startPosition) || startPosition < 0) {
            throw new Error("Argument out of range: startPosition must be a safe, positive integer");
        }

        this.mode = FileAccessMode.Read;

        if (pattern.length > File._bufferSize) {
            return -1;
        }

        // The position in the file that the current buffer starts at
        const originalPosition = this._fileStream.position;

        // Start the search at the offset
        let bufferOffset = this.length - startPosition;

        let readSize = Math.min(bufferOffset, File._bufferSize);
        bufferOffset -= readSize;
        this._fileStream.position = bufferOffset;

        try {
            // See the notes in find() for an explanation of this algorithm
            let buffer = this.readBlock(readSize);
            for (buffer; buffer.length > 0; buffer = this.readBlock(readSize)) {
                const location = buffer.rFind(pattern);
                if (location >= 0) {
                    return bufferOffset + location;
                }

                if (after && buffer.rFind(after) >= 0) {
                    return -1;
                }

                readSize = Math.min(bufferOffset, File._bufferSize);
                bufferOffset -= readSize;
                if (readSize + pattern.length > file._bufferSize) {
                    bufferOffset += pattern.length;
                }

                this._fileStream.position = bufferOffset;
            }

            return -1;
        } finally {
            this._fileStream.position = originalPosition;
        }
    }

    /**
     * Saves the changes made in the current instance to the file it represents.
     */
    public abstract save(): void;

    /**
     * Moves the read/write pointer to a specified offset in the current instance, relative to a
     * specified origin.
     * @param offset Byte offset to seek to. Must be a safe, positive integer.
     * @param origin Origin from which to seek
     */
    public seek(offset: number, origin: SeekOrigin = SeekOrigin.Begin): void {
        if (this.mode === FileAccessMode.Closed) {
            return;
        }
        this._fileStream.seek(offset, origin);
    }

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

        this._fileStream.write(data.data, 0, data.length);
    }

    // #endregion

    // #region Protected / Private Helpers

    /**
     * Prepares to save the file. This must be called at the beginning of every File.save() method.
     */
    protected preSave(): void {
        if (!this.isWritable) {
            throw new Error("Invalid operation: file is not writable");
        }
        if (this.isPossiblyCorrupt) {
            throw new Error("Corrupt file: corrupted file cannot be saved");
        }

        // All the lazy objects must be loaded before opening the file
        // @TODO: Load lazy objects
    }

    /**
     * Resizes the current instance to a specific number of bytes.
     * @param length Number of bytes to resize the file to, must be a safe, positive integer.
     */
    protected truncate(length: number): void {
        const oldMode = this.mode;
        this.mode = FileAccessMode.Write;
        this._fileStream.setLength(length);
        this.mode = oldMode;
    }

    /**
     * Inserts a specified block into the file represented by the current instance at a specified
     * location.
     * @param data Data to insert into the file. If falsy, no data is written to the file and the
     *     block is just inserted without overwriting the former data at the given location.
     * @param size Size of the block to insert in bytes
     * @param start Index into the file at which to insert the data.
     * @param replace Number of bytes to replace. Typically this is the original size of the data
     *     block so that a new block will replace the old one.
     */
    private insertInternal(data: ByteVector, size: number, start: number, replace: number): void {
        this.mode = FileAccessMode.Write;

        if (size === replace) {
            if (data) {
                this._fileStream.position = start;
                this.writeBlock(data);
            }
            return;
        }
        if (size < replace) {
            if (data) {
                this._fileStream.position = start;
                this.writeBlock(data);
            }
            this.removeBlock(start + size, replace - size);
            return;
        }

        // NOTE: I'm not 100% sure that this behaves the same in node land, but I'll preserve the
        // notes and implementation from the original .NET implementation (which looks to be based
        // on the original *original* TagLib implementation). If we need to revisit, we can do that
        // later.

        // Woohoo!  Faster (about 20%) than id3lib at last. I had to get hardcore and avoid
        // TagLib's high level API for rendering just copying parts of the file that don't contain
        // tag data.
        //
        // Now I'll explain the steps in this ugliness:
        //
        // First, make sure that we're working with a buffer that is longer or equal than the
        // *difference* in the tag sizes, and that is a multiple of buffer_size. We want to avoid
        // overwriting parts that aren't yet in memory, so this is necessary.

        let bufferLength = size - replace;
        const mod = bufferLength % File._bufferSize;
        if (mod !== 0) {
            bufferLength += File._bufferSize - mod;
        }

        // Set where to start the reading and writing
        let readPosition = start + replace;
        let writePosition = start;

        // This is basically a special case of the loop below. Here we're just doing the same steps
        // as below, but since we aren't using the same buffer size -- instead we're using the tag
        // size -- this has to be handled as a special case. We're also using File.writeBlock()
        // just for the tag. That's a bit slower than using char*'s so, we're only doing it here.
        this._fileStream.position = readPosition;
        const aboutToOverwrite: Uint8Array = this.readBlock(bufferLength).data;
        readPosition += bufferLength;

        if (data) {
            this._fileStream.position = writePosition;
            this.writeBlock(data);
        } else if (start + size > this.length) {
            this._fileStream.setLength(start + size);
        }
        writePosition += size;

        const buffer: Uint8Array = new Uint8Array(aboutToOverwrite);

        // Ok here's the main loop. We want to loop until the read fails, which means we hit the
        // end of the file.
        while (bufferLength !== 0) {
            // Seek to the current read position and read the data that we're about to overwrite.
            // Appropriately increment the readPosition.
            this._fileStream.position = readPosition;
            const bytesToRead = Math.min(bufferLength, aboutToOverwrite.length);
            const bytesRead = this._fileStream.read(aboutToOverwrite, 0, bytesToRead);
            readPosition += bufferLength;

            // Seek to the write position and write our buffer. Increment the write position.
            this._fileStream.position = writePosition;
            const bytesToWrite = Math.min(bufferLength, buffer.length);
            this._fileStream.write(buffer, 0, bytesToWrite);
            writePosition += bufferLength;

            // Make the current buffer the data that we read in the beginning
            // NOTE: This is basically Array.copy, but javascript doesn't have that??
            for (let i = 0; i < bytesRead; i++) {
                buffer[i] = aboutToOverwrite[i];
            }

            // Again, we need this for the last write. We don't want to write garbage to the end of
            // the file, so we need to set the buffer size to the amound that we actually read.
            bufferLength = bytesRead;
        }
    }

    // #endregion
}