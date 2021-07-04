import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import TestConstants from "../testConstants";
import Id3v2TagFooter from "../../src/id3v2/id3v2TagFooter";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import {ByteVector} from "../../src/byteVector";
import {Id3v2TagHeaderFlags} from "../../src/id3v2/id3v2TagHeader";
import {Testers} from "../utilities/testers";

// Setup chai
const assert = Chai.assert;

const getTestFooter = (majorVersion: number, minorVersion: number, flags: Id3v2TagHeaderFlags): Id3v2TagFooter => {
    const data = ByteVector.concatenate(
        Id3v2TagFooter.fileIdentifier,
        majorVersion,
        minorVersion,
        flags,
        TestConstants.syncedUintBytes
    );
    return Id3v2TagFooter.fromData(data);
};

@suite class Id3v2_TagFooter_ConstructorTests {
    @test
    public fromData_falsyData() {
        // Act/Assert
        Testers.testTruthy((v: ByteVector) => { const _ = Id3v2TagFooter.fromData(v); });
    }

    @test
    public fromData_invalidDataLength() {
        // Arrange
        const data = ByteVector.fromSize(1);

        // Act/Assert
        assert.throws(() => { const _ = Id3v2TagFooter.fromData(data); });
    }

    @test
    public fromData_missingIdentifier() {
        // Arrange
        const data = ByteVector.fromSize(10);

        // Act/Assert
        assert.throws(() => { const _ = Id3v2TagFooter.fromData(data); });
    }

    @test
    public fromData_invalidFlags_version4() {
        // Arrange
        const data = ByteVector.concatenate(
            Id3v2TagFooter.fileIdentifier,
            0x04, 0x00, 0x07
        );

        // Act/Assert
        assert.throws(() => { const _ = Id3v2TagFooter.fromData(data); });
    }

    @test
    public fromData_invalidTagSizeBytes() {
        // Arrange
        const testData = ByteVector.concatenate(
            Id3v2TagFooter.fileIdentifier,
            0x04, 0x00, 0x00
        );
        const testData1 = ByteVector.concatenate(testData, 0x80, 0x00, 0x00, 0x00);
        const testData2 = ByteVector.concatenate(testData, 0x00, 0x80, 0x00, 0x00);
        const testData3 = ByteVector.concatenate(testData, 0x00, 0x00, 0x80, 0x00);
        const testData4 = ByteVector.concatenate(testData, 0x00, 0x00, 0x00, 0x80);

        // Act/Assert
        assert.throws(() => { const _ = Id3v2TagFooter.fromData(testData1); });
        assert.throws(() => { const _ = Id3v2TagFooter.fromData(testData2); });
        assert.throws(() => { const _ = Id3v2TagFooter.fromData(testData3); });
        assert.throws(() => { const _ = Id3v2TagFooter.fromData(testData4); });
    }

    @test
    public fromData_validParams() {
        // Arrange
        const majorVersion = 0x04;
        const minorVersion = 0x00;
        const flags = 0xE0;
        const testData = ByteVector.concatenate(
            Id3v2TagFooter.fileIdentifier,
            majorVersion,
            minorVersion,
            flags,
            TestConstants.syncedUintBytes
        );

        // Act
        const output = Id3v2TagFooter.fromData(testData);

        // Assert
        assert.equal(output.flags, flags);
        assert.equal(output.majorVersion, majorVersion);
        assert.equal(output.revisionNumber, minorVersion);
        assert.equal(output.tagSize, TestConstants.syncedUint);
    }
}

@suite class Id3v2_TagFooter_PropertyTests {
    @test
    public getCompleteTagSize() {
        // Arrange
        const footer = getTestFooter(4, 0, Id3v2TagHeaderFlags.None);

        // Act
        const output = footer.completeTagSize;

        // Assert
        assert.equal(output, footer.tagSize + Id3v2Settings.headerSize + Id3v2Settings.footerSize);
    }

    @test
    public setFlags_validFlags() {
        // Arrange
        const footer = getTestFooter(4, 0, Id3v2TagHeaderFlags.None);

        // Act
        footer.flags = Id3v2TagHeaderFlags.FooterPresent;

        // Assert
        assert.equal(footer.flags, Id3v2TagHeaderFlags.FooterPresent);
    }

    @test
    public getMajorVersion_zero() {
        // Arrange
        const footer = getTestFooter(0, 0, Id3v2TagHeaderFlags.None);

        // Act
        const output = footer.majorVersion;

        // Assert
        assert.equal(output, Id3v2Settings.defaultVersion);
    }

    @test
    public getMajorVersion_nonZero() {
        // Arrange
        const footer = getTestFooter(4, 0, Id3v2TagHeaderFlags.None);

        // Act
        const output = footer.majorVersion;

        // Assert
        assert.equal(output, 4);
    }

    @test
    public setMajorVersion_invalidValues() {
        // Arrange
        const footer = getTestFooter(4, 0, Id3v2TagHeaderFlags.None);

        // Act/Assert
        Testers.testByte((v: number) => { footer.majorVersion = v; });
        assert.throws(() => { footer.majorVersion = 1; });
        assert.throws(() => { footer.majorVersion = 5; });
    }

    @test
    public setRevisionNumber_invalidValue() {
        // Arrange
        const footer = getTestFooter(4, 0, Id3v2TagHeaderFlags.None);

        // Act/Assert
        Testers.testByte((v: number) => { footer.revisionNumber = v; });
    }

    @test
    public setRevisionNumber_validValue() {
        // Arrange
        const footer = getTestFooter(4, 0, Id3v2TagHeaderFlags.None);

        // Act
        footer.revisionNumber = 2;

        // Assert
        assert.equal(footer.revisionNumber, 2);
    }

    @test
    public setTagSize_invalidValues() {
        // Arrange
        const footer = getTestFooter(4, 0, Id3v2TagHeaderFlags.None);

        // Act/Assert
        assert.throws(() => { footer.tagSize = -1; });
        assert.throws(() => { footer.tagSize = 1.25; });
        assert.throws(() => { footer.tagSize = 0xF0000000; });
    }

    @test
    public publicsetTagSize_validValue() {
        // Arrange
        const footer = getTestFooter(4, 0, Id3v2TagHeaderFlags.None);

        // Act
        footer.tagSize = 0x1234;

        // Assert
        assert.equal(footer.tagSize, 0x1234);
    }
}

@suite class Id3v2_TagFooter_RenderTests {
    @test
    public render() {
        // Arrange
        const majorVersion = 0x04;
        const minorVersion = 0x00;
        const flags = 0xE0;
        const testData = ByteVector.concatenate(
            Id3v2TagFooter.fileIdentifier,
            majorVersion,
            minorVersion,
            flags,
            TestConstants.syncedUintBytes
        );
        const footer = Id3v2TagFooter.fromData(testData);

        // Act
        const output = footer.render();

        // Assert
        assert.isTrue(ByteVector.equal(output, testData));
    }
}
