import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import Picture from "../../src/picture";
import PropertyTests from "../utilities/propertyTests";
import XiphComment from "../../src/xiph/xiphComment";
import XiphPicture from "../../src/xiph/xiphPicture";
import XiphSettings from "../../src/xiph/xiphSettings";
import XiphTestResources from "./resources";
import {ByteVector} from "../../src/byteVector";
import {IPicture, PictureType} from "../../src/iPicture";
import {TagTypes} from "../../src/tag";
import {TagTesters, Testers} from "../utilities/testers";

@suite class Xiph_Comment_ConstructorTests {
    @test
    public fromData_invalidParameters() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => XiphComment.fromData(v));
    }

    @test
    public fromData_noData() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUint(9, false),
            ByteVector.fromString("foobarbaz"),
            ByteVector.fromUint(0, false)
        );

        // Act
        const comment = XiphComment.fromData(data);

        // Assert
        assert.strictEqual(comment.fieldValueCount, 0);
        assert.deepStrictEqual(comment.fieldNames, []);
        assert.strictEqual(comment.vendorId, "foobarbaz");
        assert.strictEqual(comment.tagTypes, TagTypes.Xiph);
        assert.strictEqual(comment.sizeOnDisk, data.length);
        assert.isTrue(comment.isEmpty);
        TagTesters.testTagProperties(comment, {});
    }

    @test
    public fromData_hasValues() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUint(3, false),
            ByteVector.fromString("foo"),
            ByteVector.fromUint(4, false),
            ByteVector.fromUint(9, false),
            ByteVector.fromString("TITLE=bar"),
            ByteVector.fromUint(7, false),
            ByteVector.fromString("FUX=bux"),
            ByteVector.fromUint(7, false),
            ByteVector.fromString("FUX=qux"),
            ByteVector.fromUint(15, false),
            ByteVector.fromString("Malformed_field")
        );

        // Act
        const comment = XiphComment.fromData(data);

        // Assert
        assert.strictEqual(comment.fieldValueCount, 3);
        assert.sameMembers(comment.fieldNames, ["TITLE", "FUX"]);
        assert.strictEqual(comment.vendorId, "foo");
        assert.strictEqual(comment.tagTypes, TagTypes.Xiph);
        assert.strictEqual(comment.sizeOnDisk, data.length);
        assert.isFalse(comment.isEmpty);
        TagTesters.testTagProperties(comment, {
            title: "bar"
        });
    }

    @test
    public fromData_hasPictures() {
        // Arrange
        const oldPictureData = ByteVector.fromString("fuxbuxqux");
        const oldPictureItem = `COVERART=${Buffer.from(oldPictureData.data).toString("base64")}`;
        const newPictureItem = `METADATA_BLOCK_PICTURE=${XiphTestResources.pictureEncodedBytes}`;
        const data = ByteVector.concatenate(
            ByteVector.fromUint(3, false),
            ByteVector.fromString("foo"),
            ByteVector.fromUint(3, false),
            ByteVector.fromUint(9, false),
            ByteVector.fromString("TITLE=bar"),
            ByteVector.fromUint(oldPictureItem.length, false),
            ByteVector.fromString(oldPictureItem),
            ByteVector.fromUint(newPictureItem.length, false),
            ByteVector.fromString(newPictureItem)
        );

        // Act
        const comment = XiphComment.fromData(data);

        // Assert
        assert.strictEqual(comment.fieldValueCount, 3);
        assert.sameMembers(comment.fieldNames, ["TITLE"]);
        assert.strictEqual(comment.vendorId, "foo");
        assert.strictEqual(comment.tagTypes, TagTypes.Xiph);
        assert.strictEqual(comment.sizeOnDisk, data.length);
        assert.isFalse(comment.isEmpty);

        assert.strictEqual(comment.title, "bar");
        const pictures = comment.pictures;
        assert.strictEqual(pictures.length, 2);

        const oldPicture = pictures.find((p) => p.type === PictureType.NotAPicture);
        assert.isOk(oldPicture);
        assert.instanceOf(oldPicture, Picture);

        const newPicture = pictures.find((p) => p.type === PictureType.ColoredFish);
        assert.isOk(newPicture);
        assert.instanceOf(newPicture, XiphPicture);
    }

    @test
    public fromEmpty() {
        // Act
        const comment = XiphComment.fromEmpty();

        // Assert
        assert.strictEqual(comment.fieldValueCount, 0);
        assert.deepStrictEqual(comment.fieldNames, []);
        assert.isUndefined(comment.vendorId);
        assert.strictEqual(comment.tagTypes, TagTypes.Xiph);
        assert.strictEqual(comment.sizeOnDisk, 0);
        assert.isTrue(comment.isEmpty);
        TagTesters.testTagProperties(comment, {});
    }
}

