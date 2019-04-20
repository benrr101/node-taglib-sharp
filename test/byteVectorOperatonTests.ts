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

@suite(timeout(3000), slow(1000)) class AddByteTests {
    @test
    public ReadOnly() {
        // Arrange - Create readonly ByteVector
        const bv = ByteVector.fromSize(1, 0x0, true);

        // Act, Assert - AddByte should fail, ByteVector should be unchanged
        assert.throws(() => { bv.addByte(0x01); });
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public InvalidByte() {
        // Arrange - Create ByteVector
        const bv = ByteVector.fromSize(1);

        // Act, Assert - AddByte should fail, ByteVector should be unchanged
        assert.throws(() => { bv.addByte(0.1); });
        assert.throws(() => { bv.addByte(-1); });
        assert.throws(() => { bv.addByte(0x1FF); });
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public AddToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);

        // Act - Add a byte to it
        bv.addByte(0x01);

        // Assert - ByteVector should contain the new byte
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x01]));
    }

    @test
    public AddToExisting() {
        // Arrange - Create ByteVector with something in it
        const bv = ByteVector.fromSize(1);

        // Act - Add a byte to it
        bv.addByte(0x01);

        // Assert - ByteVector should contain the new byte
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 2);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01]));
    }
}

@suite(timeout(3000), slow(1000)) class AddByteArrayTests {
    @test
    public ReadOnly() {
        // Arrange - Create readonly ByteVector
        const bv = ByteVector.fromSize(1, 0x0, true);

        // Act, Assert - AddByte should fail, ByteVector should be unchanged
        assert.throws(() => { bv.addByteArray(new Uint8Array(0x01)); });
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public AddEmptyToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);

        // Act - Add nothing to it
        bv.addByteArray(null);
        bv.addByteArray(undefined);
        bv.addByteArray(new Uint8Array());

        // Assert - ByteVector should contain the new byte
        assert.isTrue(bv.isEmpty);
        assert.strictEqual(bv.length, 0);
        assert.deepEqual(bv.data, new Uint8Array());
    }

    @test
    public AddSingleToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);

        // Act - Add a byte to it
        bv.addByteArray(new Uint8Array([0x01]));

        // Assert - ByteVector should contain the new byte
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x01]));
    }

    @test
    public AddMultipleToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);

        // Act - Add two bytes to it
        bv.addByteArray(new Uint8Array([0x01, 0x02]));

        // Assert - ByteVector should contain the new bytes
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 2);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02]));
    }

    @test
    public AddEmptyToExisting() {
        // Arrange - Create ByteVector that has bytes
        const bv = ByteVector.fromSize(1);

        // Act - Add nothing to it
        bv.addByteArray(null);
        bv.addByteArray(undefined);
        bv.addByteArray(new Uint8Array());

        // Assert - ByteVector should contain the new byte
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public AddSingleToExisting() {
        // Arrange - Create ByteVector that has bytes
        const bv = ByteVector.fromSize(1);

        // Act - Add a byte to it
        bv.addByteArray(new Uint8Array([0x01]));

        // Assert - ByteVector should contain the new byte
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 2);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01]));
    }

    @test
    public AddMultipleToExisting() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(1);

        // Act - Add two bytes to it
        bv.addByteArray(new Uint8Array([0x01, 0x02]));

        // Assert - ByteVector should contain the new bytes
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 3);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02]));
    }
}

@suite(timeout(3000), slow(1000)) class AddByteVectorTests {
    @test
    public ReadOnly() {
        // Arrange - Create readonly ByteVector
        const bv = ByteVector.fromSize(1, 0x0, true);
        const add = ByteVector.fromSize(1, 0x1);

        // Act, Assert - AddByte should fail, ByteVector should be unchanged
        assert.throws(() => { bv.addByteVector(add); });
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public AddEmptyToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);

        // Act - Add nothing to it
        bv.addByteVector(null);
        bv.addByteVector(undefined);
        bv.addByteVector(ByteVector.fromSize(0));

        // Assert - ByteVector should contain the new byte
        assert.isTrue(bv.isEmpty);
        assert.strictEqual(bv.length, 0);
        assert.deepEqual(bv.data, new Uint8Array());
    }

    @test
    public AddSingleToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);
        const add = ByteVector.fromSize(1, 0x1);

        // Act - Add a byte to it
        bv.addByteVector(add);

        // Assert - ByteVector should contain the new byte
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x01]));
    }

    @test
    public AddMultipleToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);
        const add = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act - Add two bytes to it
        bv.addByteVector(add);

        // Assert - ByteVector should contain the new bytes
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 2);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02]));
    }

    @test
    public AddSingleToExisting() {
        // Arrange - Create ByteVector that has bytes
        const bv = ByteVector.fromSize(1);
        const add = ByteVector.fromByteArray(new Uint8Array([0x01]));

        // Act - Add a byte to it
        bv.addByteVector(add);

        // Assert - ByteVector should contain the new byte
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 2);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01]));
    }

    @test
    public AddMultipleToExisting() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(1);
        const add = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act - Add two bytes to it
        bv.addByteVector(add);

        // Assert - ByteVector should contain the new bytes
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 3);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02]));
    }
}

@suite(timeout(3000), slow(1000)) class ClearTests {
    @test
    public ReadOnly() {
        // Arrange - Create readonly bytevector
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert - Should throw, bytevector should be unchanged
        assert.throws(() => { bv.clear(); } );
        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public ClearEmpty() {
        // Arrange - Create empty ByteVector
        const bv = ByteVector.fromSize(0);

        // Act
        bv.clear();

        // Assert
        assert.isTrue(bv.isEmpty);
        assert.strictEqual(bv.length, 0);
        assert.deepEqual(bv.data, new Uint8Array());
    }

    @test
    public ClearExisting() {
        // Arrange - Create ByteVector with some data
        const bv = ByteVector.fromSize(1, 0x00);

        // Act
        bv.clear();

        // Assert
        assert.isTrue(bv.isEmpty);
        assert.strictEqual(bv.length, 0);
        assert.deepEqual(bv.data, new Uint8Array());
    }
}
