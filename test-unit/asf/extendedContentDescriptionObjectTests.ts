import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import ObjectTests from "./objectTests";
import UuidWrapper from "../../src/uuidWrapper";
import {ByteVector, StringType} from "../../src/byteVector";
import {Guids, ObjectType} from "../../src/asf/constants";
import {DataType} from "../../src/asf/objects/descriptorBase";
import {File} from "../../src/file";
import {Testers} from "../utilities/testers";
import TestFile from "../utilities/testFile";
import {
    ContentDescriptor,
    ExtendedContentDescriptionObject
} from "../../src/asf/objects/extendedContentDescriptionObject";

// Setup Chai
const assert = Chai.assert;

@suite class Asf_ContentDescriptorTests {
    // NOTE: We'll use the constructor tests to make sure the render method does what it's supposed to

    @test
    public constructor_word() {
        // Act
        const object = new ContentDescriptor("foo", DataType.Word, 1234);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Word);
        assert.strictEqual(object.getUshort(), 1234);

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.Word, false),
            ByteVector.fromUShort(2, false),
            ByteVector.fromUShort(1234, false)
        );
        Testers.bvEqual(object.render(), expectedBytes);
    }

    @test
    public fromFile_word() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.Word, false),
            ByteVector.fromUShort(2, false),
            ByteVector.fromUShort(1234, false)
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = ContentDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Word);
        assert.strictEqual(object.getUshort(), 1234);
    }

    @test
    public constructor_bool() {
        // Act
        const object = new ContentDescriptor("foo", DataType.Bool, true);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Bool);
        assert.strictEqual(object.getBool(), true);

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.Bool, false),
            ByteVector.fromUShort(4, false),
            ByteVector.fromUint(1, false)
        );
        Testers.bvEqual(object.render(), expectedBytes);
    }

    @test
    public fromFile_bool() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.Bool, false),
            ByteVector.fromUShort(4, false),
            ByteVector.fromUint(1, false)
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = ContentDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Bool);
        assert.strictEqual(object.getBool(), true);
    }

    @test
    public constructor_dword() {
        // Act
        const object = new ContentDescriptor("foo", DataType.DWord, 1234);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.DWord);
        assert.strictEqual(object.getUint(), 1234);

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.DWord, false),
            ByteVector.fromUShort(4, false),
            ByteVector.fromUint(1234, false)
        );
        Testers.bvEqual(object.render(), expectedBytes);
    }

    @test
    public fromFile_dword() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.DWord, false),
            ByteVector.fromUShort(4, false),
            ByteVector.fromUint(1234, false)
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = ContentDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.DWord);
        assert.strictEqual(object.getUint(), 1234);
    }

    @test
    public constructor_qword() {
        // Act
        const object = new ContentDescriptor("foo", DataType.QWord, BigInt(1234));

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.QWord);
        assert.strictEqual(object.getUlong(), BigInt(1234));

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.QWord, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromULong(1234, false)
        );
        Testers.bvEqual(object.render(), expectedBytes);
    }

    @test
    public fromFile_qword() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.QWord, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromULong(1234, false)
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = ContentDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.QWord);
        assert.strictEqual(object.getUlong(), BigInt(1234));
    }

    @test
    public constructor_unicode() {
        // Act
        const object = new ContentDescriptor("foo", DataType.Unicode, "foobarbaz");

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Unicode);
        assert.strictEqual(object.getString(), "foobarbaz");

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.Unicode, false),
            ByteVector.fromUShort(20, false),
            ByteVector.fromString("foobarbaz\0", StringType.UTF16LE)
        );
        Testers.bvEqual(object.render(), expectedBytes);
    }

    @test
    public fromFile_unicode() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.Unicode, false),
            ByteVector.fromUShort(20, false),
            ByteVector.fromString("foobarbaz\0", StringType.UTF16LE)
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = ContentDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Unicode);
        assert.strictEqual(object.getString(), "foobarbaz");
    }

    @test
    public constructor_bytes() {
        // Arrange
        const bytes = ByteVector.fromString("abcdef");

        // Act
        const object = new ContentDescriptor("foo", DataType.Bytes, bytes);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Bytes);
        Testers.bvEqual(object.getBytes(), bytes);

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.Bytes, false),
            ByteVector.fromUShort(6, false),
            bytes
        );
        Testers.bvEqual(object.render(), expectedBytes);
    }

    @test
    public fromFile_bytes() {
        // Arrange
        const bytes = ByteVector.fromString("abcdef");

        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.Bytes, false),
            ByteVector.fromUShort(6, false),
            bytes
        );
        const file = TestFile.getFile(data);

        // Act
        const object = ContentDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Bytes);
        Testers.bvEqual(object.getBytes(), bytes);
    }

    @test
    public constructor_guid() {
        // Arrange
        const guid = new UuidWrapper();

        // Act
        const object = new ContentDescriptor("foo", DataType.Guid, guid);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Guid);
        assert.isTrue(object.getGuid().equals(guid));

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.Guid, false),
            ByteVector.fromUShort(16, false),
            guid.toBytes()
        );
        Testers.bvEqual(object.render(), expectedBytes);
    }

    @test
    public fromFile_guid() {
        // Arrange
        const guid = new UuidWrapper();

        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUShort(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(DataType.Guid, false),
            ByteVector.fromUShort(16, false),
            guid.toBytes()
        );
        const file = TestFile.getFile(data);

        // Act
        const object = ContentDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Guid);
        assert.isTrue(object.getGuid().equals(guid));
    }
}

