import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";
import {UserUrlLinkFrame} from "../../src/id3v2/frames/urlLinkFrame";

const getTestFrameData = (): ByteVector => {
    const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX);
    header.frameSize = 12;

    return ByteVector.concatenate(
        header.render(4),
        StringType.UTF16BE,
        ByteVector.fromString("foo", StringType.UTF16BE),
        ByteVector.getTextDelimiter(StringType.UTF16BE),
        ByteVector.fromString("bar", StringType.Latin1)
    );
};

const getTestUserUrlLinkFrame = (): UserUrlLinkFrame => {
    const frameData = getTestFrameData();
    return UserUrlLinkFrame.fromRawData(frameData, 4);
};

@suite class Id3v2_UserUrlLinkFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return UserUrlLinkFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return UserUrlLinkFrame.fromRawData;
    }

    @test
    public fromOffsetRawData_userFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            0x00, 0x00,
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("foo", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar", StringType.Latin1)
        );

        // Act
        const output = UserUrlLinkFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        assert.ok(output);
        assert.equal(output.frameClassType, FrameClassType.UserUrlLinkFrame);
        assert.strictEqual(output.frameId, FrameIdentifiers.WXXX);

        assert.strictEqual(output.description, "foo");
        assert.deepEqual(output.text, ["bar"]);
        assert.equal(output.textEncoding, StringType.Latin1);
    }

    @test
    public fromRawData_userFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("foo", StringType.Latin1),   // - String 1
            ByteVector.getTextDelimiter(StringType.Latin1),         // - String separator
            ByteVector.fromString("bar", StringType.Latin1)    // - String 2
        );

        // Act
        const output = UserUrlLinkFrame.fromRawData(data, 4);

        // Assert
        assert.ok(output);
        assert.equal(output.frameClassType, FrameClassType.UserUrlLinkFrame);
        assert.strictEqual(output.frameId, FrameIdentifiers.WXXX);

        assert.strictEqual(output.description, "foo");
        assert.deepEqual(output.text, ["bar"]);
        assert.equal(output.textEncoding, StringType.Latin1);
    }
}

@suite class Id3v2_UserUrlLinkFrame_PropertyTests {
    @test
    public getDescription_emptyText_returnsUndefined() {
        // Arrange
        const data = new Id3v2FrameHeader(FrameIdentifiers.WXXX).render(4);
        const frame = UserUrlLinkFrame.fromRawData(data, 4);

        // Act
        const result = frame.description;

        // Assert
        assert.isUndefined(result);
    }

    @test
    public setDescription_existingDescription_undefined() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        frame.description = undefined;

        // Assert
        assert.isUndefined(frame.description);
        assert.deepEqual(frame.text, ["bar"]);
    }

    @test
    public setDescription_existingDescription_null() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        frame.description = null;

        // Assert
        assert.isUndefined(frame.description);
        assert.deepEqual(frame.text, ["bar"]);
    }

    @test
    public setDescription_existingDescription_value() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        frame.description = "fux";

        // Assert
        assert.strictEqual(frame.description, "fux");
        assert.deepEqual(frame.text, ["bar"]);
    }

    @test
    public setDescription_noDescription_value() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX);
        header.frameSize = 0;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,                 // - Frame flags
        );
        const frame = UserUrlLinkFrame.fromRawData(data, 4);

        // Act
        frame.description = "fux";

        // Assert
        assert.strictEqual(frame.description, "fux");
        assert.deepEqual(frame.text, []);
    }

    @test
    public getText_outputIsClone() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        const text = frame.text;
        text.push("baz");

        // Assert
        assert.strictEqual(frame.description, "foo");
        assert.deepEqual(frame.text, ["bar"]);
    }

    @test
    public setText_undefined() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        frame.text = undefined;

        // Assert
        assert.strictEqual(frame.description, "foo");
        assert.deepEqual(frame.text, []);
    }

    @test
    public setText_null() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        frame.text = null;

        // Assert
        assert.strictEqual(frame.description, "foo");
        assert.deepEqual(frame.text, []);
    }

    @test
    public setText_values() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();
        const values = ["fux", "qux"];

        // Act
        frame.text = values;

        // Assert
        assert.strictEqual(frame.description, "foo");
        assert.deepEqual(frame.text, values);

        // -- Ensure values are cloned
        // Act 2
        values.push("bux");

        // Assert 2
        assert.strictEqual(frame.description, "foo");
        assert.deepEqual(frame.text, ["fux", "qux"]);
    }

    @test
    public setEncoding() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

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
        const frames = [getTestUserUrlLinkFrame()];

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
        const frames = [getTestUserUrlLinkFrame(), getTestUserUrlLinkFrame()];

        // Act
        const result = UserUrlLinkFrame.findUserUrlLinkFrame(frames, "bar");

        // Assert
        assert.isUndefined(result);
    }

    @test
    public findUserUrlLinkFrame_match_returnsFirstMatch() {
        // Arrange
        const frame1 = getTestUserUrlLinkFrame();
        const frame2 = getTestUserUrlLinkFrame();
        const frames = [frame1, frame2];

        // Act
        const result = UserUrlLinkFrame.findUserUrlLinkFrame(frames, "foo");

        // Assert
        assert.equal(result, frame1);
    }

    @test
    public clone_withRawData_returnsCloneUsingRawData() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        const result = frame.clone();

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.frameId, frame.frameId);
        assert.strictEqual(result.description, frame.description);
        assert.deepEqual(result.text, frame.text);
        assert.deepEqual(result.textEncoding, frame.textEncoding);
    }

    @test
    public clone_withoutRawData_returnsClone() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();
        // noinspection JSUnusedLocalSymbols Forces a read of the raw data
        const _ = frame.text;

        // Act
        const result = frame.clone();

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.frameId, frame.frameId);
        assert.strictEqual(result.description, frame.description);
        assert.deepEqual(result.text, frame.text);
        assert.strictEqual(result.textEncoding, frame.textEncoding);
    }

    @test
    public render_returnsByteVector() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);
        Testers.bvEqual(result, getTestFrameData());
    }
}
