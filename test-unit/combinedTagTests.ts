import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import ApeTag from "../src/ape/apeTag";
import CombinedTag from "../src/combinedTag";
import Id3v2Tag from "../src/id3v2/id3v2Tag";
import PropertyTests from "./utilities/propertyTests";
import XiphComment from "../src/xiph/xiphComment";
import {Tag, TagTypes} from "../src/tag";
import {TagTesters, Testers} from "./utilities/testers";
import {Mock} from "typemoq";
import {IPicture} from "../src";

@suite class CombinedTag_MethodTests {
    @test
    public constructor_noTags() {
        // Arrange
        const tagTypes = TagTypes.DivX | TagTypes.Xiph;

        // Act
        const tag = new TestCombinedTag(tagTypes, undefined);

        // Assert
        assert.isOk(tag);
        assert.isOk(tag.tags);
        assert.isEmpty(tag.tags);
        assert.strictEqual(tag.supportedTagTypes, tagTypes);
        assert.strictEqual(tag.tagTypes, TagTypes.None);
        assert.strictEqual(tag.sizeOnDisk, 0);
        assert.isTrue(tag.isEmpty);

        TagTesters.testTagProperties(tag, {});
    }

    @test
    public constructor_hasTags() {
        // Arrange
        const tagTypes = TagTypes.DivX | TagTypes.Xiph;
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.title = "fuxbuxquxx";
        const tags = [ id3v2Tag, apeTag ];

        // Act
        const tag = new TestCombinedTag(tagTypes, true, tags);

        // Assert
        assert.isOk(tag);
        assert.sameMembers(tag.tags, tags);
        assert.notEqual(tag.tags, tags);

        assert.strictEqual(tag.supportedTagTypes, tagTypes);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.strictEqual(tag.sizeOnDisk, id3v2Tag.sizeOnDisk + apeTag.sizeOnDisk);
        assert.isFalse(tag.isEmpty);

        TagTesters.testTagProperties(tag, {
            album: "foobarbaz",
            title: "fuxbuxquxx"
        });
    }