@suite class Asf_ExtendedContentDescriptionObjectTests extends ObjectTests<ExtendedContentDescriptionObject> {
    protected get fromFileConstructor(): (f: File, p: number) => ExtendedContentDescriptionObject {
        return ExtendedContentDescriptionObject.fromFile;
    }
    protected get minSize(): number { return 26; }
    protected get objectGuid(): UuidWrapper { return Guids.AsfMetadataLibraryObject; }

    @test
    public fromEmpty() {
        // Act
        const object = ExtendedContentDescriptionObject.fromEmpty();

        // Assert
        assert.isOk(object);
        assert.isTrue(object.guid.equals(Guids.AsfExtendedContentDescriptionObject));
        assert.strictEqual(object.objectType, ObjectType.ExtendedContentDescriptionObject);
        assert.strictEqual(object.originalSize, 0);
        assert.isTrue(object.isEmpty);
        assert.deepEqual(object.descriptors, []);
    }

    @test
    public fromFile_validParameters() {
        // Arrange
        const record1 = new ContentDescriptor("foo", DataType.Word, 1234);
        const record2 = new ContentDescriptor("bar", DataType.Word, 2345);
        const record1Bytes = record1.render();
        const record2Bytes = record2.render();
        const bytes = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfExtendedContentDescriptionObject.toBytes(),
            ByteVector.fromULong(16 + 8 + 2 + record1Bytes.length + record2Bytes.length, false),
            ByteVector.fromUShort(2, false),
            record1Bytes,
            record2Bytes
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = ExtendedContentDescriptionObject.fromFile(file, 10);

        // Assert
        assert.isOk(object);
        assert.isTrue(object.guid.equals(Guids.AsfExtendedContentDescriptionObject));
        assert.strictEqual(object.objectType, ObjectType.ExtendedContentDescriptionObject);
        assert.strictEqual(object.originalSize, bytes.length - 10);
        assert.isFalse(object.isEmpty);
        assert.strictEqual(object.descriptors.length, 2);

        assert.isTrue((object.descriptors.findIndex((d) => d.name === "foo")) >= 0);
        assert.isTrue((object.descriptors.findIndex((d) => d.name === "bar")) >= 0);
    }

    @test
    public addDescriptors_falsyRecord() {
        // Arrange
        const object = ExtendedContentDescriptionObject.fromEmpty();

        // Act / Assert
        Testers.testTruthy((v: ContentDescriptor) => { object.addDescriptor(v); });
    }

    @test
    public addDescriptors_validValue() {
        // Arrange
        const object = ExtendedContentDescriptionObject.fromEmpty();
        const descriptor1 = new ContentDescriptor("foo", DataType.Word, 1234);
        const descriptor2 = new ContentDescriptor("bar", DataType.Word, 2345);

        // Act
        object.addDescriptor(descriptor1);
        object.addDescriptor(descriptor2);

        // Assert
        const records = object.descriptors;
        assert.sameMembers(records, [descriptor1, descriptor2]);
    }

