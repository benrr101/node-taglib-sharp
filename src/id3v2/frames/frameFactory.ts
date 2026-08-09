import AttachmentFrame from "./attachmentFrame";
import CommentsFrame from "./commentsFrame";
import Frame from "./frame";
import FrameHeader from "./frameHeader";
import GenreFrame from "./genreFrame";
import MusicCdIdentifierFrame from "./musicCdIdentifierFrame";
import PlayCountFrame from "./playCountFrame";
import PopularimeterFrame from "./popularimeterFrame";
import PrivateFrame from "./privateFrame";
import SyncData from "../syncData";
import TermsOfUseFrame from "./termsOfUseFrame";
import TextInformationFrame from "./textInformationFrame";
import UniqueFileIdentifierFrame from "./uniqueFileIdentifierFrame";
import UnknownFrame from "./unknownFrame";
import UnsynchronizedLyricsFrame from "./unsynchronizedLyricsFrame";
import UrlLinkFrame from "./urlLinkFrame";
import UserTextInformationFrame from "./userTextInformationFrame";
import UserUrlLinkFrame from "./userUrlLinkFrame";
import {ByteVector} from "../../byteVector";
import {CorruptFileError, NotImplementedError} from "../../errors";
import {EventTimeCodeFrame} from "./eventTimeCodeFrame";
import {File} from "../../file";
import {FrameFlags, Id3v2Version} from "../enums";
import {FrameIdentifier, FrameIdentifiers} from "../frameIdentifiers";
import {RelativeVolumeFrame} from "./relativeVolumeFrame";
import {SynchronizedLyricsFrame} from "./synchronizedLyricsFrame";
import {Guards, NumberUtils} from "../../utils";

/**
 * Type shortcut for a method that returns a {@link Frame}.
 * @param data Byte vector that contains field bytes of the frame.
 * @param offset Position into the byte vector where the frame begins. @TODO: This will always be zero.
 * @param header The header that describes the frame.
 * @param version ID3v2 version the frame is encoded with. Must be unsigned 8-bit int
 */
export type FrameCreator = (data: ByteVector, offset: number, header: FrameHeader, version: Id3v2Version) => Frame;

type InternalFrameCreator = (header: FrameHeader, fieldBytes: ByteVector, version: Id3v2Version) => Frame;

/**
 * Performs the necessary operations to determine and create the correct child classes of
 * {@link Frame} for a given raw ID3v2 frame.
 * By default, this will only load frames contained in the library. To add additional frames to the
 * process, register a frame creator with {@link addFrameCreator}.
 */
export class Id3v2FrameFactory {

    private static readonly CUSTOM_FRAME_CREATORS: FrameCreator[] = [];

    private static readonly DEFAULT_FRAME_CREATORS: Readonly<Map<FrameIdentifier, InternalFrameCreator>> =
        new Map<FrameIdentifier, InternalFrameCreator>([
            [FrameIdentifiers.APIC, AttachmentFrame.fromFieldBytes],
            [FrameIdentifiers.COMM, CommentsFrame.fromFieldBytes],
            [FrameIdentifiers.ETCO, EventTimeCodeFrame.fromFieldBytes],
            [FrameIdentifiers.GEOB, AttachmentFrame.fromFieldBytes],
            [FrameIdentifiers.MCDI, MusicCdIdentifierFrame.fromFieldBytes],
            [FrameIdentifiers.PCNT, PlayCountFrame.fromFieldBytes],
            [FrameIdentifiers.POPM, PopularimeterFrame.fromFieldBytes],
            [FrameIdentifiers.PRIV, PrivateFrame.fromFieldBytes],
            [FrameIdentifiers.RVA2, RelativeVolumeFrame.fromFieldBytes],
            [FrameIdentifiers.SYLT, SynchronizedLyricsFrame.fromFieldBytes],
            [FrameIdentifiers.TCON, GenreFrame.fromFieldBytes],
            [FrameIdentifiers.TXXX, UserTextInformationFrame.fromFieldBytes],
            [FrameIdentifiers.UFID, UniqueFileIdentifierFrame.fromFieldBytes],
            [FrameIdentifiers.USER, TermsOfUseFrame.fromFieldBytes],
            [FrameIdentifiers.USLT, UnsynchronizedLyricsFrame.fromFieldBytes],
            [FrameIdentifiers.WXXX, UserUrlLinkFrame.fromFieldBytes],
        ]);


