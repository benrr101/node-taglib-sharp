import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import MatroskaTag from "../../src/matroska/matroskaTag";
import MatroskaTagCollection from "../../src/matroska/matroskaTagCollection";
import {TagTesters, Testers} from "../utilities/testers";
import MatroskaAttachment from "../../src/matroska/matroskaAttachment";
import {ByteVector, IPicture, PictureType, StringType, TagTypes} from "../../src";
import {MatroskaTagTarget, MatroskaTagTargetType} from "../../src/matroska/matroskaTagTarget";
import MatroskaTagValue from "../../src/matroska/matroskaTagValue";

@suite
class Matroska_TagCollectionTests {
    @test
    public constructor_invalidValues() {
        // Arrange
        const mockTags = Mock.ofType<MatroskaTag[]>().object;
        const mockAttachments = Mock.ofType<MatroskaAttachment[]>().object;

        // Act / Assert
        Testers.testSafeUint((v) => new MatroskaTagCollection(v, false, mockTags, mockAttachments));
        Testers.testTruthy<MatroskaTag[]>((v) => new MatroskaTagCollection(123, false, v, mockAttachments));
        Testers.testTruthy<MatroskaAttachment[]>((v) => new MatroskaTagCollection(123, false, mockTags, v));
    }

    @test
    public constructor_valid() {
        // Arrange
        const tags: MatroskaTag[] = [];
        const attachments: MatroskaAttachment[] = [];

        // Act
        const collection = new MatroskaTagCollection(123, true, tags, attachments);

        // Assert
        assert.strictEqual(collection.attachments, attachments);
        assert.strictEqual(collection.tags, tags);
        assert.strictEqual(collection.tagTypes, TagTypes.Matroska);
        assert.strictEqual(collection.sizeOnDisk, 123);
        assert.isTrue(collection.isEmpty);
        TagTesters.testTagProperties(collection, {});
    }

    // #region Property Tests

    @test
    public title() {
        this.testStringTag(
            (c) => c.title,
            [MatroskaTagTargetType.EPISODE, undefined],
            [MatroskaTagTargetType.TRACK, undefined],
            "TITLE");
    }

    @test
    public titleSort() {
        this.testStringTag(
            (c) => c.titleSort,
            [MatroskaTagTargetType.EPISODE, undefined],
            [MatroskaTagTargetType.TRACK, undefined],
            "TITLE:SORT_WITH"
        );
    }

    @test
    public subtitle() {
        this.testStringTag(
            (c) => c.subtitle,
            [MatroskaTagTargetType.EPISODE, undefined],
            [MatroskaTagTargetType.TRACK, undefined],
            "SUBTITLE"
        );
    }

    @test
    public description() {
        this.testStringTag(
            (c) => c.description,
            [MatroskaTagTargetType.EPISODE, undefined],
            [MatroskaTagTargetType.TRACK, undefined],
            "SUMMARY"
        );
    }

    @test
    public performers() {
        this.testStringArrayTag(
            (c) => c.performers,
            [MatroskaTagTargetType.EPISODE, MatroskaTagTargetType.SEASON, MatroskaTagTargetType.COLLECTION],
            [
                MatroskaTagTargetType.TRACK,
                MatroskaTagTargetType.ALBUM_PART,
                MatroskaTagTargetType.ALBUM,
                MatroskaTagTargetType.VOLUME,
                MatroskaTagTargetType.COLLECTION
            ],
            "ACTOR",
            "PERFORMER"
        );
    }

    @test
    public performersSort() {
        this.testStringArrayTag(
            (c) => c.performersSort,
            [MatroskaTagTargetType.EPISODE, MatroskaTagTargetType.SEASON, MatroskaTagTargetType.COLLECTION],
            [
                MatroskaTagTargetType.TRACK,
                MatroskaTagTargetType.ALBUM_PART,
                MatroskaTagTargetType.ALBUM,
                MatroskaTagTargetType.VOLUME,
                MatroskaTagTargetType.COLLECTION
            ],
            "ACTOR:SORT_WITH",
            "PERFORMER:SORT_WITH"
        );
    }

    @test
    public performersRole() {
        this.testStringArrayTag(
            (c) => c.performersRole,
            [MatroskaTagTargetType.EPISODE, MatroskaTagTargetType.SEASON, MatroskaTagTargetType.COLLECTION],
            [
                MatroskaTagTargetType.TRACK,
                MatroskaTagTargetType.ALBUM_PART,
                MatroskaTagTargetType.ALBUM,
                MatroskaTagTargetType.VOLUME,
                MatroskaTagTargetType.COLLECTION
            ],
            "ACTOR:CHARACTER",
            "PERFORMER:INSTRUMENTS"
        );
    }

