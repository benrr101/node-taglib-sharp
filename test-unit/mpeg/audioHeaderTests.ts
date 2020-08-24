import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {suite, test} from "mocha-typescript";

import VbriHeader from "../../src/mpeg/vbriHeader";
import XingHeader from "../../src/mpeg/xingHeader";
import {AudioHeader} from "../../src/mpeg/audioHeader";
import {ChannelMode, MpegVersion} from "../../src/mpeg/mpegEnums";
import {MediaTypes} from "../../src";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class MpegAudioHeaderTests_ConstructorTests {
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

    // @TODO: fromData

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
        assert.strictEqual(header.audioBitrate, bitrate);
        assert.strictEqual(header.audioChannels, channels);
        assert.strictEqual(header.audioFrameLength, frameLength);
        assert.strictEqual(header.audioLayer, layer);
        assert.strictEqual(header.audioSampleRate, sampleRate);
        assert.strictEqual(header.channelMode, channelMode);
        assert.strictEqual(header.description, description);
        assert.strictEqual(header.durationMilliseconds, duration);
        assert.strictEqual(header.isCopyrighted, isCopyrighted);
        assert.strictEqual(header.isOriginal, isOriginal);
        assert.strictEqual(header.isPadded, isPadded);
        assert.strictEqual(header.isProtected, isProtected);
        assert.strictEqual(header.mediaTypes, mediaTypes);
        assert.strictEqual(header.version, version);
    }
}

@suite class MpegAudioHeaderTests_PropertyTests {
    @test
    public audioBitrate_noVbrMpeg1Layer2_256() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const header = AudioHeader.fromInfo(flags, 0, XingHeader.unknown, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
    }

    @test
    public audioBitrate_noVbrMpeg2Layer2_64() {
        // Arrange
        const flags = 0x148000; // MPEG2, Layer2, 64kbps, 22050kHz
        const header = AudioHeader.fromInfo(flags, 0, XingHeader.unknown, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 64);
    }

    @test
    public audioBitreate_noVbrMpeg25Layer3_32() {
        // Arrange
        const flags = 0x24000; // MPEG2.5, Layer3, 32kbps, 11025kHz
        const header = AudioHeader.fromInfo(flags, 0, XingHeader.unknown, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 32);
    }

    @test
    public audioBitrate_withXingHeaderNoTotalSize_defaultsToFlags() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const xingHeader = XingHeader.fromInfo(10, 0);
        const header = AudioHeader.fromInfo(flags, 0, xingHeader, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
    }

    @test
    public audioBitrate_withXingHeaderHasTotalSizeNoFrames_defaultsToFlags() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const xingHeader = XingHeader.fromInfo(0, 10);
        const header = AudioHeader.fromInfo(flags, 0, xingHeader, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
    }

    @test
    public audioBitrate_withXingHeaderHasTotalSizeHasFramesHasDuration_2() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const xingHeader = XingHeader.fromInfo(12, 23);
        const header = AudioHeader.fromInfo(flags, 0, xingHeader, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 2);
    }

    @test
    public audioBitrate_withVbriHeaderNoTotalSize_defaultsToFlags() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const vbriHeader = VbriHeader.fromInfo(10, 0);
        const header = AudioHeader.fromInfo(flags, 0, XingHeader.unknown, vbriHeader);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
    }

    @test
    public audioBitrate_withVbriHeaderHasTotalSizeNoFrames_defaultsToFlags() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const vbriHeader = VbriHeader.fromInfo(0, 10);
        const header = AudioHeader.fromInfo(flags, 0, XingHeader.unknown, vbriHeader);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 256);
    }

    @test
    public audioBitrate_withVbriHeaderHasTotalSizeHasFramesHasDuration_() {
        // Arrange
        const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
        const xingHeader = XingHeader.fromInfo(12, 23);
        const header = AudioHeader.fromInfo(flags, 0, xingHeader, VbriHeader.unknown);

        // Act/Assert
        assert.strictEqual(header.audioBitrate, 2);
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
}
