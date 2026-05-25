import AttachmentFrame from "./attachmentFrame";
import CommentsFrame from "./commentsFrame";
import GenreFrame from "./genreFrame";
import MusicCdIdentifierFrame from "./musicCdIdentifierFrame";
import PlayCountFrame from "./playCountFrame";
import PopularimeterFrame from "./popularimeterFrame";
import PrivateFrame from "./privateFrame";
import SyncData from "../syncData";
import TermsOfUseFrame from "./termsOfUseFrame";
import UniqueFileIdentifierFrame from "./uniqueFileIdentifierFrame";
import UnknownFrame from "./unknownFrame";
import UnsynchronizedLyricsFrame from "./unsynchronizedLyricsFrame";
import {ByteVector} from "../../byteVector";
import {CorruptFileError, NotImplementedError} from "../../errors";
import {EventTimeCodeFrame} from "./eventTimeCodeFrame";
import {File} from "../../file";
import {Frame} from "./frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../frameIdentifiers";
import {RelativeVolumeFrame} from "./relativeVolumeFrame";
import {SynchronizedLyricsFrame} from "./synchronizedLyricsFrame";
import {TextInformationFrame, UserTextInformationFrame} from "./textInformationFrame";
import {UrlLinkFrame, UserUrlLinkFrame} from "./urlLinkFrame";
import {Guards, NumberUtils} from "../../utils";

/**
 * Type shortcut for a method that returns a {@link Frame}.
 * @param data Byte vector that contains the frame
 * @param offset Position into the byte vector where the frame begins
 * @param header The header that describes the frame
 * @param version ID3v2 version the frame is encoded with. Must be unsigned 8-bit int
 */
export type FrameCreator = (data: ByteVector, offset: number, header: Id3v2FrameHeader, version: number) => Frame;

/**
 * Performs the necessary operations to determine and create the correct child classes of
 * {@link Frame} for a given raw ID3v2 frame.
 * By default, this will only load frames contained in the library. To add additional frames to the
 * process, register a frame creator with {@link addFrameCreator}.
 */
export class Id3v2FrameFactory {

    private static readonly CUSTOM_FRAME_CREATORS: FrameCreator[] = [];

    private static readonly DEFAULT_FRAME_CREATORS: Readonly<Map<FrameIdentifier, FrameCreator>> =
        new Map<FrameIdentifier, FrameCreator>([
            [FrameIdentifiers.APIC, AttachmentFrame.fromOffsetRawData],
            [FrameIdentifiers.COMM, CommentsFrame.fromOffsetRawData],
            [FrameIdentifiers.ETCO, EventTimeCodeFrame.fromOffsetRawData],
            [FrameIdentifiers.GEOB, AttachmentFrame.fromOffsetRawData],
            [FrameIdentifiers.MCDI, MusicCdIdentifierFrame.fromOffsetRawData],
            [FrameIdentifiers.PCNT, PlayCountFrame.fromOffsetRawData],
            [FrameIdentifiers.POPM, PopularimeterFrame.fromOffsetRawData],
            [FrameIdentifiers.PRIV, PrivateFrame.fromOffsetRawData],
            [FrameIdentifiers.RVA2, RelativeVolumeFrame.fromOffsetRawData],
            [FrameIdentifiers.SYLT, SynchronizedLyricsFrame.fromOffsetRawData],
            [FrameIdentifiers.TCON, GenreFrame.fromOffsetRawData],
            [FrameIdentifiers.TXXX, UserTextInformationFrame.fromOffsetRawData],
            [FrameIdentifiers.UFID, UniqueFileIdentifierFrame.fromOffsetRawData],
            [FrameIdentifiers.USER, TermsOfUseFrame.fromOffsetRawData],
            [FrameIdentifiers.USLT, UnsynchronizedLyricsFrame.fromOffsetRawData],
            [FrameIdentifiers.WXXX, UserUrlLinkFrame.fromOffsetRawData]
        ]);


    /**
     * Adds a custom frame creator to try before using standard frame creation methods.
     * Frame creators are used before standard methods so custom checking can be used and new
     * formats can be added. They are executed in reverse order in which they are added.
     * @param creator Frame creator function
     *     * data: ByteVector Raw ID3v2 frame
     *     * offset: number Offset in data at which the frame data begins (should be int)
     *     * header: Id3v2FrameHeader Header for the frame contained in data
     *     * version: number ID3v2 version the raw frame data is stored in (should be byte)
     *     * returns Frame if method was able to match the frame, falsy otherwise
     */
    public static addFrameCreator(creator: FrameCreator): void {
        Guards.truthy(creator, "creator");
        this.CUSTOM_FRAME_CREATORS.unshift(creator);
    }

    /**
     * Removes all custom frame creators
     */
    public static clearFrameCreators(): void {
        this.CUSTOM_FRAME_CREATORS.length = 0;
    }

