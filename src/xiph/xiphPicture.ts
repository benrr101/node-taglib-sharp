import ILazy from "../iLazy";
import {IPicture, PictureType} from "../iPicture";
import FlacBlock from "../flac/flacBlock";
import {ByteVector, StringType} from "../byteVector";
import {Guards} from "../utils";
import {CorruptFileError} from "../errors";

export default class XiphPicture implements IPicture, ILazy {
    private _rawDataSource: () => ByteVector;
    private _colorDepth: number;
    private _data: ByteVector;
    private _description: string;
    private _filename: string;
    private _height: number;
    private _indexedColors: number;
    private _mimeType: string;
    private _type: PictureType;
    private _width: number;

    // #region Constructors

    private constructor() {}

    /**
     * Constructs and initializes a new instance by decoding and reading the contents of a raw Xiph
     * image structure. Intended to be used by the {@link XiphComment} class.
     * @param data Object containing the raw, base64 encoded Xiph image
     * @param isLazy Whether or not to lazily load the data. For xiph comments, this only delays
     *     decoding the data from base64
     */
    public static fromXiphComment(data: string, isLazy: boolean): XiphPicture {
        Guards.truthy(data, "data");
        if (data.length < 44) { // Decoded data must be 32 bytes long, 44 is length in base64
            throw new CorruptFileError("Encoded Xiph picture data must be at least 44 bytes long");
        }

        const picture = new XiphPicture();
        picture._rawDataSource = () => ByteVector.fromByteArray(Buffer.from(data, "base64"));
        if (!isLazy) {
            picture.load();
        }

        return picture;
    }

    /**
     * Constructs and initializes a new instance by reading the contents of the picture from a FLAC
     * block. Intended to be used by the {@link FlacTag} class.
     * @param block FLAC block containing the Xiph image.
     * @param isLazy Whether or not to lazily load the data. For FLAC blocks, this will chain into
     *     the lazy loading capabilities of the block
     */
    public static fromBlock(block: FlacBlock, isLazy: boolean): XiphPicture {
        Guards.truthy(block, "block");
        if (block.dataSize < 32) {
            throw new CorruptFileError("Picture data must be at least 32 bytes");
        }

        const picture = new XiphPicture();
        picture._rawDataSource = () => block.data;
        if (!isLazy) {
            picture.load();
        }

        return picture;
    }

