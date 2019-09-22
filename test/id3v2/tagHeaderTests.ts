import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import Header from "../../src/id3v2/header";
import Id3v2TagSettings from "../../src/id3v2/id3v2TagSettings";
import TestConstants from "../testConstants";
import {ByteVector} from "../../src/byteVector";
import {HeaderFlags} from "../../src/id3v2/headerFlags";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

const getTestHeader = (majorVersion: number, minorVersion: number, flags: HeaderFlags): Header => {
    const data = ByteVector.concatenate(
        Header.fileIdentifier,
        majorVersion,
        minorVersion,
        flags,
        0x10, 0x10, 0x10, 0x10
    );
    return new Header(data);
};

@suite(timeout(3000), slow(1000))
class TagHeaderConstructorTests {
    @test
    public falsyData() {
        // Act/Assert
        assert.throws(() => { const q = new Header(null); });
        assert.throws(() => { const q = new Header(undefined); });
    }

    @test
    public tooShortData() {
        // Arrange
        const data0 = ByteVector.empty();
        const data1 = ByteVector.fromSize(1);

        // Act/Assert
        assert.throws(() => { const q = new Header(data0); });
        assert.throws(() => { const q = new Header(data1); });
    }

    @test
    public invalidStartOfData() {
        // Act/Assert
        assert.throws(() => { const q = new Header(TestConstants.testByteVector); });
    }

    @test
    public invalidFlagsForVersion2() {
        // Arrange
        const testData = ByteVector.concatenate(
            Header.fileIdentifier,
            0x02, 0x00,
            0xFF,
            0x00, 0x00, 0x00, 0x00
        );

        // Act/Assert
        assert.throws(() => { const q = new Header(testData); });
    }

    @test
    public invalidFlagsForVersion3() {
        // Arrange
        const testData = ByteVector.concatenate(
            Header.fileIdentifier,
            0x03, 0x00,
            0xFF,
            0x00, 0x00, 0x00, 0x00
        );

        // Act/Assert
        assert.throws(() => { const q = new Header(testData); });
    }

    @test
    public invalidFlagsForVersion4() {
        // Arrange
        const testData = ByteVector.concatenate(
            Header.fileIdentifier,
            0x04, 0x00,
            0xFF,
            0x00, 0x00, 0x00, 0x00
        );

        // Act/Assert
        assert.throws(() => { const q = new Header(testData); });
    }

    @test
    public invalidTagSizeBytes() {
        // Arrange
        const testData = ByteVector.concatenate(
            Header.fileIdentifier,
            0x04, 0x00,
            0x00
        );
        const testData1 = ByteVector.concatenate(testData, 0x80, 0x00, 0x00, 0x00);
        const testData2 = ByteVector.concatenate(testData, 0x00, 0x80, 0x00, 0x00);
        const testData3 = ByteVector.concatenate(testData, 0x00, 0x00, 0x80, 0x00);
        const testData4 = ByteVector.concatenate(testData, 0x00, 0x00, 0x00, 0x80);

        // Act/Assert
        assert.throws(() => {const q = new Header(testData1); });
        assert.throws(() => {const q = new Header(testData2); });
        assert.throws(() => {const q = new Header(testData3); });
        assert.throws(() => {const q = new Header(testData4); });
    }

    @test
    public validData() {
        // Arrange
        const majorVersion = 0x04;
        const minorVersion = 0x00;
        const flags = 0xE0;
        const testData = ByteVector.concatenate(
            Header.fileIdentifier,
            majorVersion,
            minorVersion,
            flags,
            0x10, 0x10, 0x10, 0x10
        );

        // Act
        const output = new Header(testData);

        // Assert
        assert.equal(output.flags, flags);
        assert.equal(output.majorVersion, majorVersion);
        assert.equal(output.revisionNumber, minorVersion);
        assert.equal(output.tagSize, 0x2040810);
    }
}

@suite(timeout(3000), slow(1000))
class TagHeaderPropertyTests {
    @test
    public getFileIdentifier() {
        // Act
        const output = Header.fileIdentifier;

        // Assert
        assert.ok(output);
    }

    @test
    public getCompleteTagSize_withFooter() {
        // Arrange
        const header = getTestHeader(4, 0, HeaderFlags.FooterPresent);

        // Act
        const totalSize = header.completeTagSize;

        // Assert
        assert.equal(totalSize, header.tagSize + Id3v2TagSettings.headerSize + Id3v2TagSettings.footerSize);
    }

