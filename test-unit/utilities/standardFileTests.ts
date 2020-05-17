import * as Chai from "chai";
import * as fs from "fs";

import {Tag, TagTypes} from "../../src/tag";
import {File} from "../../src/file";
import {CorruptFileError} from "../../src/errors";


// Setup Chai
const assert = Chai.assert;

export enum TestTagLevel {
    Normal,
    Medium,
    High
}

export class StandardFileTests {
    public static writeStandardTags(
        sampleFile: string,
        tmpFile: string,
        level: TestTagLevel = TestTagLevel.Normal,
        types: TagTypes = TagTypes.AllTags
    ) {
        if (sampleFile !== tmpFile && fs.existsSync(tmpFile)) {
            fs.unlinkSync(tmpFile);
        }

        if (sampleFile !== tmpFile) {
            fs.copyFileSync(sampleFile, tmpFile);
        }

        const tmp = File.createFromPath(tmpFile);
        if (types !== TagTypes.AllTags) {
            tmp.removeTags(~types);
        }


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
}
