import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import AacFile from "../../src/aac/aacFile";
import AacFileSettings from "../../src/aac/aacFileSettings";
import {default as TestFile} from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {ReadStyle} from "../../src/file";
import {TagTypes} from "../../src/tag";

@suite class Aac_AacFileTests {
    @test
    public constructor_noDefaultsPreferred() {
        // Arrange
        const originalDefaults = AacFileSettings.defaultTagTypes;
        try {
            const testAbstraction = TestFile.getFileAbstraction(ByteVector.fromSize(100));

            // Act
            AacFileSettings.defaultTagTypes = TagTypes.None;
            const file = new AacFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.isEmpty(file.tag.tags);
            assert.strictEqual(file.tagTypes, TagTypes.None);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);
            assert.isUndefined(file.properties);

        } finally {
            // Cleanup
            AacFileSettings.defaultTagTypes = originalDefaults;
        }
    }

    @test
    public constructor_defaultTagsAtBeginning() {
        // Arrange
        const originalDefaults = AacFileSettings.defaultTagTypes;
        const originalApeLocation = AacFileSettings.preferApeTagAtFileEnd;
        const originalId3v2Location = AacFileSettings.preferId3v2TagAtFileEnd;
        try {
            const testAbstraction = TestFile.getFileAbstraction(ByteVector.fromSize(100));

            // Act
            AacFileSettings.defaultTagTypes = TagTypes.Id3v2 | TagTypes.Ape;
            AacFileSettings.preferApeTagAtFileEnd = false;
            AacFileSettings.preferId3v2TagAtFileEnd = false;
            const file = new AacFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.strictEqual(file.tag.tags.length, 2);
            assert.strictEqual(file.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);

            assert.strictEqual(file.tag.startTag.tags.length, 2);
            assert.strictEqual(file.tag.startTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
            assert.strictEqual(file.tag.endTag.tags.length, 0);
            assert.strictEqual(file.tag.endTag.tagTypes, TagTypes.None)

            assert.isUndefined(file.properties);

        } finally {
            // Cleanup
            AacFileSettings.defaultTagTypes = originalDefaults;
            AacFileSettings.preferApeTagAtFileEnd = originalApeLocation;
            AacFileSettings.preferId3v2TagAtFileEnd = originalId3v2Location;
        }
    }

    @test
    public constructor_defaultTagsAtEnd() {
        // Arrange
        const originalDefaults = AacFileSettings.defaultTagTypes;
        const originalApeLocation = AacFileSettings.preferApeTagAtFileEnd;
        const originalId3v2Location = AacFileSettings.preferId3v2TagAtFileEnd;
        try {
            const testAbstraction = TestFile.getFileAbstraction(ByteVector.fromSize(100));

            // Act
            AacFileSettings.defaultTagTypes = TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape;
            AacFileSettings.preferApeTagAtFileEnd = true;
            AacFileSettings.preferId3v2TagAtFileEnd = true;
            const file = new AacFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.strictEqual(file.tag.tags.length, 3);
            assert.strictEqual(file.tagTypes, TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);

            assert.strictEqual(file.tag.startTag.tags.length, 0);
            assert.strictEqual(file.tag.startTag.tagTypes, TagTypes.None);
            assert.strictEqual(file.tag.endTag.tags.length, 3);
            assert.strictEqual(file.tag.endTag.tagTypes, TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape);

            assert.isUndefined(file.properties);

        } finally {
            // Cleanup
            AacFileSettings.defaultTagTypes = originalDefaults;
            AacFileSettings.preferApeTagAtFileEnd = originalApeLocation;
            AacFileSettings.preferId3v2TagAtFileEnd = originalId3v2Location;
        }
    }
}
