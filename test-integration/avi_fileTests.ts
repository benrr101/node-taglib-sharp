import * as Chai from "chai";
import {suite, test} from "mocha-typescript";

import TestConstants from "./utilities/testConstants";
import {File, MediaTypes} from "../src";

// Setup chai
const assert = Chai.assert;

@suite class Avi_FileTests {
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
        assert.strictEqual(Avi_FileTests.file.properties.bitsPerSample, 16);
        assert.strictEqual(Avi_FileTests.file.properties.durationMilliseconds, 5800);
        assert.strictEqual(Avi_FileTests.file.properties.mediaTypes, MediaTypes.LosslessAudio | MediaTypes.Video);
        assert.strictEqual(Avi_FileTests.file.properties.videoHeight, 120);
        assert.strictEqual(Avi_FileTests.file.properties.videoWidth, 160);
    }
}
