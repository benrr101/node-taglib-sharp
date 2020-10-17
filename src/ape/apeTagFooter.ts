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

/**
 * Representation of an APEv2 tag footer which can be read from and written to disk.
 */
export class ApeTagFooter {
    /**
     * Identifier used to fina an APEv2 footer in a file.
     */
    public static readonly fileIdentifier = ByteVector.fromString("APETAGEX", StringType.Latin1, undefined, true);

    /**
     * Size of an APEv2 footer.
     */
    public static readonly size = 32;

    private _flags: ApeTagFooterFlags = 0;
    private _itemCount: number = 0;
    private _itemSize: number = 0;
    private _version: number = 0;

    // #region Constructors

    private constructor() {}

    /**
     * Constructs and initializes a new instance of {@see ApeTagFooter} by reading it from raw
     * footer data.
     * @param data Raw data to build the new instance from.
     */
    public static fromData(data: ByteVector): ApeTagFooter {
        Guards.truthy(data, "data");
        if (data.length < ApeTagFooter.size) {
            throw new CorruptFileError("Provided data is smaller than object size");
        }
        if (!data.startsWith(ApeTagFooter.fileIdentifier)) {
            throw new CorruptFileError("Provided data does not start with file identifier");
        }

        const footer = new ApeTagFooter();
        footer._version = data.mid(8, 4).toUInt(false);
        footer._itemSize = data.mid(12, 4).toUInt(false)  - ApeTagFooter.size;
        footer._itemCount = data.mid(16, 4).toUInt(false);
        footer._flags = <ApeTagFooterFlags> data.mid(20, 4).toUInt(false);
        return footer;
    }

    /**
     * Constructs and initializes a new, blank instance of {@see ApeTagFooter}.
     */
    public static fromEmpty(): ApeTagFooter {
        const footer = new ApeTagFooter();

        // Always default to version 2000
        footer._version = 2000;
        return footer;
    }

    // #endregion

    // #region Properties

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
     * Gets the size in bytes of the items contained in the tag represented by this footer.
     */
    public get itemSize(): number { return this._itemSize; }
    /**
     * Sets the size in bytes of the items contained in the tag represented by this footer.
     * @param value
     */
    public set itemSize(value: number) {
        Guards.uint(value, "value");
        this._itemSize = value;
    }

    /**
     * Gets the complete size of the tag represented by the current instance, including the header
     * and footer.
     */
    public get tagSize(): number {
        // @TODO: Shouldn't this take into consideration footer missing flags?
        return this._itemSize + ApeTagFooter.size +
            ((this._flags & ApeTagFooterFlags.HeaderPresent) !== 0 ? ApeTagFooter.size : 0);
    }

    /**
     * Gets the version of APE tag described by the current isntance.
     */
    public get version(): number { return this._version === 0 ? 2000 : this._version; }

    // #endregion

    // #region Methods

    public renderFooter(): ByteVector {
        return this.render(false);
    }

    public renderHeader(): ByteVector {
        return (this.flags & ApeTagFooterFlags.HeaderPresent) !== 0
            ? this.render(true)
            : ByteVector.empty();
    }

    private render(isHeader: boolean): ByteVector {
        const v = ByteVector.concatenate(
            // File identifier
            ApeTagFooter.fileIdentifier,

            // Add the version number -- we always render a 2.000 tag regardless of what the tag
            // originally was.
            ByteVector.fromUInt(2000, false),

            // Add the tag size
            ByteVector.fromUInt(this.itemSize + ApeTagFooter.size, false),

            // Add the item count
            ByteVector.fromUInt(this.itemCount, false)
        );

        // Render and add the flags
        let flags = 0;
        if ((this.flags & ApeTagFooterFlags.HeaderPresent) !== 0) {
            flags = (flags | ApeTagFooterFlags.HeaderPresent) >>> 0; // @TODO: Replace all bitwise logic with >>> 0
        }

        // Footer is always present
        if (isHeader) {
            flags = (flags | ApeTagFooterFlags.IsHeader) >>> 0;
        } else {
            flags = (flags & ~ApeTagFooterFlags.IsHeader) >>> 0;
        }
        v.addByteVector(ByteVector.fromUInt(flags, false));

        // Add the reserved 64bit
        v.addByteVector(ByteVector.fromSize(8));

        return v;
    }

    // #endregion
}
