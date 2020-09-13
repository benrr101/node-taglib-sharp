import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import TestFile from "../utilities/testFile";
import {suite, test} from "mocha-typescript";

import VbriHeader from "../../src/mpeg/vbriHeader";
import XingHeader from "../../src/mpeg/xingHeader";
import {AudioHeader} from "../../src/mpeg/audioHeader";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {MediaTypes} from "../../src/iCodec";
import {ChannelMode, MpegVersion} from "../../src/mpeg/mpegEnums";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class MpegAudioHeader_ConstructorTests {
    private mockFile = TypeMoq.Mock.ofType<File>().object;

    @test
    public unknownHeader() {
        // Act
        const header = AudioHeader.Unknown;

        // Assert
        this.assertHeader(
            header,
            0,
            2,
            0,
            1,
            11025,
            ChannelMode.Stereo,
            "MPEG Version 2.5 Audio, Layer 1",
            0,
            false,
            false,
            false,
            true,
            MediaTypes.Audio,
            MpegVersion.Version25
        );
        assert.strictEqual(header.vbriHeader, VbriHeader.unknown);
        assert.strictEqual(header.xingHeader, XingHeader.unknown);
    }

    @test
    public fromInfo_invalidArguments() {
        // Act/Assert
        assert.throws(() => {
            AudioHeader.fromInfo(
                -1,
                123,
                XingHeader.unknown,
                VbriHeader.unknown
            );
        });
        assert.throws(() => {
            AudioHeader.fromInfo(
                1.23,
                123,
                XingHeader.unknown,
                VbriHeader.unknown
            );
        });
        assert.throws(() => {
            AudioHeader.fromInfo(
                Number.MAX_SAFE_INTEGER + 1,
                123,
                XingHeader.unknown,
                VbriHeader.unknown
            );
        });
        assert.throws(() => {
            AudioHeader.fromInfo(
                123,
                -1,
                XingHeader.unknown,
                VbriHeader.unknown
            );
        });
        assert.throws(() => {
            AudioHeader.fromInfo(
                123,
                1.23,
                XingHeader.unknown,
                VbriHeader.unknown
            );
        });
        assert.throws(() => {
            AudioHeader.fromInfo(
                123,
                Number.MAX_SAFE_INTEGER + 1,
                XingHeader.unknown,
                VbriHeader.unknown
            );
        });
        assert.throws(() => {AudioHeader.fromInfo(123, 123, undefined, VbriHeader.unknown); });
        assert.throws(() => {AudioHeader.fromInfo(123, 123, null, VbriHeader.unknown); });
        assert.throws(() => {AudioHeader.fromInfo(123, 123, XingHeader.unknown, undefined); });
        assert.throws(() => {AudioHeader.fromInfo(123, -1, XingHeader.unknown, null); });
    }

    @test
    public fromInfo_validArguments() {
        // Act
        const header = AudioHeader.fromInfo(0, 0, XingHeader.unknown, VbriHeader.unknown);

        // Assert
        this.assertHeader(
            header,
            0,
            2,
            0,
            1,
            11025,
            ChannelMode.Stereo,
            "MPEG Version 2.5 Audio, Layer 1",
            0,
            false,
            false,
            false,
            true,
            MediaTypes.Audio,
            MpegVersion.Version25
        );
        assert.strictEqual(header.vbriHeader, VbriHeader.unknown);
        assert.strictEqual(header.xingHeader, XingHeader.unknown);
    }

    @test
    public fromData_invalidArguments() {
        // Arrange
        const data = ByteVector.empty();

        // Act / Assert
        assert.throws(() => { AudioHeader.fromData(undefined, this.mockFile, 1); });
        assert.throws(() => { AudioHeader.fromData(null, this.mockFile, 1); });
        assert.throws(() => { AudioHeader.fromData(data, undefined, 1); });
        assert.throws(() => { AudioHeader.fromData(data, null, 1); });
        assert.throws(() => { AudioHeader.fromData(data, this.mockFile, -1); });
        assert.throws(() => { AudioHeader.fromData(data, this.mockFile, 1.23); });
        assert.throws(() => { AudioHeader.fromData(data, this.mockFile, Number.MAX_SAFE_INTEGER + 1); });
    }

    @test
    public fromData_headerTooShort() {
        // Arrange
        const data = ByteVector.fromSize(2);

        // Act / Assert
        assert.throws(() => { AudioHeader.fromData(data, this.mockFile, 1); });
    }

    @test
    public fromData_headerDoesNotStartWithSyncByte() {
        // Arrange
        const data = ByteVector.fromSize(4);
        data.set(0, 0xEE);

        // Act / Assert
        assert.throws(() => { AudioHeader.fromData(data, this.mockFile, 1); });
    }

    @test
    public fromData_secondByteDoesNotMatchMpegSync() {
        // Arrange
        const data1 = ByteVector.fromSize(4);
        data1.set(0, 0xFF);
        data1.set(1, 0x10);
        const data2 = ByteVector.fromSize(4);
        data2.set(0, 0xFF);
        data2.set(1, 0xE8);

        // Act / Assert
        assert.throws(() => { AudioHeader.fromData(data1, this.mockFile, 1); });
        assert.throws(() => { AudioHeader.fromData(data2, this.mockFile, 1); });
    }

    @test
    public fromData_invalidBitrate() {
        // Arrange
        const data = ByteVector.fromSize(4);
        data.set(0, 0xFF);
        data.set(1, 0xF2);
        data.set(2, 0xF0);

        // Act / Assert
        assert.throws(() => { AudioHeader.fromData(data, this.mockFile, 1); });
    }

    @test
    public fromData_invalidSampleRate() {
        // Arrange
        const data = ByteVector.fromSize(4);
        data.set(0, 0xFF);
        data.set(1, 0xF2);
        data.set(2, 0xEC);

        // Act / Assert
        assert.throws(() => { AudioHeader.fromData(data, this.mockFile, 1); });
    }

    @test
    public fromData_noVbrheaders() {
        // Arrange - MPEG2, Layer2, 64kbps, 22050kHz - padded
        const data = ByteVector.fromUInt(0xFFF48200, true);
        data.addByteVector(ByteVector.fromSize(100));
        const mockFile = TestFile.getFile(data);

        // Act
        const header = AudioHeader.fromData(data, mockFile, 0);

        // Assert
        this.assertHeader(
            header,
            64,
            2,
            418,
            2,
            22050,
            ChannelMode.Stereo,
            "MPEG Version 2 Audio, Layer 2",
            0,
            false,
            false,
            true,
            true,
            MediaTypes.Audio,
            MpegVersion.Version2
        );
        assert.strictEqual(header.xingHeader, XingHeader.unknown);
        assert.strictEqual(header.vbriHeader, VbriHeader.unknown);
    }

    @test
    public fromData_hasXingHeader() {
        // Arrange - MPEG1, Layer1, 256kbps (via flags), 44100kHz, Stereo, not padded
        const mpegFlags = ByteVector.fromUInt(0xFFFE8000, true);
        const data = ByteVector.concatenate(
            ByteVector.fromSize(1),
            mpegFlags,
            ByteVector.fromSize(32),
            ByteVector.concatenate(
                XingHeader.fileIdentifier,
                0x00, 0x00, 0x00, 0x03,
                ByteVector.fromUInt(12),
                ByteVector.fromUInt(23)
            ) // Calculates to 2kbps via Xing header
        );
        const mockFile = TestFile.getFile(data);

        // Act
        const header = AudioHeader.fromData(mpegFlags, mockFile, 1);

        // Assert
        this.assertHeader(
            header,
            2,
            2,
            2,
            1,
            44100,
            ChannelMode.Stereo,
            "MPEG Version 1 Audio, Layer 1 VBR",
            104.4,
            false,
            false,
            false,
            true,
            MediaTypes.Audio,
            MpegVersion.Version1
        );
        assert.isOk(header.xingHeader);
        assert.notEqual(header.xingHeader, XingHeader.unknown);
        assert.strictEqual(header.xingHeader.totalFrames, 12);
        assert.strictEqual(header.xingHeader.totalSize, 23);
        assert.isTrue(header.xingHeader.isPresent);

        assert.strictEqual(header.vbriHeader, VbriHeader.unknown);
    }

    @test
    public fromData_hasVbriHeader() {
        // Arrange - MPEG1, Layer1, 256kbps (via flags), 44100kHz, Stereo, not padded
        const mpegFlags = ByteVector.fromUInt(0xFFFE8000, true);
        const data = ByteVector.concatenate(
            ByteVector.fromSize(1),
            mpegFlags,
            ByteVector.fromSize(32),
            ByteVector.concatenate(
                VbriHeader.fileIdentifier,
                ByteVector.fromSize(6),
                ByteVector.fromUInt(234),
                ByteVector.fromUInt(123),
                ByteVector.fromSize(6)
            )
        );
        const mockFile = TestFile.getFile(data);

        // Act
        const header = AudioHeader.fromData(mpegFlags, mockFile, 1);

        // Assert
        this.assertHeader(
            header,
            2,
            2,
            2,
            1,
            44100,
            ChannelMode.Stereo,
            "MPEG Version 1 Audio, Layer 1 VBR",
            1000,
            false,
            false,
            false,
            true,
            MediaTypes.Audio,
            MpegVersion.Version1
        );
        assert.isOk(header.vbriHeader);
        assert.notEqual(header.vbriHeader, VbriHeader.unknown);
        assert.strictEqual(header.vbriHeader.totalFrames, 123);
        assert.strictEqual(header.vbriHeader.totalSize, 234);
        assert.isTrue(header.vbriHeader.isPresent);

        assert.strictEqual(header.xingHeader, XingHeader.unknown);
    }

    private assertHeader(
        header: AudioHeader,
        bitrate: number,
        channels: number,
        frameLength: number,
        layer: number,
        sampleRate: number,
        channelMode: ChannelMode,
        description: string,
        duration: number,
        isCopyrighted: boolean,
        isOriginal: boolean,
        isPadded: boolean,
        isProtected: boolean,
        mediaTypes: MediaTypes,
        version: MpegVersion
    ) {
        assert.ok(header);

        assert.strictEqual(header.audioBitrate, bitrate);
        assert.strictEqual(header.audioChannels, channels);
        assert.strictEqual(header.audioFrameLength, frameLength);
        assert.strictEqual(header.audioLayer, layer);
        assert.strictEqual(header.audioSampleRate, sampleRate);
        assert.strictEqual(header.channelMode, channelMode);
        assert.strictEqual(header.description, description);
        assert.approximately(header.durationMilliseconds, duration, 0.1);
        assert.strictEqual(header.isCopyrighted, isCopyrighted);
        assert.strictEqual(header.isOriginal, isOriginal);
        assert.strictEqual(header.isPadded, isPadded);
        assert.strictEqual(header.isProtected, isProtected);
        assert.strictEqual(header.mediaTypes, mediaTypes);
        assert.strictEqual(header.version, version);
    }
}

