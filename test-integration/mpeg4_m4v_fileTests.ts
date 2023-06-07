import { assert } from "chai";
import { suite, test } from "@testdeck/mocha";
import * as fs from "fs";
import TestConstants from "./utilities/testConstants";
import { ByteVector, File, Mpeg4File, StringType, TagTypes } from "../src";
import { AppleDataBox, IsoUserDataBox } from "../src/mpeg4/mpeg4Boxes";
import AppleTag from "../src/mpeg4/appleTag";
import { AppleDataBoxFlagType } from "../src/mpeg4/appleDataBoxFlagType";
import Utilities from "./utilities/utilities";

class Mpeg4TestFile extends Mpeg4File {

    public get udtaBoxes(): IsoUserDataBox[] {
        return super.udtaBoxes;
    }
}

@suite class Mpeg4_m4v_FileTests {
    private static readonly boxTypeLdes = ByteVector.fromString("ldes", StringType.UTF8).makeReadOnly(); // long description
    private static readonly boxTypeTvsh = ByteVector.fromString("tvsh", StringType.UTF8).makeReadOnly(); // TV Show or series
    private static readonly boxTypePurd = ByteVector.fromString("purd", StringType.UTF8).makeReadOnly(); // purchase date

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

    private setTags(tag: AppleTag) {
        tag.title = "TEST title";
        tag.performers = ["TEST performer 1", "TEST performer 2"];
        tag.comment = "TEST comment";
        tag.copyright = "TEST copyright";
        tag.genres = ["TEST genre 1", "TEST genre 2"];
        tag.year = 1999;

        const aTag: AppleTag = tag;
        assert.isDefined(aTag);

        const newBox1 = AppleDataBox.fromDataAndFlags(ByteVector.fromString("TEST Long Description", StringType.UTF8), <number>AppleDataBoxFlagType.ContainsText);
        const newBox2 = AppleDataBox.fromDataAndFlags(ByteVector.fromString("TEST TV Show", StringType.UTF8), <number>AppleDataBoxFlagType.ContainsText);
        aTag.setDataFromTypeAndBoxes(Mpeg4_m4v_FileTests.boxTypeLdes, [newBox1]);
        aTag.setDataFromTypeAndBoxes(Mpeg4_m4v_FileTests.boxTypeTvsh, [newBox2]);
    }

    private checkTags(tag: AppleTag) {
        assert.equal(tag.title, "TEST title");
        assert.equal(tag.joinedPerformers, "TEST performer 1; TEST performer 2");
        assert.equal(tag.comment, "TEST comment");
        assert.equal(tag.copyright, "TEST copyright");
        assert.equal(tag.joinedGenres, "TEST genre 1; TEST genre 2");
        assert.equal(tag.year, 1999);

        const aTag: AppleTag = tag;
        assert.isDefined(aTag);

        for (const adBox of tag.getDataBoxesFromType(Mpeg4_m4v_FileTests.boxTypeLdes)) {
            assert.equal(adBox.text, "TEST Long Description");
        }

        for (const adBox of tag.getDataBoxesFromType(Mpeg4_m4v_FileTests.boxTypeTvsh)) {
            assert.equal(adBox.text, "TEST TV Show");
        }
    }

    @test
    public readAudioProperties() {
        assert.equal(Mpeg4_m4v_FileTests.file.properties.videoWidth, 632);
        assert.equal(Mpeg4_m4v_FileTests.file.properties.videoHeight, 472);
    }

    @test
    public readTags() {
        let gotLongDesc: boolean = false;
        let gotPurdDate: boolean = false;

        assert.equal(Mpeg4_m4v_FileTests.file.tag.firstPerformer, "Will Yapp");
        assert.equal(Mpeg4_m4v_FileTests.file.tag.title, "Why I Love Monty Python");
        assert.equal(Mpeg4_m4v_FileTests.file.tag.year, 2008);

        // Test Apple tags
        const tag: AppleTag = <AppleTag>Mpeg4_m4v_FileTests.file.getTag(TagTypes.Apple, false);
        assert.isDefined(tag);

        for (const adBox of tag.getDataBoxesFromType(Mpeg4_m4v_FileTests.boxTypeLdes)) {
            assert.equal(adBox.text, Mpeg4_m4v_FileTests.longDesc);
            gotLongDesc = true;
        }

        for (const adBox of tag.getDataBoxesFromType(Mpeg4_m4v_FileTests.boxTypePurd)) {
            assert.equal(adBox.text, Mpeg4_m4v_FileTests.purdDate);
            gotPurdDate = true;
        }

        assert.isTrue(gotLongDesc);
        assert.isTrue(gotPurdDate);
    }

    @test
    public writeAppleTags() {
        if (Mpeg4_m4v_FileTests.sampleFilePath !== Mpeg4_m4v_FileTests.tmpFilePath && fs.existsSync(Mpeg4_m4v_FileTests.tmpFilePath)) {
            fs.unlinkSync(Mpeg4_m4v_FileTests.tmpFilePath);
        }

        const shouldCreateTemp = Mpeg4_m4v_FileTests.sampleFilePath !== Mpeg4_m4v_FileTests.tmpFilePath;

        if (shouldCreateTemp) {
            fs.copyFileSync(Mpeg4_m4v_FileTests.sampleFilePath, Mpeg4_m4v_FileTests.tmpFilePath);
        }

        try {
            let tmpFile: File = File.createFromPath(Mpeg4_m4v_FileTests.tmpFilePath);
            let tag: AppleTag = <AppleTag>tmpFile.getTag(TagTypes.Apple, false);
            this.setTags(tag);
            tmpFile.save();

            tmpFile = File.createFromPath(Mpeg4_m4v_FileTests.tmpFilePath);
            tag = <AppleTag>tmpFile.getTag(TagTypes.Apple, false);
            this.checkTags(tag);
        } finally {
            Utilities.deleteBestEffort(Mpeg4_m4v_FileTests.tmpFilePath);
        }
    }
}
