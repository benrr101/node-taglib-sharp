import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as fs from "fs";
import {suite, test} from "mocha-typescript";

import ExtendedFileTests from "./utilities/extendedFileTests";
import TestConstants from "./utilities/testConstants";
import Utilities from "./utilities/utilities";
import {File, Id3v2FrameIdentifiers, Id3v2Tag, TagTypes} from "../src";
import {StandardFileTests} from "./utilities/standardFileTests";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class Id3v2_FileTests {
    // NOTE: These tests are more integration level tests from the original .NET implementation

    private static readonly corruptFilePath = TestConstants.getCorruptFilePath("null_title_v2.mp3");
    private static readonly extHeaderFilePath = TestConstants.getSampleFilePath("sample_v2_3_ext_header.mp3");
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample.mp3");
    private static readonly tmpFileName = "tmpwrite_v2_only.mp3";
    private static readonly v2sampleFilePath = TestConstants.getSampleFilePath("sample_v2_only.mp3");

    private static file: File;

    public static before() {
        Id3v2_FileTests.file = File.createFromPath(Id3v2_FileTests.v2sampleFilePath);
    }

    public static after() {
        Id3v2_FileTests.file.dispose();
    }

    @test
    public multiGenresTest() {
        const rgFile = File.createFromPath(Id3v2_FileTests.sampleFilePath);
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
    public readAudioProperties() {
        assert.strictEqual(Id3v2_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Id3v2_FileTests.file.properties.durationMilliseconds, 1352);
        assert.strictEqual(Id3v2_FileTests.file.properties.audioChannels, 1);
        assert.strictEqual(Id3v2_FileTests.file.properties.audioBitrate, 64);
        assert.strictEqual(Id3v2_FileTests.file.properties.durationMilliseconds, 1352);
    }

    @test
    public readTags() {
        assert.strictEqual(Id3v2_FileTests.file.tag.album, "MP3 album");
        assert.strictEqual(Id3v2_FileTests.file.tag.firstPerformer, "MP3 artist");
        assert.strictEqual(Id3v2_FileTests.file.tag.comment, "MP3 comment");
        assert.strictEqual(Id3v2_FileTests.file.tag.firstGenre, "Acid Punk");
        assert.strictEqual(Id3v2_FileTests.file.tag.title, "MP3 title");
        assert.strictEqual(Id3v2_FileTests.file.tag.track, 6);
        assert.strictEqual(Id3v2_FileTests.file.tag.trackCount, 7);
        assert.strictEqual(Id3v2_FileTests.file.tag.year, 1234);
    }

    @test
    public testExtendedHeaderSize() {
        const file = File.createFromPath(Id3v2_FileTests.extHeaderFilePath);
        try {
            assert.strictEqual(file.tag.title, "Title v2");
        } finally {
            file.dispose();
        }
    }

    @test
    public testTruncateOrFalsy() {
        // Arrange
        const tmpFilePath = TestConstants.getTempFilePath(Id3v2_FileTests.tmpFileName);
        if (fs.existsSync(tmpFilePath)) {
            fs.unlinkSync(tmpFilePath);
        }
        fs.copyFileSync(Id3v2_FileTests.corruptFilePath, tmpFilePath);

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
        const tempFilePath = TestConstants.getTempFilePath(Id3v2_FileTests.tmpFileName);
        fs.copyFileSync(Id3v2_FileTests.sampleFilePath, tempFilePath);

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
        const tmpFilePath = TestConstants.getTempFilePath(Id3v2_FileTests.tmpFileName);
        ExtendedFileTests.writeExtendedTags(Id3v2_FileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Id3v2_FileTests.tmpFileName);
        StandardFileTests.writeStandardPictures(Id3v2_FileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Id3v2_FileTests.tmpFileName);
        StandardFileTests.writeStandardTags(Id3v2_FileTests.sampleFilePath, tmpFilePath);
    }
}
