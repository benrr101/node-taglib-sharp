import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import {slow, suite, test, timeout} from "mocha-typescript";
import {File} from "../../src/file";
import TestConstants from "../testConstants";
import {StandardFileTests} from "../utilities/standardFileTests";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class Id3v2_FileTests {
    // NOTE: These tests are more integration level tests from the original .NET implementation

    private static readonly corruptFilePath = TestConstants.getCorruptFilePath("null_title_v2.mp3");
    private static readonly extHeaderFilePath = TestConstants.getSampleFilePath("sample_v2_3_ext_header.mp3");
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.mp3");
    private static readonly tmpFileName = "tmpwrite_v2_only.mp3";
    private static readonly v2sampleFilePath = TestConstants.getSampleFilePath("sample_v2_only.mp3");

    private static file: File;

    public static before() {
        File.createFromPath(Id3v2_FileTests.v2sampleFilePath);
    }

    public static after() {
        Id3v2_FileTests.file.dispose();
    }

    @test
    public readAudioProperties() {
        assert.strictEqual(Id3v2_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Id3v2_FileTests.file.properties.durationMilliseconds, 1000);
    }

    @test
    public readTags() {
        assert.strictEqual(Id3v2_FileTests.file.tag.album, "MP3 album");
        assert.strictEqual(Id3v2_FileTests.file.tag.firstPerformer, "MP3 artist");
        assert.strictEqual(Id3v2_FileTests.file.tag.comment, "MP3 comment");
        assert.strictEqual(Id3v2_FileTests.file.tag.firstGenre, "Acid Punk");
        assert.strictEqual(Id3v2_FileTests.file.tag.title, "MP3 title");
        assert.strictEqual(Id3v2_FileTests.file.tag.track, 6);
        assert.strictEqual(Id3v2_FileTests.file.tag.trackCount, 7);
        assert.strictEqual(Id3v2_FileTests.file.tag.year, 1234);
    }

    @test
    public multiGenresTest() {
        const rgFile = File.createFromPath(Id3v2_FileTests.sampleFilePath);
        try {
            const tag = rgFile.tag;
            const genres = tag.genres;

            assert.strictEqual(genres.length, 3);
            assert.strictEqual(genres[0], "Genre 1");
            assert.strictEqual(genres[1], "Genre 2");
            assert.strictEqual(genres[2], "Genre 3");
        } finally {
            rgFile.dispose();
        }
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Id3v2_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Id3v2_FileTests.sampleFilePath, tmpFilePath);
    }

    // @test
    // public writeStandardPictures() {
    //
    // }
}
