import SyncData from "../syncData";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Guards} from "../../utils";
import {FrameIdentifier, FrameIdentifiers} from "../frameIdentifiers";

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
     * Frame data has been desynchronized.
     */
    Desynchronized = 0x0002,

    /**
     * Frame has a data length indicator.
     */
    DataLengthIndicator = 0x0001
}

export class Id3v2FrameHeader {
    private _flags: Id3v2FrameFlags;
    private _frameId: FrameIdentifier;
    private _frameSize: number;

    /**
     * Constructs and initializes a new instance by processing the data for the frame header.
     * @param id Identifier of the frame
     * @param flags Flags to assign to the frame (if omitted, defaults to
     *     {@link Id3v2FrameFlags.None})
     * @param frameSize Size of the frame in bytes, excluding the size of the header (if omitted,
     *     defaults to 0)
     */
    public constructor(id: FrameIdentifier, flags: Id3v2FrameFlags = Id3v2FrameFlags.None, frameSize: number = 0) {
        Guards.truthy(id, "id");
        Guards.uint(frameSize, "frameSize");

        this._frameId = id;
        this._frameSize = frameSize;
        this.flags = flags; // Force the compression/encryption checks
    }

    /**
     * Constructs and initializes a new instance of {@link Id3v2FrameHeader} by reading it from raw
     * header data of a specified version.
     * @param data Raw data to build the new instance from.
     *     If the data size is smaller than the size of a full header, the data is just treated as
     *     a frame identifier and the remaining values are zeroed.
     * @param version ID3v2 version with which the data in `data` was encoded.
     */
    public static fromData(data: ByteVector, version: number): Id3v2FrameHeader {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");
        Guards.betweenInclusive(version, 2, 4, "version");

        if (data.length < (version === 2 ? 3 : 4)) {
            throw new Error("Data must contain at least a frame ID");
        }

        let frameId;
        let flags = 0;
        let frameSize = 0;
        switch (version) {
            case 2:
                if (data.length < 3) {
                    throw new CorruptFileError("Data must contain at least a 3 byte frame identifier");
                }

                // Set frame ID -- first 3 bytes
                frameId = FrameIdentifiers[data.toString(3, StringType.Latin1)];

                // If the full header information was not passed in, do not continue to the steps
                // to parse the frame size and flags.
                if (data.length < 6) {
                    break;
                }

                frameSize = data.mid(3, 3).toUint();
                break;

            case 3:
                if (data.length < 4) {
                    throw new CorruptFileError("Data must contain at least a 4 byte frame identifier");
                }

                // Set the frame ID -- first 4 bytes
                frameId = FrameIdentifiers[data.toString(4, StringType.Latin1)];

                // If the full header information was not passed in, do not continue to the steps
                // to parse the frame size and flags.
                if (data.length < 10) {
                    break;
                }

                // Store the flags internally as version 2.4
                frameSize = data.mid(4, 4).toUint();
                flags = ((data.get(8) << 7) & 0x7000)
                    | ((data.get(9) >> 4) & 0x000C)
                    | ((data.get(9) << 1) & 0x0040);
                break;

            case 4:
                if (data.length < 4) {
                    throw new CorruptFileError("Data must contain at least 4 byte frame identifier");
                }

                // Set the frame ID -- the first 4 bytes
                frameId = FrameIdentifiers[data.toString(4, StringType.Latin1)];

                // If the full header information was not passed in, do not continue to the steps to
                // ... eh, you probably get it by now.
                if (data.length < 10) {
                    return;
                }

                frameSize = SyncData.toUint(data.mid(4, 4));
                flags = data.mid(8, 2).toUShort();
                break;
        }

        return new Id3v2FrameHeader(frameId, flags, frameSize);
    }

    public static fromFrameIdentifier(id: FrameIdentifier): Id3v2FrameHeader {
        return new Id3v2FrameHeader(id, Id3v2FrameFlags.None, 0);
    }

    // #region Properties

    /**
     * Gets the flags applied to the current instance.
     */
    public get flags(): Id3v2FrameFlags { return this._flags; }
    /**
     * Sets the flags applied to the current instance.
     */
    public set flags(value: Id3v2FrameFlags) {
        if ((value & (Id3v2FrameFlags.Compression | Id3v2FrameFlags.Encryption)) !== 0) {
            throw new Error("Argument invalid: Encryption and compression are not supported");
        }
        this._flags = value;
    }

    /**
     * Gets the identifier of the frame described by the current instance.
     */
    public get frameId(): FrameIdentifier { return this._frameId; }
    /**
     * Sets the identifier of the frame described by the current instance.
     */
    public set frameId(value: FrameIdentifier) {
        Guards.truthy(value, "value");
        this._frameId = value;
    }

    /**
     * Gets the size of the frame described by the current instance, minus the header.
     */
    public get frameSize(): number { return this._frameSize; }
    /**
     * Sets the size of the frame described by the current instance, minus the header.
     * Must be a positive, safe integer.
     */
    public set frameSize(value: number) {
        Guards.uint(value, "value");
        this._frameSize = value;
    }

    // #endregion

    // #region Public Methods

    /**
     * Gets the size of a header for a specified ID3v2 version.
     * @param version Version of ID3v2 to get the size for. Must be a positive integer < 256
     */
    public static getSize(version: number) {
        Guards.byte(version, "version");
        return version < 3 ? 6 : 10;
    }

    /**
     * Renders the current instance, encoded in a specified ID3v2 version.
     * @param version Version of ID3v2 to use when encoding the current instance.
     */
    public render(version: number): ByteVector {
        Guards.byte(version, "version");
        Guards.betweenInclusive(version, 2, 4, "version");

        // Start by rendering the frame identifier
        const data = this._frameId.render(version);

        switch (version) {
            case 2:
                data.addByteVector(ByteVector.fromUint(this._frameSize).mid(1, 3));
                break;

            case 3:
                const newFlags = (this._flags << 1) & 0xE000
                    | (this._flags << 4) & 0x00C0
                    | (this._flags >> 1) & 0x0020;

                data.addByteVector(ByteVector.fromUint(this._frameSize));
                data.addByteVector(ByteVector.fromUShort(newFlags));
                break;

            case 4:
                data.addByteVector(SyncData.fromUint(this._frameSize));
                data.addByteVector(ByteVector.fromUShort(this._flags));
                break;
        }

        return data;
    }

    // #endregion
}