    /**
     * Creates a {@link Frame} object by reading it from a file.
     * @param file File that contains at least one frame
     * @param offset Index into the data block where the frame header begins
     * @param version ID3v2 version the frame is encoded with. Must be unsigned 8-bit int
     * @param unsyncedAtTagLevel Whether the entire tag has already been unsynchronized
     * @returns Frame|undefined
     *     Frame read from the file is returned if it was read, `undefined` is returned if no frame
     *     could be found at the given position.
     */
    public static createFrameFromFile(
        file: File,
        offset: number,
        version: number,
        unsyncedAtTagLevel: boolean
    ): {frame: Frame, totalSize: number}|undefined {
        Guards.truthy(file, "file");
        Guards.safeUint(offset, "offset");
        Guards.byte(version, "version");

        // 1) Make sure we're in the right position for the start of the frame
        file.seek(offset);

        // 2) Read basic frame header
        const headerSize = Id3v2FrameHeader.getBaseSize(version);
        const headerBytes = file.readBlock(headerSize);
        if (headerBytes.length < headerSize) {
            throw new Error("Argument error: data does not contain enough bytes for an ID3v2 frame header");
        }

        // If the header bytes start with 0, we assume we've reached the padding portion of the tag.
        if (headerBytes.get(0) === 0) {
            return undefined;
        }

        const header = Id3v2FrameHeader.fromData(headerBytes, version);
        this.assertSupportedFlags(header.flags);

        // @TODO: Support lazy loading frames again
        // 3) Read the body bytes and finish constructing the frame
        const bodyBytes = file.readBlock(header.frameSize);
        const frame = this.createFrameFromBodyBytes(header, bodyBytes, version, unsyncedAtTagLevel);

        return { frame: frame, totalSize: header.frameSize + headerSize };
    }

    /**
     * Creates a {@link Frame} object by reading it from raw frame data.
     * @param data Block of data containing at least one frame.
     * @param offset Index into the data block where the frame header begins.
     * @param version ID3v2 version the frame is encoded with. Must be unsigned 8-bit int
     * @param unsyncedAtTagLevel Whether the entire tag has already been unsynchronized
     * @returns Frame|undefined
     *     Frame read from the file is returned if it was read, `undefined` is returned if no frame
     *     could be found at the given position.
     */
    public static createFrameFromTagBytes(
        data: ByteVector,
        offset: number,
        version: number,
        unsyncedAtTagLevel: boolean
    ): {frame: Frame, totalSize: number}|undefined {
        Guards.truthy(data, "data");
        Guards.safeUint(offset, "offset");
        Guards.byte(version, "version");

        // 1) Read the basic frame header
        const headerSize = Id3v2FrameHeader.getBaseSize(version);
        const headerBytes = data.subarray(offset, headerSize);
        if (headerBytes.length < headerSize) {
            throw new Error("Argument error: data does not contain enough bytes for an ID3v2 frame header");
        }

        // If the header bytes start with 0, we assume we've reached the padding portion of the tag.
        if (headerBytes.get(0) === 0) {
            return undefined;
        }

        const header = Id3v2FrameHeader.fromData(headerBytes, version);
        this.assertSupportedFlags(header.flags);

        // 2) Read the body bytes and finish constructing frame
        const bodyBytes = data.subarray(offset + headerSize, header.frameSize);
        const frame = this.createFrameFromBodyBytes(header, bodyBytes, version, unsyncedAtTagLevel);

        return { frame: frame, totalSize: header.frameSize + headerSize };
    }

