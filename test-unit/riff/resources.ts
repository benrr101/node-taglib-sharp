import AviHeader from "../../src/riff/avi/aviHeader";
import RiffList from "../../src/riff/riffList";
import {AviStream, AviStreamType} from "../../src/riff/avi/aviStream";
import {ByteVector} from "../../src/byteVector";
import RiffChunk from "../../src/riff/riffChunk";
import DivxTag from "../../src/riff/divxTag";

export default {
    getAudioFormatBlock(type: number): ByteVector {
        return ByteVector.concatenate(
            ByteVector.fromUShort(type, false), // Format tag
            ByteVector.fromUShort(3, false), // Number of channels
            ByteVector.fromUint(1234, false), // Samples per second
            ByteVector.fromUint(2345, false), // Average bytes per second
            ByteVector.fromUShort(88, false), // Block align
            ByteVector.fromUShort(16, false) // Bits per sample
        );
    },
    getAviHeaderBlock(addStreams: boolean): ByteVector {
        const headerList = RiffList.fromEmpty(AviHeader.headerListType);
        headerList.setValues(AviHeader.headerChunkId, [this.getAviHeader()]);
        if (!addStreams) {
            return headerList.render();
        }

        const streamLists = [];
        const streamTypes = [
            AviStreamType.AUDIO_STREAM,
            AviStreamType.VIDEO_STREAM,
            AviStreamType.MIDI_STREAM,
            AviStreamType.TEXT_STREAM
        ];
        for (const streamType of streamTypes) {
            const streamList = RiffList.fromEmpty(AviStream.listType);
            streamList.setValues(AviStream.headerChunkId, [this.getAviStreamHeaderData(streamType)]);
            switch (streamType) {
                case AviStreamType.AUDIO_STREAM:
                    streamList.setValues(AviStream.formatChunkId, [this.getAudioFormatBlock(0xF1AC)]);
                    break;
                case AviStreamType.VIDEO_STREAM:
                    streamList.setValues(AviStream.formatChunkId, [this.getVideoFormatBlock(0xBBBBBBBB)]);
                    break;
                case AviStreamType.MIDI_STREAM:
                case AviStreamType.TEXT_STREAM:
                    streamList.setValues(AviStream.formatChunkId, [ByteVector.fromSize(10)]);
            }
            streamLists.push(streamList);
        }
        headerList.setLists(AviStream.listType, streamLists);

        return headerList.render();
    },
    getAviHeader(): ByteVector {
        return ByteVector.concatenate(
            ByteVector.fromUint(1234, false), // Microseconds per frame
            ByteVector.fromUint(2345, false), // Max bytes per second
            ByteVector.fromUint(3456, false), // Padding granularity
            ByteVector.fromUint(4567, false), // Flags
            ByteVector.fromUint(5678, false), // Total frames
            ByteVector.fromUint(6789, false), // Initial frames
            ByteVector.fromUint(7890, false), // Streams
            ByteVector.fromUint(8901, false), // Suggested buffer size
            ByteVector.fromUint(9012, false), // Width
            ByteVector.fromUint(123, false), // Height
            ByteVector.fromSize(16), // Reserved
        );
    },
    getAviStreamHeaderData(type: AviStreamType) {
        return ByteVector.concatenate(
            ByteVector.fromUint(type, false), // type
            ByteVector.fromUint(0x23456789, false), // handler
            ByteVector.fromUint(0x34567890, false), // Flags
            ByteVector.fromUShort(0x1234, false),   // Priority
            ByteVector.fromUShort(0x2345, false),   // Language
            ByteVector.fromUint(0x45678901, false), // Initial Frames
            ByteVector.fromUint(0x56789012, false), // Scale
            ByteVector.fromUint(0x67890123, false), // Rate
            ByteVector.fromUint(0x78901234, false), // Start
            ByteVector.fromUint(0x89012345, false), // Length
            ByteVector.fromUint(0x90123456, false), // Suggested Buffer Size
            ByteVector.fromUint(0x01234567, false), // Quality
            ByteVector.fromUint(0x11234567, false), // Sample size
            ByteVector.fromUShort(0x3456, false),   // left
            ByteVector.fromUShort(0x4567, false),   // top
            ByteVector.fromUShort(0x5678, false),   // right
            ByteVector.fromUShort(0x6789, false),   // bottom
        );
    },
    getDataChunk() {
        const chunk = RiffChunk.fromData("data", ByteVector.fromSize(1000));
        return chunk.render();
    },
    getDivxTagData() {
        return ByteVector.concatenate(
            ByteVector.fromString("foo                             "),
            ByteVector.fromString("bar;bux                     "),
            ByteVector.fromString("2021"),
            ByteVector.fromString("baz                                             "),
            ByteVector.fromString("22 "),
            ByteVector.fromSize(6),
            DivxTag.FILE_IDENTIFIER
        );
    },
    getJunkChunk(size: number = 1000) {
        const chunk = RiffChunk.fromData("JUNK", ByteVector.fromSize(size));
        return chunk.render();
    },
    getMoviChunk(): ByteVector {
        const chunk = RiffChunk.fromData("movi", ByteVector.fromSize(10));
        return chunk.render();
    },
    getVideoFormatBlock(fourcc: number): ByteVector {
        return ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            ByteVector.fromUint(40, false), // Size of the struct
            ByteVector.fromUint(123, false), // Width of image
            ByteVector.fromUint(234, false), // Height of image
            ByteVector.fromUShort(345, false), // Number of planes
            ByteVector.fromUShort(456, false), // Average bits per pixel
            ByteVector.fromUint(fourcc, false), // FOURCC
            ByteVector.fromUint(567, false), // Size of the image
            ByteVector.fromUint(678, false), // Pixels per meter X
            ByteVector.fromUint(789, false), // Pixels per meter Y
            ByteVector.fromUint(890, false), // Colors used
            ByteVector.fromUint(1234, false), // Important colors
        );
    },
    getWaveFormatBlock(): ByteVector {
        const headerChunk = RiffChunk.fromData("fmt ", this.getAudioFormatBlock(0xF1AC));
        return headerChunk.render();
    }
};
