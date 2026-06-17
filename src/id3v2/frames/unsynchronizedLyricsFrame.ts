import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {Guards} from "../../utils";

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
     * Constructs and initializes a new instance from the provided data
     * @param description Description of the frame
     * @param language ISO-639-2 language code for the content of the frame
     * @param encoding Encoding to use when storing the content of the frame
     */
    public static fromData(
        description: string,
        language?: string,
        encoding: StringType = Id3v2Settings.defaultEncoding
    ): UnsynchronizedLyricsFrame {
        const frame = new UnsynchronizedLyricsFrame(new Id3v2FrameHeader(FrameIdentifiers.USLT));
        frame._textEncoding = encoding;
        frame._language = language;
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
        if (split.length === 1) {
            // Ill-formed frame. Assume it lacks a description
            frame._description = undefined;
            frame._text = split[0];
        } else {
            // Well-formed frame.
            frame._description = split[0];
            frame._text = split[1];
        }

        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.UnsynchronizedLyricsFrame; }

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

    /**
     * Gets the first unsynchronized lyrics frame from a list of frames that matches the provided
     * parameters.
     * @param frames List of frames to search
     * @param description Description to match
     * @param language Optionally, ISO-639-2 language code to match
     * @returns Frame that matches provided parameters, `undefined` if a match was not found
     */
    public static find(
        frames: UnsynchronizedLyricsFrame[],
        description: string,
        language: string
    ): UnsynchronizedLyricsFrame {
        Guards.truthy(frames, "frames");
        return frames.find((f) => {
            if (f.description !== description) { return false; }
            // noinspection RedundantIfStatementJS
            if (language && f.language !== language) { return false; }
            return true;
        });
    }

    /**
     * Gets all unsynchronized lyrics frames that match the provided parameters from a list of
     * frames
     * @param frames List of frames to search
     * @param description Description to match
     * @param language Optionally, ISO-639-2 language code to match
     * @returns List of frames matching provided parameters, empty array if no matches were found
     */
    public static findAll(
        frames: UnsynchronizedLyricsFrame[],
        description: string,
        language: string
    ): UnsynchronizedLyricsFrame[] {
        Guards.truthy(frames, "frames");
        return frames.filter((f) => {
            if (f.description !== description) { return false; }
            // noinspection RedundantIfStatementJS
            if (language && f.language !== language) { return false; }
            return true;
        });
    }

    /**
     * Gets a specified unsynchronized frame from the list of frames, trying to match the
     * description and language but, failing a perfect match, accepting an incomplete match.
     * The method tries matching with the following order of precedence:
     * * First frame with a matching description and language
     * * First frame with a matching language
     * * First frame with a matching description
     * * First frame
     * @param frames List of frames to search
     * @param description Description to match
     * @param language ISO-639-2 language code to match
     */
    public static findPreferred(
        frames: UnsynchronizedLyricsFrame[],
        description: string,
        language: string
    ): UnsynchronizedLyricsFrame {
        Guards.truthy(frames, "frames");

        let bestValue = -1;
        let bestFrame;
        for (const f of frames) {
            const sameName = f.description === description;
            const sameLang = f.language === language;

            if (sameName && sameLang) {
                return f;
            }

            const value = sameLang
                ? 2
                : sameName ? 1 : 0;
            if (value > bestValue) {
                bestValue = value;
                bestFrame = f;
            }
        }

        return bestFrame;
    }

    /** @inheritDoc */
    public clone(): Frame {
        const frame = UnsynchronizedLyricsFrame.fromData(this._description, this._language, this.textEncoding);
        frame._text = this._text;
        return frame;
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
