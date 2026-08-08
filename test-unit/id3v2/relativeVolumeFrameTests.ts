import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import FrameHeader from "../../src/id3v2/frames/frameHeader";
import PropertyTests from "../utilities/propertyTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ChannelData, RelativeVolumeFrame} from "../../src/id3v2/frames/relativeVolumeFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {ChannelType, FrameFlags, Id3v2Version} from "../../src/id3v2/enums";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const assertFrame = (frame: RelativeVolumeFrame, c: ChannelData[], i: string) => {
    assert.isOk(frame);
    assert.instanceOf<RelativeVolumeFrame>(frame, RelativeVolumeFrame);
    assert.strictEqual(frame.frameId, FrameIdentifiers.RVA2);

    assert.deepStrictEqual(frame.channels, c);
    assert.strictEqual(frame.identification, i);
}

@suite class Id3v2_RelativeVolumeChannelData {
    @test
    public peakBits_setInvalidValues() {
        // Arrange
        const channel = new ChannelData(0);

        // Act / Assert
        Testers.testByte((v: number) => { channel.peakBits = v; });
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
        assert.strictEqual(channel.peakVolume, BigInt(0x1FF));
    }

    @test
    public volumeAdjustment_invalidValues() {
        // Arrange
        const channel = new ChannelData(0);

        // Act / Assert
        assert.throws(() => { channel.volumeAdjustment = NaN; });
        assert.throws(() => { channel.volumeAdjustment = -64; });
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
        Testers.bvEqual(output, expected);
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
        Testers.bvEqual(output, expected);
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
        Testers.bvEqual(output, expected);
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
        Testers.bvEqual(output, expected);
    }

    @test
    public render_39BitsStoresAs5Bytes() {
        // Arrange
        const channel = new ChannelData(ChannelType.Subwoofer);
        channel.peakBits = 39;
        channel.peakVolume = BigInt("0x1FFFFFFFFF");
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
        Testers.bvEqual(output, expected);
    }

    @test
    public render_64BitsStoresAs8Bytes() {
        // Arrange
        const channel = new ChannelData(ChannelType.Subwoofer);
        channel.peakBits = 64;
        channel.peakVolume = BigInt("0x1FFFFFFFFFFFFFFF");
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
        Testers.bvEqual(output, expected);
    }
}

