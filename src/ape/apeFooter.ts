import {ByteVector, StringType} from "../byteVector";
import {CorruptFileError} from "../errors";
import {Guards} from "../utils";

/**
 * Indicates the flags applied to a {@see ApeFooter} object.
 */
export enum ApeFooterFlags {
    /**
     * Tag lacks a footer object.
     */
    FooterAbsent = 0x40000000,

    /**
     * Footer is actually a header.
     */
    IsHeader = 0x20000000,

    /**
     * Tag contains a header.
     */
    HeaderPresent = 0x80000000
}

export class ApeFooter {
    // #region Member Variables

    /**
     * Specifies the identifier used to find an APEv2 footer in a file.
     */
    public static readonly fileIdentifier = ByteVector.fromString("APETAGEX", StringType.UTF8);

    /**
     * Specifies the size of an APEv2 footer.
     */
    public static readonly size = 32;

    private readonly _version: number;
    private _flags: ApeFooterFlags;
    private _itemCount: number;
    private _tagSize: number;

    // #endregion

    /**
     * Constructs and initializes a new instance of {@see ApeFooter} by reading it from raw footer
     * data.
     * @param data ByteVector object containing the raw data to build the new instance from.
     * @throws CorruptFileError If {@param data} is smaller than {@see ApeFooter.size} or does not
     *     begin with {@see ApeFooter.fileIdentifier}.
     */
    public constructor(data: ByteVector) {
        Guards.truthy(data, "data");

        if (data.length < ApeFooter.size) {
            throw new CorruptFileError("Provided data is smaller than object size");
        }
        if (!data.startsWith(ApeFooter.fileIdentifier)) {
            throw new CorruptFileError("Provided data does not start with APEv2 file identifier.");
        }

        this._version = data.mid(8, 4).toUInt(false);
        this._tagSize = data.mid(12, 4).toUInt(false);
        this._itemCount = data.mid(16, 4).toUInt(false);
        this._flags = data.mid(20, 4).toUInt(false);
    }

    // #region Properties

    /**
     * Gets the complete size of the tag represented by the current instance, including the header
     * and footer.
     */
    public get completeTagSize(): number {
        return this._tagSize + ((this._flags & ApeFooterFlags.HeaderPresent) > 0 ? ApeFooter.size : 0);
    }

    /**
     * Gets the flags that apply to the current instance.
     */
    public get flags(): ApeFooterFlags { return this._flags; }
    /**
     * Sets the flags that apply to the current instance.
     */
    public set flags(val: ApeFooterFlags) { this._flags = val; }

    /**
     * Gets the number of items in the tag represented by the current instance.
     */
    public get itemCount(): number { return this._itemCount; }
    /**
     * Sets the number of items in the tag represented by the current instance. Must be a positive,
     * safe integer.
     */
    public set itemCount(val: number) {
        Guards.uint(val, "val");
        this._itemCount = val;
    }

    /**
     * Gets the size of the tag represented by the current instance, including the footer but
     * excluding the header if applicable.
     */
    public get tagSize(): number { return this._tagSize; }
    /**
     * Sets the size of the tag represented by the current instance, including the footer but
     * excluding the header if applicable. Must be a positive, safe integer.
     * @param val
     */
    public set tagSize(val: number) {
        Guards.uint(val, "val");
        this._tagSize = val;
    }

    /**
     * Gets the version of APE tag described by the current instance.
     */
    public get version(): number { return this._version === 0 ? 2000 : this._version; }

    // #endregion

    // #region Public Methods

    /**.
     * Renders the current instance as an APE tag footer
     */
    public renderFooter(): ByteVector {
        return this.render(false);
    }

    /**
     * Renders the current instance as an APE tag header.
     */
    public renderHeader(): ByteVector {
        return (this._flags & ApeFooterFlags.HeaderPresent) > 0
            ? this.render(true)
            : ByteVector.fromSize(0);
    }

    // #endregion

    private render(isHeader: boolean): ByteVector {
        // Start with the file identifier
        const v = ByteVector.fromByteVector(ApeFooter.fileIdentifier);

        // Add the version number
        // NOTE: We always render a 2.000 tag regardless of what the tag originall was.
        v.addByteVector(ByteVector.fromUInt(2000, false));

        // Add the tag size
        v.addByteVector(ByteVector.fromUInt(this._tagSize, false));

        // Add the item count
        v.addByteVector(ByteVector.fromUInt(this._itemCount, false));

        // Render and add the flags
        let flags = 0;
        if ((this._flags & ApeFooterFlags.HeaderPresent) > 0) {
            flags |= ApeFooterFlags.HeaderPresent;
        }

        // Footer is always present
        if (isHeader) {
            flags |= ApeFooterFlags.IsHeader;
        } else {
            flags &= ~ApeFooterFlags.IsHeader;
        }

        v.addByteVector(ByteVector.fromUInt(flags, false));

        // Add the reserved 64bit
        v.addByteVector(ByteVector.fromSize(8, 0x00));

        return v;
    }

    // NOTE: original .NET implementation included IEquatable implementation. It doesn't appear to
    //     be used anywhere, so I'm omitting it for now.
}
