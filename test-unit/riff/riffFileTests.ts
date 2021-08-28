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
import {default as TestFile, TestFileAbstraction} from "../utilities/testFile";
import {default as Resources} from "./resources";
import {ByteVector} from "../../src/byteVector";
import {ReadStyle} from "../../src/file";
import {IFileAbstraction} from "../../src/fileAbstraction";
import {Id3v2TagHeaderFlags} from "../../src/id3v2/id3v2TagHeader";
import {TagTypes} from "../../src/tag";
import {Testers} from "../utilities/testers";

@suite class Riff_RiffFileTests {
    @test
    public constructor_invalidParams() {
        // Act / Assert
        Testers.testTruthy<string | IFileAbstraction>((v) => new RiffFile(v, ReadStyle.None));
    }

    @test
    public constructor_nonRiffFile() {
        // Arrange
        const fileBytes = ByteVector.concatenate(
            ByteVector.fromString("FOOO"),
            ByteVector.fromUInt(100, false),
            Resources.getDataChunk()
        );
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act / Assert
        assert.throws(() => new RiffFile(testAbstraction, ReadStyle.Average));
    }

    @test
    public constructor_aviFile_noTagsNoCodecs() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(false),
            Resources.getMoviChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
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
            Resources.getMoviChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act
        const file = new RiffFile(testAbstraction, ReadStyle.Average);

        // Assert
        assert.isOk(file.properties);
        assert.isOk(file.properties.codecs);
        assert.strictEqual(file.properties.codecs.length, 2);
        assert.isOk(file.properties.codecs.find((c) => c instanceof RiffWaveFormatEx));
        assert.isOk(file.properties.codecs.find((c) => c instanceof RiffBitmapInfoHeader));
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
            Resources.getMoviChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
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
            Riff_RiffFileTests.getInfoTagBytes(),
            Resources.getMoviChunk(),
            Riff_RiffFileTests.getId3v2Bytes("id3 "),
            Riff_RiffFileTests.getMovieTagBytes()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
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

