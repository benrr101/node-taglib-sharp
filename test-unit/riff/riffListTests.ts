import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import RiffList from "../../src/riff/riffList";
import TestFile from "../utilities/testFile";
import {ByteVector, StringType} from "../../src/byteVector";
import {File} from "../../src/File";
import {Testers} from "../utilities/testers";

const data1 = ByteVector.fromString("foo", StringType.UTF8);
const data2 = ByteVector.fromString("barbaz", StringType.UTF8);
const data3 = ByteVector.fromString("buxfux", StringType.UTF8);
const data4 = ByteVector.fromString("nan", StringType.UTF8);
const data5 = ByteVector.fromString("234", StringType.UTF8);
const sampleData = ByteVector.concatenate(
    ByteVector.fromString("TXT1", StringType.UTF8),
    ByteVector.fromUint(data1.length, false),
    data1, 0x00,
    ByteVector.fromString("TXT1", StringType.UTF8),
    ByteVector.fromUint(data2.length, false),
    data2,
    ByteVector.fromString("TXT2", StringType.UTF8),
    ByteVector.fromUint(data3.length, false),
    data3,
    ByteVector.fromString("TXT3", StringType.UTF8),
    ByteVector.fromUint(data4.length, false),
    data4, 0x00,
    ByteVector.fromString("TXT3", StringType.UTF8),
    ByteVector.fromUint(data5.length, false),
    data5, 0x00
);

const sampleList = ByteVector.concatenate(
    ByteVector.fromString(RiffList.IDENTIFIER_FOURCC, StringType.UTF8),
    ByteVector.fromUint(sampleData.length + 4, false),
    ByteVector.fromString("fooo", StringType.UTF8),
    sampleData
);

const sampleNestedList = ByteVector.concatenate(
    ByteVector.fromString(RiffList.IDENTIFIER_FOURCC, StringType.UTF8),
    ByteVector.fromUint(sampleList.length + 4, false),
    ByteVector.fromString("baar", StringType.UTF8),
    sampleList
);

@suite class RiffList_ConstructorTests {
    @test
    public fromFile_invalidValue() {
        // Arrange
        const mockFile = Mock.ofType<File>();
        mockFile.setup((f) => f.length).returns(() => 10);

        // Act / Assert
        Testers.testTruthy((v: File) => RiffList.fromFile(v, 0));
        Testers.testSafeUint((v) => RiffList.fromFile(mockFile.object, v));
    }

    @test
    public fromFile_emptyList() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString(RiffList.IDENTIFIER_FOURCC, StringType.UTF8),
            ByteVector.fromUint(0, false)
        );
        const mockFile = TestFile.getFile(data);

        // Act
        const list = RiffList.fromFile(mockFile, 0);

        // Assert
        assert.isOk(list);
        assert.isFalse(list.isLoaded);
        assert.strictEqual(list.listCount, 0);
        assert.strictEqual(list.valueCount, 0);
        assert.isTrue(list.isLoaded);
    }

    @test
    public fromFile_listWithValues() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10),
            sampleList
        );
        const mockFile = TestFile.getFile(data);

        // Act
        const list = RiffList.fromFile(mockFile, 10);

        // Assert
        assert.strictEqual(list.chunkStart, 10);
        RiffList_ConstructorTests.verifySample(list);
    }

    @test
    public fromFile_listWithNestedLists() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10),
            sampleNestedList
        );
        const mockFile = TestFile.getFile(data);

        // Act
        const list = RiffList.fromFile(mockFile, 10);

        // Assert
        assert.isOk(list);
        assert.isFalse(list.isLoaded);
        assert.strictEqual(list.chunkStart, 10);
        assert.strictEqual(list.fourcc, RiffList.IDENTIFIER_FOURCC);
        assert.strictEqual(list.originalTotalSize, 88);
        assert.strictEqual(list.type, "baar");

        assert.strictEqual(list.listCount, 1);
        assert.strictEqual(list.valueCount, 0);
        assert.isTrue(list.isLoaded);

        const nestedLists = list.getLists("fooo");
        assert.strictEqual(nestedLists.length, 1);

        const nestedList = nestedLists[0];
        assert.strictEqual(nestedList.chunkStart, 10 + 12);
        RiffList_ConstructorTests.verifySample(nestedList);
    }

    private static verifySample(list: RiffList): void {
        assert.isOk(list);
        assert.isFalse(list.isLoaded);
        assert.strictEqual(list.fourcc, RiffList.IDENTIFIER_FOURCC);
        assert.strictEqual(list.originalTotalSize, 76);
        assert.strictEqual(list.type, "fooo");

        assert.strictEqual(list.valueCount, 3);
        assert.strictEqual(list.listCount, 0);
        assert.isTrue(list.isLoaded);

        const txt1 = list.getValues("TXT1");
        assert.isOk(txt1);
        Testers.bvEqual(txt1[0], data1);
        Testers.bvEqual(txt1[1], data2);

        const txt2 = list.getValues("TXT2");
        assert.isOk(txt2);
        Testers.bvEqual(txt2[0], data3);

        const txt3 = list.getValues("TXT3");
        assert.isOk(txt3);
        Testers.bvEqual(txt3[0], data4);
        Testers.bvEqual(txt3[1], data5);
    }
}

