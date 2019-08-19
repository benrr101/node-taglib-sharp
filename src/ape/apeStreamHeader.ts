import {ByteVector, StringType} from "../byteVector";
import {CorruptFileError} from "../errors";
import {ILosslessAudioCodec, MediaTypes} from "../iCodec";
import {Guards} from "../utils";

/**
 * Indicates the compression level used when encoding a Monkey's Audio APE file.
 */
export enum CompressionLevel {
    /**
     * The audio is not compressed.
     */
    None = 0,

    /**
     * The audio is mildly compressed.
     */
    Fast = 1000,

    /**
     * The audio is compressed at a normal level.
     */
    Normal = 2000,

    /**
     * The audio is highly compressed.
     */
    High = 3000,

    /**
     * The audio is extremely highly compressed.
     */
    ExtraHigh = 4000,

    /**
     * The audio is compressed to an insane level.
     */
    Insane
}

export class ApeStreamHeader implements ILosslessAudioCodec {
    // #region Member Variables

    public static readonly headerSize = 76;
    public static readonly fileIdentifier: ByteVector = ByteVector.fromString("MAC", StringType.UTF8);

    private readonly _bitsPerSample: number;
    private readonly _blocksPerFrame: number;
    private readonly _channels: number;
    private readonly _compression: CompressionLevel;
    private readonly _finalFrameBlocks: number;
    private readonly _sampleRate: number;
    private readonly _streamLength: number;
    private readonly _totalFrames: number;
    private readonly _version: number;

    // #endregion

    public constructor(data: ByteVector, streamLength: number) {
        Guards.truthy(data, "data");
        Guards.uint(streamLength, "streamLength");

        if (!data.startsWith(ApeStreamHeader.fileIdentifier)) {
            throw new CorruptFileError("Data does not begin with identifier.");
        }
        if (data.length < ApeStreamHeader.headerSize) {
            throw new CorruptFileError("Insufficient data in stream header");
        }

        this._streamLength = streamLength;
        this._version = data.mid(4, 2).toUShort(false);
        this._compression = data.mid(52, 2).toUShort(false);
        this._blocksPerFrame = data.mid(56, 4).toUInt(false);
        this._finalFrameBlocks = data.mid(60, 4).toUInt(false);
        this._totalFrames = data.mid(64, 4).toUInt(false);
        this._bitsPerSample = data.mid(70, 2).toUShort(false);
        this._channels = data.mid(70, 2).toUShort(false);
        this._sampleRate = data.mid(72, 4).toUInt(false);
    }

    // #region Public Properties

    /** @inheritDoc */
    public get audioBitrate(): number {
        const duration = this.durationMilliseconds;
        if (duration <= 0) { return 0; }
        return this._streamLength * 8 / (duration / 1000) / 1000;
    }

    /** @inheritDoc */
    public get audioChannels(): number { return this._channels; }

    /** @inheritDoc */
    public get audioSampleRate(): number { return this._sampleRate; }

    /** @inheritDoc */
    public get bitsPerSample(): number { return this._bitsPerSample; }

    /**
     * Gets the level of compression used when encoding the audio represented by this instance.
     */
    public get compression(): CompressionLevel { return this._compression; }

    /** @inheritDoc */
    public get description(): string { return `Monkey's Audio APE Version ${this.version}`; }

    /** @inheritDoc */
    public get durationMilliseconds(): number {
        if (this._sampleRate <= 0 || this._totalFrames <= 0) { return 0; }
        return ((this._totalFrames - 1) * this._blocksPerFrame + this._finalFrameBlocks) / this._sampleRate * 1000;
    }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.LosslessAudio; }

    /**
     * Gets the APE version of the audio represented by the current instance.
     * @description This valus is stored in bytes (4,5) of the file and is 1000 times the actual
     *     version number, so 3810 indicates version 3.81.
     */
    public get version(): number { return this._version / 1000.0; }

    // #endregion
}
