import * as TypeMoq from "typemoq";
import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import ApeTag from "../../src/ape/apeTag";
import PropertyTests from "../utilities/propertyTests";
import TestFile from "../utilities/testFile";
import {ApeTagFooter, ApeTagFooterFlags} from "../../src/ape/apeTagFooter";
import {ApeTagItem, ApeTagItemType} from "../../src/ape/apeTagItem";
import {ByteVector, StringType} from "../../src/byteVector";
import {File} from "../../src/file";
import {IPicture, PictureType} from "../../src/picture";
import {TagTypes} from "../../src/tag";
import {Testers} from "../utilities/testers";

const getTestTagFooter = (flags: ApeTagFooterFlags, itemCount: number, itemPlusFooter: number): ByteVector => {
    return ByteVector.concatenate(
        ApeTagFooter.FILE_IDENTIFIER,
        ByteVector.fromUint(2000, false),
        ByteVector.fromUint(itemPlusFooter, false),
        ByteVector.fromUint(itemCount, false),
        ByteVector.fromUint(flags, false),
        ByteVector.fromSize(8)
    );
}

@suite class Ape_Tag_ConstructorTests {
    @test
    public fromData_falsyData() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { ApeTag.fromData(v); });
    }

    @test
    public fromData_dataIsWayTooShort() {
        // Arrange
        const data = ByteVector.fromSize(8);

        // Act / Assert
        assert.throws(() => { ApeTag.fromData(data); });
    }

    @test
    public fromData_footerWasAHeader() {
        // Arrange
        const data = getTestTagFooter(ApeTagFooterFlags.IsHeader, 0, 10);

        // Act / Assert
        assert.throws(() => { ApeTag.fromData(data); });
    }

    @test
    public fromData_dataTooShort() {
        // Arrange
        const data = getTestTagFooter(0, 0, 100);

        // Act / Assert
        assert.throws(() => { ApeTag.fromData(data); });
    }

    @test
    public fromData_emptyTag() {
        // Arrange
        const data = getTestTagFooter(ApeTagFooterFlags.HeaderPresent, 0, ApeTagFooter.SIZE);

        // Act
        const tag = ApeTag.fromData(data);

        // Assert
        assert.isOk(tag);
        assert.isTrue(tag.isEmpty);
        assert.isTrue(tag.isHeaderPresent);
        assert.strictEqual(tag.tagTypes, TagTypes.Ape);
        assert.deepStrictEqual(tag.items, []);
    }

    @test
    public fromData_tagWithItems() {
        // Arrange
        const item1 = ApeTagItem.fromTextValues("key1", "value1").render();
        const item2 = ApeTagItem.fromTextValues("key2", "value2").render();
        const data = ByteVector.concatenate(
            item1,
            item2,
            getTestTagFooter(0, 3, item1.length + item2.length + ApeTagFooter.SIZE)
        );

        // Act
        const tag = ApeTag.fromData(data);

        // Assert
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
        assert.isFalse(tag.isHeaderPresent);
        assert.strictEqual(tag.tagTypes, TagTypes.Ape);

        let item1Found = false;
        let item2Found = false;
        for (const item of tag.items) {
            switch (item.key) {
                case "key1":
                    assert.isFalse(item1Found);
                    assert.deepStrictEqual(item.text, ["value1"]);
                    item1Found = true;
                    break;
                case "key2":
                    assert.isFalse(item2Found);
                    assert.deepStrictEqual(item.text, ["value2"]);
                    item2Found = true;
                    break;
                default:
                    assert.fail(item.key, undefined, "Unexpected item found");
            }
        }
        assert.isTrue(item1Found);
        assert.isTrue(item2Found);
    }

    @test
    public fromEmpty() {
        // Act
        const tag = ApeTag.fromEmpty();

        // Assert
        assert.isOk(tag);
        assert.isTrue(tag.isEmpty);
        assert.isFalse(tag.isHeaderPresent);
        assert.strictEqual(tag.tagTypes, TagTypes.Ape);
        assert.deepStrictEqual(tag.items, []);
    }

    @test
    public fromFile_invalidParams() {
        // Arrange
        const mockFile = TypeMoq.Mock.ofType<File>();
        mockFile.setup((f: File) => f.length).returns(() => 14);

        // Act / Assert
        Testers.testTruthy((v: File) => { ApeTag.fromFile(v, 0); });
        Testers.testUint((v: number) => { ApeTag.fromFile(mockFile.object, v); });
        assert.throws(() => { ApeTag.fromFile(mockFile.object, 5); });
    }

    @test
    public fromFile_emptyTag() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10),
            getTestTagFooter(ApeTagFooterFlags.HeaderPresent, 0, ApeTagFooter.SIZE)
        );
        const file = TestFile.getFile(data);

        // Act
        const tag = ApeTag.fromFile(file, 10);

        // Assert
        assert.isOk(tag);
        assert.isTrue(tag.isEmpty);
        assert.isTrue(tag.isHeaderPresent);
        assert.deepStrictEqual(tag.items, []);
    }

    @test
    public fromFile_positionIsAtFooter() {
        // Arrange
        const item1 = ApeTagItem.fromTextValues("key1", "value1").render();
        const item2 = ApeTagItem.fromTextValues("key2", "value2").render();
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10),
            item1,
            item2,
            getTestTagFooter(0, 3, item1.length + item2.length + ApeTagFooter.SIZE)
        );
        const footerPosition = item1.length + item2.length + 10;
        const file = TestFile.getFile(data);

        // Act
        const tag = ApeTag.fromFile(file, footerPosition);

        // Assert
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
        assert.isFalse(tag.isHeaderPresent);
        assert.strictEqual(tag.tagTypes, TagTypes.Ape);

        let item1Found = false;
        let item2Found = false;
        for (const item of tag.items) {
            switch (item.key) {
                case "key1":
                    assert.isFalse(item1Found);
                    assert.deepStrictEqual(item.text, ["value1"]);
                    item1Found = true;
                    break;
                case "key2":
                    assert.isFalse(item2Found);
                    assert.deepStrictEqual(item.text, ["value2"]);
                    item2Found = true;
                    break;
                default:
                    assert.fail(item.key, undefined, "Unexpected item found");
            }
        }
        assert.isTrue(item1Found);
        assert.isTrue(item2Found);
    }

    @test
    public fromFile_positionIsAtHeader() {
        // Arrange
        const flags = (ApeTagFooterFlags.IsHeader | ApeTagFooterFlags.HeaderPresent) >>> 0;
        const header = getTestTagFooter(flags, 0, ApeTagFooter.SIZE);
        const footer = getTestTagFooter(ApeTagFooterFlags.HeaderPresent, 0, ApeTagFooter.SIZE);
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10),
            header,
            footer
        );
        const file = TestFile.getFile(data);

        // Act
        const tag = ApeTag.fromFile(file, 10);

        // Assert
        assert.isOk(tag);
        assert.isTrue(tag.isEmpty);
        assert.isTrue(tag.isHeaderPresent);
        assert.strictEqual(tag.tagTypes, TagTypes.Ape);
        assert.deepStrictEqual(tag.items, []);
    }

    // @TODO: Should we test footer absent flags? I'm pretty sure that *doesn't* work at all
}

