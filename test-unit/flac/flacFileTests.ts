import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import ApeTag from "../../src/ape/apeTag";
import FlacFile from "../../src/flac/flacFile";
import FlacFileSettings from "../../src/flac/flacFileSettings";
import FlacStreamHeader from "../../src/flac/flacStreamHeader";
import FlacTag from "../../src/flac/flacTag";
import Id3v1Tag from "../../src/id3v1/id3v1Tag";
import Id3v2Tag from "../../src/id3v2/id3v2Tag";
import {default as TestFile} from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {FileAccessMode, ReadStyle} from "../../src/file";
import {IFileAbstraction} from "../../src/fileAbstraction";
import {Id3v2TagHeaderFlags} from "../../src/id3v2/id3v2TagHeader";
import {FlacBlock, FlacBlockType} from "../../src/flac/flacBlock";
import {TagTypes} from "../../src/tag";
import {Testers} from "../utilities/testers";
import XiphComment from "../../src/xiph/xiphComment";
import {Picture} from "../../src";
import XiphPicture from "../../src/xiph/xiphPicture";

@suite class Flac_File_ConstructorTests {
    @test
    public constructor_invalidParams() {
        // Act / Assert
        Testers.testTruthy<string | IFileAbstraction>((v) => new FlacFile(v, ReadStyle.None));
    }

    @test
    public constructor_doesNotHaveIdentifier() {
        // Arrange
        const testAbstraction = TestFile.getFileAbstraction(ByteVector.fromSize(100));

        // Act / Assert
        assert.throws(() => new FlacFile(testAbstraction, ReadStyle.None));
    }

    // TEST READING TAGS ///////////////////////////////////////////////////
    @test
    public constructor_hasTagsAtBeginning() {
        const originalDefaults = FlacFileSettings.defaultTagTypes;
        try {
            FlacFileSettings.defaultTagTypes = TagTypes.Id3v2 | TagTypes.Ape;

            // Arrange
            const id3v2Tag = this.getId3v2Tag(false);
            const apeTag = this.getApeTag();
            const tagBytes = ByteVector.concatenate(id3v2Tag.render(), apeTag.render());
            const fileBytes = ByteVector.concatenate(
                tagBytes,
                this.getBasicFile()
            );
            const testAbstraction = TestFile.getFileAbstraction(fileBytes);

            // Act
            const file = new FlacFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.strictEqual(file.mode, FileAccessMode.Closed);

            assert.strictEqual(file.mediaStartPosition, tagBytes.length);
            assert.strictEqual(file.mediaEndPosition, fileBytes.length);

            this.assertTags(file, TagTypes.Ape | TagTypes.Id3v2, TagTypes.None, false);
            this.assertApeTag(file);
            this.assertId3v2Tag(file);

            assert.strictEqual(file.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.Id3v2 | TagTypes.Ape);
        } finally {
            // Cleanup
            FlacFileSettings.defaultTagTypes = originalDefaults;
        }
    }

    @test
    public constructor_hasTagsAtEnd() {
        const originalDefaults = FlacFileSettings.defaultTagTypes;
        try {
            FlacFileSettings.defaultTagTypes = TagTypes.Id3v1 | TagTypes.Id3v1 | TagTypes.Ape;

            // Arrange
            const id3v2Tag = this.getId3v2Tag(true);
            const apeTag = this.getApeTag();
            const id3v1Tag = this.getId3v1Tag();
            const tagBytes = ByteVector.concatenate(id3v2Tag.render(), apeTag.render(), id3v1Tag.render());
            const fileBytes = ByteVector.concatenate(
                this.getBasicFile(),
                tagBytes
            );
            const testAbstraction = TestFile.getFileAbstraction(fileBytes);

            // Act
            const file = new FlacFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.strictEqual(file.mode, FileAccessMode.Closed);

            assert.strictEqual(file.mediaStartPosition, 0);
            assert.strictEqual(file.mediaEndPosition, fileBytes.length - tagBytes.length);

            this.assertTags(file, TagTypes.None, TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape, false);
            this.assertApeTag(file);
            this.assertId3v1Tag(file);
            this.assertId3v2Tag(file);

            assert.strictEqual(file.tagTypes, TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape);
        } finally {
            // Cleanup
            FlacFileSettings.defaultTagTypes = originalDefaults;
        }
    }

