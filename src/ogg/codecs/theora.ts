import IOggCodec from "./iOggCodec";
import XiphComment from "../../xiph/xiphComment";
import {ByteVector} from "../../byteVector";
import {IVideoCodec, MediaTypes} from "../../iCodec";
import {Guards, NumberUtils} from "../../utils";

/**
 * Types of packets that occur within an Ogg Theora bitstream.
 */
enum TheoraPacketType {
    Header = 0x80,
    Comment = 0x81
}

/**
 * Represents an Ogg Theora bitstream for use in an Ogg file.
 */
export default class Theora implements IOggCodec, IVideoCodec {
    private static readonly id = ByteVector.fromString("theora", undefined, undefined, true);

    private readonly _fpsDenominator: number;
    private readonly _fpsNumerator: number;
    private readonly _height: number;
    private readonly _keyframeGranuleShift: number;
    private readonly _majorVersion: number;
    private readonly _minorVersion: number;
    private readonly _reversionVersion: number;
    private readonly _width: number;
    private _commentData: ByteVector;
    private _durationMilliseconds: number;

    /**
     * Constructs and initializes a new instance using the provided header packet.
     * @param headerPacket Packet that contains the Theora header data
     */
    public constructor(headerPacket: ByteVector) {
        Guards.truthy(headerPacket, "headerPacket");
        if (!Theora.isHeaderPacket(headerPacket)) {
            throw new Error("Argument error: packet must have proper signature for Theora header packet");
        }

        this._majorVersion = headerPacket.get(7);
        this._minorVersion = headerPacket.get(8);
        this._reversionVersion = headerPacket.get(9);
        this._width = headerPacket.mid(14, 3).toUint();
        this._height = headerPacket.mid(17, 3).toUint();
        this._fpsNumerator = headerPacket.mid(22, 4).toUint();
        this._fpsDenominator = headerPacket.mid(26, 4).toUint();

        const lastBits = headerPacket.mid(40, 2).toShort();
        this._keyframeGranuleShift = NumberUtils.uintAnd(NumberUtils.uintLShift(lastBits, 5), 0x1F);
    }

    /** @inheritDoc */
    public get commentData(): ByteVector { return this._commentData; }

    /** @inheritDoc */
    public get description(): string { return `Theora v${this._majorVersion}.${this._minorVersion} video`; }

    /** @inheritDoc */
    public get durationMilliseconds(): number

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.Video; }

    /** @inheritDoc */
    public get videoHeight(): number { return this._height; }

    /** @inheritDoc */
    public get videoWidth(): number { return this._width; }

    /**
     * Checks to see if packet is a Theora header packet.
     * @param packet Packet to check
     */
    public static isHeaderPacket(packet: ByteVector): boolean {
        return packet.get(0) === TheoraPacketType.Header && packet.containsAt(Theora.id, 1);
    }

    /** @inheritDoc */
    public readPacket(packet: ByteVector): boolean {
        Guards.truthy(packet, "packet");

        if (!this._commentData && packet.get(0) === TheoraPacketType.Comment) {
            this._commentData = packet.mid(7);
        }

        return !!this._commentData;
    }

    /** @inheritDoc */
    public setDuration(firstGranularPosition: number, lastGranularPosition: number): void {
        const durationSeconds = this.getGranuleTime(lastGranularPosition) - this.getGranuleTime(firstGranularPosition);
        this._durationMilliseconds = durationSeconds * 1000;
    }

    /** @inheritDoc */
    public writeCommentPacket(packets: ByteVector[], comment: XiphComment): void {
        Guards.truthy(packets, "packets");
        Guards.truthy(comment, "comment");

        const data = ByteVector.concatenate(
            TheoraPacketType.Comment,
            Theora.id,
            comment.render(true)
        );

        if (packets.length > 1 && packets[1].get(0) === TheoraPacketType.Comment) {
            packets[1] = data;
        } else {
            packets.splice(1, 0, data);
        }
    }

    private getGranuleTime(granularPosition: number): number {
        const iframe = NumberUtils.uintLShift(granularPosition, this._keyframeGranuleShift);
        const pframe = granularPosition - NumberUtils.uintRShift(iframe, this._keyframeGranuleShift);
        return (iframe + pframe) * (this._fpsDenominator / this._fpsNumerator);
    }
}
