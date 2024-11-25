import * as TypeMoq from "typemoq";
import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import MpegAudioHeader from "../../src/mpeg/mpegAudioHeader";
import TestFile from "../utilities/testFile";
import {ByteVector, StringType} from "../../src/byteVector";
import {File} from "../../src/file";
import {MediaTypes} from "../../src/properties";
import {ChannelMode, MpegVersion} from "../../src/mpeg/mpegEnums";
import {Allow, Testers} from "../utilities/testers";

@suite class Mpeg_AudioHeader_ConstructorTests {
    private mockFile = TypeMoq.Mock.ofType<File>().object;

    @test
    public fromFile_invalidArguments() {
        // Act / Assert
        Testers.testTruthy((v: File) => {
            MpegAudioHeader.fromFile(v, 1, 2);
        });
        Testers.testSafeUint((v: number) => {
            MpegAudioHeader.fromFile(this.mockFile, v, 1);
        });
        Testers.testSafeUint((v: number) => {
            MpegAudioHeader.fromFile(this.mockFile, 1, v);
        });
        Testers.testSafeUint((v: number) => {
            MpegAudioHeader.fromFile(this.mockFile, 1, 2, v)
        }, Allow.Undefined);
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
    public fromFile_fileDoesNotContainMpegSyncByte2() {
        // Arrange
        // Note: bytes 0-1 and 5-6 are valid, but should be excluded by start/end bounds
        const file = TestFile.getFile([0xFF, 0xE6, 0xFF, 0xD6, 0xFF, 0xFF, 0xE6]);

        // Act / Assert
        assert.isUndefined(MpegAudioHeader.fromFile(file, 1, 6));
    }

    @test
    public fromFile_reservedVersion() {
        // Arrange
        const file = TestFile.getFile([0xFF, 0xEE, 0x00, 0x00]);

        // Act / Assert
        assert.isUndefined(MpegAudioHeader.fromFile(file, 0, file.length));
    }

    @test
    public fromFile_reservedLayer() {
        // Arrange
        const file = TestFile.getFile([0xFF, 0xF8, 0x00, 0x00]);

        // Act / Assert
        assert.isUndefined(MpegAudioHeader.fromFile(file, 0, file.length));
    }

    @test
    public fromFile_reservedBitrate() {
        // Arrange
        const file = TestFile.getFile([0xFF, 0xFA, 0xF0, 0x00]);

        // Act / Assert
        assert.isUndefined(MpegAudioHeader.fromFile(file, 0, file.length));
    }

    @test
    public fromFile_reservedSampleRate() {
        // Arrange
        const file = TestFile.getFile([0xFF, 0xFA, 0x0C, 0x00]);

        // Act / Assert
        assert.isUndefined(MpegAudioHeader.fromFile(file, 0, file.length));
    }
}

@suite class Mpeg_AudioHeader_PropertyTests {
    @test
    public bitrate_noVbrHeader() {
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
    public bitrate_vbrHeaderSpecifiesBitrate() {
        // Arrange
        const headerBytes = ByteVector.fromByteArray([0xFF, 0xE2, 0xE0, 0x00]); // 160kbps
        const vbrBytes = ByteVector.concatenate(
            ByteVector.fromString("Xing", StringType.Latin1),
            0x00, 0x00, 0x00, 0x03,    // Flags
            ByteVector.fromUint(1234), // Frames
            ByteVector.fromUint(23456) // Bytes
        );
        const fileBytes = ByteVector.concatenate(
            headerBytes,
            ByteVector.fromSize(17),
            vbrBytes
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const header = MpegAudioHeader.fromFile(file, 0, file.length);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.audioBitrate, 2);
    }

    @test
    public bitrate_vbrHeaderDoesNotSpecifyBitrate() {
        // Arrange
        const headerBytes = ByteVector.fromByteArray([0xFF, 0xE2, 0xE0, 0x00]);
        const vbrBytes = ByteVector.concatenate(
            ByteVector.fromString("Xing", StringType.Latin1),
            0x00, 0x00, 0x00, 0x00, // Flags
            ByteVector.fromSize(8)
        );
        const fileBytes = ByteVector.concatenate(
            headerBytes, // MPEG 2.5, Layer 3, 160kbps, 576spf, 11025Hz
            ByteVector.fromSize(17),
            vbrBytes
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const header = MpegAudioHeader.fromFile(file, 0, file.length);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.audioBitrate, 160);
    }

    @test
    public audioSampleRate() {
        const testCases = [
            {bytes: [0xFE, 0x00], sampleRate: 44100}, // V1
            {bytes: [0xFE, 0x04], sampleRate: 48000},
            {bytes: [0xFE, 0x08], sampleRate: 32000},
            {bytes: [0xF6, 0x00], sampleRate: 22050}, // V2
            {bytes: [0xF6, 0x04], sampleRate: 24000},
            {bytes: [0xF6, 0x08], sampleRate: 16000},
            {bytes: [0xE6, 0x00], sampleRate: 11025}, // V2.5
            {bytes: [0xE6, 0x04], sampleRate: 12000},
            {bytes: [0xE6, 0x08], sampleRate: 8000}
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
    public audioChannelsAndChannelMode() {
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
    public description_vbrHeaderVariableBitrate() {
        // Arrange
        const headerBytes = ByteVector.fromByteArray([0xFF, 0xE2, 0xE0, 0x00]);
        const vbrBytes = ByteVector.concatenate(
            ByteVector.fromString("Xing", StringType.Latin1),
            0x00, 0x00, 0x00, 0x03,    // Flags
            ByteVector.fromUint(1234), // Frames
            ByteVector.fromUint(23456) // Bytes
        );
        const fileBytes = ByteVector.concatenate(
            headerBytes, // MPEG 2.5, Layer 3
            ByteVector.fromSize(17),
            vbrBytes
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const header = MpegAudioHeader.fromFile(file, 0, file.length);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.description, "MPEG Version 2.5 Audio, Layer 3 VBR");
    }

    @test
    public description_vbrHeaderIsConstantBitrate() {
        // Arrange
        const headerBytes = ByteVector.fromByteArray([0xFF, 0xE2, 0xE0, 0x00]);
        const vbrBytes = ByteVector.concatenate(
            ByteVector.fromString("Xing", StringType.Latin1),
            0x00, 0x00, 0x00, 0x00 // Flags
        );
        const fileBytes = ByteVector.concatenate(
            headerBytes, // MPEG 2.5, Layer 3, 160kbps, 576spf, 11025Hz
            ByteVector.fromSize(17),
            vbrBytes
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const header = MpegAudioHeader.fromFile(file, 0, file.length);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.description, "MPEG Version 2.5 Audio, Layer 3");
    }

    @test
    public duration_freeBitrate() {
        // Arrange
        const fileBytes = ByteVector.concatenate(
            ByteVector.fromByteArray([0xFF, 0xE2, 0x00, 0x00]), // MPEG 2.5, Layer 3, free bitrate
            ByteVector.fromSize(4192 - 4)                       // 4k total file size
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const header = MpegAudioHeader.fromFile(file, 0, file.length, file.length);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.durationMilliseconds, 0);
    }

    @test
    public duration_noVbrHeader_noStreamSize() {
        // Arrange
        const fileBytes = ByteVector.concatenate(
            ByteVector.fromByteArray([0xFF, 0xE2, 0xE0, 0x00]), // MPEG 2.5, layer 3, 160kbps, 11025Hz 576spf
            ByteVector.fromSize(4192 - 4)                       // 4k total file size
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const header = MpegAudioHeader.fromFile(file, 0, file.length);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.durationMilliseconds, 0);
    }

    @test
    public duration_noVbrHeader_streamSize() {
        // Arrange
        const fileBytes = ByteVector.concatenate(
            ByteVector.fromByteArray([0xFF, 0xE2, 0xE0, 0x00]), // MPEG 2.5, layer 3, 160kbps, 11025Hz 576spf
            ByteVector.fromSize(4192 - 4)                       // 4k total file size
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const header = MpegAudioHeader.fromFile(file, 0, file.length, file.length);

        // Assert
        assert.isOk(header);
        assert.approximately(header.durationMilliseconds, 209.6, 0.1);
    }

    @test
    public duration_vbrHeaderSpecifiesDuration() {
        // Arrange
        const headerBytes = ByteVector.fromByteArray([0xFF, 0xE2, 0xE0, 0x00]);
        const vbrBytes = ByteVector.concatenate(
            ByteVector.fromString("Xing", StringType.Latin1),
            0x00, 0x00, 0x00, 0x03,    // Flags
            ByteVector.fromUint(1234), // Frames
            ByteVector.fromUint(23456) // Bytes
        );
        const fileBytes = ByteVector.concatenate(
            headerBytes, // MPEG 2.5, Layer 3, 160kbps, 576spf, 11025Hz
            ByteVector.fromSize(17),
            vbrBytes
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const header = MpegAudioHeader.fromFile(file, 0, file.length, file.length);

        // Assert
        assert.isOk(header);
        assert.approximately(header.durationMilliseconds, 64470, 1);
    }

    @test
    public duration_vbrHeaderDoesNotSpecifyDuration() {
        // Arrange
        const headerBytes = ByteVector.fromByteArray([0xFF, 0xE2, 0xE0, 0x00]);
        const vbrBytes = ByteVector.concatenate(
            ByteVector.fromString("Xing", StringType.Latin1),
            0x00, 0x00, 0x00, 0x00, // Flags
            ByteVector.fromSize(8)
        );
        const fileBytes = ByteVector.concatenate(
            headerBytes,                            // MPEG 2.5, Layer 3, 160kbps, 576spf, 11025Hz
            ByteVector.fromSize(17),
            vbrBytes,
            ByteVector.fromSize(4192 - 4 - 17 - 16) // 4k total file size
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const header = MpegAudioHeader.fromFile(file, 0, file.length, file.length);

        // Assert
        assert.isOk(header);
        assert.approximately(header.durationMilliseconds, 209.6, 0.1);
    }

    @test
    public isCopyrighted() {
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
    public isOriginal() {
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
    public isProtected() {
        // Case 1: True
        // Arrange / Act / Assert
        let file = TestFile.getFile([0xFF, 0xE2, 0x00, 0x00]);
        let header = MpegAudioHeader.fromFile(file, 0, file.length);
        assert.isTrue(header.isProtected);

        // Case 2: False
        // Arrange / Act / Assert
        file = TestFile.getFile([0xFF, 0xE3, 0x00, 0x00]);
        header = MpegAudioHeader.fromFile(file, 0, file.length);
        assert.isFalse(header.isProtected);
    }

    @test
    public layerAndDescription() {
        const testCases = [
            {byte: 0xE6, layer: 1, description: "MPEG Version 2.5 Audio, Layer 1"},
            {byte: 0xE4, layer: 2, description: "MPEG Version 2.5 Audio, Layer 2"},
            {byte: 0xE2, layer: 3, description: "MPEG Version 2.5 Audio, Layer 3"}
        ];

        for (const c of testCases) {
            // Arrange
            const file = TestFile.getFile([0xFF, c.byte, 0x00, 0x00]);

            // Act
            const header = MpegAudioHeader.fromFile(file, 0, file.length);

            // Assert
            assert.isOk(header);
            assert.strictEqual(header.description, c.description);
            assert.strictEqual(header.layer, c.layer);
        }
    }

    @test
    public mediaType() {
        // Arrange
        const file = TestFile.getFile([0xFF, 0xE6, 0x00, 0x00]);

        // Act
        const header = MpegAudioHeader.fromFile(file, 0, file.length);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.mediaTypes, MediaTypes.Audio);
    }

    @test
    public vbrHeader_hasHeader() {
        // Arrange
        const fileBytes = ByteVector.concatenate(
            0xFF, 0xE2, 0xE0, 0x00,
            ByteVector.fromSize(17),
            ByteVector.fromString("Xing", StringType.Latin1),
            ByteVector.fromSize(12)
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const header = MpegAudioHeader.fromFile(file, 0, file.length);

        // Assert
        assert.isOk(header);
        assert.isOk(header.vbrHeader);
    }

    @test
    public vbrHeader_noHeader() {
        // Arrange
        const file = TestFile.getFile([0xFF, 0xE2, 0xE0, 0x00]);

        // Act
        const header = MpegAudioHeader.fromFile(file, 0, file.length);

        // Assert
        assert.isOk(header);
        assert.isUndefined(header.vbrHeader);
    }

    @test
    public versionAndDescription() {
        const testCases = [
            {byte: 0xFA, description: "MPEG Version 1 Audio, Layer 3", version: MpegVersion.Version1},
            {byte: 0xF2, description: "MPEG Version 2 Audio, Layer 3", version: MpegVersion.Version2},
            {byte: 0xE2, description: "MPEG Version 2.5 Audio, Layer 3", version: MpegVersion.Version25}
        ];

        for (const c of testCases) {
            // Arrange
            const file = TestFile.getFile([0xFF, c.byte, 0x00, 0x00]);

            // Act
            const header = MpegAudioHeader.fromFile(file, 0, file.length);

            // Assert
            assert.isOk(header);
            assert.strictEqual(header.description, c.description);
            assert.strictEqual(header.version, c.version);
        }
    }
}
