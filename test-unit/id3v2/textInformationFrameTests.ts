import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import PropertyTests from "../utilities/propertyTests";
import TextInformationFrame from "../../src/id3v2/frames/textInformationFrame";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const assertFrame = (frame: TextInformationFrame, frameId: FrameIdentifier, text: string[], encoding: StringType) => {
    assert.isOk(frame);
    assert.instanceOf<TextInformationFrame>(frame, TextInformationFrame);
    assert.strictEqual(frame.frameId, frameId);

    assert.isOk(frame.text);
    assert.deepStrictEqual(frame.text, text);
    assert.strictEqual(frame.textEncoding, encoding);
}

@suite class Id3v2_TextInformationFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return TextInformationFrame.fromFieldBytes;
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_empty_throws(version: number) {
        // Arrange
        const fieldBytes = ByteVector.empty();
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => TextInformationFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_noText_returnsEmptyFrame(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromByte(StringType.UTF16BE);
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, FrameIdentifiers.TCOP, [], StringType.UTF16BE);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_nullText_returnsEmptyFrame(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16BE, // Encoding
            0x00, 0x00, 0x00    // Text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, FrameIdentifiers.TCOP, [], StringType.UTF16BE);
    }

    @params(2, "v2")
    @params(3, "v2")
    public fromFieldBytes_v3NotSplitType_returnsSingleTextField(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                  // Encoding
            ByteVector.fromString("fux/bux", StringType.Latin1) // Text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TALB, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, FrameIdentifiers.TALB, ["fux/bux"], StringType.Latin1);
    }

    @params(2, "v2")
    @params(3, "v2")
    public fromFieldBytes_v3SplitType_returnsFrameSplitBySlash(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                  // Encoding
            ByteVector.fromString("fux/bux", StringType.Latin1) // Text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, FrameIdentifiers.TCOM, ["fux", "bux"], StringType.Latin1);
    }

    @params(2, "v2")
    @params(3, "v2")
    public fromFieldBytes_v3WithNullBytes_discardsDataAfterNull(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                               // Encoding
            ByteVector.fromString("foo", StringType.Latin1), // Text
            0x00,                                            // ...
            ByteVector.fromString("bar", StringType.Latin1)  // ...
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, FrameIdentifiers.TCOM, ["foo"], StringType.Latin1);
    }

    @params(StringType.Latin1, "single_byte")
    @params(StringType.UTF16BE, "multi_byte")
    public fromFieldBytes_v4_returnsFrameSplitByDelimiter(encoding: StringType) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            encoding,                               // Encoding
            ByteVector.fromString("fux", encoding), // Text
            ByteVector.getTextDelimiter(encoding),  // ...
            ByteVector.fromString("bux", encoding), // ...
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TextInformationFrame.fromFieldBytes(header, fieldBytes, 4);

        // Assert
        assertFrame(frame,FrameIdentifiers.TCOP, ["fux", "bux"], encoding);
    }

    @test
    public fromFields_falsyIdentifier() {
        // Act/Assert
        Testers.testTruthy((v: FrameIdentifier) => { TextInformationFrame.fromFields(v); });
    }

    @test
    public fromFields_withIdentifier() {
        // Act
        const frame = TextInformationFrame.fromFields(FrameIdentifiers.TCOP);

        // Assert
        assertFrame(frame, FrameIdentifiers.TCOP, [], Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withIdentifierText() {
        // Act
        const frame = TextInformationFrame.fromFields(FrameIdentifiers.TCOP, ["foo", "bar"]);

        // Assert
        assertFrame(frame, FrameIdentifiers.TCOP, ["foo", "bar"], Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withIdentifierTextEncoding() {
        // Act
        const frame = TextInformationFrame.fromFields(FrameIdentifiers.TCOP, ["foo", "bar"], StringType.UTF16BE);

        // Assert
        assertFrame(frame, FrameIdentifiers.TCOP, ["foo", "bar"], StringType.UTF16BE);
    }
}

@suite class Id3v2_TextInformationFrame_PropertyTests {
    @params(undefined, "undefined")
    @params(null, "null")
    @params([], "empty_array")
    @params(["bar"], "truthy")
    public text_values(value: string[]) {
        // Arrange
        const frame = TextInformationFrame.fromFields(FrameIdentifiers.TCOP);

        // Act
        frame.text = value;

        // Assert
        assert.deepStrictEqual(frame.text, value ?? []);
    }

    @test
    public encoding() {
        // Arrange
        const frame = TextInformationFrame.fromFields(FrameIdentifiers.TCOP, ["foo"]);
        const get = () => frame.textEncoding;
        const set = (v: StringType) => { frame.textEncoding = v; };

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, StringType.UTF16BE);
    }
}

@suite class Id3v2_TextInformationFrame_MethodTests {
    @test
    public clone_returnsCopy() {
        // Arrange
        const frame = TextInformationFrame.fromFields(FrameIdentifiers.TCOP, ["foo"], StringType.UTF16LE);

        // Act
        const output = <TextInformationFrame> frame.clone();

        // Assert
        assertFrame(output, frame.frameId, frame.text, frame.textEncoding);
    }

    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: TextInformationFrame[]) => { TextInformationFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noIdentifier_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = TextInformationFrame.filterFrames(frames);

        // Assert
        assert.isArray(output);
        assert.isEmpty(output);
    }

    @test
    public filterFrames_noIdentifier_noMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frames = [frame1, frame2];

        // Act
        const result = TextInformationFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_noIdentifier_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = TextInformationFrame.fromFields(FrameIdentifiers.TCOP);
        const frames = [frame1, frame2];

        // Act
        const result = TextInformationFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_noIdentifier_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = TextInformationFrame.fromFields(FrameIdentifiers.TCOP);
        const frame3 = TextInformationFrame.fromFields(FrameIdentifiers.TCOP);

        const frames = [frame1, frame2, frame3];

        // Act
        const result = TextInformationFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_noIdentifier_allMatches() {
        // Arrange
        const frame1 = TextInformationFrame.fromFields(FrameIdentifiers.TCOP);
        const frame2 = TextInformationFrame.fromFields(FrameIdentifiers.TCOP);
        const frames = [frame1, frame2];

        // Act
        const result = TextInformationFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @test
    public filterFrames_withIdentifier_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = TextInformationFrame.filterFrames(frames);

        // Assert
        assert.isArray(output);
        assert.isEmpty(output);
    }

    @test
    public filterFrames_withIdentifier_noMatch() {
        // Arrange
        const frame1 = TextInformationFrame.fromFields(FrameIdentifiers.TCOM);
        const frame2 = TextInformationFrame.fromFields(FrameIdentifiers.TCOM);
        const frames = [frame1, frame2];

        // Act
        const result = TextInformationFrame.filterFrames(frames, FrameIdentifiers.TCOP);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_withIdentifier_singleMatch() {
        // Arrange
        const frame1 = TextInformationFrame.fromFields(FrameIdentifiers.TCOM);
        const frame2 = TextInformationFrame.fromFields(FrameIdentifiers.TCOP);
        const frames = [frame1, frame2];

        // Act
        const result = TextInformationFrame.filterFrames(frames, FrameIdentifiers.TCOP);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_withIdentifier_multipleMatches() {
        // Arrange
        const frame1 = TextInformationFrame.fromFields(FrameIdentifiers.TCOM);
        const frame2 = TextInformationFrame.fromFields(FrameIdentifiers.TCOP);
        const frame3 = TextInformationFrame.fromFields(FrameIdentifiers.TCOP);

        const frames = [frame1, frame2, frame3];

        // Act
        const result = TextInformationFrame.filterFrames(frames, FrameIdentifiers.TCOP);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_withIdentifier_allMatches() {
        // Arrange
        const frame1 = TextInformationFrame.fromFields(FrameIdentifiers.TCOP);
        const frame2 = TextInformationFrame.fromFields(FrameIdentifiers.TCOP);
        const frames = [frame1, frame2];

        // Act
        const result = TextInformationFrame.filterFrames(frames, FrameIdentifiers.TCOP);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_empty_returnEmptyVector(version: number) {
        // Arrange
        const frame = TextInformationFrame.fromFields(FrameIdentifiers.TALB, []);

        // Act
        const result = frame.render(version);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.length, 0);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_falsyValues_returnEmptyVector(version: number) {
        // Arrange
        const frame = TextInformationFrame.fromFields(FrameIdentifiers.TALB, [undefined, null, ""]);

        // Act
        const result = frame.render(version);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.length, 0);
    }

    @params(StringType.Latin1, "single_byte")
    @params(StringType.UTF16BE, "multi_byte")
    public render_v4EncodingTest(encoding: StringType) {
        // Arrange
        const frame = TextInformationFrame.fromFields(FrameIdentifiers.TALB, ["foo", "bar", "baz"], encoding);

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const fieldBytes = ByteVector.concatenate(
            encoding,                               // Encoding
            ByteVector.fromString("foo", encoding), // Text
            ByteVector.getTextDelimiter(encoding),  // ...
            ByteVector.fromString("bar", encoding), // ...
            ByteVector.getTextDelimiter(encoding),  // ...
            ByteVector.fromString("baz", encoding)  // ...
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TALB, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(4), fieldBytes);
        Testers.bvEqual(result, expected);
    }

    @params([2, StringType.Latin1], "v2_single_byte")
    @params([2, StringType.UTF16BE], "v2_multi_byte")
    @params([3, StringType.Latin1], "v3_single_byte")
    @params([3, StringType.UTF16BE], "v3_multi_byte")
    public render_v3WithSplit([version, encoding]: [number, StringType]) {
        // Arrange
        const frame = TextInformationFrame.fromFields(FrameIdentifiers.TCOP, ["fux", "bux"], encoding);

        // Act
        const output = frame.render(version);

        // Assert
        assert.ok(output);

        const fieldBytes = ByteVector.concatenate(
            encoding,                                  // Encoding
            ByteVector.fromString("fux/bux", encoding) // Text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params([2, StringType.Latin1], "v2_single_byte")
    @params([2, StringType.UTF16BE], "v2_multi_byte")
    @params([3, StringType.Latin1], "v3_single_byte")
    @params([3, StringType.UTF16BE], "v3_multi_byte")
    public render_v3WithoutSplit([version, encoding]: [number, StringType]) {
        // Arrange
        const frame = TextInformationFrame.fromFields(FrameIdentifiers.TCOP, ["fux"], encoding);

        // Act
        const output = frame.render(version);

        // Assert
        assert.ok(output);

        const fieldBytes = ByteVector.concatenate(
            encoding,                              // Encoding
            ByteVector.fromString("fux", encoding) // Text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params([[], ""], "empty")
    @params([["foo"], "foo"], "single")
    @params([["foo", "bar"], "foo; bar"], "multiple")
    public toString_returnsText([text, expected]: [string[], string]) {
        // Arrange
        const frame = TextInformationFrame.fromFields(FrameIdentifiers.TCOP, text);

        // Act
        const result = frame.toString();

        // Assert
        assert.strictEqual(result, expected);
    }
}
