import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import BaseObject from "../../src/asf/objects/baseObject";
import ContentDescriptionObject from "../../src/asf/objects/contentDescriptionObject";
import HeaderExtensionObject from "../../src/asf/objects/headerExtensionObject";
import HeaderObject from "../../src/asf/objects/headerObject";
import ObjectTests from "./objectTests";
import PaddingObject from "../../src/asf/objects/paddingObject";
import RiffWaveFormatEx from "../../src/riff/riffWaveFormatEx";
import TestFile from "../utilities/testFile";
import UuidWrapper from "../../src/uuidWrapper";
import {ByteVector} from "../../src/byteVector";
import {Guids, ObjectType} from "../../src/asf/constants";
import {ExtendedContentDescriptionObject} from "../../src/asf/objects/extendedContentDescriptionObject";
import {File} from "../../src/file";
import {MetadataLibraryObject} from "../../src/asf/objects/metadataLibraryObject";
import {Testers} from "../utilities/testers";

@suite class Asf_HeaderObjectTests extends ObjectTests<HeaderObject> {
    protected get fromFileConstructor(): (f: File, p: number) => HeaderObject { return HeaderObject.fromFile; }
    protected get minSize(): number { return 26; }
    protected get objectGuid(): UuidWrapper { return Guids.AsfHeaderObject; }

