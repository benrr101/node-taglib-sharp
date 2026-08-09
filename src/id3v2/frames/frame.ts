import FrameHeader from "./frameHeader";
import Id3v2Settings from "../id3v2Settings";
import SyncData from "../syncData";
import {ByteVector, StringType} from "../../byteVector";
import {FrameFlags, Id3v2Version} from "../enums";
import {FrameIdentifier} from "../frameIdentifiers";
import {NumberUtils} from "../../utils";

/**
 * Abstract class that represents an ID3v2 frame. Frames are the unit for storing information in
 * an ID3v2 tag. There are various types of frames that store differently structured information.
 */
export default abstract class Frame {

    private _header: FrameHeader;

    // #region Constructors

    /**
     * Constructs and initializes a new instance with a frame header.
     * @param header Header for the frame.
     * @protected
     */
    protected constructor(header: FrameHeader) {
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
    public get encryptionId(): number|undefined { return this._header.encryptionId; }
    /**
     * Sets the encryption ID applied to the current instance.
     * @param value Value containing the encryption identifier for the current instance. Must be an
     *     8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID
     */
    public set encryptionId(value: number|undefined) { this._header.encryptionId = value; }

    /**
     * Gets the frame flags applied to the current instance.
     */
    public get flags(): FrameFlags { return this._header.flags; }
    /**
     * Sets the frame flags applied to the current instance.
     * If the value includes either {@link FrameFlags.Encryption} or
     * {@link FrameFlags.Compression}, {@link render} will throw.
     */
    // @TODO: This shouldn't be necessary, but removing it breaks more things than I want to fix right now.
    public set flags(value: FrameFlags) { this._header.flags = value; }

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
    public get groupId(): number|undefined { return this._header.groupId; }
    /**
     * Sets the grouping ID applied to the current instance.
     * @param value Grouping identifier for the current instance. Must be an 8-bit unsigned integer.
     *     Setting to `undefined` will remove the grouping identity header and ID
     */
    public set groupId(value: number|undefined) { this._header.groupId = value; }

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
    protected get header(): FrameHeader { return this._header; }
    /**
     * Sets the header for the frame.
     * @param value Header for the frame
     * @protected
     */
    protected set header(value: FrameHeader) { this._header = value; }

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
    public render(version: Id3v2Version): ByteVector {
        // 1) Render the fields
        const fieldBytes = this.renderFields(version);
        if (fieldBytes.length === 0) {
            // If we don't have any content, don't render anything.
            return ByteVector.empty();
        }
        this._header.dataLength = fieldBytes.length;

        // 2) Render the extended header and process with the body
        // Remove flags that are not supported by older versions of ID3v2
        if (version !== Id3v2Version.V24) {
            const v4Flags = FrameFlags.DataLengthIndicator | FrameFlags.Unsynchronized;
            this.flags &= ~(v4Flags);
        }
        if (version === Id3v2Version.V22) {
            const v3Flags = FrameFlags.Compression
                | FrameFlags.Encryption
                | FrameFlags.FileAlterPreservation
                | FrameFlags.GroupingIdentity
                | FrameFlags.ReadOnly
                | FrameFlags.TagAlterPreservation;
            this.flags &= ~(v3Flags);
        }

        // Render extended header bytes
        const extendedHeaderBytes = this._header.renderExtendedHeader(version);

        // Combine extended header with body bytes to form complete body. Unsynchronize if necessary.
        let payloadBytes = ByteVector.concatenate(extendedHeaderBytes, fieldBytes);
        if (NumberUtils.hasFlag(this.flags, FrameFlags.Unsynchronized)) {
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
    protected static correctEncoding(type: StringType, version: Id3v2Version): StringType {
        if (Id3v2Settings.forceDefaultEncoding) {
            type = Id3v2Settings.defaultEncoding;
        }

        return version !== Id3v2Version.V24 && type === StringType.UTF8
            ? StringType.UTF16
            : type;
    }

    /**
     * Renders the values in the current instance into field data for a specified version.
     * @param version ID3v2 version the field data is to be encoded in.
     */
    protected abstract renderFields(version: Id3v2Version): ByteVector;

    // #endregion
}
