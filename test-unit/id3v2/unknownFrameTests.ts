import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import CommentsFrame from "../../src/id3v2/frames/commentsFrame";
import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const assertFrame = (frame: UnknownFrame, fi: FrameIdentifier, d: ByteVector) => {
    assert.ok(frame);
    assert.instanceOf<UnknownFrame>(frame, UnknownFrame);
    assert.strictEqual(frame.frameId, fi);

    if (d !== undefined) {
        Testers.bvEqual(frame.data, d);
    } else {
        assert.isUndefined(frame.data);
    }
}

@suite class Id3v2_UnknownFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return UnknownFrame.fromFieldBytes;
    }

    @test
    public fromData_falsyType_throws() {
        // Act/Assert
        Testers.testTruthy((v: FrameIdentifier) => { UnknownFrame.fromData(v, undefined); });
    }

    @params(undefined, "undefined")
    @params(null, "null")
    public fromData_falsyData_frameHasNoData(value: ByteVector) {
        // Arrange
        const frameType = FrameIdentifiers.WXXX;

        // Act
        const frame = UnknownFrame.fromData(frameType, value);

        // Assert
        assertFrame(frame, FrameIdentifiers.WXXX, undefined);
    }

    @test
    public fromData_withData_frameHasData() {
        // Arrange
        const frameType = FrameIdentifiers.WXXX;
        const data = ByteVector.fromString("fux qux quxx", StringType.UTF8);

        // Act
        const frame = UnknownFrame.fromData(frameType, data);

        // Assert
        assertFrame(frame, FrameIdentifiers.WXXX, data);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_validParams_returnsFrame(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromString("foo bar baz", StringType.UTF8);
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnknownFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, FrameIdentifiers.WXXX, ByteVector.fromString("foo bar baz", StringType.UTF8));
    }
}

@suite class Id3v2_UnknownFrame_MethodTests {
    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public clone_returnsCopy(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromString("foo bar baz", StringType.UTF8);
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX, Id3v2FrameFlags.None, fieldBytes.length);
        const frame = UnknownFrame.fromFieldBytes(header, fieldBytes, version);

        // Act
        const result = <UnknownFrame> frame.clone();

        // Assert
        assertFrame(result, result.frameId, result.data);
    }

    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: UnknownFrame[]) => { UnknownFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = UnknownFrame.filterFrames(frames);

        // Assert
        assert.isArray(output);
        assert.isEmpty(output);
    }

    @test
    public filterFrames_noMatch() {
        // Arrange
        const frame1 = CommentsFrame.fromDescription("foo");
        const frame2 = CommentsFrame.fromDescription("foo");
        const frames = [frame1, frame2];

        // Act
        const result = UnknownFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = CommentsFrame.fromDescription("foo");
        const frames = [frame1, frame2];

        // Act
        const result = UnknownFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame3 = CommentsFrame.fromDescription("foo");

        const frames = [frame1, frame2, frame3];

        // Act
        const result = UnknownFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frames = [frame1, frame2];

        // Act
        const result = UnknownFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_returnsByteVector(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromString("foo bar baz", StringType.UTF8);
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX, Id3v2FrameFlags.None, fieldBytes.length);
        const frame = UnknownFrame.fromFieldBytes(header, fieldBytes, version);

        // Act
        const result = frame.render(version);

        // Assert
        assert.ok(result);

        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(result, expected);
    }
}
