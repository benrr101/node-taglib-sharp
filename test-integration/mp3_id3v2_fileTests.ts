import * as Chai from "chai";
import * as fs from "fs";
import {suite, test} from "@testdeck/mocha";

import ExtendedFileTests from "./utilities/extendedFileTests";
import TestConstants from "./utilities/testConstants";
import Utilities from "./utilities/utilities";
import {File, Id3v2FrameIdentifiers, Id3v2Tag, TagTypes} from "../src";
import {StandardFileTests} from "./utilities/standardFileTests";

// Setup chai
const assert = Chai.assert;

@suite class Mp3_id3v2_fileTests {
    // NOTE: These tests are more integration level tests from the original .NET implementation

    private static readonly corruptFilePath = TestConstants.getCorruptFilePath("corruptNullTitleId3v2.mp3");
    private static readonly extHeaderFilePath = TestConstants.getSampleFilePath("sample_v2_3_ext_header.mp3");
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.mp3");
    private static readonly tmpFileName = "tmpwrite_v2_only.mp3";
    private static readonly v2sampleFilePath = TestConstants.getSampleFilePath("sample_v2_only.mp3");

    private static file: File;

    public static before() {
        Mp3_id3v2_fileTests.file = File.createFromPath(Mp3_id3v2_fileTests.v2sampleFilePath);
    }

    public static after() {
        Mp3_id3v2_fileTests.file.dispose();
    }

    @test
    public multiGenresTest() {
        const rgFile = File.createFromPath(Mp3_id3v2_fileTests.sampleFilePath);
        try {
            const tag = rgFile.tag;
            const genres = tag.genres;

            assert.strictEqual(genres.length, 3);
            assert.strictEqual(genres[0], "Genre 1");
            assert.strictEqual(genres[1], "Genre 2");
            assert.strictEqual(genres[2], "Genre 3");
        } finally {
            rgFile.dispose();
        }
    }

    @test
    public readTags() {
        assert.strictEqual(Mp3_id3v2_fileTests.file.tag.album, "MP3 album");
        assert.strictEqual(Mp3_id3v2_fileTests.file.tag.firstPerformer, "MP3 artist");
        assert.strictEqual(Mp3_id3v2_fileTests.file.tag.comment, "MP3 comment");
        assert.strictEqual(Mp3_id3v2_fileTests.file.tag.firstGenre, "Acid Punk");
        assert.strictEqual(Mp3_id3v2_fileTests.file.tag.title, "MP3 title");
        assert.strictEqual(Mp3_id3v2_fileTests.file.tag.track, 6);
        assert.strictEqual(Mp3_id3v2_fileTests.file.tag.trackCount, 7);
        assert.strictEqual(Mp3_id3v2_fileTests.file.tag.year, 1234);
    }

    @test
    public testExtendedHeaderSize() {
        const file = File.createFromPath(Mp3_id3v2_fileTests.extHeaderFilePath);
        try {
            assert.strictEqual(file.tag.title, "Title v2");
        } finally {
            file.dispose();
        }
    }

    @test
    public testTruncateOrFalsy() {
        // Arrange
        const tmpFilePath = TestConstants.getTempFilePath(Mp3_id3v2_fileTests.tmpFileName);
        if (fs.existsSync(tmpFilePath)) {
            fs.unlinkSync(tmpFilePath);
        }
        fs.copyFileSync(Mp3_id3v2_fileTests.corruptFilePath, tmpFilePath);

        try {
            // Act
            const tmp = File.createFromPath(tmpFilePath);

            // Assert
            try {
                assert.strictEqual(tmp.tag.title, "T");
            } finally {
                tmp.dispose();
            }
        } finally {
            // Cleanup
            Utilities.deleteBestEffort(tmpFilePath);
        }
    }

    @test
    public urlLinkFrameTest() {
        const tempFilePath = TestConstants.getTempFilePath(Mp3_id3v2_fileTests.tmpFileName);
        fs.copyFileSync(Mp3_id3v2_fileTests.sampleFilePath, tempFilePath);

        try {
            const urlLinkFile1 = File.createFromPath(tempFilePath);
            try {
                const id3v2Tag1 = <Id3v2Tag> urlLinkFile1.getTag(TagTypes.Id3v2, false);
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WCOM, "www.commercial.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WCOP, "www.copyright.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WOAF, "www.official-audio.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WOAR, "www.official-artist.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WOAS, "www.official-audio-source.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WORS, "www.official-internet-radio.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WPAY, "www.payment.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WPUB, "www.official-publisher.com");
                urlLinkFile1.save();
            } finally {
                urlLinkFile1.dispose();
            }

            const urlLinkFile2 = File.createFromPath(tempFilePath);
            try {
                const id3v2Tag2 = <Id3v2Tag> urlLinkFile1.getTag(TagTypes.Id3v2, false);
                assert.strictEqual(
                    id3v2Tag2.getTextAsString(Id3v2FrameIdentifiers.WCOM),
                    "www.commercial.com"
                );
                assert.strictEqual(
                    id3v2Tag2.getTextAsString(Id3v2FrameIdentifiers.WCOP),
                    "www.copyright.com"
                );
                assert.strictEqual(
                    id3v2Tag2.getTextAsString(Id3v2FrameIdentifiers.WOAF),
                    "www.official-audio.com"
                );
                assert.strictEqual(
                    id3v2Tag2.getTextAsString(Id3v2FrameIdentifiers.WOAR),
                    "www.official-artist.com"
                );
                assert.strictEqual(
                    id3v2Tag2.getTextAsString(Id3v2FrameIdentifiers.WOAS),
                    "www.official-audio-source.com"
                );
                assert.strictEqual(
                    id3v2Tag2.getTextAsString(Id3v2FrameIdentifiers.WORS),
                    "www.official-internet-radio.com"
                );
                assert.strictEqual(
                    id3v2Tag2.getTextAsString(Id3v2FrameIdentifiers.WPAY),
                    "www.payment.com"
                );
                assert.strictEqual(
                    id3v2Tag2.getTextAsString(Id3v2FrameIdentifiers.WPUB),
                    "www.official-publisher.com"
                );
            } finally {
                urlLinkFile2.dispose();
            }
        } finally {
            fs.unlinkSync(tempFilePath);
        }
    }

    @test
    public writeExtendedTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Mp3_id3v2_fileTests.tmpFileName);
        ExtendedFileTests.writeExtendedTags(Mp3_id3v2_fileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Mp3_id3v2_fileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Mp3_id3v2_fileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Mp3_id3v2_fileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Mp3_id3v2_fileTests.sampleFilePath, tmpFilePath);
    }
}
