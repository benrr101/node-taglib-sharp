import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import TestConstants from "../testConstants";
import TagFooter from "../../src/id3v2/tagFooter";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import {ByteVector} from "../../src/byteVector";
import {Id3v2Version, TagFlags} from "../../src/id3v2/enums";
import {Testers} from "../utilities/testers";

const getTestFooter = (majorVersion: Id3v2Version, minorVersion: number, flags: TagFlags): TagFooter => {
    const data = ByteVector.concatenate(
        TagFooter.FILE_IDENTIFIER, // File identifier
        majorVersion,              // Major version
        minorVersion,              // Minor version
        flags,                     // Flags
        0x10, 0x10, 0x10, 0x10     // Size in bytes (unsync'd)
    );
    return TagFooter.fromData(data);
};

@suite class Id3v2_TagFooter_ConstructorTests {
    @test
    public fromData_falsyData() {
        // Act/Assert
        Testers.testTruthy((v: ByteVector) => TagFooter.fromData(v));
    }

    @test
    public fromData_tooSmall() {
        // Arrange
        const data = ByteVector.fromSize(1);

        // Act/Assert
        assert.throws(() => TagFooter.fromData(data));
    }

    @test
    public fromData_missingIdentifier() {
        // Arrange
        const data = ByteVector.fromSize(10);

        // Act/Assert
        assert.throws(() => TagFooter.fromData(data));
    }

    @params(1, "too_low")
    @params(5, "too_high")
    public fromData_invalidMajorVersion(version: number) {
        // Arrange
        const data = ByteVector.concatenate(
            TagFooter.FILE_IDENTIFIER, // File identifier
            version,                   // Major version (out of range)
            0x00,                      // Minor version
            0x00,                      // Flags
            0x10, 0x10, 0x10, 0x10     // Size in bytes (sync'd)
        );

        // Act/Assert
        assert.throws(() => TagFooter.fromData(data));
    }

    @test
    public fromData_invalidFlags_version4() {
        // Arrange
        const data = ByteVector.concatenate(
            TagFooter.FILE_IDENTIFIER, // File identifier
            0x04,                      // Major version
            0x00,                      // Minor version
            0x07,                      // Flags (invalid for v4)
            0x10, 0x10, 0x10, 0x10     // Size in bytes (sync'd)
        );

        // Act/Assert
        assert.throws(() => TagFooter.fromData(data));
    }

    @test
    public fromData_invalidTagSizeBytes() {
        // Arrange
        const testData = ByteVector.concatenate(
            TagFooter.FILE_IDENTIFIER, // File identifier
            0x04,                      // Major version
            0x00,                      // Minor version
            0x00                       // Flags
        );
        const testData1 = ByteVector.concatenate(testData, 0x80, 0x00, 0x00, 0x00);
        const testData2 = ByteVector.concatenate(testData, 0x00, 0x80, 0x00, 0x00);
        const testData3 = ByteVector.concatenate(testData, 0x00, 0x00, 0x80, 0x00);
        const testData4 = ByteVector.concatenate(testData, 0x00, 0x00, 0x00, 0x80);

        // Act/Assert
        assert.throws(() => TagFooter.fromData(testData1));
        assert.throws(() => TagFooter.fromData(testData2));
        assert.throws(() => TagFooter.fromData(testData3));
        assert.throws(() => TagFooter.fromData(testData4));
    }

    @test
    public fromData_validParams() {
        // Arrange
        const minorVersion = 0x00;
        const flags = 0xE0;
        const testData = ByteVector.concatenate(
            TagFooter.FILE_IDENTIFIER,      // File identifier
            Id3v2Version.V24,               // Major version
            0x01,                           // Minor version
            TagFlags.ExperimentalIndicator, // Flags
            0x10, 0x10, 0x10, 0x10          // Size in bytes
        );

        // Act
        const output = TagFooter.fromData(testData);

        // Assert
        assert.equal(output.flags, TagFlags.ExperimentalIndicator);
        assert.equal(output.majorVersion, Id3v2Version.V24);
        assert.equal(output.revisionNumber, 1);
        assert.equal(output.tagSize, 0x2040810);
    }
}

@suite class Id3v2_TagFooter_PropertyTests {
    @test
    public getCompleteTagSize() {
        // Arrange
        const footer = getTestFooter(Id3v2Version.V24, 0, TagFlags.None);

        // Act
        const output = footer.completeTagSize;

        // Assert
        assert.equal(output, footer.tagSize + Id3v2Settings.headerSize + Id3v2Settings.footerSize);
    }

    @test
    public setFlags_validFlags() {
        // Arrange
        const footer = getTestFooter(Id3v2Version.V24, 0, TagFlags.None);

        // Act
        footer.flags = TagFlags.FooterPresent;

        // Assert
        assert.equal(footer.flags, TagFlags.FooterPresent);
    }

    @test
    public getMajorVersion() {
        // Arrange
        const footer = getTestFooter(Id3v2Version.V24, 0, TagFlags.None);

        // Act
        const output = footer.majorVersion;

        // Assert
        assert.equal(output, Id3v2Version.V24);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    public setMajorVersion_invalidValues(version: Id3v2Version) {
        // Arrange
        const footer = getTestFooter(Id3v2Version.V24, 0, TagFlags.None);

        // Act/Assert
        assert.throws(() => { footer.majorVersion = version; });
    }

    @test
    public setRevisionNumber_invalidValue() {
        // Arrange
        const footer = getTestFooter(Id3v2Version.V24, 0, TagFlags.None);

        // Act/Assert
        Testers.testByte((v: number) => { footer.revisionNumber = v; });
    }

    @test
    public setRevisionNumber_validValue() {
        // Arrange
        const footer = getTestFooter(Id3v2Version.V24, 0, TagFlags.None);

        // Act
        footer.revisionNumber = 2;

        // Assert
        assert.equal(footer.revisionNumber, 2);
    }

    @test
    public setTagSize_invalidValues() {
        // Arrange
        const footer = getTestFooter(Id3v2Version.V24, 0, TagFlags.None);

        // Act/Assert
        assert.throws(() => { footer.tagSize = -1; });
        assert.throws(() => { footer.tagSize = 1.25; });
        assert.throws(() => { footer.tagSize = 0xF0000000; });
    }

    @test
    public publicsetTagSize_validValue() {
        // Arrange
        const footer = getTestFooter(Id3v2Version.V24, 0, TagFlags.None);

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
        const testData = ByteVector.concatenate(
            TagFooter.FILE_IDENTIFIER,
            Id3v2Version.V24,
            0x00,
            0xE0,
            TestConstants.syncedUintBytes
        );
        const footer = TagFooter.fromData(testData);

        // Act
        const output = footer.render();

        // Assert
        Testers.bvEqual(output, testData);
    }
}
