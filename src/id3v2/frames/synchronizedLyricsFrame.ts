import CorruptFileError from "../../corruptFileError";
import FrameTypes from "../frameTypes";
import Id3v2Tag from "../id3v2Tag";
import {ByteVector, StringType} from "../../byteVector";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {Guards} from "../../utils";
import {SynchronizedTextType, TimestampFormat} from "../utilTypes";

/**
 * This structure contains a single entry in a {@see SynchronizedLyricsFrame} object.
 */
export class SynchronizedText {
    /**
     * Text for the point in time represented by the current instance.
     */
    public text: string;

    /**
     * Time offset of the current instance. The specific format this text element is defined in
     * {@see SynchronizedLyricsFrame.format} of the frame that owns this element.
     */
    public time: number;

    /**
     * Constructs and initializes a new instance with a specified time and text.
     * @param time Offset into the media that owns this element when this element should be
     *     displayed. See {@see TimestampFormat} for possible values.
     * @param text Text for the point in time
     */
    public constructor(time: number, text: string) {
        Guards.uint(time, "time");
        this.text = text;
        this.time = time;
    }
}

/**
 * This class extends Frame and implements support for ID3v2 Synchronized Lyrics and Text (SYLT)
 * frames.
 */
export class SynchronizedLyricsFrame extends Frame {
    private _description: string;
    private _format: TimestampFormat = TimestampFormat.Unknown;
    private _language: string;
    private _text: SynchronizedText[];
    private _textEncoding: StringType = Id3v2Tag.defaultEncoding;
    private _textType: SynchronizedTextType = SynchronizedTextType.Other;

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance with a specified description, ISO-639-2 language
     * code, text type, and text encoding.
     * @param description Description of the synchronized lyrics frame
     * @param language ISO-639-2 language code of the new instance
     * @param textType Type of the text to store in the new instance
     * @param encoding Encoding to use when rendering text in this new instance
     */
    public static fromInfo(
        description: string,
        language: string,
        textType: SynchronizedTextType,
        encoding: StringType = Id3v2Tag.defaultEncoding
    ): SynchronizedLyricsFrame {
        const frame = new SynchronizedLyricsFrame(new Id3v2FrameHeader(FrameTypes.SYLT, 4));
        frame.textEncoding = encoding;
        frame._language = language;
        frame.description = description;
        frame.textType = textType;
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified ID3v2
     * format.
     * @param data Raw representation of the new instance
     * @param offset Offset into {@paramref data} where the frame begins. Must be unsigned, safe
     *     integer
     * @param header Header of the frame found at {@paramref offset} in {@paramref data}
     * @param version ID3v2 version the raw frame is encoded with. Must be unsigned 8-bit integer
     */
    public static fromOffsetRawData(data: ByteVector, offset: number, header: Id3v2FrameHeader, version: number) {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");
        Guards.byte(version, "version");

        const frame = new SynchronizedLyricsFrame(header);
        frame.setData(data, offset, version, false);
        return frame;
    }

    /**
     * Constructs and intializes a new instance by reading its raw data in a specified ID3v2
     * format.
     * @param data Raw representation of the new instance
     * @param version ID3v2 version the raw frame is encoded with. Must be unsigned 8-bit integer.
     */
    public static fromRawData(data: ByteVector, version: number): SynchronizedLyricsFrame {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        const frame = new SynchronizedLyricsFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, version, true);
        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.SynchronizedLyricsFrame; }

    /**
     * Gets the description of the current instance.
     */
    public get description(): string { return this._description; }
    /**
     * Sets the description of the current instance.
     * There should only be one frame with a matching description, type, and ISO-639-2 language
     * code per tag.
     * @param value Description to store
     */
    public set description(value: string) { this._description = value; }

    /**
     * Gets the timestamp format used by the current instance.
     */
    public get format(): TimestampFormat { return this._format; }
    /**
     * Sets the timestamp format used by the current instance.
     * @param value Timestamp format to use
     */
    public set format(value: TimestampFormat) { this._format = value; }

    /**
     * Gets the ISO-639-2 language code stored in the current instance
     */
    public get language(): string { return this._language; }
    /**
     * Sets the ISO-639-2 language code stored in the current instance.
     * There should only be one frame with a matching description, type, and ISO-639=2 language
     * code per tag.
     * @param value ISO-639-2 language code stored in the current instance
     */
    public set language(value: string) { this._language = value; }

    /**
     * Gets the text contained in the current instance
     */
    public get text(): SynchronizedText[] { return this._text; }
    /**
     * Sets the text contained in the current instance
     * @param value Text contained in the current instance
     */
    public set text(value: SynchronizedText[]) { this._text = value || []; }

    /**
     * Gets the text encoding to use when storing the current instance
     */
    public get textEncoding(): StringType { return this._textEncoding; }
    /**
     * Sets the text encoding to use when storing the current instance.
     * This encoding is overridden when renderinf if {@see Id3v2Tag.forceDefaultEncoding} is
     * `true` or the render version does not support it.
     * @param value Text encoding to use when storing the current instance
     */
    public set textEncoding(value: StringType) { this._textEncoding = value; }

