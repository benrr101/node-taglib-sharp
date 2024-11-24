import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import TestFile from "../utilities/testFile";
import VbriHeader from "../../src/mpeg/vbriHeader";
import {ByteVector, StringType} from "../../src/byteVector";
import {File} from "../../src/file";
import {Testers} from "../utilities/testers";

@suite class Mpeg_XingHeaderTests {

    @test
    public fromFile_invalidParameters() {
        // Arrange
        const mockFile = Mock.ofType<File>().object;

        // Act / Assert
        Testers.testTruthy((f: File) => VbriHeader.fromFile(f, 0, 1, 1, ));
        Testers.testUint((v: number) => VbriHeader.fromFile(mockFile, v, 1, 1));
        Testers.testUint((v: number) => VbriHeader.fromFile(mockFile, 0, v, 1));
        assert.throws(() => VbriHeader.fromFile(mockFile, 0, 0, 1));
        Testers.testUint((v: number) => VbriHeader.fromFile(mockFile, 0, 1, v));
        assert.throws(() => VbriHeader.fromFile(mockFile, 0, 1, 0));
    }

    @test
    public fromFile_fileTooShort() {
        // Arrange
        const file = TestFile.getFile(ByteVector.fromSize(60));

        // Act / Assert
        assert.isUndefined(VbriHeader.fromFile(file, 1, 1, 1));
    }

    @test
    public fromFile_doesNotStartWithIdentifier() {
        // Arrange
        const file = TestFile.getFile(ByteVector.fromSize(60));

        // Act / Assert
        assert.isUndefined(VbriHeader.fromFile(file, 0, 1, 1));
    }

    @test
    public fromFile_validParameters() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            ByteVector.fromSize(40),
            ByteVector.fromString("VBRI", StringType.Latin1),
            ByteVector.fromSize(2),     // Version
            ByteVector.fromUshort(12),  // Delay
            ByteVector.fromSize(2),     // Quality
            ByteVector.fromUint(12345), // Bytes
            ByteVector.fromUint(123),   // Frames
            ByteVector.fromSize(8)      // TOC Size, TOC scale, TOC entry size, TOC entry frame count
        ));

        // Act
        const header = VbriHeader.fromFile(file, 4, 1152, 44100);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.bitrateKilobytes, 30);
        assert.approximately(header.durationMilliseconds, 3212, 1);
        assert.strictEqual(header.totalBytes, 12345);
        assert.strictEqual(header.totalFrames, 123);
    }
}

