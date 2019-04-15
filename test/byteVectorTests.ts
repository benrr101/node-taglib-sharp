import * as chai from "chai";
import {suite, test, slow, timeout} from "mocha-typescript";

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
    public Positive_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x12345678,
            [0x12, 0x34, 0x56, 0x78],
            false,
            undefined
        );
    }

    @test
    public Positive_LittleEndian() {
        ByteVectorTestsFromInt.TestInt(
            0x12345678,
            [0x78, 0x56, 0x34, 0x12],
            false,
            false
        );
    }

    @test
    public Negative_BigEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x12345678,
            [0xED, 0xCB, 0xA9, 0x88],
            false,
            undefined
        );
    }

    @test
    public Negative_LittlesEndian() {
        ByteVectorTestsFromInt.TestInt(
            -0x12345678,
            [0x88, 0xA9, 0xCB, 0xED],
            false,
            false
        );
    }

    private static TestInt(value: number, expectedData: number[], isReadOnly: boolean, bigEndian: boolean): void {
        // Arrange, Act
        const bv = ByteVector.fromInt(value, bigEndian);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 4);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.isReadOnly, isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }
}
