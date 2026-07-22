import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import CommentsFrame from "../../src/id3v2/frames/commentsFrame";
import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import FrameHeader from "../../src/id3v2/frames/frameHeader";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import PropertyTests from "../utilities/propertyTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {FrameFlags} from "../../src/id3v2/enums";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const verifyFrame = (
    frame: CommentsFrame,
    expectedDesc: string,
    expectedLang: string,
    expectedEncoding: StringType,
    expectedText: string
) => {
    assert.isOk(frame);
    assert.instanceOf<CommentsFrame>(frame, CommentsFrame);
    assert.strictEqual(frame.frameId, FrameIdentifiers.COMM);

    assert.strictEqual(frame.description, expectedDesc);
    assert.strictEqual(frame.language, expectedLang);
    assert.strictEqual(frame.textEncoding, expectedEncoding);
    assert.strictEqual(frame.text, expectedText);
}

@suite class Id3v2_CommentsFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: FrameHeader, fb: ByteVector, v: number) => Frame {
        return CommentsFrame.fromFieldBytes;
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_tooFewBytes_throws(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromByte(StringType.Latin1);
        const header = new FrameHeader(FrameIdentifiers.COMM, FrameFlags.None, fieldBytes.length);

        // Act/Assert
        assert.throws(() => { CommentsFrame.fromFieldBytes(header, fieldBytes, version); });
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_requiredBytesOnly(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                               // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
        );
        const header = new FrameHeader(FrameIdentifiers.COMM, FrameFlags.None, fieldBytes.length);


        // Act
        const frame = CommentsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        verifyFrame(frame, "", "eng", StringType.Latin1, "");
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_descriptionOnly(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                               // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("fux", StringType.Latin1)  // Description -> will be used as comments
        );
        const header = new FrameHeader(FrameIdentifiers.COMM, FrameFlags.None, fieldBytes.length);


        // Act
        const frame = CommentsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        verifyFrame(frame, "", "eng", StringType.Latin1, "fux");
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_commentsOnly(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                               // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
            ByteVector.fromString("fux", StringType.Latin1)  // Comment
        );
        const header = new FrameHeader(FrameIdentifiers.COMM, FrameFlags.None, fieldBytes.length);


        // Act
        const frame = CommentsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        verifyFrame(frame, "", "eng", StringType.Latin1, "fux");
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_descriptionAndComments(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                               // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("fux", StringType.Latin1), // Description
            ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
            ByteVector.fromString("bux", StringType.Latin1)  // Comment
        );
        const header = new FrameHeader(FrameIdentifiers.COMM, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = CommentsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        verifyFrame(frame, "fux", "eng", StringType.Latin1, "bux");
    }

    @params(StringType.Latin1, "single_byte_encoding")
    @params(StringType.UTF16BE, "multi_byte_encoding")
    public fromFieldBytes_encodingTest(encoding: StringType) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            encoding,                                        // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("fux", encoding),          // Description
            ByteVector.getTextDelimiter(encoding),           // Delimiter
            ByteVector.fromString("bux", encoding)           // Comment
        );
        const header = new FrameHeader(FrameIdentifiers.COMM, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = CommentsFrame.fromFieldBytes(header, fieldBytes, 4);

        // Assert
        verifyFrame(frame, "fux", "eng", encoding, "bux");
    }

    @test
    public fromFields_noParams() {
        // Act
        const frame = CommentsFrame.fromFields();

        // Assert
        verifyFrame(frame, "", "XXX", Id3v2Settings.defaultEncoding, "");
    }

    @test
    public fromFields_withDescription() {
        // Act
        const frame = CommentsFrame.fromFields("foo");

        // Assert
        verifyFrame(frame, "foo", "XXX", Id3v2Settings.defaultEncoding, "");
    }

    @test
    public fromFields_withDescriptionText() {
        // Act
        const frame = CommentsFrame.fromFields("foo", "bar");

        // Assert
        verifyFrame(frame, "foo", "XXX", Id3v2Settings.defaultEncoding, "bar");
    }

    @test
    public fromFields_withDescriptionTextLanguage() {
        // Act
        const frame = CommentsFrame.fromFields("foo", "bar", "baz");

        // Assert
        verifyFrame(frame, "foo", "baz", Id3v2Settings.defaultEncoding, "bar");
    }

    @test
    public fromFields_withDescriptionTextLanguageEncoding() {
        // Act
        const frame = CommentsFrame.fromFields("foo", "bar", "baz", StringType.Hex);

        // Assert
        verifyFrame(frame, "foo", "baz", StringType.Hex, "bar");
    }
}

