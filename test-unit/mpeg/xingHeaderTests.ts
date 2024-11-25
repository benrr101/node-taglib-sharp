import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import TestFile from "../utilities/testFile";
import XingHeader from "../../src/mpeg/xingHeader";
import {ByteVector, StringType} from "../../src/byteVector";
import {File} from "../../src/file";
import {ChannelMode, MpegVersion} from "../../src/mpeg/mpegEnums";
import {Allow, Testers} from "../utilities/testers";

@suite class Mpeg_XingHeaderTests {
    @test
    public fromFile_invalidParameters() {
        // Arrange
        const mockFile = Mock.ofType<File>().object;

        // Act / Assert
        Testers.testTruthy((f: File) => XingHeader.fromFile(f, 0, MpegVersion.Version1, ChannelMode.Stereo, 1, 1, 0));
        Testers.testUint((v: number) =>
            XingHeader.fromFile(mockFile, v, MpegVersion.Version1, ChannelMode.Stereo, 1, 1, 0));
        Testers.testUint((v: number) =>
            XingHeader.fromFile(mockFile, 0, MpegVersion.Version1, ChannelMode.Stereo, v, 1, 0));
        assert.throws(() =>
            XingHeader.fromFile(mockFile, 0, MpegVersion.Version1, ChannelMode.Stereo, 0, 1, 0))
        Testers.testUint((v: number) =>
            XingHeader.fromFile(mockFile, 0, MpegVersion.Version1, ChannelMode.Stereo, 1, v, 0));
        assert.throws(() =>
            XingHeader.fromFile(mockFile, 0, MpegVersion.Version1, ChannelMode.Stereo, 1, 0, 0));
        Testers.testSafeUint((v: number) =>
            XingHeader.fromFile(mockFile, 0, MpegVersion.Version1, ChannelMode.Stereo, 1, 1, v), Allow.Undefined);
    }

    @test
    public fromFile_fileTooShort() {
        // Arrange
        const file = TestFile.getFile(ByteVector.fromSize(52));

        // Act / Assert
        assert.isUndefined(XingHeader.fromFile(file, 1, MpegVersion.Version1, ChannelMode.Stereo, 1, 1, 0));
    }

    @test
    public fromFile_doesNotStartWithIdentifier() {
        // Arrange
        const file = TestFile.getFile(ByteVector.fromSize(52));

        // Act / Assert
        assert.isUndefined(XingHeader.fromFile(file, 0, MpegVersion.Version1, ChannelMode.Stereo, 1, 1, 0));
    }

    @test
    public fromFile_infoPosition() {
        this.fromFile_position('Info');
    }

    @test
    public fromFile_xingPosition() {
        this.fromFile_position('Xing');
    }

