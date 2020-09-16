import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import TestConstants from "../testConstants";
import {ByteVector} from "../../src/byteVector";
import {Id3v2TagHeader, Id3v2TagHeaderFlags} from "../../src/id3v2/id3v2TagHeader";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

const getTestHeader = (majorVersion: number, minorVersion: number, flags: Id3v2TagHeaderFlags): Id3v2TagHeader => {
    const data = ByteVector.concatenate(
        Id3v2TagHeader.fileIdentifier,
        majorVersion,
        minorVersion,
        flags,
        0x10, 0x10, 0x10, 0x10
    );
    return Id3v2TagHeader.fromData(data);
};

@suite class Id3v2_TagHeader_ConstructorTests {
    @test
    public falsyData() {
        // Act/Assert
        assert.throws(() => { const _ = Id3v2TagHeader.fromData(null); });
        assert.throws(() => { const _ = Id3v2TagHeader.fromData(undefined); });
    }

    @test
    public tooShortData() {
        // Arrange
        const data0 = ByteVector.empty();
        const data1 = ByteVector.fromSize(1);

        // Act/Assert
        assert.throws(() => { const _ = Id3v2TagHeader.fromData(data0); });
        assert.throws(() => { const _ = Id3v2TagHeader.fromData(data1); });
    }

    @test
    public invalidStartOfData() {
        // Act/Assert
        assert.throws(() => { const _ = Id3v2TagHeader.fromData(TestConstants.testByteVector); });
    }

    @test
    public invalidFlagsForVersion2() {
        // Arrange
        const testData = ByteVector.concatenate(
            Id3v2TagHeader.fileIdentifier,
            0x02, 0x00,
            0xFF,
            0x00, 0x00, 0x00, 0x00
        );

        // Act/Assert
        assert.throws(() => { const _ = Id3v2TagHeader.fromData(testData); });
    }

    @test
    public invalidFlagsForVersion3() {
        // Arrange
        const testData = ByteVector.concatenate(
            Id3v2TagHeader.fileIdentifier,
            0x03, 0x00,
            0xFF,
            0x00, 0x00, 0x00, 0x00
        );

        // Act/Assert
        assert.throws(() => { const _ = Id3v2TagHeader.fromData(testData); });
    }

    @test
    public invalidFlagsForVersion4() {
        // Arrange
        const testData = ByteVector.concatenate(
            Id3v2TagHeader.fileIdentifier,
            0x04, 0x00,
            0xFF,
            0x00, 0x00, 0x00, 0x00
        );

        // Act/Assert
        assert.throws(() => { const _ = Id3v2TagHeader.fromData(testData); });
    }

    @test
    public invalidTagSizeBytes() {
        // Arrange
        const testData = ByteVector.concatenate(
            Id3v2TagHeader.fileIdentifier,
            0x04, 0x00,
            0x00
        );
        const testData1 = ByteVector.concatenate(testData, 0x80, 0x00, 0x00, 0x00);
        const testData2 = ByteVector.concatenate(testData, 0x00, 0x80, 0x00, 0x00);
        const testData3 = ByteVector.concatenate(testData, 0x00, 0x00, 0x80, 0x00);
        const testData4 = ByteVector.concatenate(testData, 0x00, 0x00, 0x00, 0x80);

        // Act/Assert
        assert.throws(() => {const _ = Id3v2TagHeader.fromData(testData1); });
        assert.throws(() => {const _ = Id3v2TagHeader.fromData(testData2); });
        assert.throws(() => {const _ = Id3v2TagHeader.fromData(testData3); });
        assert.throws(() => {const _ = Id3v2TagHeader.fromData(testData4); });
    }

    @test
    public validData() {
        // Arrange
        const majorVersion = 0x04;
        const minorVersion = 0x00;
        const flags = 0xE0;
        const testData = ByteVector.concatenate(
            Id3v2TagHeader.fileIdentifier,
            majorVersion,
            minorVersion,
            flags,
            0x10, 0x10, 0x10, 0x10
        );

        // Act
        const output = Id3v2TagHeader.fromData(testData);

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
        const output = Id3v2TagHeader.fileIdentifier;

        // Assert
        assert.ok(output);
    }

    @test
    public getCompleteTagSize_withFooter() {
        // Arrange
        const header = getTestHeader(4, 0, Id3v2TagHeaderFlags.FooterPresent);

        // Act
        const totalSize = header.completeTagSize;

        // Assert
        assert.equal(totalSize, header.tagSize + Id3v2Settings.headerSize + Id3v2Settings.footerSize);
    }

    @test
    public getCompleteTagSize_noFooter() {
        // Arrange
        const header = getTestHeader(4, 0, Id3v2TagHeaderFlags.None);

        // Act
        const totalSize = header.completeTagSize;

        // Assert
        assert.equal(totalSize, header.tagSize + Id3v2Settings.headerSize);
    }

