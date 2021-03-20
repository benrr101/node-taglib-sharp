import * as Chai from "chai";
import {suite, test} from "mocha-typescript";
import ObjectTests from "./objectTests";

import Testers from "../utilities/testers";
import TestFile from "../utilities/testFile";
import {File} from "../../src/file";
import Guids from "../../src/asf/guids";
import UuidWrapper from "../../src/uuidWrapper";
import {MetadataDescriptor, MetadataLibraryObject} from "../../src/asf/objects/metadataLibraryObject";
import {DataType} from "../../src/asf/objects/descriptorBase";
import {ByteVector, StringType} from "../../src/byteVector";

// Setup Chai
const assert = Chai.assert;

@suite class MetadataDescriptorTests {
    @test
    public constructor_invalidParameters() {
        // Act / Assert
        Testers.testUshort((v) => new MetadataDescriptor(v, 1, "foo", DataType.Bytes, "bar"));
        Testers.testUshort((v) => new MetadataDescriptor(1, v, "foo", DataType.Bytes, "bar"));
    }

    // NOTE: We'll use the constructor tests to make sure the render method does what it's supposed to

    @test
    public constructor_word() {
        // Act
        const object = new MetadataDescriptor(123, 234, "foo", DataType.Word, 1234);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Word);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.strictEqual(object.getUshort(), 1234);

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.Word, false),
            ByteVector.fromUInt(2, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(1234, false)
        );
        assert.isTrue(ByteVector.equal(object.render(), expectedBytes));
    }

    @test
    public fromFile_word() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.Word, false),
            ByteVector.fromUInt(2, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(1234, false)
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = MetadataDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Word);
        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.strictEqual(object.getUshort(), 1234);
    }

    @test
    public constructor_bool() {
        // Act
        const object = new MetadataDescriptor(123, 234, "foo", DataType.Bool, true);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Bool);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.strictEqual(object.getBool(), true);

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.Bool, false),
            ByteVector.fromUInt(2, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(1, false)
        );
        assert.isTrue(ByteVector.equal(object.render(), expectedBytes));
    }

    @test
    public fromFile_bool_twoByte() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.Bool, false),
            ByteVector.fromUInt(2, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUShort(1, false)
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = MetadataDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Bool);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.strictEqual(object.getBool(), true);
    }

    @test
    public fromFile_bool_fourByte() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.Bool, false),
            ByteVector.fromUInt(4, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUInt(0, false)
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = MetadataDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Bool);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.strictEqual(object.getBool(), false);
    }

    @test
    public constructor_dword() {
        // Act
        const object = new MetadataDescriptor(123, 234, "foo", DataType.DWord, 1234);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.DWord);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.strictEqual(object.getUint(), 1234);

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.DWord, false),
            ByteVector.fromUInt(4, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUInt(1234, false)
        );
        assert.isTrue(ByteVector.equal(object.render(), expectedBytes));
    }

    @test
    public fromFile_dword() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.DWord, false),
            ByteVector.fromUInt(4, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUInt(1234, false)
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = MetadataDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.DWord);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.strictEqual(object.getUint(), 1234);
    }

    @test
    public constructor_qword() {
        // Act
        const object = new MetadataDescriptor(123, 234, "foo", DataType.QWord, BigInt(1234));

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.QWord);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.strictEqual(object.getUlong(), BigInt(1234));

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.QWord, false),
            ByteVector.fromUInt(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromULong(1234, false)
        );
        assert.isTrue(ByteVector.equal(object.render(), expectedBytes));
    }

    @test
    public fromFile_qword() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.QWord, false),
            ByteVector.fromUInt(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromULong(1234, false)
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = MetadataDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.QWord);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.strictEqual(object.getUlong(), BigInt(1234));
    }

    @test
    public constructor_unicode() {
        // Act
        const object = new MetadataDescriptor(123, 234, "foo", DataType.Unicode, "foobarbaz");

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Unicode);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.strictEqual(object.getString(), "foobarbaz");

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.Unicode, false),
            ByteVector.fromUInt(20, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromString("foobarbaz\0", StringType.UTF16LE)
        );
        assert.isTrue(ByteVector.equal(object.render(), expectedBytes));
    }

    @test
    public fromFile_unicode() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.Unicode, false),
            ByteVector.fromUInt(20, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromString("foobarbaz\0", StringType.UTF16LE)
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = MetadataDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Unicode);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.strictEqual(object.getString(), "foobarbaz");
    }

    @test
    public constructor_bytes() {
        // Arrange
        const bytes = ByteVector.fromString("abcdef");

        // Act
        const object = new MetadataDescriptor(123, 234, "foo", DataType.Bytes, bytes);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Bytes);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.isTrue(ByteVector.equal(object.getBytes(), bytes));

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.Bytes, false),
            ByteVector.fromUInt(6, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            bytes
        );
        assert.isTrue(ByteVector.equal(object.render(), expectedBytes));
    }

    @test
    public fromFile_bytes() {
        // Arrange
        const bytes = ByteVector.fromString("abcdef");

        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.Bytes, false),
            ByteVector.fromUInt(6, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            bytes
        );
        const file = TestFile.getFile(data);

        // Act
        const object = MetadataDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Bytes);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.isTrue(ByteVector.equal(object.getBytes(), bytes));
    }

    @test
    public constructor_guid() {
        // Arrange
        const guid = new UuidWrapper();

        // Act
        const object = new MetadataDescriptor(123, 234, "foo", DataType.Guid, guid);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Guid);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.isTrue(object.getGuid().equals(guid));

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.Guid, false),
            ByteVector.fromUInt(16, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            guid.toBytes()
        );
        assert.isTrue(ByteVector.equal(object.render(), expectedBytes));
    }

    @test
    public fromFile_guid() {
        // Arrange
        const guid = new UuidWrapper();

        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUShort(123, false),
            ByteVector.fromUShort(234, false),
            ByteVector.fromUShort(8, false),
            ByteVector.fromUShort(DataType.Guid, false),
            ByteVector.fromUInt(16, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            guid.toBytes()
        );
        const file = TestFile.getFile(data);

        // Act
        const object = MetadataDescriptor.fromFile(file);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Guid);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        assert.isTrue(object.getGuid().equals(guid));
    }
}

