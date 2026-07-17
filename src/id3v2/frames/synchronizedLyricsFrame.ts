import Frame from "./frame";
import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {ArrayUtils, Guards} from "../../utils";
import {SynchronizedTextType, TimestampFormat} from "../utilTypes";

/**
 * This structure contains a single entry in a {@link SynchronizedLyricsFrame} object.
 */
export class SynchronizedText {
    private _time: number;

    /**
     * Constructs and initializes a new instance with a specified time and text.
     * @param time Offset into the media that owns this element when this element should be
     *     displayed. See {@link TimestampFormat} for possible values.
     * @param text Text for the point in time
     */
    public constructor(time: number, text: string) {
        Guards.uint(time, "time");
        this.text = text;
        this._time = time;
    }

    // #region Properties

    /**
     * Text for the point in time represented by the current instance.
     */
    public text: string;

    /**
     * Gets time offset of the current instance. The specific format this text element is defined
     * in {@link SynchronizedLyricsFrame.format} of the frame that owns this element.
     */
    public get time(): number { return this._time; }
    /**
     * Sets time offset of the current instance. The specific format this text element is defined
     * in {@link SynchronizedLyricsFrame.format} of the frame that owns this element.
     * @param value Offset of the current instance, must be a safe
     */
    public set time(value: number) {
        Guards.uint(value, "value");
        this._time = value;
    }

    // #endregion

    /**
     * Creates a copy of this instance.
     */
    public clone(): SynchronizedText {
        return new SynchronizedText(this.time, this.text);
    }

    /**
     * Generates a raw byte representation of the frame for writing to a file.
     * @param encoding Encoding to use for encoding the text of the frame.
     */
    public render(encoding: StringType): ByteVector {
        return ByteVector.concatenate(
            ByteVector.fromString(this.text, encoding),
            ByteVector.getTextDelimiter(encoding),
            ByteVector.fromUint(this.time)
        );
    }
}

/**
 * This class extends Frame and implements support for ID3v2 Synchronized Lyrics and Text (SYLT)
 * frames.
 */
export class SynchronizedLyricsFrame extends Frame {
    private _description: string;
    private _format: TimestampFormat;
    private _language: string;
    private _text: SynchronizedText[];
    private _textEncoding: StringType;
    private _textType: SynchronizedTextType;

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initialized a new instance by parsing values from the field data.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the body of the frame
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(
        header: Id3v2FrameHeader,
        fieldBytes: ByteVector,
        version: number
    ): SynchronizedLyricsFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        if (fieldBytes.length < 6) {
            throw new CorruptFileError("Synchronized lyrics frame must contain at least 6 bytes.");
        }

        // Text encoding                                  $xx
        // Language                                       $xx xx xx
        // Time stamp format                              $xx
        // Content type                                   $xx
        // Content descriptor                             <text string according to encoding> $00 (00)
        // ---- Repeated for each synchronized lyric -----------------------
        // Terminated text to be synced (typically a syllable)
        // Sync identifier (terminator to above string)   $00 (00)
        // Time stamp                                     $xx (xx ...)
        // ---- Repeated for each synchronized lyric -----------------------

        const frame = new SynchronizedLyricsFrame(header);

        // Read fixed length data
        frame._textEncoding = fieldBytes.get(0);
        frame._language = fieldBytes.subarray(1, 3).toString(StringType.Latin1);
        frame._format = fieldBytes.get(4);
        frame._textType = fieldBytes.get(5);

        const delimiter = ByteVector.getTextDelimiter(frame._textEncoding);
        const variableLengthBytes = fieldBytes.subarray(6);

        // Read content descriptor
        const descriptorEndLength = variableLengthBytes.find(delimiter);
        if (descriptorEndLength < 0) {
            throw new CorruptFileError("Synchronized lyrics frame must contain content descriptor terminator");
        }
        frame._description = variableLengthBytes.subarray(0, descriptorEndLength).toString(frame._textEncoding);

