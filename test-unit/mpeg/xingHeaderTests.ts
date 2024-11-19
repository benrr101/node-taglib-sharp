import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import XingHeader from "../../src/mpeg/xingHeader";
import {ByteVector} from "../../src/byteVector";
import {ChannelMode, MpegVersion} from "../../src/mpeg/mpegEnums";
import {Testers} from "../utilities/testers";

@suite class Mpeg_XingHeaderTests {
    @test
    public fromInfo_invalidParameters() {
        // Act / Assert
        Testers.testUint((v: number) => { XingHeader.fromInfo(v, 123); });
        Testers.testUint((v: number) => { XingHeader.fromInfo(123, v); });
    }

    @test
    public fromInfo_validParams() {
        // Act
        const header = XingHeader.fromInfo(123, 234);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.totalFrames, 123);
        assert.strictEqual(header.totalBytes, 234);
        assert.isFalse(header.isPresent);
    }

    @test
    public fromData_invalidParameters() {
        // Act / Assert
        assert.throws(() => { XingHeader.fromData(undefined); });
        assert.throws(() => { XingHeader.fromData(null); });
    }

    @test
    public fromData_invalidXingHeader() {
        // Arrange
        const data = ByteVector.fromSize(16);

        // Act / Assert
        assert.throws(() => { XingHeader.fromData(data); });
    }

    @test
    public fromData_zeroTotalFrames() {
        // Arrange
        const data = ByteVector.concatenate(
            XingHeader.FILE_IDENTIFIER,
            0x00, 0x00, 0x00, 0x02,
            ByteVector.fromUint(123)
        );

        // Act
        const header = XingHeader.fromData(data);

        // Assert
        assert.strictEqual(header.totalFrames, 0);
        assert.strictEqual(header.totalSize, 123);
        assert.isTrue(header.isPresent);
    }

    @test
    public fromData_zeroTotalSize() {
        // Arrange
        const data = ByteVector.concatenate(
            XingHeader.FILE_IDENTIFIER,
            0x00, 0x00, 0x00, 0x01,
            ByteVector.fromUint(123)
        );

        // Act
        const header = XingHeader.fromData(data);

        // Assert
        assert.strictEqual(header.totalFrames, 123);
        assert.strictEqual(header.totalSize, 0);
        assert.isTrue(header.isPresent);
    }

    @test
    public fromData_totalSizeAndFrames() {
        // Arrange
        const data = ByteVector.concatenate(
            XingHeader.FILE_IDENTIFIER,
            0x00, 0x00, 0x00, 0x03,
            ByteVector.fromUint(123),
            ByteVector.fromUint(234)
        );

        // Act
        const header = XingHeader.fromData(data);

        // Assert
        assert.strictEqual(header.totalFrames, 123);
        assert.strictEqual(header.totalSize, 234);
        assert.isTrue(header.isPresent);
    }

    @test
    public xingHeaderOffset() {
        // Act / Assert
        assert.strictEqual(XingHeader.xingHeaderOffset(MpegVersion.Version1, ChannelMode.DualChannel), 0x24);
        assert.strictEqual(XingHeader.xingHeaderOffset(MpegVersion.Version1, ChannelMode.JointStereo), 0x24);
        assert.strictEqual(XingHeader.xingHeaderOffset(MpegVersion.Version1, ChannelMode.SingleChannel), 0x15);
        assert.strictEqual(XingHeader.xingHeaderOffset(MpegVersion.Version1, ChannelMode.Stereo), 0x24);
        assert.strictEqual(XingHeader.xingHeaderOffset(MpegVersion.Version2, ChannelMode.DualChannel), 0x15);
        assert.strictEqual(XingHeader.xingHeaderOffset(MpegVersion.Version2, ChannelMode.JointStereo), 0x15);
        assert.strictEqual(XingHeader.xingHeaderOffset(MpegVersion.Version2, ChannelMode.SingleChannel), 0x0D);
        assert.strictEqual(XingHeader.xingHeaderOffset(MpegVersion.Version2, ChannelMode.Stereo), 0x15);
        assert.strictEqual(XingHeader.xingHeaderOffset(MpegVersion.Version25, ChannelMode.DualChannel), 0x15);
        assert.strictEqual(XingHeader.xingHeaderOffset(MpegVersion.Version25, ChannelMode.JointStereo), 0x15);
        assert.strictEqual(XingHeader.xingHeaderOffset(MpegVersion.Version25, ChannelMode.SingleChannel), 0x0D);
        assert.strictEqual(XingHeader.xingHeaderOffset(MpegVersion.Version25, ChannelMode.Stereo), 0x15);
    }
}