@suite class Id3v2_RelativeVolumeFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: FrameHeader, b: ByteVector, v: Id3v2Version) => Frame {
        return RelativeVolumeFrame.fromFieldBytes;
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_emptyFrame_throws(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.empty();
        const header = new FrameHeader(FrameIdentifiers.RVA2, FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => RelativeVolumeFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_identifierOnly(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(ByteVector.fromString("foobarbaz", StringType.Latin1), 0x00);
        const header = new FrameHeader(FrameIdentifiers.RVA2, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = RelativeVolumeFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, [], "foobarbaz");
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_oneChannelData(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foobarbaz", StringType.Latin1), 0x00, // Identifier + delimiter
            ChannelType.Subwoofer,                                            // Channel type
            ByteVector.fromShort(123),                                        // Volume adjustment
            0x20,                                                             // Bits representing peak (32)
            0x01, 0x02, 0x03, 0x04                                            // Peak volume
        );
        const header = new FrameHeader(FrameIdentifiers.RVA2, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = RelativeVolumeFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        const channelData = new ChannelData(ChannelType.Subwoofer);
        channelData.peakBits = 32;
        channelData.peakVolume = BigInt(16909060);
        channelData.volumeAdjustment = 123/512;
        assertFrame(frame, [channelData], "foobarbaz");
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_twoChannelData(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foobarbaz", StringType.Latin1), 0x00, // Identifier + delimiter
            // ---------
            ChannelType.Subwoofer,                                            // Channel type
            ByteVector.fromShort(123),                                        // Volume adjustment
            0x20,                                                             // Bits representing peak (32)
            0x01, 0x02, 0x03, 0x04,                                           // Peak volume
            // ---------
            ChannelType.BackRight,                                            // Channel type
            ByteVector.fromShort(234),                                        // Volume adjustment
            0x20,                                                             // Bits representing peak (32)
            0x02, 0x03, 0x04, 0x05                                            // Peak volume
        );
        const header = new FrameHeader(FrameIdentifiers.RVA2, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = RelativeVolumeFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        const cd1 = new ChannelData(ChannelType.Subwoofer);
        cd1.peakBits = 32;
        cd1.peakVolume = BigInt(16909060);
        cd1.volumeAdjustment = 123 / 512;

        const cd2 = new ChannelData(ChannelType.BackRight);
        cd2.peakBits = 32;
        cd2.peakVolume = BigInt(33752069);
        cd2.volumeAdjustment = 234 / 512;
        assertFrame(frame, [cd2, cd1], "foobarbaz");
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_incompleteChannelDataAtBits(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foobarbaz", StringType.Latin1), 0x00, // Identifier + delimiter
            // ---------
            ChannelType.Subwoofer,                                            // Channel type
            ByteVector.fromShort(123),                                        // Volume adjustment
            0x20,                                                             // Bits representing peak (32)
            0x01, 0x02, 0x03, 0x04,                                           // Peak volume
            // ---------
            ChannelType.BackRight,                                            // Channel type
            ByteVector.fromShort(234),                                        // Volume adjustment
        );
        const header = new FrameHeader(FrameIdentifiers.RVA2, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = RelativeVolumeFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        const cd1 = new ChannelData(ChannelType.Subwoofer);
        cd1.peakBits = 32;
        cd1.peakVolume = BigInt(16909060);
        cd1.volumeAdjustment = 123 / 512;
        assertFrame(frame, [cd1], "foobarbaz");
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_incompleteChannelDataAtPeak(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foobarbaz", StringType.Latin1), 0x00, // Identifier + delimiter
            // ---------
            ChannelType.Subwoofer,                                            // Channel type
            ByteVector.fromShort(123),                                        // Volume adjustment
            0x20,                                                             // Bits representing peak (32)
            0x01, 0x02, 0x03, 0x04,                                           // Peak volume
            // ---------
            ChannelType.BackRight,                                            // Channel type
            ByteVector.fromShort(234),                                        // Volume adjustment
            0x30,                                                             // Bits representing peak (48)
            0x02, 0x03, 0x04, 0x05                                            // Peak volume (not enough)
        );
        const header = new FrameHeader(FrameIdentifiers.RVA2, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = RelativeVolumeFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        const cd1 = new ChannelData(ChannelType.Subwoofer);
        cd1.peakBits = 32;
        cd1.peakVolume = BigInt(16909060);
        cd1.volumeAdjustment = 123 / 512;
        assertFrame(frame, [cd1], "foobarbaz");
    }

    @test
    public fromFields_noParams() {
        // Act
        const frame = RelativeVolumeFrame.fromFields();

        // Assert

        assertFrame(frame, [], "");
    }

    @test
    public fromFields_withIdentification() {
        // Act
        const frame = RelativeVolumeFrame.fromFields("foo");

        // Assert
        assertFrame(frame, [], "foo");
    }

    @test
    public fromFields_withIdentificationChannelData() {
        // Arrange
        const channelData = [];
        for(let i = 0; i < 9; i++) {
            const value = new ChannelData(i);
            value.volumeAdjustment = i * 2 + 1;
            channelData.push(value);
        }

        // Act
        const frame = RelativeVolumeFrame.fromFields("foo", channelData);

        // Assert
        assertFrame(frame, channelData, "foo");
    }
}

@suite class Id3v2_RelativeVolumeFrame_MethodTests {
    @test
    public clone() {
        // Arrange
        const frame = RelativeVolumeFrame.fromFields("foobarbaz");
        frame.setPeakBits(ChannelType.Subwoofer, 32);
        frame.setPeakVolume(ChannelType.Subwoofer, BigInt(12345));
        frame.setVolumeAdjustment(ChannelType.Subwoofer, -1.23);
        frame.setPeakBits(ChannelType.BackCenter, 48);
        frame.setPeakVolume(ChannelType.BackCenter, BigInt(23456));
        frame.setVolumeAdjustment(ChannelType.BackCenter, 1.23);

        // Act
        const clone = <RelativeVolumeFrame>frame.clone();

        // Assert
        assert.isOk(clone);
        assert.instanceOf(clone, RelativeVolumeFrame);
        assert.notStrictEqual(clone, frame);
        assert.strictEqual(clone.identification, frame.identification);
        assert.deepStrictEqual(clone.channels, frame.channels);
        assert.strictEqual(clone.getPeakBits(ChannelType.Subwoofer), frame.getPeakBits(ChannelType.Subwoofer));
        assert.strictEqual(clone.getPeakVolume(ChannelType.Subwoofer), frame.getPeakVolume(ChannelType.Subwoofer));
        assert.strictEqual(
            clone.getVolumeAdjustment(ChannelType.Subwoofer),
            frame.getVolumeAdjustment(ChannelType.Subwoofer)
        );
        assert.strictEqual(clone.getPeakBits(ChannelType.BackCenter), frame.getPeakBits(ChannelType.BackCenter));
        assert.strictEqual(clone.getPeakVolume(ChannelType.BackCenter), frame.getPeakVolume(ChannelType.BackCenter));
        assert.strictEqual(
            clone.getVolumeAdjustment(ChannelType.BackCenter),
            frame.getVolumeAdjustment(ChannelType.BackCenter)
        );
    }

    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: RelativeVolumeFrame[]) => { RelativeVolumeFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = RelativeVolumeFrame.filterFrames(frames);

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
        const result = RelativeVolumeFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = RelativeVolumeFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = RelativeVolumeFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = RelativeVolumeFrame.fromFields();
        const frame3 = RelativeVolumeFrame.fromFields();

        const frames = [frame1, frame2, frame3];

        // Act
        const result = RelativeVolumeFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = RelativeVolumeFrame.fromFields();
        const frame2 = RelativeVolumeFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = RelativeVolumeFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @test
    public peakBits() {
        // Arrange
        const frame = RelativeVolumeFrame.fromFields();

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { frame.setPeakBits(ChannelType.Subwoofer, v); },
            () => frame.getPeakBits(ChannelType.Subwoofer),
            8
        );
    }

    @test
    public peakVolume() {
        // Arrange
        const frame = RelativeVolumeFrame.fromFields();
        frame.setPeakBits(ChannelType.Subwoofer, 16);

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { frame.setPeakVolume(ChannelType.Subwoofer, v); },
            () => frame.getPeakVolume(ChannelType.Subwoofer),
            BigInt(123)
        );
    }

    @test
    public volumeAdjustment() {
        // Arrange
        const frame = RelativeVolumeFrame.fromFields();

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { frame.setVolumeAdjustment(ChannelType.Subwoofer, v); },
            () => frame.getVolumeAdjustment(ChannelType.Subwoofer),
            8
        );
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public render_noChannelData(version: Id3v2Version) {
        // Arrange
        const frame = RelativeVolumeFrame.fromFields("foobarbaz");

        // Act
        const output = frame.render(version);

        // Assert
        const fieldBytes = ByteVector.concatenate(ByteVector.fromString("foobarbaz", StringType.Latin1), 0x00);
        const header = new FrameHeader(FrameIdentifiers.RVA2, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public render_oneChannelData(version: Id3v2Version) {
        // Arrange
        const frame = RelativeVolumeFrame.fromFields("foobarbaz");
        frame.setPeakBits(ChannelType.Subwoofer, 32);
        frame.setPeakVolume(ChannelType.Subwoofer, BigInt(12345));
        frame.setVolumeAdjustment(ChannelType.Subwoofer, -1.23);

        // Act
        const result = frame.render(version);

        // Assert
        const cd1 = new ChannelData(ChannelType.Subwoofer);
        cd1.peakBits = 32;
        cd1.peakVolume = BigInt(12345);
        cd1.volumeAdjustment = -1.23;
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foobarbaz", StringType.Latin1), 0x00, // Identifier + delimiter
            cd1.render()                                                 // Channel data
        );
        const header = new FrameHeader(FrameIdentifiers.RVA2, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(result, expected);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public render_twoChannelData(version: Id3v2Version) {
        // Arrange
        const frame = RelativeVolumeFrame.fromFields("foobarbaz");
        frame.setPeakBits(ChannelType.Subwoofer, 32);
        frame.setPeakVolume(ChannelType.Subwoofer, BigInt(12345));
        frame.setVolumeAdjustment(ChannelType.Subwoofer, -1.23);
        frame.setPeakBits(ChannelType.BackCenter, 48);
        frame.setPeakVolume(ChannelType.BackCenter, BigInt(23456));
        frame.setVolumeAdjustment(ChannelType.BackCenter, 1.23);

        // Act
        const result = frame.render(version);

        // Assert
        const cd1 = new ChannelData(ChannelType.Subwoofer);
        cd1.peakBits = 32;
        cd1.peakVolume = BigInt(12345);
        cd1.volumeAdjustment = -1.23;
        const cd2 = new ChannelData(ChannelType.BackCenter);
        cd2.peakBits = 48;
        cd2.peakVolume = BigInt(23456);
        cd2.volumeAdjustment = 1.23;
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foobarbaz", StringType.Latin1), 0x00, // Identifier + delimiter
            cd2.render(),                                                // Channel data
            cd1.render()                                                 // Channel data
        );
        const header = new FrameHeader(FrameIdentifiers.RVA2, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(result, expected);
    }
}
