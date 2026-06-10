import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {Guards} from "../../utils";

/**
 * Implements support for ID3v2 Unique File Identifier (UFID) frames.
 */
export default class UniqueFileIdentifierFrame extends Frame {
    private _identifier: ByteVector;
    private _owner: string;

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance using the provided information
     * @param owner Owner of the new frame. Should be an email or url to the database where this
     *     unique identifier is applicable
     * @param identifier Unique identifier to store in the frame. Must be no more than 64 bytes
     */
    public static fromData(owner: string, identifier: ByteVector): UniqueFileIdentifierFrame {
        Guards.notNullOrUndefined(owner, "owner");
        if (identifier && identifier.length > 64) {
            throw new Error("Argument out of range: Identifier cannot be longer than 64 bytes");
        }

        const frame = new UniqueFileIdentifierFrame(new Id3v2FrameHeader(FrameIdentifiers.UFID));
        frame._owner = owner;
        frame._identifier = identifier?.toByteVector();
        return frame;
    }

    /**
     * Constructs and initializes a new instance by parsing the fields from the field bytes.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the fields of the frame
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(
        header: Id3v2FrameHeader,
        fieldBytes: ByteVector,
        version: number
    ): UniqueFileIdentifierFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        // Owner identifier        <text string> $00
        // Identifier              <up to 64 bytes binary data>

        const fields = fieldBytes.split(ByteVector.getTextDelimiter(StringType.Latin1));
        if (fields.length !== 2) {
            throw new CorruptFileError("Unique file identifier frame must contain two fields, separated by 0x00");
        }

        const frame = new UniqueFileIdentifierFrame(header);
        frame._owner = fields[0].toString(StringType.Latin1);
        frame._identifier = fields[1].toByteVector();

        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.UniqueFileIdentifierFrame; }

    /**
     * Gets the owner of this unique ID.
     */
    public get owner(): string { return this._owner; }

    /**
     * Gets the identifier data stored in the current instance.
     */
    public get identifier(): ByteVector { return this._identifier; }
    /**
     * Sets the identifier data stored in the current instance.
     */
    public set identifier(value: ByteVector) {
        Guards.truthy(value, "value");
        if (value.length > 64) {
            throw new Error("Argument out of range: value must be no more than 64 characters");
        }
        this._identifier = value;
    }

    // #endregion

    // #region Methods

    /**
     * Gets a unique file identifier frame from a list of frames
     * @param frames List of frames to search
     * @param owner Owner to match
     * @returns Frame containing the matching user, `undefined` if a match was not found
     */
    public static find(frames: UniqueFileIdentifierFrame[], owner: string): UniqueFileIdentifierFrame {
        Guards.truthy(frames, "frames");
        return frames.find((f) => f.owner === owner);
    }

    /** @inheritDoc */
    public clone(): Frame {
        const frame = new UniqueFileIdentifierFrame(new Id3v2FrameHeader(FrameIdentifiers.UFID));
        frame._owner = this._owner;
        frame._identifier = this._identifier?.toByteVector();
        return frame;
    }

    /** @inheritDoc */
    protected renderFields(): ByteVector {
        return ByteVector.concatenate(
            ByteVector.fromString(this._owner, StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            this._identifier
        );
    }

    // #endregion
}
