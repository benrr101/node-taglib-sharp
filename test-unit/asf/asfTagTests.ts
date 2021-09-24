import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";
import {Mock} from "typemoq";

import AsfTag from "../../src/asf/AsfTag";
import BaseObject from "../../src/asf/objects/baseObject";
import ContentDescriptionObject from "../../src/asf/objects/contentDescriptionObject";
import HeaderObject from "../../src/asf/objects/headerObject";
import PropertyTests from "../utilities/propertyTests";
import TestFile from "../utilities/testFile";
import {ByteVector, StringType} from "../../src/byteVector";
import {Guids} from "../../src/asf/constants";
import {DataType, DescriptorBase} from "../../src/asf/objects/descriptorBase";
import {
    ContentDescriptor,
    ExtendedContentDescriptionObject
} from "../../src/asf/objects/extendedContentDescriptionObject";
import HeaderExtensionObject from "../../src/asf/objects/headerExtensionObject";
import {IPicture, PictureType} from "../../src/iPicture";
import {MetadataDescriptor, MetadataLibraryObject} from "../../src/asf/objects/metadataLibraryObject";
import {TagTypes} from "../../src/tag";
import {TagTesters, Testers} from "../utilities/testers";

// Setup chai
const assert = Chai.assert;

const getHeaderObject: (children: BaseObject[]) => HeaderObject = (children: BaseObject[]) => {
    const childrenBytes = ByteVector.concatenate(... children.map((o) => o.render()));
    const headerBytes = ByteVector.concatenate(
        Guids.AsfHeaderObject.toBytes(), // Object ID
        ByteVector.fromULong(30 + childrenBytes.length, false), // Object size
        ByteVector.fromUInt(children.length, false), // Child objects
        0x01, 0x02, // Reserved bytes
        childrenBytes
    );
    const headerFile = TestFile.getFile(headerBytes);
    return HeaderObject.fromFile(headerFile, 0);
};

const getHeaderExtensionObject: (children: BaseObject[]) => HeaderExtensionObject = (children: BaseObject[]) => {
    const childrenBytes = ByteVector.concatenate(... children.map((o) => o.render()));
    const headerExtBytes = ByteVector.concatenate(
        Guids.AsfHeaderExtensionObject.toBytes(), // Object ID
        ByteVector.fromULong(46 + childrenBytes.length, false), // Object size
        Guids.AsfReserved1.toBytes(), // Reserved field 1
        ByteVector.fromUShort(6, false), // Reserved field 2
        ByteVector.fromUInt(childrenBytes.length, false), // Header extension data length
        childrenBytes
    );
    const headerExtFile = TestFile.getFile(headerExtBytes);
    return HeaderExtensionObject.fromFile(headerExtFile, 0);
};

const getTagWithExtensionDescriptor: (descriptorName: string, descriptorType: DataType, descriptorValue: any) => AsfTag
    = (descriptorName: string, descriptorType: DataType, descriptorValue: any) => {
    const descriptor = new ContentDescriptor(descriptorName, descriptorType, descriptorValue);
    const ecdo = ExtendedContentDescriptionObject.fromEmpty();
    ecdo.addDescriptor(descriptor);

    const header = getHeaderObject([ecdo]);
    return AsfTag.fromHeader(header);
};

@suite class Asf_Tag_ConstructorTests {
    @test
    public fromEmpty() {
        // Act
        const tag = AsfTag.fromEmpty();

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.Asf);
        assert.isOk(tag.contentDescriptionObject);
        assert.isTrue(tag.contentDescriptionObject.isEmpty);
        assert.isOk(tag.extendedContentDescriptionObject);
        assert.isTrue(tag.extendedContentDescriptionObject.isEmpty);

        TagTesters.testTagProperties(tag, {});
    }

    @test
    public fromHeader_falsyHeader() {
        // Act / Assert
        Testers.testTruthy((v: HeaderObject) => AsfTag.fromHeader(v));
    }

    @test
    public fromHeader_noChildren() {
        // Arrange
        const header = getHeaderObject([]);

        // Act
        const tag = AsfTag.fromHeader(header);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.Asf);
        assert.isOk(tag.contentDescriptionObject);
        assert.isTrue(tag.contentDescriptionObject.isEmpty);
        assert.isOk(tag.extendedContentDescriptionObject);
        assert.isTrue(tag.extendedContentDescriptionObject.isEmpty);

        TagTesters.testTagProperties(tag, {});
    }

    @test
    public fromHeader_hasChildren() {
        // Arrange
        // - Content descriptor
        const cdo = ContentDescriptionObject.fromEmpty();
        cdo.title = "foo";

        // - Extended content descriptor
        const contentDescriptor = new ContentDescriptor("bar", DataType.Bool, true);
        const ecdo = ExtendedContentDescriptionObject.fromEmpty();
        ecdo.addDescriptor(contentDescriptor);

        // - Metadata descriptor inside header extension object
        const metadataDescriptor = new MetadataDescriptor(0, 0, "baz", DataType.Bool, true);
        const mlo = MetadataLibraryObject.fromEmpty();
        mlo.addRecord(metadataDescriptor);
        const heo = getHeaderExtensionObject([mlo]);

        const header = getHeaderObject([cdo, ecdo, heo]);

        // Act
        const tag = AsfTag.fromHeader(header);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.Asf);

        assert.isOk(tag.contentDescriptionObject);
        assert.strictEqual(tag.contentDescriptionObject.title, "foo");

        assert.isOk(tag.extendedContentDescriptionObject);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, "bar");

        assert.isOk(tag.metadataLibraryObject);
        assert.strictEqual(tag.metadataLibraryObject.records.length, 1);
        assert.strictEqual(tag.metadataLibraryObject.records[0].name, "baz");

        TagTesters.testTagProperties(tag, {title: "foo"});
    }
}

