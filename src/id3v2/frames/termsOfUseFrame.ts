import Frame from "./frame";
import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {ArrayUtils, Guards} from "../../utils";

export default class TermsOfUseFrame extends Frame {
    private _language: string;
    private _text: string;
    private _textEncoding: StringType = Id3v2Settings.defaultEncoding;

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
    public static fromFieldBytes(header: Id3v2FrameHeader, fieldBytes: ByteVector, version: number): TermsOfUseFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        if (fieldBytes.length < 4) {
            throw new CorruptFileError("Terms of use frame must contain at least 4 bytes.");
        }

        // Text encoding        $xx
        // Language             $xx xx xx
        // The actual text      <text string according to encoding>

        const frame = new TermsOfUseFrame(header);

        frame._textEncoding = fieldBytes.get(0);
        frame._language = fieldBytes.subarray(1, 3).toString(StringType.Latin1);
        frame._text = fieldBytes.subarray(4).toString(frame._textEncoding);

        return frame;
    }

    /**
     * Constructs and initializes a new instance with a specified language.
     * @param text Optional, text to store in the new frame. If omitted, defaults to `""`.
     * @param language Optional, ISO-639-2 language code for the new frame. If omitted, defaults
     *     to "XXX".
     * @param textEncoding Optional, text encoding to use when rendering the new frame. If omitted,
     *     defaults to {@link Id3v2Settings.defaultEncoding}
     */
    public static fromFields(text?: string, language?: string, textEncoding?: StringType): TermsOfUseFrame {
        const f = new TermsOfUseFrame(new Id3v2FrameHeader(FrameIdentifiers.USER));
        f._language = language ?? "XXX"; // @TODO: Should this be "unk"?
        f._text = text ?? "";
        f._textEncoding = textEncoding ?? Id3v2Settings.defaultEncoding;

        return f;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the ISO-639-2 language code stored in the current instance.
     */
    public get language(): string {
        return this._language && this._language.length > 2
            ? this._language.substring(0, 3)
            : "XXX";
    }
    /**
     * Sets the ISO-639-2 language code stored in the current instance.
     * There should only be one frame with a matching ISO-639-2 language code per tag.
     */
    public set language(value: string) { this._language = value; }

    /**
     * Gets the text of the terms of use
     */
    public get text(): string { return this._text || ""; }
    /**
     * Sets the text of the terms of use
     */
    public set text(value: string) { this._text = value; }

    /**
     * Gets the text encoding to use when storing the current instance.
     */
    public get textEncoding(): StringType { return this._textEncoding; }
    /**
     * Sets the text encoding to use when storing the current instance.
     * This encoding is overridden when rendering if {@link Id3v2Settings.forceDefaultEncoding} is
     * `true` or the render version does not support it.
     * @param value Text encoding to use when storing the current instance
     */
    public set textEncoding(value: StringType) { this._textEncoding = value; }

    // #endregion

    // #region Public Methods

    public static filterFrames(frames: Frame[]): TermsOfUseFrame[] {
        Guards.truthy(frames, "frames");
        return ArrayUtils.ofType(frames, TermsOfUseFrame);
    }

    /** @inheritDoc */
    public clone(): Frame {
        return TermsOfUseFrame.fromFields(this._text, this._language, this._textEncoding);
    }

    /**
     * Returns a string representation of the frame.
     */
    public toString(): string { return this._text; }

    // #endregion

    // #region Protected Methods

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        const encoding = Frame.correctEncoding(this.textEncoding, version);

        return ByteVector.concatenate(
            encoding,
            ByteVector.fromString(this.language, StringType.Latin1),
            ByteVector.fromString(this.text, encoding)
        );
    }

    // #endregion
}