    @test
    public constructor_hasXiphTag() {
        const originalDefaults = FlacFileSettings.defaultTagTypes;
        try {
            FlacFileSettings.defaultTagTypes = TagTypes.Xiph;

            // Arrange
            const xiphTag = this.getXiphTag();
            const xiphBlock = FlacBlock.fromData(FlacBlockType.XiphComment, xiphTag.render(false));
            const fileBytes = this.getBasicFile([xiphBlock]);
            const testAbstraction = TestFile.getFileAbstraction(fileBytes);

            // Act
            const file = new FlacFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.strictEqual(file.mode, FileAccessMode.Closed);

            assert.strictEqual(file.mediaStartPosition, 0);
            assert.strictEqual(file.mediaEndPosition, testAbstraction.allBytes.length);

            this.assertTags(file, TagTypes.None, TagTypes.None, true);
            this.assertXiphTag(file);

            assert.strictEqual(file.tagTypes, TagTypes.Xiph);
            assert.strictEqual(file.tagTypes, TagTypes.Xiph);
        } finally {
            FlacFileSettings.defaultTagTypes = originalDefaults;
        }
    }

    @test
    public constructor_hasMultipleXiphTags() {
        const originalDefaults = FlacFileSettings.defaultTagTypes;
        try {
            FlacFileSettings.defaultTagTypes = TagTypes.Xiph;

            // Arrange
            const xiphTag1 = XiphComment.fromEmpty();
            xiphTag1.album = "Ascend EP";
            const xiph1Block = FlacBlock.fromData(FlacBlockType.XiphComment, xiphTag1.render(false));

            const xiphTag2 = XiphComment.fromEmpty();
            xiphTag2.title = "Mobile";
            const xiph2Block = FlacBlock.fromData(FlacBlockType.XiphComment, xiphTag2.render(false));

            const fileBytes = this.getBasicFile([xiph1Block, xiph2Block]);
            const testAbstraction = TestFile.getFileAbstraction(fileBytes);

            // Act
            const file = new FlacFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.strictEqual(file.mode, FileAccessMode.Closed);

            assert.strictEqual(file.mediaStartPosition, 0);
            assert.strictEqual(file.mediaEndPosition, testAbstraction.allBytes.length);

            this.assertTags(file, TagTypes.None, TagTypes.None, true);
            const xiphTag = file.tag.xiphComment;
            assert.isOk(xiphTag);
            assert.strictEqual(xiphTag.album, "Ascend EP");
            assert.strictEqual(xiphTag.title, "Mobile");

            assert.strictEqual(file.tagTypes, TagTypes.Xiph);
            assert.strictEqual(file.tagTypes, TagTypes.Xiph);
        } finally {
            FlacFileSettings.defaultTagTypes = originalDefaults;
        }
    }