    /**
     * Gets the type of text contained in the current instance
     */
    public get textType(): SynchronizedTextType { return this._textType; }
    /**
     * Sets the type of text contained in the current instance.
     * @param value Type of the synchronized text
     */
    public set textType(value: SynchronizedTextType) { this._textType = value; }

    // #endregion

    // #region Public Methods

    /**
     * Gets a specified lyrics frame from the specified tag, optionally creating it if it does not
     * exist.
     * @param tag Object to search in
     * @param description Description to match
     * @param language ISO-639-2 language code to match
     * @param textType Text type to match
     * @param create Whether or not to create and add a new frame to the tag if a match is not
     *     found
     * @returns SynchronizedLyricsFrame Frame containing the matching user, `undefined` if a match
     *     was not found and {@paramref create} is `false`. A new frame is returned if
     *     {@paramref create} is `true`.
     */
    public static get(
        tag: Id3v2Tag,
        description: string,
        language: string,
        textType: SynchronizedTextType,
        create: boolean
    ) {
        Guards.truthy(tag, "tag");

        const slFrames = tag.getFramesByClassType<SynchronizedLyricsFrame>(FrameClassType.SynchronizedLyricsFrame);
        let slFrame = slFrames.find((f) => {
            if (f.description !== description) { return false; }
            if (language && f.language !== language) { return false; }
            if (f.textType !== textType) { return false; }
            return true;
        });

        if (slFrame || !create) {
            return slFrame;
        }

        // Create a new frame
        slFrame = SynchronizedLyricsFrame.fromInfo(description, language, textType);
        tag.addFrame(slFrame);
        return slFrame;
    }

    /**
     * Gets a synchronized lyrics frame from the specified tag, trying to match the description and
     * language but accepting an incomplete match.
     * This method tries matching with the following order of precedence:
     * * The first frame with a matching description, language, and type.
     * * The first frame with a matching description and language.
     * * The first frame with a matching language.
     * * The first frame with a matching description.
     * * The first frame with a matching type.
     * * The first frame.
     * @param tag Object to search in
     * @param description Description to match
     * @param language ISO-639-2 language code to match
     * @param textType Text type to match
     * @returns SynchronizedLyricsFrame The matching frame or `undefined` if a match was not found
     */
    public static getPreferred(tag: Id3v2Tag, description: string, language: string, textType: SynchronizedTextType) {
        Guards.truthy(tag, "tag");

        let bestValue = -1;
        let bestFrame: SynchronizedLyricsFrame;

        const slFrames = tag.getFramesByClassType<SynchronizedLyricsFrame>(FrameClassType.SynchronizedLyricsFrame);
        for (const slFrame of slFrames) {
            let value = 0;
            if (slFrame.language === language) {
                value += 4;
            }
            if (slFrame.description === description) {
                value += 2;
            }
            if (slFrame.textType === textType) {
                value += 1;
            }
            if (value === 7) {
                return slFrame;
            }

            if (value <= bestValue) {
                continue;
            }
            bestValue = value;
            bestFrame = slFrame;
        }

        return bestFrame;
    }

    // #endregion

    /** @inheritDoc */
    protected parseFields(data: ByteVector, version: number): void {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        if (data.length < 6) {
            throw new CorruptFileError("Not enough bytes in field");
        }

        this.textEncoding = data.get(0);
        this._language = data.toString(3, StringType.Latin1, 1);
        this.format = data.get(4);
        this.textType = data.get(5);

        const delim = ByteVector.getTextDelimiter(this.textEncoding);
        let delimIndex = data.find(delim, 6, delim.length);

        if (delimIndex < 0) {
            throw new CorruptFileError("Text delimiter expected");
        }

        this.description = data.toString(delimIndex - 6, this.textEncoding, 6);

        let offset = delimIndex + delim.length;
        const l = [];
        while (offset + delim.length + 4 < data.length) {
            delimIndex = data.find(delim, offset, delim.length);

            if (delimIndex < offset) {
                throw new CorruptFileError("Text delimeter expected");
            }

            const text = data.toString(delimIndex - offset, this.textEncoding, offset);
            offset = delimIndex + delim.length;

            if (offset + 4 > data.length) {
                break;
            }

            const time = data.mid(offset, 4).toUInt();
            l.push(new SynchronizedText(time, text));

            offset += 4;
        }

        this._text = l;
    }

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        Guards.byte(version, "version");

        const encoding = SynchronizedLyricsFrame.correctEncoding(this.textEncoding, version);
        const delim = ByteVector.getTextDelimiter(encoding);

        const v = ByteVector.empty();
        v.addByte(encoding);
        v.addByteVector(ByteVector.fromString(this.language, StringType.Latin1));
        v.addByte(this.format);
        v.addByte(this.textType);
        v.addByteVector(ByteVector.fromString(this.description, encoding));
        v.addByteVector(delim);

        for (const t of this.text) {
            v.addByteVector(ByteVector.fromString(t.text, encoding));
            v.addByteVector(delim);
            v.addByteVector(ByteVector.fromUInt(t.time));
        }

        return v;
    }
}
