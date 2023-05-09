import { assert } from "chai";
import { suite, test } from "@testdeck/mocha";

import ExtendedFileTests from "./utilities/extendedFileTests";
import TestConstants from "./utilities/testConstants";
import { ByteVector, File, MediaTypes, Mpeg4File, Properties, StringType, Tag, TagTypes } from "../src";
import { StandardFileTests, TestTagLevel } from "./utilities/standardFileTests";
import { AppleAdditionalInfoBox, IsoUserDataBox } from "../src/mpeg4/mpeg4Boxes";
import AppleTag from "../src/mpeg4/appleTag";

class Mpeg4TestFile extends Mpeg4File {

    public get udtaBoxes(): IsoUserDataBox[] {
        return super.udtaBoxes;
    }
}

@suite class Mpeg4_m4v_FileTests {
    private static readonly boxTypeLdes: ByteVector = ByteVector.fromString("ldes", StringType.UTF8).makeReadOnly(); // long description
    private static readonly boxTypeTvsh: ByteVector = ByteVector.fromString("tvsh", StringType.UTF8).makeReadOnly(); // TV Show or series
    private static readonly boxTypePurd: ByteVector = ByteVector.fromString("purd", StringType.UTF8).makeReadOnly(); // purchase date

    private static readonly longDesc: string = "American comedy luminaries talk about the influence of Monty Python.";
    private static readonly purdDate: string = "2009-01-26 08:14:10";
    private static readonly tvShow: string = "Ask An Astronomer";

    private static readonly sampleFilePath: string = TestConstants.getSampleFilePath("sample.m4v");
    private static readonly tmpFilePath: string = TestConstants.getTempFilePath("tmpwrite.m4v");

    private static file: File;

    public static before() {
        Mpeg4_m4v_FileTests.file = File.createFromPath(Mpeg4_m4v_FileTests.sampleFilePath);
    }

    public static after() {
        if (Mpeg4_m4v_FileTests.file) { Mpeg4_m4v_FileTests.file.dispose(); }
    }

    @test
    public readAudioProperties() {
        assert.equal(Mpeg4_m4v_FileTests.file.properties.videoWidth, 632);
        assert.equal(Mpeg4_m4v_FileTests.file.properties.videoHeight, 472);
    }

    @test
    public readTags() {
        const gotLongDesc: boolean = false;
        const gotPurdDate: boolean = false;

        assert.equal(Mpeg4_m4v_FileTests.file.tag.firstPerformer, "Will Yapp");
        assert.equal(Mpeg4_m4v_FileTests.file.tag.title, "Why I Love Monty Python");
        assert.equal(Mpeg4_m4v_FileTests.file.tag.year, 2008);

        // Test Apple tags
        const tag: AppleTag = <AppleTag>Mpeg4_m4v_FileTests.file.getTag(TagTypes.Apple, false);
        assert.isDefined(tag);
    }
}
