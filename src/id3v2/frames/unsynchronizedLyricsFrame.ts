import CorruptFileError from "../../corruptFileError";
import FrameTypes from "../frameTypes";
import Id3v2Tag from "../id3v2Tag";
import {ByteVector, StringType} from "../../byteVector";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {Guards} from "../../utils";

export default class UnsynchronizedLyricsFrame extends Frame {
    private _description: string;
    private _language: string;
    private _text: string;
    private _textEncoding: StringType = Id3v2Tag.defaultEncoding;

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
        encoding: StringType = Id3v2Tag.defaultEncoding
    ): UnsynchronizedLyricsFrame {
        const frame = new UnsynchronizedLyricsFrame(new Id3v2FrameHeader(FrameTypes.USLT, 4));
        frame.textEncoding = encoding;
        frame._language = language;
        frame._description = description;
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified ID3v2
     * version. This method allows for offset reading from the data bytevector.
     * @param data Raw representation of the new frame
     * @param offset What offset in {@paramref data} the frame actually begins. Must be positive,
     *     safe integer
     * @param header Header of the frame found at {@paramref data} in the data
     * @param version ID3v2 version the raw frame is encoded with. Must be positive 8-bit integer.
     */
    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader,
        version: number
    ): UnsynchronizedLyricsFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");
        Guards.byte(version, "version");

        const frame = new UnsynchronizedLyricsFrame(header);
        frame.setData(data, offset, version, false);
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified
     * ID3v2 version.
     * @param data Raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number): UnsynchronizedLyricsFrame {
        const frame = new UnsynchronizedLyricsFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, version, true);
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
     * There should only be one frame with a this description and ISO-639-2 code per tag.
     */
    public set description(value: string) { this._description = value; }

    /**
     * Gets the ISO-639-2 language code for the contents of this instance.
     */
    public get language(): string { return this._language && this._language.length > 2 ? this._language : "XXX"; }
    /**
     * Sets the ISO-639-2 language code for the contents of this instance.
     */
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
     * Gets a popularimeter frame from a specified tag, optionally creating it if it does not
     * exist.
     * @param tag Object to search in
     * @param description Description to match
     * @param language: ISO-639-2 language code to match
     * @param create Whether or not to create an add a new frame to the tag if a match is not found
     * @returns PopularimeterFrame Frame containing the matching user, `undefined` if a match was
     *     not found and {@paramref create} is `false`. A new frame is returned if
     *     {@paramref create} is `true`.
     */
    public static get(
        tag: Id3v2Tag,
        description: string,
        language: string,
        create: boolean
    ): UnsynchronizedLyricsFrame {
        Guards.truthy(tag, "tag");

        const frames = tag.getFramesByClassType<UnsynchronizedLyricsFrame>(FrameClassType.UnsynchronizedLyricsFrame);
        let frame = frames.find((f) => {
            if (f.description !== description) { return false; }
            if (language && f.language !== language) { return false; }
            return true;
        });

        if (frame || !create) {
            return frame;
        }

        // Create a new frame
        frame = UnsynchronizedLyricsFrame.fromData(description, language);
        tag.addFrame(frame);
        return frame;
    }

    /**
     * Gets a specified unsynchronized frame from the specified tag, trying to match the
     * description and language but, failing a perfect match, accepting an incomplete match.
     * The method tries matching with the following order of precedence:
     * * First frame with a matching description and language
     * * First frame with a matching language
     * * First frame with a matching description
     * * First frame
     * @param tag Object to search in
     * @param description Description to match
     * @param language ISO-639-2 language code to match
     */
    public static getPreferred(
        tag: Id3v2Tag,
        description: string,
        language: string
    ): UnsynchronizedLyricsFrame {
        Guards.truthy(tag, "tag");

        const frames = tag.getFramesByClassType<UnsynchronizedLyricsFrame>(FrameClassType.UnsynchronizedLyricsFrame);
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

    public toString(): string {
        return this.text;
    }

    /** @inheritDoc */
    protected parseFields(data: ByteVector, version: number): void {
        if (data.length < 4) {
            throw new CorruptFileError("Not enough bytes in field.");
        }

        this.textEncoding = data.get(0);
        this._language = data.toString(3, StringType.Latin1, 1);

        const split = data.toStrings(this.textEncoding, 4, 2);
        if (split.length === 1) {
            // Bad lyrics frame. Assume that it lacks a description
            this._description = "";
            this._text = split[0];
        } else {
            this._description = split[0];
            this._text = split[1];
        }
    }

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        const encoding = UnsynchronizedLyricsFrame.correctEncoding(this.textEncoding, version);
        return ByteVector.concatenate(
            encoding,
            ByteVector.fromString(this.language, StringType.Latin1),
            ByteVector.fromString(this._description, encoding),
            ByteVector.getTextDelimiter(encoding),
            ByteVector.fromString(this._text, encoding)
        );
    }

}
