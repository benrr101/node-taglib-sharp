import * as Chai from "chai";
import {test} from "mocha-typescript";

import Testers from "../utilities/testers";
import TestFile from "../utilities/testFile";
import UuidWrapper from "../../src/uuidWrapper";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";

// Setup chai
const assert = Chai.assert;

export default abstract class ObjectTests<TObject> {
    protected abstract get fromFileConstructor(): (f: File, p: number) => TObject;
    protected abstract get minSize(): number;
    protected abstract get objectGuid(): UuidWrapper;

    @test
    public fromFile_invalidParameters() {
        // Arrange
        const mockFile = <File> {};

        // Act / Assert
        Testers.testTruthy((v: File) => this.fromFileConstructor(v, 0));
        Testers.testSafeUint((v) => this.fromFileConstructor(mockFile, v));
    }

    @test
    public fromFile_tooSmall() {
        // Only run if there is a min size
        if (this.minSize === undefined) {
            return;
        }

        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            this.objectGuid.toBytes(), // Object ID
            ByteVector.fromULong(Math.min(26, this.minSize - 10)) // Object size
        );
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => this.fromFileConstructor(file, 10));
    }

    @test
    public fromFile_wrongGuid() {
        // Only run if there is a guid
        if (this.objectGuid === undefined) {
            return;
        }

        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            new UuidWrapper().toBytes(), // Object ID
            ByteVector.fromULong(123), // Object size
            ByteVector.fromSize(20) // Just some bogus bytes
        );
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => this.fromFileConstructor(file, 10));
    }
}
