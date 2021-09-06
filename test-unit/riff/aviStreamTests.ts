import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import RiffBitmapInfoHeader from "../../src/riff/riffBitmapInfoHeader";
import RiffList from "../../src/riff/riffList";
import {default as Resources} from "./resources";
import {AviStream, AviStreamType} from "../../src/riff/avi/aviStream";
import {ByteVector} from "../../src/byteVector";
import {Testers} from "../utilities/testers";
import RiffWaveFormatEx from "../../src/riff/riffWaveFormatEx";

// Setup chai
const assert = Chai.assert;

@suite class Riff_AviStreamTest {
    @test
    public constructor_invalidParams() {
        // Act / Assert
        Testers.testTruthy<RiffList>((v) => new AviStream(v));
    }

    @test
    public constructor_invalidListType() {
        // Arrange
        const list = RiffList.fromEmpty("abcd");

        // Act / Assert
        assert.throws(() => new AviStream(list));
    }

    @test
    public constructor_tooManyStreamHeaderChunks() {
        // Arrange
        const list = RiffList.fromEmpty("strl");
        list.setValues("strh", [ByteVector.empty(), ByteVector.empty()]);

        // Act / Assert
        assert.throws(() => new AviStream(list));
    }

    @test
    public constructor_tooFewStreamHeaderChunks() {
        // Arrange
        const list = RiffList.fromEmpty("strl");

        // Act / Assert
        assert.throws(() => new AviStream(list));
    }

    @test
    public constructor_streamHeaderTooShort() {
        // Arrange
        const list = RiffList.fromEmpty("strl");
        list.setValues("strh", [ByteVector.fromSize(10)]);

        // Act / Assert
        assert.throws(() => new AviStream(list));
    }

    @test
    public constructor_streamHeaderTooLong() {
        // Arrange
        const list = RiffList.fromEmpty("strl");
        list.setValues("strh", [ByteVector.fromSize(100)]);

        // Act / Assert
        assert.throws(() => new AviStream(list));
    }

    @test
    public constructor_tooFewFormatChunks() {
        // Arrange
        const list = RiffList.fromEmpty("strl");
        list.setValues("strh", [ByteVector.fromSize(56)]);

        // Act / Assert
        assert.throws(() => new AviStream(list));
    }

    @test
    public constructor_tooManyFormatChunks() {
        // Arrange
        const list = RiffList.fromEmpty("strl");
        list.setValues("strh", [ByteVector.fromSize(56)]);
        list.setValues("strf", [ByteVector.empty(), ByteVector.empty()]);

        // Act / Assert
        assert.throws(() => new AviStream(list));
    }

    @test
    public constructor_midiStream() {
        // Arrange
        const list = RiffList.fromEmpty("strl");
        list.setValues("strh", [Resources.getAviStreamHeaderData(AviStreamType.MIDI_STREAM)]);
        list.setValues("strf", [ByteVector.empty()]);

        // Act
        const stream = new AviStream(list);

        // Assert
        assert.isOk(stream);
        Riff_AviStreamTest.assertStreamHeaderData(stream, AviStreamType.MIDI_STREAM);
        assert.isUndefined(stream.codec);
    }

    @test
    public constructor_textStream() {
        // Arrange
        const list = RiffList.fromEmpty("strl");
        list.setValues("strh", [Resources.getAviStreamHeaderData(AviStreamType.TEXT_STREAM)]);
        list.setValues("strf", [ByteVector.empty()]);

        // Act
        const stream = new AviStream(list);

        // Assert
        assert.isOk(stream);
        Riff_AviStreamTest.assertStreamHeaderData(stream, AviStreamType.TEXT_STREAM);
        assert.isUndefined(stream.codec);
    }

    @test
    public constructor_audioStream() {
        // Arrange
        const list = RiffList.fromEmpty("strl");
        list.setValues("strh", [Resources.getAviStreamHeaderData(AviStreamType.AUDIO_STREAM)]);
        list.setValues("strf", [ByteVector.concatenate(
            ByteVector.fromUShort(0xBBBB),
            ByteVector.fromSize(14)
        )]);

        // Act
        const stream = new AviStream(list);

        // Assert
        assert.isOk(stream);
        Riff_AviStreamTest.assertStreamHeaderData(stream, AviStreamType.AUDIO_STREAM);

        assert.isOk(stream.codec);
        assert.instanceOf(stream.codec, RiffWaveFormatEx);
        assert.isTrue((<RiffBitmapInfoHeader> stream.codec).description.indexOf("0xBBBB") >= 0);
    }

    @test
    public constructor_videoStream() {
        // Arrange
        const list = RiffList.fromEmpty("strl");
        list.setValues("strh", [Resources.getAviStreamHeaderData(AviStreamType.VIDEO_STREAM)]);
        list.setValues("strf", [ByteVector.concatenate(
            ByteVector.fromSize(16),
            ByteVector.fromString("fooo"),
            ByteVector.fromSize(20)
        )]);

        // Act
        const stream = new AviStream(list);

        // Assert
        assert.isOk(stream);
        Riff_AviStreamTest.assertStreamHeaderData(stream, AviStreamType.VIDEO_STREAM);

        assert.isOk(stream.codec);
        assert.instanceOf(stream.codec, RiffBitmapInfoHeader);
        assert.isTrue((<RiffBitmapInfoHeader> stream.codec).description.indexOf("[fooo]") >= 0);
    }

    private static assertStreamHeaderData(stream: AviStream, type: AviStreamType) {
        assert.strictEqual(stream.bottom, 0x6789);
        assert.strictEqual(stream.flags, 0x34567890);
        assert.strictEqual(stream.handler, 0x23456789);
        assert.strictEqual(stream.initialFrames, 0x45678901);
        assert.strictEqual(stream.language, 0x2345);
        assert.strictEqual(stream.left, 0x3456);
        assert.strictEqual(stream.length, 0x89012345);
        assert.strictEqual(stream.priority, 0x1234);
        assert.strictEqual(stream.quality, 0x01234567);
        assert.strictEqual(stream.rate, 0x67890123);
        assert.strictEqual(stream.right, 0x5678);
        assert.strictEqual(stream.sampleSize, 0x11234567);
        assert.strictEqual(stream.scale, 0x56789012);
        assert.strictEqual(stream.start, 0x78901234);
        assert.strictEqual(stream.suggestedSampleSize, 0x90123456);
        assert.strictEqual(stream.top, 0x4567);
        assert.strictEqual(stream.type, type);
    }
}
