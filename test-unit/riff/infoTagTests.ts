import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import InfoTag from "../../src/riff/infoTag";
import PropertyTests from "../utilities/propertyTests";
import {ByteVector, StringType} from "../../src/byteVector";
import {TagTypes} from "../../src/tag";
import {TagTesters, Testers} from "../utilities/testers";
import RiffList from "../../src/riff/riffList";

@suite class Riff_InfoTagTests {
    @test
    public fromEmpty() {
        // Act
        const tag = InfoTag.fromEmpty();

        // Assert
        assert.isOk(tag);
        assert.isTrue(tag.isEmpty);
        assert.strictEqual(tag.stringType, StringType.UTF8);
        assert.strictEqual(tag.tagTypes, TagTypes.RiffInfo);

        TagTesters.testTagProperties(tag, {});
    }

    @test
    public fromList_invalidParams() {
        // Act / Assert
        Testers.testTruthy<RiffList>((v) => InfoTag.fromList(v));
    }

    @test
    public fromList_validParams() {
        // Arrange
        const list = Riff_InfoTagTests.getTestTagData();

        // Act
        const tag = InfoTag.fromList(list);

        // Assert
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.stringType, StringType.UTF8);
        assert.strictEqual(tag.tagTypes, TagTypes.RiffInfo);
        assert.strictEqual(tag.list, list);

