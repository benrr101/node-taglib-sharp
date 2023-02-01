import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import EbmlValueTestCases from "./ebmlValueTestCases";
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
    public getBool() {
        for (const t of EbmlValueTestCases.bool) {
            // Arrange
            const element = new EbmlElementValue(TestFile.getFile(t.bytes), 0, t.bytes.length, this.DEFAULT_OPTIONS);

            // Act
            const result = element.getBool();

            // Assert
            assert.strictEqual(result, t.result);
            assert.isTrue(element.isLoaded);
        }
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
    public getDouble() {
        for (const tc of EbmlValueTestCases.double) {
            // Arrange
            const element = new EbmlElementValue(TestFile.getFile(tc.bytes), 0, tc.bytes.length, this.DEFAULT_OPTIONS);

            // Act
            const result = element.getDouble();

            // Assert
            assert.strictEqual(result, tc.result);
            assert.isTrue(element.isLoaded);
        }
    }

    @test
    public getDouble_invalid() {
        for (const tc of EbmlValueTestCases.doubleInvalid) {
            // Arrange
            const element = new EbmlElementValue(TestFile.getFile(tc.bytes), 0, tc.bytes.length, this.DEFAULT_OPTIONS);

            // Act / Assert
            assert.throws(() => element.getDouble());
            assert.isTrue(element.isLoaded);
        }
    }

    @test
    public getString() {
        for (const tc of EbmlValueTestCases.string) {
            // Arrange
            const element = new EbmlElementValue(TestFile.getFile(tc.bytes), 0, tc.bytes.length, this.DEFAULT_OPTIONS);

            // Act
            const result = element.getString();

            // Assert
            assert.strictEqual(result, tc.result);
            assert.isTrue(element.isLoaded);
        }
    }

    @test
    public getSafeUint() {
        for (const tc of EbmlValueTestCases.safeUint) {
            // Arrange
            const element = new EbmlElementValue(TestFile.getFile(tc.bytes), 0, tc.bytes.length, this.DEFAULT_OPTIONS);

            // Act
            const result = element.getSafeUint();

            // Assert
            assert.strictEqual(result, tc.result);
            assert.isTrue(element.isLoaded);
        }
    }

    @test
    public getSafeUint_invalid() {
        // Arrange
        const bytes = [0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
        const element = new EbmlElementValue(TestFile.getFile(bytes), 0, bytes.length, this.DEFAULT_OPTIONS);

        // Act / Assert
        assert.throws(() => element.getSafeUint());
    }

    @test
    public getUlong() {
        for (const tc of EbmlValueTestCases.ulong) {
            // Arrange
            const element = new EbmlElementValue(TestFile.getFile(tc.bytes), 0, tc.bytes.length, this.DEFAULT_OPTIONS);

            // Act
            const result = element.getUlong();

            // Assert
            assert.strictEqual(result, tc.result);
            assert.isTrue(element.isLoaded);
        }
    }
}
