import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import TestFile from "../utilities/testFile"
import {EbmlParser} from "../../src/ebml/ebmlParser";
import {ByteVector} from "../../src/byteVector";
import {Testers} from "../utilities/testers";

@suite
class Ebml_ParserTests {
    @test
    public readVariableInteger_1ByteValue() {
        // Arrange
        const bytes = ByteVector.fromByteArray([0xBB]);
        const file = TestFile.getFile(bytes);
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["readVariableInteger"](8);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.bytes, 1);
        assert.strictEqual(result.value, 0x3B);
    }

    @test
    public readVariableInteger_2ByteValue() {
        // Arrange
        const bytes = ByteVector.fromByteArray([0x6A, 0xAA]);
        const file = TestFile.getFile(bytes);
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["readVariableInteger"](8);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.bytes, 2);
        assert.strictEqual(result.value, 0x2AAA);
    }

    @test
    public readVariableInteger_3ByteValue() {
        // Arrange
        const bytes = ByteVector.fromByteArray([0x36, 0x7A, 0xA5]);
        const file = TestFile.getFile(bytes);
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["readVariableInteger"](8);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.bytes, 3);
        assert.strictEqual(result.value, 0x167AA5);
    }

    @test
    public readVariableInteger_4ByteValue() {
        // Arrange
        const bytes = ByteVector.fromByteArray([0x1C, 0x16, 0x7A, 0xA5]);
        const file = TestFile.getFile(bytes);
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["readVariableInteger"](8);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.bytes, 4);
        assert.strictEqual(result.value, 0x0C167AA5);
    }

    @test
    public readVariableInteger_5ByteValue() {
        // Arrange
        const bytes = ByteVector.fromByteArray([0x0E, 0x6C, 0x16, 0x7A, 0xA5]);
        const file = TestFile.getFile(bytes);
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["readVariableInteger"](8);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.bytes, 5);
        assert.strictEqual(result.value, 0x066C167AA5);
    }

    @test
    public readVariableInteger_6ByteValue() {
        // Arrange
        const bytes = ByteVector.fromByteArray([0x07, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);
        const file = TestFile.getFile(bytes);
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["readVariableInteger"](8);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.bytes, 6);
        assert.strictEqual(result.value, 0x03286C167AA5);
    }

    @test
    public readVariableInteger_7ByteValue() {
        // Arrange
        const bytes = ByteVector.fromByteArray([0x03, 0x63, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);
        const file = TestFile.getFile(bytes);
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["readVariableInteger"](8);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.bytes, 7);
        assert.strictEqual(result.value, 0x0163286C167AA5);
    }

    @test
    public readVariableInteger_8ByteValue() {
        // Arrange
        const bytes = ByteVector.fromByteArray([0x01, 0x0F, 0x63, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);
        const file = TestFile.getFile(bytes);
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["readVariableInteger"](8);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.bytes, 8);
        assert.strictEqual(result.value, 0x0F63286C167AA5);
    }

    @test
    public readVariableInteger_overflow() {
        // Arrange
        const bytes = ByteVector.fromByteArray([0x01, 0x1F, 0x63, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);
        const file = TestFile.getFile(bytes);
        const parser = new EbmlParser(file, 0);

        // Act / Assert
        assert.throws(() => parser["readVariableInteger"](8));
    }

    @test
    public readVariableInteger_tooFewBytes() {
        // Arrange
        const bytes = ByteVector.fromByteArray([0x01, 0x1F, 0x63, 0x28, 0x6C, 0x16, 0x7A]);
        const file = TestFile.getFile(bytes);
        const parser = new EbmlParser(file, 0);

        // Act / Assert
        assert.throws(() => parser["readVariableInteger"](8));
    }

    @test
    public renderVariableInteger_1ByteValue() {
        // Arrange
        const file = TestFile.getFile(ByteVector.empty());
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["renderVariableInteger"](0x3B);

        // Assert
        Testers.bvEqual(result, [0xBB]);
    }

    @test
    public renderVariableInteger_2ByteValue() {
        // Arrange
        const file = TestFile.getFile(ByteVector.empty());
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["renderVariableInteger"](0x2AAA);

        // Assert
        Testers.bvEqual(result, [0x6A, 0xAA]);
    }

    @test
    public renderVariableInteger_3ByteValue() {
        // Arrange
        const file = TestFile.getFile(ByteVector.empty());
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["renderVariableInteger"](0x167AA5);

        // Assert
        Testers.bvEqual(result, [0x36, 0x7A, 0xA5]);
    }

    @test
    public renderVariableInteger_4ByteValue() {
        // Arrange
        const file = TestFile.getFile(ByteVector.empty());
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["renderVariableInteger"](0x0C167AA5);

        // Assert
        Testers.bvEqual(result, [0x1C, 0x16, 0x7A, 0xA5]);
    }

    @test
    public renderVariableInteger_5ByteValue() {
        // Arrange
        const file = TestFile.getFile(ByteVector.empty());
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["renderVariableInteger"](0x066C167AA5);

        // Assert
        Testers.bvEqual(result, [0x0E, 0x6C, 0x16, 0x7A, 0xA5]);
    }

    @test
    public renderVariableInteger_6ByteValue() {
        // Arrange
        const file = TestFile.getFile(ByteVector.empty());
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["renderVariableInteger"](0x03286C167AA5);

        // Assert
        Testers.bvEqual(result, [0x07, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);
    }

    @test
    public renderVariableInteger_7ByteValue() {
        // Arrange
        const file = TestFile.getFile(ByteVector.empty());
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["renderVariableInteger"](0x0163286C167AA5);

        // Assert
        Testers.bvEqual(result, [0x03, 0x63, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);
    }

    @test
    public renderVariableInteger_8ByteValue() {
        // Arrange
        const file = TestFile.getFile(ByteVector.empty());
        const parser = new EbmlParser(file, 0);

        // Act
        const result = parser["renderVariableInteger"](0x0F63286C167AA5);

        // Assert
        Testers.bvEqual(result, [0x01, 0x0F, 0x63, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);
    }

    @test
    public renderVariableInteger_overflow() {
        // Arrange
        const file = TestFile.getFile(ByteVector.empty());
        const parser = new EbmlParser(file, 0);

        // Act / Assert
        assert.throws(() => parser["renderVariableInteger"](BigInt("9151314442816847872")));
    }
}
