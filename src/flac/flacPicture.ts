import {IPicture, PictureType} from "../iPicture";
import {ByteVector, StringType} from "../byteVector";
import {Guards} from "../utils";
import {CorruptFileError} from "../errors";

export default class FlacPicture implements IPicture {
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
     * Constructs and initializes a new instance by copying the properties of an {@link IPicture}
     * object.
     * @param picture Object to copy properties from.
     */
    public static fromPicture(picture: IPicture): FlacPicture {
        Guards.truthy(picture, "picture");

        const instance = new FlacPicture();
        instance._type = picture.type;
        instance._mimeType = picture.mimeType;
        instance._fileName = picture.filename;
        instance._description = picture.description;
        instance._data = picture.data;

        if (!(picture instanceof FlacPicture)) {
            return instance;
        }

        instance._width = picture.width;
        instance._height = picture.height;
        instance._colorDepth = picture.colorDepth;
        instance._indexedColors = picture.indexedColors;
        return instance;
    }

    /**
     * Constructs and initializes a new instance by reading the contents of a raw FLAC image
     * structure.
     * @param data Object containing the raw FLAC image, must be at least 32 bytes long.
     */
    public static fromRawData(data: ByteVector): FlacPicture {
        Guards.truthy(data, "data");
        if (data.length < 32) {
            throw new CorruptFileError("FLAC picture data must be at least 32 bytes long");
        }

        let pos = 0;

        const picture = new FlacPicture();
        picture._type = data.mid(pos, 4).toUInt();
        pos += 4;

        const mimetypeLength = data.mid(pos, 4).toUInt();
        pos += 4;
        picture._mimeType = data.toString(mimetypeLength, StringType.Latin1, pos);
        pos += mimetypeLength;

        const descriptionLength = data.mid(pos, 4).toUInt();
        pos += 4;
        picture._mimeType = data.toString(descriptionLength, StringType.UTF8, pos);
        pos += descriptionLength;

        picture._width = data.mid(pos, 4).toUInt();
        picture._height = data.mid(pos + 4, 4).toUInt();
        picture._colorDepth = data.mid(pos + 8, 4).toUInt();
        picture._indexedColors = data.mid(pos + 12, 4).toUInt();

        const dataLength = data.mid(pos + 16, 4).toUInt();
        picture._data = data.mid(pos + 20, dataLength);

        return picture;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the color depth of the picture in the current instance.
     */
    public get colorDepth(): number { return this._colorDepth; }
    /**
     * Sets the color depth of the picture in the current instance.
     * @param value Color depth of the picture. Must be a positive 32-bit integer
     */
    public set colorDepth(value: number) {
        Guards.uint(value, "value");
        this._colorDepth = value;
    }

    /** @inheritDoc */
    public get data(): ByteVector { return this._data; }
    /** @inheritDoc */
    public set data(value: ByteVector) { this._data = value; }

    /** @inheritDoc */
    public get description(): string { return this._description; }
    /** @inheritDoc */
    public set description(value: string) { this._description = value; }

    /** @inheritDoc */
    public get filename(): string { return this._filename; }
    /** @inheritDoc */
    public set filename(value: string) { this._filename = value; }

    /**
     * Gets the height of the picture in the current instance in pixels.
     */
    public get height(): number { return this._height; }
    /**
     * Sets the height of the picture in the current instance.
     * @param value height of the picture in pixels, must be a positive 32-bit integer.
     */
    public set height(value: number) {
        Guards.uint(value, "value");
        this._height = value;
    }

    /**
     * Gets the number of indexed colors in the picture represented by the current instance.
     */
    public get indexedColors(): number { return this._indexedColors; }

    /**
     * Sets the number of indexed colors in the picture represented by the current instance.
     * @param value Number of indexed colors in the pictures or `0` if the picture is not stored in
     *     an indexed format. Must be a positive 32-bit integer
     */
    public set indexedColors(value: number) {
        Guards.uint(value, "value");
        this._indexedColors = value;
    }

    /** @inheritDoc */
    public get mimeType(): string { return this._mimeType; }
    /** @inheritDoc */
    public set mimeType(value: string) { this._mimeType = value; }

    /** @inheritDoc */
    public get type(): PictureType { return this._type; }
    /** @inheritDoc */
    public set type(value: PictureType) { this._type = value; }

    /**
     * Gets the width of the picture in the current instance in pixels.
     */
    public get width(): number { return this._width; }
    /**
     * Sets the width of the picture in the current instance.
     * @param value Width of the picture in pixels, must be positive 32-bit integer.
     */
    public set width(value: number) {
        Guards.uint(value, "value");
        this._width = value;
    }

    // #endregion

    /**
     * Renders the current as a raw FLAC picture.
     */
    public render(): ByteVector {
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
}
