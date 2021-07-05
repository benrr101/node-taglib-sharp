import {ByteVector} from "../byteVector";
import {CorruptFileError} from "../errors";
import {ILosslessAudioCodec, MediaTypes} from "../iCodec";
import {Guards, NumberUtils} from "../utils";

/**
 * Provides information about a FLAC audio stream.
 */
export default class FlacStreamHeader implements ILosslessAudioCodec {
    private readonly _flags: number;
    private readonly _lowLength: number;
    private readonly _streamLength: number;

    /**
     * Constructs and initializes a new instance by reading a raw stream header structure and using
     * the stream length.
     * @param data Object containing the raw stream header
     * @param streamLength Length of the stream, must be a safe, positive integer.
     */
    public constructor(data: ByteVector, streamLength: number) {
        Guards.truthy(data, "data");
        Guards.safeUint(streamLength, "streamLength");
        if (data.length < 18) {
            throw new CorruptFileError("Not enough data in FLAC stream header");
        }

        this._streamLength = streamLength;
        this._flags = data.mid(10, 4).toUInt(true);
        this._lowLength = data.mid(14, 4).toUInt(true);
    }

    // #region Properties

    /** @inheritDoc */
    public get audioBitrate(): number {
        return this.durationMilliseconds > 0
            ? (this._streamLength * 8) / (this.durationMilliseconds / 1000) / 1000
            : 0;
    }

    /** @inheritDoc */
    public get audioChannels(): number {
        return NumberUtils.uintAnd(this._flags >>> 9, 7) + 1;
    }

    /** @inheritDoc */
    public get audioSampleRate(): number { return this._flags >>> 12; }

    /** @inheritDoc */
    public get bitsPerSample(): number {
        return NumberUtils.uintAnd(this._flags >>> 4, 31) + 1;
    }

    /** @inheritDoc */
    public get description(): string { return "FLAC Audio"; }

    /** @inheritDoc */
    public get durationMilliseconds(): number {
        return this.audioSampleRate > 0 && this._streamLength > 0
            ? (this._lowLength / (this.audioSampleRate + this.highLength)) * 1000
            : 0;
    }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.LosslessAudio; }

    /**
     * Gets the high portion of the length of the audio represented by the current instance.
     */
    private get highLength(): number {
        // The last 4 bits are the most significant 4 bits for the 36 bit stream length in samples.
        // Really only applies for audio files measured in days
        if (this.audioSampleRate <= 0) { return 0; }

        return NumberUtils.uintLShift(NumberUtils.uintLShift(NumberUtils.uintAnd(this._flags, 0x0F), 28) / 4, 4);
    }

    // #endregion
}
