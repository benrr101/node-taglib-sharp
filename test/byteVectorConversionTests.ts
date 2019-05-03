import * as BigInt from "big-integer";
import * as Chai from "chai";
import {slow, suite, test, timeout} from "mocha-typescript";

import TestConstants from "./testConstants";
import {ByteVector, StringType} from "../src/byteVector";

const assert = Chai.assert;

@suite(timeout(3000), slow(1000)) class ByteVectorToDoubleTests {
    private static readonly PositiveBV = ByteVector.fromByteArray(  // 56.12
        new Uint8Array([0x8F, 0xC2, 0xF5, 0x28, 0x5C, 0x0F, 0x4C, 0x40, 0xAA])
    );
    private static readonly NegativeBV = ByteVector.fromByteArray(  // -12.34
        new Uint8Array([0xAE, 0x47, 0xE1, 0x7A, 0x14, 0xAE, 0x28, 0xC0, 0xAA])
    );

    @test
    public InvalidSize() {
        assert.throws(() => { ByteVector.fromSize(0).toDouble(); });
        assert.throws(() => { ByteVector.fromSize(1).toDouble(); });
        assert.throws(() => { ByteVector.fromSize(2).toDouble(); });
        assert.throws(() => { ByteVector.fromSize(3).toDouble(); });
        assert.throws(() => { ByteVector.fromSize(4).toDouble(); });
        assert.throws(() => { ByteVector.fromSize(5).toDouble(); });
        assert.throws(() => { ByteVector.fromSize(6).toDouble(); });
        assert.throws(() => { ByteVector.fromSize(7).toDouble(); });
    }

    @test
    public Zero_Complete() {
        const float = ByteVector.fromByteArray(new Uint8Array([0x00, 0x00, 0x00, 0x00])).toFloat();
        assert.strictEqual(float, 0);
    }

    @test
    public PositiveBigEndian() {
        const double = ByteVectorToDoubleTests.PositiveBV.toDouble();
        assert.closeTo(double, -9.5397675953257207e-233, 0.000000000001e-233);
    }

    @test
    public PositiveLittleEndian() {
        const double = ByteVectorToDoubleTests.PositiveBV.toDouble(false);
        assert.closeTo(double, 56.12, 0.01);
    }

    @test
    public NegativeBigEndian() {
        const double = ByteVectorToDoubleTests.NegativeBV.toDouble();
        assert.closeTo(double, -9.6037214055410557e-86, 0.00000000001e-86);
    }

    @test
    public NegativeLittleEndian() {
        const double = ByteVectorToDoubleTests.NegativeBV.toDouble(false);
        assert.closeTo(double, -12.34, 0.01);
    }

    @test
    public DoubleRangeBigEndian() {
        const double = ByteVector.fromByteArray(new Uint8Array([0x7F, 0xEF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]))
            .toDouble();
        assert.closeTo(double, 1.7976931348623157e308, 0.000000000001e308);
    }

    @test
    public DoubleRangeLittleEndian() {
        const double = ByteVector.fromByteArray(new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xEF, 0x7F]))
            .toDouble(false);
        assert.closeTo(double, 1.7976931348623157e308, 0.000000000001e308);
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorToFloatTests {
    private static readonly PositiveBV = ByteVector.fromByteArray(  // 56.12
        new Uint8Array([0xE1, 0x7A, 0x60, 0x42, 0xAA])
    );
    private static readonly NegativeBV = ByteVector.fromByteArray(  // -12.34
        new Uint8Array([0xA4, 0x70, 0x45, 0xC1, 0xAA])
    );

    @test
    public InvalidSize() {
        assert.throws(() => { ByteVector.fromSize(0).toFloat(); });
        assert.throws(() => { ByteVector.fromSize(1).toFloat(); });
        assert.throws(() => { ByteVector.fromSize(2).toFloat(); });
        assert.throws(() => { ByteVector.fromSize(3).toFloat(); });
    }

    @test
    public Zero_Complete() {
        const float = ByteVector.fromByteArray(new Uint8Array([0x00, 0x00, 0x00, 0x00])).toFloat();
        assert.strictEqual(float, 0);
    }

    @test
    public PositiveBigEndian() {
        const float = ByteVectorToFloatTests.PositiveBV.toFloat();
        assert.closeTo(float, -2.88663883e20, 0.00000001e20);
    }

    @test
    public PositiveLittleEndian() {
        const float = ByteVectorToFloatTests.PositiveBV.toFloat(false);
        assert.closeTo(float, 56.12, 0.01);
    }

    @test
    public NegativeBigEndian() {
        const float = ByteVectorToFloatTests.NegativeBV.toFloat();
        assert.closeTo(float, -5.21007881e-17, 0.00000001e-17);
    }

    @test
    public NegativeLittleEndian() {
        const float = ByteVectorToFloatTests.NegativeBV.toFloat(false);
        assert.closeTo(float, -12.34, 0.01);
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorToIntTests {
    private static readonly NegativeCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0xFE, 0xFD, 0xFC, 0xFC, 0xAA])
    );
    private static readonly NegativeIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0xFC, 0xFD])
    );
    private static readonly PositiveCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xAA])
    );
    private static readonly PositiveIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02])
    );

    @test
    public Empty() {
        const int = ByteVector.fromSize(0).toInt();
        assert.strictEqual(int, 0);
    }

    @test
    public Zero_Complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0, 0x0, 0x0, 0xAA])).toInt();
        assert.strictEqual(int, 0);
    }

    @test
    public Zero_Incomplete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0])).toInt();
        assert.strictEqual(int, 0);
    }

    @test
    public PositiveBigEndian_Complete() {
        const int = ByteVectorToIntTests.PositiveCompleteBV.toInt();
        assert.strictEqual(int, 0x01020304);
    }

    @test
    public PositiveBigEndian_Incomplete() {
        const int = ByteVectorToIntTests.PositiveIncompleteBV.toInt();
        assert.strictEqual(int, 0x00000102);
    }

    @test
    public PositiveLittleEndian_Complete() {
        const int = ByteVectorToIntTests.PositiveCompleteBV.toInt(false);
        assert.strictEqual(int, 0x04030201);
    }

    @test
    public PositiveLittleEndian_Incomplete() {
        const int = ByteVectorToIntTests.PositiveIncompleteBV.toInt(false);
        assert.strictEqual(int, 0x00000201);
    }

    @test
    public NegativeBigEndian_Complete() {
        const int = ByteVectorToIntTests.NegativeCompleteBV.toInt();
        assert.strictEqual(int, -0x01020304);
    }

    @test
    public NegativeBigEndian_Incomplete() {
        const int = ByteVectorToIntTests.NegativeIncompleteBV.toInt();
        assert.strictEqual(int, 0x0000FCFD);
    }

    @test
    public NegativeLittleEndian_Complete() {
        const int = ByteVectorToIntTests.NegativeCompleteBV.toInt(false);
        assert.strictEqual(int, -0x03030202);
    }

    @test
    public NegativeLittleEndian_Incomplete() {
        const int = ByteVectorToIntTests.NegativeIncompleteBV.toInt(false);
        assert.strictEqual(int, 0x0000FDFC);
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorToLongTests {
    private static readonly NegativeCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0xFE, 0xFD, 0xFC, 0xFB, 0xFA, 0xF9, 0xF8, 0xF8, 0xAA])
    );
    private static readonly NegativeIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0xFE, 0xFD, 0xFC, 0xFC])
    );
    private static readonly PositiveCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0xAA])
    );
    private static readonly PositiveIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0x03, 0x04])
    );

    @test
    public Empty() {
        const long = ByteVector.fromSize(0).toLong();
        assert.isTrue(long.equals(BigInt(0)));
    }

    @test
    public Zero_Complete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAA])
        ).toLong();
        assert.isTrue(long.equals(BigInt(0)));
    }

    @test
    public Zero_Incomplete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0x00, 0x00, 0x00, 0x00])
        ).toLong();
        assert.isTrue(long.equals(BigInt(0)));
    }

    @test
    public PositiveBigEndian_Complete() {
        const long = ByteVectorToLongTests.PositiveCompleteBV.toLong();
        assert.isTrue(long.equals(BigInt("0102030405060708", 16)));
    }

    @test
    public PositiveBigEndian_Incomplete() {
        const long = ByteVectorToLongTests.PositiveIncompleteBV.toLong();
        assert.isTrue(long.equals(BigInt("01020304", 16)));
    }

    @test
    public PositiveLittleEndian_Complete() {
        const long = ByteVectorToLongTests.PositiveCompleteBV.toLong(false);
        assert.isTrue(long.equals(BigInt("0807060504030201", 16)));
    }

    @test
    public PositiveLittleEndian_Incomplete() {
        const long = ByteVectorToLongTests.PositiveIncompleteBV.toLong(false);
        assert.isTrue(long.equals(BigInt("04030201", 16)));
    }

    @test
    public NegativeBigEndian_Complete() {
        const long = ByteVectorToLongTests.NegativeCompleteBV.toLong();
        assert.isTrue(long.equals(BigInt("-0102030405060708", 16)));
    }

    @test
    public NegativeBigEndian_Incomplete() {
        const long = ByteVectorToLongTests.NegativeIncompleteBV.toLong();
        assert.isTrue(long.equals(BigInt("FEFDFCFC", 16)));
    }

    @test
    public NegativeLittleEndian_Complete() {
        const long = ByteVectorToLongTests.NegativeCompleteBV.toLong(false);
        assert.isTrue(long.equals(BigInt("-0707060504030202", 16)));
    }

    @test
    public NegativeLittleEndian_Incomplete() {
        const long = ByteVectorToLongTests.NegativeIncompleteBV.toLong(false);
        assert.isTrue(long.equals(BigInt("FCFCFDFE", 16)));
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorToShortTests {
    private static readonly NegativeCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0xFE, 0xFD, 0xAA])
    );
    private static readonly NegativeIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0xFC])
    );
    private static readonly PositiveCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0xAA])
    );
    private static readonly PositiveIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01])
    );

    @test
    public Empty() {
        const int = ByteVector.fromSize(0).toShort();
        assert.strictEqual(int, 0);
    }

    @test
    public Zero_Complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0, 0x0, 0x0, 0xAA])).toShort();
        assert.strictEqual(int, 0);
    }

    @test
    public Zero_Incomplete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0])).toShort();
        assert.strictEqual(int, 0);
    }

    @test
    public PositiveBigEndian_Complete() {
        const int = ByteVectorToShortTests.PositiveCompleteBV.toShort();
        assert.strictEqual(int, 0x0102);
    }

    @test
    public PositiveBigEndian_Incomplete() {
        const int = ByteVectorToShortTests.PositiveIncompleteBV.toShort();
        assert.strictEqual(int, 0x01);
    }

    @test
    public PositiveLittleEndian_Complete() {
        const int = ByteVectorToShortTests.PositiveCompleteBV.toShort(false);
        assert.strictEqual(int, 0x0201);
    }

    @test
    public PositiveLittleEndian_Incomplete() {
        const int = ByteVectorToShortTests.PositiveIncompleteBV.toShort(false);
        assert.strictEqual(int, 0x01);
    }

    @test
    public NegativeBigEndian_Complete() {
        const int = ByteVectorToShortTests.NegativeCompleteBV.toShort();
        assert.strictEqual(int, -0x0103);
    }

    @test
    public NegativeBigEndian_Incomplete() {
        const int = ByteVectorToShortTests.NegativeIncompleteBV.toShort();
        assert.strictEqual(int, 0x00FC);
    }

    @test
    public NegativeLittleEndian_Complete() {
        const int = ByteVectorToShortTests.NegativeCompleteBV.toShort(false);
        assert.strictEqual(int, -0x0202);
    }

    @test
    public NegativeLittleEndian_Incomplete() {
        const int = ByteVectorToShortTests.NegativeIncompleteBV.toShort(false);
        assert.strictEqual(int, 0x00FC);
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorToStringTests {
    @test
    public InvalidOffset() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromSize(0).toString(0.1); });
        assert.throws(() => { ByteVector.fromSize(0).toString(-1); });
        assert.throws(() => { ByteVector.fromSize(0).toString(1234); });
    }

    @test
    public InvalidCount() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromSize(1).toString(0, undefined, 0.1); });
        assert.throws(() => { ByteVector.fromSize(1).toString(0, undefined, -1); });
        assert.throws(() => { ByteVector.fromSize(1).toString(0, undefined, 1234); });
    }

    @test
    public Utf8Full() {
        const str = ByteVector.fromString(TestConstants.testStrings.UTF8.str)
            .toString(TestConstants.testStrings.UTF8.bytes.length);
        assert.strictEqual(str, TestConstants.testStrings.UTF8.str);
    }

    @test
    public Utf8Partial() {
        const str = ByteVector.fromString(TestConstants.testStrings.UTF8.str + TestConstants.testStrings.UTF8.str)
            .toString(
                TestConstants.testStrings.UTF8.bytes.length,
                undefined,
                TestConstants.testStrings.UTF8.bytes.length
            );
        assert.strictEqual(str, TestConstants.testStrings.UTF8.str);
    }

    @test
    public Utf8Empty() {
        const str = ByteVector.fromSize(0).toString(0);
        assert.strictEqual(str, "");
    }

    @test
    public Utf16LittleEndianFull() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        const str = ByteVector.fromString(TestConstants.testStrings.UTF16LE.str, StringType.UTF16LE)
            .toString(TestConstants.testStrings.UTF16LE.bytes.length, StringType.UTF16LE);
        assert.strictEqual(str, TestConstants.testStrings.UTF16LE.str);
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public Utf16LittleEndianPartial() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        const str = ByteVector.fromString(
            TestConstants.testStrings.UTF16LE.str + TestConstants.testStrings.UTF16LE.str,
            StringType.UTF16LE
            )
            .toString(
                TestConstants.testStrings.UTF16LE.bytes.length,
                StringType.UTF16LE,
                TestConstants.testStrings.UTF16LE.bytes.length
            );
        assert.strictEqual(str, TestConstants.testStrings.UTF16LE.str);
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public Utf16LittleEndianEmpty() {
        const str = ByteVector.fromSize(0).toString(0, StringType.UTF16LE);
        assert.strictEqual(str, "");
    }

    @test
    public Utf16BigEndianFull() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        const str = ByteVector.fromString(TestConstants.testStrings.UTF16BE.str, StringType.UTF16BE)
            .toString(TestConstants.testStrings.UTF16BE.bytes.length, StringType.UTF16BE);
        assert.strictEqual(str, TestConstants.testStrings.UTF16BE.str);
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public Utf16BigEndianPartial() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        const str = ByteVector.fromString(
            TestConstants.testStrings.UTF16BE.str + TestConstants.testStrings.UTF16BE.str,
            StringType.UTF16BE
        )
            .toString(
                TestConstants.testStrings.UTF16BE.bytes.length,
                StringType.UTF16BE,
                TestConstants.testStrings.UTF16BE.bytes.length
            );
        assert.strictEqual(str, TestConstants.testStrings.UTF16BE.str);
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public Utf16BigEndianEmpty() {
        const str = ByteVector.fromSize(0).toString(0, StringType.UTF16BE);
        assert.strictEqual(str, "");
    }

    @test
    public Latin1Full() {
        const str = ByteVector.fromString(TestConstants.testStrings.Latin1.str, StringType.Latin1)
            .toString(TestConstants.testStrings.Latin1.bytes.length, StringType.Latin1);
        assert.strictEqual(str, TestConstants.testStrings.Latin1.str);
    }

    @test
    public Latin1Partial() {
        const str = ByteVector.fromString(
            TestConstants.testStrings.Latin1.str + TestConstants.testStrings.Latin1.str,
                StringType.Latin1
            )
            .toString(
                TestConstants.testStrings.Latin1.bytes.length,
                StringType.Latin1,
                TestConstants.testStrings.Latin1.bytes.length
            );
        assert.strictEqual(str, TestConstants.testStrings.Latin1.str);
    }

    @test
    public Latin1Empty() {
        const str = ByteVector.fromSize(0).toString(0, StringType.Latin1);
        assert.strictEqual(str, "");
    }

    @test
    public Utf16Full() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "something bogus";

        const str = ByteVector.fromString(TestConstants.testStrings.UTF16LEWithBOM.str, StringType.UTF16)
            .toString(TestConstants.testStrings.UTF16LEWithBOM.bytes.length, StringType.UTF16);
        assert.strictEqual(str, TestConstants.testStrings.UTF16LEWithBOM.str);
        assert.strictEqual(ByteVector.lastUtf16Encoding, "utf16-le");

        // Cleanup
        ByteVector.lastUtf16Encoding = originalLastEncoding;
    }

    @test
    public Utf16Partial() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "something bogus";

        const str = ByteVector.fromString(
                TestConstants.testStrings.UTF16LEWithBOM.str,
                StringType.UTF16
            )
            .toString(
                TestConstants.testStrings.UTF16LEWithBOM.bytes.length,
                StringType.UTF16
            );
        assert.strictEqual(str, TestConstants.testStrings.UTF16LEWithBOM.str);
        assert.strictEqual(ByteVector.lastUtf16Encoding, "utf16-le");

        // Cleanup
        ByteVector.lastUtf16Encoding = originalLastEncoding;
    }

    @test
    public Utf16Empty() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "utf16-le";

        const str = ByteVector.fromSize(0).toString(0, StringType.UTF16);
        assert.strictEqual(str, "");
        assert.strictEqual(ByteVector.lastUtf16Encoding, "utf16-le");

        // Cleanup
        ByteVector.lastUtf16Encoding = originalLastEncoding;
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorToStringsTests {
    @test
    public InvalidOffset() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromSize(0).toString(0.1); });
        assert.throws(() => { ByteVector.fromSize(0).toString(-1); });
        assert.throws(() => { ByteVector.fromSize(0).toString(1234); });
    }

    @test
    public InvalidCount() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromSize(1).toString(0, undefined, 0.1); });
        assert.throws(() => { ByteVector.fromSize(1).toString(0, undefined, -1); });
    }

    @test
    public Utf8Single() {
        ByteVectorToStringsTests.TestString(
            "\0\0" + TestConstants.testStrings.UTF8.str,
            StringType.UTF8,
            2,
            undefined,
            [TestConstants.testStrings.UTF8.str]
        );
    }

    @test
    public Utf8Multiple() {
        ByteVectorToStringsTests.TestString(
            TestConstants.testStrings.UTF8.str + "\0\0" + TestConstants.testStrings.UTF8.str,
            StringType.UTF8,
            0,
            undefined,
            [TestConstants.testStrings.UTF8.str, "", TestConstants.testStrings.UTF8.str]
        );
    }

    @test
    public Utf16LittleEndianSingle() {
        ByteVectorToStringsTests.TestString(
            "\0\0" + TestConstants.testStrings.UTF16LE.str,
            StringType.UTF16LE,
            2,
            undefined,
            ["", TestConstants.testStrings.UTF16LE.str]
        );
    }

    @test
    public Ut16LittleEndianMultiple() {
        ByteVectorToStringsTests.TestString(
            TestConstants.testStrings.UTF16LE.str + "\0\0" + TestConstants.testStrings.UTF16LE.str,
            StringType.UTF16LE,
            0,
            undefined,
            [TestConstants.testStrings.UTF16LE.str, "", TestConstants.testStrings.UTF16LE.str]
        );
    }

    @test
    public Utf16BigEndianSingle() {
        ByteVectorToStringsTests.TestString(
            "\0\0" + TestConstants.testStrings.UTF16BE.str,
            StringType.UTF16BE,
            2,
            undefined,
            ["", TestConstants.testStrings.UTF16BE.str]
        );
    }

    @test
    public Ut16BigEndianMultiple() {
        ByteVectorToStringsTests.TestString(
            TestConstants.testStrings.UTF16BE.str + "\0\0" + TestConstants.testStrings.UTF16BE.str,
            StringType.UTF16BE,
            0,
            undefined,
            [TestConstants.testStrings.UTF16BE.str, "", TestConstants.testStrings.UTF16BE.str]
        );
    }

    @test
    public Utf16Single() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "utf16-le";

        ByteVectorToStringsTests.TestString(
            "\0\0" + TestConstants.testStrings.UTF16LEWithBOM.str,
            StringType.UTF16,
            2,
            undefined,
            ["", "", TestConstants.testStrings.UTF16LEWithBOM.str]
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, "utf16-le");

        // Cleanup
        ByteVector.lastUtf16Encoding = originalLastEncoding;
    }

    @test
    public Utf16Multiple() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "utf16-le";

        ByteVectorToStringsTests.TestString(
            TestConstants.testStrings.UTF16LEWithBOM.str + "\0\0" + TestConstants.testStrings.UTF16LEWithBOM.str,
            StringType.UTF16,
            0,
            undefined,
            [TestConstants.testStrings.UTF16LEWithBOM.str, "", TestConstants.testStrings.UTF16LEWithBOM.str]
        );
        assert.strictEqual(ByteVector.lastUtf16Encoding, "utf16-le");

        // Cleanup
        ByteVector.lastUtf16Encoding = originalLastEncoding;
    }

    private static TestString(
        textInput: string,
        stringType: StringType,
        offset: number,
        count: number,
        expected: string[]
    ) {
        // Arrange
        const bv = ByteVector.fromString(textInput, stringType);

        // Act
        const strs = bv.toStrings(stringType, offset, count);

        // Assert
        assert.deepEqual(strs, expected);
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorToUIntTests {
    private static readonly PositiveCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xAA])
    );
    private static readonly PositiveIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02])
    );

    @test
    public Empty() {
        const int = ByteVector.fromSize(0).toUInt();
        assert.strictEqual(int, 0);
    }

    @test
    public Zero_Complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0, 0x0, 0x0, 0xAA])).toUInt();
        assert.strictEqual(int, 0);
    }

    @test
    public Zero_Incomplete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0])).toUInt();
        assert.strictEqual(int, 0);
    }

    @test
    public PositiveBigEndian_Complete() {
        const int = ByteVectorToUIntTests.PositiveCompleteBV.toUInt();
        assert.strictEqual(int, 0x01020304);
    }

    @test
    public PositiveBigEndian_Incomplete() {
        const int = ByteVectorToUIntTests.PositiveIncompleteBV.toUInt();
        assert.strictEqual(int, 0x00000102);
    }

    @test
    public PositiveLittleEndian_Complete() {
        const int = ByteVectorToUIntTests.PositiveCompleteBV.toUInt(false);
        assert.strictEqual(int, 0x04030201);
    }

    @test
    public PositiveLittleEndian_Incomplete() {
        const int = ByteVectorToUIntTests.PositiveIncompleteBV.toUInt(false);
        assert.strictEqual(int, 0x00000201);
    }

    @test
    public UnsignedRange_Complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF])).toUInt();
        assert.strictEqual(int, 0xFFFFFFFF);
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorToULongTests {
    private static readonly PositiveCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0xAA])
    );
    private static readonly PositiveIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0x03, 0x04])
    );

    @test
    public Empty() {
        const long = ByteVector.fromSize(0).toULong();
        assert.isTrue(long.equals(BigInt(0)));
    }

    @test
    public Zero_Complete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAA])
        ).toULong();
        assert.isTrue(long.equals(BigInt(0)));
    }

    @test
    public Zero_Incomplete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0x00, 0x00, 0x00, 0x00])
        ).toULong();
        assert.isTrue(long.equals(BigInt(0)));
    }

    @test
    public PositiveBigEndian_Complete() {
        const long = ByteVectorToULongTests.PositiveCompleteBV.toULong();
        assert.isTrue(long.equals(BigInt("0102030405060708", 16)));
    }

    @test
    public PositiveBigEndian_Incomplete() {
        const long = ByteVectorToULongTests.PositiveIncompleteBV.toULong();
        assert.isTrue(long.equals(BigInt("01020304", 16)));
    }

    @test
    public PositiveLittleEndian_Complete() {
        const long = ByteVectorToULongTests.PositiveCompleteBV.toULong(false);
        assert.isTrue(long.equals(BigInt("0807060504030201", 16)));
    }

    @test
    public PositiveLittleEndian_Incomplete() {
        const long = ByteVectorToULongTests.PositiveIncompleteBV.toULong(false);
        assert.isTrue(long.equals(BigInt("04030201", 16)));
    }

    @test
    public UnsignedRange_Complete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF])
        ).toULong();
        assert.isTrue(long.equals(BigInt("FFFFFFFFFFFFFFFF", 16)));
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorToUShortTests {
    private static readonly PositiveCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0xAA])
    );
    private static readonly PositiveIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01])
    );

    @test
    public Empty() {
        const int = ByteVector.fromSize(0).toUShort();
        assert.strictEqual(int, 0);
    }

    @test
    public Zero_Complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0, 0x0, 0x0, 0xAA])).toUShort();
        assert.strictEqual(int, 0);
    }

    @test
    public Zero_Incomplete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0])).toUShort();
        assert.strictEqual(int, 0);
    }

    @test
    public PositiveBigEndian_Complete() {
        const int = ByteVectorToUShortTests.PositiveCompleteBV.toUShort();
        assert.strictEqual(int, 0x0102);
    }

    @test
    public PositiveBigEndian_Incomplete() {
        const int = ByteVectorToUShortTests.PositiveIncompleteBV.toUShort();
        assert.strictEqual(int, 0x01);
    }

    @test
    public PositiveLittleEndian_Complete() {
        const int = ByteVectorToUShortTests.PositiveCompleteBV.toUShort(false);
        assert.strictEqual(int, 0x0201);
    }

    @test
    public PositiveLittleEndian_Incomplete() {
        const int = ByteVectorToUShortTests.PositiveIncompleteBV.toUShort(false);
        assert.strictEqual(int, 0x01);
    }

    @test
    public UnsignedRange_Complete() {
        const short = ByteVector.fromByteArray(new Uint8Array([0xFF, 0xFF])).toUShort();
        assert.strictEqual(short, 0xFFFF);
    }
}
