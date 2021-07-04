import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";
import {Mock} from "typemoq";

import RiffList from "../../src/riff/riffList";
import TestFile from "../utilities/testFile";
import {ByteVector, StringType} from "../../src/byteVector";
import {File} from "../../src/File";
import {Testers} from "../utilities/testers";

// Setup chai
const assert = Chai.assert;

const data1 = ByteVector.fromString("foo", undefined, undefined, true);
const data2 = ByteVector.fromString("barbaz", undefined, undefined, true);
const data3 = ByteVector.fromString("buxfux", undefined, undefined, true);
const data4 = ByteVector.fromString("nan", undefined, undefined, false);
const data5 = ByteVector.fromString("234", undefined, undefined, false);
const sampleData = ByteVector.concatenate(
        ByteVector.fromString("TXT1"),
        ByteVector.fromUInt(data1.length, false),
        data1, 0x00,
        ByteVector.fromString("TXT1"),
        ByteVector.fromUInt(data2.length, false),
        data2,
        ByteVector.fromString("TXT2"),
        ByteVector.fromUInt(data3.length, false),
        data3,
        ByteVector.fromString("TXT3"),
        ByteVector.fromUInt(data4.length, false),
        data4, 0x00,
        ByteVector.fromString("TXT3"),
        ByteVector.fromUInt(data5.length, false),
        data5, 0x00
    );

@suite class RiffList_ConstructorTests {
    @test
    public fromData_invalidValue() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => RiffList.fromData(v));
    }

    @test
    public fromData_emptyList() {
        // Arrange
        const data = ByteVector.fromSize(7);

        // Act
        const list = RiffList.fromData(data);

        // Assert
        assert.isOk(list);
        assert.strictEqual(list.length, 0);
    }

    @test
    public fromData_listWithValues() {
        // Act
        const list = RiffList.fromData(sampleData);

        // Assert
        this.verifySample(list);
    }

    @test
    public fromFile_invalidValue() {
        // Arrange
        const mockFile = Mock.ofType<File>();
        mockFile.setup((f) => f.length).returns(() => 10);

        // Act / Assert
        Testers.testTruthy((v: File) => RiffList.fromFile(v, 0, 0));
        Testers.testSafeUint((v) => RiffList.fromFile(mockFile.object, v, 0));
        Testers.testUint((v) => RiffList.fromFile(mockFile.object, 0, v));
        assert.throws(() => RiffList.fromFile(mockFile.object, 123, 5));
    }

    @test
    public fromFile_emptyList() {
        // Arrange
        const data = ByteVector.fromSize(8);
        const mockFile = TestFile.getFile(data);

        // Act
        const list = RiffList.fromFile(mockFile, 1, 7);

        // Assert
        assert.isOk(list);
        assert.strictEqual(list.length, 0);
    }

    @test
    public fromFile_listWithValues() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10),
            sampleData
        );
        const mockFile = TestFile.getFile(data);

        // Act
        const list = RiffList.fromFile(mockFile, 10, sampleData.length);

        // Assert
        this.verifySample(list);
    }

    private verifySample(list: RiffList): void {
        assert.isOk(list);
        assert.strictEqual(list.length, 3);

        const txt1 = list.getValues("TXT1");
        assert.isOk(txt1);
        assert.isTrue(ByteVector.equal(txt1[0], data1));
        assert.isTrue(ByteVector.equal(txt1[1], data2));

        const txt2 = list.getValues("TXT2");
        assert.isOk(txt2);
        assert.isTrue(ByteVector.equal(txt2[0], data3));

        const txt3 = list.getValues("TXT3");
        assert.isOk(txt3);
        assert.isTrue(ByteVector.equal(txt3[0], data4));
        assert.isTrue(ByteVector.equal(txt3[1], data5));
    }
}

@suite class RiffList_MethodTests {
    @test
    public clear() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        list.clear();

        // Assert
        assert.strictEqual(list.length, 0);
    }

    @test
    public containsKey_keyExists() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        const result = list.containsKey("TXT1");

        // Assert
        assert.isTrue(result);
    }

    @test
    public containsKey_keyDoesNotExist() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        const result = list.containsKey("FUX ");

        // Assert
        assert.isFalse(result);
    }

    @test
    public getValues_invalidKey() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act / Assert
        Testers.testTruthy<string>((v) => list.getValues(v));
        assert.throws(() => list.getValues("FOO"));
        assert.throws(() => list.getValues("FOOOO"));
    }

    @test
    public getValues_keyExists() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        const result = list.getValues("TXT2");

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.length, 1);
        assert.isTrue(ByteVector.equal(result[0], data3));
    }

    @test
    public getValues_keyDoesNotExist() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        const result = list.getValues("FOO ");

        // Assert
        assert.isOk(result);
        assert.isEmpty(result);
    }

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
    public render_hasValues() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        const result = list.render();

        // Assert
        assert.isTrue(ByteVector.equal(result, sampleData));
    }

    @test
    public render_noValues() {
        // Arrange
        const list = RiffList.fromData(ByteVector.empty());

        // Act
        const result = list.render();

        // Assert
        assert.isOk(result);
        assert.isTrue(result.isEmpty);
    }

    @test
    public renderEnclosed_invalidId() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act/Assert
        Testers.testTruthy<string>((v) => list.renderEnclosed(v));
        assert.throws(() => list.renderEnclosed("FOO"));
        assert.throws(() => list.renderEnclosed("FOOOO"));
    }

    @test
    public renderEnclosed_empty() {
        // Arrange
        const list = RiffList.fromData(ByteVector.empty());

        // Act
        const result = list.renderEnclosed("FOOO");

        // Assert
        assert.isOk(result);
        assert.isTrue(result.isEmpty);
    }

    @test
    public renderEnclosed_hasValues() {
        // Arrange
        const list = RiffList.fromData(sampleData);

        // Act
        const result = list.renderEnclosed("FOOO");

        // Assert
        const expected = ByteVector.concatenate(
            ByteVector.fromString("LIST"),
            ByteVector.fromUInt(sampleData.length + 4, false),
            ByteVector.fromString("FOOO"),
            sampleData
        );
        assert.isOk(result);
        assert.isTrue(ByteVector.equal(result, expected));
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
    public setValues_invalidKey() {
        // Arrange
        const list = RiffList.fromData(sampleData);
        const data = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy<string>((v) => list.setValues(v, data));
        assert.throws(() => list.setValues("FOO", data));
        assert.throws(() => list.setValues("FOOOO", data));
    }

    @test
    public setValues_keyDoesNotExist() {
        // Arrange
        const list = RiffList.fromData(sampleData);
        const data = ByteVector.fromString("foobarbaz");
        const originalLength = list.length;

        // Act
        list.setValues("FOOO", data, data);

        // Assert
        assert.strictEqual(list.length, originalLength + 1);
        assert.sameMembers(list.getValues("FOOO"), [data, data]);
    }

    @test
    public setValues_keyExists() {
        // Arrange
        const list = RiffList.fromData(sampleData);
        const data = ByteVector.fromString("foobarbaz");

        // Act
        list.setValues("TXT1", data, data);

        // Assert
        assert.sameMembers(list.getValues("TXT1"), [data, data]);
    }

    @test
    public setValues_removesValue() {
        // Arrange
        const list = RiffList.fromData(sampleData);
        const originalLength = list.length;

        // Act
        list.setValues("TXT1");

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
