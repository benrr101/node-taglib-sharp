import CorruptFileError from "../corruptFileError";
import Footer from "./footer";
import HeaderFlags from "./headerFlags";
import Id3v2Tag from "./id3v2Tag";
import SyncData from "./syncData";
import {ByteVector} from "../byteVector";
import {Guards} from "../utils";

export default class Header {
    private static readonly _size: number = 10;
    private static readonly _fileIdentifier: ByteVector = ByteVector.fromString("ID3", undefined, undefined, true);
    private _flags: HeaderFlags;
    private _majorVersion: number;
    private _revisionNumber: number;
    private _tagSize: number;

    /**
     * Constructs and initializes a new instance by reading it from the raw header data.
     * @param data Object containing the raw data to build the new instance from.
     */
    public constructor(data: ByteVector) {
        Guards.truthy(data, "data");
        if (data.length < Header.size) {
            throw new CorruptFileError("Provided data is smaller than object size");
        }
        if (!data.startsWith(Header.fileIdentifier)) {
            throw new CorruptFileError("Provided data does not start with the file identifier");
        }

        this._majorVersion = data.get(3);
        this._revisionNumber = data.get(4);
        this._flags = data.get(5);

        if (this._majorVersion === 2 && (this._flags & 127) > 0) {
            throw new CorruptFileError("Invalid flags set on version 2 tag");
        }
        if (this._majorVersion === 3 && (this._flags & 15) > 0) {
            throw new CorruptFileError("Invalid flags set on version 3 tag");
        }
        if (this._majorVersion === 4 && (this._flags & 7) > 0) {
            throw new CorruptFileError("Invalid flags set on version 4 tag");
        }

        for (let i = 6; i < 10; i++) {
            if (data.get(i) >= 128) {
                throw new CorruptFileError("One of the bytes in the header was greater than the allowed 128");
            }
        }

        this.tagSize = SyncData.toUint(data.mid(6, 4));
    }

    // #region Properties

    /**
     * The identifier used to recognize an ID3v2 header.
     */
    public static get fileIdentifier(): ByteVector { return Header._fileIdentifier; }

    /**
     * Size of an ID3v2 header.
     */
    public static get size(): number { return Header._size; }

    /**
     * Gets the complete size of the tag described by the current instance including the header
     * and footer.
     */
    public get completeTagSize(): number {
        return (this._flags & HeaderFlags.FooterPresent) > 0
            ? this.tagSize + Header.size + Footer.size
            : this.tagSize + Header.size;
    }

    /**
     * Gets the flags applied to the current instance.
     */
    public get flags(): HeaderFlags { return this._flags; }
    /**
     * Sets the flags applied to the current instance.
     * @param value Bitwise combined {@see HeaderFlags} value containing the flags to apply to the
     *     current instance.
     */
    public set flags(value: HeaderFlags) {
        const version3Flags = HeaderFlags.ExtendedHeader | HeaderFlags.ExperimentalIndicator;
        if ((value & version3Flags) > 0 && this.majorVersion < 3) {
            throw new Error("Feature only supported in version 2.3+");
        }
        const version4Flags = HeaderFlags.FooterPresent;
        if ((value & version4Flags) > 0 && this.majorVersion < 4) {
            throw new Error("Feature only supported in version 2.4+");
        }

        this._flags = value;
    }

    /**
     * Gets the major version of the tag described by the current instance.
     */
    public get majorVersion(): number {
        return this._majorVersion === 0
            ? Id3v2Tag.defaultVersion
            : this._majorVersion;
    }
    /**
     * Sets the major version of the tag described by the current instance.
     * When the version is set, unsupported header flags will automatically be removed from the
     * tag.
     * @param value ID3v2 version of tag. Must be a positive 8-bit integer between 2 and 4.
     */
    public set majorVersion(value: number) {
        Guards.byte(value, "value");
        Guards.between(value, 2, 4, "value");

        if (value < 3) {
            this._flags &= ~(HeaderFlags.ExtendedHeader | HeaderFlags.ExperimentalIndicator);
        }
        if (value < 4) {
            this._flags &= ~HeaderFlags.FooterPresent;
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
     * footer.
     * @param value Size of the tag in bytes. Must be an unsigned 32-bit integer
     */
    public set tagSize(value: number) {
        Guards.uint(value, "value");
        this._tagSize = value;
    }

    // #endregion

    /**
     * Renders the current instance as a raw ID3v2 header
     */
    public render(): ByteVector {
        return ByteVector.concatenate(
            Header.fileIdentifier,
            this.majorVersion,
            this.revisionNumber,
            this.flags,
            SyncData.fromUint(this.tagSize)
        );
    }
}