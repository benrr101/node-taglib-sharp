import TextInformationFrame from "./textInformationFrame";
import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {Guards, StringComparison} from "../../utils";
import {CorruptFileError} from "../../errors";

export default class UserTextInformationFrame extends TextInformationFrame {
    private _description: string;

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance with a specified description and text encoding.
     * @param description Description of the new frame
     * @param encoding Text encoding to use when rendering the new frame
     */
    public static fromDescription(
        description: string,
        encoding: StringType = Id3v2Settings.defaultEncoding
    ): UserTextInformationFrame {
        const frame = new UserTextInformationFrame(new Id3v2FrameHeader(FrameIdentifiers.TXXX));
        frame._encoding = encoding;
        frame._description = description;
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
    ): UserTextInformationFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        if (fieldBytes.length < 1) {
            throw new CorruptFileError("User text identifier frame must contain at least 1 byte.");
        }

        // Text encoding     $xx
        // Description       <text string according to encoding> $00 (00)
        // Value             <text string according to encoding>

        const frame = new UserTextInformationFrame(header);

        // Read the encoding of the text in the frame
        frame._encoding = fieldBytes.get(0);

        const fields = fieldBytes.subarray(1).toStrings(frame._encoding);
        if (fields.length < 2) {
            // Ill-formed frame, assume an undefined description
            frame._description = undefined;
            frame._textFields = fields;
        } else {
            // Well-formed frame, field 1 is description, field 2+ is data
            frame._description = fields[0];
            frame._textFields = fields.slice(1);
        }

        return frame;
    }

    // #endregion

    // #region Properties

    public get frameClassType(): FrameClassType { return FrameClassType.UserTextInformationFrame; }

    /**
     * Gets the description stored in the current instance.
     */
    public get description(): string { return this._description; }
    /**
     * Sets the description stored in the current instance.
     * There should only be one frame with the specified description per tag.
     * @param value Description to store in the current instance.
     */
    public set description(value: string) { this._description = value; }

    /**
     * Gets the text contained in the current instance.
     * NOTE: Modifying the contents of the returned value will not modify the contents of the
     * current instance. The value must be reassigned for the value to change.
     */
    public get text(): string[] { return this._textFields.slice(); }
    /**
     * Sets the text contained in the current instance.
     * @param value Array of text values to store in the current instance
     */
    public set text(value: string[]) { this._textFields = value ? value.slice() : []; }

    // #endregion

    // #region Public Methods

    /**
     * Gets a user text information frame from a specified tag
     * @param frames Object to search in
     * @param description Description to use to match the frame in the `tag`
     * @param caseSensitive Whether or not to search for the frame case-sensitively.
     * @returns Frame containing the matching user, `undefined` if a match was not found
     */
    public static findUserTextInformationFrame(
        frames: UserTextInformationFrame[],
        description: string,
        caseSensitive: boolean = true
    ): UserTextInformationFrame {
        Guards.truthy(frames, "frames");
        Guards.truthy(description, "description");

        const comparison = caseSensitive ? StringComparison.caseSensitive : StringComparison.caseInsensitive;
        return frames.find((f) => comparison(f.description, description));
    }

    /** @inheritDoc */
    public clone(): Frame {
        const frame = UserTextInformationFrame.fromDescription(this._description, this._encoding);
        frame._textFields = this._textFields.slice();
        return frame;
    }

    /** @inheritDoc */
    public toString(): string {
        return `[${this.description}] ${super.toString()}`;
    }

    /** @inheritDoc */
    protected parseFields(data: ByteVector, _version: number): void { }

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        if (!this._description && this._textFields.length === 0) {
            return ByteVector.empty();
        }

        const encoding = TextInformationFrame.correctEncoding(this._encoding, version);
        const v = ByteVector.empty();
        v.addByte(encoding);
        v.addByteVector(ByteVector.fromString(this._description ?? "", encoding));

        for (const text of this._textFields) {
            v.addByteVector(ByteVector.getTextDelimiter(encoding));
            if (text) {
                v.addByteVector(ByteVector.fromString(text, encoding));
            }
        }

        if (this._textFields.length === 0) {
            v.addByteVector(ByteVector.getTextDelimiter(encoding));
        }

        return v;
    }

    // #endregion
}