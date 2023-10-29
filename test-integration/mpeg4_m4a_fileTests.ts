import {assert} from "chai";
import {suite, test} from "@testdeck/mocha";

import ExtendedFileTests from "./utilities/extendedFileTests";
import TestConstants from "./utilities/testConstants";
import {ByteVector, File, Mpeg4AppleAdditionalInfoBox, Mpeg4BoxType, Mpeg4File} from "../src";
import {StandardFileTests, TestTagLevel} from "./utilities/standardFileTests";

@suite class Mpeg4_m4a_FileTests {
    private static readonly sampleFilePath: string = TestConstants.getSampleFilePath("sample.m4a");
    private static readonly tmpFilePath: string = TestConstants.getTempFilePath("tmpwrite.m4a");

    private static file: File;

    public static before() {
        Mpeg4_m4a_FileTests.file = File.createFromPath(Mpeg4_m4a_FileTests.sampleFilePath);
    }

    public static after() {
        if (Mpeg4_m4a_FileTests.file) { Mpeg4_m4a_FileTests.file.dispose(); }
    }

    @test
    public appleTags_MoreTests() {
        // This tests that a 'text' atom inside an 'stsd' atom is parsed correctly
        // We just ensure that this does not throw an exception. I don't know how to
        // verify the content is correct.
        File.createFromPath(TestConstants.getSampleFilePath("apple_tags.m4a"));
    }

    @test
    public bgo_676934() {
        // This file contains an atom which says its 800MB in size
        const file: File = File.createFromPath(TestConstants.getSampleFilePath("bgo_676934.m4a"));
        assert.isTrue(file.isPossiblyCorrupt);
    }

    @test
    public bgo_701689() {
        // This file contains a musicbrainz track id "883821fc-9bbc-4e04-be79-b4b12c4c4a4e"
        // This case also handles bgo #701690 as a proper value for the tag must be returned
        const file: File = File.createFromPath(TestConstants.getSampleFilePath("bgo_701689.m4a"));
        assert.equal(file.tag.musicBrainzTrackId, "883821fc-9bbc-4e04-be79-b4b12c4c4a4e");
    }

    @test
    public readAppleAacTags() {
        const file = <Mpeg4File>File.createFromPath(TestConstants.getSampleFilePath("bgo_658920.m4a"));
        // eslint-disable-next-line dot-notation
        assert.equal(file['_udtaBoxes'].length, 2);

        // eslint-disable-next-line dot-notation
        const first = file['_udtaBoxes'][0];
        const firstChildren = first.children;
        assert.equal(firstChildren.length, 1);

        assert.instanceOf(firstChildren[0], Mpeg4AppleAdditionalInfoBox);
        const child = <Mpeg4AppleAdditionalInfoBox>firstChildren[0];
        assert.isTrue(ByteVector.equals(child.boxType, Mpeg4BoxType.NAME));
        assert.equal(child.data.length, 0);
    }

    @test
    public readAudioProperties() {
        assert.approximately(Mpeg4_m4a_FileTests.file.properties.audioBitrate, 56, 1);
        assert.equal(Mpeg4_m4a_FileTests.file.properties.audioChannels, 2);
        assert.equal(Mpeg4_m4a_FileTests.file.properties.audioSampleRate, 44100);
        assert.equal(Mpeg4_m4a_FileTests.file.properties.bitsPerSample, 0);
        assert.approximately(Mpeg4_m4a_FileTests.file.properties.durationMilliseconds, 5253, 1);
        assert.equal(Mpeg4_m4a_FileTests.file.properties.description, "MPEG-4 Audio (mp4a)");
    }

    @test
    public readTags() {
        assert.equal(Mpeg4_m4a_FileTests.file.tag.album, "M4A album");
        assert.equal(Mpeg4_m4a_FileTests.file.tag.firstPerformer, "M4A artist");
        assert.equal(Mpeg4_m4a_FileTests.file.tag.comment, "M4A comment");
        assert.equal(Mpeg4_m4a_FileTests.file.tag.firstGenre, "Acid Punk");
        assert.equal(Mpeg4_m4a_FileTests.file.tag.title, "M4A title");
        assert.equal(Mpeg4_m4a_FileTests.file.tag.track, 6);
        assert.equal(Mpeg4_m4a_FileTests.file.tag.trackCount, 7);
        assert.equal(Mpeg4_m4a_FileTests.file.tag.year, 1234);
    }

    @test
    public readReplayGain() {
        const fileWithRg = File.createFromPath(TestConstants.getSampleFilePath("sample_replaygain.m4a"));
        assert.approximately(fileWithRg.tag.replayGainTrackGain, -1.43, 0.01);
    }

    @test
    public writeStandardTags() {
        StandardFileTests.writeStandardTags(
            Mpeg4_m4a_FileTests.sampleFilePath,
            Mpeg4_m4a_FileTests.tmpFilePath,
            TestTagLevel.Medium
        );
    }

    @test
    public writeExtendedTags() {
        ExtendedFileTests.writeExtendedTags(Mpeg4_m4a_FileTests.sampleFilePath, Mpeg4_m4a_FileTests.tmpFilePath);
    }

    @test
    public testCorruptionResistance() {
        StandardFileTests.testCorruptionResistance(TestConstants.getCorruptFilePath("corrupt.m4a"));
    }
}
