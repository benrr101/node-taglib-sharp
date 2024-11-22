import * as TypeMoq from "typemoq";
import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import MpegAudioHeader from "../../src/mpeg/mpegAudioHeader";
import TestFile from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {MediaTypes} from "../../src/properties";
import {ChannelMode, MpegVersion} from "../../src/mpeg/mpegEnums";
import {Allow, Testers} from "../utilities/testers";

@suite class Mpeg_AudioHeader_ConstructorTests {
    private mockFile = TypeMoq.Mock.ofType<File>().object;

    @test
    public fromFile_invalidArguments() {
        // Arrange
        const data = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: File) => { MpegAudioHeader.fromFile(v, 1, 2); });
        Testers.testSafeUint((v: number) => { MpegAudioHeader.fromFile(this.mockFile, v, 1); });
        Testers.testSafeUint((v: number) => { MpegAudioHeader.fromFile(this.mockFile, 1, v); });
        Testers.testSafeUint((v: number) => { MpegAudioHeader.fromFile(this.mockFile, 1, 2, v)}, Allow.Undefined);
    }

    @test
    public fromFile_fileTooShort() {
        // Act / Assert
        // Total file length too short
        assert.isUndefined(MpegAudioHeader.fromFile(TestFile.getFile(ByteVector.fromSize(2)), 0, 2))

        // Start position to file end is too short
        assert.isUndefined(MpegAudioHeader.fromFile(TestFile.getFile(ByteVector.fromSize(6)), 4, 6));

        // File beginning to end position is too short
        assert.isUndefined(MpegAudioHeader.fromFile(TestFile.getFile(ByteVector.fromSize(6)), 0, 2));
    }

    @test
    public fromFile_fileDoesNotContainMpegSyncByte1() {
        // Arrange
        // Note: bytes 0-1 and 5-6 are valid, but should be excluded by start/end bounds
        const file = TestFile.getFile([0xFF, 0xE6, 0xEE, 0xEE, 0xEE, 0xFF, 0xE6]);

        // Act / Assert
        assert.isUndefined(MpegAudioHeader.fromFile(file, 1, 6));
    }

    @test
    public fromFile_fileDoesNotContainMpegSyncByte2_first3BitsNotSet() {
        // Arrange
        // Note: bytes 0-1 and 5-6 are valid, but should be excluded by start/end bounds
        const file = TestFile.getFile([0xFF, 0xE6, 0xFF, 0xD6, 0xFF, 0xFF, 0xE6]);

        // Act / Assert
        assert.isUndefined(MpegAudioHeader.fromFile(file, 1, 6));
    }

    @test
    public fromFile_fileDoesNotContainMpegSyncByte2_reservedVersion() {
        // Arrange
        // Note: bytes 0-1 and 5-6 are valid, but should be excluded by start/end bounds
        const file = TestFile.getFile([0xFF, 0xE6, 0xFF, 0xF8, 0xFF, 0xFF, 0xE6]);

        // Act / Assert
        assert.isUndefined(MpegAudioHeader.fromFile(file, 1, 6));
    }

    @test
    public fromFile_fileDoesNotContainMpegSyncByte2_reservedBitrate() {
        // Arrange
        // Note: bytes 0-1 and 5-6 are valid, but should be excluded by start/end bounds
        const file = TestFile.getFile([0xFF, 0xE6, 0xFF, 0xE9, 0xFF, 0xFF, 0xE6]);

        // Act / Assert
        assert.isUndefined(MpegAudioHeader.fromFile(file, 1, 6));
    }

    @test
    public fromFile_bitrate_noVbrHeader() {
        const testCases = [
            {bytes: [0xFE, 0x00], bitrate: 0},   // V1, L1
            {bytes: [0xFE, 0x10], bitrate: 32},
            {bytes: [0xFE, 0x20], bitrate: 64},
            {bytes: [0xFE, 0x30], bitrate: 96},
            {bytes: [0xFE, 0x40], bitrate: 128},
            {bytes: [0xFE, 0x50], bitrate: 160},
            {bytes: [0xFE, 0x60], bitrate: 192},
            {bytes: [0xFE, 0x70], bitrate: 224},
            {bytes: [0xFE, 0x80], bitrate: 256},
            {bytes: [0xFE, 0x90], bitrate: 288},
            {bytes: [0xFE, 0xA0], bitrate: 320},
            {bytes: [0xFE, 0xB0], bitrate: 352},
            {bytes: [0xFE, 0xC0], bitrate: 384},
            {bytes: [0xFE, 0xD0], bitrate: 416},
            {bytes: [0xFE, 0xE0], bitrate: 448},
            {bytes: [0xFC, 0x00], bitrate: 0},   // V1, L2
            {bytes: [0xFC, 0x10], bitrate: 32},
            {bytes: [0xFC, 0x20], bitrate: 48},
            {bytes: [0xFC, 0x30], bitrate: 56},
            {bytes: [0xFC, 0x40], bitrate: 64},
            {bytes: [0xFC, 0x50], bitrate: 80},
            {bytes: [0xFC, 0x60], bitrate: 96},
            {bytes: [0xFC, 0x70], bitrate: 112},
            {bytes: [0xFC, 0x80], bitrate: 128},
            {bytes: [0xFC, 0x90], bitrate: 160},
            {bytes: [0xFC, 0xA0], bitrate: 192},
            {bytes: [0xFC, 0xB0], bitrate: 224},
            {bytes: [0xFC, 0xC0], bitrate: 256},
            {bytes: [0xFC, 0xD0], bitrate: 320},
            {bytes: [0xFC, 0xE0], bitrate: 384},
            {bytes: [0xFA, 0x00], bitrate: 0},   // V1, L3
            {bytes: [0xFA, 0x10], bitrate: 32},
            {bytes: [0xFA, 0x20], bitrate: 40},
            {bytes: [0xFA, 0x30], bitrate: 48},
            {bytes: [0xFA, 0x40], bitrate: 56},
            {bytes: [0xFA, 0x50], bitrate: 64},
            {bytes: [0xFA, 0x60], bitrate: 80},
            {bytes: [0xFA, 0x70], bitrate: 96},
            {bytes: [0xFA, 0x80], bitrate: 112},
            {bytes: [0xFA, 0x90], bitrate: 128},
            {bytes: [0xFA, 0xA0], bitrate: 160},
            {bytes: [0xFA, 0xB0], bitrate: 192},
            {bytes: [0xFA, 0xC0], bitrate: 224},
            {bytes: [0xFA, 0xD0], bitrate: 256},
            {bytes: [0xFA, 0xE0], bitrate: 320},
            {bytes: [0xF6, 0x00], bitrate: 0},   // V2, L1
            {bytes: [0xF6, 0x10], bitrate: 32},
            {bytes: [0xF6, 0x20], bitrate: 48},
            {bytes: [0xF6, 0x30], bitrate: 56},
            {bytes: [0xF6, 0x40], bitrate: 64},
            {bytes: [0xF6, 0x50], bitrate: 80},
            {bytes: [0xF6, 0x60], bitrate: 96},
            {bytes: [0xF6, 0x70], bitrate: 112},
            {bytes: [0xF6, 0x80], bitrate: 128},
            {bytes: [0xF6, 0x90], bitrate: 144},
            {bytes: [0xF6, 0xA0], bitrate: 160},
            {bytes: [0xF6, 0xB0], bitrate: 176},
            {bytes: [0xF6, 0xC0], bitrate: 192},
            {bytes: [0xF6, 0xD0], bitrate: 224},
            {bytes: [0xF6, 0xE0], bitrate: 256},
            {bytes: [0xF4, 0x00], bitrate: 0},   // V2, L2
            {bytes: [0xF4, 0x10], bitrate: 8},
            {bytes: [0xF4, 0x20], bitrate: 16},
            {bytes: [0xF4, 0x30], bitrate: 24},
            {bytes: [0xF4, 0x40], bitrate: 32},
            {bytes: [0xF4, 0x50], bitrate: 40},
            {bytes: [0xF4, 0x60], bitrate: 48},
            {bytes: [0xF4, 0x70], bitrate: 56},
            {bytes: [0xF4, 0x80], bitrate: 64},
            {bytes: [0xF4, 0x90], bitrate: 80},
            {bytes: [0xF4, 0xA0], bitrate: 96},
            {bytes: [0xF4, 0xB0], bitrate: 112},
            {bytes: [0xF4, 0xC0], bitrate: 128},
            {bytes: [0xF4, 0xD0], bitrate: 144},
            {bytes: [0xF4, 0xE0], bitrate: 160},
            {bytes: [0xF2, 0x00], bitrate: 0},   // V2, L3
            {bytes: [0xF2, 0x10], bitrate: 8},
            {bytes: [0xF2, 0x20], bitrate: 16},
            {bytes: [0xF2, 0x30], bitrate: 24},
            {bytes: [0xF2, 0x40], bitrate: 32},
            {bytes: [0xF2, 0x50], bitrate: 40},
            {bytes: [0xF2, 0x60], bitrate: 48},
            {bytes: [0xF2, 0x70], bitrate: 56},
            {bytes: [0xF2, 0x80], bitrate: 64},
            {bytes: [0xF2, 0x90], bitrate: 80},
            {bytes: [0xF2, 0xA0], bitrate: 96},
            {bytes: [0xF2, 0xB0], bitrate: 112},
            {bytes: [0xF2, 0xC0], bitrate: 128},
            {bytes: [0xF2, 0xD0], bitrate: 144},
            {bytes: [0xF2, 0xE0], bitrate: 160},
            {bytes: [0xE6, 0x00], bitrate: 0},   // V2.5, L1
            {bytes: [0xE6, 0x10], bitrate: 32},
            {bytes: [0xE6, 0x20], bitrate: 48},
            {bytes: [0xE6, 0x30], bitrate: 56},
            {bytes: [0xE6, 0x40], bitrate: 64},
            {bytes: [0xE6, 0x50], bitrate: 80},
            {bytes: [0xE6, 0x60], bitrate: 96},
            {bytes: [0xE6, 0x70], bitrate: 112},
            {bytes: [0xE6, 0x80], bitrate: 128},
            {bytes: [0xE6, 0x90], bitrate: 144},
            {bytes: [0xE6, 0xA0], bitrate: 160},
            {bytes: [0xE6, 0xB0], bitrate: 176},
            {bytes: [0xE6, 0xC0], bitrate: 192},
            {bytes: [0xE6, 0xD0], bitrate: 224},
            {bytes: [0xE6, 0xE0], bitrate: 256},
            {bytes: [0xE4, 0x00], bitrate: 0},   // V2.5, L2
            {bytes: [0xE4, 0x10], bitrate: 8},
            {bytes: [0xE4, 0x20], bitrate: 16},
            {bytes: [0xE4, 0x30], bitrate: 24},
            {bytes: [0xE4, 0x40], bitrate: 32},
            {bytes: [0xE4, 0x50], bitrate: 40},
            {bytes: [0xE4, 0x60], bitrate: 48},
            {bytes: [0xE4, 0x70], bitrate: 56},
            {bytes: [0xE4, 0x80], bitrate: 64},
            {bytes: [0xE4, 0x90], bitrate: 80},
            {bytes: [0xE4, 0xA0], bitrate: 96},
            {bytes: [0xE4, 0xB0], bitrate: 112},
            {bytes: [0xE4, 0xC0], bitrate: 128},
            {bytes: [0xE4, 0xD0], bitrate: 144},
            {bytes: [0xE4, 0xE0], bitrate: 160},
            {bytes: [0xE2, 0x00], bitrate: 0},   // V2.5, L3
            {bytes: [0xE2, 0x10], bitrate: 8},
            {bytes: [0xE2, 0x20], bitrate: 16},
            {bytes: [0xE2, 0x30], bitrate: 24},
            {bytes: [0xE2, 0x40], bitrate: 32},
            {bytes: [0xE2, 0x50], bitrate: 40},
            {bytes: [0xE2, 0x60], bitrate: 48},
            {bytes: [0xE2, 0x70], bitrate: 56},
            {bytes: [0xE2, 0x80], bitrate: 64},
            {bytes: [0xE2, 0x90], bitrate: 80},
            {bytes: [0xE2, 0xA0], bitrate: 96},
            {bytes: [0xE2, 0xB0], bitrate: 112},
            {bytes: [0xE2, 0xC0], bitrate: 128},
            {bytes: [0xE2, 0xD0], bitrate: 144},
            {bytes: [0xE2, 0xE0], bitrate: 160},
        ];

        for (const c of testCases) {
            // Arrange
            const file = TestFile.getFile([0xFF, c.bytes[0], c.bytes[1], 0x00]);

            // Act
            const header = MpegAudioHeader.fromFile(file, 0, file.length);

            // Assert
            assert.isOk(header, `0x${c.bytes[0].toString(16)} 0x${c.bytes[1].toString(16)} failed`);
            assert.strictEqual(
                header.audioBitrate,
                c.bitrate,
                `version: ${header.version}, layer: ${header.layer}, 0x${c.bytes[1].toString(16)} ` +
                `=> ${header.audioBitrate}; expected: ${c.bitrate}`
            );
        }
    }

    @test
    public fromFile_audioSampleRate() {
        const testCases = [
            {bytes: [0xFE, 0x00], sampleRate: 44100}, // V1
            {bytes: [0xFE, 0x04], sampleRate: 48000},
            {bytes: [0xFE, 0x08], sampleRate: 32000},
            {bytes: [0xFE, 0x0C], sampleRate: 0},
            {bytes: [0xF6, 0x00], sampleRate: 22050}, // V2
            {bytes: [0xF6, 0x04], sampleRate: 24000},
            {bytes: [0xF6, 0x08], sampleRate: 16000},
            {bytes: [0xF6, 0x0C], sampleRate: 0},
            {bytes: [0xE6, 0x00], sampleRate: 11025}, // V2.5
            {bytes: [0xE6, 0x04], sampleRate: 12000},
            {bytes: [0xE6, 0x08], sampleRate: 8000},
            {bytes: [0xE6, 0x0C], sampleRate: 0}
        ];

        for (const c of testCases) {
            // Arrange
            const file = TestFile.getFile([0xFF, c.bytes[0], c.bytes[1], 0x00]);

            // Act
            const header = MpegAudioHeader.fromFile(file, 0, file.length);

            // Assert
            assert.isOk(header, `0x${c.bytes[0].toString(16)} 0x${c.bytes[1].toString(16)} failed`);
            assert.strictEqual(header.audioSampleRate, c.sampleRate);
        }
    }

    @test
    public fromFile_audioChannelsAndChannelMode() {
        const testCases = [
            {byte: 0xC0, channels: 1, mode: ChannelMode.SingleChannel},
            {byte: 0x80, channels: 2, mode: ChannelMode.DualChannel},
            {byte: 0x40, channels: 2, mode: ChannelMode.JointStereo},
            {byte: 0x00, channels: 2, mode: ChannelMode.Stereo}
        ];

        for (const c of testCases) {
            // Arrange
            const file = TestFile.getFile([0xFF, 0xFE, 0x00, c.byte]);

            // Act
            const header = MpegAudioHeader.fromFile(file, 0, file.length);

            // Assert
            assert.isOk(header, `0x${c.byte.toString(16)} failed`);
            assert.strictEqual(header.audioChannels, c.channels);
            assert.strictEqual(header.channelMode, c.mode);
        }
    }

    @test
    public fromFile_isCopyrighted() {
        // Case 1: Audio is not copyrighted
        // Arrange / Act / Assert
        let file = TestFile.getFile([0xFF, 0xFE, 0x00, 0x00]);
        let header = MpegAudioHeader.fromFile(file, 0, file.length);
        assert.isFalse(header.isCopyrighted);

        // Case 2: Audio is copyrighted
        file = TestFile.getFile([0xFF, 0xFE, 0x00, 0x08]);
        header = MpegAudioHeader.fromFile(file, 0, file.length);
        assert.isTrue(header.isCopyrighted);
    }

    @test
    public fromFile_isOriginal() {
        // Case 1: Audio is a copy
        // Arrange / Act / Assert
        let file = TestFile.getFile([0xFF, 0xFE, 0x00, 0x00]);
        let header = MpegAudioHeader.fromFile(file, 0, file.length);
        assert.isFalse(header.isOriginal);

        // Case 2: Audio is original
        file = TestFile.getFile([0xFF, 0xFE, 0x00, 0x04]);
        header = MpegAudioHeader.fromFile(file, 0, file.length);
        assert.isTrue(header.isOriginal);
    }

    @test
    public fromFile_isProtected() {
        // Case 1: True
        // Arrange / Act / Assert
        let file = TestFile.getFile([0xFF, 0xE2, 0x00, 0x00]);
        let header = MpegAudioHeader.fromFile(file, 0, file.length);
        assert.isTrue(header.isProtected);

        // Case 2: False
        // Arrange / Act / Assert
        file = TestFile.getFile([0xFF, 0xE3, 0x00, 0x00]);
        header = MpegAudioHeader.fromFile(file, 0 , file.length);
        assert.isFalse(header.isProtected);
    }

    @test
    public fromFile_layer() {
        // Case 1: Layer 1
        // Arrange / Act / Assert
        let file = TestFile.getFile([0xFF, 0xE6, 0x00, 0x00]);
        let header = MpegAudioHeader.fromFile(file, 0 , file.length);
        this.assertHeader(header, {
            description: "MPEG Version 2.5 Audio, Layer 1",
            layer: 1
        });

        // Case 2: Layer 2
        // Arrange / Act / Assert
        file = TestFile.getFile([0xFF, 0xE4, 0x00, 0x00]);
        header = MpegAudioHeader.fromFile(file, 0, file.length);
        this.assertHeader(header, {
            description: "MPEG Version 2.5 Audio, Layer 2",
            layer: 2
        });

        // Case 2: Layer 3
        // Arrange / Act / Assert
        file = TestFile.getFile([0xFF, 0xE2, 0x00, 0x00]);
        header = MpegAudioHeader.fromFile(file, 0, file.length);
        this.assertHeader(header, {
            description: "MPEG Version 2.5 Audio, Layer 3",
            layer: 3
        })
    }

    @test
    public fromFile_version() {
        // Case 1: Version 1
        // Arrange / Act / Assert
        let file = TestFile.getFile([0xFF, 0xFA, 0x00, 0x00]);
        let header = MpegAudioHeader.fromFile(file, 0, file.length);
        this.assertHeader(header, {
            description: "MPEG Version 1 Audio, Layer 3",
            version: MpegVersion.Version1
        });

        // Case 2: Version 2
        // Arrange / Act / Assert
        file = TestFile.getFile([0xFF, 0xF2, 0x00, 0x00]);
        header = MpegAudioHeader.fromFile(file, 0, file.length);
        this.assertHeader(header, {
            description: "MPEG Version 2 Audio, Layer 3",
            version: MpegVersion.Version2
        });

        // Case 2: Version 2.5
        file = TestFile.getFile([0xFF, 0xE2, 0x00, 0x00]);
        header = MpegAudioHeader.fromFile(file, 0, file.length);
        this.assertHeader(header, {
            description: "MPEG Version 2.5 Audio, Layer 3",
            version: MpegVersion.Version25
        });
    }
    
    private assertHeader(header: MpegAudioHeader, overrides: {[key: string]: any}) {
        assert.strictEqual(header.audioChannels, overrides.audioChannels ?? 2);
        assert.strictEqual(header.channelMode, overrides.channelMode ?? ChannelMode.Stereo);
        assert.strictEqual(header.durationMilliseconds, overrides.durationMilliseconds ?? 0);
        assert.strictEqual(header.isCopyrighted, overrides.isCopyrighted ?? false);
        assert.strictEqual(header.isOriginal, overrides.isOriginal ?? false);
        assert.strictEqual(header.isProtected, overrides.isProtected ?? true);
        assert.strictEqual(header.mediaTypes, MediaTypes.Audio);

        if (overrides.audioSampleRate) {
            assert.strictEqual(header.audioBitrate, overrides.audioSampleRate);
        }
        if (overrides.layer) {
            assert.strictEqual(header.layer, overrides.layer);
        }
        if (overrides.description) {
            assert.strictEqual(header.description, overrides.description);
        }
        if (overrides.version) {
            assert.strictEqual(header.version, overrides.version);
        }
    }


    // @test
    // public fromFile_noVbrHeaders() {
    //     // Arrange - MPEG2, Layer2, 64kbps, 22050kHz - padded
    //     const data = ByteVector.concatenate(
    //         ByteVector.fromSize(100),
    //         ByteVector.fromUint(0xFFF48200),
    //         ByteVector.fromSize(100)
    //     );
    //     const file = TestFile.getFile(data);
    //
    //     // Act
    //     const header = MpegAudioHeader.fromFile(file, 0, file.length);
    //
    //     // Assert
    //     Mpeg_AudioHeader_ConstructorTests.assertHeader(
    //         header,
    //         64,    // bitrate
    //         2,     // channels
    //         418,   // framelength
    //         2,     //
    //         22050,
    //         ChannelMode.Stereo,
    //         "MPEG Version 2 Audio, Layer 2",
    //         file.length * 8 / 64,
    //         false,
    //         false,
    //         true,
    //         true,
    //         MediaTypes.Audio,
    //         MpegVersion.Version2
    //     );
    //     assert.isUndefined(header.vbrHeader);
    // }

