import Id3v2Settings from "../id3v2Settings";
import SyncData from "../syncData";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError, NotImplementedError} from "../../errors";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifier} from "../frameIdentifiers";
import {Guards, NumberUtils} from "../../utils";

/**
 * Enumeration of types of frames.
 */
// @TODO: We can probably get rid of this since instance of works quite well.
export enum FrameClassType {
    /**
     * Indicates the frame is an attachment frame.
     */
    AttachmentFrame,

    /**
     * Indicates the frame is a comments frame.
     */
    CommentsFrame,

    /**
     * Indicates the frame is an event time code frame.
     */
    EventTimeCodeFrame,

    /**
     * Indicates the frame is a genre frame.
     */
    GenreFrame,

    /**
     * Indicates the frame is a music CD identifier frame.
     */
    MusicCdIdentifierFrame,

    /**
     * Indicates the frame is a play count frame.
     */
    PlayCountFrame,

    /**
     * Indicates the frame is a popularimeter frame.
     */
    PopularimeterFrame,

    /**
     * Indicates the frame is a private frame.
     */
    PrivateFrame,

    /**
     * Indicates the frame is relative volume frame.
     */
    RelativeVolumeFrame,

    /**
     * Indicates the frame is a synchronized lyrics frame.
     */
    SynchronizedLyricsFrame,

    /**
     * Indicates the frame is a terms of use frame.
     */
    TermsOfUseFrame,

    /**
     * Indicates the frame is a text information frame.
     */
    TextInformationFrame,

    /**
     * Indicates the frame is an unique file identifier frame.
     */
    UniqueFileIdentifierFrame,

    /**
     * Indicates the frame is an unknown frame.
     */
    UnknownFrame,

    /**
     * Indicates the frame is an attachment frame.
     */
    UnsynchronizedLyricsFrame,

    /**
     * Indicates the frame is a URL link frame.
     */
    UrlLinkFrame,

    /**
     * Indicates the frame is a user text information frame.
     */
    UserTextInformationFrame,

    /**
     * Indicates the frame is a user URL link frame.
     */
    UserUrlLinkFrame,
}

/**
 * Abstract class that represents an ID3v2 frame. Frames are the unit for storing information in
 * an ID3v2 tag. There are various types of frames that store differently structured information.
 */
export abstract class Frame {

    private _header: Id3v2FrameHeader;

    // #region Constructors

    /**
     * Constructs and initializes a new instance with a frame header.
     * @param header Header for the frame.
     * @protected
     */
    protected constructor(header: Id3v2FrameHeader) {
        this._header = header;
    }

    // #endregion Constructors

    // #region Properties

    /**
     * Gets the encryption ID applied to the current instance.
     * @returns
     *     Value containing the encryption identifier for the current instance or
     *     `undefined` if not set.
     */
    public get encryptionId(): number { return this._header.encryptionId; }
    /**
     * Sets the encryption ID applied to the current instance.
     * @param value Value containing the encryption identifier for the current instance. Must be an
     *     8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID
     */
    public set encryptionId(value: number) { this._header.encryptionId = value; }

    /**
     * Gets the frame flags applied to the current instance.
     */
    public get flags(): Id3v2FrameFlags { return this._header.flags; }
    /**
     * Sets the frame flags applied to the current instance.
     * If the value includes either {@link Id3v2FrameFlags.Encryption} or
     * {@link Id3v2FrameFlags.Compression}, {@link render} will throw.
     */
    // @TODO: This shouldn't be necessary, but removing it braks mroe things than I want to fix right now.
    public set flags(value: Id3v2FrameFlags) { this._header.flags = value; }

    /**
     * Gets a flag indicating which type of frame the current instance is.
     */
    // @TODO: This can be removed as instanceof is pretty good now.
    public abstract get frameClassType(): FrameClassType;

    /**
     * Gets the frame ID for the current instance.
     * @returns Object representing of the identifier of the frame
     */
    public get frameId(): FrameIdentifier { return this._header.frameId; }

