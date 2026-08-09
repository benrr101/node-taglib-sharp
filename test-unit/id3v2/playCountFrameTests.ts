import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import FrameHeader from "../../src/id3v2/frames/frameHeader";
import PlayCountFrame from "../../src/id3v2/frames/playCountFrame";
import PropertyTests from "../utilities/propertyTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector} from "../../src/byteVector";
import {FrameFlags, Id3v2Version} from "../../src/id3v2/enums";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const assertFrame = (frame: PlayCountFrame, p: bigint) => {
    assert.isOk(frame);
    assert.instanceOf<PlayCountFrame>(frame, PlayCountFrame);
    assert.strictEqual(frame.frameId, FrameIdentifiers.PCNT);

    assert.strictEqual(frame.playCount, p);
}

@suite class Id3v2_PlayCountFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: FrameHeader, d: ByteVector, v: Id3v2Version) => Frame {
        return PlayCountFrame.fromFieldBytes;
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_tooBig(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09]);
        const header = new FrameHeader(FrameIdentifiers.PCNT, FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => PlayCountFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_tooSmall(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03]);
        const header = new FrameHeader(FrameIdentifiers.PCNT, FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => PlayCountFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_fourBytePlayCount(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.fromUint(1234);
        const header = new FrameHeader(FrameIdentifiers.PCNT, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = PlayCountFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, BigInt(1234));
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_sixBytePlayCount(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);
        const header = new FrameHeader(FrameIdentifiers.PCNT, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = PlayCountFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, BigInt("1108152157446"));
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_eightBytePlayCount(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]);
        const header = new FrameHeader(FrameIdentifiers.PCNT, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = PlayCountFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, BigInt("72623859790382856"));
    }

    @test
    public fromFields_noParams() {
        // Act
        const frame = PlayCountFrame.fromFields();

        // Assert
        assertFrame(frame, BigInt(0));
    }
    @test
    public fromFields_withPlayCount() {
        // Act
        const frame = PlayCountFrame.fromFields(BigInt(12345));

        // Assert
        assertFrame(frame, BigInt(12345));
    }
}

@suite class Id3v2_PlayCountFrame_PropertyTests {
    @test
    public playCount() {
        // Arrange
        const frame = PlayCountFrame.fromFields();
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
        const frame = PlayCountFrame.fromFields(BigInt(123));

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
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
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
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = PlayCountFrame.fromFields();
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
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = PlayCountFrame.fromFields();
        const frame3 = PlayCountFrame.fromFields();

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
        const frame1 = PlayCountFrame.fromFields();
        const frame2 = PlayCountFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = PlayCountFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public render_fourBytePlayCount(version: Id3v2Version) {
        // Arrange
        const frame = PlayCountFrame.fromFields(BigInt(1234));

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.fromUint(1234);
        const header = new FrameHeader(FrameIdentifiers.PCNT, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public render_sixBytePlayCount(version: Id3v2Version) {
        // Arrange
        const frame = PlayCountFrame.fromFields(BigInt("1108152157446"));

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);
        const header = new FrameHeader(FrameIdentifiers.PCNT, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public render_eightBytePlayCount(version: Id3v2Version) {
        // Arrange
        const frame = PlayCountFrame.fromFields(BigInt("72623859790382856"));

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]);
        const header = new FrameHeader(FrameIdentifiers.PCNT, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }
}
