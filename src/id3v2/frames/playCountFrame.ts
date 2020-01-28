import * as BigInt from "big-integer";
import FrameTypes from "../frameIdentifiers";
import {ByteVector} from "../../byteVector";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {Guards} from "../../utils";

/**
 * This class extends {@see Frame} implementing support for ID3v2 play count (PCNT) frames.
 */
export default class PlayCountFrame extends Frame {
    private _playCount: BigInt.BigInteger;

    private constructor(header: Id3v2FrameHeader) {
        super(header);
        this._playCount = BigInt.zero;
    }

    // #region Constructors

    /**
     * Constructs and initializes a new instance with a count of zero
     */
    public static fromEmpty(): PlayCountFrame {
        return new PlayCountFrame(new Id3v2FrameHeader(FrameTypes.PCNT, 4));
    }

    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader
    ): PlayCountFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");

        const frame = new PlayCountFrame(header);
        frame.setData(data, offset, false);
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified ID3v2
     * version
     * @param data ByteVector starting with the raw representation of the new frame
     * @param version ID3v2 veersion the raw frame is encoded in, must be a positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number): PlayCountFrame {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        const frame = new PlayCountFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, true);
        return frame;
    }

    // #endregion

    // #region Public Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.PlayCountFrame; }

    /**
     * Gets the play count of the current instance.
     */
    public get playCount(): BigInt.BigInteger { return this._playCount; }
    /**
     * Sets the play count of the current instance.
     * @param value Number of times this track has been played
     */
    public set playCount(value: BigInt.BigInteger) {
        Guards.ulong(value, "value");
        this._playCount = value;
    }

    // #endregion

    /** @inheritDoc */
    public clone(): Frame {
        const frame = new PlayCountFrame(new Id3v2FrameHeader(FrameTypes.PCNT, 4));
        frame.playCount = this.playCount;
        return frame;
    }

    /** @inheritDoc */
    protected parseFields(data: ByteVector, version: number) {
        this.playCount = data.toULong();
    }

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        const data = ByteVector.fromULong(this.playCount);
        while (data.length > 4 && data.get(0) === 0) {
            data.removeAtIndex(0);
        }

        return data;
    }
}
