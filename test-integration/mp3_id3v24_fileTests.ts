import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import TestConstants from "./utilities/testConstants";
import {File, Id3v2FrameIdentifiers, Id3v2Tag, ReadStyle, TagTypes} from "../src";
import {StandardFileTests, TestTagLevel} from "./utilities/standardFileTests";

// Setup chai
const assert = Chai.assert;

@suite class Mp3_id3v24_fileTests {
    private static readonly replayGainPath = TestConstants.getSampleFilePath("sample_replaygain.mp3");
    private static readonly replayGainTmpFileName = "tmpwrite_sample_replaygain.mp3";
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample_v2_4_unsynch.mp3");
    private static readonly sampleTmpFileName = "tmpwrite_v2_4_unsynch.mp3";

    private static file: File;

    public static before() {
        Mp3_id3v24_fileTests.file = File.createFromPath(Mp3_id3v24_fileTests.sampleFilePath);
    }

    public static after() {
        Mp3_id3v24_fileTests.file.dispose();
    }

    @test
    public readTags() {
        assert.strictEqual(Mp3_id3v24_fileTests.file.tag.album, "MP3 album");
        assert.isTrue(Mp3_id3v24_fileTests.file.tag.comment.startsWith("MP3 comment"));
        assert.strictEqual(Mp3_id3v24_fileTests.file.tag.title, "MP3 title unicode (\u12a2\u1275\u12ee\u1335\u12eb)");
        assert.strictEqual(Mp3_id3v24_fileTests.file.tag.track, 6);
        assert.strictEqual(Mp3_id3v24_fileTests.file.tag.trackCount, 7);
        assert.strictEqual(Mp3_id3v24_fileTests.file.tag.year, 1234);

        assert.deepStrictEqual(
            Mp3_id3v24_fileTests.file.tag.performers,
            ["MP3 artist unicode (\u1283\u12ed\u120c \u1308\u1265\u1228\u1225\u120b\u1234)"]
        );
        assert.deepStrictEqual(
            Mp3_id3v24_fileTests.file.tag.genres,
            ["Acid Punk"]
        );
        assert.deepStrictEqual(
            Mp3_id3v24_fileTests.file.tag.composers,
            ["MP3 composer"]
        );
    }

    @test
    public replayGainTest() {
        const tmpFilePath = TestConstants.getTempFilePath(Mp3_id3v24_fileTests.replayGainTmpFileName);
        const testToPerform = () => {
            let rgFile: File;

            rgFile = File.createFromPath(tmpFilePath);
            try {
                assert.strictEqual(rgFile.tag.replayGainTrackGain, 2.22);
                assert.strictEqual(rgFile.tag.replayGainTrackPeak, 0.418785);
                assert.strictEqual(rgFile.tag.replayGainAlbumGain, 2.32);
                assert.strictEqual(rgFile.tag.replayGainAlbumPeak, 0.518785);
            } finally {
                rgFile.dispose();
            }

            rgFile = File.createFromPath(tmpFilePath);
            try {
                rgFile.tag.replayGainTrackGain = -1;
                rgFile.tag.replayGainTrackPeak = 1;
                rgFile.tag.replayGainAlbumGain = 2;
                rgFile.tag.replayGainAlbumPeak = 0;
                rgFile.save();
            } finally {
                rgFile.dispose();
            }

            rgFile = File.createFromPath(tmpFilePath);
            try {
                assert.strictEqual(rgFile.tag.replayGainTrackGain, -1);
                assert.strictEqual(rgFile.tag.replayGainTrackPeak, 1);
                assert.strictEqual(rgFile.tag.replayGainAlbumGain, 2);
                assert.strictEqual(rgFile.tag.replayGainAlbumPeak, 0);

                rgFile.tag.replayGainTrackGain = NaN;
                rgFile.tag.replayGainTrackPeak = NaN;
                rgFile.tag.replayGainAlbumGain = NaN;
                rgFile.tag.replayGainAlbumPeak = NaN;
                rgFile.save();
            } finally {
                rgFile.dispose();
            }

            rgFile = File.createFromPath(tmpFilePath);
            try {
                assert.isNaN(rgFile.tag.replayGainTrackGain);
                assert.isNaN(rgFile.tag.replayGainTrackPeak);
                assert.isNaN(rgFile.tag.replayGainAlbumGain);
                assert.isNaN(rgFile.tag.replayGainAlbumPeak);
            } finally {
                rgFile.dispose();
            }
        };
        StandardFileTests.performTestWithTmpFile(Mp3_id3v24_fileTests.replayGainPath, tmpFilePath, testToPerform);
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Mp3_id3v24_fileTests.sampleTmpFileName);
        StandardFileTests.writeStandardTags(Mp3_id3v24_fileTests.sampleFilePath, tmpFilePath, TestTagLevel.Medium);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Mp3_id3v24_fileTests.sampleTmpFileName);
        StandardFileTests.writeStandardPictures(Mp3_id3v24_fileTests.sampleFilePath, tmpFilePath, ReadStyle.None);
    }

    // @test
    // public writeStandardPicturesLazy() {
    //     const tmpFilePath = TestConstants.getTempFilePath(Id3v24_FileTests.sampleTmpFileName);
    //     StandardFileTests.writeStandardPictures(Id3v24_FileTests.sampleFilePath, tmpFilePath, ReadStyle.PictureLazy);
    // }

    @test
    public urlLinkFrameTest() {
        const tempFilePath = TestConstants.getTempFilePath(Mp3_id3v24_fileTests.sampleTmpFileName);
        const testToPerform = () => {
            let urlLinkFile = File.createFromPath(tempFilePath);
            try {
                const id3v2Tag1 = <Id3v2Tag> urlLinkFile.getTag(TagTypes.Id3v2, false);
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WCOM, "www.commercial.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WCOP, "www.copyright.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WOAF, "www.official-audio.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WOAR, "www.official-artist.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WOAS, "www.official-audio-source.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WORS, "www.official-internet-radio.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WPAY, "www.payment.com");
                id3v2Tag1.setTextFrame (Id3v2FrameIdentifiers.WPUB, "www.official-publisher.com");
                urlLinkFile.save();
            } finally {
                urlLinkFile.dispose();
            }

            urlLinkFile = File.createFromPath(tempFilePath);
            try {
                const id3v2Tag2 = <Id3v2Tag> urlLinkFile.getTag(TagTypes.Id3v2, false);
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
                urlLinkFile.dispose();
            }
        };
        StandardFileTests.performTestWithTmpFile(Mp3_id3v24_fileTests.sampleFilePath, tempFilePath, testToPerform);
    }
}
