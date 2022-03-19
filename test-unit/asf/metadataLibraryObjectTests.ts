import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import ObjectTests from "./objectTests";
import TestFile from "../utilities/testFile";
import UuidWrapper from "../../src/uuidWrapper";
import {ByteVector, StringType} from "../../src/byteVector";
import {Guids, ObjectType} from "../../src/asf/constants";
import {DataType} from "../../src/asf/objects/descriptorBase";
import {File} from "../../src/file";
import {MetadataDescriptor, MetadataLibraryObject} from "../../src/asf/objects/metadataLibraryObject";
import {Testers} from "../utilities/testers";

@suite class Asf_MetadataDescriptorTests {
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
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.Word, false),
            ByteVector.fromUint(2, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUshort(1234, false)
        );
        Testers.bvEqual(object.render(), expectedBytes);
    }

    @test
    public fromFile_word() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.Word, false),
            ByteVector.fromUint(2, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUshort(1234, false)
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
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.Bool, false),
            ByteVector.fromUint(2, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUshort(1, false)
        );
        Testers.bvEqual(object.render(), expectedBytes);
    }

    @test
    public fromFile_bool_twoByte() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.Bool, false),
            ByteVector.fromUint(2, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUshort(1, false)
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
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.Bool, false),
            ByteVector.fromUint(4, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUint(0, false)
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
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.DWord, false),
            ByteVector.fromUint(4, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUint(1234, false)
        );
        Testers.bvEqual(object.render(), expectedBytes);
    }

    @test
    public fromFile_dword() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.DWord, false),
            ByteVector.fromUint(4, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUint(1234, false)
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
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.QWord, false),
            ByteVector.fromUint(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUlong(1234, false)
        );
        Testers.bvEqual(object.render(), expectedBytes);
    }

    @test
    public fromFile_qword() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.QWord, false),
            ByteVector.fromUint(8, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromUlong(1234, false)
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
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.Unicode, false),
            ByteVector.fromUint(20, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            ByteVector.fromString("foobarbaz\0", StringType.UTF16LE)
        );
        Testers.bvEqual(object.render(), expectedBytes);
    }

    @test
    public fromFile_unicode() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.Unicode, false),
            ByteVector.fromUint(20, false),
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
        const bytes = ByteVector.fromString("abcdef", StringType.UTF8);

        // Act
        const object = new MetadataDescriptor(123, 234, "foo", DataType.Bytes, bytes);

        // Assert
        assert.strictEqual(object.name, "foo");
        assert.strictEqual(object.type, DataType.Bytes);

        assert.strictEqual(object.languageListIndex, 123);
        assert.strictEqual(object.streamNumber, 234);
        Testers.bvEqual(object.getBytes(), bytes);

        const expectedBytes = ByteVector.concatenate(
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.Bytes, false),
            ByteVector.fromUint(6, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
            bytes
        );
        Testers.bvEqual(object.render(), expectedBytes);
    }

    @test
    public fromFile_bytes() {
        // Arrange
        const bytes = ByteVector.fromString("abcdef", StringType.UTF8);

        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.Bytes, false),
            ByteVector.fromUint(6, false),
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
        Testers.bvEqual(object.getBytes(), bytes);
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
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.Guid, false),
            ByteVector.fromUint(16, false),
            ByteVector.fromString("foo\0", StringType.UTF16LE),
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
            ByteVector.fromUshort(123, false),
            ByteVector.fromUshort(234, false),
            ByteVector.fromUshort(8, false),
            ByteVector.fromUshort(DataType.Guid, false),
            ByteVector.fromUint(16, false),
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
    protected get objectGuid(): UuidWrapper { return Guids.ASF_METADATA_LIBRARY_OBJECT; }

    @test
    public fromEmpty() {
        // Act
        const object = MetadataLibraryObject.fromEmpty();

        // Assert
        assert.isOk(object);
        assert.isTrue(object.guid.equals(Guids.ASF_METADATA_LIBRARY_OBJECT));
        assert.strictEqual(object.objectType, ObjectType.MetadataLibraryObject);
        assert.strictEqual(object.originalSize, 0);
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
            Guids.ASF_METADATA_LIBRARY_OBJECT.toBytes(),
            ByteVector.fromUlong(16 + 8 + 2 + record1Bytes.length + record2Bytes.length, false),
            ByteVector.fromUshort(2, false),
            record1Bytes,
            record2Bytes
        );
        const file = TestFile.getFile(bytes);

        // Act
        const object = MetadataLibraryObject.fromFile(file, 10);

        // Assert
        assert.isOk(object);
        assert.isTrue(object.guid.equals(Guids.ASF_METADATA_LIBRARY_OBJECT));
        assert.strictEqual(object.objectType, ObjectType.MetadataLibraryObject);
        assert.strictEqual(object.originalSize, bytes.length - 10);
        assert.isFalse(object.isEmpty);
        assert.strictEqual(object.records.length, 2);

        assert.isTrue((object.records.findIndex((d) => d.name === "foo")) >= 0);
        assert.isTrue((object.records.findIndex((d) => d.name === "bar")) >= 0);
    }

    @test
    public addRecords_falsyRecord() {
        // Arrange
        const object = MetadataLibraryObject.fromEmpty();

        // Act / Assert
        Testers.testTruthy((v: MetadataDescriptor) => { object.addRecord(v); });
    }

    @test
    public addRecords_validValue() {
        // Arrange
        const object = MetadataLibraryObject.fromEmpty();
        const descriptor1 = new MetadataDescriptor(1, 2, "foo", DataType.Word, 1234);
        const descriptor2 = new MetadataDescriptor(1, 2, "bar", DataType.Word, 2345);

        // Act
        object.addRecord(descriptor1);
        object.addRecord(descriptor2);

        // Assert
        const records = object.records;
        assert.sameMembers(records, [descriptor1, descriptor2]);
    }

    @test
    public getRecords_invalidParameters() {
        // Arrange
        const object = MetadataLibraryObject.fromEmpty();

        // Act / Assert
        Testers.testUshort((v) => object.getRecords(v, 123, "foo"));
        Testers.testUshort((v) => object.getRecords(123, v, "foo"));
        Testers.testTruthy((v: string[]) => object.getRecords(123, 234, ...v));
    }

    @test
    public getRecords_oneName_oneMatch() {
        // Arrange
        const object = MetadataLibraryObject.fromEmpty();
        const descriptor1 = new MetadataDescriptor(1, 2, "foo", DataType.Word, 1234);
        const descriptor2 = new MetadataDescriptor(1, 2, "bar", DataType.Word, 2345);
        const descriptor3 = new MetadataDescriptor(3, 2, "foo", DataType.Word, 3456);
        const descriptor4 = new MetadataDescriptor(1, 3, "foo", DataType.Word, 4567);
        object.addRecord(descriptor1);
        object.addRecord(descriptor2);
        object.addRecord(descriptor3);
        object.addRecord(descriptor4);

        // Act
        const matches = object.getRecords(1, 2, "foo");

        // Assert
        assert.isOk(matches);
        assert.sameMembers(matches, [descriptor1]);
    }

    @test
    public getRecords_twoNames_twoMatches() {
        // Arrange
        const object = MetadataLibraryObject.fromEmpty();
        const descriptor1 = new MetadataDescriptor(1, 2, "foo", DataType.Word, 1234);
        const descriptor2 = new MetadataDescriptor(1, 2, "bar", DataType.Word, 2345);
        const descriptor3 = new MetadataDescriptor(3, 2, "foo", DataType.Word, 3456);
        const descriptor4 = new MetadataDescriptor(1, 3, "foo", DataType.Word, 4567);
        object.addRecord(descriptor1);
        object.addRecord(descriptor2);
        object.addRecord(descriptor3);
        object.addRecord(descriptor4);

        // Act
        const matches = object.getRecords(1, 2, "foo", "bar");

        // Assert
        assert.isOk(matches);
        assert.sameMembers(matches, [descriptor1, descriptor2]);
    }

    @test
    public getRecords_noMatches() {
        // Arrange
        const object = MetadataLibraryObject.fromEmpty();
        const descriptor1 = new MetadataDescriptor(1, 2, "foo", DataType.Word, 1234);
        const descriptor2 = new MetadataDescriptor(1, 2, "bar", DataType.Word, 2345);
        const descriptor3 = new MetadataDescriptor(3, 2, "fux", DataType.Word, 3456);
        const descriptor4 = new MetadataDescriptor(1, 3, "bux", DataType.Word, 4567);
        object.addRecord(descriptor1);
        object.addRecord(descriptor2);
        object.addRecord(descriptor3);
        object.addRecord(descriptor4);

        // Act
        const matches = object.getRecords(1, 2, "fux", "bux");

        // Assert
        assert.isOk(matches);
        assert.isEmpty(matches);
    }

    @test
    public removeRecords_invalidParameters() {
        // Arrange
        const object = MetadataLibraryObject.fromEmpty();

        // Act / Assert
        Testers.testUshort((v) => object.removeRecords(v, 123, "foo"));
        Testers.testUshort((v) => object.removeRecords(123, v, "foo"));
    }

    @test
    public removeRecords_oneMatch() {
        // Arrange
        const object = MetadataLibraryObject.fromEmpty();
        const descriptor1 = new MetadataDescriptor(1, 2, "foo", DataType.Word, 1234);
        const descriptor2 = new MetadataDescriptor(1, 2, "bar", DataType.Word, 2345);
        const descriptor3 = new MetadataDescriptor(3, 2, "foo", DataType.Word, 3456);
        const descriptor4 = new MetadataDescriptor(1, 3, "foo", DataType.Word, 4567);
        object.addRecord(descriptor1);
        object.addRecord(descriptor2);
        object.addRecord(descriptor3);
        object.addRecord(descriptor4);

        // Act
        object.removeRecords(1, 2, "foo");

        // Assert
        assert.sameMembers(object.records, [descriptor2, descriptor3, descriptor4]);
    }

    @test
    public removeRecords_twoMatches() {
        // Arrange
        const object = MetadataLibraryObject.fromEmpty();
        const descriptor1 = new MetadataDescriptor(1, 2, "foo", DataType.Word, 1234);
        const descriptor2 = new MetadataDescriptor(1, 2, "bar", DataType.Word, 2345);
        const descriptor3 = new MetadataDescriptor(3, 2, "foo", DataType.Word, 3456);
        const descriptor4 = new MetadataDescriptor(1, 2, "foo", DataType.Word, 4567);
        object.addRecord(descriptor1);
        object.addRecord(descriptor2);
        object.addRecord(descriptor3);
        object.addRecord(descriptor4);

        // Act
        object.removeRecords(1, 2, "foo");

        // Assert
        assert.sameMembers(object.records, [descriptor2, descriptor3]);
    }

    @test
    public removeRecords_noMatches() {
        // Arrange
        const object = MetadataLibraryObject.fromEmpty();
        const descriptor1 = new MetadataDescriptor(1, 2, "foo", DataType.Word, 1234);
        const descriptor2 = new MetadataDescriptor(1, 2, "bar", DataType.Word, 2345);
        const descriptor3 = new MetadataDescriptor(3, 2, "fux", DataType.Word, 3456);
        const descriptor4 = new MetadataDescriptor(1, 3, "bux", DataType.Word, 4567);
        object.addRecord(descriptor1);
        object.addRecord(descriptor2);
        object.addRecord(descriptor3);
        object.addRecord(descriptor4);

        // Act
        object.removeRecords(1, 2, "fux");

        // Assert
        assert.sameMembers(object.records, [descriptor1, descriptor2, descriptor3, descriptor4]);
    }

    @test
    public render_isRoundTrip() {
        // Arrange
        const record1 = new MetadataDescriptor(123, 234, "foo", DataType.Word, 1234);
        const record2 = new MetadataDescriptor(123, 234, "bar", DataType.Word, 2345);
        const record1Bytes = record1.render();
        const record2Bytes = record2.render();
        const bytes = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.ASF_METADATA_LIBRARY_OBJECT.toBytes(),
            ByteVector.fromUlong(16 + 8 + 2 + record1Bytes.length + record2Bytes.length, false),
            ByteVector.fromUshort(2, false),
            record1Bytes,
            record2Bytes
        );
        const file = TestFile.getFile(bytes);
        const object = MetadataLibraryObject.fromFile(file, 10);

        // Act
        const output = object.render();

        // Assert
        Testers.bvEqual(output, bytes.subarray(10));
    }

    @test
    public setRecords_invalidParameters() {
        // Arrange
        const object = MetadataLibraryObject.fromEmpty();
        const descriptor = new MetadataDescriptor(123, 234, "foo", DataType.Word, 1234);

        // Act / Assert
        Testers.testUshort((v) => object.setRecords(v, 123, "foo", descriptor));
        Testers.testUshort((v) => object.setRecords(123, v, "foo", descriptor));
        Testers.testTruthy((v: string) => object.setRecords(123, 234, v, descriptor));
    }

    @test
    public setRecords_hasMatches() {
        // Arrange
        const object = MetadataLibraryObject.fromEmpty();
        const descriptor1 = new MetadataDescriptor(1, 2, "foo", DataType.Word, 1234);
        const descriptor2 = new MetadataDescriptor(1, 2, "bar", DataType.Word, 2345);
        const descriptor3 = new MetadataDescriptor(3, 2, "foo", DataType.Word, 3456);
        const descriptor4 = new MetadataDescriptor(1, 3, "foo", DataType.Word, 4567);
        object.addRecord(descriptor1);
        object.addRecord(descriptor2);
        object.addRecord(descriptor3);
        object.addRecord(descriptor4);

        const newDescriptor = new MetadataDescriptor(1, 2, "foo", DataType.Word, 8888);

        // Act
        object.setRecords(1, 2, "foo", newDescriptor);

        // Assert
        assert.sameMembers(object.records, [newDescriptor, descriptor2, descriptor3, descriptor4]);
    }

    @test
    public setRecords_noMatches() {
        // Arrange
        const object = MetadataLibraryObject.fromEmpty();
        const descriptor1 = new MetadataDescriptor(1, 2, "foo", DataType.Word, 1234);
        const descriptor2 = new MetadataDescriptor(1, 2, "bar", DataType.Word, 2345);
        const descriptor3 = new MetadataDescriptor(3, 2, "fux", DataType.Word, 3456);
        const descriptor4 = new MetadataDescriptor(1, 3, "bux", DataType.Word, 4567);
        object.addRecord(descriptor1);
        object.addRecord(descriptor2);
        object.addRecord(descriptor3);
        object.addRecord(descriptor4);

        const newDescriptor1 = new MetadataDescriptor(1, 2, "quxx", DataType.Word, 8888);
        const newDescriptor2 = new MetadataDescriptor(1, 2, "buxx", DataType.Word, 8888);

        // Act
        object.setRecords(1, 2, "quxx", newDescriptor1, newDescriptor2);

        // Assert
        assert.sameMembers(
            object.records,
            [descriptor1, descriptor2, descriptor3, descriptor4, newDescriptor1, newDescriptor2]
        );
    }
}
