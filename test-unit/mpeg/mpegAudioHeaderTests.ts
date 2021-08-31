import * as Chai from "chai";
import * as TypeMoq from "typemoq";
import {suite, test} from "@testdeck/mocha";

import MpegAudioHeader from "../../src/mpeg/mpegAudioHeader";
import TestFile from "../utilities/testFile";
import VbriHeader from "../../src/mpeg/vbriHeader";
import XingHeader from "../../src/mpeg/xingHeader";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {MediaTypes} from "../../src/iCodec";
import {ChannelMode, MpegVersion} from "../../src/mpeg/mpegEnums";
import {Testers} from "../utilities/testers";

// Setup chai
const assert = Chai.assert;

@suite class Mpeg_AudioHeader_ConstructorTests {
    private mockFile = TypeMoq.Mock.ofType<File>().object;

    @test
    public unknownHeader() {
        // Act
        const header = MpegAudioHeader.Unknown;

        // Assert
        Mpeg_AudioHeader_ConstructorTests.assertHeader(
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
        Testers.testSafeUint((v: number) => {
            MpegAudioHeader.fromInfo(v, 123, XingHeader.unknown, VbriHeader.unknown);
        });
        Testers.testSafeUint((v: number) => {
            MpegAudioHeader.fromInfo(123, v, XingHeader.unknown, VbriHeader.unknown);
        });
        Testers.testTruthy((v: XingHeader) => { MpegAudioHeader.fromInfo(123, 123, v, VbriHeader.unknown); });
        Testers.testTruthy((v: VbriHeader) => { MpegAudioHeader.fromInfo(123, 123, XingHeader.unknown, v); });
    }

    @test
    public fromInfo_validArguments() {
        // Act
        const header = MpegAudioHeader.fromInfo(0, 0, XingHeader.unknown, VbriHeader.unknown);

        // Assert
        Mpeg_AudioHeader_ConstructorTests.assertHeader(
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
        Testers.testTruthy((v: ByteVector) => { MpegAudioHeader.fromData(v, this.mockFile, 1); });
        Testers.testTruthy((v: File) => { MpegAudioHeader.fromData(data, v, 1); });
        Testers.testUint((v: number) => { MpegAudioHeader.fromData(data, this.mockFile, v); });
    }

    @test
    public fromData_headerTooShort() {
        // Arrange
        const data = ByteVector.fromSize(2);

        // Act / Assert
        assert.throws(() => { MpegAudioHeader.fromData(data, this.mockFile, 1); });
    }

    @test
    public fromData_headerDoesNotStartWithSyncByte() {
        // Arrange
        const data = ByteVector.fromSize(4);
        data.set(0, 0xEE);

        // Act / Assert
        assert.throws(() => { MpegAudioHeader.fromData(data, this.mockFile, 1); });
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
        assert.throws(() => { MpegAudioHeader.fromData(data1, this.mockFile, 1); });
        assert.throws(() => { MpegAudioHeader.fromData(data2, this.mockFile, 1); });
    }

    @test
    public fromData_invalidBitrate() {
        // Arrange
        const data = ByteVector.fromSize(4);
        data.set(0, 0xFF);
        data.set(1, 0xF2);
        data.set(2, 0xF0);

        // Act / Assert
        assert.throws(() => { MpegAudioHeader.fromData(data, this.mockFile, 1); });
    }

    @test
    public fromData_invalidSampleRate() {
        // Arrange
        const data = ByteVector.fromSize(4);
        data.set(0, 0xFF);
        data.set(1, 0xF2);
        data.set(2, 0xEC);

        // Act / Assert
        assert.throws(() => { MpegAudioHeader.fromData(data, this.mockFile, 1); });
    }

    @test
    public fromData_noVbrHeaders() {
        // Arrange - MPEG2, Layer2, 64kbps, 22050kHz - padded
        const data = ByteVector.fromUInt(0xFFF48200, true);
        data.addByteVector(ByteVector.fromSize(100));
        const mockFile = TestFile.getFile(data);

        // Act
        const header = MpegAudioHeader.fromData(data, mockFile, 0);

        // Assert
        Mpeg_AudioHeader_ConstructorTests.assertHeader(
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
        const header = MpegAudioHeader.fromData(mpegFlags, mockFile, 1);

        // Assert
        Mpeg_AudioHeader_ConstructorTests.assertHeader(
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
        const header = MpegAudioHeader.fromData(mpegFlags, mockFile, 1);

        // Assert
        Mpeg_AudioHeader_ConstructorTests.assertHeader(
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

    private static assertHeader(
        header: MpegAudioHeader,
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

@suite class Mpeg_AudioHeader_PropertyTests {
    @test
    public audioBitrateDuration_noVbrMpeg1Layer2_256() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz, 278 frame length
        const header = MpegAudioHeader.fromInfo(flags, 1024, XingHeader.unknown, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
        assert.strictEqual(header.durationMilliseconds, 34.75);
    }

    @test
    public audioBitrateDuration_noVbrMpeg2Layer2_64() {
        // Arrange
        const flags = 0x148000; // MPEG2, Layer2, 64kbps, 22050kHz, 417 frame length
        const header = MpegAudioHeader.fromInfo(flags, 1024, XingHeader.unknown, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 64);
        assert.strictEqual(header.durationMilliseconds, 156.375);
    }

    @test
    public audioBitrateDuration_noVbrMpeg25Layer3_32() {
        // Arrange
        const flags = 0x24000; // MPEG2.5, Layer3, 32kbps, 11025kHz
        const header = MpegAudioHeader.fromInfo(flags, 1024, XingHeader.unknown, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 32);
        assert.strictEqual(header.durationMilliseconds, 260);
    }

    @test
    public audioBitrateDuration_withXingHeaderNoTotalSize_defaultsToFlags() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const xingHeader = XingHeader.fromInfo(10, 0);
        const header = MpegAudioHeader.fromInfo(flags, 1024, xingHeader, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
        assert.approximately(header.durationMilliseconds, 87.07482993, 0.00000001);
    }

    @test
    public audioBitrate_withXingHeaderHasTotalSizeNoFrames_defaultsToFlags() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const xingHeader = XingHeader.fromInfo(0, 10);
        const header = MpegAudioHeader.fromInfo(flags, 1024, xingHeader, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
        assert.strictEqual(header.durationMilliseconds, 34.75);
    }

    @test
    public audioBitrateDuration_withXingHeaderHasTotalSizeHasFramesHasDuration() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const xingHeader = XingHeader.fromInfo(12, 23);
        const header = MpegAudioHeader.fromInfo(flags, 1024, xingHeader, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 2);
        assert.approximately(header.durationMilliseconds, 104.4897959, 0.0000001);
    }

    @test
    public audioBitrateDuration_withVbriHeaderNoTotalSize_defaultsToFlags() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const vbriHeader = VbriHeader.fromInfo(123, 0);
        const header = MpegAudioHeader.fromInfo(flags, 1024, XingHeader.unknown, vbriHeader);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
        assert.strictEqual(header.durationMilliseconds, 1000);
    }

    @test
    public audioBitrate_withVbriHeaderHasTotalSizeNoFrames_defaultsToFlags() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const vbriHeader = VbriHeader.fromInfo(0, 10);
        const header = MpegAudioHeader.fromInfo(flags, 1024, XingHeader.unknown, vbriHeader);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
        assert.strictEqual(header.durationMilliseconds, 34.75);
    }

    @test
    public audioBitrate_withVbriHeaderHasTotalSizeHasFramesHasDuration() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const vbriHeader = VbriHeader.fromInfo(123, 234);
        const header = MpegAudioHeader.fromInfo(flags, 1024, XingHeader.unknown, vbriHeader);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 2);
        assert.strictEqual(header.durationMilliseconds, 1000);
    }

    @test
    public audioFrameLength_layer1() {
        // Test 1: Padded
        const flags1 = 0x1E8200; // MPEG1, Layer1, 256kbps, 44100kHz - padded
        const header1 = MpegAudioHeader.fromInfo(flags1, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.audioFrameLength, 282);

        // Test 2: Unpadded
        const flags2 = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz - unpadded
        const header2 = MpegAudioHeader.fromInfo(flags2, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.audioFrameLength, 278);
    }

    @test
    public audioFrameLength_layer2Version2() {
        // Test 1: Padded
        const flags1 = 0x148200; // MPEG2, Layer2, 64kbps, 22050kHz - padded
        const header1 = MpegAudioHeader.fromInfo(flags1, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.audioFrameLength, 418);

        // Test 2: Unpadded
        const flags2 = 0x148000; // MPEG2, Layer2, 64kbps, 22050kHz - unpadded
        const header2 = MpegAudioHeader.fromInfo(flags2, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.audioFrameLength, 417);
    }

    @test
    public audioFrameLength_layer3Version1() {
        // Test 1: Padded
        const flags1 = 0xA4200; // MPEG1, Layer3, 56kbps, 11025kHz - padded
        const header1 = MpegAudioHeader.fromInfo(flags1, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.audioFrameLength, 183);

        // Test 2: Unpadded
        const flags2 = 0xA4000; // MPEG1, Layer3, 56kbps, 11025kHz - unpadded
        const header2 = MpegAudioHeader.fromInfo(flags2, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.audioFrameLength, 182);
    }

    @test
    public audioFrameLength_layer3Version25() {
        // Test 1: Padded
        const flags1 = 0x24200; // MPEG2.5, Layer3, 32kbps, 11025kHz - padded
        const header1 = MpegAudioHeader.fromInfo(flags1, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.audioFrameLength, 209);

        // Test 2: Unpadded
        const flags2 = 0x24000; // MPEG2.5, Layer3, 32kbps, 11025kHz - unpadded
        const header2 = MpegAudioHeader.fromInfo(flags2, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.audioFrameLength, 208);
    }

    @test
    public audioLayer_layer1() {
        // Test 1: 00
        const flags1 = 0xFFF9FFFF;
        const header1 = MpegAudioHeader.fromInfo(flags1, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.audioLayer, 1);

        // Test 2: 11
        const flags2 = 0xFFFFFFFF;
        const header2 = MpegAudioHeader.fromInfo(flags2, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.audioLayer, 1);
    }

    @test
    public audioLayer_layer2() {
        const flags = 0xFFFDFFFF;
        const header = MpegAudioHeader.fromInfo(flags, 0, XingHeader.unknown, VbriHeader.unknown);

        // Act / Assert
        assert.strictEqual(header.audioLayer, 2);
    }

    @test
    public audioLayer_layer3() {
        const flags = 0xFFFBFFFF;
        const header = MpegAudioHeader.fromInfo(flags, 0, XingHeader.unknown, VbriHeader.unknown);

        // Act / Assert
        assert.strictEqual(header.audioLayer, 3);
    }

    @test
    public audioSampleRate() {
        // Test 1: Version 1
        const header1 = MpegAudioHeader.fromInfo(0xFFFFF7FF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.audioSampleRate, 48000);

        // Test 2: Version 2
        const header2 = MpegAudioHeader.fromInfo(0xFFF7F7FF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.audioSampleRate, 24000);

        // Test 3: Version 3
        const header3 = MpegAudioHeader.fromInfo(0xFFE7F7FF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header3.audioSampleRate, 12000);
    }

    @test
    public channels() {
        // Test 1: Stereo
        const header1 = MpegAudioHeader.fromInfo(0xFFFFFF3F, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.channelMode, ChannelMode.Stereo);
        assert.strictEqual(header1.audioChannels, 2);

        // Test 2: Joint Stereo
        const header2 = MpegAudioHeader.fromInfo(0xFFFFFF7F, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.channelMode, ChannelMode.JointStereo);
        assert.strictEqual(header2.audioChannels, 2);

        // Test 3: Dual Stereo
        const header3 = MpegAudioHeader.fromInfo(0xFFFFFFBF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header3.channelMode, ChannelMode.DualChannel);
        assert.strictEqual(header3.audioChannels, 2);

        // Test 4: Mono
        const header4 = MpegAudioHeader.fromInfo(0xFFFFFFFF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header4.channelMode, ChannelMode.SingleChannel);
        assert.strictEqual(header4.audioChannels, 1);
    }

    @test
    public isCopyrighted() {
        // Test 1: 00 => false
        const header1 = MpegAudioHeader.fromInfo(0xFFFFFFE7, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isFalse(header1.isCopyrighted);

        // Test 2: 01 => true
        const header2 = MpegAudioHeader.fromInfo(0xFFFFFFEF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isTrue(header2.isCopyrighted);
    }

    @test
    public isOriginal() {
        // Test 1: 00 => false
        const header1 = MpegAudioHeader.fromInfo(0xFFFFFFF3, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isFalse(header1.isOriginal);

        // Test 2: 01 => true
        const header2 = MpegAudioHeader.fromInfo(0xFFFFFFFF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isTrue(header2.isOriginal);
    }

    @test
    public isPadded() {
        // Test 1: 0 => false
        const header1 = MpegAudioHeader.fromInfo(0xFFFFFFF3, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isFalse(header1.isOriginal);

        // Test 2: 1 => true
        const header2 = MpegAudioHeader.fromInfo(0xFFFFFFFF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isTrue(header2.isOriginal);
    }

    @test
    public isProtected() {
        // Test 1: 0 => true
        const header1 = MpegAudioHeader.fromInfo(0xFFFEFFFF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isTrue(header1.isProtected);

        // Test 2: 1 => false
        const header2 = MpegAudioHeader.fromInfo(0xFFFFFFFF, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.isFalse(header2.isProtected);
    }

    @test
    public streamLength_set_noVbr() {
        // Arrange - MPEG2, Layer2, 64kbps, 22050kHz - padded
        const header = MpegAudioHeader.fromInfo(0xFFF48200, 1234, XingHeader.unknown, VbriHeader.unknown);
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
        const header = MpegAudioHeader.fromInfo(0xFFF48200, 1234, xingHeader, VbriHeader.unknown);
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
        const header = MpegAudioHeader.fromInfo(0xFFF48200, 1234, XingHeader.unknown, vbriHeader);
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
        const header1 = MpegAudioHeader.fromInfo(flags1, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header1.version, MpegVersion.Version1);

        // Test 2: 11
        const flags2 = 0xFFFFFFFF;
        const header2 = MpegAudioHeader.fromInfo(flags2, 0, XingHeader.unknown, VbriHeader.unknown);
        assert.strictEqual(header2.version, MpegVersion.Version1);
    }

    @test
    public version_version2() {
        // Arrange
        const flags = 0xFFF7FFFF;
        const header = MpegAudioHeader.fromInfo(flags, 0, XingHeader.unknown, VbriHeader.unknown);

        // Act / Assert
        assert.strictEqual(header.version, MpegVersion.Version2);
    }

    @test
    public version_version25() {
        // Arrange
        const flags = 0xFFE7FFFF;
        const header = MpegAudioHeader.fromInfo(flags, 0, XingHeader.unknown, VbriHeader.unknown);

        // Act / Assert
        assert.strictEqual(header.version, MpegVersion.Version25);
    }
}

@suite class Mpeg_AudioHeader_MethodTests {
    @test
    public find_invalidParameters() {
        // Arrange
        const mockFile = TestFile.getFile(ByteVector.empty());

        // Act / Assert
        Testers.testTruthy((v: File) => { MpegAudioHeader.find(v, 123, 234); });
        Testers.testSafeInt((v: number) => { MpegAudioHeader.find(mockFile, v, 234); });
        Testers.testSafeInt((v: number) => { MpegAudioHeader.find(mockFile, 123, v); }, true);
    }

    @test
    public find_lessThan3BytesAtPosition() {
        // Arrange
        const data = ByteVector.fromSize(3);
        const mockFile = TestFile.getFile(data);

        // Act
        const result = MpegAudioHeader.find(mockFile, 1);

        // Assert
        assert.isNotOk(result);
    }

    @test
    public find_notInFile_noLimit() {
        // Arrange
        const data = ByteVector.fromSize(File.bufferSize * 2);
        const mockFile = TestFile.getFile(data);

        // Act
        const result = MpegAudioHeader.find(mockFile, 1);

        // Assert
        assert.isNotOk(result);
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
        const result = MpegAudioHeader.find(mockFile, 1, 1024);

        // Assert
        assert.isNotOk(result);
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
        const result = MpegAudioHeader.find(mockFile, 1);

        // Assert
        assert.isOk(result);
        assert.notEqual(result, MpegAudioHeader.Unknown);
    }
}
