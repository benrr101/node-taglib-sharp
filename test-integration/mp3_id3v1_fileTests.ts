import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import TestConstants from "./utilities/testConstants";
import {File, ReadStyle} from "../src";
import {StandardFileTests} from "./utilities/standardFileTests";

// Setup chai
const assert = Chai.assert;

@suite class Mp3_id3v1_fileTests {
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample_v1_only.mp3");
    private static readonly tmpFileName = "tmpwrite_v1_only.mp3";

    private static file: File;

    public static before() {
        Mp3_id3v1_fileTests.file = File.createFromPath(Mp3_id3v1_fileTests.sampleFilePath);
    }

    public static after() {
        Mp3_id3v1_fileTests.file.dispose();
    }

    @test
    public readTags() {
        assert.strictEqual(Mp3_id3v1_fileTests.file.tag.album, "MP3 album");
        assert.strictEqual(Mp3_id3v1_fileTests.file.tag.firstPerformer, "MP3 artist");
        assert.strictEqual(Mp3_id3v1_fileTests.file.tag.comment, "MP3 comment");
        assert.strictEqual(Mp3_id3v1_fileTests.file.tag.firstGenre, "Acid Punk");
        assert.strictEqual(Mp3_id3v1_fileTests.file.tag.track, 6);
        assert.strictEqual(Mp3_id3v1_fileTests.file.tag.year, 1234);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Mp3_id3v1_fileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Mp3_id3v1_fileTests.sampleFilePath, tmpFilePath, ReadStyle.None);
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Mp3_id3v1_fileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Mp3_id3v1_fileTests.sampleFilePath, tmpFilePath);
    }
}
