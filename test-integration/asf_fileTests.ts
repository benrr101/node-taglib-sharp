import * as Chai from "chai";
import {suite, test} from "mocha-typescript";

import ExtendedFileTests from "./utilities/extendedFileTests";
import TestConstants from "./utilities/testConstants";
import {File, MediaTypes} from "../src";
import {StandardFileTests} from "./utilities/standardFileTests";

// Setup chai
const assert = Chai.assert;

@suite class Asf_FileTests {
    private static readonly corruptFilePath = TestConstants.getCorruptFilePath("corrupt.wma");
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.wma");
    private static readonly tmpFileName = "tmpwrite.wma";

    private static file: File;

    public static before() {
        Asf_FileTests.file = File.createFromPath(Asf_FileTests.sampleFilePath);
    }

    public static after() {
        Asf_FileTests.file.dispose();
    }

    @test
    public readAudioProperties() {
        assert.approximately(Asf_FileTests.file.properties.audioBitrate, 96, 0.1);
        assert.strictEqual(Asf_FileTests.file.properties.audioChannels, 2);
        assert.strictEqual(Asf_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Asf_FileTests.file.properties.durationMilliseconds, 4153);
        assert.strictEqual(Asf_FileTests.file.properties.mediaTypes, MediaTypes.LosslessAudio);
        assert.isTrue(Asf_FileTests.file.properties.description.indexOf("0x0161") >= 0);
    }

    @test
    public readTags() {
        assert.strictEqual(Asf_FileTests.file.tag.album, "WMA album");
        assert.deepEqual(Asf_FileTests.file.tag.albumArtists, ["Dan Drake"]);
        assert.deepEqual(Asf_FileTests.file.tag.performers, ["WMA artist"]);
        assert.strictEqual(Asf_FileTests.file.tag.description, "WMA comment");
        assert.deepEqual(Asf_FileTests.file.tag.genres, ["Brit Pop"]);
        assert.strictEqual(Asf_FileTests.file.tag.title, "WMA title");
        assert.strictEqual(Asf_FileTests.file.tag.track, 5);
        assert.strictEqual(Asf_FileTests.file.tag.year, 2005);
    }

    @test
    public testCorruptionResistance() {
        StandardFileTests.testCorruptionResistance(Asf_FileTests.corruptFilePath);
    }

    @test
    public writeExtendedTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Asf_FileTests.tmpFileName);
        ExtendedFileTests.writeExtendedTags(Asf_FileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Asf_FileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Asf_FileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Asf_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Asf_FileTests.sampleFilePath, tmpFilePath);
    }
}
