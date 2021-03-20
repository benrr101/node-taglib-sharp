import * as Chai from "chai";
import {suite, test} from "mocha-typescript";
import ObjectTests from "./objectTests";
import TestFile from "../utilities/testFile";
import {ByteVector, StringType} from "../../src/byteVector";
import {File} from "../../src/file";

import Guids from "../../src/asf/guids";
import HeaderExtensionObject from "../../src/asf/objects/contentDescriptionObject";
import UuidWrapper from "../../src/uuidWrapper";
import PropertyTests from "../utilities/propertyTests";

// Setup Chai
const assert = Chai.assert;

@suite class HeaderExtensionObjectTests extends ObjectTests<HeaderExtensionObject> {
    protected get fromFileConstructor(): (f: File, p: number) => HeaderExtensionObject {
        return HeaderExtensionObject.fromFile;
    }
    protected get minSize(): number { return undefined; }
    protected get objectGuid(): UuidWrapper { return Guids.AsfHeaderExtensionObject; }

    @test
    public static fromFile_missingReservedField1() {
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
    public static fromFile_missingReservedField2() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfHeaderExtensionObject.toBytes(), // Object ID
            ByteVector.fromULong(56, false), // Object size
            Guids.AsfReserved1.toBytes(), // Reserved field 1
            ByteVector.fromUShort(888888, false), // Invalid reserved field 2
            ByteVector.fromUInt(10, false), // Header extension data length
            ByteVector.fromSize(10), // Header extension data
        );
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => { HeaderExtensionObject.fromFile(file, 10); });
    }

    // @test
    // public static fromFile_validParameters() {
    //     // Arrange
    //     const data = ByteVector.concatenate()
    // }
}
