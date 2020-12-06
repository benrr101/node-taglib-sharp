import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {suite, test} from "mocha-typescript";

import TestConstants from "./utilities/testConstants";
import {File, Id3v2FrameIdentifiers, Id3v2Tag, ReadStyle, TagTypes} from "../src";
import {StandardFileTests} from "./utilities/standardFileTests";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class Id3v24_FileTests {
    // NOTE: These tests are more integration level tests from the original .NET implementation

    private static readonly replayGainPath = TestConstants.getSampleFilePath("sample_replaygain.mp3");
    private static readonly replayGainTmpFileName = "tmpwrite_sample_replaygain.mp3";
    private static readonly sampleFilePath = TestConstants.getSampleFilePath("sample_v2_4_unsynch.mp3");
    private static readonly sampleTmpFileName = "tmpwrite_v2_4_unsynch.mp3";

    private static file: File;

    public static before() {
        Id3v24_FileTests.file = File.createFromPath(Id3v24_FileTests.sampleFilePath);
    }

    public static after() {
        Id3v24_FileTests.file.dispose();
    }

    @test
    public readAudioProperties() {
        assert.strictEqual(Id3v24_FileTests.file.properties.audioSampleRate, 44100);
        assert.strictEqual(Id3v24_FileTests.file.properties.durationMilliseconds, 1352);
        assert.strictEqual(Id3v24_FileTests.file.properties.audioChannels, 1);
        assert.strictEqual(Id3v24_FileTests.file.properties.audioBitrate, 64);
        assert.strictEqual(Id3v24_FileTests.file.properties.durationMilliseconds, 1352);
    }

    @test
    public readTags() {
        assert.strictEqual(Id3v24_FileTests.file.tag.album, "MP3 album");
        assert.isTrue(Id3v24_FileTests.file.tag.comment.startsWith("MP3 comment"));
        assert.strictEqual(Id3v24_FileTests.file.tag.title, "MP3 title unicode (\u12a2\u1275\u12ee\u1335\u12eb)");
        assert.strictEqual(Id3v24_FileTests.file.tag.track, 6);
        assert.strictEqual(Id3v24_FileTests.file.tag.trackCount, 7);
        assert.strictEqual(Id3v24_FileTests.file.tag.year, 1234);

        assert.deepStrictEqual(
            Id3v24_FileTests.file.tag.performers,
            ["MP3 artist unicode (\u1283\u12ed\u120c \u1308\u1265\u1228\u1225\u120b\u1234)"]
        );
        assert.deepStrictEqual(
            Id3v24_FileTests.file.tag.genres,
            ["Acid Punk"]
        );
        assert.deepStrictEqual(
            Id3v24_FileTests.file.tag.composers,
            ["MP3 composer"]
        );
    }

    @test
    public replayGainTest() {
        const tmpFilePath = TestConstants.getTempFilePath(Id3v24_FileTests.replayGainTmpFileName);
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
        StandardFileTests.performTestWithTmpFile(Id3v24_FileTests.replayGainPath, tmpFilePath, testToPerform);
    }

    @test
    public writeStandardTags() {
        const tmpFilePath = TestConstants.getTempFilePath(Id3v24_FileTests.sampleTmpFileName);
        StandardFileTests.writeStandardTags(Id3v24_FileTests.sampleFilePath, tmpFilePath);
    }

    @test
    public writeStandardPictures() {
        const tmpFilePath = TestConstants.getTempFilePath(Id3v24_FileTests.sampleTmpFileName);
        StandardFileTests.writeStandardPictures(Id3v24_FileTests.sampleFilePath, tmpFilePath, ReadStyle.None);
    }

    // @test
    // public writeStandardPicturesLazy() {
    //     const tmpFilePath = TestConstants.getTempFilePath(Id3v24_FileTests.sampleTmpFileName);
    //     StandardFileTests.writeStandardPictures(Id3v24_FileTests.sampleFilePath, tmpFilePath, ReadStyle.PictureLazy);
    // }

    @test
    public urlLinkFrameTest() {
        const tempFilePath = TestConstants.getTempFilePath(Id3v24_FileTests.sampleTmpFileName);
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
        StandardFileTests.performTestWithTmpFile(Id3v24_FileTests.sampleFilePath, tempFilePath, testToPerform);
    }
}
