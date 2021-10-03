import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import ApeTag from "../src/ape/apeTag";
import CombinedTag from "../src/combinedTag";
import Id3v2Tag from "../src/id3v2/id3v2Tag";
import {Tag, TagTypes} from "../src/tag";
import {TagTesters} from "./utilities/testers";

@suite class CombinedTagTests {
    @test
    public constructor_noTags() {
        // Arrange
        const tagTypes = TagTypes.DivX | TagTypes.Xiph;

        // Act
        const tag = new TestCombinedTag(tagTypes, undefined);

        // Assert
        assert.isOk(tag);
        assert.isOk(tag.tags);
        assert.isEmpty(tag.tags);
        assert.strictEqual(tag.supportedTagTypes, tagTypes);
        assert.strictEqual(tag.tagTypes, TagTypes.None);
        assert.strictEqual(tag.sizeOnDisk, 0);
        assert.isTrue(tag.isEmpty);

        TagTesters.testTagProperties(tag, {});
    }

    @test
    public constructor_hasTags() {
        // Arrange
        const tagTypes = TagTypes.DivX | TagTypes.Xiph;
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.title = "fuxbuxquxx";
        const tags = [ id3v2Tag, apeTag ];

        // Act
        const tag = new TestCombinedTag(tagTypes, tags);

        // Assert
        assert.isOk(tag);
        assert.sameMembers(tag.tags, tags);
        assert.notEqual(tag.tags, tags);

        assert.strictEqual(tag.supportedTagTypes, tagTypes);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.strictEqual(tag.sizeOnDisk, id3v2Tag.sizeOnDisk + apeTag.sizeOnDisk);
        assert.isFalse(tag.isEmpty);

        TagTesters.testTagProperties(tag, {
            album: "foobarbaz",
            title: "fuxbuxquxx"
        });
    }

