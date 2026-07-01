import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import PlayCountFrame from "../../src/id3v2/frames/playCountFrame";
import PropertyTests from "../utilities/propertyTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const assertFrame = (frame: PlayCountFrame, p: bigint) => {
    assert.isOk(frame);
    assert.instanceOf<PlayCountFrame>(frame, PlayCountFrame);
    assert.strictEqual(frame.frameId, FrameIdentifiers.PCNT);

    assert.strictEqual(frame.playCount, p);
}

@suite class Id3v2_PlayCountFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return PlayCountFrame.fromFieldBytes;
    }

    @test
    public fromEmpty() {
        // Act
        const frame = PlayCountFrame.fromEmpty();

        // Assert
        assertFrame(frame, BigInt(0));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_tooBig(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09]);
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => PlayCountFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_tooSmall(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03]);
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => PlayCountFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_fourBytePlayCount(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromUint(1234);
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = PlayCountFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, BigInt(1234));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_sixBytePlayCount(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = PlayCountFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, BigInt("1108152157446"));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_eightBytePlayCount(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]);
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = PlayCountFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, BigInt("72623859790382856"));
    }
}

@suite class Id3v2_PlayCountFrame_PropertyTests {
    @test
    public playCount() {
        // Arrange
        const frame = PlayCountFrame.fromEmpty();
        const set = (v: bigint) => { frame.playCount = v; };
        const get = () => frame.playCount;

        // Act / Assert
        PropertyTests.propertyThrows(set, BigInt(-1));
        PropertyTests.propertyThrows(set, BigInt("18446744073709551616"));
        PropertyTests.propertyRoundTrip(set, get, BigInt(100));
        PropertyTests.propertyRoundTrip(set, get, BigInt("68719476721"));
    }
}

@suite class Id3v2_PlayCountFrame_MethodTests {
    @test
    public clone() {
        // Arrange
        const frame = PlayCountFrame.fromEmpty();
        frame.playCount = BigInt(123);

        // Act
        const output = <PlayCountFrame> frame.clone();

        // Assert
        assertFrame(output, frame.playCount);
    }

    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: PlayCountFrame[]) => { PlayCountFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = PlayCountFrame.filterFrames(frames);

        // Assert
        assert.isArray(output);
        assert.isEmpty(output);
    }

    @test
    public filterFrames_noMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(234));
        const frames = [frame1, frame2];

        // Act
        const result = PlayCountFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = PlayCountFrame.fromEmpty();
        const frames = [frame1, frame2];

        // Act
        const result = PlayCountFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = PlayCountFrame.fromEmpty();
        const frame3 = PlayCountFrame.fromEmpty();

        const frames = [frame1, frame2, frame3];

        // Act
        const result = PlayCountFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = PlayCountFrame.fromEmpty();
        const frame2 = PlayCountFrame.fromEmpty();
        const frames = [frame1, frame2];

        // Act
        const result = PlayCountFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_fourBytePlayCount(version: number) {
        // Arrange
        const frame = PlayCountFrame.fromEmpty();
        frame.playCount = BigInt(1234);

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.fromUint(1234);
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_sixBytePlayCount(version: number) {
        // Arrange
        const frame = PlayCountFrame.fromEmpty();
        frame.playCount = BigInt("1108152157446");

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_eightBytePlayCount(version: number) {
        // Arrange
        const frame = PlayCountFrame.fromEmpty();
        frame.playCount = BigInt("72623859790382856");

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]);
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }
}
