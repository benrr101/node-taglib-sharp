import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import MusicCdIdentifierFrame from "../../src/id3v2/frames/musicCdIdentifierFrame";
import PropertyTests from "../utilities/propertyTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

@suite class Id3v2_MusicCdIdentifierFrameTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return MusicCdIdentifierFrame.fromFieldBytes;
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_validParams(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromString("foo bar baz", StringType.UTF8);
        const header = new Id3v2FrameHeader(FrameIdentifiers.MCDI, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = MusicCdIdentifierFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        Id3v2_MusicCdIdentifierFrameTests.assertFrame(frame, ByteVector.fromString("foo bar baz", StringType.Latin1));
    }

    @test
    public fromFields_noData() {
        // Act
        const frame = MusicCdIdentifierFrame.fromFields();

        // Assert
        Id3v2_MusicCdIdentifierFrameTests.assertFrame(frame, ByteVector.empty());
    }

    @test
    public fromFields_withData() {
        // Arrange
        const data = ByteVector.fromString("fux qux quxx", StringType.UTF8);

        // Act
        const frame = MusicCdIdentifierFrame.fromFields(data);

        // Assert
        Id3v2_MusicCdIdentifierFrameTests.assertFrame(frame, data);
    }

    @test
    public data() {
        // Arrange
        const value = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04]);
        const frame = MusicCdIdentifierFrame.fromFields(value);

        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => { frame.data = v; }, () => frame.data, value);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public clone_returnsCopy(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromString("foo bar baz", StringType.UTF8);
        const header = new Id3v2FrameHeader(FrameIdentifiers.MCDI, Id3v2FrameFlags.None, fieldBytes.length);
        const frame = MusicCdIdentifierFrame.fromFieldBytes(header, fieldBytes, version);

        // Act
        const result = frame.clone();

        // Assert
        Id3v2_MusicCdIdentifierFrameTests.assertFrame(result, frame.data);
    }

    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: MusicCdIdentifierFrame[]) => { MusicCdIdentifierFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = MusicCdIdentifierFrame.filterFrames(frames);

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
        const result = MusicCdIdentifierFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = MusicCdIdentifierFrame.fromFields(ByteVector.empty());
        const frames = [frame1, frame2];

        // Act
        const result = MusicCdIdentifierFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = MusicCdIdentifierFrame.fromFields(ByteVector.empty());
        const frame3 = MusicCdIdentifierFrame.fromFields(ByteVector.empty());

        const frames = [frame1, frame2, frame3];

        // Act
        const result = MusicCdIdentifierFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = MusicCdIdentifierFrame.fromFields(ByteVector.empty());
        const frame2 = MusicCdIdentifierFrame.fromFields(ByteVector.empty());
        const frames = [frame1, frame2];

        // Act
        const result = MusicCdIdentifierFrame.filterFrames(frames);

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
        const header = new Id3v2FrameHeader(FrameIdentifiers.MCDI, Id3v2FrameFlags.None, fieldBytes.length);
        const frame = MusicCdIdentifierFrame.fromFieldBytes(header, fieldBytes, version);

        // Act
        const result = frame.render(version);

        // Assert
        assert.ok(result);

        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(result, expected);
    }

    private static assertFrame(frame: MusicCdIdentifierFrame, d: ByteVector) {
        assert.isOk(frame);
        assert.instanceOf<MusicCdIdentifierFrame>(frame, MusicCdIdentifierFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.MCDI);

        Testers.bvEqual(frame.data, d);
    }
}
