import Frame from "./frame";
import {ByteVector, StringType} from "../../byteVector";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifier} from "../frameIdentifiers";
import {ArrayUtils, Guards} from "../../utils";

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
export default class UrlLinkFrame extends Frame {
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
     * Constructs and initializes a new instance by parsing the fields from the field bytes.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the fields of the frame
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(header: Id3v2FrameHeader, fieldBytes: ByteVector, version: number): UrlLinkFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        const frame = new UrlLinkFrame(header);

        // If data contains a string terminator, ignore everything after it.
        const splitData = fieldBytes.split(ByteVector.getTextDelimiter(StringType.Latin1));
        frame._text = splitData[0].toString(StringType.Latin1);

        return frame;
    }

    /**
     * Constructs and initializes an empty frame with the provided frame identity
     * @param ident Identity of the frame to construct
     */
    public static fromIdentifier(ident: FrameIdentifier): UrlLinkFrame {
        Guards.truthy(ident, "ident");
        return new UrlLinkFrame(new Id3v2FrameHeader(ident));
    }

    // #endregion

    // #region Properties

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

    public static filterFrames(frames: Frame[], identifier?: FrameIdentifier): UrlLinkFrame[] {
        Guards.truthy(frames, "frames");
        const urlFrames = ArrayUtils.ofType(frames, UrlLinkFrame);
        return !!identifier
            ? urlFrames.filter(f => f.frameId === identifier)
            : urlFrames;
    }

    /** @inheritDoc */
    public clone(): UrlLinkFrame {
        const frame = UrlLinkFrame.fromIdentifier(this.frameId);
        frame._text = this._text;
        return frame;
    }

    /** @inheritDoc */
    public toString(): string {
        return this.text;
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
