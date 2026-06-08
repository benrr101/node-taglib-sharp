import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {Guards} from "../../utils";

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
     * @param language ISO-639-2 language code for the new frame
     * @param textEncoding Optional, text encoding to use when rendering the new frame. If not
     *     provided defaults to {@link Id3v2Settings.defaultEncoding}
     */
    public static fromFields(
        language: string,
        textEncoding: StringType = Id3v2Settings.defaultEncoding
    ): TermsOfUseFrame {
        const f = new TermsOfUseFrame(new Id3v2FrameHeader(FrameIdentifiers.USER));
        f.textEncoding = textEncoding;
        f._language = language;
        return f;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.TermsOfUseFrame; }

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

    /**
     * Gets a specified terms of use frame from the list of frames
     * @param frames List of frames to search
     * @param language Optionally, the ISO-639-2 language code to match
     * @returns A matching frame if found or `undefined` if a matching frame was not found
     */
    public static find(frames: TermsOfUseFrame[], language?: string): TermsOfUseFrame {
        Guards.truthy(frames, "frames");
        return frames.find((f) => !language || f.language === language);
    }

    /**
     * Gets a specified terms of use frame from the list of frames, trying to match the language but
     * accepting one with a different language if a match was not found.
     * @param frames List of frames to search
     * @param language ISO-639-2 language code to match
     * @returns Frame containing the matching frame or `undefined` if a match was not found
     */
    public static findPreferred(frames: TermsOfUseFrame[], language: string): TermsOfUseFrame {
        Guards.truthy(frames, "frames");

        let bestFrame: TermsOfUseFrame;
        for (const f of frames) {
            if (f.language === language) {
                return f;
            }
            if (!bestFrame) {
                bestFrame = f;
            }
        }

        return bestFrame;
    }

    /** @inheritDoc */
    public clone(): Frame {
        const frame = TermsOfUseFrame.fromFields(this._language, this.textEncoding);
        frame.text = this.text;
        return frame;
    }

    /**
     * Returns a string representation of the frame.
     */
    public toString(): string { return this._text; }

    // #endregion

    // #region Protected Methods

    /** @inheritDoc */
    protected parseFields(data: ByteVector): void { }

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
