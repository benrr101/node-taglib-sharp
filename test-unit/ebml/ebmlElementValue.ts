import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import TestFile from "../utilities/testFile";
import {EbmlElementValue, EbmlParserOptions} from "../../src/ebml/ebmlParser";
import {File} from "../../src/file";
import {Testers} from "../utilities/testers";

@suite class Ebml_ElementValueTests {
    private readonly DEFAULT_OPTIONS = new EbmlParserOptions();

    @test
    public constructor_falsyFile() {
        Testers.testTruthy((f: File) => new EbmlElementValue(f, 0, 0, this.DEFAULT_OPTIONS));
    }

    @test
    public constructor_invalidOffset() {
        Testers.testSafeUint((o: number) => new EbmlElementValue(TestFile.mockFile(), o, 0, this.DEFAULT_OPTIONS));
    }

    @test
    public constructor_invalidSize() {
        Testers.testSafeUint((s: number) => new EbmlElementValue(TestFile.mockFile(), 0, s, this.DEFAULT_OPTIONS));
    }

    @test
    public constructor_valid() {
        // Act
        const element = new EbmlElementValue(TestFile.mockFile(), 0, 0, this.DEFAULT_OPTIONS);

        // Assert
        assert.strictEqual(element.isLoaded, false);
    }

    @test
    public loads_isLoaded() {
        // Arrange
        const testFile = TestFile.getFile([0x01]);
        const element = new EbmlElementValue(testFile, 0, 1, this.DEFAULT_OPTIONS);

        // Act
        element.load();

        // Assert
        assert.isTrue(element.isLoaded);
    }

    @test
    public getBool_true() {
        // Arrange
        const bytes = [0xBB];
        const element = new EbmlElementValue(TestFile.getFile(bytes), 0, bytes.length, this.DEFAULT_OPTIONS);

        // Act
        const result = element.getBool();

        // Assert
        assert.isTrue(result);
        assert.isTrue(element.isLoaded);
    }

    @test
    public getBool_false() {
        // Arrange
        const bytes = [0x00];
        const element = new EbmlElementValue(TestFile.getFile(bytes), 0, bytes.length, this.DEFAULT_OPTIONS);

        // Act
        const result = element.getBool();

        // Assert
        assert.isFalse(result);
        assert.isTrue(element.isLoaded);
    }

    @test
    public getBytes_noOffset() {
        // Arrange
        const bytes = [0x01, 0x02, 0x03, 0xAA, 0xBB, 0xCC];
        const element = new EbmlElementValue(TestFile.getFile(bytes), 0, bytes.length, this.DEFAULT_OPTIONS);

        // Act
        const result = element.getBytes();

        // Assert
        Testers.bvEqual(result, bytes);
        assert.isTrue(element.isLoaded);
    }

    @test
    public getBytes_withOffset() {
        // Arrange
        const bytes = [0x01, 0x02, 0x03, 0xAA, 0xBB, 0xCC];
        const element = new EbmlElementValue(TestFile.getFile(bytes), 3, 3, this.DEFAULT_OPTIONS);

        // Act
        const result = element.getBytes();

        // Assert
        Testers.bvEqual(result, bytes.slice(3));
        assert.isTrue(element.isLoaded);
    }

    @test
    public getDouble_double() {
        // Arrange
        const bytes = [0x40, 0x09, 0x21, 0xFB, 0x54, 0x2F, 0xE9, 0x38];
        const element = new EbmlElementValue(TestFile.getFile(bytes), 0, bytes.length, this.DEFAULT_OPTIONS);

        // Act
        const result = element.getDouble();

        // Assert
        assert.strictEqual(result, 3.141592653);
    }

    @test
    public getDouble_float() {
        // Arrange
        const bytes = [0x40, 0x49, 0x0F, 0xDB];
        const element = new EbmlElementValue(TestFile.getFile(bytes), 0, bytes.length, this.DEFAULT_OPTIONS);

        // Act
        const result = element.getDouble();

        // Assert
        assert.strictEqual(result, 3.1415927410125732);
    }

    @test
    public getDouble_invalid() {
        // Case 1: too short
        // eslint-disable-next-line
        let element = new EbmlElementValue(TestFile.getFile(Array(2, 0xAA)), 0, 2, this.DEFAULT_OPTIONS);
        assert.throws(() => element.getDouble());

        // Case 2: too long
        // eslint-disable-next-line
        element = new EbmlElementValue(TestFile.getFile(Array(9, 0xAA)), 0, 9, this.DEFAULT_OPTIONS);
        assert.throws(() => element.getDouble());

        // Case 3: in between
        // eslint-disable-next-line
        element = new EbmlElementValue(TestFile.getFile(Array(6, 0xAA)), 0, 6, this.DEFAULT_OPTIONS);
        assert.throws(() => element.getDouble());
    }

    private getGenericOptions(): EbmlParserOptions {
        return new EbmlParserOptions();
    }
}
