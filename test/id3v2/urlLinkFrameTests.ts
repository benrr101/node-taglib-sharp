import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameTypes from "../../src/id3v2/frameTypes";
import TestConstants from "../testConstants";
import {ByteVector, StringType} from "../../src/byteVector";
import {FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {UrlLinkFrame} from "../../src/id3v2/frames/urlLinkFrame";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

const getTestFrameData = (): ByteVector => {
    const header = new Id3v2FrameHeader(FrameTypes.WXXX, 4);
    header.frameSize = 7;

    return ByteVector.concatenate(
        header.render(4),
        ByteVector.fromString("foo", StringType.Latin1, undefined, true),
        ByteVector.getTextDelimiter(StringType.Latin1),
        ByteVector.fromString("bar", StringType.Latin1, undefined, true)
    );
};

const getTestUrlLinkFrame = (): UrlLinkFrame => {
    const frameData = getTestFrameData();
    return UrlLinkFrame.fromRawData(frameData, 4);
};

@suite(timeout(3000), slow(1000))
class UrlLinkFrameConstructorTests {
    @test
    public fromIdentity_falsyIdentity() {
        // Act/Assert
        assert.throws(() => { UrlLinkFrame.fromIdentity(null); });
        assert.throws(() => { UrlLinkFrame.fromIdentity(undefined); });
    }

    @test
    public fromIdentity_validIdentity() {
        // Act
        const output = UrlLinkFrame.fromIdentity(FrameTypes.WCOM);

        // Assert
        assert.ok(output);
        assert.equal(output.frameClassType, FrameClassType.UrlLinkFrame);

        assert.equal(output.encryptionId, -1);
        assert.equal(output.flags, Id3v2FrameFlags.None);
        assert.isTrue(ByteVector.equal(output.frameId, FrameTypes.WCOM));
        assert.equal(output.groupId, -1);
        assert.equal(output.size, 0);

        assert.deepEqual(output.text, []);
        assert.equal(output.textEncoding, StringType.Latin1);
    }

    @test
    public fromOffsetRawData_falsyData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WCOM, 4);

        // Act/Assert
        assert.throws(() => { UrlLinkFrame.fromOffsetRawData(null, 2, header); });
        assert.throws(() => { UrlLinkFrame.fromOffsetRawData(undefined, 2, header); });
    }

    @test
    public fromOffsetRawData_invalidVersion() {
        // Arrange
        const data = ByteVector.empty();
        const header = new Id3v2FrameHeader(FrameTypes.WCOM, 4);

        // Act/Assert
        assert.throws(() => { UrlLinkFrame.fromOffsetRawData(data, -1, header); });
        assert.throws(() => { UrlLinkFrame.fromOffsetRawData(data, 1.5, header); });
        assert.throws(() => { UrlLinkFrame.fromOffsetRawData(data, 0x100, header); });
    }

    @test
    public fromOffsetRawData_falsyHeader() {
        // Arrange
        const data = ByteVector.empty();

        // Act/Assert
        assert.throws(() => { UrlLinkFrame.fromOffsetRawData(data, 2, undefined); });
        assert.throws(() => { UrlLinkFrame.fromOffsetRawData(data, 2, null); });
    }

    @test
    public fromOffsetRawData_notUserFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WCOM, 4);
        header.frameSize = TestConstants.syncedUint;

        // Offset bytes
        // Header
        // Data
        // Some null bytes to trigger null cleanup
        const data = ByteVector.concatenate(
            0x00, 0x00,
            header.render(4),
            ByteVector.fromString("foobar", StringType.Latin1, undefined, true),
            0x00, 0x00
        );

        // Act
        const output = UrlLinkFrame.fromOffsetRawData(data, 2, header);

        // Assert
        assert.ok(output);
        assert.equal(output.frameClassType, FrameClassType.UrlLinkFrame);

        assert.equal(output.encryptionId, -1);
        assert.equal(output.flags, Id3v2FrameFlags.None);
        assert.isTrue(ByteVector.equal(output.frameId, FrameTypes.WCOM));
        assert.equal(output.groupId, -1);
        assert.equal(output.size, TestConstants.syncedUint);

        assert.deepEqual(output.text, ["foobar"]);
        assert.equal(output.textEncoding, StringType.Latin1);
    }

    @test
    public fromOffsetRawData_userFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WXXX, 4);
        header.frameSize = TestConstants.syncedUint;

        // Offset bytes
        // Header
        // Data (2x strings w/divider)
        const data = ByteVector.concatenate(
            0x00, 0x00,
            header.render(4),
            ByteVector.fromString("foo", StringType.Latin1, undefined, true),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar", StringType.Latin1, undefined, true)
        );

        // Act
        const output = UrlLinkFrame.fromOffsetRawData(data, 2, header);

        // Assert
        assert.ok(output);
        assert.equal(output.frameClassType, FrameClassType.UrlLinkFrame);

        assert.equal(output.encryptionId, -1);
        assert.equal(output.flags, Id3v2FrameFlags.None);
        assert.isTrue(ByteVector.equal(output.frameId, FrameTypes.WXXX));
        assert.equal(output.groupId, -1);
        assert.equal(output.size, TestConstants.syncedUint);

        assert.deepEqual(output.text, ["foo", "bar"]);
        assert.equal(output.textEncoding, StringType.Latin1);
    }

    @test
    public fromRawData_falsyData() {
        // Act/Assert
        assert.throws(() => { UrlLinkFrame.fromRawData(null, 2); });
        assert.throws(() => { UrlLinkFrame.fromRawData(undefined, 2); });
    }

    @test
    public fromRawData_invalidVersion() {
        // Arrange
        const data = ByteVector.empty();

        // Act/Assert
        assert.throws(() => { UrlLinkFrame.fromRawData(data, -1); });
        assert.throws(() => { UrlLinkFrame.fromRawData(data, 1.5); });
        assert.throws(() => { UrlLinkFrame.fromRawData(data, 0x100); });
    }

    @test
    public fromRawData_notUserFrame() {
        // Arrange
        const data = ByteVector.concatenate(
            FrameTypes.WCOM,                                                        // - Frame ID
            TestConstants.syncedUintBytes,                                          // - Frame size
            0x00, 0x00,                                                             // - Frame Flags
            ByteVector.fromString("foobar", StringType.Latin1, undefined, true),    // - Data
            0x00, 0x00                                                              // - null bytes to test end byte
                                                                                    //   cleanup
        );

        // Act
        const output = UrlLinkFrame.fromRawData(data, 4);

        // Assert
        assert.ok(output);
        assert.equal(output.frameClassType, FrameClassType.UrlLinkFrame);

        assert.equal(output.encryptionId, -1);
        assert.equal(output.flags, Id3v2FrameFlags.None);
        assert.isTrue(ByteVector.equal(output.frameId, FrameTypes.WCOM));
        assert.equal(output.groupId, -1);
        assert.equal(output.size, TestConstants.syncedUint);

        assert.deepEqual(output.text, ["foobar"]);
        assert.equal(output.textEncoding, StringType.Latin1);
    }

    @test
    public fromRawData_userFrame() {
        // Arrange
        const data = ByteVector.concatenate(
            FrameTypes.WXXX,                                                    // - Frame ID
            TestConstants.syncedUintBytes,                                      // - Frame size
            0x00, 0x00,                                                         // - Frame flags
            ByteVector.fromString("foo", StringType.Latin1, undefined, true),   // - String 1
            ByteVector.getTextDelimiter(StringType.Latin1),                     // - String separator
            ByteVector.fromString("bar", StringType.Latin1, undefined, true)    // - String 2
        );

        // Act
        const output = UrlLinkFrame.fromRawData(data, 4);

        // Assert
        assert.ok(output);
        assert.equal(output.frameClassType, FrameClassType.UrlLinkFrame);

        assert.equal(output.encryptionId, -1);
        assert.equal(output.flags, Id3v2FrameFlags.None);
        assert.isTrue(ByteVector.equal(output.frameId, FrameTypes.WXXX));
        assert.equal(output.groupId, -1);
        assert.equal(output.size, TestConstants.syncedUint);

        assert.deepEqual(output.text, ["foo", "bar"]);
        assert.equal(output.textEncoding, StringType.Latin1);
    }
}

