import * as TypeMoq from "typemoq";
import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import ApeTag from "../../src/ape/apeTag";
import Id3v2Tag from "../../src/id3v2/id3v2Tag";
import StartTag from "../../src/nonContainer/startTag";
import {default as TestFile} from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {File, ReadStyle} from "../../src/file";
import {TagTypes} from "../../src/tag";
import {TagTesters, Testers} from "../utilities/testers";

@suite class NonContainer_StartTagTests {
    @test
    public constructor_invalidArguments() {
        // Act / Assert
        Testers.testTruthy((v: File) => new StartTag(v, ReadStyle.None));
    }

    @test
    public constructor_noTags() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);

        // Act
        const startTag = new StartTag(file, ReadStyle.Average);

        // Assert
        assert.isOk(startTag);
        assert.isEmpty(startTag.tags);
        assert.strictEqual(startTag.tagTypes, TagTypes.None);
        TagTesters.testTagProperties(startTag, {});
    }

    @test
    public constructor_tagsAtEnd() {
        // Arrange
        const testTag = Id3v2Tag.fromEmpty();
        testTag.album = "foobarbaz";
        const fileBytes = ByteVector.concatenate(
            ByteVector.fromSize(100),
            testTag.render()
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const startTag = new StartTag(file, ReadStyle.Average);

        // Assert
        assert.isOk(startTag);
        assert.isEmpty(startTag.tags);
        assert.strictEqual(startTag.tagTypes, TagTypes.None);
        TagTesters.testTagProperties(startTag, {});
    }

    @test
    public constructor_tagsAtStart() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.title = "fuxbuxquxx";

        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100)
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const startTag = new StartTag(file, ReadStyle.Average);

        // Assert
        assert.isOk(startTag);
        assert.strictEqual(startTag.tags.length, 2);
        assert.strictEqual(startTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        TagTesters.testTagProperties(startTag, {
            album: "foobarbaz",
            title: "fuxbuxquxx"
        });
    }

    @test
    public constructor_generalExceptionThrownUp() {
        // Arrange
        const mockFile = TypeMoq.Mock.ofType<File>();
        mockFile.setup((f) => f.readBlock(TypeMoq.It.isAnyNumber())).throws(new Error());

        // Act / Assert
        assert.throws(() => new StartTag(mockFile.object, ReadStyle.None));
    }

    @test
    public createTag_unsupportedType() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);
        const tag = new StartTag(file, ReadStyle.None);

        // Act / Assert
        assert.throws(() => tag.createTag(TagTypes.DivX, false));
    }

    @test
    public createTag_alreadyExists() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        const apeTag = ApeTag.fromEmpty();

        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100)
        );
        const file = TestFile.getFile(fileBytes);
        const tag = new StartTag(file, ReadStyle.None);

        // Act / Assert
        assert.throws(() => tag.createTag(TagTypes.Id3v2, false));
        assert.throws(() => tag.createTag(TagTypes.Ape, false));
    }

    @test
    public createTag_id3v2() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);
        const tag = new StartTag(file, ReadStyle.None);

        // Act
        const newTag = tag.createTag(TagTypes.Id3v2, false);

        // Assert
        assert.isOk(newTag);
        assert.strictEqual(newTag.tagTypes, TagTypes.Id3v2);

        assert.strictEqual(tag.tags.length, 1);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2);
    }

    @test
    public createTag_ape() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);
        const tag = new StartTag(file, ReadStyle.None);

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
        id3v2Tag.album = "foobarbaz";
        id3v2Tag.title = "fuxbuxquxx";

        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            ByteVector.fromSize(100)
        );
        const file = TestFile.getFile(fileBytes);
        const tag = new StartTag(file, ReadStyle.Average);

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
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.title = "fuxbuxquxx";

        const fileBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render(),
            ByteVector.fromSize(100)
        );
        const file = TestFile.getFile(fileBytes);
        const tag = new StartTag(file, ReadStyle.None);

        // Act
        const output = tag.render();

        // Assert
        const expectedBytes = ByteVector.concatenate(
            id3v2Tag.render(),
            apeTag.render()
        );

        assert.isOk(output);
        assert.isTrue(ByteVector.equal(output, expectedBytes));
    }

    @test
    public render_notags() {
        // Arrange
        const fileBytes = ByteVector.fromSize(100);
        const file = TestFile.getFile(fileBytes);
        const tag = new StartTag(file, ReadStyle.None);

        // Act
        const output = tag.render();

        // Assert
        assert.isOk(output);
        assert.isTrue(output.isEmpty);
    }
}

