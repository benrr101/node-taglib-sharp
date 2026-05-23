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
     * Gets the frame flags applied to the current instance.
     */
    public get flags(): Id3v2FrameFlags { return this._header.flags; }

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
     * Gets the size of the current instance as it was last stored on disk.
     * NOTE: This value is not used outside of reading a frame from disk, so newly created frames
     *     should not have this value set.
     */
    public get size(): number { return this._header.frameSize; }

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

        // 1) Render the body
        let bodyBytes = this.renderFields(version);
        if (bodyBytes.length === 0) {
            // If we don't have any content, don't render anything.
            return ByteVector.empty();
        }

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
        bodyBytes = ByteVector.concatenate(extendedHeaderBytes, bodyBytes);
        if (NumberUtils.hasFlag(this.flags, Id3v2FrameFlags.Unsynchronized)) {
            bodyBytes = SyncData.unsyncByteVector(bodyBytes);
        }

        // Update size of the body in the header
        this._header.frameSize = bodyBytes.length;

        // 3) Render the header
        const headerBytes = this._header.render(version);


        // 4) Combine all and return
        return ByteVector.concatenate(headerBytes, bodyBytes);
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
     * Extracts the field data from the raw portion of an ID3v2 frame.
     * This method is necessary for extracting extra data prepended to the frame such the as
     * grouping ID.
     * @param frameData Raw frame data
     * @param offset Index at which the data is contained
     * @param version Version of the ID3v2 tag the data was originally encoded with
     * @param dataIncludesHeader `true` if `frameData` includes the header, `false`
     *     otherwise
     */
    protected fieldData(
        frameData: ByteVector,
        offset: number,
        version: number,
        dataIncludesHeader: boolean
    ): ByteVector {
        // @TODO: Subarrays are cheap now, we could do this all without an offset.
        let dataOffset = offset + (dataIncludesHeader ? Id3v2FrameHeader.getSize(version) : 0);
        let dataLength = this.size;

        if (NumberUtils.hasFlag(this.flags, (Id3v2FrameFlags.Compression | Id3v2FrameFlags.DataLengthIndicator))) {
            dataOffset += 4;
            dataLength -= 4;
        }

        if (NumberUtils.hasFlag(this.flags, Id3v2FrameFlags.GroupingIdentity)) {
            if (frameData.length <= dataOffset) {
                throw new CorruptFileError("Frame data incomplete");
            }
            this.groupId = frameData.get(dataOffset++);
            dataLength--;
        }

        if (NumberUtils.hasFlag(this.flags, Id3v2FrameFlags.Encryption)) {
            if (frameData.length <= dataOffset) {
                throw new CorruptFileError("Frame data incomplete");
            }
            this._encryptionId = frameData.get(dataOffset++);
            dataLength--;
        }

        dataLength = Math.min(dataLength, frameData.length - dataOffset);
        if (dataLength < 0) {
            throw new CorruptFileError("Frame size less than zero");
        }

        let data = frameData.subarray(dataOffset, dataLength);
        if (NumberUtils.hasFlag(this.flags, Id3v2FrameFlags.Unsynchronized)) {
            data = SyncData.resyncByteVector(data);
        }

        // @FIXME: Implement encryption
        if (NumberUtils.hasFlag(this.flags, Id3v2FrameFlags.Encryption)) {
            throw new NotImplementedError("Encryption is not supported");
        }

        // @FIXME: Implement compression
        if (NumberUtils.hasFlag(this.flags, Id3v2FrameFlags.Compression)) {
            throw new NotImplementedError("Compression is not supported");
        }

        return data;
    }

    /**
     * Populates the values in this frame by parsing its field data in a specified version.
     * @param data Extracted field data
     * @param version ID3v2 version the field data is encoded in
     */
    protected abstract parseFields(data: ByteVector, version: number): void;

    /**
     * Renders the values in the current instance into field data for a specified version.
     * @param version ID3v2 version the field data is to be encoded in.
     */
    protected abstract renderFields(version: number): ByteVector;

    /**
     * Populates the current instance by reading the raw frame from disk, optionally reading the
     * header.
     * @param data Raw ID3v2 frame
     * @param offset Offset in `data` at which the frame begins.
     * @param readHeader Whether or not to read the reader into the current instance.
     * @param version Version of the ID3v2 tag the data was encoded with
     */
    protected setData(data: ByteVector, offset: number, readHeader: boolean, version: number): void {
        if (readHeader) {
            this._header = Id3v2FrameHeader.fromData(data, version);
        }

        // @TODO: If we don't have a header to read, why are we saying the data includes a header?
        this.parseFields(this.fieldData(data, offset, version, false), version);
    }

    // #endregion
}