    @test
    public getDescriptors_invalidParameters() {
        // Arrange
        const object = ExtendedContentDescriptionObject.fromEmpty();

        // Act / Assert
        Testers.testTruthy((v: string[]) => object.getDescriptors(...v));
    }

    @test
    public getDescriptors_oneName_oneMatch() {
        // Arrange
        const object = ExtendedContentDescriptionObject.fromEmpty();
        const descriptor1 = new ContentDescriptor("foo", DataType.Word, 1234);
        const descriptor2 = new ContentDescriptor("bar", DataType.Word, 2345);
        const descriptor3 = new ContentDescriptor("baz", DataType.Word, 3456);
        const descriptor4 = new ContentDescriptor("fux", DataType.Word, 4567);
        object.addDescriptor(descriptor1);
        object.addDescriptor(descriptor2);
        object.addDescriptor(descriptor3);
        object.addDescriptor(descriptor4);

        // Act
        const matches = object.getDescriptors("foo");

        // Assert
        assert.isOk(matches);
        assert.sameMembers(matches, [descriptor1]);
    }

    @test
    public getDescriptors_twoNames_twoMatches() {
        // Arrange
        const object = ExtendedContentDescriptionObject.fromEmpty();
        const descriptor1 = new ContentDescriptor("foo", DataType.Word, 1234);
        const descriptor2 = new ContentDescriptor("bar", DataType.Word, 2345);
        const descriptor3 = new ContentDescriptor("baz", DataType.Word, 3456);
        const descriptor4 = new ContentDescriptor("fux", DataType.Word, 4567);
        object.addDescriptor(descriptor1);
        object.addDescriptor(descriptor2);
        object.addDescriptor(descriptor3);
        object.addDescriptor(descriptor4);

        // Act
        const matches = object.getDescriptors("foo", "bar");

        // Assert
        assert.isOk(matches);
        assert.sameMembers(matches, [descriptor1, descriptor2]);
    }

    @test
    public getDescriptors_noMatches() {
        // Arrange
        const object = ExtendedContentDescriptionObject.fromEmpty();
        const descriptor1 = new ContentDescriptor("foo", DataType.Word, 1234);
        const descriptor2 = new ContentDescriptor("bar", DataType.Word, 2345);
        const descriptor3 = new ContentDescriptor("baz", DataType.Word, 3456);
        const descriptor4 = new ContentDescriptor("qux", DataType.Word, 4567);
        object.addDescriptor(descriptor1);
        object.addDescriptor(descriptor2);
        object.addDescriptor(descriptor3);
        object.addDescriptor(descriptor4);

        // Act
        const matches = object.getDescriptors("fux", "bux");

        // Assert
        assert.isOk(matches);
        assert.isEmpty(matches);
    }

    @test
    public removeDescriptors_oneMatch() {
        // Arrange
        const object = ExtendedContentDescriptionObject.fromEmpty();
        const descriptor1 = new ContentDescriptor( "foo", DataType.Word, 1234);
        const descriptor2 = new ContentDescriptor( "bar", DataType.Word, 2345);
        const descriptor3 = new ContentDescriptor( "baz", DataType.Word, 3456);
        const descriptor4 = new ContentDescriptor( "fux", DataType.Word, 4567);
        object.addDescriptor(descriptor1);
        object.addDescriptor(descriptor2);
        object.addDescriptor(descriptor3);
        object.addDescriptor(descriptor4);

        // Act
        object.removeDescriptors("foo");

        // Assert
        assert.sameMembers(object.descriptors, [descriptor2, descriptor3, descriptor4]);
    }

    @test
    public removeDescriptors_twoMatches() {
        // Arrange
        const object = ExtendedContentDescriptionObject.fromEmpty();
        const descriptor1 = new ContentDescriptor("foo", DataType.Word, 1234);
        const descriptor2 = new ContentDescriptor("bar", DataType.Word, 2345);
        const descriptor3 = new ContentDescriptor("baz", DataType.Word, 3456);
        const descriptor4 = new ContentDescriptor("foo", DataType.Word, 4567);
        object.addDescriptor(descriptor1);
        object.addDescriptor(descriptor2);
        object.addDescriptor(descriptor3);
        object.addDescriptor(descriptor4);

        // Act
        object.removeDescriptors("foo");

        // Assert
        assert.sameMembers(object.descriptors, [descriptor2, descriptor3]);
    }