    /**
     * Creates a {@link Frame} object by reading it from raw ID3v2 frame data.
     * @param data Raw ID3v2 frame
     * @param file File to read the frame from if `data` is falsy
     * @param offset Index into `file` or in `data` if truthy, at which the
     *     frame begins. After reading, the offset where the next frame can be read is returned in
     *     the `offset` property of the returned object
     * @param version ID3v2 version the frame is encoded with. Must be unsigned 8-bit int
     * @param alreadyUnsynced Whether or not the entire tag has already been unsynchronized
     * @returns
     *     Undefined is returned if there are no more frames to read.
     *     Object is returned if a frame was found. Object has the following properties:
     *     * frame: {@link Frame} that was read
     *     * offset: updated offset where the next frame starts
     */
    // @TODO: Split into fromFile and fromData
    public static createFrame(
        data: ByteVector,
        file: File,
        offset: number,
        version: number,
        alreadyUnsynced: boolean
    ): {frame: Frame, offset: number} {
        Guards.uint(offset, "offset");
        Guards.byte(version, "version");

        let position = 0;
        const frameHeaderSize = Id3v2FrameHeader.getBaseSize(version);

        if (!data && !file) {
            throw new Error("Argument exception: data or file must be provided");
        }

        if (!data) {
            file.seek(offset);
            data = file.readBlock(frameHeaderSize);
        } else {
            file = undefined;
            position = offset;
        }

        // If the next data's position is 0, assume that we've hit the padding portion of the frame
        if (data.get(position) === 0) {
            return undefined;
        }

        const header = Id3v2FrameHeader.fromData(data.subarray(position, frameHeaderSize), version);
        const frameStartIndex = offset + frameHeaderSize;
        const frameEndIndex = offset + header.frameSize + frameHeaderSize;
        const frameSize = frameEndIndex - frameStartIndex;

        // Illegal frames are filtered out when creating the frame header

        // Mark the frame as unsynchronized if the entire tag is already unsynchronized
        if (alreadyUnsynced) {
            header.flags &= ~Id3v2FrameFlags.Unsynchronized;
        }

        // TODO: Support compression
        if (NumberUtils.hasFlag(header.flags, Id3v2FrameFlags.Compression)) {
            throw new NotImplementedError("Compression is not supported");
        }

        // TODO: Support encryption
        if (NumberUtils.hasFlag(header.flags, Id3v2FrameFlags.Encryption)) {
            throw new NotImplementedError("Encryption is not supported");
        }

        try {
            // Try to find a custom creator
            for (const creator of this.CUSTOM_FRAME_CREATORS) {
                // @TODO: If we're reading from a file, data will only ever contain the header
                const frame = creator(data, position, header, version);
                if (frame) {
                    return {
                        frame: frame,
                        offset: frameEndIndex
                    };
                }
            }

            // Lazy object loading handling
            if (file) {
                // Attached picture (frames 4.14)
                // General encapsulated object (frames 4.15)
                // TODO: Make lazy loading optional
                if (header.frameId === FrameIdentifiers.APIC || header.frameId === FrameIdentifiers.GEOB) {
                    return {
                        frame: AttachmentFrame.fromFile(
                            file.fileAbstraction,
                            header,
                            frameStartIndex,
                            frameSize,
                            version
                        ),
                        offset: frameEndIndex
                    };
                }

                // Read remaining part of the frame for the non-lazy Frame
                file.seek(frameStartIndex);
                data = ByteVector.concatenate(
                    data,
                    file.readBlock(frameSize)
                );
            }

            // Find the default frame constructors
            let func = this.DEFAULT_FRAME_CREATORS.get(header.frameId);
            func ??= header.frameId.isTextFrame ? TextInformationFrame.fromOffsetRawData : undefined;
            func ??= header.frameId.isUrlFrame ? UrlLinkFrame.fromOffsetRawData : undefined;
            func ??= UnknownFrame.fromOffsetRawData;

            const frame = func(data, position, header, version);
            return { frame: frame, offset: frameEndIndex };

        } catch (e: unknown) {
            if (e instanceof CorruptFileError || e instanceof NotImplementedError) {
                throw e;
            }

            // Other exceptions will just mean we ignore the frame
            return { frame: undefined, offset: frameEndIndex };
        }
    }

    private static assertSupportedFlags(headerFlags: Id3v2FrameFlags): void {
        // TODO: Support compression
        if (NumberUtils.hasFlag(headerFlags, Id3v2FrameFlags.Compression)) {
            throw new NotImplementedError("Compression is not supported");
        }

        // TODO: Support encryption
        if (NumberUtils.hasFlag(headerFlags, Id3v2FrameFlags.Encryption)) {
            throw new NotImplementedError("Encryption is not supported");
        }

        // @TODO: Consider reading these frames as unknown.
    }

    private static createFrameFromBodyBytes(
        header: Id3v2FrameHeader,
        bodyBytes: ByteVector,
        version: number,
        unsynchedAtTagLevel: boolean
    ): Frame {
        // Make sure we got the same number of bytes as the frame says
        if (bodyBytes.length < header.frameSize) {
            throw new CorruptFileError(
                `ID3v2 frame header specified body is ${header.frameSize} bytes, ` +
                `but only ${bodyBytes.length} remain in data.`
            );
        }

        // Mark the frame as unsynchronized if the entire tag is already unsynchronized
        // @TODO: Is this how the spec is written? Or was this to correct for invalid flags?
        if (unsynchedAtTagLevel) {
            header.flags &= ~Id3v2FrameFlags.Unsynchronized;
        }

        // 1) Unsynchronize if necessary
        if (header.isUnsynchronizationApplied) {
            bodyBytes = SyncData.resyncByteVector(bodyBytes);
        }

        // 2) Read extended header fields if they exist
        const extendedHeaderSize = header.getExtendedSize(version);
        if (extendedHeaderSize > 0) {
            header.readExtendedHeader(bodyBytes.subarray(0, extendedHeaderSize), version);
            bodyBytes = bodyBytes.subarray(extendedHeaderSize);
        }

        // 3) Construct the frame
        // 3.1) Try with a custom constructor @TODO:

        // 3.2) No matching custom constructors found, use built-in/default constructor
        let func = this.DEFAULT_FRAME_CREATORS.get(header.frameId);
        func ??= header.frameId.isTextFrame ? TextInformationFrame.fromOffsetRawData : undefined;
        func ??= header.frameId.isUrlFrame ? UrlLinkFrame.fromOffsetRawData : undefined;
        func ??= UnknownFrame.fromOffsetRawData;

        let frame;
        try {
            frame = func(bodyBytes, 0, header, version);
        } catch {
            frame = UnknownFrame.fromOffsetRawData(bodyBytes, 0, header, version);
        }

        return frame;
    }
}
