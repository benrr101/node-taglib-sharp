import {StringType} from "../byteVector";
import {Guards} from "../utils";

export default class Id3v2TagSettings {
    private static _defaultEncoding: StringType = StringType.UTF8;
    private static _defaultVersion: number = 3;
    private static _forceDefaultEncoding: boolean = false;
    private static _forceDefaultVersion: boolean = false;
    private static _useNumericGenres: boolean = true;           // @TODO: DO WE HAVE TO???

    /**
     * Private constructor to prevent inadvertent construction
     */
    private constructor() {}

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
    public static get defaultVersion(): number { return Id3v2TagSettings._defaultVersion; }
    /**
     * Sets the default version to use when creating new tags.
     * If {@see forceDefaultEncoding} is `true` then all tags will be rendered with this version.
     * @param value ID3v2 version to use. Must be 2, 3, or 4. The default for this library is 3
     */
    public static set defaultVersion(value: number) {
        Guards.byte(value, "value");
        Guards.between(value, 2, 4, "value");
        Id3v2TagSettings._defaultVersion = value;
    }

    /**
     * Size of an ID3v2 footer in bytes
     */
    public static get footerSize(): number { return 10; }

    /**
     * Gets whether or not to render all frames with the default encoding rather than their
     * original encoding.
     */
    public static get forceDefaultEncoding(): boolean { return Id3v2TagSettings._forceDefaultEncoding; }
    /**
     * Sets whether or not to render all frames with the default encoding rather than their
     * original encoding.
     * @param value If `true` frames will be rendered using {@see defaultEncoding} rather than
     *     their original encoding.
     */
    public static set forceDefaultEncoding(value: boolean) { Id3v2TagSettings._forceDefaultEncoding = value; }

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
     * Size of an ID3v2 header in bytes
     */
    public static get headerSize(): number { return 10; }

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
}
