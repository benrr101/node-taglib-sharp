import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import DivxTag from "../../src/riff/divxTag";
import {default as Resources} from "./resources";
import {ByteVector, StringType} from "../../src/byteVector";
import {TagTypes} from "../../src/tag";
import {TagTesters, Testers} from "../utilities/testers";
import PropertyTests from "../utilities/propertyTests";

@suite class Riff_DivxTagTests {
    @test
    public fromEmpty() {
        // Act
        const tag = DivxTag.fromEmpty();

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.DivX);
        TagTesters.testTagProperties(tag, {});
    }

    @test
    public fromData_invalidParams() {
        // Act / Assert
        Testers.testTruthy<ByteVector>((v) => DivxTag.fromData(v));
    }

    @test
    public fromData_tooShort() {
        // Arrange
        const data = ByteVector.fromSize(DivxTag.SIZE - 1);

        // Act / Assert
        assert.throws(() => DivxTag.fromData(data));
    }

    @test
    public fromData_wrongEnding() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(DivxTag.SIZE),
            ByteVector.fromString("FooBarBaz", StringType.UTF8)
        );

        // Act / Assert
        assert.throws(() => DivxTag.fromData(data));
    }

    @test
    public fromData_validData() {
        // Arrange
        const data = Resources.getDivxTagData();

        // Act
        const tag = DivxTag.fromData(data);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.DivX);

        const expectedProps = {
            comment: "baz",
            genres: ["Infomercial"],
            performers: ["bar", "bux"],
            title: "foo",
            year: 2021,
        };
        TagTesters.testTagProperties(tag, expectedProps);
    }

    @test
    public title() {
        // Arrange
        const tag = DivxTag.fromEmpty();
        const setter = (v: string) => tag.title = v;
        const getter = () => tag.title;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foo");
        PropertyTests.propertyNormalized(setter, getter, "foo ", "foo");
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
    }

    @test
    public performers() {
        // Arrange
        const tag = DivxTag.fromEmpty();
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
        const tag = DivxTag.fromEmpty();
        const setter = (v: string) => tag.comment = v;
        const getter = () => tag.comment;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foobarbaz");
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
        PropertyTests.propertyNormalized(setter, getter, "foobarbaz   ", "foobarbaz");
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
    }

    @test
    public genres() {
        // Arrange
        const tag = DivxTag.fromEmpty();
        const setter = (v: string[]) => tag.genres = v;
        const getter = () => tag.genres;

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, ["Musical"]);
        PropertyTests.propertyNormalized(setter, getter, ["Nature", "Infomercial"], ["Nature"]);
        PropertyTests.propertyNormalized(setter, getter, ["foobarbaz"], []);
        PropertyTests.propertyNormalized(setter, getter, undefined, []);
        PropertyTests.propertyNormalized(setter, getter, null, []);
        PropertyTests.propertyRoundTrip(setter, getter, []);
    }

    @test
    public year() {
        // Arrange
        const tag = DivxTag.fromEmpty();
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
    public clear() {
        // Arrange
        const data = Resources.getDivxTagData();
        const tag = DivxTag.fromData(data);

        // Act
        tag.clear();

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.DivX);
        TagTesters.testTagProperties(tag, {});
    }

    @test
    public render_hasValues() {
        // Arrange
        const data = Resources.getDivxTagData();
        const tag = DivxTag.fromData(data);

        // Act
        const result = tag.render();

        // Assert
        Testers.bvEqual(result, data);
    }

    @test
    public render_empty() {
        // Arrange
        const tag = DivxTag.fromEmpty();

        // Act
        const result = tag.render();

        // Assert
        const expected = ByteVector.concatenate(
            ByteVector.fromSize(DivxTag.SIZE - 6 - DivxTag.FILE_IDENTIFIER.length, 0x20),
            ByteVector.fromSize(6),
            DivxTag.FILE_IDENTIFIER
        );
        Testers.bvEqual(result, expected);
    }
}
