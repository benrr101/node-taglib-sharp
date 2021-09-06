import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import ApeTag from "../../src/ape/apeTag";
import Id3v1Tag from "../../src/id3v1/id3v1Tag";
import Id3v2Tag from "../../src/id3v2/id3v2Tag";
import SandwichTag from "../../src/sandwich/sandwichTag";
import {default as TestFile} from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {File, ReadStyle} from "../../src/file";
import {Id3v2TagHeaderFlags} from "../../src/id3v2/id3v2TagHeader";
import {TagTypes} from "../../src/tag";
import {TagTesters, Testers} from "../utilities/testers";

@suite class Sandwich_TagTests {
    @test
    public constructor_invalidParameters() {
        // Arrange
        const testFile = TestFile.getFile(ByteVector.empty());
        const testMapping = new Map<TagTypes, () => boolean>();

        // Act/Assert
        Testers.testTruthy((v: File) => new SandwichTag(v, ReadStyle.None, testMapping));
        Testers.testTruthy((v: Map<TagTypes, () => boolean>) => new SandwichTag(testFile, ReadStyle.None, v));
    }

    @test
    public constructor_tagsAtStart() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foo";
        const apeTag = ApeTag.fromEmpty();
        apeTag.amazonId = "bar";
        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100)
        );
        const file = TestFile.getFile(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>();

        // Act
        const tag = new SandwichTag(file, ReadStyle.None, testMapping);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tags.length, 2);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.isOk(tag.startTag);
        assert.strictEqual(tag.startTag.tags.length, 2);
        assert.strictEqual(tag.startTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.isOk(tag.endTag);
        assert.isEmpty(tag.endTag.tags);
        assert.strictEqual(tag.endTag.tagTypes, TagTypes.None);

        TagTesters.testTagProperties(tag, {
            album: "foo",
            amazonId: "bar"
        });
    }

    @test
    public constructor_tagsAtEnd() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.version = 4;
        id3v2Tag.flags |= Id3v2TagHeaderFlags.FooterPresent;
        id3v2Tag.album = "foo";
        const apeTag = ApeTag.fromEmpty();
        apeTag.amazonId = "bar";
        const fileBytes = ByteVector.concatenate(
            ByteVector.fromSize(100),
            id3v2Tag.render(),
            apeTag.render(),
        );
        const file = TestFile.getFile(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>();

        // Act
        const tag = new SandwichTag(file, ReadStyle.None, testMapping);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tags.length, 2);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.isOk(tag.endTag);
        assert.strictEqual(tag.endTag.tags.length, 2);
        assert.strictEqual(tag.endTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.isOk(tag.startTag);
        assert.isEmpty(tag.startTag.tags);
        assert.strictEqual(tag.startTag.tagTypes, TagTypes.None);

        TagTesters.testTagProperties(tag, {
            album: "foo",
            amazonId: "bar"
        });
    }

    @test
    public constructor_tagsAtStartEnd() {
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
        const file = TestFile.getFile(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>();

        // Act
        const tag = new SandwichTag(file, ReadStyle.None, testMapping);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tags.length, 3);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape | TagTypes.Id3v1);
        assert.isOk(tag.startTag);
        assert.strictEqual(tag.startTag.tags.length, 2);
        assert.strictEqual(tag.startTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.isOk(tag.endTag);
        assert.strictEqual(tag.endTag.tags.length, 1);
        assert.strictEqual(tag.endTag.tagTypes, TagTypes.Id3v1);

        TagTesters.testTagProperties(tag, {
            album: "foo",
            amazonId: "bar",
            title: "baz"
        });
    }

    @test
    public constructor_noTags() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>();

        // Act
        const tag = new SandwichTag(file, ReadStyle.None, testMapping);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tags.length, 0);
        assert.strictEqual(tag.tagTypes, TagTypes.None);
        assert.isOk(tag.startTag);
        assert.isEmpty(tag.startTag.tags);
        assert.strictEqual(tag.startTag.tagTypes, TagTypes.None);
        assert.isOk(tag.endTag);
        assert.isEmpty(tag.endTag.tags);
        assert.strictEqual(tag.endTag.tagTypes, TagTypes.None);

        TagTesters.testTagProperties(tag, {});
    }

    @test
    public createTag_notSupported() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>();
        const tag = new SandwichTag(file, ReadStyle.None, testMapping);

        // Act / Assert
        assert.throws(() => tag.createTag(TagTypes.DivX, false));
    }

    @test
    public createTag_alreadyExistsOnSameSideOfFile() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        const apeTag = ApeTag.fromEmpty();
        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100)
        );

        const file = TestFile.getFile(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>([
            [TagTypes.Ape, () => false]
        ]);
        const tag = new SandwichTag(file, ReadStyle.None, testMapping);

        // Act / Assert
        assert.throws(() => tag.createTag(TagTypes.Ape, false));
    }

    @test
    public createTag_alreadyExistsOnOppositeSideOfFile() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        const apeTag = ApeTag.fromEmpty();
        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100)
        );

        const file = TestFile.getFile(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>([
            [TagTypes.Ape, () => true]
        ]);
        const tag = new SandwichTag(file, ReadStyle.None, testMapping);

        // Act / Assert
        assert.throws(() => tag.createTag(TagTypes.Ape, false));
    }

    @test
    public createTag_mapToStart() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>([
            [TagTypes.Ape, () => false]
        ]);
        const tag = new SandwichTag(file, ReadStyle.None, testMapping);

        // Act
        const newTag = tag.createTag(TagTypes.Ape, false);

        // Assert
        assert.isOk(newTag);
        assert.isTrue(newTag.isEmpty);

        assert.sameMembers(tag.tags, [newTag]);
        assert.strictEqual(tag.tagTypes, TagTypes.Ape);

        assert.sameMembers(tag.startTag.tags, [newTag]);
        assert.strictEqual(tag.startTag.tagTypes, TagTypes.Ape);

        assert.isEmpty(tag.endTag.tags);
        assert.strictEqual(tag.endTag.tagTypes, TagTypes.None);
    }

    @test
    public createTag_mapToEnd() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>([
            [TagTypes.Ape, () => true]
        ]);
        const tag = new SandwichTag(file, ReadStyle.None, testMapping);

        // Act
        const newTag = tag.createTag(TagTypes.Ape, false);

        // Assert
        assert.isOk(newTag);
        assert.isTrue(newTag.isEmpty);

        assert.sameMembers(tag.tags, [newTag]);
        assert.strictEqual(tag.tagTypes, TagTypes.Ape);

        assert.isEmpty(tag.startTag.tags);
        assert.strictEqual(tag.startTag.tagTypes, TagTypes.None);

        assert.sameMembers(tag.endTag.tags, [newTag]);
        assert.strictEqual(tag.endTag.tagTypes, TagTypes.Ape);
    }

    @test
    public createTag_copy() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foo";
        const apeTag = ApeTag.fromEmpty();
        apeTag.amazonId = "bar";
        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100)
        );

        const file = TestFile.getFile(fileBytes);
        const testMapping = new Map<TagTypes, () => boolean>([
            [TagTypes.Id3v1, () => true]
        ]);
        const tag = new SandwichTag(file, ReadStyle.None, testMapping);

        // Act
        const newTag = tag.createTag(TagTypes.Id3v1, true);

        // Assert
        assert.isOk(newTag);
        assert.isFalse(newTag.isEmpty);

        assert.strictEqual(tag.tags.length, 3);
        assert.includeMembers(tag.tags, [newTag]);
        assert.strictEqual(tag.tagTypes, TagTypes.Ape | TagTypes.Id3v2 | TagTypes.Id3v1);

        assert.strictEqual(tag.startTag.tags.length, 2);
        assert.strictEqual(tag.startTag.tagTypes, TagTypes.Ape | TagTypes.Id3v2);

        assert.sameMembers(tag.endTag.tags, [newTag]);
        assert.strictEqual(tag.endTag.tagTypes, TagTypes.Id3v1);
    }
}
