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
            ByteVector.fromUInt(1234, false), // Samples per second
            ByteVector.fromUInt(2345, false), // Average bytes per second
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
            ByteVector.fromUInt(1234, false), // Microseconds per frame
            ByteVector.fromUInt(2345, false), // Max bytes per second
            ByteVector.fromUInt(3456, false), // Padding granularity
            ByteVector.fromUInt(4567, false), // Flags
            ByteVector.fromUInt(5678, false), // Total frames
            ByteVector.fromUInt(6789, false), // Initial frames
            ByteVector.fromUInt(7890, false), // Streams
            ByteVector.fromUInt(8901, false), // Suggested buffer size
            ByteVector.fromUInt(9012, false), // Width
            ByteVector.fromUInt(123, false), // Height
            ByteVector.fromSize(16), // Reserved
        );
    },
    getAviStreamHeaderData(type: AviStreamType) {
        return ByteVector.concatenate(
            ByteVector.fromUInt(type, false), // type
            ByteVector.fromUInt(0x23456789, false), // handler
            ByteVector.fromUInt(0x34567890, false), // Flags
            ByteVector.fromUShort(0x1234, false),   // Priority
            ByteVector.fromUShort(0x2345, false),   // Language
            ByteVector.fromUInt(0x45678901, false), // Initial Frames
            ByteVector.fromUInt(0x56789012, false), // Scale
            ByteVector.fromUInt(0x67890123, false), // Rate
            ByteVector.fromUInt(0x78901234, false), // Start
            ByteVector.fromUInt(0x89012345, false), // Length
            ByteVector.fromUInt(0x90123456, false), // Suggested Buffer Size
            ByteVector.fromUInt(0x01234567, false), // Quality
            ByteVector.fromUInt(0x11234567, false), // Sample size
            ByteVector.fromUShort(0x3456, false),   // left
            ByteVector.fromUShort(0x4567, false),   // top
            ByteVector.fromUShort(0x5678, false),   // right
            ByteVector.fromUShort(0x6789, false),   // bottom
        );
    },
    getDataBlock() {
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
    getMoviBlock(): ByteVector {
        const chunk = RiffChunk.fromData("movi", ByteVector.fromSize(10));
        return chunk.render();
    },
    getVideoFormatBlock(fourcc: number): ByteVector {
        return ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            ByteVector.fromUInt(40, false), // Size of the struct
            ByteVector.fromUInt(123, false), // Width of image
            ByteVector.fromUInt(234, false), // Height of image
            ByteVector.fromUShort(345, false), // Number of planes
            ByteVector.fromUShort(456, false), // Average bits per pixel
            ByteVector.fromUInt(fourcc, false), // FOURCC
            ByteVector.fromUInt(567, false), // Size of the image
            ByteVector.fromUInt(678, false), // Pixels per meter X
            ByteVector.fromUInt(789, false), // Pixels per meter Y
            ByteVector.fromUInt(890, false), // Colors used
            ByteVector.fromUInt(1234, false), // Important colors
        );
    },
    getWaveFormatBlock(): ByteVector {
        const headerChunk = RiffChunk.fromData("fmt ", this.getAudioFormatBlock(0xF1AC));
        return headerChunk.render();
    }
};
