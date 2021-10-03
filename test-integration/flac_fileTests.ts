import {assert} from "chai";
import {suite, test} from "@testdeck/mocha";

import TestConstants from "./utilities/testConstants";
import {File, ReadStyle} from "../src/";
import {StandardFileTests} from "./utilities/standardFileTests";

@suite class Flac_FileTests {
    private static readonly corruptFilePath = TestConstants.getCorruptFilePath("corrupt.flac");
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.flac");
    private static readonly tmpFileName = "tmpwrite.flac";

    private static file: File;

    public static before() {
        Flac_FileTests.file = File.createFromPath(Flac_FileTests.sampleFilePath);
    }

    public static after() {
        if (Flac_FileTests.file) { Flac_FileTests.file.dispose(); }
    }

    @test
    public readAudioProperties() {
        assert.approximately(Flac_FileTests.file.properties.audioBitrate, 692, .5);
        assert.strictEqual(Flac_FileTests.file.properties.audioChannels, 2);
        assert.strictEqual(Flac_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Flac_FileTests.file.properties.bitsPerSample, 16);
        assert.approximately(Flac_FileTests.file.properties.durationMilliseconds, 5232, 1);
    }

    @test
    public readTags() {
        assert.strictEqual(Flac_FileTests.file.tag.album, "FLAC album");
        assert.strictEqual(Flac_FileTests.file.tag.firstPerformer, "FLAC artist");
        assert.strictEqual(Flac_FileTests.file.tag.description, "FLAC comment");
        assert.strictEqual(Flac_FileTests.file.tag.firstGenre, "Acid Punk");
        assert.strictEqual(Flac_FileTests.file.tag.title, "FLAC title");
        assert.strictEqual(Flac_FileTests.file.tag.track, 6);
        assert.strictEqual(Flac_FileTests.file.tag.trackCount, 7);
        assert.strictEqual(Flac_FileTests.file.tag.year, 1234);
    }

    @test
    public testCorruptionResistance() {
        StandardFileTests.testCorruptionResistance(Flac_FileTests.corruptFilePath);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Flac_FileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Flac_FileTests.sampleFilePath, tmpFilePath, ReadStyle.None);
    }

    @test
    public writeStandardPictureLazy() {
        const tmpFilePath = TestConstants.getTempFilePath(Flac_FileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Flac_FileTests.sampleFilePath, tmpFilePath, ReadStyle.PictureLazy);
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Flac_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Flac_FileTests.sampleFilePath, tmpFilePath);
    }
}