    @test
    public constructor_aviFile_missingHeaders() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getMoviChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act / Assert
        assert.throws(() => new RiffFile(testAbstraction, ReadStyle.Average));
    }

    @test
    public constructor_unsupportedType() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("FOOO"),
            Resources.getMoviChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act / Assert
        assert.throws(() => new RiffFile(testAbstraction, ReadStyle.Average));
    }

    @test
    public constructor_waveFile_noTagsCodecsAreRead() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            Resources.getDataChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act
        const file = new RiffFile(testAbstraction, ReadStyle.Average);

        // Assert
        assert.isOk(file.properties);
        assert.isOk(file.properties.codecs);
        assert.strictEqual(file.properties.codecs.length, 1);
        assert.isOk(file.properties.codecs.find((c) => c instanceof RiffWaveFormatEx));
        assert.approximately(file.properties.durationMilliseconds, 405, 1);

        assert.isOk(file.tag);
        assert.instanceOf(file.tag, CombinedTag);
        assert.strictEqual(file.tag.tagTypes, TagTypes.Id3v2 | TagTypes.RiffInfo | TagTypes.MovieId | TagTypes.DivX);
        assert.strictEqual((<CombinedTag> file.tag).tags.length, 4);
        assert.isTrue(file.tag.isEmpty);
    }

    @test
    public constructor_waveFile_noTagsCodecsNotRead() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            Resources.getDataChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
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
    public constructor_waveFile_allTags() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            RiffChunk.fromData(DivxTag.CHUNK_FOURCC, Resources.getDivxTagData()).render(),
            Riff_RiffFileTests.getInfoTagBytes(),
            Resources.getDataChunk(),
            Riff_RiffFileTests.getId3v2Bytes("id3 "),
            Riff_RiffFileTests.getMovieTagBytes()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act
        const file = new RiffFile(testAbstraction, ReadStyle.Average);

        // Assert
        assert.isOk(file.properties);
        assert.isOk(file.properties.codecs);
        assert.strictEqual(file.properties.codecs.length, 1);
        assert.isOk(file.properties.codecs.find((c) => c instanceof RiffWaveFormatEx));
        assert.approximately(file.properties.durationMilliseconds, 405, 1);

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

    @test
    public constructor_waveFile_missingHeaders() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getDataChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act / Assert
        assert.throws(() => new RiffFile(testAbstraction, ReadStyle.Average));
    }

    @test
    public constructor_waveFile_noDataBlock() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act / Assert
        assert.throws(() => new RiffFile(testAbstraction, ReadStyle.Average));
    }

    @test
    public getTag_id3v2Exists() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getWaveAllTagsContiguousFile(10);
        const file = new RiffFile(testAbstraction, ReadStyle.None);

        // Act
        const tag = file.getTag(TagTypes.Id3v2, false);

        // Assert
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
    }

    @test
    public getTag_id3v2DoesNotExist() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getWaveAllTagsContiguousFile(10);
        const file = new RiffFile(testAbstraction, ReadStyle.None);
        file.removeTags(TagTypes.Id3v2);

        // Act 1
        let tag = file.getTag(TagTypes.Id3v2, false);

        // Assert 1
        assert.isNotOk(tag);

        // Act 2
        tag = file.getTag(TagTypes.Id3v2, true);

        // Assert 2
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
    }

    @test
    public getTag_infoTagExists() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getWaveAllTagsContiguousFile(10);
        const file = new RiffFile(testAbstraction, ReadStyle.None);

        // Act
        const tag = file.getTag(TagTypes.RiffInfo, false);

        // Assert
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
    }

    @test
    public getTag_infoTagDoesNotExist() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getWaveAllTagsContiguousFile(10);
        const file = new RiffFile(testAbstraction, ReadStyle.None);
        file.removeTags(TagTypes.RiffInfo);

        // Act 1
        let tag = file.getTag(TagTypes.RiffInfo, false);

        // Assert 1
        assert.isNotOk(tag);

        // Act 2
        tag = file.getTag(TagTypes.RiffInfo, true);

        // Assert 2
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
    }

    @test
    public getTag_movieIdExists() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getWaveAllTagsContiguousFile(10);
        const file = new RiffFile(testAbstraction, ReadStyle.None);

        // Act
        const tag = file.getTag(TagTypes.MovieId, false);

        // Assert
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
    }

    @test
    public getTag_movieIdDoesNotExist() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getWaveAllTagsContiguousFile(10);
        const file = new RiffFile(testAbstraction, ReadStyle.None);
        file.removeTags(TagTypes.MovieId);

        // Act 1
        let tag = file.getTag(TagTypes.MovieId, false);

        // Assert 1
        assert.isNotOk(tag);

        // Act 2
        tag = file.getTag(TagTypes.MovieId, true);

        // Assert 2
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
    }

    @test
    public getTag_divxExists() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getWaveAllTagsContiguousFile(10);
        const file = new RiffFile(testAbstraction, ReadStyle.None);

        // Act
        const tag = file.getTag(TagTypes.DivX, false);

        // Assert
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
    }

    @test
    public getTag_divxDoesNotExist() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getWaveAllTagsContiguousFile(10);
        const file = new RiffFile(testAbstraction, ReadStyle.None);
        file.removeTags(TagTypes.DivX);

        // Act 1
        let tag = file.getTag(TagTypes.DivX, false);

        // Assert 1
        assert.isNotOk(tag);

        // Act 2
        tag = file.getTag(TagTypes.DivX, true);

        // Assert 2
        assert.isOk(tag);
        assert.isTrue(tag.isEmpty); // This one is true b/c there isn't overlap with DivX and other tags
    }

    @test
    public removeTags_tagDoesNotExist() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            RiffChunk.fromData(DivxTag.CHUNK_FOURCC, Resources.getDivxTagData()).render(),
            Riff_RiffFileTests.getInfoTagBytes(),
            Resources.getDataChunk(),
            Riff_RiffFileTests.getId3v2Bytes("id3 "),
            Riff_RiffFileTests.getMovieTagBytes()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);
        const file = new RiffFile(testAbstraction, ReadStyle.Average);

        // Act
        file.removeTags(TagTypes.Apple);

        // Assert
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

    @test
    public removeTags_singleTag() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getWaveAllTagsContiguousFile(10);
        const file = new RiffFile(testAbstraction, ReadStyle.Average);

        // Act
        file.removeTags(TagTypes.Id3v2);

        // Assert
        assert.isOk(file.tag);
        assert.instanceOf(file.tag, CombinedTag);
        assert.strictEqual(file.tag.tagTypes, TagTypes.RiffInfo | TagTypes.MovieId | TagTypes.DivX);
        assert.strictEqual((<CombinedTag> file.tag).tags.length, 3);
        assert.isFalse(file.tag.isEmpty);

        this.assertDivXTag(file);
        assert.isNotOk((<CombinedTag> file.tag).tags.find((t) => t.tagTypes === TagTypes.Id3v2));
        this.assertInfoTag(file);
        this.assertMovieIdTag(file);
    }

    @test
    public removeTags_allTags() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getWaveAllTagsContiguousFile(10);
        const file = new RiffFile(testAbstraction, ReadStyle.Average);

        // Act
        file.removeTags(TagTypes.AllTags);

        // Assert
        assert.isOk(file.tag);
        assert.instanceOf(file.tag, CombinedTag);
        assert.strictEqual(file.tag.tagTypes, TagTypes.None);
        assert.strictEqual((<CombinedTag> file.tag).tags.length, 0);
        assert.isTrue(file.tag.isEmpty);
    }

    @test
    public save_waveNoTagsOriginally_noTagsStored() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            Resources.getJunkChunk(),
            Resources.getDataChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        const file = new RiffFile(testAbstraction, ReadStyle.Average);
        file.removeTags(TagTypes.AllTags);

        // Act
        file.save();

        // Assert - File should be untouched
        assert.isTrue(ByteVector.equal(testAbstraction.allBytes, fileBytes));
    }

    @test
    public save_waveNoTagsOriginally_addingTags() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            Resources.getJunkChunk(10),
            Resources.getDataChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        const file = new RiffFile(testAbstraction, ReadStyle.Average);
        file.tag.title = "foo";
        file.tag.amazonId = "foo";
        file.tag.composers = ["Giuseppe Ottiviani"];
        file.tag.track = 123;

        // Act
        file.save();

        // Assert
        // - Make sure bytes were written
        const expectedDataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            Resources.getJunkChunk(10),
            Riff_RiffFileTests.getSavedId3v2Bytes("id3 "),
            Riff_RiffFileTests.getSavedInfoTagBytes(),
            Riff_RiffFileTests.getSavedMovieTagBytes(),
            Riff_RiffFileTests.getSavedDivxBytes(),
            Resources.getJunkChunk(1024),
            Resources.getDataChunk()
        );
        const expectedFileBytes = Riff_RiffFileTests.getFileBytes(expectedDataBytes);
        assert.isTrue(ByteVector.equal(testAbstraction.allBytes, expectedFileBytes));
    }

    @test
    public save_waveNoTagsNoDataChunk_addingTags() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            Resources.getJunkChunk(10),
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        const file = new RiffFile(testAbstraction, ReadStyle.None);
        file.tag.title = "foo";
        file.tag.amazonId = "foo";
        file.tag.composers = ["Giuseppe Ottiviani"];
        file.tag.track = 123;

        // Act
        file.save();

        // Assert
        // - Make sure bytes were written
        const expectedDataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            Resources.getJunkChunk(10),
            Riff_RiffFileTests.getSavedId3v2Bytes("id3 "),
            Riff_RiffFileTests.getSavedInfoTagBytes(),
            Riff_RiffFileTests.getSavedMovieTagBytes(),
            Riff_RiffFileTests.getSavedDivxBytes(),
            Resources.getJunkChunk(1024)
        );
        const expectedFileBytes = Riff_RiffFileTests.getFileBytes(expectedDataBytes);
        assert.isTrue(ByteVector.equal(testAbstraction.allBytes, expectedFileBytes));
    }

    @test
    public save_waveHasContiguousTagsOriginally_newTagsBigger() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getWaveAllTagsContiguousFile(10);

        const file = new RiffFile(testAbstraction, ReadStyle.Average);
        file.tag.clear();
        file.tag.title = "foo";
        file.tag.amazonId = "foo";
        file.tag.composers = ["Giuseppe Ottiviani"];
        file.tag.track = 123;

        // Act
        file.save();

        // Assert
        const expectedDataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            Riff_RiffFileTests.getSavedId3v2Bytes("id3 "),
            Riff_RiffFileTests.getSavedInfoTagBytes(),
            Riff_RiffFileTests.getSavedMovieTagBytes(),
            Riff_RiffFileTests.getSavedDivxBytes(),
            Resources.getJunkChunk(1024),
            Resources.getDataChunk()
        );
        const expectedFileBytes = Riff_RiffFileTests.getFileBytes(expectedDataBytes);
        assert.isTrue(ByteVector.equal(testAbstraction.allBytes, expectedFileBytes));
    }

    @test
    public save_waveHasContiguousTagsOriginally_newTagsSmaller() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getWaveAllTagsContiguousFile(1000);
        const file = new RiffFile(testAbstraction, ReadStyle.Average);
        file.tag.clear();
        file.tag.title = "foo";
        file.tag.amazonId = "foo";
        file.tag.composers = ["Giuseppe Ottiviani"];
        file.tag.track = 123;

        // Act
        file.save();

        // Assert
        const expectedDataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            Riff_RiffFileTests.getSavedId3v2Bytes("id3 "),
            Riff_RiffFileTests.getSavedInfoTagBytes(),
            Riff_RiffFileTests.getSavedMovieTagBytes(),
            Riff_RiffFileTests.getSavedDivxBytes(),
            Resources.getJunkChunk(926),
            Resources.getDataChunk()
        );
        const expectedFileBytes = Riff_RiffFileTests.getFileBytes(expectedDataBytes);
        assert.isTrue(ByteVector.equal(testAbstraction.allBytes, expectedFileBytes));
    }

    @test
    public save_waveHasDiscontiguousTagsOriginally_writesNewTags() {
        // Arrange
        const testFileAbstraction = Riff_RiffFileTests.getWaveAllTagsDiscontiguousFile();
        const file = new RiffFile(testFileAbstraction, ReadStyle.Average);
        file.tag.clear();
        file.tag.title = "foo";
        file.tag.amazonId = "foo";
        file.tag.composers = ["Giuseppe Ottiviani"];
        file.tag.track = 123;

        // Act
        file.save();

        // Assert
        const expectedDataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            Riff_RiffFileTests.getSavedId3v2Bytes("id3 "),
            Riff_RiffFileTests.getSavedInfoTagBytes(),
            Riff_RiffFileTests.getSavedMovieTagBytes(),
            Riff_RiffFileTests.getSavedDivxBytes(),
            Resources.getJunkChunk(1024),
            Resources.getDataChunk()
        );
        const expectedFileBytes = Riff_RiffFileTests.getFileBytes(expectedDataBytes);
        assert.isTrue(ByteVector.equal(testFileAbstraction.allBytes, expectedFileBytes));
    }

    @test
    public save_waveHasDiscontiguousTagsOriginally_writesNewTags_savesAgain() {
        // Arrange
        const testFileAbstraction = Riff_RiffFileTests.getWaveAllTagsDiscontiguousFile();
        const file = new RiffFile(testFileAbstraction, ReadStyle.Average);
        file.tag.clear();
        file.tag.title = "foo";
        file.tag.amazonId = "foo";
        file.tag.composers = ["Giuseppe Ottiviani"];
        file.tag.track = 123;

        // Act
        file.save();
        file.save();

        // Assert
        const expectedDataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            Riff_RiffFileTests.getSavedId3v2Bytes("id3 "),
            Riff_RiffFileTests.getSavedInfoTagBytes(),
            Riff_RiffFileTests.getSavedMovieTagBytes(),
            Riff_RiffFileTests.getSavedDivxBytes(),
            Resources.getJunkChunk(1024),
            Resources.getDataChunk()
        );
        const expectedFileBytes = Riff_RiffFileTests.getFileBytes(expectedDataBytes);
        assert.isTrue(ByteVector.equal(testFileAbstraction.allBytes, expectedFileBytes));
    }

    @test
    public save_aviNoTagsOriginally_noTagsStored() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(true),
            Resources.getJunkChunk(),
            Resources.getMoviChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        const file = new RiffFile(testAbstraction, ReadStyle.Average);
        file.removeTags(TagTypes.AllTags);

        // Act
        file.save();

        // Assert - File should be untouched
        assert.isTrue(ByteVector.equal(testAbstraction.allBytes, fileBytes));
    }

    @test
    public save_aviNoTagsOriginally_addingTags() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(true),
            Resources.getJunkChunk(10),
            Resources.getMoviChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        const file = new RiffFile(testAbstraction, ReadStyle.Average);
        file.tag.title = "foo";
        file.tag.amazonId = "foo";
        file.tag.composers = ["Giuseppe Ottiviani"];
        file.tag.track = 123;

        // Act
        file.save();

        // Assert
        // - Make sure bytes were written
        const expectedDataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(true),
            Resources.getJunkChunk(10),
            Riff_RiffFileTests.getSavedId3v2Bytes("id3 "),
            Riff_RiffFileTests.getSavedInfoTagBytes(),
            Riff_RiffFileTests.getSavedMovieTagBytes(),
            Riff_RiffFileTests.getSavedDivxBytes(),
            Resources.getJunkChunk(1024),
            Resources.getMoviChunk()
        );
        const expectedFileBytes = Riff_RiffFileTests.getFileBytes(expectedDataBytes);
        assert.isTrue(ByteVector.equal(testAbstraction.allBytes, expectedFileBytes));
    }

    @test
    public save_aviNoTagsNoMoviChunk_addingTags() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(true),
            Resources.getJunkChunk(10),
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        const file = new RiffFile(testAbstraction, ReadStyle.None);
        file.tag.title = "foo";
        file.tag.amazonId = "foo";
        file.tag.composers = ["Giuseppe Ottiviani"];
        file.tag.track = 123;

        // Act
        file.save();

        // Assert
        // - Make sure bytes were written
        const expectedDataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(true),
            Resources.getJunkChunk(10),
            Riff_RiffFileTests.getSavedId3v2Bytes("id3 "),
            Riff_RiffFileTests.getSavedInfoTagBytes(),
            Riff_RiffFileTests.getSavedMovieTagBytes(),
            Riff_RiffFileTests.getSavedDivxBytes(),
            Resources.getJunkChunk(1024)
        );
        const expectedFileBytes = Riff_RiffFileTests.getFileBytes(expectedDataBytes);
        assert.isTrue(ByteVector.equal(testAbstraction.allBytes, expectedFileBytes));
    }

    @test
    public save_aviHasContiguousTagsOriginally_newTagsBigger() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getAviAllTagsContiguousFile(10);

        const file = new RiffFile(testAbstraction, ReadStyle.Average);
        file.tag.clear();
        file.tag.title = "foo";
        file.tag.amazonId = "foo";
        file.tag.composers = ["Giuseppe Ottiviani"];
        file.tag.track = 123;

        // Act
        file.save();

        // Assert
        const expectedDataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(true),
            Riff_RiffFileTests.getSavedId3v2Bytes("id3 "),
            Riff_RiffFileTests.getSavedInfoTagBytes(),
            Riff_RiffFileTests.getSavedMovieTagBytes(),
            Riff_RiffFileTests.getSavedDivxBytes(),
            Resources.getJunkChunk(1024),
            Resources.getMoviChunk()
        );
        const expectedFileBytes = Riff_RiffFileTests.getFileBytes(expectedDataBytes);
        assert.isTrue(ByteVector.equal(testAbstraction.allBytes, expectedFileBytes));
    }

    @test
    public save_aviHasContiguousTagsOriginally_newTagsSmaller() {
        // Arrange
        const testAbstraction = Riff_RiffFileTests.getAviAllTagsContiguousFile(1000);
        const file = new RiffFile(testAbstraction, ReadStyle.Average);
        file.tag.clear();
        file.tag.title = "foo";
        file.tag.amazonId = "foo";
        file.tag.composers = ["Giuseppe Ottiviani"];
        file.tag.track = 123;

        // Act
        file.save();

        // Assert
        const expectedDataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(true),
            Riff_RiffFileTests.getSavedId3v2Bytes("id3 "),
            Riff_RiffFileTests.getSavedInfoTagBytes(),
            Riff_RiffFileTests.getSavedMovieTagBytes(),
            Riff_RiffFileTests.getSavedDivxBytes(),
            Resources.getJunkChunk(926),
            Resources.getMoviChunk()
        );
        const expectedFileBytes = Riff_RiffFileTests.getFileBytes(expectedDataBytes);
        assert.isTrue(ByteVector.equal(testAbstraction.allBytes, expectedFileBytes));
    }

    @test
    public save_aviHasDiscontiguousTagsOriginally_writesNewTags() {
        // Arrange
        const testFileAbstraction = Riff_RiffFileTests.getAviAllTagsDiscontiguousFile();
        const file = new RiffFile(testFileAbstraction, ReadStyle.Average);
        file.tag.clear();
        file.tag.title = "foo";
        file.tag.amazonId = "foo";
        file.tag.composers = ["Giuseppe Ottiviani"];
        file.tag.track = 123;

        // Act
        file.save();

        // Assert
        const expectedDataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(true),
            Riff_RiffFileTests.getSavedId3v2Bytes("id3 "),
            Riff_RiffFileTests.getSavedInfoTagBytes(),
            Riff_RiffFileTests.getSavedMovieTagBytes(),
            Riff_RiffFileTests.getSavedDivxBytes(),
            Resources.getJunkChunk(1024),
            Resources.getMoviChunk()
        );
        const expectedFileBytes = Riff_RiffFileTests.getFileBytes(expectedDataBytes);
        assert.isTrue(ByteVector.equal(testFileAbstraction.allBytes, expectedFileBytes));
    }

    @test
    public save_aviHasDiscontiguousTagsOriginally_writesNewTags_savesAgain() {
        // Arrange
        const testFileAbstraction = Riff_RiffFileTests.getAviAllTagsDiscontiguousFile();
        const file = new RiffFile(testFileAbstraction, ReadStyle.Average);
        file.tag.clear();
        file.tag.title = "foo";
        file.tag.amazonId = "foo";
        file.tag.composers = ["Giuseppe Ottiviani"];
        file.tag.track = 123;

        // Act
        file.save();
        file.save();

        // Assert
        const expectedDataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(true),
            Riff_RiffFileTests.getSavedId3v2Bytes("id3 "),
            Riff_RiffFileTests.getSavedInfoTagBytes(),
            Riff_RiffFileTests.getSavedMovieTagBytes(),
            Riff_RiffFileTests.getSavedDivxBytes(),
            Resources.getJunkChunk(1024),
            Resources.getMoviChunk()
        );
        const expectedFileBytes = Riff_RiffFileTests.getFileBytes(expectedDataBytes);
        assert.isTrue(ByteVector.equal(testFileAbstraction.allBytes, expectedFileBytes));
    }

    private assertDivXTag(file: RiffFile): void {
        const divxTag = (<CombinedTag> file.tag).tags.find((t) => t.tagTypes === TagTypes.DivX);
        assert.isOk(divxTag);
        assert.strictEqual(divxTag.title, "foo");
    }

    private assertId3v2Tag(file: RiffFile): void {
        const id3v2Tag = (<CombinedTag> file.tag).tags.find((t) => t.tagTypes === TagTypes.Id3v2);
        assert.isOk(id3v2Tag);
        assert.strictEqual(id3v2Tag.amazonId, "foo");
    }

    private assertInfoTag(file: RiffFile): void {
        const infoTag = (<CombinedTag> file.tag).tags.find((t) => t.tagTypes === TagTypes.RiffInfo);
        assert.isOk(infoTag);
        assert.sameMembers(infoTag.composers, ["Giuseppe Ottiviani"]);
    }

    private assertMovieIdTag(file: RiffFile): void {
        const movieIdTag = (<CombinedTag> file.tag).tags.find((t) => t.tagTypes === TagTypes.MovieId);
        assert.isOk(movieIdTag);
        assert.strictEqual(movieIdTag.track, 123);
    }

    private static getAviAllTagsContiguousFile(trailingJunkChunkSize: number): TestFileAbstraction {
        // 1308 bytes in the contiguous tagging chunk
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(true),
            Riff_RiffFileTests.getDivxBytes(),
            Riff_RiffFileTests.getInfoTagBytes(),
            Resources.getJunkChunk(10),
            Riff_RiffFileTests.getId3v2Bytes("id3 "),
            Riff_RiffFileTests.getMovieTagBytes(),
            Resources.getJunkChunk(trailingJunkChunkSize),
            Resources.getMoviChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        return TestFile.getFileAbstraction(fileBytes);
    }

    private static getAviAllTagsDiscontiguousFile(): TestFileAbstraction {
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock(true),
            Riff_RiffFileTests.getDivxBytes(),
            Resources.getJunkChunk(10),
            Riff_RiffFileTests.getInfoTagBytes(),
            Resources.getMoviChunk(),
            Riff_RiffFileTests.getId3v2Bytes("id3 "),
            Riff_RiffFileTests.getMovieTagBytes()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        return TestFile.getFileAbstraction(fileBytes);
    }

    private static getFileBytes(dataBytes: ByteVector): ByteVector {
        return ByteVector.concatenate(
            RiffFile.fileIdentifier,
            ByteVector.fromUInt(dataBytes.length, false),
            dataBytes
        );
    }

    private static getDivxBytes(): ByteVector {
        return RiffChunk.fromData(DivxTag.CHUNK_FOURCC, Resources.getDivxTagData()).render();
    }

    private static getId3v2Bytes(fourcc: string): ByteVector {
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.version = 4;
        id3v2Tag.flags |= Id3v2TagHeaderFlags.FooterPresent;
        id3v2Tag.amazonId = "foo";
        return RiffChunk.fromData(fourcc, id3v2Tag.render()).render();
    }

    private static getInfoTagBytes(): ByteVector {
        const infoTag = InfoTag.fromEmpty();
        infoTag.composers = ["Giuseppe Ottiviani"];
        return infoTag.render();
    }

    private static getMovieTagBytes(): ByteVector {
        const movieIdTag = MovieIdTag.fromEmpty();
        movieIdTag.track = 123;
        return movieIdTag.render();
    }

    private static getSavedDivxBytes(): ByteVector {
        const divxTag = DivxTag.fromEmpty();
        divxTag.title = "foo";
        const divxTagBytes = divxTag.render();
        const divxChunk = RiffChunk.fromData(DivxTag.CHUNK_FOURCC, divxTagBytes);
        return divxChunk.render();
    }

    private static getSavedId3v2Bytes(fourcc: string): ByteVector {
        const expectedId3v2Tag = Id3v2Tag.fromEmpty();
        expectedId3v2Tag.version = 4;
        expectedId3v2Tag.flags |= Id3v2TagHeaderFlags.FooterPresent;
        expectedId3v2Tag.title = "foo";
        expectedId3v2Tag.amazonId = "foo";
        expectedId3v2Tag.composers = ["Giuseppe Ottiviani"];
        expectedId3v2Tag.track = 123;
        return RiffChunk.fromData(fourcc, expectedId3v2Tag.render()).render();
    }

    private static getSavedInfoTagBytes(): ByteVector {
        const infoTag = InfoTag.fromEmpty();
        infoTag.title = "foo";
        infoTag.composers = ["Giuseppe Ottiviani"];
        infoTag.track = 123;
        return infoTag.render();
    }

    private static getSavedMovieTagBytes(): ByteVector {
        const movieIdTag = MovieIdTag.fromEmpty();
        movieIdTag.title = "foo";
        movieIdTag.track = 123;
        return movieIdTag.render();
    }

    private static getWaveAllTagsContiguousFile(trailingJunkChunkSize: number): TestFileAbstraction {
        // 1308 bytes in the contiguous tagging chunk
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            Riff_RiffFileTests.getDivxBytes(),
            Riff_RiffFileTests.getInfoTagBytes(),
            Resources.getJunkChunk(10),
            Riff_RiffFileTests.getId3v2Bytes("id3 "),
            Riff_RiffFileTests.getMovieTagBytes(),
            Resources.getJunkChunk(trailingJunkChunkSize),
            Resources.getDataChunk()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        return TestFile.getFileAbstraction(fileBytes);
    }

    private static getWaveAllTagsDiscontiguousFile(): TestFileAbstraction {
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("WAVE"),
            Resources.getWaveFormatBlock(),
            Riff_RiffFileTests.getDivxBytes(),
            Resources.getJunkChunk(10),
            Riff_RiffFileTests.getInfoTagBytes(),
            Resources.getDataChunk(),
            Riff_RiffFileTests.getId3v2Bytes("id3 "),
            Riff_RiffFileTests.getMovieTagBytes()
        );
        const fileBytes = Riff_RiffFileTests.getFileBytes(dataBytes);
        return TestFile.getFileAbstraction(fileBytes);
    }
}
