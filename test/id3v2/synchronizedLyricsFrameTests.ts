import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import ConstructorTests from "./frameConstructorTests";
import FrameTypes from "../../src/id3v2/frameTypes";
import Id3v2TagSettings from "../../src/id3v2/id3v2TagSettings";
import PropertiesTests from "./framePropertiesTests";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {SynchronizedLyricsFrame, SynchronizedText} from "../../src/id3v2/frames/synchronizedLyricsFrame";
import {SynchronizedTextType, TimestampFormat} from "../../src/id3v2/utilTypes";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class SynchronizedTextTests {
    @test
    public synchronizedText_construct() {
        // Act
        const text = new SynchronizedText(123, "fux");

        // Assert
        assert.strictEqual(text.time, 123);
        assert.strictEqual(text.text, "fux");
    }

    @test
    public synchronizedText_render() {
        // Arrange
        const text = new SynchronizedText(123, "fux");

        // Act
        const output = text.render(StringType.UTF16BE);

        // Assert
        const expected = ByteVector.concatenate(
            ByteVector.fromString(text.text, StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromUInt(text.time),
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }
}

@suite(timeout(3000), slow(1000))
class SynchronizedLyricsFrameConstructorTests extends ConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader) => Frame {
        return SynchronizedLyricsFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return SynchronizedLyricsFrame.fromRawData;
    }

    @test
    public fromInfo_withoutEncoding() {
        // Arrange
        const description = "fux";
        const language = "bux";
        const textType = SynchronizedTextType.Lyrics;

        // Act
        const frame = SynchronizedLyricsFrame.fromInfo(description, language, textType);

        // Assert
        this.assertFrame(
            frame,
            description,
            TimestampFormat.Unknown,
            language,
            [],
            Id3v2TagSettings.defaultEncoding,
            textType
        );
    }

    @test
    public fromInfo_withEncoding() {
        // Arrange
        const description = "fux";
        const encoding = StringType.UTF16BE;
        const language = "bux";
        const textType = SynchronizedTextType.Lyrics;

        // Act
        const frame = SynchronizedLyricsFrame.fromInfo(description, language, textType, encoding);

        // Assert
        this.assertFrame(
            frame,
            description,
            TimestampFormat.Unknown,
            language,
            [],
            encoding,
            textType
        );
    }

    @test
    public fromRawData_notEnoughBytes() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.SYLT, 4);
        header.frameSize = 5;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00, 0x00, 0x00, 0x00
        );

        // Act / Assert
        assert.throws(() => { SynchronizedLyricsFrame.fromRawData(data, 4); });
    }

    @test
    public fromRawData_missingDelimiter() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.SYLT, 4);
        header.frameSize = 10;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x01, 0x02, 0x03, 0x04, 0x05
        );

        // Act / Assert
        assert.throws(() => { SynchronizedLyricsFrame.fromRawData(data, 4); });
    }

    @test
    public fromRawData_noDelimiterForSynchronizedText() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.SYLT, 4);
        header.frameSize = 16;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.Latin1),
            TimestampFormat.AbsoluteMilliseconds,
            SynchronizedTextType.Trivia,
            ByteVector.fromString("bux", StringType.UTF16BE),
            0x01, 0x02, 0x03, 0x04
        );

        // Act / Assert
        assert.throws(() => { SynchronizedLyricsFrame.fromRawData(data, 4); });
    }

    @test
    public fromRawData_incompleteSynchronizedText() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.SYLT, 4);
        header.frameSize = 34;
        const content1 = new SynchronizedText(123, "qux");
        const content2 = new SynchronizedText(456, "zux");
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.Latin1),
            TimestampFormat.AbsoluteMilliseconds,
            SynchronizedTextType.Trivia,
            ByteVector.fromString("bux", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            content1.render(StringType.UTF16BE),
            content2.render(StringType.UTF16BE)
        );

        // Act
        const frame = SynchronizedLyricsFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(
            frame,
            "bux",
            TimestampFormat.AbsoluteMilliseconds,
            "fux",
            [content1],
            StringType.UTF16BE,
            SynchronizedTextType.Trivia
        );
    }

    @test
    public fromRawData_noData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.SYLT, 4);
        header.frameSize = 14;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.Latin1),
            TimestampFormat.AbsoluteMilliseconds,
            SynchronizedTextType.Trivia,
            ByteVector.fromString("bux", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
        );

        // Act
        const frame = SynchronizedLyricsFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(
            frame,
            "bux",
            TimestampFormat.AbsoluteMilliseconds,
            "fux",
            [],
            StringType.UTF16BE,
            SynchronizedTextType.Trivia
        );
    }

    @test
    public fromRawData_singleData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.SYLT, 4);
        header.frameSize = 26;
        const content1 = new SynchronizedText(123, "qux");
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.Latin1),
            TimestampFormat.AbsoluteMilliseconds,
            SynchronizedTextType.Trivia,
            ByteVector.fromString("bux", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            content1.render(StringType.UTF16BE)
        );

        // Act
        const frame = SynchronizedLyricsFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(
            frame,
            "bux",
            TimestampFormat.AbsoluteMilliseconds,
            "fux",
            [content1],
            StringType.UTF16BE,
            SynchronizedTextType.Trivia
        );
    }

    @test
    public fromRawData_multipleData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.SYLT, 4);
        header.frameSize = 38;
        const content1 = new SynchronizedText(123, "qux");
        const content2 = new SynchronizedText(456, "zux");
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.Latin1),
            TimestampFormat.AbsoluteMilliseconds,
            SynchronizedTextType.Trivia,
            ByteVector.fromString("bux", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            content1.render(StringType.UTF16BE),
            content2.render(StringType.UTF16BE)
        );

        // Act
        const frame = SynchronizedLyricsFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(
            frame,
            "bux",
            TimestampFormat.AbsoluteMilliseconds,
            "fux",
            [content1, content2],
            StringType.UTF16BE,
            SynchronizedTextType.Trivia
        );
    }

    @test
    public fromOffsetRawData_multipleData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.SYLT, 4);
        header.frameSize = 38;
        const content1 = new SynchronizedText(123, "qux");
        const content2 = new SynchronizedText(456, "zux");
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.Latin1),
            TimestampFormat.AbsoluteMilliseconds,
            SynchronizedTextType.Trivia,
            ByteVector.fromString("bux", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            content1.render(StringType.UTF16BE),
            content2.render(StringType.UTF16BE)
        );

        // Act
        const frame = SynchronizedLyricsFrame.fromOffsetRawData(data, 2, header);

        // Assert
        this.assertFrame(
            frame,
            "bux",
            TimestampFormat.AbsoluteMilliseconds,
            "fux",
            [content1, content2],
            StringType.UTF16BE,
            SynchronizedTextType.Trivia
        );
    }

    private assertFrame(
        frame: SynchronizedLyricsFrame,
        d: string,
        f: TimestampFormat,
        l: string,
        t: SynchronizedText[],
        te: StringType,
        tt: SynchronizedTextType
    ) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.SynchronizedLyricsFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.SYLT));

        assert.strictEqual(frame.description, d);
        assert.strictEqual(frame.format, f);
        assert.strictEqual(frame.language, l);
        assert.strictEqual(frame.textEncoding, te);
        assert.strictEqual(frame.textType, tt);

        assert.isArray(frame.text);
        assert.deepStrictEqual(frame.text, t);
    }
}

@suite(timeout(3000), slow(1000))
class SynchronizedLyricsFramePropertyTests extends PropertiesTests {}
