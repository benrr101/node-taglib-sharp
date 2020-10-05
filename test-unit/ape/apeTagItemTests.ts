import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {suite, test} from "mocha-typescript";

import {ApeTagItem, ApeTagItemType} from "../../src/ape/apeTagItem";
import {ByteVector, StringType} from "../../src/byteVector";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class ApeTagItemTests_ConstructorTests {
    @test
    public fromBinaryValue_invalidValues() {
        // Arrange
        const bv = ByteVector.empty();

        // Act / Assert
        assert.throws(() => { ApeTagItem.fromBinaryValue(undefined, bv); });
        assert.throws(() => { ApeTagItem.fromBinaryValue(null, bv); });
        assert.throws(() => { ApeTagItem.fromBinaryValue("", undefined); });
        assert.throws(() => { ApeTagItem.fromBinaryValue("", null); });
    }

    @test
    public fromBinaryValue_notReadOnly() {
        // Arrange
        const key = "key";
        const data = ByteVector.fromSize(10);

        // Act
        const item = ApeTagItem.fromBinaryValue(key, data);

        // Assert
        assert.isOk(item);
        assert.isFalse(item.isEmpty);
        assert.isFalse(item.isReadOnly);
        assert.strictEqual(item.key, key);
        assert.strictEqual(item.size, 0);
        assert.deepStrictEqual(item.text, []);
        assert.strictEqual(item.type, ApeTagItemType.Binary);
        assert.notStrictEqual(item.value, data);
        assert.isTrue(ByteVector.equal(item.value, data));
        assert.isTrue(item.value.isReadOnly);
    }

    @test
    public fromBinaryValue_isReadOnly() {
        // Arrange
        const key = "key";
        const data = ByteVector.fromSize(10, 0x00, true);

        // Act
        const item = ApeTagItem.fromBinaryValue(key, data);

        // Assert
        assert.isOk(item);
        assert.isFalse(item.isEmpty);
        assert.isFalse(item.isReadOnly);
        assert.strictEqual(item.key, key);
        assert.strictEqual(item.size, 0);
        assert.deepStrictEqual(item.text, []);
        assert.strictEqual(item.type, ApeTagItemType.Binary);
        assert.strictEqual(item.value, data);
    }

    @test
    public fromBinaryValue_isEmpty() {
        // Arrange
        const key = "key";
        const data = ByteVector.empty();

        // Act
        const item = ApeTagItem.fromBinaryValue(key, data);

        // Assert
        assert.isTrue(item.isEmpty);
    }

    @test
    public fromData_invalidValues() {
        // Arrange
        const data = ByteVector.empty();

        // Act / Assert
        assert.throws(() => { ApeTagItem.fromData(undefined, 0); });
        assert.throws(() => { ApeTagItem.fromData(null, 0); });
        assert.throws(() => { ApeTagItem.fromData(data, -1); });
        assert.throws(() => { ApeTagItem.fromData(data, 1.23); });
        assert.throws(() => { ApeTagItem.fromData(data, Number.MAX_SAFE_INTEGER + 1); });
    }

    @test
    public fromData_tooShortOverall() {
        // Arrange
        const data = ByteVector.fromSize(11);

        // Act / Assert
        assert.throws(() => { ApeTagItem.fromData(data, 1); });
    }

    @test
    public fromData_tooShortForData() {
        // Arrange
        const data = ByteVector.concatenate(
            0x00, // Offset
            ByteVector.fromUInt(12, false), // Size,
            0x00, 0x00, 0x00, 0x00, // Flags
            ByteVector.fromString("foo", StringType.UTF8), // Key
            ByteVector.getTextDelimiter(StringType.UTF8), // End of key
            ByteVector.fromSize(5, 0x01) // Value
        );

        // Act / Assert
        assert.throws(() => { ApeTagItem.fromData(data, 1); });
    }

    @test
    public fromData_binary() {
        // Arrange
        const value = ByteVector.fromString("foobarbaz");
        const data = ByteVector.concatenate(
            0x00, // Offset
            ByteVector.fromUInt(value.length, false), // Size,
            0x03, 0x00, 0x00, 0x00, // Flags
            ByteVector.fromString("foo", StringType.UTF8), // Key
            ByteVector.getTextDelimiter(StringType.UTF8), // End of key
            value
        );

        // Act
        const item = ApeTagItem.fromData(data, 1);

        // Assert
        assert.isOk(item);
        assert.isFalse(item.isEmpty);
        assert.isTrue(item.isReadOnly);
        assert.strictEqual(item.key, "foo");
        assert.strictEqual(item.size, 21);
        assert.deepStrictEqual(item.text, []);
        assert.strictEqual(item.type, ApeTagItemType.Binary);
        assert.isTrue(ByteVector.equal(item.value, value));
    }

    @test
    public fromData_text() {
        // Arrange
        const data = ByteVector.concatenate(
            0x00, // Offset
            ByteVector.fromUInt(11, false), // Size,
            0x00, 0x00, 0x00, 0x00, // Flags
            ByteVector.fromString("foo", StringType.UTF8), // Key
            ByteVector.getTextDelimiter(StringType.UTF8), // End of key
            ByteVector.fromString("foo", StringType.UTF8), // Value1
            ByteVector.getTextDelimiter(StringType.UTF8), // End of Value1
            ByteVector.fromString("bar", StringType.UTF8), // Value2
            ByteVector.getTextDelimiter(StringType.UTF8), // End of Value2
            ByteVector.fromString("baz", StringType.UTF8), // Value3
        );

        // Act
        const item = ApeTagItem.fromData(data, 1);

        // Assert
        assert.isOk(item);
        assert.isFalse(item.isEmpty);
        assert.isFalse(item.isReadOnly);
        assert.strictEqual(item.key, "foo");
        assert.strictEqual(item.size, 23);
        assert.deepStrictEqual(item.text, ["foo", "bar", "baz"]);
        assert.strictEqual(item.type, ApeTagItemType.Text);
        assert.isNotOk(item.value);
    }

    @test
    public fromTextValues_invalidValues() {
        // Act / Assert
        assert.throws(() => { ApeTagItem.fromTextValues(undefined, ""); });
        assert.throws(() => { ApeTagItem.fromTextValues(null, "", ""); });
    }

    @test
    public fromTextValues_validValues() {
        // Arrange
        const key = "key";
        const data = ["", "foo", "bar"];

        // Act
        const item = ApeTagItem.fromTextValues(key, ...data);

        // Assert
        assert.isOk(item);
        assert.isFalse(item.isEmpty);
        assert.isFalse(item.isReadOnly);
        assert.strictEqual(item.key, key);
        assert.strictEqual(item.size, 0);
        assert.notStrictEqual(item.text, data);
        assert.deepStrictEqual(item.text, data);
        assert.strictEqual(item.type, ApeTagItemType.Text);
        assert.isNotOk(item.value);
    }

    @test
    public fromTextValues_isEmpty() {
        // Arrange
        const key = "key";

        // Act
        const item = ApeTagItem.fromTextValues(key);

        // Assert
        assert.isTrue(item.isEmpty);
    }
}

