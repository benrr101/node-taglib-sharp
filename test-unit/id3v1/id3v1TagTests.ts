import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Id3v1Tag from "../../src/id3v1/id3v1Tag";

@suite class Id3v1TagTests {
    // NOTE: These tests are just copied from the .NET implementation. ID3v1 is too simple for me
    //    to bother writing out 100% coverage tests

    @test
    public testTitle() {
        // New tag must be empty
        let tag = Id3v1Tag.fromEmpty();
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.title);

        // Make sure round-trip is still empty
        let rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.title);

        // Set title, make sure it stays set
        tag.title = "01234567890123456789012345678901234567890123456789";
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.title, "01234567890123456789012345678901234567890123456789");

        // Make sure title written out, title is trimmed
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.title, "012345678901234567890123456789");

        // Clear title, make sure it stays cleared
        tag.title = "";
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.title);

        // Make sure title is cleared when written
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.title);
    }

    @test
    public testPerformers() {
        // New tag must be empty
        let tag = Id3v1Tag.fromEmpty();
        assert.isTrue(tag.isEmpty);
        assert.strictEqual(tag.performers.length, 0);

        // Make sure round-trip is still empty
        let rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.strictEqual(tag.performers.length, 0);

        // Set performers, make sure it stays set
        const performers = ["A123456789", "B123456789", "C123456789", "D123456789", "E123456789"];
        tag.performers = performers;
        assert.isFalse(tag.isEmpty);
        assert.deepStrictEqual(tag.performers, performers);

        // Make sure performers are written out, field is trimmed
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isFalse(tag.isEmpty);
        assert.deepStrictEqual(tag.performers, ["A123456789", "B123456789", "C1234567"]);

        // Clear performers, make sure it stays clear
        tag.performers = [];
        assert.isTrue(tag.isEmpty);
        assert.deepStrictEqual(tag.performers, []);

        // Make sure it stays cleared when rendered
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.deepStrictEqual(tag.performers, []);
    }

    @test
    public testAlbum() {
        // New tag must be empty
        let tag = Id3v1Tag.fromEmpty();
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.album);

        // Make sure round-trip is still empty
        let rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.album);

        // Set album, make sure it stays set
        tag.album = "01234567890123456789012345678901234567890123456789";
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.album, "01234567890123456789012345678901234567890123456789");

        // Make sure album written out, album is trimmed
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.album, "012345678901234567890123456789");

        // Clear album, make sure it stays cleared
        tag.album = "";
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.album);

        // Make sure album is cleared when written
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.album);
    }

    @test
    public testYear() {
        // New tag must be empty
        let tag = Id3v1Tag.fromEmpty();
        assert.isTrue(tag.isEmpty);
        assert.strictEqual(tag.year, 0);

        // Make sure round-trip is still empty
        let rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.year);

        // Set year, make sure it stays set
        tag.year = 1999;
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.year, 1999);

        // Make sure year written out
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.year, 1999);

        // Clear year, make sure it stays cleared
        tag.year = 20000;
        assert.isTrue(tag.isEmpty);
        assert.strictEqual(tag.year, 0);

        // Make sure year is cleared when written
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.strictEqual(tag.year, 0);
    }

    @test
    public testComment() {
        // New tag must be empty
        let tag = Id3v1Tag.fromEmpty();
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.comment);

        // Make sure round-trip is still empty
        let rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.comment);

        // Set comment, make sure it stays set
        tag.comment = "01234567890123456789012345678901234567890123456789";
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.comment, "01234567890123456789012345678901234567890123456789");

        // Make sure comment written out, comment is trimmed
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.comment, "0123456789012345678901234567");

        // Clear comment, make sure it stays cleared
        tag.comment = "";
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.comment);

        // Make sure comment is cleared when written
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.comment);
    }

    @test
    public testTrack() {
        // New tag must be empty
        let tag = Id3v1Tag.fromEmpty();
        assert.isTrue(tag.isEmpty);
        assert.strictEqual(tag.track, 0);

        // Make sure round-trip is still empty
        let rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.notOk(tag.track);

        // Set track, make sure it stays set
        tag.track = 123;
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.track, 123);

        // Make sure track written out
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.track, 123);

        // Clear track, make sure it stays cleared
        tag.track = 0;
        assert.isTrue(tag.isEmpty);
        assert.strictEqual(tag.track, 0);

        // Make sure track is cleared when written
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.strictEqual(tag.track, 0);
    }

    @test
    public testGenres() {
        // New tag must be empty
        let tag = Id3v1Tag.fromEmpty();
        assert.isTrue(tag.isEmpty);
        assert.strictEqual(tag.genres.length, 0);

        // Make sure round-trip is still empty
        let rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.strictEqual(tag.genres.length, 0);

        // Set genres, make sure it only sets it to the first one
        tag.genres = ["Rap", "Jazz", "Non-Genre", "Blues"];
        assert.isFalse(tag.isEmpty);
        assert.deepStrictEqual(tag.genres, ["Rap"]);

        // Make sure genres are written out
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isFalse(tag.isEmpty);
        assert.deepStrictEqual(tag.genres, ["Rap"]);

        // Set to an unsupported genre, should be empty
        tag.genres = ["Non-Genre", "Rap"];
        assert.isTrue(tag.isEmpty);
        assert.deepStrictEqual(tag.genres, []);

        // Clear genres, make sure it stays clear
        tag.genres = [];
        assert.isTrue(tag.isEmpty);
        assert.deepStrictEqual(tag.genres, []);

        // Make sure it stays cleared when rendered
        rendered = tag.render();
        tag = Id3v1Tag.fromData(rendered);
        assert.isTrue(tag.isEmpty);
        assert.deepStrictEqual(tag.genres, []);
    }

    @test
    public testClear() {
        const tag = Id3v1Tag.fromEmpty();
        tag.title = "A";
        tag.performers = ["B"];
        tag.album = "C";
        tag.year = 123;
        tag.comment = "D";
        tag.track = 234;
        tag.genres = ["Blues"];
        assert.isFalse(tag.isEmpty);

        tag.clear();
        assert.notOk(tag.title);
        assert.deepStrictEqual(tag.performers, []);
        assert.notOk(tag.album);
        assert.strictEqual(tag.year, 0);
        assert.notOk(tag.comment);
        assert.strictEqual(tag.track, 0);
        assert.deepStrictEqual(tag.genres, []);
        assert.isTrue(tag.isEmpty);
    }

    @test
    public testRender() {
        const rendered = Id3v1Tag.fromEmpty().render();
        assert.strictEqual(rendered.length, 128);
        assert.isTrue(rendered.startsWith(Id3v1Tag.FILE_IDENTIFIER));
    }
}
