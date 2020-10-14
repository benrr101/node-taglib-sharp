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
}
