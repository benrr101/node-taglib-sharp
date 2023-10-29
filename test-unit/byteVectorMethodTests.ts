import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import {ByteVector, StringType} from "../src/byteVector";
import {Allow, Testers} from "./utilities/testers";

// Setup chai
const assert = Chai.assert;

@suite class ByteVector_MethodTests {
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
    public iterator_view() {
        // Arrange
        const array = [0x01, 0x02, 0x03, 0x04];
        const uintArray = new Uint8Array(array.length + 2);
        uintArray.set(array, 1);
        const bv = ByteVector.fromByteArray(uintArray).subarray(1, 4);

        // Act
        const output = [];
        for (const b of bv) {
            output.push(b);
        }

        // Assert
        assert.deepStrictEqual(output, array);
    }

    @test
    public addByte_invalidByte() {
        // Arrange - Create ByteVector
        const bv = ByteVector.fromSize(1);

        // Act / Assert
        // - AddByte should fail
        Testers.testByte((v: number) => { bv.addByte(v); });

        // - ByteVector should be unchanged
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
    }

    @test
    public addByte_readOnly() {
        // Arrange - Create readonly ByteVector
        const bv = ByteVector.fromSize(1, 0x0).makeReadOnly();

        // Act / Assert
        // - AddByte should fail
        assert.throws(() => { bv.addByte(0x01); });

        // - Bytes should be unchanged
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
    }