    @test
    public removeDescriptors_noMatches() {
        // Arrange
        const object = ExtendedContentDescriptionObject.fromEmpty();
        const descriptor1 = new ContentDescriptor("foo", DataType.Word, 1234);
        const descriptor2 = new ContentDescriptor("bar", DataType.Word, 2345);
        const descriptor3 = new ContentDescriptor("baz", DataType.Word, 3456);
        const descriptor4 = new ContentDescriptor("fux", DataType.Word, 4567);
        object.addDescriptor(descriptor1);
        object.addDescriptor(descriptor2);
        object.addDescriptor(descriptor3);
        object.addDescriptor(descriptor4);

        // Act
        object.removeDescriptors("qux");

        // Assert
        assert.sameMembers(object.descriptors, [descriptor1, descriptor2, descriptor3, descriptor4]);
    }

    @test
    public render_isRoundTrip() {
        // Arrange
        const record1 = new ContentDescriptor("foo", DataType.Word, 1234);
        const record2 = new ContentDescriptor("bar", DataType.Word, 2345);
        const record1Bytes = record1.render();
        const record2Bytes = record2.render();
        const bytes = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfExtendedContentDescriptionObject.toBytes(),
            ByteVector.fromULong(16 + 8 + 2 + record1Bytes.length + record2Bytes.length, false),
            ByteVector.fromUShort(2, false),
            record1Bytes,
            record2Bytes
        );
        const file = TestFile.getFile(bytes);
        const object = ExtendedContentDescriptionObject.fromFile(file, 10);

        // Act
        const output = object.render();

        // Assert
        Testers.bvEqual(output, bytes.mid(10));
    }

    @test
    public setDescriptors_invalidParameters() {
        // Arrange
        const object = ExtendedContentDescriptionObject.fromEmpty();
        const descriptor = new ContentDescriptor("foo", DataType.Word, 1234);

        // Act / Assert
        Testers.testTruthy((v: string) => object.setDescriptors(v, descriptor));
    }

    @test
    public setDescriptors_hasMatches() {
        // Arrange
        const object = ExtendedContentDescriptionObject.fromEmpty();
        const descriptor1 = new ContentDescriptor("foo", DataType.Word, 1234);
        const descriptor2 = new ContentDescriptor("bar", DataType.Word, 2345);
        const descriptor3 = new ContentDescriptor("baz", DataType.Word, 3456);
        const descriptor4 = new ContentDescriptor("fux", DataType.Word, 4567);
        object.addDescriptor(descriptor1);
        object.addDescriptor(descriptor2);
        object.addDescriptor(descriptor3);
        object.addDescriptor(descriptor4);

        const newDescriptor = new ContentDescriptor("foo", DataType.Word, 8888);

        // Act
        object.setDescriptors("foo", newDescriptor);

        // Assert
        assert.sameMembers(object.descriptors, [newDescriptor, descriptor2, descriptor3, descriptor4]);
    }

    @test
    public setDescriptors_noMatches() {
        // Arrange
        const object = ExtendedContentDescriptionObject.fromEmpty();
        const descriptor1 = new ContentDescriptor("foo", DataType.Word, 1234);
        const descriptor2 = new ContentDescriptor("bar", DataType.Word, 2345);
        const descriptor3 = new ContentDescriptor("fux", DataType.Word, 3456);
        const descriptor4 = new ContentDescriptor("bux", DataType.Word, 4567);
        object.addDescriptor(descriptor1);
        object.addDescriptor(descriptor2);
        object.addDescriptor(descriptor3);
        object.addDescriptor(descriptor4);

        const newDescriptor1 = new ContentDescriptor("quxx", DataType.Word, 8888);
        const newDescriptor2 = new ContentDescriptor("buxx", DataType.Word, 8888);

        // Act
        object.setDescriptors("quxx", newDescriptor1, newDescriptor2);

        // Assert
        assert.sameMembers(
            object.descriptors,
            [descriptor1, descriptor2, descriptor3, descriptor4, newDescriptor1, newDescriptor2]
        );
    }
}
