import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import TestConstants from "./testConstants";
import {ByteVector, StringType} from "../src/byteVector";

const assert = Chai.assert;

@suite class ByteVector_ConversionTests {
    private readonly doublePositiveBV = ByteVector.fromByteArray(  // 56.12
        new Uint8Array([0x8F, 0xC2, 0xF5, 0x28, 0x5C, 0x0F, 0x4C, 0x40, 0xAA])
    );
    private readonly doubleNegativeBV = ByteVector.fromByteArray(  // -12.34
        new Uint8Array([0xAE, 0x47, 0xE1, 0x7A, 0x14, 0xAE, 0x28, 0xC0, 0xAA])
    );
    private readonly floatPositiveBV = ByteVector.fromByteArray(  // 56.12
        new Uint8Array([0xE1, 0x7A, 0x60, 0x42, 0xAA])
    );
    private readonly floatNegativeBV = ByteVector.fromByteArray(  // -12.34
        new Uint8Array([0xA4, 0x70, 0x45, 0xC1, 0xAA])
    );
    private readonly intNegativeCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0xFE, 0xFD, 0xFC, 0xFC, 0xAA])
    );
    private readonly intNegativeIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0xFC, 0xFD])
    );
    private readonly intPositiveCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xAA])
    );
    private readonly intPositiveIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02])
    );
    private readonly longNegativeCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0xFE, 0xFD, 0xFC, 0xFB, 0xFA, 0xF9, 0xF8, 0xF8, 0xAA])
    );
    private readonly longNegativeIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0xFE, 0xFD, 0xFC, 0xFC])
    );
    private readonly longPositiveCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0xAA])
    );
    private readonly longPositiveIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0x03, 0x04])
    );
    private readonly shortNegativeCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0xFE, 0xFD, 0xAA])
    );
    private readonly shortNegativeIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0xFC])
    );
    private readonly shortPositiveCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0xAA])
    );
    private readonly shortPositiveIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01])
    );
    private readonly uintPositiveCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xAA])
    );
    private readonly uintPositiveIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02])
    );
    private readonly ulongPositiveCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0xAA])
    );
    private readonly ulongPositiveIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0x03, 0x04])
    );
    private readonly ushortPositiveCompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01, 0x02, 0xAA])
    );
    private readonly ushortPositiveIncompleteBV = ByteVector.fromByteArray(
        new Uint8Array([0x01])
    );

    @test
    public toDouble_invalidSize() {
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
    public toDouble_zero_complete() {
        const float = ByteVector.fromByteArray(new Uint8Array([0x00, 0x00, 0x00, 0x00])).toFloat();
        assert.strictEqual(float, 0);
    }

    @test
    public toDouble_positiveBigEndian() {
        const double = this.doublePositiveBV.toDouble();
        assert.closeTo(double, -9.5397675953257207e-233, 0.000000000001e-233);
    }

    @test
    public toDouble_positiveLittleEndian() {
        const double = this.doublePositiveBV.toDouble(false);
        assert.closeTo(double, 56.12, 0.01);
    }

    @test
    public toDouble_negativeBigEndian() {
        const double = this.doubleNegativeBV.toDouble();
        assert.closeTo(double, -9.6037214055410557e-86, 0.00000000001e-86);
    }

    @test
    public toDouble_negativeLittleEndian() {
        const double = this.doubleNegativeBV.toDouble(false);
        assert.closeTo(double, -12.34, 0.01);
    }

    @test
    public toDouble_doubleRangeBigEndian() {
        const double = ByteVector.fromByteArray(new Uint8Array([0x7F, 0xEF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]))
            .toDouble();
        assert.closeTo(double, 1.7976931348623157e308, 0.000000000001e308);
    }

    @test
    public toDouble_doubleRangeLittleEndian() {
        const double = ByteVector.fromByteArray(new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xEF, 0x7F]))
            .toDouble(false);
        assert.closeTo(double, 1.7976931348623157e308, 0.000000000001e308);
    }

    @test
    public toFloat_invalidSize() {
        assert.throws(() => { ByteVector.fromSize(0).toFloat(); });
        assert.throws(() => { ByteVector.fromSize(1).toFloat(); });
        assert.throws(() => { ByteVector.fromSize(2).toFloat(); });
        assert.throws(() => { ByteVector.fromSize(3).toFloat(); });
    }

    @test
    public toFloat_zero_complete() {
        const float = ByteVector.fromByteArray(new Uint8Array([0x00, 0x00, 0x00, 0x00])).toFloat();
        assert.strictEqual(float, 0);
    }

    @test
    public toFloat_positiveBigEndian() {
        const float = this.floatPositiveBV.toFloat();
        assert.closeTo(float, -2.88663883e20, 0.00000001e20);
    }

    @test
    public toFloat_positiveLittleEndian() {
        const float = this.floatPositiveBV.toFloat(false);
        assert.closeTo(float, 56.12, 0.01);
    }

    @test
    public toFloat_negativeBigEndian() {
        const float = this.floatNegativeBV.toFloat();
        assert.closeTo(float, -5.21007881e-17, 0.00000001e-17);
    }

    @test
    public toFloat_negativeLittleEndian() {
        const float = this.floatNegativeBV.toFloat(false);
        assert.closeTo(float, -12.34, 0.01);
    }

    @test
    public toInt_empty() {
        const int = ByteVector.fromSize(0).toInt();
        assert.strictEqual(int, 0);
    }

    @test
    public toInt_zero_complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0, 0x0, 0x0, 0xAA])).toInt();
        assert.strictEqual(int, 0);
    }

    @test
    public toInt_zero_incomplete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0])).toInt();
        assert.strictEqual(int, 0);
    }

    @test
    public toInt_positiveBigEndian_complete() {
        const int = this.intPositiveCompleteBV.toInt();
        assert.strictEqual(int, 0x01020304);
    }

    @test
    public toInt_positiveBigEndian_incomplete() {
        const int = this.intPositiveIncompleteBV.toInt();
        assert.strictEqual(int, 0x00000102);
    }

    @test
    public toInt_positiveLittleEndian_complete() {
        const int = this.intPositiveCompleteBV.toInt(false);
        assert.strictEqual(int, 0x04030201);
    }

    @test
    public toInt_positiveLittleEndian_incomplete() {
        const int = this.intPositiveIncompleteBV.toInt(false);
        assert.strictEqual(int, 0x00000201);
    }

    @test
    public toInt_negativeBigEndian_complete() {
        const int = this.intNegativeCompleteBV.toInt();
        assert.strictEqual(int, -0x01020304);
    }

    @test
    public toInt_negativeBigEndian_incomplete() {
        const int = this.intNegativeIncompleteBV.toInt();
        assert.strictEqual(int, 0x0000FCFD);
    }

    @test
    public toInt_negativeLittleEndian_complete() {
        const int = this.intNegativeCompleteBV.toInt(false);
        assert.strictEqual(int, -0x03030202);
    }

    @test
    public toInt_negativeLittleEndian_incomplete() {
        const int = this.intNegativeIncompleteBV.toInt(false);
        assert.strictEqual(int, 0x0000FDFC);
    }

    @test
    public toLong_empty() {
        const long = ByteVector.fromSize(0).toLong();
        assert.strictEqual(long, BigInt(0));
    }

    @test
    public toLong_zero_complete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAA])
        ).toLong();
        assert.isTrue(long === BigInt(0));
    }

    @test
    public toLong_zero_incomplete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0x00, 0x00, 0x00, 0x00])
        ).toLong();
        assert.strictEqual(long,  BigInt(0));
    }

    @test
    public toLong_positiveBigEndian_complete() {
        const long = this.longPositiveCompleteBV.toLong();
        assert.strictEqual(long, BigInt("0x0102030405060708"));
    }

    @test
    public toLong_positiveBigEndian_incomplete() {
        const long = this.longPositiveIncompleteBV.toLong();
        assert.strictEqual(long, BigInt("0x01020304"));
    }

    @test
    public toLong_positiveLittleEndian_complete() {
        const long = this.longPositiveCompleteBV.toLong(false);
        assert.strictEqual(long, BigInt("0x0807060504030201"));
    }

    @test
    public toLong_positiveLittleEndian_incomplete() {
        const long = this.longPositiveIncompleteBV.toLong(false);
        assert.strictEqual(long, BigInt("0x04030201"));
    }

    @test
    public toLong_negativeBigEndian_complete() {
        const long = this.longNegativeCompleteBV.toLong();
        assert.strictEqual(long, BigInt("-72623859790382856"));
    }

    @test
    public toLong_negativeBigEndian_incomplete() {
        const long = this.longNegativeIncompleteBV.toLong();
        assert.strictEqual(long, BigInt("0xFEFDFCFC"));
    }

    @test
    public toLong_negativeLittleEndian_complete() {
        const long = this.longNegativeCompleteBV.toLong(false);
        assert.strictEqual(long, BigInt("-506380101714379266"));
    }

    @test
    public toLong_negativeLittleEndian_incomplete() {
        const long = this.longNegativeIncompleteBV.toLong(false);
        assert.strictEqual(long, BigInt("0xFCFCFDFE"));
    }

    @test
    public toShort_empty() {
        const int = ByteVector.fromSize(0).toShort();
        assert.strictEqual(int, 0);
    }

    @test
    public toShort_zero_complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0, 0x0, 0x0, 0xAA])).toShort();
        assert.strictEqual(int, 0);
    }

    @test
    public toShort_zero_incomplete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0])).toShort();
        assert.strictEqual(int, 0);
    }

    @test
    public toShort_positiveBigEndian_complete() {
        const int = this.shortPositiveCompleteBV.toShort();
        assert.strictEqual(int, 0x0102);
    }

    @test
    public toShort_positiveBigEndian_incomplete() {
        const int = this.shortPositiveIncompleteBV.toShort();
        assert.strictEqual(int, 0x01);
    }

    @test
    public toShort_positiveLittleEndian_complete() {
        const int = this.shortPositiveCompleteBV.toShort(false);
        assert.strictEqual(int, 0x0201);
    }

    @test
    public toShort_positiveLittleEndian_incomplete() {
        const int = this.shortPositiveIncompleteBV.toShort(false);
        assert.strictEqual(int, 0x01);
    }

    @test
    public toShort_negativeBigEndian_complete() {
        const int = this.shortNegativeCompleteBV.toShort();
        assert.strictEqual(int, -0x0103);
    }

    @test
    public toShort_negativeBigEndian_incomplete() {
        const int = this.shortNegativeIncompleteBV.toShort();
        assert.strictEqual(int, 0x00FC);
    }

    @test
    public toShort_negativeLittleEndian_complete() {
        const int = this.shortNegativeCompleteBV.toShort(false);
        assert.strictEqual(int, -0x0202);
    }

    @test
    public toShort_negativeLittleEndian_incomplete() {
        const int = this.shortNegativeIncompleteBV.toShort(false);
        assert.strictEqual(int, 0x00FC);
    }

    @test
    public toString_invalidOffset() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromSize(0).toString(0.1); });
        assert.throws(() => { ByteVector.fromSize(0).toString(-1); });
        assert.throws(() => { ByteVector.fromSize(0).toString(1234); });
    }

    @test
    public toString_invalidCount() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromSize(1).toString(0, undefined, 0.1); });
        assert.throws(() => { ByteVector.fromSize(1).toString(0, undefined, -1); });
        assert.throws(() => { ByteVector.fromSize(1).toString(0, undefined, 1234); });
    }

    @test
    public toString_utf8Full() {
        const str = ByteVector.fromString(TestConstants.testStrings.UTF8.str)
            .toString(TestConstants.testStrings.UTF8.bytes.length);
        assert.strictEqual(str, TestConstants.testStrings.UTF8.str);
    }

    @test
    public toString_utf8Partial() {
        const str = ByteVector.fromString(TestConstants.testStrings.UTF8.str + TestConstants.testStrings.UTF8.str)
            .toString(
                TestConstants.testStrings.UTF8.bytes.length,
                undefined,
                TestConstants.testStrings.UTF8.bytes.length
            );
        assert.strictEqual(str, TestConstants.testStrings.UTF8.str);
    }

    @test
    public toString_utf8Empty() {
        const str = ByteVector.fromSize(0).toString(0);
        assert.strictEqual(str, "");
    }

    @test
    public toString_utf16LittleEndianFull() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        const str = ByteVector.fromString(TestConstants.testStrings.UTF16LE.str, StringType.UTF16LE)
            .toString(TestConstants.testStrings.UTF16LE.bytes.length, StringType.UTF16LE);
        assert.strictEqual(str, TestConstants.testStrings.UTF16LE.str);
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public toString_utf16LittleEndianPartial() {
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
    public toString_utf16LittleEndianEmpty() {
        const str = ByteVector.fromSize(0).toString(0, StringType.UTF16LE);
        assert.strictEqual(str, "");
    }

    @test
    public toString_utf16BigEndianFull() {
        const originalLastUtf16Encoding = ByteVector.lastUtf16Encoding;
        const str = ByteVector.fromString(TestConstants.testStrings.UTF16BE.str, StringType.UTF16BE)
            .toString(TestConstants.testStrings.UTF16BE.bytes.length, StringType.UTF16BE);
        assert.strictEqual(str, TestConstants.testStrings.UTF16BE.str);
        assert.strictEqual(ByteVector.lastUtf16Encoding, originalLastUtf16Encoding);
    }

    @test
    public toString_utf16BigEndianPartial() {
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
    public toString_utf16BigEndianEmpty() {
        const str = ByteVector.fromSize(0).toString(0, StringType.UTF16BE);
        assert.strictEqual(str, "");
    }

    @test
    public toString_latin1Full() {
        const str = ByteVector.fromString(TestConstants.testStrings.Latin1.str, StringType.Latin1)
            .toString(TestConstants.testStrings.Latin1.bytes.length, StringType.Latin1);
        assert.strictEqual(str, TestConstants.testStrings.Latin1.str);
    }

    @test
    public toString_latin1Partial() {
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
    public toString_latin1Empty() {
        const str = ByteVector.fromSize(0).toString(0, StringType.Latin1);
        assert.strictEqual(str, "");
    }

    @test
    public toString_utf16Full() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "something bogus";

        try {
            const str = ByteVector.fromString(TestConstants.testStrings.UTF16LEWithBOM.str, StringType.UTF16)
                .toString(TestConstants.testStrings.UTF16LEWithBOM.bytes.length, StringType.UTF16);
            assert.strictEqual(str, TestConstants.testStrings.UTF16LEWithBOM.str);
            assert.strictEqual(ByteVector.lastUtf16Encoding, "utf16-le");
        } finally {
            // Cleanup
            ByteVector.lastUtf16Encoding = originalLastEncoding;
        }
    }

    @test
    public toString_utf16Partial() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "something bogus";

        try {
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
        } finally {
            // Cleanup
            ByteVector.lastUtf16Encoding = originalLastEncoding;
        }
    }

    @test
    public toString_utf16Empty() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "utf16-le";

        try {
            const str = ByteVector.fromSize(0).toString(0, StringType.UTF16);
            assert.strictEqual(str, "");
            assert.strictEqual(ByteVector.lastUtf16Encoding, "utf16-le");
        } finally {
            // Cleanup
            ByteVector.lastUtf16Encoding = originalLastEncoding;
        }
    }

    @test
    public toStrings_invalidOffset() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromSize(0).toString(0.1); });
        assert.throws(() => { ByteVector.fromSize(0).toString(-1); });
        assert.throws(() => { ByteVector.fromSize(0).toString(1234); });
    }

    @test
    public toStrings_invalidCount() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromSize(1).toString(0, undefined, 0.1); });
        assert.throws(() => { ByteVector.fromSize(1).toString(0, undefined, -1); });
    }

    @test
    public toStrings_utf8Single() {
        ByteVector_ConversionTests.testStrings(
            "\0\0" + TestConstants.testStrings.UTF8.str,
            StringType.UTF8,
            2,
            undefined,
            [TestConstants.testStrings.UTF8.str]
        );
    }

    @test
    public toStrings_utf8Multiple() {
        ByteVector_ConversionTests.testStrings(
            TestConstants.testStrings.UTF8.str + "\0\0" + TestConstants.testStrings.UTF8.str,
            StringType.UTF8,
            0,
            undefined,
            [TestConstants.testStrings.UTF8.str, "", TestConstants.testStrings.UTF8.str]
        );
    }

    @test
    public toStrings_utf16LittleEndianSingle() {
        ByteVector_ConversionTests.testStrings(
            "\0\0" + TestConstants.testStrings.UTF16LE.str,
            StringType.UTF16LE,
            2,
            undefined,
            ["", TestConstants.testStrings.UTF16LE.str]
        );
    }

    @test
    public toStrings_ut16LittleEndianMultiple() {
        ByteVector_ConversionTests.testStrings(
            TestConstants.testStrings.UTF16LE.str + "\0\0" + TestConstants.testStrings.UTF16LE.str,
            StringType.UTF16LE,
            0,
            undefined,
            [TestConstants.testStrings.UTF16LE.str, "", TestConstants.testStrings.UTF16LE.str]
        );
    }

    @test
    public toStrings_utf16BigEndianSingle() {
        ByteVector_ConversionTests.testStrings(
            "\0\0" + TestConstants.testStrings.UTF16BE.str,
            StringType.UTF16BE,
            2,
            undefined,
            ["", TestConstants.testStrings.UTF16BE.str]
        );
    }

    @test
    public toStrings_ut16BigEndianMultiple() {
        ByteVector_ConversionTests.testStrings(
            TestConstants.testStrings.UTF16BE.str + "\0\0" + TestConstants.testStrings.UTF16BE.str,
            StringType.UTF16BE,
            0,
            undefined,
            [TestConstants.testStrings.UTF16BE.str, "", TestConstants.testStrings.UTF16BE.str]
        );
    }

    @test
    public toStrings_utf16Single() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "utf16-le";

        try {
            ByteVector_ConversionTests.testStrings(
                "\0\0" + TestConstants.testStrings.UTF16LEWithBOM.str,
                StringType.UTF16,
                2,
                undefined,
                ["", "", TestConstants.testStrings.UTF16LEWithBOM.str]
            );
            assert.strictEqual(ByteVector.lastUtf16Encoding, "utf16-le");
        } finally {
            // Cleanup
            ByteVector.lastUtf16Encoding = originalLastEncoding;
        }
    }

    @test
    public toStrings_utf16Multiple() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = ByteVector.lastUtf16Encoding;
        ByteVector.lastUtf16Encoding = "utf16-le";

        try {
            ByteVector_ConversionTests.testStrings(
                TestConstants.testStrings.UTF16LEWithBOM.str + "\0\0" + TestConstants.testStrings.UTF16LEWithBOM.str,
                StringType.UTF16,
                0,
                undefined,
                [TestConstants.testStrings.UTF16LEWithBOM.str, "", TestConstants.testStrings.UTF16LEWithBOM.str]
            );
            assert.strictEqual(ByteVector.lastUtf16Encoding, "utf16-le");
        } finally {
            // Cleanup
            ByteVector.lastUtf16Encoding = originalLastEncoding;
        }
    }

    @test
    public toUInt_empty() {
        const int = ByteVector.fromSize(0).toUInt();
        assert.strictEqual(int, 0);
    }

    @test
    public toUInt_zero_complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0, 0x0, 0x0, 0xAA])).toUInt();
        assert.strictEqual(int, 0);
    }

    @test
    public toUInt_zero_incomplete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0])).toUInt();
        assert.strictEqual(int, 0);
    }

    @test
    public toUInt_positiveBigEndian_complete() {
        const int = this.uintPositiveCompleteBV.toUInt();
        assert.strictEqual(int, 0x01020304);
    }

    @test
    public toUInt_positiveBigEndian_incomplete() {
        const int = this.uintPositiveIncompleteBV.toUInt();
        assert.strictEqual(int, 0x00000102);
    }

    @test
    public toUInt_positiveLittleEndian_complete() {
        const int = this.uintPositiveCompleteBV.toUInt(false);
        assert.strictEqual(int, 0x04030201);
    }

    @test
    public toUInt_positiveLittleEndian_incomplete() {
        const int = this.uintPositiveIncompleteBV.toUInt(false);
        assert.strictEqual(int, 0x00000201);
    }

    @test
    public toUInt_unsignedRange_complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF])).toUInt();
        assert.strictEqual(int, 0xFFFFFFFF);
    }

    @test
    public toULong_empty() {
        const long = ByteVector.fromSize(0).toULong();
        assert.strictEqual(long, BigInt(0));
    }

    @test
    public toULong_zero_complete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAA])
        ).toULong();
        assert.strictEqual(long, BigInt(0));
    }

    @test
    public toULong_zero_incomplete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0x00, 0x00, 0x00, 0x00])
        ).toULong();
        assert.strictEqual(long, BigInt(0));
    }

    @test
    public toULong_positiveBigEndian_complete() {
        const long = this.ulongPositiveCompleteBV.toULong();
        assert.strictEqual(long, BigInt("0x0102030405060708"));
    }

    @test
    public toULong_positiveBigEndian_incomplete() {
        const long = this.ulongPositiveIncompleteBV.toULong();
        assert.strictEqual(long, BigInt("0x01020304"));
    }

    @test
    public toULong_positiveLittleEndian_complete() {
        const long = this.ulongPositiveCompleteBV.toULong(false);
        assert.strictEqual(long, BigInt("0x0807060504030201"));
    }

    @test
    public toULong_positiveLittleEndian_incomplete() {
        const long = this.ulongPositiveIncompleteBV.toULong(false);
        assert.strictEqual(long, BigInt("0x04030201"));
    }

    @test
    public toULong_unsignedRange_complete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF])
        ).toULong();
        assert.strictEqual(long, BigInt("0xFFFFFFFFFFFFFFFF"));
    }

    @test
    public toUSong_empty() {
        const int = ByteVector.fromSize(0).toUShort();
        assert.strictEqual(int, 0);
    }

    @test
    public toUSong_zero_complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0, 0x0, 0x0, 0xAA])).toUShort();
        assert.strictEqual(int, 0);
    }

    @test
    public toUSong_zero_incomplete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0])).toUShort();
        assert.strictEqual(int, 0);
    }

    @test
    public toUSong_positiveBigEndian_complete() {
        const int = this.ushortPositiveCompleteBV.toUShort();
        assert.strictEqual(int, 0x0102);
    }

    @test
    public toUSong_positiveBigEndian_incomplete() {
        const int = this.ushortPositiveIncompleteBV.toUShort();
        assert.strictEqual(int, 0x01);
    }

    @test
    public toUSong_positiveLittleEndian_complete() {
        const int = this.ushortPositiveCompleteBV.toUShort(false);
        assert.strictEqual(int, 0x0201);
    }

    @test
    public toUSong_positiveLittleEndian_incomplete() {
        const int = this.ushortPositiveIncompleteBV.toUShort(false);
        assert.strictEqual(int, 0x01);
    }

    @test
    public toUSong_unsignedRange_complete() {
        const short = ByteVector.fromByteArray(new Uint8Array([0xFF, 0xFF])).toUShort();
        assert.strictEqual(short, 0xFFFF);
    }

    private static testStrings(
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
