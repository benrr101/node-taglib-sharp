import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameConstructorTests from "./frameConstructorTests";
import FramePropertyTests from "./framePropertyTests";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {SynchronizedLyricsFrame, SynchronizedText} from "../../src/id3v2/frames/synchronizedLyricsFrame";
import {SynchronizedTextType, TimestampFormat} from "../../src/id3v2/utilTypes";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class Id3v2_SynchronizedTextTests {
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
class Id3v2_SynchronizedLyricsFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
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
            Id3v2Settings.defaultEncoding,
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
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT);
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
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT);
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
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT);
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
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT);
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
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT);
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
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT);
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
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT);
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
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT);
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
        const frame = SynchronizedLyricsFrame.fromOffsetRawData(data, 2, header, 4);

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
        assert.strictEqual(frame.frameId, FrameIdentifiers.SYLT);

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
class Id3v2_SynchronizedLyricsFrame_PropertyTests {
    @test
    public description() {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord);
        const set = (v: string) => { frame.description = v; };
        const get = () => frame.description;

        // Act / Assert
        FramePropertyTests.propertyRoundTrip(set, get, "fux" );
        FramePropertyTests.propertyRoundTrip(set, get, undefined);
    }

    @test
    public format() {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord);

        // Act / Assert
        FramePropertyTests.propertyRoundTrip(
            (v) => { frame.format = v; },
            () => frame.format,
            TimestampFormat.AbsoluteMilliseconds
        );
    }

    @test
    public language() {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord);
        const set = (v: string) => { frame.language = v; };
        const get = () => frame.language;

        // Act / Assert
        FramePropertyTests.propertyRoundTrip(set, get, "fux");
        FramePropertyTests.propertyRoundTrip(set, get, "shoe");
        FramePropertyTests.propertyRoundTrip(set, get, "ab");
    }

    @test
    public text() {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord);
        const set = (v: SynchronizedText[]) => { frame.text = v; };
        const get = () => frame.text;
        const value = [new SynchronizedText(123, "foo")];

        // Act / Assert
        FramePropertyTests.propertyRoundTrip(set, get, value);
        FramePropertyTests.propertyNormalized(set, get, undefined, []);
        FramePropertyTests.propertyNormalized(set, get, null, []);
    }

    @test
    public textEncoding() {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord);

        // Act / Assert
        FramePropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16BE
        );
    }

    @test
    public textType() {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord);

        // Act / Assert
        FramePropertyTests.propertyRoundTrip(
            (v) => { frame.textType = v; },
            () => frame.textType,
            SynchronizedTextType.Trivia
        );
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_SynchronizedLyricsFrame_MethodTests {
    @test
    public find_falsyFrames() {
        // Act / Assert
        assert.throws(() => { SynchronizedLyricsFrame.find(undefined, "fux", SynchronizedTextType.Chord); });
        assert.throws(() => { SynchronizedLyricsFrame.find(null, "fux", SynchronizedTextType.Chord); });
    }

    @test
    public find_emptyFrames() {
        // Act
        const output = SynchronizedLyricsFrame.find([], "fux", SynchronizedTextType.Chord);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_noMatchWithoutLanguage() {
        // Arrange
        const frames = [
            SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Trivia), // desc does not match
            SynchronizedLyricsFrame.fromInfo("fux", "bux", SynchronizedTextType.Trivia)  // type does not match
        ];

        // Act
        const output = SynchronizedLyricsFrame.find(frames, "fux", SynchronizedTextType.Chord);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_noMatchWithLanguage() {
        // Arrange
        const frames = [
            SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Trivia), // desc does not match
            SynchronizedLyricsFrame.fromInfo("fux", "bar", SynchronizedTextType.Trivia), // lang goes not match
            SynchronizedLyricsFrame.fromInfo("fux", "bux", SynchronizedTextType.Trivia)  // type does not match
        ];

        // Act
        const output = SynchronizedLyricsFrame.find(frames, "fux", SynchronizedTextType.Chord, "bux");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_matchExists() {
        // Arrange
        const frames = [
            SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Trivia), // desc does not match
            SynchronizedLyricsFrame.fromInfo("fux", "bar", SynchronizedTextType.Trivia), // lang goes not match
            SynchronizedLyricsFrame.fromInfo("fux", "bux", SynchronizedTextType.Trivia), // type does not match
            SynchronizedLyricsFrame.fromInfo("fux", "bux", SynchronizedTextType.Chord)   // Is match
        ];

        // Act
        const output = SynchronizedLyricsFrame.find(frames, "fux", SynchronizedTextType.Chord, "bux");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[3]);
    }

    @test
    public findPreferred_falsyFrames() {
        // Act / Assert
        assert.throws(() => {
            SynchronizedLyricsFrame.findPreferred(undefined, "fux", "bux", SynchronizedTextType.Chord);
        });
        assert.throws(() => {
            SynchronizedLyricsFrame.findPreferred(null, "fux", "bux", SynchronizedTextType.Chord);
        });
    }

    @test
    public findPreferred_noFrames() {
        // Act
        const output = SynchronizedLyricsFrame.findPreferred([], "fux", "bux", SynchronizedTextType.Chord);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public findPreferred_perfectMatch() {
        // Arrange
        const frames = [
            SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Trivia), // desc does not match
            SynchronizedLyricsFrame.fromInfo("fux", "bar", SynchronizedTextType.Trivia), // lang goes not match
            SynchronizedLyricsFrame.fromInfo("fux", "bux", SynchronizedTextType.Trivia), // type does not match
            SynchronizedLyricsFrame.fromInfo("fux", "bux", SynchronizedTextType.Chord)   // perfect match
        ];

        // Act
        const output = SynchronizedLyricsFrame.findPreferred(frames, "fux", "bux", SynchronizedTextType.Chord);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[3]);
    }

    @test
    public findPreferred_descLangMatch() {
        // Arrange
        const frames = [
            SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Trivia), // desc does not match
            SynchronizedLyricsFrame.fromInfo("fux", "bar", SynchronizedTextType.Trivia), // lang goes not match
            SynchronizedLyricsFrame.fromInfo("fux", "bux", SynchronizedTextType.Trivia), // type does not match
        ];

        // Act
        const output = SynchronizedLyricsFrame.findPreferred(frames, "fux", "bux", SynchronizedTextType.Chord);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[2]);
    }

    @test
    public findPreferred_langMatch() {
        // Arrange
        const frames = [
            SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Trivia), // nothing matches
            SynchronizedLyricsFrame.fromInfo("foo", "bux", SynchronizedTextType.Trivia), // lang matches
        ];

        // Act
        const output = SynchronizedLyricsFrame.findPreferred(frames, "fux", "bux", SynchronizedTextType.Chord);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[1]);
    }

    @test
    public findPreferred_descMatch() {
        // Arrange
        const frames = [
            SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Trivia), // nothing matches
            SynchronizedLyricsFrame.fromInfo("fux", "bar", SynchronizedTextType.Trivia), // desc matches
        ];

        // Act
        const output = SynchronizedLyricsFrame.findPreferred(frames, "fux", "bux", SynchronizedTextType.Chord);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[1]);
    }

    @test
    public findPreferred_typeMatch() {
        // Arrange
        const frames = [
            SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Trivia), // nothing matches
            SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord),  // type matches
        ];

        // Act
        const output = SynchronizedLyricsFrame.findPreferred(frames, "fux", "bux", SynchronizedTextType.Chord);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[1]);
    }

    @test
    public findPreferred_nothingMatches() {
        // Arrange
        const frames = [
            SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Trivia), // nothing matches
            SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Trivia), // nothing matches
        ];

        // Act
        const output = SynchronizedLyricsFrame.findPreferred(frames, "fux", "bux", SynchronizedTextType.Chord);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[0]);
    }

    @test
    public clone() {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("fux", "bux", SynchronizedTextType.Chord);

        // Act
        const output = <SynchronizedLyricsFrame> frame.clone();

        // Assert
        assert.isOk(output);
        assert.notStrictEqual(output, frame);
        assert.strictEqual(output.frameClassType, FrameClassType.SynchronizedLyricsFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.SYLT);

        assert.strictEqual(output.description, frame.description);
        assert.strictEqual(output.format, frame.format);
        assert.strictEqual(output.language, frame.language);
        assert.strictEqual(output.textEncoding, frame.textEncoding);
        assert.strictEqual(output.textType, frame.textType);

        assert.isArray(output.text);
        assert.deepStrictEqual(output.text, frame.text);
    }

    @test
    public render() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT);
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
        const frame = SynchronizedLyricsFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.isTrue(ByteVector.equal(output, data));
    }
}