@suite(timeout(3000), slow(1000))
class UrlLinkFramePropertyTests {
    @test
    public getText_outputIsClone() {
        // Arrange
        const frame = getTestUrlLinkFrame();

        // Act
        const text = frame.text;
        text.push("baz");

        // Assert
        assert.deepEqual(frame.text, ["foo", "bar"]);
    }

    @test
    public setText_undefined() {
        // Arrange
        const frame = getTestUrlLinkFrame();

        // Act
        frame.text = undefined;

        // Assert
        assert.deepEqual(frame.text, []);
    }

    @test
    public setText_null() {
        // Arrange
        const frame = getTestUrlLinkFrame();

        // Act
        frame.text = null;

        // Assert
        assert.deepEqual(frame.text, []);
    }

    @test
    public setText_values() {
        // Arrange
        const frame = getTestUrlLinkFrame();
        const values = ["fux", "qux"];

        // Act
        frame.text = values;

        // Assert
        assert.deepEqual(frame.text, values);

        // -- Ensure values are cloned
        // Act 2
        values.push("bux");

        // Assert 2
        assert.deepEqual(frame.text, ["fux", "qux"]);
    }

    @test
    public setEncoding() {
        // Arrange
        const frame = getTestUrlLinkFrame();

        // Act
        frame.textEncoding = StringType.UTF8;

        // Assert
        assert.equal(frame.textEncoding, StringType.UTF8);
    }
}

