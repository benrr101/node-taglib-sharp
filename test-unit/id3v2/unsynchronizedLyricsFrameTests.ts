import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import FrameHeader from "../../src/id3v2/frames/frameHeader";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import PropertyTests from "../utilities/propertyTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import UnsynchronizedLyricsFrame from "../../src/id3v2/frames/unsynchronizedLyricsFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {FrameFlags, Id3v2Version} from "../../src/id3v2/enums";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const assertFrame = (frame: UnsynchronizedLyricsFrame, d: string, l: string, t: string, te: StringType) => {
    assert.isOk(frame);
    assert.instanceOf<UnsynchronizedLyricsFrame>(frame, UnsynchronizedLyricsFrame);
    assert.strictEqual(frame.frameId, FrameIdentifiers.USLT);

    assert.strictEqual(frame.description, d);
    assert.strictEqual(frame.language, l);
    assert.strictEqual(frame.text, t);
    assert.strictEqual(frame.textEncoding, te);
}

@suite class Id3v2_UnsynchronizedLyricsFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: FrameHeader, d: ByteVector, v: Id3v2Version) => Frame {
        return UnsynchronizedLyricsFrame.fromFieldBytes;
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_tooFewBytes_throws(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.fromByte(StringType.Latin1);
        const header = new FrameHeader(FrameIdentifiers.USLT, FrameFlags.None, fieldBytes.length);

        // Act/Assert
        assert.throws(() => { UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version); });
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_requiredBytesOnly(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                    // Encoding
            ByteVector.fromString("eng", StringType.Latin1),      // Language
        );
        const header = new FrameHeader(FrameIdentifiers.USLT, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, "", "eng", "", StringType.Latin1);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_descriptionOnly(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                    // Encoding
            ByteVector.fromString("eng", StringType.Latin1),      // Language
            ByteVector.fromString("foobarbaz", StringType.Latin1) // Description -> will become lyrics
        );
        const header = new FrameHeader(FrameIdentifiers.USLT, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, "", "eng", "foobarbaz", StringType.Latin1);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_lyricsOnly(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                    // Encoding
            ByteVector.fromString("eng", StringType.Latin1),      // Language
            ByteVector.getTextDelimiter(StringType.Latin1),       // Separator
            ByteVector.fromString("foobarbaz", StringType.Latin1) // Lyrics
        );
        const header = new FrameHeader(FrameIdentifiers.USLT, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, "", "eng", "foobarbaz", StringType.Latin1);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_descriptionAndLyrics(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                               // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("foo", StringType.Latin1), // Description
            ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
            ByteVector.fromString("bar", StringType.Latin1)  // Lyrics
        );
        const header = new FrameHeader(FrameIdentifiers.USLT, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, "foo", "eng", "bar", StringType.Latin1);
    }

    @params(StringType.Latin1, "single_byte_encoding")
    @params(StringType.UTF16BE, "multi_byte_encoding")
    public fromFieldBytes_encodingTest(encoding: StringType) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            encoding,                                        // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("foo", encoding),          // Description
            ByteVector.getTextDelimiter(encoding),           // Delimiter
            ByteVector.fromString("bar", encoding)           // Lyrics
        );
        const header = new FrameHeader(FrameIdentifiers.USLT, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, Id3v2Version.V24);

        // Assert
        assertFrame(frame, "foo", "eng", "bar", encoding);
    }

    @test
    public fromFields_noParams() {
        // Act
        const frame = UnsynchronizedLyricsFrame.fromFields();

        // Assert
        assertFrame(frame, "", "XXX", "", Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withDescription() {
        // Act
        const frame = UnsynchronizedLyricsFrame.fromFields("foo");

        // Assert
        assertFrame(frame, "foo", "XXX", "", Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withDescriptionText() {
        // Act
        const frame = UnsynchronizedLyricsFrame.fromFields("foo", "bar");

        // Assert
        assertFrame(frame, "foo", "XXX", "bar", Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withDescriptionTextLanguage() {
        // Act
        const frame = UnsynchronizedLyricsFrame.fromFields("foo", "bar", "eng");

        // Assert
        assertFrame(frame, "foo", "eng", "bar", Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withDescriptionTextLanguageEncoding() {
        // Act
        const frame = UnsynchronizedLyricsFrame.fromFields("foo", "bar", "eng", StringType.Hex);

        // Assert
        assertFrame(frame, "foo", "eng", "bar", StringType.Hex);
    }
}

@suite class Id3v2_UnsynchronizedLyricsFrame_PropertyTests {
    @test
    public description() {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromFields();
        const set = (v: string) => { frame.description = v; };
        const get = () => frame.description;

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, "fux");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public language() {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromFields();
        const set = (v: string) => { frame.language = v; };
        const get = () => frame.language;

        // Act / assert
        PropertyTests.propertyRoundTrip(set, get, "ABC");
        PropertyTests.propertyNormalized(set, get, undefined, "XXX");
        PropertyTests.propertyNormalized(set, get, null, "XXX");
        PropertyTests.propertyNormalized(set, get, "AB", "XXX");
        PropertyTests.propertyNormalized(set, get, "ABCD", "XXX");
    }

    @test
    public text() {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromFields();
        const set = (v: string) => { frame.text = v; };
        const get = () => frame.text;

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, "fux qux quxx");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public textEncoding() {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromFields();

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16BE
        );
    }
}

@suite class Id3v2_UnsynchronizedLyricsFrame_MethodTests {
    @test
    public clone() {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromFields("foo", "bar", "baz", StringType.Hex);

        // Act
        const result = <UnsynchronizedLyricsFrame> frame.clone();

        // Assert
        assertFrame(result, frame.description, frame.language, frame.text, frame.textEncoding);
    }

    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: UnsynchronizedLyricsFrame[]) => { UnsynchronizedLyricsFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = UnsynchronizedLyricsFrame.filterFrames(frames);

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
        const result = UnsynchronizedLyricsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = UnsynchronizedLyricsFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = UnsynchronizedLyricsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = UnsynchronizedLyricsFrame.fromFields();
        const frame3 = UnsynchronizedLyricsFrame.fromFields();

        const frames = [frame1, frame2, frame3];

        // Act
        const result = UnsynchronizedLyricsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = UnsynchronizedLyricsFrame.fromFields();
        const frame2 = UnsynchronizedLyricsFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = UnsynchronizedLyricsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @params([Id3v2Version.V22, StringType.Latin1], "v2_single_byte")
    @params([Id3v2Version.V22, StringType.UTF16BE], "v2_multibyte")
    @params([Id3v2Version.V23, StringType.Latin1], "v3_single_byte")
    @params([Id3v2Version.V23, StringType.UTF16BE], "v3_multibyte")
    @params([Id3v2Version.V24, StringType.Latin1], "v4_single_byte")
    @params([Id3v2Version.V24, StringType.UTF16BE], "v4_multibyte")
    public render([version, encoding]: [Id3v2Version, StringType]) {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromFields("foo", "bar", "eng", encoding);

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const expectedFieldBytes = ByteVector.concatenate(
            encoding,                                        // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("foo", encoding),          // Description
            ByteVector.getTextDelimiter(encoding),           // Delimiter
            ByteVector.fromString("bar", encoding)           // Lyrics
        );
        const header = new FrameHeader(FrameIdentifiers.USLT, FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(version), expectedFieldBytes);
        Testers.bvEqual(output, expectedBytes);
    }

    @params([Id3v2Version.V22, StringType.UTF16], "v2")
    @params([Id3v2Version.V23, StringType.UTF16], "v3")
    @params([Id3v2Version.V24, StringType.UTF8], "v4")
    public render_utf8([version, outputEncoding]: [Id3v2Version, StringType]) {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromFields("foo", "bar", "eng", StringType.UTF8);

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const expectedFieldBytes = ByteVector.concatenate(
            outputEncoding,                                  // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("foo", outputEncoding),    // Description
            ByteVector.getTextDelimiter(outputEncoding),     // Delimiter
            ByteVector.fromString("bar", outputEncoding)     // Lyrics
        );
        const header = new FrameHeader(FrameIdentifiers.USLT, FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(version), expectedFieldBytes);
        Testers.bvEqual(output, expectedBytes);
    }

    @test
    public render_descriptionOnly() {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromFields("foo", undefined, "eng", StringType.Latin1);

        // Act
        const result = frame.render(Id3v2Version.V24);

        // Assert
        assert.isOk(result);

        const expectedFieldBytes = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("foo", StringType.Latin1), // Description
            ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
        );
        const header = new FrameHeader(FrameIdentifiers.USLT, FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(Id3v2Version.V24), expectedFieldBytes);
        Testers.bvEqual(result, expectedBytes);
    }

    @test
    public render_lyricsOnly() {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromFields("", "foo", "eng", StringType.Latin1);

        // Act
        const result = frame.render(Id3v2Version.V24);

        // Assert
        assert.isOk(result);

        const expectedFieldBytes = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
            ByteVector.fromString("foo", StringType.Latin1), // Lyrics
        );
        const header = new FrameHeader(FrameIdentifiers.USLT, FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(Id3v2Version.V24), expectedFieldBytes);
        Testers.bvEqual(result, expectedBytes);
    }
}
