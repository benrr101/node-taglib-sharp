import Frame from "./frame";
import {ByteVector} from "../../byteVector";
import {CorruptFileError, NotSupportedError} from "../../errors";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {ArrayUtils, Guards} from "../../utils";

/**
 * This class extends {@link Frame} implementing support for ID3v2 play count (PCNT) frames.
 */
export default class PlayCountFrame extends Frame {
    private _playCount: bigint;

    private constructor(header: Id3v2FrameHeader) {
        super(header);
        this._playCount = BigInt(0);
    }

    // #region Constructors

    /**
     * Constructs and initialized a new instance by parsing values from the field data.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the body of the frame
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(header: Id3v2FrameHeader, fieldBytes: ByteVector, version: number): PlayCountFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        if (fieldBytes.length < 4) {
            throw new CorruptFileError("Play count frame must contain at least 4 bytes.");
        }
        if (fieldBytes.length > 8) {
            throw new NotSupportedError("node-taglib-sharp only supports up to 64-bits of play count values.");
        }

        // Counter        $xx xx xx xx (xx ...)

        const frame = new PlayCountFrame(header);
        frame._playCount = fieldBytes.toUlong();
        return frame;
    }

    /**
     * Constructs and initializes a new instance with a play count.
     * @param playCount Optional, number of times the track has been played. If omitted, defaults
     *     to `0`.
     */
    public static fromFields(playCount: bigint = BigInt(0)): PlayCountFrame {
        Guards.ulong(playCount, "playCount");

        const frame = new PlayCountFrame(new Id3v2FrameHeader(FrameIdentifiers.PCNT));
        frame._playCount = playCount;

        return frame;
    }

    // #endregion

    // #region Public Properties

    /**
     * Gets the play count of the current instance.
     */
    public get playCount(): bigint { return this._playCount; }
    /**
     * Sets the play count of the current instance.
     * @param value Number of times this track has been played
     */
    public set playCount(value: bigint) {
        Guards.ulong(value, "value");
        this._playCount = value;
    }

    // #endregion

    public static filterFrames(frames: Frame[]): PlayCountFrame[] {
        Guards.truthy(frames, "frames");
        return ArrayUtils.ofType(frames, PlayCountFrame);
    }

    /** @inheritDoc */
    public clone(): Frame {
        const frame = new PlayCountFrame(new Id3v2FrameHeader(FrameIdentifiers.PCNT));
        frame.playCount = this.playCount;
        return frame;
    }

    /** @inheritDoc */
    protected renderFields(): ByteVector {
        const data = ByteVector.fromUlong(this.playCount);

        let ptr = 0;
        while (ptr < data.length - 4 && data.get(ptr) === 0) {
            ptr++;
        }

        return data.subarray(ptr);
    }
}