    @test
    public constructor_hasNestedCombinedTags() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.title = "fuxbuxquxx";
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, true, [id3v2Tag]);

        // Act
        const rootTag = new TestCombinedTag(TagTypes.AllTags, true, [nestedTag, apeTag]);

        // Assert
        assert.isOk(rootTag);
        assert.sameMembers(rootTag.tags, [apeTag, id3v2Tag]);
        assert.strictEqual(rootTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.strictEqual(rootTag.sizeOnDisk, id3v2Tag.sizeOnDisk + apeTag.sizeOnDisk);
        assert.isFalse(rootTag.isEmpty);

        TagTesters.testTagProperties(rootTag, {
            album: "foobarbaz",
            title: "fuxbuxquxx"
        });
    }

    @test
    public clear_clearsAllTags() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.title = "fuxbuxquxx";
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, true, [id3v2Tag]);
        const rootTag = new TestCombinedTag(TagTypes.AllTags, true, [nestedTag, apeTag]);

        // Act
        rootTag.clear();

        // Assert
        assert.isTrue(rootTag.isEmpty);
        assert.sameMembers(rootTag.tags, [id3v2Tag, apeTag]);
        assert.isTrue(nestedTag.isEmpty);
        assert.isTrue(id3v2Tag.isEmpty);
        assert.isTrue(apeTag.isEmpty);
    }

    @test
    public getFirstValue_valueExistsOnBoth() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.album = "fuxbuxquxx";
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, true, tags);

        // Act
        const album = tag.album;

        // Assert
        assert.strictEqual(album, apeTag.album);
    }

    @test
    public getFirstValue_valueExistsOnOne() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, true, tags);

        // Act
        const album = tag.album;

        // Assert
        assert.strictEqual(album, id3v2Tag.album);
    }

    @test
    public getFirstValue_valueExistsOnNeither() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        const apeTag = ApeTag.fromEmpty();
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, true, tags);

        // Act
        const album = tag.album;
        const track = tag.trackCount;

        // Assert
        assert.strictEqual(album, undefined);
        assert.strictEqual(track, 0);
    }

    @test
    public getFirstArray_valueExistsOnBoth() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.performers = ["foo", "bar", "baz"];
        const apeTag = ApeTag.fromEmpty();
        apeTag.performers = ["fux", "bux", "quxx"];
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, true, tags);

        // Act
        const performers = tag.performers;

        // Assert
        assert.sameMembers(performers, apeTag.performers);
    }

    @test
    public getFirstArray_valueExistsOnOne() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.performers = ["foo", "bar", "baz"];
        const apeTag = ApeTag.fromEmpty();
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, true, tags);

        // Act
        const performers = tag.performers;

        // Assert
        assert.sameMembers(performers, id3v2Tag.performers);
    }

    @test
    public getFirstArray_valueExistsOnNeither() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        const apeTag = ApeTag.fromEmpty();
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, true, tags);

        // Act
        const performers = tag.performers;

        // Assert
        assert.isOk(performers);
        assert.isEmpty(performers);
    }

    @test
    public getTag_tagDoesNotExist() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, true, [id3Tag]);
        const apeTag = ApeTag.fromEmpty();
        const rootTag = new TestCombinedTag(TagTypes.AllTags, true, [nestedTag, apeTag]);

        // Act
        const output = rootTag.getTag(TagTypes.Xiph);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public getTag_tagExistsAtRootLevel() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, true, [id3Tag]);
        const apeTag = ApeTag.fromEmpty();
        const rootTag = new TestCombinedTag(TagTypes.AllTags, true, [nestedTag, apeTag]);

        // Act
        const output = rootTag.getTag(TagTypes.Ape);

        // Assert
        assert.strictEqual(output, apeTag);
    }

    @test
    public getTag_tagExistsInNestedTag() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, true, [id3Tag]);
        const apeTag = ApeTag.fromEmpty();
        const rootTag = new TestCombinedTag(TagTypes.AllTags, true, [nestedTag, apeTag]);

        // Act
        const output = rootTag.getTag(TagTypes.Id3v2);

        // Assert
        assert.strictEqual(output, id3Tag);
    }

    @test
    public removeTags_flatList_tagDoesNotExist() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const apeTag = ApeTag.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.AllTags, true, [id3Tag, apeTag]);

        // Act
        tag.removeTags(TagTypes.Xiph);

        // Assert
        assert.sameMembers(tag.tags, [id3Tag, apeTag]);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.strictEqual(tag.sizeOnDisk, id3Tag.sizeOnDisk + apeTag.sizeOnDisk);
    }

    @test
    public removeTags_flatList_tagExists() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const apeTag = ApeTag.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.AllTags, true, [id3Tag, apeTag]);

        // Act
        tag.removeTags(TagTypes.Ape);

        // Assert
        assert.sameMembers(tag.tags, [id3Tag]);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2);
        assert.strictEqual(tag.sizeOnDisk, id3Tag.sizeOnDisk);
    }

    @test
    public removeTags_flatList_allTags() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const apeTag = ApeTag.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.AllTags, true, [id3Tag, apeTag]);

        // Act
        tag.removeTags(TagTypes.AllTags);

        // Assert
        assert.isEmpty(tag.tags);
        assert.strictEqual(tag.tagTypes, TagTypes.None);
        assert.strictEqual(tag.sizeOnDisk, 0);
    }

    @test
    public removeTags_nestedList_tagDoesNotExist() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, true, [id3Tag]);
        const apeTag = ApeTag.fromEmpty();
        const rootTag = new TestCombinedTag(TagTypes.AllTags, true, [nestedTag, apeTag]);

        // Act
        rootTag.removeTags(TagTypes.Xiph);

        // Assert
        assert.sameMembers(rootTag.tags, [id3Tag, apeTag]);
        assert.strictEqual(rootTag.tagTypes, TagTypes.Id3v2 | TagTypes.Ape);
        assert.strictEqual(rootTag.sizeOnDisk, id3Tag.sizeOnDisk + apeTag.sizeOnDisk);

        assert.sameMembers(nestedTag.tags, [id3Tag]);
        assert.strictEqual(nestedTag.tagTypes, TagTypes.Id3v2);
        assert.strictEqual(nestedTag.sizeOnDisk, id3Tag.sizeOnDisk);
    }

    @test
    public removeTags_nestedList_tagExists() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, true, [id3Tag]);
        const apeTag = ApeTag.fromEmpty();
        const rootTag = new TestCombinedTag(TagTypes.AllTags, true, [nestedTag, apeTag]);

        // Act
        rootTag.removeTags(TagTypes.Id3v2);

        // Assert
        assert.sameMembers(rootTag.tags, [apeTag]);
        assert.strictEqual(rootTag.tagTypes, TagTypes.Ape);
        assert.strictEqual(rootTag.sizeOnDisk, apeTag.sizeOnDisk);

        assert.isEmpty(nestedTag.tags);
        assert.strictEqual(nestedTag.tagTypes, TagTypes.None);
        assert.strictEqual(nestedTag.sizeOnDisk, 0);
    }

    @test
    public removeTags_nestedList_allTags() {
        // Arrange
        const id3Tag = Id3v2Tag.fromEmpty();
        const nestedTag = new TestCombinedTag(TagTypes.AllTags, true, [id3Tag]);
        const apeTag = ApeTag.fromEmpty();
        const rootTag = new TestCombinedTag(TagTypes.AllTags, true, [nestedTag, apeTag]);

        // Act
        rootTag.removeTags(TagTypes.AllTags);

        // Assert
        assert.isEmpty(rootTag.tags);
        assert.strictEqual(rootTag.tagTypes, TagTypes.None);
        assert.strictEqual(rootTag.sizeOnDisk, 0);

        assert.isEmpty(nestedTag.tags);
        assert.strictEqual(rootTag.tagTypes, TagTypes.None);
        assert.strictEqual(rootTag.sizeOnDisk, 0);
    }

    @test
    public setValue_writeToAll() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.album = "fuxbuxquxx";
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, true, tags);

        // Act
        tag.album = "something";

        // Assert
        assert.strictEqual(tag.album, "something");
        assert.strictEqual(id3v2Tag.album, "something");
        assert.strictEqual(apeTag.album, "something");
    }

    @test
    public setValue_writeToFirst() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.album = "foobarbaz";
        const apeTag = ApeTag.fromEmpty();
        apeTag.album = "fuxbuxquxx";
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, false, tags);

        // Act
        tag.album = "something";

        // Assert
        assert.strictEqual(tag.album, "something");
        assert.strictEqual(apeTag.album, "something");
        assert.strictEqual(id3v2Tag.album, "foobarbaz");
    }

    @test
    public setUint_writeToAll() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.track = 123;
        const apeTag = ApeTag.fromEmpty();
        apeTag.track = 234;
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, true, tags);

        // Act
        tag.track = 888;

        // Assert
        assert.strictEqual(tag.track, 888);
        assert.strictEqual(id3v2Tag.track, 888);
        assert.strictEqual(apeTag.track, 888);
    }

    @test
    public setUint_writeToFirst() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.track = 123;
        const apeTag = ApeTag.fromEmpty();
        apeTag.track = 234;
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, false, tags);

        // Act
        tag.track = 888;

        // Assert
        assert.strictEqual(tag.track, 888);
        assert.strictEqual(apeTag.track, 888);
        assert.strictEqual(id3v2Tag.track, 123);
    }

    @test
    public setArray_writeToAll() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.performers = ["foo", "bar", "baz"];
        const apeTag = ApeTag.fromEmpty();
        apeTag.performers = ["fux", "bux", "quxx"];
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, true, tags);

        // Act
        tag.performers = ["some", "thing"];

        // Assert
        assert.sameMembers(tag.performers, ["some", "thing"]);
        assert.sameMembers(id3v2Tag.performers, ["some", "thing"]);
        assert.sameMembers(apeTag.performers, ["some", "thing"]);
    }

    @test
    public setArray_writeToFirst() {
        // Arrange
        const id3v2Tag = Id3v2Tag.fromEmpty();
        id3v2Tag.performers = ["foo", "bar", "baz"];
        const apeTag = ApeTag.fromEmpty();
        apeTag.performers = ["fux", "bux", "quxx"];
        const tags = [ apeTag, id3v2Tag ];
        const tag = new TestCombinedTag(TagTypes.AllTags, false, tags);

        // Act
        tag.performers = ["some", "thing"];

        // Assert
        assert.sameMembers(tag.performers, ["some", "thing"]);
        assert.sameMembers(apeTag.performers, ["some", "thing"]);
        assert.sameMembers(id3v2Tag.performers, ["foo", "bar", "baz"]);
    }

    @test
    public protected_addTag() {
        // Arrange
        const tag = new TestCombinedTag(TagTypes.AllTags, true, []);
        const newTag = Id3v2Tag.fromEmpty();

        // Act
        tag.testAddTag(newTag);

        // Assert
        assert.sameMembers(tag.tags, [newTag]);
        assert.strictEqual(tag.tagTypes,  TagTypes.Id3v2);
        assert.strictEqual(tag.sizeOnDisk, newTag.sizeOnDisk);
    }

    @test
    public protected_validateTagCreation_notSupported() {
        // Arrange
        const tag = new TestCombinedTag(TagTypes.Ape | TagTypes.Id3v2, true, []);

        // Act / Assert
        assert.throws(() => tag.testValidateTagCreation(TagTypes.Xiph));
    }

    @test
    public protected_validateTagCreation_alreadyExists() {
        // Arrange
        const apeTag = ApeTag.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.Ape | TagTypes.Id3v2, true, [apeTag]);

        // Act / Assert
        assert.throws(() => tag.testValidateTagCreation(TagTypes.Ape));
    }

    @test
    public protected_validateTagCreation_success() {
        // Arrange
        const tag = new TestCombinedTag(TagTypes.Ape | TagTypes.Id3v2, true, []);

        // Act / Assert
        assert.doesNotThrow(() => tag.testValidateTagCreation(TagTypes.Ape));
    }
}

