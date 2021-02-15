import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as StreamBuffers from "stream-buffers";
import * as TypeMoq from "typemoq";
import TestConstants from "./testConstants";
import Testers from "./utilities/testers";
import TestStream from "./utilities/testStream";
import {suite, test} from "mocha-typescript";

import {ByteVector, StringType} from "../src/byteVector";
import {IFileAbstraction} from "../src/fileAbstraction";
import {IStream} from "../src/stream";

const AB2B = require("arraybuffer-to-buffer");

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class ByteVector_ConstructorTests {
    private testArray = new Uint8Array([0x80, 0x08, 0x50]);
    private testByteVector = ByteVector.fromByteArray(this.testArray);

    @test
    public concatenate_noData() {
        // Act
        const bv = ByteVector.concatenate();

        // Assert
        assert.ok(bv);
        assert.equal(bv.length, 0);
    }

    @test
    public concatenate_oneByte() {
        // Act
        const bv = ByteVector.concatenate(0x08);

        // Assert
        assert.ok(bv);
        assert.equal(bv.length, 1);
        assert.equal(bv.get(0), 0x08);
    }

    @test
    public concatenate_twoBytes() {
        // Act
        const bv = ByteVector.concatenate(0x80, 0x08);

        // Assert
        assert.ok(bv);
        assert.equal(bv.length, 2);
        assert.equal(bv.get(0), 0x80);
        assert.equal(bv.get(1), 0x08);
    }

    @test
    public concatenate_oneArray() {
        // Act
        const bv = ByteVector.concatenate(this.testArray);

        // Assert
        assert.ok(bv);
        assert.equal(bv.length, this.testArray.length);
        for (let i = 0; i < bv.length; i++) {
            assert.equal(bv.data[i], this.testArray[i]);
        }
    }

    @test
    public concatenate_twoArrays() {
        // Act
        const bv = ByteVector.concatenate(
            this.testArray,
            this.testArray
        );

        // Assert
        assert.ok(bv);
        assert.strictEqual(bv.length, this.testArray.length * 2);
        for (let i = 0; i < bv.length; i++) {
            assert.strictEqual(bv.data[i], this.testArray[i % this.testArray.length]);
        }
    }

    @test
    public concatenate_oneVector() {
        // Act
        const bv = ByteVector.concatenate(this.testByteVector);

        // Assert
        assert.ok(bv);
        assert.strictEqual(bv.length, this.testByteVector.length);
        for (let i = 0; i < bv.length; i++) {
            assert.strictEqual(bv.data[i], this.testByteVector.data[i]);
        }
    }

    @test
    public concatenate_twoVectors() {
        // Act
        const bv = ByteVector.concatenate(
            this.testByteVector,
            this.testByteVector
        );

        // Assert
        assert.ok(bv);
        assert.strictEqual(bv.length, this.testByteVector.length * 2);
        for (let i = 0; i < bv.length; i++) {
            assert.strictEqual(bv.data[i], this.testByteVector.data[i % this.testByteVector.length]);
        }
    }

    @test
    public empty() {
        // Act
        const bv = ByteVector.empty();

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 0);
    }

    @test
    public fromByteArray_noData() {
        // Arrange, Act, Assert
        Testers.testTruthy((v: Uint8Array) => { ByteVector.fromByteArray(v); });
    }

    @test
    public fromByteArray_emptyData() {
        // Arrange, Act
        const data = new Uint8Array();
        const bv = ByteVector.fromByteArray(data);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 0);
        assert.isTrue(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, data);
    }

    @test
    public fromByteArray_withData() {
        // Arrange, Act
        const data = new Uint8Array([0x0, 0x1, 0x2, 0x3, 0x4]);
        const bv = ByteVector.fromByteArray(data);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, data.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, data);
    }

    @test
    public fromByteArray_withLength() {
        // Arrange, Act
        const data = new Uint8Array([0x0, 0x1, 0x2, 0x3, 0x4]);
        const bv = ByteVector.fromByteArray(data, 3);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 3);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, data.slice(0, 3));
    }

    @test
    public fromByteArray_readOnly() {
        // Arrange, Act
        const data = new Uint8Array([0x0, 0x1, 0x2, 0x3, 0x4]);
        const bv = ByteVector.fromByteArray(data, undefined, true);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, data.length);
        assert.isFalse(bv.isEmpty);
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, data);
    }

    @test
    public fromByteVector_noVector() {
        // Arrange, Act, Assert
        assert.throws(() => {
            ByteVector.fromByteVector(null);
        });
        assert.throws(() => {
            ByteVector.fromByteArray(undefined);
        });
    }

    @test
    public fromByteVector_withData() {
        // Arrange, Act
        const data = new Uint8Array([0x1, 0x2]);
        const original = ByteVector.fromByteArray(data);
        const bv = ByteVector.fromByteVector(original);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, data.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, data);
    }

    @test
    public fromByteVector_readOnly() {
        // Arrange, Act
        const data = new Uint8Array([0x1, 0x2]);
        const original = ByteVector.fromByteArray(data);
        const bv = ByteVector.fromByteVector(original, true);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, data.length);
        assert.isFalse(bv.isEmpty);
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, data);
    }

    @test
    public fromFileAbstraction_badAbstraction() {
        // Act / Assert
        Testers.testTruthy((v: IFileAbstraction) => { ByteVector.fromFileAbstraction(v); });
    }

    @test
    public fromFileAbstraction() {
        // Arrange
        const bytes = new Uint8Array(TestConstants.testFileContents);
        const mockStream = new TestStream(ByteVector.fromByteArray(bytes), false);

        const mockFileAbstraction = TypeMoq.Mock.ofType<IFileAbstraction>();
        mockFileAbstraction.setup((a) => a.readStream).returns(() => mockStream);
        mockFileAbstraction.setup((a) => a.closeStream(TypeMoq.It.isAny()));

        // Act
        const bv = ByteVector.fromFileAbstraction(mockFileAbstraction.object);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, bytes.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, bytes);

        mockFileAbstraction.verify((a) => a.closeStream(TypeMoq.It.isValue(mockStream)), TypeMoq.Times.once());
    }

    @test
    public fromInt_invalid() {
        // Arrange, Act, Assert
        Testers.testInt((v: number) => { ByteVector.fromInt(v); });
    }

    @test
    public fromInt_zero_bigEndian() {
        this.testInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            undefined,
            undefined
        );
    }

    @test
    public fromInt_zero_littleEndian() {
        this.testInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            undefined,
            false
        );
    }

    @test
    public fromInt_positive1Byte_bigEndian() {
        this.testInt(
            0x12,
            [0x00, 0x00, 0x00, 0x12],
            undefined,
            undefined
        );
    }

    @test
    public fromInt_positive1Byte_littleEndian() {
        this.testInt(
            0x12,
            [0x12, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromInt_positive2Byte_bigEndian() {
        this.testInt(
            0x1234,
            [0x00, 0x00, 0x12, 0x34],
            undefined,
            undefined
        );
    }

    @test
    public fromInt_positive2Byte_littleEndian() {
        this.testInt(
            0x1234,
            [0x34, 0x12, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromInt_positive3Byte_bigEndian() {
        this.testInt(
            0x123456,
            [0x00, 0x12, 0x34, 0x56],
            undefined,
            undefined
        );
    }

    @test
    public fromInt_positive3Byte_littleEndian() {
        this.testInt(
            0x123456,
            [0x56, 0x34, 0x12, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromInt_positive4Byte_bigEndian() {
        this.testInt(
            0x12345678,
            [0x12, 0x34, 0x56, 0x78],
            undefined,
            undefined
        );
    }

    @test
    public fromInt_positive4Byte_littleEndian() {
        this.testInt(
            0x12345678,
            [0x78, 0x56, 0x34, 0x12],
            undefined,
            false
        );
    }

    @test
    public fromInt_negative1Byte_bigEndian() {
        this.testInt(
            -0x12,
            [0xFF, 0xFF, 0xFF, 0xEE],
            undefined,
            undefined
        );
    }

    @test
    public fromInt_negative1Byte_littleEndian() {
        this.testInt(
            -0x12,
            [0xEE, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromInt_negative2Byte_bigEndian() {
        this.testInt(
            -0x1234,
            [0xFF, 0xFF, 0xED, 0xCC],
            undefined,
            undefined
        );
    }

    @test
    public fromInt_negative2Byte_littleEndian() {
        this.testInt(
            -0x1234,
            [0xCC, 0xED, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromInt_negative3Byte_bigEndian() {
        this.testInt(
            -0x123456,
            [0xFF, 0xED, 0xCB, 0xAA],
            undefined,
            undefined
        );
    }

    @test
    public fromInt_negative3Byte_littleEndian() {
        this.testInt(
            -0x123456,
            [0xAA, 0xCB, 0xED, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromInt_negative4Byte_bigEndian() {
        this.testInt(
            -0x12345678,
            [0xED, 0xCB, 0xA9, 0x88],
            undefined,
            undefined
        );
    }

    @test
    public fromInt_negative4Byte_littleEndian() {
        this.testInt(
            -0x12345678,
            [0x88, 0xA9, 0xCB, 0xED],
            undefined,
            false
        );
    }

    @test
    public fromInt_readOnly() {
        this.testInt(
            0,
            [0x00, 0x00, 0x00, 0x00],
            true,
            undefined
        );
    }

    @test
    public fromInternalStream_badStream() {
        // Act / Assert
        Testers.testTruthy((v: IStream) => { ByteVector.fromInternalStream(v); });
    }

    @test
    public fromInternalStream_empty() {
        // Arrange - Create a stream with no data in it
        const stream = new TestStream(ByteVector.empty(), false);

        // Act
        const bv = ByteVector.fromInternalStream(stream);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 0);
        assert.isTrue(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([]));
    }

    @test
    public fromInternalStream_hasBytes() {
        // Arrange - Create a stream with some data in it
        const bytes = new Uint8Array(TestConstants.testFileContents);
        const stream = new TestStream(ByteVector.fromByteArray(bytes), false);

        // Act - Get the promise, end the stream, await the promise
        const bv = ByteVector.fromInternalStream(stream);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, bytes.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, bytes);
    }

    @test
    public fromLong_badValue() {
        // Arrange, Act, Assert
        Testers.testTruthy((v: bigint) => { ByteVector.fromLong(v); });
    }

    @test
    public fromLong_overflow() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromLong(BigInt("9223372036854775808")); });
        assert.throws(() => { ByteVector.fromLong(BigInt("-9223372036854775809")); });
    }

    @test
    public fromLong_positive1Byte_bigEndian() {
        this.testLong(
            BigInt("0x12"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_positive1Byte_littleEndian() {
        this.testLong(
            BigInt("0x12"),
            [0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromLong_positive2Byte_bigEndian() {
        this.testLong(
            BigInt("0x1234"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_positive2Byte_littleEndian() {
        this.testLong(
            BigInt("0x1234"),
            [0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromLong_positive3Byte_bigEndian() {
        this.testLong(
            BigInt("0x123456"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_positive3Byte_littleEndian() {
        this.testLong(
            BigInt("0x123456"),
            [0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromLong_positive4Byte_bigEndian() {
        this.testLong(
            BigInt("0x12345678"),
            [0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_positive4Byte_littleEndian() {
        this.testLong(
            BigInt("0x12345678"),
            [0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromLong_positive5Byte_bigEndian() {
        this.testLong(
            BigInt("0x123456789A"),
            [0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_positive5Byte_littleEndian() {
        this.testLong(
            BigInt("0x123456789A"),
            [0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromLong_positive6Byte_bigEndian() {
        this.testLong(
            BigInt("0x123456789ABC"),
            [0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_positive6Byte_littleEndian() {
        this.testLong(
            BigInt("0x123456789ABC"),
            [0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromLong_positive7Byte_bigEndian() {
        this.testLong(
            BigInt("0x123456789ABCDE"),
            [0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_positive7Byte_littleEndian() {
        this.testLong(
            BigInt("0x123456789ABCDE"),
            [0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromLong_positive8Byte_bigEndian() {
        this.testLong(
            BigInt("0x123456789ABCDEF0"),
            [0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_positive8Byte_littleEndian() {
        this.testLong(
            BigInt("0x123456789ABCDEF0"),
            [0xF0, 0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12],
            undefined,
            false
        );
    }

    @test
    public fromLong_negative1Byte_bigEndian() {
        this.testLong(
            BigInt("-18"),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xEE],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_negative1Byte_littleEndian() {
        this.testLong(
            BigInt("-18"),
            [0xEE, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromLong_negative2Byte_bigEndian() {
        this.testLong(
            BigInt("-4660"),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xED, 0xCC],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_negative2Byte_littleEndian() {
        this.testLong(
            BigInt("-4660"),
            [0xCC, 0xED, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromLong_negative3Byte_bigEndian() {
        this.testLong(
            BigInt("-1193046"),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xED, 0xCB, 0xAA],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_negative3Byte_littleEndian() {
        this.testLong(
            BigInt("-1193046"),
            [0xAA, 0xCB, 0xED, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromLong_negative4Byte_bigEndian() {
        this.testLong(
            BigInt("-305419896"),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xED, 0xCB, 0xA9, 0x88],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_negative4Byte_littleEndian() {
        this.testLong(
            BigInt("-305419896"),
            [0x88, 0xA9, 0xCB, 0xED, 0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromLong_negative5Byte_bigEndian() {
        this.testLong(
            BigInt("-78187493530"),
            [0xFF, 0xFF, 0xFF, 0xED, 0xCB, 0xA9, 0x87, 0x66],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_negative5Byte_littleEndian() {
        this.testLong(
            BigInt("-78187493530"),
            [0x66, 0x87, 0xA9, 0xCB, 0xED, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromLong_negative6Byte_bigEndian() {
        this.testLong(
            BigInt("-20015998343868"),
            [0xFF, 0xFF, 0xED, 0xCB, 0xA9, 0x87, 0x65, 0x44],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_negative6Byte_littleEndian() {
        this.testLong(
            BigInt("-20015998343868"),
            [0x44, 0x65, 0x87, 0xA9, 0xCB, 0xED, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromLong_negative7Byte_bigEndian() {
        this.testLong(
            BigInt("-5124095576030430"),
            [0xFF, 0xED, 0xCB, 0xA9, 0x87, 0x65, 0x43, 0x22],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_negative7Byte_littleEndian() {
        this.testLong(
            BigInt("-5124095576030430"),
            [0x22, 0x43, 0x65, 0x87, 0xA9, 0xCB, 0xED, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromLong_negative8Byte_bigEndian() {
        this.testLong(
            BigInt("-1311768467463790320"),
            [0xED, 0xCB, 0xA9, 0x87, 0x65, 0x43, 0x21, 0x10],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_negative8Byte_littleEndian() {
        this.testLong(
            BigInt("-1311768467463790320"),
            [0x10, 0x21, 0x43, 0x65, 0x87, 0xA9, 0xCB, 0xED],
            undefined,
            false
        );
    }

    @test
    public fromLong_zero_bigEndian() {
        this.testLong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            undefined
        );
    }

    @test
    public fromLong_zero_littleEndian() {
        this.testLong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            true
        );
    }

    @test
    public fromLong_readOnly() {
        this.testLong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            true,
            undefined
        );
    }

    @test
    public fromPath_noPath() {
        // Arrange, Act, Assert
        Testers.testString((v: string) => { ByteVector.fromPath(v); });
    }

    @test
    public fromPath_withPath() {
        // Arrange, Act
        const bv = ByteVector.fromPath(TestConstants.testFilePath);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, TestConstants.testFileContents.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array(TestConstants.testFileContents));
    }

    @test
    public fromPath_readOnly() {
        // Arrange, Act
        const bv = ByteVector.fromPath(TestConstants.testFilePath, true);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, TestConstants.testFileContents.length);
        assert.isFalse(bv.isEmpty);
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array(TestConstants.testFileContents));
    }

    @test
    public fromShort_badIntShort() {
        // Arrange, Act, Assert
        Testers.testInt((v: number) => { ByteVector.fromShort(v); });
    }

    @test
    public fromShort_overflow() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromShort(0x1000000); });
        assert.throws(() => { ByteVector.fromShort(-0x1000000); });
    }

    @test
    public fromShort_zero_bigEndian() {
        this.testShort(
            0x0,
            [0x0, 0x0],
            undefined,
            undefined
        );
    }

    @test
    public fromShort_zero_littleEndian() {
        this.testShort(
            0x0,
            [0x0, 0x0],
            undefined,
            false
        );
    }

    @test
    public fromShort_positive1Byte_bigEndian() {
        this.testShort(
            0x12,
            [0x00, 0x12],
            undefined,
            undefined
        );
    }

    @test
    public fromShort_positive1Byte_littleEndian() {
        this.testShort(
            0x12,
            [0x12, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromShort_positive2Byte_bigEndian() {
        this.testShort(
            0x1234,
            [0x12, 0x34],
            undefined,
            undefined
        );
    }

    @test
    public fromShort_positive2Byte_littleEndian() {
        this.testShort(
            0x1234,
            [0x34, 0x12],
            undefined,
            false
        );
    }

    @test
    public fromShort_negative1Byte_bigEndian() {
        this.testShort(
            -0x12,
            [0xFF, 0xEE],
            undefined,
            undefined
        );
    }

    @test
    public fromShort_negative1Byte_littleEndian() {
        this.testShort(
            -0x12,
            [0xEE, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromShort_negative2Byte_bigEndian() {
        this.testShort(
            -0x1234,
            [0xED, 0xCC],
            undefined,
            undefined
        );
    }

    @test
    public fromShort_negative2Byte_littleEndian() {
        this.testShort(
            -0x1234,
            [0xCC, 0xED],
            undefined,
            false
        );
    }

    @test
    public fromShort_readOnly() {
        this.testShort(
            0x0,
            [0x0, 0x0],
            true,
            undefined
        );
    }

    @test
    public fromSize_badSize() {
        // Arrange, Act, Assert
        Testers.testUint((v: number) => { ByteVector.fromSize(v); });
    }

    @test
    public fromSize_badFillValue() {
        // Arrange, Act, Assert
        Testers.testByte((v: number) => { ByteVector.fromSize(1, v); });
    }

    @test
    public fromSize_zeroSize() {
        // Arrange, Act
        const bv = ByteVector.fromSize(0);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 0);
        assert.isTrue(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array());
    }

    @test
    public fromSize_withoutFill() {
        // Arrange, Act
        const bv = ByteVector.fromSize(4);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 4);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x00, 0x00, 0x00]));
    }

    @test
    public fromSize_withFill() {
        // Arrange, Act
        const bv = ByteVector.fromSize(4, 0xEE);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 4);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([0xEE, 0xEE, 0xEE, 0xEE]));
    }

    @test
    public fromSize_readOnly() {
        // Arrange, Act
        const bv = ByteVector.fromSize(4, undefined, true);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 4);
        assert.isFalse(bv.isEmpty);
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([0x00, 0x00, 0x00, 0x00]));
    }

    @test
    public async fromStream_noStream() {
        await Promise.all([
            assert.isRejected(ByteVector.fromStream(undefined)),
            assert.isRejected(ByteVector.fromStream(null))
        ]);
    }

    @test
    public async fromStream_empty() {
        // Arrange - Create a stream with no data in it
        const stream = new StreamBuffers.ReadableStreamBuffer();

        // Act - Get the promise, end the stream with no data in it, await the promise
        const bvPromise = ByteVector.fromStream(stream);
        stream.stop();
        const bv = await bvPromise;

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 0);
        assert.isTrue(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, new Uint8Array([]));
    }

    @test
    public async fromStream_readWrite() {
        // Arrange - Create a stream with some data in it
        const stream = new StreamBuffers.ReadableStreamBuffer();
        const bytes = new Uint8Array(TestConstants.testFileContents);
        stream.put(AB2B(bytes.buffer));

        // Act - Get the promise, end the stream, await the promise
        const bvPromise = ByteVector.fromStream(stream);
        stream.stop();
        const bv = await bvPromise;

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, bytes.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.deepEqual(bv.data, bytes);
    }

    @test
    public async fromStream_readOnly() {
        // Arrange - Create a stream with some data in it
        const stream = new StreamBuffers.ReadableStreamBuffer();
        const bytes = new Uint8Array(TestConstants.testFileContents);
        stream.put(AB2B(bytes.buffer));

        // Act - Get the promise, end the stream, await the promise
        const bvPromise = ByteVector.fromStream(stream, true);
        stream.stop();
        const bv = await bvPromise;

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, bytes.length);
        assert.isFalse(bv.isEmpty);
        assert.isTrue(bv.isReadOnly);
        assert.deepEqual(bv.data, bytes);
    }

    @test
    public fromString_invalidLength() {
        // Arrange, Act, Assert
        Testers.testSafeUint((v: number) => { ByteVector.fromString("", undefined, v); }, true);
    }

    @test
    public fromString_utf8Full() {
        this.testString(
            TestConstants.testStrings.UTF8.str,
            TestConstants.testStrings.UTF8.bytes,
            undefined,
            undefined,
            undefined
        );
    }

    @test
    public fromString_utf8Partial() {
        this.testString(
            TestConstants.testStrings.UTF8.str,
            TestConstants.testStrings.UTF8.bytes.slice(0, 9),
            undefined,
            6,
            undefined
        );
    }

    @test
    public fromString_utf8Empty() {
        this.testString(
            "",
            [],
            undefined,
            undefined,
            undefined
        );
    }

    @test
    public fromString_utf16LittleEndianFull() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        this.testString(
            TestConstants.testStrings.UTF16LE.str,
            TestConstants.testStrings.UTF16LE.bytes,
            StringType.UTF16LE,
            undefined,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public fromString_utf16LittleEndianPartial() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        this.testString(
            TestConstants.testStrings.UTF16LE.str,
            TestConstants.testStrings.UTF16LE.bytes.slice(0, 12),
            StringType.UTF16LE,
            6,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public fromString_utf16LittleEndianEmpty() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        this.testString(
            "",
            [],
            StringType.UTF16LE,
            undefined,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public fromString_utf16BigEndianFull() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        this.testString(
            TestConstants.testStrings.UTF16BE.str,
            TestConstants.testStrings.UTF16BE.bytes,
            StringType.UTF16BE,
            undefined,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public fromString_utf16BigEndianPartial() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        this.testString(
            TestConstants.testStrings.UTF16BE.str,
            TestConstants.testStrings.UTF16BE.bytes.slice(0, 12),
            StringType.UTF16BE,
            6,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public fromString_utf16BigEndianEmpty() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        this.testString(
            "",
            [],
            StringType.UTF16BE,
            undefined,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public fromString_latin1Full() {
        this.testString(
            TestConstants.testStrings.Latin1.str,
            TestConstants.testStrings.Latin1.bytes,
            StringType.Latin1,
            undefined,
            undefined
        );
    }

    @test
    public fromString_latin1Partial() {
        this.testString(
            TestConstants.testStrings.Latin1.str,
            TestConstants.testStrings.Latin1.bytes.slice(0, 6),
            StringType.Latin1,
            6,
            undefined
        );
    }

    @test
    public fromString_latin1Empty() {
        this.testString(
            "",
            [],
            StringType.Latin1,
            undefined,
            undefined
        );
    }

    @test
    public fromString_utf16Full() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "something bogus";

        this.testString(
            TestConstants.testStrings.UTF16LEWithBOM.str,
            TestConstants.testStrings.UTF16LEWithBOM.bytes,
            StringType.UTF16,
            undefined,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, "utf16-le");

        // Cleanup
        ByteVector.lastUtf16Encoding = originalLastEncoding;
    }

    @test
    public fromString_utf16Partial() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "something bogus";

        this.testString(
            TestConstants.testStrings.UTF16LEWithBOM.str,
            TestConstants.testStrings.UTF16LEWithBOM.bytes.slice(0, 14),
            StringType.UTF16,
            6,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, "utf16-le");

        // Cleanup
        ByteVector.lastUtf16Encoding = originalLastEncoding;
    }

    @test
    public fromString_utf16Empty() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "something bogus";

        this.testString(
            "",
            TestConstants.testStrings.UTF16LEWithBOM.bytes.slice(0, 2),
            StringType.UTF16,
            undefined,
            undefined
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, "something bogus");

        // Cleanup
        ByteVector.lastUtf16Encoding = originalLastEncoding;
    }

    @test
    public fromString_readOnly() {
        this.testString(
            "",
            [],
            StringType.Latin1,
            undefined,
            true
        );
    }

    @test
    public fromUInt_badInteger() {
        // Arrange, Act, Assert
        Testers.testUint((v: number) => { ByteVector.fromUInt(v); });
    }

    @test
    public fromUInt_overflow() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromUInt(0x10000000000); });
    }

    @test
    public fromUInt_zero_bigEndian() {
        this.testUInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            undefined,
            undefined
        );
    }

    @test
    public fromUInt_zero_littleEndian() {
        this.testUInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            undefined,
            false
        );
    }

    @test
    public fromUInt_positive1Byte_bigEndian() {
        this.testUInt(
            0x12,
            [0x00, 0x00, 0x00, 0x12],
            undefined,
            undefined
        );
    }

    @test
    public fromUInt_positive1Byte_littleEndian() {
        this.testUInt(
            0x12,
            [0x12, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromUInt_positive2Byte_bigEndian() {
        this.testUInt(
            0x1234,
            [0x00, 0x00, 0x12, 0x34],
            undefined,
            undefined
        );
    }

    @test
    public fromUInt_positive2Byte_littleEndian() {
        this.testUInt(
            0x1234,
            [0x34, 0x12, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromUInt_positive3Byte_bigEndian() {
        this.testUInt(
            0x123456,
            [0x00, 0x12, 0x34, 0x56],
            undefined,
            undefined
        );
    }

    @test
    public fromUInt_positive3Byte_littleEndian() {
        this.testUInt(
            0x123456,
            [0x56, 0x34, 0x12, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromUInt_positive4Byte_bigEndian() {
        this.testUInt(
            0x12345678,
            [0x12, 0x34, 0x56, 0x78],
            undefined,
            undefined
        );
    }

    @test
    public fromUInt_positive4Byte_littleEndian() {
        this.testUInt(
            0x12345678,
            [0x78, 0x56, 0x34, 0x12],
            undefined,
            false
        );
    }

    @test
    public fromUInt_unsignedRange_bigEndian() {
        this.testUInt(
            0xFFFFFFFF,
            [0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            undefined
        );
    }

    @test
    public fromUInt_unsignedRange_littleEndian() {
        this.testUInt(
            0xFFFFFFFF,
            [0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromUInt_readOnly() {
        this.testUInt(
            0,
            [0x00, 0x00, 0x00, 0x00],
            true,
            undefined
        );
    }

    @test
    public fromULong_bigInt_badValue() {
        // Arrange, Act, Assert
        Testers.testTruthy((v: bigint) => { ByteVector.fromULong(v); });
    }

    @test
    public fromULong_number_badValue() {
        // Arrange / Act / Assert
        Testers.testSafeUint((v: number) => { ByteVector.fromULong(v); });
    }

    @test
    public fromULong_bigInt_overflow() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromULong(BigInt("18446744073709551616")); });
        assert.throws(() => { ByteVector.fromULong(BigInt("-1")); });
    }

    @test
    public fromULong_bigIntPositive1Byte_bigEndian() {
        this.testULong(
            BigInt("0x12"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_numberPositive1Byte_bigEndian() {
        this.testULong(
            0x12,
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_bigIntPositive1Byte_littleEndian() {
        this.testULong(
            BigInt("0x12"),
            [0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromULong_numberPositive1Byte_littleEndian() {
        this.testULong(
            0x12,
            [0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromULong_bigIntPositive2Byte_bigEndian() {
        this.testULong(
            BigInt("0x1234"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_numberPositive2Byte_bigEndian() {
        this.testULong(
            0x1234,
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_bigIntPositive2Byte_littleEndian() {
        this.testULong(
            BigInt("0x1234"),
            [0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromULong_numberPositive2Byte_littleEndian() {
        this.testULong(
            0x1234,
            [0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromULong_bigIntPositive3Byte_bigEndian() {
        this.testULong(
            BigInt("0x123456"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_numberPositive3Byte_bigEndian() {
        this.testULong(
            0x123456,
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_bigIntPositive3Byte_littleEndian() {
        this.testULong(
            BigInt("0x123456"),
            [0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromULong_numberPositive3Byte_littleEndian() {
        this.testULong(
            0x123456,
            [0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromULong_bigIntPositive4Byte_bigEndian() {
        this.testULong(
            BigInt("0x12345678"),
            [0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_numberPositive4Byte_bigEndian() {
        this.testULong(
            0x12345678,
            [0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_bigIntPositive4Byte_littleEndian() {
        this.testULong(
            BigInt("0x12345678"),
            [0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromULong_numberPositive4Byte_littleEndian() {
        this.testULong(
            0x12345678,
            [0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromULong_bigIntPositive5Byte_bigEndian() {
        this.testULong(
            BigInt("0x123456789A"),
            [0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_numberPositive5Byte_bigEndian() {
        this.testULong(
            0x123456789A,
            [0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_bigIntPositive5Byte_littleEndian() {
        this.testULong(
            BigInt("0x123456789A"),
            [0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromULong_numberPositive5Byte_littleEndian() {
        this.testULong(
            0x123456789A,
            [0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromULong_bigIntPositive6Byte_bigEndian() {
        this.testULong(
            BigInt("0x123456789ABC"),
            [0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_numberPositive6Byte_bigEndian() {
        this.testULong(
            0x123456789ABC,
            [0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_bigIntPositive6Byte_littleEndian() {
        this.testULong(
            BigInt("0x123456789ABC"),
            [0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromULong_numberPositive6Byte_littleEndian() {
        this.testULong(
            0x123456789ABC,
            [0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromULong_bigIntPositive7Byte_bigEndian() {
        this.testULong(
            BigInt("0x123456789ABCDE"),
            [0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_bigIntPositive7Byte_littleEndian() {
        this.testULong(
            BigInt("0x123456789ABCDE"),
            [0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromULong_bigIntPositive8Byte_bigEndian() {
        this.testULong(
            BigInt("0x123456789ABCDEF0"),
            [0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_bigIntPositive8Byte_littleEndian() {
        this.testULong(
            BigInt("0x123456789ABCDEF0"),
            [0xF0, 0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12],
            undefined,
            false
        );
    }

    @test
    public fromULong_bigIntUnsignedRange_bigEndian() {
        this.testULong(
            BigInt("0xFFFFFFFFFFFFFFFF"),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_bigIntUnsignedRange_littleEndian() {
        this.testULong(
            BigInt("0xFFFFFFFFFFFFFFFF"),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromULong_bigIntZero_bigEndian() {
        this.testULong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_numberZero_bigEndian() {
        this.testULong(
            0,
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            undefined
        );
    }

    @test
    public fromULong_bigIntZero_littleEndian() {
        this.testULong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            true
        );
    }

    @test
    public fromULong_numberZero_littleEndian() {
        this.testULong(
            0,
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            undefined,
            true
        );
    }

    @test
    public fromULong_readOnly() {
        this.testULong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            true,
            undefined
        );
    }

    @test
    public fromUShort_badShort() {
        // Arrange, Act, Assert
        Testers.testUint((v: number) => { ByteVector.fromUShort(v); });
    }

    @test
    public fromUShort_overflow() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromUShort(0x1000000); });
        assert.throws(() => { ByteVector.fromUShort(-0x1000000); });
    }

    @test
    public fromUShort_zero_bigEndian() {
        this.testUShort(
            0x0,
            [0x0, 0x0],
            undefined,
            undefined
        );
    }

    @test
    public fromUShort_zero_littleEndian() {
        this.testUShort(
            0x0,
            [0x0, 0x0],
            undefined,
            false
        );
    }

    @test
    public fromUShort_positive1Byte_bigEndian() {
        this.testUShort(
            0x12,
            [0x00, 0x12],
            undefined,
            undefined
        );
    }

    @test
    public fromUShort_positive1Byte_littleEndian() {
        this.testUShort(
            0x12,
            [0x12, 0x00],
            undefined,
            false
        );
    }

    @test
    public fromUShort_positive2Byte_bigEndian() {
        this.testUShort(
            0x1234,
            [0x12, 0x34],
            undefined,
            undefined
        );
    }

    @test
    public fromUShort_positive2Byte_littleEndian() {
        this.testUShort(
            0x1234,
            [0x34, 0x12],
            undefined,
            false
        );
    }

    @test
    public fromUShort_unsignedRange_bigEndian() {
        this.testUShort(
            0xFFFF,
            [0xFF, 0xFF],
            undefined,
            undefined
        );
    }

    @test
    public fromUShort_unsignedRange_littleEndian() {
        this.testUShort(
            0xFFFF,
            [0xFF, 0xFF],
            undefined,
            false
        );
    }

    @test
    public fromUShort_readOnly() {
        this.testUShort(
            0x0,
            [0x0, 0x0],
            true,
            undefined
        );
    }

    private testInt(value: number, expectedData: number[], isReadOnly: boolean, bigEndian: boolean): void {
        // Arrange, Act
        const bv = ByteVector.fromInt(value, bigEndian, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 4);
        assert.isFalse(bv.isEmpty);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }

    private testLong(
        value: bigint,
        expectedData: number[],
        isReadOnly: boolean,
        bigEndian: boolean
    ): void {
        // Arrange, Act
        const bv = ByteVector.fromLong(value, bigEndian, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 8);
        assert.isFalse(bv.isEmpty);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }

    private testShort(value: number, expectedData: number[], isReadOnly: boolean, bigEndian: boolean): void {
        // Arrange, Act
        const bv = ByteVector.fromShort(value, bigEndian, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 2);
        assert.isFalse(bv.isEmpty);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }

    private testString(
        str: string,
        expectedData: number[],
        stringType: StringType,
        inputLength: number,
        isReadOnly: boolean
    ) {
        // Arrange, Act
        const bv = ByteVector.fromString(str, stringType, inputLength, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.isEmpty, expectedData.length === 0);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }

    private testUInt(value: number, expectedData: number[], isReadOnly: boolean, bigEndian: boolean): void {
        // Arrange, Act
        const bv = ByteVector.fromUInt(value, bigEndian, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 4);
        assert.isFalse(bv.isEmpty);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }

    private testULong(
        value: bigint | number,
        expectedData: number[],
        isReadOnly: boolean,
        bigEndian: boolean
    ): void {
        // Arrange, Act
        const bv = ByteVector.fromULong(value, bigEndian, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 8);
        assert.isFalse(bv.isEmpty);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }

    private testUShort(value: number, expectedData: number[], isReadOnly: boolean, bigEndian: boolean): void {
        // Arrange, Act
        const bv = ByteVector.fromUShort(value, bigEndian, isReadOnly);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 2);
        assert.isFalse(bv.isEmpty);
        if (isReadOnly !== undefined) {
            assert.strictEqual(bv.isReadOnly, isReadOnly);
        } else {
            assert.isFalse(bv.isReadOnly);
        }
        assert.deepEqual(bv.data, new Uint8Array(expectedData));
    }
}
