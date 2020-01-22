import FrameTypes from "../frameTypes";
import {ByteVector} from "../../byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "./frameHeader";
import {File} from "../../file";
import {Guards} from "../../utils";
import AttachmentFrame from "./attachmentFrame";
import {TextInformationFrame, UserTextInformationFrame} from "./textInformationFrame";
import {Frame} from "./frame";
import UniqueFileIdentifierFrame from "./uniqueFileIdentifierFrame";
import MusicCdIdentifierFrame from "./musicCdIdentifierFrame";
import UnsynchronizedLyricsFrame from "./unsynchronizedLyricsFrame";
import {SynchronizedLyricsFrame} from "./synchronizedLyricsFrame";
import CommentsFrame from "./commentsFrame";
import {RelativeVolumeFrame} from "./relativeVolumeFrame";
import PlayCountFrame from "./playCountFrame";
import PopularimeterFrame from "./popularimeterFrame";
import UnknownFrame from "./unknownFrame";
import TermsOfUseFrame from "./termsOfUseFrame";
import PrivateFrame from "./privateFrame";
import {EventTimeCodeFrame} from "./eventTimeCodeFrame";
import {UrlLinkFrame, UserUrlLinkFrame} from "./urlLinkFrame";
import {NotImplementedError} from "../../errors";

const customFrameCreators: Array<(data: ByteVector, offset: number, header: Id3v2FrameHeader, version: number) => Frame>
    = [];

/**
 * Performs the necessary operations to determine and create the correct child classes of
 * {@see Frame} for a given raw ID3v2 frame.
 * By default, this will only load frames contained in the library. To add additional frames to the
 * process, register a frame creator with addFrameCreator.
 */
