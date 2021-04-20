import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {Testers} from "./utilities/testers";
import {suite, test} from "mocha-typescript";

import {ByteVector} from "../src/byteVector";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class ByteVector_VoidMethodTests {
    private readonly vectorToAdd: ByteVector = ByteVector.fromByteArray(
        new Uint8Array([0xAA, 0xBB])
    );

    @test
    public iterator() {
        // Arrange
        const array = [0x01, 0x02, 0x03, 0x04];
        const bv = ByteVector.fromByteArray(new Uint8Array(array));

        // Act
        const output = [];
        for (const b of bv) {
            output.push(b);
        }

        // Assert
        assert.deepStrictEqual(output, array);
    }

    @test
    public addByte_ReadOnly() {
        // Arrange - Create readonly ByteVector
        const bv = ByteVector.fromSize(1, 0x0, true);

        // Act, Assert - AddByte should fail, ByteVector should be unchanged
        assert.throws(() => { bv.addByte(0x01); });
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public addByte_InvalidByte() {
        // Arrange - Create ByteVector
        const bv = ByteVector.fromSize(1);

        // Act, Assert - AddByte should fail, ByteVector should be unchanged
        Testers.testByte((v: number) => { bv.addByte(v); });
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public addByte_AddToEmpty() {
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
    public addByte_AddToExisting() {
        // Arrange - Create ByteVector with something in it
        const bv = ByteVector.fromSize(1);

        // Act - Add a byte to it
        bv.addByte(0x01);

        // Assert - ByteVector should contain the new byte
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 2);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01]));
    }

    @test
    public addByteArray_ReadOnly() {
        // Arrange - Create readonly ByteVector
        const bv = ByteVector.fromSize(1, 0x0, true);

        // Act, Assert - AddByte should fail, ByteVector should be unchanged
        assert.throws(() => { bv.addByteArray(new Uint8Array(0x01)); });
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public addByteArray_InvalidByteArray() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x0, true);

        // Act, Assert
        Testers.testTruthy((v: Uint8Array) => { bv.addByteArray(v); });
    }

    @test
    public addByteArray_AddEmptyToEmpty() {
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
    public addByteArray_AddSingleToEmpty() {
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
    public addByteArray_AddMultipleToEmpty() {
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
    public addByteArray_AddEmptyToExisting() {
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
    public addByteArray_AddSingleToExisting() {
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
    public addByteArray_AddMultipleToExisting() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(1);

        // Act - Add two bytes to it
        bv.addByteArray(new Uint8Array([0x01, 0x02]));

        // Assert - ByteVector should contain the new bytes
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 3);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02]));
    }

    @test
    public addByteVector_ReadOnly() {
        // Arrange - Create readonly ByteVector
        const bv = ByteVector.fromSize(1, 0x0, true);
        const add = ByteVector.fromSize(1, 0x1);

        // Act, Assert - AddByte should fail, ByteVector should be unchanged
        assert.throws(() => { bv.addByteVector(add); });
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public addByteVector_InvalidByteVector() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x0, true);

        // Act, Assert
        Testers.testTruthy((v: ByteVector) => { bv.addByteVector(v); });
    }

    @test
    public addByteVector_AddEmptyToEmpty() {
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
    public addByteVector_AddSingleToEmpty() {
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
    public addByteVector_AddMultipleToEmpty() {
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
    public addByteVector_AddSingleToExisting() {
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
    public addByteVector_AddMultipleToExisting() {
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

    @test
    public clear_ReadOnly() {
        // Arrange - Create readonly bytevector
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert - Should throw, bytevector should be unchanged
        assert.throws(() => { bv.clear(); } );
        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public clear_Empty() {
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
    public clear_Existing() {
        // Arrange - Create ByteVector with some data
        const bv = ByteVector.fromSize(1, 0x00);

        // Act
        bv.clear();

        // Assert
        assert.isTrue(bv.isEmpty);
        assert.strictEqual(bv.length, 0);
        assert.deepEqual(bv.data, new Uint8Array());
    }

    @test
    public containsAt_invalidParameters() {
        // Arrange
        const bv = ByteVector.empty();
        const pattern = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.containsAt(v, 0, 0, 0); });
        Testers.testInt((v: number) => { bv.containsAt(pattern, v, 0, 0); }, true);
        Testers.testInt((v: number) => { bv.containsAt(pattern, 0, v, 0); }, true);
        Testers.testInt((v: number) => { bv.containsAt(pattern, 0, 0, v); }, true);
    }

    @test
    public containsAt_sanityCheckFailures() {
        // Arrange
        const bv = ByteVector.fromSize(5);

        // Act / Assert
        assert.isFalse(bv.containsAt(ByteVector.fromSize(10))); // Pattern longer than source
        assert.isFalse(bv.containsAt(ByteVector.fromSize(1), 10)); // Offset longer than source
        assert.isFalse(bv.containsAt(ByteVector.fromSize(1), 5)); // Offset equal to source
        assert.isFalse(bv.containsAt(ByteVector.fromSize(1), 0, 5)); // Pattern offset greater than pattern
        assert.isFalse(bv.containsAt(ByteVector.fromSize(1), 0, 1)); // Pattern offset equal to pattern
        assert.isFalse(bv.containsAt(ByteVector.empty())); // Pattern is empty
        assert.isFalse(bv.containsAt(ByteVector.fromSize(1), 0, 0, 0)); // Pattern length is 0
        assert.isFalse(bv.containsAt(ByteVector.fromSize(1), 0, 0, -1)); // Pattern length is negative
        assert.isFalse(bv.containsAt(ByteVector.fromSize(1), -1)); // Offset is negative
    }

    @test
    public containsAt_doesNotContainAnywhere() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("qux");

        // Act
        const output = bv.containsAt(pattern);

        // Assert
        assert.isFalse(output);
    }

    @test
    public containsAt_doesNotContainAt() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("qux");

        // Act
        const output = bv.containsAt(pattern);

        // Assert
        assert.isFalse(output);
    }

    @test
    public containsAt_containsPartial() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("foobux");

        // Act
        const output = bv.containsAt(pattern);

        // Assert
        assert.isFalse(output);
    }

    @test
    public containsAt_containsAll() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("foo");

        // Act
        const output = bv.containsAt(pattern);

        // Assert
        assert.isTrue(output);
    }

    @test
    public containsAt_containsAllWithOffset() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("0bar0");

        // Act
        const output = bv.containsAt(pattern, 3, 1, 3);

        // Assert
        assert.isTrue(output);
    }

    @test
    public compareTo_invalidParameter() {
        // Arrange
        const bv = ByteVector.fromSize(1);

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.compareTo(v); });
    }

    @test
    public compareTo_lessThan() {
        // Arrange
        const bv = ByteVector.concatenate(0x00, 0x05);
        const other = ByteVector.concatenate(0x00, 0x06);

        // Act
        const output = bv.compareTo(other);

        // Assert
        assert.strictEqual(output, -1);
    }

    @test
    public compareTo_greaterThan() {
        // Arrange
        const bv = ByteVector.concatenate(0x00, 0x05);
        const other = ByteVector.concatenate(0x00, 0x04);

        // Act
        const output = bv.compareTo(other);

        // Assert
        assert.strictEqual(output, 1);
    }

    @test
    public compareTo_equalTo() {
        // Arrange
        const bv = ByteVector.concatenate(0x00, 0x05);
        const other = ByteVector.concatenate(0x00, 0x05);

        // Act
        const output = bv.compareTo(other);

        // Assert
        assert.strictEqual(output, 0);
    }

    @test
    public compareTo_unequalSizes() {
        // Arrange
        const bv = ByteVector.concatenate(0x00, 0x05);
        const other = ByteVector.concatenate(0x00);

        // Act
        const output = bv.compareTo(other);

        // Assert
        assert.strictEqual(output, 1);
    }

    @test
    public endsWith_invalidParam() {
        // Arrange
        const bv = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.endsWith(v); });
    }

    @test
    public endsWith_doesEndsWith() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("baz");

        // Act / Assert
        assert.isTrue(bv.endsWith(pattern));
    }

    @test
    public endsWith_doesNotEndWith() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("bux");

        // Act / Assert
        assert.isFalse(bv.endsWith(pattern));
    }

    @test
    public endsWithPartialMatch_invalidProperty() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.endsWithPartialMatch(v); });
    }

    @test
    public endsWithPartialMatch_patternTooLong() {
        // Arrange
        const bv = ByteVector.fromSize(5);
        const pattern = ByteVector.fromSize(10);

        // Act / Assert
        assert.strictEqual(bv.endsWithPartialMatch(pattern), -1);
    }

    @test
    public endsWithPartialMatch_doesNotEndWith() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("qux");

        // Act / Assert
        assert.strictEqual(bv.endsWithPartialMatch(pattern), -1);
    }

    @test
    public endsWithPartialMatch_endsWithPartial() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("bazqqq");

        // Act / Assert
        assert.strictEqual(bv.endsWithPartialMatch(pattern), 6);
    }

    @test
    public endsWithPartialMatch_endsWithFull() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("bazq");

        // Act / Assert
        assert.strictEqual(bv.endsWithPartialMatch(pattern), 6);
    }

    @test
    public find_invalidParameters() {
        // Arrange
        const bv = ByteVector.empty();
        const pattern = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.find(v, 0, 1); });
        Testers.testUint((v: number) => { bv.find(pattern, v, 1); }, true);
        Testers.testUint((v: number) => { bv.find(pattern, 0, v); }, true);
        assert.throws(() => { bv.find(pattern, 0, 0); });
    }

    @test
    public find_patternTooLong() {
        // Arrange
        const bv = ByteVector.fromSize(5);
        const pattern = ByteVector.fromSize(10);

        // Act / Assert
        assert.strictEqual(bv.find(pattern), -1);
    }

    @test
    public find_singleBytePattern_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromByteArray(new Uint8Array(0x05));

        // Act / Assert
        assert.strictEqual(bv.find(pattern), -1);
    }

    @test
    public find_singleBytePattern_withMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("b");

        // Act / Assert
        assert.strictEqual(bv.find(pattern), 3);
    }

    @test
    public find_multiBytePattern_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("qux");

        // Act / Assert
        assert.strictEqual(bv.find(pattern), -1);
    }

    @test
    public find_multiBytePattern_singleMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("bar");

        // Act / Assert
        assert.strictEqual(bv.find(pattern), 3);
    }

    @test
    public find_multiBytePattern_multiMatch() {
        // Arrange
        const bv = ByteVector.fromString("foofoofoo");
        const pattern = ByteVector.fromString("foo");

        // Act / Assert
        assert.strictEqual(bv.find(pattern), 0);
    }

    @test
    public find_multiByteWithOffset_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("fooabc");
        const pattern = ByteVector.fromString("foo");

        // Act / Assert
        assert.strictEqual(bv.find(pattern, 1), -1);
    }

    @test
    public find_multiByteWithOffset_withMatch() {
        // Arrange
        const bv = ByteVector.fromString("foofoofoo");
        const pattern = ByteVector.fromString("foo");

        // Act / Assert
        assert.strictEqual(bv.find(pattern, 1), 3);
    }

    @test
    public find_multiByteWithAlign_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("0abc");
        const pattern = ByteVector.fromString("ab");

        // Act / Assert
        assert.strictEqual(bv.find(pattern, 0, 2), -1);
    }

    @test
    public find_multiByteWithAlign_withMatch() {
        // Arrange
        const bv = ByteVector.fromString("00abc");
        const pattern = ByteVector.fromString("ab");

        // Act / Assert
        assert.strictEqual(bv.find(pattern, 0, 2), 2);
    }

    @test
    public get_invalidParameter() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");

        // Act / Assert
        Testers.testUint((v: number) => { bv.get(v); });
        assert.throws(() => { bv.get(bv.length); });
    }

    @test
    public get_validParameter() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");

        // Act
        const output = bv.get(5);

        // Assert
        assert.strictEqual(output, "r".codePointAt(0));
    }

    @test
    public indexOf_exists() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([1, 2, 3]));

        // Act
        const output = bv.indexOf(2);

        // Assert
        assert.strictEqual(output, 1);
    }

    @test
    public indexOf_doesNotExist() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([1, 2, 3]));

        // Act
        const output = bv.indexOf(888);

        // Assert
        assert.strictEqual(output, -1);
    }

    @test
    public insertByte_ReadOnly() {
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
    public insertByte_IndexOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        Testers.testUint((v: number) => { bv.insertByte(v, 0x01); });
        assert.throws(() => { bv.insertByte(2, 0x01); });

        assert.isFalse(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public insertByte_ByteOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        Testers.testByte((v: number) => { bv.insertByte(0, v); });

        assert.isFalse(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public insertByte_InsertIntoEmpty() {
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
    public insertByte_InsertAtFront() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByte(0, 0xAA);

        // Assert
        assert.strictEqual(bv.length, 5);
        assert.deepEqual(bv.data, new Uint8Array([0xAA, 0x01, 0x02, 0x03, 0x04]));
    }

    @test
    public insertByte_InsertAtBack() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByte(bv.length, 0xAA);

        // Assert
        assert.strictEqual(bv.length, 5);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xAA]));
    }

    @test
    public insertByte_InsertInMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByte(2, 0xAA);

        // Assert
        assert.strictEqual(bv.length, 5);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02, 0xAA, 0x03, 0x04]));
    }

    @test
    public insertByteArray_ReadOnly() {
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
    public insertByteArray_IndexOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        Testers.testUint((v: number) => { bv.insertByteArray(v, new Uint8Array()); });
        assert.throws(() => { bv.insertByteArray(2, new Uint8Array()); });

        assert.isFalse(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public insertByteArray_ByteArrayInvalid() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        Testers.testTruthy((v: Uint8Array) => { bv.insertByteArray(0, v); });

        assert.isFalse(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public insertByteArray_InsertEmpty() {
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
    public insertByteArray_InsertIntoEmpty() {
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
    public insertByteArray_InsertAtFront() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByteArray(0, new Uint8Array([0xAA, 0xBB]));

        // Assert
        assert.strictEqual(bv.length, 6);
        assert.deepEqual(bv.data, new Uint8Array([0xAA, 0xBB, 0x01, 0x02, 0x03, 0x04]));
    }

    @test
    public insertByteArray_InsertAtBack() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByteArray(bv.length, new Uint8Array([0xAA, 0xBB]));

        // Assert
        assert.strictEqual(bv.length, 6);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xAA, 0xBB]));
    }

    @test
    public insertByteArray_InsertInMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByteArray(2, new Uint8Array([0xAA, 0xBB]));

        // Assert
        assert.strictEqual(bv.length, 6);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02, 0xAA, 0xBB, 0x03, 0x04]));
    }

    @test
    public insertByteVector_ReadOnly() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        assert.throws(() => { bv.insertByteVector(0, this.vectorToAdd); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public insertByteVector_IndexOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        Testers.testUint((v: number) => { bv.insertByteVector(v, this.vectorToAdd); });

        assert.isFalse(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public insertByteVector_ByteArrayInvalid() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        Testers.testTruthy((v: ByteVector) => { bv.insertByteVector(0, v); });

        assert.isFalse(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public insertByteVector_InsertEmpty() {
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
    public insertByteVector_InsertIntoEmpty() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act
        bv.insertByteVector(0, this.vectorToAdd);

        // Assert
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 2);
        assert.deepEqual(bv.data, new Uint8Array([0xAA, 0xBB]));
    }

    @test
    public insertByteVector_InsertAtFront() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByteVector(0, this.vectorToAdd);

        // Assert
        assert.strictEqual(bv.length, 6);
        assert.deepEqual(bv.data, new Uint8Array([0xAA, 0xBB, 0x01, 0x02, 0x03, 0x04]));
    }

    @test
    public insertByteVector_InsertAtBack() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByteVector(bv.length, this.vectorToAdd);

        // Assert
        assert.strictEqual(bv.length, 6);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xAA, 0xBB]));
    }

    @test
    public insertByteVector_InsertInMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.insertByteVector(2, this.vectorToAdd);

        // Assert
        assert.strictEqual(bv.length, 6);
        assert.deepEqual(bv.data, new Uint8Array([0x01, 0x02, 0xAA, 0xBB, 0x03, 0x04]));
    }

    @test
    public mid_invalidParameters() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");

        // Act / Assert
        Testers.testUint((v: number) => { bv.mid(v); });
        Testers.testUint((v: number) => { bv.mid(1, v); }, true);
        assert.throws(() => bv.mid(1, bv.length));
    }

    @test
    public mid_entireVector() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");

        // Act
        const output = bv.mid(0);

        // Assert
        assert.notStrictEqual(output, bv);
        assert.isTrue(ByteVector.equal(output, bv));
    }

    @test
    public mid_partialVector() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");

        // Act
        const output = bv.mid(3, 3);

        // Assert
        assert.isTrue(ByteVector.equal(output, ByteVector.fromString("bar")));
    }

    @test
    public mid_emptyVector() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");

        // Act
        const output = bv.mid(3, 0);

        // Assert
        assert.isTrue(output.isEmpty);
    }

    @test
    public removeAtIndex_ReadOnly() {
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
    public removeAtIndex_IndexOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        Testers.testUint((v: number) => { bv.removeAtIndex(v); });
        assert.throws(() => { bv.removeAtIndex(bv.length); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public removeAtIndex_RemoveFromFront() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0xAA, 0x00, 0x01, 0x02, 0x03]));

        // Act
        bv.removeAtIndex(0);

        // Assert
        assert.strictEqual(bv.length, 4);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }

    @test
    public removeAtIndex_RemoveFromBack() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0x02, 0x03, 0xAA]));

        // Act
        bv.removeAtIndex(bv.length - 1);

        // Assert
        assert.strictEqual(bv.length, 4);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }

    @test
    public removeAtIndex_RemoveFromMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0xAA, 0x02, 0x03]));

        // Act
        bv.removeAtIndex(2);

        // Assert
        assert.strictEqual(bv.length, 4);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }

    @test
    public removeRange_ReadOnly() {
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
    public removeRange_IndexOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        Testers.testUint((v: number) => { bv.removeRange(v, 1); });
        assert.throws(() => { bv.removeRange(bv.length, 1); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public removeRange_CountOutOfRange() {
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
    public removeRange_RemoveFromFront() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0xAA, 0xBB, 0x00, 0x01, 0x02, 0x03]));

        // Act
        bv.removeRange(0, 2);

        // Assert
        assert.strictEqual(bv.length, 4);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }

    @test
    public removeRange_RemoveFromBack() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0x02, 0x03, 0xAA, 0xBB]));

        // Act
        bv.removeRange(bv.length - 2, 2);

        // Assert
        assert.strictEqual(bv.length, 4);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }

    @test
    public removeRange_RemoveFromMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0xAA, 0xBB, 0x02, 0x03]));

        // Act
        bv.removeRange(2, 2);

        // Assert
        assert.strictEqual(bv.length, 4);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }

    @test
    public resize_invalidParameters() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");

        // Act / Assert
        Testers.testUint((v: number) => { bv.resize(v); });
        Testers.testByte((v: number) => { bv.resize(1, v); });
    }

    @test
    public resize_shorten() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");

        // Act
        const output = bv.resize(6);

        // Assert
        assert.strictEqual(output, bv);
        assert.isTrue(ByteVector.equal(output, ByteVector.fromString("foobar")));
    }

    @test
    public resize_sameSize() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");

        // Act
        const output = bv.resize(9);

        // Assert
        assert.strictEqual(output, bv);
        assert.isTrue(ByteVector.equal(output, ByteVector.fromString("foobarbaz")));
    }

    @test
    public resize_lengthen() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0x02, 0x03]));

        // Act
        const output = bv.resize(7);

        // Assert
        assert.strictEqual(output, bv);
        assert.isTrue(ByteVector.equal(
            output,
            ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x00, 0x00, 0x00])))
        );
    }

    @test
    public resize_lengthenWithPadding() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0x02, 0x03]));

        // Act
        const output = bv.resize(7, 0x12);

        // Assert
        assert.strictEqual(output, bv);
        assert.isTrue(ByteVector.equal(
            output,
            ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x12, 0x12, 0x12]))
        ));
    }

    @test
    public rFind_invalidParameters() {
        // Arrange
        const bv = ByteVector.empty();
        const pattern = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.rFind(v, 0, 1); });
        Testers.testUint((v: number) => { bv.rFind(pattern, v, 1); }, true);
        Testers.testUint((v: number) => { bv.rFind(pattern, 0, v); }, true);
        assert.throws(() => { bv.rFind(pattern, 0, 0); });
    }

    @test
    public rFind_patternTooLong() {
        // Arrange
        const bv = ByteVector.fromSize(5);
        const pattern = ByteVector.fromSize(10);

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern), -1);
    }

    @test
    public rFind_singleBytePattern_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromByteArray(new Uint8Array(0x05));

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern), -1);
    }

    @test
    public rFind_singleBytePattern_withMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("b");

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern), 6);
    }

    @test
    public rFind_multiBytePattern_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("qux");

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern), -1);
    }

    @test
    public rFind_multiBytePattern_singleMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("bar");

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern), 3);
    }

    @test
    public rFind_multiBytePattern_multiMatch() {
        // Arrange
        const bv = ByteVector.fromString("foofoofoo");
        const pattern = ByteVector.fromString("foo");

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern), 6);
    }

    @test
    public rFind_multiByteWithOffset_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("abcfoo");
        const pattern = ByteVector.fromString("foo");

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern, 1), -1);
    }

    @test
    public rFind_multiByteWithOffset_withMatch() {
        // Arrange
        const bv = ByteVector.fromString("foofoofoo");
        const pattern = ByteVector.fromString("foo");

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern, 1), 3);
    }

    @test
    public rFind_multiByteWithAlign_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("0abc");
        const pattern = ByteVector.fromString("ab");

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern, 0, 2), -1);
    }

    @test
    public rFind_multiByteWithAlign_withMatch() {
        // Arrange
        const bv = ByteVector.fromString("00abc");
        const pattern = ByteVector.fromString("ab");

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern, 0, 2), 2);
    }

    @test
    public set_ReadOnly() {
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
    public set_IndexOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        Testers.testUint((v: number) => { bv.set(v, 1); });
        assert.throws(() => { bv.set(bv.length, 1); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public set_ValueOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00, true);

        // Act, Assert
        Testers.testByte((v: number) => { bv.set(0, v); });

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv.data, new Uint8Array([0x00]));
    }

    @test
    public set_SetValue() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x00, 0x01, 0x02]));

        // Act
        bv.set(1, 0xAA);

        // Assert
        assert.strictEqual(bv.length, 3);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0xAA, 0x02]));
    }

    @test
    public split_invalidParameters() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromSize(1);

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.split(v); });
        Testers.testUint((v: number) => { bv.split(pattern, v); }, true);
        Testers.testUint((v: number) => { bv.split(pattern, 1, v); }, true);
        assert.throws(() => bv.split(pattern, 0));
    }

    @test
    public split_singleByteSplit_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString(",");

        // Act
        const output = bv.split(pattern);

        // Assert
        this.verifySplitOutput(output, ["foobarbaz"]);
    }

    @test
    public split_singleByteSplit_oneMatch() {
        // Arrange
        const bv = ByteVector.fromString("foo,baz");
        const pattern = ByteVector.fromString(",");

        // Act
        const output = bv.split(pattern);

        // Assert
        this.verifySplitOutput(output, ["foo", "baz"]);
    }

    @test
    public split_singleByteSplit_multipleMatch() {
        // Arrange
        const bv = ByteVector.fromString("foo,bar,,baz");
        const pattern = ByteVector.fromString(",");

        // Act
        const output = bv.split(pattern);

        // Assert
        this.verifySplitOutput(output, ["foo", "bar", "", "baz"]);
    }

    @test
    public split_multiByteSplit_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString(",,");

        // Act
        const output = bv.split(pattern);

        // Assert
        this.verifySplitOutput(output, ["foobarbaz"]);
    }

    @test
    public split_multiByteSplit_singleMatch() {
        // Arrange
        const bv = ByteVector.fromString("foo,,baz");
        const pattern = ByteVector.fromString(",,");

        // Act
        const output = bv.split(pattern);

        // Assert
        this.verifySplitOutput(output, ["foo", "baz"]);
    }

    @test
    public split_multiByteSplit_multipleMatch() {
        // Arrange
        const bv = ByteVector.fromString("foo,,bar,,,,baz");
        const pattern = ByteVector.fromString(",,");

        // Act
        const output = bv.split(pattern);

        // Assert
        this.verifySplitOutput(output, ["foo", "bar", "", "baz"]);
    }

    @test
    public split_singleByte_maxMatches() {
        // Arrange
        const bv = ByteVector.fromString("foo,bar,,baz");
        const pattern = ByteVector.fromString(",");

        // Act
        const output = bv.split(pattern, undefined, 2);

        // Assert
        this.verifySplitOutput(output, ["foo", "bar,,baz"]);
    }

    @test
    public split_multiByteWithByteAlign_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foo,,bar");
        const pattern = ByteVector.fromString(",,");

        // Act
        const output = bv.split(pattern, 2);

        // Assert
        this.verifySplitOutput(output, ["foo,,bar"]);
    }

    @test
    public split_multiByteWithByteAlign_match() {
        // Arrange
        const bv = ByteVector.fromString("0foo,,bar");
        const pattern = ByteVector.fromString(",,");

        // Act
        const output = bv.split(pattern, 2);

        // Assert
        this.verifySplitOutput(output, ["0foo", "bar"]);
    }

    @test
    public startsWith_invalidParam() {
        // Arrange
        const bv = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.startsWith(v); });
    }

    @test
    public startsWith_doesStartWith() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("foo");

        // Act / Assert
        assert.isTrue(bv.startsWith(pattern));
    }

    @test
    public startsWith_doesNotStartWith() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz");
        const pattern = ByteVector.fromString("fux");

        // Act / Assert
        assert.isFalse(bv.startsWith(pattern));
    }

    private verifySplitOutput(output: ByteVector[], expected: string[]) {
        assert.isOk(output);
        assert.strictEqual(output.length, expected.length);
        for (let i = 0; i < expected.length; i++) {
            assert.isTrue(ByteVector.equal(output[i], ByteVector.fromString(expected[i])));
        }
    }
}
