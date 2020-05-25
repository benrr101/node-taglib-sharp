import {assert} from "chai";
import * as fs from "fs";

import ILazy from "../../src/iLazy";
import TestConstants from "./testConstants";
import Utilities from "./utilities";
import {
    ByteVector,
    CorruptFileError,
    File,
    Picture,
    PictureLazy,
    PictureType,
    ReadStyle,
    Tag,
    TagTypes
} from "../../src";

export enum TestTagLevel {
    Normal,
    Medium,
    High
}

export class StandardFileTests {
    private static readonly samplePicture = TestConstants.getSampleFilePath("sample_gimp.gif");
    private static readonly sampleOther = TestConstants.getSampleFilePath("apple_tags.m4a");

    public static readAudioProperties(file: File): void {
        assert.strictEqual(file.properties.audioSampleRate, 44100);
        assert.strictEqual(Math.floor(file.properties.durationMilliseconds / 1000), 5);
    }

    public static removeStandardTags(sampleFile: string, tmpFile: string, types: TagTypes = TagTypes.AllTags) {
        if (fs.existsSync(tmpFile)) {
            fs.unlinkSync(tmpFile);
        }

        fs.copyFileSync(sampleFile, tmpFile);

        try {
            let tmp = File.createFromPath(tmpFile);
            tmp.removeTags(types);
            tmp.save();

            // Check only if all tags have been removed
            if (types === TagTypes.AllTags) {
                tmp = File.createFromPath(tmpFile);
                StandardFileTests.checkNoTags(tmp.tag);
            }
        } finally {
            Utilities.deleteBestEffort(tmpFile);
        }
    }

    public static writeStandardPictures(
        sampleFile: string,
        tmpFile: string,
        readStyle: ReadStyle = ReadStyle.Average,
        level: TestTagLevel = TestTagLevel.Medium
    ) {
        if (fs.existsSync(tmpFile)) {
            fs.unlinkSync(tmpFile);
        }

        fs.copyFileSync(sampleFile, tmpFile);
        try {
            let file = File.createFromPath(tmpFile, undefined, readStyle);
            assert.ok(file);

            let pics = file.tag.pictures;

            // Raw picture data references
            const raws = new Array<ByteVector>(3);

            // Insert new picture
            pics = [...pics, ...Array(Math.max(3 - pics.length, 0)).fill(undefined)];
            raws[0] = ByteVector.fromPath(StandardFileTests.samplePicture);
            pics[0] = Picture.fromPath(StandardFileTests.samplePicture);
            pics[0].type = PictureType.BackCover;
            pics[0].description = "TEST description 1";

            raws[1] = ByteVector.fromPath(StandardFileTests.sampleOther);
            pics[1] = Picture.fromPath(StandardFileTests.sampleOther);
            pics[1].description = "TEST description 2";

            raws[2] = ByteVector.fromPath(StandardFileTests.samplePicture);
            pics[2] = Picture.fromPath(StandardFileTests.samplePicture);
            pics[2].filename = "renamed.gif";
            pics[2].type = PictureType.Other;
            pics[2].description = "TEST description 3";

            file.tag.pictures = pics;
            file.save();

            // Read back the tags
            file = File.createFromPath(tmpFile, undefined, readStyle);
            assert.isOk(file);
            pics = file.tag.pictures;

            assert.strictEqual(3, pics.length);

            // Lazy picture check
            const isLazy = (readStyle & ReadStyle.PictureLazy) !== 0;
            for (let i = 0; i < 3; i++) {
                if (isLazy) {
                    assert.isTrue(pics[i].hasOwnProperty("isLoaded"));
                    assert.isFalse((<ILazy> <PictureLazy> pics[i]).isLoaded);
                } else {
                    if (pics[i].hasOwnProperty("isLoaded")) {
                        assert.isTrue((<ILazy> <PictureLazy> pics[i]).isLoaded);
                    }
                }
            }

            assert.strictEqual(pics[0].description, "TEST description 1");
            assert.strictEqual(pics[0].mimeType, "image/gif");
            assert.strictEqual(pics[0].data.length, 73);
            assert.isTrue(ByteVector.equal(pics[0].data, raws[0]));

            assert.strictEqual(pics[1].description, "TEST description 2");
            assert.strictEqual(pics[1].data.length, 102400);
            assert.isTrue(ByteVector.equal(pics[1].data, raws[1]));

            assert.strictEqual(pics[2].description, "TEST description 3");
            assert.strictEqual(pics[2].mimeType, "image/gif");
            assert.strictEqual(pics[2].data.length, 73);
            assert.isTrue(ByteVector.equal(pics[2].data, raws[2]));

            // Types and mimetypes assumed to be properly supported at Medium level test
            if (level >= TestTagLevel.Medium) {
                assert.strictEqual(pics[1].mimeType, "audio/mp4");
                assert.strictEqual(pics[0].type, PictureType.BackCover);
                assert.strictEqual(pics[1].type, PictureType.NotAPicture);
                assert.strictEqual(pics[2].type, PictureType.Other);
            } else {
                assert.notStrictEqual(pics[0].type, PictureType.NotAPicture);
                assert.strictEqual(pics[1].type, PictureType.NotAPicture);
                assert.notStrictEqual(pics[2].type, PictureType.NotAPicture);
            }

            // Filename assumed to be properly supported at high level test
            if (level >= TestTagLevel.High) {
                assert.strictEqual(pics[1].filename, "apple_tags.m4a");
            } else if (level >= TestTagLevel.Medium) {
                if (pics[1].filename) {
                    assert.strictEqual(pics[1].filename, "apple_tags.m4a");
                }
            }
        } finally {
            Utilities.deleteBestEffort(tmpFile);
        }
    }

