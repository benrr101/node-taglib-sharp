import * as Chai from "chai";
import {suite, test} from "mocha-typescript";
import {AviStream} from "../../src/riff/aviStream";
import {ByteVector} from "../../src/byteVector";
import {Testers} from "../utilities/testers";
import {AviStreamType, RiffBitmapInfoHeader, RiffWaveFormatEx} from "../../src";

// Setup chai
const assert = Chai.assert;

@suite class Riff_AviStreamTest {
    @test
    public parseStreamList_invalidParams() {
        // Act / Assert
        Testers.testTruthy<ByteVector>((v) => AviStream.parseStreamList(v));
    }

    @test
    public parseStreamList_invalidFourCC() {
        // Arrange
        const data = ByteVector.fromString("fooo1234");

        // Act
        const result = AviStream.parseStreamList(data);

        // Assert
        assert.isUndefined(result);
    }

    @test
    public parseStreamList_noValidStreamData() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("strl"),
            ByteVector.fromUInt(10, false),
            ByteVector.fromSize(10)
        );

        // Act
        const result = AviStream.parseStreamList(data);

        // Assert
        assert.isUndefined(result);
    }

    @test
    public parseStreamList_midiStream() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("strl"),
            ByteVector.fromString("strh"),
            ByteVector.fromUInt(56, false),
            ByteVector.fromUInt(AviStreamType.MIDI_STREAM, false),
            ByteVector.fromSize(52)
        );

        // Act
        const result = AviStream.parseStreamList(data);

        // Assert
        assert.isUndefined(result);
    }

    @test
    public parseStreamList_textStream() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("strl"),
            ByteVector.fromString("strh"),
            ByteVector.fromUInt(56, false),
            ByteVector.fromUInt(AviStreamType.TEXT_STREAM, false),
            ByteVector.fromSize(52)
        );

        // Act
        const result = AviStream.parseStreamList(data);

        // Assert
        assert.isUndefined(result);
    }

    @test
    public parseStreamList_videoStream() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("strl"),
            ByteVector.fromString("strh"),
            ByteVector.fromUInt(56, false),
            ByteVector.fromUInt(AviStreamType.VIDEO_STREAM, false),
            ByteVector.fromUInt(1234, false),
            ByteVector.fromSize(48),
            ByteVector.fromString("strf"),
            ByteVector.fromUInt(40, false),
            ByteVector.fromSize(4),
            ByteVector.fromUInt(2345, false),
            ByteVector.fromSize(32),
            ByteVector.fromString("fooo"),
            ByteVector.fromUInt(10, false),
            ByteVector.fromSize(10)
        );

        // Act
        const result = AviStream.parseStreamList(data);

        // Assert
        assert.isOk(result);

        assert.strictEqual(result.header.type, AviStreamType.VIDEO_STREAM);
        assert.strictEqual(result.header.handler, 1234);

        assert.isTrue(result.codec instanceof RiffBitmapInfoHeader);
        assert.strictEqual((<RiffBitmapInfoHeader> result.codec).videoWidth, 2345);
    }

    @test
    public parseStreamList_audioStream() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("strl"),
            ByteVector.fromString("strh"),
            ByteVector.fromUInt(56, false),
            ByteVector.fromUInt(AviStreamType.AUDIO_STREAM, false),
            ByteVector.fromUInt(1234, false),
            ByteVector.fromSize(48),
            ByteVector.fromString("strf"),
            ByteVector.fromUInt(16, false),
            ByteVector.fromUShort(2345, false),
            ByteVector.fromSize(12),
            ByteVector.fromString("fooo"),
            ByteVector.fromUInt(10, false),
            ByteVector.fromSize(10)
        );

        // Act
        const result = AviStream.parseStreamList(data);

        // Assert
        assert.isOk(result);

        assert.strictEqual(result.header.type, AviStreamType.AUDIO_STREAM);
        assert.strictEqual(result.header.handler, 1234);

        assert.isTrue(result.codec instanceof RiffWaveFormatEx);
        assert.strictEqual((<RiffWaveFormatEx> result.codec).formatTag, 2345);
    }
}
