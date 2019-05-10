import {File} from "../file";
import {IAudioCodec, MediaTypes} from "../iCodec";
import BitStream from "./bitStream";

/**
 * Provides information about an ADTS AAC audio stream.
 */
export default class AacAudioHeader implements IAudioCodec {
    /**
     * List of sample rates for ADTS AAC audio.
     */
    private static readonly _sampleRates = [
        96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350
    ];

    /**
     * List of channels for ADTS AAC audio.
     */
    private static readonly _channels = [
        0, 1, 2, 3, 4, 5, 6, 8
    ];

    // #region Member Variables

    /**
     * Bitrate of the audio stream.
     */
    private readonly _audioBitrate: number;

    /**
     * Number of channels in the audio.
     */
    private readonly _audioChannels: number;

    /**
     * Sample rate of the audio stream.
     */
    private readonly _audioSampleRate: number;

    /**
     * Duration of the audio stream in milliseconds.
     */
    private _durationMilliseconds: number;

    /**
     * Length of the audio stream.
     */
    private _streamLength: number;

    /**
     * An empty, unset header.
     */
    public static readonly Unknown: AacAudioHeader = new AacAudioHeader();

    // #endregion

    private constructor(channels: number = 0, bitrate: number = 0, sampleRate: number = 0) {
        this._audioBitrate = bitrate;
        this._audioChannels = channels;
        this._audioSampleRate = sampleRate;
        this._durationMilliseconds = 0;
        this._streamLength = 0;
    }

    // #region IAudioCodec

    public get audioBitrate(): number { return this._audioBitrate; }

    public get audioChannels(): number { return this._audioChannels; }

    public get audioSampleRate(): number { return this._audioSampleRate; }

    public get description(): string { return "ADTS AAC"; }

    public get durationMilliseconds(): number { return this._durationMilliseconds; }

    public get mediaTypes(): MediaTypes { return MediaTypes.Audio; }

    // #endregion

    // #region Public Methods

    /**
     * Searches for an audio header in {@see File} starting at a specified position and searching
     * through a specified number of bytes or to the end of the file.
     * @param file File object to search
     * @param position Index into the file from which to start searching
     * @param length Maximum number of bytes to search before aborting. If this value is `< 0`,
     *     the file will be searched until the end of the file.
     * @returns An object containing:
     *     * `found` boolean of whether or not the audio header was successfully found in the file
     *     * `header` {@see AacAudioHeader} the audio header that was found. If `found` is `false`,
     *       {@see AacAudioHeader.Unknown} is returned.
     */
    public static find(file: File, position: number, length: number = -1): {found: boolean, header: AacAudioHeader} {
        if (!file) {
            throw new Error("Argument null: file was not provided");
        }
        if (!Number.isSafeInteger(position) || position < 0) {
            throw new Error("Argument out of range: position must be a safe, positive integer");
        }
        if (!Number.isSafeInteger(length)) {
            throw new Error("Argument out of range: length must be a safe integer");
        }

        const end = position + length;
        let header = this.Unknown;

        file.seek(position);
        let buffer = file.readBlock(3);
        if (buffer.length < 3) {
            return {found: false, header: header};
        }

        do {
            file.seek(position + 3);
            buffer = buffer.mid(buffer.length - 3);
            buffer.addByteVector(file.readBlock(File.bufferSize));

            for (let i = 0; i < buffer.length - 3 && (length < 0 || position + i < end); i++) {
                if (buffer.get(i) !== 0xFF || buffer.get(i + 1) < 0xF0) {
                    continue;
                }

                const bits = new BitStream(buffer.mid(i, 7).data);

                // 12 bits sync header
                bits.readInt32(12);

                // 1 bit MPEG 2/4
                bits.readInt32(1);

                // 2 bits layer
                bits.readInt32(2);

                // 1 bit protection absent
                bits.readInt32(1);

                // 2 bits profile object type
                bits.readInt32(2);

                // 4 bits sampling frequency index
                const sampleRateIndex = bits.readInt32(4);
                if (sampleRateIndex >= this._sampleRates.length) {
                    return {found: false, header: header};
                }
                const sampleRate = this._sampleRates[sampleRateIndex];

                // 1 bit private bit
                bits.readInt32(1);

                // 3 bits channel configuration
                const channelConfigIndex = bits.readInt32(3);
                if (channelConfigIndex >= this._channels.length) {
                    return {found: false, header: header};
                }
                const channels = this._channels[channelConfigIndex];

                // 4 copyright bits
                bits.readInt32(4);

                // 13 bits frame length
                const frameLength = bits.readInt32(13);
                if (frameLength < 7) {
                    return {found: false, header: header};
                }

                // 11 bits buffer fullness
                bits.readInt32(11);

                // 2 bits number of raw data blocks in frame
                const numberOfFrames = bits.readInt32(2) + 1;
                const numberOfSamples = numberOfFrames * 1024;
                const bitRate = frameLength * 8 * sampleRate / numberOfSamples;

                header = new AacAudioHeader(channels, bitRate, sampleRate);
                return {found: true, header: header};
            }

            position += File.bufferSize;
        } while (buffer.length > 3 && (length < 0 || position < end));

        // If we make it to here, we didn't find the audio header
        return {found: false, header: header};
    }

    /**
     * Sets the length of the audio stream represented by the current instance. Until this value
     * has been set, {@see AacAudioHeader.durationMilliseconds} will return an incorrect value.
     * @param streamLength Length of the audio stream in bytes represented by the current instance.
     *     Must be an integer
     */
    public setStreamLength(streamLength: number): void {
        if (!Number.isInteger(streamLength)) {
            throw new Error("Argument out of range: streamLength must be an integer");
        }

        this._streamLength = streamLength;
        this._durationMilliseconds = this._streamLength * 8.0 / this._audioBitrate * 1000;
    }

    // #endregion
}