    @test
    public constructor_hasNestedCombinedTags() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.title = "fuxbuxquxx";
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, [id3v2Tag]);

        // Act
        const rootTag = new TestCombinedTag(TagTypes.AllTags, [nestedTag, apeTag]);

        // Assert
        assert.isOk(rootTag);
        assert.sameMembers(rootTag.tags, [apeTag, id3v2Tag]);
        assert.strictEqual(rootTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.strictEqual(rootTag.sizeOnDisk, id3v2Tag.sizeOnDisk + apeTag.sizeOnDisk);
        assert.isFalse(rootTag.isEmpty);

        TagTesters.testTagProperties(rootTag, {
            album: "foobarbaz",
            title: "fuxbuxquxx"
        });
    }

    @test
    public clear_clearsAllTags() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.title = "fuxbuxquxx";
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, [id3v2Tag]);
        const rootTag = new TestCombinedTag(TagTypes.AllTags, [nestedTag, apeTag]);

        // Act
        rootTag.clear();

        // Assert
        assert.isTrue(rootTag.isEmpty);
        assert.sameMembers(rootTag.tags, [id3v2Tag, apeTag]);
        assert.isTrue(id3v2Tag.isEmpty);
        assert.isTrue(apeTag.isEmpty);
    }

    @test
    public getFirstValue_valueExistsOnBoth() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.album = "fuxbuxquxx";
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, tags);

        // Act
        const album = tag.album;

        // Assert
        assert.strictEqual(album, apeTag.album);
    }

    @test
    public getFirstValue_valueExistsOnOne() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, tags);

        // Act
        const album = tag.album;

        // Assert
        assert.strictEqual(album, id3v2Tag.album);
    }

    @test
    public getFirstValue_valueExistsOnNeither() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        const apeTag = ApeTag.fromEmpty();
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, tags);

        // Act
        const album = tag.album;
        const track = tag.trackCount;

        // Assert
        assert.strictEqual(album, undefined);
        assert.strictEqual(track, 0);
    }

    @test
    public getFirstArray_valueExistsOnBoth() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.performers = ["foo", "bar", "baz"];
        const apeTag = ApeTag.fromEmpty();
        apeTag.performers = ["fux", "bux", "quxx"];
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, tags);

        // Act
        const performers = tag.performers;

        // Assert
        assert.sameMembers(performers, apeTag.performers);
    }

    @test
    public getFirstArray_valueExistsOnOne() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.performers = ["foo", "bar", "baz"];
        const apeTag = ApeTag.fromEmpty();
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, tags);

        // Act
        const performers = tag.performers;

        // Assert
        assert.sameMembers(performers, id3v2Tag.performers);
    }

    @test
    public getFirstArray_valueExistsOnNeither() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        const apeTag = ApeTag.fromEmpty();
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, tags);

        // Act
        const performers = tag.performers;

        // Assert
        assert.isOk(performers);
        assert.isEmpty(performers);
    }

    @test
    public getTag_tagDoesNotExist() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, [id3Tag]);
        const apeTag = ApeTag.fromEmpty();
        const rootTag = new TestCombinedTag(TagTypes.AllTags, [nestedTag, apeTag]);

        // Act
        const output = rootTag.getTag(TagTypes.Xiph);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public getTag_tagExistsAtRootLevel() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, [id3Tag]);
        const apeTag = ApeTag.fromEmpty();
        const rootTag = new TestCombinedTag(TagTypes.AllTags, [nestedTag, apeTag]);

        // Act
        const output = rootTag.getTag(TagTypes.Ape);

        // Assert
        assert.strictEqual(output, apeTag);
    }

    @test
    public getTag_tagExistsInNestedTag() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, [id3Tag]);
        const apeTag = ApeTag.fromEmpty();
        const rootTag = new TestCombinedTag(TagTypes.AllTags, [nestedTag, apeTag]);

        // Act
        const output = rootTag.getTag(TagTypes.Id3v2);

        // Assert
        assert.strictEqual(output, id3Tag);
    }

    @test
    public removeTags_flatList_tagDoesNotExist() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const apeTag = ApeTag.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.AllTags, [id3Tag, apeTag]);

        // Act
        tag.removeTags(TagTypes.Xiph);

        // Assert
        assert.sameMembers(tag.tags, [id3Tag, apeTag]);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.strictEqual(tag.sizeOnDisk, id3Tag.sizeOnDisk + apeTag.sizeOnDisk);
    }

    @test
    public removeTags_flatList_tagExists() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const apeTag = ApeTag.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.AllTags, [id3Tag, apeTag]);

        // Act
        tag.removeTags(TagTypes.Ape);

        // Assert
        assert.sameMembers(tag.tags, [id3Tag]);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2);
        assert.strictEqual(tag.sizeOnDisk, id3Tag.sizeOnDisk);
    }

    @test
    public removeTags_flatList_allTags() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const apeTag = ApeTag.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.AllTags, [id3Tag, apeTag]);

        // Act
        tag.removeTags(TagTypes.AllTags);

        // Assert
        assert.isEmpty(tag.tags);
        assert.strictEqual(tag.tagTypes, TagTypes.None);
        assert.strictEqual(tag.sizeOnDisk, 0);
    }

    @test
    public removeTags_nestedList_tagDoesNotExist() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, [id3Tag]);
        const apeTag = ApeTag.fromEmpty();
        const rootTag = new TestCombinedTag(TagTypes.AllTags, [nestedTag, apeTag]);

        // Act
        rootTag.removeTags(TagTypes.Xiph);

        // Assert
        assert.sameMembers(rootTag.tags, [id3Tag, apeTag]);
        assert.strictEqual(rootTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.strictEqual(rootTag.sizeOnDisk, id3Tag.sizeOnDisk + apeTag.sizeOnDisk);

        assert.sameMembers(nestedTag.tags, [id3Tag]);
        assert.strictEqual(nestedTag.tagTypes, TagTypes.Id3v2);
        assert.strictEqual(nestedTag.sizeOnDisk, id3Tag.sizeOnDisk);
    }

    @test
    public removeTags_nestedList_tagExists() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, [id3Tag]);
        const apeTag = ApeTag.fromEmpty();
        const rootTag = new TestCombinedTag(TagTypes.AllTags, [nestedTag, apeTag]);

        // Act
        rootTag.removeTags(TagTypes.Id3v2);

        // Assert
        assert.sameMembers(rootTag.tags, [apeTag]);
        assert.strictEqual(rootTag.tagTypes, TagTypes.Ape);
        assert.strictEqual(rootTag.sizeOnDisk, apeTag.sizeOnDisk);

        assert.isEmpty(nestedTag.tags);
        assert.strictEqual(nestedTag.tagTypes, TagTypes.None);
        assert.strictEqual(nestedTag.sizeOnDisk, 0);
    }

    @test
    public removeTags_nestedList_allTags() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, [id3Tag]);
        const apeTag = ApeTag.fromEmpty();
        const rootTag = new TestCombinedTag(TagTypes.AllTags, [nestedTag, apeTag]);

        // Act
        rootTag.removeTags(TagTypes.AllTags);

        // Assert
        assert.isEmpty(rootTag.tags);
        assert.strictEqual(rootTag.tagTypes, TagTypes.None);
        assert.strictEqual(rootTag.sizeOnDisk, 0);

        assert.isEmpty(nestedTag.tags);
        assert.strictEqual(rootTag.tagTypes, TagTypes.None);
        assert.strictEqual(rootTag.sizeOnDisk, 0);
    }

    @test
    public setAllValues() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.album = "fuxbuxquxx";
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, tags);

        // Act
        tag.album = "something";

        // Assert
        assert.strictEqual(tag.album, "something");
        assert.strictEqual(id3v2Tag.album, "something");
        assert.strictEqual(apeTag.album, "something");
    }

    @test
    public setAllUint() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.track = 123;
        const apeTag = ApeTag.fromEmpty();
        apeTag.track = 234;
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, tags);

        // Act
        tag.track = 888;

        // Assert
        assert.strictEqual(tag.track, 888);
        assert.strictEqual(id3v2Tag.track, 888);
        assert.strictEqual(apeTag.track, 888);
    }

    @test
    public setAllArray() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.performers = ["foo", "bar", "baz"];
        const apeTag = ApeTag.fromEmpty();
        apeTag.performers = ["fux", "bux", "quxx"];
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, tags);

        // Act
        tag.performers = ["some", "thing"];

        // Assert
        assert.sameMembers(tag.performers, ["some", "thing"]);
        assert.sameMembers(id3v2Tag.performers, ["some", "thing"]);
        assert.sameMembers(apeTag.performers, ["some", "thing"]);
    }

    @test
    public protected_addTag() {
        // Arrange
        const tag = new TestCombinedTag(TagTypes.AllTags, []);
        const newTag = Id3v2Tag.fromEmpty();

        // Act
        tag.testAddTag(newTag);

        // Assert
        assert.sameMembers(tag.tags, [newTag]);
        assert.strictEqual(tag.tagTypes,  TagTypes.Id3v2);
        assert.strictEqual(tag.sizeOnDisk, newTag.sizeOnDisk);
    }

    @test
    public protected_validateTagCreation_notSupported() {
        // Arrange
        const tag = new TestCombinedTag(TagTypes.Ape | TagTypes.Id3v2, []);

        // Act / Assert
        assert.throws(() => tag.testValidateTagCreation(TagTypes.Xiph));
    }

    @test
    public protected_validateTagCreation_alreadyExists() {
        // Arrange
        const apeTag = ApeTag.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.Ape | TagTypes.Id3v2, [apeTag]);

        // Act / Assert
        assert.throws(() => tag.testValidateTagCreation(TagTypes.Ape));
    }

    @test
    public protected_validateTagCreation_success() {
        // Arrange
        const tag = new TestCombinedTag(TagTypes.Ape | TagTypes.Id3v2, []);

        // Act / Assert
        assert.doesNotThrow(() => tag.testValidateTagCreation(TagTypes.Ape));
    }
}

class TestCombinedTag extends CombinedTag {
    public constructor(supportedTagTypes: TagTypes, tags?: Tag[]) {
        super(supportedTagTypes, tags);
    }

    public createTag(tagType: TagTypes, copy: boolean): Tag {
        return undefined;
    }

    public testAddTag(tag: Tag): void {
        this.addTag(tag);
    }

    public testValidateTagCreation(tagTypes: TagTypes) {
        this.validateTagCreation(tagTypes);
    }
}