@suite class Asf_Tag_PropertyTests {
    @test
    public title() {
        this.testContentDescriptorField(
            (t, v) => t.title = v,
            (t) => t.title,
            (cd) => cd.title
        );
    }

    @test
    public subtitle() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.subtitle = v,
            (t) => t.subtitle,
            "WM/SubTitle"
        );
    }

    @test
    public titleSort() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.titleSort = v,
            (t) => t.titleSort,
            "WM/TitleSortOrder"
        );
    }

    @test
    public description() {
        this.testContentDescriptorField(
            (t, v) => t.description = v,
            (t) => t.description,
            (cd) => cd.description
        );
    }

    @test
    public performers() {
        this.testContentDescriptorArray(
            (t, v) => t.performers = v,
            (t) => t.performers,
            (cd) => cd.author
        );
    }

    @test
    public performersSort() {
        this.testExtendedDescriptionObjectStringArray(
            (t, v) => t.performersSort = v,
            (t) => t.performersSort,
            "WM/ArtistSortOrder"
        );
    }

    @test
    public albumArtists() {
        this.testExtendedDescriptionObjectStringArray(
            (t, v) => t.albumArtists = v,
            (t) => t.albumArtists,
            "WM/AlbumArtist", "AlbumArtist"
        );
    }

    @test
    public albumArtistsSort() {
        this.testExtendedDescriptionObjectStringArray(
            (t, v) => t.albumArtistsSort = v,
            (t) => t.albumArtistsSort,
            "WM/AlbumArtistSortOrder"
        );
    }

    @test
    public composers() {
        this.testExtendedDescriptionObjectStringArray(
            (t, v) => t.composers = v,
            (t) => t.composers,
            "WM/Composer", "Composer"
        );
    }

    @test
    public album() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.album = v,
            (t) => t.album,
            "WM/AlbumTitle", "Album"
        );
    }

    @test
    public albumSort() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.albumSort = v,
            (t) => t.albumSort,
            "WM/AlbumSortOrder"
        );
    }

    @test
    public comment() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.comment = v,
            (t) => t.comment,
            "WM/Text"
        );
    }

    @test
    public genres_general() {
        this.testExtendedDescriptionObjectStringArray(
            (t, v) => t.genres = v,
            (t) => t.genres,
            "WM/Genre", "WM/GenreID", "Genre"
        );
    }

    @test
    public genres_hasNumericGenres() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("WM/GenreID", DataType.Unicode, "(13) ; Techno; (32)");

        // Act
        const genres = tag.genres;

        // Assert
        assert.sameMembers(genres, ["Pop", "Techno", "Classical"]);
    }

    @test
    public year_tooShort() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("WM/Year", DataType.Unicode, "222");

        // Act
        const year = tag.year;

        // Assert
        assert.strictEqual(year, 0);
    }

    @test
    public year_general() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act / Assert
        assert.strictEqual(tag.year, 0);

        PropertyTests.propertyRoundTrip((v) => tag.year = v, () => tag.year, 1234);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, "WM/Year");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "1234");
    }

    @test
    public track() {
        this.testExtendedDescriptionObjectUintField(
            (t, v) => t.track = v,
            (t) => t.track,
            "WM/TrackNumber",
            DataType.Unicode,
            (d) => d.getString(),
            "1234"
        );
    }

    @test
    public trackCount() {
        this.testExtendedDescriptionObjectUintField(
            (t, v) => t.trackCount = v,
            (t) => t.trackCount,
            "TrackTotal",
            DataType.DWord,
            (d) => d.getUint(),
            1234
        );
    }

    @test
    public disc_noDescriptor_returnsZero() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act
        const disc = tag.disc;

        // Assert
        assert.strictEqual(disc, 0);
    }

    @test
    public disc_noSplit_returnsNumber() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("WM/PartOfSet", DataType.Unicode, "123");

        // Act
        const disc = tag.disc;

        // Assert
        assert.strictEqual(disc, 123);
    }

    @test
    public disc_hasSplit_returnsNumerator() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("WM/PartOfSet", DataType.Unicode, "123/234");

        // Act
        const disc = tag.disc;

        // Assert
        assert.strictEqual(disc, 123);
    }

    @test
    public disc_setInvalidValue() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act / Assert
        Testers.testUint((v) => tag.disc = v);
    }

    @test
    public disc_setToZeroNoCount_removesDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("WM/PartOfSet", DataType.Unicode, "123");

        // Act
        tag.disc = 0;

        // Assert
        assert.strictEqual(tag.disc, 0);
        assert.strictEqual(tag.discCount, 0);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 0);
    }

    @test
    public disc_setToZeroZeroCount_removesDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("WM/PartOfSet", DataType.Unicode, "123/0");

        // Act
        tag.disc = 0;

        // Assert
        assert.strictEqual(tag.disc, 0);
        assert.strictEqual(tag.discCount, 0);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 0);
    }

    @test
    public disc_setToValueNoCount_setsNonfractionalDescriptor() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act
        tag.disc = 123;

        // Assert
        assert.strictEqual(tag.disc, 123);
        assert.strictEqual(tag.discCount, 0);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, "WM/PartOfSet");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "123");
    }

    @test
    public disc_setToValueWithCount_setsFractionalDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("WM/PartOfSet", DataType.Unicode, "888/234");

        // Act
        tag.disc = 123;

        // Assert
        assert.strictEqual(tag.disc, 123);
        assert.strictEqual(tag.discCount, 234);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, "WM/PartOfSet");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "123/234");
    }

    @test
    public discCount_noDescriptor_returnsZero() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act
        const discCount = tag.discCount;

        // Assert
        assert.strictEqual(discCount, 0);
    }

    @test
    public discCount_noSplit_returnsZero() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("WM/PartOfSet", DataType.Unicode, "123");

        // Act
        const discCount = tag.discCount;

        // Assert
        assert.strictEqual(discCount, 0);
    }

    @test
    public discCount_hasSplitInvalidNumber_returnsZero() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("WM/PartOfSet", DataType.Unicode, "123/abc");

        // Act
        const discCount = tag.discCount;

        // Assert
        assert.strictEqual(discCount, 0);
    }

    @test
    public discCount_hasSplit_returnsDenominator() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("WM/PartOfSet", DataType.Unicode, "123/234");

        // Act
        const discCount = tag.discCount;

        // Assert
        assert.strictEqual(discCount, 234);
    }

    @test
    public discCount_setInvalid() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act / Assert
        Testers.testUint((v) => tag.disc = v);
    }

    @test
    public discCount_setToZeroDisc_removesDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("WM/PartOfSet", DataType.Unicode, "0/123");

        // Act
        tag.discCount = 0;

        // Assert
        assert.strictEqual(tag.discCount, 0);
        assert.strictEqual(tag.disc, 0);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 0);
    }

    @test
    public discCount_setToValueNoDisc_setsDescriptor() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act
        tag.discCount = 123;

        // Assert
        assert.strictEqual(tag.discCount, 123);
        assert.strictEqual(tag.disc, 0);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, "WM/PartOfSet");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "0/123");
    }

    @test
    public discCount_setToValueHasDiscNoCount_setsDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("WM/PartOfSet", DataType.Unicode, "123");

        // Act
        tag.discCount = 234;

        // Assert
        assert.strictEqual(tag.discCount, 234);
        assert.strictEqual(tag.disc, 123);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, "WM/PartOfSet");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "123/234");
    }

    @test
    public discCount_setToValueHasDisc_setsDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("WM/PartOfSet", DataType.Unicode, "123/888");

        // Act
        tag.discCount = 234;

        // Assert
        assert.strictEqual(tag.discCount, 234);
        assert.strictEqual(tag.disc, 123);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, "WM/PartOfSet");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "123/234");
    }

    @test
    public lyrics_general() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.lyrics = v,
            (t) => t.lyrics,
            "WM/Lyrics"
        );
    }

    @test
    public grouping() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.grouping = v,
            (t) => t.grouping,
            "WM/ContentGroupDescription"
        );
    }

    @test
    public bpm() {
        this.testExtendedDescriptionObjectUintField(
            (t, v) => t.beatsPerMinute = v,
            (t) => t.beatsPerMinute,
            "WM/BeatsPerMinute",
            DataType.Unicode,
            (d) => d.getString(),
            "1234"
        );
    }

    @test
    public conductor() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.conductor = v,
            (t) => t.conductor,
            "WM/Conductor"
        );
    }

    @test
    public copyright() {
        this.testContentDescriptorField(
            (t, v) => t.copyright = v,
            (t) => t.copyright,
            (cd) => cd.copyright
        );
    }

    @test
    public musicBrainzArtistId() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.musicBrainzArtistId = v,
            (t) => t.musicBrainzArtistId,
            "MusicBrainz/Artist Id"
        );
    }

    @test
    public musicBrainzReleaseGroupId() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.musicBrainzReleaseGroupId = v,
            (t) => t.musicBrainzReleaseGroupId,
            "MusicBrainz/Release Group Id"
        );
    }

    @test
    public musicBrainzReleaseId() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.musicBrainzReleaseId = v,
            (t) => t.musicBrainzReleaseId,
            "MusicBrainz/Album Id"
        );
    }

    @test
    public musicBrainzAlbumArtistId() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.musicBrainzAlbumArtistId = v,
            (t) => t.musicBrainzAlbumArtistId,
            "MusicBrainz/Album Artist Id"
        );
    }

    @test
    public musicBrainzTrackId() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.musicBrainzTrackId = v,
            (t) => t.musicBrainzTrackId,
            "MusicBrainz/Track Id"
        );
    }

    @test
    public musicBrainzDiscId() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.musicBrainzDiscId = v,
            (t) => t.musicBrainzDiscId,
            "MusicBrainz/Disc Id"
        );
    }

    @test
    public musicIpId() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.musicIpId = v,
            (t) => t.musicIpId,
            "MusicIP/PUID"
        );
    }

    @test
    public musicBrainzReleaseStatus() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.musicBrainzReleaseStatus = v,
            (t) => t.musicBrainzReleaseStatus,
            "MusicBrainz/Album Status"
        );
    }

    @test
    public musicBrainzReleaseType() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.musicBrainzReleaseType = v,
            (t) => t.musicBrainzReleaseType,
            "MusicBrainz/Album Type"
        );
    }

    @test
    public musicBrainzReleaseCountry() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.musicBrainzReleaseCountry = v,
            (t) => t.musicBrainzReleaseCountry,
            "MusicBrainz/Album Release Country"
        );
    }

    @test
    public replayGainTrackGain_noDescriptor_returnsNaN() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act
        const rpg = tag.replayGainTrackGain;

        // Assert
        assert.isNaN(rpg);
    }

    @test
    public replayGainTrackGain_noValue_returnsNaN() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Track", DataType.Unicode, "");

        // Act
        const rpg = tag.replayGainTrackGain;

        // Assert
        assert.isNaN(rpg);
    }

    @test
    public replayGainTrackGain_invalid_returnsNaN() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Track", DataType.Unicode, "   abcde ");

        // Act
        const rpg = tag.replayGainTrackGain;

        // Assert
        assert.isNaN(rpg);
    }

    @test
    public replayGainTrackGain_hasValueWithoutDb_returnsValue() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Track", DataType.Unicode, "1.23");

        // Act
        const rpg = tag.replayGainTrackGain;

        // Assert
        assert.strictEqual(rpg, 1.23);
    }

    @test
    public replayGainTrackGain_hasValueWithDb_returnsValue() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Track", DataType.Unicode, "1.23 dB");

        // Act
        const rpg = tag.replayGainTrackGain;

        // Assert
        assert.strictEqual(rpg, 1.23);
    }

    @test
    public replayGainTrackGain_setInvalid() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act / Assert
        Testers.testTruthy((v: number) => tag.replayGainTrackGain = v);
    }

    @test
    public replayGainTrackGain_setNaNValueExists_removesDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Track", DataType.Unicode, "1.23");

        // Act
        tag.replayGainTrackGain = Number.NaN;

        // Assert
        assert.isNaN(tag.replayGainTrackGain);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 0);
    }

    @test
    public replayGainTrackGain_setValueExists_updatesDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Track", DataType.Unicode, "1.23");

        // Act
        tag.replayGainTrackGain = 1.2345;

        // Assert
        assert.strictEqual(tag.replayGainTrackGain, 1.23);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, "ReplayGain/Track");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "1.23 dB");
    }

    @test
    public replayGainTrackPeak_noValue_returnsNaN() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act
        const rpg = tag.replayGainTrackPeak;

        // Assert
        assert.isNaN(rpg);
    }

    @test
    public replayGainTrackPeak_invalidValue_returnsNaN() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Track Peak", DataType.Unicode, "   abcde");

        // Act
        const rpg = tag.replayGainTrackPeak;

        // Assert
        assert.isNaN(rpg);
    }

    @test
    public replaygainTrackPeak_hasValue_returnsValue() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Track Peak", DataType.Unicode, "1.23");

        // Act
        const rpg = tag.replayGainTrackPeak;

        // Assert
        assert.strictEqual(rpg, 1.23);
    }

    @test
    public replayGainTrackPeak_setInvalid() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act / Assert
        Testers.testTruthy((v: number) => tag.replayGainTrackPeak = v);
    }

    @test
    public replayGainTrackPeak_setNaNValueExists_removesDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Track Peak", DataType.Unicode, "1.23");

        // Act
        tag.replayGainTrackPeak = Number.NaN;

        // Assert
        assert.isNaN(tag.replayGainTrackPeak);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 0);
    }

    @test
    public replayGainTrackPeak_setValueExists_updatesDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Track Peak", DataType.Unicode, "1.23");

        // Act
        tag.replayGainTrackPeak = 1.23456789;

        // Assert
        assert.strictEqual(tag.replayGainTrackPeak, 1.234568);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, "ReplayGain/Track Peak");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "1.234568");
    }

    @test
    public replayGainAlbumGain_noDescriptor_returnsNaN() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act
        const rpg = tag.replayGainAlbumGain;

        // Assert
        assert.isNaN(rpg);
    }

    @test
    public replayGainAlbumGain_noValue_returnsNaN() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Album", DataType.Unicode, "");

        // Act
        const rpg = tag.replayGainAlbumGain;

        // Assert
        assert.isNaN(rpg);
    }

    @test
    public replayGainAlbumGain_invalid_returnsNaN() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Album", DataType.Unicode, "   abcde ");

        // Act
        const rpg = tag.replayGainAlbumGain;

        // Assert
        assert.isNaN(rpg);
    }

    @test
    public replayGainAlbumGain_hasValueWithoutDb_returnsValue() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Album", DataType.Unicode, "1.23");

        // Act
        const rpg = tag.replayGainAlbumGain;

        // Assert
        assert.strictEqual(rpg, 1.23);
    }

    @test
    public replayGainAlbumGain_hasValueWithDb_returnsValue() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Album", DataType.Unicode, "1.23 dB");

        // Act
        const rpg = tag.replayGainAlbumGain;

        // Assert
        assert.strictEqual(rpg, 1.23);
    }

    @test
    public replayGainAlbumGain_setInvalid() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act / Assert
        Testers.testTruthy((v: number) => tag.replayGainAlbumGain = v);
    }

    @test
    public replayGainAlbumGain_setNaNValueExists_removesDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Album", DataType.Unicode, "1.23");

        // Act
        tag.replayGainAlbumGain = Number.NaN;

        // Assert
        assert.isNaN(tag.replayGainAlbumGain);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 0);
    }

    @test
    public replayGainAlbumGain_setValueExists_updatesDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Album", DataType.Unicode, "1.23");

        // Act
        tag.replayGainAlbumGain = 1.2345;

        // Assert
        assert.strictEqual(tag.replayGainAlbumGain, 1.23);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, "ReplayGain/Album");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "1.23 dB");
    }

    @test
    public replayGainAlbumPeak_noValue_returnsNaN() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act
        const rpg = tag.replayGainAlbumPeak;

        // Assert
        assert.isNaN(rpg);
    }

    @test
    public replayGainAlbumPeak_invalidValue_returnsNaN() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Album Peak", DataType.Unicode, "   abcde");

        // Act
        const rpg = tag.replayGainAlbumPeak;

        // Assert
        assert.isNaN(rpg);
    }

    @test
    public replaygainAlbumPeak_hasValue_returnsValue() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Album Peak", DataType.Unicode, "1.23");

        // Act
        const rpg = tag.replayGainAlbumPeak;

        // Assert
        assert.strictEqual(rpg, 1.23);
    }

    @test
    public replayGainAlbumPeak_setInvalid() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act / Assert
        Testers.testTruthy((v: number) => tag.replayGainAlbumPeak = v);
    }

    @test
    public replayGainAlbumPeak_setNaNValueExists_removesDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Album Peak", DataType.Unicode, "1.23");

        // Act
        tag.replayGainAlbumPeak = Number.NaN;

        // Assert
        assert.isNaN(tag.replayGainAlbumPeak);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 0);
    }

    @test
    public replayGainAlbumPeak_setValueExists_updatesDescriptor() {
        // Arrange
        const tag = getTagWithExtensionDescriptor("ReplayGain/Album Peak", DataType.Unicode, "1.23");

        // Act
        tag.replayGainAlbumPeak = 1.23456789;

        // Assert
        assert.strictEqual(tag.replayGainAlbumPeak, 1.234568);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, "ReplayGain/Album Peak");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "1.234568");
    }

    @test
    public pictures_noDescriptors_returnsEmptyArray() {
        // Arrange
        const tag = AsfTag.fromEmpty();

        // Act
        const pictures = tag.pictures;

        // Assert
        assert.isOk(pictures);
        assert.isEmpty(pictures);
    }

    @test
    public pictures_hasDescriptors_returnsPictures() {
        // Arrange
        // - extended content descriptors pic 1 -> too small, is ignored
        const pic1Data = ByteVector.fromSize(5, 0x08);
        const ecdoPic1Descriptor = new ContentDescriptor("WM/Picture", DataType.Bytes, pic1Data);

        // - extended content descriptors pic 2 -> valid
        const pic2PictureData = ByteVector.fromSize(10, 0x08);
        const pic2Data = ByteVector.concatenate(
            PictureType.ColoredFish,
            ByteVector.fromUInt(pic2PictureData.length, false),
            ByteVector.fromString("Ha! Ha!", StringType.UTF16LE),
            ByteVector.getTextDelimiter(StringType.UTF16LE),
            ByteVector.fromString("I'm using the internet!", StringType.UTF16LE),
            ByteVector.getTextDelimiter(StringType.UTF16LE),
            pic2PictureData
        );
        const ecdoPic2Descriptor = new ContentDescriptor("WM/Picture", DataType.Bytes, pic2Data);

        // - metadata library pic 1 -> too small, is ignored
        const mlPic1Descriptor = new MetadataDescriptor(0, 0, "WM/Picture", DataType.Bytes, pic1Data);

        // - metadata library pic 2 -> valid
        const mlPic2Descriptor = new MetadataDescriptor(0, 0, "WM/Picture", DataType.Bytes, pic2Data);

        const ecdo = ExtendedContentDescriptionObject.fromEmpty();
        ecdo.addDescriptor(ecdoPic1Descriptor);
        ecdo.addDescriptor(ecdoPic2Descriptor);

        const mlo = MetadataLibraryObject.fromEmpty();
        mlo.addRecord(mlPic1Descriptor);
        mlo.addRecord(mlPic2Descriptor);

        const headerExtension = getHeaderExtensionObject([mlo]);
        const header = getHeaderObject([ecdo, headerExtension]);
        const tag = AsfTag.fromHeader(header);

        // Act
        const pictures = tag.pictures;

        // Assert
        assert.isOk(pictures);
        assert.strictEqual(pictures.length, 2);
        for (const pic of pictures) {
            assert.isOk(pic);
            assert.strictEqual(pic.description, "I'm using the internet!");
            assert.strictEqual(pic.mimeType, "Ha! Ha!");
            assert.strictEqual(pic.type, PictureType.ColoredFish);
            assert.isUndefined(pic.filename);
            Testers.bvEqual(pic.data, pic2PictureData);
        }
    }

    @test
    public setPictures_small() {
        // Arrange
        const ecdoPicData = ByteVector.fromSize(22, 0x08);
        const ecdoDescriptor = new ContentDescriptor("WM/Picture", DataType.Bytes, ecdoPicData);
        const mloPicData = ByteVector.fromSize(11, 0x08);
        const mloDescriptor = new MetadataDescriptor(0, 0, "WM/Picture", DataType.Bytes, mloPicData);

        const mlo = MetadataLibraryObject.fromEmpty();
        mlo.addRecord(mloDescriptor);

        const ecdo = ExtendedContentDescriptionObject.fromEmpty();
        ecdo.addDescriptor(ecdoDescriptor);

        const headerExtension = getHeaderExtensionObject([mlo]);
        const header = getHeaderObject([headerExtension, ecdo]);
        const tag = AsfTag.fromHeader(header);

        const mockPicture = Mock.ofType<IPicture>();
        const pictureData = ByteVector.fromSize(22, 0x08);
        mockPicture.setup((p) => p.type).returns(() => PictureType.ColoredFish);
        mockPicture.setup((p) => p.data).returns(() => pictureData);
        mockPicture.setup((p) => p.mimeType).returns(() => "Ha! Ha!");
        mockPicture.setup((p) => p.description).returns(() => "I'm using the internet!");

        // Act
        tag.pictures = [mockPicture.object];
        const output = tag.pictures;

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.length, 1);
        assert.isOk(output[0]);
        assert.strictEqual(output[0].description, "I'm using the internet!");
        assert.strictEqual(output[0].mimeType, "Ha! Ha!");
        assert.strictEqual(output[0].type, PictureType.ColoredFish);
        assert.isUndefined(output[0].filename);
        Testers.bvEqual(output[0].data, pictureData);

        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, "WM/Picture");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Bytes);

        assert.strictEqual(tag.metadataLibraryObject.records.length, 0);
    }

    @test
    public setPictures_large() {
        // Arrange
        const ecdoPicData = ByteVector.fromSize(22, 0x08);
        const ecdoDescriptor = new ContentDescriptor("WM/Picture", DataType.Bytes, ecdoPicData);
        const mloPicData = ByteVector.fromSize(11, 0x08);
        const mloDescriptor = new MetadataDescriptor(0, 0, "WM/Picture", DataType.Bytes, mloPicData);

        const mlo = MetadataLibraryObject.fromEmpty();
        mlo.addRecord(mloDescriptor);

        const ecdo = ExtendedContentDescriptionObject.fromEmpty();
        ecdo.addDescriptor(ecdoDescriptor);

        const headerExtension = getHeaderExtensionObject([mlo]);
        const header = getHeaderObject([headerExtension, ecdo]);
        const tag = AsfTag.fromHeader(header);

        const mockPicture = Mock.ofType<IPicture>();
        const pictureData = ByteVector.fromSize(0x10000, 0x08);
        mockPicture.setup((p) => p.type).returns(() => PictureType.ColoredFish);
        mockPicture.setup((p) => p.data).returns(() => pictureData);
        mockPicture.setup((p) => p.mimeType).returns(() => "Ha! Ha!");
        mockPicture.setup((p) => p.description).returns(() => "I'm using the internet!");

        // Act
        tag.pictures = [mockPicture.object];
        const output = tag.pictures;

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.length, 1);
        assert.isOk(output[0]);
        assert.strictEqual(output[0].description, "I'm using the internet!");
        assert.strictEqual(output[0].mimeType, "Ha! Ha!");
        assert.strictEqual(output[0].type, PictureType.ColoredFish);
        assert.isUndefined(output[0].filename);
        Testers.bvEqual(output[0].data, pictureData);

        assert.strictEqual(tag.metadataLibraryObject.records.length, 1);
        assert.strictEqual(tag.metadataLibraryObject.records[0].name, "WM/Picture");
        assert.strictEqual(tag.metadataLibraryObject.records[0].type, DataType.Bytes);
        assert.strictEqual(tag.metadataLibraryObject.records[0].streamNumber, 0);
        assert.strictEqual(tag.metadataLibraryObject.records[0].languageListIndex, 0);

        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 0);
    }

    private testContentDescriptorArray(
        set: (t: AsfTag, v: string[]) => void,
        get: (t: AsfTag) => string[],
        cdProperty: (cd: ContentDescriptionObject) => string
    ) {
        // Arrange
        const tag = AsfTag.fromEmpty();
        const setProp = (v: string[]) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.deepStrictEqual(getProp(), []);

        PropertyTests.propertyRoundTrip(setProp, getProp, ["foo", "bar", "baz"]);
        assert.strictEqual(cdProperty(tag.contentDescriptionObject), "foo; bar; baz");

        PropertyTests.propertyRoundTrip(setProp, getProp, []);
        assert.isUndefined(cdProperty(tag.contentDescriptionObject));
    }

    private testContentDescriptorField(
        set: (t: AsfTag, v: string) => void,
        get: (t: AsfTag) => string,
        cdProperty: (cd: ContentDescriptionObject) => string
    ) {
        // Arrange
        const tag = AsfTag.fromEmpty();
        const setProp = (v: string) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.isUndefined(getProp());

        PropertyTests.propertyRoundTrip(setProp, getProp, "foo");
        assert.strictEqual(cdProperty(tag.contentDescriptionObject), "foo");

        PropertyTests.propertyRoundTrip(setProp, getProp, undefined);
        assert.isUndefined(cdProperty(tag.contentDescriptionObject));
    }

    private testExtendedDescriptionObjectStringArray(
        set: (t: AsfTag, v: string[]) => void,
        get: (t: AsfTag) => string[],
        ...descriptorName: string[]
    ) {
        // TEST CASE 1: Basic Case -----------------------------------------
        // Arrange
        const tag = AsfTag.fromEmpty();
        const setProp = (v: string[]) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.deepStrictEqual(getProp(), []);

        PropertyTests.propertyRoundTrip(setProp, getProp, ["foo", "bar", "baz"]);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, descriptorName[0]);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "foo; bar; baz");

        // End test cases if there's only one descriptor name
        if (descriptorName.length === 1) {
            return;
        }

        // TEST CASE 2: Preferential descriptor names ----------------------
        for (let i = 0; i < descriptorName.length; i++) {
            // Arrange
            const ecdo = ExtendedContentDescriptionObject.fromEmpty();
            for (let j = descriptorName.length; j > i; j--) {
                const descriptor = new ContentDescriptor(descriptorName[j - 1], DataType.Unicode, `foo${j - 1};bar`);
                ecdo.addDescriptor(descriptor);
            }

            const headerObject = getHeaderObject([ecdo]);
            const tag2 = AsfTag.fromHeader(headerObject);
            const setProp2 = (v: string[]) => set(tag2, v);
            const getProp2 = () => get(tag2);

            // Act / Assert
            assert.deepStrictEqual(getProp2(), [`foo${i}`, "bar"]);

            PropertyTests.propertyRoundTrip(setProp2, getProp2, ["fux", "bux", "qux"]);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors.length, 1);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors[0].name, descriptorName[0]);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors[0].getString(), "fux; bux; qux");
        }
    }

    private testExtendedDescriptionObjectStringField(
        set: (t: AsfTag, v: string) => void,
        get: (t: AsfTag) => string,
        ...descriptorName: string[]
    ) {
        // TEST CASE 1: Basic Case -----------------------------------------
        // Arrange
        const tag = AsfTag.fromEmpty();
        const setProp = (v: string) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.isUndefined(getProp());

        PropertyTests.propertyRoundTrip(setProp, getProp, "foo");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, descriptorName[0]);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "foo");

        // End test cases if there's only one descriptor name
        if (descriptorName.length === 1) {
            return;
        }

        // TEST CASE 2: Preferential descriptor names ----------------------
        for (let i = 0; i < descriptorName.length; i++) {
            // Arrange
            const edco = ExtendedContentDescriptionObject.fromEmpty();
            for (let j = descriptorName.length; j > i; j--) {
                const descriptor = new ContentDescriptor(descriptorName[j - 1], DataType.Unicode, `foo${j - 1}`);
                edco.addDescriptor(descriptor);
            }

            const headerObject = getHeaderObject([edco]);
            const tag2 = AsfTag.fromHeader(headerObject);
            const setProp2 = (v: string) => set(tag2, v);
            const getProp2 = () => get(tag2);

            // Act / Assert
            assert.strictEqual(getProp2(), `foo${i}`);

            PropertyTests.propertyRoundTrip(setProp2, getProp2, "fux");
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors.length, 1);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors[0].name, descriptorName[0]);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors[0].getString(), "fux");
        }
    }

    private testExtendedDescriptionObjectUintField(
        set: (t: AsfTag, v: number) => void,
        get: (t: AsfTag) => number,
        descriptorName: string,
        expectedDescriptorType: DataType,
        expectedDescriptorReader: (d: DescriptorBase) => any,
        expectedDescriptorValue: any
    ) {
        // CASE 1: Default behavior ----------------------------------------
        // Arrange
        const tag = AsfTag.fromEmpty();
        const setProp = (v: number) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        Testers.testUint((v) => setProp(v));

        assert.strictEqual(getProp(), 0);

        PropertyTests.propertyRoundTrip(setProp, getProp, 1234);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, descriptorName);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, expectedDescriptorType);
        assert.strictEqual(
            expectedDescriptorReader(tag.extendedContentDescriptionObject.descriptors[0]),
            expectedDescriptorValue
        );

        PropertyTests.propertyRoundTrip(setProp, getProp, 0);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 0);

        // CASE 2: Load unicode or dword -----------------------------------
        const types = [
            {dataType: DataType.Unicode, value: "1234"},
            {dataType: DataType.DWord, value: 1234}
        ];
        for (const params of types) {
            // Arrange
            const descriptor = new ContentDescriptor(descriptorName, params.dataType, params.value);
            const ecdo = ExtendedContentDescriptionObject.fromEmpty();
            ecdo.addDescriptor(descriptor);

            const header = getHeaderObject([ecdo]);
            const tag2 = AsfTag.fromHeader(header);

            // Act / Assert
            assert.strictEqual(get(tag2), 1234);
        }
    }
}

