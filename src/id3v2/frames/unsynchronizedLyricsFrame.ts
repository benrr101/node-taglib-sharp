import Frame from "./frame";
import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {ArrayUtils, Guards} from "../../utils";

/**
 * Extends {@link Frame} implementing support for ID3v2 unsynchronized lyrics (USLT) frames.
 */
export default class UnsynchronizedLyricsFrame extends Frame {
    private _description: string;
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
    public static fromFieldBytes(
        header: Id3v2FrameHeader,
        fieldBytes: ByteVector,
        version: number
    ): UnsynchronizedLyricsFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        if (fieldBytes.length < 4) {
            throw new CorruptFileError("Unsynchronized lyrics frame must contain at least 4 bytes.");
        }

        // Text encoding        $xx
        // Language             $xx xx xx
        // Content descriptor   <text string according to encoding> $00 (00)
        // Lyrics/text          <full text string according to encoding>

        const frame = new UnsynchronizedLyricsFrame(header);

        frame._textEncoding = fieldBytes.get(0);
        frame._language = fieldBytes.subarray(1, 3).toString(StringType.Latin1);

        const split = fieldBytes.subarray(4).toStrings(frame._textEncoding, 2);
        if (split.length === 0) {
            // Ill-formed frame. Assume description and lyrics are empty
            frame._description = "";
            frame._text = "";
        } else if (split.length === 1) {
            // Ill-formed frame. Assume it lacks a description
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
     * Constructs and initializes a new instance from the provided data
     * @param description Optional, description of the frame. If omitted, defaults to `""`.
     * @param text Optional, text to store as the lyrics. If omitted, defaults to `""`.
     * @param language Optional, ISO-639-2 language code for the content of the frame. If omitted,
     *     defaults to "XXX".
     * @param encoding Optional, encoding to use when storing the content of the frame. If omitted,
     *     defaults to {@link Id3v2Settings.defaultEncoding}.
     */
    public static fromFields(
        description?: string,
        text?: string,
        language?: string,
        encoding?: StringType
    ): UnsynchronizedLyricsFrame {
        const frame = new UnsynchronizedLyricsFrame(new Id3v2FrameHeader(FrameIdentifiers.USLT));
        frame._description = description ?? "";
        frame._language = language ?? "XXX";
        frame._text = text ?? "";
        frame._textEncoding = encoding ?? Id3v2Settings.defaultEncoding;

        return frame;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the description of the contents of the current instance.
     */
    public get description(): string { return this._description || ""; }
    /**
     * Sets the description of the contents of the current instance.
     * There should only be one frame with this description and ISO-639-2 code per tag.
     */
    public set description(value: string) { this._description = value; }

    /**
     * Gets the ISO-639-2 language code for the contents of this instance.
     */
    public get language(): string { return (this._language && this._language.length === 3) ? this._language : "XXX"; }
    /**
     * Sets the ISO-639-2 language code for the contents of this instance.
     */
    // @TODO: Add validation?
    public set language(value: string) { this._language = value; }

    /**
     * Gets the text stored in the current instance.
     */
    public get text(): string { return this._text || ""; }
    /**
     * Sets the text stored in the current instance.
     */
    public set text(value: string) { this._text = value; }

    /**
     * Gets the text encoding to use when storing the current instance.
     */
    public get textEncoding(): StringType { return this._textEncoding; }
    /**
     * Sets the text encoding to use when storing the current instance.
     */
    public set textEncoding(value: StringType) { this._textEncoding = value; }

    // #endregion

    // #region Public Methods

    public static filterFrames(frames: Frame[]): UnsynchronizedLyricsFrame[] {
        Guards.truthy(frames, "frames");
        return ArrayUtils.ofType(frames, UnsynchronizedLyricsFrame);
    }

    /** @inheritDoc */
    public clone(): Frame {
        return UnsynchronizedLyricsFrame.fromFields(
            this._description,
            this._text,
            this._language,
            this._textEncoding
        );
    }

    /**
     * Generates a string representation of the current instance.
     */
    public toString(): string {
        return this.text;
    }

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        const encoding = UnsynchronizedLyricsFrame.correctEncoding(this.textEncoding, version);
        return ByteVector.concatenate(
            encoding,
            ByteVector.fromString(this.language, StringType.Latin1),
            ByteVector.fromString(this.description, encoding),
            ByteVector.getTextDelimiter(encoding),
            ByteVector.fromString(this.text, encoding)
        );
    }

}
