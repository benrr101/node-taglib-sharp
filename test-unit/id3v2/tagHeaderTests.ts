import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import TagHeader from "../../src/id3v2/tagHeader";
import TestConstants from "../testConstants";
import {ByteVector} from "../../src/byteVector";
import {TagFlags} from "../../src/id3v2/enums";
import {Testers} from "../utilities/testers";
import {NumberUtils} from "../../src/utils";

const getTestHeader = (majorVersion: number, minorVersion: number, flags: TagFlags): TagHeader => {
    const data = ByteVector.concatenate(
        TagHeader.FILE_IDENTIFIER,
        majorVersion,
        minorVersion,
        flags,
        0x10, 0x10, 0x10, 0x10
    );
    return TagHeader.fromData(data);
};

@suite class Id3v2_TagHeader_ConstructorTests {
    @test
    public falsyData() {
        // Act/Assert
        Testers.testTruthy((v: ByteVector) => TagHeader.fromData(v));
    }

    @test
    public tooShortData() {
        // Arrange
        const data0 = ByteVector.empty();
        const data1 = ByteVector.fromSize(1);

        // Act/Assert
        assert.throws(() => TagHeader.fromData(data0));
        assert.throws(() => TagHeader.fromData(data1));
    }

    @test
    public invalidStartOfData() {
        // Act/Assert
        assert.throws(() => TagHeader.fromData(TestConstants.testByteVector));
    }

    @test
    public invalidFlagsForVersion2() {
        // Arrange
        const testData = ByteVector.concatenate(
            TagHeader.FILE_IDENTIFIER,
            0x02, 0x00,
            0xFF,
            0x00, 0x00, 0x00, 0x00
        );

        // Act/Assert
        assert.throws(() => TagHeader.fromData(testData));
    }

    @test
    public invalidFlagsForVersion3() {
        // Arrange
        const testData = ByteVector.concatenate(
            TagHeader.FILE_IDENTIFIER,
            0x03, 0x00,
            0xFF,
            0x00, 0x00, 0x00, 0x00
        );

        // Act/Assert
        assert.throws(() => TagHeader.fromData(testData));
    }

    @test
    public invalidFlagsForVersion4() {
        // Arrange
        const testData = ByteVector.concatenate(
            TagHeader.FILE_IDENTIFIER,
            0x04, 0x00,
            0xFF,
            0x00, 0x00, 0x00, 0x00
        );

        // Act/Assert
        assert.throws(() => TagHeader.fromData(testData));
    }

    @test
    public invalidTagSizeBytes() {
        // Arrange
        const testData = ByteVector.concatenate(
            TagHeader.FILE_IDENTIFIER,
            0x04, 0x00,
            0x00
        );
        const testData1 = ByteVector.concatenate(testData, 0x80, 0x00, 0x00, 0x00);
        const testData2 = ByteVector.concatenate(testData, 0x00, 0x80, 0x00, 0x00);
        const testData3 = ByteVector.concatenate(testData, 0x00, 0x00, 0x80, 0x00);
        const testData4 = ByteVector.concatenate(testData, 0x00, 0x00, 0x00, 0x80);

        // Act/Assert
        assert.throws(() => TagHeader.fromData(testData1));
        assert.throws(() => TagHeader.fromData(testData2));
        assert.throws(() => TagHeader.fromData(testData3));
        assert.throws(() => TagHeader.fromData(testData4));
    }

    @test
    public validData() {
        // Arrange
        const majorVersion = 0x04;
        const minorVersion = 0x00;
        const flags = 0xE0;
        const testData = ByteVector.concatenate(
            TagHeader.FILE_IDENTIFIER,
            majorVersion,
            minorVersion,
            flags,
            0x10, 0x10, 0x10, 0x10
        );

        // Act
        const output = TagHeader.fromData(testData);

        // Assert
        assert.equal(output.flags, flags);
        assert.equal(output.majorVersion, majorVersion);
        assert.equal(output.revisionNumber, minorVersion);
        assert.equal(output.tagSize, 0x2040810);
    }
}

@suite class Id3v2_TagHeader_PropertyTests {
    @test
    public getFileIdentifier() {
        // Act
        const output = TagHeader.FILE_IDENTIFIER;

        // Assert
        assert.ok(output);
    }

    @test
    public getCompleteTagSize_withFooter() {
        // Arrange
        const header = getTestHeader(4, 0, TagFlags.FooterPresent);

        // Act
        const totalSize = header.completeTagSize;

        // Assert
        assert.equal(totalSize, header.tagSize + Id3v2Settings.headerSize + Id3v2Settings.footerSize);
    }

    @test
    public getCompleteTagSize_noFooter() {
        // Arrange
        const header = getTestHeader(4, 0, TagFlags.None);

        // Act
        const totalSize = header.completeTagSize;

        // Assert
        assert.equal(totalSize, header.tagSize + Id3v2Settings.headerSize);
    }