@suite class Id3v2_CommentsFrame_PropertyTests {
    @test
    public description() {
        const frame = CommentsFrame.fromFields("bar", "foo", "eng", StringType.Latin1);

        const set = (v: string) => { frame.description = v; };
        const get = () => frame.description;
        PropertyTests.propertyRoundTrip(set, get, "fux");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public language() {
        const frame = CommentsFrame.fromFields("bar", "foo", "eng", StringType.Latin1);

        const set = (v: string) => { frame.language = v; };
        const get = () => frame.language;
        PropertyTests.propertyRoundTrip(set, get, "jpn");
        PropertyTests.propertyNormalized(set, get, undefined, "XXX");
        PropertyTests.propertyNormalized(set, get, null, "XXX");
        PropertyTests.propertyNormalized(set, get, "ab", "XXX");
        PropertyTests.propertyNormalized(set, get, "abcd", "abc");
    }

    @test
    public text() {
        const frame = CommentsFrame.fromFields("bar", "foo", "eng", StringType.Latin1);

        const set = (v: string) => { frame.text = v; };
        const get = () => frame.text;
        PropertyTests.propertyRoundTrip(set, get, "fux");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public textEncoding() {
        const frame = CommentsFrame.fromFields("bar", "foo", "eng", StringType.Latin1);

        const set = (v: StringType) => { frame.textEncoding = v; };
        const get = () => frame.textEncoding;
        PropertyTests.propertyRoundTrip(set, get, StringType.UTF16);
    }
}

@suite class Id3v2_CommentsFrame_MethodTests {
    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: CommentsFrame[]) => { CommentsFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = CommentsFrame.filterFrames(frames);

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
        const result = CommentsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = CommentsFrame.fromFields("foo");
        const frames = [frame1, frame2];

        // Act
        const result = CommentsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = CommentsFrame.fromFields("foo");
        const frame3 = CommentsFrame.fromFields("bar");

        const frames = [frame1, frame2, frame3];

        // Act
        const result = CommentsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = CommentsFrame.fromFields("foo");
        const frame2 = CommentsFrame.fromFields("bar");
        const frames = [frame1, frame2];

        // Act
        const result = CommentsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @test
    public clone() {
        // Arrange
        const frame = CommentsFrame.fromFields("foo", "bar", "baz", StringType.UTF16BE);

        // Act
        const output = <CommentsFrame> frame.clone();

        // Assert
        verifyFrame(output, frame.description, frame.language, frame.textEncoding, frame.text);
    }

    @params([2, StringType.Latin1], "v2_single_byte")
    @params([2, StringType.UTF16BE], "v2_multibyte")
    @params([3, StringType.Latin1], "v3_single_byte")
    @params([3, StringType.UTF16BE], "v3_multibyte")
    @params([4, StringType.Latin1], "v4_single_byte")
    @params([4, StringType.UTF16BE], "v4_multibyte")
    public render([version, encoding]: [number, StringType]) {
        // Arrange
        const frame = CommentsFrame.fromFields("bar", "foo", "eng", encoding);

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const expectedFieldBytes = ByteVector.concatenate(
            encoding,                                        // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("bar", encoding),          // Description
            ByteVector.getTextDelimiter(encoding),           // Delimiter
            ByteVector.fromString("foo", encoding)           // Comment text
        );
        const header = new FrameHeader(FrameIdentifiers.COMM, FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(version), expectedFieldBytes);
        Testers.bvEqual(output, expectedBytes);
    }

    @params([2, StringType.UTF16], "v2")
    @params([3, StringType.UTF16], "v3")
    @params([4, StringType.UTF8], "v4")
    public render_utf8([version, outputEncoding]: [number, StringType]) {
        // Arrange
        const frame = CommentsFrame.fromFields("bar", "foo", "eng", StringType.UTF8);

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const expectedFieldBytes = ByteVector.concatenate(
            outputEncoding,                                  // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("bar", outputEncoding),    // Description
            ByteVector.getTextDelimiter(outputEncoding),     // Delimiter
            ByteVector.fromString("foo", outputEncoding)     // Comment text
        );
        const header = new FrameHeader(FrameIdentifiers.COMM, FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(version), expectedFieldBytes);
        Testers.bvEqual(output, expectedBytes);
    }

    @test
    public render_descriptionOnly() {
        // Arrange
        const frame = CommentsFrame.fromFields("foo", "", "eng", StringType.Latin1);

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
        const header = new FrameHeader(FrameIdentifiers.COMM, FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(4), expectedFieldBytes);
        Testers.bvEqual(result, expectedBytes);
    }

    @test
    public render_commentsOnly() {
        // Arrange
        const frame = CommentsFrame.fromFields("", "foo", "eng", StringType.Latin1);

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expectedFieldBytes = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
            ByteVector.fromString("foo", StringType.Latin1), // Comment text
        );
        const header = new FrameHeader(FrameIdentifiers.COMM, FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(4), expectedFieldBytes);
        Testers.bvEqual(result, expectedBytes);
    }
}
