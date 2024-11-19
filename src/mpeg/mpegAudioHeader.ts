import XingHeader from "./xingHeader";
import VbrHeader from "./vbrHeader";
import VbriHeader from "./vbriHeader";
import {ByteVector} from "../byteVector";
import {File} from "../file";
import {IAudioCodec, MediaTypes} from "../properties";
import {ChannelMode, MpegVersion} from "./mpegEnums";
import {Guards, NumberUtils} from "../utils";

/**
 * Provides information about an MPEG audio stream. For more information and definition of the
 * header, see http://www.mpgedit.org/mpgedit/mpeg_format/mpeghdr.htm
 */
export default class MpegAudioHeader implements IAudioCodec {
    private static readonly BITRATES: number[][][] = [
        [ // Version 1
            [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1], // layer 1
            [0, 32, 48, 56,  64,  80,  96, 112, 128, 160, 192, 224, 256, 320, 384, -1], // layer 2
            [0, 32, 40, 48,  56,  64,  80,  96, 112, 128, 160, 192, 224, 256, 320, -1]  // layer 3
        ],
        [ // Version 2 or 2.5
            [0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, -1], // layer 1
            [0,  8, 16, 24, 32, 40, 48,  56,  64,  80,  96, 112, 128, 144, 160, -1], // layer 2
            [0,  8, 16, 24, 32, 40, 48,  56,  64,  80,  96, 112, 128, 144, 160, -1]  // layer 3
        ]
    ];

    private static readonly BLOCK_SIZES: number[][] = [
        [0, 384, 1152, 1152], // Version 1
        [0, 384, 1152,  576], // Version 2
        [0, 384, 1152,  576]  // Version 2.5
    ];

    private static readonly SAMPLE_RATES: number[][] = [
        [44100, 48000, 32000, 0], // Version 1
        [22050, 24000, 16000, 0], // Version 2
        [11025, 12000,  8000, 0]  // Version 2.5
    ];

    private readonly _bitrate: number;
    private readonly _channelMode: ChannelMode;
    private readonly _layer: number;
    private readonly _isCopyrighted: boolean;
    private readonly _isOriginal: boolean;
    private readonly _isProtected: boolean;
    private readonly _sampleRate: number;
    private readonly _samplesPerFrame: number;
    private readonly _streamLength: number;
    private readonly _version: MpegVersion;
    private readonly _versionString: string;

    private _vbrHeader: VbrHeader;

    // #region Constructors

    private constructor(flags: number, streamLength: number) {
        this._streamLength = streamLength;

        // TODO: These could be moved to C#-like Lazy instances
        // TODO: Introduce an MPEG flags enum

        // Bit 19: Version
        switch (NumberUtils.uintAnd(NumberUtils.uintRShift(flags, 19), 0x03)) {
            case 0:
                this._version = MpegVersion.Version25;
                this._versionString = "2.5";
                break;
            case 2:
                this._version = MpegVersion.Version2;
                this._versionString = "2";
                break;
            default:
                this._version = MpegVersion.Version1;
                this._versionString = "1";
                break;
        }

        // Bits 18-17: Audio layer
        switch (NumberUtils.uintAnd(NumberUtils.uintRShift(flags, 17), 0x03)) {
            case 1:
                this._layer = 3;
                break;
            case 2:
                this._layer = 2;
                break;
            default:
                this._layer = 1;
                break;
        }

        // Bit 16: Error protection
        this._isProtected = NumberUtils.hasFlag(flags, 0x10000);

        // Bits 15-12: Bit rate (as per header)
        const bitrateIndex1 = this._version === MpegVersion.Version1 ? 0 : 1;
        const bitrateIndex2 = this._layer - 1;
        const bitrateIndex3 = NumberUtils.uintAnd(NumberUtils.uintRShift(flags, 12), 0x0F);
        this._bitrate = MpegAudioHeader.BITRATES[bitrateIndex1][bitrateIndex2][bitrateIndex3];

        // Bits 11-10: Sample rate
        const sampleRateIndex2 = NumberUtils.uintAnd(NumberUtils.uintRShift(flags, 10), 0x03);
        this._sampleRate = MpegAudioHeader.SAMPLE_RATES[this._version][sampleRateIndex2];

        // Bit 9: Frame padding - not needed today (maybe if we support accurate reading someday we will)

        // Bit 8: Private bit - unknown meaning, skipping

        // Bit 7-6: Channel mode
        this._channelMode = NumberUtils.uintAnd(NumberUtils.uintRShift(flags, 6), 0x03);

        // Bit 5-4: Join stereo mode extension - not useful here, skipping

        // Bit 3: Copyright
        this._isCopyrighted = NumberUtils.hasFlag(flags, 0x08);

        // Bit 2: Original
        this._isOriginal = NumberUtils.hasFlag(flags, 0x04);

        // Bit 1-0: Emphasis - not useful here, skipping

        // Lookup samples per frame
        this._samplesPerFrame = MpegAudioHeader.BLOCK_SIZES[this._version][this._layer];
    }