@suite class MpegAudioHeader_PropertyTests {
    @test
    public audioBitrateDuration_noVbrMpeg1Layer2_256() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz, 278 frame length
        const header = AudioHeader.fromInfo(flags, 1024, XingHeader.unknown, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
        assert.strictEqual(header.durationMilliseconds, 34.75);
    }

    @test
    public audioBitrateDuration_noVbrMpeg2Layer2_64() {
        // Arrange
        const flags = 0x148000; // MPEG2, Layer2, 64kbps, 22050kHz, 417 frame length
        const header = AudioHeader.fromInfo(flags, 1024, XingHeader.unknown, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 64);
        assert.strictEqual(header.durationMilliseconds, 156.375);
    }

    @test
    public audioBitreateDuration_noVbrMpeg25Layer3_32() {
        // Arrange
        const flags = 0x24000; // MPEG2.5, Layer3, 32kbps, 11025kHz
        const header = AudioHeader.fromInfo(flags, 1024, XingHeader.unknown, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 32);
        assert.strictEqual(header.durationMilliseconds, 260);
    }

    @test
    public audioBitrateDuration_withXingHeaderNoTotalSize_defaultsToFlags() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const xingHeader = XingHeader.fromInfo(10, 0);
        const header = AudioHeader.fromInfo(flags, 1024, xingHeader, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
        assert.approximately(header.durationMilliseconds, 87.07482993, 0.00000001);
    }

