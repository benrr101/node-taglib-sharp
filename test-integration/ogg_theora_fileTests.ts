import {assert} from "chai";
import {suite, test} from "@testdeck/mocha";

import ExtendedFileTests from "./utilities/extendedFileTests";
import TestConstants from "./utilities/testConstants";
import {File, MediaTypes} from "../src";
import {StandardFileTests, TestTagLevel} from "./utilities/standardFileTests";

@suite class Ogg_Theora_FileTests {
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.ogv");
    private static readonly tmpFileName = "tmpwrite.ogv";

    private static file: File;

    public static before() {
        Ogg_Theora_FileTests.file = File.createFromPath(Ogg_Theora_FileTests.sampleFilePath);
    }

    public static after() {
        if (Ogg_Theora_FileTests.file) { Ogg_Theora_FileTests.file.dispose(); }
    }

    @test
    public readAudioProperties() {
        assert.strictEqual(Ogg_Theora_FileTests.file.properties.mediaTypes, MediaTypes.Audio | MediaTypes.Video);
        assert.strictEqual(Ogg_Theora_FileTests.file.properties.audioBitrate, 112);
        assert.strictEqual(Ogg_Theora_FileTests.file.properties.audioChannels, 2);
        assert.strictEqual(Ogg_Theora_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Ogg_Theora_FileTests.file.properties.bitsPerSample, 0);
        assert.approximately(Ogg_Theora_FileTests.file.properties.durationMilliseconds, 5930, 5);
        assert.strictEqual(Ogg_Theora_FileTests.file.properties.videoHeight, 120);
        assert.strictEqual(Ogg_Theora_FileTests.file.properties.videoWidth, 160);
    }

    @test
    public readTags() {
        assert.strictEqual(Ogg_Theora_FileTests.file.tag.album, "Ogg album");
        assert.strictEqual(Ogg_Theora_FileTests.file.tag.firstAlbumArtist, "Ogg artist");
        assert.strictEqual(Ogg_Theora_FileTests.file.tag.firstPerformer, "Ogg artist");
        assert.strictEqual(Ogg_Theora_FileTests.file.tag.comment, "Ogg comment");
        assert.strictEqual(Ogg_Theora_FileTests.file.tag.firstGenre, "Brit Pop");
        assert.strictEqual(Ogg_Theora_FileTests.file.tag.track, 5);
        assert.strictEqual(Ogg_Theora_FileTests.file.tag.year, 2005);
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Ogg_Theora_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Ogg_Theora_FileTests.sampleFilePath, tmpFilePath, TestTagLevel.Medium);
    }

    @test
    public writeExtendedTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Ogg_Theora_FileTests.tmpFileName);
        ExtendedFileTests.writeExtendedTags(Ogg_Theora_FileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Ogg_Theora_FileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Ogg_Theora_FileTests.sampleFilePath, tmpFilePath);
    }
}