    public static writeStandardTags(
        sampleFile: string,
        tmpFile: string,
        level: TestTagLevel = TestTagLevel.Normal,
        types: TagTypes = TagTypes.AllTags
    ) {
        if (sampleFile !== tmpFile && fs.existsSync(tmpFile)) {
            fs.unlinkSync(tmpFile);
        }

        const shouldCreateTemp = sampleFile !== tmpFile;
        if (shouldCreateTemp) {
            fs.copyFileSync(sampleFile, tmpFile);
        }

        try {
            let tmp = File.createFromPath(tmpFile);
            if (types !== TagTypes.AllTags) {
                tmp.removeTags(~types);
            }

            StandardFileTests.setTags(tmp.tag, level);
            tmp.save();

            tmp = File.createFromPath(tmpFile);
            StandardFileTests.checkTags(tmp.tag, level);
        } finally {
            if (shouldCreateTemp) {
                Utilities.deleteBestEffort(tmpFile);
            }
        }
    }

    private static checkTags(tag: Tag, level: TestTagLevel) {
        assert.strictEqual(tag.album, "TEST album");
        assert.strictEqual(tag.joinedAlbumArtists, "TEST artist 1; TEST artist 2");
        assert.strictEqual(tag.comment, "TEST comment");
        assert.strictEqual(tag.joinedComposers, "TEST composer 1; TEST composer 2");
        assert.strictEqual(tag.conductor, "TEST conductor");
        assert.strictEqual(tag.copyright, "TEST copyright");
        assert.strictEqual(tag.disc, 100);
        assert.strictEqual(tag.discCount, 101);
        assert.strictEqual(tag.joinedGenres, "TEST genre 1; TEST genre 2");
        assert.strictEqual(tag.grouping, "TEST grouping");
        assert.strictEqual(tag.lyrics, "TEST lyrics 1\r\nTEST lyrics 2");
        assert.strictEqual(tag.joinedPerformers, "TEST performer 1; TEST performer 2");
        assert.strictEqual(tag.title, "TEST title");
        assert.strictEqual(tag.subtitle, "TEST subtitle");
        assert.strictEqual(tag.description, "TEST description");
        assert.strictEqual(tag.track, 98);
        assert.strictEqual(tag.trackCount, 99);
        assert.strictEqual(tag.year, 1999);

        if (level >= TestTagLevel.Medium) {
            assert.strictEqual(tag.titleSort, "title sort, TEST");
            assert.strictEqual(tag.albumSort, "album sort, TEST");
            assert.strictEqual(tag.joinedPerformersSort, "performer sort 1, TEST; performer sort 2, TEST");
            assert.strictEqual(tag.composersSort.join(";"), "composer sort 1, TEST; composer sort 2, TEST");
            assert.strictEqual(tag.albumArtistsSort.join(";"), "album artist sort 1, TEST; album artist sort 2, TEST");
            assert.strictEqual(tag.beatsPerMinute, 120);
            assert.strictEqual(tag.performersRole.join("\n"), "TEST role 1a; TEST role 1b\nTEST role 2");

            const dateTagged = (new Date(2017, 9, 12, 22, 47, 42)).getTime();
            assert.strictEqual(tag.dateTagged.getTime(), dateTagged);
        }
    }

