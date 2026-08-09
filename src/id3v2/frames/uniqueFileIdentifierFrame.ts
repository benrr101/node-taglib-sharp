import Frame from "./frame";
import FrameHeader from "./frameHeader";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {FrameIdentifiers} from "../frameIdentifiers";
import {ArrayUtils, Guards} from "../../utils";
import {Id3v2Version} from "../enums";

/**
 * Implements support for ID3v2 Unique File Identifier (UFID) frames.
 */
export default class UniqueFileIdentifierFrame extends Frame {
    private _identifier: ByteVector;
    private _owner: string;

    // #region Constructors

    private constructor(header: FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance by parsing the fields from the field bytes.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the fields of the frame
     * @param _version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(
        header: FrameHeader,
        fieldBytes: ByteVector,
        _version: Id3v2Version
    ): UniqueFileIdentifierFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");

        // Owner identifier        <text string> $00
        // Identifier              <up to 64 bytes binary data>

        const delim = ByteVector.getTextDelimiter(StringType.Latin1);
        const identifierDelimiterOffset = fieldBytes.find(delim);
        if (identifierDelimiterOffset < 0) {
            throw new CorruptFileError("Unique file identifier frame must contain two fields, separated by 0x00");
        }

        const frame = new UniqueFileIdentifierFrame(header);
        frame._owner = fieldBytes.subarray(0, identifierDelimiterOffset).toString(StringType.Latin1);
        frame._identifier = fieldBytes.subarray(identifierDelimiterOffset + delim.length).toByteVector();

        return frame;
    }

    /**
     * Constructs and initializes a new instance using the provided information
     * @param owner Optional, owner of the identifier. Should be an email or url to the database
     *     where this unique identifier is applicable. If omitted, defaults to `""`.
     * @param identifier Optional, unique identifier to store in the frame. Must be no more than 64
     *     bytes. If omitted, defaults to an empty {@link ByteVector}.
     */
    public static fromFields(owner?: string, identifier?: ByteVector): UniqueFileIdentifierFrame {
        if (identifier && identifier.length > 64) {
            throw new Error("Argument out of range: Identifier cannot be longer than 64 bytes");
        }

        const frame = new UniqueFileIdentifierFrame(new FrameHeader(FrameIdentifiers.UFID));
        frame._owner = owner ?? "";
        frame._identifier = identifier ?? ByteVector.empty();

        return frame;
    }

    // #endregion

    // #region Properties

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

    public static filterFrames(frames: Frame[]): UniqueFileIdentifierFrame[] {
        Guards.truthy(frames, "frames");
        return ArrayUtils.ofType(frames, UniqueFileIdentifierFrame);
    }

    /** @inheritDoc */
    public clone(): Frame {
        const frame = new UniqueFileIdentifierFrame(new FrameHeader(FrameIdentifiers.UFID));
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