        const expected = {
            album: "qux",
            albumArtists: ["fux"],
            comment: "barbaz",
            composers: ["bux"],
            conductor: "foobar",
            copyright: "buxqux",
            description: "bar",
            genres: ["bazfux"],
            performers: ["baz"],
            title: "foo",
            track: 2345,
            trackCount: 3456,
            year: 1234
        };
        TagTesters.testTagProperties(tag, expected);
    }

    @test
    public title() {
        // Arrange
        const tag = InfoTag.fromEmpty();
        const setter = (v: string) => tag.title = v;
        const getter = () => tag.title;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foo");
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
    }

    @test
    public description() {
        // Arrange
        const tag = InfoTag.fromEmpty();
        const setter = (v: string) => tag.description = v;
        const getter = () => tag.description;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foo");
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
    }

    @test
    public performers() {
        // Arrange
        const tag = InfoTag.fromEmpty();
        const setter = (v: string[]) => tag.performers = v;
        const getter = () => tag.performers;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, ["foo", "bar", "baz"]);
        PropertyTests.propertyNormalized(setter, getter, undefined, []);
        PropertyTests.propertyNormalized(setter, getter, null, []);
        PropertyTests.propertyRoundTrip(setter, getter, []);
    }

    @test
    public albumArtists() {
        // Arrange
        const tag = InfoTag.fromEmpty();
        const setter = (v: string[]) => tag.albumArtists = v;
        const getter = () => tag.albumArtists;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, ["foo", "bar", "baz"]);
        PropertyTests.propertyNormalized(setter, getter, undefined, []);
        PropertyTests.propertyNormalized(setter, getter, null, []);
        PropertyTests.propertyRoundTrip(setter, getter, []);
    }

    @test
    public composers() {
        // Arrange
        const tag = InfoTag.fromEmpty();
        const setter = (v: string[]) => tag.composers = v;
        const getter = () => tag.composers;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, ["foo", "bar", "baz"]);
        PropertyTests.propertyNormalized(setter, getter, undefined, []);
        PropertyTests.propertyNormalized(setter, getter, null, []);
        PropertyTests.propertyRoundTrip(setter, getter, []);
    }

    @test
    public album() {
        // Arrange
        const tag = InfoTag.fromEmpty();
        const setter = (v: string) => tag.album = v;
        const getter = () => tag.album;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foo");
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
    }

    @test
    public conductor() {
        // Arrange
        const tag = InfoTag.fromEmpty();
        const setter = (v: string) => tag.conductor = v;
        const getter = () => tag.conductor;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foo");
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
    }

    @test
    public comment() {
        // Arrange
        const tag = InfoTag.fromEmpty();
        const setter = (v: string) => tag.comment = v;
        const getter = () => tag.comment;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foobarbaz");
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
    }

    @test
    public genres() {
        // Arrange
        const tag = InfoTag.fromEmpty();
        const setter = (v: string[]) => tag.genres = v;
        const getter = () => tag.genres;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, ["Musical"]);
        PropertyTests.propertyRoundTrip(setter, getter, ["Nature", "Infomercial"]);
        PropertyTests.propertyRoundTrip(setter, getter, ["foobarbaz"]);
        PropertyTests.propertyNormalized(setter, getter, undefined, []);
        PropertyTests.propertyNormalized(setter, getter, null, []);
        PropertyTests.propertyRoundTrip(setter, getter, []);
    }

    @test
    public year() {
        // Arrange
        const tag = InfoTag.fromEmpty();
        const setter = (v: number) => tag.year = v;
        const getter = () => tag.year;

        // Act / Assert
        PropertyTests.propertyThrows(setter, -1);
        PropertyTests.propertyThrows(setter, 1.23);
        PropertyTests.propertyThrows(setter, 0x100000000);
        PropertyTests.propertyRoundTrip(setter, getter, 2021);
        PropertyTests.propertyNormalized(setter, getter, 100001, 0);
        PropertyTests.propertyRoundTrip(setter, getter, 0);
    }

    @test
    public track() {
        // Arrange
        const tag = InfoTag.fromEmpty();
        const setter = (v: number) => tag.track = v;
        const getter = () => tag.track;

        // Act / Assert
        PropertyTests.propertyThrows(setter, -1);
        PropertyTests.propertyThrows(setter, 1.23);
        PropertyTests.propertyThrows(setter, 0x100000000);
        PropertyTests.propertyRoundTrip(setter, getter, 1234);
        PropertyTests.propertyRoundTrip(setter, getter, 0);
    }

    @test
    public trackCount() {
        // Arrange
        const tag = InfoTag.fromEmpty();
        const setter = (v: number) => tag.trackCount = v;
        const getter = () => tag.trackCount;

        // Act / Assert
        PropertyTests.propertyThrows(setter, -1);
        PropertyTests.propertyThrows(setter, 1.23);
        PropertyTests.propertyThrows(setter, 0x100000000);
        PropertyTests.propertyRoundTrip(setter, getter, 1234);
        PropertyTests.propertyRoundTrip(setter, getter, 0);
    }

    @test
    public copyright() {
        // Arrange
        const tag = InfoTag.fromEmpty();
        const setter = (v: string) => tag.copyright = v;
        const getter = () => tag.copyright;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foobarbaz");
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
    }

    @test
    public clear() {
        // Arrange
        const data = Riff_InfoTagTests.getTestTagData();
        const tag = InfoTag.fromList(data);

        // Act
        tag.clear();

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.RiffInfo);
        TagTesters.testTagProperties(tag, {});

        assert.strictEqual(data.valueCount, 0);
        assert.strictEqual(data.listCount, 0);
    }

    @test
    public render() {
        // Arrange
        const list = Riff_InfoTagTests.getTestTagData();
        const tag = InfoTag.fromList(list);

        // Act
        const output = tag.render();

        // Assert
        assert.isOk(output);
        Testers.bvEqual(output, list.render());
    }

    private static getTestTagData(): RiffList {
        const list = RiffList.fromEmpty(InfoTag.LIST_TYPE);
        list.setValues("INAM", [ByteVector.fromString("foo", StringType.UTF8)]);
        list.setValues("ISBJ", [ByteVector.fromString("bar", StringType.UTF8)]);
        list.setValues("ISTR", [ByteVector.fromString("baz", StringType.UTF8)]);
        list.setValues("IART", [ByteVector.fromString("fux", StringType.UTF8)]);
        list.setValues("IWRI", [ByteVector.fromString("bux", StringType.UTF8)]);
        list.setValues("DIRC", [ByteVector.fromString("qux", StringType.UTF8)]);
        list.setValues("ICNM", [ByteVector.fromString("foobar", StringType.UTF8)]);
        list.setValues("ICMT", [ByteVector.fromString("barbaz", StringType.UTF8)]);
        list.setValues("IGNR", [ByteVector.fromString("bazfux", StringType.UTF8)]);
        list.setValues("ICRD", [ByteVector.fromString("1234", StringType.UTF8)]);
        list.setValues("IPRT", [ByteVector.fromString("2345", StringType.UTF8)]);
        list.setValues("IFRM", [ByteVector.fromString("3456", StringType.UTF8)]);
        list.setValues("ICOP", [ByteVector.fromString("buxqux", StringType.UTF8)]);

        return list;
    }
}