    private static checkNoTags(tag: Tag) {
        assert.isNotOk(tag.album);
        assert.isNotOk(tag.joinedAlbumArtists);
        assert.isNotOk(tag.comment);
        assert.isNotOk(tag.conductor);
        assert.isNotOk(tag.copyright);
        assert.isNotOk(tag.grouping);
        assert.isNotOk(tag.lyrics);

        assert.strictEqual(tag.beatsPerMinute, 0);
        assert.strictEqual(tag.disc, 0);
        assert.strictEqual(tag.discCount, 0);
        assert.strictEqual(tag.track, 0);
        assert.strictEqual(tag.trackCount, 0);
        assert.strictEqual(tag.year, 0);

        assert.isNotOk(tag.joinedComposers);
        assert.isNotOk(tag.joinedGenres);
        assert.isNotOk(tag.joinedPerformers);

        assert.isNotOk(tag.title);
        assert.isNotOk(tag.description);
        assert.isNotOk(tag.dateTagged);
        assert.isTrue(!tag.performers || tag.performers.length === 0);
        assert.isTrue(!tag.performersSort || tag.performersSort.length === 0);
        assert.isTrue(!tag.performersRole || tag.performersRole.length === 0);
        assert.isTrue(!tag.albumArtistsSort || tag.albumArtistsSort.length === 0);
        assert.isTrue(!tag.albumArtists || tag.albumArtists.length === 0);
        assert.isTrue(!tag.composers || tag.composers.length === 0);
        assert.isTrue(!tag.composersSort || tag.composersSort.length === 0);

        assert.isTrue (tag.isEmpty);
    }

    private static setTags(tag: Tag, level: TestTagLevel) {
        if (level >= TestTagLevel.Medium) {
            tag.titleSort = "title sort, TEST";
            tag.albumSort = "album sort, TEST";
            tag.performersSort = ["performer sort 1, TEST", "performer sort 2, TEST"];
            tag.composersSort = ["composer sort 1, TEST", "composer sort 2, TEST"];
            tag.albumArtistsSort = ["album artist sort 1, TEST", "album artist sort 2, TEST"];
        }

        tag.album = "TEST album";
        tag.albumArtists = ["TEST artist 1", "TEST artist 2"];
        tag.beatsPerMinute = 120;
        tag.comment = "TEST comment";
        tag.composers = ["TEST composer 1", "TEST composer 2"];
        tag.conductor = "TEST conductor";
        tag.copyright = "TEST copyright";
        tag.dateTagged = new Date("2017-09-12 22:47:42");
        tag.disc = 100;
        tag.discCount = 101;
        tag.genres = ["TEST genre 1", "TEST genre 2"];
        tag.grouping = "TEST grouping";
        tag.lyrics = "TEST lyrics 1\r\nTEST lyrics 2";
        tag.performers = ["TEST performer 1", "TEST performer 2"];
        tag.performersRole = ["TEST role 1a; TEST role 1b", "TEST role 2"];
        tag.title = "TEST title";
        tag.subtitle = "TEST subtitle";
        tag.description = "TEST description";
        tag.track = 98;
        tag.trackCount = 99;
        tag.year = 1999;
    }

    private static testCorruptionResistance(path: string): void {
        try {
            File.createFromPath(path);
        } catch (e) {
            if (!CorruptFileError.errorIs(e)) {
                throw e;
            }
        }
    }
}
