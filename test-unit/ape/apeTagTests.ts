import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import {suite, test} from "mocha-typescript";

import ApeTag from "../../src/ape/apeTag";
import PropertyTests from "../utilities/propertyTests";
import TestFile from "../utilities/testFile";
import {ApeTagFooter, ApeTagFooterFlags} from "../../src/ape/apeTagFooter";
import {ApeTagItem, ApeTagItemType} from "../../src/ape/apeTagItem";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {IPicture, PictureType} from "../../src/picture";
import {TagTypes} from "../../src/tag";


// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

function getTestTagFooter(flags: ApeTagFooterFlags, itemCount: number, tagSize: number): ByteVector {
    return ByteVector.concatenate(
        ApeTagFooter.fileIdentifier,
        ByteVector.fromUInt(2000, false),
        ByteVector.fromUInt(tagSize, false),
        ByteVector.fromUInt(itemCount, false),
        ByteVector.fromUInt(flags, false),
        ByteVector.fromSize(8)
    );
}

@suite class Ape_Tag_ConstructorTests {
    @test
    public fromData_falsyData() {
        // Act / Assert
        assert.throws(() => { ApeTag.fromData(undefined); });
        assert.throws(() => { ApeTag.fromData(null); });
    }

    @test
    public fromData_dataIsWayTooShort() {
        // Arrange
        const data = ByteVector.fromSize(8);

        // Act / Assert
        assert.throws(() => { ApeTag.fromData(data); });
    }

    @test
    public fromData_dataIsZero() {
        // Arrange
        const data = getTestTagFooter(0, 0, 0);

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
        const data = getTestTagFooter(ApeTagFooterFlags.HeaderPresent, 0, ApeTagFooter.size);

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
            getTestTagFooter(0, 3, item1.length + item2.length + ApeTagFooter.size)
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
        assert.throws(() => { ApeTag.fromFile(undefined, 0); });
        assert.throws(() => { ApeTag.fromFile(null, 0); });
        assert.throws(() => { ApeTag.fromFile(mockFile.object, -1); });
        assert.throws(() => { ApeTag.fromFile(mockFile.object, 1.23); });
        assert.throws(() => { ApeTag.fromFile(mockFile.object, Number.MAX_SAFE_INTEGER + 1); });
        assert.throws(() => { ApeTag.fromFile(mockFile.object, 5); });
    }

    @test
    public fromFile_dataIsZero() {
        // Arrange
        const data = getTestTagFooter(0, 0, 0);
        data.insertByteVector(0, ByteVector.fromSize(10));
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => ApeTag.fromFile(file, 10));
    }

    @test
    public fromFile_emptyTag() {
        // Arrange
        const data = getTestTagFooter(ApeTagFooterFlags.HeaderPresent, 0, ApeTagFooter.size);
        data.insertByteVector(0, ByteVector.fromSize(10));
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
            item1,
            item2,
            getTestTagFooter(0, 3, item1.length + item2.length + ApeTagFooter.size)
        );
        data.insertByteVector(0, ByteVector.fromSize(10));
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
        const header = getTestTagFooter(flags, 0, ApeTagFooter.size);
        const footer = getTestTagFooter(ApeTagFooterFlags.HeaderPresent, 0, ApeTagFooter.size);
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

        tag.items[0] = ApeTagItem.fromTextValues("DateTagged", "bunchagarbage");
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
            (t) => t.musicBrainzArtistId,
            "MUSICBRAINZ_ARTISTID"
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
        mockPicture1.setup((p) => p.data).returns(() => ByteVector.fromString("bar"));
        const mockPicture2 = TypeMoq.Mock.ofType<IPicture>();
        mockPicture2.setup((p) => p.description).returns(() => "fux");
        mockPicture2.setup((p) => p.type).returns(() => PictureType.NotAPicture);
        mockPicture2.setup((p) => p.data).returns(() => ByteVector.fromString("bux"));

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
        assert.isTrue(ByteVector.equal(pictures[0].data, ByteVector.fromString("bar")));
        assert.strictEqual(pictures[1].description, "fux");
        assert.strictEqual(pictures[1].type, PictureType.NotAPicture);
        assert.isTrue(ByteVector.equal(pictures[1].data, ByteVector.fromString("bux")));

        tag.pictures = undefined;
        assert.strictEqual(tag.items.length, 0);
        assert.ok(tag.pictures);
        assert.isEmpty(tag.pictures);
    }

    @test
    public initialKey() {
        this.testUnsupportedText((t, v) => { t.initialKey = v; }, (t) => t.initialKey);
    }

    @test
    public remixedBy() {
        this.testUnsupportedText((t, v) => { t.remixedBy = v; }, (t) => t.remixedBy);
    }

    @test
    public publisher() {
        this.testUnsupportedText((t, v) => { t.publisher = v; }, (t) => t.publisher);
    }

    @test
    public isrc() {
        this.testUnsupportedText((t, v) => { t.isrc = v; }, (t) => t.isrc);
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

    private testUnsupportedText(
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
