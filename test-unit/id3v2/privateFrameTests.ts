import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameConstructorTests from "./frameConstructorTests";
import PropertyTests from "../utilities/propertyTests";
import PrivateFrame from "../../src/id3v2/frames/privateFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class Id3v2_PrivateFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return PrivateFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return PrivateFrame.fromRawData;
    }

    @test
    public fromOwner() {
        // Act
        const frame = PrivateFrame.fromOwner("foo");

        // Assert
        this.assertFrame(frame, "foo", ByteVector.empty());
    }

    @test
    public fromRawData_tooFewBytes() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.PRIV);
        header.frameSize = 0;
        const data = ByteVector.concatenate(
            header.render(4)
        );

        // Act / Assert
        assert.throws(() => { PrivateFrame.fromRawData(data, 4); });
    }

    @test
    public fromRawData_owner() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.PRIV);
        header.frameSize = 4;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("fux", StringType.Latin1)
        );

        // Act
        const frame = PrivateFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, "fux", ByteVector.empty());
    }

    @test
    public fromRawData_ownerAndData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.PRIV);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            0x01, 0x02, 0x03, 0x04
        );

        // Act
        const frame = PrivateFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, "fux", ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04])));
    }

    @test
    public fromOffsetRawData_ownerAndData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.PRIV);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            0x01, 0x02, 0x03, 0x04
        );

        // Act
        const frame = PrivateFrame.fromOffsetRawData(data, 2, header,  4);

        // Assert
        this.assertFrame(frame, "fux", ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04])));
    }

    private assertFrame(frame: PrivateFrame, o: string, d: ByteVector) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.PrivateFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.PRIV);

        assert.strictEqual(frame.owner, o);
        assert.isTrue(ByteVector.equal(frame.privateData, d));
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_PrivateFrame_PropertyTests {
    @test
    public privateData() {
        // Arrange
        const frame = PrivateFrame.fromOwner("fux");

        // Act / Assert
        PropertyTests.propertyRoundTrip(
           (v) => { frame.privateData = v; },
           () => frame.privateData,
            ByteVector.fromString("bux")
        );
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_PrivateFrame_MethodTests {
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
        assert.isTrue(ByteVector.equal(output.privateData, frame.privateData));
    }

    @test
    public render_v4() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.PRIV);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            0x01, 0x02, 0x03, 0x04
        );
        const frame = PrivateFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.isOk(output);
        assert.isTrue(ByteVector.equal(output, data));
    }

    @test
    public render_v2_throws() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.PRIV);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            0x01, 0x02, 0x03, 0x04
        );
        const frame = PrivateFrame.fromRawData(data, 4);

        // Act / Assert
        assert.throws(() => { const _ = frame.render(2); });
    }
}
