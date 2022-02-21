import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import GroupedComment from "../../src/ogg/groupedComment";
import PropertyTests from "../utilities/propertyTests";
import XiphComment from "../../src/xiph/xiphComment";
import {IPicture} from "../../src/iPicture";
import {Tag, TagTypes} from "../../src/tag";
import {TagTesters, Testers} from "../utilities/testers";

@suite class Ogg_GroupCommentTests {
    @test
    public ctor() {
        // Act
        const tag = new GroupedComment();

        // Assert
        assert.isEmpty(tag.comments);
        assert.isEmpty(tag.serialNumbers);
        assert.strictEqual(tag.tagTypes, TagTypes.None);
        assert.strictEqual(tag.sizeOnDisk, 0);
        assert.isTrue(tag.isEmpty);

        TagTesters.testTagProperties(tag, {});
    }

    @test
    public getComment_invalidParameters() {
        // Arrange
        const groupedComment = new GroupedComment();

        // Act / Assert
        Testers.testUint((v) => groupedComment.getComment(v));
    }

    @test
    public setComment_invalidParameters() {
        // Arrange
        const comment = XiphComment.fromEmpty();
        const groupedComment = new GroupedComment();

        // Act / Assert
        Testers.testUint((v) => groupedComment.setComment(v, comment));
    }

    @test
    public setComment_streamSerialNumberDoesNotExist() {
        // Arrange
        const comment = XiphComment.fromEmpty();
        const groupComment = new GroupedComment();

        // Act
        groupComment.setComment(123, comment);

        // Assert
        assert.strictEqual(groupComment.getComment(123), comment);
        assert.sameMembers(groupComment.comments, [comment]);
        assert.sameMembers(groupComment.serialNumbers, [123]);

        assert.strictEqual(groupComment.tagTypes, TagTypes.Xiph);
    }

    @test
    public setComment_overwrite() {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        const comment2 = XiphComment.fromEmpty();

        const groupComment = new GroupedComment();
        groupComment.setComment(123, comment1);

        // Act
        groupComment.setComment(123, comment2);

        // Assert
        assert.strictEqual(groupComment.getComment(123), comment2);
        assert.sameMembers(groupComment.comments, [comment2]);
        assert.sameMembers(groupComment.serialNumbers, [123]);

        assert.strictEqual(groupComment.tagTypes, TagTypes.Xiph);
    }

    @test
    public setComment_clear() {
        // Arrange
        const comment = XiphComment.fromEmpty();
        const groupComment = new GroupedComment();
        groupComment.setComment(123, comment);

        // Act
        groupComment.setComment(123, undefined);

        // Assert
        assert.isUndefined(groupComment.getComment(123));
        assert.isEmpty(groupComment.comments);
        assert.isEmpty(groupComment.serialNumbers);

        assert.strictEqual(groupComment.tagTypes, TagTypes.None);
    }

    @test
    public clear_clearsAllComments() {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        comment1.album = "foobarbaz";
        const comment2 = XiphComment.fromEmpty();
        comment2.title = "fuxbuxquxx";

        const tag = new GroupedComment();
        tag.setComment(123, comment1);
        tag.setComment(234, comment2);

        // Act
        tag.clear();

        // Assert
        assert.sameMembers(tag.comments, [comment1, comment2]);
        assert.sameMembers(tag.serialNumbers, [123, 234]);
        assert.strictEqual(tag.tagTypes, TagTypes.Xiph);

        assert.isTrue(comment1.isEmpty);
        assert.isTrue(comment2.isEmpty);
        assert.isTrue(tag.isEmpty);
    }
}

@suite class Ogg_GroupedComment_PropertyTests {
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
        const tag = new GroupedComment();
        tag.setComment(123, comment1);
        tag.setComment(234, comment2);

        const set = (v: Date) => { tag.dateTagged = v; };

        // Act / Assert
        assert.isUndefined(tag.dateTagged);

