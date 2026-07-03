import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import PropertyTests from "../utilities/propertyTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {SynchronizedLyricsFrame, SynchronizedText} from "../../src/id3v2/frames/synchronizedLyricsFrame";
import {Testers} from "../utilities/testers";
import {SynchronizedTextType, TimestampFormat} from "../../src/id3v2/utilTypes";

const assertFrame = (
    frame: SynchronizedLyricsFrame,
    description: string,
    format: TimestampFormat,
    language: string,
    text: SynchronizedText[],
    textEncoding: StringType,
    textType: SynchronizedTextType
) => {
    assert.isOk(frame);
    assert.instanceOf<SynchronizedLyricsFrame>(frame, SynchronizedLyricsFrame);
    assert.strictEqual(frame.frameId, FrameIdentifiers.SYLT);

    assert.strictEqual(frame.description, description);
    assert.strictEqual(frame.format, format);
    assert.strictEqual(frame.language, language);
    assert.strictEqual(frame.textEncoding, textEncoding);
    assert.strictEqual(frame.textType, textType);

    assert.isArray(frame.text);
    assert.deepStrictEqual(frame.text, text);
}

@suite class Id3v2_SynchronizedTextTests {
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
            ByteVector.fromUint(text.time),
        );
        Testers.bvEqual(output, expected);
    }
}

