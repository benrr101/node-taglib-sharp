import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FlacStreamHeader from "../../src/flac/flacStreamHeader";
import {ByteVector} from "../../src/byteVector";
import {MediaTypes} from "../../src/iCodec";
import {Testers} from "../utilities/testers";

@suite class Flac_StreamHeaderTests {
    @test
    public constructor_invalidParams() {
        // Arrange
        const data = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => new FlacStreamHeader(v, 0));
        Testers.testSafeUint((v) => new FlacStreamHeader(data, v));
    }

    @test
    public constructor_tooShort() {
        // Arrange
        const data = ByteVector.fromSize(10);

        // Act / Assert
        assert.throws(() => new FlacStreamHeader(data, 0));
    }

    @test
    public constructor_invalidSampleRate() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUInt(0x12345678),
            ByteVector.fromUInt(0x23456789),
            ByteVector.fromUInt(0x34560000),
            ByteVector.fromUInt(0x05678901),
            ByteVector.fromUInt(0x56789012)
        );

        // Act / Assert
        assert.throws(() => new FlacStreamHeader(data, 123));
    }

    @test
    public constructor_nonZeroSamples() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUInt(0x12345678),
            ByteVector.fromUInt(0x23456789),
            ByteVector.fromUInt(0x34567890),
            ByteVector.fromUInt(0x45678901),
            ByteVector.fromUInt(0x56789012)
        );

        // Act
        const header = new FlacStreamHeader(data, 123456789);

        // Assert
        assert.approximately(header.audioBitrate, 15.07, 0.01);
        assert.strictEqual(header.audioChannels, 3);
        assert.strictEqual(header.audioSampleRate, 493828);
        assert.strictEqual(header.bitsPerSample, 23);
        assert.strictEqual(header.description, "FLAC Audio");
        assert.approximately(header.durationMilliseconds, 65535646, 1);
        assert.strictEqual(header.mediaTypes, MediaTypes.LosslessAudio);
    }

    @test
    public constructor_zeroSamples() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUInt(0x12345678),
            ByteVector.fromUInt(0x23456789),
            ByteVector.fromUInt(0x34567890),
            ByteVector.fromUInt(0x45600000),
            ByteVector.fromUInt(0x00009012)
        );

        // Act
        const header = new FlacStreamHeader(data, 123456789);

        // Assert
        assert.strictEqual(header.audioBitrate, 0);
        assert.strictEqual(header.audioChannels, 3);
        assert.strictEqual(header.audioSampleRate, 493828);
        assert.strictEqual(header.bitsPerSample, 23);
        assert.strictEqual(header.description, "FLAC Audio");
        assert.strictEqual(header.durationMilliseconds, 0);
        assert.strictEqual(header.mediaTypes, MediaTypes.LosslessAudio);
    }
}
