import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import CommentsFrame from "../../src/id3v2/frames/commentsFrame";
import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import PropertyTests from "../utilities/propertyTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {Testers} from "../utilities/testers";

const getTestFrame = (): CommentsFrame => {
    const fieldBytes = ByteVector.concatenate(
        StringType.Latin1,
        ByteVector.fromString("eng", StringType.Latin1),
        ByteVector.fromString("foo", StringType.Latin1),
        ByteVector.getTextDelimiter(StringType.Latin1),
        ByteVector.fromString("bar", StringType.Latin1)
    );
    const header = new Id3v2FrameHeader(FrameIdentifiers.COMM);

    return CommentsFrame.fromFieldBytes(header, fieldBytes, 4);
}

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
    public get fromFieldBytes(): (h: Id3v2FrameHeader, fb: ByteVector, v: number) => Frame {
        return CommentsFrame.fromFieldBytes;
    }

    @test
    public fromDescription_withoutLanguage() {
        // Arrange
        const description = "fux";

        // Act
        const frame = CommentsFrame.fromDescription(description);

        // Assert
        verifyFrame(frame, description, "XXX", Id3v2Settings.defaultEncoding, "");
    }

    @test
    public fromDescription_withLanguageWithoutEncoding() {
        // Arrange
        const description = "fux";
        const language = "bux";

        // Act
        const frame = CommentsFrame.fromDescription(description, language);

        // Assert
        verifyFrame(frame, description, language, Id3v2Settings.defaultEncoding, "");
    }

    @test
    public fromDescription_withLanguageWithEncoding() {
        // Arrange
        const description = "fux";
        const language = "bux";
        const encoding = StringType.Latin1;

        // Act
        const frame = CommentsFrame.fromDescription(description, language, encoding);

        // Assert
        verifyFrame(frame, description, language, encoding, "");
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_tooFewBytes_throws(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromByte(StringType.Latin1);
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM, Id3v2FrameFlags.None, fieldBytes.length);

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
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM, Id3v2FrameFlags.None, fieldBytes.length);


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
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM, Id3v2FrameFlags.None, fieldBytes.length);


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
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM, Id3v2FrameFlags.None, fieldBytes.length);


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
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM, Id3v2FrameFlags.None, fieldBytes.length);

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
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = CommentsFrame.fromFieldBytes(header, fieldBytes, 4);

        // Assert
        verifyFrame(frame, "fux", "eng", encoding, "bux");
    }
}

@suite class Id3v2_CommentsFrame_PropertyTests {
    @test
    public description() {
        const frame = getTestFrame();

        const set = (v: string) => { frame.description = v; };
        const get = () => frame.description;
        PropertyTests.propertyRoundTrip(set, get, "fux");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public language() {
        const frame = getTestFrame();

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
        const frame = getTestFrame();

        const set = (v: string) => { frame.text = v; };
        const get = () => frame.text;
        PropertyTests.propertyRoundTrip(set, get, "fux");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public textEncoding() {
        const frame = getTestFrame();

        PropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16
        );
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
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(234));
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
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = CommentsFrame.fromDescription("foo");
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
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = CommentsFrame.fromDescription("foo");
        const frame3 = CommentsFrame.fromDescription("bar");

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
        const frame1 = CommentsFrame.fromDescription("foo");
        const frame2 = CommentsFrame.fromDescription("bar");
        const frames = [frame1, frame2];

        // Act
        const result = CommentsFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @test
    public findPreferred_noFrames_returnsUndefined() {
        // Arrange
        const frames: CommentsFrame[] = [];

        // Act
        const output = CommentsFrame.findPreferred(frames, "fux", "eng");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public findPreferred_firstFrameMatch() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "eng")
        ];

        // Act
        const output = CommentsFrame.findPreferred(frames, "bux", "jpn");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[0]);
    }

    @test
    public findPreferred_languageMatch() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "eng"),
            CommentsFrame.fromDescription("bux", "eng"),
            CommentsFrame.fromDescription("fux", "jpn"),
        ];

        // Act
        const output = CommentsFrame.findPreferred(frames, "bux", "jpn");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[2]);
    }

    @test
    public findPreferred_descriptionMatch() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "eng"),
            CommentsFrame.fromDescription("bux", "eng"),
        ];

        // Act
        const output = CommentsFrame.findPreferred(frames, "bux", "jpn");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[1]);
    }

    @test
    public findPreferred_perfectMatch() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "eng"),
            CommentsFrame.fromDescription("fux", "jpn"),
            CommentsFrame.fromDescription("bux", "eng"),
            CommentsFrame.fromDescription("bux", "jpn"),
        ];

        // Act
        const output = CommentsFrame.findPreferred(frames, "bux", "jpn");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[3]);
    }

    @test
    public clone() {
        // Arrange
        const frame = CommentsFrame.fromDescription("fux", "bux", StringType.UTF16BE);
        frame.text = "qux";

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
        const frame = CommentsFrame.fromDescription("foo", "eng", encoding);
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
            ByteVector.fromString("bar", encoding)           // Comment text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM, Id3v2FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(version), expectedFieldBytes);
        Testers.bvEqual(output, expectedBytes);
    }

    @params([2, StringType.UTF16], "v2")
    @params([3, StringType.UTF16], "v3")
    @params([4, StringType.UTF8], "v4")
    public render_utf8([version, outputEncoding]: [number, StringType]) {
        // Arrange
        const frame = CommentsFrame.fromDescription("foo", "eng", StringType.UTF8);
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
            ByteVector.fromString("bar", outputEncoding)     // Comment text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM, Id3v2FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(version), expectedFieldBytes);
        Testers.bvEqual(output, expectedBytes);
    }

    @test
    public render_descriptionOnly() {
        // Arrange
        const frame = CommentsFrame.fromDescription("foo", "eng", StringType.Latin1);

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
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM, Id3v2FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(4), expectedFieldBytes);
        Testers.bvEqual(result, expectedBytes);
    }

    @test
    public render_commentsOnly() {
        // Arrange
        const frame = CommentsFrame.fromDescription("", "eng", StringType.Latin1);
        frame.text = "foo";

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
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM, Id3v2FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(4), expectedFieldBytes);
        Testers.bvEqual(result, expectedBytes);
    }
}
