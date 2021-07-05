import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import FrameConstructorTests from "./frameConstructorTests";
import PlayCountFrame from "../../src/id3v2/frames/playCountFrame";
import PropertyTests from "../utilities/propertyTests";
import {ByteVector} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";

// Setup chai
const assert = Chai.assert;

@suite class Id3v2_PlayCountFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return PlayCountFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return PlayCountFrame.fromRawData;
    }

    @test
    public fromEmpty() {
        // Act
        const frame = PlayCountFrame.fromEmpty();

        // Assert
        this.assertFrame(frame, BigInt(0));
    }

    @test
    public fromRawData_fourBytePlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT);
        header.frameSize = 4;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromUInt(1234)
        );

        // Act
        const frame = PlayCountFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, BigInt(1234));
    }

    @test
    public fromRawData_sixBytePlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT);
        header.frameSize = 6;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00, ByteVector.fromUInt(1234)
        );

        // Act
        const frame = PlayCountFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, BigInt(1234));
    }

    @test
    public fromRawData_eightBytePlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromULong(BigInt("4294967296"))
        );

        // Act
        const frame = PlayCountFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, BigInt("4294967296"));
    }

    @test
    public fromOffsetRawData_twoBytePlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            ByteVector.fromULong(BigInt("4294967296"))
        );

        // Act
        const frame = PlayCountFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        this.assertFrame(frame, BigInt("4294967296"));
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

    @test
    public render_intPlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT);
        header.frameSize = 4;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromUInt(1234)
        );
        const frame = PlayCountFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.isOk(output);
        assert.isTrue(ByteVector.equal(output, data));
    }

    @test
    public render_sixBytePlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT);
        header.frameSize = 6;
        const data = ByteVector.concatenate(
            header.render(4),
            0x12, 0x34, 0x45, 0x56, 0x78, 0x90
        );
        const frame = PlayCountFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.isOk(output);
        assert.isTrue(ByteVector.equal(output, data));
    }

    @test
    public render_longBytePlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.PCNT);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            0x12, 0x34, 0x45, 0x56, 0x78, 0x90, 0xAB, 0xCD
        );
        const frame = PlayCountFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.isOk(output);
        assert.isTrue(ByteVector.equal(output, data));
    }
}
