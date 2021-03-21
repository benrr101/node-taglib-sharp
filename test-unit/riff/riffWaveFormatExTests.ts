import * as Chai from "chai";
import {suite, test} from "mocha-typescript";
import Testers from "../utilities/testers";
import {ByteVector} from "../../src/byteVector";

import RiffWaveFormatEx from "../../src/riff/riffWaveFormatEx";
import {MediaTypes} from "../../src/iCodec";

// Setup chai
const assert = Chai.assert;

@suite class Riff_WaveFormatExTests {
    @test
    public constructor_invalidParams() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => new RiffWaveFormatEx(v, 0));
        Testers.testUint((v) => new RiffWaveFormatEx(ByteVector.empty(), v));
    }

    @test
    public constructor_dataTooShort() {
        // Arrange
        const data = ByteVector.fromSize(16);

        // Act / Assert
        assert.throws(() => new RiffWaveFormatEx(data, 10));
    }

    @test
    public constructor_knownAudioFormat() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            ByteVector.fromUShort(0xF1AC, false), // Format tag
            ByteVector.fromUShort(3, false), // Number of channels
            ByteVector.fromUInt(1234, false), // Samples per second
            ByteVector.fromUInt(2345, false), // Average bytes per second
            ByteVector.fromUShort(88, false), // Block align
            ByteVector.fromUShort(16, false) // Bits per sample
        );

        // Act
        const object = new RiffWaveFormatEx(data, 10);

        // Assert
        assert.strictEqual(object.audioBitrate, 2345 * 8 / 1000);
        assert.strictEqual(object.audioChannels, 3);
        assert.strictEqual(object.audioSampleRate, 1234);
        assert.strictEqual(object.averageBytesPerSecond, 2345);
        assert.strictEqual(object.bitsPerSample, 16);
        assert.isTrue(object.description.indexOf("FLAC") >= 0);
        assert.isTrue(object.description.indexOf("0xF1AC") >= 0);
        assert.strictEqual(object.durationMilliseconds, 0);
        assert.strictEqual(object.formatTag, 0xF1AC);
        assert.strictEqual(object.mediaTypes, MediaTypes.LosslessAudio);
    }

    @test
    public constructor_unknownAudioFormat() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            ByteVector.fromUShort(0xBBBB, false), // Format tag
            ByteVector.fromUShort(3, false), // Number of channels
            ByteVector.fromUInt(1234, false), // Samples per second
            ByteVector.fromUInt(2345, false), // Average bytes per second
            ByteVector.fromUShort(88, false), // Block align
            ByteVector.fromUShort(16, false) // Bits per sample
        );

        // Act
        const object = new RiffWaveFormatEx(data, 10);

        // Assert
        assert.strictEqual(object.audioBitrate, 2345 * 8 / 1000);
        assert.strictEqual(object.audioChannels, 3);
        assert.strictEqual(object.audioSampleRate, 1234);
        assert.strictEqual(object.averageBytesPerSecond, 2345);
        assert.strictEqual(object.bitsPerSample, 16);
        assert.isTrue(object.description.indexOf( "Unknown") >= 0);
        assert.isTrue(object.description.indexOf("0xBBBB") >= 0);
        assert.strictEqual(object.durationMilliseconds, 0);
        assert.strictEqual(object.formatTag, 0xBBBB);
        assert.strictEqual(object.mediaTypes, MediaTypes.LosslessAudio);
    }
}
