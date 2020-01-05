import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameConstructorTests from "./frameConstructorTests";
import FrameTypes from "../../src/id3v2/frameTypes";
import Id3v2TagSettings from "../../src/id3v2/id3v2TagSettings";
import {UserTextInformationFrame} from "../../src/id3v2/frames/textInformationFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

function getTestFrame(): UserTextInformationFrame {
    const header = new Id3v2FrameHeader(FrameTypes.TXXX, 4);
    header.frameSize = 8;
    const data = ByteVector.concatenate(
        header.render(4),
        StringType.Latin1,
        ByteVector.fromString("foo"),
        ByteVector.getTextDelimiter(StringType.Latin1),
        ByteVector.fromString("bar")
    );

    return UserTextInformationFrame.fromRawData(data, 4);
}

@suite(timeout(3000), slow(1000))
class Id3v2_UserInformationFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader) => Frame {
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
        this.assertFrame(frame, "foo", [], Id3v2TagSettings.defaultEncoding);
    }

    @test
    public fromDescription_withEncoding_returnsFrameWithProvidedEncoding() {
        // Act
        const frame = UserTextInformationFrame.fromDescription("foo", StringType.UTF16);

        // Assert
        this.assertFrame(frame, "foo", [], StringType.UTF16);
    }

    @test
    public fromOffsetRawData_returnsFrame() {
        // Assert
        const header = new Id3v2FrameHeader(FrameTypes.TXXX, 4);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.Latin1,
            ByteVector.fromString("foo"),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar")
        );

        // Act
        const frame = UserTextInformationFrame.fromOffsetRawData(data, 2, header);

        // Assert
        this.assertFrame(frame, "foo", ["bar"], StringType.Latin1);
    }

    @test
    public fromRawData_returnsFrame() {
        // Assert
        const header = new Id3v2FrameHeader(FrameTypes.TXXX, 4);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("foo"),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar")
        );

        // Act
        const frame = UserTextInformationFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, "foo", ["bar"], StringType.Latin1);
    }

    private assertFrame(
        frame: UserTextInformationFrame,
        description: string,
        text: string[],
        encoding: StringType
    ) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UserTextInformationFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.TXXX));

        assert.isOk(frame.text);
        assert.strictEqual(frame.description, description);
        assert.deepStrictEqual(frame.text, text);
        assert.strictEqual(frame.textEncoding, encoding);
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_UserInformationFrame_PropertyTests {
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

@suite(timeout(3000), slow(1000))
class Id3v2_UserTextInformationFrame_MethodTests {
    @test
    public findUserTextInformationFrame_falsyFrames() {
        // Act/Assert
        assert.throws(() => { UserTextInformationFrame.findUserTextInformationFrame(undefined, "foo"); });
        assert.throws(() => { UserTextInformationFrame.findUserTextInformationFrame(null, "foo"); });
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
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.TXXX));

        assert.strictEqual(frame.description, output.description);
        assert.deepStrictEqual(frame.text, output.text);
        assert.strictEqual(frame.textEncoding, output.textEncoding);
    }
}
