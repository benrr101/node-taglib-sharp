import * as Chai from "chai";
import {suite, test} from "mocha-typescript";
import ObjectTests from "./objectTests";
import TestFile from "../utilities/testFile";
import {ByteVector, StringType} from "../../src/byteVector";
import {File} from "../../src/file";

import Guids from "../../src/asf/guids";
import ContentDescriptionObject from "../../src/asf/objects/contentDescriptionObject";
import UuidWrapper from "../../src/uuidWrapper";
import PropertyTests from "../utilities/propertyTests";

// Setup Chai
const assert = Chai.assert;

@suite class ContentDescriptionObjectTests extends ObjectTests<ContentDescriptionObject> {
    protected get fromFileConstructor(): (f: File, p: number) => ContentDescriptionObject {
        return ContentDescriptionObject.fromFile;
    }
    protected get minSize(): number { return 34; }
    protected get objectGuid(): UuidWrapper { return Guids.AsfContentDescriptionObject; }

    @test
    public fromEmpty() {
        // Act
        const object = ContentDescriptionObject.fromEmpty();

        // Assert
        assert.isOk(object);
        assert.isUndefined(object.author);
        assert.isUndefined(object.copyright);
        assert.isUndefined(object.description);
        assert.isTrue(object.isEmpty);
        assert.isUndefined(object.rating);
        assert.isUndefined(object.title);
    }

    @test
    public fromFile_validParameters() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfContentDescriptionObject.toBytes(), // Object ID
            ByteVector.fromULong(94, false), // Object size
            ByteVector.fromUShort(8, false), // Title size
            ByteVector.fromUShort(10, false), // Author length
            ByteVector.fromUShort(12, false), // Copyright length
            ByteVector.fromUShort(14, false), // Description length
            ByteVector.fromUShort(16, false), // Rating length
            ByteVector.fromString("foo\0", StringType.UTF16LE), // Title
            ByteVector.fromString("bar0\0", StringType.UTF16LE), // Author
            ByteVector.fromString("baz00\0", StringType.UTF16LE), // Copyright
            ByteVector.fromString("fux000\0", StringType.UTF16LE), // Description
            ByteVector.fromString("bux0000\0", StringType.UTF16LE) // Rating
        );
        const file = TestFile.getFile(data);

        // Act
        const object = ContentDescriptionObject.fromFile(file, 10);

        // Assert
        assert.isOk(object);
        assert.strictEqual(object.originalSize, 94);
        assert.isTrue(object.guid.equals(Guids.AsfContentDescriptionObject));
        assert.strictEqual(object.author, "bar0");
        assert.strictEqual(object.copyright, "baz00");
        assert.strictEqual(object.description, "fux000");
        assert.isFalse(object.isEmpty);
        assert.strictEqual(object.rating, "bux0000");
        assert.strictEqual(object.title, "foo");
    }

    @test
    public author() {
        // Arrange
        const object = ContentDescriptionObject.fromEmpty();
        const getter = () => object.author;
        const setter = (v: string) => { object.author = v; };

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foobarbaz");
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
    }

    @test
    public copyright() {
        // Arrange
        const object = ContentDescriptionObject.fromEmpty();
        const getter = () => object.copyright;
        const setter = (v: string) => { object.copyright = v; };

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foobarbaz");
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
    }

    @test
    public description() {
        // Arrange
        const object = ContentDescriptionObject.fromEmpty();
        const getter = () => object.description;
        const setter = (v: string) => { object.description = v; };

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foobarbaz");
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
    }

    @test
    public rating() {
        // Arrange
        const object = ContentDescriptionObject.fromEmpty();
        const getter = () => object.rating;
        const setter = (v: string) => { object.rating = v; };

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foobarbaz");
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
    }

    @test
    public title() {
        // Arrange
        const object = ContentDescriptionObject.fromEmpty();
        const getter = () => object.title;
        const setter = (v: string) => { object.title = v; };

        // Act / Assert
        PropertyTests.propertyRoundTrip(setter, getter, "foobarbaz");
        PropertyTests.propertyNormalized(setter, getter, "", undefined);
        PropertyTests.propertyRoundTrip(setter, getter, undefined);
        PropertyTests.propertyNormalized(setter, getter, null, undefined);
    }

    @test
    public render_isRoundTrip() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfContentDescriptionObject.toBytes(), // Object ID
            ByteVector.fromULong(94, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(10, false),
            ByteVector.fromUShort(12, false),
            ByteVector.fromUShort(14, false),
            ByteVector.fromUShort(16, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromString("bar0\0", StringType.UTF16LE),
            ByteVector.fromString("baz00\0", StringType.UTF16LE),
            ByteVector.fromString("fux000\0", StringType.UTF16LE),
            ByteVector.fromString("bux0000\0", StringType.UTF16LE)
        );
        const file = TestFile.getFile(data);
        const object = ContentDescriptionObject.fromFile(file, 10);

        // Act
        const output = object.render();

        // Assert
        assert.isOk(object);
        assert.isTrue(ByteVector.equal(output, data.mid(10)));
    }
}
