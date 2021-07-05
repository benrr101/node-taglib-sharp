import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import TestConstants from "./utilities/testConstants";
import {File, ReadStyle} from "../src";
import {StandardFileTests, TestTagLevel} from "./utilities/standardFileTests";

const assert = Chai.assert;

@suite class Mpeg_FileTests {
    private static readonly corruptFilePath = TestConstants.getCorruptFilePath("corrupt.mpg");
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.mpg");
    private static readonly tmpFileName = "tmpwrite.mpg";

    private static file: File;

    public static before() {
        Mpeg_FileTests.file = File.createFromPath(Mpeg_FileTests.sampleFilePath);
    }

    public static after() {
        Mpeg_FileTests.file.dispose();
    }

    @test
    public readAudioProperties() {
        assert.strictEqual(Mpeg_FileTests.file.properties.audioBitrate, 128);
        assert.strictEqual(Mpeg_FileTests.file.properties.audioChannels, 2);
        assert.strictEqual(Mpeg_FileTests.file.properties.audioSampleRate, 44100);
        assert.approximately(Mpeg_FileTests.file.properties.durationMilliseconds, 1391, 0.5);
        assert.strictEqual(Mpeg_FileTests.file.properties.videoHeight, 480);
        assert.strictEqual(Mpeg_FileTests.file.properties.videoWidth, 640);
    }

    @test
    public readTags() {
        assert.isTrue(Mpeg_FileTests.file.tag.isEmpty);
    }

    @test
    public RemoveStandardTags() {
        StandardFileTests.removeStandardTags(Mpeg_FileTests.sampleFilePath, Mpeg_FileTests.tmpFileName);
    }

    @test
    public TestCorruptionResistance() {
        StandardFileTests.testCorruptionResistance(Mpeg_FileTests.corruptFilePath);
    }

    @test
    public WriteStandardPictures() {
        StandardFileTests.writeStandardPictures(
            Mpeg_FileTests.sampleFilePath,
            Mpeg_FileTests.tmpFileName,
            ReadStyle.None
        );
    }

    // @test
    // public WriteStandardPicturesLazy() {
    //     StandardFileTests.writeStandardPictures(
    //         Mpeg_FileTests.sampleFilePath,
    //         Mpeg_FileTests.tmpFileName,
    //         ReadStyle.PictureLazy
    //     );
    // }

    @test
    public WriteStandardTags() {
        StandardFileTests.writeStandardTags(
            Mpeg_FileTests.sampleFilePath,
            Mpeg_FileTests.tmpFileName,
            TestTagLevel.Medium
        );
    }
}
