import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import {TagTesters, Testers} from "../utilities/testers";
import IsoUserDataBox from "../../src/mpeg4/boxes/isoUserDataBox";
import AppleTag from "../../src/mpeg4/appleTag";
import {ByteVector, Mpeg4BoxType, StringType, TagTypes} from "../../src";
import IsoMetaBox from "../../src/mpeg4/boxes/isoMetaBox";
import Mpeg4HandlerType from "../../src/mpeg4/mpeg4HandlerType";
import AppleItemListBox from "../../src/mpeg4/boxes/appleItemListBox";
import PropertyTests from "../utilities/propertyTests";
import AppleAnnotationBox from "../../src/mpeg4/boxes/appleAnnotationBox";
import {AppleDataBox, AppleDataBoxFlagType} from "../../src/mpeg4/boxes/appleDataBox";
import AppleAdditionalInfoBox from "../../src/mpeg4/boxes/appleAdditionalInfoBox";

@suite class AppleTag_ConstructorTests {
    @test
    public constructor_falsyUdtaBox() {
        // Act / Assert
        Testers.testTruthy((v: IsoUserDataBox) => new AppleTag(v));
    }

    @test
    public constructor_emptyUdtaBox() {
        // Arrange
        const udtaBox = IsoUserDataBox.fromEmpty();

        // Act
        const tag = new AppleTag(udtaBox);

        // Assert
        assert.isUndefined(tag.sizeOnDisk)
        assert.strictEqual(tag.tagTypes, TagTypes.Apple);
        TagTesters.testTagProperties(tag, {});
    }

    @test
    public constructor_emptyMetaBox() {
        // Arrange
        const metaBox = IsoMetaBox.fromHandler(Mpeg4HandlerType.MDIR, "foo");
        const udtaBox = IsoUserDataBox.fromEmpty();
        udtaBox.addChild(metaBox);

        // Act
        const tag = new AppleTag(udtaBox);

        // Assert
        assert.isUndefined(tag.sizeOnDisk)
        assert.strictEqual(tag.tagTypes, TagTypes.Apple);
        TagTesters.testTagProperties(tag, {});
    }

    @test
    public constructor_emptyIlstBox() {
        // Arrange
        const ilstBox = AppleItemListBox.fromEmpty();
        const metaBox = IsoMetaBox.fromHandler(Mpeg4HandlerType.MDIR, "foo");
        metaBox.addChild(ilstBox);
        const udtaBox = IsoUserDataBox.fromEmpty();
        udtaBox.addChild(metaBox);

        // Act
        const tag = new AppleTag(udtaBox);

        // Assert
        assert.isUndefined(tag.sizeOnDisk)
        assert.strictEqual(tag.tagTypes, TagTypes.Apple);
        TagTesters.testTagProperties(tag, {});
    }
}

@suite class AppleTag_PropertyTests {
    @test
    public title() {
        this.testQuickTimeString((t, v) => t.title = v, (t) => t.title, Mpeg4BoxType.NAM);
    }

    @test
    public subtitle() {
        this.testQuickTimeString((t, v) => t.subtitle = v, (t) => t.subtitle, Mpeg4BoxType.SUBT);
    }

    @test
    public description() {
        this.testQuickTimeString((t, v) => t.description = v, (t) => t.description, Mpeg4BoxType.DESC);
    }

    @test
    public performers() {
        this.testQuickTimeStrings((t, v) => t.performers = v, (t) => t.performers, Mpeg4BoxType.ART);
    }

    // TODO: Perfomers role

    @test
    public albumArtists() {
        this.testQuickTimeStrings((t, v) => t.albumArtists = v, (t) => t.albumArtists, Mpeg4BoxType.AART);
    }

    @test
    public composers() {
        this.testQuickTimeStrings((t, v) => t.composers = v, (t) => t.composers, Mpeg4BoxType.WRT);
    }

    @test
    public album() {
        this.testQuickTimeString((t, v) => t.album = v, (t) => t.album, Mpeg4BoxType.ALB);
    }

    @test
    public comment() {
        this.testQuickTimeString((t, v) => t.comment = v, (t) => t.comment, Mpeg4BoxType.CMT);
    }

    // @TODO: Genres

    // @TODO: Year

