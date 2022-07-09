import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import ObjectTests from "./objectTests";
import PaddingObject from "../../src/asf/objects/PaddingObject";
import PropertyTests from "../utilities/propertyTests";
import TestFile from "../utilities/testFile";
import UuidWrapper from "../../src/uuidWrapper";
import {ByteVector} from "../../src/byteVector";
import {Guids, ObjectType} from "../../src/asf/constants";
import {File} from "../../src/file";
import {Testers} from "../utilities/testers";

@suite class Asf_PaddingObjectTests extends ObjectTests<PaddingObject> {
    protected get fromFileConstructor(): (f: File, p: number) => PaddingObject { return PaddingObject.fromFile; }
    protected get minSize(): number { return undefined; }
    protected get objectGuid(): UuidWrapper { return Guids.ASF_PADDING_OBJECT; }

    @test
    public fromFile_validParameters() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.ASF_PADDING_OBJECT.toBytes(), // Object ID
            ByteVector.fromUlong(32, false), // Object size
            ByteVector.fromSize(8)
        );
        const file = TestFile.getFile(data);

        // Act
        const object = PaddingObject.fromFile(file, 10);

        // Assert
        assert.isOk(object);
        assert.isTrue(object.guid.equals(Guids.ASF_PADDING_OBJECT));
        assert.strictEqual(object.objectType, ObjectType.PaddingObject);
        assert.strictEqual(object.originalSize, 32);
        assert.strictEqual(object.size, 8);
    }

    @test
    public fromSize_invalidParameters() {
        // Act / Assert
        Testers.testSafeUint((v) => PaddingObject.fromSize(v));
    }

    @test
    public fromSize_validParameters() {
        // Act
        const object = PaddingObject.fromSize(123);

        // Assert
        assert.isOk(object);
        assert.isTrue(object.guid.equals(Guids.ASF_PADDING_OBJECT));
        assert.strictEqual(object.objectType, ObjectType.PaddingObject);
        assert.strictEqual(object.originalSize, 0);
        assert.strictEqual(object.size, 123);
    }

    @test
    public size_invalid() {
        // Arrange
        const object = PaddingObject.fromSize(123);

        // Act / Assert
        Testers.testSafeUint((v) => object.size = v);
    }

    @test
    public size() {
        // Arrange
        const object = PaddingObject.fromSize(123);

        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => object.size = v, () => object.size, 888);

        // Act
        const output = object.render();

        // Assert
        assert.strictEqual(output.length, 888 + 24);
    }

    @test
    public render_isRoundTrip() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.ASF_PADDING_OBJECT.toBytes(), // Object ID
            ByteVector.fromUlong(32, false), // Object size
            ByteVector.fromSize(8)
        );
        const file = TestFile.getFile(data);
        const object = PaddingObject.fromFile(file, 10);

        // Act
        const output = object.render();

        // Assert
        Testers.bvEqual(output, data.subarray(10));
    }
}