@suite class Id3v2_SynchronizedLyricsFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d:ByteVector, v: number) => Frame {
        return SynchronizedLyricsFrame.fromFieldBytes;
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
        assertFrame(frame, description, TimestampFormat.Unknown, language, [], Id3v2Settings.defaultEncoding, textType);
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
        assertFrame(frame, description, TimestampFormat.Unknown, language, [], encoding, textType);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_notEnoughBytes(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromByteArray([0x00, 0x00, 0x00, 0x00, 0x00]);
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => { SynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version); });
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_missingDelimiter(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                     // Text encoding
            ByteVector.fromString("eng", StringType.Latin1),       // Language
            TimestampFormat.Unknown,                               // Timestamp format
            SynchronizedTextType.Other,                            // Content type
            ByteVector.fromString("foobarbaz", StringType.Latin1), // Content descriptor (unterminated)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => { SynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version); });
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_noDelimiterForSynchronizedText(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                     // Text encoding
            ByteVector.fromString("eng", StringType.Latin1),       // Language
            TimestampFormat.Unknown,                               // Timestamp format
            SynchronizedTextType.Other,                            // Content type
            ByteVector.fromString("foobarbaz", StringType.Latin1), // Content descriptor
            ByteVector.getTextDelimiter(StringType.Latin1),        // Delimiter
            ByteVector.fromString("fux", StringType.Latin1)        // Lyric (unterminated)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => { SynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version); });
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_incompleteSynchronizedText(version: number) {
        // Arrange
        const content1 = new SynchronizedText(123, "foo");
        const content2 = new SynchronizedText(456, "bar");

        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                  // Text encoding
            ByteVector.fromString("fux", StringType.Latin1),    // Language
            TimestampFormat.AbsoluteMilliseconds,               // Timestamp format
            SynchronizedTextType.Trivia,                        // Content type
            ByteVector.fromString("baz", StringType.Latin1),    // Content descriptor
            ByteVector.getTextDelimiter(StringType.Latin1),     // Delimiter
            content1.render(StringType.Latin1),                 // Lyric 1
            content2.render(StringType.Latin1).subarray(0, 5),  // Lyric 2 (incomplete)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => { SynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version); });
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_noData(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16BE,                               // Encoding
            ByteVector.fromString("fux", StringType.Latin1),  // Language
            TimestampFormat.AbsoluteMilliseconds,             // Timestamp format
            SynchronizedTextType.Trivia,                      // Content type
            ByteVector.fromString("bux", StringType.UTF16BE), // Content descriptor
            ByteVector.getTextDelimiter(StringType.UTF16BE),  // Delimiter
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = SynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(
            frame,
            "bux",
            TimestampFormat.AbsoluteMilliseconds,
            "fux",
            [],
            StringType.UTF16BE,
            SynchronizedTextType.Trivia
        );
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_oneLyric(version: number) {
        // Arrange
        const lyric1 = new SynchronizedText(123, "foo");

        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16BE,                               // Text encoding
            ByteVector.fromString("eng", StringType.Latin1),  // Language
            TimestampFormat.AbsoluteMilliseconds,             // Timestamp format
            SynchronizedTextType.Trivia,                      // Content type
            ByteVector.fromString("bux", StringType.UTF16BE), // Content descriptor
            ByteVector.getTextDelimiter(StringType.UTF16BE),  // Delimiter
            lyric1.render(StringType.UTF16BE)                 // Lyric 1
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = SynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(
            frame,
            "bux",
            TimestampFormat.AbsoluteMilliseconds,
            "eng",
            [lyric1],
            StringType.UTF16BE,
            SynchronizedTextType.Trivia
        );
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_twoLyrics(version: number) {
        // Arrange
        const lyric1 = new SynchronizedText(123, "foo");
        const lyric2 = new SynchronizedText(456, "bar");

        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                               // Text encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            TimestampFormat.AbsoluteMilliseconds,            // Timestamp format
            SynchronizedTextType.Trivia,                     // Content type
            ByteVector.fromString("bux", StringType.Latin1), // Content descriptor
            ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
            lyric1.render(StringType.Latin1),                // Lyric 1
            lyric2.render(StringType.Latin1)                 // Lyric 2
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = SynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(
            frame,
            "bux",
            TimestampFormat.AbsoluteMilliseconds,
            "eng",
            [lyric1, lyric2],
            StringType.Latin1,
            SynchronizedTextType.Trivia
        );
    }

    @params(StringType.Latin1, "single_byte")
    @params(StringType.UTF16BE, "multi_byte")
    public fromFieldBytes_encodingTest(encoding: StringType) {
        // Arrange
        const lyric1 = new SynchronizedText(123, "foo");
        const lyric2 = new SynchronizedText(234, "bar");

        const fieldBytes = ByteVector.concatenate(
            encoding,                                         // Text encoding
            ByteVector.fromString("eng", StringType.Latin1),  // Language
            TimestampFormat.AbsoluteMpegFrames,               // Timestamp format
            SynchronizedTextType.Events,                      // Content type
            ByteVector.fromString("baz", encoding),           // Content descriptor
            ByteVector.getTextDelimiter(encoding),            // Delimiter
            lyric1.render(encoding),                          // Lyric 1
            lyric2.render(encoding)                           // Lyric 2
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = SynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, 4);

        // Assert
        assertFrame(
            frame,
            "baz",
            TimestampFormat.AbsoluteMpegFrames,
            "eng",
            [lyric1, lyric2],
            encoding,
            SynchronizedTextType.Events
        );
    }
}

@suite class Id3v2_SynchronizedLyricsFrame_PropertyTests {
    @test
    public description() {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord);
        const set = (v: string) => { frame.description = v; };
        const get = () => frame.description;

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, "fux" );
        PropertyTests.propertyRoundTrip(set, get, undefined);
    }

    @test
    public format() {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord);

        // Act / Assert
        PropertyTests.propertyRoundTrip(
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
        PropertyTests.propertyRoundTrip(set, get, "fux");
        PropertyTests.propertyRoundTrip(set, get, "shoe");
        PropertyTests.propertyRoundTrip(set, get, "ab");
    }

    @test
    public text() {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord);
        const set = (v: SynchronizedText[]) => { frame.text = v; };
        const get = () => frame.text;
        const value = [new SynchronizedText(123, "foo")];

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, value);
        PropertyTests.propertyNormalized(set, get, undefined, []);
        PropertyTests.propertyNormalized(set, get, null, []);
    }

    @test
    public textEncoding() {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord);

        // Act / Assert
        PropertyTests.propertyRoundTrip(
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
        PropertyTests.propertyRoundTrip(
            (v) => { frame.textType = v; },
            () => frame.textType,
            SynchronizedTextType.Trivia
        );
    }
}

