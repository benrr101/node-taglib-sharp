import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import {UserTextInformationFrame} from "../../src/id3v2/frames/textInformationFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const getTestFrame = (): UserTextInformationFrame => {
    const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX);
    header.frameSize = 8;
    const data = ByteVector.concatenate(
        header.render(4),
        StringType.Latin1,
        ByteVector.fromString("foo", StringType.UTF8),
        ByteVector.getTextDelimiter(StringType.Latin1),
        ByteVector.fromString("bar", StringType.UTF8)
    );

    return UserTextInformationFrame.fromRawData(data, 4);
}

@suite class Id3v2_UserInformationFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return UserTextInformationFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return UserTextInformationFrame.fromRawData;
    }

    @test
    public fromDescription_noEncoding_returnsFrameWithDefaultEncoding() {
        // Act
        const frame = UserTextInformationFrame.fromDescription("foo");

        // Assert
        Id3v2_UserInformationFrame_ConstructorTests.assertFrame(frame, "foo", [], Id3v2Settings.defaultEncoding);
    }

    @test
    public fromDescription_withEncoding_returnsFrameWithProvidedEncoding() {
        // Act
        const frame = UserTextInformationFrame.fromDescription("foo", StringType.UTF16);

        // Assert
        Id3v2_UserInformationFrame_ConstructorTests.assertFrame(frame, "foo", [], StringType.UTF16);
    }

    @test
    public fromOffsetRawData_returnsFrame() {
        // Assert
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.Latin1,
            ByteVector.fromString("foo", StringType.UTF8),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar", StringType.UTF8)
        );

        // Act
        const frame = UserTextInformationFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        Id3v2_UserInformationFrame_ConstructorTests.assertFrame(frame, "foo", ["bar"], StringType.Latin1);
    }

    @test
    public fromRawData_returnsFrame() {
        // Assert
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("foo", StringType.UTF8),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar", StringType.UTF8)
        );

        // Act
        const frame = UserTextInformationFrame.fromRawData(data, 4);

        // Assert
        Id3v2_UserInformationFrame_ConstructorTests.assertFrame(frame, "foo", ["bar"], StringType.Latin1);
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
}