@suite class Ape_Tag_PropertyTests {
    @test
    public title() {
        this.testTextItem((t, v) => { t.title = v; }, (t) => t.title, "Title");
    }

    @test
    public titleSort() {
        this.testTextItem((t, v) => { t.titleSort = v; }, (t) => t.titleSort, "TitleSort");
    }

    @test
    public subtitle() {
        this.testTextItem((t, v) => { t.subtitle = v; }, (t) => t.subtitle, "Subtitle");
    }

    @test
    public description() {
        this.testTextItem((t, v) => { t.description = v; }, (t) => t.description, "Description");
    }

    @test
    public performers() {
        this.testTextArrayItem((t, v) => { t.performers = v; }, (t) => t.performers, "Artist");
    }

    @test
    public performersSort() {
        this.testTextArrayItem((t, v) => { t.performersSort = v; }, (t) => t.performersSort, "ArtistSort");
    }

    @test
    public performersRole() {
        this.testTextArrayItem((t, v) => { t.performersRole = v; }, (t) => t.performersRole, "PerformersRole");
    }

    @test
    public albumArtists_hasAlbumArtistItem() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const setProp = (v: string[]) => { tag.albumArtists = v; };
        const getProp = () => tag.albumArtists;

        // Act / Assert
        assert.deepStrictEqual(getProp(), []);

        // Can read from the AlbumArtist item
        const albumArtistItem = ApeTagItem.fromTextValues("AlbumArtist", "foo", "bar", "baz");
        tag.items.push(albumArtistItem);
        assert.deepStrictEqual(getProp(), ["foo", "bar", "baz"]);

        // Ensure Album Artist item is added and AlbumArtist is updated
        PropertyTests.propertyRoundTrip(setProp, getProp, ["fux", "bux", "qux"]);
        assert.strictEqual(tag.items.length, 2);
        assert.strictEqual(tag.items[0].key, "AlbumArtist");
        assert.deepStrictEqual(tag.items[0].text, ["fux", "bux", "qux"]);
        assert.strictEqual(tag.items[1].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[1].key, "Album Artist");
        assert.deepStrictEqual(tag.items[1].text, ["fux", "bux", "qux"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, []);
        assert.strictEqual(tag.items.length, 0);
    }

    @test
    public albumArtists_noAlbumArtistItem() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const setProp = (v: string[]) => { tag.albumArtists = v; };
        const getProp = () => tag.albumArtists;

        // Act / Assert
        assert.deepStrictEqual(getProp(), []);

