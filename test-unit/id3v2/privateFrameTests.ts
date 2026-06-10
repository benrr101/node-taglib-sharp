import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import PropertyTests from "../utilities/propertyTests";
import PrivateFrame from "../../src/id3v2/frames/privateFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

@suite class Id3v2_PrivateFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return PrivateFrame.fromFieldBytes;
    }

    @test
    public fromOwner_validParams_returnsFrame() {
        // Act
        const frame = PrivateFrame.fromOwner("foo");

        // Assert
        Id3v2_PrivateFrame_ConstructorTests.assertFrame(frame, "foo", ByteVector.empty());
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
        Id3v2_PrivateFrame_ConstructorTests.assertFrame(frame, "fux", ByteVector.empty());
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromBodyBytes_dataOnly(version: number) {
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
        Id3v2_PrivateFrame_ConstructorTests.assertFrame(frame, "", dataBytes);
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
        Id3v2_PrivateFrame_ConstructorTests.assertFrame(frame, "foo", dataBytes);
    }

    private static assertFrame(frame: PrivateFrame, o: string, d: ByteVector) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.PrivateFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.PRIV);

        assert.strictEqual(frame.owner, o);
        Testers.bvEqual(frame.privateData, d);
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
    public find_noFrames() {
        // Arrange
        const frames: PrivateFrame[] = [];

        // Act
        const output = PrivateFrame.find(frames, "fux");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_noMatch() {
        // Arrange
        const frames = [
            PrivateFrame.fromOwner("fux")
        ];

        // Act
        const output = PrivateFrame.find(frames, "bux");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_match() {
        // Arrange
        const frames = [
            PrivateFrame.fromOwner("fux"),
            PrivateFrame.fromOwner("bux")
        ];

        // Act
        const output = PrivateFrame.find(frames, "bux");

        // Assert
        assert.strictEqual(output, frames[1]);
    }

    @test
    public clone() {
        // Arrange
        const frame = PrivateFrame.fromOwner("fux");

        // Act
        const output = <PrivateFrame> frame.clone();

        // Assert
        assert.isOk(output);
        assert.notEqual(frame, output);

        assert.strictEqual(output.frameClassType, FrameClassType.PrivateFrame);
        assert.strictEqual(output.frameId, FrameIdentifiers.PRIV);

        assert.strictEqual(output.owner, frame.owner);
        assert.notEqual(output.privateData, frame.privateData);
        Testers.bvEqual(output.privateData, frame.privateData);
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
