import * as Chai from "chai";
import TestConstants from "./utilities/testConstants";
import {suite, test} from "mocha-typescript";

import {File} from "../src";
import {StandardFileTests} from "./utilities/standardFileTests";

const assert = Chai.assert;

@suite class Aiff_FileTests {
    private static readonly corruptFilePath = TestConstants.getCorruptFilePath("corrupt.aif");
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.aif");
    private static readonly tmpFileName = "tmpwrite.aif";

    private static file: File;

    public static before() {
        Aiff_FileTests.file = File.createFromPath(Aiff_FileTests.sampleFilePath);
    }

    public static after() {
        Aiff_FileTests.file.dispose();
    }

    @test
    public readAudioProperties() {
        assert.strictEqual(Aiff_FileTests.file.properties.audioBitrate, 706);
        assert.strictEqual(Aiff_FileTests.file.properties.audioChannels, 1);
        assert.strictEqual(Aiff_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Aiff_FileTests.file.properties.bitsPerSample, 16);
        assert.strictEqual(Aiff_FileTests.file.properties.durationMilliseconds, 2000);
    }
}
