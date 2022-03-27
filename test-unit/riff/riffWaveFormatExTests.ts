import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import RiffWaveFormatEx from "../../src/riff/riffWaveFormatEx";
import {default as Resources} from "./resources";
import {ByteVector} from "../../src/byteVector";
import {MediaTypes} from "../../src/properties";
import {Testers} from "../utilities/testers";

@suite class Riff_WaveFormatExTests {
    @test
    public constructor_invalidParams() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => new RiffWaveFormatEx(v));
    }

    @test
    public constructor_dataTooShort() {
        // Arrange
        const data = ByteVector.fromSize(10);

        // Act / Assert
        assert.throws(() => new RiffWaveFormatEx(data));
    }

    @test
    public constructor_knownAudioFormat() {
        // Arrange
        const data = Resources.getAudioFormatBlock(0xF1AC);

        // Act
        const object = new RiffWaveFormatEx(data);

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
        const data = Resources.getAudioFormatBlock(0xBBBB);

        // Act
        const object = new RiffWaveFormatEx(data);

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
