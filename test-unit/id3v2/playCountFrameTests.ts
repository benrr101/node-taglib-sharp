import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import PlayCountFrame from "../../src/id3v2/frames/playCountFrame";
import PropertyTests from "../utilities/propertyTests";
import {ByteVector} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

@suite class Id3v2_PlayCountFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return (a, b, c, d) => PlayCountFrame.fromFieldBytes(c, a, d);
    }

    @test
    public fromEmpty() {
        // Act
        const frame = PlayCountFrame.fromEmpty();

        // Assert
        this.assertFrame(frame, BigInt(0));
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
        this.assertFrame(frame, BigInt(1234));
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
        this.assertFrame(frame, BigInt("1108152157446"));
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
        this.assertFrame(frame, BigInt("72623859790382856"));
    }

    private assertFrame(frame: PlayCountFrame, p: bigint) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.PlayCountFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.PCNT);

        assert.strictEqual(frame.playCount, p);
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
        assert.isOk(output);
        assert.strictEqual(output.frameClassType, FrameClassType.PlayCountFrame);
        assert.strictEqual(output.frameId, FrameIdentifiers.PCNT);

        assert.strictEqual(output.playCount, frame.playCount);
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
