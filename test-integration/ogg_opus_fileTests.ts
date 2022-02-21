import {assert} from "chai";
import {suite, test} from "@testdeck/mocha";

import ExtendedFileTests from "./utilities/extendedFileTests";
import TestConstants from "./utilities/testConstants";
import {File} from "../src";
import {StandardFileTests, TestTagLevel} from "./utilities/standardFileTests";

@suite class Ogg_Opus_FileTests {
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.opus");
    private static readonly tmpFileName = "tmpwrite.opus";

    private static file: File;

    public static before() {
        Ogg_Opus_FileTests.file = File.createFromPath(Ogg_Opus_FileTests.sampleFilePath);
    }

    public static after() {
        if (Ogg_Opus_FileTests.file) { Ogg_Opus_FileTests.file.dispose(); }
    }

    @test
    public readAudioProperties() {
        assert.strictEqual(Ogg_Opus_FileTests.file.properties.audioBitrate, 0);
        assert.strictEqual(Ogg_Opus_FileTests.file.properties.audioChannels, 2);
        assert.strictEqual(Ogg_Opus_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Ogg_Opus_FileTests.file.properties.bitsPerSample, 0);
        assert.approximately(Ogg_Opus_FileTests.file.properties.durationMilliseconds, 5232, 10);
        // TODO: Figure out why we're off by around 10
    }

    @test
    public readTags() {
        assert.strictEqual(Ogg_Opus_FileTests.file.tag.album, "Opus album");
        assert.strictEqual(Ogg_Opus_FileTests.file.tag.firstPerformer, "Opus artist");
        assert.strictEqual(Ogg_Opus_FileTests.file.tag.description, "Opus comment");
        assert.strictEqual(Ogg_Opus_FileTests.file.tag.firstGenre, "Acid Punk");
        assert.strictEqual(Ogg_Opus_FileTests.file.tag.title, "Opus title");
        assert.strictEqual(Ogg_Opus_FileTests.file.tag.track, 6);
        assert.strictEqual(Ogg_Opus_FileTests.file.tag.trackCount, 7);
        assert.strictEqual(Ogg_Opus_FileTests.file.tag.year, 1234);
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Ogg_Opus_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Ogg_Opus_FileTests.sampleFilePath, tmpFilePath, TestTagLevel.Medium);
    }

    @test
    public writeExtendedTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Ogg_Opus_FileTests.tmpFileName);
        ExtendedFileTests.writeExtendedTags(Ogg_Opus_FileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Ogg_Opus_FileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Ogg_Opus_FileTests.sampleFilePath, tmpFilePath);
    }
}