@suite class MetadataLibraryObjectTests extends ObjectTests<MetadataLibraryObject> {
    protected get fromFileConstructor(): (f: File, p: number) => MetadataLibraryObject {
        return MetadataLibraryObject.fromFile;
    }
    protected get minSize(): number { return 26; }
    protected get objectGuid(): UuidWrapper { return Guids.AsfMetadataLibraryObject; }

    @test
    public fromEmpty() {
        // Act
        const object = MetadataLibraryObject.fromEmpty();

        // Assert
        assert.isOk(object);
        assert.isTrue(object.isEmpty);
        assert.deepEqual(object.records, []);
    }

    @test
    public fromFile_validParameters() {
        // Arrange
        const record1 = new MetadataDescriptor(123, 234, "foo", DataType.Word, 1234);
        const record2 = new MetadataDescriptor(123, 234, "bar", DataType.Word, 2345);
        const record1Bytes = record1.render();
        const record2Bytes = record2.render();
        const bytes = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfMetadataLibraryObject.toBytes(),
            ByteVector.fromULong(16 + 8 + 2 + record1Bytes.length + record2Bytes.length, false),
            ByteVector.fromUShort(2, false),
            record1Bytes,
            record2Bytes
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = MetadataLibraryObject.fromFile(file, 10);

        // Assert
        assert.isOk(object);
        assert.isFalse(object.isEmpty);
        assert.strictEqual(object.records.length, 2);

        assert.isTrue((object.records.findIndex((d) => d.name === "foo")) >= 0);
        assert.isTrue((object.records.findIndex((d) => d.name === "bar")) >= 0);
    }
}