@suite class CombinedTag_PropertyTests {
    @test
    public title() {
        this.testTextItem((t, v) => { t.title = v; }, (t) => t.title);
    }

    @test
    public titleSort() {
        this.testTextItem((t, v) => { t.titleSort = v; }, (t) => t.titleSort);
    }

    @test
    public subtitle() {
        this.testTextItem((t, v) => { t.subtitle = v; }, (t) => t.subtitle);
    }

    @test
    public description() {
        this.testTextItem((t, v) => { t.description = v; }, (t) => t.description);
    }

    @test
    public performers() {
        this.testTextArrayItem((t, v) => { t.performers = v; }, (t) => t.performers);
    }

    @test
    public performersSort() {
        this.testTextArrayItem((t, v) => { t.performersSort = v; }, (t) => t.performersSort);
    }

    @test
    public performersRole() {
        this.testTextArrayItem((t, v) => { t.performersRole = v; }, (t) => t.performersRole);
    }

    @test
    public albumArtists() {
        this.testTextArrayItem((t, v) => { t.albumArtists = v; }, (t) => t.albumArtists);
    }

    @test
    public albumArtistsSort() {
        this.testTextArrayItem((t, v) => { t.albumArtistsSort = v; }, (t) => t.albumArtistsSort);
    }

    @test
    public composers() {
        this.testTextArrayItem((t, v) => { t.composers = v; }, (t) => t.composers);
    }

