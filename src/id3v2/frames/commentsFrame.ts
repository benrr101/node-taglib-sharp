import FrameTypes from "../frameTypes";
import Id3v2TagSettings from "../id3v2TagSettings";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {Guards} from "../../utils";

/**
 * Class that extends {@see Frame}, implementing support for ID3v2 Comments (COMM) frames.
 * A {@see CommentsFrame} should be used for storing user readable comments on the media file.
 * When reading comments from a file, {@see CommentsFrame.getPreferred} should be used as it
 * gracefully falls back to comments that you, as a developer, may not be expecting. When writing
 * comments, however, it is best to use {@see get} as it forces it to be written in the exact
 * version you are specifying.
 */
export default class CommentsFrame extends Frame {
    private _description: string;
    private _language: string;
    private _text: string;
    private _textEncoding: StringType = Id3v2TagSettings.defaultEncoding;

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
        encoding: StringType = Id3v2TagSettings.defaultEncoding
    ): CommentsFrame {
        Guards.notNullOrUndefined(description, "description");

        const frame = new CommentsFrame(new Id3v2FrameHeader(FrameTypes.COMM, 4));
        frame.textEncoding = encoding;
        frame._language = language;
        frame._description = description;

        return frame;
    }

    /**
     * Constructs and initializes a new CommentsFrame by reading its raw data in a specified ID3v2
     * version. This method allows for offset reading from the data bytevector.
     * @param data Raw representation of the new frame
     * @param offset What offset in {@paramref data} the frame actually begins. Must be positive,
     *     safe integer
     * @param header Header of the frame found at {@paramref data} in the data
     */
    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader
    ): CommentsFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");

        const frame = new CommentsFrame(header);
        frame.setData(data, offset, false);
        return frame;
    }

    /**
     * Constructs and initializes a new CommentsFrame by reading its raw data in a specified
     * ID3v2 version.
     * @param data Raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number): CommentsFrame {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        const frame = new CommentsFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, true);
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
    public get text() { return this._text || ""; }
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
     * @returns CommentsFrame Object containing the matching frame or `undefined` if a match was
     *     not found
     */
    public static find(frames: CommentsFrame[], description: string, language?: string): CommentsFrame {
        Guards.truthy(frames, "frames");

        return frames.find((f) => {
            if (f.description !== description) { return false; }
            if (language && f.language !== language) { return false; }
            return true;
        });
    }

    /**
     * Gets all comment frames that match the provided parameters from the list of frames
     * @param frames Frames to search
     * @param description Description of the comments frame to match
     * @param language Optional, ISO-639-2 language code to match
     * @returns CommentsFrame[] Array of comments frames that match the provided parameters or an
     *     empty array if none were found
     */
    public static findAll(frames: CommentsFrame[], description: string, language?: string): CommentsFrame[] {
        Guards.truthy(frames, "frames");

        return frames.filter((f) => {
            if (f.description !== description) { return false; }
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

        const skipItunes = !description || !description.startsWith("iTun");

        let bestValue = -1;
        let bestFrame: CommentsFrame;

        for (const frame of frames) {
            if (skipItunes && frame.description.startsWith("iTun")) {
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
     * @returns string String with the comment text
     */
    public toString(): string {
        return this.text;
    }

    protected parseFields(data: ByteVector, version: number): void {
        if (data.length < 4) {
            throw new CorruptFileError("Not enough bytes in field");
        }

        this.textEncoding = data.get(0);
        this._language = data.toString(3, StringType.Latin1, 1);

        // Instead of splitting into two strings, in the format [{desc}\0{value}], try splitting
        // into three strings in case of a misformatted [{desc}\0{value}\0].
        const split = data.toStrings(this.textEncoding, 4, 3);

        if (split.length === 0) {
            // No data in the frame.
            this._description = "";
            this._text = "";
        } else if (split.length === 1) {
            // Bad comment frame. Assume it lacks a description.
            this._description = "";
            this._text = split[0];
        } else {
            this._description = split[0];
            this._text = split[1];
        }
    }

    protected renderFields(version: number): ByteVector {
        Guards.byte(version, "version");
        const encoding = Frame.correctEncoding(this.textEncoding, version);
        const v = ByteVector.empty();
        v.addByte(version);
        v.addByteVector(ByteVector.fromString(this.language, StringType.Latin1));
        v.addByteVector(ByteVector.fromString(this.description, encoding));
        v.addByteVector(ByteVector.getTextDelimiter(encoding));
        v.addByteVector(ByteVector.fromString(this._text, encoding));
        return v;
    }
}
