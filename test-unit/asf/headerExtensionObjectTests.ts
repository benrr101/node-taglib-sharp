import * as Chai from "chai";
import {suite, test} from "mocha-typescript";
import ObjectTests from "./objectTests";
import TestFile from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";

import {Guids, ObjectType} from "../../src/asf/constants";
import HeaderExtensionObject from "../../src/asf/objects/headerExtensionObject";
import UuidWrapper from "../../src/uuidWrapper";
import {MetadataLibraryObject} from "../../src/asf/objects/metadataLibraryObject";
import ContentDescriptionObject from "../../src/asf/objects/contentDescriptionObject";
import BaseObject from "../../src/asf/objects/baseObject";
import UnknownObject from "../../src/asf/objects/unknownObject";

// Setup Chai
const assert = Chai.assert;

@suite class Asf_HeaderExtensionObjectTests extends ObjectTests<HeaderExtensionObject> {
    protected get fromFileConstructor(): (f: File, p: number) => HeaderExtensionObject {
        return HeaderExtensionObject.fromFile;
    }
    protected get minSize(): number { return undefined; }
    protected get objectGuid(): UuidWrapper { return Guids.AsfHeaderExtensionObject; }

    @test
    public fromFile_missingReservedField1() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfHeaderExtensionObject.toBytes(), // Object ID
            ByteVector.fromULong(56, false), // Object size
            new UuidWrapper().toBytes(), // Invalid reserved field 1
            ByteVector.fromUShort(6, false), // Reserved field 2
            ByteVector.fromUInt(10, false), // Header extension data length
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
            Guids.AsfHeaderExtensionObject.toBytes(), // Object ID
            ByteVector.fromULong(56, false), // Object size
            Guids.AsfReserved1.toBytes(), // Reserved field 1
            ByteVector.fromUShort(8888, false), // Invalid reserved field 2
            ByteVector.fromUInt(10, false), // Header extension data length
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
        const data = this.getObjectBytes([metadataLibraryObject, unknownObject]);
        const file = TestFile.getFile(data);

        // Act
        const output = HeaderExtensionObject.fromFile(file, 0);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.objectType, ObjectType.HeaderExtensionObject);
        assert.strictEqual(output.originalSize, data.length);
        assert.isTrue(output.guid.equals(Guids.AsfHeaderExtensionObject));

        const children = output.children;
        assert.strictEqual(children.length, 2);
        assert.isTrue(children[0].guid.equals(Guids.AsfMetadataLibraryObject));
        assert.isTrue(children[1].guid.equals(Guids.AsfContentDescriptionObject));
    }

    @test
    public children_isReadonly() {
        // Arrange
        const data = this.getObjectBytes([]);
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
        const data = this.getObjectBytes([]);
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
        const data = this.getObjectBytes([metadataLibraryObject, unknownObject]);
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
        const data = this.getObjectBytes([
            MetadataLibraryObject.fromEmpty(),
            ContentDescriptionObject.fromEmpty()
        ]);
        const file = TestFile.getFile(data);
        const object = HeaderExtensionObject.fromFile(file, 0);

        // Act
        const output = object.render();

        // Assert
        assert.isTrue(ByteVector.equal(output, data));
    }

    private getObjectBytes(children: BaseObject[]) {
        const childrenBytes = ByteVector.concatenate(... children.map((o) => o.render()));
        return ByteVector.concatenate(
            Guids.AsfHeaderExtensionObject.toBytes(), // Object ID
            ByteVector.fromULong(46 + childrenBytes.length, false), // Object size
            Guids.AsfReserved1.toBytes(), // Reserved field 1
            ByteVector.fromUShort(6, false), // Reserved field 2
            ByteVector.fromUInt(childrenBytes.length, false), // Header extension data length
            childrenBytes
        );
    }
}
