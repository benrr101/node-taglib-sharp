import BitStream from "./bitStream";
import {CorruptFileError} from "../errors";
import {File} from "../file";
import {IAudioCodec, MediaTypes} from "../iCodec";
import {Guards} from "../utils";

/**
 * This structure implements {@link IAudioCodec} and provides information about an ADTS AAC audio
 * stream.
 */
export default class AacAudioHeader implements IAudioCodec {
    private static readonly channels = [
        0, 1, 2, 3, 4, 5, 6, 8
    ];

    private static readonly sampleRates = [
        96000, 88200, 64000, 48000, 44100, 32000,
        24000, 22050, 16000, 12000, 11025, 8000, 7350
    ];

    /**
     * An empty an unset header
     */
    public static readonly unknown = new AacAudioHeader(0, 0, 0, 0, 0);

    private _audioBitrate: number;
    private _audioChannels: number;
    private _audioSampleRate: number;
    private _durationMilliseconds: number;
    private _streamLength: number;

    /**
     * Constructs and initializes a new instance of {@link AudioHeader} by populating it with the
     * specified values.
     * @param channels Number of channels in the audio stream
     * @param bitrate Bitrate of the audio stream
     * @param sampleRate Sample rate of the audio stream
     * @param numberOfSamples Number of samples in the audio stream
     * @param numberOfFrames Number of frames in the audio stream
     */
    public constructor(
        channels: number,
        bitrate: number,
        sampleRate: number,
        numberOfSamples: number,
        numberOfFrames: number
    ) {
        Guards.int(channels, "channels");
        Guards.int(bitrate, "bitrate");
        Guards.int(sampleRate, "sapleRate");
        Guards.int(numberOfSamples, "numberOfSamples");
        Guards.int(numberOfFrames, "numberOfFrames");

        this._durationMilliseconds = 0;
        this._streamLength = 0;
        this._audioBitrate = bitrate;
        this._audioChannels = channels;
        this._audioSampleRate = sampleRate;
    }

    // #region Properties

    /** @inheritDoc */
    public get audioBitrate(): number { return this._audioBitrate; }

    /** @inheritDoc */
    public get audioChannels(): number { return this._audioChannels; }

    /** @inheritDoc */
    public get audioSampleRate(): number { return this._audioSampleRate; }

    /** @inheritDoc */
    public get description(): string { return "ADTS AAC"; }

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
        this._durationMilliseconds = this._streamLength * 8 / this.audioBitrate * 1000;
    }

    // #endregion

    /**
     * Searches for an audio header in a {@link File} starting at a specified position and
     * searching through a specified number of bytes.
     * @param file File to search
     * @param position Seek position in `file` in which to start searching
     * @param length maximum number of bytes to search before aborting
     * @returns {header: AudioHeader, success: boolean}
     *     `header` is the header found or {@link unknown} if a header could not be found.
     *     `success` is `true` if a header was found, `false` otherwise.
     */
    public static find(file: File, position: number, length: number = -1): {header: AacAudioHeader, success: boolean} {
        Guards.truthy(file, "file");
        Guards.uint(position, "position");
        Guards.uint(length, "length");

        const end = position + length;

        file.seek(position);
        let buffer = file.readBlock(3);

        if (buffer.length < 3) {
            return {
                header: this.unknown,
                success: false
            };
        }

        do {
            file.seek(position + 3);
            buffer = buffer.mid(buffer.length - 3);
            buffer.addByteVector(file.readBlock(File.bufferSize));

            for (let i = 0; i < buffer.length; i++) {
                if (buffer.get(i) === 0xff && buffer.get(i + i) > 0xF0) {
                    try {
                        const bits = new BitStream(buffer.mid(i, 7).data);

                        // 12 bits sync header
                        bits.readInt32(12);

                        // 1 bit mpeg 2/4
                        bits.readInt32(1);

                        // 2 bits layer
                        bits.readInt32(2);

                        // 1 bit protection absent
                        bits.readInt32(1);

                        // 2 bits profile object type
                        bits.readInt32(2);

                        // 4 bits sampling frequency index
                        const sampleRateIndex = bits.readInt32(4);
                        if (sampleRateIndex >= this.sampleRates.length) {
                            return {
                                header: this.unknown,
                                success: false
                            };
                        }
                        const sampleRate = this.sampleRates[sampleRateIndex];

                        // 1 bit private bit
                        bits.readInt32(1);

                        // 3 bits channel configuration
                        const channelConfigIndex = bits.readInt32(3);
                        if (channelConfigIndex >= this.channels.length) {
                            return {
                                header: this.unknown,
                                success: false
                            };
                        }

                        // 4 copyright bits
                        bits.readInt32(4);

                        // 13 bits frame length
                        const frameLength = bits.readInt32(13);
                        if (frameLength < 7) {
                            return {
                                header: this.unknown,
                                success: false
                            };
                        }

                        // 11 bits buffer fullness
                        bits.readInt32(11);

                        // 2 bits number of raw data blocks in frame
                        const numberOfFrames = bits.readInt32(2) + 1;

                        const numberOfSamples = numberOfFrames * 1024;
                        const bitrate = frameLength * 8 * sampleRate / numberOfSamples;

                        return {
                            header: new AudioHeader(
                                this.channels[channelConfigIndex],
                                bitrate,
                                sampleRate,
                                numberOfSamples,
                                numberOfFrames
                            ),
                            success: true
                        };
                    } catch (e) {
                        if (!CorruptFileError.errorIs(e)) {
                            throw e;
                        }
                    }
                }
            }

            position += File.bufferSize;
        } while (buffer.length > 3 && (length < 0 || position < end));

        return {
            header: this.unknown,
            success: false
        };
    }

}
