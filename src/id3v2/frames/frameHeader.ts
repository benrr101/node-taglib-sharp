import SyncData from "../syncData";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError, NotImplementedError} from "../../errors";
import {FrameIdentifier, FrameIdentifiers} from "../frameIdentifiers";
import {Guards, NumberUtils} from "../../utils";

/**
 * Indicates the flags applied to a {@link Id3v2FrameHeader} object.
 */
export enum Id3v2FrameFlags {
    /**
     * Header contains no flags.
     */
    None = 0,

    /**
     * Frame is to be deleted if the tag is altered.
     */
    TagAlterPreservation = 0x4000,

    /**
     * Frame is to be deleted if the file is altered.
     */
    FileAlterPreservation = 0x2000,

    /**
     * Frame is read-only and should not be altered.
     */
    ReadOnly = 0x1000,

    /**
     * Frame has a grouping identity.
     */
    GroupingIdentity = 0x0040,

    /**
     * Frame data is compressed.
     */
    Compression = 0x0008,

    /**
     * Frame data is encrypted.
     */
    Encryption = 0x0004,

    /**
     * Frame data has been unsynchronized using the ID3v2 unsynchronization scheme.
     */
    Unsynchronized = 0x0002,

    /**
     * Frame has a data length indicator.
     */
    DataLengthIndicator = 0x0001
}

/**
 * This class provides a representation of an ID3v2 frame header which can be read from and
 * written to disk.
 * @remarks
 *     ID3v2.3 and ID3v2.4 support optional fields for grouping, encryption, and compression. This
 *     class only represents the basic header that all frames will contain. For this library, these
 *     optional fields are considered part of the frame's body. However, care must be taken that
 *     when reading the frame, these optional fields are processed as well. Use {@link flags} to
 *     determine if the frame contains these optional fields.
 */
export class Id3v2FrameHeader {
    private readonly _frameId: FrameIdentifier;

    private _dataLength: number;
    private _encryptionId: number;
    private _flags: Id3v2FrameFlags;
    private _frameSize: number;
    private _groupId: number;

    /**
     * Constructs and initializes a new instance by processing the data for the frame header.
     * @param id Identifier of the frame
     * @param flags Flags to assign to the frame (if omitted, defaults to
     *     {@link Id3v2FrameFlags.None})
     * @param frameSize Size of the frame in bytes, excluding the size of the header (if omitted,
     *     defaults to 0)
     */
    // @TODO: This shouldn't be public?
    public constructor(id: FrameIdentifier, flags: Id3v2FrameFlags = Id3v2FrameFlags.None, frameSize: number = 0) {
        Guards.truthy(id, "id");
        Guards.uint(frameSize, "frameSize");

        this._frameId = id;
        this._frameSize = frameSize;

        if (NumberUtils.hasFlag(flags, (Id3v2FrameFlags.Compression | Id3v2FrameFlags.Encryption))) {
            throw new NotImplementedError("Argument invalid: Encryption and compression are not supported");
        }

        this._flags = flags;
    }

