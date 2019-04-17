import * as chai from "chai";
import * as BigInt from "big-integer";
import {suite, test, slow, timeout} from "mocha-typescript";

import TestConstants from "./testConstants";
import {ByteVector} from "../src/byteVector";

const assert = chai.assert;

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
        assert.throws(() => { ByteVector.fromInt(-0x10000000000); });
    }

    @test
    public Zero_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            false,
            undefined
        );
    }

    @test
    public Zero_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            false,
            false
        );
    }

    @test
    public Positive1Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x12,
            [0x00, 0x00, 0x00, 0x12],
            false,
            undefined
        );
    }

    @test
    public Positive1Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x12,
            [0x12, 0x00, 0x00, 0x00],
            false,
            false
        );
    }

    @test
    public Positive2Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x1234,
            [0x00, 0x00, 0x12, 0x34],
            false,
            undefined
        );
    }

    @test
    public Positive2Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x1234,
            [0x34, 0x12, 0x00, 0x00],
            false,
            false
        );
    }

    @test
    public Positive3Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x123456,
            [0x00, 0x12, 0x34, 0x56],
            false,
            undefined
        );
    }

    @test
    public Positive3Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x123456,
            [0x56, 0x34, 0x12, 0x00],
            false,
            false
        );
    }

    @test
    public Positive4Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x12345678,
            [0x12, 0x34, 0x56, 0x78],
            false,
            undefined
        );
    }

    @test
    public Positive4Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x12345678,
            [0x78, 0x56, 0x34, 0x12],
            false,
            false
        );
    }

    @test
    public Negative1Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x12,
            [0xFF, 0xFF, 0xFF, 0xEE],
            false,
            undefined
        );
    }

    @test
    public Negative1Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x12,
            [0xEE, 0xFF, 0xFF, 0xFF],
            false,
            false
        );
    }

    @test
    public Negative2Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x1234,
            [0xFF, 0xFF, 0xED, 0xCC],
            false,
            undefined
        );
    }

    @test
    public Negative2Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x1234,
            [0xCC, 0xED, 0xFF, 0xFF],
            false,
            false
        );
    }

    @test
    public Negative3Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x123456,
            [0xFF, 0xED, 0xCB, 0xAA],
            false,
            undefined
        );
    }

    @test
    public Negative3Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x123456,
            [0xAA, 0xCB, 0xED, 0xFF],
            false,
            false
        );
    }

    @test
    public Negative4Byte_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x12345678,
            [0xED, 0xCB, 0xA9, 0x88],
            false,
            undefined
        );
    }

    @test
    public Negative4Byte_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x12345678,
            [0x88, 0xA9, 0xCB, 0xED],
            false,
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
        assert.strictEqual(bv.isReadOnly, isReadOnly);
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
            false,
            undefined
        );
    }

    @test
    public Positive1Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x12"),
            [0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            false,
            false
        );
    }

    @test
    public Positive2Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x1234"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34],
            false,
            undefined
        );
    }

    @test
    public Positive2Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x1234"),
            [0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            false,
            false
        );
    }

    @test
    public Positive3Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56],
            false,
            undefined
        );
    }

    @test
    public Positive3Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456"),
            [0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00],
            false,
            false
        );
    }

    @test
    public Positive4Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x12345678"),
            [0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78],
            false,
            undefined
        );
    }

    @test
    public Positive4Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x12345678"),
            [0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00],
            false,
            false
        );
    }

    @test
    public Positive5Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456789A"),
            [0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A],
            false,
            undefined
        );
    }

    @test
    public Positive5Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456789A"),
            [0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00],
            false,
            false
        );
    }

    @test
    public Positive6Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456789ABC"),
            [0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC],
            false,
            undefined
        );
    }

    @test
    public Positive6Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456789ABC"),
            [0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00],
            false,
            false
        );
    }

    @test
    public Positive7Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456789ABCDE"),
            [0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE],
            false,
            undefined
        );
    }

    @test
    public Positive7Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("0x123456789ABCDE"),
            [0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00],
            false,
            false
        );
    }

    @test
    public Positive8Byte_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("123456789ABCDEF0", 16),
            [0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0],
            false,
            undefined
        );
    }

    @test
    public Positive8Byte_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt("123456789ABCDEF0", 16),
            [0xF0, 0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12],
            false,
            false
        );
    }

    @test
    public Zero_BigEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            false,
            undefined
        );
    }

    @test
    public Zero_LittleEndian() {
        ByteVectorTestsFromLong.TestLong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            false,
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
        assert.strictEqual(bv.isReadOnly, isReadOnly);
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
