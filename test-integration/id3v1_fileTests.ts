import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {suite, test} from "mocha-typescript";
import TestConstants from "./utilities/testConstants";
import {File, ReadStyle} from "../src";
import {StandardFileTests} from "./utilities/standardFileTests";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class Id3v1_FileTests {
    // NOTE: These tests are more integration level tests from the original .NET implementation

    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample_v1_only.mp3");
    private static readonly tmpFileName = "tmpwrite_v1_only.mp3";

    private static file: File;

    public static before() {
        Id3v1_FileTests.file = File.createFromPath(Id3v1_FileTests.sampleFilePath);
    }

    public static after() {
        Id3v1_FileTests.file.dispose();
    }

    @test
    public readAudioProperties() {
        assert.strictEqual(Id3v1_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Id3v1_FileTests.file.properties.durationMilliseconds, 1352);
    }

    @test
    public readTags() {
        assert.strictEqual(Id3v1_FileTests.file.tag.album, "MP3 album");
        assert.strictEqual(Id3v1_FileTests.file.tag.firstPerformer, "MP3 artist");
        assert.strictEqual(Id3v1_FileTests.file.tag.comment, "MP3 comment");
        assert.strictEqual(Id3v1_FileTests.file.tag.firstGenre, "Acid Punk");
        assert.strictEqual(Id3v1_FileTests.file.tag.track, 6);
        assert.strictEqual(Id3v1_FileTests.file.tag.year, 1234);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Id3v1_FileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Id3v1_FileTests.sampleFilePath, tmpFilePath, ReadStyle.None);
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Id3v1_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Id3v1_FileTests.sampleFilePath, tmpFilePath);
    }
}