    @test
    public bitrate_noTotalFrames() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(36),
            ByteVector.fromString('Xing', StringType.Latin1),
            0x00, 0x00, 0x00, 0x0E,    // Flags (File Size, TOC, VBR Scale)
            ByteVector.fromUint(1234), // File Size
            ByteVector.fromSize(100),  // TOC
            ByteVector.fromUint(2345)  // VBR Scale
        ));

        // Act
        const header = XingHeader.fromFile(file, 0, MpegVersion.Version1, ChannelMode.Stereo, 1, 1, 1234);

        // Assert
        assert.isOk(header);
        assert.isUndefined(header.bitrateKilobytes);
    }

    @test
    public bitrate_withTotalFrames_noSize() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(36),
            ByteVector.fromString('Xing', StringType.Latin1),
            0x00, 0x00, 0x00, 0x0C,    // Flags (TOC, VBR Scale)
            ByteVector.fromSize(100),  // TOC
            ByteVector.fromUint(2345)  // VBR Scale
        ));
        const samplesPerFrame = 1152;
        const samplesPerSecond = 44100;

        // Act
        const header = XingHeader.fromFile(
            file,
            0,
            MpegVersion.Version1,
            ChannelMode.Stereo,
            samplesPerFrame,
            samplesPerSecond,
            undefined);

        // Assert
        assert.isOk(header);
        assert.isUndefined(header.bitrateKilobytes);
    }

    @test
    public bitrate_withTotalFrames_withFallbackSize() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(36),
            ByteVector.fromString('Xing', StringType.Latin1),
            0x00, 0x00, 0x00, 0x0D,    // Flags (Frames, TOC, VBR Scale
            ByteVector.fromUint(1234), // Frames
            ByteVector.fromSize(100),  // TOC
            ByteVector.fromUint(2345)  // VBR Scale
        ));
        const samplesPerFrame = 1152;
        const samplesPerSecond = 44100;
        const fallbackSize = 34567;

        // Act
        const header = XingHeader.fromFile(
            file,
            0,
            MpegVersion.Version1,
            ChannelMode.Stereo,
            samplesPerFrame,
            samplesPerSecond,
            fallbackSize);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.bitrateKilobytes, 8);
    }

    @test
    public bitrate_withTotalFrames_withTotalSize() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(36),
            ByteVector.fromString('Xing', StringType.Latin1),
            0x00, 0x00, 0x00, 0x0F,     // Flags (Frames, File Size TOC, VBR Scale
            ByteVector.fromUint(1234),  // Frames
            ByteVector.fromUint(23456), // File Size
            ByteVector.fromSize(100),   // TOC
            ByteVector.fromUint(3456)   // VBR Scale
        ));
        const samplesPerFrame = 1152;
        const samplesPerSecond = 44100;
        const fallbackSize = 34567;

        // Act
        const header = XingHeader.fromFile(
            file,
            0,
            MpegVersion.Version1,
            ChannelMode.Stereo,
            samplesPerFrame,
            samplesPerSecond,
            fallbackSize);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.bitrateKilobytes, 5);
    }

    @test
    public bitrate_totalFramesAndTotalSize_withLameDelay() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(36),
            ByteVector.fromString('Xing', StringType.Latin1),
            0x00, 0x00, 0x00, 0x03,     // Flags (Frames, File Size)
            ByteVector.fromUint(1234),  // Frames
            ByteVector.fromUint(23456), // Total size
            ByteVector.fromString('LAME', StringType.Latin1),
            ByteVector.fromSize(17),    // Buncha junk we don't care about
            0x4D, 0x29, 0x29,           // 1234 + 2345 delay
            ByteVector.fromSize(12)     // More junk we don't care about
        ));
        const samplesPerFrame = 1152;
        const samplesPerSecond = 44100;
        const fallbackSize = 34567;

        // Act
        const header = XingHeader.fromFile(
            file,
            0,
            MpegVersion.Version1,
            ChannelMode.Stereo,
            samplesPerFrame,
            samplesPerSecond,
            fallbackSize);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.bitrateKilobytes, 5);
    }

    @test
    public bitrate_cbrHeader() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(36),
            ByteVector.fromString('Info', StringType.Latin1),
            0x00, 0x00, 0x00, 0x02,     // Flags (Frames, File Size TOC, VBR Scale
            ByteVector.fromUint(1234),  // Frames
            ByteVector.fromUint(23456), // File Size
        ));
        const samplesPerFrame = 1152;
        const samplesPerSecond = 44100;
        const fallbackSize = 34567;

        // Act
        const header = XingHeader.fromFile(
            file,
            0,
            MpegVersion.Version1,
            ChannelMode.Stereo,
            samplesPerFrame,
            samplesPerSecond,
            fallbackSize);

        // Assert
        assert.isOk(header);
        assert.isUndefined(header.bitrateKilobytes);
    }

    @test
    public duration_noTotalFrames() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(36),
            ByteVector.fromString('Xing', StringType.Latin1),
            0x00, 0x00, 0x00, 0x0E,    // Flags (File Size, TOC, VBR Scale)
            ByteVector.fromUint(1234), // File Size
            ByteVector.fromSize(100),  // TOC
            ByteVector.fromUint(2345)  // VBR Scale
        ));

        // Act
        const header = XingHeader.fromFile(file, 0, MpegVersion.Version1, ChannelMode.Stereo, 1, 1, 1234);

        // Assert
        assert.isOk(header);
        assert.isUndefined(header.durationMilliseconds);
    }

    @test
    public duration_withTotalFrames() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(36),
            ByteVector.fromString('Xing', StringType.Latin1),
            0x00, 0x00, 0x00, 0x0D,    // Flags (Frames, TOC, VBR Scale
            ByteVector.fromUint(1234), // Frames
            ByteVector.fromSize(100),  // TOC
            ByteVector.fromUint(2345)  // VBR Scale
        ));
        const samplesPerFrame = 1152;
        const samplesPerSecond = 44100;
        const fallbackSize = 3456;

        // Act
        const header = XingHeader.fromFile(
            file,
            0,
            MpegVersion.Version1,
            ChannelMode.Stereo,
            samplesPerFrame,
            samplesPerSecond,
            fallbackSize);

        // Assert
        assert.isOk(header);
        assert.approximately(header.durationMilliseconds, 32235, 1);
    }

    @test
    public duration_totalFramesWithLameDelay() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(36),
            ByteVector.fromString('Xing', StringType.Latin1),
            0x00, 0x00, 0x00, 0x01,    // Flags (Frames)
            ByteVector.fromUint(1234), // Frames
            ByteVector.fromString('LAME', StringType.Latin1),
            ByteVector.fromSize(17),   // Buncha junk we don't care about
            0x4D, 0x29, 0x29,          // 1234 + 2345 delay
            ByteVector.fromSize(12)    // More junk we don't care about
        ));
        const samplesPerFrame = 1152;
        const samplesPerSecond = 44100;
        const fallbackSize = 3456;

        // Act
        const header = XingHeader.fromFile(
            file,
            0,
            MpegVersion.Version1,
            ChannelMode.Stereo,
            samplesPerFrame,
            samplesPerSecond,
            fallbackSize);

        // Assert
        assert.isOk(header);
        assert.approximately(header.durationMilliseconds, 32153, 1);
    }

    @test
    public totalFrames_withoutTotalFrames() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(36),
            ByteVector.fromString('Xing', StringType.Latin1),
            0x00, 0x00, 0x00, 0x0E,
            ByteVector.fromUint(1234), // Total Size
            ByteVector.fromSize(100),  // TOC
            ByteVector.fromUint(2345)  // VBR scale
        ));

        // Act
        const header = XingHeader.fromFile(file, 0, MpegVersion.Version1, ChannelMode.Stereo, 1, 1, 1);

        // Assert
        assert.isOk(header);
        assert.isUndefined(header.totalFrames);
    }

    @test
    public totalFrames_withTotalFrames() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(36),
            ByteVector.fromString('Xing', StringType.Latin1),
            0x00, 0x00, 0x00, 0x0D,
            ByteVector.fromUint(1234), // Total Frames
            ByteVector.fromSize(100),  // TOC
            ByteVector.fromUint(2345)  // VBR scale
        ));

        // Act
        const header = XingHeader.fromFile(file, 0, MpegVersion.Version1, ChannelMode.Stereo, 1, 1, 1);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.totalFrames, 1234);
    }

    @test
    public totalBytes_withoutTotalSize() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(36),
            ByteVector.fromString('Xing', StringType.Latin1),
            0x00, 0x00, 0x00, 0x0D,
            ByteVector.fromUint(1234), // Total Size
            ByteVector.fromSize(100),  // TOC
            ByteVector.fromUint(2345)  // VBR scale
        ));

        // Act
        const header = XingHeader.fromFile(file, 0, MpegVersion.Version1, ChannelMode.Stereo, 1, 1, 1);

        // Assert
        assert.isOk(header);
        assert.isUndefined(header.totalBytes);
    }

    @test
    public totalBytes_withTotalBytes() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(36),
            ByteVector.fromString('Xing', StringType.Latin1),
            0x00, 0x00, 0x00, 0x0E,
            ByteVector.fromUint(1234), // Total Size
            ByteVector.fromSize(100),  // TOC
            ByteVector.fromUint(2345)  // VBR scale
        ));

        // Act
        const header = XingHeader.fromFile(file, 0, MpegVersion.Version1, ChannelMode.Stereo, 1, 1, 1);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.totalBytes, 1234);
    }

    private fromFile_position(identifier: string) {
        const testCases = [
            {version: MpegVersion.Version1, mode: ChannelMode.SingleChannel, offset: 21},
            {version: MpegVersion.Version1, mode: ChannelMode.Stereo, offset: 36},
            {version: MpegVersion.Version1, mode: ChannelMode.JointStereo, offset: 36},
            {version: MpegVersion.Version1, mode: ChannelMode.DualChannel, offset: 36},
            {version: MpegVersion.Version2, mode: ChannelMode.SingleChannel, offset: 13},
            {version: MpegVersion.Version2, mode: ChannelMode.Stereo, offset: 21},
            {version: MpegVersion.Version2, mode: ChannelMode.JointStereo, offset: 21},
            {version: MpegVersion.Version25, mode: ChannelMode.DualChannel, offset: 21},
            {version: MpegVersion.Version25, mode: ChannelMode.SingleChannel, offset: 13},
            {version: MpegVersion.Version25, mode: ChannelMode.Stereo, offset: 21},
            {version: MpegVersion.Version25, mode: ChannelMode.JointStereo, offset: 21},
            {version: MpegVersion.Version25, mode: ChannelMode.DualChannel, offset: 21},
        ];

        for (const c of testCases) {
            // Arrange
            const file = TestFile.getFile(ByteVector.concatenate(
                ByteVector.fromSize(c.offset),
                ByteVector.fromString(identifier, StringType.Latin1), // Identifier
                ByteVector.fromSize(12)                               // Flags, optimistically 2x uints
            ));

            // Act
            const header = XingHeader.fromFile(file, 0, c.version, c.mode, 1, 1, 1234);

            // Assert
            assert.isOk(
                header,
                `Version: ${MpegVersion[c.version]}, Mode: ${ChannelMode[c.mode]}, offset: ${c.offset} failed`
            );
        }
    }
}
