import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../frameIdentifiers";
import {Guards} from "../../utils";

/**
 * Provides ID3v2 URL Link frame implementation (section 4.3.1) covering `W000` to `WZZZ`,
 * excluding `WXXX`.
 * With these frames dynamic data such as webpages with touring information, price information,
 * or plain ordinary news can be added to the tag. There may only be one URL link frame of its kind
 * in a tag, except when stated otherwise in the frame description. If the text string is followed
 * by a string termination, all the following information should be ignored and not be displayed.
 * The following table contains the types and descriptions as found in the ID3 2.4.0 native frames
 * specification.
 * * WCOM - The 'Commercial Information' frame is a URL pointing at a webpage with information
 *   such as where the album can be bought. There may be more than one WCOM frame per tag, but not
 *   with the same content.
 * * WCOP - The 'Copyright/Legal information' frame is a URL pointing at a webpage where the terms
 *   of use and ownership of the field is described.
 * * WOAF - The 'Official audio file webpage' frame is a URL pointing at a file specific webpage.
 * * WOAR - The 'Official artist/performer webpage' frame is a URL pointing at the artists'
 *   official webpage. There may be more than one WOAR frame in a tag if the audio contains more
 *   than one performer, but not with the same content.
 * * WOAS - THe 'Official audio source webpage' frame is a URL pointing at the official webpage of
 *   the source of the audio file, eg, a movie.
 * * WORS - The 'Official internet radio station homepage' frame contains a URL pointing at the
 *   homepage of the internet radio station.
 * * WPAY - The 'Payment' frame is a URL pointing at a webpage that will handle the process of
 *   paying for this file.
 * * WPUB - The 'Publisher's official webpage' frame is a URL pointing at the official webpage
 *   for the publisher.
 */
export class UrlLinkFrame extends Frame {
    // @TODO: Don't allow protected member variables
    /**
     * Decoded text contained in the current instance.
     * @protected
     */
    protected _text: string;

    // #region Constructors

    protected constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes an empty frame with the provided frame identity
     * @param ident Identity of the frame to construct
     */
    public static fromIdentity(ident: FrameIdentifier): UrlLinkFrame {
        Guards.truthy(ident, "ident");
        return new UrlLinkFrame(new Id3v2FrameHeader(ident));
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified ID3v2
     * version. This method allows for offset reading from the data byte vector.
     * @param data Raw representation of the new frame
     * @param offset What offset in `data` the frame actually begins. Must be positive,
     *     safe integer
     * @param header Header of the frame found at `data` in the data
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader,
        version: number
    ): UrlLinkFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");
        Guards.byte(version, "version");

        const frame = new UrlLinkFrame(header);
        frame.setData(data, offset, false, version);
        return frame;
    }

    // #endregion

    // #region Properties

    public get frameClassType(): FrameClassType { return FrameClassType.UrlLinkFrame; }

    /**
     * Gets the text contained in the current instance.
     */
    public get text(): string { return this._text; }
    /**
     * Sets the text contained in the current instance.
     */
    public set text(value: string) { this._text = value; }

    // #endregion

    // #region Methods

    /**
     * Gets the first frame that matches the provided type
     * @param frames Object to search in
     * @param ident Frame identifier to search for
     * @returns Frame containing the matching frameId, `undefined` if a match was not found
     */
    public static findUrlLinkFrame(frames: UrlLinkFrame[], ident: FrameIdentifier): UrlLinkFrame {
        Guards.truthy(frames, "frames");
        Guards.truthy(ident, "ident");

        return frames.find((f) => f.frameId === ident);
    }

    /** @inheritDoc */
    public clone(): UrlLinkFrame {
        const frame = UrlLinkFrame.fromIdentity(this.frameId);
        frame._text = this._text;
        return frame;
    }

    /** @inheritDoc */
    public toString(): string {
        return this.text;
    }

    /** @inheritDoc */
    protected parseFields(data: ByteVector, _version: number): void {
        this._text = data.toString(StringType.Latin1);
    }

    /** @inheritDoc */
    protected renderFields(_version: number): ByteVector {
        if (!this._text) {
            return ByteVector.empty();
        }

        return ByteVector.fromString(this.text, StringType.Latin1);
    }

    // #endregion
}

/**
 * Provides support for ID3v2 User URL Link frames (WXXX).
 */
export class UserUrlLinkFrame extends UrlLinkFrame {
    private _description: string;
    private _encoding: StringType = Id3v2Settings.defaultEncoding;

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
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

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified ID3v2
     * version. This method allows for offset reading from the data byte vector.
     * @param data Raw representation of the new frame
     * @param offset What offset in `data` the frame actually begins. Must be positive,
     *     safe integer
     * @param header Header of the frame found at `data` in the data
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader,
        version: number
    ): UserUrlLinkFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");

        const frame = new UserUrlLinkFrame(header);
        frame.setData(data, offset, false, version);
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

    protected parseFields(data: ByteVector, _version: number): void {
        if (data.length < 3) {
            throw new Error("User URL link frame is smaller than minimum size.");
        }

        // Text Encoding    $xx
        // Description      <text string according to encoding> $00 (00)
        // URL              <text string>

        this._encoding = <StringType>data.get(0);

        // Note: Although it would be nice to just split the data, because the first string is
        //    encoded as per the encoding field and the second is always in Latin1, we cannot use
        //    the toStrings method.
        const textBytes = data.subarray(1);
        const delimiter = ByteVector.getTextDelimiter(this._encoding);
        const descriptionLength = textBytes.find(delimiter);
        if (descriptionLength < 0) {
            // Ill-formed frame.
            const splitText = textBytes.toString(this._encoding).split("/");
            if (splitText.length > 1) {
                // Data was probably encoded using old TagLib# behavior.
                this._description = splitText[0];
                this._text = splitText[1];
            } else {
                // Data has only one field, let's assume it only has a url.
                this._description = undefined;
                this._text = splitText[0];
            }
        } else {
            // Well-formed frame
            this._description = textBytes.subarray(0, descriptionLength).toString(this._encoding);
            this._text = textBytes.subarray(descriptionLength + delimiter.length).toString(StringType.Latin1);
        }
    }

    protected renderFields(version: number): ByteVector {
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
