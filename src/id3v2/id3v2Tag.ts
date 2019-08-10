import Header from "./header";
import HeaderFlags from "./headerFlags";
import {ByteVector, StringType} from "../byteVector";
import {Tag} from "../tag";
import {Frame, FrameClassType} from "./frames/frame";
import {Guards} from "../utils";
import ExtendedHeader from "./extendedHeader";

export default class Id3v2Tag extends Tag {
    private static _defaultEncoding: StringType = StringType.UTF8;
    private static _defaultVersion: number = 3;
    private static _forceDefaultEncoding: boolean = false;
    private static _forceDefaultVersion: boolean = false;
    private static _language: string = undefined;       // @TODO: Use the os-locale module to supply a lazily loaded "default" locale
    private static _useNumericGenres: boolean = true;   // @TODO: DO WE HAVE TO???

    private _extendedHeader: ExtendedHeader;
    private _frameList: Frame[] = [];
    private _header: Header;
    private _performersRole: string[];

    // #region Constructors



    // #endregion

    // #region Properties

    /**
     * Gets the encoding to use when creating new frames.
     */
    public static get defaultEncoding(): StringType { return this._defaultEncoding; }
    /**
     * Sets the encoding to use when creating new frames.
     * @param value Encoding to use when creating new frames
     */
    public static set defaultEncoding(value: StringType) { this._defaultEncoding = value; }

    /**
     * Gets the default version to use when creating new tags.
     * If {@see forceDefaultEncoding} is `true` then all tags will be rendered with this version.
     */
    public static get defaultVersion(): number { return Id3v2Tag._defaultVersion; }
    /**
     * Sets the default version to use when creating new tags.
     * If {@see forceDefaultEncoding} is `true` then all tags will be rendered with this version.
     * @param value ID3v2 version to use. Must be 2, 3, or 4. The default for this library is 3
     */
    public static set defaultVersion(value: number) {
        Guards.byte(value, "value");
        Guards.between(value, 2, 4, "value");
        Id3v2Tag._defaultVersion = value;
    }

    /**
     * Gets whether or not to render all frames with the default encoding rather than their
     * original encoding.
     */
    public static get forceDefaultEncoding(): boolean { return Id3v2Tag._forceDefaultEncoding; }
    /**
     * Sets whether or not to render all frames with the default encoding rather than their
     * original encoding.
     * @param value If `true` frames will be rendered using {@see defaultEncoding} rather than
     *     their original encoding.
     */
    public static set forceDefaultEncoding(value: boolean) { Id3v2Tag._forceDefaultEncoding = value; }

    /**
     * Gets whether or not to save all tags in the default version rather than their original
     * version.
     */
    public static get forceDefaultVersion(): boolean { return this._forceDefaultVersion; }
    /**
     * Sets whether or not to save all tags in the default version rather than their original
     * version.
     * @param value If `true`, tags will be saved in the version defined in {@see defaultVersion}
     *     rather than their original format, with the exception of tags with footers which will
     *     always be saved in version 4
     */
    public static set forceDefaultVersion(value: boolean) { this._forceDefaultVersion = value; }

    /**
     * Gets the ISO-639-2 language code to use when searching for and storing language specific
     * values.
     */
    public static get language(): string { return Id3v2Tag._language; }
    /**
     * Gets the ISO-639-2 language code to use when searching for and storing language specific
     * values.
     * @param value ISO-639-2 language code to use. If the language is unknown `"   "` is the
     *     appropriate filler
     */
    public static set language(value: string) {
        Id3v2Tag._language = !value || value.length < 3
            ? "   "
            : value.substr(0, 3);
    }

    /**
     * Gets whether or not to use ID3v1 style numeric genres when possible.
     * If `true`, the library will try looking up the numeric genre code when storing the value.
     * for ID3v2.2 and ID3v2.3 "Rock" would be stored as "(17)" and for ID3v2.4, it would be
     * stored as "17".
     */
    public static get useNumericGenres(): boolean { return this._useNumericGenres; }
    /**
     * Sets whether or not to use ID3v1 style numeric genres when possible.
     * If `true`, the library will try looking up the numeric genre code when storing the value.
     * for ID3v2.2 and ID3v2.3 "Rock" would be stored as "(17)" and for ID3v2.4, it would be
     * stored as "17".
     * @param value Whether or not to use genres with numeric values when values when possible
     */
    public static set useNumericGenres(value: boolean) { this._useNumericGenres = value; }

    /**
     * Gets the header flags applied to the current instance.
     */
    public get flags(): HeaderFlags { return this._header.flags; }
    /**
     * Sets the header flags applied to the current instance
     * @param value Bitwise combined {@see HeaderFlags} value contiaining flags applied to the
     *     current instance.
     */
    public set flags(value: HeaderFlags) { this._header.flags = value; }

    /**
     * Gets the ID3v2 version for the current instance.
     */
    public get version(): number {
        return Id3v2Tag.forceDefaultVersion
            ? Id3v2Tag.defaultVersion
            : this._header.majorVersion;
    }
    /**
     * Sets the ID3v2 version for the current instance.
     * @param value ID3v2 version for the current instance. Must be 2, 3, or 4.
     */
    public set version(value: number) {
        Guards.byte(value, "value");
        Guards.between(value, 2, 4, "value");
        this._header.majorVersion = value;
    }

    // #endregion


    public addFrame(frame: Frame): void {
        Guards.truthy(frame, "frame");
        this._frameList.push(frame);
    }

    public getFramesByClassType<TFrame extends Frame>(type: FrameClassType): TFrame[] {
        // @TODO: Add guards
        return this._frameList.filter((f) => f && f.frameClassType === type)
            .map((f) => <TFrame> f);
    }

    public getFramesByIdentifier<TFrame extends Frame>(type: FrameClassType, ident: ByteVector): TFrame[] {
        // @TODO: Add guards
        return this._frameList.filter((f) => {
            return f && f.frameClassType === type && ByteVector.equal(f.frameId, ident);
        }).map((f) => <TFrame> f);
    }
}