    @test
    public addByte_addToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);
        const ba = bv["_bytes"];

        // Act - Add a byte to it
        bv.addByte(0x01);

        // Assert
        // - Bytes should have the new value
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01]));
        assert.notStrictEqual(bv["_bytes"], ba);
    }

    @test
    public addByte_addToExisting() {
        // Arrange - Create ByteVector with something in it
        const bv = ByteVector.fromSize(1);
        const ba = bv["_bytes"];

        // Act - Add a byte to it
        bv.addByte(0x01);

        // Assert
        // - Bytes should have the new value
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01]));
        assert.notStrictEqual(bv["_bytes"], ba);
    }

    @test
    public addByte_addToView() {
        // Arrange - Create byte vector that's a view
        const bv = ByteVector.fromSize(3).subarray(1, 1);
        const ba = bv["_bytes"];

        // Act
        bv.addByte(0x01);

        // Assert
        // - Bytes should have the new value
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01]));
        assert.notStrictEqual(bv["_bytes"], ba);
        assert.isFalse(bv.isView);
    }

    @test
    public addByteArray_invalidByteArray() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x0);

        // Act, Assert
        Testers.testTruthy((v: Uint8Array) => { bv.addByteArray(v); });
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
    }

    @test
    public addByteArray_ReadOnly() {
        // Arrange - Create readonly ByteVector
        const bv = ByteVector.fromSize(1, 0x0).makeReadOnly();

        // Act, Assert - AddByte should fail, ByteVector should be unchanged
        assert.throws(() => { bv.addByteArray(new Uint8Array(0x01)); });
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
    }

    @test
    public addByteArray_addEmptyToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);

        // Act - Add nothing to it
        bv.addByteArray(new Uint8Array());
        bv.addByteArray(new Uint8Array([0x01, 0x02, 0x03]), 0);

        // Assert - ByteVector should remain empty
        assert.deepEqual(bv["_bytes"], new Uint8Array());
    }

    @test
    public addByteArray_addSingleToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);
        const ba = bv["_bytes"];

        // Act - Add a byte to it
        bv.addByteArray(new Uint8Array([0x01]));

        // Assert - ByteVector should contain the new byte
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01]));
        assert.notStrictEqual(bv["_bytes"], ba);
    }

    @test
    public addByteArray_addMultipleToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);
        const ba = bv["_bytes"];

        // Act - Add two bytes to it
        bv.addByteArray(new Uint8Array([0x01, 0x02]));

        // Assert - ByteVector should contain the new bytes
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02]));
        assert.notStrictEqual(bv["_bytes"], ba);
    }

    @test
    public addByteArray_addEmptyToExisting() {
        // Arrange - Create ByteVector that has bytes
        const bv = ByteVector.fromSize(1);
        const ba = bv["_bytes"];

        // Act - Add nothing to it
        bv.addByteArray(new Uint8Array());
        bv.addByteArray(new Uint8Array([0x01, 0x02, 0x03]), 0);

        // Assert - ByteVector should contain the new byte
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
        assert.strictEqual(bv["_bytes"], ba);
    }

    @test
    public addByteArray_addSingleToExisting() {
        // Arrange - Create ByteVector that has bytes
        const bv = ByteVector.fromSize(1);
        const ba = bv["_bytes"];

        // Act - Add a byte to it
        bv.addByteArray(new Uint8Array([0x01]));

        // Assert - ByteVector should contain the new byte
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01]));
        assert.notStrictEqual(bv["_bytes"], ba);
    }

    @test
    public addByteArray_addMultipleToExisting() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(1);
        const ba = bv["_bytes"];

        // Act - Add two bytes to it
        bv.addByteArray(new Uint8Array([0x01, 0x02]));

        // Assert - ByteVector should contain the new bytes
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02]));
        assert.notStrictEqual(bv["_bytes"], ba);
    }

    @test
    public addByteArray_addEmptyToView() {
        // Arrange
        const bv = ByteVector.fromSize(3).subarray(1, 1);
        const ba = bv["_bytes"];

        // Act
        bv.addByteArray(new Uint8Array());
        bv.addByteArray(new Uint8Array([0x01, 0x02, 0x03]), 0);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
        assert.strictEqual(bv["_bytes"], ba);
        assert.isTrue(bv.isView);
    }

    @test
    public addByteArray_addSingleToView() {
        // Arrange
        const bv = ByteVector.fromSize(3).subarray(1, 1);
        const ba = bv["_bytes"];

        // Act
        bv.addByteArray(new Uint8Array([0x01]));

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01]));
        assert.notStrictEqual(bv["_bytes"], ba);
        assert.isFalse(bv.isView);
    }

    @test
    public addByteArray_addMultipleToView() {
        // Arrange
        const bv = ByteVector.fromSize(3).subarray(1, 1);
        const ba = bv["_bytes"];

        // Act
        bv.addByteArray(new Uint8Array([0x01, 0x02]));

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02]));
        assert.notStrictEqual(bv["_bytes"], ba);
        assert.isFalse(bv.isView);
    }

    @test
    public addByteVector_invalidByteVector() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x0);

        // Act, Assert
        Testers.testTruthy((v: ByteVector) => { bv.addByteVector(v); });
    }

    @test
    public addByteVector_readOnly() {
        // Arrange - Create readonly ByteVector
        const bv = ByteVector.fromSize(1, 0x0).makeReadOnly();

        // Act, Assert - AddByte should fail, ByteVector should be unchanged
        assert.throws(() => bv.addByteVector(this.vectorToAdd));
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
    }

    @test
    public addByteVector_addEmptyToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);

        // Act - Add nothing to it
        bv.addByteVector(ByteVector.fromSize(0));

        // Assert - ByteVector should contain the new byte
        assert.deepEqual(bv["_bytes"], new Uint8Array());
    }

    @test
    public addByteVector_addSingleToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);
        const ba = bv["_bytes"];
        const add = ByteVector.fromSize(1, 0x1);

        // Act - Add a byte to it
        bv.addByteVector(add);

        // Assert - ByteVector should contain the new byte
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01]));
        assert.notStrictEqual(bv["_bytes"], ba);
    }

    @test
    public addByteVector_addMultipleToEmpty() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(0);
        const ba = bv["_bytes"];
        const add = ByteVector.fromByteArray([0x01, 0x02]);

        // Act - Add two bytes to it
        bv.addByteVector(add);

        // Assert - ByteVector should contain the new bytes
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02]));
        assert.notStrictEqual(bv["_bytes"], ba);
    }

    @test
    public addByteVector_addSingleToExisting() {
        // Arrange - Create ByteVector that has bytes
        const bv = ByteVector.fromSize(1);
        const ba = bv["_bytes"];
        const add = ByteVector.fromByteArray([0x01]);

        // Act - Add a byte to it
        bv.addByteVector(add);

        // Assert - ByteVector should contain the new byte
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01]));
        assert.notStrictEqual(bv["_bytes"], ba);
    }

    @test
    public addByteVector_addMultipleToExisting() {
        // Arrange - Create ByteVector that is empty
        const bv = ByteVector.fromSize(1);
        const ba = bv["_bytes"];
        const add = ByteVector.fromByteArray([0x01, 0x02]);

        // Act - Add two bytes to it
        bv.addByteVector(add);

        // Assert - ByteVector should contain the new bytes
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02]));
        assert.notStrictEqual(bv["_bytes"], ba);
    }

    @test
    public addByteVector_addEmptyToView() {
        // Arrange
        const bv = ByteVector.fromSize(3).subarray(1, 1);

        // Act
        bv.addByteVector(ByteVector.fromSize(0));

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
        assert.isTrue(bv.isView);
    }

    @test
    public addByteVector_addSingleToView() {
        // Arrange
        const bv = ByteVector.fromSize(3).subarray(1, 1);
        const ba = bv["_bytes"];
        const add = ByteVector.fromByteArray([0x01]);

        // Act
        bv.addByteVector(add);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01]));
        assert.notStrictEqual(bv["_bytes"], ba);
        assert.isFalse(bv.isView);
    }

    @test
    public addByteVector_addMultipleToView() {
        // Arrange
        const bv = ByteVector.fromSize(3).subarray(1, 1);
        const ba = bv["_bytes"];
        const add = ByteVector.fromByteArray([0x01, 0x02]);

        // Act
        bv.addByteVector(add);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02]));
        assert.notStrictEqual(bv["_bytes"], ba);
        assert.isFalse(bv.isView);
    }

    @test
    public addByteVector_addViewToMultiple() {
        // Arrange
        const bv = ByteVector.fromSize(1);
        const ba = bv["_bytes"];
        const add = ByteVector.fromByteArray([0xAA, 0x01, 0x02, 0xAA])
            .subarray(1, 2);

        // Act
        bv.addByteVector(add);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02]));
        assert.notStrictEqual(bv["_bytes"], ba);
        assert.isFalse(bv.isView);
    }

    @test
    public addByteVector_addViewToView() {
        // Arrange
        const bv = ByteVector.fromSize(3).subarray(1, 1);
        const ba = bv["_bytes"];
        const add = ByteVector.fromByteArray([0xAA, 0x01, 0x02, 0xAA])
            .subarray(1, 2);

        // Act
        bv.addByteVector(add);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02]));
        assert.notStrictEqual(bv["_bytes"], ba);
        assert.isFalse(bv.isView);
    }

    @test
    public clear_readOnly() {
        // Arrange - Create readonly bytevector
        const bv = ByteVector.fromSize(1, 0x00).makeReadOnly();

        // Act, Assert - Should throw, bytevector should be unchanged
        assert.throws(() => { bv.clear(); } );
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
    }

    @test
    public clear_empty() {
        // Arrange - Create empty ByteVector
        const bv = ByteVector.fromSize(0);

        // Act
        bv.clear();

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array());
    }

    @test
    public clear_existing() {
        // Arrange - Create ByteVector with some data
        const bv = ByteVector.fromSize(1, 0x00);

        // Act
        bv.clear();

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array());
    }

    @test
    public clear_view() {
        // Arrange
        const bv = ByteVector.fromSize(3).subarray(1, 1);

        // Act
        bv.clear();

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array());
        assert.isFalse(bv.isView);
    }

    @test
    public containsAt_invalidParameters() {
        // Arrange
        const bv = ByteVector.empty();
        const pattern = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.containsAt(v, 0); });
        Testers.testSafeInt((v: number) => { bv.containsAt(pattern, v); }, Allow.Undefined);
    }

    @test
    public containsAt_sanityCheckFailures() {
        // Arrange
        const bv = ByteVector.fromSize(5);

        // Act / Assert
        assert.isFalse(bv.containsAt(ByteVector.fromSize(10))); // Pattern longer than source
        assert.isFalse(bv.containsAt(ByteVector.fromSize(1), 10)); // Offset longer than source
        assert.isFalse(bv.containsAt(ByteVector.fromSize(1), 5)); // Offset equal to source
        assert.isFalse(bv.containsAt(ByteVector.empty())); // Pattern is empty
    }

    @test
    public containsAt_doesNotContainAnywhere() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("qux", StringType.Latin1);

        // Act
        const output = bv.containsAt(pattern);

        // Assert
        assert.isFalse(output);
    }

    @test
    public containsAt_doesNotContainAt() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("qux", StringType.Latin1);

        // Act
        const output = bv.containsAt(pattern, 1);

        // Assert
        assert.isFalse(output);
    }

    @test
    public containsAt_containsPartial() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("foobux", StringType.Latin1);

        // Act
        const output = bv.containsAt(pattern);

        // Assert
        assert.isFalse(output);
    }

    @test
    public containsAt_containsAll() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("foo", StringType.Latin1);

        // Act
        const output = bv.containsAt(pattern);

        // Assert
        assert.isTrue(output);
    }

    @test
    public containsAt_containsAllAt() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("bar", StringType.Latin1);

        // Act
        const output = bv.containsAt(pattern, 3);

        // Assert
        assert.isTrue(output);
    }

    @test
    public containsAt_doesNotContainInView() {
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("qux", StringType.Latin1);

        // Act
        const output = bv.containsAt(pattern, 3);

        // Assert
        assert.isFalse(output);
    }

    @test
    public containsAt_containsAllInView() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("bar", StringType.Latin1);

        // Act
        const output = bv.containsAt(pattern, 3);

        // Assert
        assert.isTrue(output);
    }

    @test
    public compare_invalidParameter() {
        // Arrange
        const bv = ByteVector.fromSize(1);

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.compareTo(v); });
        Testers.testTruthy((v: ByteVector) => { ByteVector.compare(bv, v); });
    }

    @test
    public compare_lessThan() {
        // Arrange
        const bv = ByteVector.concatenate(0x00, 0x05);
        const other = ByteVector.concatenate(0x00, 0x06);

        // Act
        const output1 = bv.compareTo(other);
        const output2 = ByteVector.compare(bv, other);

        // Assert
        assert.strictEqual(output1, -1);
        assert.strictEqual(output2, -1);
    }

    @test
    public compare_greaterThan() {
        // Arrange
        const bv = ByteVector.concatenate(0x00, 0x05);
        const other = ByteVector.concatenate(0x00, 0x04);

        // Act
        const output1 = bv.compareTo(other);
        const output2 = ByteVector.compare(bv, other);

        // Assert
        assert.strictEqual(output1, 1);
        assert.strictEqual(output2, 1);
    }

    @test
    public compare_equalTo() {
        // Arrange
        const bv = ByteVector.concatenate(0x00, 0x05);
        const other = ByteVector.concatenate(0x00, 0x05);

        // Act
        const output1 = bv.compareTo(other);
        const output2 = ByteVector.compare(bv, other);

        // Assert
        assert.strictEqual(output1, 0);
        assert.strictEqual(output2, 0);
    }

    @test
    public compare_unequalSizes() {
        // Arrange
        const bv = ByteVector.concatenate(0x00, 0x05);
        const other = ByteVector.concatenate(0x00);

        // Act
        const output1 = bv.compareTo(other);
        const output2 = ByteVector.compare(bv, other);

        // Assert
        assert.strictEqual(output1, 1);
        assert.strictEqual(output2, 1);
    }

    @test
    public compare_viewToConcrete() {
        // Arrange
        const bv = ByteVector.concatenate(0xAA, 0x00, 0x05, 0xAA)
            .subarray(1, 2);
        const other = ByteVector.concatenate(0x00, 0x04);

        // Act
        const output1 = bv.compareTo(other);
        const output2 = ByteVector.compare(bv, other);

        // Assert
        assert.strictEqual(output1, 1);
        assert.strictEqual(output2, 1);
    }

    @test
    public compare_concreteToView() {
        // Arrange
        const bv = ByteVector.concatenate(0x00, 0x05);
        const other = ByteVector.concatenate(0xAA, 0x00, 0x04, 0xAA)
            .subarray(1, 2);

        // Act
        const output1 = bv.compareTo(other);
        const output2 = ByteVector.compare(bv, other);

        // Assert
        assert.strictEqual(output1, 1);
        assert.strictEqual(output2, 1);
    }

    @test
    public compare_viewToView() {
        // Arrange
        const bv = ByteVector.concatenate(0xAA, 0x00, 0x05, 0xAA)
            .subarray(1, 2);
        const other = ByteVector.concatenate(0xAA, 0x00, 0x04, 0xAA)
            .subarray(1, 2);

        // Act
        const output1 = bv.compareTo(other);
        const output2 = ByteVector.compare(bv, other);

        // Assert
        assert.strictEqual(output1, 1);
        assert.strictEqual(output2, 1);
    }

    @test
    public endsWith_invalidParam() {
        // Arrange
        const bv = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.endsWith(v); });
    }

    @test
    public endsWith_endsWith() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("baz", StringType.Latin1);

        // Act / Assert
        assert.isTrue(bv.endsWith(pattern));
    }

    @test
    public endsWith_doesNotEndWith() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("bux", StringType.Latin1);

        // Act / Assert
        assert.isFalse(bv.endsWith(pattern));
    }

    @test
    public endsWith_endsWithView() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("0baz0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.isTrue(bv.endsWith(pattern));
    }

    @test
    public endsWith_doesNotEndWithView() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("0qux0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.isFalse(bv.endsWith(pattern));
    }

    @test
    public endsWith_viewEndsWith() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("baz", StringType.Latin1);

        // Act / Assert
        assert.isTrue(bv.endsWith(pattern));
    }

    @test
    public endsWith_viewDoesNotEndWith() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("bux", StringType.Latin1);

        // Act / Assert
        assert.isFalse(bv.endsWith(pattern));
    }

    @test
    public endsWith_viewEndsWithView() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("0baz0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.isTrue(bv.endsWith(pattern));
    }

    @test
    public endsWith_viewDoesNotEndWithView() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("0bux0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.isFalse(bv.endsWith(pattern));
    }

    @test
    public endsWithPartialMatch_invalidProperty() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);

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
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("qux", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.endsWithPartialMatch(pattern), -1);
    }

    @test
    public endsWithPartialMatch_endsWithPartial() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("bazqqq", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.endsWithPartialMatch(pattern), 6);
    }

    @test
    public endsWithPartialMatch_endsWithFull() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("baz", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.endsWithPartialMatch(pattern), 6);
    }

    @test
    public endsWithPartialMatch_endsWithPartialView() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("0bazqqq0", StringType.Latin1)
            .subarray(1, 6);

        // Act / Assert
        assert.strictEqual(bv.endsWithPartialMatch(pattern), 6);
    }

    @test
    public endsWithPartialMatch_viewEndsWithPartial() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("bazqqq", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.endsWithPartialMatch(pattern), 6);
    }

    @test
    public endsWithPartialMatch_viewEndsWithPartialView() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("0bazqqq0", StringType.Latin1)
            .subarray(1, 6);

        // Act / Assert
        assert.strictEqual(bv.endsWithPartialMatch(pattern), 6);
    }

    @test
    public equals_bothNullUndefined() {
        // Arrange, Act, Assert
        assert.isTrue(ByteVector.equals(undefined, undefined));
        assert.isTrue(ByteVector.equals(null, null));
    }

    @test
    public equals_mixedNullUndefined() {
        // Arrange, Act, Assert
        assert.isFalse(ByteVector.equals(undefined, null));
        assert.isFalse(ByteVector.equals(null, undefined));
    }

    @test
    public equals_mixedFalsySomething() {
        // Arrange
        const bv = ByteVector.fromSize(1);

        // Act, Assert
        assert.isFalse(ByteVector.equals(undefined, bv));
        assert.isFalse(ByteVector.equals(null, bv));
        assert.isFalse(ByteVector.equals(bv, undefined));
        assert.isFalse(bv.equals(undefined));
        assert.isFalse(bv.subarray(0).equals(undefined));
        assert.isFalse(ByteVector.equals(bv, null));
        assert.isFalse(bv.equals(null));
        assert.isFalse(bv.subarray(0).equals(null));

    }

    @test
    public equals_equal() {
        // Arrange
        const bv1 = ByteVector.fromByteArray([0x01, 0x02]);
        const bv2 = ByteVector.fromByteArray([0x01, 0x02]);

        // Act, Assert
        assert.isTrue(ByteVector.equals(bv1, bv2));
        assert.isTrue(bv1.equals(bv2));
        Testers.bvEqual(bv1, bv2);
    }

    @test
    public equals_concreteEqualsView() {
        // Arrange
        const bv1 = ByteVector.fromByteArray([0x01, 0x02]);
        const bv2 = ByteVector.fromByteArray([0xAA, 0x01, 0x02, 0xAA])
            .subarray(1, 2);

        // Act, Assert
        assert.isTrue(ByteVector.equals(bv1, bv2));
        assert.isTrue(bv1.equals(bv2));
        Testers.bvEqual(bv1, bv2);
    }

    @test
    public equals_viewEqualsConcrete() {
        // Arrange
        const bv1 = ByteVector.fromByteArray([0xAA, 0x01, 0x02, 0xAA])
            .subarray(1, 2);
        const bv2 = ByteVector.fromByteArray([0x01, 0x02]);

        // Act, Assert
        assert.isTrue(ByteVector.equals(bv1, bv2));
        assert.isTrue(bv1.equals(bv2));
        Testers.bvEqual(bv1, bv2);
    }

    @test
    public equals_viewEqualsView() {
        // Arrange
        const bv1 = ByteVector.fromByteArray([0xAA, 0x01, 0x02, 0xAA])
            .subarray(1, 2);
        const bv2 = ByteVector.fromByteArray([0xAA, 0x01, 0x02, 0xAA])
            .subarray(1, 2);

        // Act, Assert
        assert.isTrue(ByteVector.equals(bv1, bv2));
        assert.isTrue(bv1.equals(bv2));
        Testers.bvEqual(bv1, bv2);
    }

    @test
    public equals_notEqual() {
        // Arrange
        const bv1 = ByteVector.fromByteArray([0x01, 0x02]);
        const bv2 = ByteVector.fromByteArray([0x03, 0x04]);

        // Act, Assert
        assert.isFalse(ByteVector.equals(bv1, bv2));
    }

    @test
    public equals_concreteDoesNotEqualView() {
        // Arrange
        const bv1 = ByteVector.fromByteArray([0x01, 0x02]);
        const bv2 = ByteVector.fromByteArray([0xAA, 0x03, 0x04, 0xAA])
            .subarray(1, 2);

        // Act, Assert
        assert.isFalse(ByteVector.equals(bv1, bv2));
        assert.isFalse(bv1.equals(bv2));
        assert.throws(() => Testers.bvEqual(bv1, bv2));
    }

    @test
    public equals_viewDoesNotEqualConcrete() {
        // Arrange
        const bv1 = ByteVector.fromByteArray([0xAA, 0x01, 0x02, 0xAA])
            .subarray(1, 2);
        const bv2 = ByteVector.fromByteArray([0x03, 0x04]);

        // Act, Assert
        assert.isFalse(ByteVector.equals(bv1, bv2));
        assert.isFalse(bv1.equals(bv2));
        assert.throws(() => Testers.bvEqual(bv1, bv2));
    }

    @test
    public equals_viewDoesNotEqualsView() {
        // Arrange
        const bv1 = ByteVector.fromByteArray([0xAA, 0x01, 0x02, 0xAA])
            .subarray(1, 2);
        const bv2 = ByteVector.fromByteArray([0xAA, 0x03, 0x04, 0xAA])
            .subarray(1, 2);

        // Act, Assert
        assert.isFalse(ByteVector.equals(bv1, bv2));
        assert.isFalse(bv1.equals(bv2));
        assert.throws(() => Testers.bvEqual(bv1, bv2));
    }

    @test
    public find_invalidParameters() {
        // Arrange
        const bv = ByteVector.empty();
        const pattern = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.find(v, 1); });
        Testers.testUint((v: number) => { bv.find(pattern, v); }, Allow.Undefined);
        assert.throws(() => { bv.find(pattern, 0); });
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
    public find_sanityChecks() {
        // Act / Assert
        assert.strictEqual(ByteVector.fromSize(0).find(ByteVector.fromSize(1)), -1);
        assert.strictEqual(ByteVector.fromSize(1).find(ByteVector.fromSize(0)), -1);
        assert.strictEqual(ByteVector.fromSize(1).find(ByteVector.fromSize(5)), -1);
    }

    @test
    public find_singleBytePattern_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromByteArray([0x05]);

        // Act / Assert
        assert.strictEqual(bv.find(pattern), -1);
    }

    @test
    public find_singleBytePattern_withMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("b", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.find(pattern), 3);
    }

    @test
    public find_multiBytePattern_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("qux", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.find(pattern), -1);
    }

    @test
    public find_multiBytePattern_singleMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("bar", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.find(pattern), 3);
    }

    @test
    public find_multiBytePattern_multiMatch() {
        // Arrange
        const bv = ByteVector.fromString("foofoofoo", StringType.Latin1);
        const pattern = ByteVector.fromString("foo", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.find(pattern), 0);
    }

    @test
    public find_multiByteWithAlign_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("0abc", StringType.Latin1);
        const pattern = ByteVector.fromString("ab", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.find(pattern, 2), -1);
    }

    @test
    public find_multiByteWithAlign_withMatch() {
        // Arrange
        const bv = ByteVector.fromString("00abc", StringType.Latin1);
        const pattern = ByteVector.fromString("ab", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.find(pattern, 2), 2);
    }

    @test
    public find_viewInConcrete() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("bar", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.find(pattern), 3);
    }

    @test
    public find_concreteInView() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("0bar0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.strictEqual(bv.find(pattern), 3);

    }

    @test
    public find_viewInView() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("0bar0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.strictEqual(bv.find(pattern), 3);
    }

    @test
    public find_multibyteInViewWithAlign() {
        // Arrange
        const bv = ByteVector.fromString("000abc0", StringType.Latin1)
            .subarray(1, 5);
        const pattern = ByteVector.fromString("ab", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.find(pattern, 2), 2);
    }

    @test
    public get_invalidParameter() {
        // Arrange
        const bv = ByteVector.fromSize(1);

        // Act / Assert
        Testers.testUint((v: number) => bv.get(v));
        assert.throws(() => bv.get(bv.length));
        assert.throws(() => bv.subarray(1).get(0));
    }

    @test
    public get_validParameter() {
        // Arrange
        const bv = ByteVector.fromByteArray([1, 2, 3]);

        // Act
        const output = bv.get(1);

        // Assert
        assert.strictEqual(output, 2);
    }

    @test
    public get_validParameterView() {
        // Arrange
        const bv = ByteVector.fromByteArray([0xAA, 1, 2, 3, 0xAA])
            .subarray(1, 3);

        // Act
        const output = bv.get(1);

        // Assert
        assert.strictEqual(output, 2);
    }

    @test
    public indexOf_exists() {
        // Arrange
        const bv = ByteVector.fromByteArray([1, 2, 3]);

        // Act
        const output = bv.indexOf(2);

        // Assert
        assert.strictEqual(output, 1);
    }

    @test
    public indexOf_doesNotExist() {
        // Arrange
        const bv = ByteVector.fromByteArray([1, 2, 3]);

        // Act
        const output = bv.indexOf(888);

        // Assert
        assert.strictEqual(output, -1);
    }

    @test
    public indexOf_existsView() {
        // Arrange
        const bv = ByteVector.fromByteArray([0xAA, 1, 2, 3, 0xAA])
            .subarray(1, 3);

        // Act
        const output = bv.indexOf(2);

        // Assert
        assert.strictEqual(output, 1);
    }

    @test
    public indexOf_doesNotExistView() {
        // Arrange
        const bv = ByteVector.fromByteArray([0xAA, 1, 2, 3, 0xAA])
            .subarray(1, 3);

        // Act
        const output = bv.indexOf(0xAA);

        // Assert
        assert.strictEqual(output, -1);
    }

    @test
    public makeReadOnly() {
        // Arrange
        const bv = ByteVector.fromSize(1);

        // Act
        bv.makeReadOnly();

        // Assert
        assert.isTrue(bv.isReadOnly);
        assert.throws(() => bv.clear());
    }

    @test
    public offsetFind_invalidParameters() {
        // Arrange
        const bv = ByteVector.empty();
        const pattern = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => bv.offsetFind(v, 1));
        Testers.testSafeUint((v) => bv.offsetFind(pattern, v));
        Testers.testUint((v) => bv.offsetFind(pattern, 0, v), Allow.Undefined);
        assert.throws(() => bv.offsetFind(pattern, 0, 0));
    }

    @test
    public offsetFind_patternTooLong() {
        // Arrange
        const bv = ByteVector.fromSize(5);
        const pattern = ByteVector.fromSize(5);

        // Act / Assert
        assert.strictEqual(bv.offsetFind(pattern, 1), -1);
    }

    @test
    public offsetFind_sanityChecks() {
        // Act / Assert
        assert.strictEqual(ByteVector.fromSize(1).offsetFind(ByteVector.fromSize(1), 1), -1);
        assert.strictEqual(ByteVector.fromSize(2).offsetFind(ByteVector.fromSize(0), 1), -1);
        assert.strictEqual(ByteVector.fromSize(2).offsetFind(ByteVector.fromSize(5), 1), -1);
    }

    @test
    public offsetFind_singleBytePattern_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromByteArray([0x05]);

        // Act / Assert
        assert.strictEqual(bv.offsetFind(pattern, 1), -1);
    }

    @test
    public offsetFind_singleBytePattern_withMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("b", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.offsetFind(pattern, 1), 3);
    }

    @test
    public offsetFind_multiBytePattern_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("qux", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.offsetFind(pattern, 1), -1);
    }

    @test
    public offsetFind_multiBytePattern_singleMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("bar", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.offsetFind(pattern, 1), 3);
    }

    @test
    public offsetFind_multiBytePattern_multiMatch() {
        // Arrange
        const bv = ByteVector.fromString("foofoofoo", StringType.Latin1);
        const pattern = ByteVector.fromString("foo", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.offsetFind(pattern, 1), 3);
    }

    @test
    public offsetFind_multiByteWithAlign_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("00abc", StringType.Latin1);
        const pattern = ByteVector.fromString("ab", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.offsetFind(pattern, 1, 2), -1);
    }

    @test
    public offsetFind_multiByteWithAlign_withMatch() {
        // Arrange
        const bv = ByteVector.fromString("000abc", StringType.Latin1);
        const pattern = ByteVector.fromString("ab", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.offsetFind(pattern, 1, 2), 3);
    }

    @test
    public offsetFind_viewInConcrete() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("bar", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.offsetFind(pattern, 1), 3);
    }

    @test
    public offsetFind_concreteInView() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("0bar0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.strictEqual(bv.offsetFind(pattern, 1), 3);
    }

    @test
    public offsetFind_viewInView() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("0bar0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.strictEqual(bv.offsetFind(pattern, 1), 3);
    }

    @test
    public offsetFind_multibyteInViewWithAlign() {
        // Arrange
        const bv = ByteVector.fromString("0000abc0", StringType.Latin1)
            .subarray(1, 5);
        const pattern = ByteVector.fromString("ab", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.offsetFind(pattern, 1, 2), 3);
    }

    @test
    public resize_invalidParameters() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);

        // Act / Assert
        Testers.testUint((v: number) => bv.resize(v));
        Testers.testByte((v: number) => bv.resize(1, v));
    }

    @test
    public resize_shorten() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);

        // Act
        bv.resize(6);

        // Assert
        assert.strictEqual(bv.length, 6);
        Testers.bvEqual(bv, ByteVector.fromString("foobar", StringType.Latin1));
    }

    @test
    public resize_sameSize() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);

        // Act
        bv.resize(9);

        // Assert
        assert.strictEqual(bv.length, 9);
        Testers.bvEqual(bv, ByteVector.fromString("foobarbaz", StringType.Latin1));
    }

    @test
    public resize_lengthen() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x00, 0x01, 0x02, 0x03]);

        // Act
        bv.resize(7);

        // Assert
        assert.strictEqual(bv.length, 7);
        assert.deepStrictEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x00, 0x00, 0x00]));
    }

    @test
    public resize_lengthenWithPadding() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x00, 0x01, 0x02, 0x03]);

        // Act
        bv.resize(7, 0xAA);

        // Assert
        assert.strictEqual(bv.length, 7);
        assert.deepStrictEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02, 0x03, 0xAA, 0xAA, 0xAA]));
    }

    @test
    public resize_shortenView() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);

        // Act
        bv.resize(6);

        // Assert
        assert.isFalse(bv.isView);
        assert.strictEqual(bv.length, 6);
        Testers.bvEqual(bv, ByteVector.fromString("foobar", StringType.Latin1));
    }

    @test
    public resize_sameSizeView() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);

        // Act
        bv.resize(9);

        // Assert
        assert.isTrue(bv.isView);
        assert.strictEqual(bv.length, 9);
        Testers.bvEqual(bv, ByteVector.fromString("foobarbaz", StringType.Latin1));
    }

    @test
    public resize_lengthenView() {
        // Arrange
        const bv = ByteVector.fromByteArray([0xAA, 0x00, 0x01, 0x02, 0x03, 0xAA])
            .subarray(1, 4);

        // Act
        bv.resize(7);

        // Assert
        assert.isFalse(bv.isView);
        assert.strictEqual(bv.length, 7);
        assert.deepStrictEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x00, 0x00, 0x00]));
    }

    @test
    public resize_lengthenViewWithPadding() {
        // Arrange
        const bv = ByteVector.fromByteArray([0xAA, 0x00, 0x01, 0x02, 0x03, 0xAA])
            .subarray(1, 4);

        // Act
        bv.resize(7, 0xBB);

        // Assert
        assert.isFalse(bv.isView);
        assert.strictEqual(bv.length, 7);
        assert.deepStrictEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02, 0x03, 0xBB, 0xBB, 0xBB]));
    }

    @test
    public rFind_invalidParameters() {
        // Arrange
        const bv = ByteVector.empty();
        const pattern = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => bv.rFind(v, 1));
        Testers.testUint((v: number) => bv.rFind(pattern, v), Allow.Undefined);
        assert.throws(() => bv.rFind(pattern, 0));
    }

    @test
    public rFind_sanityChecks() {
        // Act / Assert
        assert.strictEqual(ByteVector.fromSize(0).rFind(ByteVector.fromSize(1)), -1);
        assert.strictEqual(ByteVector.fromSize(1).rFind(ByteVector.fromSize(0)), -1);
        assert.strictEqual(ByteVector.fromSize(1).rFind(ByteVector.fromSize(5)), -1);
    }

    @test
    public rFind_singleBytePattern_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromByteArray([0x05]);

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern), -1);
    }

    @test
    public rFind_singleBytePattern_withMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("b", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern), 6);
    }

    @test
    public rFind_multiBytePattern_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("qux", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern), -1);
    }

    @test
    public rFind_multiBytePattern_singleMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("bar", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern), 3);
    }

    @test
    public rFind_multiBytePattern_multiMatch() {
        // Arrange
        const bv = ByteVector.fromString("foofoofoo", StringType.Latin1);
        const pattern = ByteVector.fromString("foo", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern), 6);
    }

    @test
    public rFind_multiByteWithAlign_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("0abc", StringType.Latin1);
        const pattern = ByteVector.fromString("ab", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern, 2), -1);
    }

    @test
    public rFind_multiByteWithAlign_withMatch() {
        // Arrange
        const bv = ByteVector.fromString("00abc", StringType.Latin1);
        const pattern = ByteVector.fromString("ab", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.rFind(pattern, 2), 2);
    }

    @test
    public rFind_viewInConcrete() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("bar", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.find(pattern), 3);
    }

    @test
    public rFind_concreteInView() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("0bar0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.strictEqual(bv.find(pattern), 3);

    }

    @test
    public rFind_viewInView() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("0bar0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.strictEqual(bv.find(pattern), 3);
    }

    @test
    public rFind_multibyteInViewWithAlign() {
        // Arrange
        const bv = ByteVector.fromString("000abc0", StringType.Latin1)
            .subarray(1, 5);
        const pattern = ByteVector.fromString("ab", StringType.Latin1);

        // Act / Assert
        assert.strictEqual(bv.find(pattern, 2), 2);
    }

    @test
    public set_readOnly() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00).makeReadOnly();

        // Act, Assert
        assert.throws(() => bv.set(0, 1));

        assert.isTrue(bv.isReadOnly);
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 1);
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
    }

    @test
    public set_indexOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        Testers.testUint((v: number) => bv.set(v, 1));
        assert.throws(() => bv.set(bv.length, 1));
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
    }

    @test
    public set_valueOutOfRange() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        Testers.testByte((v: number) => { bv.set(0, v); });
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
    }

    @test
    public set_concrete() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x00, 0x01, 0x02]);

        // Act
        bv.set(1, 0xAA);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0xAA, 0x02]));
    }

    @test
    public set_view() {
        // Arrange
        const bv = ByteVector.fromByteArray([0xAA, 0x00, 0x01, 0x02, 0xAA])
            .subarray(1, 3);

        // Act
        bv.set(1, 0xBB);

        // Assert
        assert.isFalse(bv.isView);
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0xBB, 0x02]));
    }

    @test
    public splice_readOnly() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00).makeReadOnly();

        // Act, Assert
        assert.throws(() => bv.splice(0, 1));
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
    }

    @test
    public splice_invalidParameters() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act, Assert
        Testers.testSafeUint((v) => bv.splice(v, 0));
        Testers.testSafeUint((v) => bv.splice(0, v));
        assert.throws(() => bv.splice(2, 0));

        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
    }

    @test
    public splice_insertByte_insertIntoEmpty() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act
        bv.splice(0, 0, [0x01]);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01]));
    }

    @test
    public splice_insertByte_insertAtFront() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.splice(0, 0, [0xAA]);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0xAA, 0x01, 0x02, 0x03, 0x04]));
    }

    @test
    public splice_insertByte_insertAtBack() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.splice(bv.length, 0, [0xAA]);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xAA]));
    }

    @test
    public splice_insertByte_insertInMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.splice(2, 0, [0xAA]);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02, 0xAA, 0x03, 0x04]));
    }

    @test
    public splice_insertByte_insertIntoView() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x11, 0x01, 0x02, 0x03, 0x04, 0x11])
            .subarray(1, 4);

        // Act
        bv.splice(2, 0, [0xAA]);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02, 0xAA, 0x03, 0x04]));
        assert.isFalse(bv.isView);
    }

    @test
    public splice_insertByteArray_insertEmpty() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act
        bv.splice(0, 0, new Uint8Array());

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
    }

    @test
    public splice_insertByteArray_insertIntoEmpty() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act
        bv.splice(0, 0, new Uint8Array([0x01, 0x02]));

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02]));
    }

    @test
    public splice_insertByteArray_insertAtFront() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.splice(0, 0, new Uint8Array([0xAA, 0xBB]));

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0xAA, 0xBB, 0x01, 0x02, 0x03, 0x04]));
    }

    @test
    public splice_insertByteArray_insertAtBack() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.splice(bv.length, 0, new Uint8Array([0xAA, 0xBB]));

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xAA, 0xBB]));
    }

    @test
    public splice_insertByteArray_insertInMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        // Act
        bv.splice(2, 0, new Uint8Array([0xAA, 0xBB]));

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02, 0xAA, 0xBB, 0x03, 0x04]));
    }

    @test
    public splice_insertByteArray_insertIntoView() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x11, 0x01, 0x02, 0x03, 0x04, 0x11])
            .subarray(1, 4);

        // Act
        bv.splice(2, 0, new Uint8Array([0xAA, 0xBB]));

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02, 0xAA, 0xBB, 0x03, 0x04]));
        assert.isFalse(bv.isView);
    }

    @test
    public splice_insertByteVector_insertEmpty() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act
        bv.splice(0, 0, ByteVector.fromSize(0));

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00]));
    }

    @test
    public splice_insertByteVector_insertIntoEmpty() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act
        bv.splice(0, 0, this.vectorToAdd);

        // Assert
        assert.isFalse(bv.isEmpty);
        assert.strictEqual(bv.length, 2);
        assert.deepEqual(bv["_bytes"], new Uint8Array([0xAA, 0xBB]));
    }

    @test
    public splice_insertByteVector_insertAtFront() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04]);

        // Act
        bv.splice(0, 0, this.vectorToAdd);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0xAA, 0xBB, 0x01, 0x02, 0x03, 0x04]));
    }

    @test
    public splice_insertByteVector_insertAtBack() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04]);

        // Act
        bv.splice(bv.length, 0, this.vectorToAdd);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xAA, 0xBB]));
    }

    @test
    public splice_insertByteVector_insertInMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04]);

        // Act
        bv.splice(2, 0, this.vectorToAdd);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02, 0xAA, 0xBB, 0x03, 0x04]));
    }

    @test
    public splice_insertByteVector_insertIntoView() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x11, 0x01, 0x02, 0x03, 0x04, 0x11])
            .subarray(1, 4);

        // Act
        bv.splice(2, 0, this.vectorToAdd);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02, 0xAA, 0xBB, 0x03, 0x04]));
        assert.isFalse(bv.isView);
    }

    @test
    public splice_insertByteVectorView_insertInMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04]);
        const add = ByteVector.fromByteArray([0x11, 0xAA, 0xBB, 0x11])
            .subarray(1, 2);

        // Act
        bv.splice(2, 0, add);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02, 0xAA, 0xBB, 0x03, 0x04]));
    }

    @test
    public splice_insertByteVectorView_insertIntoView() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x11, 0x01, 0x02, 0x03, 0x04, 0x11])
            .subarray(1, 4);
        const add = ByteVector.fromByteArray([0x11, 0xAA, 0xBB, 0x11])
            .subarray(1, 2);

        // Act
        bv.splice(2, 0, add);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x01, 0x02, 0xAA, 0xBB, 0x03, 0x04]));
    }

    @test
    public splice_removeRange_tooManyBytes() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act
        bv.splice(0, 5);

        // Assert
        assert.isTrue(bv.isEmpty);
        assert.deepEqual(bv["_bytes"], new Uint8Array([]));
    }

    @test
    public splice_removeRange_tooManyBytesView() {
        // Arrange
        const bv = ByteVector.fromSize(3, 0x00)
            .subarray(1, 1);

        // Act
        bv.splice(0, 5);

        // Assert
        assert.isTrue(bv.isEmpty);
        assert.deepEqual(bv["_bytes"], new Uint8Array([]));
        assert.isFalse(bv.isView);
    }

    @test
    public splice_removeRange_removeFromFront() {
        // Arrange
        const bv = ByteVector.fromByteArray([0xAA, 0xBB, 0x00, 0x01, 0x02, 0x03]);

        // Act
        bv.splice(0, 2);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }

    @test
    public splice_removeRange_removeFromFrontView() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x11, 0xAA, 0xBB, 0x00, 0x01, 0x02, 0x03, 0x11])
            .subarray(1, 6);

        // Act
        bv.splice(0, 2);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02, 0x03]));
        assert.isFalse(bv.isView);
    }

    @test
    public splice_removeRange_removeFromBack() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x00, 0x01, 0x02, 0x03, 0xAA, 0xBB]);

        // Act
        bv.splice(bv.length - 2, 2);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }

    @test
    public splice_removeRange_removeFromBackView() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x11, 0x00, 0x01, 0x02, 0x03, 0xAA, 0xBB, 0x11])
            .subarray(1, 6);

        // Act
        bv.splice(bv.length - 2, 2);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02, 0x03]));
        assert.isFalse(bv.isView);
    }

    @test
    public splice_removeRange_removeFromMiddle() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x00, 0x01, 0xAA, 0xBB, 0x02, 0x03]);

        // Act
        bv.splice(2, 2);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02, 0x03]));
    }

    @test
    public splice_removeRange_removeFromMiddleView() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x11, 0x00, 0x01, 0xAA, 0xBB, 0x02, 0x03, 0x11])
            .subarray(1, 6);

        // Act
        bv.splice(2, 2);

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x02, 0x03]));
        assert.isFalse(bv.isView);
    }

    @test
    public splice_removeAndInsert() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x00, 0x01, 0xAA, 0xBB, 0x02, 0x03]);

        // Act
        bv.splice(2, 2, new Uint8Array([0x88, 0x99]));

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x88, 0x99, 0x02, 0x03]));
    }

    @test
    public splice_removeAndInsertView() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x11, 0x00, 0x01, 0xAA, 0xBB, 0x02, 0x03, 0x11])
            .subarray(1, 6);

        // Act
        bv.splice(2, 2, new Uint8Array([0x88, 0x99]));

        // Assert
        assert.deepEqual(bv["_bytes"], new Uint8Array([0x00, 0x01, 0x88, 0x99, 0x02, 0x03]));
        assert.isFalse(bv.isView);
    }

    @test
    public split_invalidParameters() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromSize(1);

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.split(v); });
        Testers.testUint((v: number) => { bv.split(pattern, v); }, Allow.Undefined);
        Testers.testUint((v: number) => { bv.split(pattern, 1, v); }, Allow.Undefined);
        assert.throws(() => bv.split(pattern, 0));
    }

    @test
    public split_singleByteSplit_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString(",", StringType.Latin1);

        // Act
        const output = bv.split(pattern);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["foobarbaz"]);
    }

    @test
    public split_singleByteSplit_oneMatch() {
        // Arrange
        const bv = ByteVector.fromString("foo,baz", StringType.Latin1);
        const pattern = ByteVector.fromString(",", StringType.Latin1);

        // Act
        const output = bv.split(pattern);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["foo", "baz"]);
    }

    @test
    public split_singleByteSplit_multipleMatch() {
        // Arrange
        const bv = ByteVector.fromString("foo,bar,,baz", StringType.Latin1);
        const pattern = ByteVector.fromString(",", StringType.Latin1);

        // Act
        const output = bv.split(pattern);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["foo", "bar", "", "baz"]);
    }

    @test
    public split_multiByteSplit_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString(",,", StringType.Latin1);

        // Act
        const output = bv.split(pattern);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["foobarbaz"]);
    }

    @test
    public split_multiByteSplit_singleMatch() {
        // Arrange
        const bv = ByteVector.fromString("foo,,baz", StringType.Latin1);
        const pattern = ByteVector.fromString(",,", StringType.Latin1);

        // Act
        const output = bv.split(pattern);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["foo", "baz"]);
    }

    @test
    public split_multiByteSplit_multipleMatch() {
        // Arrange
        const bv = ByteVector.fromString("foo,,bar,,,,baz", StringType.Latin1);
        const pattern = ByteVector.fromString(",,", StringType.Latin1);

        // Act
        const output = bv.split(pattern);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["foo", "bar", "", "baz"]);
    }

    @test
    public split_singleByte_maxMatches() {
        // Arrange
        const bv = ByteVector.fromString("foo,bar,,baz", StringType.Latin1);
        const pattern = ByteVector.fromString(",", StringType.Latin1);

        // Act
        const output = bv.split(pattern, undefined, 2);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["foo", "bar,,baz"]);
    }

    @test
    public split_multiByteWithByteAlign_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foo,,bar", StringType.Latin1);
        const pattern = ByteVector.fromString(",,", StringType.Latin1);

        // Act
        const output = bv.split(pattern, 2);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["foo,,bar"]);
    }

    @test
    public split_multiByteWithByteAlignOnView_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("Afoo,,barA", StringType.Latin1)
            .subarray(1, 8);
        const pattern = ByteVector.fromString(",,", StringType.Latin1);

        // Act
        const output = bv.split(pattern, 2);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["foo,,bar"]);
    }

    @test
    public split_multiByteViewWithByteAlign_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("foo,,bar", StringType.Latin1);
        const pattern = ByteVector.fromString("0,,0", StringType.Latin1)
            .subarray(1, 2);

        // Act
        const output = bv.split(pattern, 2);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["foo,,bar"]);
    }

    @test
    public split_multiByteViewWithByteAlignOnView_noMatch() {
        // Arrange
        const bv = ByteVector.fromString("Afoo,,barA", StringType.Latin1)
            .subarray(1, 8);
        const pattern = ByteVector.fromString("0,,0", StringType.Latin1)
            .subarray(1, 2);

        // Act
        const output = bv.split(pattern, 2);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["foo,,bar"]);
    }

    @test
    public split_multiByteWithByteAlign_match() {
        // Arrange
        const bv = ByteVector.fromString("0foo,,bar", StringType.Latin1);
        const pattern = ByteVector.fromString(",,", StringType.Latin1);

        // Act
        const output = bv.split(pattern, 2);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["0foo", "bar"]);
    }

    @test
    public split_multiByteWithByteAlignOnView_match() {
        // Arrange
        const bv = ByteVector.fromString(" 0foo,,bar ", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString(",,", StringType.Latin1);

        // Act
        const output = bv.split(pattern, 2);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["0foo", "bar"]);
    }

    @test
    public split_multiByteViewWithByteAlign_match() {
        // Arrange
        const bv = ByteVector.fromString("0foo,,bar", StringType.Latin1);
        const pattern = ByteVector.fromString(" ,, ", StringType.Latin1)
            .subarray(1, 2);

        // Act
        const output = bv.split(pattern, 2);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["0foo", "bar"]);
    }

    @test
    public split_multiByteViewWithByteAlignOnView_match() {
        // Arrange
        const bv = ByteVector.fromString(" 0foo,,bar ", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString(" ,, ", StringType.Latin1)
            .subarray(1, 2);

        // Act
        const output = bv.split(pattern, 2);

        // Assert
        ByteVector_MethodTests.verifySplitOutput(output, ["0foo", "bar"]);
    }

    @test
    public startsWith_invalidParam() {
        // Arrange
        const bv = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { bv.startsWith(v); });
    }

    @test
    public startsWith_startsWith() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("foo", StringType.Latin1);

        // Act / Assert
        assert.isTrue(bv.startsWith(pattern));
    }

    @test
    public startsWith_doesNotStartWith() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("fux", StringType.Latin1);

        // Act / Assert
        assert.isFalse(bv.startsWith(pattern));
    }

    @test
    public startsWith_viewStartsWith() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("foo", StringType.Latin1);

        // Act / Assert
        assert.isTrue(bv.startsWith(pattern));
    }

    @test
    public startsWith_viewDoesNotStartsWith() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("bux", StringType.Latin1);

        // Act / Assert
        assert.isFalse(bv.startsWith(pattern));
    }

    @test
    public startsWith_startsWithView() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("0foo0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.isTrue(bv.startsWith(pattern));
    }

    @test
    public startsWith_doesNotStartsWithView() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const pattern = ByteVector.fromString("0fux0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.isFalse(bv.startsWith(pattern));
    }

    @test
    public startsWith_viewStartsWithView() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("0foo0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.isTrue(bv.startsWith(pattern));
    }

    @test
    public startsWith_viewDoesNotStartWithView() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);
        const pattern = ByteVector.fromString("0fux0", StringType.Latin1)
            .subarray(1, 3);

        // Act / Assert
        assert.isFalse(bv.startsWith(pattern));
    }

    @test
    public subarray_invalidParameters() {
        // Arrange
        const bv = ByteVector.fromSize(1);

        // Act / Assert
        Testers.testSafeUint((v) => bv.subarray(v, 1));
        Testers.testSafeUint((v) => bv.subarray(0, v), Allow.Undefined);
    }

    @test
    public subarray_entireVector() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);

        // Act
        const output = bv.subarray(0);

        // Assert
        assert.notStrictEqual(output, bv);
        assert.strictEqual(output.length, bv.length);
        assert.isFalse(output.isEmpty);
        assert.isFalse(output.isReadOnly);
        assert.isFalse(output.isView); // Should be false b/c bounds are the same
        assert.deepEqual(output["_bytes"], bv["_bytes"]);
    }

    @test
    public subarray_partialVector() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);

        // Act
        const output = bv.subarray(3, 3);

        // Assert
        assert.strictEqual(output.length, 3);
        assert.isFalse(output.isEmpty);
        assert.isFalse(output.isReadOnly);
        assert.isTrue(output.isView);
        assert.deepEqual(output["_bytes"], ByteVector.fromString("bar", StringType.Latin1)["_bytes"]);
    }

    @test
    public subarray_emptyVector() {
        // Arrange
        const bv = ByteVector.fromString("foobarbaz", StringType.Latin1);

        // Act
        const output = bv.subarray(3, 0);

        // Assert
        assert.strictEqual(output.length, 0);
        assert.isTrue(output.isEmpty);
        assert.isFalse(output.isReadOnly);
        assert.isTrue(output.isView);
        assert.deepEqual(output["_bytes"], new Uint8Array(0));
    }

    @test
    public subarray_ofView() {
        // Arrange
        const bv = ByteVector.fromString("0foobarbaz0", StringType.Latin1)
            .subarray(1, 9);

        // Act
        const output = bv.subarray(3, 3);

        // Assert
        assert.strictEqual(output.length, 3);
        assert.isFalse(output.isEmpty);
        assert.isFalse(output.isReadOnly);
        assert.isTrue(output.isView);
        assert.deepEqual(output["_bytes"], ByteVector.fromString("bar", StringType.Latin1)["_bytes"]);
    }

    private static verifySplitOutput(output: ByteVector[], expected: string[]) {
        assert.isOk(output);
        assert.strictEqual(output.length, expected.length);
        for (let i = 0; i < expected.length; i++) {
            Testers.bvEqual(output[i], ByteVector.fromString(expected[i], StringType.Latin1));
        }
    }
}
