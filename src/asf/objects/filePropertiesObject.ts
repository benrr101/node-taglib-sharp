import AsfFile from "../asfFile";
import BaseObject from "./baseObject";
import Guids from "../guids";
import UuidWrapper from "../../uuidWrapper";
import {CorruptFileError} from "../../errors";
import {ByteVector} from "../../byteVector";
import {NumberUtils} from "../../utils";

/**
 * Flags that are set on a {@link FilePropertiesObject}. See {@link FilePropertiesObject.flags} for
 * more details.
 */
export enum FilePropertiesFlags {
    /**
     * The file is in the process of being created.
     */
    Broadcast = 0x01,

    /**
     * The file is seekable.
     */
    Seekable = 0x02
}

/**
 * Extends {@see BaseObject} to provide a representation of an ASF file properties object. The
 * file properties object defines the global characteristics of the combined digital media streams
 * found within the Data object.
 */
export default class FilePropertiesObject extends BaseObject {
    private static readonly FILE_TIME_TO_UNIX_EPOCH = BigInt(116444736000000000);

    // #region Member Variables

    private _creationDateTicks: bigint;
    private _dataPacketsCount: bigint;
    private _fileId: UuidWrapper;
    private _fileSize: bigint;
    private _flags: number;
    private _maximumBitrate: number;
    private _maximumDataPacketSize: number;
    private _minimumDataPacketSize: number;
    private _playDurationTicks: bigint;
    private _prerollMilliseconds: bigint;
    private _sendDurationTicks: bigint;

    // #endregion

    // #region Constructors

    private constructor() {
        super();
    }

    public static fromFile(file: AsfFile, position: number): FilePropertiesObject {
        const instance = new FilePropertiesObject();
        instance.initializeFromFile(file, position);

        if (!instance.guid.equals(Guids.AsfFilePropertiesObject)) {
            throw new CorruptFileError("Object GUID is not the expected file properties object GUID");
        }

        if (instance.originalSize < 104) {
            throw new CorruptFileError("Object size too small for file properties object");
        }

        instance._fileId = file.readGuid();
        instance._fileSize = file.readQWord();
        instance._creationDateTicks = file.readQWord();
        instance._dataPacketsCount = file.readQWord();
        instance._playDurationTicks = file.readQWord();
        instance._sendDurationTicks = file.readQWord();
        instance._prerollMilliseconds = file.readQWord();
        instance._flags = file.readDWord();
        instance._minimumDataPacketSize = file.readDWord();
        instance._maximumDataPacketSize = file.readDWord();
        instance._maximumBitrate = file.readDWord();

        return instance;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the creation date of the file described by the current instance.
     */
    public get creationDate(): Date {
        // Creation date is in ticks from 1/1/1601 00:00:00, JS Date is in milliseconds from
        // 1/1/1970 00:00:00.
        const unixEpochTicks = this._creationDateTicks - FilePropertiesObject.FILE_TIME_TO_UNIX_EPOCH;
        const unixEpochMilli = NumberUtils.ticksToMilli(unixEpochTicks);
        return new Date(unixEpochMilli);
    }

    /**
     * Gets the number of packets in the data section of the file represented by the current
     * instance.
     */
    public get dataPacketsCount(): bigint { return this._dataPacketsCount; }

    /**
     * Gets the GUID for the file described by the current instance.
     */
    public get fileId(): UuidWrapper { return this._fileId; }

    /**
     * Gets the total size of the file described by the current instance in bytes.
     */
    public get fileSize(): bigint { return this._fileSize; }

    /**
     * Gets whether the file described by the current instance is broadcast or seekable.
     * @remarks This attribute applies to presentation descriptors for ASF content. The value is a
     *     bitwise OR of the flags in {@link FilePropertiesFlags}.
     *     * If {@link FilePropertiesFlags.Broadcast} is set, the following properties are not
     *       valid
     *       * {@link fileId}
     *       * {@link creationDate}
     *       * {@link dataPacketsCount}
     *       * {@link playDurationMilliseconds}
     *       * {@link sendDurationMilliseconds}
     *       * {@link maximumDataPacketSize} and {@link minimumDataPacketSize} are set to the
     *         actual packet size
     *     * If {@link FilePropertiesFlags.Seekable} is set, an audio stream is present and the
     *       {@link maximumDataPacketSize} and {@link minimumDataPacketSize} are set to the same
     *       size. It can also be seekable if the file has an audio stream and a video stream with
     *       a matching simple index object.
     */
    public get flags(): number { return this._flags; }

    /**
     * Gets the maximum instantaneous bit rate, in bits per second, for the file described by the
     * current instance.
     */
    public get maximumBitrate(): number { return this._maximumBitrate; }

    /**
     * Gets the maximum packet size, in bytes, for the file described by the current instance.
     */
    public get maximumDataPacketSize(): number { return this._maximumDataPacketSize; }

    /**
     * Gets the minimum packet size, in bytes, for the file described by the current instance.
     */
    public get minimumDataPacketSize(): number { return this._minimumDataPacketSize; }

    /**
     * Gets the amount of time, in milliseconds, to buffer data before playing the file described
     * by the current instance.
     */
    public get prerollMilliseconds(): number { return Number(this._prerollMilliseconds); }

    /**
     * Get the time needed to play the file described by the current instance in milliseconds.
     */
    public get playDurationMilliseconds(): number { return NumberUtils.ticksToMilli(this._playDurationTicks); }

    /**
     * Get the time needed to send the file described by the current instance in milliseconds. A
     * packet's "send time" is the time when the packet should be delivered over the network, it is
     * not the presentation of the packet.
     */
    public get sendDurationMilliseconds(): number { return NumberUtils.ticksToMilli(this._sendDurationTicks); }

    // #endregion

    /** @inheritDoc */
    public render(): ByteVector {
        const output = ByteVector.concatenate(
            this._fileId.toBytes(),
            FilePropertiesObject.renderQWord(this._fileSize),
            FilePropertiesObject.renderQWord(this._creationDateTicks),
            FilePropertiesObject.renderQWord(this._dataPacketsCount),
            FilePropertiesObject.renderQWord(this._playDurationTicks),
            FilePropertiesObject.renderQWord(this._sendDurationTicks),
            FilePropertiesObject.renderQWord(this._prerollMilliseconds),
            FilePropertiesObject.renderDWord(this._flags),
            FilePropertiesObject.renderDWord(this._minimumDataPacketSize),
            FilePropertiesObject.renderDWord(this._maximumDataPacketSize),
            FilePropertiesObject.renderDWord(this._maximumBitrate)
        );
        return super.renderInternal(output);
    }


}