    /**
     * Constructs and initializes a new instance of {@link Id3v2FrameHeader} by reading it from raw
     * header data of a specified version.
     * @param data Raw data to build the new instance from.
     *     If the data size is smaller than the size of a full header, the data is just treated as
     *     a frame identifier and the remaining values are zeroed. @TODO: Why?? Why needs that functionality?
     * @param version ID3v2 version with which the data in `data` was encoded.
     */
    public static fromData(data: ByteVector, version: number): Id3v2FrameHeader {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");
        Guards.betweenInclusive(version, 2, 4, "version");

        let rawFrameId: string;
        let frameId: FrameIdentifier;
        let flags = 0;
        let frameSize = 0;
        switch (version) {
            case 2:
                if (data.length < 3) {
                    throw new CorruptFileError("Data must contain at least a 3 byte frame identifier");
                }

                // Set frame ID -- first 3 bytes
                rawFrameId = data.subarray(0, 3).toString(StringType.Latin1);
                frameId = FrameIdentifiers[rawFrameId] || new FrameIdentifier(undefined, undefined, rawFrameId);

                // If the full header information was not passed in, do not continue to the steps
                // to parse the frame size and flags.
                if (data.length < 6) {
                    break;
                }

                frameSize = data.subarray(3, 3).toUint();
                break;

            case 3:
                if (data.length < 4) {
                    throw new CorruptFileError("Data must contain at least a 4 byte frame identifier");
                }

                // Set the frame ID -- first 4 bytes
                rawFrameId = data.subarray(0, 4).toString(StringType.Latin1);
                frameId = FrameIdentifiers[rawFrameId] || new FrameIdentifier(undefined, rawFrameId, undefined);

                // If the full header information was not passed in, do not continue to the steps
                // to parse the frame size and flags.
                if (data.length < 10) {
                    break;
                }

                // Store the flags internally as version 2.4
                frameSize = data.subarray(4, 4).toUint();
                flags = NumberUtils.uintOr(
                    NumberUtils.uintAnd(NumberUtils.uintLShift(data.get(8), 7), 0x7000),
                    NumberUtils.uintAnd(NumberUtils.uintRShift(data.get(9), 4), 0x000C),
                    NumberUtils.uintAnd(NumberUtils.uintLShift(data.get(9), 1), 0x0040)
                );
                break;

            case 4:
                if (data.length < 4) {
                    throw new CorruptFileError("Data must contain at least 4 byte frame identifier");
                }

                // Set the frame ID -- the first 4 bytes
                rawFrameId = data.subarray(0, 4).toString(StringType.Latin1);
                frameId = FrameIdentifiers[rawFrameId] || new FrameIdentifier(rawFrameId, undefined, undefined);

                // If the full header information was not passed in, do not continue to the steps to
                // ... eh, you probably get it by now.
                if (data.length < 10) {
                    break;
                }

                frameSize = SyncData.toUint(data.subarray(4, 4));
                flags = data.subarray(8, 2).toUshort();
                break;
        }

        return new Id3v2FrameHeader(frameId, flags, frameSize);
    }

    /**
     * Constructs and initializes a new, blank frame header of size 0, with the
     * provided frame identifier.
     * @param id Identifier for the frame
     */
    public static fromFrameIdentifier(id: FrameIdentifier): Id3v2FrameHeader {
        return new Id3v2FrameHeader(id, Id3v2FrameFlags.None, 0);
    }

    // #region Properties

    /**
     * Gets the length of the fields in the frame. This is only updated during rendering.
     * @internal
     */
    public get dataLength(): number|undefined { return this._dataLength; }
    /**
     * Sets the length of the fields in the frame (the payload, without the extended header bytes).
     * This is only intended to be updated during rendering.
     * @internal
     */
    public set dataLength(value: number|undefined) {
        Guards.safeUintOptional(value, "value");
        this._dataLength = value;
    }

    /**
     * Gets the encryption ID applied to the current instance.
     * @returns
     *     Value containing the encryption identifier for the current instance or
     *     `undefined` if not set.
     */
    public get encryptionId(): number|undefined {
        return NumberUtils.hasFlag(this.flags, Id3v2FrameFlags.Encryption)
            ? this._encryptionId
            : undefined;
    }
    /**
     * Sets the encryption ID applied to the current instance.
     * @param value Value containing the encryption identifier for the current instance. Must be an
     *     8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID
     */
    public set encryptionId(value: number|undefined) {
        Guards.byteOptional(value, "value");
        if (value !== undefined) {
            throw new NotImplementedError("Encryption and compression are not supported");
        } else {
            this._encryptionId = value;
            this._flags &= ~Id3v2FrameFlags.Encryption;
        }
    }

