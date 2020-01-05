import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import Footer from "../../src/id3v2/footer";
import Id3v2TagSettings from "../../src/id3v2/id3v2TagSettings";
import TestConstants from "../testConstants";
import {ByteVector} from "../../src/byteVector";
import {HeaderFlags} from "../../src/id3v2/headerFlags";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

const getTestFooter = (majorVersion: number, minorVersion: number, flags: HeaderFlags): Footer => {
    const data = ByteVector.concatenate(
        Footer.fileIdentifier,
        majorVersion,
        minorVersion,
        flags,
        TestConstants.syncedUintBytes
    );
    return new Footer(data);
};

@suite(timeout(3000), slow(1000))
class Id3v2_TagFooterConstructorTests {
    @test
    public falsyData() {
        // Act/Assert
        assert.throws(() => { const _ = new Footer(null); });
        assert.throws(() => { const _ = new Footer(undefined); });
    }

    @test
    public invalidDataLength() {
        // Arrange
        const data = ByteVector.fromSize(1);

        // Act/Assert
        assert.throws(() => { const _ = new Footer(data); });
    }

    @test
    public missingIdentifier() {
        // Arrange
        const data = ByteVector.fromSize(10);

        // Act/Assert
        assert.throws(() => { const _ = new Footer(data); });
    }

    @test
    public invalidFlags_version4() {
        // Arrange
        const data = ByteVector.concatenate(
            Footer.fileIdentifier,
            0x04, 0x00, 0x07
        );

        // Act/Assert
        assert.throws(() => { const _ = new Footer(data); });
    }

    @test
    public invalidTagSizeBytes() {
        // Arrange
        const testData = ByteVector.concatenate(
            Footer.fileIdentifier,
            0x04, 0x00, 0x00
        );
        const testData1 = ByteVector.concatenate(testData, 0x80, 0x00, 0x00, 0x00);
        const testData2 = ByteVector.concatenate(testData, 0x00, 0x80, 0x00, 0x00);
        const testData3 = ByteVector.concatenate(testData, 0x00, 0x00, 0x80, 0x00);
        const testData4 = ByteVector.concatenate(testData, 0x00, 0x00, 0x00, 0x80);

        // Act/Assert
        assert.throws(() => { const _ = new Footer(testData1); });
        assert.throws(() => { const _ = new Footer(testData2); });
        assert.throws(() => { const _ = new Footer(testData3); });
        assert.throws(() => { const _ = new Footer(testData4); });
    }

    @test
    public validParams() {
        // Arrange
        const majorVersion = 0x04;
        const minorVersion = 0x00;
        const flags = 0xE0;
        const testData = ByteVector.concatenate(
            Footer.fileIdentifier,
            majorVersion,
            minorVersion,
            flags,
            TestConstants.syncedUintBytes
        );

        // Act
        const output = new Footer(testData);

        // Assert
        assert.equal(output.flags, flags);
        assert.equal(output.majorVersion, majorVersion);
        assert.equal(output.revisionNumber, minorVersion);
        assert.equal(output.tagSize, TestConstants.syncedUint);
    }
}

@suite(timeout(3000), slow(1000))
class TagFooterPropertyTests {
    @test
    public getCompleteTagSize() {
        // Arrange
        const footer = getTestFooter(4, 0, HeaderFlags.None);

        // Act
        const output = footer.completeTagSize;

        // Assert
        assert.equal(output, footer.tagSize + Id3v2TagSettings.headerSize + Id3v2TagSettings.footerSize);
    }

    @test
    public setFlags_validFlags() {
        // Arrange
        const footer = getTestFooter(4, 0, HeaderFlags.None);

        // Act
        footer.flags = HeaderFlags.FooterPresent;

        // Assert
        assert.equal(footer.flags, HeaderFlags.FooterPresent);
    }

    @test
    public getMajorVersion_zero() {
        // Arrange
        const footer = getTestFooter(0, 0, HeaderFlags.None);

        // Act
        const output = footer.majorVersion;

        // Assert
        assert.equal(output, Id3v2TagSettings.defaultVersion);
    }

    @test
    public getMajorVersion_nonZero() {
        // Arrange
        const footer = getTestFooter(4, 0, HeaderFlags.None);

        // Act
        const output = footer.majorVersion;

        // Assert
        assert.equal(output, 4);
    }

    @test
    public setMajorVersion_invalidValues() {
        // Arrange
        const footer = getTestFooter(4, 0, HeaderFlags.None);

        // Act/Assert
        assert.throws(() => { footer.majorVersion = -1; });
        assert.throws(() => { footer.majorVersion = 1.25; });
        assert.throws(() => { footer.majorVersion = 0x100; });
        assert.throws(() => { footer.majorVersion = 1; });
        assert.throws(() => { footer.majorVersion = 5; });
    }

    @test
    public setRevisionNumber_invalidValue() {
        // Arrange
        const footer = getTestFooter(4, 0, HeaderFlags.None);

        // Act/Assert
        assert.throws(() => { footer.revisionNumber = -1; });
        assert.throws(() => { footer.revisionNumber = 1.25; });
        assert.throws(() => { footer.revisionNumber = 0x100; });
    }

    @test
    public setRevisionNumber_validValue() {
        // Arrange
        const footer = getTestFooter(4, 0, HeaderFlags.None);

        // Act
        footer.revisionNumber = 2;

        // Assert
        assert.equal(footer.revisionNumber, 2);
    }

    @test
    public setTagSize_invalidValues() {
        // Arrange
        const footer = getTestFooter(4, 0, HeaderFlags.None);

        // Act/Assert
        assert.throws(() => { footer.tagSize = -1; });
        assert.throws(() => { footer.tagSize = 1.25; });
        assert.throws(() => { footer.tagSize = 0xF0000000; });
    }

    @test
    public publicsetTagSize_validValue() {
        // Arrange
        const footer = getTestFooter(4, 0, HeaderFlags.None);

        // Act
        footer.tagSize = 0x1234;

        // Assert
        assert.equal(footer.tagSize, 0x1234);
    }
}

@suite(timeout(3000), slow(1000))
class TagFooterRenderTests {
    @test
    public render() {
        // Arrange
        const majorVersion = 0x04;
        const minorVersion = 0x00;
        const flags = 0xE0;
        const testData = ByteVector.concatenate(
            Footer.fileIdentifier,
            majorVersion,
            minorVersion,
            flags,
            TestConstants.syncedUintBytes
        );
        const footer = new Footer(testData);

        // Act
        const output = footer.render();

        // Assert
        assert.isTrue(ByteVector.equal(output, testData));
    }
}