@suite class Xiph_Comment_PropertyTests {
    @test
    public title() {
        this.testTextItem((t, v) => { t.title = v; }, (t) => t.title, "TITLE");
    }

    @test
    public titleSort() {
        this.testTextItem((t, v) => { t.titleSort = v; }, (t) => t.titleSort, "TITLESORT");
    }

    @test
    public subtitle() {
        this.testTextItem((t, v) => { t.subtitle = v; }, (t) => t.subtitle, "SUBTITLE");
    }

    @test
    public description() {
        this.testTextItem((t, v) => { t.description = v; }, (t) => t.description, "DESCRIPTION");
    }

    @test
    public performers() {
        this.testTextArrayItem((t, v) => { t.performers = v; }, (t) => t.performers, "ARTIST");
    }

    @test
    public performersSort() {
        this.testTextArrayItem((t, v) => { t.performersSort = v; }, (t) => t.performersSort, "ARTISTSORT");
    }

    @test
    public performersRole() {
        this.testTextArrayItem((t, v) => { t.performersRole = v; }, (t) => t.performersRole, "ARTISTROLE");
    }

    @test
    public albumArtists_hasAlbumArtist() {
        // Arrange
        const tag = XiphComment.fromEmpty();
        const setProp = (v: string[]) => { tag.albumArtists = v; };
        const getProp = () => tag.albumArtists;

        // Act / Assert
        assert.deepStrictEqual(getProp(), []);

        // Reads ALBUMARTIST preferentially
        tag.setFieldAsStrings("ENSEMBLE", "no");
        tag.setFieldAsStrings("ALBUM ARTIST", "no");
        tag.setFieldAsStrings("ALBUMARTIST", "foo", "bar", "baz");
        assert.deepStrictEqual(getProp(), ["foo", "bar", "baz"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, ["fux", "bux", "qux"]);
        assert.sameMembers(tag.fieldNames, ["ALBUMARTIST", "ALBUM ARTIST", "ENSEMBLE"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, []);
        assert.sameMembers(tag.fieldNames, []);
    }

    @test
    public albumArtists_hasAlbumSpaceArtist() {
        // Arrange
        const tag = XiphComment.fromEmpty();
        const setProp = (v: string[]) => { tag.albumArtists = v; };
        const getProp = () => tag.albumArtists;

        // Act / Assert
        assert.deepStrictEqual(getProp(), []);

        // Reads ALBUM ARTIST preferentially
        tag.setFieldAsStrings("ENSEMBLE", "no");
        tag.setFieldAsStrings("ALBUM ARTIST", "foo", "bar", "baz");
        assert.deepStrictEqual(getProp(), ["foo", "bar", "baz"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, ["fux", "bux", "qux"]);
        assert.sameMembers(tag.fieldNames, ["ALBUMARTIST", "ALBUM ARTIST", "ENSEMBLE"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, []);
        assert.sameMembers(tag.fieldNames, []);
    }

    @test
    public albumArtists_hasEnsemble() {
        // Arrange
        const tag = XiphComment.fromEmpty();
        const setProp = (v: string[]) => { tag.albumArtists = v; };
        const getProp = () => tag.albumArtists;

        // Act / Assert
        assert.deepStrictEqual(getProp(), []);

        // Reads ALBUMARTIST preferentially
        tag.setFieldAsStrings("ENSEMBLE", "foo", "bar", "baz");
        assert.deepStrictEqual(getProp(), ["foo", "bar", "baz"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, ["fux", "bux", "qux"]);
        assert.sameMembers(tag.fieldNames, ["ALBUMARTIST", "ENSEMBLE"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, []);
        assert.sameMembers(tag.fieldNames, []);
    }

    @test
    public albumArtists_noAlbumArtistFields() {
        // Arrange
        const tag = XiphComment.fromEmpty();
        const setProp = (v: string[]) => { tag.albumArtists = v; };
        const getProp = () => tag.albumArtists;

        // Act / Assert
        assert.deepStrictEqual(getProp(), []);

        PropertyTests.propertyRoundTrip(setProp, getProp, ["foo", "bar", "baz"]);
        assert.strictEqual(tag.fieldValueCount, 3);
        assert.include(tag.fieldNames, "ALBUMARTIST");
        assert.deepStrictEqual(tag.getField("ALBUMARTIST"), ["foo", "bar", "baz"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, []);
        assert.strictEqual(tag.fieldValueCount, 0);
    }

    @test
    public albumArtistsSort() {
        this.testTextArrayItem((t, v) => { t.albumArtistsSort = v; }, (t) => t.albumArtistsSort, "ALBUMARTISTSORT");
    }

    @test
    public composers() {
        this.testTextArrayItem((t, v) => { t.composers = v; }, (t) => t.composers, "COMPOSER");
    }

    @test
    public composersSort() {
        this.testTextArrayItem((t, v) => { t.composersSort = v; }, (t) => t.composersSort, "COMPOSERSORT");
    }

    @test
    public album() {
        this.testTextItem((t, v) => { t.album = v; }, (t) => t.album, "ALBUM");
    }

    @test
    public albumSort() {
        this.testTextItem((t, v) => { t.albumSort = v; }, (t) => t.albumSort, "ALBUMSORT");
    }

    @test
    public comment() {
        this.testTextItem((t, v) => { t.comment = v; }, (t) => t.comment, "COMMENT");
    }

    @test
    public genres() {
        this.testTextArrayItem((t, v) => { t.genres = v; }, (t) => t.genres, "GENRE");
    }

    @test
    public year() {
        this.testUintItem((t, v) => { t.year = v; }, (t) => t.year, "DATE");
    }

    @test
    public year_tooBig() {
        // Arrange
        const tag = XiphComment.fromEmpty();
        tag.setFieldAsStrings("DATE", "1776");

        // Act
        tag.year = 10000;

        // Assert
        assert.strictEqual(tag.year, 0);
        assert.strictEqual(tag.fieldValueCount, 0);
        assert.isEmpty(tag.fieldNames);
    }

    @test
    public year_invalidStoredValue() {
        // Arrange
        const tag = XiphComment.fromEmpty();
        tag.setFieldAsStrings("DATE", "bloop");

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
            "TRACKNUMBER",
            "TRACKTOTAL"
        );
    }

    @test
    public discAndCount() {
        this.testFractionalUintItem(
            (t, v) => { t.disc = v; },
            (t) => t.disc,
            (t, v) => { t.discCount = v; },
            (t) => t.discCount,
            "DISCNUMBER",
            "DISCTOTAL"
        );
    }

    @test
    public lyrics() {
        this.testTextItem((t, v) => { t.lyrics = v; }, (t) => t.lyrics, "LYRICS");
    }

    @test
    public grouping() {
        this.testTextItem((t, v) => { t.grouping = v; }, (t) => t.grouping, "GROUPING");
    }

    @test
    public beatsPerMinutes_tempo() {
        // Arrange
        const originalSetting = XiphSettings.useTempoToStoreBpm;
        try {
            XiphSettings.useTempoToStoreBpm = true;

            const tag = XiphComment.fromEmpty();
            tag.setFieldAsUint("BPM", 123);
            tag.setFieldAsUint("TEMPO", 234);

            // Act / Assert 1
            assert.strictEqual(tag.beatsPerMinute, 234);

            // Act 2
            tag.beatsPerMinute = 888;

             // Assert 2
            assert.strictEqual(tag.beatsPerMinute, 888);
            assert.strictEqual(tag.fieldValueCount, 1);
            assert.sameMembers(tag.fieldNames, ["TEMPO"]);
            assert.sameMembers(tag.getField("TEMPO"), ["888"]);

            // Act 3
            tag.beatsPerMinute = 0;

            // Assert 3
            assert.strictEqual(tag.beatsPerMinute, 0);
            assert.strictEqual(tag.fieldValueCount, 0);
            assert.isEmpty(tag.fieldNames);

            // Act / Assert 4
            Testers.testUint((v) => tag.beatsPerMinute = v);
        } finally {
            // Cleanup
            XiphSettings.useTempoToStoreBpm = originalSetting;
        }
    }

    @test
    public beatsPerMinutes_bmp() {
        // Arrange
        const originalSetting = XiphSettings.useTempoToStoreBpm;
        try {
            XiphSettings.useTempoToStoreBpm = false;

            const tag = XiphComment.fromEmpty();
            tag.setFieldAsUint("BPM", 123);
            tag.setFieldAsUint("TEMPO", 234);

            // Act / Assert 1
            assert.strictEqual(tag.beatsPerMinute, 234);

            // Act 2
            tag.beatsPerMinute = 888;

            // Assert 2
            assert.strictEqual(tag.beatsPerMinute, 888);
            assert.strictEqual(tag.fieldValueCount, 1);
            assert.sameMembers(tag.fieldNames, ["BPM"]);
            assert.sameMembers(tag.getField("BPM"), ["888"]);

            // Act 3
            tag.beatsPerMinute = 0;

            // Assert 3
            assert.strictEqual(tag.beatsPerMinute, 0);
            assert.strictEqual(tag.fieldValueCount, 0);
            assert.isEmpty(tag.fieldNames);

            // Act / Assert 4
            Testers.testUint((v) => tag.beatsPerMinute = v);
        } finally {
            // Cleanup
            XiphSettings.useTempoToStoreBpm = originalSetting;
        }
    }

    @test
    public conductor() {
        this.testTextItem((t, v) => { t.conductor = v; }, (t) => t.conductor, "CONDUCTOR");
    }

    @test
    public copyright() {
        this.testTextItem((t, v) => { t.copyright = v; }, (t) => t.copyright, "COPYRIGHT");
    }

    @test
    public dateTagged() {
        // Arrange
        const tag = XiphComment.fromEmpty();
        const set = (v: Date) => { tag.dateTagged = v; };
        const get = () => tag.dateTagged;

        // Act / Assert
        assert.isUndefined(tag.dateTagged);

        PropertyTests.propertyRoundTrip(set, get, new Date("2020-04-25 12:34:56"));
        assert.strictEqual(tag.fieldValueCount, 1);
        assert.include(tag.fieldNames, "DATETAGGED");
        assert.deepStrictEqual(tag.getField("DATETAGGED"), ["2020-04-25T12:34:56"]);

        tag.setFieldAsStrings("DATETAGGED", "buncha_garbage");
        assert.isUndefined(tag.dateTagged);

        PropertyTests.propertyRoundTrip(set, get, undefined);
        assert.strictEqual(tag.fieldValueCount, 0);
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
        const tag = XiphComment.fromEmpty();
        const setProp = (v: number) => { tag.replayGainTrackGain = v; };
        const getProp = () => tag.replayGainTrackGain;

        // Act / Assert
        assert.isNaN(getProp());

        PropertyTests.propertyNormalized(setProp, getProp, 1.23456, 1.23);
        assert.strictEqual(tag.fieldValueCount, 1);
        assert.include(tag.fieldNames, "REPLAYGAIN_TRACK_GAIN");
        assert.deepStrictEqual(tag.getField("REPLAYGAIN_TRACK_GAIN"), ["1.23 dB"]);

        tag.setFieldAsStrings("REPLAYGAIN_TRACK_GAIN", "1.23");
        assert.strictEqual(tag.replayGainTrackGain, 1.23);

        tag.setFieldAsStrings("REPLAYGAIN_TRACK_GAIN", "abcdef");
        assert.isNaN(tag.replayGainTrackGain);

        PropertyTests.propertyNormalized(setProp, getProp, undefined, Number.NaN);
        assert.strictEqual(tag.fieldValueCount, 0);
    }

    @test
    public replayGainTrackPeak() {
        // Arrange
        const tag = XiphComment.fromEmpty();
        const setProp = (v: number) => { tag.replayGainTrackPeak = v; };
        const getProp = () => tag.replayGainTrackPeak;

        // Act / Assert
        assert.isNaN(getProp());

        PropertyTests.propertyNormalized(setProp, getProp, 1.23456789, 1.234568);
        assert.strictEqual(tag.fieldValueCount, 1);
        assert.include(tag.fieldNames, "REPLAYGAIN_TRACK_PEAK");
        assert.deepStrictEqual(tag.getField("REPLAYGAIN_TRACK_PEAK"), ["1.234568"]);

        tag.setFieldAsStrings("REPLAYGAIN_TRACK_PEAK", "abcdef");
        assert.isNaN(tag.replayGainTrackPeak);

        PropertyTests.propertyNormalized(setProp, getProp, undefined, Number.NaN);
        assert.strictEqual(tag.fieldValueCount, 0);
    }

    @test
    public replayGainAlbumGain() {
        // Arrange
        const tag = XiphComment.fromEmpty();
        const setProp = (v: number) => { tag.replayGainAlbumGain = v; };
        const getProp = () => tag.replayGainAlbumGain;

        // Act / Assert
        assert.isNaN(getProp());

        PropertyTests.propertyNormalized(setProp, getProp, 1.23456, 1.23);
        assert.strictEqual(tag.fieldValueCount, 1);
        assert.include(tag.fieldNames, "REPLAYGAIN_ALBUM_GAIN");
        assert.deepStrictEqual(tag.getField("REPLAYGAIN_ALBUM_GAIN"), ["1.23 dB"]);

        tag.setFieldAsStrings("REPLAYGAIN_ALBUM_GAIN", "1.23");
        assert.strictEqual(tag.replayGainAlbumGain, 1.23);

        tag.setFieldAsStrings("REPLAYGAIN_ALBUM_GAIN", "abcdef");
        assert.isNaN(tag.replayGainAlbumGain);

        PropertyTests.propertyNormalized(setProp, getProp, undefined, Number.NaN);
        assert.strictEqual(tag.fieldValueCount, 0);
    }

    @test
    public replayGainAlbumPeak() {
        // Arrange
        const tag = XiphComment.fromEmpty();
        const setProp = (v: number) => { tag.replayGainAlbumPeak = v; };
        const getProp = () => tag.replayGainAlbumPeak;

        // Act / Assert
        assert.isNaN(getProp());

        PropertyTests.propertyNormalized(setProp, getProp, 1.23456789, 1.234568);
        assert.strictEqual(tag.fieldValueCount, 1);
        assert.include(tag.fieldNames, "REPLAYGAIN_ALBUM_PEAK");
        assert.deepStrictEqual(tag.getField("REPLAYGAIN_ALBUM_PEAK"), ["1.234568"]);

        tag.setFieldAsStrings("REPLAYGAIN_ALBUM_PEAK", "abcdef");
        assert.isNaN(tag.replayGainAlbumPeak);

        PropertyTests.propertyNormalized(setProp, getProp, undefined, Number.NaN);
        assert.strictEqual(tag.fieldValueCount, 0);
    }

    @test
    public pictures() {
        // Arrange
        const tag = XiphComment.fromEmpty();
        const mockPicture1 = Mock.ofType<IPicture>();
        const mockPicture2 = Mock.ofType<IPicture>();

        // Act / Assert
        assert.ok(tag.pictures);
        assert.isEmpty(tag.pictures);

        // Act 1
        tag.pictures = [mockPicture1.object, mockPicture2.object];

        // Assert 1
        assert.sameMembers(tag.pictures, [mockPicture1.object, mockPicture2.object]);
        assert.strictEqual(tag.fieldValueCount, 2);
        assert.isEmpty(tag.fieldNames);

        // Act 2
        tag.pictures = undefined;

        // Assert 2
        assert.isOk(tag.pictures);
        assert.isEmpty(tag.pictures);
        assert.strictEqual(tag.fieldValueCount, 0);
        assert.isEmpty(tag.fieldNames);
    }

    @test
    public isCompilation() {
        // Arrange
        const tag = XiphComment.fromEmpty();

        // Assert
        assert.isFalse(tag.isCompilation);

        // Act 1
        tag.isCompilation = true;

        // Assert 1
        assert.isTrue(tag.isCompilation);
        assert.strictEqual(tag.fieldValueCount, 1);
        assert.sameMembers(tag.fieldNames, ["COMPILATION"]);
        assert.sameMembers(tag.getField("COMPILATION"), ["1"]);

        // Act 2
        tag.isCompilation = false;

        // Assert 2
        assert.isFalse(tag.isCompilation);
        assert.strictEqual(tag.fieldValueCount, 0);
        assert.isEmpty(tag.fieldNames);
    }

    @test
    public initialKey() {
        this.testTextItem((t, v) => { t.initialKey = v; }, (t) => t.initialKey, "INITIALKEY");
    }

    @test
    public remixedBy() {
        this.testTextItem((t, v) => { t.remixedBy = v; }, (t) => t.remixedBy, "REMIXEDBY");
    }

    @test
    public publisher() {
        this.testTextItem((t, v) => { t.publisher = v; }, (t) => t.publisher, "ORGANIZATION");
    }

    @test
    public isrc() {
        this.testTextItem((t, v) => { t.isrc = v; }, (t) => t.isrc, "ISRC");
    }

    private testFractionalUintItem(
        setNumer: (t: XiphComment, v: number) => void,
        getNumer: (t: XiphComment) => number,
        setDenom: (t: XiphComment, v: number) => void,
        getDenom: (t: XiphComment) => number,
        keyNumer: string,
        keyDenom: string,
    ) {
        // Test 1: numerator field only
        this.testUintItem(setNumer, getNumer, keyNumer);

        // Test 2: denominator field only
        this.testUintItem(setDenom, getDenom, keyDenom);

        // Test 3: numerator and denominator in single field, set numerator
        // Arrange
        let tag = XiphComment.fromEmpty();
        tag.setFieldAsStrings(keyNumer, "123/234");

        // Act
        setNumer(tag, 123);

        // Assert
        assert.strictEqual(getNumer(tag), 123);
        assert.strictEqual(getDenom(tag), 234);

        assert.sameMembers(tag.fieldNames, [keyNumer, keyDenom]);
        assert.sameMembers(tag.getField(keyNumer), ["123"]);
        assert.sameMembers(tag.getField(keyDenom), ["234"]);

        // Test 4: numerator and denominator in single field, set denominator
        // Arrange
        tag = XiphComment.fromEmpty();
        tag.setFieldAsStrings(keyNumer, "123/234");

        // Act
        setDenom(tag, 234);

        // Assert
        assert.strictEqual(getNumer(tag), 123);
        assert.strictEqual(getDenom(tag), 234);

        assert.sameMembers(tag.fieldNames, [keyNumer, keyDenom]);
        assert.sameMembers(tag.getField(keyNumer), ["123"]);
        assert.sameMembers(tag.getField(keyDenom), ["234"]);
    }

    private testTextArrayItem(
        set: (t: XiphComment, v: string[]) => void,
        get: (t: XiphComment) => string[],
        key: string
    ) {
        // Arrange
        const tag = XiphComment.fromEmpty();
        const setProp = (v: string[]) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.deepStrictEqual(getProp(), []);

        PropertyTests.propertyRoundTrip(setProp, getProp, ["foo", "bar", "baz"]);
        assert.strictEqual(tag.fieldValueCount, 3);
        assert.include(tag.fieldNames, key);
        assert.deepStrictEqual(tag.getField(key), ["foo", "bar", "baz"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, []);
        assert.strictEqual(tag.fieldValueCount, 0);
    }

    private testTextItem(
        set: (t: XiphComment, v: string) => void,
        get: (t: XiphComment) => string,
        key: string
    ) {
        // Arrange
        const tag = XiphComment.fromEmpty();
        const setProp = (v: string) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.isUndefined(getProp());

        PropertyTests.propertyRoundTrip(setProp, getProp, "foo");
        assert.strictEqual(tag.fieldValueCount, 1);
        assert.include(tag.fieldNames, key);
        assert.deepStrictEqual(tag.getField(key), ["foo"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, undefined);
        assert.strictEqual(tag.fieldValueCount, 0);
    }

    private testUintItem(
        set: (t: XiphComment, v: number) => void,
        get: (t: XiphComment) => number,
        key: string
    ) {
        // Arrange
        const tag = XiphComment.fromEmpty();
        const setProp = (v: number) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        // Initially empty
        assert.strictEqual(getProp(), 0);

        // Test invalid values
        Testers.testUint(setProp);

        // Test valid values
        PropertyTests.propertyRoundTrip(setProp, getProp, 123);
        assert.strictEqual(tag.fieldValueCount, 1);
        assert.include(tag.fieldNames, key);
        assert.deepStrictEqual(tag.getField(key), ["123"]);

        // Test clear
        PropertyTests.propertyRoundTrip(setProp, getProp, 0);
        assert.strictEqual(tag.fieldValueCount, 0);
    }
}

@suite class Xiph_Comment_MethodTests {

    private static readonly vendorId = "foo";
    private static readonly title1 = "bar";
    private static readonly title2 = "baz";
    private static readonly encodedOldPictureData = Buffer.from(ByteVector.fromString("fuxbuxqux").data).toString("base64");
    private static getTestComment() {
        const oldPictureItem = `COVERART=${Xiph_Comment_MethodTests.encodedOldPictureData}`;
        const newPictureItem = `METADATA_BLOCK_PICTURE=${XiphTestResources.pictureEncodedBytes}`;
        const titleItem1 = `TITLE=${Xiph_Comment_MethodTests.title1}`;
        const titleItem2 = `TITLE=${Xiph_Comment_MethodTests.title2}`;
        const data = ByteVector.concatenate(
            ByteVector.fromUint(Xiph_Comment_MethodTests.vendorId.length, false),
            ByteVector.fromString(Xiph_Comment_MethodTests.vendorId),
            ByteVector.fromUint(4, false),
            ByteVector.fromUint(titleItem1.length, false),
            ByteVector.fromString(titleItem1),
            ByteVector.fromUint(titleItem2.length, false),
            ByteVector.fromString(titleItem2),
            ByteVector.fromUint(oldPictureItem.length, false),
            ByteVector.fromString(oldPictureItem),
            ByteVector.fromUint(newPictureItem.length, false),
            ByteVector.fromString(newPictureItem)
        );
        return XiphComment.fromData(data);
    }

    @test
    public clear() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act
        comment.clear();

        // Assert
        assert.strictEqual(comment.fieldValueCount, 0);
        assert.sameMembers(comment.fieldNames, []);
        assert.strictEqual(comment.vendorId, Xiph_Comment_MethodTests.vendorId);
        assert.sameMembers(comment.pictures, []);
        assert.strictEqual(comment.tagTypes, TagTypes.Xiph);
        assert.notStrictEqual(comment.sizeOnDisk, 0);
        assert.isTrue(comment.isEmpty);
    }

    @test
    public getField_invalidParameters() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act / Assert
        Testers.testString(comment.getField);
        assert.throws(() => comment.getField("COVERART"));
        assert.throws(() => comment.getField("METADATA_BLOCK_PICTURE"));
    }

    @test
    public getField_fieldExists() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act
        const output = comment.getField("TitlE");

        // Assert
        assert.isOk(output);
        assert.sameMembers(output, [Xiph_Comment_MethodTests.title1, Xiph_Comment_MethodTests.title2]);

        // Act 2
        output.push("qqq");
        const output2 = comment.getField("TitlE");

        // Assert
        assert.sameMembers(output2, [Xiph_Comment_MethodTests.title1, Xiph_Comment_MethodTests.title2]);
    }

    @test
    public getField_fieldDoesNotExist() {
        // Arrange
        const comment = XiphComment.fromEmpty();

        // Act
        const output = comment.getField("foobar");

        // Assert
        assert.isOk(output);
        assert.sameMembers(output, []);

        // Act 2
        output.push("qqq");
        const output2 = comment.getField("foobar");

        // Assert
        assert.sameMembers(output2, []);
    }

    @test
    public getFieldFirstValue_invalidValues() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act / Assert
        Testers.testString(comment.getFieldFirstValue);
        assert.throws(() => comment.getFieldFirstValue("COVERART"));
        assert.throws(() => comment.getFieldFirstValue("METADATA_BLOCK_PICTURE"));
    }

    @test
    public getFieldFirstValue_fieldExists() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act
        const output = comment.getFieldFirstValue("TitlE");

        // Assert
        assert.strictEqual(output, Xiph_Comment_MethodTests.title1);
    }

    @test
    public getFieldFirstValue_fieldDoesNotExist() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act
        const output = comment.getFieldFirstValue("foobar");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public removeField_invalidValues() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act / Assert
        Testers.testString(comment.removeField);
        assert.throws(() => comment.removeField("COVERART"));
        assert.throws(() => comment.removeField("METADATA_BLOCK_PICTURE"));
    }

    @test
    public removeValue_fieldExists() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act
        comment.removeField("TitlE");

        // Assert
        assert.notInclude(comment.fieldNames, "TITLE");
        assert.sameMembers(comment.getField("TITLE"), []);
    }

    @test
    public removeValue_fieldDoesNotExist() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act
        comment.removeField("foobar");

        // Assert
        assert.include(comment.fieldNames, "TITLE");
    }

