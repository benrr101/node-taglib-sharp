import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import TestConstants from "./utilities/testConstants";
import {File, MediaTypes, ReadStyle, TagTypes} from "../src";
import {StandardFileTests, TestTagLevel} from "./utilities/standardFileTests";

// Setup chai
const assert = Chai.assert;

@suite class Avi_FileTests {
    private static readonly corruptFilePath = TestConstants.getCorruptFilePath("corrupt.avi");
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.avi");
    private static readonly tmpFileName = "tmpwrite.avi";

    private static file: File;

    public static before() {
        Avi_FileTests.file = File.createFromPath(Avi_FileTests.sampleFilePath);
    }

    public static after() {
        Avi_FileTests.file.dispose();
    }

    @test
    public readAudioProperties() {
        assert.strictEqual(Avi_FileTests.file.properties.audioChannels, 2);
        assert.strictEqual(Avi_FileTests.file.properties.audioBitrate, 32);
        assert.strictEqual(Avi_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Avi_FileTests.file.properties.bitsPerSample, 0);
        assert.approximately(Avi_FileTests.file.properties.durationMilliseconds, 5800, 1);
        assert.strictEqual(Avi_FileTests.file.properties.mediaTypes, MediaTypes.LosslessAudio | MediaTypes.Video);
        assert.strictEqual(Avi_FileTests.file.properties.videoHeight, 120);
        assert.strictEqual(Avi_FileTests.file.properties.videoWidth, 160);
    }

    @test
    public readTags() {
        assert.strictEqual(Avi_FileTests.file.tag.album, "Avi album");
        assert.strictEqual(Avi_FileTests.file.tag.firstAlbumArtist, "Dan Drake");
        assert.strictEqual(Avi_FileTests.file.tag.firstPerformer, "AVI artist");
        assert.strictEqual(Avi_FileTests.file.tag.comment, "AVI comment");
        assert.strictEqual(Avi_FileTests.file.tag.firstGenre, "Brit Pop");
        assert.strictEqual(Avi_FileTests.file.tag.track, 5);
        assert.strictEqual(Avi_FileTests.file.tag.year, 2005);
    }

    @test
    public testCorruptionResistance() {
        StandardFileTests.testCorruptionResistance(Avi_FileTests.corruptFilePath);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Avi_FileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Avi_FileTests.sampleFilePath, tmpFilePath, ReadStyle.None);
    }

    // @test
    // public writeStandardPicturesLazy() {
    //     const tmpFilePath = TestConstants.getTempFilePath(Avi_FileTests.tmpFileName);
    //     StandardFileTests.writeStandardPictures(Avi_FileTests.sampleFilePath, tmpFilePath, ReadStyle.PictureLazy);
    // }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Avi_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Avi_FileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardTagsId3v2() {
        const tmpFilePath = TestConstants.getTempFilePath(Avi_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(
            Avi_FileTests.sampleFilePath,
            tmpFilePath,
            TestTagLevel.Normal,
            TagTypes.Id3v2
        );
    }
}