export default {
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
    addFrameCreator: (creator: (data: ByteVector, offset: number, header: Id3v2FrameHeader, vrsion: number) => Frame):
        void => {
        Guards.truthy(creator, "creator");
        customFrameCreators.unshift(creator);
    },

    /**
     * Creates a {@see Frame} object by reading it from raw ID3v2 frame data.
     * @param data Raw ID3v2 frame
     * @param file File to read the frame from if {@paramref data} is falsy
     * @param offset Index into {@paramref file} or in {@paramref data} if truthy, at which the
     *     frame begins. After reading, the offset where the next frame can be read is returned in
     *     the `offset` property of the returned object
     * @param version ID3v2 version the frame is encoded with. Must be unsigned 8-bit int
     * @param alreadyUnsynced Whether or not the entire tag has already been unsynchronized
     * @returns any Undefined is returned if there are no more frames to read.
     *     Object is returned if a frame was found. Object has the following properties:
     *     * frame: {@see Frame} that was read
     *     * offset: updated offset where the next frame starts
     */
    createFrame: (data: ByteVector, file: File, offset: number, version: number, alreadyUnsynced: boolean):
        {frame: Frame, offset: number} => {
        Guards.byte(version, "version");

        let position = 0;
        const frameHeaderSize = Id3v2FrameHeader.getSize(version);

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

        const header = new Id3v2FrameHeader(data.mid(position, frameHeaderSize), version);
        const filePosition = offset + frameHeaderSize;
        offset += header.frameSize + frameHeaderSize;

        // Filter out illegal frames
        if (!header.frameId) {
            throw new Error("No frame ID found, frame is invalid");
        }
        for (const b of header.frameId) {
            // (b<A || b>Z) && (b<0 || b>9)
            if ((b < 65 || b > 90) && (b < 48 || b > 57)) {
                return undefined;
            }
        }

        // Mark the frame as unsynchronized if the entire tag is already unsynchronized
        // @TODO Standardize on "Desynchronized"
        if (alreadyUnsynced) {
            header.flags &= ~Id3v2FrameFlags.Desynchronized;
        }

        // TODO: Support compression
        if ((header.flags & Id3v2FrameFlags.Compression) !== 0) {
            throw new NotImplementedError("Compression is not supported");
        }

        // TODO: Support encryption
        if ((header.flags & Id3v2FrameFlags.Encryption) > 0) {
            throw new NotImplementedError("Encryption is not supported");
        }

        // Try to find a custom creator
        for (const creator of customFrameCreators) {
            const frame = creator(data, position, header, version);
            if (frame) {
                return {
                    frame: frame,
                    offset: offset
                };
            }
        }

        // This is where things get necessarily nasty. Here we determine which frame subclass (or
        // if none is found, simply a frame) based on the frame ID. Since there are a lot of
        // possibilities, that means a lot of if statements.

        // Lazy object loading handling
        if (file) {
            // Attached picture (frames 4.14)
            // General encapsulated object (frames 4.15)
            if (
                ByteVector.equal(header.frameId, FrameTypes.APIC) ||
                ByteVector.equal(header.frameId, FrameTypes.GEOB)
            ) {
                return {
                    frame: AttachmentFrame.fromFile(
                        file.fileAbstraction,
                        filePosition,
                        offset - filePosition,
                        header
                    ),
                    offset: offset
                };
            }

            // Read remaining part of the frame for the non lazy Frame
            file.seek(filePosition);
            data.addByteVector(file.readBlock(offset - filePosition));
        }

        let func: any = UnknownFrame.fromOffsetRawData;
        if (ByteVector.equal(header.frameId, FrameTypes.TXXX)) {
            // User text identification frame
            func = UserTextInformationFrame.fromOffsetRawData;
        } else if (header.frameId.get(0) === 84) {
            // Text identifiacation frame (frames 4.2) Starts with T
            func = TextInformationFrame.fromOffsetRawData;
        } else if (ByteVector.equal(header.frameId, FrameTypes.UFID)) {
            // Unique file identifier (frames 4.1)
            func = UniqueFileIdentifierFrame.fromOffsetRawData;
        } else if (ByteVector.equal(header.frameId, FrameTypes.MCDI)) {
            // Music CD identifier (frames 4.5)
            func = MusicCdIdentifierFrame.fromOffsetRawData;
        } else if (ByteVector.equal(header.frameId, FrameTypes.USLT)) {
            // Unsynchronized lyrics (frames 4.8)
            func = UnsynchronizedLyricsFrame.fromOffsetRawData;
        } else if (ByteVector.equal(header.frameId, FrameTypes.SYLT)) {
            // Synchronized lyrics (frames 4.8)
            func = SynchronizedLyricsFrame.fromOffsetRawData;
        } else if (ByteVector.equal(header.frameId, FrameTypes.COMM)) {
            // Comments (frames 4.10)
            func = CommentsFrame.fromOffsetRawData;
        } else if (ByteVector.equal(header.frameId, FrameTypes.RVA2)) {
            // Relative volume adjustment (frames 4.11)
            func = RelativeVolumeFrame.fromOffsetRawData;
        } else if (
            ByteVector.equal(header.frameId, FrameTypes.APIC) ||
            ByteVector.equal(header.frameId, FrameTypes.GEOB)
        ) {
            // Attached picture (frames 4.14)
            func = AttachmentFrame.fromOffsetRawData;
        } else if (ByteVector.equal(header.frameId, FrameTypes.PCNT)) {
            // Play count (frames 4.16)
            func = PlayCountFrame.fromOffsetRawData;
        } else if (ByteVector.equal(header.frameId, FrameTypes.POPM)) {
            // Popularimeter (frames 4.17)
            func = PopularimeterFrame.fromOffsetRawData;
        } else if (ByteVector.equal(header.frameId, FrameTypes.USER)) {
            // Terms of Use (frames 4.22)
            func = TermsOfUseFrame.fromOffsetRawData;
        } else if (ByteVector.equal(header.frameId, FrameTypes.PRIV)) {
            // Private (frames 4.27)
            func = PrivateFrame.fromOffsetRawData;
        } else if (ByteVector.equal(header.frameId, FrameTypes.WXXX)) {
            // User URL link
            func = UserUrlLinkFrame.fromOffsetRawData;
        } else if (header.frameId.get(0) === 87) {
            // URL link (frame 4.3.1) starts with 'W'
            func = UrlLinkFrame.fromOffsetRawData;
        } else if (ByteVector.equal(header.frameId, FrameTypes.ETCO)) {
            // Event timing codes (frames 4.6)
            func = EventTimeCodeFrame.fromOffsetRawData;
        }

        return {
            frame: func(data, position, header, version),
            offset: offset
        };
    }


};
