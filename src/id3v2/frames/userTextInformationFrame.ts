import Frame from "./frame";
import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {ArrayUtils, Guards} from "../../utils";

export default class UserTextInformationFrame extends Frame {
    private _description: string;
    private _encoding: StringType;
    private _textFields: string[];

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
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
            // Ill-formed frame, assume an empty description
            frame._description = "";
            frame._textFields = fields;
        } else {
            // Well-formed frame, field 1 is description, field 2+ is data
            frame._description = fields[0];
            frame._textFields = fields.slice(1);
        }

        return frame;
    }

    /**
     * Constructs and initializes a new instance with a specified description, text fields, and
     * text encoding.
     * @param description Optional, description of the new frame. If omitted, defaults to `""`.
     * @param text Optional, text fields to store in the new frame. If omitted, defaults to an
     *     empty array.
     * @param encoding Optional, text encoding to use when rendering the new frame. If omitted,
     *     defaults to {@link Id3v2Settings.defaultEncoding}.
     */
    public static fromFields(description?: string, text?: string[], encoding?: StringType
    ): UserTextInformationFrame {
        const frame = new UserTextInformationFrame(new Id3v2FrameHeader(FrameIdentifiers.TXXX));
        frame._encoding = encoding ?? Id3v2Settings.defaultEncoding;
        frame._description = description ?? "";
        frame._textFields = text ?? [];
        return frame;
    }

    // #endregion

    // #region Properties

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
     */
    public get text(): string[] { return this._textFields; }
    /**
     * Sets the text contained in the current instance.
     * @param value Array of text values to store in the current instance
     */
    public set text(value: string[]) { this._textFields = value ?? []; }

    /**
     * Gets the text encoding to use when rendering the current instance.
     */
    public get textEncoding(): StringType { return this._encoding; }
    /**
     * Sets the text encoding to use when rendering the current instance.
     * This value will be overridden if {@link Id3v2Settings.forceDefaultEncoding} is `true`.
     */
    public set textEncoding(value: StringType) { this._encoding = value; }

    // #endregion

    // #region Public Methods

    public static filterFrames(frames: Frame[]): UserTextInformationFrame[] {
        Guards.truthy(frames, "frames");
        return ArrayUtils.ofType(frames, UserTextInformationFrame);
    }

    /** @inheritDoc */
    public clone(): Frame {
        return UserTextInformationFrame.fromFields(this._description, this._textFields.slice(), this._encoding);
    }

    /** @inheritDoc */
    public toString(): string {
        return `[${this._description}] ${this._textFields.join("; ")}`;
    }

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        if (!this._description && this._textFields.length === 0) {
            return ByteVector.empty();
        }

        // Convert ["x", "y", "z"] into [bv("x"), bv(0), bv("y"), bv(0), bv("z"), bv(0)]
        const encoding = Frame.correctEncoding(this._encoding, version);
        const renderedFields = this._textFields.filter(f => !!f)
            .map(f => [ByteVector.fromString(f, encoding), ByteVector.getTextDelimiter(encoding)])
            .reduce(
                (flattened, nested) => {
                    flattened.push(... nested);
                    return flattened;
                },
                []
            );
        // @TODO: Update to use .flat

        return ByteVector.concatenate(
            encoding,
            ByteVector.fromString(this._description ?? "", encoding),
            ByteVector.getTextDelimiter(encoding),
            ... renderedFields.slice(0, renderedFields.length - 1)    // Drop last delimiter
        )
    }

    // #endregion
}
