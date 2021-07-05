import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import {ApeCompressionLevel, ApeStreamHeader} from "../../src/ape/apeStreamHeader";
import {ByteVector} from "../../src/byteVector";
import {MediaTypes} from "../../src/iCodec";
import {Testers} from "../utilities/testers";

// Setup chai
const assert = Chai.assert;

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
            ByteVector.fromString("ID3"),
            ByteVector.fromSize(73)
        );

        // Act / Assert
        assert.throw(() => new ApeStreamHeader(data, 123));
    }

    @test
    public constructor_tooShort() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("MAC "),
            ByteVector.fromSize(10)
        );

        // Act / Assert
        assert.throw(() => new ApeStreamHeader(data, 123));
    }

    @test
    public constructor_validData() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("MAC "),
            ByteVector.fromUShort(9123, false), // Version
            ByteVector.fromSize(46),
            ByteVector.fromUShort(ApeCompressionLevel.Insane, false), // Compression level (duh)
            ByteVector.fromSize(2),
            ByteVector.fromUInt(234, false), // Blocks per frame
            ByteVector.fromUInt(345, false), // Final frame blocks
            ByteVector.fromUInt(456, false), // Total frames
            ByteVector.fromUShort(567, false), // Bits per sample
            ByteVector.fromUShort(3, false), // Channels
            ByteVector.fromUInt(678, false), // Sample rate
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
            ByteVector.fromString("MAC "),
            ByteVector.fromUShort(9123, false), // Version
            ByteVector.fromSize(46),
            ByteVector.fromUShort(ApeCompressionLevel.Insane, false), // Compression level (duh)
            ByteVector.fromSize(2),
            ByteVector.fromUInt(0, false), // Blocks per frame
            ByteVector.fromUInt(0, false), // Final frame blocks
            ByteVector.fromUInt(1, false), // Total frames
            ByteVector.fromUShort(567, false), // Bits per sample
            ByteVector.fromUShort(3, false), // Channels
            ByteVector.fromUInt(678, false), // Sample rate
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
