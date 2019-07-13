import FrameTypes from "../frameTypes";
import {ByteVector, StringType} from "../../byteVector";
import Id3v2Tag from "../id3v2Tag";
import {Guards} from "../../utils";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";

/**
 * Provides ID3v2 URL Link frame implementation (section 4.3.1) covering `W000` to `WZZZ`,
 * excluding `WXXX`.
 * With these frames dynamic data such as webpages with touring information, price information,
 * or plain ordinary news can be added to the tag. There may only be one URL link frame of its kind
 * in a tag, except when stated otherwise in the frame description. If the text string is followed
 * by a string termination, all the following information should be ignored and not be displayed.
 * The following table contains the types and descriptions as found in the ID3 2.4.0 native frames
 * specification.
 * * WCOM - The 'Commercial Information' frame is a URL prointing at a webpage with information
 *   such as where the album can be bought. There may be more than one WCOM frame per tag, but not
 *   with the same content.
 * * WCOP - The 'Copyright/Legal information' frame is a URL pointing at a webpage where the terms
 *   of use and ownership of the field is described.
 * * WOAF - The 'Official audio file webpage' frame is a URL pointing at a file specific webpage.
 * * WOAR - The 'Official artist/performer webpage' frame is a URL pointing at the artists'
 *   official webpage. There may be more than one WOAR frame in a tag if the audio contains more
 *   than one performer, but not with the same content.
 * * WOAS - THe 'Official audio source webpage' frame is a URL pointing at the official webpage of
 *   the source of the audio file, eg. a movie.
 * * WORS - The 'Official internet radio statio homepage' frame contains a URL pointing at the
 *   homepage of the internet radio station.
 * * WPAY - The 'Payment' frame is a URL pointing at a webpage that will handle the process of
 *   paying for this file.
 * * WPUB - The 'Publisher's official webpage' frame is a URL pointing at the official webpage
 *   for the publisher.
 */
export class UrlLinkFrame extends Frame {
    private _encoding: StringType = StringType.Latin1;
    private _rawData: ByteVector;
    private _rawVersion: number;
    private _textFields: string[] = [];

    // #region Constructors

    protected constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes an empty frame with the provided frame identity
     * @param ident Identity of the frame to construct
     */
    public static fromIdentity(ident: ByteVector): UrlLinkFrame {
        return new UrlLinkFrame(new Id3v2FrameHeader(ident, 4));
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
    ): UrlLinkFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");
        Guards.byte(version, "version");

        const frame = new UrlLinkFrame(header);
        frame.setData(data, offset, version, false);
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified
     * ID3v2 version.
     * @param data Raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number): UrlLinkFrame {
        const frame = new UrlLinkFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, version, true);
        return frame;
    }


    // #endregion

    // #region Properties

    public get frameClassType(): FrameClassType { return FrameClassType.UrlLinkFrame; }

    /**
     * Gets the text contained in the current instance.
     * Modifying the contents of the returned value will not modify the contents of the current
     * instance. The value must be reassigned for the value to change.
     */
    public get text(): string[] {
        this.parseRawData();
        return this._textFields.slice(0);
    }
    /**
     * Sets the text contained in the current instance.
     */
    public set text(value: string[]) {
        this._rawData = undefined;
        this._textFields = value ? value.slice() : [];
    }

    /**
     * Gets the text encoding to use when rendering the current instance.
     */
    public get textEncoding(): StringType {
        this.parseRawData();
        return this._encoding;
    }
    /**
     * Sets the text encoding to use when rendering the current instance.
     * NOTE: This value will be overwritten if {@see Id3v2Tag.forceDefaultEncoding} is `true`.
     * @param value
     */
    public set textEncoding(value: StringType) { this._encoding = value; }

    // #endregion

    // #region Methods

    /**
     * Gets a frame from a specified tag, optionally creating it if it does not exist.
     * @param tag Object to search in
     * @param ident Frame identifier to search for. Must be 4 bytes
     * @param create Whether or not to create an add a new frame to the tag if a match is not found
     * @returns PopularimeterFrame Frame containing the matching user, `undefined` if a match was
     *     not found and {@paramref create} is `false`. A new frame is returned if
     *     {@paramref create} is `true`.
     */
    public static get(tag: Id3v2Tag, ident: ByteVector, create: boolean): UrlLinkFrame {
        Guards.truthy(tag, "tag");
        Guards.truthy(ident, "ident");
        if (ident.length !== 4) {
            throw new Error("Identifier must be 4 bytes long.");
        }

        const frames = tag.getFramesByIdentifier<UrlLinkFrame>(FrameClassType.UrlLinkFrame, ident);
        let frame = frames.find(() => true);

        if (frame || !create) {
            return frame;
        }

        // Create new frame
        frame = UrlLinkFrame.fromIdentity(ident);
        tag.addFrame(frame);
        return frame;
    }

    /** @inheritDoc */
    public toString(): string {
        this.parseRawData();
        return this.text.join("; ");
    }

    /** @inheritDoc */
    protected parseFields(data: ByteVector, version: number): void {
        Guards.byte(version, "version");
        this._rawData = data;
        this._rawVersion = version;
    }

    protected parseRawData(): void {
        if (!this._rawData) {
            return;
        }

        const data = this._rawData;
        this._rawData = undefined;

        const fieldList = [];
        const delim = ByteVector.getTextDelimiter(this._encoding);
        if (this.frameId !== FrameTypes.WXXX) {
            fieldList.push(... data.toStrings(StringType.Latin1, 0));
        } else if (data.length > 1 && !ByteVector.equal(data.mid(0, delim.length), delim)) {
            let value = data.toString(StringType.Latin1, 1, data.length - 1);

            // Do a fast removal of end bytes
            if (value.length > 1 && value[value.length - 1] === "\0") {
                for (let i = value.length - 1; i >= 0; i--) {
                    if (value[i] !== "\0") {
                        value = value.substr(0, i + 1);
                        break;
                    }
                }
            }

            fieldList.push(value);
        }

        // Bad tags may have one or more null characters at the end of a string, resulting in empty
        // strings at the end of the field list. Strip them off.
        while (fieldList.length !== 0 && !fieldList[fieldList.length - 1]) {
            fieldList.pop();
        }
        this._textFields = fieldList;
    }

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        if (this._rawData && this._rawVersion === version) {
            return this._rawData;
        }

        const encoding = UrlLinkFrame.correctEncoding(this.textEncoding, version);
        const isWxxx = this.frameId === FrameTypes.WXXX;
        const v = isWxxx
            ? ByteVector.fromByteArray(new Uint8Array([encoding]))
            : ByteVector.empty();
        let text = this._textFields;

        if (version > 3 || isWxxx) {
            if (isWxxx) {
                if (text.length === 0) {
                    text = [undefined, undefined];
                } else if (text.length === 1) {
                    text = [text[0], undefined];
                }
            }
        }
        v.addByteVector(ByteVector.fromString(text.join("/"), StringType.Latin1));

        return v;
    }

    // #endregion
}