    @test
    public composersSort() {
        this.testTextArrayItem((t, v) => { t.composersSort = v; }, (t) => t.composersSort);
    }

    @test
    public album() {
        this.testTextItem((t, v) => { t.album = v; }, (t) => t.album);
    }

    @test
    public albumSort() {
        this.testTextItem((t, v) => { t.albumSort = v; }, (t) => t.albumSort);
    }

    @test
    public comment() {
        this.testTextItem((t, v) => { t.comment = v; }, (t) => t.comment);
    }

    @test
    public genres() {
        this.testTextArrayItem((t, v) => { t.genres = v; }, (t) => t.genres);
    }

    @test
    public year() {
        this.testUintItem((t, v) => { t.year = v; }, (t) => t.year);
    }
    @test
    public track() {
        this.testUintItem((t, v) => { t.track = v; }, (t) => t.track);
    }

    @test
    public trackCount() {
        this.testUintItem((t, v) => { t.trackCount = v; }, (t) => t.trackCount);
    }

    @test
    public disc() {
        this.testUintItem((t, v) => { t.disc = v; }, (t) => t.disc);
    }

    @test
    public discCount() {
        this.testUintItem((t, v) => { t.discCount = v; }, (t) => t.discCount);
    }

    @test
    public lyrics() {
        this.testTextItem((t, v) => { t.lyrics = v; }, (t) => t.lyrics);
    }

    @test
    public grouping() {
        this.testTextItem((t, v) => { t.grouping = v; }, (t) => t.grouping);
    }

    @test
    public beatsPerMinutes() {
        this.testUintItem((t, v) => { t.beatsPerMinute = v; }, (t) => t.beatsPerMinute);
    }

    @test
    public conductor() {
        this.testTextItem((t, v) => { t.conductor = v; }, (t) => t.conductor);
    }

    @test
    public copyright() {
        this.testTextItem((t, v) => { t.copyright = v; }, (t) => t.copyright);
    }

    @test
    public dateTagged() {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        const comment2 = XiphComment.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.None, true, [comment1, comment2]);

        const set = (v: Date) => { tag.dateTagged = v; };

        // Act / Assert
        assert.isUndefined(tag.dateTagged);

