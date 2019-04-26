import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import {ByteVector} from "../src/byteVector";

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
    public InvalidByteArray() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x0, true);

        // Act, Assert
        assert.throws(() => { bv.addByteArray(null); });
        assert.throws(() => { bv.addByteArray(undefined); });
    }

    @test
    public AddEmptyToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);

        // Act - Add nothing to it
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
    public InvalidByteVector() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x0, true);

        // Act, Assert
        assert.throws(() => { bv.addByteVector(null); });
        assert.throws(() => { bv.addByteVector(undefined); });
    }

    @test
    public AddEmptyToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);

        // Act - Add nothing to it
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

@suite(timeout(3000), slow(1000)) class InsertByteTests {
    @test
    public ReadOnly() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        assert.throws(() => { bv.insertByte(0, 0x00); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public IndexOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        assert.throws(() => { bv.insertByte(0.1, 0x01); });
        assert.throws(() => { bv.insertByte(-1, 0x01); });
        assert.throws(() => { bv.insertByte(2, 0x01); });

        assert.isFalse(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public ByteOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        assert.throws(() => { bv.insertByte(0, 0.1); });
        assert.throws(() => { bv.insertByte(0, -1); });
        assert.throws(() => { bv.insertByte(0, 0x1FF); });

        assert.isFalse(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public InsertIntoEmpty() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act
        bv.insertByte(0, 0x01);

        // Assert
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x01]));
    }

    @test
    public InsertAtFront() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByte(0, 0xAA);

        // Assert
        assert.strictEqual(bv.length, 5);
        assert.deepEqual(bv.data, new Uint8Array([0xAA, 0x01, 0x02, 0x03, 0x04]));
    }

    @test
    public InsertAtBack() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByte(bv.length, 0xAA);

        // Assert
        assert.strictEqual(bv.length, 5);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xAA]));
    }

    @test
    public InsertInMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByte(2, 0xAA);

        // Assert
        assert.strictEqual(bv.length, 5);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02, 0xAA, 0x03, 0x04]));
    }
}

@suite(timeout(3000), slow(1000)) class InsertByteArrayTests {
    @test
    public ReadOnly() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        assert.throws(() => { bv.insertByteArray(0, new Uint8Array()); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public IndexOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        assert.throws(() => { bv.insertByteArray(0.1, new Uint8Array()); });
        assert.throws(() => { bv.insertByteArray(-1, new Uint8Array()); });
        assert.throws(() => { bv.insertByteArray(2, new Uint8Array()); });

        assert.isFalse(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public ByteArrayInvalid() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        assert.throws(() => { bv.insertByteArray(0, null); });
        assert.throws(() => { bv.insertByteArray(0, undefined); });

        assert.isFalse(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public InsertEmpty() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act
        bv.insertByteArray(0, new Uint8Array());

        // Assert
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public InsertIntoEmpty() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act
        bv.insertByteArray(0, new Uint8Array([0x01, 0x02]));

        // Assert
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 2);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02]));
    }

    @test
    public InsertAtFront() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByteArray(0, new Uint8Array([0xAA, 0xBB]));

        // Assert
        assert.strictEqual(bv.length, 6);
        assert.deepEqual(bv.data, new Uint8Array([0xAA, 0xBB, 0x01, 0x02, 0x03, 0x04]));
    }

    @test
    public InsertAtBack() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByteArray(bv.length, new Uint8Array([0xAA, 0xBB]));

        // Assert
        assert.strictEqual(bv.length, 6);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xAA, 0xBB]));
    }

    @test
    public InsertInMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByteArray(2, new Uint8Array([0xAA, 0xBB]));

        // Assert
        assert.strictEqual(bv.length, 6);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02, 0xAA, 0xBB, 0x03, 0x04]));
    }
}

