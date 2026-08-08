import Frame from "./frame";
import FrameHeader from "./frameHeader";
import {ByteVector} from "../../byteVector";
import {FrameIdentifier} from "../frameIdentifiers";
import {ArrayUtils, Guards} from "../../utils";
import {Id3v2Version} from "../enums";

/**
 * Fallback type when no other frame class works for a given frame.
 */
export default class UnknownFrame extends Frame {
    private constructor(header: FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initialized a new instance by storing the body bytes.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the body of the frame
     * @param _version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(header: FrameHeader, fieldBytes: ByteVector, _version: Id3v2Version): UnknownFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");

        const frame = new UnknownFrame(header);
        frame.data = fieldBytes.toByteVector();
        return frame;
    }

    /**
     * Constructs and initializes a new instance with a specified type
     * @param identifier ID3v2 frame identifier
     * @param data Optional, contents of the frame. If omitted, defaults to an empty
     *     {@link ByteVector}.
     */
    public static fromFields(identifier: FrameIdentifier, data?: ByteVector): UnknownFrame {
        Guards.truthy(identifier, "identifier");

        const frame = new UnknownFrame(new FrameHeader(identifier));

        frame.data = data ?? ByteVector.empty();
        return frame;
    }

    /**
     * Gets and sets the field data in the current instance
     */
    public data: ByteVector;

    public static filterFrames(frames: Frame[]): UnknownFrame[] {
        Guards.truthy(frames, "frames");
        return ArrayUtils.ofType(frames, UnknownFrame);
    }

    /** @inheritDoc */
    public clone(): Frame {
        return UnknownFrame.fromFields(this.frameId, this.data.toByteVector());
    }

    /** @inheritDoc */
    protected renderFields(): ByteVector {
        return this.data || ByteVector.empty();
    }
}