    /**
     * Gets the flags applied to the current instance.
     */
    public get flags(): Id3v2FrameFlags { return this._flags; }
    /**
     * @TODO: It should not be necessary to update the flags manually like this.
     * @internal
     */
    public set flags(value: Id3v2FrameFlags) { this._flags = value; }

    /**
     * Gets the identifier of the frame described by the current instance.
     */
    public get frameId(): FrameIdentifier { return this._frameId; }

    /**
     * Gets the size of the frame described by the current instance, minus the header.
     */
    public get frameSize(): number { return this._frameSize; }
    /**
     * Sets the size of the frame described by the current instance, minus the header.
     * Must be a positive, safe integer.
     */
    public set frameSize(value: number) {
        Guards.safeUint(value, "value");
        this._frameSize = value;
    }

    /**
     * Gets the grouping ID applied to the current instance.
     * @returns
     *     Value containing the grouping identifier for the current instance, or
     *     `undefined` if not set.
     */
    public get groupId(): number | undefined {
        return NumberUtils.hasFlag(this.flags, Id3v2FrameFlags.GroupingIdentity)
            ? this._groupId
            : undefined;
    }
    /**
     * Sets the grouping ID applied to the current instance.
     * @param value Grouping identifier for the current instance. Must be an 8-bit unsigned integer.
     *     Setting to `undefined` will remove the grouping identity header and ID
     */
    public set groupId(value: number | undefined) {
        Guards.byteOptional(value, "value");
        this._groupId = value;
        if (value !== undefined) {
            this._flags |= Id3v2FrameFlags.GroupingIdentity;
        } else {
            this._flags &= ~Id3v2FrameFlags.GroupingIdentity;
        }
    }

    public get isUnsynchronizationApplied(): boolean {
        return NumberUtils.hasFlag(this._flags, Id3v2FrameFlags.Unsynchronized);
    }

    // #endregion

    // #region Public Methods

    /**
     * Gets the size of a header for a specified ID3v2 version.
     * @param version Version of ID3v2 to get the size for. Must be a positive integer < 256
     */
    public static getBaseSize(version: number): number {
        Guards.byte(version, "version");
        return version < 3 ? 6 : 10;
    }

    /**
     * Reads any extended header fields from the frame's payload bytes. Fields to read are
     * determined by the flags initially read for the freame header.
     * @param payloadBytes Frame's payload from which the extended header bytes will be read. These
     *     bytes must be resynchronized if the frame was marked as unsynchronized.
     * @param version ID3v2 version. Must be a byte.
     * @returns number Number of bytes for the extended frame header fields.
     */
    public readExtendedHeaderFromPayloadBytes(payloadBytes: ByteVector, version: number): number {
        Guards.truthy(payloadBytes, "payloadBytes");
        Guards.byte(version, "version");

        let position = 0;
        switch (version) {
            case 2:
                break;
            case 3:
                if (NumberUtils.hasFlag(this._flags, Id3v2FrameFlags.Compression)) {
                    this._dataLength = this.getFieldBytes(payloadBytes, position, 4).toUint();
                    position += 4;
                }
                if (NumberUtils.hasFlag(this._flags, Id3v2FrameFlags.Encryption)) {
                    this._encryptionId = this.getFieldBytes(payloadBytes, position, 1).get(0);
                    position++;
                }
                if (NumberUtils.hasFlag(this._flags, Id3v2FrameFlags.GroupingIdentity)) {
                    this._groupId = this.getFieldBytes(payloadBytes, position, 1).get(0);
                    position++
                }
                break;
            case 4:
                if (NumberUtils.hasFlag(this._flags, Id3v2FrameFlags.GroupingIdentity)) {
                    this._groupId = this.getFieldBytes(payloadBytes, position, 1).get(0);
                    position++;
                }
                if (NumberUtils.hasFlag(this._flags, Id3v2FrameFlags.Encryption)) {
                    this._encryptionId = this.getFieldBytes(payloadBytes, position, 1).get(0);
                    position++;
                }
                if (NumberUtils.hasFlag(this._flags, Id3v2FrameFlags.DataLengthIndicator)) {
                    this._dataLength = this.getFieldBytes(payloadBytes, position, 4).toUint();
                    position += 4;
                }
                break;
            default:
                throw new Error("Argument error: version must be a valid ID3v2 version.");
        }

        return position;
    }