        // Read the synchronized lyrics
        let offset = descriptorEndLength + delimiter.length;
        const lyrics: SynchronizedText[] = [];
        while (offset < variableLengthBytes.length) {
            // @TODO: Allow ignoring invalid lyrics

            // Reset bytes so we are working with the next lyric at position 0
            const workingBytes = variableLengthBytes.subarray(offset);

            // Read lyrics
            const lyricLength = workingBytes.find(delimiter);
            if (lyricLength < 0) {
                throw new CorruptFileError("Synchronized lyrics frame is missing delimiter for lyric.");
            }

            const lyric = workingBytes.subarray(0, lyricLength).toString(frame._textEncoding);

            // Read time code
            const timeStampBytes = workingBytes.subarray(lyricLength + delimiter.length, 4);
            if (timeStampBytes.length < 4) {
                throw new CorruptFileError(`Synchronized lyrics frame does not contain time code for lyric '${lyric}'`);
            }

            const timeStamp = timeStampBytes.toUint();

            lyrics.push(new SynchronizedText(timeStamp, lyric));
            offset += lyricLength + delimiter.length + 4;
        }

        frame._text = lyrics;

        return frame;
    }

    /**
     * Constructs and initializes a new instance with a specified description, ISO-639-2 language
     * code, text type, and text encoding.
     * @param description Optional, description of the synchronized lyrics frame. If omitted,
     *     defaults to `""`
     * @param synchronizedLyrics Optional, synchronized lyrics to store in the lyrics frame. If
     *     omitted, defaults to an empty array.
     * @param language Optional, ISO-639-2 language code of the new instance. If omitted, defaults
     *     to "XXX".
     * @param textType Optional, type of the text to store in the new instance. If omitted,
     *     defaults to {@link SynchronizedTextType.Other}.
     * @param encoding Optional, encoding to use when rendering text in this new instance. If
     *     omitted, defaults to {@link Id3v2Settings.defaultEncoding}.
     * @param timestampFormat Optional, format that the synchronized lyric timestamps are formatted
     *     in. If omitted, defaults to {@link TimestampFormat.Unknown}.
     */
    public static fromFields(
        description?: string,
        synchronizedLyrics?: SynchronizedText[],
        language?: string,
        textType?: SynchronizedTextType,
        encoding?: StringType,
        timestampFormat?: TimestampFormat
    ): SynchronizedLyricsFrame {
        const frame = new SynchronizedLyricsFrame(new Id3v2FrameHeader(FrameIdentifiers.SYLT));
        frame._description = description ?? "";
        frame._format = timestampFormat ?? TimestampFormat.Unknown;
        frame._language = language ?? "XXX"; // @TODO: Should this be `unk`?
        frame._text = synchronizedLyrics ?? [];
        frame._textEncoding = encoding ?? Id3v2Settings.defaultEncoding;
        frame._textType = textType ?? SynchronizedTextType.Other;

        return frame;
    }

    // #endregion

    // #region Properties

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
     * There should only be one frame with a matching description, type, and ISO-639-2 language
     * code per tag.
     * @param value ISO-639-2 language code stored in the current instance
     */
    // @TODO: Should this be normalized like other ISO-639-2 fields?
    public set language(value: string) { this._language = value; }

    /**
     * Gets the text contained in the current instance
     */
    public get text(): SynchronizedText[] { return this._text; }
    /**
     * Sets the text contained in the current instance
     * @param value Text contained in the current instance
     */
    public set text(value: SynchronizedText[]) { this._text = value ?? []; }

    /**
     * Gets the text encoding to use when storing the current instance
     */
    public get textEncoding(): StringType { return this._textEncoding; }
    /**
     * Sets the text encoding to use when storing the current instance.
     * This encoding is overridden when rendering if {@link Id3v2Settings.forceDefaultEncoding} is
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
    // @TODO: Rename to Content Type to match spec
    public set textType(value: SynchronizedTextType) { this._textType = value; }

    // #endregion

    // #region Public Methods

    public static filterFrames(frames: Frame[]): SynchronizedLyricsFrame[] {
        Guards.truthy(frames, "frames");
        return ArrayUtils.ofType(frames, SynchronizedLyricsFrame);
    }

    /** @inheritDoc */
    public clone(): Frame {
        return SynchronizedLyricsFrame.fromFields(
            this._description,
            this._text.map(i => i.clone()),
            this._language,
            this._textType,
            this._textEncoding,
            this._format);
    }

    // #endregion

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        const encoding = SynchronizedLyricsFrame.correctEncoding(this.textEncoding, version);
        const renderedText = this.text
            .filter(t => !!t)
            .sort((t1, t2) => t1.time - t2.time)
            .map(t => t.render(encoding));

        return ByteVector.concatenate(
            encoding,
            ByteVector.fromString(this.language, StringType.Latin1),
            this.format,
            this.textType,
            ByteVector.fromString(this.description, encoding),
            ByteVector.getTextDelimiter(encoding),
            ... renderedText
        );
    }
}
