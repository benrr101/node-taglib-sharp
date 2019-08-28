import * as BigInt from "big-integer";
import FrameTypes from "../frameTypes";
import {ByteVector, StringType} from "../../byteVector";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {Guards} from "../../utils";

/**
 * Type of channel data to get from or set to a {@see RelativeVolumeFrame} object
 */
export enum ChannelType {
    /**
     * Channel data for some other speaker
     */
    Other = 0x00,

    /**
     * Channel data for the master volume
     */
    MasterVolume = 0x01,

    /**
     * Channel data for the front right speaker
     */
    FrontRight = 0x02,

    /**
     * Channel data for front left speaker
     */
    FrontLeft = 0x03,

    /**
     * Channel data for center right speaker
     */
    BackRight = 0x04,

    /**
     * Channel data for back left speaker
     */
    BackLeft = 0x05,

    /**
     * Channel data for front center speaker
     */
    FrontCentre = 0x06,

    /**
     * Channel data for back center speaker
     */
    BackCenter = 0x07,

    /**
     * Channel data for subwoofer
     */
    Subwoofer = 0x08
}

class ChannelData {
    private _peakVolume: number;
    private _peakVolumeIndex: BigInt.BigInteger;
    private _volumeAdjustment: number;
    private _volumeAdjustmentIndex: number;

    public get isSet(): boolean {
        return this._volumeAdjustmentIndex !== 0 || !this._peakVolumeIndex.isZero();
    }

    public get peakVolume(): number { return this._peakVolume; }
    public set peakVolume(value: number) {
        this._peakVolume = value;
        this._peakVolumeIndex = BigInt(value).multiply(512);
    }

    public get peakVolumeIndex(): BigInt.BigInteger { return this._peakVolumeIndex; }
    public set peakVolumeIndex(value: BigInt.BigInteger) {
        Guards.ulong(value, "value");
        this._peakVolumeIndex = value;
        this._peakVolume = <any> value / 512;   // @TODO: Not sure this works as expected due to bigint division
    }

    public get volumeAdjustment(): number { return this._volumeAdjustment; }
    public set volumeAdjustment(value: number) {
        Guards.between(value, -64, 64, "value");
        this._volumeAdjustment = value;
        this._volumeAdjustmentIndex = Math.floor(value * 512);
    }

    public get volumeAdjustmentIndex(): number { return this._volumeAdjustmentIndex; }
    public set volumeAdjustmentIndex(value: number) {
        Guards.short(value, "value");
        this._volumeAdjustmentIndex = value;
        this._volumeAdjustment = value / 512.0;
    }
}

export class RelativeVolumeFrame extends Frame {
    private readonly _channels: ChannelData[] = new Array<ChannelData>(9);
    private _identification: string;

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance with a specified identifier
     * @param identification Identification ot use for the new frame
     */
    public static fromIdentification(identification: string): RelativeVolumeFrame {
        const frame = new RelativeVolumeFrame(new Id3v2FrameHeader(FrameTypes.RVA2, 4));
        frame._identification = identification;
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified ID3v2
     * version starting a specified offset.
     * @param data Raw representation of the new frame
     * @param offset Offset into {@paramref data} where the frame actually begins. Must be a
     *     positive, 32-bit integer
     * @param header Header of the frame found at {@paramref offset} in {@paramref data}
     */
    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader
    ): RelativeVolumeFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");

