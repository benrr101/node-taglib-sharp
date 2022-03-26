import {assert} from "chai";
import {suite, test} from "@testdeck/mocha";
import {Testers} from "../utilities/testers";

import AiffStreamHeader from "../../src/aiff/aiffStreamHeader";
import {ByteVector, StringType} from "../../src/byteVector";
import {MediaTypes} from "../../src/properties";

@suite class Aiff_StreamHeaderTests {
    @test
    public constructor_invalidData() {
        // Arrange
        const testFunc = (a: ByteVector, b: number) => new AiffStreamHeader(a, b);

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => testFunc(v, 0));
        Testers.testUint((v: number) => testFunc(ByteVector.empty(), v));
    }

    @test
    public constructor_dataDoesNotStartWithIdentifier() {
        // Act / Assert
        assert.throws(() => new AiffStreamHeader(ByteVector.fromSize(10), 0));
    }

    @test
    public constructor_validData() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("COMM", StringType.Latin1), // Chunk identifier
            ByteVector.fromUint(18), // Chunk size
            ByteVector.fromUshort(1234), // Channels
            ByteVector.fromUint(2345), // Total frames
            ByteVector.fromUshort(3456), // Bits per sample
            // Sample rate (2345678)
            ByteVector.fromByteArray(new Uint8Array([0x40, 0x14, 0x8F, 0x2B, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00]))
        );

        // Act
        const header = new AiffStreamHeader(data, 1024);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.mediaTypes, MediaTypes.Audio);
        assert.strictEqual(header.audioChannels, 1234);
        assert.strictEqual(header.audioSampleRate, 2345678);
        assert.strictEqual(header.bitsPerSample, 3456);
        assert.strictEqual(header.description, "AIFF Audio");

        assert.approximately(header.durationMilliseconds, 0.9997, 0.0001);
        assert.approximately(header.audioBitrate, 8194, 1);
    }

    @test
    public constructor_zeroSampleRate() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("COMM", StringType.Latin1), // Chunk identifier
            ByteVector.fromUint(18), // Chunk size
            ByteVector.fromUshort(1234), // Channels
            ByteVector.fromUint(2345), // Total frames
            ByteVector.fromUshort(3456), // Bits per sample
            // Sample rate (0)
            ByteVector.fromByteArray(new Uint8Array([0x3C, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]))
        );

        // Act
        const header = new AiffStreamHeader(data, 1024);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.mediaTypes, MediaTypes.Audio);
        assert.strictEqual(header.audioChannels, 1234);
        assert.strictEqual(header.audioSampleRate, 0);
        assert.strictEqual(header.bitsPerSample, 3456);
        assert.strictEqual(header.description, "AIFF Audio");

        assert.strictEqual(header.durationMilliseconds, 0);
        assert.strictEqual(header.audioBitrate, 0);
    }

    @test
    public constructor_zeroTotalFrames() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("COMM", StringType.Latin1), // Chunk identifier
            ByteVector.fromUint(18), // Chunk size
            ByteVector.fromUshort(1234), // Channels
            ByteVector.fromUint(0), // Total frames
            ByteVector.fromUshort(3456), // Bits per sample
            // Sample rate
            ByteVector.fromByteArray(new Uint8Array([0x40, 0x14, 0x8F, 0x2B, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00]))
        );

        // Act
        const header = new AiffStreamHeader(data, 1024);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.mediaTypes, MediaTypes.Audio);
        assert.strictEqual(header.audioChannels, 1234);
        assert.strictEqual(header.audioSampleRate, 2345678);
        assert.strictEqual(header.bitsPerSample, 3456);
        assert.strictEqual(header.description, "AIFF Audio");

        assert.strictEqual(header.durationMilliseconds, 0);
        assert.strictEqual(header.audioBitrate, 0);
    }
}
