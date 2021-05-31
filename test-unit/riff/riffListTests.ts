import * as Chai from "chai";
import {suite, test} from "mocha-typescript";
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
        assert.strictEqual(list.stringType, StringType.UTF8);
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
        assert.strictEqual(list.stringType, StringType.UTF8);
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
        assert.strictEqual(list.stringType, StringType.UTF8);

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
}