    @test
    public albumArtists() {
        this.testStringArrayTag(
            (c) => c.albumArtists,
            [MatroskaTagTargetType.COLLECTION],
            [MatroskaTagTargetType.ALBUM],
            "ARTIST"
        );
    }

    @test
    public albumArtistsSort() {
        this.testStringArrayTag(
            (c) => c.albumArtistsSort,
            [MatroskaTagTargetType.COLLECTION],
            [MatroskaTagTargetType.ALBUM],
            "ARTIST:SORT_WITH"
        );
    }

    @test
    public composers() {
        this.testStringArrayTag(
            (c) => c.composers,
            [MatroskaTagTargetType.EPISODE],
            [MatroskaTagTargetType.TRACK],
            "COMPOSER"
        );
    }

    @test
    public composersSort() {
        this.testStringArrayTag(
            (c) => c.composersSort,
            [MatroskaTagTargetType.EPISODE],
            [MatroskaTagTargetType.TRACK],
            "COMPOSER:SORT_WITH"
        );
    }

    public album() {
        this.testStringTag(
            (c) => c.album,
            [MatroskaTagTargetType.COLLECTION],
            [MatroskaTagTargetType.ALBUM],
            "TITLE"
        );
    }

    @test
    public albumSort() {
        this.testStringTag(
            (c) => c.albumSort,
            [MatroskaTagTargetType.COLLECTION],
            [MatroskaTagTargetType.ALBUM],
            "TITLE:SORT_WITH"
        );
    }

    @test
    public comment() {
        this.testStringTag(
            (c) => c.comment,
            [MatroskaTagTargetType.EPISODE, MatroskaTagTargetType.SEQUEL, MatroskaTagTargetType.COLLECTION],
            [
                MatroskaTagTargetType.TRACK,
                MatroskaTagTargetType.ALBUM_PART,
                MatroskaTagTargetType.ALBUM,
                MatroskaTagTargetType.VOLUME,
                MatroskaTagTargetType.COLLECTION
            ],
            "COMMENT"
        )
    }

    @test
    public genres() {
        const propertyFunc = (c: MatroskaTagCollection) => c.genres;
        const values = [" 32 ;Rock"].map(v => this.getTestTagValue("GENRE", v));

        // Run tests for video values
        const videoTargets = [
            MatroskaTagTargetType.EPISODE,
            MatroskaTagTargetType.SEQUEL,
            MatroskaTagTargetType.COLLECTION
        ];
        for (const target of videoTargets) {
            this.runTagArrayTest(target, values, true, propertyFunc, ["Religion", "Rock"]);
        }

        // Run the for audio values
        const audioTargets = [
            MatroskaTagTargetType.TRACK,
            MatroskaTagTargetType.ALBUM_PART,
            MatroskaTagTargetType.ALBUM,
            MatroskaTagTargetType.VOLUME,
            MatroskaTagTargetType.COLLECTION
        ];
        for (const target of audioTargets) {
            this.runTagArrayTest(target, values, false, propertyFunc, ["Classical", "Rock"]);
        }
    }

    @test
    public year_fullDate() {
        this.testTag<number>(
            2021,
            (c) => c.year,
            "2021-04-25 09:15:00",
            [
                MatroskaTagTargetType.EPISODE,
                MatroskaTagTargetType.SEQUEL,
                MatroskaTagTargetType.COLLECTION
            ],
            [
                MatroskaTagTargetType.TRACK,
                MatroskaTagTargetType.ALBUM_PART,
                MatroskaTagTargetType.ALBUM,
                MatroskaTagTargetType.VOLUME,
                MatroskaTagTargetType.COLLECTION
            ],
            "DATE_RECORDED"
        )
    }

    @test
    public year_yearOnly() {
        this.testTag<number>(
            2021,
            (c) => c.year,
            "2021",
            [
                MatroskaTagTargetType.EPISODE,
                MatroskaTagTargetType.SEQUEL,
                MatroskaTagTargetType.COLLECTION
            ],
            [
                MatroskaTagTargetType.TRACK,
                MatroskaTagTargetType.ALBUM_PART,
                MatroskaTagTargetType.ALBUM,
                MatroskaTagTargetType.VOLUME,
                MatroskaTagTargetType.COLLECTION
            ],
            "DATE_RECORDED"
        )
    }

    @test
    public track() {
        this.testNumberTag(
            (c) => c.track,
            [MatroskaTagTargetType.EPISODE, undefined],
            [MatroskaTagTargetType.TRACK, undefined],
            "PART_NUMBER"
        );
    }

    @test
    public trackCount() {
        this.testNumberTag(
            (c) => c.trackCount,
            [MatroskaTagTargetType.VOLUME],
            [MatroskaTagTargetType.ALBUM_PART],
            "TOTAL_PARTS"
        );
    }