    public clone(identifier?: FrameIdentifier): Id3v2FrameHeader {
        const clone = new Id3v2FrameHeader(identifier ?? this.frameId);
        clone._dataLength = this._dataLength;
        clone._encryptionId = this._encryptionId;
        clone._frameSize = this._frameSize;
        clone._flags = this._flags;
        clone._groupId = this._groupId;

        return clone;
    }

    /**
     * Renders the current instance, encoded in a specified ID3v2 version.
     * @param version Version of ID3v2 to use when encoding the current instance.
     */
    public render(version: number): ByteVector {
        Guards.byte(version, "version");
        Guards.betweenInclusive(version, 2, 4, "version");

        // Start by rendering the frame identifier
        const byteVectors = [this._frameId.render(version)];

        switch (version) {
            case 2:
                byteVectors.push(ByteVector.fromUint(this._frameSize).subarray(1, 3));
                break;

            case 3:
                const newFlags = NumberUtils.uintOr(
                    NumberUtils.uintAnd(NumberUtils.uintLShift(this._flags, 1), 0xE000),
                    NumberUtils.uintAnd(NumberUtils.uintLShift(this._flags, 4), 0x00C0),
                    NumberUtils.uintAnd(NumberUtils.uintRShift(this._flags, 1), 0x0020)
                );

                byteVectors.push(ByteVector.fromUint(this._frameSize));
                byteVectors.push(ByteVector.fromUshort(newFlags));
                break;

            case 4:
                byteVectors.push(SyncData.fromUint(this._frameSize));
                byteVectors.push(ByteVector.fromUshort(this._flags));
                break;
        }

        return ByteVector.concatenate(... byteVectors);
    }

    public renderExtendedHeader(version: number): ByteVector {
        const fieldVectors = [];
        switch (version) {
            case 2:
                break;
            case 3:
                if (NumberUtils.hasFlag(this._flags, Id3v2FrameFlags.Compression)) {
                    throw new NotImplementedError("Compression is not supported.");
                }
                if (NumberUtils.hasFlag(this._flags, Id3v2FrameFlags.Encryption)) {
                    throw new NotImplementedError("Encryption is not supported");
                }
                if (NumberUtils.hasFlag(this._flags, Id3v2FrameFlags.GroupingIdentity)) {
                    fieldVectors.push(ByteVector.fromByte(this._groupId));
                }
                break;
            case 4:
                if (NumberUtils.hasFlag(this._flags, Id3v2FrameFlags.GroupingIdentity)) {
                    fieldVectors.push(ByteVector.fromByte(this._groupId));
                }
                if (NumberUtils.hasFlag(this._flags, Id3v2FrameFlags.Encryption)) {
                    throw new NotImplementedError("Encryption is not supported");
                }
                if (NumberUtils.hasFlag(this._flags, Id3v2FrameFlags.DataLengthIndicator)) {
                    // @TODO: Properly update this field.
                    fieldVectors.push(ByteVector.fromUint(this._dataLength));
                }
                break;
        }

        return ByteVector.concatenate(... fieldVectors);
    }

    // #endregion

    private getFieldBytes(payloadBytes: ByteVector, position: number, length: number): ByteVector {
        const fieldBytes = payloadBytes.subarray(position, length);
        if (fieldBytes.length < length) {
            throw new CorruptFileError(
                "ID3v2 frame extended header does not contain enough bytes for fields set by flags"
            );
        }

        return fieldBytes;
    }
}
