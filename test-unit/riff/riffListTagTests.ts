import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import RiffList from "../../src/riff/riffList";
import RiffListTag from "../../src/riff/riffListTag";
import {ByteVector, StringType} from "../../src/byteVector";
import {TagTypes} from "../../src/tag";
import {Testers} from "../utilities/testers";

@suite
class Riff_RiffListTagTests {
    @test
    public getValueAsStrings_invalidKey() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());

        // Act / Assert
        Testers.testTruthy<string>((v) => tag.getValuesAsStrings(v));
        assert.throws(() => tag.getValuesAsStrings("FOO"));
        assert.throws(() => tag.getValuesAsStrings("FOOOO"));
    }

    @test
    public getValueAsStrings_keyExists() {
        // Arrange
        const list = Riff_RiffListTagTests.getTestList();
        list.setValues("TXT1", [
            ByteVector.fromString("foobar", StringType.UTF16BE),
            ByteVector.fromString("fuxbux", StringType.UTF16BE),
            ByteVector.empty()
        ]);
        const tag = new TestRiffListTag(list);

        // Act
        tag.stringType = StringType.UTF16BE;
        const result = tag.getValuesAsStrings("TXT1");

        // Assert
        assert.strictEqual(tag.stringType, StringType.UTF16BE);
        assert.sameOrderedMembers(result, ["foobar", "fuxbux", ""]);
    }

    @test
    public getValueAsStrings_KeyDoesNotExist() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());

        // Act
        const result = tag.getValuesAsStrings("FOOO");

        // Assert
        assert.isOk(result);
        assert.isEmpty(result);
    }

    @test
    public getValueAsUint_invalidKey() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());

        // Act / Assert
        Testers.testTruthy<string>((v) => tag.getValueAsUint(v));
        assert.throws(() => tag.getValueAsUint("FOO"));
        assert.throws(() => tag.getValueAsUint("FOOOO"));
    }

    @test
    public getValueAsUint_keyExists() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());

        // Act
        const result = tag.getValueAsUint("TXT3");

        // Assert
        assert.strictEqual(result, 234);
    }

    @test
    public getValueAsUint_keyExistsButValueNotNumeric() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());

        // Act
        const result = tag.getValueAsUint("TXT2");

        // Assert
        assert.strictEqual(result, 0);
    }

    @test
    public getValueAsUint_keyDoesNotExist() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());

        // Act
        const result = tag.getValueAsUint("FOO ");

        // Assert
        assert.strictEqual(result, 0);
    }

    @test
    public removeValue_invalidKey() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());

        // Act / Assert
        Testers.testTruthy<string>((v) => tag.removeValue(v));
        assert.throws(() => tag.removeValue("FOO"));
        assert.throws(() => tag.removeValue("FOOOO"));
    }

    @test
    public removeValue_keyDoesNotExist() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());

        // Act / Assert
        tag.removeValue("FOO1");

        // Assert
        assert.strictEqual(tag.list.valueCount, 3);
    }

    @test
    public removeValue_keyExists() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());

        // Act
        tag.removeValue("TXT3");

        // Assert
        assert.strictEqual(tag.list.valueCount, 2);

        const result = tag.getValues("TXT3");
        assert.isOk(result);
        assert.isEmpty(result);
    }

    @test
    public setValueFromUint_invalidKey() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());

        // Act / Assert
        Testers.testTruthy<string>((v) => tag.setValueFromUint(v, 123));
        assert.throws(() => tag.setValueFromUint("FOO", 123));
        assert.throws(() => tag.setValueFromUint("FOOOO", 123));
    }

    @test
    public setValueFromUint_invalidValues() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());

        // Act / Assert
        Testers.testUint((v) => tag.setValueFromUint("FOOO", v));
    }

    @test
    public setValueFromUint_keyExists() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());

        // Act
        tag.setValueFromUint("TXT1", 888);

        // Assert
        assert.strictEqual(tag.getValueAsUint("TXT1"), 888);
    }

    @test
    public setValueFromUint_keyDoesNotExist() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());
        const originalLength = tag.list.valueCount;

        // Act
        tag.setValueFromUint("NUM1", 888);

        // Assert
        assert.strictEqual(tag.list.valueCount, originalLength + 1);
    }

    @test
    public setValueFromUint_removesValue() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());
        const originalLength = tag.list.valueCount;

        // Act
        tag.setValueFromUint("TXT1", 0);

        // Assert
        assert.strictEqual(tag.list.valueCount, originalLength - 1);
        assert.isEmpty(tag.getValues("TXT1"));
    }

    @test
    public setValuesFromStrings_invalidKey() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());
        const data = [""];

        // Act / Assert
        Testers.testTruthy<string>((v) => tag.setValuesFromStrings(v, data));
        assert.throws(() => tag.setValuesFromStrings("FOO", data));
        assert.throws(() => tag.setValuesFromStrings("FOOOO", data));
    }

    @test
    public setValuesFromStrings_keyDoesNotExist() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());
        const originalLength = tag.list.valueCount;

        // Act
        tag.setValuesFromStrings("FOOO", ["foo", "barbaz"]);

        // Assert
        assert.strictEqual(tag.list.valueCount, originalLength + 1);
        assert.sameOrderedMembers(tag.getValuesAsStrings("FOOO"), ["foo", "barbaz"]);
    }

    @test
    public setValuesFromStrings_keyExists() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());

        // Act
        tag.setValuesFromStrings("TXT1", ["fux", "buxqux"]);

        // Assert
        assert.sameOrderedMembers(tag.getValuesAsStrings("TXT1"), ["fux", "buxqux"]);
    }

    @test
    public setValuesFromStrings_removesValue() {
        // Arrange
        const tag = new TestRiffListTag(Riff_RiffListTagTests.getTestList());
        const originalLength = tag.list.valueCount;

        // Act
        tag.setValuesFromStrings("TXT1", undefined);

        // Assert
        assert.strictEqual(tag.list.valueCount, originalLength - 1);
        assert.isEmpty(tag.getValues("TXT1"));
    }

    private static readonly data1 = ByteVector.fromString("foo", undefined, undefined, true);
    private static readonly data2 = ByteVector.fromString("barbaz", undefined, undefined, true);
    private static readonly data3 = ByteVector.fromString("buxfux", undefined, undefined, true);
    private static readonly data4 = ByteVector.fromString("nan", undefined, undefined, false);
    private static readonly data5 = ByteVector.fromString("234", undefined, undefined, false);

    private static getTestList(): RiffList {
        const list = RiffList.fromEmpty("TEST");
        list.setValues("TXT1", [Riff_RiffListTagTests.data1, Riff_RiffListTagTests.data2]);
        list.setValues("TXT2", [Riff_RiffListTagTests.data3]);
        list.setValues("TXT3", [Riff_RiffListTagTests.data4, Riff_RiffListTagTests.data5]);

        return list;
    }
}

class TestRiffListTag extends RiffListTag {
    public constructor(list: RiffList) {
        super(list);
    }

    public get tagTypes(): TagTypes { return TagTypes.AllTags; }
}
