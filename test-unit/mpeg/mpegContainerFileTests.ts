import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import MpegContainerFile from "../../src/mpeg/mpegContainerFile";
import MpegContainerFileSettings from "../../src/mpeg/mpegContainerFileSettings";
import {default as TestFile} from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {ReadStyle} from "../../src/file";
import {TagTypes} from "../../src/tag";

@suite class MpegContainer_MpegContainerFileTests {
    @test
    public constructor_noDefaultsPreferred() {
        // Arrange
        const originalDefaults = MpegContainerFileSettings.defaultTagTypes;
        try {
            const testAbstraction = TestFile.getFileAbstraction(ByteVector.fromSize(100));

            // Act
            MpegContainerFileSettings.defaultTagTypes = TagTypes.None;
            const file = new MpegContainerFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.isEmpty(file.tag.tags);
            assert.strictEqual(file.tagTypes, TagTypes.None);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);
            assert.isUndefined(file.properties);

        } finally {
            // Cleanup
            MpegContainerFileSettings.defaultTagTypes = originalDefaults;
        }
    }

    @test
    public constructor_defaultTagsAtEnd() {
        // Arrange
        const originalDefaults = MpegContainerFileSettings.defaultTagTypes;
        try {
            const testAbstraction = TestFile.getFileAbstraction(ByteVector.fromSize(100));

            // Act
            MpegContainerFileSettings.defaultTagTypes = TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape;
            const file = new MpegContainerFile(testAbstraction, ReadStyle.None);

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
            MpegContainerFileSettings.defaultTagTypes = originalDefaults;
        }
    }
}
