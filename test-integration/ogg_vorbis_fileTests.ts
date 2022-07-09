import {assert} from "chai";
import {suite, test} from "@testdeck/mocha";

import ExtendedFileTests from "./utilities/extendedFileTests";
import TestConstants from "./utilities/testConstants";
import {File} from "../src";
import {StandardFileTests, TestTagLevel} from "./utilities/standardFileTests";

@suite class Ogg_Vorbis_FileTests {
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.ogg");
    private static readonly tmpFileName = "tmpwrite.ogg";

    private static file: File;

    public static before() {
        Ogg_Vorbis_FileTests.file = File.createFromPath(Ogg_Vorbis_FileTests.sampleFilePath);
    }

    public static after() {
        if (Ogg_Vorbis_FileTests.file) { Ogg_Vorbis_FileTests.file.dispose(); }
    }

    @test
    public readAudioProperties() {
        assert.strictEqual(Ogg_Vorbis_FileTests.file.properties.audioBitrate, 48);
        assert.strictEqual(Ogg_Vorbis_FileTests.file.properties.audioChannels, 1);
        assert.strictEqual(Ogg_Vorbis_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Ogg_Vorbis_FileTests.file.properties.bitsPerSample, 0);
        assert.approximately(Ogg_Vorbis_FileTests.file.properties.durationMilliseconds, 5232, 1);
    }

    @test
    public readTags() {
        assert.strictEqual(Ogg_Vorbis_FileTests.file.tag.album, "OGG album");
        assert.strictEqual(Ogg_Vorbis_FileTests.file.tag.firstPerformer, "OGG artist");
        assert.strictEqual(Ogg_Vorbis_FileTests.file.tag.comment, "OGG comment");
        assert.strictEqual(Ogg_Vorbis_FileTests.file.tag.firstGenre, "Acid Punk");
        assert.strictEqual(Ogg_Vorbis_FileTests.file.tag.title, "OGG title");
        assert.strictEqual(Ogg_Vorbis_FileTests.file.tag.track, 6);
        assert.strictEqual(Ogg_Vorbis_FileTests.file.tag.trackCount, 7);
        assert.strictEqual(Ogg_Vorbis_FileTests.file.tag.year, 1234);
    }

    @test
    public testCorruptionResistance() {
        StandardFileTests.testCorruptionResistance(TestConstants.getCorruptFilePath("corrupt.ogg"));
        StandardFileTests.testCorruptionResistance(TestConstants.getCorruptFilePath("corruptMissingFlag.ogg"));
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Ogg_Vorbis_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Ogg_Vorbis_FileTests.sampleFilePath, tmpFilePath, TestTagLevel.Medium);
    }

    @test
    public writeExtendedTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Ogg_Vorbis_FileTests.tmpFileName);
        ExtendedFileTests.writeExtendedTags(Ogg_Vorbis_FileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Ogg_Vorbis_FileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Ogg_Vorbis_FileTests.sampleFilePath, tmpFilePath);
    }
}