    @test
    public constructor_hasPictures() {
        const originalDefaults = FlacFileSettings.defaultTagTypes;
        try {
            FlacFileSettings.defaultTagTypes = TagTypes.None;

            // Arrange
            const extraBlocks = [
                this.getPictureBlock(),
                FlacBlock.fromData(FlacBlockType.Padding, ByteVector.fromSize(10)),
                this.getPictureBlock()
            ];

            const fileBytes = this.getBasicFile(extraBlocks);
            const testAbstraction = TestFile.getFileAbstraction(fileBytes);

            // Act
            const file = new FlacFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.strictEqual(file.mode, FileAccessMode.Closed);

            assert.strictEqual(file.mediaStartPosition, 0);
            assert.strictEqual(file.mediaEndPosition, testAbstraction.allBytes.length);

            this.assertTags(file, TagTypes.None, TagTypes.None, false);
            assert.strictEqual(file.tag.pictures.length, 2);

            assert.strictEqual(file.tagTypes, TagTypes.FlacPictures);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.FlacPictures);
        } finally {
            FlacFileSettings.defaultTagTypes = originalDefaults;
        }
    }

    @test
    public constructor_hasAllTheTags() {
        const originalDefaults = FlacFileSettings.defaultTagTypes;
        try {
            FlacFileSettings.defaultTagTypes = TagTypes.None;

            // Arrange
            const id3v2Tag = this.getId3v2Tag(false);
            const apeTag = this.getApeTag();
            const id3v1Tag = this.getId3v1Tag();
            const xiphTag = this.getXiphTag();
            const picBlock = this.getPictureBlock();
            const extraBlocks = [
                picBlock,
                FlacBlock.fromData(FlacBlockType.Padding, ByteVector.fromSize(10)),
                FlacBlock.fromData(FlacBlockType.XiphComment, xiphTag.render(false))
            ];

            const startTagBytes = ByteVector.concatenate(apeTag.render(), id3v2Tag.render());
            const endTagBytes = id3v1Tag.render();
            const fileBytes = ByteVector.concatenate(
                startTagBytes,
                this.getBasicFile(extraBlocks),
                endTagBytes
            );
            const testAbstraction = TestFile.getFileAbstraction(fileBytes);

            // Act
            const file = new FlacFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.strictEqual(file.mode, FileAccessMode.Closed);

            assert.strictEqual(file.mediaStartPosition, startTagBytes.length);
            assert.strictEqual(file.mediaEndPosition, fileBytes.length - endTagBytes.length);

            this.assertTags(file, TagTypes.Id3v2 | TagTypes.Ape, TagTypes.Id3v1, true);
            this.assertId3v1Tag(file);
            this.assertId3v2Tag(file);
            this.assertApeTag(file);
            this.assertXiphTag(file);
            assert.strictEqual(file.tag.pictures.length, 1);

            const expectedTags = TagTypes.FlacPictures | TagTypes.Xiph | TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape;
            assert.strictEqual(file.tagTypes, expectedTags);
            assert.strictEqual(file.tagTypesOnDisk, expectedTags);
        } finally {
            // Cleanup
            FlacFileSettings.defaultTagTypes = originalDefaults;
        }
    }

    // TEST READING PROPERTIES /////////////////////////////////////////////
    @test
    public constructor_averageRead_doesNotHaveStreamInfoBlock() {
        // Arrange
        const fileBytes = ByteVector.concatenate(
            ByteVector.fromString("fLaC"),
            ByteVector.fromSize(20, 0xFF)
        );
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act / Assert
        assert.throws(() => new FlacFile(testAbstraction, ReadStyle.Average));
    }

    @test
    public constructor_averageRead_hasStreamInfo() {
        // Arrange
        const fileBytes = this.getBasicFile();
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act
        const file = new FlacFile(testAbstraction, ReadStyle.Average);

        // Assert
        assert.isOk(file.properties);
        assert.isOk(file.properties.codecs);
        assert.isOk(file.properties.codecs[0]);
        assert.instanceOf(file.properties.codecs[0], FlacStreamHeader);
        assert.strictEqual((<FlacStreamHeader> file.properties.codecs[0]).bitsPerSample, 23);
        // We tested the complete reading in flac stream header tests
    }

    // ReadStyle.None is tested with tag tests

    // TEST DEFAULT TAGS ///////////////////////////////////////////////////
    @test
    public constructor_noTagsNoDefaultsPreferred() {
        // Arrange
        const originalDefaults = FlacFileSettings.defaultTagTypes;
        try {
            const testAbstraction = TestFile.getFileAbstraction(this.getBasicFile());

            // Act
            FlacFileSettings.defaultTagTypes = TagTypes.None;
            const file = new FlacFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.isEmpty(file.tag.tags);
            assert.strictEqual(file.tagTypes, TagTypes.None);
            assert.strictEqual(file.tagTypes, TagTypes.None);
            assert.isUndefined(file.properties);
        } finally {
            // Cleanup
            FlacFileSettings.defaultTagTypes = originalDefaults;
        }
    }

    @test
    public constructor_noTagsDefaultTagsAtBeginning() {
        // Arrange
        const originalDefaults = FlacFileSettings.defaultTagTypes;
        const originalApeLocation = FlacFileSettings.preferApeTagAtFileEnd;
        const originalId3v2Location = FlacFileSettings.preferId3v2TagAtFileEnd;
        try {
            const fileBytes = this.getBasicFile();
            const testAbstraction = TestFile.getFileAbstraction(fileBytes);

            // Act
            FlacFileSettings.defaultTagTypes = TagTypes.Id3v2 | TagTypes.Ape;
            FlacFileSettings.preferApeTagAtFileEnd = false;
            FlacFileSettings.preferId3v2TagAtFileEnd = false;
            const file = new FlacFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.strictEqual(file.tag.tags.length, 2);
            assert.strictEqual(file.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);

            assert.strictEqual(file.tag.startTag.tags.length, 2);
            assert.strictEqual(file.tag.startTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
            assert.strictEqual(file.tag.endTag.tags.length, 0);
            assert.strictEqual(file.tag.endTag.tagTypes, TagTypes.None);
            assert.isUndefined(file.tag.xiphComment);
            assert.isEmpty(file.tag.pictures);
        } finally {
            // Cleanup
            FlacFileSettings.defaultTagTypes = originalDefaults;
            FlacFileSettings.preferApeTagAtFileEnd = originalApeLocation;
            FlacFileSettings.preferId3v2TagAtFileEnd = originalId3v2Location;
        }
    }

    @test
    public constructor_noTagsDefaultTagsAtEnd() {
        // Arrange
        const originalDefaults = FlacFileSettings.defaultTagTypes;
        const originalApeLocation = FlacFileSettings.preferApeTagAtFileEnd;
        const originalId3v2Location = FlacFileSettings.preferId3v2TagAtFileEnd;
        try {
            const fileBytes = this.getBasicFile();
            const testAbstraction = TestFile.getFileAbstraction(fileBytes);

            // Act
            FlacFileSettings.defaultTagTypes = TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape;
            FlacFileSettings.preferApeTagAtFileEnd = true;
            FlacFileSettings.preferId3v2TagAtFileEnd = true;
            const file = new FlacFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.strictEqual(file.tag.tags.length, 3);
            assert.strictEqual(file.tagTypes, TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);

            assert.strictEqual(file.tag.startTag.tags.length, 0);
            assert.strictEqual(file.tag.startTag.tagTypes, TagTypes.None);
            assert.strictEqual(file.tag.endTag.tags.length, 3);
            assert.strictEqual(file.tag.endTag.tagTypes, TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape);
            assert.isUndefined(file.tag.xiphComment);
            assert.isEmpty(file.tag.pictures);
        } finally {
            // Cleanup
            FlacFileSettings.defaultTagTypes = originalDefaults;
            FlacFileSettings.preferApeTagAtFileEnd = originalApeLocation;
            FlacFileSettings.preferId3v2TagAtFileEnd = originalId3v2Location;
        }
    }

    @test
    public constructor_noTagsXiphDefault() {
        // Arrange
        const originalDefaults = FlacFileSettings.defaultTagTypes;
        try {
            const fileBytes = this.getBasicFile();
            const testAbstraction = TestFile.getFileAbstraction(fileBytes);

            // Act
            FlacFileSettings.defaultTagTypes = TagTypes.Xiph;
            const file = new FlacFile(testAbstraction, ReadStyle.None);

            // Assert
            assert.strictEqual(file.tag.tags.length, 1);
            assert.strictEqual(file.tagTypes, TagTypes.Xiph);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);

            assert.strictEqual(file.tag.startTag.tags.length, 0);
            assert.strictEqual(file.tag.endTag.tags.length, 0);
            assert.isOk(file.tag.xiphComment);
            assert.isEmpty(file.tag.pictures);
        } finally {
            // Cleanup
            FlacFileSettings.defaultTagTypes = originalDefaults;
        }
    }

    // GET TAGS ////////////////////////////////////////////////////////////
    @test
    public getTag_tagExists() {
        // Arrange
        const fileBytes = this.getCompleteFile();
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);
        const file = new FlacFile(testAbstraction, ReadStyle.None);

        // Act
        const output = file.getTag(TagTypes.Xiph, false);

        // Assert
        assert.strictEqual(output, file.tag.xiphComment);
    }

    @test
    public getTag_id3v1TagDoesNotExist() {
        this.getTagCreates(
            TagTypes.Id3v1,
            Id3v1Tag,
            () => false,
            () => { /* no op */ },
            true
        );
    }

    @test
    public getTag_id3v2TagDoesNotExistCreateAtFront() {
        this.getTagCreates(
            TagTypes.Id3v2,
            Id3v2Tag,
            () => FlacFileSettings.preferId3v2TagAtFileEnd,
            (v) => FlacFileSettings.preferId3v2TagAtFileEnd = v,
            false
        );
    }

    @test
    public getTag_id3v2TagDoesNotExistCreateAtEnd() {
        this.getTagCreates(
            TagTypes.Id3v2,
            Id3v2Tag,
            () => FlacFileSettings.preferId3v2TagAtFileEnd,
            (v) => FlacFileSettings.preferId3v2TagAtFileEnd = v,
            true
        );
    }

    @test
    public getTag_apeDoesNotExistCreateAtFront() {
        this.getTagCreates(
            TagTypes.Ape,
            ApeTag,
            () => FlacFileSettings.preferApeTagAtFileEnd,
            (v) => FlacFileSettings.preferApeTagAtFileEnd = v,
            false
        );
    }

    @test
    public getTag_apeDoesNotExistCreateAtEnd() {
        this.getTagCreates(
            TagTypes.Ape,
            ApeTag,
            () => FlacFileSettings.preferApeTagAtFileEnd,
            (v) => FlacFileSettings.preferApeTagAtFileEnd = v,
            true
        );
    }

    @test
    public getTag_xiphDoesNotExistCreates() {
        this.getTagCreates(
            TagTypes.Xiph,
            XiphComment,
            () => false,
            () => { /* no op */ },
            false
        );
    }

    @test
    public getTag_xiphDoesNotExistDoNotCreate() {
        const originalDefaultTags = FlacFileSettings.defaultTagTypes;
        try {
            FlacFileSettings.defaultTagTypes = TagTypes.None;

            const testAbstraction = TestFile.getFileAbstraction(this.getBasicFile());
            const file = new FlacFile(testAbstraction, ReadStyle.None);

            // Act
            const output = file.getTag(TagTypes.Xiph, false);

            // Assert
            assert.isUndefined(output);
            assert.isUndefined(file.tag.xiphComment);
        } finally {
            // Cleanup
            FlacFileSettings.defaultTagTypes = originalDefaultTags;
        }
    }

    private getTagCreates(
        tagType: TagTypes,
        // tslint:disable-next-line:ban-types It's the type that assert.instanceof uses
        instanceOf: Function,
        locationGetter: () => boolean,
        locationSetter: (v: boolean) => void,
        createAtEnd: boolean
    ) {
        // Arrange
        const originalDefaultTags = FlacFileSettings.defaultTagTypes;
        const originalLocation = locationGetter();
        try {
            FlacFileSettings.defaultTagTypes = TagTypes.None;
            locationSetter(createAtEnd);

            const testAbstraction = TestFile.getFileAbstraction(this.getBasicFile());
            const file = new FlacFile(testAbstraction, ReadStyle.None);

            // Act
            const output = file.getTag(tagType, true);

            // Assert
            assert.isOk(output);
            assert.instanceOf(output, instanceOf);
            assert.isTrue(output.isEmpty);

            if (tagType === TagTypes.Xiph) {
                assert.strictEqual(file.tag.xiphComment, output);
            } else if (createAtEnd) {
                assert.include(file.tag.endTag.tags, output);
            } else {
                assert.include(file.tag.startTag.tags, output);
            }
        } finally {
            // Cleanup
            FlacFileSettings.defaultTagTypes = originalDefaultTags;
            locationSetter(originalLocation);
        }
    }

    // REMOVE TAGS /////////////////////////////////////////////////////////
    @test
    public removeTags() {
        // Arrange
        const fileBytes = this.getCompleteFile();
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);
        const file = new FlacFile(testAbstraction, ReadStyle.None);
        const originalTagTypes = file.tagTypes;

        // Act
        file.removeTags(TagTypes.AllTags);

        // Assert
        assert.strictEqual(file.tagTypes, TagTypes.None);
        assert.strictEqual(file.tagTypesOnDisk, originalTagTypes);
    }

    // Helpers /////////////////////////////////////////////////////////////
    private assertTags(file: FlacFile, startTags: TagTypes, endTags: TagTypes, xiph: boolean) {
        assert.isOk(file.tag);
        assert.instanceOf(file.tag, FlacTag);
        assert.isOk(file.tag.startTag);
        assert.strictEqual(file.tag.startTag.tagTypes, startTags);
        assert.isOk(file.tag.endTag);
        assert.strictEqual(file.tag.endTag.tagTypes, endTags);

        if (xiph) {
            assert.isOk(file.tag.xiphComment);
        } else {
            assert.isUndefined(file.tag.xiphComment);
        }
    }

    private assertApeTag(file: FlacFile) {
        const apeTag = file.tag.tags.find((t) => t.tagTypes === TagTypes.Ape);
        assert.isOk(apeTag);
        assert.strictEqual(apeTag.album, "bar");
    }

    private assertId3v1Tag(file: FlacFile) {
        const id3v1Tag = file.tag.tags.find((t) => t.tagTypes === TagTypes.Id3v1);
        assert.isOk(id3v1Tag);
        assert.strictEqual(id3v1Tag.track, 123);
    }

    private assertId3v2Tag(file: FlacFile) {
        const id3v2Tag = file.tag.tags.find((t) => t.tagTypes === TagTypes.Id3v2);
        assert.isOk(id3v2Tag);
        assert.strictEqual(id3v2Tag.title, "foo");
    }

    private assertXiphTag(file: FlacFile) {
        const xiphTag = file.tag.xiphComment;
        assert.isOk(xiphTag);
        assert.strictEqual(xiphTag.amazonId, "foobarbaz");
    }

    private getApeTag(): ApeTag {
        const apeTag = ApeTag.fromEmpty();
        apeTag.album = "bar";
        return apeTag;
    }

    private getId3v2Tag(isAtEndOfFile: boolean): Id3v2Tag {
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.version = 4;
        if (isAtEndOfFile) {
            id3v2Tag.flags |= Id3v2TagHeaderFlags.FooterPresent;
        }
        id3v2Tag.title = "foo";
        return id3v2Tag;
    }

    private getId3v1Tag(): Id3v1Tag {
        const id3v1Tag = Id3v1Tag.fromEmpty();
        id3v1Tag.track = 123;
        return id3v1Tag;
    }

    private getPictureBlock(): FlacBlock {
        const picture = Picture.fromData(ByteVector.fromString("picturedata"));
        const flacPic = XiphPicture.fromPicture(picture);
        return FlacBlock.fromData(FlacBlockType.Picture, flacPic.renderForFlacBlock());
    }

    private getXiphTag(): XiphComment {
        const xiphTag = XiphComment.fromEmpty();
        xiphTag.amazonId = "foobarbaz";
        return xiphTag;
    }

    private getBasicFile(extraBlocks?: FlacBlock[]): ByteVector {
        const streamHeaderBytes = ByteVector.concatenate(
            ByteVector.fromUInt(0x12345678),
            ByteVector.fromUInt(0x23456789),
            ByteVector.fromUInt(0x34567890),
            ByteVector.fromUInt(0x45600000),
            ByteVector.fromUInt(0x00009012)
        );
        const streamHeaderBlock = FlacBlock.fromData(FlacBlockType.StreamInfo, streamHeaderBytes);

        return ByteVector.concatenate(
            ByteVector.fromString("fLaC"),
            streamHeaderBlock.render(!extraBlocks),
            ... (extraBlocks || []).map((b, i, a) => b.render(i === a.length - 1 )),
            ByteVector.fromSize(100)
        );
    }

    private getCompleteFile(): ByteVector {
        const id3v2Tag = this.getId3v2Tag(false);
        const apeTag = this.getApeTag();
        const id3v1Tag = this.getId3v1Tag();
        const xiphTag = this.getXiphTag();
        const picBlock = this.getPictureBlock();
        const extraBlocks = [
            picBlock,
            FlacBlock.fromData(FlacBlockType.Padding, ByteVector.fromSize(10)),
            FlacBlock.fromData(FlacBlockType.XiphComment, xiphTag.render(false))
        ];

        const startTagBytes = ByteVector.concatenate(apeTag.render(), id3v2Tag.render());
        const endTagBytes = id3v1Tag.render();
        return ByteVector.concatenate(
            startTagBytes,
            this.getBasicFile(extraBlocks),
            endTagBytes
        );
    }
}
