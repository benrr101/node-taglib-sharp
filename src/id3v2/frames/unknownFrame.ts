import Frame from "./frame";
import {ByteVector} from "../../byteVector";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifier} from "../frameIdentifiers";
import {Guards} from "../../utils";

/**
 * Fallback type when no other frame class works for a given frame.
 */
export default class UnknownFrame extends Frame {
    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initialized a new instance by storing the body bytes.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the body of the frame
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(header: Id3v2FrameHeader, fieldBytes: ByteVector, version: number): UnknownFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        const frame = new UnknownFrame(header);
        frame.data = fieldBytes.toByteVector();
        return frame;
    }

    /**
     * Constructs and initializes a new instance with a specified type
     * @param identifier ID3v2 frame identifier
     * @param data Contents of the frame
     */
    public static fromData(identifier: FrameIdentifier, data?: ByteVector): UnknownFrame {
        Guards.truthy(identifier, "identifier");

        const frame = new UnknownFrame(new Id3v2FrameHeader(identifier));
        frame.data = data?.toByteVector();
        return frame;
    }

    /**
     * Gets and sets the field data in the current instance
     */
    public data: ByteVector;

    /** @inheritDoc */
    public clone(): Frame {
        return UnknownFrame.fromData(this.header.frameId, this.data);
    }

    /** @inheritDoc */
    protected renderFields(): ByteVector {
        return this.data || ByteVector.empty();
    }
}
