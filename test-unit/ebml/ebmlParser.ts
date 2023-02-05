import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import EbmlParser from "../../src/ebml/ebmlParser";
import EbmlParserOptions from "../../src/ebml/ebmlParserOptions";
import TestFile from "../utilities/testFile"
import {ByteVector} from "../../src/byteVector";
import {Allow, Testers} from "../utilities/testers";
import {File} from "../../src/file";

@suite
class Ebml_ParserTests {
    @test
    public constructor_invalidParams() {
        // Act / Assert
        Testers.testTruthy((f: File) => new EbmlParser(f, 0));
        Testers.testSafeUint((o: number) => new EbmlParser(TestFile.mockFile(), o), Allow.Undefined);
    }

    @test
    public constructor_invalidOptions() {
        // Act / Asssert
        Testers.testSafeUint((o: number) => {
            const options = new EbmlParserOptions();
            options.maxIdLength = o;
            const _ = new EbmlParser(TestFile.mockFile(), 0, options);
        });

        Testers.testSafeUint((o: number) => {
            const options = new EbmlParserOptions();
            options.maxSizeLength = o;
            const _ = new EbmlParser(TestFile.mockFile(), 0, options);
        });
    }

    @test
    public constructor_unsupportedOptions() {
        // Arrange 1
        const options1 = new EbmlParserOptions();
        options1.maxIdLength = 16;

        // Act / Assert 1
        assert.throws(() => new EbmlParser(TestFile.mockFile(), 0, options1));

        // Arrange 2
        const options2 = new EbmlParserOptions();
        options1.maxSizeLength = 16;

        // Act / Assert 2
        assert.throws(() => new EbmlParser(TestFile.mockFile(), 0, options2));

    }

    @test
    public readVariableInteger_1ByteValue() {
        // Arrange
        const parser = this.getTestParser([0xBB]);

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
        const parser = this.getTestParser([0x6A, 0xAA])

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
        const parser = this.getTestParser([0x36, 0x7A, 0xA5]);

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
        const parser = this.getTestParser([0x1C, 0x16, 0x7A, 0xA5])

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
        const parser = this.getTestParser([0x0E, 0x6C, 0x16, 0x7A, 0xA5]);

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
        const parser = this.getTestParser([0x07, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);

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
        const parser = this.getTestParser([0x03, 0x63, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);

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
        const parser = this.getTestParser([0x01, 0x0F, 0x63, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);

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
        const parser = this.getTestParser([0x01, 0x1F, 0x63, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);

        // Act / Assert
        assert.throws(() => parser["readVariableInteger"](8));
    }

    @test
    public readVariableInteger_tooFewBytes() {
        // Arrange
        const parser = this.getTestParser([0x01, 0x1F, 0x63, 0x28, 0x6C, 0x16, 0x7A]);

        // Act / Assert
        assert.throws(() => parser["readVariableInteger"](8));
    }

    @test
    public renderVariableInteger_1ByteValue() {
        // Arrange
        const parser = this.getTestParser([], 0);

        // Act
        const result = parser["renderVariableInteger"](0x3B);

        // Assert
        Testers.bvEqual(result, [0xBB]);
    }

    @test
    public renderVariableInteger_2ByteValue() {
        // Arrange
        const parser = this.getTestParser([], 0);

        // Act
        const result = parser["renderVariableInteger"](0x2AAA);

        // Assert
        Testers.bvEqual(result, [0x6A, 0xAA]);
    }

    @test
    public renderVariableInteger_3ByteValue() {
        // Arrange
        const parser = this.getTestParser([], 0);

        // Act
        const result = parser["renderVariableInteger"](0x167AA5);

        // Assert
        Testers.bvEqual(result, [0x36, 0x7A, 0xA5]);
    }

    @test
    public renderVariableInteger_4ByteValue() {
        // Arrange
        const parser = this.getTestParser([], 0);

        // Act
        const result = parser["renderVariableInteger"](0x0C167AA5);

        // Assert
        Testers.bvEqual(result, [0x1C, 0x16, 0x7A, 0xA5]);
    }

    @test
    public renderVariableInteger_5ByteValue() {
        // Arrange
        const parser = this.getTestParser([], 0);

        // Act
        const result = parser["renderVariableInteger"](0x066C167AA5);

        // Assert
        Testers.bvEqual(result, [0x0E, 0x6C, 0x16, 0x7A, 0xA5]);
    }

    @test
    public renderVariableInteger_6ByteValue() {
        // Arrange
        const parser = this.getTestParser([], 0);

        // Act
        const result = parser["renderVariableInteger"](0x03286C167AA5);

        // Assert
        Testers.bvEqual(result, [0x07, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);
    }

    @test
    public renderVariableInteger_7ByteValue() {
        // Arrange
        const parser = this.getTestParser([], 0);

        // Act
        const result = parser["renderVariableInteger"](0x0163286C167AA5);

        // Assert
        Testers.bvEqual(result, [0x03, 0x63, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);
    }

    @test
    public renderVariableInteger_8ByteValue() {
        // Arrange
        const parser = this.getTestParser([], 0);

        // Act
        const result = parser["renderVariableInteger"](0x0F63286C167AA5);

        // Assert
        Testers.bvEqual(result, [0x01, 0x0F, 0x63, 0x28, 0x6C, 0x16, 0x7A, 0xA5]);
    }

    @test
    public renderVariableInteger_overflow() {
        // Arrange
        const parser = this.getTestParser([], 0);

        // Act / Assert
        assert.throws(() => parser["renderVariableInteger"](BigInt("9151314442816847872")));
    }

    private getTestParser(bytes: ByteVector|number[], offset: number = 0): EbmlParser {
        const file = TestFile.getFile(bytes);
        return new EbmlParser(file, offset);
    }
}
