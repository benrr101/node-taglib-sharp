import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import ApeFile from "../../src/ape/apeFile";
import ApeFileSettings from "../../src/ape/apeFileSettings";
import {default as TestFile} from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {ReadStyle} from "../../src/file";
import {TagTypes} from "../../src/tag";

@suite class Ape_ApeFileTests {
    @test
    public constructor_noDefaultsPreferred() {
        // Arrange
        const originalDefaults = ApeFileSettings.defaultTagTypes;
        try {
            const testAbstraction = TestFile.getFileAbstraction(ByteVector.fromSize(100));

            // Act
            ApeFileSettings.defaultTagTypes = TagTypes.None;
            const file = new ApeFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.isEmpty(file.tag.tags);
            assert.strictEqual(file.tagTypes, TagTypes.None);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);
            assert.isUndefined(file.properties);

        } finally {
            // Cleanup
            ApeFileSettings.defaultTagTypes = originalDefaults;
        }
    }

    @test
    public constructor_defaultTagsAtBeginning() {
        // Arrange
        const originalDefaults = ApeFileSettings.defaultTagTypes;
        const originalApeLocation = ApeFileSettings.preferApeTagAtFileEnd;
        const originalId3v2Location = ApeFileSettings.preferId3v2TagAtFileEnd;
        try {
            const testAbstraction = TestFile.getFileAbstraction(ByteVector.fromSize(100));

            // Act
            ApeFileSettings.defaultTagTypes = TagTypes.Id3v2 | TagTypes.Ape;
            ApeFileSettings.preferApeTagAtFileEnd = false;
            ApeFileSettings.preferId3v2TagAtFileEnd = false;
            const file = new ApeFile(testAbstraction, ReadStyle.None);

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
            ApeFileSettings.defaultTagTypes = originalDefaults;
            ApeFileSettings.preferApeTagAtFileEnd = originalApeLocation;
            ApeFileSettings.preferId3v2TagAtFileEnd = originalId3v2Location;
        }
    }

    @test
    public constructor_defaultTagsAtEnd() {
        // Arrange
        const originalDefaults = ApeFileSettings.defaultTagTypes;
        const originalApeLocation = ApeFileSettings.preferApeTagAtFileEnd;
        const originalId3v2Location = ApeFileSettings.preferId3v2TagAtFileEnd;
        try {
            const testAbstraction = TestFile.getFileAbstraction(ByteVector.fromSize(100));

            // Act
            ApeFileSettings.defaultTagTypes = TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape;
            ApeFileSettings.preferApeTagAtFileEnd = true;
            ApeFileSettings.preferId3v2TagAtFileEnd = true;
            const file = new ApeFile(testAbstraction, ReadStyle.None);

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
            ApeFileSettings.defaultTagTypes = originalDefaults;
            ApeFileSettings.preferApeTagAtFileEnd = originalApeLocation;
            ApeFileSettings.preferId3v2TagAtFileEnd = originalId3v2Location;
        }
    }
}