@suite class ApeTagItemTests_MethodTests {
    @test
    public clone_binary() {
        // Arrange
        const key = "key";
        const data = ByteVector.fromSize(10, 0x00, true);
        const item = ApeTagItem.fromBinaryValue(key, data);

        // Act
        const clone = item.clone();

        // Assert
        assert.isOk(clone);
        assert.isFalse(clone.isEmpty);
        assert.isFalse(clone.isReadOnly);
        assert.strictEqual(clone.key, key);
        assert.strictEqual(clone.size, 0);
        assert.deepStrictEqual(clone.text, []);
        assert.strictEqual(clone.type, ApeTagItemType.Binary);
        assert.notStrictEqual(clone.value, data);
        assert.isTrue(ByteVector.equal(clone.value, data));
    }

    @test
    public clone_text() {
        // Arrange
        const key = "key";
        const data = ["", "foo", "bar"];
        const item = ApeTagItem.fromTextValues(key, ...data);

        // Act
        const clone = item.clone();

        // Assert
        assert.isOk(clone);
        assert.isFalse(clone.isEmpty);
        assert.isFalse(clone.isReadOnly);
        assert.strictEqual(clone.key, key);
        assert.strictEqual(clone.size, 0);
        assert.notStrictEqual(clone.text, data);
        assert.deepStrictEqual(clone.text, data);
        assert.strictEqual(clone.type, ApeTagItemType.Text);
        assert.isNotOk(clone.value);
    }

    @test
    public render_empty() {
        // Arrange
        const key = "key";
        const data = ByteVector.empty();
        const item = ApeTagItem.fromBinaryValue(key, data);

        // Act
        const output = item.render();

        // Assert
        assert.isOk(output);
        assert.isTrue(output.isEmpty);
    }

    @test
    public render_binary() {
        // Arrange
        const value = ByteVector.fromString("foobarbaz");
        const data = ByteVector.concatenate(
            ByteVector.fromUInt(value.length, false), // Size,
            0x03, 0x00, 0x00, 0x00, // Flags
            ByteVector.fromString("foo", StringType.UTF8), // Key
            ByteVector.getTextDelimiter(StringType.UTF8), // End of key
            value
        );
        const item = ApeTagItem.fromData(data, 0);

        // Act
        const output = item.render();

        // Assert
        assert.isOk(output);
        assert.isTrue(ByteVector.equal(output, data));
    }

    @test
    public render_text() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromUInt(11, false), // Size,
            0x00, 0x00, 0x00, 0x00, // Flags
            ByteVector.fromString("foo", StringType.UTF8), // Key
            ByteVector.getTextDelimiter(StringType.UTF8), // End of key
            ByteVector.fromString("foo", StringType.UTF8), // Value1
            ByteVector.getTextDelimiter(StringType.UTF8), // End of Value1
            ByteVector.fromString("bar", StringType.UTF8), // Value2
            ByteVector.getTextDelimiter(StringType.UTF8), // End of Value2
            ByteVector.fromString("baz", StringType.UTF8), // Value3
        );
        const item = ApeTagItem.fromData(data, 0);

        // Act
        const output = item.render();

        // Assert
        assert.isOk(output);
        assert.isTrue(ByteVector.equal(output, data));
    }

    @test
    public toString_binary() {
        // Arrange
        const item = ApeTagItem.fromBinaryValue("key", ByteVector.fromSize(10));

        // Act
        const result = item.toString();

        // Assert
        assert.isUndefined(result);
    }

    @test
    public toString_text() {
        // Arrange
        const item = ApeTagItem.fromTextValues("key", "foo", "bar", "baz");

        // Act
        const result = item.toString();

        // Assert
        assert.strictEqual(result, "foo, bar, baz");
    }
}