    public static fromFile(file: File, startPosition: number, endPosition: number, maxLength?: number): MpegAudioHeader {
        Guards.truthy(file, "file");
        Guards.safeUint(startPosition, "startPosition");
        Guards.safeUint(endPosition, "endPosition");
        if (maxLength !== undefined) {
            Guards.safeUint(maxLength, "maxLength");
        }

        // Scan the file to find the header
        let flags: number;
        let filePosition = startPosition;
        const searchEnd = maxLength > 0 ? startPosition + maxLength : endPosition;
        while (filePosition < searchEnd) {
            // Read a buffer worth of bytes, at least 4, from the file
            file.seek(filePosition);
            const buffer = file.readBlock(File.bufferSize);
            if (buffer.length < 4) {
                break;
            }

            // Scan the buffer for the header signature
            // Note: We need at least 4 bytes to check for a header, so once we get less than 4
            //     bytes left in the buffer just skip it to avoid the subarray allocation and
            //     function call to check it.
            for (let i = 0; i < buffer.length - 4; i++) {
                const headerBytes = buffer.subarray(i, 4);
                if (this.isHeaderValid(headerBytes)) {
                    flags = headerBytes.toUint();
                    filePosition += i;

                    break;
                }
            }

            if (flags) {
                break;
            }

            // Advance to the end of the buffer, minus the 3 bytes we didn't try to check
            filePosition += buffer.length - 3;
        }

        if (!flags) {
            return undefined;
        }

        // Create the header from the flags
        const header = new MpegAudioHeader(flags, endPosition - startPosition);

        header._vbrHeader =
            XingHeader.fromFile(
                file,
                filePosition,
                header._version,
                header._channelMode,
                header._samplesPerFrame,
                header._sampleRate,
                header._streamLength
            ) || VbriHeader.fromFile(
                file,
                filePosition,
                header._samplesPerFrame,
                header._sampleRate
            );

        return header;
    }

    // /**
    //  * Constructs and initializes a new instance by populating it with specified values.
    //  * @param flags Flags for the new instance
    //  * @param streamLength Stream length of the new instance
    //  * @param xingHeader Xing header associated with the new instance
    //  * @param vbriHeader VBRI header associated with the new instance
    //  */
    // public static fromInfo(
    //     flags: number,
    //     streamLength: number,
    //     xingHeader: XingHeader,
    //     vbriHeader: VbriHeader
    // ): MpegAudioHeader {
    //     Guards.uint(flags, "flags");
    //     Guards.safeUint(streamLength, "streamLength");
    //     Guards.truthy(xingHeader, "xingHeader");
    //     Guards.truthy(vbriHeader, "vbriHeader");
    //
    //     const header = new MpegAudioHeader();
    //     header._flags = flags;
    //     header._streamLength = streamLength;
    //     header._xingHeader = xingHeader;
    //     header._vbriHeader = vbriHeader;
    //     header._durationMilliseconds = 0;
    //
    //     return header;
    // }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get audioBitrate(): number { return this._vbrHeader?.bitrateKilobytes || this._bitrate; }

    /** @inheritDoc */
    public get audioChannels(): number { return this.channelMode === ChannelMode.SingleChannel ? 1 : 2; }

    /**
     * Gets the MPEG audio layer used to encode the audio represented by the current instance.
     */
    public get audioLayer(): number { return this._layer; }

    /** @inheritDoc */
    public get audioSampleRate(): number { return this._sampleRate; }

    /**
     * Gets the MPEG audio channel mode of the audio represented by the current instance.
     */
    public get channelMode(): ChannelMode { return this._channelMode; }

    /** @inheritDoc */
    public get description(): string {
        let result = `MPEG Version ${this._versionString} Audio, Layer ${this._layer}`;
        if (this._vbrHeader?.bitrateKilobytes) {
            result += " VBR";
        }

        return result;
    }

    /** @inheritDoc */
    public get durationMilliseconds(): number {
        return this._vbrHeader?.durationMilliseconds || (this._streamLength * 8) / this.audioBitrate;
    }

    /**
     * Whether the current audio is copyrighted.
     */
    public get isCopyrighted(): boolean { return this._isCopyrighted }

    /**
     * Whether the current audio is original.
     */
    public get isOriginal(): boolean { return this._isOriginal; }

    /**
     * Gets whether the audio represented by the current instance is protected by CRC.
     */
    public get isProtected(): boolean { return this._isProtected; }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.Audio; }

    /**
     * Gets the MPEG version used to encode the audio represented by the current instance.
     */
    public get version(): MpegVersion { return this._version }

    // #endregion

    private static isHeaderValid(data: ByteVector): boolean {
        // We assume that data is at least 4 bytes long.
        if (data.get(0) != 0xFF) {
            // First byte must be FF
            return false;
        }

        const byte1 = data.get(1);
        if (NumberUtils.uintAnd(byte1, 0xE0) != 0xE0) {
            // First 3 bits of second byte (highest) must be set
            return false;
        }
        if (NumberUtils.uintAnd(byte1, 0x18) === 0x08) {
            // Bits 4 and 5 cannot be 0b01
            return false;
        }
        if (NumberUtils.uintAnd(byte1, 0x06) === 0x00) {
            // Bits 6 and 7 cannot be 0b00
            return false;
        }

        return true;
    }
}