        const date = new Date("2020-04-25 12:34:56");
        PropertyTests.propertyRoundTrip(set, () => tag.dateTagged, date);
        assert.deepStrictEqual(comment1.dateTagged, date);
        assert.deepStrictEqual(comment2.dateTagged, date);

        PropertyTests.propertyRoundTrip(set, () => tag.dateTagged, undefined);
        assert.isUndefined(comment1.dateTagged);
        assert.isUndefined(comment2.dateTagged);
    }

    @test
    public musicBrainzArtistId() {
        this.testTextItem((t, v) => { t.musicBrainzArtistId = v; }, (t) => t.musicBrainzArtistId);
    }

    @test
    public musicBrainzReleaseGroupId() {
        this.testTextItem((t, v) => { t.musicBrainzReleaseGroupId = v; }, (t) => t.musicBrainzReleaseGroupId);
    }

    @test
    public musicBrainzReleaseId() {
        this.testTextItem((t, v) => { t.musicBrainzReleaseId = v; }, (t) => t.musicBrainzReleaseId);
    }

    @test
    public musicBrainzReleaseArtistId() {
        this.testTextItem((t, v) => { t.musicBrainzReleaseArtistId = v; }, (t) => t.musicBrainzReleaseArtistId);
    }

    @test
    public musicBrainzTrackId() {
        this.testTextItem((t, v) => { t.musicBrainzTrackId = v; }, (t) => t.musicBrainzTrackId);
    }

    @test
    public musicBrainzDiscId() {
        this.testTextItem((t, v) => { t.musicBrainzDiscId = v; }, (t) => t.musicBrainzDiscId);
    }

    @test
    public musicIpId() {
        this.testTextItem((t, v) => { t.musicIpId = v; }, (t) => t.musicIpId);
    }

    @test
    public amazonId() {
        this.testTextItem((t, v) => { t.amazonId = v; }, (t) => t.amazonId);
    }

    @test
    public musicBrainzReleaseStatus() {
        this.testTextItem((t, v) => { t.musicBrainzReleaseStatus = v; }, (t) => t.musicBrainzReleaseStatus);
    }

    @test
    public musicBrainzReleaseType() {
        this.testTextItem((t, v) => { t.musicBrainzReleaseType = v; }, (t) => t.musicBrainzReleaseType);
    }

    @test
    public musicBrainzReleaseCountry() {
        this.testTextItem((t, v) => { t.musicBrainzReleaseCountry = v; }, (t) => t.musicBrainzReleaseCountry);
    }

    @test
    public replayGainTrackGain() {
        this.testFloatingPointItem((t, v) => { t.replayGainTrackGain = v; }, (t) => t.replayGainTrackGain);
    }

    @test
    public replayGainTrackPeak() {
        this.testFloatingPointItem((t, v) => { t.replayGainTrackPeak = v; }, (t) => t.replayGainTrackPeak);
    }

    @test
    public replayGainAlbumGain() {
        this.testFloatingPointItem((t, v) => { t.replayGainAlbumGain = v; }, (t) => t.replayGainAlbumGain);
    }

    @test
    public replayGainAlbumPeak() {
        this.testFloatingPointItem((t, v) => { t.replayGainAlbumPeak = v; }, (t) => t.replayGainAlbumPeak);
    }

    @test
    public pictures() {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        const comment2 = XiphComment.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.None, true, [comment1, comment2]);

        const mockPicture1 = Mock.ofType<IPicture>();
        const mockPicture2 = Mock.ofType<IPicture>();

        // Act / Assert
        assert.ok(tag.pictures);
        assert.isEmpty(tag.pictures);

        // Act 1
        tag.pictures = [mockPicture1.object, mockPicture2.object];

        // Assert 1
        assert.sameMembers(tag.pictures, [mockPicture1.object, mockPicture2.object]);
        assert.sameMembers(comment1.pictures, [mockPicture1.object, mockPicture2.object]);
        assert.sameMembers(comment2.pictures, [mockPicture1.object, mockPicture2.object]);

        // Act 2
        tag.pictures = undefined;

        // Assert 2
        assert.isOk(tag.pictures);
        assert.isEmpty(tag.pictures);
        assert.isEmpty(comment1.pictures);
        assert.isEmpty(comment2.pictures);
    }

    @test
    public isCompilation() {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        const comment2 = XiphComment.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.None, true, [comment1, comment2]);

        // Assert
        assert.isFalse(tag.isCompilation);

        // Act 1
        tag.isCompilation = true;

        // Assert 1
        assert.isTrue(tag.isCompilation);
        assert.isTrue(comment1.isCompilation);
        assert.isTrue(comment2.isCompilation);

        // Act 2
        tag.isCompilation = false;

        // Assert 2
        assert.isFalse(tag.isCompilation);
        assert.isFalse(comment1.isCompilation);
        assert.isFalse(comment2.isCompilation);
    }

    @test
    public initialKey() {
        this.testTextItem((t, v) => { t.initialKey = v; }, (t) => t.initialKey);
    }

    @test
    public remixedBy() {
        this.testTextItem((t, v) => { t.remixedBy = v; }, (t) => t.remixedBy);
    }

    @test
    public publisher() {
        this.testTextItem((t, v) => { t.publisher = v; }, (t) => t.publisher);
    }

    @test
    public isrc() {
        this.testTextItem((t, v) => { t.isrc = v; }, (t) => t.isrc);
    }

    private testFloatingPointItem(set: (t: Tag, v: number) => void, get: (t: Tag) => number) {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        const comment2 = XiphComment.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.None, true, [comment1, comment2]);

        const setProp = (v: number) => set(tag, v);

        // Act / Assert
        // Initially empty
        assert.isNaN(get(tag));

        // Test valid values
        PropertyTests.propertyRoundTrip(setProp, () => get(tag), 1.23);
        assert.strictEqual(get(comment1), 1.23);
        assert.strictEqual(get(comment2), 1.23);

        // Test clear
        PropertyTests.propertyRoundTrip(setProp, () => get(tag), Number.NaN);
        assert.isNaN(get(comment1));
        assert.isNaN(get(comment2));
    }

    private testTextArrayItem(set: (t: Tag, v: string[]) => void, get: (t: Tag) => string[]) {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        const comment2 = XiphComment.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.None, true, [comment1, comment2]);

        const setProp = (v: string[]) => set(tag, v);

        // Act / Assert
        assert.deepStrictEqual(get(tag), []);

        PropertyTests.propertyRoundTrip(setProp, () => get(tag), ["foo", "bar", "baz"]);
        assert.deepStrictEqual(get(comment1), ["foo", "bar", "baz"]);
        assert.deepStrictEqual(get(comment2), ["foo", "bar", "baz"]);

        PropertyTests.propertyRoundTrip(setProp, () => get(tag), []);
        assert.isEmpty(get(comment1));
        assert.isEmpty(get(comment2));
    }

    private testTextItem(set: (t: Tag, v: string) => void, get: (t: Tag) => string) {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        const comment2 = XiphComment.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.None, true, [comment1, comment2]);

        const setProp = (v: string) => set(tag, v);

        // Act / Assert
        assert.isUndefined(get(tag));

        PropertyTests.propertyRoundTrip(setProp, () => get(tag), "foo");
        assert.strictEqual(get(comment1), "foo");
        assert.strictEqual(get(comment2), "foo");

        PropertyTests.propertyRoundTrip(setProp, () => get(tag), undefined);
        assert.isUndefined(get(comment1));
        assert.isUndefined(get(comment2));
    }

    private testUintItem(set: (t: Tag, v: number) => void, get: (t: Tag) => number) {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        const comment2 = XiphComment.fromEmpty();
        const tag = new TestCombinedTag(TagTypes.None, true, [comment1, comment2]);

        const setProp = (v: number) => set(tag, v);

        // Act / Assert
        // Initially empty
        assert.strictEqual(get(tag), 0);

        // Test invalid values
        Testers.testUint(setProp);

        // Test valid values
        PropertyTests.propertyRoundTrip(setProp, () => get(tag), 123);
        assert.strictEqual(get(comment1), 123);
        assert.strictEqual(get(comment2), 123);

        // Test clear
        PropertyTests.propertyRoundTrip(setProp, () => get(tag), 0);
        assert.strictEqual(get(comment1), 0);
        assert.strictEqual(get(comment2), 0);
    }
}

class TestCombinedTag extends CombinedTag {
    public constructor(supportedTagTypes: TagTypes, writeToAll: boolean, tags?: Tag[]) {
        super(supportedTagTypes, writeToAll, tags);
    }

    public createTag(tagType: TagTypes, copy: boolean): Tag {
        return undefined;
    }

    public testAddTag(tag: Tag): void {
        this.addTag(tag);
    }

    public testValidateTagCreation(tagTypes: TagTypes) {
        this.validateTagCreation(tagTypes);
    }
}
