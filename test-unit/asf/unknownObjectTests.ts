import * as Chai from "chai";
import {suite, test} from "mocha-typescript";
import AsfFile from "../../src/asf/asfFile";
import Testers from "../utilities/testers";
import TestFile from "../utilities/testFile";
import UuidWrapper from "../../src/uuidWrapper";
import {ByteVector} from "../../src/byteVector";

import UnknownObject from "../../src/asf/objects/unknownObject";

// Setup chai
const assert = Chai.assert;

@suite class UnknownObjectTests {
    @test
    public fromFile_invalidParameters() {
        // Arrange
        const mockFile = <AsfFile> {};

        // Act / Assert
        Testers.testTruthy((v: AsfFile) => UnknownObject.fromFile(v, 0));
        Testers.testSafeUint((v) => UnknownObject.fromFile(mockFile, v));
    }

    @test
    public fromFile_validParameters() {
        // Arrange
        const data = this.getObjectBytes();
        const file = TestFile.getFile(data);

        // Act
        const object = UnknownObject.fromFile(file, 10);

        // Assert
        assert.isOk(object);
        assert.isTrue(ByteVector.equal(object.data, this._bytes));
        assert.isTrue(object.guid.equals(this._guid));
        assert.strictEqual(object.originalSize, this._originalSize);
    }

    @test
    public setData_invalidValue() {
        // Arrange
        const data = this.getObjectBytes();
        const file = TestFile.getFile(data);
        const object = UnknownObject.fromFile(file, 10);

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { object.data = v; });
    }

    @test
    public setData_validValue() {
        // Arrange
        const data = this.getObjectBytes();
        const file = TestFile.getFile(data);
        const object = UnknownObject.fromFile(file, 10);

        const newBytes = ByteVector.fromSize(10, 0x23);

        // Act
        object.data = newBytes;

        // Assert
        assert.isTrue(ByteVector.equal(object.data, newBytes));
        assert.strictEqual(object.originalSize, this._originalSize);
    }

    @test
    public render_isRoundTrip() {
        // Arrange
        const data = this.getObjectBytes();
        const file = TestFile.getFile(data);
        const object = UnknownObject.fromFile(file, 10);

        // Act
        const output = object.render();

        // Assert
        assert.isOk(output);
        assert.isTrue(ByteVector.equal(output, data.mid(10)));
    }

    private readonly _bytes = ByteVector.fromSize(32, 0x12);
    private readonly _guid = new UuidWrapper();
    private readonly _originalSize = this._bytes.length + 16 + 8;

    private getObjectBytes() {
        return ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            this._guid.toBytes(),
            ByteVector.fromULong(this._originalSize, false),
            this._bytes
        );
    }
}
