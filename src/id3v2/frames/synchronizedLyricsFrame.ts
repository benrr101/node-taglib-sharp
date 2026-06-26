import Frame from "./frame";
import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {Guards} from "../../utils";
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
    private _format: TimestampFormat = TimestampFormat.Unknown;
    private _language: string;
    private _text: SynchronizedText[] = [];
    private _textEncoding: StringType = Id3v2Settings.defaultEncoding;
    private _textType: SynchronizedTextType = SynchronizedTextType.Other;

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
     * @param description Description of the synchronized lyrics frame
     * @param language ISO-639-2 language code of the new instance
     * @param textType Type of the text to store in the new instance
     * @param encoding Encoding to use when rendering text in this new instance
     */
    public static fromInfo(
        description: string,
        language: string,
        textType: SynchronizedTextType,
        encoding: StringType = Id3v2Settings.defaultEncoding
    ): SynchronizedLyricsFrame {
        const frame = new SynchronizedLyricsFrame(new Id3v2FrameHeader(FrameIdentifiers.SYLT));
        frame.textEncoding = encoding;
        frame._language = language;
        frame.description = description;
        frame.textType = textType;
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
    public set text(value: SynchronizedText[]) { this._text = value || []; }

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

    /**
     * Gets a specified lyrics frame from a list of synchronized lyrics frames
     * @param frames List of frames to search
     * @param description Description to match
     * @param textType Text type to match
     * @param language Optionally, ISO-639-2 language code to match
     * @returns Frame containing the matching user, `undefined` if a match was not found
     */
    public static find(
        frames: SynchronizedLyricsFrame[],
        description: string,
        textType: SynchronizedTextType,
        language?: string
    ): SynchronizedLyricsFrame {
        Guards.truthy(frames, "frames");
        return frames.find((f) => {
            if (f.description !== description) { return false; }
            if (language && f.language !== language) { return false; }
            // noinspection RedundantIfStatementJS
            if (f.textType !== textType) { return false; }
            return true;
        });
    }

    /**
     * Gets a synchronized lyrics frame from the specified list, trying to match the description and
     * language but accepting an incomplete match.
     * This method tries matching with the following order of precedence:
     * * The first frame with a matching description, language, and type.
     * * The first frame with a matching description and language.
     * * The first frame with a matching language.
     * * The first frame with a matching description.
     * * The first frame with a matching type.
     * * The first frame.
     * @param frames List of frames to search for the best match
     * @param description Description to match
     * @param language ISO-639-2 language code to match
     * @param textType Text type to match
     * @returns The matching frame or `undefined` if a match was not found
     */
    public static findPreferred(
        frames: SynchronizedLyricsFrame[],
        description: string,
        language: string,
        textType: SynchronizedTextType
    ): SynchronizedLyricsFrame {
        Guards.truthy(frames, "frames");

        let bestValue = -1;
        let bestFrame: SynchronizedLyricsFrame;

        for (const slFrame of frames) {
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

    /** @inheritDoc */
    public clone(): Frame {
        const frame = SynchronizedLyricsFrame.fromInfo(
            this.description,
            this._language,
            this.textType,
            this.textEncoding
        );
        frame.format = this.format;
        frame._text = this._text.map((i) => i.clone());
        return frame;
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
