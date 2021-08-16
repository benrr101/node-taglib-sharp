import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import CombinedTag from "../../src/combinedTag";
import DivxTag from "../../src/riff/divxTag";
import Id3v2Tag from "../../src/id3v2/id3v2Tag";
import InfoTag from "../../src/riff/infoTag";
import MovieIdTag from "../../src/riff/movieIdTag";
import RiffBitmapInfoHeader from "../../src/riff/riffBitmapInfoHeader";
import RiffChunk from "../../src/riff/riffChunk";
import RiffFile from "../../src/riff/riffFile";
import RiffWaveFormatEx from "../../src/riff/riffWaveFormatEx";
import {default as TestFile} from "../utilities/testFile";
import {default as Resources} from "./resources";
import {ByteVector} from "../../src/byteVector";
import {ReadStyle} from "../../src/file";
import {IFileAbstraction} from "../../src/fileAbstraction";
import {TagTypes} from "../../src/tag";
import {Testers} from "../utilities/testers";

@suite class Riff_RiffFileTests {
    @test
    public constructor_invalidParams() {
        // Act / Assert
        Testers.testTruthy<string | IFileAbstraction>((v) => new RiffFile(v, ReadStyle.None));
    }

    @test
    public constructor_aviFile_noTagsNoCodecs() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(false),
            Resources.getMoviBlock()
        );
        const fileBytes = this.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act
        const file = new RiffFile(testAbstraction, ReadStyle.Average);

        // Assert
        assert.isOk(file.properties);
        assert.isOk(file.properties.codecs);
        assert.isEmpty(file.properties.codecs);
        assert.approximately(file.properties.durationMilliseconds, 7006, 1);

        assert.isOk(file.tag);
        assert.instanceOf(file.tag, CombinedTag);
        assert.strictEqual(file.tag.tagTypes, TagTypes.Id3v2 | TagTypes.RiffInfo | TagTypes.MovieId | TagTypes.DivX);
        assert.strictEqual((<CombinedTag> file.tag).tags.length, 4);
        assert.isTrue(file.tag.isEmpty);
    }

    @test
    public constructor_aviFile_noTagsHasCodecsRead() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(true),
            Resources.getMoviBlock()
        );
        const fileBytes = this.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act
        const file = new RiffFile(testAbstraction, ReadStyle.Average);

        // Assert
        assert.isOk(file.properties);
        assert.isOk(file.properties.codecs);
        assert.strictEqual(file.properties.codecs.length, 2);
        assert.isOk(file.properties.codecs.find((c) => c instanceof RiffWaveFormatEx));
        assert.isOk(file.properties.codecs.find((c) => c instanceof RiffBitmapInfoHeader))
        assert.approximately(file.properties.durationMilliseconds, 7006, 1);

        assert.isOk(file.tag);
        assert.instanceOf(file.tag, CombinedTag);
        assert.strictEqual(file.tag.tagTypes, TagTypes.Id3v2 | TagTypes.RiffInfo | TagTypes.MovieId | TagTypes.DivX);
        assert.strictEqual((<CombinedTag> file.tag).tags.length, 4);
        assert.isTrue(file.tag.isEmpty);
    }

    @test
    public constructor_aviFile_noTagsHasCodecsNotRead() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(true),
            Resources.getMoviBlock()
        );
        const fileBytes = this.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act
        const file = new RiffFile(testAbstraction, ReadStyle.None);

        // Assert
        assert.isNotOk(file.properties);

        assert.isOk(file.tag);
        assert.instanceOf(file.tag, CombinedTag);
        assert.strictEqual(file.tag.tagTypes, TagTypes.Id3v2 | TagTypes.RiffInfo | TagTypes.MovieId | TagTypes.DivX);
        assert.strictEqual((<CombinedTag> file.tag).tags.length, 4);
        assert.isTrue(file.tag.isEmpty);
    }

    @test
    public constructor_aviFile_allTagsNoCodecs() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(false),
            RiffChunk.fromData(DivxTag.CHUNK_FOURCC, Resources.getDivxTagData()).render(),
            this.getInfoTagBytes(),
            Resources.getMoviBlock(),
            this.getId3v2Bytes("id3 "),
            this.getMovieTagBytes()
        );
        const fileBytes = this.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act
        const file = new RiffFile(testAbstraction, ReadStyle.Average);

        // Assert
        assert.isOk(file.properties);
        assert.isOk(file.properties.codecs);
        assert.isEmpty(file.properties.codecs);
        assert.approximately(file.properties.durationMilliseconds, 7006, 1);

        assert.isOk(file.tag);
        assert.instanceOf(file.tag, CombinedTag);
        assert.strictEqual(file.tag.tagTypes, TagTypes.Id3v2 | TagTypes.RiffInfo | TagTypes.MovieId | TagTypes.DivX);
        assert.strictEqual((<CombinedTag> file.tag).tags.length, 4);
        assert.isFalse(file.tag.isEmpty);

        this.assertDivXTag(file);
        this.assertId3v2Tag(file);
        this.assertInfoTag(file);
        this.assertMovieIdTag(file);
    }

    private assertDivXTag(file: RiffFile) {
        const divxTag = (<CombinedTag> file.tag).tags.find((t) => t.tagTypes === TagTypes.DivX);
        assert.isOk(divxTag);
        assert.strictEqual(divxTag.title, "foo");
    }

    private assertId3v2Tag(file: RiffFile) {
        const id3v2Tag = (<CombinedTag> file.tag).tags.find((t) => t.tagTypes === TagTypes.Id3v2);
        assert.isOk(id3v2Tag);
        assert.strictEqual(id3v2Tag.amazonId, "foo");
    }

    private assertInfoTag(file: RiffFile) {
        const infoTag = (<CombinedTag> file.tag).tags.find((t) => t.tagTypes === TagTypes.RiffInfo);
        assert.isOk(infoTag);
        assert.sameMembers(infoTag.composers, ["Giuseppe Ottiviani"]);
    }

    private assertMovieIdTag(file: RiffFile) {
        const movieIdTag = (<CombinedTag> file.tag).tags.find((t) => t.tagTypes === TagTypes.MovieId);
        assert.isOk(movieIdTag);
        assert.strictEqual(movieIdTag.track, 123);
    }

    private getFileBytes(dataBytes: ByteVector): ByteVector {
        return ByteVector.concatenate(
            RiffFile.fileIdentifier,
            ByteVector.fromUInt(dataBytes.length, false),
            dataBytes
        );
    }

    private getId3v2Bytes(fourcc: string): ByteVector {
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.amazonId = "foo";
        return RiffChunk.fromData(fourcc, id3v2Tag.render()).render();
    }

    private getInfoTagBytes(): ByteVector {
        const infoTag = InfoTag.fromEmpty();
        infoTag.composers = ["Giuseppe Ottiviani"];
        return infoTag.render();
    }

    private getMovieTagBytes(): ByteVector {
        const movieIdTag = MovieIdTag.fromEmpty();
        movieIdTag.track = 123;
        return movieIdTag.render();
    }
}
