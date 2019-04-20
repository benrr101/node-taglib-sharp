import * as BigInt from "big-integer";
import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as StreamBuffers from "stream-buffers";
import {slow, suite, test, timeout} from "mocha-typescript";

import TestConstants from "./testConstants";
import {ByteVector, StringType} from "../src/byteVector";

const AB2B = require("arraybuffer-to-buffer");

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;


@suite(timeout(3000), slow(1000)) class ByteVectorTestsFromByteArray {
    @test
    public NoData() {
        // Arrange, Act, Assert
        assert.throws(() => {
            ByteVector.fromByteArray(undefined);
        });
        assert.throws(() => {
            ByteVector.fromByteArray(null);
        });
    }

    @test
    public EmptyData() {
        // Arrange, Act
        const data = new Uint8Array();
        const bv = ByteVector.fromByteArray(data);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 0);
        assert.isTrue(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, data);
    }

    @test
    public WithData() {
        // Arrange, Act
        const data = new Uint8Array([0x0, 0x1, 0x2, 0x3, 0x4]);
        const bv = ByteVector.fromByteArray(data);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, data.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, data);
    }

    @test
    public ReadOnly() {
        // Arrange, Act
        const data = new Uint8Array([0x0, 0x1, 0x2, 0x3, 0x4]);
        const bv = ByteVector.fromByteArray(data, true);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, data.length);
        assert.isFalse(bv.isEmpty);
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, data);
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorTestsFromByteVector {
    @test
    public NoVector() {
        // Arrange, Act, Assert
        assert.throws(() => {
            ByteVector.fromByteVector(null);
        });
        assert.throws(() => {
            ByteVector.fromByteArray(undefined);
        });
    }

    @test
    public WithData() {
        // Arrange, Act
        const data = new Uint8Array([0x1, 0x2]);
        const original = ByteVector.fromByteArray(data);
        const bv = ByteVector.fromByteVector(original);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, data.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, data);
    }

    @test
    public ReadOnly() {
        // Arrange, Act
        const data = new Uint8Array([0x1, 0x2]);
        const original = ByteVector.fromByteArray(data);
        const bv = ByteVector.fromByteVector(original, true);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, data.length);
        assert.isFalse(bv.isEmpty);
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, data);
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorTestsFromInt {
    @test
    public BadInteger() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromInt(undefined); });
        assert.throws(() => { ByteVector.fromInt(null); });
        assert.throws(() => { ByteVector.fromInt(0.1); });
        assert.throws(() => { ByteVector.fromInt(Number.MAX_SAFE_INTEGER + 1); });
    }

    @test
    public Overflow() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromInt(0x10000000000); });
        assert.throws(() => { ByteVector.fromInt(0xFFFFFFFF); });
        assert.throws(() => { ByteVector.fromInt(-0x10000000000); });
    }

    @test
    public Zero_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            undefined,
            undefined
        );
    }

    @test
    public Zero_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            undefined,
            false
        );
    }

    @test
    public Positive1Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x12,
            [0x00, 0x00, 0x00, 0x12],
            undefined,
            undefined
        );
    }

    @test
    public Positive1Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x12,
            [0x12, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive2Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x1234,
            [0x00, 0x00, 0x12, 0x34],
            undefined,
            undefined
        );
    }

    @test
    public Positive2Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x1234,
            [0x34, 0x12, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive3Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x123456,
            [0x00, 0x12, 0x34, 0x56],
            undefined,
            undefined
        );
    }

    @test
    public Positive3Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x123456,
            [0x56, 0x34, 0x12, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive4Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x12345678,
            [0x12, 0x34, 0x56, 0x78],
            undefined,
            undefined
        );
    }

    @test
    public Positive4Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x12345678,
            [0x78, 0x56, 0x34, 0x12],
            undefined,
            false
        );
    }

    @test
    public Negative1Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x12,
            [0xFF, 0xFF, 0xFF, 0xEE],
            undefined,
            undefined
        );
    }

    @test
    public Negative1Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x12,
            [0xEE, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public Negative2Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x1234,
            [0xFF, 0xFF, 0xED, 0xCC],
            undefined,
            undefined
        );
    }

    @test
    public Negative2Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x1234,
            [0xCC, 0xED, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public Negative3Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x123456,
            [0xFF, 0xED, 0xCB, 0xAA],
            undefined,
            undefined
        );
    }

    @test
    public Negative3Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x123456,
            [0xAA, 0xCB, 0xED, 0xFF],
            undefined,
            false
        );
    }

    @test
    public Negative4Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x12345678,
            [0xED, 0xCB, 0xA9, 0x88],
            undefined,
            undefined
        );
    }

    @test
    public Negative4Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x12345678,
            [0x88, 0xA9, 0xCB, 0xED],
            undefined,
            false
        );
    }

    @test
    public ReadOnly() {
        ByteVectorTestsFromInt.TestInt(
            0,
            [0x00, 0x00, 0x00, 0x00],
            true,
            undefined
        );
    }

    private static TestInt(value: number, expectedData: number[], isReadOnly: boolean, bigEndian: boolean): void {
        // Arrange, Act
        const bv = ByteVector.fromInt(value, bigEndian, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 4);
        assert.isFalse(bv.isEmpty);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorTestsFromLong {
    @test
    public BadValue() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromLong(undefined); });
        assert.throws(() => { ByteVector.fromLong(null); });
    }

    @test
    public Overflow() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromLong(BigInt("9223372036854775808")); });
        assert.throws(() => { ByteVector.fromLong(BigInt("-9223372036854775809")); });
    }

    @test
    public Positive1Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x12"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12],
            undefined,
            undefined
        );
    }

    @test
    public Positive1Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x12"),
            [0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive2Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x1234"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34],
            undefined,
            undefined
        );
    }

    @test
    public Positive2Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x1234"),
            [0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive3Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56],
            undefined,
            undefined
        );
    }

    @test
    public Positive3Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456"),
            [0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive4Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x12345678"),
            [0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78],
            undefined,
            undefined
        );
    }

    @test
    public Positive4Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x12345678"),
            [0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive5Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456789A"),
            [0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A],
            undefined,
            undefined
        );
    }

    @test
    public Positive5Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456789A"),
            [0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive6Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456789ABC"),
            [0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC],
            undefined,
            undefined
        );
    }

    @test
    public Positive6Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456789ABC"),
            [0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive7Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456789ABCDE"),
            [0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE],
            undefined,
            undefined
        );
    }

    @test
    public Positive7Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456789ABCDE"),
            [0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive8Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("123456789ABCDEF0", 16),
            [0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0],
            undefined,
            undefined
        );
    }

    @test
    public Positive8Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("123456789ABCDEF0", 16),
            [0xF0, 0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12],
            undefined,
            false
        );
    }

    @test
    public Negative1Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-12", 16),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xEE],
            undefined,
            undefined
        );
    }

    @test
    public Negative1Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-12", 16),
            [0xEE, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public Negative2Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-1234", 16),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xED, 0xCC],
            undefined,
            undefined
        );
    }

    @test
    public Negative2Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-1234", 16),
            [0xCC, 0xED, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public Negative3Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-123456", 16),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xED, 0xCB, 0xAA],
            undefined,
            undefined
        );
    }

    @test
    public Negative3Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-123456", 16),
            [0xAA, 0xCB, 0xED, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public Negative4Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-12345678", 16),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xED, 0xCB, 0xA9, 0x88],
            undefined,
            undefined
        );
    }

    @test
    public Negative4Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-12345678", 16),
            [0x88, 0xA9, 0xCB, 0xED, 0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public Negative5Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-123456789A", 16),
            [0xFF, 0xFF, 0xFF, 0xED, 0xCB, 0xA9, 0x87, 0x66],
            undefined,
            undefined
        );
    }

    @test
    public Negative5Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-123456789A", 16),
            [0x66, 0x87, 0xA9, 0xCB, 0xED, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public Negative6Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-123456789ABC", 16),
            [0xFF, 0xFF, 0xED, 0xCB, 0xA9, 0x87, 0x65, 0x44],
            undefined,
            undefined
        );
    }

    @test
    public Negative6Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-123456789ABC", 16),
            [0x44, 0x65, 0x87, 0xA9, 0xCB, 0xED, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public Negative7Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-123456789ABCDE", 16),
            [0xFF, 0xED, 0xCB, 0xA9, 0x87, 0x65, 0x43, 0x22],
            undefined,
            undefined
        );
    }

    @test
    public Negative7Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-123456789ABCDE", 16),
            [0x22, 0x43, 0x65, 0x87, 0xA9, 0xCB, 0xED, 0xFF],
            undefined,
            false
        );
    }

    @test
    public Negative8Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-123456789ABCDEF0", 16),
            [0xED, 0xCB, 0xA9, 0x87, 0x65, 0x43, 0x21, 0x10],
            undefined,
            undefined
        );
    }

    @test
    public Negative8Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("-123456789ABCDEF0", 16),
            [0x10, 0x21, 0x43, 0x65, 0x87, 0xA9, 0xCB, 0xED],
            undefined,
            false
        );
    }

    @test
    public Zero_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            undefined
        );
    }

    @test
    public Zero_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            true
        );
    }

    @test
    public ReadOnly() {
        ByteVectorTestsFromLong.TestLong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            true,
            undefined
        );
    }

    private static TestLong(
        value: BigInt.BigInteger,
        expectedData: number[],
        isReadOnly: boolean,
        bigEndian: boolean
    ): void {
        // Arrange, Act
        const bv = ByteVector.fromLong(value, bigEndian, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 8);
        assert.isFalse(bv.isEmpty);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorTestsFromPath {
    @test
    public NoPath() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromPath(undefined); });
        assert.throws(() => { ByteVector.fromPath(null); });
        assert.throws(() => { ByteVector.fromPath(""); });
    }

    @test
    public WithPath() {
        // Arrange, Act
        const bv = ByteVector.fromPath(TestConstants.testFilePath);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, TestConstants.testFileContents.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array(TestConstants.testFileContents));
    }

    @test
    public ReadOnly() {
        // Arrange, Act
        const bv = ByteVector.fromPath(TestConstants.testFilePath, true);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, TestConstants.testFileContents.length);
        assert.isFalse(bv.isEmpty);
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array(TestConstants.testFileContents));
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorTestsFromShort {
    @test
    public BadIntShort() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromShort(undefined); });
        assert.throws(() => { ByteVector.fromShort(null); });
        assert.throws(() => { ByteVector.fromShort(0.1); });
        assert.throws(() => { ByteVector.fromShort(Number.MAX_SAFE_INTEGER + 1); });
    }

    @test
    public Overflow() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromShort(0x1000000); });
        assert.throws(() => { ByteVector.fromShort(-0x1000000); });
    }

    @test
    public Zero_BigEndian() {
        ByteVectorTestsFromShort.TestShort(
            0x0,
            [0x0, 0x0],
            undefined,
            undefined
        );
    }

    @test
    public Zero_LittleEndian() {
        ByteVectorTestsFromShort.TestShort(
            0x0,
            [0x0, 0x0],
            undefined,
            false
        );
    }

    @test
    public Positive1Byte_BigEndian() {
        ByteVectorTestsFromShort.TestShort(
            0x12,
            [0x00, 0x12],
            undefined,
            undefined
        );
    }

    @test
    public Positive1Byte_LittleEndian() {
        ByteVectorTestsFromShort.TestShort(
            0x12,
            [0x12, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive2Byte_BigEndian() {
        ByteVectorTestsFromShort.TestShort(
            0x1234,
            [0x12, 0x34],
            undefined,
            undefined
        );
    }

    @test
    public Positive2Byte_LittleEndian() {
        ByteVectorTestsFromShort.TestShort(
            0x1234,
            [0x34, 0x12],
            undefined,
            false
        );
    }

    @test
    public Negative1Byte_BigEndian() {
        ByteVectorTestsFromShort.TestShort(
            -0x12,
            [0xFF, 0xEE],
            undefined,
            undefined
        );
    }

    @test
    public Negative1Byte_LittleEndian() {
        ByteVectorTestsFromShort.TestShort(
            -0x12,
            [0xEE, 0xFF],
            undefined,
            false
        );
    }

    @test
    public Negative2Byte_BigEndian() {
        ByteVectorTestsFromShort.TestShort(
            -0x1234,
            [0xED, 0xCC],
            undefined,
            undefined
        );
    }

    @test
    public Negative2Byte_LittleEndian() {
        ByteVectorTestsFromShort.TestShort(
            -0x1234,
            [0xCC, 0xED],
            undefined,
            false
        );
    }

    @test
    public ReadOnly() {
        ByteVectorTestsFromShort.TestShort(
            0x0,
            [0x0, 0x0],
            true,
            undefined
        );
    }

    private static TestShort(value: number, expectedData: number[], isReadOnly: boolean, bigEndian: boolean): void {
        // Arrange, Act
        const bv = ByteVector.fromShort(value, bigEndian, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 2);
        assert.isFalse(bv.isEmpty);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorTestsFromSize {
    @test
    public BadSize() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromSize(undefined); });
        assert.throws(() => { ByteVector.fromSize(null); });
        assert.throws(() => { ByteVector.fromSize(0.1); });
        assert.throws(() => { ByteVector.fromSize(Number.MAX_SAFE_INTEGER + 1); });
        assert.throws(() => { ByteVector.fromSize(-1); });
    }

    @test
    public BadFillValue() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromSize(1, 0.1); });
        assert.throws(() => { ByteVector.fromSize(1, -1); });
        assert.throws(() => { ByteVector.fromSize(1, 0xfff); });
    }

    @test
    public ZeroSize() {
        // Arrange, Act
        const bv = ByteVector.fromSize(0);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 0);
        assert.isTrue(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array());
    }

    @test
    public WithoutFill() {
        // Arrange, Act
        const bv = ByteVector.fromSize(4);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 4);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x00, 0x00, 0x00]));
    }

    @test
    public WithFill() {
        // Arrange, Act
        const bv = ByteVector.fromSize(4, 0xEE);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 4);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([0xEE, 0xEE, 0xEE, 0xEE]));
    }

    @test
    public ReadOnly() {
        // Arrange, Act
        const bv = ByteVector.fromSize(4, undefined, true);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 4);
        assert.isFalse(bv.isEmpty);
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x00, 0x00, 0x00]));
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorTestsFromStream {
    @test
    public async NoStream() {
        await Promise.all([
            assert.isRejected(ByteVector.fromStream(undefined)),
            assert.isRejected(ByteVector.fromStream(null))
        ]);
    }

    @test
    public async Empty() {
        // Arrange - Create a stream with no data in it
        const stream = new StreamBuffers.ReadableStreamBuffer();

        // Act - Get the promise, end the stream with no data in it, await the promise
        const bvPromise = ByteVector.fromStream(stream);
        stream.stop();
        const bv = await bvPromise;

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 0);
        assert.isTrue(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([]));
    }

    @test
    public async ReadWrite() {
        // Arrange - Create a stream with some data in it
        const stream = new StreamBuffers.ReadableStreamBuffer();
        const bytes = new Uint8Array(TestConstants.testFileContents);
        stream.put(AB2B(bytes.buffer));

        // Act - Get the promise, end the stream, await the promise
        const bvPromise = ByteVector.fromStream(stream);
        stream.stop();
        const bv = await bvPromise;

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, bytes.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, bytes);
    }

    @test
    public async ReadOnly() {
        // Arrange - Create a stream with some data in it
        const stream = new StreamBuffers.ReadableStreamBuffer();
        const bytes = new Uint8Array(TestConstants.testFileContents);
        stream.put(AB2B(bytes.buffer));

        // Act - Get the promise, end the stream, await the promise
        const bvPromise = ByteVector.fromStream(stream, true);
        stream.stop();
        const bv = await bvPromise;

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, bytes.length);
        assert.isFalse(bv.isEmpty);
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, bytes);
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorTestsFromString {
    @test
    public InvalidLength() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromString("", undefined, 0.1); });
        assert.throws(() => { ByteVector.fromString("", undefined, Number.MAX_SAFE_INTEGER + 1); });
        assert.throws(() => { ByteVector.fromString("", undefined, -1); });
    }

    @test
    public Utf8Full() {
        ByteVectorTestsFromString.TestString(
            TestConstants.testStrings.UTF8.str,
            TestConstants.testStrings.UTF8.bytes,
            undefined,
            undefined,
            undefined
        );
    }

    @test
    public Utf8Partial() {
        ByteVectorTestsFromString.TestString(
            TestConstants.testStrings.UTF8.str,
            TestConstants.testStrings.UTF8.bytes.slice(0, 9),
            undefined,
            6,
            undefined
        );
    }

    @test
    public Utf8Empty() {
        ByteVectorTestsFromString.TestString(
            "",
            [],
            undefined,
            undefined,
            undefined
        );
    }

    @test
    public Utf16LittleEndianFull() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        ByteVectorTestsFromString.TestString(
            TestConstants.testStrings.UTF16LE.str,
            TestConstants.testStrings.UTF16LE.bytes,
            StringType.UTF16LE,
            undefined,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public Utf16LittleEndianPartial() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        ByteVectorTestsFromString.TestString(
            TestConstants.testStrings.UTF16LE.str,
            TestConstants.testStrings.UTF16LE.bytes.slice(0, 12),
            StringType.UTF16LE,
            6,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public Utf16LittleEndianEmpty() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        ByteVectorTestsFromString.TestString(
            "",
            [],
            StringType.UTF16LE,
            undefined,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public Utf16BigEndianFull() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        ByteVectorTestsFromString.TestString(
            TestConstants.testStrings.UTF16BE.str,
            TestConstants.testStrings.UTF16BE.bytes,
            StringType.UTF16BE,
            undefined,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public Utf16BigEndianPartial() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        ByteVectorTestsFromString.TestString(
            TestConstants.testStrings.UTF16BE.str,
            TestConstants.testStrings.UTF16BE.bytes.slice(0, 12),
            StringType.UTF16BE,
            6,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public Utf16BigEndianEmpty() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        ByteVectorTestsFromString.TestString(
            "",
            [],
            StringType.UTF16BE,
            undefined,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public Latin1Full() {
        ByteVectorTestsFromString.TestString(
            TestConstants.testStrings.Latin1.str,
            TestConstants.testStrings.Latin1.bytes,
            StringType.Latin1,
            undefined,
            undefined
        );
    }

    @test
    public Latin1Partial() {
        ByteVectorTestsFromString.TestString(
            TestConstants.testStrings.Latin1.str,
            TestConstants.testStrings.Latin1.bytes.slice(0, 6),
            StringType.Latin1,
            6,
            undefined
        );
    }

    @test
    public Latin1Empty() {
        ByteVectorTestsFromString.TestString(
            "",
            [],
            StringType.Latin1,
            undefined,
            undefined
        );
    }

    @test
    public Utf16Full() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "something bogus";

        ByteVectorTestsFromString.TestString(
            TestConstants.testStrings.UTF16LEWithBOM.str,
            TestConstants.testStrings.UTF16LEWithBOM.bytes,
            StringType.UTF16,
            undefined,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, "utf16-le");

        // Cleanup
        ByteVector.lastUtf16Encoding = originalLastEncoding;
    }

    @test
    public Utf16Partial() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "something bogus";

        ByteVectorTestsFromString.TestString(
            TestConstants.testStrings.UTF16LEWithBOM.str,
            TestConstants.testStrings.UTF16LEWithBOM.bytes.slice(0, 14),
            StringType.UTF16,
            6,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, "utf16-le");

        // Cleanup
        ByteVector.lastUtf16Encoding = originalLastEncoding;
    }

    @test
    public Utf16Empty() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "something bogus";

        ByteVectorTestsFromString.TestString(
            "",
            TestConstants.testStrings.UTF16LEWithBOM.bytes.slice(0, 2),
            StringType.UTF16,
            undefined,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, "something bogus");

        // Cleanup
        ByteVector.lastUtf16Encoding = originalLastEncoding;
    }

    @test
    public ReadOnly() {
        ByteVectorTestsFromString.TestString(
            "",
            [],
            StringType.Latin1,
            undefined,
            true
        );
    }

    private static TestString(
        str: string,
        expectedData: number[],
        stringType: StringType,
        inputLength: number,
        isReadOnly: boolean
    ) {
        // Arrange, Act
        const bv = ByteVector.fromString(str, stringType, inputLength, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.isEmpty, expectedData.length === 0);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorTestsFromUInt {
    @test
    public BadInteger() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromUInt(undefined); });
        assert.throws(() => { ByteVector.fromUInt(null); });
        assert.throws(() => { ByteVector.fromUInt(0.1); });
        assert.throws(() => { ByteVector.fromUInt(Number.MAX_SAFE_INTEGER + 1); });
        assert.throws(() => { ByteVector.fromUInt(-1); });
    }

    @test
    public Overflow() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromUInt(0x10000000000); });
    }

    @test
    public Zero_BigEndian() {
        ByteVectorTestsFromUInt.TestUInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            undefined,
            undefined
        );
    }

    @test
    public Zero_LittleEndian() {
        ByteVectorTestsFromUInt.TestUInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            undefined,
            false
        );
    }

    @test
    public Positive1Byte_BigEndian() {
        ByteVectorTestsFromUInt.TestUInt(
            0x12,
            [0x00, 0x00, 0x00, 0x12],
            undefined,
            undefined
        );
    }

    @test
    public Positive1Byte_LittleEndian() {
        ByteVectorTestsFromUInt.TestUInt(
            0x12,
            [0x12, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive2Byte_BigEndian() {
        ByteVectorTestsFromUInt.TestUInt(
            0x1234,
            [0x00, 0x00, 0x12, 0x34],
            undefined,
            undefined
        );
    }

    @test
    public Positive2Byte_LittleEndian() {
        ByteVectorTestsFromUInt.TestUInt(
            0x1234,
            [0x34, 0x12, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive3Byte_BigEndian() {
        ByteVectorTestsFromUInt.TestUInt(
            0x123456,
            [0x00, 0x12, 0x34, 0x56],
            undefined,
            undefined
        );
    }

    @test
    public Positive3Byte_LittleEndian() {
        ByteVectorTestsFromUInt.TestUInt(
            0x123456,
            [0x56, 0x34, 0x12, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive4Byte_BigEndian() {
        ByteVectorTestsFromUInt.TestUInt(
            0x12345678,
            [0x12, 0x34, 0x56, 0x78],
            undefined,
            undefined
        );
    }

    @test
    public Positive4Byte_LittleEndian() {
        ByteVectorTestsFromUInt.TestUInt(
            0x12345678,
            [0x78, 0x56, 0x34, 0x12],
            undefined,
            false
        );
    }

    @test
    public UnsignedRange_BigEndian() {
        ByteVectorTestsFromUInt.TestUInt(
            0xFFFFFFFF,
            [0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            undefined
        );
    }

    @test
    public UnsignedRange_LittleEndian() {
        ByteVectorTestsFromUInt.TestUInt(
            0xFFFFFFFF,
            [0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public ReadOnly() {
        ByteVectorTestsFromUInt.TestUInt(
            0,
            [0x00, 0x00, 0x00, 0x00],
            true,
            undefined
        );
    }

    private static TestUInt(value: number, expectedData: number[], isReadOnly: boolean, bigEndian: boolean): void {
        // Arrange, Act
        const bv = ByteVector.fromUInt(value, bigEndian, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 4);
        assert.isFalse(bv.isEmpty);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorTestsFromULong {
    @test
    public BadValue() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromULong(undefined); });
        assert.throws(() => { ByteVector.fromULong(null); });
    }

    @test
    public Overflow() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromULong(BigInt("18446744073709551616")); });
        assert.throws(() => { ByteVector.fromULong(BigInt("-1")); });
    }

    @test
    public Positive1Byte_BigEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x12"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12],
            undefined,
            undefined
        );
    }

    @test
    public Positive1Byte_LittleEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x12"),
            [0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive2Byte_BigEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x1234"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34],
            undefined,
            undefined
        );
    }

    @test
    public Positive2Byte_LittleEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x1234"),
            [0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive3Byte_BigEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x123456"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56],
            undefined,
            undefined
        );
    }

    @test
    public Positive3Byte_LittleEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x123456"),
            [0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive4Byte_BigEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x12345678"),
            [0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78],
            undefined,
            undefined
        );
    }

    @test
    public Positive4Byte_LittleEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x12345678"),
            [0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive5Byte_BigEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x123456789A"),
            [0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A],
            undefined,
            undefined
        );
    }

    @test
    public Positive5Byte_LittleEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x123456789A"),
            [0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive6Byte_BigEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x123456789ABC"),
            [0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC],
            undefined,
            undefined
        );
    }

    @test
    public Positive6Byte_LittleEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x123456789ABC"),
            [0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive7Byte_BigEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x123456789ABCDE"),
            [0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE],
            undefined,
            undefined
        );
    }

    @test
    public Positive7Byte_LittleEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("0x123456789ABCDE"),
            [0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive8Byte_BigEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("123456789ABCDEF0", 16),
            [0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0],
            undefined,
            undefined
        );
    }

    @test
    public Positive8Byte_LittleEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("123456789ABCDEF0", 16),
            [0xF0, 0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12],
            undefined,
            false
        );
    }

    @test
    public UnsignedRange_BigEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("FFFFFFFFFFFFFFFF", 16),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            undefined
        );
    }

    @test
    public UnsignedRange_LittleEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt("FFFFFFFFFFFFFFFF", 16),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public Zero_BigEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            undefined
        );
    }

    @test
    public Zero_LittleEndian() {
        ByteVectorTestsFromULong.TestULong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            true
        );
    }

    @test
    public ReadOnly() {
        ByteVectorTestsFromULong.TestULong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            true,
            undefined
        );
    }

    private static TestULong(
        value: BigInt.BigInteger,
        expectedData: number[],
        isReadOnly: boolean,
        bigEndian: boolean
    ): void {
        // Arrange, Act
        const bv = ByteVector.fromULong(value, bigEndian, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 8);
        assert.isFalse(bv.isEmpty);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorTestsFromUShort {
    @test
    public BadShort() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromUShort(undefined); });
        assert.throws(() => { ByteVector.fromUShort(null); });
        assert.throws(() => { ByteVector.fromUShort(0.1); });
        assert.throws(() => { ByteVector.fromUShort(Number.MAX_SAFE_INTEGER + 1); });
    }

    @test
    public Overflow() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromUShort(0x1000000); });
        assert.throws(() => { ByteVector.fromUShort(-0x1000000); });
    }

    @test
    public Zero_BigEndian() {
        ByteVectorTestsFromUShort.TestUShort(
            0x0,
            [0x0, 0x0],
            undefined,
            undefined
        );
    }

    @test
    public Zero_LittleEndian() {
        ByteVectorTestsFromUShort.TestUShort(
            0x0,
            [0x0, 0x0],
            undefined,
            false
        );
    }

    @test
    public Positive1Byte_BigEndian() {
        ByteVectorTestsFromUShort.TestUShort(
            0x12,
            [0x00, 0x12],
            undefined,
            undefined
        );
    }

    @test
    public Positive1Byte_LittleEndian() {
        ByteVectorTestsFromUShort.TestUShort(
            0x12,
            [0x12, 0x00],
            undefined,
            false
        );
    }

    @test
    public Positive2Byte_BigEndian() {
        ByteVectorTestsFromUShort.TestUShort(
            0x1234,
            [0x12, 0x34],
            undefined,
            undefined
        );
    }

    @test
    public Positive2Byte_LittleEndian() {
        ByteVectorTestsFromUShort.TestUShort(
            0x1234,
            [0x34, 0x12],
            undefined,
            false
        );
    }

    @test
    public UnsignedRange_BigEndian() {
        ByteVectorTestsFromUShort.TestUShort(
            0xFFFF,
            [0xFF, 0xFF],
            undefined,
            undefined
        );
    }

    @test
    public UnsignedRange_LittleEndian() {
        ByteVectorTestsFromUShort.TestUShort(
            0xFFFF,
            [0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public ReadOnly() {
        ByteVectorTestsFromUShort.TestUShort(
            0x0,
            [0x0, 0x0],
            true,
            undefined
        );
    }

    private static TestUShort(value: number, expectedData: number[], isReadOnly: boolean, bigEndian: boolean): void {
        // Arrange, Act
        const bv = ByteVector.fromUShort(value, bigEndian, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 2);
        assert.isFalse(bv.isEmpty);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }
}
