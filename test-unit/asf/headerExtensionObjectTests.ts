import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import BaseObject from "../../src/asf/objects/baseObject";
import ContentDescriptionObject from "../../src/asf/objects/contentDescriptionObject";
import HeaderExtensionObject from "../../src/asf/objects/headerExtensionObject";
import ObjectTests from "./objectTests";
import TestFile from "../utilities/testFile";
import UnknownObject from "../../src/asf/objects/unknownObject";
import UuidWrapper from "../../src/uuidWrapper";
import {ByteVector} from "../../src/byteVector";
import {Guids, ObjectType} from "../../src/asf/constants";
import {File} from "../../src/file";
import {MetadataLibraryObject} from "../../src/asf/objects/metadataLibraryObject";
import {Testers} from "../utilities/testers";

@suite class Asf_HeaderExtensionObjectTests extends ObjectTests<HeaderExtensionObject> {
    protected get fromFileConstructor(): (f: File, p: number) => HeaderExtensionObject {
        return HeaderExtensionObject.fromFile;
    }
    protected get minSize(): number { return undefined; }
    protected get objectGuid(): UuidWrapper { return Guids.ASF_HEADER_EXTENSION_OBJECT; }

    @test
    public fromFile_missingReservedField1() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.ASF_HEADER_EXTENSION_OBJECT.toBytes(), // Object ID
            ByteVector.fromUlong(56, false), // Object size
            new UuidWrapper().toBytes(), // Invalid reserved field 1
            ByteVector.fromUshort(6, false), // Reserved field 2
            ByteVector.fromUint(10, false), // Header extension data length
            ByteVector.fromSize(10), // Header extension data
        );
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => { HeaderExtensionObject.fromFile(file, 10); });
    }

    @test
    public fromFile_missingReservedField2() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.ASF_HEADER_EXTENSION_OBJECT.toBytes(), // Object ID
            ByteVector.fromUlong(56, false), // Object size
            Guids.ASF_RESERVED.toBytes(), // Reserved field 1
            ByteVector.fromUshort(8888, false), // Invalid reserved field 2
            ByteVector.fromUint(10, false), // Header extension data length
            ByteVector.fromSize(10), // Header extension data
        );
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => { HeaderExtensionObject.fromFile(file, 10); });
    }

    @test
    public fromFile_validParameters() {
        // Arrange
        const metadataLibraryObject = MetadataLibraryObject.fromEmpty();
        const unknownObject = ContentDescriptionObject.fromEmpty();
        const data = Asf_HeaderExtensionObjectTests.getObjectBytes([metadataLibraryObject, unknownObject]);
        const file = TestFile.getFile(data);

        // Act
        const output = HeaderExtensionObject.fromFile(file, 0);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.objectType, ObjectType.HeaderExtensionObject);
        assert.strictEqual(output.originalSize, data.length);
        assert.isTrue(output.guid.equals(Guids.ASF_HEADER_EXTENSION_OBJECT));

        const children = output.children;
        assert.strictEqual(children.length, 2);
        assert.isTrue(children[0].guid.equals(Guids.ASF_METADATA_LIBRARY_OBJECT));
        assert.isTrue(children[1].guid.equals(Guids.ASF_CONTENT_DESCRIPTION_OBJECT));
    }

    @test
    public children_isReadonly() {
        // Arrange
        const data = Asf_HeaderExtensionObjectTests.getObjectBytes([]);
        const file = TestFile.getFile(data);
        const output = HeaderExtensionObject.fromFile(file, 0);

        const newObject = MetadataLibraryObject.fromEmpty();

        // Act
        const children = output.children;

        // Assert
        assert.strictEqual(children.length, 0);

        // Act
        children.push(newObject);

        // Assert
        assert.strictEqual(output.children.length, 0);
    }

    @test
    public addUniqueObject_noMatches() {
        // Arrange
        const data = Asf_HeaderExtensionObjectTests.getObjectBytes([]);
        const file = TestFile.getFile(data);
        const output = HeaderExtensionObject.fromFile(file, 0);

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
        const metadataLibraryObject = MetadataLibraryObject.fromEmpty();
        const unknownObject = ContentDescriptionObject.fromEmpty();
        const data = Asf_HeaderExtensionObjectTests.getObjectBytes([metadataLibraryObject, unknownObject]);
        const file = TestFile.getFile(data);
        const output = HeaderExtensionObject.fromFile(file, 0);

        const newObjectBytes = ContentDescriptionObject.fromEmpty().render();
        const newObjectFile = TestFile.getFile(newObjectBytes);
        const newObject = UnknownObject.fromFile(newObjectFile, 0);

        // Act
        output.addUniqueObject(newObject);

        // Assert
        const children = output.children;
        assert.strictEqual(children.length, 2);
        assert.isTrue(children.indexOf(newObject) >= 0);
    }

    @test
    public render_isRoundTrip() {
        // Arrange
        const data = Asf_HeaderExtensionObjectTests.getObjectBytes([
            MetadataLibraryObject.fromEmpty(),
            ContentDescriptionObject.fromEmpty()
        ]);
        const file = TestFile.getFile(data);
        const object = HeaderExtensionObject.fromFile(file, 0);

        // Act
        const output = object.render();

        // Assert
        Testers.bvEqual(output, data);
    }

    private static getObjectBytes(children: BaseObject[]) {
        const childrenBytes = ByteVector.concatenate(... children.map((o) => o.render()));
        return ByteVector.concatenate(
            Guids.ASF_HEADER_EXTENSION_OBJECT.toBytes(), // Object ID
            ByteVector.fromUlong(46 + childrenBytes.length, false), // Object size
            Guids.ASF_RESERVED.toBytes(), // Reserved field 1
            ByteVector.fromUshort(6, false), // Reserved field 2
            ByteVector.fromUint(childrenBytes.length, false), // Header extension data length
            childrenBytes
        );
    }
}