    @test
    public render_emptyCommentNoFramingBit() {
        // Arrange
        const comment = XiphComment.fromEmpty();

        // Act
        const output = comment.render(false);

        // Assert
        const expectedOutput = ByteVector.concatenate(
            ByteVector.fromUint(0, false),
            ByteVector.fromUint(0, false),
        );
        assert.isTrue(ByteVector.equal(output, expectedOutput));
    }

    @test
    public render_emptyCommentHasFramingBit() {
        // Arrange
        const comment = XiphComment.fromEmpty();

        // Act
        const output = comment.render(true);

        // Assert
        const expectedOutput = ByteVector.concatenate(
            ByteVector.fromUint(0, false),
            ByteVector.fromUint(0, false),
            0x01
        );
        Testers.bvEqual(output, expectedOutput);
    }

    @test
    public render_hasContents() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act
        const output = comment.render(false);

        // Assert
        const titleItem1 = `TITLE=${Xiph_Comment_MethodTests.title1}`;
        const titleItem2 = `TITLE=${Xiph_Comment_MethodTests.title2}`;
        const picture1EncodedBytes = XiphPicture.fromPicture(comment.pictures[0]).renderForXiphComment();
        const pictureItem1 = `METADATA_BLOCK_PICTURE=${picture1EncodedBytes}`;
        const pictureItem2 = `METADATA_BLOCK_PICTURE=${XiphTestResources.pictureEncodedBytes}`;
        const expected = ByteVector.concatenate(
            ByteVector.fromUint(Xiph_Comment_MethodTests.vendorId.length, false),
            ByteVector.fromString(Xiph_Comment_MethodTests.vendorId),
            ByteVector.fromUint(4, false),
            ByteVector.fromUint(titleItem1.length, false),
            ByteVector.fromString(titleItem1),
            ByteVector.fromUint(titleItem2.length, false),
            ByteVector.fromString(titleItem2),
            ByteVector.fromUint(pictureItem1.length, false),
            ByteVector.fromString(pictureItem1),
            ByteVector.fromUint(pictureItem2.length, false),
            ByteVector.fromString(pictureItem2)
        );
        Testers.bvEqual(output, expected);
    }

    @test
    public setFieldAsString_invalidValues() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act / Assert
        Testers.testString((v: string) => comment.setFieldAsStrings(v));
        assert.throws(() => comment.setFieldAsStrings("COVERART"));
        assert.throws(() => comment.setFieldAsStrings("METADATA_BLOCK_PICTURE"));
    }

    @test
    public setFieldAsString_removesField() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act
        comment.setFieldAsStrings("TitlE");

        // Assert
        assert.notInclude(comment.fieldNames, "TITLE");
        assert.sameMembers(comment.getField("TITLE"), []);
    }

    @test
    public setFieldAsString_allValuesFilteredOutRemovesField() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act
        comment.setFieldAsStrings("TitlE", "", undefined, null, "   ");

        // Assert
        assert.notInclude(comment.fieldNames, "TITLE");
        assert.sameMembers(comment.getField("TITLE"), []);
    }

    @test
    public setFieldAsString_fieldExists() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act
        comment.setFieldAsStrings("TitlE", "nobody's", "accusing", "you");

        // Assert
        assert.include(comment.fieldNames, "TITLE");
        assert.sameMembers(comment.getField("TITLE"), ["nobody's", "accusing", "you"]);
    }

    @test
    public setFieldAsString_fieldDoesNotExist() {
        // Arrange
        const comment = XiphComment.fromEmpty();

        // Act
        comment.setFieldAsStrings("TitlE", "nobody's", "accusing", "you");

        // Assert
        assert.include(comment.fieldNames, "TITLE");
        assert.sameMembers(comment.getField("TITLE"), ["nobody's", "accusing", "you"]);
    }

    @test
    public setFieldAsUint_invalidValues() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act / Assert
        Testers.testString((v: string) => comment.setFieldAsUint(v, 0, 0));
        Testers.testUint((v) => comment.setFieldAsUint("qqq", v, 0));
        Testers.testUint((v) => comment.setFieldAsUint("qqq", 0, v), true);
        assert.throws(() => comment.setFieldAsUint("COVERART", 0));
        assert.throws(() => comment.setFieldAsUint("METADATA_BLOCK_PICTURE", 0));
    }

    @test
    public setFieldAsUint_removesField() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act
        comment.setFieldAsUint("TitlE", 0);

        // Assert
        assert.notInclude(comment.fieldNames, "TITLE");
        assert.sameMembers(comment.getField("TITLE"), []);
    }

    @test
    public setFieldAsUint_fieldExists() {
        // Arrange
        const comment = Xiph_Comment_MethodTests.getTestComment();

        // Act
        comment.setFieldAsUint("TitlE", 3, 3);

        // Assert
        assert.include(comment.fieldNames, "TITLE");
        assert.sameMembers(comment.getField("TITLE"), ["003"]);
    }

    @test
    public setFieldAsUint_fieldDoesNotExist() {
        // Arrange
        const comment = XiphComment.fromEmpty();

        // Act
        comment.setFieldAsUint("TitlE", 3);

        // Assert
        assert.include(comment.fieldNames, "TITLE");
        assert.sameMembers(comment.getField("TITLE"), ["3"]);
    }
}
