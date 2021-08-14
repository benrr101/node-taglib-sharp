import {test} from "@testdeck/mocha";
import RiffList from "../../src/riff/riffList";
import {Testers} from "../utilities/testers";
import {ByteVector} from "../../src";

class Riff_RiffListTagTests {
    @test
    public getValueAsStrings_invalidKey() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act / Assert
        Testers.testTruthy<string>((v) => list.getValuesAsStrings(v));
        assert.throws(() => list.getValuesAsStrings("FOO"));
        assert.throws(() => list.getValuesAsStrings("FOOOO"));
    }

    @test
    public getValueAsStrings_keyExists() {
        // Arrange
        const strData1 = ByteVector.fromString("foobar", StringType.UTF16BE);
        const strData2 = ByteVector.fromString("fuxbux", StringType.UTF16BE);
        const data = ByteVector.concatenate(
            ByteVector.fromString("TXT1"),
            ByteVector.fromUInt(strData1.length, false),
            strData1,
            ByteVector.fromString("TXT1"),
            ByteVector.fromUInt(strData2.length, false),
            strData2,
            ByteVector.fromString("TXT1"),
            ByteVector.fromUInt(0, false)
        );
        const list = RiffList.fromData(data);

        // Act
        list.stringType = StringType.UTF16BE;
        const result = list.getValuesAsStrings("TXT1");

        // Assert
        assert.strictEqual(list.stringType, StringType.UTF16BE);
        assert.sameOrderedMembers(result, ["foobar", "fuxbux", ""]);
    }

    @test
    public getValueAsStrings_KeyDoesNotExist() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        const result = list.getValuesAsStrings("FOOO");

        // Assert
        assert.isOk(result);
        assert.isEmpty(result);
    }

    @test
    public getValueAsUint_invalidKey() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act / Assert
        Testers.testTruthy<string>((v) => list.getValueAsUint(v));
        assert.throws(() => list.getValueAsUint("FOO"));
        assert.throws(() => list.getValueAsUint("FOOOO"));
    }

    @test
    public getValueAsUint_keyExists() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        const result = list.getValueAsUint("TXT3");

        // Assert
        assert.strictEqual(result, 234);
    }

    @test
    public getValueAsUint_keyExistsButValueNotNumeric() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        const result = list.getValueAsUint("TXT2");

        // Assert
        assert.strictEqual(result, 0);
    }

    @test
    public getValueAsUint_keyDoesNotExist() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        const result = list.getValueAsUint("FOO ");

        // Assert
        assert.strictEqual(result, 0);
    }

    @test
    public removeValue_invalidKey() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act / Assert
        Testers.testTruthy<string>((v) => list.removeValue(v));
        assert.throws(() => list.removeValue("FOO"));
        assert.throws(() => list.removeValue("FOOOO"));
    }

    @test
    public removeValue_keyDoesNotExist() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act / Assert
        list.removeValue("FOO1");

        // Assert
        assert.strictEqual(list.length, 3);
    }

    @test
    public removeValue_keyExists() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        list.removeValue("TXT3");

        // Assert
        assert.strictEqual(list.length, 2);
        assert.isTrue(list.containsKey("TXT1"));
        assert.isTrue(list.containsKey("TXT2"));
    }

    @test
    public setValueFromUint_invalidKey() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act / Assert
        Testers.testTruthy<string>((v) => list.setValueFromUint(v, 123));
        assert.throws(() => list.setValueFromUint("FOO", 123));
        assert.throws(() => list.setValueFromUint("FOOOO", 123));
    }

    @test
    public setValueFromUint_invalidValues() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act / Assert
        Testers.testUint((v) => list.setValueFromUint("FOOO", v));
    }

    @test
    public setValueFromUint_keyExists() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        list.setValueFromUint("TXT1", 888);

        // Assert
        assert.strictEqual(list.getValueAsUint("TXT1"), 888);
    }

    @test
    public setValueFromUint_keyDoesNotExist() {
        // Arrange
        const list = RiffList.fromData(sampleData);
        const originalLength = list.length;

        // Act
        list.setValueFromUint("NUM1", 888);

        // Assert
        assert.strictEqual(list.length, originalLength + 1);
    }

    @test
    public setValueFromUint_removesValue() {
        // Arrange
        const list = RiffList.fromData(sampleData);
        const originalLength = list.length;

        // Act
        list.setValueFromUint("TXT1", 0);

        // Assert
        assert.strictEqual(list.length, originalLength - 1);
        assert.isEmpty(list.getValues("TXT1"));
    }

    @test
    public setValuesFromStrings_invalidKey() {
        // Arrange
        const list = RiffList.fromData(sampleData);
        const data = "";

        // Act / Assert
        Testers.testTruthy<string>((v) => list.setValuesFromStrings(v, data));
        assert.throws(() => list.setValuesFromStrings("FOO", data));
        assert.throws(() => list.setValuesFromStrings("FOOOO", data));
    }

    @test
    public setValuesFromStrings_keyDoesNotExist() {
        // Arrange
        const list = RiffList.fromData(sampleData);
        const originalLength = list.length;

        // Act
        list.setValuesFromStrings("FOOO", "foo", "barbaz");

        // Assert
        assert.strictEqual(list.length, originalLength + 1);
        assert.sameOrderedMembers(list.getValuesAsStrings("FOOO"), ["foo", "barbaz"]);
    }

    @test
    public setValuesFromStrings_keyExists() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        list.setValuesFromStrings("TXT1", "fux", "buxqux");

        // Assert
        assert.sameOrderedMembers(list.getValuesAsStrings("TXT1"), ["fux", "buxqux"]);
    }

    @test
    public setValuesFromStrings_removesValue() {
        // Arrange
        const list = RiffList.fromData(sampleData);
        const originalLength = list.length;

        // Act
        list.setValuesFromStrings("TXT1");

        // Assert
        assert.strictEqual(list.length, originalLength - 1);
        assert.isEmpty(list.getValues("TXT1"));
    }
}