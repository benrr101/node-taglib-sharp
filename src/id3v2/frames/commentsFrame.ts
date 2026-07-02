import Frame from "./frame";
import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {ArrayUtils, Guards} from "../../utils";

/**
 * Class that extends {@link Frame}, implementing support for ID3v2 Comments (COMM) frames.
 * A {@link CommentsFrame} should be used for storing user-readable comments on the media file.
 */
export default class CommentsFrame extends Frame {
    private _description: string;
    private _language: string;
    private _text: string;
    private _textEncoding: StringType = Id3v2Settings.defaultEncoding;

    // #region

    private constructor(frameHeader: Id3v2FrameHeader) {
        super(frameHeader);
    }

    /**
     * Constructs and initializes a new instance by parsing the fields from the field bytes.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the fields of the frame
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(header: Id3v2FrameHeader, fieldBytes: ByteVector, version: number): CommentsFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        if (fieldBytes.length < 4) {
            throw new CorruptFileError("Comment frame must contain at least 4 bytes.");
        }

        // Text encoding          $xx
        // Language               $xx xx xx
        // Description            <text string according to encoding> $00 (00)
        // Text                   <full text string according to encoding>

        const frame = new CommentsFrame(header);

        frame._textEncoding = fieldBytes.get(0);
        frame._language = fieldBytes.subarray(1, 3).toString(StringType.Latin1);

        // @TODO: Should we worry about trimming null stuff (applies to all frames with this format)
        const split = fieldBytes.subarray(4).toStrings(frame._textEncoding);
        if (split.length === 0) {
            // Ill-formed frame, assume empty string for both
            frame._description = "";
            frame._text = "";
        } else if (split.length === 1) {
            // Ill-formed frame, assume no description.
            frame._description = "";
            frame._text = split[0];
        } else {
            // Well-formed frame.
            frame._description = split[0];
            frame._text = split[1];
        }

        return frame;
    }

    /**
     * Constructs and initializes a new CommentsFrame from a description
     * @param text Required, text to store in the contents of the frame.
     * @param description Optional, description of the comment being created. If omitted, defaults
     *     to `""`.
     * @param language Optional, ISO-639-2 language code for the new frame. If omitted, defaults to
     *     `XXX`. @TODO: Should this default to unk?
     * @param encoding Optional, text encoding to use when rendering the new frame. If omitted,
     *     defaults to {@link Id3v2Settings.defaultEncoding}.
     */
    public static fromFields(
        text: string,
        description?: string,
        language?: string,
        encoding?: StringType
    ): CommentsFrame {
        Guards.notNullOrUndefined(text, "text");

        const frame = new CommentsFrame(new Id3v2FrameHeader(FrameIdentifiers.COMM));
        frame._text = text;
        frame._description = description ?? "";
        frame._language = language ?? "XXX";
        frame._textEncoding = encoding ?? Id3v2Settings.defaultEncoding;

        return frame;
    }

    // #endregion

    // #region Public Properties

    /**
     * Gets the description stored in the current instance, or empty string if not set.
     */
    public get description(): string { return this._description || ""; }
    /**
     * Sets the description stored in the current instance.
     * There should only be one frame with a matching description and ISO-639-2 language code per
     * tag.
     * @param value Description of the instance
     */
    public set description(value: string) { this._description = value; }

    /**
     * Gets the ISO-639-2 language code stored in the current instance or 'XXX' if not set
     */
    public get language(): string {
        // @TODO: is XXX specified in the spec or ISO-639-2 spec?
        return this._language && this._language.length > 2
            ? this._language.substring(0, 3)
            : "XXX";
    }
    /**
     * Sets the ISO-639-2 language code stored in the current instance
     * @param value Language code to store
     */
    public set language(value: string) { this._language = value; }

    /**
     * Gets the comment text stored in the current instance, or empty string if not set.
     */
    public get text(): string { return this._text || ""; }
    /**
     * Sets the comment text stored in the current instance.
     * @param value Comment text to store
     */
    public set text(value: string) { this._text = value; }

    /**
     * Gets the text encoding to use when storing the current instance.
     */
    public get textEncoding(): StringType { return this._textEncoding; }
    /**
     * Sets the text encoding to use when storing the current instance.
     * @param value Text encoding to use when storing the current instance
     */
    public set textEncoding(value: StringType) { this._textEncoding = value; }

    // #endregion

    public static filterFrames(frames: Frame[]): CommentsFrame[] {
        Guards.truthy(frames, "frames");
        return ArrayUtils.ofType(frames, CommentsFrame);
    }

    /** @inheritDoc */
    public clone(): Frame {
        const clone = new CommentsFrame(new Id3v2FrameHeader(FrameIdentifiers.COMM));
        clone._description = this._description;
        clone._language = this._language;
        clone._text = this._text;
        clone._textEncoding = this._textEncoding;

        return clone;
    }

    /**
     * Gets a string representation of the current instance.
     * @returns String with the comment text
     */
    public toString(): string {
        return this.text;
    }

    protected renderFields(version: number): ByteVector {
        const encoding = Frame.correctEncoding(this.textEncoding, version);
        return ByteVector.concatenate(
            encoding,
            ByteVector.fromString(this.language, StringType.Latin1),
            ByteVector.fromString(this.description, encoding),
            ByteVector.getTextDelimiter(encoding),
            ByteVector.fromString(this.text, encoding)
        );
    }
}