//     @test
//     public fromFile_hasXingHeader() {
//         // Arrange - MPEG1, Layer1, 256kbps (via flags), 44100kHz, Stereo, not padded
//         const mpegFlags = ByteVector.fromUint(0xFFFE8000, true);
//         const data = ByteVector.concatenate(
//             ByteVector.fromSize(1),
//             mpegFlags,
//             ByteVector.fromSize(32),
//             ByteVector.concatenate(
//                 XingHeader.FILE_IDENTIFIER,
//                 0x00, 0x00, 0x00, 0x03,
//                 ByteVector.fromUint(12),
//                 ByteVector.fromUint(23)
//             ) // Calculates to 2kbps via Xing header
//         );
//         const mockFile = TestFile.getFile(data);
//
//         // Act
//         const header = MpegAudioHeader.fromFile(mpegFlags, mockFile, 1);
//
//         // Assert
//         Mpeg_AudioHeader_ConstructorTests.assertHeader(
//             header,
//             2,
//             2,
//             2,
//             1,
//             44100,
//             ChannelMode.Stereo,
//             "MPEG Version 1 Audio, Layer 1 VBR",
//             104.4,
//             false,
//             false,
//             false,
//             true,
//             MediaTypes.Audio,
//             MpegVersion.Version1
//         );
//         assert.isOk(header.xingHeader);
//         assert.notEqual(header.xingHeader, XingHeader.UNKNOWN);
//         assert.strictEqual(header.xingHeader.totalFrames, 12);
//         assert.strictEqual(header.xingHeader.totalSize, 23);
//         assert.isTrue(header.xingHeader.isPresent);
//
//         assert.strictEqual(header.vbriHeader, VbriHeader.UNKNOWN);
//     }
//
//     @test
//     public fromFile_hasVbriHeader() {
//         // Arrange - MPEG1, Layer1, 256kbps (via flags), 44100kHz, Stereo, not padded
//         const mpegFlags = ByteVector.fromUint(0xFFFE8000, true);
//         const data = ByteVector.concatenate(
//             ByteVector.fromSize(1),
//             mpegFlags,
//             ByteVector.fromSize(32),
//             ByteVector.concatenate(
//                 VbriHeader.FILE_IDENTIFIER,
//                 ByteVector.fromSize(6),
//                 ByteVector.fromUint(234),
//                 ByteVector.fromUint(123),
//                 ByteVector.fromSize(6)
//             )
//         );
//         const mockFile = TestFile.getFile(data);
//
//         // Act
//         const header = MpegAudioHeader.fromFile(mpegFlags, mockFile, 1);
//
//         // Assert
//         Mpeg_AudioHeader_ConstructorTests.assertHeader(
//             header,
//             2,
//             2,
//             2,
//             1,
//             44100,
//             ChannelMode.Stereo,
//             "MPEG Version 1 Audio, Layer 1 VBR",
//             1000,
//             false,
//             false,
//             false,
//             true,
//             MediaTypes.Audio,
//             MpegVersion.Version1
//         );
//         assert.isOk(header.vbriHeader);
//         assert.notEqual(header.vbriHeader, VbriHeader.UNKNOWN);
//         assert.strictEqual(header.vbriHeader.totalFrames, 123);
//         assert.strictEqual(header.vbriHeader.totalSize, 234);
//         assert.isTrue(header.vbriHeader.isPresent);
//
//         assert.strictEqual(header.xingHeader, XingHeader.UNKNOWN);
//     }
// }
//
// @suite class Mpeg_AudioHeader_PropertyTests {
//     @test
//     public audioBitrateDuration_noVbrMpeg1Layer2_256() {
//         // Arrange
//         const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz, 278 frame length
//         const header = MpegAudioHeader.fromInfo(flags, 1024, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//
//         // Act/Assert
//         assert.strictEqual(header.audioBitrate, 256);
//         assert.strictEqual(header.durationMilliseconds, 34.75);
//     }
//
//     @test
//     public audioBitrateDuration_noVbrMpeg2Layer2_64() {
//         // Arrange
//         const flags = 0x148000; // MPEG2, Layer2, 64kbps, 22050kHz, 417 frame length
//         const header = MpegAudioHeader.fromInfo(flags, 1024, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//
//         // Act/Assert
//         assert.strictEqual(header.audioBitrate, 64);
//         assert.strictEqual(header.durationMilliseconds, 156.375);
//     }
//
//     @test
//     public audioBitrateDuration_noVbrMpeg25Layer3_32() {
//         // Arrange
//         const flags = 0x24000; // MPEG2.5, Layer3, 32kbps, 11025kHz
//         const header = MpegAudioHeader.fromInfo(flags, 1024, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//
//         // Act/Assert
//         assert.strictEqual(header.audioBitrate, 32);
//         assert.strictEqual(header.durationMilliseconds, 260);
//     }
//
//     @test
//     public audioBitrateDuration_withXingHeaderNoTotalSize_defaultsToFlags() {
//         // Arrange
//         const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
//         const xingHeader = XingHeader.fromInfo(10, 0);
//         const header = MpegAudioHeader.fromInfo(flags, 1024, xingHeader, VbriHeader.UNKNOWN);
//
//         // Act/Assert
//         assert.strictEqual(header.audioBitrate, 256);
//         assert.approximately(header.durationMilliseconds, 87.07482993, 0.00000001);
//     }
//
//     @test
//     public audioBitrate_withXingHeaderHasTotalSizeNoFrames_defaultsToFlags() {
//         // Arrange
//         const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
//         const xingHeader = XingHeader.fromInfo(0, 10);
//         const header = MpegAudioHeader.fromInfo(flags, 1024, xingHeader, VbriHeader.UNKNOWN);
//
//         // Act/Assert
//         assert.strictEqual(header.audioBitrate, 256);
//         assert.strictEqual(header.durationMilliseconds, 34.75);
//     }
//
//     @test
//     public audioBitrateDuration_withXingHeaderHasTotalSizeHasFramesHasDuration() {
//         // Arrange
//         const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
//         const xingHeader = XingHeader.fromInfo(12, 23);
//         const header = MpegAudioHeader.fromInfo(flags, 1024, xingHeader, VbriHeader.UNKNOWN);
//
//         // Act/Assert
//         assert.strictEqual(header.audioBitrate, 2);
//         assert.approximately(header.durationMilliseconds, 104.4897959, 0.0000001);
//     }
//
//     @test
//     public audioBitrateDuration_withVbriHeaderNoTotalSize_defaultsToFlags() {
//         // Arrange
//         const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
//         const vbriHeader = VbriHeader.fromInfo(123, 0);
//         const header = MpegAudioHeader.fromInfo(flags, 1024, XingHeader.UNKNOWN, vbriHeader);
//
//         // Act/Assert
//         assert.strictEqual(header.audioBitrate, 256);
//         assert.strictEqual(header.durationMilliseconds, 1000);
//     }
//
//     @test
//     public audioBitrate_withVbriHeaderHasTotalSizeNoFrames_defaultsToFlags() {
//         // Arrange
//         const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
//         const vbriHeader = VbriHeader.fromInfo(0, 10);
//         const header = MpegAudioHeader.fromInfo(flags, 1024, XingHeader.UNKNOWN, vbriHeader);
//
//         // Act/Assert
//         assert.strictEqual(header.audioBitrate, 256);
//         assert.strictEqual(header.durationMilliseconds, 34.75);
//     }
//
//     @test
//     public audioBitrate_withVbriHeaderHasTotalSizeHasFramesHasDuration() {
//         // Arrange
//         const flags = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz
//         const vbriHeader = VbriHeader.fromInfo(123, 234);
//         const header = MpegAudioHeader.fromInfo(flags, 1024, XingHeader.UNKNOWN, vbriHeader);
//
//         // Act/Assert
//         assert.strictEqual(header.audioBitrate, 2);
//         assert.strictEqual(header.durationMilliseconds, 1000);
//     }
//
//     @test
//     public audioFrameLength_layer1() {
//         // Test 1: Padded
//         const flags1 = 0x1E8200; // MPEG1, Layer1, 256kbps, 44100kHz - padded
//         const header1 = MpegAudioHeader.fromInfo(flags1, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header1.audioFrameLength, 282);
//
//         // Test 2: Unpadded
//         const flags2 = 0x1E8000; // MPEG1, Layer1, 256kbps, 44100kHz - unpadded
//         const header2 = MpegAudioHeader.fromInfo(flags2, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header2.audioFrameLength, 278);
//     }
//
//     @test
//     public audioFrameLength_layer2Version2() {
//         // Test 1: Padded
//         const flags1 = 0x148200; // MPEG2, Layer2, 64kbps, 22050kHz - padded
//         const header1 = MpegAudioHeader.fromInfo(flags1, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header1.audioFrameLength, 418);
//
//         // Test 2: Unpadded
//         const flags2 = 0x148000; // MPEG2, Layer2, 64kbps, 22050kHz - unpadded
//         const header2 = MpegAudioHeader.fromInfo(flags2, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header2.audioFrameLength, 417);
//     }
//
//     @test
//     public audioFrameLength_layer3Version1() {
//         // Test 1: Padded
//         const flags1 = 0xA4200; // MPEG1, Layer3, 56kbps, 11025kHz - padded
//         const header1 = MpegAudioHeader.fromInfo(flags1, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header1.audioFrameLength, 183);
//
//         // Test 2: Unpadded
//         const flags2 = 0xA4000; // MPEG1, Layer3, 56kbps, 11025kHz - unpadded
//         const header2 = MpegAudioHeader.fromInfo(flags2, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header2.audioFrameLength, 182);
//     }
//
//     @test
//     public audioFrameLength_layer3Version25() {
//         // Test 1: Padded
//         const flags1 = 0x24200; // MPEG2.5, Layer3, 32kbps, 11025kHz - padded
//         const header1 = MpegAudioHeader.fromInfo(flags1, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header1.audioFrameLength, 209);
//
//         // Test 2: Unpadded
//         const flags2 = 0x24000; // MPEG2.5, Layer3, 32kbps, 11025kHz - unpadded
//         const header2 = MpegAudioHeader.fromInfo(flags2, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header2.audioFrameLength, 208);
//     }
//
//     @test
//     public audioLayer_layer1() {
//         // Test 1: 00
//         const flags1 = 0xFFF9FFFF;
//         const header1 = MpegAudioHeader.fromInfo(flags1, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header1.audioLayer, 1);
//
//         // Test 2: 11
//         const flags2 = 0xFFFFFFFF;
//         const header2 = MpegAudioHeader.fromInfo(flags2, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header2.audioLayer, 1);
//     }
//
//     @test
//     public audioLayer_layer2() {
//         const flags = 0xFFFDFFFF;
//         const header = MpegAudioHeader.fromInfo(flags, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//
//         // Act / Assert
//         assert.strictEqual(header.audioLayer, 2);
//     }
//
//     @test
//     public audioLayer_layer3() {
//         const flags = 0xFFFBFFFF;
//         const header = MpegAudioHeader.fromInfo(flags, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//
//         // Act / Assert
//         assert.strictEqual(header.audioLayer, 3);
//     }
//
//     @test
//     public audioSampleRate() {
//         // Test 1: Version 1
//         const header1 = MpegAudioHeader.fromInfo(0xFFFFF7FF, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header1.audioSampleRate, 48000);
//
//         // Test 2: Version 2
//         const header2 = MpegAudioHeader.fromInfo(0xFFF7F7FF, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header2.audioSampleRate, 24000);
//
//         // Test 3: Version 3
//         const header3 = MpegAudioHeader.fromInfo(0xFFE7F7FF, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header3.audioSampleRate, 12000);
//     }
//
//     @test
//     public channels() {
//         // Test 1: Stereo
//         const header1 = MpegAudioHeader.fromInfo(0xFFFFFF3F, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header1.channelMode, ChannelMode.Stereo);
//         assert.strictEqual(header1.audioChannels, 2);
//
//         // Test 2: Joint Stereo
//         const header2 = MpegAudioHeader.fromInfo(0xFFFFFF7F, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header2.channelMode, ChannelMode.JointStereo);
//         assert.strictEqual(header2.audioChannels, 2);
//
//         // Test 3: Dual Stereo
//         const header3 = MpegAudioHeader.fromInfo(0xFFFFFFBF, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header3.channelMode, ChannelMode.DualChannel);
//         assert.strictEqual(header3.audioChannels, 2);
//
//         // Test 4: Mono
//         const header4 = MpegAudioHeader.fromInfo(0xFFFFFFFF, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header4.channelMode, ChannelMode.SingleChannel);
//         assert.strictEqual(header4.audioChannels, 1);
//     }
//
//     @test
//     public isCopyrighted() {
//         // Test 1: 00 => false
//         const header1 = MpegAudioHeader.fromInfo(0xFFFFFFE7, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.isFalse(header1.isCopyrighted);
//
//         // Test 2: 01 => true
//         const header2 = MpegAudioHeader.fromInfo(0xFFFFFFEF, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.isTrue(header2.isCopyrighted);
//     }
//
//     @test
//     public isOriginal() {
//         // Test 1: 00 => false
//         const header1 = MpegAudioHeader.fromInfo(0xFFFFFFF3, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.isFalse(header1.isOriginal);
//
//         // Test 2: 01 => true
//         const header2 = MpegAudioHeader.fromInfo(0xFFFFFFFF, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.isTrue(header2.isOriginal);
//     }
//
//     @test
//     public isPadded() {
//         // Test 1: 0 => false
//         const header1 = MpegAudioHeader.fromInfo(0xFFFFFFF3, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.isFalse(header1.isOriginal);
//
//         // Test 2: 1 => true
//         const header2 = MpegAudioHeader.fromInfo(0xFFFFFFFF, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.isTrue(header2.isOriginal);
//     }
//
//     @test
//     public isProtected() {
//         // Test 1: 0 => true
//         const header1 = MpegAudioHeader.fromInfo(0xFFFEFFFF, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.isTrue(header1.isProtected);
//
//         // Test 2: 1 => false
//         const header2 = MpegAudioHeader.fromInfo(0xFFFFFFFF, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.isFalse(header2.isProtected);
//     }
//
//     @test
//     public streamLength_set_noVbr() {
//         // Arrange - MPEG2, Layer2, 64kbps, 22050kHz - padded
//         const header = MpegAudioHeader.fromInfo(0xFFF48200, 1234, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         // noinspection JSUnusedLocalSymbols Force calculation of durationMilliseconds
//         const _ = header.durationMilliseconds;
//
//         // Act
//         header.streamLength = 2345;
//
//         // Assert - duration has been recalculated with new stream length
//         assert.strictEqual(header.durationMilliseconds, 313.5);
//     }
//
//     @test
//     public streamLength_set_withXingHeader() {
//         // Arrange - MPEG2, Layer2, 64kbps, 22050kHz - padded
//         const xingHeader = XingHeader.fromInfo(123, 234);
//         const header = MpegAudioHeader.fromInfo(0xFFF48200, 1234, xingHeader, VbriHeader.UNKNOWN);
//         const originalDuration = header.durationMilliseconds; // Force calculation of durationMilliseconds
//
//         // Act
//         header.streamLength = 2345;
//
//         // Assert - Duration has not been recalculated
//         assert.strictEqual(header.durationMilliseconds, originalDuration);
//     }
//
//     @test
//     public streamLength_set_withVbriHeader() {
//         // Arrange - MPEG2, Layer2, 64kbps, 22050kHz - padded
//         const vbriHeader = VbriHeader.fromInfo(123, 234);
//         const header = MpegAudioHeader.fromInfo(0xFFF48200, 1234, XingHeader.UNKNOWN, vbriHeader);
//         const originalDuration = header.durationMilliseconds; // Force calculation of durationMilliseconds
//
//         // Act
//         header.streamLength = 2345;
//
//         // Assert - Duration has not been recalculated
//         assert.strictEqual(header.durationMilliseconds, originalDuration);
//     }
//
//     @test
//     public version_version1() {
//         // Test 1: 01
//         const flags1 = 0xFFFEFFFF;
//         const header1 = MpegAudioHeader.fromInfo(flags1, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header1.version, MpegVersion.Version1);
//
//         // Test 2: 11
//         const flags2 = 0xFFFFFFFF;
//         const header2 = MpegAudioHeader.fromInfo(flags2, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//         assert.strictEqual(header2.version, MpegVersion.Version1);
//     }
//
//     @test
//     public version_version2() {
//         // Arrange
//         const flags = 0xFFF7FFFF;
//         const header = MpegAudioHeader.fromInfo(flags, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//
//         // Act / Assert
//         assert.strictEqual(header.version, MpegVersion.Version2);
//     }
//
//     @test
//     public version_version25() {
//         // Arrange
//         const flags = 0xFFE7FFFF;
//         const header = MpegAudioHeader.fromInfo(flags, 0, XingHeader.UNKNOWN, VbriHeader.UNKNOWN);
//
//         // Act / Assert
//         assert.strictEqual(header.version, MpegVersion.Version25);
//     }
// }
//
// @suite class Mpeg_AudioHeader_MethodTests {
//     @test
//     public find_invalidParameters() {
//         // Arrange
//         const mockFile = TestFile.getFile(ByteVector.empty());
//
//         // Act / Assert
//         Testers.testTruthy((v: File) => { MpegAudioHeader.find(v, 123, 234); });
//         Testers.testSafeInt((v: number) => { MpegAudioHeader.find(mockFile, v, 234); });
//         Testers.testSafeInt((v: number) => { MpegAudioHeader.find(mockFile, 123, v); }, Allow.Undefined);
//     }
//
//     @test
//     public find_lessThan3BytesAtPosition() {
//         // Arrange
//         const data = ByteVector.fromSize(3);
//         const mockFile = TestFile.getFile(data);
//
//         // Act
//         const result = MpegAudioHeader.find(mockFile, 1);
//
//         // Assert
//         assert.isNotOk(result);
//     }
//
//     @test
//     public find_notInFile_noLimit() {
//         // Arrange
//         const data = ByteVector.fromSize(File.bufferSize * 2);
//         const mockFile = TestFile.getFile(data);
//
//         // Act
//         const result = MpegAudioHeader.find(mockFile, 1);
//
//         // Assert
//         assert.isNotOk(result);
//     }
//
//     @test
//     public find_inFile_notFoundWithinLimit() {
//         // Arrange
//         const data = ByteVector.concatenate(
//             ByteVector.fromSize(File.bufferSize * 2),
//             ByteVector.fromUint(0xFFF48200, true),
//             ByteVector.fromSize(100)
//         );
//         const mockFile = TestFile.getFile(data);
//
//         // Act
//         const result = MpegAudioHeader.find(mockFile, 1, 1024);
//
//         // Assert
//         assert.isNotOk(result);
//     }
//
//     @test
//     public find_inFile() {
//         // Arrange
//         const data = ByteVector.concatenate(
//             ByteVector.fromSize(File.bufferSize),
//             ByteVector.fromUint(0xFFF48200, true),
//             ByteVector.fromSize(100)
//         );
//         const mockFile = TestFile.getFile(data);
//
//         // Act
//         const result = MpegAudioHeader.find(mockFile, 1);
//
//         // Assert
//         assert.isOk(result);
//         assert.notEqual(result, MpegAudioHeader.UNKNOWN);
//     }
}
