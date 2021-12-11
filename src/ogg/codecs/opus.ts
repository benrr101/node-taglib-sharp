import IOggCodec from "./iOggCodec";
import XiphComment from "../../xiph/xiphComment";
import {ByteVector} from "../../byteVector";
import {IAudioCodec, MediaTypes} from "../../iCodec";
import {Guards} from "../../utils";

/**
 * Represents an Ogg Opus bitstream for use within an Ogg file.
 */
export default class Opus implements IOggCodec, IAudioCodec {
    private static readonly magicSignatureHeader = ByteVector.fromString("OpusHead", undefined, undefined, true);
    private static readonly magicSignatureComment = ByteVector.fromString("OpusTags", undefined, undefined, true);

    private readonly _channelCount: number;
    private readonly _channelMap: number;
    private readonly _channelMappings: Uint32Array;
    private readonly _inputSampleRate: number;
    private readonly _opusVersion: number;
    private readonly _preSkip: number;
    private _commentData: ByteVector;
    private _durationMilliseconds: number;
    private _outputGain: number;
    private _streamCount: number;
    private _twoChannelStreamCount: number;

    /**
     * Constructs and initializes a new instance using the provided header packet to read the
     * codec's header information.
     * @param headerPacket Packet containing the header of the stream
     */
    public constructor(headerPacket: ByteVector) {
        Guards.truthy(headerPacket, "headerPacket");
        if (!headerPacket.startsWith(Opus.magicSignatureHeader)) {
            throw new Error(`Argument error: Header packet must start with magic signature`);
        }

        // Head the header
        this._opusVersion = headerPacket.get(8);
        this._channelCount = headerPacket.get(9);
        this._preSkip = headerPacket.mid(10, 2).toUint(false);
        this._inputSampleRate = headerPacket.mid(12, 4).toUint(false);
        this._outputGain = headerPacket.mid(16, 2).toUint(false);
        this._channelMap = headerPacket.get(18);

        if (this._channelMap === 0) {
            this._streamCount = 1;
            this._twoChannelStreamCount = this._channelCount - 1;

            this._channelMappings = new Uint32Array(this._channelCount);
            this._channelMappings[0] = 0;
            if (this._channelCount === 2) {
                this._channelMappings[1] = 1;
            }
        } else {
            this._streamCount = headerPacket.get(19);
            this._twoChannelStreamCount = headerPacket.get(20);

            this._channelMappings = new Uint32Array(this._channelCount);
            for (let i = 0; i < this._channelCount; i++) {
                this._channelMappings[i] = headerPacket.get(21 + i);
            }
        }
    }

    // #region Properties

    /**
     * @inheritDoc
     * @remarks Always returns zero since bitrate is variable and no information is stored in the
     *     Ogg header (unlike Vorbis).
     */
    public get audioBitrate(): number { return 0; }

    /** @inheritDoc */
    public get audioSampleRate(): number { return this._inputSampleRate; }

    /** @inheritDoc */
    public get audioChannels(): number { return this._channelCount; }

    /**
     * Gets the raw Xiph comment data contained in the codec.
     */
    public get commentData(): ByteVector { return this._commentData; }

    /** @inheritDoc */
    public get description(): string { return `Opus v${this._opusVersion} audio`; }

    /** @inheritDoc */
    public get durationMilliseconds(): number { return this._durationMilliseconds || 0; }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.Audio; }

    // #endregion

    // #region Methods

    /**
     * Determines whether or not an Opus header packet based on the presence of the Opus header
     * packet magic signature.
     * @param headerPacket Packet to check
     */
    public static isHeaderPacket(headerPacket: ByteVector): boolean {
        return headerPacket.startsWith(Opus.magicSignatureHeader);
    }

    /** @inheritDoc */
    public readPacket(packet: ByteVector): boolean {
        Guards.truthy(packet, "packet");

        if (!this._commentData && packet.startsWith(Opus.magicSignatureComment)) {
            this._commentData = packet.mid(Opus.magicSignatureComment.length);
        }

        return !!this._commentData;
    }

    /** @inheritDoc */
    public writeCommentPacket(packets: ByteVector[], comment: XiphComment): void {
        Guards.truthy(packets, "packets");
        Guards.truthy(comment, "comment");

        const data = ByteVector.concatenate(
            Opus.magicSignatureComment,
            comment.render(true)
        );

        if (packets.length > 1 && packets[1].startsWith(Opus.magicSignatureComment)) {
            packets[1] = data;
        } else {
            packets.splice(1, 0, data);
        }
    }

    public setDuration(firstGranularPosition: number, lastGranularPosition: number): void {
        Guards.safeUint(firstGranularPosition, "firstGranularPosition");
        Guards.safeUint(lastGranularPosition, "lastGranularPosition");

        // TODO: Verify that 48000 should always be used and not just when sample rate is 48kHz
        const durationSeconds = (lastGranularPosition - firstGranularPosition - (2 * this._preSkip)) / 48000;
        this._durationMilliseconds = durationSeconds * 1000;
    }

    // #endregion
}
