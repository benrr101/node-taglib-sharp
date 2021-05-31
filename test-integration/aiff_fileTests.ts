import * as Chai from "chai";
import TestConstants from "./utilities/testConstants";
import {suite, test} from "mocha-typescript";

import {File, ReadStyle} from "../src";
import {StandardFileTests} from "./utilities/standardFileTests";
import ExtendedFileTests from "./utilities/extendedFileTests";

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
        assert.approximately(Aiff_FileTests.file.properties.audioBitrate, 706, 0.5);
        assert.strictEqual(Aiff_FileTests.file.properties.audioChannels, 1);
        assert.strictEqual(Aiff_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Aiff_FileTests.file.properties.bitsPerSample, 16);
        assert.approximately(Aiff_FileTests.file.properties.durationMilliseconds, 2000, 1);
    }

    @test
    public readTags() {
        assert.strictEqual(Aiff_FileTests.file.tag.album, "Aiff Album");
        assert.strictEqual(Aiff_FileTests.file.tag.firstPerformer, "Aiff Artist");
        assert.strictEqual(Aiff_FileTests.file.tag.comment, "Aiff Comment");
        assert.strictEqual(Aiff_FileTests.file.tag.firstGenre, "Blues");
        assert.strictEqual(Aiff_FileTests.file.tag.track, 5);
        assert.strictEqual(Aiff_FileTests.file.tag.trackCount, 10);

        // sample.aif contains a TDAT (and no TYER) with 2009 in it, but TDAT is supposed to
        // contain MMDD - so the following should not be equal
        assert.notStrictEqual(2009, Aiff_FileTests.file.tag.year);
    }

    @test
    public testCorruptionResistance() {
        StandardFileTests.testCorruptionResistance(Aiff_FileTests.corruptFilePath);
    }

    @test
    public writeExtendedTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Aiff_FileTests.tmpFileName);
        ExtendedFileTests.writeExtendedTags(Aiff_FileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Aiff_FileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Aiff_FileTests.sampleFilePath, tmpFilePath, ReadStyle.None);
    }

    // @test
    // public writeStandardPicturesLazy() {
    //     StandardFileTests.writeStandardPictures(
    //         Aiff_FileTests.sampleFilePath,
    //         Aiff_FileTests.tmpFileName,
    //         ReadStyle.None
    //     );
    // }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Aiff_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Aiff_FileTests.sampleFilePath, tmpFilePath);
    }

}