    @test
    public track() {
        this.testQuickTimeFractionalShort(
            (t, v) => t.track = v,
            (t) => t.track,
            (t, v) => t.trackCount = v,
            (t) => t.trackCount,
            Mpeg4BoxType.TRKN
        );
    }

    @test
    public disc() {
        this.testQuickTimeFractionalShort(
            (t, v) => t.disc = v,
            (t) => t.disc,
            (t, v) => t.discCount = v,
            (t) => t.discCount,
            Mpeg4BoxType.DISK
        );
    }

    @test
    public lyrics() {
        this.testQuickTimeString((t, v) => t.lyrics = v, (t) => t.lyrics, Mpeg4BoxType.LYR);
    }

    @test
    public grouping() {
        this.testQuickTimeString((t, v) => t.grouping = v, (t) => t.grouping, Mpeg4BoxType.GRP);
    }

    // @TODO: BPM

    @test
    public conductor() {
        this.testQuickTimeString((t, v) => t.conductor = v, (t) => t.conductor, Mpeg4BoxType.COND);
    }

    @test
    public copyright() {
        this.testQuickTimeString((t, v) => t.copyright = v, (t) => t.copyright, Mpeg4BoxType.CPRT);
    }

    // @TODO: date tagged

    @test
    public albumArtistsSort() {
        this.testQuickTimeStrings((t, v) => t.albumArtistsSort = v, (t) => t.albumArtistsSort, Mpeg4BoxType.SOAA);
    }

    @test
    public perfoemrsSort() {
        this.testQuickTimeStrings((t, v) => t.performersSort = v, (t) => t.performersSort, Mpeg4BoxType.SOAR);
    }

    @test
    public composersSort() {
        this.testQuickTimeStrings((t, v) => t.composersSort = v, (t) => t.composersSort, Mpeg4BoxType.SOCO);
    }

    @test
    public albumSort() {
        this.testQuickTimeString((t, v) => t.albumSort = v, (t) => t.albumSort, Mpeg4BoxType.SOAL);
    }

    @test
    public titleSort() {
        this.testQuickTimeString((t, v) => t.titleSort = v, (t) => t.titleSort, Mpeg4BoxType.SONM);
    }

    // @TODO musicbrainz artistid

    @test
    public musicBrainzReleaseGroupid() {
        this.testItunesString(
            (t, v) => t.musicBrainzReleaseGroupId = v,
            (t) => t.musicBrainzReleaseGroupId,
            "com.apple.iTunes",
            "MusicBrainz Release Group Id"
        );
    }

    @test
    public musicBrainzReleaseId() {
        this.testItunesString(
            (t, v) => t.musicBrainzReleaseId = v,
            (t) => t.musicBrainzReleaseId,
            "com.apple.iTunes",
            "MusicBrainz Album Id"
        );
    }

    // @TODO musicbrainz release artist id

    @test
    public musicBrainzTrackId() {
        this.testItunesString(
            (t, v) => t.musicBrainzTrackId = v,
            (t) => t.musicBrainzTrackId,
            "com.apple.iTunes",
            "MusicBrainz Track Id"
        );
    }

    @test
    public musicBrainzDiscId() {
        this.testItunesString(
            (t, v) => t.musicBrainzDiscId = v,
            (t) => t.musicBrainzDiscId,
            "com.apple.iTunes",
            "MusicBrainz Disc Id"
        );
    }

    @test
    public musicIdId() {
        this.testItunesString(
            (t, v) => t.musicIpId = v,
            (t) => t.musicIpId,
            "com.apple.iTunes",
            "MusicIP PUID"
        );
    }

    @test
    public amazonId() {
        this.testItunesString(
            (t, v) => t.amazonId = v,
            (t) => t.amazonId,
            "com.apple.iTunes",
            "ASIN"
        );
    }

    @test
    public musicBrainzReleaseStatus() {
        this.testItunesString(
            (t, v) => t.musicBrainzReleaseStatus = v,
            (t) => t.musicBrainzReleaseStatus,
            "com.apple.iTunes",
            "MusicBrainz Album Status"
        );
    }

    @test
    public musicBrainzReleaseType() {
        this.testItunesString(
            (t, v) => t.musicBrainzReleaseType = v,
            (t) => t.musicBrainzReleaseType,
            "com.apple.iTunes",
            "MusicBrainz Album Type"
        );
    }

