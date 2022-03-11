import * as TypeMoq from "typemoq";
import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import MpegVideoHeader from "../../src/mpeg/mpegVideoHeader";
import TestFile from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {MediaTypes} from "../../src/iCodec";
import {Testers} from "../utilities/testers";

@suite class Mpeg_VideoHeader_ConstructorTests {
    @test
    public constructor_invalidArguments() {
        // Act/Assert
        Testers.testTruthy((f: File) => new MpegVideoHeader(f, 0));
        Testers.testUint((p: number) => new MpegVideoHeader(TypeMoq.Mock.ofType<File>().object, p));
    }

    @test
    public constructor_headerTooShort() {
        // Arrange
        const mockData = ByteVector.fromSize(10);
        const mockFile = TestFile.getFile(mockData);

        // Act/Assert
        assert.throws(() => new MpegVideoHeader(mockFile, 5));
    }

    @test
    public constructor_validData() {
        // Arrange
        const mockData = ByteVector.concatenate(
            0x00, 0x00, 0x00,
            0x28, 0x31, 0xE3, 0x26,  // 643x483, 4:3 aspect ratio, 50fps
            0xD8, 0x53, 0xBF         // 221518bps
        );
        const mockFile = TestFile.getFile(mockData);

        // Act
        const header = new MpegVideoHeader(mockFile, 3);

        // Assert
        assert.strictEqual(header.description, "MPEG Video");
        assert.strictEqual(header.durationMilliseconds, 0);
        assert.strictEqual(header.mediaTypes, MediaTypes.Video);
        assert.strictEqual(header.videoBitrate, 221518);
        assert.strictEqual(header.videoFrameRate, 50);
        assert.strictEqual(header.videoHeight, 483);
        assert.strictEqual(header.videoWidth, 643);
    }
}