    @test
    public fromFile_missingFirstReservedByte() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfHeaderObject.toBytes(), // Object ID
            ByteVector.fromUlong(30, false), // Object size
            ByteVector.fromUint(0, false), // Child objects
            0x12, 0x02 // Invalid reserved
        );
        const file = TestFile.getFile(bytes);

        // Act / Assert
        assert.throws(() => HeaderObject.fromFile(file, 10));
    }

    @test
    public fromFile_missingSecondReservedByte() {
        // Arrange
        const bytes = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfHeaderObject.toBytes(), // Object ID
            ByteVector.fromUlong(30, false), // Object size
            ByteVector.fromUint(0, false), // Child objects
            0x01, 0x23 // Invalid reserved
        );
        const file = TestFile.getFile(bytes);

        // Act / Assert
        assert.throws(() => HeaderObject.fromFile(file, 10));
    }

    @test
    public fromFile_validParameters() {
        // Arrange
        const paddingObject = PaddingObject.fromSize(123);
        const unknownObject = MetadataLibraryObject.fromEmpty();
        const bytes = Asf_HeaderObjectTests.getObjectBytesFromObjects([paddingObject, unknownObject]);
        const file = TestFile.getFile(bytes);

        // Act
        const object = HeaderObject.fromFile(file, 10);

        // Assert
        assert.isOk(object);
        assert.isTrue(object.guid.equals(Guids.AsfHeaderObject));
        assert.strictEqual(object.objectType, ObjectType.HeaderObject);
        assert.strictEqual(object.originalSize, bytes.length - 10);

        const children = object.children;
        assert.strictEqual(children.length, 2);
        assert.strictEqual(children[0].objectType, ObjectType.PaddingObject);
        assert.strictEqual(children[1].objectType, ObjectType.UnknownObject);

        assert.isOk(object.properties);
        assert.strictEqual(object.properties.durationMilliseconds, 0);
        assert.isEmpty(object.properties.codecs);

        assert.isUndefined(object.extension);
        assert.isFalse(object.hasContentDescriptors);
    }

    @test
    public extension_hasExtension() {
        // Arrange
        const headerExtensionBytes = ByteVector.concatenate(
            Guids.AsfHeaderExtensionObject.toBytes(), // Object ID
            ByteVector.fromUlong(46, false), // Object size
            Guids.AsfReserved1.toBytes(), // Reserved field 1
            ByteVector.fromUshort(6, false), // Reserved field 2
            ByteVector.fromUint(0, false), // Header extension data length
        );

        const headerBytes = Asf_HeaderObjectTests.getObjectBytesFromBytes(headerExtensionBytes, 1);
        const headerFile = TestFile.getFile(headerBytes);
        const headerObject = HeaderObject.fromFile(headerFile, 10);

        // Act
        const extension = headerObject.extension;

        // Assert
        assert.isOk(extension);
        assert.isTrue(extension instanceof HeaderExtensionObject);
        assert.strictEqual(extension.objectType, ObjectType.HeaderExtensionObject);
    }

    @test
    public children_isReadOnly() {
        // Arrange
        const headerBytes = Asf_HeaderObjectTests.getObjectBytesFromObjects([]);
        const headerFile = TestFile.getFile(headerBytes);
        const headerObject = HeaderObject.fromFile(headerFile, 10);
        const children = headerObject.children;

        // Act
        children.push(ContentDescriptionObject.fromEmpty());

        // Assert
        assert.isEmpty(headerObject.children);
    }

    @test
    public hasContentDescriptors_contentDescriptionObject() {
        // Arrange
        const contentDescriptionObject = ContentDescriptionObject.fromEmpty();
        const headerBytes = Asf_HeaderObjectTests.getObjectBytesFromObjects([contentDescriptionObject]);
        const headerFile = TestFile.getFile(headerBytes);
        const headerObject = HeaderObject.fromFile(headerFile, 10);

        // Act
        const hasContentDescriptors = headerObject.hasContentDescriptors;

        // Assert
        assert.isTrue(hasContentDescriptors);
    }

    @test
    public hasContentDescriptors_extendedContentDescriptorObject() {
        // Arrange
        const extendedContentDescriptionObject = ExtendedContentDescriptionObject.fromEmpty();
        const headerBytes = Asf_HeaderObjectTests.getObjectBytesFromObjects([extendedContentDescriptionObject]);
        const headerFile = TestFile.getFile(headerBytes);
        const headerObject = HeaderObject.fromFile(headerFile, 10);

        // Act
        const hasContentDescriptors = headerObject.hasContentDescriptors;

        // Assert
        assert.isTrue(hasContentDescriptors);
    }

    @test
    public properties_hasPropertiesObjects() {
        // Arrange
        const filePropertiesBytes = ByteVector.concatenate(
            Guids.AsfFilePropertiesObject.toBytes(), // Object ID
            ByteVector.fromUlong(104, false), // Object size
            new UuidWrapper().toBytes(), // File ID
            ByteVector.fromUlong(1234, false), // File Size
            ByteVector.fromUlong(BigInt(116559432000000000), false), // Creation date
            ByteVector.fromUlong(2345, false), // Data packets count
            ByteVector.fromUlong(3456000, false), // Play duration
            ByteVector.fromUlong(4567000, false), // Send duration
            ByteVector.fromUlong(5, false), // Preroll
            ByteVector.fromUint(123, false), // Flags
            ByteVector.fromUint(234, false), // Minimum data packet size
            ByteVector.fromUint(345, false), // Maximum data packet size
            ByteVector.fromUint(456, false) // Maximum bitrate
        );

        const streamPropertiesBytes = ByteVector.concatenate(
            Guids.AsfStreamPropertiesObject.toBytes(), // Object ID
            ByteVector.fromUlong(117, false), // Object size
            Guids.AsfAudioMedia.toBytes(), // Stream type
            new UuidWrapper().toBytes(), // Error correction type GUID
            ByteVector.fromUlong(1234567890, false), // Time offset
            ByteVector.fromUint(16, false), // Type specific data length
            ByteVector.fromUint(23, false), // Error correction data length
            ByteVector.fromShort(0x1200, false), // Flags
            ByteVector.fromSize(4, 0x0), // Reserved
            // AUDIO TYPE SPECIFIC DATA
            ByteVector.fromUshort(0xF1AC, false), // Format tag
            ByteVector.fromUshort(3, false), // Number of channels
            ByteVector.fromUint(1234, false), // Samples per second
            ByteVector.fromUint(2345, false), // Average bytes per second
            ByteVector.fromUshort(88, false), // Block align
            ByteVector.fromUshort(16, false), // Bits per sample
            ByteVector.fromSize(23, 0x23)
        );

        const childrenBytes = ByteVector.concatenate(filePropertiesBytes, streamPropertiesBytes);
        const headerBytes = Asf_HeaderObjectTests.getObjectBytesFromBytes(childrenBytes, 2);
        const headerFile = TestFile.getFile(headerBytes);
        const headerObject = HeaderObject.fromFile(headerFile, 10);

        // Act
        const properties = headerObject.properties;

        // Assert
        assert.isOk(properties);
        assert.strictEqual(properties.durationMilliseconds, 340);
        assert.strictEqual(properties.codecs.length, 1);
        assert.isTrue(properties.codecs[0] instanceof RiffWaveFormatEx);
    }

    @test
    public addUniqueObject_noMatches() {
        // Arrange
        const data = Asf_HeaderObjectTests.getObjectBytesFromObjects([]);
        const file = TestFile.getFile(data);
        const output = HeaderObject.fromFile(file, 10);

        const newObject = ContentDescriptionObject.fromEmpty();

        // Act
        output.addUniqueObject(newObject);

        // Assert
        const children = output.children;
        assert.sameMembers(children, [newObject]);
    }

    @test
    public addUniqueObject_withMatches() {
        // Arrange
        const paddingObject = PaddingObject.fromSize(123);
        const unknownObject = MetadataLibraryObject.fromEmpty();
        const newObject = PaddingObject.fromSize(234);

        const data = Asf_HeaderObjectTests.getObjectBytesFromObjects([paddingObject, unknownObject]);
        const file = TestFile.getFile(data);
        const output = HeaderObject.fromFile(file, 10);

        // Act
        output.addUniqueObject(newObject);

        // Assert
        const children = output.children;
        assert.strictEqual(children.length, 2);
        assert.strictEqual(children[0], newObject);
        assert.strictEqual(children[1].objectType, ObjectType.UnknownObject);
    }

    @test
    public removeContentDescriptor_noMatches() {
        // Arrange
        const paddingObject = PaddingObject.fromSize(123);
        const unknownObject = MetadataLibraryObject.fromEmpty();
        const headerData = Asf_HeaderObjectTests.getObjectBytesFromObjects([paddingObject, unknownObject]);
        const headerFile = TestFile.getFile(headerData);
        const headerObject = HeaderObject.fromFile(headerFile, 10);

        // Act
        headerObject.removeContentDescriptor();

        // Assert
        assert.strictEqual(headerObject.children.length, 2);
    }

    @test
    public removeContentDescriptor_withMatches() {
        // Arrange
        const contentDescriptionObject = ContentDescriptionObject.fromEmpty();
        const extendedContentDescription = ExtendedContentDescriptionObject.fromEmpty();
        const headerBytes = Asf_HeaderObjectTests.getObjectBytesFromObjects(
            [contentDescriptionObject, extendedContentDescription]
        );
        const headerFile = TestFile.getFile(headerBytes);
        const headerObject = HeaderObject.fromFile(headerFile, 10);

        // Act
        headerObject.removeContentDescriptor();

        // Assert
        assert.isEmpty(headerObject.children);
    }

    @test
    public render_objectShrunk_addsNegativeDifferencePaddingObject() {
        // Arrange
        const unknownObject = MetadataLibraryObject.fromEmpty();
        const paddingObject = PaddingObject.fromSize(123);

        const headerData = Asf_HeaderObjectTests.getObjectBytesFromObjects([unknownObject, paddingObject]);
        const headerFile = TestFile.getFile(headerData);
        const headerObject = HeaderObject.fromFile(headerFile, 10);

        // Act
        const output = headerObject.render();

        // Assert
        // NOTE: the padding object is removed, so it "shrunk", then it's added back, so
        //    the contents should be the same.
        Testers.bvEqual(output, headerData.subarray(10));
    }

    @test
    public render_objectGrew_adds4096Padding() {
        // Arrange
        const unknownObject = MetadataLibraryObject.fromEmpty();
        const headerData = Asf_HeaderObjectTests.getObjectBytesFromObjects([unknownObject]);
        const headerFile = TestFile.getFile(headerData);
        const headerObject = HeaderObject.fromFile(headerFile, 10);

        const newObject = ContentDescriptionObject.fromEmpty();
        headerObject.addUniqueObject(newObject);

        // Act
        const output = headerObject.render();

        // Assert
        const expectedChildren = [
            unknownObject,
            newObject,
            PaddingObject.fromSize(4096)
        ];
        const expected = Asf_HeaderObjectTests.getObjectBytesFromObjects(expectedChildren);
        Testers.bvEqual(output, expected.subarray(10));
    }

    @test
    public render_noPaddingObjectNeeded() {
        // Arrange
        const unknownObject1 = MetadataLibraryObject.fromEmpty();
        const unknownObject2 = MetadataLibraryObject.fromEmpty();

        const headerData = Asf_HeaderObjectTests.getObjectBytesFromObjects([unknownObject1, unknownObject2]);
        const headerFile = TestFile.getFile(headerData);
        const headerObject = HeaderObject.fromFile(headerFile, 10);

        // Act
        const output = headerObject.render();

        // Assert
        Testers.bvEqual(output, headerData.subarray(10));
    }

    private static getObjectBytesFromBytes(children: ByteVector, childrenCount: number) {
        return ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfHeaderObject.toBytes(), // Object ID
            ByteVector.fromUlong(30 + children.length, false), // Object size
            ByteVector.fromUint(childrenCount, false), // Child objects
            0x01, 0x02, // Invalid reserved
            children
        );
    }

    private static getObjectBytesFromObjects(children: BaseObject[]) {
        const childrenBytes = ByteVector.concatenate(... children.map((o) => o.render()));
        return ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfHeaderObject.toBytes(), // Object ID
            ByteVector.fromUlong(30 + childrenBytes.length, false), // Object size
            ByteVector.fromUint(children.length, false), // Child objects
            0x01, 0x02, // Reserved bytes
            childrenBytes
        );
    }
}
