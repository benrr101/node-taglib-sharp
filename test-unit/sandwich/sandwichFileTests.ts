import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import ApeTag from "../../src/ape/apeTag";
import EndTag from "../../src/sandwich/endTag";
import Id3v1Tag from "../../src/id3v1/id3v1Tag";
import Id3v2Tag from "../../src/id3v2/id3v2Tag";
import Properties from "../../src/properties";
import SandwichFile from "../../src/sandwich/sandwichFile";
import StartTag from "../../src/sandwich/startTag";
import {default as TestFile} from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {IFileAbstraction} from "../../src/fileAbstraction";
import {FileAccessMode, ReadStyle} from "../../src/file";
import {TagTypes} from "../../src/tag";
import {Testers} from "../utilities/testers";

@suite class Sandwich_FileTests {
    private readonly testMapping = new Map<TagTypes, () => boolean>();

    @test
    public constructor_invalidParams() {
        // Act / Assert
        Testers.testTruthy<string | IFileAbstraction>((v) => new TestSandwichFile(
            v,
            ReadStyle.None,
            this.testMapping,
            TagTypes.None
        ));
    }

    @test
    public constructor_noTags_noDefaults() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act
        const file = new TestSandwichFile(testAbstraction, ReadStyle.PictureLazy, this.testMapping, TagTypes.None);

