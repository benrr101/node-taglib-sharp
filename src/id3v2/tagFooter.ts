import Id3v2Settings from "./id3v2Settings";
import SyncData from "./syncData";
import TagHeader from "./tagHeader";
import {ByteVector, StringType} from "../byteVector";
import {Id3v2Version, TagFlags} from "./enums";
import {CorruptFileError} from "../errors";
import {Guards, NumberUtils} from "../utils";

/**
 * This class provides a representation of an ID3v2 tag footer which can be read from and written
 * to disk.
 */
export default class TagFooter {
    /**
     * Identifier used to recognize an ID3v2 footer.
     */
    public static readonly FILE_IDENTIFIER = ByteVector.fromString("3DI", StringType.Latin1).makeReadOnly();

    private _flags: TagFlags = TagFlags.FooterPresent;
    private _majorVersion: Id3v2Version;
    private _revisionNumber: number;
    private _tagSize: number;

    /**
     * Constructs and initializes a new instance by reading it from raw footer data.
     * @param data Raw data to build the instance from
     */
    public static fromData(data: ByteVector): TagFooter {
        Guards.truthy(data, "data");
        if (data.length < Id3v2Settings.footerSize) {
            throw new CorruptFileError("Provided data is smaller than object size.");
        }
        if (!data.startsWith(TagFooter.FILE_IDENTIFIER)) {
            throw new CorruptFileError("Provided data does not start with the file identifier");
        }

        const footer = new TagFooter();

        const majorVersion = data.get(3);
        if (majorVersion < 2 || majorVersion > 4) {
            throw new CorruptFileError(`Id3v2 footer has invalid version: ${majorVersion}`);
        }
        footer._majorVersion = <Id3v2Version>majorVersion;

        footer._revisionNumber = data.get(4);
        footer._flags = data.get(5);

        // TODO: Is there any point to supporting footers on versions less than 4?
        if (footer._majorVersion === Id3v2Version.V22 && NumberUtils.hasFlag(footer._flags, 127)) {
            throw new CorruptFileError("Invalid flags set on version 2 tag");
        }
        if (footer._majorVersion === Id3v2Version.V23 && NumberUtils.hasFlag(footer._flags, 15)) {
            throw new CorruptFileError("Invalid flags set on version 3 tag");
        }
        if (footer._majorVersion === Id3v2Version.V24 && NumberUtils.hasFlag(footer._flags, 7)) {
            throw new CorruptFileError("Invalid flags set on version 4 tag");
        }

        for (let i = 6; i < 10; i++) {
            if (data.get(i) >= 128) {
                throw new CorruptFileError("One of the bytes in the header was greater than the allowed 128");
            }
        }

        footer.tagSize = SyncData.toUint(data.subarray(6, 4));

        return footer;
    }

    /**
     * Constructs and initializes a new footer based on the contents of the header used for the
     * same tag.
     * @param header Header from which to base the new footer
     */
    public static fromHeader(header: TagHeader): TagFooter {
        Guards.truthy(header, "header");

        const footer = new TagFooter();
        footer._majorVersion = header.majorVersion;
        footer._revisionNumber = header.revisionNumber;
        footer._flags = header.flags | TagFlags.FooterPresent;
        footer._tagSize = header.tagSize;

        return footer;
    }

    // #region Properties

    /**
     * Gets the complete size of the tag described by the current instance including the header
     * and footer.
     */
    public get completeTagSize(): number {
        return this.tagSize + Id3v2Settings.headerSize + Id3v2Settings.footerSize;
    }

    /**
     * Gets the flags applied to the current instance.
     */
    public get flags(): TagFlags { return this._flags; }
    /**
     * Sets the flags applied to the current instance.
     * @param value Bitwise combined {@link Id3v2TagHeaderFlags} value containing the flags to apply
     *     to the current instance.
     */
    public set flags(value: TagFlags) {
        const version3Flags = TagFlags.ExtendedHeader | TagFlags.ExperimentalIndicator;
        if (NumberUtils.hasFlag(value, version3Flags) && this.majorVersion === Id3v2Version.V22) {
            throw new Error("Feature only supported in version 2.3+");
        }
        const version4Flags = TagFlags.FooterPresent;
        if (NumberUtils.hasFlag(value, version4Flags) && this.majorVersion !== Id3v2Version.V24) {
            throw new Error("Feature only supported in version 2.4+");
        }

        this._flags = value;
    }

    /**
     * Sets the major version of the tag described by the current instance.
     */
    public get majorVersion(): Id3v2Version { return this._majorVersion; }
    /**
     * Sets the major version of the tag described by the current instance.
     * When the version is set, unsupported header flags will automatically be removed from the
     * tag.
     * @param value ID3v2 version if tag described by the current instance. Footers are only
     *     supported with version 4, so this value can only be 4.
     */
    public set majorVersion(value: Id3v2Version) {
        if (value !== Id3v2Version.V24) {
            throw new Error("Argument out of range: Version unsupported");
        }
        this._majorVersion = value;
    }

    /**
     * Gets the version revision number of the tag represented by the current instance.
     */
    public get revisionNumber(): number { return this._revisionNumber; }
    /**
     * Sets the version revision number of the tag represented by the current instance.
     * This value should always be zero. Non-zero values indicate an experimental or new version of
     * the format which may not be completely understood by the current version of
     * node-taglib-sharp. Some software may refuse to read tags with a non-zero value.
     * @param value Version revision number of the tag represented by the current instance. Must be
     *     an 8-bit unsigned integer.
     */
    public set revisionNumber(value: number) {
        Guards.byte(value, "value");
        this._revisionNumber = value;
    }

    /**
     * Gets the complete size of the tag described by the current instance, minus the header and
     * footer.
     */
    public get tagSize(): number { return this._tagSize; }
    /**
     * Sets the complete size of the tag described by the current instance, minus the header
     * footer. NOTE THIS MUST BE AN 28-BIT UNSIGNED INTEGER.
     * @param value Size of the tag in bytes. Must be an unsigned 28-bit integer
     */
    public set tagSize(value: number) {
        Guards.uint(value, "value");
        if (NumberUtils.hasFlag(value, 0xF0000000)) {
            throw new Error("Argument out of range: value must be a 28-bit unsigned integer");
        }

        this._tagSize = value;
    }

    // #endregion

    /**
     * Renders the current instance as a raw byte vector.
     */
    public render(): ByteVector {
        return ByteVector.concatenate(
            TagFooter.FILE_IDENTIFIER,
            this.majorVersion,
            this.revisionNumber,
            this.flags,
            SyncData.fromUint(this.tagSize)
        );
    }
}
