import * as Chai from "chai";
import {suite, test} from "mocha-typescript";
import {Mock} from "typemoq";

import MovieIdTag from "../../src/riff/movieIdTag";
import PropertyTests from "../utilities/propertyTests";
import TestFile from "../utilities/testFile";
import {ByteVector, StringType} from "../../src/byteVector";
import {File} from "../../src/file";
import {TagTypes} from "../../src/tag";
import {TagTesters, Testers} from "../utilities/testers";

// Setup chai
const assert = Chai.assert;

@suite class Riff_MovieIdTagTests {
    private testTagData = ByteVector.concatenate(
        ByteVector.fromString("TITL"),
        ByteVector.fromUInt(3, false),
        ByteVector.fromString("foo"), 0x00,
        ByteVector.fromString("IART"),
        ByteVector.fromUInt(3, false),
        ByteVector.fromString("bar"), 0x00,
        ByteVector.fromString("COMM"),
        ByteVector.fromUInt(3, false),
        ByteVector.fromString("baz"), 0x00,
        ByteVector.fromString("GENR"),
        ByteVector.fromUInt(3, false),
        ByteVector.fromString("fux"), 0x00,
        ByteVector.fromString("PRT1"),
        ByteVector.fromUInt(4, false),
        ByteVector.fromString("1234"),
        ByteVector.fromString("PRT2"),
        ByteVector.fromUInt(4, false),
        ByteVector.fromString("2345")
    );

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
        Testers.testTruthy<ByteVector>((v) => MovieIdTag.fromData(v));
    }

    @test
    public fromData_validParams() {
        // Act
        const tag = MovieIdTag.fromData(this.testTagData);

        // Assert
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.stringType, StringType.UTF8);
        assert.strictEqual(tag.tagTypes, TagTypes.MovieId);

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
    public fromFile_invalidParams() {
        // Arrange
        const mockFile = Mock.ofType<File>();
        mockFile.setup((f) => f.length).returns(() => 10);

        // Act / Assert
        Testers.testTruthy((v: File) => MovieIdTag.fromFile(v, 0, 0));
        Testers.testSafeUint((v) => MovieIdTag.fromFile(mockFile.object, v, 0));
        Testers.testUint((v) => MovieIdTag.fromFile(mockFile.object, 0, v));
        assert.throws(() => MovieIdTag.fromFile(mockFile.object, 123, 5));
    }

    @test
    public fromFile_validParams() {
        // Arrange
        const testData = ByteVector.concatenate(
            ByteVector.fromSize(10),
            this.testTagData
        );
        const mockFile = TestFile.getFile(testData);

        // Act
        const tag = MovieIdTag.fromFile(mockFile, 10, this.testTagData.length);

        // Assert
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.stringType, StringType.UTF8);
        assert.strictEqual(tag.tagTypes, TagTypes.MovieId);

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
        const data = this.testTagData;
        const tag = MovieIdTag.fromData(data);

        // Act
        tag.clear();

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.MovieId);
        TagTesters.testTagProperties(tag, {});
    }

    @test
    public renderEnclosed() {
        // Arrange
        const tag = MovieIdTag.fromData(this.testTagData);

        // Act
        const output = tag.renderEnclosed();

        // Assert
        assert.isOk(output);

        const expected = ByteVector.concatenate(
            ByteVector.fromString("MID "),
            ByteVector.fromUInt(this.testTagData.length, false),
            this.testTagData
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }
}