        const date = new Date("2020-04-25 12:34:56");
        PropertyTests.propertyRoundTrip(set, () => tag.dateTagged, date);
        assert.deepStrictEqual(comment1.dateTagged, date);
        assert.isUndefined(comment2.dateTagged);

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
        const tag = new GroupedComment();
        tag.setComment(123, comment1);
        tag.setComment(234, comment2);

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
        assert.isEmpty(comment2.pictures);

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
        const tag = new GroupedComment();
        tag.setComment(123, comment1);
        tag.setComment(234, comment2);

        // Assert
        assert.isFalse(tag.isCompilation);

        // Act 1
        tag.isCompilation = true;

        // Assert 1
        assert.isTrue(tag.isCompilation);
        assert.isTrue(comment1.isCompilation);
        assert.isFalse(comment2.isCompilation);

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
        const tag = new GroupedComment();
        tag.setComment(123, comment1);
        tag.setComment(234, comment2);

        const setProp = (v: number) => set(tag, v);

        // Act / Assert
        // Initially empty
        assert.isNaN(get(tag));

        // Test valid values
        PropertyTests.propertyRoundTrip(setProp, () => get(tag), 1.23);
        assert.strictEqual(get(comment1), 1.23);
        assert.isNaN(get(comment2));

        // Test clear
        PropertyTests.propertyRoundTrip(setProp, () => get(tag), Number.NaN);
        assert.isNaN(get(comment1));
        assert.isNaN(get(comment2));
    }

    private testTextArrayItem(set: (t: Tag, v: string[]) => void, get: (t: Tag) => string[]) {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        const comment2 = XiphComment.fromEmpty();
        const tag = new GroupedComment();
        tag.setComment(123, comment1);
        tag.setComment(234, comment2);

        const setProp = (v: string[]) => set(tag, v);

        // Act / Assert
        assert.deepStrictEqual(get(tag), []);

        PropertyTests.propertyRoundTrip(setProp, () => get(tag), ["foo", "bar", "baz"]);
        assert.deepStrictEqual(get(comment1), ["foo", "bar", "baz"]);
        assert.isEmpty(get(comment2));

        PropertyTests.propertyRoundTrip(setProp, () => get(tag), []);
        assert.isEmpty(get(comment1));
        assert.isEmpty(get(comment2));
    }

    private testTextItem(set: (t: Tag, v: string) => void, get: (t: Tag) => string) {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        const comment2 = XiphComment.fromEmpty();
        const tag = new GroupedComment();
        tag.setComment(123, comment1);
        tag.setComment(234, comment2);

        const setProp = (v: string) => set(tag, v);

        // Act / Assert
        assert.isUndefined(get(tag));

        PropertyTests.propertyRoundTrip(setProp, () => get(tag), "foo");
        assert.strictEqual(get(comment1), "foo");
        assert.isUndefined(get(comment2));

        PropertyTests.propertyRoundTrip(setProp, () => get(tag), undefined);
        assert.isUndefined(get(comment1));
        assert.isUndefined(get(comment2));
    }

    private testUintItem(set: (t: Tag, v: number) => void, get: (t: Tag) => number) {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        const comment2 = XiphComment.fromEmpty();
        const tag = new GroupedComment();
        tag.setComment(123, comment1);
        tag.setComment(234, comment2);

        const setProp = (v: number) => set(tag, v);

        // Act / Assert
        // Initially empty
        assert.strictEqual(get(tag), 0);

        // Test invalid values
        Testers.testUint(setProp);

        // Test valid values
        PropertyTests.propertyRoundTrip(setProp, () => get(tag), 123);
        assert.strictEqual(get(comment1), 123);
        assert.strictEqual(get(comment2), 0);

        // Test clear
        PropertyTests.propertyRoundTrip(setProp, () => get(tag), 0);
        assert.strictEqual(get(comment1), 0);
        assert.strictEqual(get(comment2), 0);
    }
}
