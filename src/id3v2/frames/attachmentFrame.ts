import FrameType from "../frameTypes";
import Id3v2Tag from "../id3v2Tag";
import ILazy from "../../iLazy";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {IFileAbstraction} from "../../fileAbstraction";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {IPicture, Picture, PictureType} from "../../picture";
import {SeekOrigin, Stream} from "../../stream";
import {Guards} from "../../utils";

export default class AttachmentFrame extends Frame implements ILazy, IPicture {
    // #region Member Variables

    private _data: ByteVector;
    private _description: string;
    private _encoding: StringType = Id3v2Tag.defaultEncoding;
    private _file: IFileAbstraction;
    private _filename: string;
    private _mimeType: string;
    private _rawData: ByteVector;
    private _rawVersion: number;
    private _streamOffset: number;
    private _streamSize: number = -1;
    private _type: PictureType;

    // #endregion

    // #region Constructors

    private constructor(frameHeader: Id3v2FrameHeader) {
        super(frameHeader);
    }

    /**
     * Constructs and initializes a new attachment frame by reading its raw data in a specified
     * Id3v2 version.
     * @param data ByteVector starting with the raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with.
     */
    public static fromData(data: ByteVector, version: number): AttachmentFrame {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        const frame = new AttachmentFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, version, true);
        return frame;
    }

    /**
     * Constructs and initializes a new attachment frame by reading its raw data in a specified
     * ID3v2 version.
     * @param data ByteVector containing the raw representation of the new frame
     * @param offset Index into {@paramref data} where the frame actually begins
     * @param header Header of the frame found at {@paramref offset} in the data
     * @param version ID3v2 version the raw frame is encoded in
     */
    // @TODO Standardize on fromOffsetRawData
    public static fromDataWithHeader(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader,
        version: number
    ): AttachmentFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");
        Guards.byte(version, "version");

        const frame = new AttachmentFrame(header);
        frame.setData(data, offset, version, false);
        return frame;
    }

    /**
     * Constructs a new attachment frame from a file. The content will be lazily loaded.
     * @param abstraction Abstraction of the file to read.
     * @param offset Position into the file where the picture is located
     * @param size Size in bytes of the picture. Use -1 to read all bytes of the file
     * @param header Header of the frame found at {@paramref offset} in the data
     * @param version ID3v2 version the raw frame is encoded with
     */
    public static fromStatic(
        abstraction: IFileAbstraction,
        offset: number,
        size: number,
        header: Id3v2FrameHeader,
        version: number
    ): AttachmentFrame {
        Guards.truthy(abstraction, "abstraction");
        Guards.uint(offset, "offset");
        Guards.uint(size, "size");
        Guards.truthy(header, "header");
        Guards.byte(version, "version");

        const frame = new AttachmentFrame(header);
        frame._file = abstraction;
        frame._streamOffset = offset;
        frame._streamSize = size;
        frame._rawVersion = version;
        return frame;
    }

    /**
     * Constructs and initializes a new attachment frame by populating it with the contents of
     * another {@see IPicture} object.
     * @param picture Value to use in the new instance.
     * @description When a frame is created, it is not automatically added to the tag. Consider
     *     using {@see get} for more integrated frame creation.
     *     Additionally, see {@see Tag.pictures} provides a generic way of getting and setting
     *     attachments which is preferable to format specific code.
     */
    public static fromPicture(picture: IPicture): AttachmentFrame {
        Guards.truthy(picture, "picture");

        const frame = new AttachmentFrame(new Id3v2FrameHeader(FrameType.APIC, 4));
        frame.type = picture.type;
        frame._mimeType = picture.mimeType;
        frame._filename = picture.filename;
        frame._description = picture.description;
        frame._data = picture.data;
        return frame;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the image data stored in the current instance.
     */
    public get data(): ByteVector {
        this.loadIfPossible();
        this.parseRawData();
        return this._data ? this._data : ByteVector.empty();
    }
    /**
     * Sets the image data stored in the current instance.
     */
    public set data(value: ByteVector) {
        this.loadIfPossible();
        this._data = value;
    }

    /**
     * Gets the description stored in the current instance.
     */
    public get description(): string {
        this.loadIfPossible();
        this.parseRawData();
        return this._description ? this._description : "";
    }
    /**
     * Sets the description stored in the current instance.
     * There should only be one frame with a matching description and type per tag.
     */
    public set description(value: string) {
        this.loadIfPossible();
        this._description = value;
    }

    /**
     * Gets a filename of the picture stored in the current instance.
     */
    public get filename(): string {
        this.loadIfPossible();
        return this._filename;
    }
    /**
     * Sets a filename of the picture stored in the current instance.
     */
    public set filename(value: string) {
        this.loadIfPossible();
        this._filename = value;
    }

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.AttachmentFrame; }

    /** @inheritDoc */
    public get isLoaded(): boolean {
        return !!(this._data || this._rawData);
    }

    /**
     * Gets the MimeType of the picture stored in the current instance.
     */
    public get mimeType(): string {
        this.loadIfPossible();
        this.parseRawData();

        return this._mimeType ? this._mimeType : "";
    }
    /**
     * Sets the MimeType of the picture stored in the current instance.
     * @param value MimeType of the picture stored in the current instance.
     */
    public set mimeType(value: string) {
        this.loadIfPossible();
        this._mimeType = value;
    }

    /**
     * Gets the text encoding to use when storing the current instance.
     * @value Text encoding to use when storing the current instance.
     */
    public get textEncoding(): StringType {
        this.loadIfPossible();
        this.parseRawData();
        return this._encoding;
    }
    /**
     * Sets the text encoding to use when storing the current instance.
     * @param value Text encoding to use when storing the current instance.
     *     This encoding is overridden when rendering if {@see Id3v2Tag.ForceDefaultEncoding} is
     *     `true` or the render version does not support it.
     */
    public set textEncoding(value: StringType) {
        this.loadIfPossible();
        this._encoding = value;
    }

    /**
     * Gets the object type stored in the current instance.
     */
    public get type(): PictureType {
        this.loadIfPossible();
        this.parseRawData();
        return this._type;
    }
    /**
     * Sets the object type stored in the current instance.
     * For General Object Frame, use {@see PictureType.NotAPicture}. Other types will make it a
     * Picture Frame.
     */
    public set type(value: PictureType) {
        this.loadIfPossible();

        // Change the frame type depending if this is a picture or a general object
        const frameId = value === PictureType.NotAPicture
            ? FrameType.GEOB
            : FrameType.APIC;
        if (this._header.frameId !== frameId) {
            this._header = new Id3v2FrameHeader(frameId, 4);
        }

        this._type = value;
    }

    // #endregion

    // #region Public Methods

    /** @inheritDoc */
    public clone(): Frame {
        if (this._file) {
            this.load();
        }

        const frame = new AttachmentFrame(new Id3v2FrameHeader(FrameType.APIC, 4));
        frame._encoding = this._encoding;
        frame._mimeType = this._mimeType;
        frame.type = this._type;
        frame._filename = this._filename;
        frame._rawVersion = this._rawVersion;

        if (this._data) {
            frame._data = ByteVector.fromByteVector(this._data);
        }
        if (this._rawData) {
            frame._data = ByteVector.fromByteVector(this._rawData);
        }

        return frame;
    }

    /**
     * Get a specified attachment frame from the specified tag, optionally creating it if it does
     * not exist.
     * @param tag Object in which to search
     * @param create Whether or not to create and add a new frame to the tag if a match is not found
     * @param description Description to match
     * @param type Picture type to match
     * @returns Matching frame or `undefined` if a match wasn't found and {@paramref create} is
     *     `false`
     */
    public static get(
        tag: Id3v2Tag,
        create: boolean,
        description?: string,
        type: PictureType = PictureType.Other
    ): AttachmentFrame {
        let attachmentFrame = tag.getFramesByClassType<AttachmentFrame>(FrameClassType.AttachmentFrame)
            .find((f) => {
                if (f.description && f.description !== description) { return false; }
                if (type !== PictureType.Other && f.type !== type) { return false; }
                return true;
            });
        if (attachmentFrame) { return attachmentFrame; }
        if (!create) { return undefined; }

        // Create a new frame
        attachmentFrame = new AttachmentFrame(new Id3v2FrameHeader(FrameType.APIC, 4));
        attachmentFrame.description = description;
        attachmentFrame.type = type;

        tag.addFrame(attachmentFrame);
        return attachmentFrame;
    }

    /**
     * Load the picture data from the file if not done yet.
     */
    public load(): void {
        // Already loaded?
        if (!this._file) {
            return;
        }

        // Load the picture from the stream
        let stream: Stream;
        let data: ByteVector;

        try {
            if (this._streamSize === 0) {
                data = ByteVector.empty();
            } else if (this._streamSize > 0) {
                stream = this._file.readStream;
                stream.seek(this._streamOffset, SeekOrigin.Begin);

                let count = 0;
                let read = 0;
                let needed = this._streamSize;
                const buffer = new Uint8Array(needed);

                do {
                    count = stream.read(buffer, read, needed);

                    read += count;
                    needed -= count;
                } while (needed > 0 && count !== 0);

                data = ByteVector.fromByteArray(buffer, read);
            } else {
                stream = this._file.readStream;
                stream.seek(this._streamOffset, SeekOrigin.Begin);

                data = ByteVector.fromInternalStream(stream);
            }
        } finally {
            if (stream && this._file) {
                this._file.closeStream(stream);
            }

            this._file = undefined;
        }

        // Decode the raw data if required using FielData
        this._rawData = this.fieldData(data, -Id3v2FrameHeader.getSize(this._rawVersion), this._rawVersion);

        // Get the actual data
        this.parseRawData();
    }

    public toString(): string {
        this.loadIfPossible();

        let builder = "";
        if (this.description) {
            builder += this.description;
            builder += " ";
        }
        builder += `[${this.mimeType}] ${this.data.length} bytes`;

        return builder;
    }

    // #endregion

    protected parseFields(data: ByteVector, version: number): void {
        this.loadIfPossible();
        if (data.length < 5) {
            throw new CorruptFileError("A picture frame must contain at least 5 bytes");
        }

        this._rawData = data;
        this._rawVersion = version;
    }

    protected renderFields(version: number) {
        this.loadIfPossible();

        // Bypass processing if we haven't changed the data. Raw data is cleared when we touch any
        // fields inside this frame.
        if (this._rawData && this._rawVersion === version) {
            return this._rawData;
        }

        const encoding = AttachmentFrame.correctEncoding(this.textEncoding, version);
        const data = ByteVector.empty();

        if (this._header.frameId === FrameType.APIC) {
            // Render an ID3v2 attached picture
            data.addByte(encoding);

            if (version === 2) {
                const ext = Picture.getExtensionFromMimeType(this.mimeType);
                data.addByteVector(ByteVector.fromString(ext && ext.length === 3 ? ext.toUpperCase() : "XXX"));
            } else {
                data.addByteVector(ByteVector.fromString(this.mimeType, StringType.Latin1));
                data.addByteVector(ByteVector.getTextDelimiter(StringType.Latin1));
            }

            data.addByte(this._type);
            data.addByteVector(ByteVector.fromString(this.description, encoding));
            data.addByteVector(ByteVector.getTextDelimiter(encoding));
        } else if (this._header.frameId === FrameType.GEOB) {
            // Make an ID3v2 general encapsulated object
            data.addByte(encoding);

            if (this.mimeType) {
                data.addByteVector(ByteVector.fromString(this.mimeType, StringType.Latin1));
            }
            data.addByteVector(ByteVector.getTextDelimiter(StringType.Latin1));

            if (this._filename) {
                data.addByteVector(ByteVector.fromString(this._filename, encoding));
            }
            data.addByteVector(ByteVector.getTextDelimiter(encoding));

            if (this.description) {
                data.addByteVector(ByteVector.fromString(this.description, encoding));
            }
            data.addByteVector(ByteVector.getTextDelimiter(encoding));
        } else {
            throw new Error("Invalid operation: Bad frame type");
        }

        data.addByteVector(this._data);
        return data;
    }

    private loadIfPossible(): void {
        if (this._file) {
            this.load();
        }
    }

    /**
     * Performs the *actual* parsing of the raw data.
     * Because of the high parsing cost and relatively low usage of the class, {@see parseFields}
     * only stores the field data so it can be parsed on demand. Whenever a property or method is
     * called, and only on the first call does it actually parse the data.
     */
    private parseRawData(): void {
        this.loadIfPossible();
        if (!this._rawData) {
            return;
        }

        this._data = this._rawData;
        this._rawData = undefined;

        let pos = 0;
        let offset: number;

        this._encoding = this._data.get(pos++);
        const delim = ByteVector.getTextDelimiter(this._encoding);

        if (this._header.frameId === FrameType.APIC) {
            // Retrieve an ID3v2 attached picture
            if (this._rawVersion > 2) {
                offset = this._data.find(ByteVector.getTextDelimiter(StringType.Latin1), pos);

                if (offset < pos) {
                    return;
                }

                this._mimeType = this._data.toString(StringType.Latin1, pos, offset - pos);
                pos = offset = 1;
            } else {
                const ext = this._data.mid(pos, 3);
                this._mimeType = Picture.getMimeTypeFromExtension(ext.toString(StringType.UTF8));
                pos += 3;
            }

            this.type = this._data.get(pos++);
            offset = this._data.find(delim, pos, delim.length);
        } else if (this._header.frameId === FrameType.GEOB) {
            // Retrieve and ID3v2 general encapsulated object
            offset = this._data.find(ByteVector.getTextDelimiter(StringType.Latin1), pos);
            if (offset < pos) {
                return;
            }

            this._mimeType = this._data.toString(StringType.Latin1, pos, offset - pos);
            pos = offset + 1;

            offset = this._data.find(delim, pos, delim.length);
            if (offset < pos) {
                return;
            }

            this._filename = this._data.toString(this._encoding, pos, offset - pos);
            pos = offset + delim.length;

            offset = this._data.find(delim, pos, delim.length);

            this.type = PictureType.NotAPicture;
        } else {
            throw new Error("Invalid operation: bad frame type");
        }

        if (offset < pos) {
            return;
        }

        this._description = this._data.toString(this._encoding, pos, offset - pos);
        pos = offset + delim.length;
        this._data.removeRange(0, pos);
    }
}
