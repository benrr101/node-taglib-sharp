import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import UserTextInformationFrame from "../../src/id3v2/frames/userTextInformationFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const getTestFrame = (): UserTextInformationFrame => {
    const frame = UserTextInformationFrame.fromDescription("foo", StringType.Latin1);
    frame.text = ["bar"];
    return frame;
}

@suite class Id3v2_UserInformationFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return UserTextInformationFrame.fromFieldBytes;
    }

    @params(undefined, "undefined")
    @params(null, "null")
    @params("", "empty_string")
    @params("foo", "truthy")
    public fromDescription_withoutEncoding(description: string) {
        // Act
        const frame = UserTextInformationFrame.fromDescription(description);

        // Assert
        Id3v2_UserInformationFrame_ConstructorTests.assertFrame(frame, description, [], Id3v2Settings.defaultEncoding);
    }

    @params(undefined, "undefined")
    @params(null, "null")
    @params("", "empty_string")
    @params("foo", "truthy")
    public fromDescription_withEncoding(description: string) {
        // Act
        const frame = UserTextInformationFrame.fromDescription(description, StringType.UTF16BE);

        // Assert
        Id3v2_UserInformationFrame_ConstructorTests.assertFrame(frame, description, [], StringType.UTF16BE);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_emptyFrame_throw(version: number) {
        // Arrange
        const fieldBytes = ByteVector.empty();
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => UserTextInformationFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_encodingOnly(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromByte(StringType.UTF16LE);
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UserTextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assert.isOk(frame);
        assert.strictEqual(frame.description, "");
        assert.strictEqual(frame.frameId, FrameIdentifiers.TXXX);
        assert.deepEqual(frame.text, []);
        assert.strictEqual(frame.textEncoding, StringType.UTF16LE);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_illFormedOneField(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.fromString("foo", StringType.UTF16BE)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const output = UserTextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assert.isOk(output);
        assert.equal(output.frameClassType, FrameClassType.UserTextInformationFrame);
        assert.strictEqual(output.frameId, FrameIdentifiers.TXXX);

        assert.strictEqual(output.description, "");
        assert.deepEqual(output.text, ["foo"])
        assert.strictEqual(output.textEncoding, StringType.UTF16BE);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_illFormedThreeFields(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.fromString("foo", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("bar", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("baz", StringType.UTF16BE),
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const output = UserTextInformationFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assert.isOk(output);
        assert.equal(output.frameClassType, FrameClassType.UserTextInformationFrame);
        assert.strictEqual(output.frameId, FrameIdentifiers.TXXX);

        assert.strictEqual(output.description, "foo");
        assert.deepEqual(output.text, ["bar", "baz"])
        assert.strictEqual(output.textEncoding, StringType.UTF16BE);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_wellFormed(version: number) {
        // Assert
        const fieldData = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("foo", StringType.UTF8),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar", StringType.UTF8)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.None, fieldData.length);

        // Act
        const frame = UserTextInformationFrame.fromFieldBytes(header, fieldData, version);

        // Assert
        Id3v2_UserInformationFrame_ConstructorTests.assertFrame(frame, "foo", ["bar"], StringType.Latin1);
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
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const output = UserTextInformationFrame.fromFieldBytes(header, fieldBytes, 4);

        // Assert
        assert.isOk(output);
        assert.equal(output.frameClassType, FrameClassType.UserTextInformationFrame);
        assert.strictEqual(output.frameId, FrameIdentifiers.TXXX);

        assert.strictEqual(output.description, "foo");
        assert.deepEqual(output.text, ["bar"])
        assert.strictEqual(output.textEncoding, encoding);
    }

    private static assertFrame(
        frame: UserTextInformationFrame,
        description: string,
        text: string[],
        encoding: StringType
    ) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UserTextInformationFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.TXXX);

        assert.isOk(frame.text);
        assert.strictEqual(frame.description, description);
        assert.deepStrictEqual(frame.text, text);
        assert.strictEqual(frame.textEncoding, encoding);
    }
}

@suite class Id3v2_UserInformationFrame_PropertyTests {
    @test
    public setDescription() {
        // Arrange
        const frame = getTestFrame();

        // Act
        frame.description = "fux";

        // Assert
        assert.strictEqual(frame.description, "fux");
        assert.deepStrictEqual(frame.text, ["bar"]);
    }

    @params(undefined, "undefined")
    @params(null, "null")
    @params("", "empty_string")
    @params("fux", "truthy")
    public setDescription_values(value: string) {
        // Arrange
        const frame = UserTextInformationFrame.fromDescription("foo");
        frame.text = ["bar"];

        // Act
        frame.description = value;

        // Assert
        assert.strictEqual(frame.description, value);
        assert.deepStrictEqual(frame.text, ["bar"]);
    }

    @test
    public getText() {
        // Arrange
        const frame = getTestFrame();

        // Act
        const text = frame.text;
        text.push("fux");

        // Assert - new item was not added to frame
        assert.notEqual(frame.text, text);
        assert.strictEqual(1, frame.text.length);
    }

    @test
    public setText() {
        // Arrange
        const frame = getTestFrame();

        // Act
        frame.text = ["bux", "qux"];

        // Assert
        assert.strictEqual(frame.description, "foo");
        assert.deepStrictEqual(frame.text, ["bux", "qux"]);
    }

    @params(undefined, "undefined")
    @params(null, "null")
    @params([], "empty_array")
    @params(["bux"], "truthy")
    public setText_values(value: string[]) {
        // Arrange
        const frame = UserTextInformationFrame.fromDescription("foo");

        // Act
        frame.text = value;

        // Assert
        assert.strictEqual(frame.description, "foo");
        assert.deepStrictEqual(frame.text, value ?? []);
    }

    @test
    public setEncoding() {
        // Arrange
        const frame = UserTextInformationFrame.fromDescription("foo");

        // Act
        frame.textEncoding = StringType.UTF8;

        // Assert
        assert.strictEqual(frame.textEncoding, StringType.UTF8);
    }
}

@suite class Id3v2_UserTextInformationFrame_MethodTests {
    @test
    public findUserTextInformationFrame_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: UserTextInformationFrame[]) => {
            UserTextInformationFrame.findUserTextInformationFrame(v, "foo");
        });
    }

    @test
    public findUserTextInformationFrame_falsyDescription() {
        // Arrange
        const frames = [UserTextInformationFrame.fromDescription("foo")];

        // Act/Assert
        Testers.testTruthy((v: string) => { UserTextInformationFrame.findUserTextInformationFrame(frames, v); });
    }

    @test
    public findUserTextInformationFrame_emptyFrames_returnsUndefined() {
        // Arrange
        const frames: UserTextInformationFrame[] = [];

        // Act
        const output = UserTextInformationFrame.findUserTextInformationFrame(frames, "foo");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public findUserTextInformationFrame_frameWithCaseSensitiveDescriptionDoesNotExist() {
        // Arrange
        const frames = [
            UserTextInformationFrame.fromDescription("fUX"),
            UserTextInformationFrame.fromDescription("bUX")
        ];

        // Act
        const output = UserTextInformationFrame.findUserTextInformationFrame(frames, "fux");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public findUserTextInformationFrame_frameWithCaseInsensitiveDescriptionDoesNotExist() {
        // Arrange
        const frames = [
            UserTextInformationFrame.fromDescription("fUX"),
            UserTextInformationFrame.fromDescription("bUX")
        ];

        // Act
        const output = UserTextInformationFrame.findUserTextInformationFrame(frames, "qux", false);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public findUserTextInformationFrame_frameWithCaseSensitiveDescriptionExists() {
        // Arrange
        const frames = [
            UserTextInformationFrame.fromDescription("Fux"),
            UserTextInformationFrame.fromDescription("bUX")
        ];

        // Act
        const output = UserTextInformationFrame.findUserTextInformationFrame(frames, "Fux");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[0]);
    }

    @test
    public findUserTextInformationFrame_frameWithCaseInsensitiveDescriptionExists() {
        // Arrange
        const frames = [
            UserTextInformationFrame.fromDescription("fUX"),
            UserTextInformationFrame.fromDescription("bUX")
        ];

        // Act
        const output = UserTextInformationFrame.findUserTextInformationFrame(frames, "fux", false);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[0]);
    }

    @test
    public findUserTextInformationFrame_match_returnsFirstMatch() {
        // Arrange
        const frame1 = UserTextInformationFrame.fromDescription("foo");
        const frame2 = UserTextInformationFrame.fromDescription("foo");
        const frames = [frame1, frame2];

        // Act
        const output = UserTextInformationFrame.findUserTextInformationFrame(frames, "foo");

        // Assert
        assert.strictEqual(output, frame1);
    }

    @test
    public clone_returnsCopy() {
        // Arrange
        const frame = getTestFrame();

        // Act
        const output = <UserTextInformationFrame> frame.clone();

        // Assert
        assert.ok(output);
        assert.strictEqual(output.frameClassType, FrameClassType.UserTextInformationFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.TXXX);

        assert.strictEqual(frame.description, output.description);
        assert.deepStrictEqual(frame.text, output.text);
        assert.strictEqual(frame.textEncoding, output.textEncoding);
    }

    @test
    public render_usesDescriptionAndTextFields() {
        // Arrange
        const frame = UserTextInformationFrame.fromDescription("foo", StringType.Latin1);
        frame.text = ["bar", "baz"];

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expected = ByteVector.concatenate(
            FrameIdentifiers.TXXX.render(4),
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
    public render_withoutDescriptionWithoutText() {
        // Arrange
        const frame = UserTextInformationFrame.fromDescription(undefined, StringType.Latin1);

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.length, 0);
    }

    @test
    public render_withoutDescriptionWithText() {
        // Arrange
        const frame = UserTextInformationFrame.fromDescription(undefined, StringType.Latin1);
        frame.text = ["foo"];

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expected = ByteVector.concatenate(
            FrameIdentifiers.TXXX.render(4),
            ByteVector.fromUint(5),
            ByteVector.fromUshort(Id3v2FrameFlags.None),
            StringType.Latin1,
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("foo", StringType.Latin1)
        );
        Testers.bvEqual(result, expected);
    }

    @test
    public render_withDescriptionWithoutText() {
        // Arrange
        const frame = UserTextInformationFrame.fromDescription("foo", StringType.Latin1);

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expected = ByteVector.concatenate(
            FrameIdentifiers.TXXX.render(4),
            ByteVector.fromUint(5),
            ByteVector.fromUshort(Id3v2FrameFlags.None),
            StringType.Latin1,
            ByteVector.fromString("foo", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1)
        );
        Testers.bvEqual(result, expected);
    }

    @test
    public render_withDescriptionWithText_twoByteEncoding() {
        // Arrange
        const frame = UserTextInformationFrame.fromDescription("foo", StringType.UTF16LE);
        frame.text = ["bar"];

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expected = ByteVector.concatenate(
            FrameIdentifiers.TXXX.render(4),
            ByteVector.fromUint(15),
            ByteVector.fromUshort(Id3v2FrameFlags.None),
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
        const frame = UserTextInformationFrame.fromDescription(description);
        frame.text = text;

        // Act
        const result = frame.toString();

        // Assert
        assert.strictEqual(result, `[${description}] ${text.join("; ")}`);
    }
}
