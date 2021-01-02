import * as BigInt from "big-integer";
import {ByteVector} from "../byteVector";
import {ILosslessAudioCodec, MediaTypes} from "../iCodec";
import {Guards} from "../utils";
import {CorruptFileError} from "../errors";

/**
 * Implements {@link ILosslessAudioCodec} to provide support for reading Apple's AIFF stream
 * properties.
 */
export default class AiffStreamHeader implements ILosslessAudioCodec {
    /**
     * Identifier used to recognize an AIFF file. Although an AIFF file starts with "FORM2", we're
     * interested in the common chunk only, which contains the properties we need.
     */
    public static readonly fileIdentifier = ByteVector.fromString("COMM", undefined, undefined, true);

    /**
     * Size of an AIFF common chunk in bytes
     */
    public static readonly size = 26;

    // #region Private members

    private readonly _channels: number;
    private readonly _bitsPerSample: number;
    private readonly _sampleRate: number;
    private readonly _streamLength: number;
    private readonly _totalFrames: BigInt.BigInteger;

    // #endregion

    /**
     * Constructs and initializes a new instance of {@link AiffStreamHeader} for a specified header
     * block and stream length.
     * @param data Stream header data
     * @param streamLength Length of the AIFF audio stream in bytes
     */
    public constructor(data: ByteVector, streamLength: number) {
        Guards.truthy(data, "data");
        if (!data.startsWith(AiffStreamHeader.fileIdentifier)) {
            throw new CorruptFileError("Data does not begin with identifier");
        }

        this._streamLength = streamLength;

        // The first 8 bytes contain the common chunk identifier "COMM" and the size of the common
        // chunk, which is always 18
        this._channels = data.mid(8, 2).toUShort(true);
        this._totalFrames = data.mid(10, 4).toULong(true);
        this._bitsPerSample = data.mid(14, 2).toUShort(true);

        const sampleRateIndicator = data.mid(17, 1).get(0);
        const sampleRateTemp = data.mid(18, 2).toULong(true);
        this._sampleRate = 44100; // Set a default sample rate

        // The following are combinations that iTunes 8 encodes to. There may be other combinations
        // of the field, but I [Gabriel Burt] couldn't test them.
        if (sampleRateTemp.eq(44100)) {
            if (sampleRateIndicator === 0x0E) {
                this._sampleRate = 44100;
            } else if (sampleRateIndicator === 0x0D) {
                this._sampleRate = 22050;
            } else if (sampleRateIndicator === 0x0C) {
                this._sampleRate = 11025;
            }
        } else if (sampleRateTemp.eq(44800)) {
            if (sampleRateIndicator === 0x0E) {
                this._sampleRate = 44800;
            } else if (sampleRateIndicator === 0x0D) {
                this._sampleRate = 24000;
            }
        } else if (sampleRateTemp.eq(64000)) {
            if (sampleRateIndicator === 0x0D) {
                this._sampleRate = 32000;
            } else if (sampleRateIndicator === 0x0C) {
                this._sampleRate = 16000;
            } else if (sampleRateIndicator === 0x0B) {
                this._sampleRate = 8000;
            }
        } else if (sampleRateTemp.eq(44510)) {
            if (sampleRateIndicator === 0x0D) {
                this._sampleRate = 22255;
            }
        } else if (sampleRateTemp.eq(44508)) {
            if (sampleRateIndicator === 0x0C) {
                this._sampleRate = 11127;
            }
        }
    }

    // #region Properties

    /** @inheritDoc */
    public get audioBitrate(): number {
        return this.durationMilliseconds <= 0
            ? 0
            : (this._streamLength * 8) / (this.durationMilliseconds / 1000) / 1000;
    }

    /** @inheritDoc */
    public get audioChannels(): number { return this._channels; }

    /** @inheritDoc */
    public get audioSampleRate(): number { return this._sampleRate; }

    /** @inheritDoc */
    public get bitsPerSample(): number { return this._bitsPerSample; }

    /** @inheritDoc */
    // @TODO: Add support for detecting the compression type
    public get description(): string { return "AIFF Audio"; }

    /** @inheritDoc */
    public get durationMilliseconds(): number {
        return this._sampleRate <= 0 || this._totalFrames.leq(0)
            ? 0
            : this._totalFrames.divide(this._sampleRate).multiply(1000).toJSNumber();
    }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.Audio; }

    // #endregion
}