    @test
    public disc() {
        this.testNumberTag(
            (c) => c.disc,
            [MatroskaTagTargetType.VOLUME],
            [MatroskaTagTargetType.ALBUM_PART],
            "PART_NUMBER"
        );
    }

    @test
    public discCount() {
        this.testNumberTag(
            (c) => c.discCount,
            [MatroskaTagTargetType.COLLECTION],
            [MatroskaTagTargetType.ALBUM],
            "TOTAL_PARTS"
        );
    }

    @test
    public lyrics() {
        this.testStringTag(
            (c) => c.lyrics,
            [MatroskaTagTargetType.EPISODE, undefined],
            [MatroskaTagTargetType.TRACK, undefined],
            "LYRICS"
        );
    }

    @test
    public grouping() {
        this.testStringTag(
            (c) => c.grouping,
            [MatroskaTagTargetType.COLLECTION],
            [MatroskaTagTargetType.ALBUM],
            "GROUPING"
        );
    }

    @test
    public beatsPerMinute() {
        this.testNumberTag(
            (c) => c.beatsPerMinute,
            [MatroskaTagTargetType.EPISODE, undefined],
            [MatroskaTagTargetType.TRACK, undefined],
            "BPM"
        );
    }

    @test
    public conductor() {
        this.testStringTag(
            (c) => c.conductor,
            [MatroskaTagTargetType.EPISODE, undefined],
            [MatroskaTagTargetType.TRACK, undefined],
            "DIRECTOR",
            "CONDUCTOR"
        );
    }

    @test
    public copyright() {
        this.testStringTag(
            (c) => c.copyright,
            [MatroskaTagTargetType.EPISODE, MatroskaTagTargetType.SEQUEL, MatroskaTagTargetType.COLLECTION],
            [
                MatroskaTagTargetType.TRACK,
                MatroskaTagTargetType.ALBUM_PART,
                MatroskaTagTargetType.ALBUM,
                MatroskaTagTargetType.VOLUME,
                MatroskaTagTargetType.COLLECTION
            ],
            "COPYRIGHT"
        );
    }

    @test
    public dateTagged() {
        this.testTag<Date>(
            new Date("2021-04-25 9:15:00"),
            (c) => c.dateTagged,
            "2021-04-25 9:15:00",
            [MatroskaTagTargetType.EPISODE, MatroskaTagTargetType.SEQUEL, MatroskaTagTargetType.COLLECTION],
            [
                MatroskaTagTargetType.TRACK,
                MatroskaTagTargetType.ALBUM_PART,
                MatroskaTagTargetType.ALBUM,
                MatroskaTagTargetType.VOLUME,
                MatroskaTagTargetType.COLLECTION
            ],
            "DATE_TAGGED"
        );
    }

    @test
    public pictures() {
        // Arrange
        const picture = <IPicture>{
            data: ByteVector.fromString("foobarbaz", StringType.UTF8),
            description: "foobarbaz",
            filename: "image.gif",
            type: PictureType.ColoredFish,
            mimeType: "image/gif"
        };
        const picture1 = MatroskaAttachment.fromPicture(picture);
        const picture2 = MatroskaAttachment.fromPicture(picture);
        const collection = new MatroskaTagCollection(123, true, [], [picture1, picture2]);

        // Act
        const pictures = collection.pictures;

        // Assert
        assert.isFalse(collection.isEmpty);
        assert.sameOrderedMembers(pictures, [picture1, picture2]);
    }

    // #endregion

    @test
    public clear() {
        // Arrange
        const tag = Mock.ofType<MatroskaTag>();
        const attachment = Mock.ofType<MatroskaAttachment>();
        const collection = new MatroskaTagCollection(123, true, [tag.object], [attachment.object]);

        // Act
        collection.clear();

        // Assert
        assert.isTrue(collection.isEmpty);
        assert.isEmpty(collection.attachments);
        assert.isEmpty(collection.tags);
    }

    // #region Private Helpers

    private testNumberTag(
        propertyFunc: (c: MatroskaTagCollection) => number,
        videoTargets: Array<MatroskaTagTargetType|undefined>,
        audioTargets: Array<MatroskaTagTargetType|undefined>,
        videoKey: string,
        audioKey: string = videoKey
    ) {
        this.testTag<number>(123, propertyFunc, "123", videoTargets, audioTargets, videoKey, audioKey);
    }

    private testStringTag(
        propertyFunc: (c: MatroskaTagCollection) => string,
        videoTargets: Array<MatroskaTagTargetType|undefined>,
        audioTargets: Array<MatroskaTagTargetType|undefined>,
        videoKey: string,
        audioKey: string = videoKey
    ) {
        this.testTag<string>("foobarbaz", propertyFunc, "foobarbaz", videoTargets, audioTargets, videoKey, audioKey);
    }

