import Id3v2Settings from "./id3v2Settings";
import SyncData from "./syncData";
import {ByteVector, StringType} from "../byteVector";
import {Id3v2Version, TagFlags} from "./enums";
import {CorruptFileError} from "../errors";
import {Guards, NumberUtils} from "../utils";

/**
 * This class provides a representation of an ID3v2 tag header which can be read from and written
 * to disk.
 */
export default class TagHeader {
    /**
     * The identifier used to recognize an ID3v2 header.
     */
    public static readonly FILE_IDENTIFIER = ByteVector.fromString("ID3", StringType.Latin1).makeReadOnly();

    private _flags: TagFlags;
    private _majorVersion: Id3v2Version;
    private _revisionNumber: number;
    private _tagSize: number;

    // #region Constructors

    /**
     * Constructs and initializes a new instance by storing the fields.
     * @param majorVersion Major ID3v2 version (ie, 2, 3, or 4). See {@link majorVersion}.
     * @param revisionVersion Revision of ID2v2.whatever. See {@link revisionVersion}.
     * @param flags Tag flags. See {@link flags}.
     * @param tagSize Size of the tag in bytes as it currently exists on the disk. See {@link tagSize}.
     * @internal
     */
    public constructor(majorVersion: Id3v2Version, revisionVersion: number, flags: TagFlags, tagSize: number) {
        this._majorVersion = majorVersion;

        this.flags = flags;
        this.revisionNumber = revisionVersion;
        this.tagSize = tagSize;
    }

    /**
     * Constructs and initializes a new instance by reading it from the raw header data.
     * @param data Object containing the raw data to build the new instance from.
     */
    public static fromData(data: ByteVector): TagHeader {
        Guards.truthy(data, "data");
        if (data.length < Id3v2Settings.headerSize) {
            throw new CorruptFileError("Provided data is smaller than object size");
        }
        if (!data.startsWith(TagHeader.FILE_IDENTIFIER)) {
            throw new CorruptFileError("Provided data does not start with the file identifier");
        }

        const majorVersionNumber = data.get(3);
        if (majorVersionNumber > 4 || majorVersionNumber < 2) {
            throw new CorruptFileError(`ID3v2 tag header has an invalid version: ${majorVersionNumber}`);
        }
        const majorVersion = <Id3v2Version>majorVersionNumber;

        const revisionNumber = data.get(4);
        const flags = data.get(5);

        // Make sure flags provided are legal
        if (majorVersion === Id3v2Version.V22 && NumberUtils.hasFlag(flags, 63)) {
            throw new CorruptFileError("Invalid flags set on version 2 tag");
        }
        if (majorVersion === Id3v2Version.V23 && NumberUtils.hasFlag(flags, 15)) {
            throw new CorruptFileError("Invalid flags set on version 3 tag");
        }
        if (majorVersion === Id3v2Version.V24 && NumberUtils.hasFlag(flags, 7)) {
            throw new CorruptFileError("Invalid flags set on version 4 tag");
        }

        // Make sure the bytes for the size of the tag are legal
        // @TODO: Create a helper that checks and returns valid value or throws
        for (let i = 6; i < 10; i++) {
            if (data.get(i) >= 128) {
                throw new CorruptFileError("One of the bytes in the tag size was greater than the allowed 128");
            }
        }
        const tagSize = SyncData.toUint(data.subarray(6, 4));

        return new TagHeader(majorVersion, revisionNumber, flags, tagSize);
    }

    // #endregion

    // #region Properties

    /**
     * Gets the complete size of the tag described by the current instance including the header
     * and footer.
     */
    public get completeTagSize(): number {
        return NumberUtils.hasFlag(this._flags, TagFlags.FooterPresent)
            ? this.tagSize + Id3v2Settings.headerSize + Id3v2Settings.footerSize
            : this.tagSize + Id3v2Settings.headerSize;
    }

    /**
     * Gets the flags applied to the current instance.
     */
    public get flags(): TagFlags { return this._flags; }
    /**
     * Sets the flags applied to the current instance.
     * @param value Bitwise combined {@link Id3v2TagHeaderFlags} value containing the flags to apply to the
     *     current instance.
     */
    public set flags(value: TagFlags) {
        // @TODO: Does it make sense to check for flags for major version <4?
        const version3Flags = TagFlags.ExtendedHeader | TagFlags.ExperimentalIndicator;
        if (NumberUtils.hasFlag(value, version3Flags) && this._majorVersion === Id3v2Version.V22) {
            throw new Error("Feature only supported in version 2.3+");
        }
        const version4Flags = TagFlags.FooterPresent;
        if (NumberUtils.hasFlag(value, version4Flags) && this._majorVersion !== Id3v2Version.V24) {
            throw new Error("Feature only supported in version 2.4+");
        }

        this._flags = value;
    }

    /**
     * Gets the major version of the tag described by the current instance.
     */
    public get majorVersion(): Id3v2Version {
        return this._majorVersion === undefined || Id3v2Settings.forceDefaultVersion
            ? Id3v2Settings.defaultVersion
            : this._majorVersion;
    }
    /**
     * Sets the major version of the tag described by the current instance.
     * When the version is set, unsupported header flags will automatically be removed from the
     * tag.
     * @param value ID3v2 version of tag
     */
    public set majorVersion(value: Id3v2Version) {
        if (value === Id3v2Version.V22) {
            this._flags &= ~(TagFlags.ExtendedHeader | TagFlags.ExperimentalIndicator);
        }
        if (value !== Id3v2Version.V24) {
            this._flags &= ~TagFlags.FooterPresent;
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
     * footer. NOTE THIS MUST BE A 28-BIT UNSIGNED INTEGER.
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
     * Renders the current instance as a raw ID3v2 header
     */
    public render(): ByteVector {
        return ByteVector.concatenate(
            TagHeader.FILE_IDENTIFIER,
            this.majorVersion,
            this.revisionNumber,
            this.flags,
            SyncData.fromUint(this.tagSize)
        );
    }
}
