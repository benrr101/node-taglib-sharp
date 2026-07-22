import Frame from "./frame";
import FrameHeader from "./frameHeader";
import {ByteVector, StringType} from "../../byteVector";
import {ChannelType} from "../enums";
import {CorruptFileError} from "../../errors";
import {FrameIdentifiers} from "../frameIdentifiers";
import {ArrayUtils, Guards, NumberUtils} from "../../utils";

/**
 * Represents the relative volume data that applies to a specific channel of the audio.
 */
export class ChannelData {
    private readonly _channel: ChannelType;
    private _peakBits: number;
    private _peakVolume: bigint;
    private _volumeAdjustment: number;

    /**
     * Constructs a new instance of relative volume information that applies to the provided
     * audio channel.
     * @param channel Channel that the relative volume information applies to
     */
    public constructor(channel: ChannelType) {
        this._channel = channel;
    }

    /**
     * Constructs a new instance from the raw bytes of channel data.
     * @param bytes Raw bytes that contain the channel data object.
     */
    public static fromData(bytes: ByteVector): ChannelData {
        Guards.truthy(bytes, "bytes");

        const channelType = bytes.get(0);
        const channelData = new ChannelData(channelType);
        channelData._volumeAdjustment = bytes.subarray(1, 2).toShort();
        channelData._peakBits = bytes.get(3);
        channelData._peakVolume = bytes.subarray(4).toUlong();
        return channelData;
    }

    /**
     * Gets the channel that the current instance applies to.
     */
    public get channelType(): ChannelType { return this._channel; }

    /**
     * Gets whether the current instance actually contains a relative volume adjustment.
     */
    public get isSet(): boolean {
        const volumeAdjustSet = !!this._volumeAdjustment;
        const peakSet = !!this._peakVolume && this._peakVolume !== NumberUtils.BIG_ZERO;
        return volumeAdjustSet || peakSet;
    }

    /**
     * Number of bits used to express the peak volume.
     */
    public get peakBits(): number { return this._peakBits; }
    /**
     * Number of bits used to express the peak volume.
     * @param value Bits used to express the peak volume. Must be an integer betweenInclusive 1 and 64
     */
    public set peakBits(value: number) {
        // @TODO: This should be calculated based on peak volume
        Guards.byte(value, "value");
        Guards.betweenInclusive(value, 1, 64, "value");
        this._peakBits = value;
    }

    /**
     * Value of the peak sample in the file. It's unclear exactly how this works, but the ID3v2.4
     * documentation explains this value as betweenInclusive 0 and 255 - but can be expressed using any
     * number of bits ({@link peakBits}).
     */
    public get peakVolume(): bigint { return this._peakVolume; }
    /**
     * Value of the peak sample in the file. It's unclear exactly how this works, but the ID3v2.4
     * documentation explains this value as betweenInclusive 0 and 255 - but can be expressed using any
     * number of bits ({@link peakBits}).
     * @param value Peak volume value. Must fit in the number of bits set in {@link peakBits}
     */
    public set peakVolume(value: bigint) {
        if (!this.peakBits) {
            throw new Error("Peak bits must be set before setting peak volume");
        }
        if (value < 0) {
            throw new Error("Argument out of range: value must be positive");
        }
        if (value > NumberUtils.bigPow(NumberUtils.BIG_TWO, this.peakBits) - NumberUtils.BIG_ONE) {
            throw new Error("Argument out of range: value must fit within number of bits defined by peakBits");
        }
        this._peakVolume = value;
    }

    /**
     * Volume adjustment of the track in dB.
     */
    public get volumeAdjustment(): number { return this._volumeAdjustment / 512; }
    /**
     * Volume adjustment of the track in dB. This value is expressed as a fixed-precision value
     * betweenInclusive -64 and 64. Don't worry about the math, we'll do it for you.
     * @param value Volume adjustment. Must be between -64 and 64, exclusive.
     */
    public set volumeAdjustment(value: number) {
        Guards.notNan(value, "value");
        Guards.betweenExclusive(value, -64, 64, "value");
        this._volumeAdjustment = Math.floor(value * 512);
    }

    /**
     * Creates and returns a duplicate instance of the current object.
     * @return {ChannelData} New instance of ChannelData with the same properties as the original
     */
    public clone(): ChannelData {
        const clone = new ChannelData(this._channel);
        clone._peakBits = this._peakBits;
        clone._peakVolume = this._peakVolume;
        clone._volumeAdjustment = this._volumeAdjustment;

        return clone;
    }

    /**
     * Generates a raw byte representation of the current instance.
     */
    public render(): ByteVector {
        if (!this.isSet) {
            return ByteVector.empty();
        }

        // NOTE: According to the docs, peak volume is to be stored in as few bytes as possible for
        // the number of bits used to encode it. For instance, 1-8 bits peak volume must be stored
        // in 1 byte, 8-16 in 2 bytes, etc. @TODO: This is not currently being calculated as the peak
        //                                         bits are provided by the user.

        const peakByteCount = Math.ceil(this._peakBits / 8);
        return ByteVector.concatenate(
            this._channel,
            ByteVector.fromShort(this._volumeAdjustment),
            this._peakBits,
            ByteVector.fromUlong(this._peakVolume).subarray(8 - peakByteCount)
        );
    }
}

/**
 * Extends {@link Frame}, implementing support for ID3v2 relative volume (RVA2) frames.
 */