    @test
    public musicBrainzReleaseCountry() {
        this.testItunesString(
            (t, v) => t.musicBrainzReleaseCountry = v,
            (t) => t.musicBrainzReleaseCountry,
            "com.apple.iTunes",
            "MusicBrainz Album Release Country"
        );
    }

    // @TODO Replay gain

    @test
    public initialKey() {
        this.testItunesString(
            (t, v) => t.initialKey = v,
            (t) => t.initialKey,
            "com.apple.iTunes",
            "initialkey"
        );
    }

    @test
    public isrc() {
        this.testItunesString(
            (t, v) => t.isrc = v,
            (t) => t.isrc,
            "com.apple.iTunes",
            "ISRC"
        );
    }

    @test
    public publisher() {
        this.testItunesString(
            (t, v) => t.publisher = v,
            (t) => t.publisher,
            "com.apple.iTunes",
            "publisher"
        );
    }

    @test
    public remixedBy() {
        this.testItunesString(
            (t, v) => t.remixedBy = v,
            (t) => t.remixedBy,
            "com.apple.iTunes",
            "REMIXEDBY"
        );
    }

    // @TODO: Pictures

    private testItunesString(
        setter: (t: AppleTag, v: string) => void,
        getter: (t: AppleTag) => string,
        mean: string,
        name: string
    ) {
        // TEST CASE 1: Undefined when empty -------------------------------
        // Arrange
        const testTag1 = this.getEmptyTag();

        // Act / Assert
        assert.isUndefined(getter(testTag1.tag));

        // TEST CASE 2: Round trip from empty ------------------------------
        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v: string) => setter(testTag1.tag, v),
            () => getter(testTag1.tag),
            "foo");
        this.assertItunesBox(testTag1.ilst, mean, name, "foo");

        // TEST CASE 3: Multiple boxes return first instance ---------------
        // Arrange
        const box1 = this.getItunesBox(mean, name, "foo");
        const box2 = this.getItunesBox(mean, name, "bar");
        const box3 = this.getItunesBox(mean, "foo", "baz");
        const box4 = this.getItunesBox("foo", name, "floo");

        const meanBox5 = AppleAdditionalInfoBox.fromTypeVersionAndFlags(
            Mpeg4BoxType.MEAN,
            0,
            AppleDataBoxFlagType.ContainsData);
        meanBox5.text = mean;
        const nameBox5 = AppleAdditionalInfoBox.fromTypeVersionAndFlags(
            Mpeg4BoxType.NAME,
            0,
            AppleDataBoxFlagType.ContainsData);
        nameBox5.text = name;
        const box5 = AppleAnnotationBox.fromType(Mpeg4BoxType.ITUNES_TAG_BOX);
        box5.addChild(meanBox5);
        box5.addChild(nameBox5);
        box5.addChild(box1.dataBox);
        box5.addChild(box2.dataBox);
        box5.addChild(box3.dataBox);
        box5.addChild(box4.dataBox);

        const testTag2 = this.getEmptyTag([box1.box, box2.box, box3.box, box4.box, box5]);

        // Act / Assert
        assert.strictEqual(getter(testTag2.tag), "foo");

        // TEST CASE 4: Setting multiple boxes should clear them -----------
        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => setter(testTag2.tag, v), () => getter(testTag2.tag), "fux");
        this.assertItunesBox(testTag2.ilst, mean, name, "fux");

        // TEST CASE 5: Setting to undefined should remove boxes -----------
        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => setter(testTag2.tag, v), () => getter(testTag2.tag), undefined);
        PropertyTests.propertyNormalized((v) => setter(testTag2.tag, v), () => getter(testTag2.tag), null, undefined);
        PropertyTests.propertyNormalized((v) => setter(testTag2.tag, v), () => getter(testTag2.tag), "", undefined);

        const childBoxes = testTag2.ilst.getItunesTagBoxes(mean, name);
        assert.isOk(childBoxes);
        assert.isEmpty(childBoxes);
    }

    private testQuickTimeFractionalShort(
        setNumer: (t: AppleTag, v: number) => void,
        getNumer: (t: AppleTag) => number,
        setDenom: (t: AppleTag, v: number) => void,
        getDenom: (t: AppleTag) => number,
        boxType: ByteVector
    ) {
        // TEST CASE 1: 0 when empty ---------------------------------------
        // Arrange
        const testTag1 = this.getEmptyTag();

        // Act / Assert
        assert.strictEqual(getNumer(testTag1.tag), 0);
        assert.strictEqual(getDenom(testTag1.tag), 0);

        // TEST CASE 2: Invalid values -------------------------------------
        // Act / Assert
        Testers.testUshort((v: number) => setNumer(testTag1.tag, v));
        Testers.testUshort((v: number) => setDenom(testTag1.tag, v));
        assert.strictEqual(getNumer(testTag1.tag), 0);
        assert.strictEqual(getDenom(testTag1.tag), 0);
        assert.isEmpty(testTag1.ilst.children);

        // TEST CASE 3: Set numerator w/o denominator ----------------------
        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => setNumer(testTag1.tag, v),
            () => getNumer(testTag1.tag),
            123
        );
        assert.strictEqual(getDenom(testTag1.tag), 0);
        this.assertQuickTimeBox(
            testTag1.ilst,
            boxType,
            ByteVector.fromByteArray([0x00, 0x00, 0x00, 0x7B, 0x00, 0x00, 0x00, 0x00]),
            AppleDataBoxFlagType.ContainsData
        );

        // TEST CASE 4: Set denominator w/o numerator ----------------------
        // Act / Assert
        const testTag2 = this.getEmptyTag();
        PropertyTests.propertyRoundTrip((v) => setDenom(testTag2.tag, v), () => getDenom(testTag2.tag), 123);
        assert.strictEqual(getNumer(testTag2.tag), 0);
        this.assertQuickTimeBox(
            testTag2.ilst,
            boxType,
            ByteVector.fromByteArray([0x00, 0x00, 0x00, 0x00, 0x00, 0x7B, 0x00, 0x00]),
            AppleDataBoxFlagType.ContainsData
        );

        // TEST CASE 4: Multiple boxes return first instance
        // Arrange
        const value1 = ByteVector.fromByteArray([0x00, 0x00, 0x00, 0x7B, 0x00, 0x7A, 0x00, 0x00]);
        const box1 = this.getQuickTimeBox(boxType, value1, AppleDataBoxFlagType.ContainsData);

        const value2 = ByteVector.fromByteArray([0x00, 0x00, 0x00, 0x7C, 0x00, 0x00, 0x00, 0x00]);
        const box2 = this.getQuickTimeBox(boxType, value2, AppleDataBoxFlagType.ContainsData);

        const value3 = ByteVector.fromByteArray([0x00, 0x00, 0x00, 0x00, 0x00, 0x79, 0x00, 0x00]);
        const box3 = this.getQuickTimeBox(boxType, value3, AppleDataBoxFlagType.ContainsData);

        const value4 = ByteVector.fromByteArray([0x00, 0x00, 0x00, 0x7D, 0x00, 0x78, 0x00, 0x00]);
        const box4 = this.getQuickTimeBox(boxType, value4, AppleDataBoxFlagType.ContainsData);

        const testTag3 = this.getEmptyTag([box1.box, box2.box, box3.box, box4.box]);

        // Act / Assert
        assert.strictEqual(getNumer(testTag3.tag), 123);
        assert.strictEqual(getDenom(testTag3.tag), 122);

        // TEST CASE 5: Setting should clear multiple boxes ----------------
        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => setNumer(testTag3.tag, v), () => getNumer(testTag3.tag), 888);
        PropertyTests.propertyRoundTrip((v) => setDenom(testTag3.tag, v), () => getDenom(testTag3.tag), 999);
        this.assertQuickTimeBox(
            testTag3.ilst,
            boxType,
            ByteVector.fromByteArray([0x00, 0x00, 0x03, 0x78, 0x03, 0xE7, 0x00, 0x00]),
            AppleDataBoxFlagType.ContainsData
        );

        // TEST CASE 6: Setting to 0 to should remove boxes ----------------
        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => setNumer(testTag3.tag, v), () => getNumer(testTag3.tag), 0);
        PropertyTests.propertyRoundTrip((v) => setDenom(testTag3.tag, v), () => getDenom(testTag3.tag), 0);
        assert.isEmpty(testTag3.ilst.children);
    }

    private testQuickTimeString(
        setter: (t: AppleTag, v: string) => void,
        getter: (t: AppleTag) => string,
        boxType: ByteVector
    ) {
        // TEST CASE 1: Undefined when empty -------------------------------
        // Arrange
        const testTag1 = this.getEmptyTag();

        // Act / Assert
        assert.isUndefined(getter(testTag1.tag));

        // TEST CASE 2: Round trip from empty ------------------------------
        // Act / Assert
        PropertyTests.propertyRoundTrip((v: string) => setter(testTag1.tag, v), () => getter(testTag1.tag), "foo");

        let childBoxes = testTag1.ilst.getChildren<AppleAnnotationBox>(boxType);
        assert.isOk(childBoxes);
        assert.strictEqual(childBoxes.length, 1);
        let childBox = childBoxes[0];
        Testers.bvEqual(childBox.boxType, boxType);

        let dataBox = childBox.getChild<AppleDataBox>(Mpeg4BoxType.DATA);
        assert.isOk(dataBox);
        assert.strictEqual(dataBox.flags, AppleDataBoxFlagType.ContainsText);
        Testers.bvEqual(dataBox.boxType, Mpeg4BoxType.DATA);
        Testers.bvEqual(dataBox.data, ByteVector.fromString("foo", StringType.UTF8));

        // TEST CASE 3: Multiple boxes return first instance ---------------
        // Arrange
        const dataBox1 = AppleDataBox.fromDataAndFlags(
            ByteVector.fromString("foo", StringType.UTF8),
            AppleDataBoxFlagType.ContainsText
        );
        const box1 = AppleAnnotationBox.fromType(boxType);
        box1.addChild(dataBox1);

        const dataBox2 = AppleDataBox.fromDataAndFlags(
            ByteVector.fromString("bar", StringType.UTF8),
            AppleDataBoxFlagType.ContainsText
        );
        const box2 = AppleAnnotationBox.fromType(boxType);
        box2.addChild(dataBox2);

        const dataBox3 = AppleDataBox.fromDataAndFlags(
            ByteVector.fromString("baz", StringType.UTF8),
            AppleDataBoxFlagType.ContainsData
        );
        const box3 = AppleAnnotationBox.fromType(boxType);
        box3.addChild(dataBox3);

        const box4 = AppleAnnotationBox.fromType(boxType);
        box4.addChild(dataBox1);
        box4.addChild(dataBox2);
        box4.addChild(dataBox3);

        const testTag2 = this.getEmptyTag([box1, box2, box3, box4]);

        // Act
        const value = getter(testTag2.tag);

        // Assert
        assert.strictEqual(value, "foo");

        // TEST CASE 4: Setting multiple boxes should clear them -----------
        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => setter(testTag2.tag, v), () => getter(testTag2.tag), "fux");

        childBoxes = testTag2.ilst.getChildren<AppleAnnotationBox>(boxType);
        assert.isOk(childBoxes);
        assert.strictEqual(childBoxes.length, 1);
        childBox = childBoxes[0];
        Testers.bvEqual(childBox.boxType, boxType);

        dataBox = childBox.getChild<AppleDataBox>(Mpeg4BoxType.DATA);
        assert.isOk(dataBox);
        assert.strictEqual(dataBox.flags, AppleDataBoxFlagType.ContainsText);
        Testers.bvEqual(dataBox.boxType, Mpeg4BoxType.DATA);
        Testers.bvEqual(dataBox.data, ByteVector.fromString("fux", StringType.UTF8));

        // TEST CASE 5: Setting to undefined should remove boxes -----------
        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => setter(testTag2.tag, v), () => getter(testTag2.tag), undefined);
        PropertyTests.propertyNormalized((v) => setter(testTag2.tag, v), () => getter(testTag2.tag), null, undefined);
        PropertyTests.propertyNormalized((v) => setter(testTag2.tag, v), () => getter(testTag2.tag), "", undefined);

        childBoxes = testTag2.ilst.getChildren<AppleAnnotationBox>(boxType);
        assert.isOk(childBoxes);
        assert.isEmpty(childBoxes);
    }

    private testQuickTimeStrings(
        setter: (t: AppleTag, v: string[]) => void,
        getter: (t: AppleTag) => string[],
        boxType: ByteVector
    ) {
        // TEST CASE 1: Empty when empty -----------------------------------
        // Arrange
        const testTag1 = this.getEmptyTag();

        // Act / Assert
        let value = getter(testTag1.tag);
        assert.isOk(value);
        assert.isEmpty(value);

        // TEST CASE 2: Round trip from empty ------------------------------
        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v: string[]) => setter(testTag1.tag, v),
            () => getter(testTag1.tag),
            ["foo", "bar", "baz"]
        );

        let childBoxes = testTag1.ilst.getChildren<AppleAnnotationBox>(boxType);
        assert.isOk(childBoxes);
        assert.strictEqual(childBoxes.length, 1);
        let childBox = childBoxes[0];
        Testers.bvEqual(childBox.boxType, boxType);

        let dataBox = childBox.getChild<AppleDataBox>(Mpeg4BoxType.DATA);
        assert.isOk(dataBox);
        assert.strictEqual(dataBox.flags, AppleDataBoxFlagType.ContainsText);
        Testers.bvEqual(dataBox.boxType, Mpeg4BoxType.DATA);
        Testers.bvEqual(dataBox.data, ByteVector.fromString("foo; bar; baz", StringType.UTF8));

        // TEST CASE 3: Multiple boxes return all valid instances ----------
        // Valid box type and flags
        const box1 = this.getQuickTimeBox(boxType, ByteVector.fromString("foo", StringType.UTF8));
        // Valid box type and flags
        const box2 = this.getQuickTimeBox(boxType, ByteVector.fromString("bar", StringType.UTF8));
        // Valid box type, invalid flags
        const box3 = this.getQuickTimeBox(
            boxType,
            ByteVector.fromString("baz", StringType.UTF8),
            AppleDataBoxFlagType.ContainsData
        );
        // Incorrect number of DATA boxes
        const box4 = AppleAnnotationBox.fromType(boxType);
        box4.addChild(box1.dataBox);
        box4.addChild(box2.dataBox);
        box4.addChild(box3.dataBox);
        // Multiple values in single data box
        const box5 = this.getQuickTimeBox(boxType, ByteVector.fromString("fux; bux; quxx", StringType.UTF8));

        const testTag2 = this.getEmptyTag([box1.box, box2.box, box3.box, box4, box5.box]);

        // Act
        value = getter(testTag2.tag);

        // Assert
        assert.deepStrictEqual(value, ["foo", "bar", "foo", "bar", "fux", "bux", "quxx"]);

        // TEST CASE 4: Setting multiple boxes should clear them -----------
        PropertyTests.propertyRoundTrip(
            (v) => setter(testTag2.tag, v),
            () => getter(testTag2.tag),
            ["floo", "blarr", "blagg"]
        );

        childBoxes = testTag2.ilst.getChildren<AppleAnnotationBox>(boxType);
        assert.isOk(childBoxes);
        assert.strictEqual(childBoxes.length, 1);
        childBox = childBoxes[0];
        Testers.bvEqual(childBox.boxType, boxType);

        dataBox = childBox.getChild<AppleDataBox>(Mpeg4BoxType.DATA);
        assert.isOk(dataBox);
        assert.strictEqual(dataBox.flags, AppleDataBoxFlagType.ContainsText);
        Testers.bvEqual(dataBox.boxType, Mpeg4BoxType.DATA);
        Testers.bvEqual(dataBox.data, ByteVector.fromString("floo; blarr; blagg", StringType.UTF8));

        // TEST CASE 5: Setting to undefined should remove boxes
        PropertyTests.propertyNormalized((v) => setter(testTag2.tag, v), () => getter(testTag2.tag), undefined, []);
        PropertyTests.propertyNormalized((v) => setter(testTag2.tag, v), () => getter(testTag2.tag), null, []);
        PropertyTests.propertyRoundTrip((v) => setter(testTag2.tag, v), () => getter(testTag2.tag), []);

        childBoxes = testTag2.ilst.getChildren<AppleAnnotationBox>(boxType);
        assert.isOk(childBoxes);
        assert.isEmpty(childBoxes);
    }

    private assertItunesBox(
        ilst: AppleItemListBox,
        mean: string,
        name: string,
        expectedValue: string
    ): void {
        const childBoxes = ilst.getItunesTagBoxes(mean, name);
        assert.isOk(childBoxes);
        assert.strictEqual(childBoxes.length, 1);
        const childBox = childBoxes[0];
        Testers.bvEqual(childBox.boxType, Mpeg4BoxType.ITUNES_TAG_BOX);

        const meanBoxes = childBox.getChildren<AppleAdditionalInfoBox>(Mpeg4BoxType.MEAN);
        assert.isOk(meanBoxes);
        assert.strictEqual(meanBoxes.length, 1);
        const meanBox = meanBoxes[0];
        Testers.bvEqual(meanBox.boxType, Mpeg4BoxType.MEAN);
        assert.strictEqual(meanBox.text, mean);

        const nameBoxes = childBox.getChildren<AppleAdditionalInfoBox>(Mpeg4BoxType.NAME);
        assert.isOk(nameBoxes);
        assert.strictEqual(nameBoxes.length, 1);
        const nameBox = nameBoxes[0];
        Testers.bvEqual(nameBox.boxType, Mpeg4BoxType.NAME);
        assert.strictEqual(nameBox.text, name);

        const dataBoxes = childBox.getChildren<AppleDataBox>(Mpeg4BoxType.DATA);
        assert.isOk(dataBoxes);
        assert.strictEqual(nameBoxes.length, 1);
        const dataBox = dataBoxes[0];
        Testers.bvEqual(dataBox.boxType, Mpeg4BoxType.DATA);
        assert.strictEqual(dataBox.text, expectedValue);
    }

    private assertQuickTimeBox(
        ilst: AppleItemListBox,
        boxType: ByteVector,
        expectedValue: ByteVector,
        expectedFlags: AppleDataBoxFlagType = AppleDataBoxFlagType.ContainsText
    ): void {
        const childBoxes = ilst.getChildren<AppleAnnotationBox>(boxType);
        assert.isOk(childBoxes);
        assert.strictEqual(childBoxes.length, 1);
        const childBox = childBoxes[0];
        Testers.bvEqual(childBox.boxType, boxType);

        const dataBox = childBox.getChild<AppleDataBox>(Mpeg4BoxType.DATA);
        assert.isOk(dataBox);
        assert.strictEqual(dataBox.flags, expectedFlags);
        Testers.bvEqual(dataBox.boxType, Mpeg4BoxType.DATA);
        Testers.bvEqual(dataBox.data, expectedValue);
    }

    private getEmptyTag(boxes?: AppleAnnotationBox[]): {tag: AppleTag, ilst: AppleItemListBox} {
        const ilstBox = AppleItemListBox.fromEmpty();
        if (boxes) {
            boxes.forEach(b => ilstBox.addChild(b));
        }

        const metaBox = IsoMetaBox.fromHandler(Mpeg4HandlerType.MDIR, "foo");
        metaBox.addChild(ilstBox);
        const udtaBox = IsoUserDataBox.fromEmpty();
        udtaBox.addChild(metaBox);

        return {
            ilst: ilstBox,
            tag: new AppleTag(udtaBox)
        };
    }

    private getItunesBox(
        mean: string,
        name: string,
        value: string
    ): {box: AppleAnnotationBox, dataBox: AppleDataBox} {
        const meanBox = AppleAdditionalInfoBox.fromTypeVersionAndFlags(
            Mpeg4BoxType.MEAN,
            0,
            AppleDataBoxFlagType.ContainsData
        );
        meanBox.text = mean;
        const nameBox = AppleAdditionalInfoBox.fromTypeVersionAndFlags(
            Mpeg4BoxType.NAME,
            0,
            AppleDataBoxFlagType.ContainsData
        );
        nameBox.text = name;
        const dataBox = AppleDataBox.fromDataAndFlags(
            ByteVector.fromString(value, StringType.UTF8),
            AppleDataBoxFlagType.ContainsText
        );
        const box = AppleAnnotationBox.fromType(Mpeg4BoxType.ITUNES_TAG_BOX);
        box.addChild(meanBox);
        box.addChild(nameBox);
        box.addChild(dataBox);

        return { box: box, dataBox: dataBox };
    }

    private getQuickTimeBox(
        boxType: ByteVector,
        value: ByteVector,
        flags: AppleDataBoxFlagType = AppleDataBoxFlagType.ContainsText
    ): {box: AppleAnnotationBox, dataBox: AppleDataBox} {
        const dataBox = AppleDataBox.fromDataAndFlags(value, flags);
        const box = AppleAnnotationBox.fromType(boxType);
        box.addChild(dataBox);

        return {box: box, dataBox: dataBox};
    }
}