@suite(timeout(3000), slow(1000))
class UrlLinkMethodTests {
    @test
    public findUrlLinkFrame_falsyFrames_throws(): void {
        // Act/Assert
        assert.throws(() => { UrlLinkFrame.findUrlLinkFrame(null, FrameTypes.WCOM); });
        assert.throws(() => { UrlLinkFrame.findUrlLinkFrame(undefined, FrameTypes.WCOM); });
    }

    @test
    public findUrlLinkFrame_falsyIdentity_throws(): void {
        // Arrange
        const frames = [getTestUrlLinkFrame()];

        // Act/Assert
        assert.throws(() => { UrlLinkFrame.findUrlLinkFrame(frames, null); });
        assert.throws(() => { UrlLinkFrame.findUrlLinkFrame(frames, undefined); });
    }

    @test
    public findUrlLinkFrame_invalidIdentity_throws() {
        // Arrange
        const frames = [getTestUrlLinkFrame()];

        // Act/Assert
        assert.throws(() => { UrlLinkFrame.findUrlLinkFrame(frames, ByteVector.empty()); });
        assert.throws(() => { UrlLinkFrame.findUrlLinkFrame(frames, ByteVector.fromSize(5)); });
    }

    @test
    public findUrlLinkFrame_emptyFrames_returnsUndefined() {
        // Arrange
        const frames: UrlLinkFrame[] = [];

        // Act
        const result = UrlLinkFrame.findUrlLinkFrame(frames, FrameTypes.WCOM);

        // Assert
        assert.isUndefined(result);
    }

    @test
    public findUrlLinkFrame_noMatch_returnsUndefined() {
        // Arrange
        const frames = [getTestUrlLinkFrame(), getTestUrlLinkFrame()]; // Type is WXXX

        // Act
        const result = UrlLinkFrame.findUrlLinkFrame(frames, FrameTypes.WCOM);

        // Assert
        assert.isUndefined(result);
    }

    @test
    public findUrlLinkFrame_match_returnsFirstMatch() {
        // Arrange
        const frame1 = getTestUrlLinkFrame();
        const frame2 = getTestUrlLinkFrame();
        const frames = [frame1, frame2];

        // Act
        const result = UrlLinkFrame.findUrlLinkFrame(frames, FrameTypes.WXXX);

        // Assert
        assert.equal(result, frame1);
    }

    @test
    public clone_withRawData_returnsCloneUsingRawData() {
        // Arrange
        const frame = getTestUrlLinkFrame();

        // Act
        const result = frame.clone();

        // Assert
        assert.isOk(result);
        assert.isTrue(ByteVector.equal(result.frameId, frame.frameId));
        assert.deepEqual(result.text, frame.text);
        assert.deepEqual(result.textEncoding, frame.textEncoding);
    }

    @test
    public clone_withoutRawData_returnsClone() {
        // Arrange
        const frame = getTestUrlLinkFrame();
        const text = frame.text;    // Force reading raw data, and trashing it

        // Act
        const result = frame.clone();

        // Assert
        assert.isOk(result);
        assert.isTrue(ByteVector.equal(result.frameId, frame.frameId));
        assert.deepEqual(result.text, frame.text);
        assert.deepEqual(result.textEncoding, frame.textEncoding);
    }

    @test
    public render_returnsByteVector() {
        // Arrange
        const frame = getTestUrlLinkFrame();

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);
        assert.isTrue(ByteVector.equal(result, getTestFrameData()));
    }
}
