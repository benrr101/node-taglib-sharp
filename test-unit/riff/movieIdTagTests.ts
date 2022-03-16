import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import MovieIdTag from "../../src/riff/movieIdTag";
import PropertyTests from "../utilities/propertyTests";
import {ByteVector, StringType} from "../../src/byteVector";
import {TagTypes} from "../../src/tag";
import {TagTesters, Testers} from "../utilities/testers";
import RiffList from "../../src/riff/riffList";

@suite class Riff_MovieIdTagTests {
    @test
    public fromEmpty() {
        // Act
        const tag = MovieIdTag.fromEmpty();

        // Assert
        assert.isOk(tag);
        assert.isTrue(tag.isEmpty);
        assert.strictEqual(tag.stringType, StringType.UTF8);
        assert.strictEqual(tag.tagTypes, TagTypes.MovieId);

        TagTesters.testTagProperties(tag, {});
    }

    @test
    public fromData_invalidParams() {
        // Act / Assert
        Testers.testTruthy<RiffList>((v) => MovieIdTag.fromList(v));
    }

    @test
    public fromData_validParams() {
        // Arrange
        const list = Riff_MovieIdTagTests.getTestTagData();

        // Act
        const tag = MovieIdTag.fromList(list);

        // Assert
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.stringType, StringType.UTF8);
        assert.strictEqual(tag.tagTypes, TagTypes.MovieId);
        assert.strictEqual(tag.list, list);

        const expected = {
            comment: "baz",
            genres: ["fux"],
            performers: ["bar"],
            title: "foo",
            track: 1234,
            trackCount: 2345
        };
        TagTesters.testTagProperties(tag, expected);
    }

    @test
    public title() {
        // Arrange
        const tag = MovieIdTag.fromEmpty();
        const setter = (v: string) => tag.title = v;
        const getter = () => tag.title;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foo");
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
    }

    @test
    public performers() {
        // Arrange
        const tag = MovieIdTag.fromEmpty();
        const setter = (v: string[]) => tag.performers = v;
        const getter = () => tag.performers;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, ["foo", "bar", "baz"]);
        PropertyTests.propertyNormalized(setter, getter, undefined, []);
        PropertyTests.propertyNormalized(setter, getter, null, []);
        PropertyTests.propertyRoundTrip(setter, getter, []);
    }

    @test
    public comment() {
        // Arrange
        const tag = MovieIdTag.fromEmpty();
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
        const tag = MovieIdTag.fromEmpty();
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
    public track() {
        // Arrange
        const tag = MovieIdTag.fromEmpty();
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
        const tag = MovieIdTag.fromEmpty();
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
    public clear() {
        // Arrange
        const list = Riff_MovieIdTagTests.getTestTagData();
        const tag = MovieIdTag.fromList(list);

        // Act
        tag.clear();

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.MovieId);
        TagTesters.testTagProperties(tag, {});

        assert.strictEqual(list.valueCount, 0);
        assert.strictEqual(list.listCount, 0);
    }

    @test
    public render() {
        // Arrange
        const list = Riff_MovieIdTagTests.getTestTagData();
        const tag = MovieIdTag.fromList(list);

        // Act
        const output = tag.render();

        // Assert
        assert.isOk(output);
        Testers.bvEqual(output, list.render());
    }

    private static getTestTagData(): RiffList {
        const list = RiffList.fromEmpty(MovieIdTag.listType);
        list.setValues("TITL", [ByteVector.fromString("foo", StringType.UTF8)]);
        list.setValues("IART", [ByteVector.fromString("bar", StringType.UTF8)]);
        list.setValues("COMM", [ByteVector.fromString("baz", StringType.UTF8)]);
        list.setValues("GENR", [ByteVector.fromString("fux", StringType.UTF8)]);
        list.setValues("PRT1", [ByteVector.fromString("1234", StringType.UTF8)]);
        list.setValues("PRT2", [ByteVector.fromString("2345", StringType.UTF8)]);

        return list;
    }
}