    /**
     * Constructs and initializes a new instance by copying the properties of an {@link IPicture}
     * object.
     * @param picture Object to copy properties from.
     */
    public static fromPicture(picture: IPicture): XiphPicture {
        Guards.truthy(picture, "picture");

        const instance = new XiphPicture();
        instance._type = picture.type;
        instance._mimeType = picture.mimeType;
        instance._filename = picture.filename;
        instance._description = picture.description;
        instance._data = picture.data;

        if (!(picture instanceof XiphPicture)) {
            return instance;
        }

        // Fill in extra details if we know them
        // @TODO: Maybe calculate these from the picture data?
        instance._width = picture.width;
        instance._height = picture.height;
        instance._colorDepth = picture.colorDepth;
        instance._indexedColors = picture.indexedColors;
        return instance;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the color depth of the picture in the current instance.
     */
    public get colorDepth(): number {
        this.load();
        return this._colorDepth;
    }
    /**
     * Sets the color depth of the picture in the current instance.
     * @param value Color depth of the picture. Must be a positive 32-bit integer
     */
    public set colorDepth(value: number) {
        Guards.uint(value, "value");

        this.load();
        this._colorDepth = value;
    }

    /** @inheritDoc */
    public get data(): ByteVector {
        this.load();
        return this._data;
    }
    /** @inheritDoc */
    public set data(value: ByteVector) {
        this.load();
        this._data = value;
    }

    /** @inheritDoc */
    public get description(): string {
        this.load();
        return this._description;
    }
    /** @inheritDoc */
    public set description(value: string) {
        this.load();
        this._description = value;
    }

    /** @inheritDoc */
    public get filename(): string {
        this.load();
        return this._filename;
    }
    /** @inheritDoc */
    public set filename(value: string) {
        this.load();
        this._filename = value;
    }

    /**
     * Gets the height of the picture in the current instance in pixels.
     */
    public get height(): number {
        this.load();
        return this._height;
    }
    /**
     * Sets the height of the picture in the current instance.
     * @param value height of the picture in pixels, must be a positive 32-bit integer.
     */
    public set height(value: number) {
        Guards.uint(value, "value");

        this.load();
        this._height = value;
    }

    /**
     * Gets the number of indexed colors in the picture represented by the current instance.
     */
    public get indexedColors(): number {
        this.load();
        return this._indexedColors;
    }
    /**
     * Sets the number of indexed colors in the picture represented by the current instance.
     * @param value Number of indexed colors in the pictures or `0` if the picture is not stored in
     *     an indexed format. Must be a positive 32-bit integer
     */
    public set indexedColors(value: number) {
        Guards.uint(value, "value");

        this.load();
        this._indexedColors = value;
    }

    /** @inheritDoc */
    public get isLoaded(): boolean { return !!this._data; }

    /** @inheritDoc */
    public get mimeType(): string {
        this.load();
        return this._mimeType;
    }
    /** @inheritDoc */
    public set mimeType(value: string) {
        this.load();
        this._mimeType = value;
    }

    /** @inheritDoc */
    public get type(): PictureType {
        this.load();
        return this._type;
    }
    /** @inheritDoc */
    public set type(value: PictureType) {
        this.load();
        this._type = value;
    }

    /**
     * Gets the width of the picture in the current instance in pixels.
     */
    public get width(): number {
        this.load();
        return this._width;
    }
    /**
     * Sets the width of the picture in the current instance.
     * @param value Width of the picture in pixels, must be positive 32-bit integer.
     */
    public set width(value: number) {
        Guards.uint(value, "value");

        this.load();
        this._width = value;
    }

    // #endregion

    // #region Methods

    /** @inheritDoc */
    public load(): void {
        if (this.isLoaded) {
            return;
        }

        let position = 0;
        const rawData = this._rawDataSource();
        this._type = rawData.mid(position, 4).toUInt();
        position += 4;

        const mimetypeLength = rawData.mid(position, 4).toUInt();
        position += 4;
        this._mimeType = rawData.mid(position, mimetypeLength).toString(undefined, StringType.Latin1);
        position += mimetypeLength;

        const descriptionLength = rawData.mid(position, 4).toUInt();
        position += 4;
        this._description = rawData.mid(position, descriptionLength).toString(undefined, StringType.UTF8);
        position += descriptionLength;

        this._width = rawData.mid(position, 4).toUInt();
        position += 4;
        this._height = rawData.mid(position, 4).toUInt();
        position += 4;
        this._colorDepth = rawData.mid(position, 4).toUInt();
        position += 4;
        this._indexedColors = rawData.mid(position, 4).toUInt();
        position += 4;

        const dataLength = rawData.mid(position, 4).toUInt();
        position += 4;
        this._data = rawData.mid(position, dataLength);
    }

    /**
     * Renders the picture for use in a FLAC block.
     */
    public renderForFlacBlock() {
        this.load();

        const mimeType = ByteVector.fromString(this.mimeType, StringType.Latin1);
        const description = ByteVector.fromString(this.description, StringType.UTF8);
        return ByteVector.concatenate(
            ByteVector.fromUInt(this.type),
            ByteVector.fromUInt(mimeType.length),
            mimeType,
            ByteVector.fromUInt(description.length),
            description,
            ByteVector.fromUInt(this.width),
            ByteVector.fromUInt(this.height),
            ByteVector.fromUInt(this.colorDepth),
            ByteVector.fromUInt(this.indexedColors),
            ByteVector.fromUInt(this.data.length),
            this.data
        );
    }

    /**
     * Renders the picture for use in a XIPH comment block (ie, the same structure as a FLAC block,
     * but base64 encoded).
     */
    public renderForXiphComment() {
        const unencodedData = this.renderForFlacBlock();
        return Buffer.from(unencodedData.data.buffer).toString("base64");
    }

    // #endregion
}
