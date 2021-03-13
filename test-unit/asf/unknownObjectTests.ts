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
        const guid = new UuidWrapper();
        const bytes = ByteVector.fromSize(32, 0x12);
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10),
            guid.toBytes(),
            ByteVector.fromULong(bytes.length + 16 + 8, false),
            bytes
        );
        const file = TestFile.getFile(data);

        // Act
        const object = UnknownObject.fromFile(file, 10);

        // Assert
        assert.isOk(object);
        assert.isTrue(ByteVector.equal(object.data, bytes));
    }

    @test
    public render_isRoundTrip() {
        // Arrange
        const guid = new UuidWrapper();
        const bytes = ByteVector.fromSize(32, 0x12);
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10),
            guid.toBytes(),
            ByteVector.fromULong(bytes.length + 16 + 8, false),
            bytes
        );
        const file = TestFile.getFile(data);
        const object = UnknownObject.fromFile(file, 10);

        // Act
        const output = object.render();

        // Assert
        assert.isOk(output);
        assert.isTrue(ByteVector.equal(output, data.mid(10)));
    }
}
