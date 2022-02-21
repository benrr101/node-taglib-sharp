import {ByteVector} from "../../src/byteVector";

export default class CodecPackets {
    public static getTestOpusPacket(): ByteVector {
        return ByteVector.concatenate(
            ByteVector.fromString("OpusHead"),
            0x01, 0x08, 0x03, 0x04,
            0x05, 0x06, 0x07, 0x08,
            0x09, 0x0A, 0x01, 0x05, 0x03
        );
    }

    public static getTestTheoraPacket(): ByteVector {
        return ByteVector.concatenate(
            0x80, ByteVector.fromString("theora"),
            0x01, 0x02, 0x03, // version
            ByteVector.fromUint(0), // Size in macro blocks
            0xF0, 0x12, 0x34, // Width in pixels
            0xF0, 0x45, 0x67, // Height in pixels
            0x01, 0x02, // Picture offset in pixels
            ByteVector.fromUint(1234), // Frame rate numerator
            ByteVector.fromUint(2345), // Frame rate denominator
            ByteVector.fromSize(10, 0xFF), // Stuff we don't care about
            0xFC, 0x56, 0xEF // "last bits" including keyframe granule shift
        );
    }

    public static getTestVorbisPacket(): ByteVector {
        return ByteVector.concatenate(
            0x01, ByteVector.fromString("vorbis"),
            ByteVector.fromUint(1234, false), // Version
            0x05, // Channels
            ByteVector.fromUint(456789, false), // Sample rate
            ByteVector.fromUint(200000, false), // bitrate max
            ByteVector.fromUint(128000, false), // bitrate nominal
            ByteVector.fromUint(100000, false), // bitrate min
            // We don't care about anything after this
        );
    }
}
