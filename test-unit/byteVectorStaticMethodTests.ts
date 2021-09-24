import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import {ByteVector} from "../src/byteVector";
import {Testers} from "./utilities/testers";

// Setup chai
const assert = Chai.assert;

@suite class ByteVector_StaticMethodTests {
    @test
    public add_invalidParameters() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act/Assert
        Testers.testTruthy((v: ByteVector) => { ByteVector.add(v, bv); });
        Testers.testTruthy((v: ByteVector) => { ByteVector.add(bv, v); });
    }

    @test
    public add_addEmptyAndEmpty() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act
        const result = ByteVector.add(bv, bv);

        // Assert
        assert.isOk(result);
        assert.notEqual(result, bv);            // Make sure we got a new byte vector
        assert.isFalse(result.isReadOnly);
        assert.isTrue(result.isEmpty);
        assert.strictEqual(result.length, 0);
        assert.deepEqual(result.data, new Uint8Array([]));
    }

    @test
    public add_addSomethingAndEmpty() {
        // Arrange
        const something = ByteVector.fromSize(1, 0x00);
        const empty = ByteVector.fromSize(0);

        // Act
        const result = ByteVector.add(something, empty);

        // Assert
        assert.isOk(result);
        assert.notEqual(result, something);            // Make sure we got a new byte vector
        assert.notEqual(result, empty);
        assert.isFalse(result.isReadOnly);
        assert.isFalse(result.isEmpty);
        assert.strictEqual(result.length, 1);
        assert.deepEqual(result.data, new Uint8Array([0x00]));
    }

    @test
    public add_addEmptyAndSomething() {
        // Arrange
        const something = ByteVector.fromSize(1, 0x00);
        const empty = ByteVector.fromSize(0);

        // Act
        const result = ByteVector.add(empty, something);

        // Assert
        assert.isOk(result);
        assert.notEqual(result, something);            // Make sure we got a new byte vector
        assert.notEqual(result, empty);
        assert.isFalse(result.isReadOnly);
        assert.isFalse(result.isEmpty);
        assert.strictEqual(result.length, 1);
        assert.deepEqual(result.data, new Uint8Array([0x00]));
    }

    @test
    public equal_add_addSomethingAndSomething() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x03, 0x04]));

        // Act
        const result1 = ByteVector.add(bv1, bv2);
        const result2 = ByteVector.add(bv2, bv1);

        // Assert
        assert.isOk(result1);
        assert.isFalse(result1.isReadOnly);
        assert.isFalse(result1.isEmpty);
        assert.strictEqual(result1.length, 4);
        assert.deepEqual(result1.data, new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        assert.isOk(result2);
        assert.isFalse(result2.isReadOnly);
        assert.isFalse(result2.isEmpty);
        assert.strictEqual(result2.length, 4);
        assert.deepEqual(result2.data, new Uint8Array([0x03, 0x04, 0x01, 0x02]));
    }

    @test
    public equal_bothNullUndefined() {
        // Arrange, Act, Assert
        assert.isTrue(ByteVector.equal(undefined, undefined));
        assert.isTrue(ByteVector.equal(null, null));
    }

    @test
    public equal_mixedNullUndefined() {
        // Arrange, Act, Assert
        assert.isFalse(ByteVector.equal(undefined, null));
        assert.isFalse(ByteVector.equal(null, undefined));
    }

    @test
    public equal_mixedFalsySomething() {
        // Arrange
        const bv = ByteVector.fromSize(1);

        // Act, Assert
        assert.isFalse(ByteVector.equal(undefined, bv));
        assert.isFalse(ByteVector.equal(bv, undefined));
        assert.isFalse(ByteVector.equal(null, bv));
        assert.isFalse(ByteVector.equal(bv, null));
    }

    @test
    public equal_equal() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        Testers.bvEqual(bv1, bv2);
    }

    @test
    public equal_notEqual() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x03, 0x04]));

        // Act, Assert
        assert.isFalse(ByteVector.equal(bv1, bv2));
    }

    @test
    public notEqual_bothNullUndefined() {
        // Arrange, Act, Assert
        assert.isFalse(ByteVector.notEqual(undefined, undefined));
        assert.isFalse(ByteVector.notEqual(null, null));
    }

    @test
    public notEqual_mixedNullUndefined() {
        // Arrange, Act, Assert
        assert.isTrue(ByteVector.notEqual(undefined, null));
        assert.isTrue(ByteVector.notEqual(null, undefined));
    }

    @test
    public notEqual_mixedFalsySomething() {
        // Arrange
        const bv = ByteVector.fromSize(1);

        // Act, Assert
        assert.isTrue(ByteVector.notEqual(undefined, bv));
        assert.isTrue(ByteVector.notEqual(bv, undefined));
        assert.isTrue(ByteVector.notEqual(null, bv));
        assert.isTrue(ByteVector.notEqual(bv, null));
    }

    @test
    public notEqual_equal() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.notEqual(bv1, bv2));
    }

    @test
    public notEqual_notEqual() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x03, 0x04]));

        // Act, Assert
        assert.isTrue(ByteVector.notEqual(bv1, bv2));
    }

    @test
    public greaterThan_invalidParameters() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act, Assert
        Testers.testTruthy((v: ByteVector) => { ByteVector.greaterThan(v, bv); });
        Testers.testTruthy((v: ByteVector) => { ByteVector.greaterThan(bv, v); });
    }

    @test
    public greaterThan_greaterThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x03]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isTrue(ByteVector.greaterThan(bv1, bv2));    // bv1 > bv2 -> true
        assert.isFalse(ByteVector.greaterThan(bv2, bv1));   // bv2 > bv1 -> false
    }

    @test
    public greaterThan_lessThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x00]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.greaterThan(bv1, bv2));   // bv1 > bv2 -> false
        assert.isTrue(ByteVector.greaterThan(bv2, bv1));    // bv2 > bv1 -> true
    }

    @test
    public greaterThan_equal() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.greaterThan(bv1, bv2));   // bv1 > bv2 -> false
        assert.isFalse(ByteVector.greaterThan(bv2, bv1));   // bv2 > bv1 -> false
    }

    @test
    public greaterThanEqual_invalidParameters() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act, Assert
        Testers.testTruthy((v: ByteVector) => { ByteVector.greaterThanEqual(v, bv); });
        Testers.testTruthy((v: ByteVector) => { ByteVector.greaterThanEqual(bv, v); });
    }

    @test
    public greaterThanEqual_greaterThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x03]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isTrue(ByteVector.greaterThanEqual(bv1, bv2));    // bv1 > bv2 -> true
        assert.isFalse(ByteVector.greaterThanEqual(bv2, bv1));   // bv2 > bv1 -> false
    }

    @test
    public greaterThanEqual_lessThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x00]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.greaterThanEqual(bv1, bv2));   // bv1 > bv2 -> false
        assert.isTrue(ByteVector.greaterThanEqual(bv2, bv1));    // bv2 > bv1 -> true
    }

    @test
    public greaterThanEqual_equal() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isTrue(ByteVector.greaterThanEqual(bv1, bv2));   // bv1 > bv2 -> true
        assert.isTrue(ByteVector.greaterThanEqual(bv2, bv1));   // bv2 > bv1 -> true
    }

    @test
    public lessThan_invalidParameters() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act, Assert
        Testers.testTruthy((v: ByteVector) => { ByteVector.lessThan(v, bv); });
        Testers.testTruthy((v: ByteVector) => { ByteVector.lessThan(bv, v); });
    }

    @test
    public lessThan_greaterThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x03]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.lessThan(bv1, bv2));      // bv1 < bv2 -> false
        assert.isTrue(ByteVector.lessThan(bv2, bv1));       // bv2 < bv1 -> true
    }

    @test
    public lessThan_lessThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x00]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isTrue(ByteVector.lessThan(bv1, bv2));       // bv1 > bv2 -> false
        assert.isFalse(ByteVector.lessThan(bv2, bv1));      // bv2 < bv1 -> true
    }

    @test
    public lessThan_equal() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.lessThan(bv1, bv2));   // bv1 < bv2 -> false
        assert.isFalse(ByteVector.lessThan(bv2, bv1));   // bv2 < bv1 -> false
    }

    @test
    public lessThanEqual_invalidParameters() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act, Assert
        Testers.testTruthy((v: ByteVector) => { ByteVector.lessThanEqual(v, bv); });
        Testers.testTruthy((v: ByteVector) => { ByteVector.lessThanEqual(bv, v); });
    }

    @test
    public lessThanEqual_greaterThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x03]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.lessThanEqual(bv1, bv2));      // bv1 < bv2 -> false
        assert.isTrue(ByteVector.lessThanEqual(bv2, bv1));       // bv2 < bv1 -> true
    }

    @test
    public lessThanEqual_lessThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x00]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isTrue(ByteVector.lessThanEqual(bv1, bv2));       // bv1 > bv2 -> false
        assert.isFalse(ByteVector.lessThanEqual(bv2, bv1));      // bv2 < bv1 -> true
    }

    @test
    public lessThanEqual_equal() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isTrue(ByteVector.lessThanEqual(bv1, bv2));   // bv1 < bv2 -> true
        assert.isTrue(ByteVector.lessThanEqual(bv2, bv1));   // bv2 < bv1 -> true
    }
}
