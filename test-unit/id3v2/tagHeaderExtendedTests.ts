import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import TagHeaderExtended from "../../src/id3v2/tagHeaderExtended";
import {ByteVector} from "../../src/byteVector";
import {Testers} from "../utilities/testers";
import TestFile from "../utilities/testFile";
import {File} from "../../src/file";
import {Id3v2Version} from "../../src/id3v2/enums";

@suite class Id3v2_TagExtendedHeaderTests {
    @test
    public fromData_falsyData() {
        // Act/Assert
        Testers.testTruthy((v: ByteVector) => { TagHeaderExtended.fromData(v, Id3v2Version.V22); });
    }

    @params(ByteVector.empty(), "empty")
    @params(ByteVector.fromSize(1), "length1")
    @params(ByteVector.fromSize(3), "length3")
    public fromData_tooShortData(data: ByteVector) {
        // Act/Assert
        assert.throws(() => TagHeaderExtended.fromData(data, Id3v2Version.V24));
    }

    @params([Id3v2Version.V22, 0x2040810], "v2")
    @params([Id3v2Version.V23, 4 + 0x10101010], "v3")
    @params([Id3v2Version.V24, 0x2040810], "v4")
    public fromData([version, expectedSize]: [Id3v2Version, number]) {
        // Arrange
        const testData = ByteVector.concatenate(0x10, 0x10, 0x10, 0x10);

        // Act
        const output = TagHeaderExtended.fromData(testData, version);

        // Assert
        assert.equal(output.size, expectedSize);
    }

    @test
    public fromFile_falsyFile() {
        // Act/Assert
        Testers.testTruthy((v: File) => { TagHeaderExtended.fromFile(v, 0, Id3v2Version.V24); });
    }

    @test
    public fromFile_invalidPosition() {
        // Arrange
        const file = TestFile.mockFile();

        // Act/Assert
        Testers.testSafeUint((v: number) => { TagHeaderExtended.fromFile(file, v, Id3v2Version.V24); });
    }

    @test
    public fromFile_tooShortData() {
        // Arrange
        const file = TestFile.getFile(ByteVector.fromSize(3));

        // Act/Assert
        assert.throws(() => TagHeaderExtended.fromFile(file, 0, Id3v2Version.V24));
    }

    @params([Id3v2Version.V22, 0x2040810], "v2")
    @params([Id3v2Version.V23, 4 + 0x10101010], "v3")
    @params([Id3v2Version.V24, 0x2040810], "v4")
    public fromFile([version, expectedSize]: [Id3v2Version, number]) {
        // Arrange
        const file = TestFile.getFile(ByteVector.concatenate(
            0x00, 0x00,
            0x10, 0x10, 0x10, 0x10
        ));

        // Act
        const output = TagHeaderExtended.fromFile(file, 2, version);

        // Assert
        assert.equal(output.size, expectedSize);
    }

    @test
    public fromEmpty() {
        // Act
        const output = TagHeaderExtended.fromEmpty();

        // Assert
        assert.equal(output.size, 0);
    }
}