/**
 * Provides support for ID3v2 User URL Link frames (WXXX).
 */
export class UserUrlLinkFrame extends UrlLinkFrame {
    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance using the provided description as the text
     * of the frame.
     * @param description Description to use as text of the frame.
     */
    public static fromDescription(description: string): UserUrlLinkFrame {
        const frame = new UserUrlLinkFrame(new Id3v2FrameHeader(FrameTypes.WXXX, 4));
        frame.text = [description];
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
    ): UserUrlLinkFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");
        Guards.byte(version, "version");

        const frame = new UserUrlLinkFrame(header);
        frame.setData(data, offset, version, false);
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified
     * ID3v2 version.
     * @param data Raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number): UserUrlLinkFrame {
        const frame = new UserUrlLinkFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, version, true);
        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.UserUrlLinkFrame; }

    /**
     * Gets the description stored in the current instance.
     */
    public get description(): string {
        const text = super.text;
        return text.length > 0 ? text[0] : undefined;
    }
    /**
     * Sets the description stored in the current instance.
     * There should only be one frame with a matching description per tag.
     */
    public set description(value: string) {
        let text = super.text;
        if (text.length > 0) {
            text[0] = value;
        } else {
            text = [value];
        }
        super.text = text;
    }

    /**
     * Gets the text contained in the current instance.
     * NOTE: Modifying the contents of the returned value will not modify the contents of the
     * current instance. The value must be reassigned for the value to change.
     */
    public get text(): string[] {
        const text = super.text;
        if (text.length < 2) { return []; }

        const newText = new Array<string>(text.length - 1);
        for (let i = 0; i < newText.length; i++) {
            newText[i] = text[i + 1];
        }
        return newText;
    }
    /**
     * Sets the text contained in the current instance.
     */
    public set text(value: string[]) {
        const newValue = [this.description];
        if (value) {
            newValue.push(... value);
        }
        super.text = newValue;
    }

    // #endregion

    // #region Methods

    /**
     * Gets a frame from a specified tag, optionally creating it if it does not exist.
     * @param tag Object to search in
     * @param description Description of the frame to match
     * @param create Whether or not to create an add a new frame to the tag if a match is not found
     * @returns UserUrlLinkFrame Frame containing the matching user, `undefined` if a match was not
     *     found and {@paramref create} is `false`. A new frame is returned if
     *     {@paramref create} is `true`.
     */
    public static getUserFrame(tag: Id3v2Tag, description: string, create: boolean): UserUrlLinkFrame {
        Guards.truthy(tag, "tag");
        Guards.truthy(description, "description");

        const frames = tag.getFramesByClassType<UserUrlLinkFrame>(FrameClassType.UserUrlLinkFrame);
        let frame = frames.find((f) => f.description === description);

        if (frame || !create) {
            return frame;
        }

        // Create new frame
        frame = UserUrlLinkFrame.fromDescription(description);
        tag.addFrame(frame);
        return frame;
    }

    /** @inheritDoc */
    public toString(): string {
        return `[${this.description}] ${super.toString()}`;
    }

    // #endregion
}