        PropertyTests.propertyRoundTrip(setProp, getProp, ["foo", "bar", "baz"]);
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, "Album Artist");
        assert.deepStrictEqual(tag.items[0].text, ["foo", "bar", "baz"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, []);
        assert.strictEqual(tag.items.length, 0);
    }

    @test
    public albumArtists_mismatchedAlbumArtistItems() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const setProp = (v: string[]) => { tag.albumArtists = v; };
        const getProp = () => tag.albumArtists;

        // Act / Assert
        // Reads from Album Artist preferentially
        const albumArtistItem1 = ApeTagItem.fromTextValues("AlbumArtist", "foo", "bar", "baz");
        tag.items.push(albumArtistItem1);
        const albumArtistItem2 = ApeTagItem.fromTextValues("Album Artist", "fux", "bux", "qux");
        tag.items.push(albumArtistItem2);
        assert.deepStrictEqual(getProp(), ["fux", "bux", "qux"]);

        // Ensure Album Artist item is added and AlbumArtist is updated
        PropertyTests.propertyRoundTrip(setProp, getProp, ["fux", "bux", "qux"]);
        assert.strictEqual(tag.items.length, 2);
        assert.strictEqual(tag.items[0].key, "AlbumArtist");
        assert.deepStrictEqual(tag.items[0].text, ["fux", "bux", "qux"]);
        assert.strictEqual(tag.items[1].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[1].key, "Album Artist");
        assert.deepStrictEqual(tag.items[1].text, ["fux", "bux", "qux"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, []);
        assert.strictEqual(tag.items.length, 0);
    }

    @test
    public albumArtistsSort() {
        this.testTextArrayItem((t, v) => { t.albumArtistsSort = v; }, (t) => t.albumArtistsSort, "AlbumArtistSort");
    }

    @test
    public composers() {
        this.testTextArrayItem((t, v) => { t.composers = v; }, (t) => t.composers, "Composer");
    }

    @test
    public composersSort() {
        this.testTextArrayItem((t, v) => { t.composersSort = v; }, (t) => t.composersSort, "ComposerSort");
    }

    @test
    public album() {
        this.testTextItem((t, v) => { t.album = v; }, (t) => t.album, "Album");
    }

    @test
    public albumSort() {
        this.testTextItem((t, v) => { t.albumSort = v; }, (t) => t.albumSort, "AlbumSort");
    }

    @test
    public comment() {
        this.testTextItem((t, v) => { t.comment = v; }, (t) => t.comment, "Comment");
    }

    @test
    public genres() {
        this.testTextArrayItem((t, v) => { t.genres = v; }, (t) => t.genres, "Genre");
    }

    @test
    public year() {
        this.testUintItem((t, v) => { t.year = v; }, (t) => t.year, "Year");
    }

    @test
    public year_invalidStoredValue() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const yearItem = ApeTagItem.fromTextValues("Year", "bloop");
        tag.items.push(yearItem);

        // Act / Assert
        assert.strictEqual(tag.year, 0);
    }

    @test
    public trackAndCount() {
        this.testFractionalUintItem(
            (t, v) => { t.track = v; },
            (t) => t.track,
            (t, v) => { t.trackCount = v; },
            (t) => t.trackCount,
            "Track"
        );
    }

    @test
    public discAndCount() {
        this.testFractionalUintItem(
            (t, v) => { t.disc = v; },
            (t) => t.disc,
            (t, v) => { t.discCount = v; },
            (t) => t.discCount,
            "Disc"
        );
    }

    @test
    public lyrics() {
        this.testTextItem((t, v) => { t.lyrics = v; }, (t) => t.lyrics, "Lyrics");
    }

    @test
    public grouping() {
        this.testTextItem((t, v) => { t.grouping = v; }, (t) => t.grouping, "Grouping");
    }

    @test
    public beatsPerMinutes() {
        this.testUintItem((t, v) => { t.beatsPerMinute = v; }, (t) => t.beatsPerMinute, "BPM");
    }

    @test
    public conductor() {
        this.testTextItem((t, v) => { t.conductor = v; }, (t) => t.conductor, "Conductor");
    }

    @test
    public copyright() {
        this.testTextItem((t, v) => { t.copyright = v; }, (t) => t.copyright, "Copyright");
    }

    @test
    public dateTagged() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const set = (v: Date) => { tag.dateTagged = v; };
        const get = () => tag.dateTagged;

        // Act / Assert
        assert.isUndefined(tag.dateTagged);

        PropertyTests.propertyRoundTrip(set, get, new Date("2020-04-25 12:34:56"));
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, "DateTagged");
        assert.deepStrictEqual(tag.items[0].text, ["2020-04-25T12:34:56"]);

        tag.items[0] = ApeTagItem.fromTextValues("DateTagged", "buncha_garbage");
        assert.isUndefined(tag.dateTagged);

        PropertyTests.propertyRoundTrip(set, get, undefined);
        assert.strictEqual(tag.items.length, 0);
    }

    @test
    public musicBrainzArtistId() {
        this.testTextItem(
            (t, v) => { t.musicBrainzArtistId = v; },
            (t) => t.musicBrainzArtistId,
            "MUSICBRAINZ_ARTISTID"
        );
    }

    @test
    public musicBrainzReleaseGroupId() {
        this.testTextItem(
            (t, v) => { t.musicBrainzReleaseGroupId = v; },
            (t) => t.musicBrainzReleaseGroupId,
            "MUSICBRAINZ_RELEASEGROUPID"
        );
    }

    @test
    public musicBrainzReleaseId() {
        this.testTextItem(
            (t, v) => { t.musicBrainzReleaseId = v; },
            (t) => t.musicBrainzReleaseId,
            "MUSICBRAINZ_ALBUMID"
        );
    }

    @test
    public musicBrainzReleaseArtistId() {
        this.testTextItem(
            (t, v) => { t.musicBrainzReleaseArtistId = v; },
            (t) => t.musicBrainzReleaseArtistId,
            "MUSICBRAINZ_ALBUMARTISTID"
        );
    }

    @test
    public musicBrainzTrackId() {
        this.testTextItem(
            (t, v) => { t.musicBrainzTrackId = v; },
            (t) => t.musicBrainzTrackId,
            "MUSICBRAINZ_TRACKID"
        );
    }

    @test
    public musicBrainzDiscId() {
        this.testTextItem(
            (t, v) => { t.musicBrainzDiscId = v; },
            (t) => t.musicBrainzDiscId,
            "MUSICBRAINZ_DISCID"
        );
    }

    @test
    public musicIpId() {
        this.testTextItem((t, v) => { t.musicIpId = v; }, (t) => t.musicIpId, "MUSICIP_PUID");
    }

    @test
    public amazonId() {
        this.testTextItem((t, v) => { t.amazonId = v; }, (t) => t.amazonId, "ASIN");
    }

    @test
    public musicBrainzReleaseStatus() {
        this.testTextItem(
            (t, v) => { t.musicBrainzReleaseStatus = v; },
            (t) => t.musicBrainzReleaseStatus,
            "MUSICBRAINZ_ALBUMSTATUS"
        );
    }

    @test
    public musicBrainzReleaseType() {
        this.testTextItem(
            (t, v) => { t.musicBrainzReleaseType = v; },
            (t) => t.musicBrainzReleaseType,
            "MUSICBRAINZ_ALBUMTYPE"
        );
    }

    @test
    public musicBrainzReleaseCountry() {
        this.testTextItem(
            (t, v) => { t.musicBrainzReleaseCountry = v; },
            (t) => t.musicBrainzReleaseCountry,
            "RELEASECOUNTRY"
        );
    }

    @test
    public replayGainTrackGain() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const setProp = (v: number) => { tag.replayGainTrackGain = v; };
        const getProp = () => tag.replayGainTrackGain;

        // Act / Assert
        assert.isNaN(getProp());

        PropertyTests.propertyNormalized(setProp, getProp, 1.23456, 1.23);
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, "REPLAYGAIN_TRACK_GAIN");
        assert.deepStrictEqual(tag.items[0].text, ["1.23 dB"]);

        tag.items[0] = ApeTagItem.fromTextValues("REPLAYGAIN_TRACK_GAIN", "1.23");
        assert.strictEqual(tag.replayGainTrackGain, 1.23);

        tag.items[0] = ApeTagItem.fromTextValues("REPLAYGAIN_TRACK_GAIN", "abcdef");
        assert.isNaN(tag.replayGainTrackGain);

        PropertyTests.propertyNormalized(setProp, getProp, undefined, Number.NaN);
        assert.strictEqual(tag.items.length, 0);
    }

    @test
    public replayGainTrackPeak() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const setProp = (v: number) => { tag.replayGainTrackPeak = v; };
        const getProp = () => tag.replayGainTrackPeak;

        // Act / Assert
        assert.isNaN(getProp());

        PropertyTests.propertyNormalized(setProp, getProp, 1.23456789, 1.234568);
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, "REPLAYGAIN_TRACK_PEAK");
        assert.deepStrictEqual(tag.items[0].text, ["1.234568"]);

        tag.items[0] = ApeTagItem.fromTextValues("REPLAYGAIN_TRACK_PEAK", "abcdef");
        assert.isNaN(tag.replayGainTrackPeak);

        PropertyTests.propertyNormalized(setProp, getProp, undefined, Number.NaN);
        assert.strictEqual(tag.items.length, 0);
    }

    @test
    public replayGainAlbumGain() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const setProp = (v: number) => { tag.replayGainAlbumGain = v; };
        const getProp = () => tag.replayGainAlbumGain;

        // Act / Assert
        assert.isNaN(getProp());

        PropertyTests.propertyNormalized(setProp, getProp, 1.23456, 1.23);
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, "REPLAYGAIN_ALBUM_GAIN");
        assert.deepStrictEqual(tag.items[0].text, ["1.23 dB"]);

        tag.items[0] = ApeTagItem.fromTextValues("REPLAYGAIN_ALBUM_GAIN", "1.23");
        assert.strictEqual(tag.replayGainAlbumGain, 1.23);

        tag.items[0] = ApeTagItem.fromTextValues("REPLAYGAIN_ALBUM_GAIN", "abcdef");
        assert.isNaN(tag.replayGainAlbumGain);

        PropertyTests.propertyNormalized(setProp, getProp, undefined, Number.NaN);
        assert.strictEqual(tag.items.length, 0);
    }

    @test
    public replayGainAlbumPeak() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const setProp = (v: number) => { tag.replayGainAlbumPeak = v; };
        const getProp = () => tag.replayGainAlbumPeak;

        // Act / Assert
        assert.isNaN(getProp());

        PropertyTests.propertyNormalized(setProp, getProp, 1.23456789, 1.234568);
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, "REPLAYGAIN_ALBUM_PEAK");
        assert.deepStrictEqual(tag.items[0].text, ["1.234568"]);

        tag.items[0] = ApeTagItem.fromTextValues("REPLAYGAIN_ALBUM_PEAK", "abcdef");
        assert.isNaN(tag.replayGainAlbumPeak);

        PropertyTests.propertyNormalized(setProp, getProp, undefined, Number.NaN);
        assert.strictEqual(tag.items.length, 0);
    }

    @test
    public pictures() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const mockPicture1 = TypeMoq.Mock.ofType<IPicture>();
        mockPicture1.setup((p) => p.description).returns(() => "foo");
        mockPicture1.setup((p) => p.type).returns(() => PictureType.ColoredFish);
        mockPicture1.setup((p) => p.data).returns(() => ByteVector.fromString("bar", StringType.UTF8));
        const mockPicture2 = TypeMoq.Mock.ofType<IPicture>();
        mockPicture2.setup((p) => p.description).returns(() => "fux");
        mockPicture2.setup((p) => p.type).returns(() => PictureType.NotAPicture);
        mockPicture2.setup((p) => p.data).returns(() => ByteVector.fromString("bux", StringType.UTF8));

        // Act / Assert
        assert.ok(tag.pictures);
        assert.isEmpty(tag.pictures);

        // Note: We're only checking that the items exist - ability to generate binary items is
        //    tested in the ApeTagItem tests.
        tag.pictures = [mockPicture1.object, mockPicture2.object];
        assert.strictEqual(tag.items.length, 2);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Binary);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Binary);

        const pictures = tag.pictures;
        assert.strictEqual(pictures.length, 2);
        assert.strictEqual(pictures[0].description, "foo");
        assert.strictEqual(pictures[0].type, PictureType.ColoredFish);
        Testers.bvEqual(pictures[0].data, ByteVector.fromString("bar", StringType.UTF8));
        assert.strictEqual(pictures[1].description, "fux");
        assert.strictEqual(pictures[1].type, PictureType.NotAPicture);
        Testers.bvEqual(pictures[1].data, ByteVector.fromString("bux", StringType.UTF8));

        tag.pictures = undefined;
        assert.strictEqual(tag.items.length, 0);
        assert.ok(tag.pictures);
        assert.isEmpty(tag.pictures);
    }

    @test
    public initialKey() {
        Ape_Tag_PropertyTests.testUnsupportedText((t, v) => { t.initialKey = v; }, (t) => t.initialKey);
    }

    @test
    public remixedBy() {
        Ape_Tag_PropertyTests.testUnsupportedText((t, v) => { t.remixedBy = v; }, (t) => t.remixedBy);
    }

    @test
    public publisher() {
        Ape_Tag_PropertyTests.testUnsupportedText((t, v) => { t.publisher = v; }, (t) => t.publisher);
    }

    @test
    public isrc() {
        Ape_Tag_PropertyTests.testUnsupportedText((t, v) => { t.isrc = v; }, (t) => t.isrc);
    }

    private testFractionalUintItem(
        setNumer: (t: ApeTag, v: number) => void,
        getNumer: (t: ApeTag) => number,
        setDenom: (t: ApeTag, v: number) => void,
        getDenom: (t: ApeTag) => number,
        key: string
    ) {
        // Test 1: Numerator w/o denominator
        this.testUintItem(setNumer, getNumer, key);

        // Test 2: Numerator w/denominator
        // Arrange
        let tag = ApeTag.fromEmpty();
        setDenom(tag, 123);
        let set = (v: number) => setNumer(tag, v);
        let get = () => getNumer(tag);

        // Act / Assert
        assert.strictEqual(get(), 0);

        PropertyTests.propertyRoundTrip(set, get, 2);
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, key);
        assert.deepStrictEqual(tag.items[0].text, ["2/123"]);

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, key);
        assert.deepStrictEqual(tag.items[0].text, ["123/123"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, key);
        assert.deepStrictEqual(tag.items[0].text, ["0/123"]);

        // Test 3: Denominator w/o numerator
        tag = ApeTag.fromEmpty();
        set = (v: number) => { setDenom(tag, v); };
        get = () => getDenom(tag);

        // Act / Assert
        assert.strictEqual(tag.discCount, 0);

        PropertyTests.propertyRoundTrip(set, get, 2);
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, key);
        assert.deepStrictEqual(tag.items[0].text, ["0/2"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.items.length, 0);

        // Test 4: Denominator w/numerator
        tag = ApeTag.fromEmpty();
        setNumer(tag, 12);

        // Act / Assert
        assert.strictEqual(tag.discCount, 0);

        PropertyTests.propertyRoundTrip(set, get, 2);
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, key);
        assert.deepStrictEqual(tag.items[0].text, ["12/2"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, key);
        assert.deepStrictEqual(tag.items[0].text, ["12"]);

        // Test 5: Invalid denominator values
        PropertyTests.propertyThrows(set, undefined);
        PropertyTests.propertyThrows(set, null);
        PropertyTests.propertyThrows(set, 1.23);
        PropertyTests.propertyThrows(set, -1);
        PropertyTests.propertyThrows(set, Number.MAX_SAFE_INTEGER + 1);
    }

    private testTextArrayItem(
        set: (t: ApeTag, v: string[]) => void,
        get: (t: ApeTag) => string[],
        key: string
    ) {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const setProp = (v: string[]) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.deepStrictEqual(getProp(), []);

        PropertyTests.propertyRoundTrip(setProp, getProp, ["foo", "bar", "baz"]);
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, key);
        assert.deepStrictEqual(tag.items[0].text, ["foo", "bar", "baz"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, []);
        assert.strictEqual(tag.items.length, 0);
    }

    private testTextItem(
        set: (t: ApeTag, v: string) => void,
        get: (t: ApeTag) => string,
        key: string
    ) {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const setProp = (v: string) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.isUndefined(getProp());

        PropertyTests.propertyRoundTrip(setProp, getProp, "foo");
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, key);
        assert.deepStrictEqual(tag.items[0].text, ["foo"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, undefined);
        assert.strictEqual(tag.items.length, 0);
    }

    private testUintItem(
        set: (t: ApeTag, v: number) => void,
        get: (t: ApeTag) => number,
        key: string
    ) {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const setProp = (v: number) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        // Initially empty
        assert.strictEqual(getProp(), 0);

        // Test invalid values
        PropertyTests.propertyThrows(setProp, undefined);
        PropertyTests.propertyThrows(setProp, null);
        PropertyTests.propertyThrows(setProp, 1.23);
        PropertyTests.propertyThrows(setProp, -1);
        PropertyTests.propertyThrows(setProp, Number.MAX_SAFE_INTEGER + 1);

        // Test valid values
        PropertyTests.propertyRoundTrip(setProp, getProp, 123);
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].type, ApeTagItemType.Text);
        assert.strictEqual(tag.items[0].key, key);
        assert.deepStrictEqual(tag.items[0].text, ["123"]);

        // Test clear
        PropertyTests.propertyRoundTrip(setProp, getProp, 0);
        assert.strictEqual(tag.items.length, 0);
    }

    private static testUnsupportedText(
        set: (t: ApeTag, v: string) => void,
        get: (t: ApeTag) => string
    ) {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act / Assert
        assert.isUndefined(get(tag));

        set(tag, "foo");

        assert.isUndefined(get(tag));
        assert.strictEqual(tag.items.length, 0);
    }
}

