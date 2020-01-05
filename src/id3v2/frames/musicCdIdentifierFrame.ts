import FrameTypes from "../frameTypes";
import {ByteVector} from "../../byteVector";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {Guards} from "../../utils";

/**
 * Class extends {@see Frame}, implementing support for ID3v2 Music CD Identifier (MCDI) frames.
 * Music CD identifer frames should contain the table of contents data as stored on the physical
 * CD. It is primarily used for track information lookup through web sources like CDDB.
 */
export default class MusicCdIdentifierFrame extends Frame {
    private _data: ByteVector;

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance of MusicCdIdentifier frame by reading its raw data
     * in a specified ID3v2 version starting at a specified offset.
     * @param data Raw representation of the new frame.
     * @param offset Offset into {@paramref data} where the frame actually begins. Must be a
     *     positive, safe integer
     * @param header Header of the frame found at {@paramref offset} in the data
     */
    public static fromOffsetRawData(data: ByteVector, offset: number, header: Id3v2FrameHeader) {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");

        const frame = new MusicCdIdentifierFrame(header);
        frame.setData(data, offset, false);
        return frame;
    }

    /**
     * Constructs and initializes a new instance of MusicCdIdentifierFrame by reading its raw data
     * in a specified ID3v2 version.
     * @param data ByteVector object starting with the raw representation of the new frame
     * @param version The ID3v2 version the raw frame is encoded in. Must be positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number): MusicCdIdentifierFrame {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        const frame = new MusicCdIdentifierFrame(new Id3v2FrameHeader(FrameTypes.MCDI, 4));
        frame.setData(data, 0, true);
        return frame;
    }

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.MusicCdIdentiferFrame; }

    /**
     * Gets the identifier data stored in the current instance
     */
    public get data(): ByteVector { return this._data; }
    /**
     * Sets the identifier data stored in the current instance
     * @param value ByteVector containing the identifier stored in the current instance
     */
    public set data(value: ByteVector) { this._data = value; }

    /** @inheritDoc */
    public clone(): Frame {
        const frame = new MusicCdIdentifierFrame(new Id3v2FrameHeader(FrameTypes.MCDI, 4));
        if (this.data) {
            frame.data = ByteVector.fromByteVector(this.data);
        }
        return frame;
    }

    /**
     * Populates the values in the current instance.
     * @param data ByteVector containing the extracted field data.
     * @param version Ignored.
     */
    protected parseFields(data: ByteVector, version: number): void {
        this.data = data;
    }

    /**
     * Renders the value in current instance into field data.
     * @param version Ignored.
     */
    protected renderFields(version: number): ByteVector {
        return this.data || ByteVector.empty();
    }
}
