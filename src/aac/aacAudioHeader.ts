import Mpeg4AudioTypes from "../mpeg4/mpeg4AudioTypes";
import {CorruptFileError} from "../errors";
import {File} from "../file";
import {IAudioCodec, MediaTypes} from "../iCodec";
import {Guards} from "../utils";

/**
 * This structure implements {@link IAudioCodec} and provides information about an ADTS AAC audio
 * stream. NOTE: This header type should not be used for MPEG-4 encapsulated audio files.
 */
export default class AacAudioHeader implements IAudioCodec {
    private static readonly sampleRates = [
        96000, 88200, 64000, 48000, 44100, 32000,
        24000, 22050, 16000, 12000, 11025, 8000, 7350
    ];

    /**
     * An empty an unset header
     */
    public static readonly unknown = new AacAudioHeader(0, 0, 0, 0, 0, 0);

    private readonly _audioBitrate: number;
    private readonly _audioChannels: number;
    private readonly _audioSampleRate: number;
    private readonly _mpeg4AudioTypeIndex: number;

    private _durationMilliseconds: number;
    private _streamLength: number;

    /**
     * Constructs and initializes a new instance of {@link AacAudioHeader} by populating it with the
     * specified values.
     * @param channels Number of channels in the audio stream
     * @param bitrate Bitrate of the audio stream
     * @param sampleRate Sample rate of the audio stream
     * @param numberOfSamples Number of samples in the audio stream
     * @param numberOfFrames Number of frames in the audio stream
     * @param mpegAudioType ID of the MPEG-4 audio type
     */
    public constructor(
        channels: number,
        bitrate: number,
        sampleRate: number,
        numberOfSamples: number,
        numberOfFrames: number,
        mpegAudioType: number
    ) {
        Guards.uint(channels, "channels");
        Guards.greaterThanInclusive(bitrate, 0, "bitrate");
        Guards.uint(sampleRate, "sampleRate");
        Guards.uint(numberOfSamples, "numberOfSamples");
        Guards.uint(numberOfFrames, "numberOfFrames");
        Guards.uint(mpegAudioType, "mpegAudioType");

        this._durationMilliseconds = 0;
        this._streamLength = 0;
        this._audioBitrate = bitrate;
        this._audioChannels = channels;
        this._audioSampleRate = sampleRate;
        this._mpeg4AudioTypeIndex = mpegAudioType;
    }

    // #region Properties

    /** @inheritDoc */
    public get audioBitrate(): number { return this._audioBitrate; }

    /** @inheritDoc */
    public get audioChannels(): number { return this._audioChannels; }

    /** @inheritDoc */
    public get audioSampleRate(): number { return this._audioSampleRate; }

    /** @inheritDoc */
    public get description(): string { return `ADTS AAC: ${Mpeg4AudioTypes[this._mpeg4AudioTypeIndex]}`; }

    /** @inheritDoc */
    public get durationMilliseconds(): number { return this._durationMilliseconds; }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.Audio; }

    /**
     * Sets the length of the audio stream represented by the current instance.
     * @desc Until this value has been set, {@link durationMilliseconds} will return an incorrect
     *     value.
     * @param value Length in bytes of the audio stream represented by the current instance
     */
    public set streamLength(value: number) {
        Guards.uint(value, "value");

        this._streamLength = value;
        this._durationMilliseconds = this._streamLength * 8 / this.audioBitrate;
    }

    // #endregion

    /**
     * Searches for an audio header in a {@link File} starting at a specified position and
     * searching through a specified number of bytes.
     * @param file File to search
     * @param position Seek position in `file` in which to start searching
     * @param length maximum number of bytes to search before aborting
     * @returns AacAudioHeader Header found or `undefined` if a header could not be found.
     */
    public static find(file: File, position: number, length: number = -1): AacAudioHeader {
        Guards.truthy(file, "file");
        Guards.uint(position, "position");
        Guards.uint(length, "length");

        const end = position + length;

        file.seek(position);
        let buffer = file.readBlock(3);

        if (buffer.length < 3) {
            return undefined;
        }

        do {
            file.seek(position + 3);
            buffer = buffer.mid(buffer.length - 3);
            buffer.addByteVector(file.readBlock(File.bufferSize));

            for (let i = 0; i < buffer.length; i++) {
                if (buffer.get(i) === 0xff && buffer.get(i + i) > 0xF0) {
                    try {
                        // NOTE: For details of the header format, see https://wiki.multimedia.cx/index.php/ADTS
                        const bytes = buffer.mid(i, 7);

                        // Sample rate
                        const sampleRateByte = bytes.get(2);
                        const sampleRateIndex = (sampleRateByte & 0x3C) >>> 2;
                        if (sampleRateIndex >= this.sampleRates.length) {
                            return undefined;
                        }
                        const sampleRate = this.sampleRates[sampleRateIndex];

                        // MPEG-4 Audio Type
                        const mpeg4AudioType = (sampleRateByte & 0xC0) >>> 6;

                        // Channel configuration
                        const channelsByte1 = sampleRateByte;
                        const channelsByte2 = bytes.get(3);
                        const channelCount = ((channelsByte1 & 0x1) << 2)
                            | (channelsByte2 & 0xC0) >>> 6;

                        // Frame length
                        const frameLengthByte1 = channelsByte2;
                        const frameLengthByte2 = bytes.get(4);
                        const frameLengthByte3 = bytes.get(5);
                        const frameLength = ((frameLengthByte1 & 0x03) << 11)
                            | (frameLengthByte2 << 3)
                            | ((frameLengthByte3 & 0xE0) >>> 5);
                        if (frameLength < 7) {
                            return undefined;
                        }

                        // Number of frames in ADTS frame minus 1
                        const numberOfFrames = ((bytes.get(6) & 0x03) >>> 0) + 1;

                        // Calculate number of samples and bitrate
                        const numberOfSamples = numberOfFrames * 1024;
                        const bitrate = frameLength * 8 * sampleRate / numberOfSamples / 1000;

                        return new AacAudioHeader(
                            channelCount,
                            bitrate,
                            sampleRate,
                            numberOfSamples,
                            numberOfFrames,
                            mpeg4AudioType
                        );
                    } catch (e) {
                        if (!CorruptFileError.errorIs(e)) {
                            throw e;
                        }
                    }
                }
            }

            position += File.bufferSize;
        } while (buffer.length > 3 && (length < 0 || position < end));

        return undefined;
    }

}
