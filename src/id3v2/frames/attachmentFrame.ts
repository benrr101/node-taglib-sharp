import Id3v2TagSettings from "../id3v2TagSettings";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Frame, FrameClassType} from "./frame";
import {FrameIdentifiers} from "../frameIdentifiers";
import {Id3v2FrameHeader} from "./frameHeader";
import {IPicture, Picture, PictureType} from "../../picture";
import {Guards} from "../../utils";

export default class AttachmentFrame extends Frame {
    private _data: ByteVector;
    private _description: string;
    private _encoding: StringType = Id3v2TagSettings.defaultEncoding;
    private _filename: string;
    private _mimeType: string;
    private _rawPicture: IPicture;
    private _rawData: ByteVector;
    private _rawVersion: number;
    private _type: PictureType;

    // #region Constructors

    private constructor(frameHeader: Id3v2FrameHeader) {
        super(frameHeader);
    }

    /**
     * Constructs and initializes a new attachment frame by reading its raw data in a specified
     * ID3v2 version.
     * @param data ByteVector containing the raw representation of the new frame
     * @param offset Index into {@paramref data} where the frame actually begins
     * @param header Header of the frame found at {@paramref offset} in the data
     */
    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader
    ): AttachmentFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");

        const frame = new AttachmentFrame(header);
        frame.setData(data, offset, false);
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

        // In this case we will assume the frame is an APIC until the picture is parsed
        const frame = new AttachmentFrame(new Id3v2FrameHeader(FrameIdentifiers.APIC, 4));
        frame._rawPicture = picture;
        return frame;
    }

    /**
     * Constructs and initializes a new attachment frame by reading its raw data in a specified
     * Id3v2 version.
     * @param data ByteVector starting with the raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with.
     */
    public static fromRawData(data: ByteVector, version: number): AttachmentFrame {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        const frame = new AttachmentFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, true);
        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.AttachmentFrame; }

    /**
     * Gets the image data stored in the current instance.
     */
    public get data(): ByteVector {
        this.parseFromRaw();
        return this._data ? this._data : ByteVector.empty();
    }
    /**
     * Sets the image data stored in the current instance.
     */
    public set data(value: ByteVector) {
        this.parseFromRaw();
        this._data = value;
    }

    /**
     * Gets the description stored in the current instance.
     */
    public get description(): string {
        this.parseFromRaw();
        return this._description ? this._description : "";
    }
    /**
     * Sets the description stored in the current instance.
     * There should only be one frame with a matching description and type per tag.
     */
    public set description(value: string) {
        this.parseFromRaw();
        this._description = value;
    }

    /**
     * Gets a filename of the picture stored in the current instance.
     */
    public get filename(): string {
        this.parseFromRaw();
        return this._filename;
    }
    /**
     * Sets a filename of the picture stored in the current instance.
     */
    public set filename(value: string) {
        this.parseFromRaw();
        this._filename = value;
    }

    /**
     * Gets the MimeType of the picture stored in the current instance.
     */
    public get mimeType(): string {
        this.parseFromRaw();

        return this._mimeType ? this._mimeType : "";
    }
    /**
     * Sets the MimeType of the picture stored in the current instance.
     * @param value MimeType of the picture stored in the current instance.
     */
    public set mimeType(value: string) {
        this.parseFromRaw();
        this._mimeType = value;
    }

    /**
     * Gets the text encoding to use when storing the current instance.
     * @value Text encoding to use when storing the current instance.
     */
    public get textEncoding(): StringType {
        this.parseFromRaw();
        return this._encoding;
    }
    /**
     * Sets the text encoding to use when storing the current instance.
     * @param value Text encoding to use when storing the current instance.
     *     This encoding is overridden when rendering if {@see Id3v2Tag.ForceDefaultEncoding} is
     *     `true` or the render version does not support it.
     */
    public set textEncoding(value: StringType) {
        this.parseFromRaw();
        this._encoding = value;
    }

    /**
     * Gets the object type stored in the current instance.
     */
    public get type(): PictureType {
        this.parseFromRaw();
        return this._type;
    }
    /**
     * Sets the object type stored in the current instance.
     * For General Object Frame, use {@see PictureType.NotAPicture}. Other types will make it a
     * Picture Frame.
     */
    public set type(value: PictureType) {
        this.parseFromRaw();

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
        const frame = new AttachmentFrame(new Id3v2FrameHeader(this.frameId, 4));
        if (this._rawPicture) {
            frame._rawPicture = this._rawPicture;
        } else if (this._rawData) {
            frame._rawData = this._rawData;
            frame._rawVersion = this._rawVersion;
        } else {
            frame._data = ByteVector.fromByteVector(this._data);
            frame._encoding = this._encoding;
            frame._filename = this._filename;
            frame._mimeType = this._mimeType;
            frame._rawVersion = this._rawVersion;
            frame._type = this._type;
        }

        return frame;
    }

    /**
     * Get a specified attachment frame from the specified tag, optionally creating it if it does
     * not exist.
     * @param frames List of attachment frames to search
     * @param description Description to match
     * @param type Picture type to match
     * @returns Matching frame or `undefined` if a match wasn't found and {@paramref create} is
     *     `false`
     */
    public static find(
        frames: AttachmentFrame[],
        description?: string,
        type: PictureType = PictureType.Other
    ): AttachmentFrame {
        Guards.truthy(frames, "frames");
        return frames.find((f) => {
                if (f.description && f.description !== description) { return false; }
                if (type !== PictureType.Other && f.type !== type) { return false; }
                return true;
            });
    }

    public toString(): string {
        this.parseFromRaw();

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
        if (data.length < 5) {
            throw new CorruptFileError("A picture frame must contain at least 5 bytes");
        }

        this._rawData = data;
        this._rawVersion = version;
    }

    protected renderFields(version: number) {
        this.parseFromRaw();

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

    private parseFromRaw(): void {
        if (this._rawData) {
            this.parseFromRawData();
        } else if (this._rawPicture) {
            this.parseFromRawPicture();
        }
    }

    private parseFromRawData(): void {
        // Indicate raw data has been processed
        const data = this._rawData;
        this._rawData = undefined;

        // Determine encoding
        this._encoding = data.get(0);
        const delim = ByteVector.getTextDelimiter(this._encoding);

        let descriptionEndIndex;
        if (ByteVector.equal(this.frameId, FrameType.APIC)) {
            // Retrieve an ID3v2 attached picture
            if (this._rawVersion > 2) {
                // Text encoding      $xx
                // MIME type          <text string> $00
                // Picture type       $xx
                // Description        <text string according to encoding> $00 (00)
                // Picture data       <binary data>
                const mimeTypeEndIndex = data.find(ByteVector.getTextDelimiter(StringType.Latin1));
                if (mimeTypeEndIndex === -1) {
                    return;
                }
                const mimeTypeLength = mimeTypeEndIndex - 1;
                this._mimeType = data.toString(mimeTypeLength, StringType.Latin1, 1);

                this._type = data.get(mimeTypeEndIndex + 1);

                descriptionEndIndex = data.find(delim, mimeTypeEndIndex + 1);
                const descriptionLength = descriptionEndIndex - mimeTypeLength - 1;
                this._description = data.toString(
                    descriptionLength,
                    this._encoding,
                    mimeTypeEndIndex + 1
                );
            } else {
                // Text encoding      $xx
                // Image format       $xx xx xx
                // Picture type       $xx
                // Description        <textstring> $00 (00)
                // Picture data       <binary data>
                const imageFormat = data.toString(3, StringType.Latin1, 1);
                this._mimeType = Picture.getMimeTypeFromFilename(imageFormat);

                descriptionEndIndex = data.find(delim, 5);
                const descriptionLength = descriptionEndIndex - 5;
                this._description = data.toString(descriptionLength, this._encoding, 5);
            }

            this._data = data.mid(descriptionEndIndex + delim.length);
        } else if (ByteVector.equal(this.frameId, FrameType.GEOB)) {
            // Retrieve an ID3v2 generic encapsulated object
            // Text encoding          $xx
            // MIME type              <text string> $00
            // Filename               <text string according to encoding> $00 (00)
            // Content description    <text string according to encoding> $00 (00)
            // Encapsulated object    <binary data>
            const mimeTypeEndIndex = data.find(ByteVector.getTextDelimiter(StringType.Latin1));
            if (mimeTypeEndIndex === -1) {
                return;
            }
            const mimeTypeLength = mimeTypeEndIndex - 1;
            this._mimeType = data.toString(mimeTypeLength, StringType.Latin1, 1);

            const filenameEndIndex = data.find(delim, mimeTypeEndIndex + 1);
            const filenameLength = filenameEndIndex - mimeTypeEndIndex - 1;
            this._filename = data.toString(filenameLength, this._encoding, mimeTypeEndIndex + 1);

            descriptionEndIndex = data.find(delim, filenameEndIndex + delim.length);
            const descriptionLength = descriptionEndIndex - filenameEndIndex - delim.length;
            this._description = data.toString(descriptionLength, this._encoding, filenameEndIndex + delim.length);

            this._data = data.mid(descriptionEndIndex + delim.length);
        } else {
            // Unsupported
            throw new Error("Unsupported: AttachmentFrame cannot be used for frame IDs other than GEOB or APIC");
        }
    }

    private parseFromRawPicture(): void {
        // Indicate raw picture has been processed
        const picture = this._rawPicture;
        this._rawPicture = undefined;

        // Bring over values from the picture
        this._data = ByteVector.fromByteVector(picture.data);
        this._description = picture.description;
        this._filename = picture.filename;
        this._mimeType = picture.mimeType;
        this._type = picture.type;

        this._encoding = Id3v2TagSettings.defaultEncoding;

        // Switch the frame ID if we discovered the attachment isn't an image
        if (this._type === PictureType.NotAPicture) {
            this._header.frameId = FrameType.GEOB;
        }
    }
}