    @test
    public getCompleteTagSize_noFooter() {
        // Arrange
        const header = getTestHeader(4, 0, HeaderFlags.None);

        // Act
        const totalSize = header.completeTagSize;

        // Assert
        assert.equal(totalSize, header.tagSize + Id3v2TagSettings.headerSize);
    }

    @test
    public setFlags_version2InvalidFlags() {
        // Arrange
        const header = getTestHeader(2, 0, HeaderFlags.None);

        // Act
        const set1 = () => { header.flags = HeaderFlags.ExtendedHeader; };
        const set2 = () => { header.flags = HeaderFlags.ExperimentalIndicator; };
        const set3 = () => { header.flags = HeaderFlags.FooterPresent; };

        // Assert
        assert.throws(set1);
        assert.throws(set2);
        assert.throws(set3);
        assert.equal(header.flags, HeaderFlags.None);
    }

    @test
    public setFlags_version3InvalidFlags() {
        // Arrange
        const header = getTestHeader(3, 0, HeaderFlags.None);

        // Act
        const set = () => { header.flags = HeaderFlags.FooterPresent; };

        // Assert
        assert.throws(set);
        assert.equal(header.flags, HeaderFlags.None);
    }

    @test
    public setFlags_validFlags() {
        // Arrange
        const header = getTestHeader(4, 0, HeaderFlags.None);

        // Act
        header.flags = HeaderFlags.FooterPresent;

        // Assert
        assert.equal(header.flags, HeaderFlags.FooterPresent);
    }

    @test
    public getMajorVersion_zero() {
        // Arrange
        const header = getTestHeader(0, 0, HeaderFlags.None);

        // Act
        const output = header.majorVersion;

        // Assert
        assert.equal(output, Id3v2TagSettings.defaultVersion);
    }

    @test
    public getMajorVersion_nonZero() {
        // Arrange
        const header = getTestHeader(4, 0, HeaderFlags.None);

        // Act
        const output = header.majorVersion;

        // Assert
        assert.equal(output, 4);
    }

    @test
    public setMajorVersion_invalidValues() {
        // Arrange
        const header = getTestHeader(4, 0, HeaderFlags.None);

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
        const flags = HeaderFlags.ExtendedHeader | HeaderFlags.ExperimentalIndicator | HeaderFlags.FooterPresent;
        const header = getTestHeader(4, 0, flags);

        // Act
        header.majorVersion = 2;

        // Assert
        assert.equal(header.majorVersion, 2)
        assert.equal(header.flags & flags, 0);
    }

    @test
    public setMajorVersion3_unsets4Flags() {
        // Arrange
        const flags = HeaderFlags.FooterPresent;
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
        const header = getTestHeader(4, 0, HeaderFlags.None);

        // Act/Assert
        assert.throws(() => { header.revisionNumber = -1; });
        assert.throws(() => { header.revisionNumber = 1.25; });
        assert.throws(() => { header.revisionNumber = 0x100; });
    }

    @test
    public setRevisionNumber_validValue() {
        // Arrange
        const header = getTestHeader(4, 0, HeaderFlags.None);

        // Act
        header.revisionNumber = 2;

        // Assert
        assert.equal(header.revisionNumber, 2);
    }

    @test
    public setTagSize_invalidValues() {
        // Arrange
        const header = getTestHeader(4, 0, HeaderFlags.None);

        // Act/Assert
        assert.throws(() => { header.tagSize = -1; });
        assert.throws(() => { header.tagSize = 1.25; });
        assert.throws(() => { header.tagSize = 0xF0000000; });
    }

    @test
    publicsetTagSize_validValue() {
        // Arrange
        const header = getTestHeader(4, 0, HeaderFlags.None);

        // Act
        header.tagSize = 0x1234;

        // Assert
        assert.equal(header.tagSize, 0x1234);
    }
}

@suite(timeout(3000), slow(1000))
class TagHeaderRenderTests {
    @test
    public render() {
        // Arrange
        const majorVersion = 0x04;
        const minorVersion = 0x00;
        const flags = 0xE0;
        const testData = ByteVector.concatenate(
            Header.fileIdentifier,
            majorVersion,
            minorVersion,
            flags,
            0x10, 0x10, 0x10, 0x10
        );
        const header = new Header(testData);

        // Act
        const output = header.render();

        // Assert
        assert.isTrue(ByteVector.equal(output, testData));
    }
}