    /**
     * Adds a custom frame creator to try before using standard frame creation methods.
     * Frame creators are used before standard methods so custom checking can be used and new
     * formats can be added. They are executed in reverse order in which they are added.
     * @param creator Frame creator function
     *     * data: ByteVector Raw ID3v2 frame
     *     * offset: number Offset in data at which the frame data begins (should be int)
     *     * header: FrameHeader Header for the frame contained in data
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
     * @param version ID3v2 version the frame is encoded with
     * @param unsyncedAtTagLevel Whether the entire tag has already been unsynchronized
     * @returns Frame|undefined
     *     Frame read from the file is returned if it was read, `undefined` is returned if no frame
     *     could be found at the given position.
     */
    public static createFrameFromFile(
        file: File,
        offset: number,
        version: Id3v2Version,
        unsyncedAtTagLevel: boolean
    ): {frame: Frame, totalSize: number}|undefined {
        Guards.truthy(file, "file");
        Guards.safeUint(offset, "offset");
        Guards.byte(version, "version");

        // 1) Make sure we're in the right position for the start of the frame
        file.seek(offset);

        // 2) Read basic frame header
        const headerSize = FrameHeader.getBaseSize(version);
        const headerBytes = file.readBlock(headerSize);
        if (headerBytes.length < headerSize) {
            throw new Error("Argument error: data does not contain enough bytes for an ID3v2 frame header");
        }

        // If the header bytes start with 0, we assume we've reached the padding portion of the tag.
        if (headerBytes.get(0) === 0) {
            return undefined;
        }

        const header = FrameHeader.fromData(headerBytes, version);
        this.assertSupportedFlags(header.flags);

        // @TODO: Support lazy loading frames again
        // 3) Read the body bytes and finish constructing the frame
        const fieldBytes = file.readBlock(header.frameSize);
        const frame = this.createFrameFromFieldBytes(header, fieldBytes, version, unsyncedAtTagLevel);

        return { frame: frame, totalSize: header.frameSize + headerSize };
    }

    /**
     * Creates a {@link Frame} object by reading it from raw frame data.
     * @param data Block of data containing at least one frame.
     * @param offset Index into the data block where the frame header begins.
     * @param version ID3v2 version the frame is encoded with
     * @param unsyncedAtTagLevel Whether the entire tag has already been unsynchronized
     * @returns Frame|undefined
     *     Frame read from the file is returned if it was read, `undefined` is returned if no frame
     *     could be found at the given position.
     */
    public static createFrameFromTagBytes(
        data: ByteVector,
        offset: number,
        version: Id3v2Version,
        unsyncedAtTagLevel: boolean
    ): {frame: Frame, totalSize: number}|undefined {
        Guards.truthy(data, "data");
        Guards.safeUint(offset, "offset");
        Guards.byte(version, "version");

        // 1) Read the basic frame header
        const headerSize = FrameHeader.getBaseSize(version);
        const headerBytes = data.subarray(offset, headerSize);
        if (headerBytes.length < headerSize) {
            throw new Error("Argument error: data does not contain enough bytes for an ID3v2 frame header");
        }

        // If the header bytes start with 0, we assume we've reached the padding portion of the tag.
        if (headerBytes.get(0) === 0) {
            return undefined;
        }

        const header = FrameHeader.fromData(headerBytes, version);
        this.assertSupportedFlags(header.flags);

        // 2) Read the body bytes and finish constructing frame
        const fieldBytes = data.subarray(offset + headerSize, header.frameSize);
        const frame = this.createFrameFromFieldBytes(header, fieldBytes, version, unsyncedAtTagLevel);

        return { frame: frame, totalSize: header.frameSize + headerSize };
    }

    private static assertSupportedFlags(headerFlags: FrameFlags): void {
        // TODO: Support compression
        if (NumberUtils.hasFlag(headerFlags, FrameFlags.Compression)) {
            throw new NotImplementedError("Compression is not supported");
        }

        // TODO: Support encryption
        if (NumberUtils.hasFlag(headerFlags, FrameFlags.Encryption)) {
            throw new NotImplementedError("Encryption is not supported");
        }

        // @TODO: Consider reading these frames as unknown.
    }

    private static createFrameFromFieldBytes(
        header: FrameHeader,
        payloadBytes: ByteVector,
        version: Id3v2Version,
        unsynchedAtTagLevel: boolean
    ): Frame {
        // Make sure we got the same number of bytes as the frame says
        if (payloadBytes.length < header.frameSize) {
            throw new CorruptFileError(
                `ID3v2 frame header specified body is ${header.frameSize} bytes, ` +
                `but only ${payloadBytes.length} remain.`
            );
        }

        // Mark the frame as unsynchronized if the entire tag is already unsynchronized
        // @TODO: Is this how the spec is written? Or was this to correct for invalid flags?
        if (unsynchedAtTagLevel) {
            header.flags &= ~FrameFlags.Unsynchronized;
        }

        // 1) Unsynchronize if necessary
        if (header.isUnsynchronizationApplied) {
            payloadBytes = SyncData.resyncByteVector(payloadBytes);
        }

        // 2) Read extended header fields if they exist
        const extendedHeaderSize = header.readExtendedHeaderFromPayloadBytes(payloadBytes, version);
        const fieldBytes = payloadBytes.subarray(extendedHeaderSize);

        // 3) Construct the frame
        // 3.1) Try with a custom constructor
        for (const customFunc of this.CUSTOM_FRAME_CREATORS) {
            try {
                const frame = customFunc(fieldBytes, 0, header, version);
                if (frame) {
                    return frame;
                }
            }
            catch {
                // Swallow and continue
            }
        }

        // 3.2) No matching custom constructors found, use built-in/default constructor
        let func = this.DEFAULT_FRAME_CREATORS.get(header.frameId);
        func ??= header.frameId.isTextFrame ? TextInformationFrame.fromFieldBytes : undefined;
        func ??= header.frameId.isUrlFrame ? UrlLinkFrame.fromFieldBytes : undefined;
        func ??= UnknownFrame.fromFieldBytes;

        let frame;
        try {
            frame = func(header, fieldBytes, version);
        } catch {
            frame = UnknownFrame.fromFieldBytes(header, fieldBytes, version);
        }

        return frame;
    }
}
