import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {Guards} from "../../utils";

/**
 * Class that extends {@link Frame}, implementing support for ID3v2 Comments (COMM) frames.
 * A {@link CommentsFrame} should be used for storing user readable comments on the media file.
 * When reading comments from a file, {@link CommentsFrame.findPreferred} should be used as it
 * gracefully falls back to comments that you, as a developer, may not be expecting.
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
     * Constructs and initializes a new CommentsFrame from a description
     * @param description Description of the new frame
     * @param language Optional, ISO-639-2 language code for the new frame
     * @param encoding Optional, text encoding to use when rendering the new frame
     */
    public static fromDescription(
        description: string,
        language?: string,
        encoding: StringType = Id3v2Settings.defaultEncoding
    ): CommentsFrame {
        const frame = new CommentsFrame(new Id3v2FrameHeader(FrameIdentifiers.COMM));
        frame.textEncoding = encoding;
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
        if (split.length === 1) {
            // Ill-formed frame, assume no description.
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

    // #region Public Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.CommentsFrame; }

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

    /**
     * Gets a comment frame that matched the provided parameters from the list of frames
     * @param frames Frames to search for best matching frame
     * @param description Description of the comments frame to match
     * @param language Optional, ISO-639-2 language code to match
     * @returns Object containing the matching frame or `undefined` if a match was not found
     */
    public static find(frames: CommentsFrame[], description: string, language?: string): CommentsFrame {
        Guards.truthy(frames, "frames");

        return frames.find((f) => {
            if (f.description !== description) { return false; }
            // noinspection RedundantIfStatementJS
            if (language && f.language !== language) { return false; }
            return true;
        });
    }

    /**
     * Gets all comment frames that match the provided parameters from the list of frames
     * @param frames Frames to search
     * @param description Description of the comments frame to match
     * @param language Optional, ISO-639-2 language code to match
     * @returns
     *     Array of comments frames that match the provided parameters or an
     *     empty array if none were found
     */
    public static findAll(frames: CommentsFrame[], description: string, language?: string): CommentsFrame[] {
        Guards.truthy(frames, "frames");

        return frames.filter((f) => {
            if (f.description !== description) { return false; }
            // noinspection RedundantIfStatementJS
            if (language && f.language !== language) { return false; }
            return true;
        });
    }

    /**
     * Gets a specified comments frame from the specified tag, trying to match the description and
     * language but accepting an incomplete match.
     * The method tries matching with the following order of precedence:
     * * The first frame with a matching description and language
     * * The first frame with a matching language
     * * The first frame with a matching description
     * * The first frame
     * @param frames Frames to search for best matching frame
     * @param description Description to match
     * @param language ISO-639-2 language code to match
     */
    public static findPreferred(frames: CommentsFrame[], description: string, language?: string): CommentsFrame {
        Guards.truthy(frames, "frames");

        // Original .NET comments:
        // This is weird, so bear with me. The best thing we can have is something straightforward
        // and in our own language. If it has a description, then it is probably used for something
        // other than an actual comment. If that doesn't work, we'd still rather have something in
        // our own language than something in another. After that, all we have left are things in
        // other languages, so we'd rather have one with actual content, so we try to get one with
        // no description first.

        const skipITunes = !description || !description.startsWith("iTun");

        let bestValue = -1;
        let bestFrame: CommentsFrame;

        for (const frame of frames) {
            if (skipITunes && frame.description.startsWith("iTun")) {
                continue;
            }

            const sameName = frame.description === description;
            const sameLang = frame.language === language;

            if (sameName && sameLang) {
                return frame;
            }

            const value = sameLang ? 2 : sameName ? 1 : 0;

            if (value <= bestValue) {
                continue;
            }

            bestValue = value;
            bestFrame = frame;
        }

        return bestFrame;
    }

    /** @inheritDoc */
    public clone(): Frame {
        const frame = CommentsFrame.fromDescription(this._description, this._language, this._textEncoding);
        frame._text = this._text;
        return frame;
    }

    /**
     * Gets a string representation of the current instance.
     * @returns String with the comment text
     */
    public toString(): string {
        return this.text;
    }

    protected parseFields(data: ByteVector): void { }

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