// @TODO: RVA2 only exists in v2.4, RVAD exists in v2.3, but it is a different format.
export class RelativeVolumeFrame extends Frame {
    // @TODO: Get rid of this whole "is set" malarky and just store a map of channels that are set.
    private _channels: ChannelData[];
    private _identification: string;

    // #region Constructors

    private constructor(header: FrameHeader) {
        super(header);

        // Initialize the channel data array
        this._channels = [];
        for (let i = 0; i < 9; i++) {
            this._channels.push(new ChannelData(i));
        }
    }

    /**
     * Constructs and initialized a new instance by parsing values from the field data.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the body of the frame
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(header: FrameHeader, fieldBytes: ByteVector, version: number): RelativeVolumeFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        // Identification          <text string> $00
        // ---- Repeated for each channel --------------
        // Type of channel         $xx
        // Volume adjustment       $xx xx
        // Bits representing peak  $xx
        // Peak volume             $xx (xx ...)
        // ---- Repeated for each channel --------------

        const frame = new RelativeVolumeFrame(header);

        const identifierEndIndex = fieldBytes.find(ByteVector.getTextDelimiter(StringType.Latin1));
        if (identifierEndIndex < 0) {
            throw new CorruptFileError("Relative volume frame does not contain text delimiter.");
        }

        frame._identification = fieldBytes.subarray(0, identifierEndIndex).toString(StringType.Latin1);

        let pos = identifierEndIndex + 1;
        while (pos < fieldBytes.length) {
            // We need at least 4 bytes to determine how long the channel data is
            if (fieldBytes.length - pos < 4) {
                break;
            }

            const dataLength = 4 + Math.ceil(fieldBytes.get(pos + 3) / 8);
            const dataBytes = fieldBytes.subarray(pos, dataLength);

            // If we're at the end of the vector, we'll just end processing
            if (dataBytes.length !== dataLength) {
                break;
            }

            const channelData = ChannelData.fromData(dataBytes);
            frame._channels[channelData.channelType] = channelData;
            pos += dataLength;
        }

        return frame;
    }

    /**
     * Constructs and initializes a new instance with the specified fields.
     * @param identification Optional, identification to use for the new frame. If omitted,
     *     defaults to `""`.
     * @param channels Optional, channel data for the new frame. If provided, the provided channel
     *     data will replace the empty channel data (and duplicates will overwrite each other). If
     *     not provided, the internal channel data will be unset for all channels.
     */
    public static fromFields(identification?: string, channels?: ChannelData[]): RelativeVolumeFrame {
        const frame = new RelativeVolumeFrame(new FrameHeader(FrameIdentifiers.RVA2));
        frame._identification = identification ?? "";
        if (!!channels) {
            // Replace blank channel data with the provided channel data.
            for (const channel of channels) {
                if (!channel) {
                    continue;
                }

                frame._channels[channel.channelType] = channel;
            }
        }

        return frame;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the channels in the current instance that have a value
     */
    // @TODO: Why the heck can't we just write to this.
    public get channels(): ChannelData[] { return this._channels.filter((c) => c?.isSet); }

    /**
     * Gets the identification used to identify the situation and/or device where this adjustment
     * should apply.
     */
    public get identification(): string { return this._identification; }

    // #endregion

    // #region Public Methods

    /** @inheritDoc */
    public clone(): Frame {
        return RelativeVolumeFrame.fromFields(this._identification, this._channels.map(c => c.clone()));
    }

    public static filterFrames(frames: Frame[]): RelativeVolumeFrame[] {
        Guards.truthy(frames, "frame");
        return ArrayUtils.ofType(frames, RelativeVolumeFrame);
    }

    /**
     * Gets the number of bits used to encode the peak volume
     * @param type Which channel to get the value for
     */
    public getPeakBits(type: ChannelType): number { return this._channels[type].peakBits; }

    /**
     * Gets the peak volume for a specified channel
     * @param type Which channel to get the value for
     */
    public getPeakVolume(type: ChannelType): bigint { return this._channels[type].peakVolume; }

    /**
     * Gets the volume adjustment for the specified channel.
     * @param type Which channel to get the value for
     * @returns Volume adjustment for the channel, can be betweenInclusive -64 and +64 decibels
     */
    public getVolumeAdjustment(type: ChannelType): number { return this._channels[type].volumeAdjustment; }

    /**
     * Sets the number of bits used to encode peak volume for a specified channel.
     * @param type Which channel to set the value for
     * @param value Peak volume
     */
    public setPeakBits(type: ChannelType, value: number): void { this._channels[type].peakBits = value; }

    /**
     * Sets the peak volume for a specified channel.
     * @param type Which channel to set the value for
     * @param value Peak volume
     */
    public setPeakVolume(type: ChannelType, value: bigint): void { this._channels[type].peakVolume = value; }

    /**
     * Sets the volume adjustment in decibels for the specified channel.
     * @param type Which channel to set the value for
     * @param value Volume adjustment in decibels. Must be betweenInclusive -64 and +64
     */
    public setVolumeAdjustment(type: ChannelType, value: number): void {
        this._channels[type].volumeAdjustment = value;
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
    protected renderFields(): ByteVector {
        const channelVectors = this._channels
            .filter(c => !!c && c.isSet)
            .map(c => c.render());

        return ByteVector.concatenate(
            ByteVector.fromString(this._identification, StringType.Latin1), // Identifier
            ByteVector.getTextDelimiter(StringType.Latin1),                 // Delimiter
            ... channelVectors                                              // Channel data
        );
    }

    // #endregion
}
