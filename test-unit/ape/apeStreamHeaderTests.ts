import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import {ApeCompressionLevel, ApeStreamHeader} from "../../src/ape/apeStreamHeader";
import {ByteVector, StringType} from "../../src/byteVector";
import {MediaTypes} from "../../src/iCodec";
import {Testers} from "../utilities/testers";

@suite class Ape_StreamHeaderTests {
    @test
    public constructor_invalidData() {
        // Arrange
        const data = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => new ApeStreamHeader(v, 123));
        Testers.testUint((v: number) => new ApeStreamHeader(data, v));
    }

    @test
    public constructor_wrongIdentifier() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("ID3", StringType.Latin1),
            ByteVector.fromSize(73)
        );

        // Act / Assert
        assert.throw(() => new ApeStreamHeader(data, 123));
    }

    @test
    public constructor_tooShort() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("MAC ", StringType.Latin1),
            ByteVector.fromSize(10)
        );

        // Act / Assert
        assert.throw(() => new ApeStreamHeader(data, 123));
    }

    @test
    public constructor_validData() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("MAC ", StringType.Latin1),
            ByteVector.fromUshort(9123, false), // Version
            ByteVector.fromSize(46),
            ByteVector.fromUshort(ApeCompressionLevel.Insane, false), // Compression level (duh)
            ByteVector.fromSize(2),
            ByteVector.fromUint(234, false), // Blocks per frame
            ByteVector.fromUint(345, false), // Final frame blocks
            ByteVector.fromUint(456, false), // Total frames
            ByteVector.fromUshort(567, false), // Bits per sample
            ByteVector.fromUshort(3, false), // Channels
            ByteVector.fromUint(678, false), // Sample rate
        );

        // Act
        const header = new ApeStreamHeader(data, 123);

        // Assert
        assert.approximately(header.audioBitrate, 0.006245864, 0.000000001);
        assert.strictEqual(header.audioChannels, 3);
        assert.strictEqual(header.audioSampleRate, 678);
        assert.strictEqual(header.bitsPerSample, 567);
        assert.strictEqual(header.compressionLevel, ApeCompressionLevel.Insane);
        assert.strictEqual(header.description, "Monkey's Audio APE Version 9.123");
        assert.approximately(header.durationMilliseconds, 157544, 1);
        assert.strictEqual(header.mediaTypes, MediaTypes.Audio);
        assert.strictEqual(header.version, 9.123);
    }

    @test
    public constructor_zeroDuration() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("MAC ", StringType.Latin1),
            ByteVector.fromUshort(9123, false), // Version
            ByteVector.fromSize(46),
            ByteVector.fromUshort(ApeCompressionLevel.Insane, false), // Compression level (duh)
            ByteVector.fromSize(2),
            ByteVector.fromUint(0, false), // Blocks per frame
            ByteVector.fromUint(0, false), // Final frame blocks
            ByteVector.fromUint(1, false), // Total frames
            ByteVector.fromUshort(567, false), // Bits per sample
            ByteVector.fromUshort(3, false), // Channels
            ByteVector.fromUint(678, false), // Sample rate
        );

        // Act
        const header = new ApeStreamHeader(data, 123);

        // Assert
        assert.strictEqual(header.audioBitrate, 0);
        assert.strictEqual(header.audioChannels, 3);
        assert.strictEqual(header.audioSampleRate, 678);
        assert.strictEqual(header.bitsPerSample, 567);
        assert.strictEqual(header.compressionLevel, ApeCompressionLevel.Insane);
        assert.strictEqual(header.description, "Monkey's Audio APE Version 9.123");
        assert.strictEqual(header.durationMilliseconds, 0);
        assert.strictEqual(header.mediaTypes, MediaTypes.Audio);
        assert.strictEqual(header.version, 9.123);
    }
}
