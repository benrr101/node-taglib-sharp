import * as Chai from "chai";
import {suite, test} from "mocha-typescript";
import ObjectTests from "./objectTests";
import Testers from "../utilities/testers";
import TestFile from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";

import Guids from "../../src/asf/guids";
import PaddingObject from "../../src/asf/objects/PaddingObject";
import UuidWrapper from "../../src/uuidWrapper";

// Setup chai
const assert = Chai.assert;

@suite class Asf_PaddingObjectTests extends ObjectTests<PaddingObject> {
    protected get fromFileConstructor(): (f: File, p: number) => PaddingObject { return PaddingObject.fromFile; }
    protected get minSize(): number { return 24; }
    protected get objectGuid(): UuidWrapper { return Guids.AsfPaddingObject; }

    @test
    public fromFile_validParameters() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfPaddingObject.toBytes(), // Object ID
            ByteVector.fromULong(32, false), // Object size
            ByteVector.fromSize(8)
        );
        const file = TestFile.getFile(data);

        // Act
        const object = PaddingObject.fromFile(file, 10);

        // Assert
        assert.isOk(object);
        assert.isTrue(object.guid.equals(Guids.AsfPaddingObject));
        assert.strictEqual(object.originalSize, 32);
        assert.strictEqual(object.size, 32);
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
        assert.isTrue(object.guid.equals(Guids.AsfPaddingObject));
        assert.strictEqual(object.originalSize, 0);
        assert.strictEqual(object.size, 123);
    }

    @test
    public render_isRoundTrip() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfPaddingObject.toBytes(), // Object ID
            ByteVector.fromULong(32, false), // Object size
            ByteVector.fromSize(8)
        );
        const file = TestFile.getFile(data);
        const object = PaddingObject.fromFile(file, 10);

        // Act
        const output = object.render();

        // Assert
        assert.isTrue(ByteVector.equal(output, data.mid(10)));
    }
}