    @test
    public setFlags_version2InvalidFlags() {
        // Arrange
        const header = getTestHeader(2, 0, TagFlags.None);

        // Act
        const set1 = () => { header.flags = TagFlags.ExtendedHeader; };
        const set2 = () => { header.flags = TagFlags.ExperimentalIndicator; };
        const set3 = () => { header.flags = TagFlags.FooterPresent; };

        // Assert
        assert.throws(set1);
        assert.throws(set2);
        assert.throws(set3);
        assert.equal(header.flags, TagFlags.None);
    }

    @test
    public setFlags_version3InvalidFlags() {
        // Arrange
        const header = getTestHeader(3, 0, TagFlags.None);

        // Act
        const set = () => { header.flags = TagFlags.FooterPresent; };

        // Assert
        assert.throws(set);
        assert.equal(header.flags, TagFlags.None);
    }

    @test
    public setFlags_validFlags() {
        // Arrange
        const header = getTestHeader(4, 0, TagFlags.None);

        // Act
        header.flags = TagFlags.FooterPresent;

        // Assert
        assert.equal(header.flags, TagFlags.FooterPresent);
    }

    @test
    public getMajorVersion_zero() {
        // Arrange
        const header = getTestHeader(0, 0, TagFlags.None);

        // Act
        const output = header.majorVersion;

        // Assert
        assert.equal(output, Id3v2Settings.defaultVersion);
    }

    @test
    public getMajorVersion_nonZero() {
        // Arrange
        const header = getTestHeader(4, 0, TagFlags.None);

        // Act
        const output = header.majorVersion;

        // Assert
        assert.equal(output, 4);
    }

    @test
    public getMajorVersion_forcedDefault() {
        // Arrange
        const header = getTestHeader(4, 0, TagFlags.None);

        const initialForceValue = Id3v2Settings.forceDefaultVersion;
        try {
            Id3v2Settings.forceDefaultVersion = true;

            // Act
            const output = header.majorVersion;

            // Assert
            assert.strictEqual(output, Id3v2Settings.defaultVersion);
        } finally {
            // Cleanup
            Id3v2Settings.forceDefaultVersion = initialForceValue;
        }
    }

    @test
    public setMajorVersion_invalidValues() {
        // Arrange
        const header = getTestHeader(4, 0, TagFlags.None);

        // Act/Assert
        Testers.testByte((v: number) => { header.majorVersion = v; });
        assert.throws(() => { header.majorVersion = 1; });
        assert.throws(() => { header.majorVersion = 5; });
    }

    @test
    public setMajorVersion_2_unsets3And4Flags() {
        // Arrange
        const flags = TagFlags.ExtendedHeader |
            TagFlags.ExperimentalIndicator |
            TagFlags.FooterPresent;
        const header = getTestHeader(4, 0, flags);

        // Act
        header.majorVersion = 2;

        // Assert
        assert.equal(header.majorVersion, 2);
        assert.isFalse(NumberUtils.hasFlag(header.flags, flags));
    }

    @test
    public setMajorVersion3_unsets4Flags() {
        // Arrange
        const flags = TagFlags.FooterPresent;
        const header = getTestHeader(4, 0, flags);

        // Act
        header.majorVersion = 3;

        // Assert
        assert.equal(header.majorVersion, 3);
        assert.isFalse(NumberUtils.hasFlag(header.flags, flags));
    }

    @test
    public setRevisionNumber_invalidValue() {
        // Arrange
        const header = getTestHeader(4, 0, TagFlags.None);

        // Act/Assert
        Testers.testByte((v: number) => { header.revisionNumber = v; });
    }

    @test
    public setRevisionNumber_validValue() {
        // Arrange
        const header = getTestHeader(4, 0, TagFlags.None);

        // Act
        header.revisionNumber = 2;

        // Assert
        assert.equal(header.revisionNumber, 2);
    }

    @test
    public setTagSize_invalidValues() {
        // Arrange
        const header = getTestHeader(4, 0, TagFlags.None);

        // Act/Assert
        Testers.testUint((v: number) => { header.tagSize = v; });
        assert.throws(() => { header.tagSize = 0xF0000000; });
    }

    @test
    public setTagSize_validValue() {
        // Arrange
        const header = getTestHeader(4, 0, TagFlags.None);

        // Act
        header.tagSize = 0x1234;

        // Assert
        assert.equal(header.tagSize, 0x1234);
    }
}

@suite class Id3v2_TagHeader_RenderTests {
    @test
    public render() {
        // Arrange
        const majorVersion = 0x04;
        const minorVersion = 0x00;
        const flags = 0xE0;
        const testData = ByteVector.concatenate(
            TagHeader.FILE_IDENTIFIER,
            majorVersion,
            minorVersion,
            flags,
            0x10, 0x10, 0x10, 0x10
        );
        const header = TagHeader.fromData(testData);

        // Act
        const output = header.render();

        // Assert
        Testers.bvEqual(output, testData);
    }
}
