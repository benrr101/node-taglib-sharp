import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import UserUrlLinkFrame from "../../src/id3v2/frames/userUrlLinkFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

@suite class Id3v2_UserUrlLinkFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return (a, b, c, d) => UserUrlLinkFrame.fromFieldBytes(c, a, d);
    }

    @test
    public fromFields() {
        // Act
        const frame = UserUrlLinkFrame.fromFields("foo", "bar");

        // Assert
        assert.isOk(frame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.WXXX);
        assert.strictEqual(frame.description, "foo");
        assert.strictEqual(frame.text, "bar");
        assert.strictEqual(frame.textEncoding, Id3v2Settings.defaultEncoding);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromOffsetRawData_tooSmall(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromSize(1);
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => UserUrlLinkFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromOffsetRawData_illFormedTagLib(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("foo/bar", StringType.Latin1)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const output = UserUrlLinkFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        this.assertFrame(output, "foo", "bar", StringType.Latin1);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromOffsetRawData_illFormedOneField(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.fromString("foo", StringType.UTF16BE)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const output = UserUrlLinkFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        this.assertFrame(output, undefined, "foo", StringType.UTF16BE);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromOffsetRawData_illFormedThreeFields(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16BE,                               // Encoding
            ByteVector.fromString("foo", StringType.UTF16BE), // Description
            ByteVector.getTextDelimiter(StringType.UTF16BE),  // Description delimiter
            ByteVector.fromString("bar", StringType.Latin1),  // Text
            ByteVector.getTextDelimiter(StringType.Latin1),   // Bogus
            ByteVector.fromString("baz", StringType.Latin1),  // Bogus
            ByteVector.getTextDelimiter(StringType.Latin1),   // Bogus
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const output = UserUrlLinkFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        this.assertFrame(output, "foo", "bar", StringType.UTF16BE);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromOffsetRawData_wellFormed(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("foo", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar", StringType.Latin1)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const output = UserUrlLinkFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        this.assertFrame(output, "foo", "bar", StringType.Latin1);
    }
    
    @params(StringType.Latin1, "single_byte")
    @params(StringType.UTF16BE, "multi_byte")
    public fromOffsetRawData_encodingTest(encoding: StringType) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            encoding,
            ByteVector.fromString("foo", encoding),
            ByteVector.getTextDelimiter(encoding),
            ByteVector.fromString("bar", StringType.Latin1)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const output = UserUrlLinkFrame.fromFieldBytes(header, fieldBytes, 4);

        // Assert
        this.assertFrame(output, "foo", "bar", encoding);
    }

    private assertFrame(frame: UserUrlLinkFrame, description: string, text: string, encoding: StringType) {
        assert.ok(frame);
        assert.equal(frame.frameClassType, FrameClassType.UserUrlLinkFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.WXXX);

        assert.strictEqual(frame.description, description);
        assert.strictEqual(frame.text, text);
        assert.equal(frame.textEncoding, encoding);
    }
}

@suite class Id3v2_UserUrlLinkFrame_PropertyTests {
    @params(undefined, "undefined")
    @params(null, "null")
    @params("", "empty_string")
    @params("fux", "truthy")
    public setDescription(value: string) {
        // Arrange
        const frame = UserUrlLinkFrame.fromFields("foo", "bar");

        // Act
        frame.description = value;

        // Assert
        assert.strictEqual(frame.description, value);
        assert.strictEqual(frame.text, "bar");
    }

    @params(undefined, "undefined")
    @params(null, "null")
    @params("", "empty_string")
    @params("bux", "truthy")
    public setText(value: string) {
        // Arrange
        const frame = UserUrlLinkFrame.fromFields("foo", "bar");

        // Act
        frame.text = value;

        // Assert
        assert.strictEqual(frame.description, "foo");
        assert.strictEqual(frame.text, value);
    }

    @test
    public setEncoding() {
        // Arrange
        const frame = UserUrlLinkFrame.fromFields("foo", "bar");

        // Act
        frame.textEncoding = StringType.UTF8;

        // Assert
        assert.equal(frame.textEncoding, StringType.UTF8);
    }
}

@suite class Id3v2_UserUrlLink_MethodTests {
    @test
    public findUserUrlLinkFrame_falsyFrames_throws(): void {
        // Act/Assert
        Testers.testTruthy((v: UserUrlLinkFrame[]) => { UserUrlLinkFrame.findUserUrlLinkFrame(v, "foo"); });
    }

    @test
    public findUserUrlLinkFrame_falsyIdentity_throws(): void {
        // Arrange
        const frames = [UserUrlLinkFrame.fromFields("foo", "bar")];

        // Act/Assert
        Testers.testTruthy((v: string) => { UserUrlLinkFrame.findUserUrlLinkFrame(frames, v); });
    }

    @test
    public findUserUrlLinkFrame_emptyFrames_returnsUndefined() {
        // Arrange
        const frames: UserUrlLinkFrame[] = [];

        // Act
        const result = UserUrlLinkFrame.findUserUrlLinkFrame(frames, "foo");

        // Assert
        assert.isUndefined(result);
    }

    @test
    public findUserUrlLinkFrame_noMatch_returnsUndefined() {
        // Arrange
        const frames = [
            UserUrlLinkFrame.fromFields("foo", "fux"),
            UserUrlLinkFrame.fromFields("bar", "bux")
        ];

        // Act
        const result = UserUrlLinkFrame.findUserUrlLinkFrame(frames, "baz");

        // Assert
        assert.isUndefined(result);
    }

    @test
    public findUserUrlLinkFrame_match_returnsFirstMatch() {
        // Arrange
        const frame1 = UserUrlLinkFrame.fromFields("foo", "bar");
        const frame2 = UserUrlLinkFrame.fromFields("foo", "bux");
        const frames = [frame1, frame2];

        // Act
        const result = UserUrlLinkFrame.findUserUrlLinkFrame(frames, "foo");

        // Assert
        assert.equal(result, frame1);
    }

    @test
    public clone_returnsClone() {
        // Arrange
        const frame = UserUrlLinkFrame.fromFields("foo", "fux");
        frame.textEncoding = StringType.UTF16BE;

        // Act
        const result = frame.clone();

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.frameId, frame.frameId);
        assert.strictEqual(result.description, frame.description);
        assert.strictEqual(result.text, frame.text);
        assert.strictEqual(result.textEncoding, frame.textEncoding);
    }

    @test
    public render_withoutDescriptionWithoutText() {
        // Arrange
        const frame = UserUrlLinkFrame.fromFields(undefined, undefined);
        frame.textEncoding = StringType.Latin1;

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.length, 0);
    }

    @test
    public render_withoutDescriptionWithText() {
        // Arrange
        const frame = UserUrlLinkFrame.fromFields(undefined, "foo");
        frame.textEncoding = StringType.Latin1;

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expectedBytes = ByteVector.concatenate(
            FrameIdentifiers.WXXX.render(4),
            ByteVector.fromUint(5),
            ByteVector.fromUshort(Id3v2FrameFlags.None),
            ByteVector.fromByte(StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("foo", StringType.Latin1)
        );
        Testers.bvEqual(result, expectedBytes);
    }

    @test
    public render_withDescriptionWithoutText() {
        // Arrange
        const frame = UserUrlLinkFrame.fromFields("foo", undefined);
        frame.textEncoding = StringType.Latin1;

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expectedBytes = ByteVector.concatenate(
            FrameIdentifiers.WXXX.render(4),
            ByteVector.fromUint(5),
            ByteVector.fromUshort(Id3v2FrameFlags.None),
            ByteVector.fromByte(StringType.Latin1),
            ByteVector.fromString("foo", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1)
        );
        Testers.bvEqual(result, expectedBytes);
    }

    @test
    public render_withDescriptionWithText() {
        // Arrange
        const frame = UserUrlLinkFrame.fromFields("foo", "bar");
        frame.textEncoding = StringType.Latin1;

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expectedBytes = ByteVector.concatenate(
            FrameIdentifiers.WXXX.render(4),
            ByteVector.fromUint(8),
            ByteVector.fromUshort(Id3v2FrameFlags.None),
            ByteVector.fromByte(StringType.Latin1),
            ByteVector.fromString("foo", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar", StringType.Latin1)
        );
        Testers.bvEqual(result, expectedBytes);
    }

    @test
    public render_withDescriptionWithText_twoByteEncoding() {
        // Arrange
        const frame = UserUrlLinkFrame.fromFields("foo", "bar");
        frame.textEncoding = StringType.UTF16LE

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expectedBytes = ByteVector.concatenate(
            FrameIdentifiers.WXXX.render(4),
            ByteVector.fromUint(12),
            ByteVector.fromUshort(Id3v2FrameFlags.None),
            ByteVector.fromByte(StringType.UTF16LE),
            ByteVector.fromString("foo", StringType.UTF16LE),
            ByteVector.getTextDelimiter(StringType.UTF16LE),
            ByteVector.fromString("bar", StringType.Latin1)
        );
        Testers.bvEqual(result, expectedBytes);
    }

    @params(["", ""], "empty_string")
    @params(["foo", ""], "foo_empty_string")
    @params(["", "foo"], "empty_string_foo")
    @params(["foo", "bar"], "foo_bar")
    public toString_returnsText([description, text]: [string, string]) {
        // Arrange
        const frame = UserUrlLinkFrame.fromFields(description, text);

        // Act
        const result = frame.toString();

        // Assert
        assert.strictEqual(result, `[${description}] ${text}`);
    }
}