        const frame = new RelativeVolumeFrame(header);
        frame.setData(data, offset, false);
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified ID3v2
     * version.
     * @param data Raw representation of the new frame
     * @param version ID3v2 version the frame is encoded with. Must be a positive 8-bit integer.
     */
    public static fromRawData(data: ByteVector, version: number): RelativeVolumeFrame {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        const frame = new RelativeVolumeFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, true);
        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.RelativeVolumeFrame; }

    /**
     * Gets the channels in the current instance that have a value
     */
    public get channels(): ChannelData[] { return this._channels.filter((c) => c.isSet); }

    /**
     * Gets the identification used for the current instance
     */
    public get identification(): string { return this._identification; }

    // #endregion

    // #region Public Methods

    /** @inheritDoc */
    public clone(): Frame {
        const frame = RelativeVolumeFrame.fromIdentification(this.identification);
        for (let i = 0; i < 9; i++) {
            frame._channels[i] = this._channels[i];
        }
        return frame;
    }

    /**
     * Gets a specified volume adjustment frame from the list of relative volume frames
     * @param frames List of frames to search
     * @param identification Identification to match
     * @returns RelativeVolumeFrame Frame containing the matching user or `undefined` if a match was
     *     not found
     */
    public static find(frames: RelativeVolumeFrame[], identification: string): RelativeVolumeFrame {
        Guards.truthy(frames, "frame");
        return frames.find((f) => f.identification === identification);
    }

    /**
     * Gets the peak volume for a specified channel
     * @param type Which channel to get the value for
     */
    public getPeakVolume(type: ChannelType): number {
        return this._channels[type].peakVolume;
    }

    /**
     * Gets the peak volume index for a specified channel. The peak volume index is simply the peak
     * volume multiplied by 512.
     * @param type Which channel to get the value for
     */
    public getPeakVolumeIndex(type: ChannelType): BigInt.BigInteger {
        return this._channels[type].peakVolumeIndex;
    }

    /**
     * Gets the volume adjustment for the specified channel.
     * @param type Which channel to get the value for
     * @returns number Volume adjustment for the channel, can be between -64 and +64 decibels
     */
    public getVolumeAdjustment(type: ChannelType): number {
        return this._channels[type].volumeAdjustment;
    }

    /**
     * Gets the volume adjustment index for a specified channel.
     * The volume adjustment index is simply the volume adjustment multiplied by 512.
     * @param type Which channel to get the value for
     */
    public getVolumeAdjustmentIndex(type: ChannelType): number {
        return this._channels[type].volumeAdjustmentIndex;
    }

    /**
     * Sets the peak volume for a specified channel.
     * @param type Which channel to set the value for
     * @param value Peak volume
     */
    public setPeakVolume(type: ChannelType, value: number): void {
        this._channels[type].peakVolume = value;
    }

    /**
     * Sets the peak volume index for a specified channel. The peak volume index is simply the peak
     * volume multiplied by 512.
     * @param type Which channel to set the value for
     * @param index Peak volume index
     */
    public setPeakVolumeIndex(type: ChannelType, index: BigInt.BigInteger): void {
        this._channels[type].peakVolumeIndex = index;
    }

    /**
     * Sets the volume adjustment in decibels for the specified channel.
     * @param type Which channel to set the value for
     * @param value Volume adjustment in decibels. Must be between -64 and +64
     */
    public setVolumeAdjustment(type: ChannelType, value: number): void {
        this._channels[type].volumeAdjustment = value;
    }

    /**
     * Sets the volume adjustment index for a specified channel.
     * The volume adjustment index is simply the volume adjustment multiplied by 512.
     * @param type Which channel to set the value of
     * @param index Volume adjustment index (volume adjustment multiplied by 512), must be a 16-bit
     *     integer.
     */
    public setVolumeAdjustmentIndex(type: ChannelType, index: number): void {
        this._channels[type].volumeAdjustmentIndex = index;
    }

    /**
     * Creates a text description of the current instance
     */
    public toString(): string {
        return this.identification;
    }

    // #endregion

    // #region Protected/Private Methods

    /** @inheritDoc */
    protected parseFields(data: ByteVector, version: number): void {
        Guards.byte(version, "version");

        let pos = data.find(ByteVector.getTextDelimiter(StringType.Latin1));
        if (pos < 0) {
            return;
        }

        this._identification = data.toString(StringType.Latin1, 0, pos++);

        // Each channel is at least 4 bytes
        while (pos <= data.length - 4) {
            const type = data.get(pos++);
            this._channels[type].volumeAdjustmentIndex = data.mid(pos, 2).toUShort();
            pos += 2;

            const bytes = RelativeVolumeFrame.bitsToBytes(data.get(pos++));

            if (data.length < pos + bytes) {
                break;
            }

            this._channels[type].peakVolumeIndex = data.mid(pos, bytes).toULong();
            pos += bytes;
        }
    }

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        const data = ByteVector.fromString(this.identification, StringType.Latin1);
        data.addByteVector(ByteVector.getTextDelimiter(StringType.Latin1));

        for (let i = 0; i < 9; i++) {
            if (!this._channels[i].isSet) {
                continue;
            }

            data.addByte(i);
            data.addByteVector(ByteVector.fromUShort(this._channels[i].volumeAdjustmentIndex));

            let bits = 0;
            for (let j = 0; j < 64; j++) {
                if (!this._channels[i].peakVolumeIndex.and(1 << j).isZero()) {
                    bits = j + 1;
                }
            }

            data.addByte(bits);

            if (bits > 0) {
                const ulongBytes = ByteVector.fromULong(this._channels[i].peakVolumeIndex);
                data.addByteVector(ulongBytes.mid(8 - RelativeVolumeFrame.bitsToBytes(bits)));
            }
        }

        return data;
    }

    private static bitsToBytes(i: number) {
        return i % 8 === 0
            ? i / 8
            : (i - i % 8) / 8 + 1;
    }

    // #endregion
}