@suite class RiffList_MethodTests {
    @test
    public clear() {
        // Arrange
        const list = RiffList.fromFile(TestFile.getFile(sampleList), 0);

        // Act
        list.clear();

        // Assert
        assert.strictEqual(list.valueCount, 0);
        assert.strictEqual(list.listCount, 0);
        assert.isTrue(list.isLoaded);
    }

    @test
    public getValues_invalidKey() {
        // Arrange
        const list = RiffList.fromFile(TestFile.getFile(sampleList), 0);

        // Act / Assert
        Testers.testTruthy<string>((v) => list.getValues(v));
        assert.throws(() => list.getValues("FOO"));
        assert.throws(() => list.getValues("FOOOO"));
        assert.isFalse(list.isLoaded);
    }

    @test
    public getValues_keyWithOneValueExists() {
        // Arrange
        const list = RiffList.fromFile(TestFile.getFile(sampleList), 0);

        // Act
        const result = list.getValues("TXT2");

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.length, 1);
        Testers.bvEqual(result[0], data3);
        assert.isTrue(list.isLoaded);
    }

    @test
    public getValues_keyWithMultipleValueExists() {
        // Arrange
        const list = RiffList.fromFile(TestFile.getFile(sampleList), 0);

        // Act
        const result = list.getValues("TXT1");

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.length, 2);
        Testers.bvEqual(result[0], data1);
        Testers.bvEqual(result[1], data2);
        assert.isTrue(list.isLoaded);
    }

    @test
    public getValues_keyDoesNotExist() {
        // Arrange
        const list = RiffList.fromFile(TestFile.getFile(sampleList), 0);

        // Act
        const result = list.getValues("FOO ");

        // Assert
        assert.isOk(result);
        assert.isEmpty(result);
        assert.isTrue(list.isLoaded);
    }

    @test
    public render_hasValues() {
        // Arrange
        const list = RiffList.fromFile(TestFile.getFile(sampleList), 0);

        // Act
        const result = list.render();

        // Assert
        Testers.bvEqual(result, sampleList);
        assert.isTrue(list.isLoaded);
    }

    @test
    public render_noValues() {
        // Arrange
        const list = RiffList.fromEmpty("fooo");

        // Act
        const result = list.render();

        // Assert
        const expected = ByteVector.concatenate(
            ByteVector.fromString(RiffList.IDENTIFIER_FOURCC, StringType.UTF8),
            ByteVector.fromUint(4, false),
            ByteVector.fromString("fooo", StringType.UTF8)
        );
        assert.isOk(result);
        Testers.bvEqual(result, expected);
        assert.isTrue(list.isLoaded);
    }

    @test
    public setValues_invalidKey() {
        // Arrange
        const list = RiffList.fromFile(TestFile.getFile(sampleList), 0);
        const data = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy<string>((v) => list.setValues(v, [data]));
        assert.throws(() => list.setValues("FOO", [data]));
        assert.throws(() => list.setValues("FOOOO", [data]));
        assert.isFalse(list.isLoaded);
    }

    @test
    public setValues_keyDoesNotExist() {
        // Arrange
        const list = RiffList.fromFile(TestFile.getFile(sampleList), 0);
        const data = ByteVector.fromString("foobarbaz", StringType.UTF8);
        const originalLength = list.valueCount;

        // Act
        list.setValues("FOOO", [data, data]);

        // Assert
        assert.strictEqual(list.valueCount, originalLength + 1);
        assert.sameMembers(list.getValues("FOOO"), [data, data]);
        assert.isTrue(list.isLoaded);
    }

    @test
    public setValues_keyExists() {
        // Arrange
        const list = RiffList.fromFile(TestFile.getFile(sampleList), 0);
        const data = ByteVector.fromString("foobarbaz", StringType.UTF8);

        // Act
        list.setValues("TXT1", [data, data]);

        // Assert
        assert.sameMembers(list.getValues("TXT1"), [data, data]);
        assert.isTrue(list.isLoaded);
    }

    @test
    public setValues_removesValue() {
        // Arrange
        const list = RiffList.fromFile(TestFile.getFile(sampleList), 0);
        const originalLength = list.valueCount;

        // Act
        list.setValues("TXT1", []);

        // Assert
        assert.strictEqual(list.valueCount, originalLength - 1);
        assert.isEmpty(list.getValues("TXT1"));
        assert.isTrue(list.isLoaded);
    }
}
