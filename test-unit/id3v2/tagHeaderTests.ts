import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import TagHeader from "../../src/id3v2/tagHeader";
import {ByteVector} from "../../src/byteVector";
import {Id3v2Version, TagFlags} from "../../src/id3v2/enums";
import {Testers} from "../utilities/testers";
import {NumberUtils} from "../../src/utils";

const getTestHeader = (majorVersion: Id3v2Version, minorVersion: number, flags: TagFlags): TagHeader => {
    const data = ByteVector.concatenate(
        TagHeader.FILE_IDENTIFIER, // File identifier
        majorVersion,              // Major version
        minorVersion,              // Minor version
        flags,                     // Flags
        0x10, 0x10, 0x10, 0x10     // Size in bytes (unsync'd)
    );
    return TagHeader.fromData(data);
};

@suite class Id3v2_TagHeader_ConstructorTests {
    @test
    public fromData_falsyData() {
        // Act/Assert
        Testers.testTruthy((v: ByteVector) => TagHeader.fromData(v));
    }

    @test
    public fromData_tooSmall() {
        // Arrange
        const data0 = ByteVector.empty();
        const data1 = ByteVector.fromSize(1);

        // Act/Assert
        assert.throws(() => TagHeader.fromData(data0));
        assert.throws(() => TagHeader.fromData(data1));
    }

    @test
    public fromData_missingIdentifier() {
        // Arrange
        const data = ByteVector.fromSize(10);

        // Act/Assert
        assert.throws(() => TagHeader.fromData(data));
    }

    @params(1, "too_low")
    @params(5, "too_high")
    public fromData_invalidMajorVersion(version: number) {
        // Arrange
        const data = ByteVector.concatenate(
            TagHeader.FILE_IDENTIFIER, // File identifier
            version,                   // Major version (out of range)
            0x00,                      // Minor version
            0x00,                      // Flags
            0x10, 0x10, 0x10, 0x10     // Size in bytes (sync'd)
        );

        // Act/Assert
        assert.throws(() => TagHeader.fromData(data));
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromData_invalidFlags(version: Id3v2Version) {
        // Arrange
        const testData = ByteVector.concatenate(
            TagHeader.FILE_IDENTIFIER, // File identifier
            version,                   // Major version
            0x00,                      // Minor version
            0xFF,                      // Flags (invalid)
            0x10, 0x10, 0x10, 0x10     // Size in bytes (sync'd)
        );

        // Act/Assert
        assert.throws(() => TagHeader.fromData(testData));
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromData_invalidTagSizeBytes(version: Id3v2Version) {
        // Arrange
        const testData = ByteVector.concatenate(
            TagHeader.FILE_IDENTIFIER, // File identifier
            version,                   // Major version
            0x00,                      // Minor version
            0x00                       // Flags
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

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromData_validData(version: Id3v2Version) {
        // Arrange
        const testData = ByteVector.concatenate(
            TagHeader.FILE_IDENTIFIER,      // File identifier
            version,                        // Major version
            0x01,                           // Minor version
            TagFlags.None,                  // Flags
            0x10, 0x10, 0x10, 0x10          // Size in bytes (sync'd)
        );

        // Act
        const output = TagHeader.fromData(testData);

        // Assert
        assert.equal(output.flags, TagFlags.None);
        assert.equal(output.majorVersion, version);
        assert.equal(output.revisionNumber, 0x01);
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
    public getCompleteTagSize_v4_withFooter() {
        // Arrange
        const header = getTestHeader(Id3v2Version.V24, 0, TagFlags.FooterPresent);

        // Act
        const totalSize = header.completeTagSize;

        // Assert
        assert.equal(totalSize, header.tagSize + Id3v2Settings.headerSize + Id3v2Settings.footerSize);
    }

    @test
    public getCompleteTagSize_v4_noFooter() {
        // Arrange
        const header = getTestHeader(Id3v2Version.V24, 0, TagFlags.None);

        // Act
        const totalSize = header.completeTagSize;

        // Assert
        assert.equal(totalSize, header.tagSize + Id3v2Settings.headerSize);
    }

    @params(TagFlags.ExtendedHeader, "ExtendedHeader")
    @params(TagFlags.ExperimentalIndicator, "ExperimentalIndicator")
    @params(TagFlags.FooterPresent, "FooterPresent")
    public setFlags_v2_invalidFlags(flags: TagFlags) {
        // Arrange
        const header = getTestHeader(Id3v2Version.V22, 0, TagFlags.None);

        // Act / Assert
        assert.throws(() => { header.flags = flags });
    }

    @test
    public setFlags_v3_invalidFlags() {
        // Arrange
        const header = getTestHeader(3, 0, TagFlags.None);

        // Act / Assert
        assert.throws(() => { header.flags = TagFlags.FooterPresent });
    }

    @test
    public setFlags_validFlags() {
        // Arrange
        const header = getTestHeader(Id3v2Version.V24, 0, TagFlags.None);

        // Act
        header.flags = TagFlags.FooterPresent;

        // Assert
        assert.equal(header.flags, TagFlags.FooterPresent);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public getMajorVersion(version: Id3v2Version) {
        // Arrange
        const header = getTestHeader(version, 0, TagFlags.None);

        // Act
        const output = header.majorVersion;

        // Assert
        assert.equal(output, version);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public getMajorVersion_forcedDefault(version: Id3v2Version) {
        // Arrange
        const header = getTestHeader(version, 0, TagFlags.None);

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
    public setMajorVersion_v2_unsets3And4Flags() {
        // Arrange
        const flags = TagFlags.ExtendedHeader |
            TagFlags.ExperimentalIndicator |
            TagFlags.FooterPresent;
        const header = getTestHeader(Id3v2Version.V24, 0, flags);

        // Act
        header.majorVersion = 2;

        // Assert
        assert.equal(header.majorVersion, 2);
        assert.isFalse(NumberUtils.hasFlag(header.flags, flags));
    }

    @test
    public setMajorVersion_v3_unsets4Flags() {
        // Arrange
        const flags = TagFlags.FooterPresent;
        const header = getTestHeader(Id3v2Version.V24, 0, flags);

        // Act
        header.majorVersion = 3;

        // Assert
        assert.equal(header.majorVersion, 3);
        assert.isFalse(NumberUtils.hasFlag(header.flags, flags));
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public setRevisionNumber_invalidValue(version: Id3v2Version) {
        // Arrange
        const header = getTestHeader(version, 0, TagFlags.None);

        // Act/Assert
        Testers.testByte((v: number) => { header.revisionNumber = v; });
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public setRevisionNumber_validValue(version: Id3v2Version) {
        // Arrange
        const header = getTestHeader(version, 0, TagFlags.None);

        // Act
        header.revisionNumber = 2;

        // Assert
        assert.equal(header.revisionNumber, 2);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public setTagSize_invalidValues(version: Id3v2Version) {
        // Arrange
        const header = getTestHeader(version, 0, TagFlags.None);

        // Act/Assert
        Testers.testUint((v: number) => { header.tagSize = v; });
        assert.throws(() => { header.tagSize = 0xF0000000; });
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public setTagSize_validValue(version: Id3v2Version) {
        // Arrange
        const header = getTestHeader(version, 0, TagFlags.None);

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
        const testData = ByteVector.concatenate(
            TagHeader.FILE_IDENTIFIER,
            Id3v2Version.V24,
            0x00,
            0xE0,
            0x10, 0x10, 0x10, 0x10
        );
        const header = TagHeader.fromData(testData);

        // Act
        const output = header.render();

        // Assert
        Testers.bvEqual(output, testData);
    }
}
