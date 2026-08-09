import Frame from "./frame";
import FrameHeader from "./frameHeader";
import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {FrameIdentifiers} from "../frameIdentifiers";
import {ArrayUtils, Guards} from "../../utils";
import {Id3v2Version} from "../enums";

/**
 * Provides support for ID3v2 User URL Link frames (WXXX).
 */
export default class UserUrlLinkFrame extends Frame {
    private _description: string;
    private _encoding: StringType = Id3v2Settings.defaultEncoding;
    private _url: string;

    // #region Constructors

    private constructor(header: FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance by parsing the fields from the field bytes.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the fields of the frame
     * @param _version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(
        header: FrameHeader,
        fieldBytes: ByteVector,
        _version: Id3v2Version
    ): UserUrlLinkFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");

        if (fieldBytes.length < 3) {
            throw new Error("User URL link frame is smaller than minimum size.");
        }

        // Text Encoding    $xx
        // Description      <text string according to encoding> $00 (00)
        // URL              <text string>

        const frame = new UserUrlLinkFrame(header);

        frame._encoding = fieldBytes.get(0);

        // Note: Although it would be nice to just split the data, because the first string is
        //    encoded as per the encoding field and the second is always in Latin1, we cannot use
        //    the toStrings method.
        const descriptionAndTextBytes = fieldBytes.subarray(1);
        const delimiter = ByteVector.getTextDelimiter(frame._encoding);
        const descriptionLength = descriptionAndTextBytes.find(delimiter);
        if (descriptionLength < 0) {
            // Ill-formed frame.
            const splitText = descriptionAndTextBytes.toString(frame._encoding).split("/");
            if (splitText.length > 1) {
                // Data was probably encoded using old TagLib# behavior.
                frame._description = splitText[0];
                frame._url = splitText[1];
            } else {
                // Data has only one field, let's assume it only has a url.
                frame._description = "";
                frame._url = splitText[0];
            }
        } else {
            // Well-formed frame (or >2 fields, the latter of which will be ignored)
            const descriptionBytes = descriptionAndTextBytes.subarray(0, descriptionLength);
            frame._description = descriptionBytes.toString(frame._encoding);

            const textBytes = descriptionAndTextBytes.subarray(descriptionLength + delimiter.length);
            const splitTextBytes = textBytes.split(ByteVector.getTextDelimiter(StringType.Latin1));
            frame._url = splitTextBytes[0].toString(StringType.Latin1);
        }

        return frame;
    }

    /**
     * Constructs and initializes a new instance using the provided description and url to populate
     * the fields of the frame.
     * @param description Optional, description to store in the frame. If omitted, defaults to `""`.
     * @param url Optional, URL to store in the frame. If omitted, defaults to `""`.
     */
    public static fromFields(description?: string, url?: string): UserUrlLinkFrame {
        const frame = new UserUrlLinkFrame(new FrameHeader(FrameIdentifiers.WXXX));
        frame._description = description ?? "";
        frame._url = url ?? "";
        return frame;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the description stored in the current instance.
     */
    public get description(): string { return this._description; }
    /**
     * Sets the description stored in the current instance.
     * There should only be one frame with a matching description per tag.
     */
    public set description(value: string) { this._description = value; }

    /**
     * Gets the text encoding to use when rendering the current instance.
     */
    public get textEncoding(): StringType { return this._encoding; }
    /**
     * Sets the text encoding to use when rendering the current instance.
     * NOTE: This value will be overwritten if {@link Id3v2Settings.forceDefaultEncoding} is `true`.
     * @param value
     */
    public set textEncoding(value: StringType) { this._encoding = value; }

    /**
     * Gets the text contained in the current instance.
     */
    public get url(): string { return this._url; }
    /**
     * Sets the text contained in the current instance.
     */
    public set url(value: string) { this._url = value; }

    // #endregion

    // #region Methods

    public static filterFrames(frames: Frame[]): UserUrlLinkFrame[] {
        Guards.truthy(frames, "frames");
        return ArrayUtils.ofType(frames, UserUrlLinkFrame);
    }

    /** @inheritDoc */
    public clone(): UserUrlLinkFrame {
        const frame = UserUrlLinkFrame.fromFields(this._description, this._url);
        frame._encoding = this._encoding;
        return frame;
    }

    /** @inheritDoc */
    public toString(): string {
        return `[${this._description}] ${this._url}`;
    }

    protected renderFields(version: Id3v2Version): ByteVector {
        if (!this._description && !this._url) {
            return ByteVector.empty();
        }

        const encoding = Frame.correctEncoding(this._encoding, version);
        return ByteVector.concatenate(
            encoding,
            ByteVector.fromString(this._description ?? "", encoding),
            ByteVector.getTextDelimiter(encoding),
            ByteVector.fromString(this._url ?? "", StringType.Latin1)
        );
    }

    // #endregion
}