@suite(timeout(3000), slow(1000)) class InsertByteVectorTests {
    private static readonly vectorToAdd: ByteVector = ByteVector.fromByteArray(
        new Uint8Array([0xAA, 0xBB])
    );

    @test
    public ReadOnly() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        assert.throws(() => { bv.insertByteVector(0, InsertByteVectorTests.vectorToAdd); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public IndexOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        assert.throws(() => { bv.insertByteVector(0.1, InsertByteVectorTests.vectorToAdd); });
        assert.throws(() => { bv.insertByteVector(-1, InsertByteVectorTests.vectorToAdd); });
        assert.throws(() => { bv.insertByteVector(2, InsertByteVectorTests.vectorToAdd); });

        assert.isFalse(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public ByteArrayInvalid() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        assert.throws(() => { bv.insertByteVector(0, null); });
        assert.throws(() => { bv.insertByteVector(0, undefined); });

        assert.isFalse(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public InsertEmpty() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act
        bv.insertByteVector(0, ByteVector.fromSize(0));

        // Assert
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public InsertIntoEmpty() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act
        bv.insertByteVector(0, InsertByteVectorTests.vectorToAdd);

        // Assert
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 2);
        assert.deepEqual(bv.data, new Uint8Array([0xAA, 0xBB]));
    }

    @test
    public InsertAtFront() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByteVector(0, InsertByteVectorTests.vectorToAdd);

        // Assert
        assert.strictEqual(bv.length, 6);
        assert.deepEqual(bv.data, new Uint8Array([0xAA, 0xBB, 0x01, 0x02, 0x03, 0x04]));
    }

    @test
    public InsertAtBack() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByteVector(bv.length, InsertByteVectorTests.vectorToAdd);

        // Assert
        assert.strictEqual(bv.length, 6);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xAA, 0xBB]));
    }

    @test
    public InsertInMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByteVector(2, InsertByteVectorTests.vectorToAdd);

        // Assert
        assert.strictEqual(bv.length, 6);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02, 0xAA, 0xBB, 0x03, 0x04]));
    }
}

@suite(timeout(3000), slow(1000)) class RemoveAtIndexTests {
    @test
    public ReadOnly() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        assert.throws(() => { bv.removeAtIndex(0); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public IndexOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        assert.throws(() => { bv.removeAtIndex(0.1); });
        assert.throws(() => { bv.removeAtIndex(-1); });
        assert.throws(() => { bv.removeAtIndex(bv.length); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public RemoveFromFront() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0xAA, 0x00, 0x01, 0x02, 0x03]));

        // Act
        bv.removeAtIndex(0);

        // Assert
        assert.strictEqual(bv.length, 4);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }

    @test
    public RemoveFromBack() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0x02, 0x03, 0xAA]));

        // Act
        bv.removeAtIndex(bv.length - 1);

        // Assert
        assert.strictEqual(bv.length, 4);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }

    @test
    public RemoveFromMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0xAA, 0x02, 0x03]));

        // Act
        bv.removeAtIndex(2);

        // Assert
        assert.strictEqual(bv.length, 4);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }
}

@suite(timeout(3000), slow(1000)) class RemoveRangeTests {
    @test
    public ReadOnly() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        assert.throws(() => { bv.removeRange(0, 1); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public IndexOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        assert.throws(() => { bv.removeRange(0.1, 1); });
        assert.throws(() => { bv.removeRange(-1, 1); });
        assert.throws(() => { bv.removeRange(bv.length, 1); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public CountOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        assert.throws(() => { bv.removeRange(0, 0.1); });
        assert.throws(() => { bv.removeRange(0, -1); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public RemoveFromFront() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0xAA, 0xBB, 0x00, 0x01, 0x02, 0x03]));

        // Act
        bv.removeRange(0, 2);

        // Assert
        assert.strictEqual(bv.length, 4);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }

    @test
    public RemoveFromBack() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0x02, 0x03, 0xAA, 0xBB]));

        // Act
        bv.removeRange(bv.length - 2, 2);

        // Assert
        assert.strictEqual(bv.length, 4);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }

    @test
    public RemoveFromMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0xAA, 0xBB, 0x02, 0x03]));

        // Act
        bv.removeRange(2, 2);

        // Assert
        assert.strictEqual(bv.length, 4);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }
}

@suite(timeout(3000), slow(1000)) class SetTests {
    @test
    public ReadOnly() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        assert.throws(() => { bv.set(0, 1); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public IndexOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        assert.throws(() => { bv.set(0.1, 1); });
        assert.throws(() => { bv.set(-1, 1); });
        assert.throws(() => { bv.set(bv.length, 1); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public ValueOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        assert.throws(() => { bv.set(0, 0.1); });
        assert.throws(() => { bv.set(0, -1); });
        assert.throws(() => { bv.set(0, 0x1FF); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public SetValue() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0x02]));

        // Act
        bv.set(1, 0xAA);

        // Assert
        assert.strictEqual(bv.length, 3);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0xAA, 0x02]));
    }
}