    private testStringArrayTag(
        propertyFunc: (c: MatroskaTagCollection) => string[],
        videoTargets: Array<MatroskaTagTargetType|undefined>,
        audioTargets: Array<MatroskaTagTargetType|undefined>,
        videoKey: string,
        audioKey: string = videoKey
    ) {
        this.testTagArray<string>(
            ["foo", "bar", "baz"],
            propertyFunc,
            ["foo", "bar", "baz"],
            videoTargets,
            audioTargets,
            videoKey,
            audioKey
        );
    }

    private getTestTagValue(key: string, value: string): MatroskaTagValue {
        let result;
        const keySplit = key.split(":");
        if (keySplit.length > 1) {
            result = MatroskaTagValue.fromValue(4, keySplit[0], "qqq");
            result.nestedTags = [
                MatroskaTagValue.fromValue(4, keySplit[1], value)
            ]
        } else {
            result = MatroskaTagValue.fromValue(4, keySplit[0], value);
        }

        return result;
    }

    private testTag<TValue>(
        expectedValue: TValue,
        propertyFunc: (c: MatroskaTagCollection) => TValue,
        tagValue: string,
        videoTargets: Array<MatroskaTagTargetType | undefined>,
        audioTargets: Array<MatroskaTagTargetType | undefined>,
        videoKey: string,
        audioKey: string = videoKey
    ): void {
        // Run test for video values
        const videoValue = this.getTestTagValue(videoKey, tagValue);
        for (const target of videoTargets) {
            this.runTagTest(target, videoValue, true, propertyFunc, expectedValue);
        }

        // Run test for audio values
        const audioValue = this.getTestTagValue(audioKey, tagValue);
        for (const target of audioTargets) {
            this.runTagTest(target, audioValue, false, propertyFunc, expectedValue);
        }
    }

    private testTagArray<TValue>(
        expectedValues: TValue[],
        propertyFunc: (c: MatroskaTagCollection) => TValue[],
        tagValues: string[],
        videoTargets: Array<MatroskaTagTargetType|undefined>,
        audioTargets: Array<MatroskaTagTargetType|undefined>,
        videoKey: string,
        audioKey: string = videoKey
    ): void {
        // Run tests for video values
        const videoValues = tagValues.map(v => this.getTestTagValue(videoKey, v));
        for (const target of videoTargets) {
            this.runTagArrayTest(target, videoValues, true, propertyFunc, expectedValues);
        }

        // Run the for audio values
        const audioValues = tagValues.map(v => this.getTestTagValue(audioKey, v));
        for (const target of audioTargets) {
            this.runTagArrayTest(target, audioValues, false, propertyFunc, expectedValues);
        }
    }

    private runTagArrayTest<TValue>(
        targetType: MatroskaTagTargetType,
        tagValues: MatroskaTagValue[],
        isVideo: boolean,
        propertyFunc: (c: MatroskaTagCollection) => TValue[],
        expectedValues: TValue[]
    ) {
        // Arrange
        const targetObj = targetType
            ? MatroskaTagTarget.fromEmpty(targetType)
            : MatroskaTagTarget.fromEmpty();
        const tags = tagValues.map((v) => new MatroskaTag(v, targetObj));
        const collection = new MatroskaTagCollection(123, isVideo, tags, []);

        // Act
        const actualValue = propertyFunc(collection);

        // Assert
        assert.isFalse(collection.isEmpty);
        assert.sameOrderedMembers(
            actualValue,
            expectedValues,
            `Failed isVideo:${isVideo ? "true" : "false"} ` +
            `values:${tagValues.map(v => v.value).join(";")} ` +
            `level:${targetType?.value}`
        );
    }

    private runTagTest<TValue>(
        targetType: MatroskaTagTargetType,
        tagValue: MatroskaTagValue,
        isVideo: boolean,
        propertyFunc: (c: MatroskaTagCollection) => TValue,
        expectedValue: TValue
    ) {
        // Arrange
        const targetObj = targetType
            ? MatroskaTagTarget.fromEmpty(targetType)
            : MatroskaTagTarget.fromEmpty();
        const tag = new MatroskaTag(tagValue, targetObj);
        const collection = new MatroskaTagCollection(123, isVideo, [tag], []);

        // Act
        const actualValue = propertyFunc(collection);

        // Assert
        assert.isFalse(collection.isEmpty);
        if (actualValue instanceof Date && expectedValue instanceof Date) {
            assert.strictEqual(
                actualValue.getTime(),
                expectedValue.getTime(),
                `Failed isVideo:${isVideo ? "true" : "false"} value:${tagValue.value}, level:${targetType?.value}`
            );
        } else {
            assert.strictEqual(
                actualValue,
                expectedValue,
                `Failed isVideo:${isVideo ? "true" : "false"} value:${tagValue.value}, level:${targetType?.value}`
            );
        }
    }

    // #endregion
}
