import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as fs from "fs";
import {slow, suite, test, timeout} from "mocha-typescript";

import PropertyTests from "./utilities/propertyTests";
import TestConstants from "./testConstants";
import {ByteVector} from "../src/byteVector";
import {SeekOrigin, Stream} from "../src/stream";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class StreamTests {
    @test
    public createAsRead() {
        // Act
        const stream = Stream.createAsRead(TestConstants.testFilePath);

        try {
            // Assert
            assert.isOk(stream);
            assert.isFalse(stream.canWrite);
            assert.strictEqual(stream.length, 10);
            assert.strictEqual(stream.position, 0);
        } finally {
            // Cleanup
            stream.close();
        }
    }

    @test
    public createAsRead_fileDoesNotExist() {
        // Arrange
        const testPath = TestConstants.getTestFilePath();

        // Act / Assert
        assert.throws(() => { const stream = Stream.createAsRead(testPath); });
    }

    @test
    public createAsReadWrite_fileExists() {
        // Act
        const stream = Stream.createAsReadWrite(TestConstants.testFilePath);

        try {
            // Assert
            assert.isOk(stream);
            assert.isTrue(stream.canWrite);
            assert.strictEqual(stream.length, 10);
            assert.strictEqual(stream.position, 0);
        } finally {
            // Cleanup
            stream.close();
        }
    }

    @test
    public createAsReadWrite_fileDoesNotExist() {
        // Arrange
        const testPath = TestConstants.getTestFilePath();

        // Act / Assert
        assert.throws(() => { const stream = Stream.createAsReadWrite(testPath); });
    }

    @test
    public position_invalidPosition() {
        // Arrange
        const stream = Stream.createAsRead(TestConstants.testFilePath);

        try {
            // Act / Assert
            assert.throws(() => stream.position = -1);
            assert.throws(() => stream.position = 1.23);
            assert.throws(() => stream.position = TestConstants.testFileContents.length + 1);
            assert.throws(() => stream.position = Number.MAX_SAFE_INTEGER + 1);
        } finally {
            // Cleanup
            stream.close();
        }
    }

    @test
    public read() {
        // Arrange
        const stream = Stream.createAsRead(TestConstants.testFilePath);
        let buffer: Uint8Array;
        let output: number;

        try {
            // Act - Read into beginning of buffer
            buffer = new Uint8Array(5);
            output = stream.read(buffer, 0, 3);

            // Assert
            const expected1 = new Uint8Array([
                TestConstants.testFileContents[0],
                TestConstants.testFileContents[1],
                TestConstants.testFileContents[2],
                0, 0
            ]);
            assert.deepStrictEqual(buffer, expected1);
            assert.strictEqual(output, 3);
            assert.strictEqual(stream.position, 3);

            // Act - Read into buffer w/offset
            buffer = new Uint8Array(5);
            output = stream.read(buffer, 1, 3);

            // Assert
            const expected2 = new Uint8Array([
                0,
                TestConstants.testFileContents[3],
                TestConstants.testFileContents[4],
                TestConstants.testFileContents[5],
                0
            ]);
            assert.deepStrictEqual(buffer, expected2);
            assert.strictEqual(output, 3);
            assert.strictEqual(stream.position, 6);

            // Act - Read to end of stream
            buffer = new Uint8Array(5);
            output = stream.read(buffer, 0, 5);

            // Assert
            const expected3 = new Uint8Array([
                TestConstants.testFileContents[6],
                TestConstants.testFileContents[7],
                TestConstants.testFileContents[8],
                TestConstants.testFileContents[9],
                0
            ]);
            assert.deepStrictEqual(buffer, expected3);
            assert.strictEqual(output, 4);
            assert.strictEqual(stream.position, 10);

            // Act - Read at end of stream
            buffer = new Uint8Array(3);
            output = stream.read(buffer, 0, 3);

            // Assert
            const expected4 = new Uint8Array([0, 0, 0]);
            assert.deepStrictEqual(buffer, expected4);
            assert.strictEqual(output, 0);
            assert.strictEqual(stream.position, 10);

            // Act - Move position and read again
            stream.position = 0;
            buffer = new Uint8Array(5);
            output = stream.read(buffer, 0, 5);

            // Assert
            const expected5 = new Uint8Array([
                TestConstants.testFileContents[0],
                TestConstants.testFileContents[1],
                TestConstants.testFileContents[2],
                TestConstants.testFileContents[3],
                TestConstants.testFileContents[4]
            ]);
            assert.deepStrictEqual(buffer, expected5);
            assert.strictEqual(output, 5);
            assert.strictEqual(stream.position, 5);
        } finally {
            // Cleanup
            stream.close();
        }
    }

    @test
    public seek_begin_invalidPosition() {
        // Arrange
        const stream = Stream.createAsRead(TestConstants.testFilePath);

        try {
            // Act / Assert
            assert.throws(() => stream.seek(-1, SeekOrigin.Begin));
            assert.throws(() => stream.seek(1.23, SeekOrigin.Begin));
            assert.throws(() => stream.seek(TestConstants.testFileContents.length + 1, SeekOrigin.Begin));
            assert.throws(() => stream.seek(Number.MAX_SAFE_INTEGER + 1, SeekOrigin.Begin));
        } finally {
            // Cleanup
            stream.close();
        }
    }

    @test
    public seek_begin_valid() {
        // Arrange
        const stream = Stream.createAsRead(TestConstants.testFilePath);
        const get = () => stream.position;
        const set = (v: number) => stream.seek(v, SeekOrigin.Begin);

        try {
            // Act / Assert
            PropertyTests.propertyRoundTrip(set, get, 3);
            PropertyTests.propertyRoundTrip(set, get, 0);
            PropertyTests.propertyRoundTrip(set, get, TestConstants.testFileContents.length);
        } finally {
            // Cleanup
            stream.close();
        }
    }

    @test
    public seek_current_invalidPosition() {
        // Arrange
        const stream = Stream.createAsRead(TestConstants.testFilePath);
        stream.position = 5;

        try {
            // Act / Assert
            assert.throws(() => stream.seek(1.23, SeekOrigin.Current)); // Not int
            assert.throws(() => stream.seek(Number.MAX_SAFE_INTEGER + 1, SeekOrigin.Current)); // Not int
            assert.throws(() => stream.seek(6, SeekOrigin.Current)); // Would go past end of stream
            assert.throws(() => stream.seek(-6, SeekOrigin.Current)); // Would go past beginning of stream
        } finally {
            // Cleanup
            stream.close();
        }
    }

    @test
    public seek_current_valid() {
        // Arrange
        const stream = Stream.createAsRead(TestConstants.testFilePath);
        stream.position = 5;
        const get = () => stream.position;
        const set = (v: number) => stream.seek(v, SeekOrigin.Current);

        try {
            // Act / Assert
            PropertyTests.propertyNormalized(set, get, 3, 8);
            PropertyTests.propertyNormalized(set, get, 0, 8);
            PropertyTests.propertyNormalized(set, get, 2, 10);
            PropertyTests.propertyNormalized(set, get, -10, 0);
        } finally {
            // Cleanup
            stream.close();
        }
    }

    @test
    public seek_end_invalidPosition() {
        // Arrange
        const stream = Stream.createAsRead(TestConstants.testFilePath);

        try {
            // Act / Assert
            assert.throws(() => stream.seek(1.23, SeekOrigin.End)); // Not int
            assert.throws(() => stream.seek(Number.MAX_SAFE_INTEGER + 1, SeekOrigin.End)); // Not int
            assert.throws(() => stream.seek(1, SeekOrigin.End)); // Would go past end of stream
            assert.throws(() => stream.seek(-11, SeekOrigin.End)); // Would go past beginning of stream
        } finally {
            // Cleanup
            stream.close();
        }
    }

    @test
    public seek_end_valid() {
        // Arrange
        const stream = Stream.createAsRead(TestConstants.testFilePath);
        const get = () => stream.position;
        const set = (v: number) => stream.seek(v, SeekOrigin.End);

        try {
            // Act / Assert
            PropertyTests.propertyNormalized(set, get, -5, 5);
            PropertyTests.propertyNormalized(set, get, 0, TestConstants.testFileContents.length);
            PropertyTests.propertyNormalized(set, get, -TestConstants.testFileContents.length, 0);
        } finally {
            // Cleanup
            stream.close();
        }
    }

    @test
    public setLength_invalidLength() {
        const testAction = (testFilePath: string, stream: Stream) => {
            // Act / Assert
            assert.throws(() => stream.setLength(-1));
            assert.throws(() => stream.setLength(1.23));
            assert.throws(() => stream.setLength(Number.MAX_SAFE_INTEGER + 1));
        };
        this.testWithFile(testAction, true);
    }

    @test
    public setLength_readOnly() {
        const testAction = (testFilePath: string, stream: Stream) => {
            // Act / Assert
            assert.throws(() => stream.setLength(10));
        };
        this.testWithFile(testAction, false);
    }

    @test
    public setLength_noChange() {
        const testAction = (testFilePath: string, stream: Stream) => {
            // Arrange
            stream.position = 5;

            // Act
            stream.setLength(stream.length);

            // Assert
            assert.strictEqual(stream.length, testFilePath.length);
            assert.strictEqual(stream.position, 5);

            const stats = fs.statSync(testFilePath);
            assert.strictEqual(stats.size, testFilePath.length);
        };
        this.testWithFile(testAction, true);
    }

    @test
    public setLength_shorten() {
        const testAction = (testFilePath: string, stream: Stream) => {
            // Arrange
            stream.position = 5;

            // Act
            stream.setLength(4);

            // Assert
            assert.strictEqual(stream.length, 4);
            assert.strictEqual(stream.position, 4);

            const stats = fs.statSync(testFilePath);
            assert.strictEqual(stats.size, 4);
        };
        this.testWithFile(testAction, true);
    }

    @test
    public setLength_lengthen() {
        const testAction = (testFilePath: string, stream: Stream) => {
            // Arrange
            stream.position = 5;
            const newLength = stream.length + 5;

            // Act
            stream.setLength(newLength);

            // Assert
            assert.strictEqual(stream.length, newLength);
            assert.strictEqual(stream.position, 5);

            const stats = fs.statSync(testFilePath);
            assert.strictEqual(stats.size, newLength);
        };
        this.testWithFile(testAction, true);
    }

    @test
    public write_readOnly() {
        const testAction = (testFilePath: string, stream: Stream) => {
            // Arrange
            const contents = new Uint8Array([0x01, 0x02, 0x03]);

            // Act / Assert
            assert.throws(() => { stream.write(contents, 0, 1); });
        };
        this.testWithFile(testAction, false);
    }

    @test
    public write_writeAtBeginning() {
        const testAction = (testFilePath: string, stream: Stream) => {
            // Arrange
            const buffer = new Uint8Array([0x01, 0x02, 0x03]);

            // Act
            stream.write(buffer, 0, 3);

            // Assert
            assert.strictEqual(stream.length, testFilePath.length);
            assert.strictEqual(stream.position, 3);

            const contents = fs.readFileSync(testFilePath);
            const expected = ByteVector.fromString(testFilePath);
            expected.set(0, 0x01);
            expected.set(1, 0x02);
            expected.set(2, 0x03);
            assert.deepStrictEqual(contents, expected.data);
        };
        this.testWithFile(testAction, true);
    }

    @test
    public write_writeInMiddle() {
        const testAction = (testFilePath: string, stream: Stream) => {
            // Arrange
            const buffer = new Uint8Array([0x01, 0x02, 0x03]);
            stream.position = 3;

            // Act
            stream.write(buffer, 0, 3);

            // Assert
            assert.strictEqual(stream.length, testFilePath.length);
            assert.strictEqual(stream.position, 6);

            const contents = fs.readFileSync(testFilePath);
            const expected = ByteVector.fromString(testFilePath);
            expected.set(3, 0x01);
            expected.set(4, 0x02);
            expected.set(5, 0x03);
            assert.deepStrictEqual(contents, expected.data);
        };
        this.testWithFile(testAction, true);
    }

    @test
    public write_writeAtEnd() {
        const testAction = (testFilePath: string, stream: Stream) => {
            // Arrange
            const buffer = new Uint8Array([0x01, 0x02, 0x03]);
            stream.position = stream.length;

            // Act
            stream.write(buffer, 0, 3);

            // Assert
            assert.strictEqual(stream.length, testFilePath.length + 3);
            assert.strictEqual(stream.position, testFilePath.length + 3);

            const contents = fs.readFileSync(testFilePath);
            const expected = ByteVector.fromString(testFilePath);
            expected.addByteArray(buffer);
            assert.deepStrictEqual(contents, expected.data);
        };
        this.testWithFile(testAction, true);
    }

    @test
    public write_partialBuffer() {
        const testAction = (testFilePath: string, stream: Stream) => {
            // Arrange
            const buffer = new Uint8Array([0x01, 0x02, 0x03, 0x04]);

            // Act
            stream.write(buffer, 1, 2);

            // Assert
            assert.strictEqual(stream.length, testFilePath.length);
            assert.strictEqual(stream.position, 2);

            const contents = fs.readFileSync(testFilePath);
            const expected = ByteVector.fromString(testFilePath);
            expected.set(0, 0x02);
            expected.set(1, 0x03);
            assert.deepStrictEqual(contents, expected.data);
        };
        this.testWithFile(testAction, true);
    }

    private testWithFile(testAction: (filePath: string, stream: Stream) => void, isWritable: boolean) {
        // Arrange
        const testFilePath = TestConstants.getTestFilePath();
        fs.writeFileSync(testFilePath, testFilePath);

        const stream = isWritable
            ? Stream.createAsReadWrite(testFilePath)
            : Stream.createAsRead(testFilePath);

        try {
            testAction(testFilePath, stream);
        } finally {
            // Cleanup
            try {
                fs.unlinkSync(testFilePath);
            } catch {
                // It's just best effort
            }
        }
    }
}
