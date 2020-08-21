import Genres from "../genres";
import {ByteVector, StringType} from "../byteVector";
import {CorruptFileError} from "../errors";
import {File, FileAccessMode} from "../file";
import {Tag, TagTypes} from "../tag";
import {Guards} from "../utils";

/**
 * Extends {@see Tag} to provide support for reading and writing tags stored in the ID3v1.1 format.
 */
export default class Id3v1Tag extends Tag {
    // #region Member Fields

    /**
     * Identifier used to recognize an ID3v1 tag.
     */
    public static readonly fileIdentifier = ByteVector.fromString("TAG", StringType.UTF8);

    /**
     * Size of an ID3v1 tag.
     */
    public static readonly size = 128;

    private _album: string;
    private _artist: string;
    private _comment: string;
    private _genre: number;
    private _title: string;
    private _track: number;
    private _year: string;

    // #endregion

    // #region Constructors

    private constructor(data: ByteVector | undefined) {
        super();

        if (data === undefined) {
            return;
        }

        // Some initial sanity checking
        Guards.truthy(data, "data");
        if (!data.startsWith(Id3v1Tag.fileIdentifier)) {
            throw new CorruptFileError("Id3v1 data does not start with identifier");
        }

        this.parse(data);
    }

    /**
     * Constructs and initializes a new instance of {@see Id3v1Tag} with no contents.
     */
    public static empty(): Id3v1Tag {
        const output = new Id3v1Tag(undefined);
        output.clear();
        return output;
    }

    public static fromData(data: ByteVector): Id3v1Tag {
        return new Id3v1Tag(data);
    }

    public static fromFile(file: File, position: number): Id3v1Tag {
        Guards.truthy(file, "file");
        Guards.uint(position, "position");

        file.mode = FileAccessMode.Read;

        if (position > file.length - Id3v1Tag.size) {
            throw new Error("Argument out of range: position must be less than the length of the file");
        }

        file.seek(position);

        // Read the tag, it's always 128 bytes
        const data = file.readBlock(Id3v1Tag.size);

        return new Id3v1Tag(data);
    }

    // #endregion

    /**
     * Renders the current instance as a raw ID3v1 tag.
     */
    public render(): ByteVector {
        const data = ByteVector.empty();
        data.addByteVector(Id3v1Tag.fileIdentifier);
        data.addByteVector(ByteVector.fromString(this._title, StringType.Latin1).resize(30));
        data.addByteVector(ByteVector.fromString(this._artist, StringType.Latin1).resize(30));
        data.addByteVector(ByteVector.fromString(this._album, StringType.Latin1).resize(30));
        data.addByteVector(ByteVector.fromString(this._year, StringType.Latin1).resize(4));
        data.addByteVector(ByteVector.fromString(this._comment, StringType.Latin1).resize(28));
        data.addByte(0x00);
        data.addByte(this._track);
        data.addByte(this._genre);
        return data;
    }

    // #region Tag Overrides

    public get tagTypes(): TagTypes { return TagTypes.Id3v1; }

    /** @inheritDoc */
    public get title(): string { return this._title || undefined; }
    /**
     * @inheritDoc
     * @description When stored on disk, only the first 30 bytes of the latin-1 encoded value will
     *     be stored. This may result in lost data.
     */
    public set title(value: string) { this._title = value ? value.trim() : ""; }

    /** @inheritDoc */
    public get performers(): string[] { return this._artist ? this._artist.split(";") : []; }
    /**
     * @inheritDoc
     * @description When stored on disk, only the first 30 bytes of the latin-1 encoded value will
     *     be stored, minus a byte for each additional performer (ie, two performers will only have
     *     29 bytes and three performers will only have 28 bytes). This may result in data loss.
     */
    public set performers(value: string[]) { this._artist = value ? value.join(";") : ""; }

    /** @inheritDoc */
    public get album(): string { return this._album || undefined; }
    /**
     * @inheritDoc
     * @description When stored on disk, only the first 30 bytes of the latin-1 encoded value will
     *     be stored. This may result in data loss.
     */
    public set album(value: string) { this._album = value ? value.trim() : ""; }

    /** @inheritDoc */
    public get comment(): string { return this._comment || undefined; }
    /**
     * @inheritDoc
     * @description When stored on disk, only the first 28 bytes of the latin-1 encoded value will
     *     be stored. This may result in lost data.
     */
    public set comment(value: string) { this._comment = value ? value.trim() : ""; }

    /** @inheritDoc */
    public get genres(): string[] {
        const genreName = Genres.indexToAudio(this._genre, false);
        return genreName ? [genreName] : [];
    }
    /**
     * @inheritDoc
     * @description Only first genre will be stored and only if it is an exact match for a value in
     *     the list of audio genres. All other values will result in the property being cleared.
     */
    public set genres(value: string[]) {
        this._genre = !value || value.length === 0
            ? 255
            : Genres.audioToIndex(value[0].trim());
    }

    /** @inheritDoc */
    public get year(): number {
        const value = parseInt(this._year, 10);
        return Number.isNaN(value) ? 0 : value;
    }
    /**
     * @inheritDoc
     * @description Only values betweenInclusive 1 and 9999 will be stored. All other values will result in
     *     the property being zeroed.
     */
    public set year(value: number) {
        this._year = Number.isSafeInteger(value) && value > 0 && value < 10000 ? value.toString(10) : "";
    }

    /** @inheritDoc */
    public get track(): number { return this._track; }
    /**
     * @inheritDoc
     * @description Only values betweenInclusive 1 and 255 will be stored. All other values will result in
     *     the property being zeroed.
     */
    public set track(value: number) {
        this._track = Number.isSafeInteger(value) && value > 0 && value < 256 ? value : 0;
    }

    /** @inheritDoc */
    public clear(): void {
        this._title = undefined;
        this._album = undefined;
        this._artist = undefined;
        this._year = undefined;
        this._comment = undefined;
        this._track = 0;
        this._genre = 255;
    }

    // #endregion

    // #region Private Helpers

    private parse(data: ByteVector): void {
        this._title = Id3v1Tag.parseString(data.mid(3, 30));
        this._artist = Id3v1Tag.parseString(data.mid(33, 30));
        this._album = Id3v1Tag.parseString(data.mid(63, 30));
        this._year = Id3v1Tag.parseString(data.mid(93, 4));

        // Check for ID3v1.1
        // NOTE: ID3v1 does not support "track zero", this is not a bug in TagLib. Since a zeroed
        //     byte is what we would expect at the end of a C-string, specifically the comment
        //     string, a value of zero must be assumed to be just that.
        if (data.get(125) === 0 && data.get(126) !== 0) {
            // ID3v1.1 detected
            this._comment = Id3v1Tag.parseString(data.mid(97, 28));
            this._track = data.get(126);
        } else {
            this._comment = Id3v1Tag.parseString(data.mid(97, 30));
        }

        this._genre = data.get(127);
    }

    private static parseString(data: ByteVector): string {
        Guards.truthy(data, "data");

        const output = data.toString(undefined, StringType.Latin1).trim();
        const i = output.indexOf("\0");
        return i >= 0
            ? output.substring(0, i)
            : output;
    }

    // #endregion
}
