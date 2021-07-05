import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";
import {Mock} from "typemoq";

import InfoTag from "../../src/riff/infoTag";
import PropertyTests from "../utilities/propertyTests";
import TestFile from "../utilities/testFile";
import {ByteVector, StringType} from "../../src/byteVector";
import {File} from "../../src/file";
import {TagTypes} from "../../src/tag";
import {TagTesters, Testers} from "../utilities/testers";

// Setup chai
const assert = Chai.assert;

@suite class Riff_InfoTagTests {
    private testTagData = ByteVector.concatenate(
        ByteVector.fromString("INAM"),
        ByteVector.fromUInt(3, false),
        ByteVector.fromString("foo"), 0x00,
        ByteVector.fromString("ISBJ"),
        ByteVector.fromUInt(3, false),
        ByteVector.fromString("bar"), 0x00,
        ByteVector.fromString("ISTR"),
        ByteVector.fromUInt(3, false),
        ByteVector.fromString("baz"), 0x00,
        ByteVector.fromString("IART"),
        ByteVector.fromUInt(3, false),
        ByteVector.fromString("fux"), 0x00,
        ByteVector.fromString("IWRI"),
        ByteVector.fromUInt(3, false),
        ByteVector.fromString("bux"), 0x00,
        ByteVector.fromString("DIRC"),
        ByteVector.fromUInt(3, false),
        ByteVector.fromString("qux"), 0x00,
        ByteVector.fromString("ICNM"),
        ByteVector.fromUInt(6, false),
        ByteVector.fromString("foobar"),
        ByteVector.fromString("ICMT"),
        ByteVector.fromUInt(6, false),
        ByteVector.fromString("barbaz"),
        ByteVector.fromString("IGNR"),
        ByteVector.fromUInt(6, false),
        ByteVector.fromString("bazfux"),
        ByteVector.fromString("ICRD"),
        ByteVector.fromUInt(4, false),
        ByteVector.fromString("1234"),
        ByteVector.fromString("IPRT"),
        ByteVector.fromUInt(4, false),
        ByteVector.fromString("2345"),
        ByteVector.fromString("IFRM"),
        ByteVector.fromUInt(4, false),
        ByteVector.fromString("3456"),
        ByteVector.fromString("ICOP"),
        ByteVector.fromUInt(6, false),
        ByteVector.fromString("buxqux")
    );

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
    public fromData_invalidParams() {
        // Act / Assert
        Testers.testTruthy<ByteVector>((v) => InfoTag.fromData(v));
    }

    @test
    public fromData_validParams() {
        // Act
        const tag = InfoTag.fromData(this.testTagData);

        // Assert
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.stringType, StringType.UTF8);
        assert.strictEqual(tag.tagTypes, TagTypes.RiffInfo);

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
    public fromFile_invalidParams() {
        // Arrange
        const mockFile = Mock.ofType<File>();
        mockFile.setup((f) => f.length).returns(() => 10);

        // Act / Assert
        Testers.testTruthy((v: File) => InfoTag.fromFile(v, 0, 0));
        Testers.testSafeUint((v) => InfoTag.fromFile(mockFile.object, v, 0));
        Testers.testUint((v) => InfoTag.fromFile(mockFile.object, 0, v));
        assert.throws(() => InfoTag.fromFile(mockFile.object, 123, 5));
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
        const tag = InfoTag.fromFile(mockFile, 10, this.testTagData.length);

        // Assert
        assert.isOk(tag);
        assert.isFalse(tag.isEmpty);
        assert.strictEqual(tag.stringType, StringType.UTF8);
        assert.strictEqual(tag.tagTypes, TagTypes.RiffInfo);

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
        const data = this.testTagData;
        const tag = InfoTag.fromData(data);

        // Act
        tag.clear();

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.RiffInfo);
        TagTesters.testTagProperties(tag, {});
    }

    @test
    public renderEnclosed() {
        // Arrange
        const tag = InfoTag.fromData(this.testTagData);

        // Act
        const output = tag.renderEnclosed();

        // Assert
        assert.isOk(output);

        const expected = ByteVector.concatenate(
            ByteVector.fromString("LIST"),
            ByteVector.fromUInt(this.testTagData.length + 4, false),
            ByteVector.fromString("INFO"),
            this.testTagData
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }
}
