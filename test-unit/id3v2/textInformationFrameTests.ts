import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import PropertyTests from "../utilities/propertyTests";
import {TextInformationFrame} from "../../src/id3v2/frames/textInformationFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const getTestFrame = (): TextInformationFrame => {
    const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP, StringType.Latin1);
    frame.text = ["foo", "bar"];

    return frame;
}

@suite class Id3v2_TextInformationFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return (a, b, c, d) => TextInformationFrame.fromFieldBytes(c, a, d);
    }

    @test
    public fromIdentifier_falsyIdentifier() {
        // Act/Assert
        Testers.testTruthy((v: FrameIdentifier) => { TextInformationFrame.fromIdentifier(v); });
    }

    @test
    public fromIdentifier_noEncoding_returnsFrameWithDefaultEncoding() {
        // Act
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP);

        // Assert
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.TCOP);

        assert.isOk(frame.text);
        assert.isArray(frame.text);
        assert.isEmpty(frame.text);
        assert.strictEqual(frame.textEncoding, Id3v2Settings.defaultEncoding);
    }

    @test
    public fromIdentifier_withEncoding_returnsFrameWithProvidedEncoding() {
        // Act
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP, StringType.Latin1);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.TCOP, []);
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
    public fromOffsetRawData_noText_returnsEmptyFrame(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromByte(StringType.UTF16BE);
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assert.isOk(frame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.TCOP);
        assert.deepEqual(frame.text, []);
        assert.strictEqual(frame.textEncoding, StringType.UTF16BE);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromOffsetRawData_nullText_returnsEmptyFrame(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16BE, // Encoding
            0x00, 0x00, 0x00    // Text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assert.isOk(frame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.TCOP);
        assert.deepEqual(frame.text, []);
        assert.strictEqual(frame.textEncoding, StringType.UTF16BE);
    }

    @params(2, "v2")
    @params(3, "v2")
    public fromOffsetRawData_v3NotSplitType_returnsSingleTextField(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                  // Encoding
            ByteVector.fromString("fux/bux", StringType.Latin1) // Text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TALB, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.TALB, ["fux/bux"]);
    }

    @params(2, "v2")
    @params(3, "v2")
    public fromOffsetRawData_v3SplitType_returnsFrameSplitBySlash(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                  // Encoding
            ByteVector.fromString("fux/bux", StringType.Latin1) // Text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.TCOM, ["fux", "bux"]);
    }

    @params(2, "v2")
    @params(3, "v2")
    public fromOffsetRawData_v3WithNullBytes_discardsDataAfterNull(version: number) {
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
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.TCOM, ["foo"]);
    }

    @params(StringType.Latin1, "single_byte")
    @params(StringType.UTF16BE, "multi_byte")
    public fromOffsetRawData_v4_returnsFrameSplitByDelimiter(encoding: StringType) {
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
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(frame,FrameIdentifiers.TCOP, ["fux", "bux"],encoding);
    }

    private static assertFrame(
        frame: TextInformationFrame,
        frameId: FrameIdentifier,
        text: string[],
        encoding: StringType = StringType.Latin1
    ): void {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(frame.frameId, frameId);

        assert.isOk(frame.text);
        assert.deepStrictEqual(frame.text, text);
        assert.strictEqual(frame.textEncoding, encoding);
    }
}

@suite class Id3v2_TextInformationFrame_PropertyTests {
    @test
    public getText() {
        // Arrange
        const frame = getTestFrame();

        // Act
        const text = frame.text;
        text.push("new item");

        // Assert - new item not added to frame
        assert.notEqual(frame.text, text);
        assert.strictEqual(2, frame.text.length);
    }

    @test
    public setText() {
        // Arrange
        const frame = getTestFrame();

        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => { frame.text = v; }, () => frame.text, ["bux", "fux"]);
    }

    @params(undefined, "undefined")
    @params(null, "null")
    @params([], "empty_array")
    @params(["bar"], "truthy")
    public setText_values(value: string[]) {
        // Arrange
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP);

        // Act
        frame.text = value;

        // Assert
        assert.deepStrictEqual(frame.text, value ?? []);
    }

    @test
    public setEncoding_notRead() {
        // Arrange
        const frame = getTestFrame();

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16BE
        );
    }

    @test
    public setEncoding_read() {
        // Arrange
        const frame = getTestFrame();
        const _ = frame.text;   // Force a read

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16BE
        );
    }
}

@suite class Id3v2_TextInformationFrame_MethodTests {
    @test
    public clone_returnsCopy() {
        // Arrange
        const frame = getTestFrame();

        // Act
        const output = <TextInformationFrame> frame.clone();

        // Assert
        assert.ok(output);
        assert.strictEqual(output.frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.TCOP);

        assert.deepStrictEqual(frame.text, output.text);
        assert.strictEqual(frame.textEncoding, output.textEncoding);
    }

    @test
    public find_falsyFrames() {
        // Act
        Testers.testTruthy((v: TextInformationFrame[]) => {
            TextInformationFrame.findTextInformationFrame(v, FrameIdentifiers.TCOP);
        });
    }

    @test
    public find_invalidIdentity() {
        // Act
        Testers.testTruthy((v: FrameIdentifier) => { TextInformationFrame.findTextInformationFrame([], v); });
    }

    @test
    public find_emptyFrames_returnsUndefined() {
        // Arrange
        const frames: TextInformationFrame[] = [];

        // Act
        const output = TextInformationFrame.findTextInformationFrame(frames, FrameIdentifiers.TCOM);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_frameExists() {
        // Arrange
        const frames = [
            TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP),
            TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOM)
        ];

        // Act
        const output = TextInformationFrame.findTextInformationFrame(frames, FrameIdentifiers.TCOM);

        // Assert
        assert.isOk(output);
        assert.equal(output, frames[1]);
    }

    @test
    public find_frameExists_returnsFirstMatch() {
        // Arrange
        const frame1 = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOM);
        const frame2 = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOM);
        const frames = [frame1, frame2];

        // Act
        const output = TextInformationFrame.findTextInformationFrame(frames, FrameIdentifiers.TCOM);

        // Assert
        assert.strictEqual(output, frame1);
    }

    @test
    public find_frameDoesNotExist() {
        // Arrange
        const frames = [
            TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP),
            TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOM)
        ];

        // Act
        const output = TextInformationFrame.findTextInformationFrame(frames, FrameIdentifiers.TALB);

        // Assert
        assert.isUndefined(output);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_empty_returnEmptyVector(version: number) {
        // Arrange
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TALB);
        frame.text = [];

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
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TALB);
        frame.text = [undefined, null, ""];

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
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TALB, encoding);
        frame.text = ["foo", "bar", "baz"]

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
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP, encoding);
        frame.text = ["fux", "bux"]

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
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP, encoding);
        frame.text = ["fux"];

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
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP);
        frame.text = text;

        // Act
        const result = frame.toString();

        // Assert
        assert.strictEqual(result, expected);
    }
}