@suite class Ape_Tag_MethodTests {
    @test
    public appendStringValue_invalidValues() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act / Assert
        assert.throws(() => { tag.appendStringValue(undefined, "abc"); });
        assert.throws(() => { tag.appendStringValue(null, "abc"); });
    }

    @test
    public appendStringValue_emptyValue() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const item1 = ApeTagItem.fromTextValues("item", "foo");
        tag.items.push(item1);

        // Act
        tag.appendStringValue(item1.key, undefined);
        tag.appendStringValue(item1.key, null);
        tag.appendStringValue(item1.key, "");

        // Assert
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].key, "item");
        assert.deepStrictEqual(tag.items[0].text, ["foo"]);
    }

    @test
    public appendStringValue_itemExists() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const item1 = ApeTagItem.fromTextValues("item", "foo");
        tag.items.push(item1);

        // Act
        tag.appendStringValue(item1.key, "bar");

        // Assert
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].key, "item");
        assert.deepStrictEqual(tag.items[0].text, ["foo", "bar"]);
    }

    @test
    public appendStringValue_itemDoesNotExists() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const item1 = ApeTagItem.fromTextValues("item", "foo");
        tag.items.push(item1);

        // Act
        tag.appendStringValue("item2", "fux");

        // Assert
        assert.strictEqual(tag.items.length, 2);
        assert.strictEqual(tag.items[0].key, "item");
        assert.deepStrictEqual(tag.items[0].text, ["foo"]);
        assert.strictEqual(tag.items[1].key, "item2");
        assert.deepStrictEqual(tag.items[1].text, ["fux"]);
    }

    @test
    public appendStringValues_invalidValues() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act / Assert
        assert.throws(() => { tag.appendStringValues(undefined, ["abc"]); });
        assert.throws(() => { tag.appendStringValues(null, ["abc"]); });
    }

    @test
    public appendStringValues_emptyValue() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const item1 = ApeTagItem.fromTextValues("item", "foo");
        tag.items.push(item1);

        // Act
        tag.appendStringValues(item1.key, undefined);
        tag.appendStringValues(item1.key, null);
        tag.appendStringValues(item1.key, []);

        // Assert
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].key, "item");
        assert.deepStrictEqual(tag.items[0].text, ["foo"]);
    }

    @test
    public appendStringValues_itemExists() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const item1 = ApeTagItem.fromTextValues("item", "foo");
        tag.items.push(item1);

        // Act
        tag.appendStringValues(item1.key, ["bar", "baz", undefined]);

        // Assert
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].key, "item");
        assert.deepStrictEqual(tag.items[0].text, ["foo", "bar", "baz"]);
    }

    @test
    public appendStringValues_itemDoesNotExists() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const item1 = ApeTagItem.fromTextValues("item", "foo");
        tag.items.push(item1);

        // Act
        tag.appendStringValues("item2", ["fux", "bux", undefined]);

        // Assert
        assert.strictEqual(tag.items.length, 2);
        assert.strictEqual(tag.items[0].key, "item");
        assert.deepStrictEqual(tag.items[0].text, ["foo"]);
        assert.strictEqual(tag.items[1].key, "item2");
        assert.deepStrictEqual(tag.items[1].text, ["fux", "bux"]);
    }

    @test
    public clear() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        tag.items.push(ApeTagItem.fromTextValues("Foo", "bar"));
        tag.items.push(ApeTagItem.fromTextValues("Fux", "bux"));

        // Act
        tag.clear();

        // Assert
        assert.deepStrictEqual(tag.items, []);
    }

    @test
    public copyTo_invalidDestination() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act / Assert
        assert.throws(() => { tag.copyTo(undefined, true); });
        assert.throws(() => { tag.copyTo(null, true); });
    }

    @test
    public copyTo_noOverwrite() {
        // Arrange
        const source = ApeTag.fromEmpty();
        const sItem1 = ApeTagItem.fromTextValues("Foo", "bar");
        const sItem2 = ApeTagItem.fromTextValues("Fux", "bux");
        source.items.push(sItem1, sItem2);

        const dest = ApeTag.fromEmpty();
        const dItem1 = ApeTagItem.fromTextValues("Foo", "baz");
        dest.items.push(dItem1);

        // Act
        source.copyTo(dest, false);

        // Assert
        assert.sameMembers(source.items, [sItem1, sItem2]);

        assert.strictEqual(dest.items.length, 2);
        assert.notOwnInclude(dest.items, sItem1);
        assert.notOwnInclude(dest.items, sItem2);
        assert.ownInclude(dest.items, dItem1);

        const dItem2 = dest.getItem("Fux");
        assert.isOk(dItem2);
        assert.notStrictEqual(dItem2, sItem2);
        assert.strictEqual(dItem2.value, sItem2.value);
    }

    @test
    public copyTo_overwrite() {
        // Arrange
        const source = ApeTag.fromEmpty();
        const sItem1 = ApeTagItem.fromTextValues("Foo", "bar");
        const sItem2 = ApeTagItem.fromTextValues("Fux", "bux");
        source.items.push(sItem1, sItem2);

        const dest = ApeTag.fromEmpty();
        const dItem1 = ApeTagItem.fromTextValues("Foo", "baz");
        dest.items.push(dItem1);

        // Act
        source.copyTo(dest, true);

        // Assert
        assert.sameMembers(source.items, [sItem1, sItem2]);

        assert.strictEqual(dest.items.length, 2);
        assert.notOwnInclude(dest.items, sItem1);
        assert.notOwnInclude(dest.items, sItem2);
        assert.notOwnInclude(dest.items, dItem1);

        const dNewItem1 = dest.getItem("Foo");
        assert.isOk(dNewItem1);
        assert.notStrictEqual(dNewItem1, sItem1);
        assert.strictEqual(dNewItem1.value, sItem1.value);

        const dNewItem2 = dest.getItem("Fux");
        assert.isOk(dNewItem2);
        assert.notStrictEqual(dNewItem2, sItem2);
        assert.strictEqual(dNewItem2.value, sItem2.value);
    }

    @test
    public getItem_invalidKey() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act / Assert
        assert(() => tag.getItem(undefined));
        assert(() => tag.getItem(null));
    }

    @test
    public getItem_itemExists() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        tag.items.push(ApeTagItem.fromTextValues("foo", "bar", "baz"));

        // Act
        const item = tag.getItem("fOo");

        // Assert
        assert.strictEqual(item, tag.items[0]);
    }

    @test
    public getItem_itemDoesNotExist() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        tag.items.push(ApeTagItem.fromTextValues("fux", "bux", "qux"));

        // Act
        const item = tag.getItem("fOo");

        // Assert
        assert.isUndefined(item);
    }

    @test
    public hasItem_invalidKey() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act / Assert
        assert(() => tag.hasItem(undefined));
        assert(() => tag.hasItem(null));
    }

    @test
    public hasItem_itemExists() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        tag.items.push(ApeTagItem.fromTextValues("foo", "bar", "baz"));

        // Act
        const hasItem = tag.hasItem("fOo");

        // Assert
        assert.isTrue(hasItem);
    }

    @test
    public hasItem_itemDoesNotExist() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        tag.items.push(ApeTagItem.fromTextValues("fux", "bux", "qux"));

        // Act
        const hasItem = tag.hasItem("fOo");

        // Assert
        assert.isFalse(hasItem);
    }

    @test
    public removeItem_invalidKey() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act / Assert
        assert(() => tag.removeItem(undefined));
        assert(() => tag.removeItem(null));
    }

    @test
    public removeItem_itemExists() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        tag.items.push(ApeTagItem.fromTextValues("foo", "bar", "baz"));

        // Act
        const items = tag.items;
        tag.removeItem("fOo");

        // Assert
        assert.isEmpty(tag.items);
        assert.strictEqual(items, tag.items);
    }

    @test
    public removeItem_itemDoesNotExist() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        tag.items.push(ApeTagItem.fromTextValues("fux", "bux", "qux"));

        // Act
        const items = tag.items;
        tag.removeItem("FoO");

        // Assert
        assert.isTrue(tag.hasItem("fux"));
        assert.strictEqual(items, tag.items);
    }

    @test
    public render() {
        // Arrange
        const flags = (ApeTagFooterFlags.IsHeader | ApeTagFooterFlags.HeaderPresent) >>> 0;
        let header = getTestTagFooter(flags, 0, ApeTagFooter.SIZE);
        let footer = getTestTagFooter(ApeTagFooterFlags.HeaderPresent, 0, ApeTagFooter.SIZE);
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10),
            header,
            footer
        );
        const file = TestFile.getFile(data);
        const tag = ApeTag.fromFile(file, 10);

        const item1 = ApeTagItem.fromTextValues("foo", "bar", "baz");
        const item2 = ApeTagItem.fromTextValues("fux", "bux", "qux");
        tag.items.push(item1, item2);

        // Act
        const output = tag.render();

        // Assert
        const item1Render = item1.render();
        const item2Render = item2.render();
        const tagSize = ApeTagFooter.SIZE + item1Render.length + item2Render.length;
        header = getTestTagFooter(flags, 2, tagSize);
        footer = getTestTagFooter(ApeTagFooterFlags.HeaderPresent, 2, tagSize);
        const expected = ByteVector.concatenate(
            header,
            item1Render,
            item2Render,
            footer
        );
        Testers.bvEqual(output, expected);
    }

    @test
    public setItem_invalidItem() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act / Assert
        assert.throws(() => { tag.setItem(undefined); });
        assert.throws(() => { tag.setItem(null); });
    }

    @test
    public setItem_itemExists() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const item1 = ApeTagItem.fromTextValues("foo", "bar");
        const item2 = ApeTagItem.fromTextValues("foo", "bux");
        tag.items.push(item1);

        // Act
        tag.setItem(item2);

        // Assert
        assert.isOk(tag.items);
        assert.sameMembers(tag.items, [item2]);
    }

    @test
    public setItem_itemDoesNotExist() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const item1 = ApeTagItem.fromTextValues("foo", "bar");

        // Act
        tag.setItem(item1);

        // Assert
        assert.isOk(tag.items);
        assert.sameMembers(tag.items, [item1]);
    }

    @test
    public setNumericValue_invalidValues() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act / Assert
        assert.throws(() => { tag.setNumericValue(undefined, 0, 0); });
        assert.throws(() => { tag.setNumericValue(null, 0, 0); });
        assert.throws(() => { tag.setNumericValue("foo", -1, 0); });
        assert.throws(() => { tag.setNumericValue("foo", 1.23, 0); });
        assert.throws(() => { tag.setNumericValue("foo", Number.MAX_SAFE_INTEGER + 1, 0); });
        assert.throws(() => { tag.setNumericValue("foo", 0, -1); });
        assert.throws(() => { tag.setNumericValue("foo", 0, 1.23); });
        assert.throws(() => { tag.setNumericValue("foo", 0, Number.MAX_SAFE_INTEGER + 1); });
    }

    @test
    public setNumericValue_removeItem() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        tag.items.push(ApeTagItem.fromTextValues("foo", "123/456"));

        // Act
        tag.setNumericValue("foo", 0, 0);

        // Assert
        assert.isEmpty(tag.items);
    }

    @test
    public setNumericValue_numeratorOnly() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act
        tag.setNumericValue("foo", 123, 0);

        // Assert
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].key, "foo");
        assert.deepStrictEqual(tag.items[0].text, ["123"]);
    }

    @test
    public setNumericValue_numeratorAndDenominator() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act
        tag.setNumericValue("foo", 123, 456);

        // Assert
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].key, "foo");
        assert.deepStrictEqual(tag.items[0].text, ["123/456"]);
    }

    @test
    public setStringValue_invalidValue() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act / Assert
        assert.throws(() => { tag.setStringValue(undefined, "foo"); });
        assert.throws(() => { tag.setStringValue(null, "foo"); });
    }

    @test
    public setStringValue_removeItem() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        tag.items.push(ApeTagItem.fromTextValues("foo", "bar", "baz"));

        // Act
        tag.setStringValue("foo", undefined);

        // Assert
        assert.isEmpty(tag.items);
    }

    @test
    public setStringValue_createsItem() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act
        tag.setStringValue("foo", "bar");

        // Assert
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].key, "foo");
        assert.deepStrictEqual(tag.items[0].text, ["bar"]);
    }

    @test
    public setStringValues_invalidValue() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act / Assert
        assert.throws(() => { tag.setStringValues(undefined, ["foo"]); });
        assert.throws(() => { tag.setStringValues(null, ["foo"]); });
    }

    @test
    public setStringValues_removeItem() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        tag.items.push(ApeTagItem.fromTextValues("foo", "bar", "baz"));
        tag.items.push(ApeTagItem.fromTextValues("fux", "bux", "qux"));

        // Act
        tag.setStringValues("foo", []);
        tag.setStringValue("fux", undefined);

        // Assert
        assert.isEmpty(tag.items);
    }

    @test
    public setStringValues_createsItem() {
        // Arrange
        const tag = ApeTag.fromEmpty();

        // Act
        tag.setStringValues("foo", ["bar"]);

        // Assert
        assert.strictEqual(tag.items.length, 1);
        assert.strictEqual(tag.items[0].key, "foo");
        assert.deepStrictEqual(tag.items[0].text, ["bar"]);
    }

    @test
    public setStringValues_replacesItem() {
        // Arrange
        const tag = ApeTag.fromEmpty();
        const item = ApeTagItem.fromTextValues("foo", "bar");
        tag.items.push(item);

        // Act
        tag.setStringValues("foo", ["baz"]);

        // Assert
        assert.strictEqual(tag.items.length, 1);
        assert.notStrictEqual(tag.items[0], item);
        assert.strictEqual(tag.items[0].key, "foo");
        assert.deepStrictEqual(tag.items[0].text, ["baz"]);
    }
}
