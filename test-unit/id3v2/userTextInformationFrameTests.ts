import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import FrameHeader from "../../src/id3v2/frames/frameHeader";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import UserTextInformationFrame from "../../src/id3v2/frames/userTextInformationFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {FrameFlags, Id3v2Version} from "../../src/id3v2/enums";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const assertFrame = (
    frame: UserTextInformationFrame,
    description: string,
    text: string[],
    encoding: StringType
) => {
    assert.isOk(frame);
    assert.instanceOf<UserTextInformationFrame>(frame, UserTextInformationFrame);
    assert.strictEqual(frame.frameId, FrameIdentifiers.TXXX);

    assert.isOk(frame.text);
    assert.strictEqual(frame.description, description);
    assert.deepStrictEqual(frame.text, text);
    assert.strictEqual(frame.textEncoding, encoding);
}

@suite class Id3v2_UserInformationFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: FrameHeader, d: ByteVector, v: Id3v2Version) => Frame {
        return UserTextInformationFrame.fromFieldBytes;
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_emptyFrame_throw(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.empty();
        const header = new FrameHeader(FrameIdentifiers.TXXX, FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => UserTextInformationFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_encodingOnly(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.fromByte(StringType.UTF16LE);
        const header = new FrameHeader(FrameIdentifiers.TXXX, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UserTextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, "", [], StringType.UTF16LE);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_illFormedOneField(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.fromString("foo", StringType.UTF16BE)
        );
        const header = new FrameHeader(FrameIdentifiers.TXXX, FrameFlags.None, fieldBytes.length);

        // Act
        const output = UserTextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(output, "", ["foo"], StringType.UTF16BE);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_illFormedThreeFields(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.fromString("foo", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("bar", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("baz", StringType.UTF16BE),
        );
        const header = new FrameHeader(FrameIdentifiers.TXXX, FrameFlags.None, fieldBytes.length);

        // Act
        const output = UserTextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(output, "foo", ["bar", "baz"], StringType.UTF16BE);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_wellFormed(version: Id3v2Version) {
        // Assert
        const fieldData = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("foo", StringType.UTF8),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar", StringType.UTF8)
        );
        const header = new FrameHeader(FrameIdentifiers.TXXX, FrameFlags.None, fieldData.length);

        // Act
        const frame = UserTextInformationFrame.fromFieldBytes(header, fieldData, version);

        // Assert
        assertFrame(frame, "foo", ["bar"], StringType.Latin1);
    }

    @params(StringType.Latin1, "latin1")
    @params(StringType.UTF16BE, "utf16be")
    public fromFieldBytes_encodingTest(encoding: StringType) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            encoding,
            ByteVector.fromString("foo", encoding),
            ByteVector.getTextDelimiter(encoding),
            ByteVector.fromString("bar", encoding)
        );
        const header = new FrameHeader(FrameIdentifiers.TXXX, FrameFlags.None, fieldBytes.length);

        // Act
        const output = UserTextInformationFrame.fromFieldBytes(header, fieldBytes, Id3v2Version.V24);

        // Assert
        assertFrame(output, "foo", ["bar"], encoding);
    }

    @test
    public fromFields_noParams() {
        // Act
        const frame = UserTextInformationFrame.fromFields();

        // Assert
        assertFrame(frame, "", [], Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withDescription() {
        // Act
        const frame = UserTextInformationFrame.fromFields("foo");

        // Assert
        assertFrame(frame, "foo", [], Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withDescriptionText() {
        // Act
        const frame = UserTextInformationFrame.fromFields("foo", ["bar", "baz"]);

        // Assert
        assertFrame(frame, "foo", ["bar", "baz"], Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withDescriptionTextEncoding() {
        // Act
        const frame = UserTextInformationFrame.fromFields("foo", ["bar", "baz"], StringType.Hex);

        // Assert
        assertFrame(frame, "foo", ["bar", "baz"], StringType.Hex);
    }
}

@suite class Id3v2_UserInformationFrame_PropertyTests {
    @params(undefined, "undefined")
    @params(null, "null")
    @params("", "empty_string")
    @params("fux", "truthy")
    public setDescription_values(value: string) {
        // Arrange
        const frame = UserTextInformationFrame.fromFields("foo", ["bar"]);

        // Act
        frame.description = value;

        // Assert
        assert.strictEqual(frame.description, value);
        assert.deepStrictEqual(frame.text, ["bar"]);
    }

    @params(undefined, "undefined")
    @params(null, "null")
    @params([], "empty_array")
    @params(["bux"], "truthy")
    public setText_values(value: string[]) {
        // Arrange
        const frame = UserTextInformationFrame.fromFields("foo");

        // Act
        frame.text = value;

        // Assert
        assert.strictEqual(frame.description, "foo");
        assert.deepStrictEqual(frame.text, value ?? []);
    }

    @test
    public setEncoding() {
        // Arrange
        const frame = UserTextInformationFrame.fromFields("foo");

        // Act
        frame.textEncoding = StringType.UTF8;

        // Assert
        assert.strictEqual(frame.textEncoding, StringType.UTF8);
    }
}

@suite class Id3v2_UserTextInformationFrame_MethodTests {
    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: UserTextInformationFrame[]) => { UserTextInformationFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = UserTextInformationFrame.filterFrames(frames);

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
        const result = UserTextInformationFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = UserTextInformationFrame.fromFields("foo");
        const frames = [frame1, frame2];

        // Act
        const result = UserTextInformationFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = UserTextInformationFrame.fromFields("foo");
        const frame3 = UserTextInformationFrame.fromFields("bar");

        const frames = [frame1, frame2, frame3];

        // Act
        const result = UserTextInformationFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = UserTextInformationFrame.fromFields("foo");
        const frame2 = UserTextInformationFrame.fromFields("bar");
        const frames = [frame1, frame2];

        // Act
        const result = UserTextInformationFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @test
    public clone_returnsCopy() {
        // Arrange
        const frame = UserTextInformationFrame.fromFields("foo", ["bar", "baz"], StringType.Hex);

        // Act
        const output = <UserTextInformationFrame> frame.clone();

        // Assert
        assertFrame(output, frame.description, frame.text, frame.textEncoding);
    }

    @test
    public render_usesDescriptionAndTextFields() {
        // Arrange
        const frame = UserTextInformationFrame.fromFields("foo", ["bar", "baz"], StringType.Latin1);

        // Act
        const result = frame.render(Id3v2Version.V24);

        // Assert
        assert.isOk(result);

        const expected = ByteVector.concatenate(
            FrameIdentifiers.TXXX.render(Id3v2Version.V24),
            ByteVector.fromUint(12),
            ByteVector.fromUshort(FrameFlags.None),
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
    public render_withoutDescriptionWithoutText() {
        // Arrange
        const frame = UserTextInformationFrame.fromFields(undefined, undefined, StringType.Latin1);

        // Act
        const result = frame.render(Id3v2Version.V24);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.length, 0);
    }

    @test
    public render_withoutDescriptionWithText() {
        // Arrange
        const frame = UserTextInformationFrame.fromFields(undefined, ["foo"], StringType.Latin1);

        // Act
        const result = frame.render(Id3v2Version.V24);

        // Assert
        assert.isOk(result);

        const expected = ByteVector.concatenate(
            FrameIdentifiers.TXXX.render(Id3v2Version.V24),
            ByteVector.fromUint(5),
            ByteVector.fromUshort(FrameFlags.None),
            StringType.Latin1,
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("foo", StringType.Latin1)
        );
        Testers.bvEqual(result, expected);
    }

    @test
    public render_withDescriptionWithoutText() {
        // Arrange
        const frame = UserTextInformationFrame.fromFields("foo", undefined, StringType.Latin1);

        // Act
        const result = frame.render(Id3v2Version.V24);

        // Assert
        assert.isOk(result);

        const expected = ByteVector.concatenate(
            FrameIdentifiers.TXXX.render(Id3v2Version.V24),
            ByteVector.fromUint(5),
            ByteVector.fromUshort(FrameFlags.None),
            StringType.Latin1,
            ByteVector.fromString("foo", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1)
        );
        Testers.bvEqual(result, expected);
    }

    @test
    public render_withDescriptionWithText_twoByteEncoding() {
        // Arrange
        const frame = UserTextInformationFrame.fromFields("foo", ["bar"], StringType.UTF16LE);
        frame.text = ["bar"];

        // Act
        const result = frame.render(Id3v2Version.V24);

        // Assert
        assert.isOk(result);

        const expected = ByteVector.concatenate(
            FrameIdentifiers.TXXX.render(Id3v2Version.V24),
            ByteVector.fromUint(15),
            ByteVector.fromUshort(FrameFlags.None),
            StringType.UTF16LE,
            ByteVector.fromString("foo", StringType.UTF16LE),
            ByteVector.getTextDelimiter(StringType.UTF16LE),
            ByteVector.fromString("bar", StringType.UTF16LE)
        );
        Testers.bvEqual(result, expected);
    }

    @params(["", [] as string[]], "empty_string")
    @params(["foo", [] as string[]], "foo_empty_text")
    @params(["", ["foo"]], "empty_string_foo")
    @params(["foo", ["bar"]], "foo_bar")
    public toString_returnsText([description, text]: [string, string[]]) {
        // Arrange
        const frame = UserTextInformationFrame.fromFields(description, text);

        // Act
        const result = frame.toString();

        // Assert
        assert.strictEqual(result, `[${description}] ${text.join("; ")}`);
    }
}
