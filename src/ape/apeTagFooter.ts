import {ByteVector, StringType} from "../byteVector";
import {CorruptFileError} from "../errors";
import {Guards} from "../utils";

/**
 * Indicates the flags applied to a {@see Footer} object.
 */
export enum ApeTagFooterFlags {
    /**
     * Tag lacks a footer.
     */
    FooterAbsent = 0x40000000,

    /**
     * Tag contains a header.
     */
    HeaderPresent = 0x80000000,

    /**
     * This footer is actually a header.
     */
    IsHeader = 0x20000000
}

export class ApeTagFooter {
    /**
     * Identifier used to fina an APEv2 footer in a file.
     */
    public static readonly fileIdentifier = ByteVector.fromString("APETAGEX", StringType.Latin1, undefined, true);

    /**
     * Size of an APEv2 footer.
     */
    public static readonly size = 32;

    private _flags: ApeTagFooterFlags;
    private _itemCount: number;
    private _tagSize: number;
    private _version: number = 0;

    // #region Constructors

    /**
     * Constructs and initializes a new instance of {@see ApeTagFooter} by reading it from raw
     * footer data.
     * @param data Raw data to build the new instance from.
     */
    public constructor(data: ByteVector) {
        Guards.truthy(data, "data");
        if (data.length < ApeTagFooter.size) {
            throw new CorruptFileError("Provided data is smaller than object size");
        }
        if (!data.startsWith(ApeTagFooter.fileIdentifier)) {
            throw new CorruptFileError("Provided data does not start with file identifier");
        }

        this._version = data.mid(8, 4).toUInt(false);
        this._tagSize = data.mid(12, 4).toUInt(false);
        this._itemCount = data.mid(16, 4).toUInt(false);
        this._flags = <ApeTagFooterFlags> data.mid(20, 4).toUInt(false);
    }

    // #endregion

    // #region Properties

    /**
     * Gets the complete size of the tag represented by the current instance, including the header
     * and footer.
     */
    public get completeTagSize(): number {
        return this.tagSize +
            ((this._flags & ApeTagFooterFlags.HeaderPresent) !== 0 ? ApeTagFooter.size : 0);
    }

    /**
     * Gets the flags that apply to the current instance.
     */
    public get flags(): ApeTagFooterFlags { return this._flags; }
    /**
     * Sets the flags that apply to the current instance.
     */
    public set flags(value: ApeTagFooterFlags) { this._flags = value; }

    /**
     * Gets the number of items in the tag represented by this footer.
     */
    public get itemCount(): number { return this._itemCount; }
    /**
     * Sets the number of items in the tag represented by this footer.
     * @param value
     */
    public set itemCount(value: number) {
        Guards.uint(value, "value");
        this._itemCount = value;
    }

    /**
     * Gets the size of the tag represented by this footer, including the footer but excluding the
     * header, if applicable.
     */
    public get tagSize(): number { return this._tagSize; }
    /**
     * Sets the size of the tag represented by this footer. Should include the size of the footer
     * but exclude the size of the header, if applicable.
     */
    public set tagSize(value: number) {
        Guards.uint(value, "value");
        this._tagSize = value;
    }

    /**
     * Gets the version of APE tag described by the current isntance.
     */
    public get version(): number { return this._version === 0 ? 2000 : this._version; }

    // #endregion
}
