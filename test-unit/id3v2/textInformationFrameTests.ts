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
    const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP);
    header.frameSize = 8;
    const data = ByteVector.concatenate(
        header.render(4),
        StringType.Latin1,
        ByteVector.fromString("foo", StringType.Latin1),
        ByteVector.getTextDelimiter(StringType.Latin1),
        ByteVector.fromString("bar", StringType.Latin1),
    );

    return TextInformationFrame.fromOffsetRawData(data, 0, header, 4);
}

@suite class Id3v2_TextInformationFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return TextInformationFrame.fromOffsetRawData;
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
    public fromIdentifier_falsyIdentifier() {
        // Act/Assert
        Testers.testTruthy((v: FrameIdentifier) => { TextInformationFrame.fromIdentifier(v); });
    }

    @test
    public fromIdentifier_withEncoding_returnsFrameWithProvidedEncoding() {
        // Act
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP, StringType.Latin1);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.TCOP, []);
    }

    @test
    public fromOffsetRawData_emptyFrame_returnsEmptyFrame() {
        // Arrange
        const bodyBytes = ByteVector.empty();
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP, Id3v2FrameFlags.None, bodyBytes.length);
        const data = ByteVector.concatenate(
            0x00, 0x00,
            header.render(3),
            bodyBytes
        );

        // Act
        const frame = TextInformationFrame.fromOffsetRawData(data, 2, header, 3);

        // Assert
        assert.isOk(frame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.TCOP);
        assert.deepEqual(frame.text, []);
        assert.strictEqual(frame.textEncoding, Id3v2Settings.defaultEncoding);
    }

    @test
    public fromOffsetRawData_v3NotSplitType_returnsSingleTextField() {
        // Arrange
        const bodyBytes = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("fux/bux", StringType.Latin1)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TALB, Id3v2FrameFlags.None, bodyBytes.length);
        const data = ByteVector.concatenate(
            0x00, 0x00,
            header.render(3),
            bodyBytes
        );

        // Act
        const frame = TextInformationFrame.fromOffsetRawData(data, 2, header, 3);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.TALB, ["fux/bux"]);
    }

    @test
    public fromOffsetRawData_v3SplitType_returnsFrameSplitBySlash() {
        // Arrange
        const bodyBytes = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("fux/bux", StringType.Latin1)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOM, Id3v2FrameFlags.None, bodyBytes.length);
        const data = ByteVector.concatenate(
            0x00, 0x00,
            header.render(3),
            bodyBytes
        );

        // Act
        const frame = TextInformationFrame.fromOffsetRawData(data, 2, header, 3);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.TCOM, ["fux", "bux"]);
    }

    @test
    public fromOffsetRawData_v3WithNullBytes_discardsDataAfterNull() {
        // Arrange
        const bodyBytes = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("foo", StringType.Latin1),
            0x00,
            ByteVector.fromString("bar", StringType.Latin1)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOM, Id3v2FrameFlags.None, bodyBytes.length);
        const data = ByteVector.concatenate(header.render(3), bodyBytes);

        // Act
        const frame = TextInformationFrame.fromOffsetRawData(data, 0, header, 3);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.TCOM, ["foo"]);
    }

    @test
    public fromOffsetRawData_v4_returnsFrameSplitByDelimiter() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP);
        header.frameSize = 19;
        const data = ByteVector.concatenate(
            0x00, 0x00,
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("bux", StringType.UTF16BE),
            0x0, 0x0,   // Extra nulls to trigger null stripping logic
        );

        // Act
        const frame = TextInformationFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(
            frame,
            FrameIdentifiers.TCOP,
            ["fux", "bux"],
            StringType.UTF16BE
        );
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

    @params(-1, "negative")
    @params(1.23, "float")
    @params(0x100, "too_big")
    public render_invalidVersion_throws(version: number) {
        // Arrange
        const frame = getTestFrame();

        // Act/Assert
        assert.throws(() => frame.render(version));
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

    @test
    public render_v4MultiByteEncoding() {
        // Arrange
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TALB);
        frame.text = ["foo", "bar", "baz"]
        frame.textEncoding = StringType.UTF16BE;

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expected = ByteVector.concatenate(
            FrameIdentifiers.TALB.render(4),
            ByteVector.fromUint(23),
            ByteVector.fromUshort(Id3v2FrameFlags.None),
            StringType.UTF16BE,
            ByteVector.fromString("foo", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("bar", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("baz", StringType.UTF16BE)
        );
        Testers.bvEqual(result, expected);
    }

    @test
    public render_v4SingleByteEncoding() {
        // Arrange
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TALB);
        frame.text = ["foo", "bar", "baz"]
        frame.textEncoding = StringType.Latin1;

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expected = ByteVector.concatenate(
            FrameIdentifiers.TALB.render(4),
            ByteVector.fromUint(12),
            ByteVector.fromUshort(Id3v2FrameFlags.None),
            StringType.Latin1,
            ByteVector.fromString("foo", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("baz", StringType.Latin1)
        );
        Testers.bvEqual(result, expected);
    }

    @test
    public render_v3WithSplit() {
        // Arrange
        const bodyBytes = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.fromString("fux/bux", StringType.UTF16BE)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP, Id3v2FrameFlags.None, bodyBytes.length);
        const data = ByteVector.concatenate(header.render(3), bodyBytes);
        const frame = TextInformationFrame.fromOffsetRawData(data, 0, header, 3);

        // Act
        const output = frame.render(3);

        // Assert
        assert.ok(output);
        Testers.bvEqual(output, data);
    }

    @test
    public render_v3WithoutSplit() {
        // Arrange
        const bodyBytes = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.UTF16BE)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP, Id3v2FrameFlags.None, bodyBytes.length);
        const data = ByteVector.concatenate(header.render(3), bodyBytes);
        const frame = TextInformationFrame.fromOffsetRawData(data, 0, header, 3);

        // Act
        const output = frame.render(3);

        // Assert
        assert.ok(output);
        Testers.bvEqual(output, data);
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
