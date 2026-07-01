import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import PropertyTests from "../utilities/propertyTests";
import PrivateFrame from "../../src/id3v2/frames/privateFrame";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const assertFrame = (frame: PrivateFrame, o: string, d: ByteVector) => {
    assert.isOk(frame);
    assert.instanceOf<PrivateFrame>(frame, PrivateFrame);
    assert.strictEqual(frame.frameId, FrameIdentifiers.PRIV);

    assert.strictEqual(frame.owner, o);
    Testers.bvEqual(frame.privateData, d);
}

@suite class Id3v2_PrivateFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return PrivateFrame.fromFieldBytes;
    }

    @test
    public fromOwner_validParams_returnsFrame() {
        // Act
        const frame = PrivateFrame.fromOwner("foo");

        // Assert
        assertFrame(frame, "foo", ByteVector.empty());
    }

    @test
    public fromFieldBytes_tooFewBytes_throws() {
        // Arrange
        const fieldBytes = ByteVector.empty();
        const header = new Id3v2FrameHeader(FrameIdentifiers.PRIV, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => { PrivateFrame.fromFieldBytes(header, fieldBytes, 4); });
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_ownerOnly(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("fux", StringType.Latin1), // Owner
            0x00                                             // Separator
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.PRIV, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = PrivateFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, "fux", ByteVector.empty());
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_dataOnly(version: number) {
        // Arrange
        const dataBytes = ByteVector.concatenate(0x01, 0x02, 0x03, 0x04);
        const fieldBytes = ByteVector.concatenate(
            0x00,      // Separator
            dataBytes  // Data
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.PRIV, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = PrivateFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, "", dataBytes);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_ownerAndData(version: number) {
        // Arrange
        const dataBytes = ByteVector.concatenate(0x01, 0x02, 0x03, 0x04);
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foo", StringType.Latin1), // Owner
            0x00,                                            // Separator
            dataBytes                                        // Data
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.PRIV, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = PrivateFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, "foo", dataBytes);
    }
}

@suite class Id3v2_PrivateFrame_PropertyTests {
    @test
    public privateData() {
        // Arrange
        const frame = PrivateFrame.fromOwner("fux");

        // Act / Assert
        PropertyTests.propertyRoundTrip(
           (v) => { frame.privateData = v; },
           () => frame.privateData,
            ByteVector.fromString("bux", StringType.UTF8)
        );
    }
}

@suite class Id3v2_PrivateFrame_MethodTests {
    @test
    public clone() {
        // Arrange
        const frame = PrivateFrame.fromOwner("fux");

        // Act
        const output = <PrivateFrame> frame.clone();

        // Assert
        assertFrame(output, frame.owner, frame.privateData);
    }

    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: PrivateFrame[]) => { PrivateFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = PrivateFrame.filterFrames(frames);

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
        const result = PrivateFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = PrivateFrame.fromOwner("foo");
        const frames = [frame1, frame2];

        // Act
        const result = PrivateFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = PrivateFrame.fromOwner("foo");
        const frame3 = PrivateFrame.fromOwner("bar");

        const frames = [frame1, frame2, frame3];

        // Act
        const result = PrivateFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = PrivateFrame.fromOwner("foo");
        const frame2 = PrivateFrame.fromOwner("bar");
        const frames = [frame1, frame2];

        // Act
        const result = PrivateFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }
    
    @test
    public render_v2_throws() {
        // Arrange
        const frame = PrivateFrame.fromOwner("foo");

        // Act / Assert
        assert.throws(() => frame.render(2));
    }

    @params(3, "v3")
    @params(4, "v4")
    public render_v34(version: number) {
        // Arrange
        const dataBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04]);
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("fux", StringType.Latin1), // Owner
            0x00,                                            // Separator
            dataBytes                                        // Data
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.PRIV, Id3v2FrameFlags.None, fieldBytes.length);
        const frame = PrivateFrame.fromFieldBytes(header, fieldBytes, version);

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @test
    public render_ownerOnly() {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("fux", StringType.Latin1), // Owner
            0x00                                             // Separator
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.PRIV, Id3v2FrameFlags.None, fieldBytes.length);
        const frame = PrivateFrame.fromFieldBytes(header, fieldBytes, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.isOk(output);

        const expected = ByteVector.concatenate(header.render(4), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @test
    public render_dataOnly() {
        // Arrange
        const dataBytes = ByteVector.concatenate(0x01, 0x02, 0x03, 0x04);
        const fieldBytes = ByteVector.concatenate(
            0x00,      // Separator
            dataBytes  // Data
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.PRIV, Id3v2FrameFlags.None, fieldBytes.length);
        const frame = PrivateFrame.fromFieldBytes(header, fieldBytes, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.isOk(output);

        const expected = ByteVector.concatenate(header.render(4), fieldBytes);
        Testers.bvEqual(output, expected);
    }
}