    /**
     * Gets the grouping ID applied to the current instance.
     * @returns
     *     Value containing the grouping identifier for the current instance, or
     *     `undefined` if not set.
     */
    public get groupId(): number { return this._header.groupId; }
    /**
     * Sets the grouping ID applied to the current instance.
     * @param value Grouping identifier for the current instance. Must be an 8-bit unsigned integer.
     *     Setting to `undefined` will remove the grouping identity header and ID
     */
    public set groupId(value: number) { this._header.groupId = value; }

    /**
     * Gets the size of the current instance as it was last stored on disk.
     * NOTE: This value is not used outside of reading a frame from disk, so newly created frames
     *     should not have this value set.
     */
    public get size(): number { return this._header.frameSize; }

    /**
     * Gets the header for the frame. For new frames this should not exist.
     * @protected
     */
    protected get header(): Id3v2FrameHeader { return this._header; }
    /**
     * Sets the header for the frame.
     * @param value Header for the frame
     * @protected
     */
    protected set header(value: Id3v2FrameHeader) { this._header = value; }

    // #endregion

    /**
     * Creates a deep copy of the current instance.
     * This method is implemented by rendering the current instance as an ID3v2.4 frame and using
     * the frame factory to create a new frame. As such, this method should be overridden by child
     * classes.
     */
    public abstract clone(): Frame;

    /**
     * Renders the current instance, encoded in a specified ID3v2 version.
     * @param version Version of ID3v2 to use when encoding the current instance
     */
    public render(version: number): ByteVector {
        Guards.byte(version, "version");

        // 1) Render the fields
        const fieldBytes = this.renderFields(version);
        if (fieldBytes.length === 0) {
            // If we don't have any content, don't render anything.
            return ByteVector.empty();
        }
        this._header.dataLength = fieldBytes.length;


        // 2) Render the extended header and process with the body
        // Remove flags that are not supported by older versions of ID3v2
        if (version < 4) {
            const v4Flags = Id3v2FrameFlags.DataLengthIndicator | Id3v2FrameFlags.Unsynchronized;
            this.flags &= ~(v4Flags);
        }
        if (version < 3) {
            const v3Flags = Id3v2FrameFlags.Compression
                | Id3v2FrameFlags.Encryption
                | Id3v2FrameFlags.FileAlterPreservation
                | Id3v2FrameFlags.GroupingIdentity
                | Id3v2FrameFlags.ReadOnly
                | Id3v2FrameFlags.TagAlterPreservation;
            this.flags &= ~(v3Flags);
        }

        // Render extended header bytes
        const extendedHeaderBytes = this._header.renderExtendedHeader(version);

        // Combine extended header with body bytes to form complete body. Unsynchronize if necessary.
        let payloadBytes = ByteVector.concatenate(extendedHeaderBytes, fieldBytes);
        if (NumberUtils.hasFlag(this.flags, Id3v2FrameFlags.Unsynchronized)) {
            payloadBytes = SyncData.unsyncByteVector(payloadBytes);
        }

        // Update size of the body in the header
        this._header.frameSize = payloadBytes.length;

        // 3) Render the header
        const headerBytes = this._header.render(version);

        // 4) Combine all and return
        return ByteVector.concatenate(headerBytes, payloadBytes);
    }

    // #region Protected Methods

    /**
     * Converts an encoding to be a supported encoding for a specified tag version.
     * @param type Value containing the original encoding
     * @param version Value containing the ID3v2 version to be encoded.
     * @returns
     *     Value containing the correct encoding to use, based on
     *     {@link Id3v2Settings.forceDefaultEncoding} and what is supported by
     *     `version`
     */
    protected static correctEncoding(type: StringType, version: number): StringType {
        Guards.byte(version, "version");

        if (Id3v2Settings.forceDefaultEncoding) {
            type = Id3v2Settings.defaultEncoding;
        }

        return version < 4 && type === StringType.UTF8
            ? StringType.UTF16
            : type;
    }

    /**
     * Renders the values in the current instance into field data for a specified version.
     * @param version ID3v2 version the field data is to be encoded in.
     */
    protected abstract renderFields(version: number): ByteVector;

    // #endregion
}
