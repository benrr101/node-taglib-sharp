import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as StreamBuffers from "stream-buffers";
import * as TypeMoq from "typemoq";
import {suite, test} from "@testdeck/mocha";

import TestConstants from "./testConstants";
import TestStream from "./utilities/testStream";
import {ByteVector, Encoding, StringType} from "../src/byteVector";
import {IFileAbstraction} from "../src/fileAbstraction";
import {IStream} from "../src/stream";
import {Allow, Testers} from "./utilities/testers";

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
    public concatenate_undefined() {
        // Act
        const bv = ByteVector.concatenate(undefined, null);

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
        // Arrange
        const testArray = new Uint8Array(this.testArray);

        // Act
        const bv = ByteVector.concatenate(this.testArray);

        // Assert
        assert.ok(bv);
        assert.equal(bv.length, testArray.length);
        for (let i = 0; i < bv.length; i++) {
            assert.equal(bv.get(i), testArray[i]);
        }

        // Act / Assert - Changing source does not change bv
        testArray[0] = 88;
        assert.equal(bv.get(0), this.testArray[0]);
    }

    @test
    public concatenate_twoArrays() {
        // Arrange
        const testArray = new Uint8Array(this.testArray);

        // Act
        const bv = ByteVector.concatenate(
            testArray,
            testArray
        );

        // Assert
        assert.ok(bv);
        assert.strictEqual(bv.length, testArray.length * 2);
        for (let i = 0; i < bv.length; i++) {
            assert.strictEqual(bv.get(i), testArray[i % this.testArray.length]);
        }

        // Act / Assert - Changing source does not change bv
        testArray[0] = 88;
        assert.equal(bv.get(0), this.testArray[0]);
        assert.equal(bv.get(testArray.length), this.testArray[0]);
    }

    @test
    public concatenate_oneVector() {
        // Arrange
        const testVector = this.testByteVector.toByteVector();

        // Act
        const bv = ByteVector.concatenate(testVector);

        // Assert
        assert.ok(bv);
        assert.strictEqual(bv.length, testVector.length);
        for (let i = 0; i < bv.length; i++) {
            assert.strictEqual(bv.get(i), testVector.get(i));
        }

        // Act / Assert - Changing source does not change bv
        testVector.set(0, 88);
        assert.equal(bv.get(0), this.testByteVector.get(0));
    }

    @test
    public concatenate_twoVectors() {
        // Arrange
        const testVector = this.testByteVector.toByteVector();

        // Act
        const bv = ByteVector.concatenate(
            testVector,
            testVector
        );

        // Assert
        assert.ok(bv);
        assert.strictEqual(bv.length, testVector.length * 2);
        for (let i = 0; i < bv.length; i++) {
            assert.strictEqual(bv.get(i), testVector.get(i % this.testByteVector.length));
        }

        // Act / Assert - Changing source does not change bv
        testVector.set(0, 88);
        assert.equal(bv.get(0), this.testByteVector.get(0));
        assert.equal(bv.get(this.testByteVector.length), this.testByteVector.get(0));
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
    public fromByteArray_invalidParams() {
        // Arrange
        const bytes = new Uint8Array(0);

        // Act / Assert
        Testers.testTruthy((v: Uint8Array) => ByteVector.fromByteArray(v, 123));
        Testers.testSafeUint((v) => ByteVector.fromByteArray(bytes, v), Allow.Undefined);
        assert.throws(() => ByteVector.fromByteArray(bytes, 123));
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

        assert.strictEqual(bv.checksum, 0x00000000);
        assert.strictEqual(bv.length, 0);
        assert.isTrue(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);

        ByteVector_ConstructorTests.equalContents(bv, data);
    }

    @test
    public fromByteArray_withData() {
        // Arrange, Act
        const data = new Uint8Array([0x0, 0x1, 0x2, 0x3, 0x4]);
        const bv = ByteVector.fromByteArray(data);

        // Assert
        assert.isOk(bv);

        assert.strictEqual(bv.checksum, 0xbe33eab6);
        assert.strictEqual(bv.length, data.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);

        ByteVector_ConstructorTests.equalContents(bv, data);

        // Act / Assert - Changes to source affects bv
        data[2] = 0x88;
        assert.strictEqual(bv.get(2), 0x88);
    }

    @test
    public fromByteArray_withLength() {
        // Arrange, Act
        const data = new Uint8Array([0x0, 0x1, 0x2, 0x3, 0x4]);
        const bv = ByteVector.fromByteArray(data, 3);

        // Assert
        assert.isOk(bv);

        assert.strictEqual(bv.checksum, 0xdb9bfab2);
        assert.strictEqual(bv.length, 3);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);

        ByteVector_ConstructorTests.equalContents(bv, data.subarray(0, 3));

        // Act / Assert - Changes to source does not affect b/c it is copied
        data[2] = 0x88;
        assert.strictEqual(bv.get(2), 0x02);
    }

    @test
    public fromFileAbstraction_badAbstraction() {
        // Act / Assert
        Testers.testTruthy((v: IFileAbstraction) => { ByteVector.fromFileAbstraction(v); });
    }

    @test
    public fromFileAbstraction() {
        // Arrange - Make a file big enough to fill up a buffer
        const bytes = new Uint8Array(5000);
        let total = 0;
        while (total < 5000) {
            bytes.set(TestConstants.testFileContents, total);
            total += TestConstants.testFileContents.length;
        }
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
        ByteVector_ConstructorTests.equalContents(bv, bytes);

        mockFileAbstraction.verify((a) => a.closeStream(TypeMoq.It.isValue(mockStream)), TypeMoq.Times.once());
    }

    @test
    public fromInt_invalid() {
        // Arrange, Act, Assert
        Testers.testInt((v: number) => { ByteVector.fromInt(v); });
    }

    @test
    public fromInt_zero_bigEndian() {
        ByteVector_ConstructorTests.testInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            0x00000000,
            undefined
        );
    }

    @test
    public fromInt_zero_littleEndian() {
        ByteVector_ConstructorTests.testInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            0x00000000,
            undefined
        );
    }

    @test
    public fromInt_positive1Byte_bigEndian() {
        ByteVector_ConstructorTests.testInt(
            0x12,
            [0x00, 0x00, 0x00, 0x12],
            0x4593e01e,
            undefined
        );
    }

    @test
    public fromInt_positive1Byte_littleEndian() {
        ByteVector_ConstructorTests.testInt(
            0x12,
            [0x12, 0x00, 0x00, 0x00],
            0x4b0e057a,
            false
        );
    }

    @test
    public fromInt_positive2Byte_bigEndian() {
        ByteVector_ConstructorTests.testInt(
            0x1234,
            [0x00, 0x00, 0x12, 0x34],
            0x77951e50,
            undefined
        );
    }

    @test
    public fromInt_positive2Byte_littleEndian() {
        ByteVector_ConstructorTests.testInt(
            0x1234,
            [0x34, 0x12, 0x00, 0x00],
            0x7f33b629,
            false
        );
    }

    @test
    public fromInt_positive3Byte_bigEndian() {
        ByteVector_ConstructorTests.testInt(
            0x123456,
            [0x00, 0x12, 0x34, 0x56],
            0x09fcfb57,
            undefined
        );
    }

    @test
    public fromInt_positive3Byte_littleEndian() {
        ByteVector_ConstructorTests.testInt(
            0x123456,
            [0x56, 0x34, 0x12, 0x00],
            0x77b636ba,
            false
        );
    }

    @test
    public fromInt_positive4Byte_bigEndian() {
        ByteVector_ConstructorTests.testInt(
            0x12345678,
            [0x12, 0x34, 0x56, 0x78],
            0x188e5750,
            undefined
        );
    }

    @test
    public fromInt_positive4Byte_littleEndian() {
        ByteVector_ConstructorTests.testInt(
            0x12345678,
            [0x78, 0x56, 0x34, 0x12],
            0x6a330d2d,
            false
        );
    }

    @test
    public fromInt_negative1Byte_bigEndian() {
        ByteVector_ConstructorTests.testInt(
            -0x12,
            [0xFF, 0xFF, 0xFF, 0xEE],
            0x8fd41bbc,
            undefined
        );
    }

    @test
    public fromInt_negative1Byte_littleEndian() {
        ByteVector_ConstructorTests.testInt(
            -0x12,
            [0xEE, 0xFF, 0xFF, 0xFF],
            0xec7d6a6f,
            false
        );
    }

    @test
    public fromInt_negative2Byte_bigEndian() {
        ByteVector_ConstructorTests.testInt(
            -0x1234,
            [0xFF, 0xFF, 0xED, 0xCC],
            0xaed6932e,
            undefined
        );
    }

    @test
    public fromInt_negative2Byte_littleEndian() {
        ByteVector_ConstructorTests.testInt(
            -0x1234,
            [0xCC, 0xED, 0xFF, 0xFF],
            0xa4b59539,
            false
        );
    }

    @test
    public fromInt_negative3Byte_bigEndian() {
        ByteVector_ConstructorTests.testInt(
            -0x123456,
            [0xFF, 0xED, 0xCB, 0xAA],
            0xc3bb00f5,
            undefined
        );
    }

    @test
    public fromInt_negative3Byte_littleEndian() {
        ByteVector_ConstructorTests.testInt(
            -0x123456,
            [0xAA, 0xCB, 0xED, 0xFF],
            0xd0c559af,
            false
        );
    }

    @test
    public fromInt_negative4Byte_bigEndian() {
        ByteVector_ConstructorTests.testInt(
            -0x12345678,
            [0xED, 0xCB, 0xA9, 0x88],
            0xe7c53796,
            undefined
        );
    }

    @test
    public fromInt_negative4Byte_littleEndian() {
        ByteVector_ConstructorTests.testInt(
            -0x12345678,
            [0x88, 0xA9, 0xCB, 0xED],
            0x485fb637,
            false
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

        assert.strictEqual(bv.checksum, 0x00000000);
        assert.strictEqual(bv.length, 0);
        assert.isTrue(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);

        ByteVector_ConstructorTests.equalContents(bv, []);
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

        assert.strictEqual(bv.checksum, 0x8227a366);
        assert.strictEqual(bv.length, bytes.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);

        ByteVector_ConstructorTests.equalContents(bv, bytes);
    }

    @test
    public fromLong_badValues() {
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
    public fromLong_positiveNumber_bigEndian() {
        this.testLong(
            0x1234,
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34],
            0x77951e50,
            undefined
        );
    }

    @test
    public fromLong_positiveNumber_littleEndian() {
        this.testLong(
            0x1234,
            [0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0xe032bc9b,
            false
        );
    }

    @test
    public fromLong_negativeNumber_bigEndian() {
        this.testLong(
            -0x1234,
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xED, 0xCC],
            0xc7d22877,
            undefined
        );
    }

    @test
    public fromLong_negativeNumber_littleEndian() {
        this.testLong(
            -0x1234,
            [0xCC, 0xED, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            0xc896d178,
            false
        );
    }

    @test
    public fromLong_bigPositiveNumber_bigEndian() {
        this.testLong(
            0x1234000000,
            [0x00, 0x00, 0x00, 0x12, 0x34, 0x00, 0x00, 0x00],
            0x70c0e641,
            undefined
        );
    }

    @test
    public fromLong_bigPositiveNumber_littleEndian() {
        this.testLong(
            0x1234000000,
            [0x00, 0x00, 0x00, 0x34, 0x12, 0x00, 0x00, 0x00],
            0xeb4d895a,
            false
        );
    }

    @test
    public fromLong_positive1Byte_bigEndian() {
        this.testLong(
            BigInt("0x12"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12],
            0x4593e01e,
            undefined
        );
    }

    @test
    public fromLong_positive1Byte_littleEndian() {
        this.testLong(
            BigInt("0x12"),
            [0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0x1a9b1e5f,
            false
        );
    }

    @test
    public fromLong_positive2Byte_bigEndian() {
        this.testLong(
            BigInt("0x1234"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34],
            0x77951e50,
            undefined
        );
    }

    @test
    public fromLong_positive2Byte_littleEndian() {
        this.testLong(
            BigInt("0x1234"),
            [0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0xe032bc9b,
            false
        );
    }

    @test
    public fromLong_positive3Byte_bigEndian() {
        this.testLong(
            BigInt("0x123456"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56],
            0x09fcfb57,
            undefined
        );
    }

    @test
    public fromLong_positive3Byte_littleEndian() {
        this.testLong(
            BigInt("0x123456"),
            [0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00],
            0x59e6bc55,
            false
        );
    }

    @test
    public fromLong_positive4Byte_bigEndian() {
        this.testLong(
            BigInt("0x12345678"),
            [0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78],
            0x188e5750,
            undefined
        );
    }

    @test
    public fromLong_positive4Byte_littleEndian() {
        this.testLong(
            BigInt("0x12345678"),
            [0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00],
            0xee67587a,
            false
        );
    }

    @test
    public fromLong_positive5Byte_bigEndian() {
        this.testLong(
            BigInt("0x123456789A"),
            [0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A],
            0xeed98b80,
            undefined
        );
    }

    @test
    public fromLong_positive5Byte_littleEndian() {
        this.testLong(
            BigInt("0x123456789A"),
            [0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00],
            0xa9896e71,
            false
        );
    }

    @test
    public fromLong_positive6Byte_bigEndian() {
        this.testLong(
            BigInt("0x123456789ABC"),
            [0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC],
            0xa89e1069,
            undefined
        );
    }

    @test
    public fromLong_positive6Byte_littleEndian() {
        this.testLong(
            BigInt("0x123456789ABC"),
            [0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00],
            0x8c546d6b,
            false
        );
    }

    @test
    public fromLong_positive7Byte_bigEndian() {
        this.testLong(
            BigInt("0x123456789ABCDE"),
            [0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE],
            0x64223955,
            undefined
        );
    }

    @test
    public fromLong_positive7Byte_littleEndian() {
        this.testLong(
            BigInt("0x123456789ABCDE"),
            [0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00],
            0x662acd89,
            false
        );
    }

    @test
    public fromLong_positive8Byte_bigEndian() {
        this.testLong(
            BigInt("0x123456789ABCDEF0"),
            [0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0],
            0x14201842,
            undefined
        );
    }

    @test
    public fromLong_positive8Byte_littleEndian() {
        this.testLong(
            BigInt("0x123456789ABCDEF0"),
            [0xF0, 0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12],
            0x47c71870,
            false
        );
    }

    @test
    public fromLong_negative1Byte_bigEndian() {
        this.testLong(
            BigInt("-18"),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xEE],
            0xe6d0a0e5,
            undefined
        );
    }

    @test
    public fromLong_negative1Byte_littleEndian() {
        this.testLong(
            BigInt("-18"),
            [0xEE, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            0x58791d23,
            false
        );
    }

    @test
    public fromLong_negative2Byte_bigEndian() {
        this.testLong(
            BigInt("-4660"),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xED, 0xCC],
            0xc7d22877,
            undefined
        );
    }

    @test
    public fromLong_negative2Byte_littleEndian() {
        this.testLong(
            BigInt("-4660"),
            [0xCC, 0xED, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            0xc896d178,
            false
        );
    }

    @test
    public fromLong_negative3Byte_bigEndian() {
        this.testLong(
            BigInt("-1193046"),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xED, 0xCB, 0xAA],
            0xaabfbbac,
            undefined
        );
    }

    @test
    public fromLong_negative3Byte_littleEndian() {
        this.testLong(
            BigInt("-1193046"),
            [0xAA, 0xCB, 0xED, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            0x1b04bf29,
            false
        );
    }

    @test
    public fromLong_negative4Byte_bigEndian() {
        this.testLong(
            BigInt("-305419896"),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xED, 0xCB, 0xA9, 0x88],
            0x8ec18ccf,
            undefined
        );
    }

    @test
    public fromLong_negative4Byte_littleEndian() {
        this.testLong(
            BigInt("-305419896"),
            [0x88, 0xA9, 0xCB, 0xED, 0xFF, 0xFF, 0xFF, 0xFF],
            0x124fe8a7,
            false
        );
    }

    @test
    public fromLong_negative5Byte_bigEndian() {
        this.testLong(
            BigInt("-78187493530"),
            [0xFF, 0xFF, 0xFF, 0xED, 0xCB, 0xA9, 0x87, 0x66],
            0x4d9acb7b,
            undefined
        );
    }

    @test
    public fromLong_negative5Byte_littleEndian() {
        this.testLong(
            BigInt("-78187493530"),
            [0x66, 0x87, 0xA9, 0xCB, 0xED, 0xFF, 0xFF, 0xFF],
            0xeb6b6d0d,
            false
        );
    }

    @test
    public fromLong_negative6Byte_bigEndian() {
        this.testLong(
            BigInt("-20015998343868"),
            [0xFF, 0xFF, 0xED, 0xCB, 0xA9, 0x87, 0x65, 0x44],
            0x18d9264e,
            undefined
        );
    }

    @test
    public fromLong_negative6Byte_littleEndian() {
        this.testLong(
            BigInt("-20015998343868"),
            [0x44, 0x65, 0x87, 0xA9, 0xCB, 0xED, 0xFF, 0xFF],
            0xa4f00088,
            false
        );
    }

    @test
    public fromLong_negative7Byte_bigEndian() {
        this.testLong(
            BigInt("-5124095576030430"),
            [0xFF, 0xED, 0xCB, 0xA9, 0x87, 0x65, 0x43, 0x22],
            0xc76179ae,
            undefined
        );
    }

    @test
    public fromLong_negative7Byte_littleEndian() {
        this.testLong(
            BigInt("-5124095576030430"),
            [0x22, 0x43, 0x65, 0x87, 0xA9, 0xCB, 0xED, 0xFF],
            0x24c8cef5,
            false
        );
    }

    @test
    public fromLong_negative8Byte_bigEndian() {
        this.testLong(
            BigInt("-1311768467463790320"),
            [0xED, 0xCB, 0xA9, 0x87, 0x65, 0x43, 0x21, 0x10],
            0xce7e18ad,
            undefined
        );
    }

    @test
    public fromLong_negative8Byte_littleEndian() {
        this.testLong(
            BigInt("-1311768467463790320"),
            [0x10, 0x21, 0x43, 0x65, 0x87, 0xA9, 0xCB, 0xED],
            0x16370f66,
            false
        );
    }

    @test
    public fromLong_zero_bigEndian() {
        this.testLong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0x00000000,
            undefined
        );
    }

    @test
    public fromLong_zero_littleEndian() {
        this.testLong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0x00000000,
            false
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

        assert.strictEqual(bv.checksum, 0x8227a366);
        assert.strictEqual(bv.length, TestConstants.testFileContents.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);

        ByteVector_ConstructorTests.equalContents(bv, TestConstants.testFileContents);
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
        ByteVector_ConstructorTests.testShort(
            0x0,
            [0x0, 0x0],
            0x00000000,
            undefined
        );
    }

    @test
    public fromShort_zero_littleEndian() {
        ByteVector_ConstructorTests.testShort(
            0x0,
            [0x0, 0x0],
            0x00000000,
            false
        );
    }

    @test
    public fromShort_positive1Byte_bigEndian() {
        ByteVector_ConstructorTests.testShort(
            0x12,
            [0x00, 0x12],
            0x4593e01e,
            undefined
        );
    }

    @test
    public fromShort_positive1Byte_littleEndian() {
        ByteVector_ConstructorTests.testShort(
            0x12,
            [0x12, 0x00],
            0xb0a3051c,
            false
        );
    }

    @test
    public fromShort_positive2Byte_bigEndian() {
        ByteVector_ConstructorTests.testShort(
            0x1234,
            [0x12, 0x34],
            0x77951e50,
            undefined
        );
    }

    @test
    public fromShort_positive2Byte_littleEndian() {
        ByteVector_ConstructorTests.testShort(
            0x1234,
            [0x34, 0x12],
            0x30456c82,
            false
        );
    }

    @test
    public fromShort_negative1Byte_bigEndian() {
        ByteVector_ConstructorTests.testShort(
            -0x12,
            [0xFF, 0xEE],
            0xb798a2ba,
            undefined
        );
    }

    @test
    public fromShort_negative1Byte_littleEndian() {
        ByteVector_ConstructorTests.testShort(
            -0x12,
            [0xEE, 0xFF],
            0x3d003eb2,
            false
        );
    }

    @test
    public fromShort_negative2Byte_bigEndian() {
        ByteVector_ConstructorTests.testShort(
            -0x1234,
            [0xED, 0xCC],
            0x969a2a28,
            undefined
        );
    }

    @test
    public fromShort_negative2Byte_littleEndian() {
        ByteVector_ConstructorTests.testShort(
            -0x1234,
            [0xCC, 0xED],
            0xf8c27685,
            false
        );
    }

    @test
    public fromSize_badSize() {
        // Arrange, Act, Assert
        Testers.testSafeUint((v: number) => { ByteVector.fromSize(v); });
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

        assert.strictEqual(bv.checksum, 0x00000000);
        assert.strictEqual(bv.length, 0);
        assert.isTrue(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
    }

    @test
    public fromSize_withoutFill() {
        // Arrange, Act
        const bv = ByteVector.fromSize(4);

        // Assert
        assert.isOk(bv);

        assert.strictEqual(bv.checksum, 0x00000000);
        assert.strictEqual(bv.length, 4);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);

        ByteVector_ConstructorTests.equalContents(bv, [0x00, 0x00, 0x00, 0x00]);
    }

    @test
    public fromSize_withFill() {
        // Arrange, Act
        const bv = ByteVector.fromSize(4, 0xEE);

        // Assert
        assert.isOk(bv);

        assert.strictEqual(bv.checksum, 0x7ab79290);
        assert.strictEqual(bv.length, 4);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);

        ByteVector_ConstructorTests.equalContents(bv, [0xEE, 0xEE, 0xEE, 0xEE]);
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

        assert.strictEqual(bv.checksum, 0x000000);
        assert.strictEqual(bv.length, 0);
        assert.isTrue(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);

        ByteVector_ConstructorTests.equalContents(bv, []);
    }

    @test
    public async fromStream() {
        // Arrange - Create a stream with some data in it
        const stream = new StreamBuffers.ReadableStreamBuffer();
        const bytes = new Uint8Array(TestConstants.testFileContents);
        stream.put(Buffer.from(bytes.buffer));

        // Act - Get the promise, end the stream, await the promise
        const bvPromise = ByteVector.fromStream(stream);
        stream.stop();
        const bv = await bvPromise;

        // Assert
        assert.isOk(bv);

        assert.strictEqual(bv.checksum, 0x8227a366);
        assert.strictEqual(bv.length, bytes.length);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);

        ByteVector_ConstructorTests.equalContents(bv, bytes);
    }

    // @TODO: Add test for failing stream read

    @test
    public fromString_invalidLength() {
        // Arrange, Act, Assert
        Testers.testSafeUint((v: number) => { ByteVector.fromString("", undefined, v); }, Allow.Undefined);
    }

    @test
    public fromString_utf8Full() {
        ByteVector_ConstructorTests.testString(
            TestConstants.testStrings.UTF8.str,
            TestConstants.testStrings.UTF8.bytes,
            0x88b08693,
            StringType.UTF8,
            undefined
        );
    }

    @test
    public fromString_utf8Partial() {
        ByteVector_ConstructorTests.testString(
            TestConstants.testStrings.UTF8.str,
            TestConstants.testStrings.UTF8.bytes.slice(0, 9),
            0xbd58b35e,
            StringType.UTF8,
            6
        );
    }

    @test
    public fromString_utf8Empty() {
        ByteVector_ConstructorTests.testString(
            "",
            [],
            0x00000000,
            undefined,
            undefined
        );
    }

    @test
    public fromString_utf16LittleEndianFull() {
        ByteVector_ConstructorTests.testString(
            TestConstants.testStrings.UTF16LE.str,
            TestConstants.testStrings.UTF16LE.bytes,
            0xd74d6dea,
            StringType.UTF16LE,
            undefined
        );
    }

    @test
    public fromString_utf16LittleEndianPartial() {
        ByteVector_ConstructorTests.testString(
            TestConstants.testStrings.UTF16LE.str,
            TestConstants.testStrings.UTF16LE.bytes.slice(0, 12),
            0xe9e1088f,
            StringType.UTF16LE,
            6
        );
    }

    @test
    public fromString_utf16LittleEndianEmpty() {
        ByteVector_ConstructorTests.testString(
            "",
            [],
            0x00000000,
            StringType.UTF16LE,
            undefined
        );
    }

    @test
    public fromString_utf16BigEndianFull() {
        const originalLastUtf16Encoding = Encoding["_lastUtf16Encoding"];
        ByteVector_ConstructorTests.testString(
            TestConstants.testStrings.UTF16BE.str,
            TestConstants.testStrings.UTF16BE.bytes,
            0xa8031d65,
            StringType.UTF16BE,
            undefined
        );
        assert.strictEqual(Encoding["_lastUtf16Encoding"], originalLastUtf16Encoding);
    }

    @test
    public fromString_utf16BigEndianPartial() {
        const originalLastUtf16Encoding = Encoding["_lastUtf16Encoding"];
        ByteVector_ConstructorTests.testString(
            TestConstants.testStrings.UTF16BE.str,
            TestConstants.testStrings.UTF16BE.bytes.slice(0, 12),
            0xa5d3b1ab,
            StringType.UTF16BE,
            6
        );
        assert.strictEqual(Encoding["_lastUtf16Encoding"], originalLastUtf16Encoding);
    }

    @test
    public fromString_utf16BigEndianEmpty() {
        const originalLastUtf16Encoding = Encoding["_lastUtf16Encoding"];
        ByteVector_ConstructorTests.testString(
            "",
            [],
            0x00000000,
            StringType.UTF16BE,
            undefined
        );
        assert.strictEqual(Encoding["_lastUtf16Encoding"], originalLastUtf16Encoding);
    }

    @test
    public fromString_latin1Full() {
        ByteVector_ConstructorTests.testString(
            TestConstants.testStrings.Latin1.str,
            TestConstants.testStrings.Latin1.bytes,
            0xd1733f6b,
            StringType.Latin1,
            undefined
        );
    }

    @test
    public fromString_latin1Partial() {
        ByteVector_ConstructorTests.testString(
            TestConstants.testStrings.Latin1.str,
            TestConstants.testStrings.Latin1.bytes.slice(0, 6),
            0x919ae494,
            StringType.Latin1,
            6
        );
    }

    @test
    public fromString_latin1Empty() {
        ByteVector_ConstructorTests.testString(
            "",
            [],
            0x00000000,
            StringType.Latin1,
            undefined
        );
    }

    @test
    public fromString_utf16Full() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = Encoding["_lastUtf16Encoding"];
        Encoding["_lastUtf16Encoding"] = StringType.Latin1;
        try {
            ByteVector_ConstructorTests.testString(
                TestConstants.testStrings.UTF16LEWithBOM.str,
                TestConstants.testStrings.UTF16LEWithBOM.bytes,
                0x37993f26,
                StringType.UTF16,
                undefined
            );
            assert.strictEqual(Encoding["_lastUtf16Encoding"], StringType.UTF16LE);
        } finally {
            // Cleanup
            Encoding["_lastUtf16Encoding"] = originalLastEncoding;
        }
    }

    @test
    public fromString_utf16Partial() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = Encoding["_lastUtf16Encoding"];
        Encoding["_lastUtf16Encoding"] = StringType.Latin1;
        try {
            ByteVector_ConstructorTests.testString(
                TestConstants.testStrings.UTF16LEWithBOM.str,
                TestConstants.testStrings.UTF16LEWithBOM.bytes.slice(0, 14),
                0xee6338ca,
                StringType.UTF16,
                6
            );
            assert.strictEqual(Encoding["_lastUtf16Encoding"], StringType.UTF16LE);
        } finally {
            // Cleanup
            Encoding["_lastUtf16Encoding"] = originalLastEncoding;
        }
    }

    @test
    public fromString_utf16Empty() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = Encoding["_lastUtf16Encoding"];
        Encoding["_lastUtf16Encoding"] = StringType.Latin1;
        try {
            ByteVector_ConstructorTests.testString(
                "",
                TestConstants.testStrings.UTF16LEWithBOM.bytes.slice(0, 2),
                0xfb8979ca,
                StringType.UTF16,
                undefined
            );
            assert.strictEqual(Encoding["_lastUtf16Encoding"], StringType.Latin1);
        } finally {
            // Cleanup
            Encoding["_lastUtf16Encoding"] = originalLastEncoding;
        }
    }

    @test
    public fromUInt_badInteger() {
        // Arrange, Act, Assert
        Testers.testUint((v: number) => { ByteVector.fromUint(v); });
    }

    @test
    public fromUInt_zero_bigEndian() {
        ByteVector_ConstructorTests.testUInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            0x00000000,
            undefined
        );
    }

    @test
    public fromUInt_zero_littleEndian() {
        ByteVector_ConstructorTests.testUInt(
            0x0,
            [0x0, 0x0, 0x0, 0x0],
            0x00000000,
            false
        );
    }

    @test
    public fromUInt_positive1Byte_bigEndian() {
        ByteVector_ConstructorTests.testUInt(
            0x12,
            [0x00, 0x00, 0x00, 0x12],
            0x4593e01e,
            undefined
        );
    }

    @test
    public fromUInt_positive1Byte_littleEndian() {
        ByteVector_ConstructorTests.testUInt(
            0x12,
            [0x12, 0x00, 0x00, 0x00],
            0x4b0e057a,
            false
        );
    }

    @test
    public fromUInt_positive2Byte_bigEndian() {
        ByteVector_ConstructorTests.testUInt(
            0x1234,
            [0x00, 0x00, 0x12, 0x34],
            0x77951e50,
            undefined
        );
    }

    @test
    public fromUInt_positive2Byte_littleEndian() {
        ByteVector_ConstructorTests.testUInt(
            0x1234,
            [0x34, 0x12, 0x00, 0x00],
            0x7f33b629,
            false
        );
    }

    @test
    public fromUInt_positive3Byte_bigEndian() {
        ByteVector_ConstructorTests.testUInt(
            0x123456,
            [0x00, 0x12, 0x34, 0x56],
            0x09fcfb57,
            undefined
        );
    }

    @test
    public fromUInt_positive3Byte_littleEndian() {
        ByteVector_ConstructorTests.testUInt(
            0x123456,
            [0x56, 0x34, 0x12, 0x00],
            0x77b636ba,
            false
        );
    }

    @test
    public fromUInt_positive4Byte_bigEndian() {
        ByteVector_ConstructorTests.testUInt(
            0x12345678,
            [0x12, 0x34, 0x56, 0x78],
            0x188e5750,
            undefined
        );
    }

    @test
    public fromUInt_positive4Byte_littleEndian() {
        ByteVector_ConstructorTests.testUInt(
            0x12345678,
            [0x78, 0x56, 0x34, 0x12],
            0x6a330d2d,
            false
        );
    }

    @test
    public fromUInt_unsignedRange_bigEndian() {
        ByteVector_ConstructorTests.testUInt(
            0xFFFFFFFF,
            [0xFF, 0xFF, 0xFF, 0xFF],
            0xc704dd7b,
            undefined
        );
    }

    @test
    public fromUInt_unsignedRange_littleEndian() {
        ByteVector_ConstructorTests.testUInt(
            0xFFFFFFFF,
            [0xFF, 0xFF, 0xFF, 0xFF],
            0xc704dd7b,
            false
        );
    }

    @test
    public fromUlong_bigInt_badValue() {
        // Arrange, Act, Assert
        Testers.testTruthy((v: bigint) => { ByteVector.fromUlong(v); });
    }

    @test
    public fromUlong_number_badValue() {
        // Arrange / Act / Assert
        Testers.testSafeUint((v: number) => { ByteVector.fromUlong(v); });
    }

    @test
    public fromUlong_bigInt_overflow() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromUlong(BigInt("18446744073709551616")); });
        assert.throws(() => { ByteVector.fromUlong(BigInt("-1")); });
    }

    @test
    public fromUlong_positiveNumber_bigEndian() {
        this.testUlong(
            0x1234,
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34],
            0x77951e50,
            undefined
        );
    }

    @test
    public fromUlong_positiveNumber_littleEndian() {
        this.testUlong(
            0x1234,
            [0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0xe032bc9b,
            false
        );
    }

    @test
    public fromUlong_bigPositiveNumber_bigEndian() {
        this.testUlong(
            0x1234000000,
            [0x00, 0x00, 0x00, 0x12, 0x34, 0x00, 0x00, 0x00],
            0x70c0e641,
            undefined
        );
    }

    @test
    public fromUlong_bigPositiveNumber_littleEndian() {
        this.testUlong(
            0x1234000000,
            [0x00, 0x00, 0x00, 0x34, 0x12, 0x00, 0x00, 0x00],
            0xeb4d895a,
            false
        );
    }

    @test
    public fromUlong_bigIntPositive1Byte_bigEndian() {
        this.testUlong(
            BigInt("0x12"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12],
            0x4593e01e,
            undefined
        );
    }

    @test
    public fromUlong_numberPositive1Byte_bigEndian() {
        this.testUlong(
            0x12,
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12],
            0x4593e01e,
            undefined
        );
    }

    @test
    public fromUlong_bigIntPositive1Byte_littleEndian() {
        this.testUlong(
            BigInt("0x12"),
            [0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0x1a9b1e5f,
            false
        );
    }

    @test
    public fromUlong_numberPositive1Byte_littleEndian() {
        this.testUlong(
            0x12,
            [0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0x1a9b1e5f,
            false
        );
    }

    @test
    public fromUlong_bigIntPositive2Byte_bigEndian() {
        this.testUlong(
            BigInt("0x1234"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34],
            0x77951e50,
            undefined
        );
    }

    @test
    public fromUlong_numberPositive2Byte_bigEndian() {
        this.testUlong(
            0x1234,
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34],
            0x77951e50,
            undefined
        );
    }

    @test
    public fromUlong_bigIntPositive2Byte_littleEndian() {
        this.testUlong(
            BigInt("0x1234"),
            [0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0xe032bc9b,
            false
        );
    }

    @test
    public fromUlong_numberPositive2Byte_littleEndian() {
        this.testUlong(
            0x1234,
            [0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0xe032bc9b,
            false
        );
    }

    @test
    public fromUlong_bigIntPositive3Byte_bigEndian() {
        this.testUlong(
            BigInt("0x123456"),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56],
            0x09fcfb57,
            undefined
        );
    }

    @test
    public fromUlong_numberPositive3Byte_bigEndian() {
        this.testUlong(
            0x123456,
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56],
            0x09fcfb57,
            undefined
        );
    }

    @test
    public fromUlong_bigIntPositive3Byte_littleEndian() {
        this.testUlong(
            BigInt("0x123456"),
            [0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00],
            0x59e6bc55,
            false
        );
    }

    @test
    public fromUlong_numberPositive3Byte_littleEndian() {
        this.testUlong(
            0x123456,
            [0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00],
            0x59e6bc55,
            false
        );
    }

    @test
    public fromUlong_bigIntPositive4Byte_bigEndian() {
        this.testUlong(
            BigInt("0x12345678"),
            [0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78],
            0x188e5750,
            undefined
        );
    }

    @test
    public fromUlong_numberPositive4Byte_bigEndian() {
        this.testUlong(
            0x12345678,
            [0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78],
            0x188e5750,
            undefined
        );
    }

    @test
    public fromUlong_bigIntPositive4Byte_littleEndian() {
        this.testUlong(
            BigInt("0x12345678"),
            [0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00],
            0xee67587a,
            false
        );
    }

    @test
    public fromUlong_numberPositive4Byte_littleEndian() {
        this.testUlong(
            0x12345678,
            [0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00, 0x00],
            0xee67587a,
            false
        );
    }

    @test
    public fromUlong_bigIntPositive5Byte_bigEndian() {
        this.testUlong(
            BigInt("0x123456789A"),
            [0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A],
            0xeed98b80,
            undefined
        );
    }

    @test
    public fromUlong_numberPositive5Byte_bigEndian() {
        this.testUlong(
            0x123456789A,
            [0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A],
            0xeed98b80,
            undefined
        );
    }

    @test
    public fromUlong_bigIntPositive5Byte_littleEndian() {
        this.testUlong(
            BigInt("0x123456789A"),
            [0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00],
            0xa9896e71,
            false
        );
    }

    @test
    public fromUlong_numberPositive5Byte_littleEndian() {
        this.testUlong(
            0x123456789A,
            [0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00, 0x00],
            0xa9896e71,
            false
        );
    }

    @test
    public fromUlong_bigIntPositive6Byte_bigEndian() {
        this.testUlong(
            BigInt("0x123456789ABC"),
            [0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC],
            0xa89e1069,
            undefined
        );
    }

    @test
    public fromUlong_numberPositive6Byte_bigEndian() {
        this.testUlong(
            0x123456789ABC,
            [0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC],
            0xa89e1069,
            undefined
        );
    }

    @test
    public fromUlong_bigIntPositive6Byte_littleEndian() {
        this.testUlong(
            BigInt("0x123456789ABC"),
            [0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00],
            0x8c546d6b,
            false
        );
    }

    @test
    public fromUlong_numberPositive6Byte_littleEndian() {
        this.testUlong(
            0x123456789ABC,
            [0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00, 0x00],
            0x8c546d6b,
            false
        );
    }

    @test
    public fromUlong_bigIntPositive7Byte_bigEndian() {
        this.testUlong(
            BigInt("0x123456789ABCDE"),
            [0x00, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE],
            0x64223955,
            undefined
        );
    }

    @test
    public fromUlong_bigIntPositive7Byte_littleEndian() {
        this.testUlong(
            BigInt("0x123456789ABCDE"),
            [0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12, 0x00],
            0x662acd89,
            false
        );
    }

    @test
    public fromUlong_bigIntPositive8Byte_bigEndian() {
        this.testUlong(
            BigInt("0x123456789ABCDEF0"),
            [0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0],
            0x14201842,
            undefined
        );
    }

    @test
    public fromUlong_bigIntPositive8Byte_littleEndian() {
        this.testUlong(
            BigInt("0x123456789ABCDEF0"),
            [0xF0, 0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12],
            0x47c71870,
            false
        );
    }

    @test
    public fromUlong_bigIntUnsignedRange_bigEndian() {
        this.testUlong(
            BigInt("0xFFFFFFFFFFFFFFFF"),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            0xae006622,
            undefined
        );
    }

    @test
    public fromUlong_bigIntUnsignedRange_littleEndian() {
        this.testUlong(
            BigInt("0xFFFFFFFFFFFFFFFF"),
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            0xae006622,
            false
        );
    }

    @test
    public fromUlong_bigIntZero_bigEndian() {
        this.testUlong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0x00000000,
            undefined
        );
    }

    @test
    public fromUlong_numberZero_bigEndian() {
        this.testUlong(
            0,
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0x00000000,
            undefined
        );
    }

    @test
    public fromUlong_bigIntZero_littleEndian() {
        this.testUlong(
            BigInt(0),
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0x00000000,
            false
        );
    }

    @test
    public fromUlong_numberZero_littleEndian() {
        this.testUlong(
            0,
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            0x00000000,
            false
        );
    }

    @test
    public fromUshort_badShort() {
        // Arrange, Act, Assert
        Testers.testUint((v: number) => { ByteVector.fromUshort(v); });
    }

    @test
    public fromUshort_overflow() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromUshort(0x1000000); });
        assert.throws(() => { ByteVector.fromUshort(-0x1000000); });
    }

    @test
    public fromUshort_zero_bigEndian() {
        ByteVector_ConstructorTests.testUshort(
            0x0,
            [0x0, 0x0],
            0x00000000,
            undefined
        );
    }

    @test
    public fromUshort_zero_littleEndian() {
        ByteVector_ConstructorTests.testUshort(
            0x0,
            [0x0, 0x0],
            0x00000000,
            false
        );
    }

    @test
    public fromUshort_positive1Byte_bigEndian() {
        ByteVector_ConstructorTests.testUshort(
            0x12,
            [0x00, 0x12],
            0x4593e01e,
            undefined
        );
    }

    @test
    public fromUshort_positive1Byte_littleEndian() {
        ByteVector_ConstructorTests.testUshort(
            0x12,
            [0x12, 0x00],
            0xb0a3051c,
            false
        );
    }

    @test
    public fromUshort_positive2Byte_bigEndian() {
        ByteVector_ConstructorTests.testUshort(
            0x1234,
            [0x12, 0x34],
            0x77951e50,
            undefined
        );
    }

    @test
    public fromUshort_positive2Byte_littleEndian() {
        ByteVector_ConstructorTests.testUshort(
            0x1234,
            [0x34, 0x12],
            0x30456c82,
            false
        );
    }

    @test
    public fromUshort_unsignedRange_bigEndian() {
        ByteVector_ConstructorTests.testUshort(
            0xFFFF,
            [0xFF, 0xFF],
            0xff48647d,
            undefined
        );
    }

    @test
    public fromUshort_unsignedRange_littleEndian() {
        ByteVector_ConstructorTests.testUshort(
            0xFFFF,
            [0xFF, 0xFF],
            0xff48647d,
            false
        );
    }

    private static equalContents(bv: ByteVector, expected: ArrayLike<number>): void {
        assert.strictEqual(bv.length, expected.length);
        for (let i = 0; i < bv.length; i++) {
            assert.strictEqual(bv.get(i), expected[i]);
        }
    }

    private static testInt(
        value: number,
        expectedData: number[],
        expectedCrc: number,
        bigEndian: boolean
    ): void {
        ByteVector_ConstructorTests.testFromX(
            ByteVector.fromInt(value, bigEndian),
            expectedData,
            expectedCrc
        );
    }

    private testLong(
        value: bigint | number,
        expectedData: number[],
        expectedCrc: number,
        bigEndian: boolean
    ): void {
        ByteVector_ConstructorTests.testFromX(
            ByteVector.fromLong(value, bigEndian),
            expectedData,
            expectedCrc,
        );
    }

    private static testShort(
        value: number,
        expectedData: number[],
        expectedCrc: number,
        bigEndian: boolean
    ): void {
        ByteVector_ConstructorTests.testFromX(
            ByteVector.fromShort(value, bigEndian),
            expectedData,
            expectedCrc
        );
    }

    private static testString(
        str: string,
        expectedData: number[]|Uint8Array,
        expectedCrc: number,
        stringType: StringType,
        inputLength: number
    ) {
        ByteVector_ConstructorTests.testFromX(
            ByteVector.fromString(str, stringType, inputLength),
            expectedData,
            expectedCrc
        );
    }

    private static testUInt(
        value: number,
        expectedData: number[],
        expectedCrc: number,
        bigEndian: boolean
    ): void {
        ByteVector_ConstructorTests.testFromX(
            ByteVector.fromUint(value, bigEndian),
            expectedData,
            expectedCrc
        );
    }

    private testUlong(
        value: bigint | number,
        expectedData: number[],
        expectedCrc: number,
        bigEndian: boolean
    ): void {
        ByteVector_ConstructorTests.testFromX(
            ByteVector.fromUlong(value, bigEndian),
            expectedData,
            expectedCrc,
        );
    }

    private static testUshort(
        value: number,
        expectedData: number[],
        expectedCrc: number,
        bigEndian: boolean
    ): void {
        ByteVector_ConstructorTests.testFromX(
            ByteVector.fromUshort(value, bigEndian),
            expectedData,
            expectedCrc
        );
    }

    private static testFromX(
        bv: ByteVector,
        expectedData: number[]|Uint8Array,
        expectedCrc: number
    ): ByteVector {
        // Assert
        assert.isOk(bv);

        assert.strictEqual(bv.checksum, expectedCrc);
        assert.strictEqual(bv.isEmpty, expectedData.length === 0);
        assert.isFalse(bv.isReadOnly);
        assert.isFalse(bv.isView);
        assert.strictEqual(bv.length, expectedData.length);

        ByteVector_ConstructorTests.equalContents(bv, expectedData);

        return bv;
    }
}
