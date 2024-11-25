import {assert} from "chai";
import {suite, test} from "@testdeck/mocha";

import TestConstants from "./utilities/testConstants";
import {File, MediaTypes} from "../src";

@suite class Matroska_FileTests {
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.mkv");

    private static file: File;

    public static before() {
        Matroska_FileTests.file = File.createFromPath(Matroska_FileTests.sampleFilePath);
    }

    public static after() {
        Matroska_FileTests.file?.dispose();
    }

    @test
    public readProperties() {
        assert.strictEqual(Matroska_FileTests.file.properties.mediaTypes, MediaTypes.Audio | MediaTypes.Video);
        assert.strictEqual(Matroska_FileTests.file.properties.audioBitrate, 0);
        assert.strictEqual(Matroska_FileTests.file.properties.audioChannels, 1);
        assert.strictEqual(Matroska_FileTests.file.properties.audioSampleRate, 48000);
        assert.strictEqual(Matroska_FileTests.file.properties.bitsPerSample, 0);
        assert.strictEqual(Matroska_FileTests.file.properties.durationMilliseconds, 1120);
        assert.strictEqual(Matroska_FileTests.file.properties.videoHeight, 480);
        assert.strictEqual(Matroska_FileTests.file.properties.videoWidth, 640);
    }

    @test
    public readTags() {
        assert.strictEqual(Matroska_FileTests.file.tag.firstPerformer, "Lime");
        assert.strictEqual(Matroska_FileTests.file.tag.comment, "no comments");
        assert.strictEqual(Matroska_FileTests.file.tag.firstGenre, "Test");
        assert.strictEqual(Matroska_FileTests.file.tag.year, 2017);
        assert.strictEqual(Matroska_FileTests.file.tag.firstComposer, "Starwer");
        assert.strictEqual(Matroska_FileTests.file.tag.conductor, "Starwer");
        assert.strictEqual(Matroska_FileTests.file.tag.copyright, "Starwer 2017");
    }
}
