import * as BigInt from "big-integer";
import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import ConstructorTests from "./frameConstructorTests";
import FrameTypes from "../../src/id3v2/frameTypes";
import {ChannelData, ChannelType, RelativeVolumeFrame} from "../../src/id3v2/frames/relativeVolumeFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import FramePropertiesTests from "./framePropertiesTests";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class Id3v2_RelativeVolumeChannelData {
    @test
    public peakBits_setInvalidValues() {
        // Arrange
        const channel = new ChannelData(0);

        // Act / Assert
        assert.throws(() => { channel.peakBits = -1; });
        assert.throws(() => { channel.peakBits = 1.23; });
        assert.throws(() => { channel.peakBits = 0x100; });
        assert.throws(() => { channel.peakBits = 0; });
        assert.throws(() => { channel.peakBits = 65; });
    }

    @test
    public peakBits_setValidValues() {
        // Arrange
        const channel = new ChannelData(0);

        // Act
        channel.peakBits = 7;

        // Assert
        assert.strictEqual(channel.peakBits, 7);
    }

    @test
    public peakVolume_peakBitsNotSet() {
        // Arrange
        const channel = new ChannelData(0);

        // Act / Assert
        assert.throws(() => {
            channel.peakBits = undefined;
            channel.peakVolume = BigInt(123);
        });
        assert.throws(() => {
            channel.peakBits = null;
            channel.peakVolume = BigInt(123);
        });
        assert.throws(() => {
            channel.peakBits = 0;
            channel.peakVolume = BigInt(123);
        });
    }

    @test
    public peakVolume_setOutsideBitRange() {
        // Arrange
        const channel = new ChannelData(0);
        channel.peakBits = 8;

        // Act / Assert
        assert.throws(() => { channel.peakVolume = BigInt(0x100); });
        assert.throws(() => { channel.peakVolume = BigInt(-100); });
    }

    @test
    public peakVolume_setWithinRange() {
        // Arrange
        const channel = new ChannelData(0);
        channel.peakBits = 16;

        // Act
        channel.peakVolume = BigInt(0x1FF);

        // Assert
        assert.isTrue(channel.peakVolume.equals(0x1FF));
    }

    @test
    public volumeAdjustment_invalidValues() {
        // Arrange
        const channel = new ChannelData(0);

        // Act / Assert
        assert.throws(() => { channel.volumeAdjustment = -64; });
        assert.throws(() => { channel.volumeAdjustment = -1.23; });
        assert.throws(() => { channel.volumeAdjustment = 1.23; });
        assert.throws(() => { channel.volumeAdjustment = 64; });
    }

    @test
    public volumeAdjustment_withinRange() {
        // Arrange
        const channel = new ChannelData(0);

        // Act
        channel.volumeAdjustment = 32;

        // Assert
        assert.strictEqual(channel.volumeAdjustment, 32);
    }

    @test
    public isSet_trueViaVolumeAdjustment() {
        // Arrange
        const channel = new ChannelData(0);
        channel.volumeAdjustment = 32;

        // Act / Assert
        assert.isTrue(channel.isSet);
    }

    @test
    public isSet_trueViaPeakVolume() {
        // Arrange
        const channel = new ChannelData(0);
        channel.peakBits = 8;
        channel.peakVolume = BigInt(123);

        // Act / Assert
        assert.isTrue(channel.isSet);
    }

    @test
    public isSet_false() {
        // Arrange
        const channel = new ChannelData(0);
        channel.peakBits = 8;

        // Act / Assert
        assert.isFalse(channel.isSet);
    }

    @test
    public render_notSet() {
        // Arrange
        const channel = new ChannelData(0);
        channel.peakBits = 4;

        // Act
        const output = channel.render();

        // Assert
        assert.strictEqual(0, output.length);
    }

    @test
    public render_lessThan8BitsStoresAsByte() {
        // Arrange
        const channel = new ChannelData(ChannelType.Subwoofer);
        channel.peakBits = 7;
        channel.peakVolume = BigInt(0x1F);
        channel.volumeAdjustment = 32;

        // Act
        const output = channel.render();

        // Assert
        const expected = ByteVector.concatenate(
            ChannelType.Subwoofer,
            0x40, 0x00,
            0x07,
            0x1F
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_15BitsStoresAsShort() {
        // Arrange
        const channel = new ChannelData(ChannelType.Subwoofer);
        channel.peakBits = 15;
        channel.peakVolume = BigInt(0x1FFF);
        channel.volumeAdjustment = 32;

        // Act
        const output = channel.render();

        // Assert
        const expected = ByteVector.concatenate(
            ChannelType.Subwoofer,
            0x40, 0x00,
            0x0F,
            0x1F, 0xFF
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_23BitsStoresAs3Bytes() {
        // Arrange
        const channel = new ChannelData(ChannelType.Subwoofer);
        channel.peakBits = 23;
        channel.peakVolume = BigInt(0x1FFFFF);
        channel.volumeAdjustment = 32;

        // Act
        const output = channel.render();

        // Assert
        const expected = ByteVector.concatenate(
            ChannelType.Subwoofer,
            0x40, 0x00,
            0x17,
            0x1F, 0xFF, 0xFF
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_31BitsStoresAs4Bytes() {
        // Arrange
        const channel = new ChannelData(ChannelType.Subwoofer);
        channel.peakBits = 31;
        channel.peakVolume = BigInt(0x1FFFFFFF);
        channel.volumeAdjustment = 32;

        // Act
        const output = channel.render();

        // Assert
        const expected = ByteVector.concatenate(
            ChannelType.Subwoofer,
            0x40, 0x00,
            0x1F,
            0x1F, 0xFF, 0xFF, 0xFF
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_39BitsStoresAs5Bytes() {
        // Arrange
        const channel = new ChannelData(ChannelType.Subwoofer);
        channel.peakBits = 39;
        channel.peakVolume = BigInt("1FFFFFFFFF", 16);
        channel.volumeAdjustment = 32;

        // Act
        const output = channel.render();

        // Assert
        const expected = ByteVector.concatenate(
            ChannelType.Subwoofer,
            0x40, 0x00,
            0x27,
            0x1F, 0xFF, 0xFF, 0xFF, 0xFF
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_64BitsStoresAs8Bytes() {
        // Arrange
        const channel = new ChannelData(ChannelType.Subwoofer);
        channel.peakBits = 64;
        channel.peakVolume = BigInt("1FFFFFFFFFFFFFFF", 16);
        channel.volumeAdjustment = 32;

        // Act
        const output = channel.render();

        // Assert
        const expected = ByteVector.concatenate(
            ChannelType.Subwoofer,
            0x40, 0x00,
            0x40,
            0x1F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_RelativeVolumeFrame_ConstructorTests extends ConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader) => Frame {
        return RelativeVolumeFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return RelativeVolumeFrame.fromRawData;
    }

    @test
    public fromIdentification() {
        // Act
        const frame = RelativeVolumeFrame.fromIdentification("foo");

        // Assert
        this.assertFrame(frame, [], "foo");
    }

    @test
    public fromRawData_noDelimiter_emptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.RVA2, 4);
        header.frameSize = 3;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("foo", StringType.Latin1)
        );

        // Act
        const frame = RelativeVolumeFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, [], undefined);
    }

    @test
    public fromRawData_withChannelData_hasChannelData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.RVA2, 4);
        header.frameSize = 15;

        const channel1 = new ChannelData(ChannelType.Subwoofer);
        channel1.volumeAdjustment = 32;
        channel1.peakBits = 8;
        channel1.peakVolume = BigInt(12);

        const channel2 = new ChannelData(ChannelType.BackCenter);
        channel2.volumeAdjustment = 62;
        channel2.peakBits = 16;
        channel2.peakVolume = BigInt(123);

        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("foo", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            channel1.render(),
            channel2.render()
        );

        // Act
        const frame = RelativeVolumeFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, [channel2, channel1], "foo");
    }

    @test
    public fromOffsetRawData_withChannelData_hasChannelData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.RVA2, 4);
        header.frameSize = 15;

        const channel1 = new ChannelData(ChannelType.Subwoofer);
        channel1.volumeAdjustment = 32;
        channel1.peakBits = 8;
        channel1.peakVolume = BigInt(12);

        const channel2 = new ChannelData(ChannelType.BackCenter);
        channel2.volumeAdjustment = 62;
        channel2.peakBits = 16;
        channel2.peakVolume = BigInt(123);

        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            ByteVector.fromString("foo", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            channel1.render(),
            channel2.render()
        );

        // Act
        const frame = RelativeVolumeFrame.fromOffsetRawData(data, 2, header);

        // Assert
        this.assertFrame(frame, [channel2, channel1], "foo");
    }

    private assertFrame(frame: RelativeVolumeFrame, c: ChannelData[], i: string) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.RelativeVolumeFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.RVA2));

        assert.deepStrictEqual(frame.channels, c);
        assert.strictEqual(frame.identification, i);
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_RelativeVolumeFrameMethodTests {
    @test
    public find_falsyFrames() {
        // Act / Assert
        assert.throws(() => { RelativeVolumeFrame.find(undefined, "foo"); });
        assert.throws(() => { RelativeVolumeFrame.find(null, "foo"); });
    }

    @test
    public find_noMatches() {
        // Arrange
        const frames = [
            RelativeVolumeFrame.fromIdentification("fux"),
            RelativeVolumeFrame.fromIdentification("bux")
        ];

        // Act
        const result = RelativeVolumeFrame.find(frames, "qux");

        // Assert
        assert.isUndefined(result);
    }

    @test
    public find_multipleMatches() {
        // Arrange
        const frames = [
            RelativeVolumeFrame.fromIdentification("fux"),
            RelativeVolumeFrame.fromIdentification("bux"),
            RelativeVolumeFrame.fromIdentification("qux"),
            RelativeVolumeFrame.fromIdentification("qux")
        ];

        // Act
        const result = RelativeVolumeFrame.find(frames, "qux");

        // Assert
        assert.strictEqual(result, frames[2]);
    }

    @test
    public peakBits() {
        // Arrange
        const frame = RelativeVolumeFrame.fromIdentification("foo");

        // Act / Assert
        FramePropertiesTests.propertyRoundTrip(
            (v) => { frame.setPeakBits(ChannelType.Subwoofer, v); },
            () => frame.getPeakBits(ChannelType.Subwoofer),
            8
        );
    }

    @test
    public peakVolume() {
        // Arrange
        const frame = RelativeVolumeFrame.fromIdentification("foo");
        frame.setPeakBits(ChannelType.Subwoofer, 16);

        // Act / Assert
        FramePropertiesTests.propertyRoundTrip(
            (v) => { frame.setPeakVolume(ChannelType.Subwoofer, v); },
            () => frame.getPeakVolume(ChannelType.Subwoofer),
            BigInt(123)
        );
    }

    @test
    public volumeAdjustment() {
        // Arrange
        const frame = RelativeVolumeFrame.fromIdentification("foo");

        // Act / Assert
        FramePropertiesTests.propertyRoundTrip(
            (v) => { frame.setVolumeAdjustment(ChannelType.Subwoofer, v); },
            () => frame.getVolumeAdjustment(ChannelType.Subwoofer),
            8
        );
    }

    @test
    public render() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.RVA2, 4);
        header.frameSize = 15;

        const channel1 = new ChannelData(ChannelType.Subwoofer);
        channel1.volumeAdjustment = 32;
        channel1.peakBits = 8;
        channel1.peakVolume = BigInt(12);

        const channel2 = new ChannelData(ChannelType.BackCenter);
        channel2.volumeAdjustment = 62;
        channel2.peakBits = 16;
        channel2.peakVolume = BigInt(123);

        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("foo", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            channel2.render(),
            channel1.render()
        );
        const frame = RelativeVolumeFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.ok(output);
        assert.isTrue(ByteVector.equal(output, data));
    }
}
