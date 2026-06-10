import Id3v2Settings from "../id3v2Settings";
import UrlLinkFrame from "./urlLinkFrame";
import {ByteVector, StringType} from "../../byteVector";
import {FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {Guards} from "../../utils";

/**
 * Provides support for ID3v2 User URL Link frames (WXXX).
 */
export default class UserUrlLinkFrame extends UrlLinkFrame {
    private _description: string;
    private _encoding: StringType = Id3v2Settings.defaultEncoding;

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
    public static fromFieldBytes(header: Id3v2FrameHeader, fieldBytes: ByteVector, version: number): UserUrlLinkFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

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
                frame._text = splitText[1];
            } else {
                // Data has only one field, let's assume it only has a url.
                frame._description = undefined;
                frame._text = splitText[0];
            }
        } else {
            // Well-formed frame (or >2 fields, the latter of which will be ignored)
            const descriptionBytes = descriptionAndTextBytes.subarray(0, descriptionLength);
            frame._description = descriptionBytes.toString(frame._encoding);

            const textBytes = descriptionAndTextBytes.subarray(descriptionLength + delimiter.length);
            const splitTextBytes = textBytes.split(ByteVector.getTextDelimiter(StringType.Latin1));
            frame._text = splitTextBytes[0].toString(StringType.Latin1);
        }

        return frame;
    }

    /**
     * Constructs and initializes a new instance using the provided description and url to populate
     * the fields of the frame.
     * @param description Description to store in the frame
     * @param url URL to store in the frame
     */
    public static fromFields(description: string, url: string): UserUrlLinkFrame {
        const frame = new UserUrlLinkFrame(new Id3v2FrameHeader(FrameIdentifiers.WXXX));
        frame._description = description;
        frame._text = url;
        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.UserUrlLinkFrame; }

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

    // #endregion

    // #region Methods

    /**
     * Gets a frame from a list of frames.
     * @param frames List of frames to search
     * @param description Description of the frame to match
     * @returns Frame containing the matching user, `undefined` if a match was not found
     */
    public static findUserUrlLinkFrame(frames: UserUrlLinkFrame[], description: string): UserUrlLinkFrame {
        Guards.truthy(frames, "frames");
        Guards.truthy(description, "description");

        return frames.find((f) => f.description === description);
    }

    /** @inheritDoc */
    public clone(): UserUrlLinkFrame {
        const frame = UserUrlLinkFrame.fromFields(this._description, this._text);
        frame._encoding = this._encoding;
        return frame;
    }

    /** @inheritDoc */
    public toString(): string {
        return `[${this.description}] ${super.toString()}`;
    }

    protected renderFields(version: number): ByteVector {
        if (!this._description && !this._text) {
            return ByteVector.empty();
        }

        const encoding = UrlLinkFrame.correctEncoding(this.textEncoding, version);
        return ByteVector.concatenate(
            UrlLinkFrame.correctEncoding(this._encoding, version),
            ByteVector.fromString(this._description ?? "", encoding),
            ByteVector.getTextDelimiter(encoding),
            ByteVector.fromString(this._text ?? "", StringType.Latin1)
        );
    }

    // #endregion
}