        // Assert
        assert.strictEqual(file.mode, FileAccessMode.Closed);
        assert.isOk(file.endTag);
        assert.isEmpty(file.endTag.tags);
        assert.isOk(file.startTag);
        assert.isEmpty(file.startTag.tags);
        assert.strictEqual(file.mediaEndPosition, 100);
        assert.strictEqual(file.mediaStartPosition, 0);
        assert.isOk(file.tag);
        assert.isEmpty(file.tag.tags);
        assert.isOk(file.properties);
        assert.strictEqual(file.usedReadStyle, ReadStyle.PictureLazy);
        assert.strictEqual(file.properties, TestSandwichFile.properties);
    }

    @test
    public constructor_hasTags_noDefaults() {
        // Arrange
        const id3v1Tag = Id3v1Tag.fromEmpty();
        id3v1Tag.title = "baz";
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foo";
        const apeTag = ApeTag.fromEmpty();
        apeTag.amazonId = "bar";
        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100),
            id3v1Tag.render()
        );
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act
        const file = new TestSandwichFile(testAbstraction, ReadStyle.PictureLazy, this.testMapping, TagTypes.None);

        // Assert
        assert.strictEqual(file.mode, FileAccessMode.Closed);
        assert.isOk(file.startTag);
        assert.strictEqual(file.startTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.isOk(file.endTag);
        assert.strictEqual(file.endTag.tagTypes, TagTypes.Id3v1);
        assert.strictEqual(file.mediaEndPosition, id3v2Tag.sizeOnDisk + apeTag.sizeOnDisk + 100);
        assert.strictEqual(file.mediaStartPosition, id3v2Tag.sizeOnDisk + apeTag.sizeOnDisk);
        assert.isOk(file.tag);
        assert.strictEqual(file.tag.tagTypes, TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape);
        assert.strictEqual(file.usedReadStyle, ReadStyle.PictureLazy);
        assert.strictEqual(file.properties, TestSandwichFile.properties);
    }

    @test
    public constructor_noTags_createsDefaults() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>([
            [TagTypes.Ape, () => true],
            [TagTypes.Id3v2, () => true]
        ]);

        // Act
        const file = new TestSandwichFile(testAbstraction, ReadStyle.Average, testMapping, TagTypes.AllTags);

        // Assert
        assert.strictEqual(file.mode, FileAccessMode.Closed);
        assert.isOk(file.endTag);
        assert.strictEqual(file.endTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.isOk(file.startTag);
        assert.strictEqual(file.startTag.tagTypes, TagTypes.None);
        assert.strictEqual(file.mediaEndPosition, 100);
        assert.strictEqual(file.mediaStartPosition, 0);
        assert.isOk(file.tag);
        assert.strictEqual(file.tag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.strictEqual(file.usedReadStyle, ReadStyle.Average);
        assert.strictEqual(file.properties, TestSandwichFile.properties);
    }

    @test
    public constructor_hasTags_skipsDefaults() {
        // Arrange
        const id3v1Tag = Id3v1Tag.fromEmpty();
        id3v1Tag.title = "baz";
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foo";
        const apeTag = ApeTag.fromEmpty();
        apeTag.amazonId = "bar";
        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100),
            id3v1Tag.render()
        );
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>([
            [TagTypes.Ape, () => true],
            [TagTypes.Id3v2, () => true]
        ]);

        // Act
        const file = new TestSandwichFile(testAbstraction, ReadStyle.PictureLazy, testMapping, TagTypes.AllTags);

        // Assert
        assert.strictEqual(file.mode, FileAccessMode.Closed);
        assert.isOk(file.startTag);
        assert.strictEqual(file.startTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.isOk(file.endTag);
        assert.strictEqual(file.endTag.tagTypes, TagTypes.Id3v1);
        assert.strictEqual(file.mediaEndPosition, id3v2Tag.sizeOnDisk + apeTag.sizeOnDisk + 100);
        assert.strictEqual(file.mediaStartPosition, id3v2Tag.sizeOnDisk + apeTag.sizeOnDisk);
        assert.isOk(file.tag);
        assert.strictEqual(file.tag.tagTypes, TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape);
        assert.strictEqual(file.usedReadStyle, ReadStyle.PictureLazy);
        assert.strictEqual(file.properties, TestSandwichFile.properties);
    }

    @test
    public getTag_tagExists() {
        // Arrange
        const id3v1Tag = Id3v1Tag.fromEmpty();
        id3v1Tag.title = "baz";
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foo";
        const apeTag = ApeTag.fromEmpty();
        apeTag.amazonId = "bar";
        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100),
            id3v1Tag.render()
        );
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);
        const file = new TestSandwichFile(testAbstraction, ReadStyle.PictureLazy, this.testMapping, TagTypes.None);

        // Act
        const tag = file.getTag(TagTypes.Id3v1, true);

        // Assert
        assert.isOk(tag);
        assert.instanceOf<Id3v1Tag>(<Id3v1Tag> tag, Id3v1Tag);
    }

    @test
    public getTag_tagDoesNotExist_create() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>([[TagTypes.Id3v1, () => true]]);
        const file = new TestSandwichFile(testAbstraction, ReadStyle.None, testMapping, TagTypes.None);

        // Act
        const tag = file.getTag(TagTypes.Id3v1, true);

        // Assert
        assert.isOk(tag);
        assert.instanceOf<Id3v1Tag>(<Id3v1Tag> tag, Id3v1Tag);
        assert.strictEqual(file.tag.tagTypes, TagTypes.Id3v1);
        assert.strictEqual(file.tag.tags.length, 1);
        assert.strictEqual(file.endTag.tagTypes, TagTypes.Id3v1);
        assert.strictEqual(file.endTag.tags.length, 1);
        assert.strictEqual(file.startTag.tagTypes, TagTypes.None);
        assert.strictEqual(file.startTag.tags.length, 0);
    }

    @test
    public getTag_tagDoesNotExist_doNotCreate() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>([[TagTypes.Id3v1, () => true]]);
        const file = new TestSandwichFile(testAbstraction, ReadStyle.None, testMapping, TagTypes.None);

        // Act
        const tag = file.getTag(TagTypes.Id3v1, false);

        // Assert
        assert.isUndefined(tag);
        assert.strictEqual(file.tag.tagTypes, TagTypes.None);
        assert.isEmpty(file.tag.tags);
        assert.strictEqual(file.endTag.tagTypes, TagTypes.None);
        assert.isEmpty(file.endTag.tags);
        assert.strictEqual(file.startTag.tagTypes, TagTypes.None);
        assert.isEmpty(file.startTag.tags);
    }

    @test
    public removeTag_tagExists() {
        // Arrange
        const id3v1Tag = Id3v1Tag.fromEmpty();
        id3v1Tag.title = "baz";
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foo";
        const apeTag = ApeTag.fromEmpty();
        apeTag.amazonId = "bar";
        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100),
            id3v1Tag.render()
        );
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);
        const file = new TestSandwichFile(testAbstraction, ReadStyle.PictureLazy, this.testMapping, TagTypes.None);

        // Act
        file.removeTags(TagTypes.Id3v2 | TagTypes.Ape);

        // Assert
        assert.strictEqual(file.tag.tags.length, 1);
        assert.strictEqual(file.tag.tagTypes, TagTypes.Id3v1);
        assert.strictEqual(file.startTag.tagTypes, TagTypes.None);
        assert.strictEqual(file.startTag.tags.length, 0);
        assert.strictEqual(file.endTag.tagTypes, TagTypes.Id3v1);
        assert.strictEqual(file.endTag.tags.length, 1);
    }

    @test
    public removeTag_tagDoesNotExists() {
        // Arrange
        const id3v1Tag = Id3v1Tag.fromEmpty();
        id3v1Tag.title = "baz";
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foo";
        const apeTag = ApeTag.fromEmpty();
        apeTag.amazonId = "bar";
        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100),
            id3v1Tag.render()
        );
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);
        const file = new TestSandwichFile(testAbstraction, ReadStyle.PictureLazy, this.testMapping, TagTypes.None);

        // Act
        file.removeTags(TagTypes.DivX);

        // Assert
        assert.strictEqual(file.tag.tags.length, 3);
        assert.strictEqual(file.tag.tagTypes, TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape);
        assert.strictEqual(file.startTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.strictEqual(file.startTag.tags.length, 2);
        assert.strictEqual(file.endTag.tagTypes, TagTypes.Id3v1);
        assert.strictEqual(file.endTag.tags.length, 1);
    }

    @test
    public save_noTags() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes.toByteVector());
        const file = new TestSandwichFile(testAbstraction, ReadStyle.None, this.testMapping, TagTypes.None);

        // Act
        file.save();

        // Assert
        Testers.bvEqual(testAbstraction.allBytes, fileBytes);
        assert.strictEqual(file.mode, FileAccessMode.Closed);
        assert.strictEqual(file.mediaStartPosition, 0);
        assert.strictEqual(file.mediaEndPosition, 100);

        assert.strictEqual(file.tagTypes, TagTypes.None);
        assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);
    }

    @test
    public save_noTags_addTags() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>([
            [TagTypes.Ape, () => false],
            [TagTypes.Id3v2, () => true]
        ]);
        const file = new TestSandwichFile(testAbstraction, ReadStyle.None, testMapping, TagTypes.None);

        const startTag = file.getTag(TagTypes.Ape, true);
        startTag.album = "foo";
        const endTag = file.getTag(TagTypes.Id3v2, true);
        endTag.title = "bar";

        // Act
        file.save();

        // Assert
        const expectedBytes = ByteVector.concatenate(
            (<ApeTag> startTag).render(),
            ByteVector.fromSize(100),
            (<Id3v2Tag> endTag).render()
        );
        Testers.bvEqual(testAbstraction.allBytes, expectedBytes);
        assert.strictEqual(file.mode, FileAccessMode.Closed);
        assert.strictEqual(file.mediaStartPosition, startTag.sizeOnDisk);
        assert.strictEqual(file.mediaEndPosition, startTag.sizeOnDisk + fileBytes.length);

        assert.strictEqual(file.tagTypes, TagTypes.Ape | TagTypes.Id3v2);
        assert.strictEqual(file.tagTypesOnDisk, TagTypes.Ape | TagTypes.Id3v2);
    }

    @test
    public save_hasTags_noChanges() {
        // Arrange
        const id3v1Tag = Id3v1Tag.fromEmpty();
        id3v1Tag.title = "baz";
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foo";
        const apeTag = ApeTag.fromEmpty();
        apeTag.amazonId = "bar";
        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100),
            id3v1Tag.render()
        );
        const testAbstraction = TestFile.getFileAbstraction(fileBytes.toByteVector());
        const file = new TestSandwichFile(testAbstraction, ReadStyle.PictureLazy, this.testMapping, TagTypes.None);

        // Act
        file.save();

        // Assert
        Testers.bvEqual(testAbstraction.allBytes, fileBytes);
        assert.strictEqual(file.mode, FileAccessMode.Closed);
        assert.strictEqual(file.mediaStartPosition, id3v2Tag.sizeOnDisk + apeTag.sizeOnDisk);
        assert.strictEqual(file.mediaEndPosition, id3v2Tag.sizeOnDisk + apeTag.sizeOnDisk + 100);

        assert.strictEqual(file.tagTypes, TagTypes.Ape | TagTypes.Id3v1 | TagTypes.Id3v2);
        assert.strictEqual(file.tagTypesOnDisk, TagTypes.Ape | TagTypes.Id3v1 | TagTypes.Id3v2);
    }

    @test
    public save_hasTags_addTags() {
        // Arrange
        let id3v1Tag = Id3v1Tag.fromEmpty();
        id3v1Tag.title = "bar";
        let id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foo";
        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            ByteVector.fromSize(100),
            id3v1Tag.render()
        );
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>([[TagTypes.Ape, () => false]]);
        const file = new TestSandwichFile(testAbstraction, ReadStyle.None, testMapping, TagTypes.None);

        id3v1Tag = <Id3v1Tag> file.getTag(TagTypes.Id3v1, false);
        id3v1Tag.title = "bux";
        id3v2Tag = <Id3v2Tag> file.getTag(TagTypes.Id3v2, false);
        id3v2Tag.album = "fux";
        const newTag = file.getTag(TagTypes.Ape, true);
        newTag.copyright = "baz";

        // Act
        file.save();

        // Assert
        const expectedBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            (<ApeTag> newTag).render(),
            ByteVector.fromSize(100),
            id3v1Tag.render()
        );
        Testers.bvEqual(testAbstraction.allBytes, expectedBytes);
        assert.strictEqual(file.mode, FileAccessMode.Closed);
        assert.strictEqual(file.mediaEndPosition, id3v2Tag.sizeOnDisk + newTag.sizeOnDisk + 100);
        assert.strictEqual(file.mediaStartPosition, id3v2Tag.sizeOnDisk + newTag.sizeOnDisk);

        assert.strictEqual(file.tagTypes, TagTypes.Ape | TagTypes.Id3v1 | TagTypes.Id3v2);
        assert.strictEqual(file.tagTypesOnDisk, TagTypes.Ape | TagTypes.Id3v1 | TagTypes.Id3v2);
    }

    @test
    public save_hasTags_removeTags() {
        // Arrange
        const id3v1Tag = Id3v1Tag.fromEmpty();
        id3v1Tag.title = "baz";
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foo";
        const apeTag = ApeTag.fromEmpty();
        apeTag.copyright = "baz";
        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100),
            id3v1Tag.render()
        );
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);
        const file = new TestSandwichFile(testAbstraction, ReadStyle.None, this.testMapping, TagTypes.None);

        file.removeTags(TagTypes.Ape);

        // Act
        file.save();

        // Assert
        const expectedBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            ByteVector.fromSize(100),
            id3v1Tag.render()
        );
        Testers.bvEqual(testAbstraction.allBytes, expectedBytes);
        assert.strictEqual(file.mode, FileAccessMode.Closed);
        assert.strictEqual(file.mediaEndPosition, id3v2Tag.sizeOnDisk + 100);
        assert.strictEqual(file.mediaStartPosition, id3v2Tag.sizeOnDisk);

        assert.strictEqual(file.tagTypes, TagTypes.Id3v1 | TagTypes.Id3v2);
        assert.strictEqual(file.tagTypesOnDisk, TagTypes.Id3v1 | TagTypes.Id3v2);
    }
}

class TestSandwichFile extends SandwichFile {
    public static readonly properties = new Properties(0, []);
    public usedReadStyle: ReadStyle;

    public constructor(
        fileToRead: IFileAbstraction | string,
        readStyle: ReadStyle,
        defaultTagMappingTable: Map<TagTypes, () => boolean>,
        defaultTags: TagTypes
    ) {
        super(fileToRead, readStyle, defaultTagMappingTable, defaultTags);
    }

    public get endTag(): EndTag { return super.endTag; }

    public get startTag(): StartTag { return super.startTag; }

    public readProperties(readStyle: ReadStyle): Properties {
        this.usedReadStyle = readStyle;
        return TestSandwichFile.properties;
    }
}