    @test
    public audioBitrate_withXingHeaderHasTotalSizeNoFrames_defaultsToFlags() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const xingHeader = XingHeader.fromInfo(0, 10);
        const header = AudioHeader.fromInfo(flags, 1024, xingHeader, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
        assert.strictEqual(header.durationMilliseconds, 34.75);
    }

    @test
    public audioBitrateDuration_withXingHeaderHasTotalSizeHasFramesHasDuration() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const xingHeader = XingHeader.fromInfo(12, 23);
        const header = AudioHeader.fromInfo(flags, 1024, xingHeader, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 2);
        assert.approximately(header.durationMilliseconds, 104.4897959, 0.0000001);
    }

    @test
    public audioBitrateDuration_withVbriHeaderNoTotalSize_defaultsToFlags() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const vbriHeader = VbriHeader.fromInfo(123, 0);
        const header = AudioHeader.fromInfo(flags, 1024, XingHeader.unknown, vbriHeader);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
        assert.strictEqual(header.durationMilliseconds, 1000);
    }

    @test
    public audioBitrate_withVbriHeaderHasTotalSizeNoFrames_defaultsToFlags() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const vbriHeader = VbriHeader.fromInfo(0, 10);
        const header = AudioHeader.fromInfo(flags, 1024, XingHeader.unknown, vbriHeader);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
        assert.strictEqual(header.durationMilliseconds, 34.75);
    }

    @test
    public audioBitrate_withVbriHeaderHasTotalSizeHasFramesHasDuration() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const vbriHeader = VbriHeader.fromInfo(123, 234);
        const header = AudioHeader.fromInfo(flags, 1024, XingHeader.unknown, vbriHeader);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 2);
        assert.strictEqual(header.durationMilliseconds, 1000);
    }

    @test
    public audioFrameLength_layer1() {
        // Test 1: Padded
        const flags1 = 0x1E8200; // MPEG1, Layer1, 256kbps, 44100kHz - padded
        const header1 = AudioHeader.fromInfo(flags1, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.audioFrameLength, 282);

        // Test 2: Unpadded
        const flags2 = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz - unpadded
        const header2 = AudioHeader.fromInfo(flags2, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.audioFrameLength, 278);
    }

    @test
    public audioFrameLength_layer2Version2() {
        // Test 1: Padded
        const flags1 = 0x148200; // MPEG2, Layer2, 64kbps, 22050kHz - padded
        const header1 = AudioHeader.fromInfo(flags1, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.audioFrameLength, 418);

        // Test 2: Unpadded
        const flags2 = 0x148000; // MPEG2, Layer2, 64kbps, 22050kHz - unpadded
        const header2 = AudioHeader.fromInfo(flags2, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.audioFrameLength, 417);
    }

    @test
    public audioFrameLength_layer3Version1() {
        // Test 1: Padded
        const flags1 = 0xA4200; // MPEG1, Layer3, 56kbps, 11025kHz - padded
        const header1 = AudioHeader.fromInfo(flags1, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.audioFrameLength, 183);

        // Test 2: Unpadded
        const flags2 = 0xA4000; // MPEG1, Layer3, 56kbps, 11025kHz - unpadded
        const header2 = AudioHeader.fromInfo(flags2, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.audioFrameLength, 182);
    }

    @test
    public audioFrameLength_layer3Version25() {
        // Test 1: Padded
        const flags1 = 0x24200; // MPEG2.5, Layer3, 32kbps, 11025kHz - padded
        const header1 = AudioHeader.fromInfo(flags1, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.audioFrameLength, 209);

        // Test 2: Unpadded
        const flags2 = 0x24000; // MPEG2.5, Layer3, 32kbps, 11025kHz - unpadded
        const header2 = AudioHeader.fromInfo(flags2, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.audioFrameLength, 208);
    }

    @test
    public audioLayer_layer1() {
        // Test 1: 00
        const flags1 = 0xFFF9FFFF;
        const header1 = AudioHeader.fromInfo(flags1, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.audioLayer, 1);

        // Test 2: 11
        const flags2 = 0xFFFFFFFF;
        const header2 = AudioHeader.fromInfo(flags2, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.audioLayer, 1);
    }

    @test
    public audioLayer_layer2() {
        const flags = 0xFFFDFFFF;
        const header = AudioHeader.fromInfo(flags, 0, XingHeader.unknown, VbriHeader.unknown);

        // Act / Assert
        assert.strictEqual(header.audioLayer, 2);
    }

    @test
    public audioLayer_layer3() {
        const flags = 0xFFFBFFFF;
        const header = AudioHeader.fromInfo(flags, 0, XingHeader.unknown, VbriHeader.unknown);

        // Act / Assert
        assert.strictEqual(header.audioLayer, 3);
    }

    @test
    public audioSampleRate() {
        // Test 1: Version 1
        const header1 = AudioHeader.fromInfo(0xFFFFF7FF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.audioSampleRate, 48000);

        // Test 2: Version 2
        const header2 = AudioHeader.fromInfo(0xFFF7F7FF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.audioSampleRate, 24000);

        // Test 3: Version 3
        const header3 = AudioHeader.fromInfo(0xFFE7F7FF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header3.audioSampleRate, 12000);
    }

    @test
    public channels() {
        // Test 1: Stereo
        const header1 = AudioHeader.fromInfo(0xFFFFFF3F, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.channelMode, ChannelMode.Stereo);
        assert.strictEqual(header1.audioChannels, 2);

        // Test 2: Joint Stereo
        const header2 = AudioHeader.fromInfo(0xFFFFFF7F, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.channelMode, ChannelMode.JointStereo);
        assert.strictEqual(header2.audioChannels, 2);

        // Test 3: Dual Stereo
        const header3 = AudioHeader.fromInfo(0xFFFFFFBF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header3.channelMode, ChannelMode.DualChannel);
        assert.strictEqual(header3.audioChannels, 2);

        // Test 4: Mono
        const header4 = AudioHeader.fromInfo(0xFFFFFFFF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header4.channelMode, ChannelMode.SingleChannel);
        assert.strictEqual(header4.audioChannels, 1);
    }

    @test
    public isCopyrighted() {
        // Test 1: 00 => false
        const header1 = AudioHeader.fromInfo(0xFFFFFFE7, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isFalse(header1.isCopyrighted);

        // Test 2: 01 => true
        const header2 = AudioHeader.fromInfo(0xFFFFFFEF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isTrue(header2.isCopyrighted);
    }

    @test
    public isOriginal() {
        // Test 1: 00 => false
        const header1 = AudioHeader.fromInfo(0xFFFFFFF3, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isFalse(header1.isOriginal);

        // Test 2: 01 => true
        const header2 = AudioHeader.fromInfo(0xFFFFFFFF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isTrue(header2.isOriginal);
    }

    @test
    public isPadded() {
        // Test 1: 0 => false
        const header1 = AudioHeader.fromInfo(0xFFFFFFF3, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isFalse(header1.isOriginal);

        // Test 2: 1 => true
        const header2 = AudioHeader.fromInfo(0xFFFFFFFF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isTrue(header2.isOriginal);
    }

    @test
    public isProtected() {
        // Test 1: 0 => true
        const header1 = AudioHeader.fromInfo(0xFFFEFFFF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isTrue(header1.isProtected);

        // Test 2: 1 => false
        const header2 = AudioHeader.fromInfo(0xFFFFFFFF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isFalse(header2.isProtected);
    }

    @test
    public streamLength_set_noVbr() {
        // Arrange - MPEG2, Layer2, 64kbps, 22050kHz - padded
        const header = AudioHeader.fromInfo(0xFFF48200, 1234, XingHeader.unknown, VbriHeader.unknown);
        const _ = header.durationMilliseconds; // Force calculation of durationMilliseconds

        // Act
        header.streamLength = 2345;

        // Assert - duration has been recalculated with new stream length
        assert.strictEqual(header.durationMilliseconds, 313.5);
    }

    @test
    public streamLength_set_withXingHeader() {
        // Arrange - MPEG2, Layer2, 64kbps, 22050kHz - padded
        const xingHeader = XingHeader.fromInfo(123, 234);
        const header = AudioHeader.fromInfo(0xFFF48200, 1234, xingHeader, VbriHeader.unknown);
        const originalDuration = header.durationMilliseconds; // Force calculation of durationMilliseconds

        // Act
        header.streamLength = 2345;

        // Assert - Duration has not been recalculated
        assert.strictEqual(header.durationMilliseconds, originalDuration);
    }

    @test
    public streamLength_set_withVbriHeader() {
        // Arrange - MPEG2, Layer2, 64kbps, 22050kHz - padded
        const vbriHeader = VbriHeader.fromInfo(123, 234);
        const header = AudioHeader.fromInfo(0xFFF48200, 1234, XingHeader.unknown, vbriHeader);
        const originalDuration = header.durationMilliseconds; // Force calculation of durationMilliseconds

        // Act
        header.streamLength = 2345;

        // Assert - Duration has not been recalculated
        assert.strictEqual(header.durationMilliseconds, originalDuration);
    }

    @test
    public version_version1() {
        // Test 1: 01
        const flags1 = 0xFFFEFFFF;
        const header1 = AudioHeader.fromInfo(flags1, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.version, MpegVersion.Version1);

        // Test 2: 11
        const flags2 = 0xFFFFFFFF;
        const header2 = AudioHeader.fromInfo(flags2, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.version, MpegVersion.Version1);
    }

    @test
    public version_version2() {
        // Arrange
        const flags = 0xFFF7FFFF;
        const header = AudioHeader.fromInfo(flags, 0, XingHeader.unknown, VbriHeader.unknown);

        // Act / Assert
        assert.strictEqual(header.version, MpegVersion.Version2);
    }

    @test
    public version_version25() {
        // Arrange
        const flags = 0xFFE7FFFF;
        const header = AudioHeader.fromInfo(flags, 0, XingHeader.unknown, VbriHeader.unknown);

        // Act / Assert
        assert.strictEqual(header.version, MpegVersion.Version25);
    }
}

@suite class MpegAudioHeader_MethodTests {
    @test
    public find_invalidParameters() {
        // Arrange
        const mockFile = TestFile.getFile(ByteVector.empty());

        // Act / Assert
        assert.throws(() => { AudioHeader.find(undefined, 123, 234); });
        assert.throws(() => { AudioHeader.find(null, 123, 234); });
        assert.throws(() => { AudioHeader.find(mockFile, 1.23, 234); });
        assert.throws(() => { AudioHeader.find(mockFile, Number.MIN_SAFE_INTEGER - 1, 234); });
        assert.throws(() => { AudioHeader.find(mockFile, Number.MAX_SAFE_INTEGER + 1, 234); });
        assert.throws(() => { AudioHeader.find(mockFile, 123, 2.34); });
        assert.throws(() => { AudioHeader.find(mockFile, 123, Number.MIN_SAFE_INTEGER - 1); });
        assert.throws(() => { AudioHeader.find(mockFile, 123, Number.MAX_SAFE_INTEGER + 1); });
    }

    @test
    public find_lessThan3BytesAtPosition() {
        // Arrange
        const data = ByteVector.fromSize(3);
        const mockFile = TestFile.getFile(data);

        // Act
        const result = AudioHeader.find(mockFile, 1);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.header, AudioHeader.Unknown);
        assert.isFalse(result.success);
    }

    @test
    public find_notInFile_noLimit() {
        // Arrange
        const data = ByteVector.fromSize(File.bufferSize * 2);
        const mockFile = TestFile.getFile(data);

        // Act
        const result = AudioHeader.find(mockFile, 1);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.header, AudioHeader.Unknown);
        assert.isFalse(result.success);
    }

    @test
    public find_inFile_notFoundWithinLimit() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(File.bufferSize * 2),
            ByteVector.fromUInt(0xFFF48200, true),
            ByteVector.fromSize(100)
        );
        const mockFile = TestFile.getFile(data);

        // Act
        const result = AudioHeader.find(mockFile, 1, 1024);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.header, AudioHeader.Unknown);
        assert.isFalse(result.success);
    }

    @test
    public find_inFile() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(File.bufferSize),
            ByteVector.fromUInt(0xFFF48200, true),
            ByteVector.fromSize(100)
        );
        const mockFile = TestFile.getFile(data);

        // Act
        const result = AudioHeader.find(mockFile, 1);

        // Assert
        assert.isOk(result);
        assert.notEqual(result.header, AudioHeader.Unknown);
        assert.isTrue(result.success);
    }
}
