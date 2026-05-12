import AttachmentFrame from "./attachmentFrame";
import CommentsFrame from "./commentsFrame";
import GenreFrame from "./genreFrame";
import MusicCdIdentifierFrame from "./musicCdIdentifierFrame";
import PlayCountFrame from "./playCountFrame";
import PopularimeterFrame from "./popularimeterFrame";
import PrivateFrame from "./privateFrame";
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


    private static readonly CUSTOM_FRAME_CREATORS: FrameCreator[] = [];

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
        const frameHeaderSize = Id3v2FrameHeader.getSize(version);

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
}