@suite class Id3v2_SynchronizedLyricsFrame_MethodTests {
    @test
    public clone() {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("fux", "bux", SynchronizedTextType.Chord);

        // Act
        const output = <SynchronizedLyricsFrame> frame.clone();

        // Assert
        assertFrame(output,
            frame.description,
            frame.format,
            frame.language,
            frame.text,
            frame.textEncoding,
            frame.textType
        );
    }

    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: SynchronizedLyricsFrame[]) => { SynchronizedLyricsFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = SynchronizedLyricsFrame.filterFrames(frames);

        // Assert
        assert.isArray(output);
        assert.isEmpty(output);
    }

    @test
    public filterFrames_noMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frames = [frame1, frame2];

        // Act
        const result = SynchronizedLyricsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Other);
        const frames = [frame1, frame2];

        // Act
        const result = SynchronizedLyricsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Other);
        const frame3 = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Other);

        const frames = [frame1, frame2, frame3];

        // Act
        const result = SynchronizedLyricsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Other);
        const frame2 = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Other);
        const frames = [frame1, frame2];

        // Act
        const result = SynchronizedLyricsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_noLyrics(version: number) {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord, StringType.Latin1);
        frame.format = TimestampFormat.AbsoluteMpegFrames;

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                // Encoding
            ByteVector.fromString("bar", StringType.Latin1),  // Language
            TimestampFormat.AbsoluteMpegFrames,               // Timestamp format
            SynchronizedTextType.Chord,                       // Content type
            ByteVector.fromString("foo", StringType.Latin1),  // Content descriptor
            ByteVector.getTextDelimiter(StringType.Latin1),   // Delimiter
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_falsyLyrics(version: number) {
        // Arrange
        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord, StringType.Latin1);
        frame.format = TimestampFormat.AbsoluteMpegFrames;
        frame.text = [undefined, null];

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                // Encoding
            ByteVector.fromString("bar", StringType.Latin1),  // Language
            TimestampFormat.AbsoluteMpegFrames,               // Timestamp format
            SynchronizedTextType.Chord,                       // Content type
            ByteVector.fromString("foo", StringType.Latin1),  // Content descriptor
            ByteVector.getTextDelimiter(StringType.Latin1),   // Delimiter
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_oneLyric(version: number) {
        // Arrange
        const lyric1 = new SynchronizedText(123, "fux");

        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord, StringType.Latin1);
        frame.format = TimestampFormat.AbsoluteMpegFrames;
        frame.text = [lyric1];

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                // Encoding
            ByteVector.fromString("bar", StringType.Latin1),  // Language
            TimestampFormat.AbsoluteMpegFrames,               // Timestamp format
            SynchronizedTextType.Chord,                       // Content type
            ByteVector.fromString("foo", StringType.Latin1),  // Content descriptor
            ByteVector.getTextDelimiter(StringType.Latin1),   // Delimiter
            lyric1.render(StringType.Latin1)                  // Lyric 1
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_twoLyric(version: number) {
        // Arrange
        const lyric2 = new SynchronizedText(234, "bux");
        const lyric1 = new SynchronizedText(123, "fux");

        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord, StringType.Latin1);
        frame.format = TimestampFormat.AbsoluteMpegFrames;
        frame.text = [lyric2, lyric1]; // Note - not in chronological order

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                // Encoding
            ByteVector.fromString("bar", StringType.Latin1),  // Language
            TimestampFormat.AbsoluteMpegFrames,               // Timestamp format
            SynchronizedTextType.Chord,                       // Content type
            ByteVector.fromString("foo", StringType.Latin1),  // Content descriptor
            ByteVector.getTextDelimiter(StringType.Latin1),   // Delimiter
            lyric1.render(StringType.Latin1),                 // Lyric 1
            lyric2.render(StringType.Latin1)                  // Lyric 2
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(StringType.Latin1, "single_byte")
    @params(StringType.UTF16BE, "multi_byte")
    public render_encodingTest(encoding: StringType) {
        // Arrange
        const lyric2 = new SynchronizedText(234, "bux");
        const lyric1 = new SynchronizedText(123, "fux");

        const frame = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Chord, encoding);
        frame.format = TimestampFormat.AbsoluteMpegFrames;
        frame.text = [lyric2, lyric1]; // Note - not in chronological order

        // Act
        const output = frame.render(4);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.concatenate(
            encoding,                                         // Encoding
            ByteVector.fromString("bar", StringType.Latin1),  // Language
            TimestampFormat.AbsoluteMpegFrames,               // Timestamp format
            SynchronizedTextType.Chord,                       // Content type
            ByteVector.fromString("foo", encoding),           // Content descriptor
            ByteVector.getTextDelimiter(encoding),            // Delimiter
            lyric1.render(encoding),                          // Lyric 1
            lyric2.render(encoding)                           // Lyric 2
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(4), fieldBytes);
        Testers.bvEqual(output, expected);
    }
}
