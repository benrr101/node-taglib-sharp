import AviHeader from "../../src/riff/avi/aviHeader";
import DivxTag from "../../src/riff/divxTag";
import RiffChunk from "../../src/riff/riffChunk";
import RiffList from "../../src/riff/riffList";
import {AviStream, AviStreamType} from "../../src/riff/avi/aviStream";
import {ByteVector, StringType} from "../../src/byteVector";

export default {
    getAudioFormatBlock(type: number): ByteVector {
        return ByteVector.concatenate(
            ByteVector.fromUshort(type, false), // Format tag
            ByteVector.fromUshort(3, false), // Number of channels
            ByteVector.fromUint(1234, false), // Samples per second
            ByteVector.fromUint(2345, false), // Average bytes per second
            ByteVector.fromUshort(88, false), // Block align
            ByteVector.fromUshort(16, false) // Bits per sample
        );
    },
    getAviHeaderBlock(addStreams: boolean): ByteVector {
        const headerList = RiffList.fromEmpty(AviHeader.HEADER_LIST_TYPE);
        headerList.setValues(AviHeader.HEADER_CHUNK_ID, [this.getAviHeader()]);
        if (!addStreams) {
            return headerList.render();
        }

        const streamLists = [];
        const streamTypes = [
            AviStreamType.AudioStream,
            AviStreamType.VideoStream,
            AviStreamType.MidiStream,
            AviStreamType.TextStream
        ];
        for (const streamType of streamTypes) {
            const streamList = RiffList.fromEmpty(AviStream.LIST_TYPE);
            streamList.setValues(AviStream.HEADER_CHUNK_ID, [this.getAviStreamHeaderData(streamType)]);
            switch (streamType) {
                case AviStreamType.AudioStream:
                    streamList.setValues(AviStream.FORMAT_CHUNK_ID, [this.getAudioFormatBlock(0xF1AC)]);
                    break;
                case AviStreamType.VideoStream:
                    streamList.setValues(AviStream.FORMAT_CHUNK_ID, [this.getVideoFormatBlock(0xBBBBBBBB)]);
                    break;
                case AviStreamType.MidiStream:
                case AviStreamType.TextStream:
                    streamList.setValues(AviStream.FORMAT_CHUNK_ID, [ByteVector.fromSize(10)]);
            }
            streamLists.push(streamList);
        }
        headerList.setLists(AviStream.LIST_TYPE, streamLists);

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
            ByteVector.fromUshort(0x1234, false),   // Priority
            ByteVector.fromUshort(0x2345, false),   // Language
            ByteVector.fromUint(0x45678901, false), // Initial Frames
            ByteVector.fromUint(0x56789012, false), // Scale
            ByteVector.fromUint(0x67890123, false), // Rate
            ByteVector.fromUint(0x78901234, false), // Start
            ByteVector.fromUint(0x89012345, false), // Length
            ByteVector.fromUint(0x90123456, false), // Suggested Buffer Size
            ByteVector.fromUint(0x01234567, false), // Quality
            ByteVector.fromUint(0x11234567, false), // Sample size
            ByteVector.fromUshort(0x3456, false),   // left
            ByteVector.fromUshort(0x4567, false),   // top
            ByteVector.fromUshort(0x5678, false),   // right
            ByteVector.fromUshort(0x6789, false),   // bottom
        );
    },
    getDataChunk() {
        const chunk = RiffChunk.fromData("data", ByteVector.fromSize(1000));
        return chunk.render();
    },
    getDivxTagData() {
        return ByteVector.concatenate(
            ByteVector.fromString("foo                             ", StringType.Latin1),
            ByteVector.fromString("bar;bux                     ", StringType.Latin1),
            ByteVector.fromString("2021", StringType.Latin1),
            ByteVector.fromString("baz                                             ", StringType.Latin1),
            ByteVector.fromString("22 ", StringType.Latin1),
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
            ByteVector.fromUshort(345, false), // Number of planes
            ByteVector.fromUshort(456, false), // Average bits per pixel
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
