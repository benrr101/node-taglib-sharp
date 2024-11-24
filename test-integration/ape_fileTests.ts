import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import ExtendedFileTests from "./utilities/extendedFileTests";
import TestConstants from "./utilities/testConstants";
import {File} from "../src";
import {StandardFileTests} from "./utilities/standardFileTests";

@suite class Ape_FileTests {
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.ape");
    private static readonly tmpFileName = "tmpwrite.ape";

    private static file: File;

    public static before() {
        Ape_FileTests.file = File.createFromPath(Ape_FileTests.sampleFilePath);
    }

    public static after() {
        Ape_FileTests.file.dispose();
    }

    @test
    public readAudioProperties() {
        assert.approximately(Ape_FileTests.file.properties.audioBitrate, 604, 0.5);
        assert.strictEqual(Ape_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Ape_FileTests.file.properties.audioChannels, 2);
        assert.approximately(Ape_FileTests.file.properties.durationMilliseconds, 5230, 10);
    }

    @test
    public readTags() {
        assert.strictEqual(Ape_FileTests.file.tag.album, "APE album");
        assert.strictEqual(Ape_FileTests.file.tag.firstPerformer, "APE artist");
        assert.strictEqual(Ape_FileTests.file.tag.comment, "APE comment");
        assert.strictEqual(Ape_FileTests.file.tag.firstGenre, "Acid Punk");
        assert.strictEqual(Ape_FileTests.file.tag.track, 6);
        assert.strictEqual(Ape_FileTests.file.tag.trackCount, 7);
        assert.strictEqual(Ape_FileTests.file.tag.year, 1234);
    }

    @test
    public writeExtendedTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Ape_FileTests.tmpFileName);
        ExtendedFileTests.writeExtendedTags(Ape_FileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Ape_FileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Ape_FileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Ape_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Ape_FileTests.sampleFilePath, tmpFilePath);
    }
}
