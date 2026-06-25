import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Id3v2ExtendedHeader from "../../src/id3v2/id3v2ExtendedHeader";
import {ByteVector} from "../../src/byteVector";
import {Testers} from "../utilities/testers";
import TestFile from "../utilities/testFile";
import {File} from "../../src/file";

@suite class Id3v2_TagExtendedHeaderTests {
    @test
    public fromData_falsyData() {
        // Act/Assert
        Testers.testTruthy((v: ByteVector) => { Id3v2ExtendedHeader.fromData(v, 2); });
    }

    @test
    public fromData_invalidVersion() {
        // Arrange
        const testData = ByteVector.fromSize(4);

        // Act/Assert
        Testers.testByte((v: number) => { Id3v2ExtendedHeader.fromData(testData, v); });
    }

    @params(ByteVector.empty(), "empty")
    @params(ByteVector.fromSize(1), "length1")
    @params(ByteVector.fromSize(3), "length3")
    public fromData_tooShortData(data: ByteVector) {
        // Act/Assert
        assert.throws(() => Id3v2ExtendedHeader.fromData(data, 4));
    }

    @test
    public fromData_version3() {
        // Arrange
        const testData = ByteVector.concatenate(0x10, 0x10, 0x10, 0x10);

        // Act
        const output = Id3v2ExtendedHeader.fromData(testData, 3);

        // Assert
        assert.equal(output.size, 4 + 0x10101010);
    }

    @test
    public fromData_version2() {
        // Arrange
        const testData = ByteVector.concatenate(0x10, 0x10, 0x10, 0x10);

        // Act
        const output = Id3v2ExtendedHeader.fromData(testData, 2);

        // Assert
        assert.equal(output.size, 0x2040810);
    }

    @test
    public fromData_version4() {
        // Arrange
        const testData = ByteVector.concatenate(0x10, 0x10, 0x10, 0x10);

        // Act
        const output = Id3v2ExtendedHeader.fromData(testData, 4);

        // Assert
        assert.equal(output.size, 0x2040810);
    }

    @test
    public fromFile_falsyFile() {
        // Act/Assert
        Testers.testTruthy((v: File) => { Id3v2ExtendedHeader.fromFile(v, 0, 4); });
    }

    @test
    public fromFile_invalidPosition() {
        // Arrange
        const file = TestFile.mockFile();

        // Act/Assert
        Testers.testSafeUint((v: number) => { Id3v2ExtendedHeader.fromFile(file, v, 4); });
    }

    @test
    public fromFile_invalidVersion() {
        // Arrange
        const file = TestFile.mockFile();

        // Act/Assert
        Testers.testByte((v: number) => { Id3v2ExtendedHeader.fromFile(file, 0, v); });
    }

    @test
    public fromFile_tooShortData() {
        // Arrange
        const file = TestFile.getFile(ByteVector.fromSize(3));

        // Act/Assert
        assert.throws(() => Id3v2ExtendedHeader.fromFile(file, 0, 4));
    }

    @test
    public fromFile_version3() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            0x00, 0x00,
            0x10, 0x10, 0x10, 0x10
        ));

        // Act
        const output = Id3v2ExtendedHeader.fromFile(file, 2, 3);

        // Assert
        assert.equal(output.size, 4 + 0x10101010);
    }

    @test
    public fromFile_version2() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            0x00, 0x00,
            0x10, 0x10, 0x10, 0x10
        ));

        // Act
        const output = Id3v2ExtendedHeader.fromFile(file, 2, 2);

        // Assert
        assert.equal(output.size, 0x2040810);
    }

    @test
    public fromFile_version4() {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            0x00, 0x00,
            0x10, 0x10, 0x10, 0x10
        ));

        // Act
        const output = Id3v2ExtendedHeader.fromFile(file, 2, 4);

        // Assert
        assert.equal(output.size, 0x2040810);
    }

    @test
    public fromEmpty() {
        // Act
        const output = Id3v2ExtendedHeader.fromEmpty();

        // Assert
        assert.equal(output.size, 0);
    }
}
