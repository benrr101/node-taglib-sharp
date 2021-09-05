import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import MpegAudioFile from "../../src/mpeg/mpegAudioFile";
import MpegAudioFileSettings from "../../src/mpeg/mpegAudioFileSettings";
import {default as TestFile} from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {ReadStyle} from "../../src/file";
import {TagTypes} from "../../src/tag";

@suite class Aac_AacFileTests {
    @test
    public constructor_noDefaultsPreferred() {
        // Arrange
        const originalDefaults = MpegAudioFileSettings.defaultTagTypes;
        try {
            const testAbstraction = TestFile.getFileAbstraction(ByteVector.fromSize(100));

            // Act
            MpegAudioFileSettings.defaultTagTypes = TagTypes.None;
            const file = new MpegAudioFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.isEmpty(file.tag.tags);
            assert.strictEqual(file.tagTypes, TagTypes.None);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);
            assert.isUndefined(file.properties);

        } finally {
            // Cleanup
            MpegAudioFileSettings.defaultTagTypes = originalDefaults;
        }
    }

    @test
    public constructor_defaultTagsAtBeginning() {
        // Arrange
        const originalDefaults = MpegAudioFileSettings.defaultTagTypes;
        const originalApeLocation = MpegAudioFileSettings.preferApeTagAtFileEnd;
        const originalId3v2Location = MpegAudioFileSettings.preferId3v2TagAtFileEnd;
        try {
            const testAbstraction = TestFile.getFileAbstraction(ByteVector.fromSize(100));

            // Act
            MpegAudioFileSettings.defaultTagTypes = TagTypes.Id3v2 | TagTypes.Ape;
            MpegAudioFileSettings.preferApeTagAtFileEnd = false;
            MpegAudioFileSettings.preferId3v2TagAtFileEnd = false;
            const file = new MpegAudioFile(testAbstraction, ReadStyle.None);

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
            MpegAudioFileSettings.defaultTagTypes = originalDefaults;
            MpegAudioFileSettings.preferApeTagAtFileEnd = originalApeLocation;
            MpegAudioFileSettings.preferId3v2TagAtFileEnd = originalId3v2Location;
        }
    }

    @test
    public constructor_defaultTagsAtEnd() {
        // Arrange
        const originalDefaults = MpegAudioFileSettings.defaultTagTypes;
        const originalApeLocation = MpegAudioFileSettings.preferApeTagAtFileEnd;
        const originalId3v2Location = MpegAudioFileSettings.preferId3v2TagAtFileEnd;
        try {
            const testAbstraction = TestFile.getFileAbstraction(ByteVector.fromSize(100));

            // Act
            MpegAudioFileSettings.defaultTagTypes = TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape;
            MpegAudioFileSettings.preferApeTagAtFileEnd = true;
            MpegAudioFileSettings.preferId3v2TagAtFileEnd = true;
            const file = new MpegAudioFile(testAbstraction, ReadStyle.None);

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
            MpegAudioFileSettings.defaultTagTypes = originalDefaults;
            MpegAudioFileSettings.preferApeTagAtFileEnd = originalApeLocation;
            MpegAudioFileSettings.preferId3v2TagAtFileEnd = originalId3v2Location;
        }
    }
}
