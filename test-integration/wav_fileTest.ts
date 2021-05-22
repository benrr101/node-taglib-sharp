import * as Chai from "chai";
import {suite, test} from "mocha-typescript";

import TestConstants from "./utilities/testConstants";
import {File, MediaTypes, PictureType, ReadStyle} from "../src";
import {StandardFileTests} from "./utilities/standardFileTests";

// Setup chai
const assert = Chai.assert;

@suite class Wav_FileTests {
    private static readonly corruptFilePath = TestConstants.getCorruptFilePath("corrupt.wav");
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.wav");
    private static readonly tmpFileName = "tmpwrite.wav";

    private static file: File;

    public static before() {
        Wav_FileTests.file = File.createFromPath(Wav_FileTests.sampleFilePath);
    }

    public static after() {
        Wav_FileTests.file.dispose();
    }

    @test
    public readAudioProperties() {
        assert.strictEqual(Wav_FileTests.file.properties.audioChannels, 1);
        assert.strictEqual(Wav_FileTests.file.properties.audioBitrate, 705.6);
        assert.strictEqual(Wav_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Wav_FileTests.file.properties.bitsPerSample, 16);
        assert.strictEqual(Wav_FileTests.file.properties.durationMilliseconds, 2000);
        assert.strictEqual(Wav_FileTests.file.properties.mediaTypes, MediaTypes.LosslessAudio);
    }

    @test
    public readPictures() {
        const pics = Wav_FileTests.file.tag.pictures;
        assert.strictEqual(pics[0].type, PictureType.FrontCover);
        assert.strictEqual(pics[0].mimeType, "image/jpeg");
        assert.strictEqual(pics[0].data.length, 10210);
    }

    @test
    public readTags() {
        assert.strictEqual(Wav_FileTests.file.tag.firstPerformer, "Artist");
        assert.strictEqual(Wav_FileTests.file.tag.comment, "yepa");
        assert.strictEqual(Wav_FileTests.file.tag.firstGenre, "Genre");
        assert.strictEqual(Wav_FileTests.file.tag.album, "Album");
        assert.strictEqual(Wav_FileTests.file.tag.title, "Title");
        assert.strictEqual(Wav_FileTests.file.tag.year, 2009);
        assert.strictEqual(Wav_FileTests.file.tag.track, 1);
        assert.isEmpty(Wav_FileTests.file.tag.composers);
        assert.isUndefined(Wav_FileTests.file.tag.conductor);
        assert.isUndefined(Wav_FileTests.file.tag.copyright);
    }

    @test
    public removeStandardTags() {
        StandardFileTests.removeStandardTags(Wav_FileTests.sampleFilePath, Wav_FileTests.tmpFileName);
    }

    @test
    public testCorruptionResistance() {
        StandardFileTests.testCorruptionResistance(Wav_FileTests.corruptFilePath);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Wav_FileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Wav_FileTests.sampleFilePath, tmpFilePath, ReadStyle.None);
    }

    @test
    public writeStandardTags() {
        // @TODO: This was originally a medium test. However, medium has a text frame that can't be
        //    rendered on ID3v2.3 tags. So I took it off.
        const tmpFilePath = TestConstants.getTempFilePath(Wav_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(tmpFilePath, Wav_FileTests.tmpFileName);
    }
}