@suite class Asf_Tag_MethodTests {
    @test
    public pictureFromData_tooSmall() {
        // Arrange
        const data = ByteVector.fromSize(5);

        // Act
        const output = AsfTag.pictureFromData(data);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public pictureFromData_missingMimeTypeDelimiter() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUInt(1234, false),
            ByteVector.fromSize(10, 0x01)
        );

        // Act
        const output = AsfTag.pictureFromData(data);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public pictureFromData_missingMimeTypeDelimiterWithZeroes() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUInt(1234, false),
            ByteVector.fromSize(10, 0x00)
        );

        // Act
        const output = AsfTag.pictureFromData(data);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public pictureFromData_missingDescriptionDelimiter() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUInt(1234, false),
            ByteVector.fromString("Ha! Ha!", StringType.UTF16LE),
            ByteVector.getTextDelimiter(StringType.UTF16LE),
            ByteVector.fromSize(10, 0x01)
        );

        // Act
        const output = AsfTag.pictureFromData(data);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public pictureFromData_missingDescriptionDelimiterWithZeroes() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUInt(1234, false),
            ByteVector.fromString("Ha! Ha!", StringType.UTF16LE),
            ByteVector.getTextDelimiter(StringType.UTF16LE),
            ByteVector.fromSize(10, 0x00)
        );

        // Act
        const output = AsfTag.pictureFromData(data);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public pictureFromData_properlyFormed() {
        // Arrange
        const pictureData = ByteVector.fromSize(22, 0x08);
        const data = ByteVector.concatenate(
            PictureType.ColoredFish,
            ByteVector.fromUInt(pictureData.length, false),
            ByteVector.fromString("Ha! Ha!", StringType.UTF16LE),
            ByteVector.getTextDelimiter(StringType.UTF16LE),
            ByteVector.fromString("I'm using the internet!", StringType.UTF16LE),
            ByteVector.getTextDelimiter(StringType.UTF16LE),
            pictureData
        );

        // Act
        const output = AsfTag.pictureFromData(data);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.description, "I'm using the internet!");
        assert.strictEqual(output.mimeType, "Ha! Ha!");
        assert.strictEqual(output.type, PictureType.ColoredFish);
        assert.isUndefined(output.filename);
        Testers.bvEqual(output.data, pictureData);
    }

    @test
    public pictureToData() {
        // Arrange
        const pictureData = ByteVector.fromSize(10, 0x08);

        const mockPicture = Mock.ofType<IPicture>();
        mockPicture.setup((p) => p.type).returns(() => PictureType.ColoredFish);
        mockPicture.setup((p) => p.data).returns(() => pictureData);
        mockPicture.setup((p) => p.mimeType).returns(() => "Ha! Ha!");
        mockPicture.setup((p) => p.description).returns(() => "I'm using the internet!");

        // Act
        const output = AsfTag.pictureToData(mockPicture.object);

        // Assert
        const expected = ByteVector.concatenate(
            PictureType.ColoredFish,
            ByteVector.fromUInt(pictureData.length, false),
            ByteVector.fromString("Ha! Ha!", StringType.UTF16LE),
            ByteVector.getTextDelimiter(StringType.UTF16LE),
            ByteVector.fromString("I'm using the internet!", StringType.UTF16LE),
            ByteVector.getTextDelimiter(StringType.UTF16LE),
            pictureData
        );
        Testers.bvEqual(output, expected);
    }
}
