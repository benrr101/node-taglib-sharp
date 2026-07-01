import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import PropertyTests from "../utilities/propertyTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import UnsynchronizedLyricsFrame from "../../src/id3v2/frames/unsynchronizedLyricsFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const getTestUnsynchronizedLyricsFrame = (): UnsynchronizedLyricsFrame => {
    const fieldBytes = ByteVector.concatenate(
        StringType.Latin1,                               // Encoding
        ByteVector.fromString("eng", StringType.Latin1), // Language
        ByteVector.fromString("foo", StringType.Latin1), // Description
        ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
        ByteVector.fromString("bar", StringType.Latin1)  // Content
    );
    const header = new Id3v2FrameHeader(FrameIdentifiers.USLT);
    return UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, 4);
};

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
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return UnsynchronizedLyricsFrame.fromFieldBytes;
    }

    @test
    public fromData() {
        // @TODO: Add test cases for different values - especially undefined language.
        // Arrange
        const encoding = StringType.Latin1;
        const language = "eng";
        const description = "foo";

        // Act
        const frame = UnsynchronizedLyricsFrame.fromData(description, language, encoding);

        // Assert
        assertFrame(frame, description, language, "", encoding);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_tooFewBytes_throws(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromByte(StringType.Latin1);
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act/Assert
        assert.throws(() => { UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version); });
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_requiredBytesOnly(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                    // Encoding
            ByteVector.fromString("eng", StringType.Latin1),      // Language
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, "", "eng", "", StringType.Latin1);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_descriptionOnly(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                    // Encoding
            ByteVector.fromString("eng", StringType.Latin1),      // Language
            ByteVector.fromString("foobarbaz", StringType.Latin1) // Description -> will become lyrics
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, "", "eng", "foobarbaz", StringType.Latin1);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_lyricsOnly(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                    // Encoding
            ByteVector.fromString("eng", StringType.Latin1),      // Language
            ByteVector.getTextDelimiter(StringType.Latin1),       // Separator
            ByteVector.fromString("foobarbaz", StringType.Latin1) // Lyrics
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, "", "eng", "foobarbaz", StringType.Latin1);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_descriptionAndLyrics(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                               // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("foo", StringType.Latin1), // Description
            ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
            ByteVector.fromString("bar", StringType.Latin1)  // Lyrics
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, fieldBytes.length);

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
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, 4);

        // Assert
        assertFrame(frame, "foo", "eng", "bar", encoding);
    }
}

@suite class Id3v2_UnsynchronizedLyricsFrame_PropertyTests {
    @test
    public description() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();
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
        const frame = getTestUnsynchronizedLyricsFrame();
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
        const frame = getTestUnsynchronizedLyricsFrame();
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
        const frame = getTestUnsynchronizedLyricsFrame();

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
        const frame = getTestUnsynchronizedLyricsFrame();

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
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(234));
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
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UnsynchronizedLyricsFrame.fromData("foo");
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
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UnsynchronizedLyricsFrame.fromData("foo");
        const frame3 = UnsynchronizedLyricsFrame.fromData("bar");

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
        const frame1 = UnsynchronizedLyricsFrame.fromData("foo");
        const frame2 = UnsynchronizedLyricsFrame.fromData("bar");
        const frames = [frame1, frame2];

        // Act
        const result = UnsynchronizedLyricsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }
    
    @params([2, StringType.Latin1], "v2_single_byte")
    @params([2, StringType.UTF16BE], "v2_multibyte")
    @params([3, StringType.Latin1], "v3_single_byte")
    @params([3, StringType.UTF16BE], "v3_multibyte")
    @params([4, StringType.Latin1], "v4_single_byte")
    @params([4, StringType.UTF16BE], "v4_multibyte")
    public render([version, encoding]: [number, StringType]) {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromData("foo", "eng", encoding);
        frame.text = "bar";

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
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(version), expectedFieldBytes);
        Testers.bvEqual(output, expectedBytes);
    }

    @params([2, StringType.UTF16], "v2")
    @params([3, StringType.UTF16], "v3")
    @params([4, StringType.UTF8], "v4")
    public render_utf8([version, outputEncoding]: [number, StringType]) {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromData("foo", "eng", StringType.UTF8);
        frame.text = "bar";

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
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(version), expectedFieldBytes);
        Testers.bvEqual(output, expectedBytes);
    }

    @test
    public render_descriptionOnly() {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromData("foo", "eng", StringType.Latin1);

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expectedFieldBytes = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("foo", StringType.Latin1), // Description
            ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(4), expectedFieldBytes);
        Testers.bvEqual(result, expectedBytes);
    }

    @test
    public render_lyricsOnly() {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromData("", "eng", StringType.Latin1);
        frame.text = "foo";

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expectedFieldBytes = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
            ByteVector.fromString("foo", StringType.Latin1), // Lyrics
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(4), expectedFieldBytes);
        Testers.bvEqual(result, expectedBytes);
    }
}