    @test
    public setFlags_version2InvalidFlags() {
        // Arrange
        const header = getTestHeader(2, 0, Id3v2TagHeaderFlags.None);

        // Act
        const set1 = () => { header.flags = Id3v2TagHeaderFlags.ExtendedHeader; };
        const set2 = () => { header.flags = Id3v2TagHeaderFlags.ExperimentalIndicator; };
        const set3 = () => { header.flags = Id3v2TagHeaderFlags.FooterPresent; };

        // Assert
        assert.throws(set1);
        assert.throws(set2);
        assert.throws(set3);
        assert.equal(header.flags, Id3v2TagHeaderFlags.None);
    }

    @test
    public setFlags_version3InvalidFlags() {
        // Arrange
        const header = getTestHeader(3, 0, Id3v2TagHeaderFlags.None);

        // Act
        const set = () => { header.flags = Id3v2TagHeaderFlags.FooterPresent; };

        // Assert
        assert.throws(set);
        assert.equal(header.flags, Id3v2TagHeaderFlags.None);
    }

    @test
    public setFlags_validFlags() {
        // Arrange
        const header = getTestHeader(4, 0, Id3v2TagHeaderFlags.None);

        // Act
        header.flags = Id3v2TagHeaderFlags.FooterPresent;

        // Assert
        assert.equal(header.flags, Id3v2TagHeaderFlags.FooterPresent);
    }

    @test
    public getMajorVersion_zero() {
        // Arrange
        const header = getTestHeader(0, 0, Id3v2TagHeaderFlags.None);

        // Act
        const output = header.majorVersion;

        // Assert
        assert.equal(output, Id3v2Settings.defaultVersion);
    }

    @test
    public getMajorVersion_nonZero() {
        // Arrange
        const header = getTestHeader(4, 0, Id3v2TagHeaderFlags.None);

        // Act
        const output = header.majorVersion;

        // Assert
        assert.equal(output, 4);
    }

    @test
    public getMajorVersion_forcedDefault() {
        // Arrange
        const header = getTestHeader(4, 0, Id3v2TagHeaderFlags.None);

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
        const header = getTestHeader(4, 0, Id3v2TagHeaderFlags.None);

        // Act/Assert
        assert.throws(() => { header.majorVersion = -1; });
        assert.throws(() => { header.majorVersion = 1.25; });
        assert.throws(() => { header.majorVersion = 0x100; });
        assert.throws(() => { header.majorVersion = 1; });
        assert.throws(() => { header.majorVersion = 5; });
    }

    @test
    public setMajorVersion_2_unsets3And4Flags() {
        // Arrange
        const flags = Id3v2TagHeaderFlags.ExtendedHeader |
            Id3v2TagHeaderFlags.ExperimentalIndicator |
            Id3v2TagHeaderFlags.FooterPresent;
        const header = getTestHeader(4, 0, flags);

        // Act
        header.majorVersion = 2;

        // Assert
        assert.equal(header.majorVersion, 2);
        assert.equal(header.flags & flags, 0);
    }

    @test
    public setMajorVersion3_unsets4Flags() {
        // Arrange
        const flags = Id3v2TagHeaderFlags.FooterPresent;
        const header = getTestHeader(4, 0, flags);

        // Act
        header.majorVersion = 3;

        // Assert
        assert.equal(header.majorVersion, 3);
        assert.equal(header.flags & flags, 0);
    }

    @test
    public setRevisionNumber_invalidValue() {
        // Arrange
        const header = getTestHeader(4, 0, Id3v2TagHeaderFlags.None);

        // Act/Assert
        assert.throws(() => { header.revisionNumber = -1; });
        assert.throws(() => { header.revisionNumber = 1.25; });
        assert.throws(() => { header.revisionNumber = 0x100; });
    }

    @test
    public setRevisionNumber_validValue() {
        // Arrange
        const header = getTestHeader(4, 0, Id3v2TagHeaderFlags.None);

        // Act
        header.revisionNumber = 2;

        // Assert
        assert.equal(header.revisionNumber, 2);
    }

    @test
    public setTagSize_invalidValues() {
        // Arrange
        const header = getTestHeader(4, 0, Id3v2TagHeaderFlags.None);

        // Act/Assert
        assert.throws(() => { header.tagSize = -1; });
        assert.throws(() => { header.tagSize = 1.25; });
        assert.throws(() => { header.tagSize = 0xF0000000; });
    }

    @test
    public setTagSize_validValue() {
        // Arrange
        const header = getTestHeader(4, 0, Id3v2TagHeaderFlags.None);

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
            Id3v2TagHeader.fileIdentifier,
            majorVersion,
            minorVersion,
            flags,
            0x10, 0x10, 0x10, 0x10
        );
        const header = Id3v2TagHeader.fromData(testData);

        // Act
        const output = header.render();

        // Assert
        assert.isTrue(ByteVector.equal(output, testData));
    }
}
