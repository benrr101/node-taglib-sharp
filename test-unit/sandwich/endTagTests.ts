import * as TypeMoq from "typemoq";
import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import ApeTag from "../../src/ape/apeTag";
import EndTag from "../../src/sandwich/endTag";
import Id3v1Tag from "../../src/id3v1/id3v1Tag";
import Id3v2Tag from "../../src/id3v2/id3v2Tag";
import {default as TestFile} from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {File, ReadStyle} from "../../src/file";
import {Id3v2TagHeaderFlags} from "../../src/id3v2/id3v2TagHeader";
import {TagTypes} from "../../src/tag";
import {TagTesters, Testers} from "../utilities/testers";
import {NumberUtils} from "../../src/utils";

@suite class Sandwich_EndTagTests {
    @test
    public constructor_invalidArguments() {
        // Act / Assert
        Testers.testTruthy((v: File) => new EndTag(v, ReadStyle.None));
    }

    @test
    public constructor_noTags() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);

        // Act
        const endTag = new EndTag(file, ReadStyle.Average);

        // Assert
        assert.isOk(endTag);
        assert.isEmpty(endTag.tags);
        assert.strictEqual(endTag.tagTypes, TagTypes.None);
        TagTesters.testTagProperties(endTag, {});
    }

    @test
    public constructor_tagsAtStart() {
        // Arrange
        const testTag = Id3v2Tag.fromEmpty();
        testTag.album = "foobarbaz";
        const fileBytes = ByteVector.concatenate(
            testTag.render(),
            ByteVector.fromSize(100)
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const endTag = new EndTag(file, ReadStyle.Average);

        // Assert
        assert.isOk(endTag);
        assert.isEmpty(endTag.tags);
        assert.strictEqual(endTag.tagTypes, TagTypes.None);
        TagTesters.testTagProperties(endTag, {});
    }

    @test
    public constructor_tagsAtEnd_tagsSmallerThanReadSize() {
        // Arrange
        const id3v1Tag = Id3v1Tag.fromEmpty();
        id3v1Tag.track = 123;
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.version = 4;
        id3v2Tag.flags |= Id3v2TagHeaderFlags.FooterPresent;
        id3v2Tag.album = "foo";
        const apeTag = ApeTag.fromEmpty();
        apeTag.title = "bar";

        const fileBytes = ByteVector.concatenate(
            ByteVector.fromSize(100),
            id3v2Tag.render(),
            apeTag.render(),
            id3v1Tag.render()
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const endTag = new EndTag(file, ReadStyle.Average);

        // Assert
        assert.isOk(endTag);
        assert.strictEqual(endTag.tags.length, 3);
        assert.strictEqual(endTag.tagTypes, TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape);
        TagTesters.testTagProperties(endTag, {
            album: "foo",
            title: "bar",
            track: 123
        });
    }

    @test
    public constructor_tagsAtEnd_tagsLargerThanReadSize() {
        // Arrange
        // Arrange
        const id3v1Tag = Id3v1Tag.fromEmpty();
        id3v1Tag.track = 123;
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.version = 4;
        id3v2Tag.flags |= Id3v2TagHeaderFlags.FooterPresent;
        id3v2Tag.album = "foobarbaz12345678901234567890";
        id3v2Tag.albumArtists = ["foo", "bar", "baz"];
        id3v2Tag.amazonId = "1234567890123456789012345678901234567890";
        id3v2Tag.copyright = "fuxbuxquxx123456789012345678901234567890";
        const apeTag = ApeTag.fromEmpty();
        apeTag.title = "bar";

        const fileBytes = ByteVector.concatenate(
            ByteVector.fromSize(100),
            apeTag.render(),
            id3v2Tag.render(),
            id3v1Tag.render()
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const endTag = new EndTag(file, ReadStyle.Average);

        // Assert
        assert.isOk(endTag);
        assert.strictEqual(endTag.tags.length, 3);
        assert.strictEqual(endTag.tagTypes, TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape);
        TagTesters.testTagProperties(endTag, {
            album: id3v2Tag.album,
            albumArtists: id3v2Tag.albumArtists,
            amazonId: id3v2Tag.amazonId,
            copyright: id3v2Tag.copyright,
            title: apeTag.title,
            track: id3v1Tag.track
        });
    }

    @test
    public constructor_generalExceptionThrownUp() {
        // Arrange
        const mockFile = TypeMoq.Mock.ofType<File>();
        mockFile.setup((f) => f.readBlock(TypeMoq.It.isAnyNumber())).throws(new Error());

        // Act / Assert
        assert.throws(() => new EndTag(mockFile.object, ReadStyle.None));
    }

    @test
    public createTag_unsupportedType() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);
        const tag = new EndTag(file, ReadStyle.None);

        // Act / Assert
        assert.throws(() => tag.createTag(TagTypes.DivX, false));
    }

    @test
    public createTag_alreadyExists() {
        // Arrange
        const id3v1Tag = Id3v1Tag.fromEmpty();
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.version = 4;
        id3v2Tag.flags |= Id3v2TagHeaderFlags.FooterPresent;
        const apeTag = ApeTag.fromEmpty();

        const fileBytes = ByteVector.concatenate(
            ByteVector.fromSize(100),
            id3v2Tag.render(),
            apeTag.render(),
            id3v1Tag.render()
        );
        const file = TestFile.getFile(fileBytes);
        const tag = new EndTag(file, ReadStyle.None);

        // Act / Assert
        assert.throws(() => tag.createTag(TagTypes.Id3v2, false));
        assert.throws(() => tag.createTag(TagTypes.Ape, false));
        assert.throws(() => tag.createTag(TagTypes.Id3v1, false));
    }

    @test
    public createTag_id3v1() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);
        const tag = new EndTag(file, ReadStyle.None);

        // Act
        const newTag = tag.createTag(TagTypes.Id3v1, false);

        // Assert
        assert.isOk(newTag);
        assert.strictEqual(newTag.tagTypes, TagTypes.Id3v1);

        assert.strictEqual(tag.tags.length, 1);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v1);
    }

    @test
    public createTag_id3v2() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);
        const tag = new EndTag(file, ReadStyle.None);

        // Act
        const newTag = tag.createTag(TagTypes.Id3v2, false);

        // Assert
        assert.isOk(newTag);
        assert.strictEqual(newTag.tagTypes, TagTypes.Id3v2);
        assert.strictEqual((<Id3v2Tag> newTag).version, 4);
        assert.isTrue(NumberUtils.hasFlag((<Id3v2Tag> newTag).flags, Id3v2TagHeaderFlags.FooterPresent));

        assert.strictEqual(tag.tags.length, 1);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2);
    }

    @test
    public createTag_ape() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);
        const tag = new EndTag(file, ReadStyle.None);

        // Act
        const newTag = tag.createTag(TagTypes.Ape, false);

        // Assert
        assert.isOk(newTag);
        assert.strictEqual(newTag.tagTypes, TagTypes.Ape);

        assert.strictEqual(tag.tags.length, 1);
        assert.strictEqual(tag.tagTypes, TagTypes.Ape);
    }

    @test
    public createTag_copy() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.version = 4;
        id3v2Tag.flags |= Id3v2TagHeaderFlags.FooterPresent;
        id3v2Tag.album = "foobarbaz";
        id3v2Tag.title = "fuxbuxquxx";

        const fileBytes = ByteVector.concatenate(
            ByteVector.fromSize(100),
            id3v2Tag.render()
        );
        const file = TestFile.getFile(fileBytes);
        const tag = new EndTag(file, ReadStyle.Average);

        // Act
        const newTag = tag.createTag(TagTypes.Ape, true);

        // Assert
        assert.isOk(newTag);
        assert.strictEqual(newTag.tagTypes, TagTypes.Ape);
        TagTesters.testTagProperties(newTag, {
            album: "foobarbaz",
            title: "fuxbuxquxx"
        });

        assert.strictEqual(tag.tags.length, 2);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
    }

    @test
    public render_hasTags() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.version = 4;
        id3v2Tag.flags |= Id3v2TagHeaderFlags.FooterPresent;
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.title = "fuxbuxquxx";
        const id3v1Tag = Id3v1Tag.fromEmpty();
        id3v2Tag.track = 123;

        const fileBytes = ByteVector.concatenate(
            ByteVector.fromSize(100),
            id3v2Tag.render(),
            id3v1Tag.render(),
            apeTag.render()
        );
        const file = TestFile.getFile(fileBytes);
        const tag = new EndTag(file, ReadStyle.None);

        // Act
        const output = tag.render();

        // Assert
        const expectedBytes = ByteVector.concatenate(
            apeTag.render(),
            id3v2Tag.render(),
            id3v1Tag.render()
        );

        assert.isOk(output);
        Testers.bvEqual(output, expectedBytes);
    }

    @test
    public render_notags() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);
        const tag = new EndTag(file, ReadStyle.None);

        // Act
        const output = tag.render();

        // Assert
        assert.isOk(output);
        assert.isTrue(output.isEmpty);
    }
}

