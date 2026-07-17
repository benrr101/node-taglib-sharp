import Frame from "./frame";
import {ByteVector} from "../../byteVector";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {ArrayUtils, Guards} from "../../utils";

/**
 * Class extends {@link Frame}, implementing support for ID3v2 Music CD Identifier (MCDI) frames.
 * Music CD identifier frames should contain the table of contents data as stored on the physical
 * CD. It is primarily used for track information lookup through web sources like CDDB.
 */
// @TODO: This is basically identical to unknown frame. Surely we could abstract some of this.
export default class MusicCdIdentifierFrame extends Frame {
    private _data: ByteVector;

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initialized a new instance by storing the bytes of the frame.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the body of the frame
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(
        header: Id3v2FrameHeader,
        fieldBytes: ByteVector,
        version: number
    ): MusicCdIdentifierFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        const frame = new MusicCdIdentifierFrame(header);
        frame._data = fieldBytes.toByteVector();
        return frame;
    }

    /**
     * Constructs and initializes a new instance with the specified bytes.
     * @param data Optional, contents of the frame. If omitted, defaults to an empty
     *     {@link ByteVector}.
     */
    public static fromFields(data?: ByteVector): MusicCdIdentifierFrame {
        const frame = new MusicCdIdentifierFrame(new Id3v2FrameHeader(FrameIdentifiers.MCDI));
        frame._data = data ?? ByteVector.empty();

        return frame;
    }

    /**
     * Gets the identifier data stored in the current instance
     */
    public get data(): ByteVector { return this._data; }
    /**
     * Sets the identifier data stored in the current instance
     * @param value ByteVector containing the identifier stored in the current instance
     */
    public set data(value: ByteVector) { this._data = value; }

    public static filterFrames(frames: Frame[]): MusicCdIdentifierFrame[] {
        Guards.truthy(frames, "frames");
        return ArrayUtils.ofType(frames, MusicCdIdentifierFrame);
    }

    /** @inheritDoc */
    public clone(): MusicCdIdentifierFrame {
        return MusicCdIdentifierFrame.fromFields(this._data.toByteVector());
    }

    /** @inheritDoc */
    protected renderFields(): ByteVector {
        return this._data;
    }
}
