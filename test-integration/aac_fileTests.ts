import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {suite, test} from "mocha-typescript";

import TestConstants from "./utilities/testConstants";
import {File} from "../src";
import {StandardFileTests} from "./utilities/standardFileTests";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class Aac_FileTests {
    private static readonly corruptFilePath = TestConstants.getCorruptFilePath("corrupt.aac");
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.aac");
    private static readonly tmpFileName = "tmpwrite.aac";

    private static file: File;

    public static before() {
        Aac_FileTests.file = File.createFromPath(Aac_FileTests.sampleFilePath);
    }

    public static after() {
        Aac_FileTests.file.dispose();
    }

    @test
    public readAudioProperties() {
        StandardFileTests.readAudioProperties(Aac_FileTests.file);
        assert.approximately(Aac_FileTests.file.properties.audioBitrate, 236, 1);
        assert.strictEqual(Aac_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Aac_FileTests.file.properties.audioChannels, 2);
        assert.approximately(Aac_FileTests.file.properties.durationMilliseconds, 5000, 50);
    }

    @test
    public readTags() {
        assert.strictEqual(Aac_FileTests.file.tag.album, "AAC album");
        assert.strictEqual(Aac_FileTests.file.tag.firstPerformer, "AAC artist");
        assert.strictEqual(Aac_FileTests.file.tag.comment, "AAC comment");
        assert.strictEqual(Aac_FileTests.file.tag.firstGenre, "Acid Punk");
        assert.strictEqual(Aac_FileTests.file.tag.title, "AAC title");
        assert.strictEqual(Aac_FileTests.file.tag.track, 6);
        assert.strictEqual(Aac_FileTests.file.tag.year, 1234);
    }

    @test
    public testCorruptionResistance() {
        StandardFileTests.testCorruptionResistance(Aac_FileTests.corruptFilePath);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Aac_FileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Aac_FileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Aac_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Aac_FileTests.sampleFilePath, tmpFilePath);
    }
}
