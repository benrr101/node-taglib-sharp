import * as fs from "fs";
import { assert } from "chai";
import { suite, test } from "@testdeck/mocha";

import TestConstants from "./utilities/testConstants";
import Utilities from "./utilities/utilities";
import {
    ByteVector,
    File,
    Mpeg4AppleTag,
    StringType,
    TagTypes
} from "../src";

@suite class Mpeg4_m4v_FileTests {
    private static readonly boxTypeLdes = ByteVector.fromString("ldes", StringType.UTF8); // long description
    private static readonly boxTypeTvsh = ByteVector.fromString("tvsh", StringType.UTF8); // TV Show or series
    private static readonly boxTypePurd = ByteVector.fromString("purd", StringType.UTF8); // purchase date

    private static readonly longDesc: string = "American comedy luminaries talk about the influence of Monty Python.";
    private static readonly purdDate: string = "2009-01-26 08:14:10";

    private static readonly sampleFilePath: string = TestConstants.getSampleFilePath("sample.m4v");
    private static readonly tmpFilePath: string = TestConstants.getTempFilePath("tmpwrite.m4v");

    private static file: File;

    public static before() {
        Mpeg4_m4v_FileTests.file = File.createFromPath(Mpeg4_m4v_FileTests.sampleFilePath);
    }

    public static after() {
        if (Mpeg4_m4v_FileTests.file) { Mpeg4_m4v_FileTests.file.dispose(); }
    }

    private setTags(tag: Mpeg4AppleTag) {
        tag.title = "TEST title";
        tag.performers = ["TEST performer 1", "TEST performer 2"];
        tag.comment = "TEST comment";
        tag.copyright = "TEST copyright";
        tag.genres = ["TEST genre 1", "TEST genre 2"];
        tag.year = 1999;

        const aTag: Mpeg4AppleTag = tag;
        assert.isDefined(aTag);

        aTag.setQuickTimeString(Mpeg4_m4v_FileTests.boxTypeLdes, "TEST Long Description");
        aTag.setQuickTimeString(Mpeg4_m4v_FileTests.boxTypeTvsh, "TEST TV Show");
    }

    private checkTags(tag: Mpeg4AppleTag) {
        assert.equal(tag.title, "TEST title");
        assert.equal(tag.joinedPerformers, "TEST performer 1; TEST performer 2");
        assert.equal(tag.comment, "TEST comment");
        assert.equal(tag.copyright, "TEST copyright");
        assert.equal(tag.joinedGenres, "TEST genre 1; TEST genre 2");
        assert.equal(tag.year, 1999);

        let adBoxes = tag.getQuickTimeStrings(Mpeg4_m4v_FileTests.boxTypeLdes);
        assert.deepStrictEqual(adBoxes, ["TEST Long Description"]);

        adBoxes = tag.getQuickTimeStrings(Mpeg4_m4v_FileTests.boxTypeTvsh);
        assert.deepStrictEqual(adBoxes, ["TEST TV Show"]);
    }

    @test
    public readAudioProperties() {
        assert.equal(Mpeg4_m4v_FileTests.file.properties.videoWidth, 632);
        assert.equal(Mpeg4_m4v_FileTests.file.properties.videoHeight, 472);
    }

    @test
    public readTags() {
        assert.equal(Mpeg4_m4v_FileTests.file.tag.firstPerformer, "Will Yapp");
        assert.equal(Mpeg4_m4v_FileTests.file.tag.title, "Why I Love Monty Python");
        assert.equal(Mpeg4_m4v_FileTests.file.tag.year, 2008);

        // Test Apple tags
        const tag = <Mpeg4AppleTag>Mpeg4_m4v_FileTests.file.getTag(TagTypes.Apple, false);
        assert.isOk(tag);

        let adBoxes = tag.getQuickTimeStrings(Mpeg4_m4v_FileTests.boxTypeLdes);
        assert.deepStrictEqual(adBoxes, [Mpeg4_m4v_FileTests.longDesc]);

        adBoxes = tag.getQuickTimeStrings(Mpeg4_m4v_FileTests.boxTypePurd);
        assert.deepStrictEqual(adBoxes, [Mpeg4_m4v_FileTests.purdDate]);
    }

    @test
    public writeAppleTags() {
        if (
            Mpeg4_m4v_FileTests.sampleFilePath !== Mpeg4_m4v_FileTests.tmpFilePath &&
            fs.existsSync(Mpeg4_m4v_FileTests.tmpFilePath)
        ) {
            fs.unlinkSync(Mpeg4_m4v_FileTests.tmpFilePath);
        }

        const shouldCreateTemp = Mpeg4_m4v_FileTests.sampleFilePath !== Mpeg4_m4v_FileTests.tmpFilePath;

        if (shouldCreateTemp) {
            fs.copyFileSync(Mpeg4_m4v_FileTests.sampleFilePath, Mpeg4_m4v_FileTests.tmpFilePath);
        }

        try {
            let tmpFile: File = File.createFromPath(Mpeg4_m4v_FileTests.tmpFilePath);
            let tag = <Mpeg4AppleTag>tmpFile.getTag(TagTypes.Apple, false);
            this.setTags(tag);
            tmpFile.save();

            tmpFile = File.createFromPath(Mpeg4_m4v_FileTests.tmpFilePath);
            tag = <Mpeg4AppleTag>tmpFile.getTag(TagTypes.Apple, false);
            this.checkTags(tag);
        } finally {
            Utilities.deleteBestEffort(Mpeg4_m4v_FileTests.tmpFilePath);
        }
    }
}
