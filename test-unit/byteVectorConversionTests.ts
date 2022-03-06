import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import TestConstants from "./testConstants";
import {ByteVector, Encoding, StringType} from "../src/byteVector";

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
    public toBase64String() {
        // Arrange
        const bv = ByteVector.fromString(TestConstants.testFileContentsStr, StringType.Latin1);

        // Act
        const encoded = bv.toBase64String();

        // Assert
        assert.strictEqual(encoded, "MTIzNDVhYmNkZQ==");
    }

    @test
    public toBase64String_view() {
        // Arrange
        const bv = ByteVector.concatenate(
            0xAA,
            ByteVector.fromString(TestConstants.testFileContentsStr, StringType.Latin1),
            0xAA
        );

        // Act
        const encoded = bv.subarray(1, TestConstants.testFileContentsStr.length).toBase64String();

        // Assert
        assert.strictEqual(encoded, "MTIzNDVhYmNkZQ==");
    }

    @test
    public toByteArray() {
        // Arrange
        const ba = new Uint8Array(4);
        const bv = ByteVector.fromByteArray(ba);

        // Act
        const output = bv.toByteArray();

        // Assert
        assert.strictEqual(output, ba);
    }

    @test
    public toByteVector_notView() {
        // Arrange
        const ba = new Uint8Array(4);
        const bv = ByteVector.fromByteArray(ba);

        // Act
        const output = bv.toByteVector();

        // Assert - Point to same underlying array
        ba[0] = 88;
        assert.strictEqual(bv.get(0), 88);
        assert.strictEqual(output.get(0), 88);
    }

    @test
    public toByteVector_offsetView() {
        // Arrange
        const ba = new Uint8Array([0x00, 0x01, 0x02, 0x03]);
        const bv = ByteVector.fromByteArray(ba);

        // Act
        const output = bv.subarray(1).toByteVector();

        // Assert
        // - Contains the subarray
        assert.strictEqual(output.length, 3);
        assert.strictEqual(output.get(0), 0x01);

        // - Do not point to same underlying array
        ba[1] = 88;
        assert.strictEqual(bv.get(1), 88);
        assert.strictEqual(output.get(0), 1);
    }

    @test
    public toByteVector_lengthView() {
        // Arrange
        const ba = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
        const bv = ByteVector.fromByteArray(ba);

        // Act
        const output = bv.subarray(0, 3).toByteVector();

        // Assert
        // - Contains the subarray
        assert.strictEqual(output.length, 3);
        assert.strictEqual(output.get(0), 0x01);

        // - Do not point to same underlying array
        ba[0] = 88;
        assert.strictEqual(bv.get(0), 88);
        assert.strictEqual(output.get(0), 1);
    }

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
        const double = ByteVector.fromByteArray(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]))
            .toDouble();
        assert.strictEqual(double, 0);
    }

    @test
    public toDouble_zero_completeView() {
        const double = ByteVector.fromByteArray(
            new Uint8Array([0xAA, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAA])
        )
            .subarray(1, 8)
            .toDouble();
        assert.strictEqual(double, 0);
    }

    @test
    public toDouble_positiveBigEndian() {
        const double = this.doublePositiveBV.toDouble();
        assert.approximately(double, -9.5397675953257207e-233, 0.000000000001e-233);
    }

    @test
    public toDouble_positiveBigEndianView() {
        const double = ByteVector.concatenate(0xAA, this.doublePositiveBV, 0xAA)
            .subarray(1, this.doublePositiveBV.length)
            .toDouble();
        assert.approximately(double, -9.5397675953257207e-233, 0.000000000001e-233);
    }

    @test
    public toDouble_positiveLittleEndian() {
        const double = this.doublePositiveBV.toDouble(false);
        assert.approximately(double, 56.12, 0.01);
    }

    @test
    public toDouble_positiveLittleEndianView() {
        const double = ByteVector.concatenate(0xAA, this.doublePositiveBV, 0xAA)
            .subarray(1, this.doublePositiveBV.length)
            .toDouble(false);
        assert.approximately(double, 56.12, 0.01);
    }

    @test
    public toDouble_negativeBigEndian() {
        const double = this.doubleNegativeBV.toDouble();
        assert.approximately(double, -9.6037214055410557e-86, 0.00000000001e-86);
    }

    @test
    public toDouble_negativeBigEndianView() {
        const double = ByteVector.concatenate(0xAA, this.doubleNegativeBV, 0xAA)
            .subarray(1, this.doubleNegativeBV.length)
            .toDouble();
        assert.approximately(double, -9.6037214055410557e-86, 0.00000000001e-86);
    }

    @test
    public toDouble_negativeLittleEndian() {
        const double = this.doubleNegativeBV.toDouble(false);
        assert.approximately(double, -12.34, 0.01);
    }

    @test
    public toDouble_negativeLittleEndianView() {
        const double = ByteVector.concatenate(0xAA, this.doubleNegativeBV, 0xAA)
            .subarray(1, this.doubleNegativeBV.length)
            .toDouble(false);
        assert.approximately(double, -12.34, 0.01);
    }

    @test
    public toDouble_doubleRangeBigEndian() {
        const double = ByteVector.fromByteArray(new Uint8Array([0x7F, 0xEF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]))
            .toDouble();
        assert.approximately(double, 1.7976931348623157e308, 0.000000000001e308);
    }

    @test
    public toDouble_doubleRangeLittleEndian() {
        const double = ByteVector.fromByteArray(new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xEF, 0x7F]))
            .toDouble(false);
        assert.approximately(double, 1.7976931348623157e308, 0.000000000001e308);
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
    public toFloat_zero_completeView() {
        const double = ByteVector.fromByteArray(new Uint8Array([0xAA, 0x00, 0x00, 0x00, 0x00, 0xAA]))
            .subarray(1, 4)
            .toFloat();
        assert.strictEqual(double, 0);
    }

    @test
    public toFloat_positiveBigEndian() {
        const float = this.floatPositiveBV.toFloat();
        assert.approximately(float, -2.88663883e20, 0.00000001e20);
    }

    @test
    public toFloat_positiveBigEndianView() {
        const float = ByteVector.concatenate(0xAA, this.floatPositiveBV, 0xAA)
            .subarray(1, this.floatPositiveBV.length)
            .toFloat();
        assert.approximately(float, -2.88663883e20, 0.00000001e20);
    }

    @test
    public toFloat_positiveLittleEndian() {
        const float = this.floatPositiveBV.toFloat(false);
        assert.approximately(float, 56.12, 0.01);
    }

    @test
    public toFloat_positiveLittleEndianView() {
        const float = ByteVector.concatenate(0xAA, this.floatPositiveBV, 0xAA)
            .subarray(1, this.floatPositiveBV.length)
            .toFloat(false);
        assert.approximately(float, 56.12, 0.01);
    }

    @test
    public toFloat_negativeBigEndian() {
        const float = this.floatNegativeBV.toFloat();
        assert.approximately(float, -5.21007881e-17, 0.00000001e-17);
    }

    @test
    public toFloat_negativeBigEndianView() {
        const float = ByteVector.concatenate(0xAA, this.floatNegativeBV, 0xAA)
            .subarray(1, this.floatNegativeBV.length)
            .toFloat();
        assert.approximately(float, -5.21007881e-17, 0.00000001e-17);
    }

    @test
    public toFloat_negativeLittleEndian() {
        const float = this.floatNegativeBV.toFloat(false);
        assert.approximately(float, -12.34, 0.01);
    }

    @test
    public toFloat_negativeLittleEndianView() {
        const float = ByteVector.concatenate(0xAA, this.floatNegativeBV, 0xAA)
            .subarray(1, this.floatNegativeBV.length)
            .toFloat(false);
        assert.approximately(float, -12.34, 0.01);
    }

    @test
    public toInt_empty() {
        const int = ByteVector.fromSize(0).toInt();
        assert.strictEqual(int, 0);
    }

    @test
    public toInt_emptyView() {
        const uint = ByteVector.fromByteArray(new Uint8Array([0xAA, 0xAA]))
            .subarray(1, 0)
            .toInt();
        assert.strictEqual(uint, 0);
    }

    @test
    public toInt_zero_complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0, 0x0, 0x0, 0xAA])).toInt();
        assert.strictEqual(int, 0);
    }

    @test
    public toInt_zero_completeView() {
        const int = ByteVector.fromByteArray(new Uint8Array([0xAA, 0x0, 0x0, 0x0, 0x0, 0xAA]))
            .subarray(1, 4)
            .toInt();
        assert.strictEqual(int, 0);
    }

    @test
    public toInt_zero_incomplete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0])).toInt();
        assert.strictEqual(int, 0);
    }

    @test
    public toInt_zero_incompleteView() {
        const int = ByteVector.fromByteArray(new Uint8Array([0xAA, 0x0, 0x0, 0xAA]))
            .subarray(1, 2)
            .toInt();
        assert.strictEqual(int, 0);
    }

    @test
    public toInt_positiveBigEndian_complete() {
        const int = this.intPositiveCompleteBV.toInt();
        assert.strictEqual(int, 0x01020304);
    }

    @test
    public toInt_positiveBigEndian_completeView() {
        const int = ByteVector.concatenate(0xAA, this.intPositiveCompleteBV, 0xAA)
            .subarray(1, 4)
            .toInt();
        assert.strictEqual(int, 0x01020304);
    }

    @test
    public toInt_positiveBigEndian_incomplete() {
        const int = this.intPositiveIncompleteBV.toInt();
        assert.strictEqual(int, 0x00000102);
    }

    @test
    public toInt_positiveBigEndian_incompleteView() {
        const int = ByteVector.concatenate(0xAA, this.intPositiveIncompleteBV, 0xAA)
            .subarray(1, 2)
            .toInt();
        assert.strictEqual(int, 0x00000102);
    }

    @test
    public toInt_positiveLittleEndian_complete() {
        const int = this.intPositiveCompleteBV.toInt(false);
        assert.strictEqual(int, 0x04030201);
    }

    @test
    public toInt_positiveLittleEndian_completeView() {
        const int = ByteVector.concatenate(0xAA, this.intPositiveCompleteBV, 0xAA)
            .subarray(1, 4)
            .toInt(false);
        assert.strictEqual(int, 0x04030201);
    }

    @test
    public toInt_positiveLittleEndian_incomplete() {
        const int = this.intPositiveIncompleteBV.toInt(false);
        assert.strictEqual(int, 0x00000201);
    }

    @test
    public toInt_positiveLittleEndian_incompleteView() {
        const int = ByteVector.concatenate(0xAA, this.intPositiveIncompleteBV, 0xAA)
            .subarray(1, 2)
            .toInt(false);
        assert.strictEqual(int, 0x00000201);
    }

    @test
    public toInt_negativeBigEndian_complete() {
        const int = this.intNegativeCompleteBV.toInt();
        assert.strictEqual(int, -0x01020304);
    }

    @test
    public toInt_negativeBigEndian_completeView() {
        const int = ByteVector.concatenate(0xAA, this.intNegativeCompleteBV, 0xAA)
            .subarray(1, 4)
            .toInt(true);
        assert.strictEqual(int, -0x01020304);
    }

    @test
    public toInt_negativeBigEndian_incomplete() {
        const int = this.intNegativeIncompleteBV.toInt();
        assert.strictEqual(int, 0x0000FCFD);
    }

    @test
    public toInt_negativeBigEndian_incompleteView() {
        const int = ByteVector.concatenate(0xAA, this.intNegativeIncompleteBV, 0xAA)
            .subarray(1, 2)
            .toInt(true);
        assert.strictEqual(int, 0x0000FCFD);
    }

    @test
    public toInt_negativeLittleEndian_complete() {
        const int = this.intNegativeCompleteBV.toInt(false);
        assert.strictEqual(int, -0x03030202);
    }

    @test
    public toInt_negativeLittleEndian_completeView() {
        const int = ByteVector.concatenate(0xAA, this.intNegativeCompleteBV, 0xAA)
            .subarray(1, 4)
            .toInt(false);
        assert.strictEqual(int, -0x03030202);
    }

    @test
    public toInt_negativeLittleEndian_incomplete() {
        const int = this.intNegativeIncompleteBV.toInt(false);
        assert.strictEqual(int, 0x0000FDFC);
    }

    @test
    public toInt_negativeLittleEndian_incompleteView() {
        const int = ByteVector.concatenate(0xAA, this.intNegativeIncompleteBV, 0xAA)
            .subarray(1, 2)
            .toInt(false);
        assert.strictEqual(int, 0x0000FDFC);
    }

    @test
    public toLong_empty() {
        const long = ByteVector.fromSize(0).toLong();
        assert.strictEqual(long, BigInt(0));
    }

    @test
    public toLong_emptyView() {
        const ulong = ByteVector.fromByteArray(new Uint8Array([0xAA, 0xAA]))
            .subarray(1, 0)
            .toLong();
        assert.strictEqual(ulong, BigInt(0));
    }

    @test
    public toLong_zero_complete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAA])
        ).toLong();
        assert.strictEqual(long,  BigInt(0));
    }

    @test
    public toLong_zero_completeView() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0xAA, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAA])
        )
            .subarray(1, 8)
            .toLong();
        assert.strictEqual(long,  BigInt(0));
    }

    @test
    public toLong_zero_incomplete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0x00, 0x00, 0x00, 0x00])
        ).toLong();
        assert.strictEqual(long,  BigInt(0));
    }

    @test
    public toLong_zero_incompleteView() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0xAA, 0x00, 0x00, 0x00, 0x00, 0xAA])
        )
            .subarray(1, 4)
            .toLong();
        assert.strictEqual(long,  BigInt(0));
    }

    @test
    public toLong_positiveBigEndian_complete() {
        const long = this.longPositiveCompleteBV.toLong();
        assert.strictEqual(long, BigInt("0x0102030405060708"));
    }

    @test
    public toLong_positiveBigEndian_completeView() {
        const long = ByteVector.concatenate(0xAA, this.longPositiveCompleteBV, 0xAA)
            .subarray(1, this.longPositiveCompleteBV.length)
            .toLong();
        assert.strictEqual(long, BigInt("0x0102030405060708"));
    }

    @test
    public toLong_positiveBigEndian_incomplete() {
        const long = this.longPositiveIncompleteBV.toLong();
        assert.strictEqual(long, BigInt("0x01020304"));
    }

    @test
    public toLong_positiveBigEndian_incompleteView() {
        const long = ByteVector.concatenate(0xAA, this.longPositiveIncompleteBV, 0xAA)
            .subarray(1, this.longPositiveIncompleteBV.length)
            .toLong();
        assert.strictEqual(long, BigInt("0x01020304"));
    }

    @test
    public toLong_positiveLittleEndian_complete() {
        const long = this.longPositiveCompleteBV.toLong(false);
        assert.strictEqual(long, BigInt("0x0807060504030201"));
    }

    @test
    public toLong_positiveLittleEndian_completeView() {
        const long = ByteVector.concatenate(0xAA, this.longPositiveCompleteBV, 0xAA)
            .subarray(1, this.longPositiveCompleteBV.length)
            .toLong(false);
        assert.strictEqual(long, BigInt("0x0807060504030201"));
    }

    @test
    public toLong_positiveLittleEndian_incomplete() {
        const long = this.longPositiveIncompleteBV.toLong(false);
        assert.strictEqual(long, BigInt("0x04030201"));
    }

    @test
    public toLong_positiveLittleEndian_incompleteView() {
        const long = ByteVector.concatenate(0xAA, this.longPositiveIncompleteBV, 0xAA)
            .subarray(1, this.longPositiveIncompleteBV.length)
            .toLong(false);
        assert.strictEqual(long, BigInt("0x04030201"));
    }

    @test
    public toLong_negativeBigEndian_complete() {
        const long = this.longNegativeCompleteBV.toLong();
        assert.strictEqual(long, BigInt("-72623859790382856"));
    }

    @test
    public toLong_negativeBigEndian_completeView() {
        const long = ByteVector.concatenate(0xAA, this.longNegativeCompleteBV, 0xAA)
            .subarray(1, this.longNegativeCompleteBV.length)
            .toLong();
        assert.strictEqual(long, BigInt("-72623859790382856"));
    }

    @test
    public toLong_negativeBigEndian_incomplete() {
        const long = this.longNegativeIncompleteBV.toLong();
        assert.strictEqual(long, BigInt("0xFEFDFCFC"));
    }

    @test
    public toLong_negativeBigEndian_incompleteView() {
        const long = ByteVector.concatenate(0xAA, this.longNegativeIncompleteBV, 0xAA)
            .subarray(1, this.longNegativeIncompleteBV.length)
            .toLong();
        assert.strictEqual(long, BigInt("0xFEFDFCFC"));
    }

    @test
    public toLong_negativeLittleEndian_complete() {
        const long = this.longNegativeCompleteBV.toLong(false);
        assert.strictEqual(long, BigInt("-506380101714379266"));
    }

    @test
    public toLong_negativeLittleEndian_completeView() {
        const long = ByteVector.concatenate(0xAA, this.longNegativeCompleteBV, 0xAA)
            .subarray(1, this.longNegativeCompleteBV.length)
            .toLong(false);
        assert.strictEqual(long, BigInt("-506380101714379266"));
    }

    @test
    public toLong_negativeLittleEndian_incomplete() {
        const long = this.longNegativeIncompleteBV.toLong(false);
        assert.strictEqual(long, BigInt("0xFCFCFDFE"));
    }

    @test
    public toLong_negativeLittleEndian_incompleteView() {
        const long = ByteVector.concatenate(0xAA, this.longNegativeIncompleteBV, 0xAA)
            .subarray(1, this.longNegativeIncompleteBV.length)
            .toLong(false);
        assert.strictEqual(long, BigInt("0xFCFCFDFE"));
    }

    @test
    public toShort_empty() {
        const int = ByteVector.fromSize(0).toShort();
        assert.strictEqual(int, 0);
    }

    @test
    public toShort_emptyView() {
        const short = ByteVector.fromByteArray(new Uint8Array([0xAA, 0xAA]))
            .subarray(1, 0)
            .toShort();
        assert.strictEqual(short, 0);
    }

    @test
    public toShort_zero_complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0, 0xAA])).toShort();
        assert.strictEqual(int, 0);
    }

    @test
    public toShort_zero_completeView() {
        const short = ByteVector.fromByteArray(new Uint8Array([0xAA, 0x00, 0x00, 0xAA]))
            .subarray(1, 2)
            .toShort();
        assert.strictEqual(short,  0);
    }

    @test
    public toShort_zero_incomplete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0])).toShort();
        assert.strictEqual(int, 0);
    }

    @test
    public toShort_zero_incompleteView() {
        const short = ByteVector.fromByteArray(new Uint8Array([0xAA, 0x00, 0xAA]))
            .subarray(1, 1)
            .toShort();
        assert.strictEqual(short,  0);
    }

    @test
    public toShort_positiveBigEndian_complete() {
        const int = this.shortPositiveCompleteBV.toShort();
        assert.strictEqual(int, 0x0102);
    }

    @test
    public toShort_positiveBigEndian_completeView() {
        const short = ByteVector.concatenate(0xAA, this.shortPositiveCompleteBV, 0xAA)
            .subarray(1, this.shortPositiveCompleteBV.length)
            .toShort();
        assert.strictEqual(short,  0x0102);
    }

    @test
    public toShort_positiveBigEndian_incomplete() {
        const int = this.shortPositiveIncompleteBV.toShort();
        assert.strictEqual(int, 0x01);
    }

    @test
    public toShort_positiveBigEndian_incompleteView() {
        const short = ByteVector.concatenate(0xAA, this.shortPositiveIncompleteBV, 0xAA)
            .subarray(1, this.shortPositiveIncompleteBV.length)
            .toShort();
        assert.strictEqual(short,  0x01);
    }

    @test
    public toShort_positiveLittleEndian_complete() {
        const int = this.shortPositiveCompleteBV.toShort(false);
        assert.strictEqual(int, 0x0201);
    }

    @test
    public toShort_positiveLittleEndian_completeView() {
        const short = ByteVector.concatenate(0xAA, this.shortPositiveCompleteBV, 0xAA)
            .subarray(1, this.shortPositiveCompleteBV.length)
            .toShort(false);
        assert.strictEqual(short,  0x0201);
    }

    @test
    public toShort_positiveLittleEndian_incomplete() {
        const int = this.shortPositiveIncompleteBV.toShort(false);
        assert.strictEqual(int, 0x01);
    }

    @test
    public toShort_positiveLittleEndian_incompleteView() {
        const short = ByteVector.concatenate(0xAA, this.shortPositiveIncompleteBV, 0xAA)
            .subarray(1, this.shortPositiveIncompleteBV.length)
            .toShort();
        assert.strictEqual(short,  0x01);
    }

    @test
    public toShort_negativeBigEndian_complete() {
        const int = this.shortNegativeCompleteBV.toShort();
        assert.strictEqual(int, -0x0103);
    }

    @test
    public toShort_negativeBigEndian_completeView() {
        const short = ByteVector.concatenate(0xAA, this.shortNegativeCompleteBV, 0xAA)
            .subarray(1, this.shortNegativeCompleteBV.length)
            .toShort();
        assert.strictEqual(short,  -0x0103);
    }

    @test
    public toShort_negativeBigEndian_incomplete() {
        const int = this.shortNegativeIncompleteBV.toShort();
        assert.strictEqual(int, 0x00FC);
    }

    @test
    public toShort_negativeBigEndian_incompleteView() {
        const short = ByteVector.concatenate(0xAA, this.shortNegativeIncompleteBV, 0xAA)
            .subarray(1, this.shortNegativeIncompleteBV.length)
            .toShort();
        assert.strictEqual(short,  0x00FC);
    }

    @test
    public toShort_negativeLittleEndian_complete() {
        const int = this.shortNegativeCompleteBV.toShort(false);
        assert.strictEqual(int, -0x0202);
    }

    @test
    public toShort_negativeLittleEndian_completeView() {
        const short = ByteVector.concatenate(0xAA, this.shortNegativeCompleteBV, 0xAA)
            .subarray(1, this.shortNegativeCompleteBV.length)
            .toShort(false);
        assert.strictEqual(short,  -0x0202);
    }

    @test
    public toShort_negativeLittleEndian_incomplete() {
        const int = this.shortNegativeIncompleteBV.toShort(false);
        assert.strictEqual(int, 0x00FC);
    }

    @test
    public toShort_negativeLittleEndian_incompleteView() {
        const short = ByteVector.concatenate(0xAA, this.shortNegativeIncompleteBV, 0xAA)
            .subarray(1, this.shortNegativeIncompleteBV.length)
            .toShort(false);
        assert.strictEqual(short,  0x00FC);
    }

    @test
    public toString_invalidOffset() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromSize(0).toString(0.1); });
        assert.throws(() => { ByteVector.fromSize(0).toString(-1); });
        assert.throws(() => { ByteVector.fromSize(0).toString(1234); });
    }

    @test
    public toString_utf8Full() {
        const str = ByteVector.fromString(TestConstants.testStrings.UTF8.str, StringType.UTF8)
            .toString(StringType.UTF8);
        assert.strictEqual(str, TestConstants.testStrings.UTF8.str);
    }

    @test
    public toString_utf8Empty() {
        const str = ByteVector.fromSize(0)
            .toString(StringType.UTF8);
        assert.strictEqual(str, "");
    }

    @test
    public toString_utf16LittleEndianFull() {
        const originalLastUtf16Encoding = Encoding["_lastUtf16Encoding"];
        const str = ByteVector.fromString(TestConstants.testStrings.UTF16LE.str, StringType.UTF16LE)
            .toString(StringType.UTF16LE);
        assert.strictEqual(str, TestConstants.testStrings.UTF16LE.str);
        assert.strictEqual(Encoding["_lastUtf16Encoding"], originalLastUtf16Encoding);
    }

    @test
    public toString_utf16LittleEndianEmpty() {
        const str = ByteVector.fromSize(0).toString(StringType.UTF16LE);
        assert.strictEqual(str, "");
    }

    @test
    public toString_utf16BigEndianFull() {
        const originalLastUtf16Encoding = Encoding["_lastUtf16Encoding"];
        const str = ByteVector.fromString(TestConstants.testStrings.UTF16BE.str, StringType.UTF16BE)
            .toString(StringType.UTF16BE);
        assert.strictEqual(str, TestConstants.testStrings.UTF16BE.str);
        assert.strictEqual(Encoding["_lastUtf16Encoding"], originalLastUtf16Encoding);
    }

    @test
    public toString_utf16BigEndianEmpty() {
        const str = ByteVector.fromSize(0).toString(StringType.UTF16BE);
        assert.strictEqual(str, "");
    }

    @test
    public toString_latin1Full() {
        const str = ByteVector.fromString(TestConstants.testStrings.Latin1.str, StringType.Latin1)
            .toString(StringType.Latin1);
        assert.strictEqual(str, TestConstants.testStrings.Latin1.str);
    }

    @test
    public toString_latin1Empty() {
        const str = ByteVector.fromSize(0).toString(StringType.Latin1);
        assert.strictEqual(str, "");
    }

    @test
    public toString_utf16Full() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = Encoding["_lastUtf16Encoding"];
        Encoding["_lastUtf16Encoding"] = 123;

        try {
            const str = ByteVector.fromString(TestConstants.testStrings.UTF16LEWithBOM.str, StringType.UTF16)
                .toString(StringType.UTF16);
            assert.strictEqual(str, TestConstants.testStrings.UTF16LEWithBOM.str);
            assert.strictEqual(Encoding["_lastUtf16Encoding"], StringType.UTF16LE);
        } finally {
            // Cleanup
            Encoding["_lastUtf16Encoding"] = originalLastEncoding;
        }
    }

    @test
    public toString_utf16Empty() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = Encoding["_lastUtf16Encoding"];
        Encoding["_lastUtf16Encoding"] = StringType.UTF16LE;

        try {
            const str = ByteVector.fromSize(0).toString(StringType.UTF16);
            assert.strictEqual(str, "");
            assert.strictEqual(Encoding["_lastUtf16Encoding"], StringType.UTF16LE);
        } finally {
            // Cleanup
            Encoding["_lastUtf16Encoding"] = originalLastEncoding;
        }
    }

    @test
    public toStrings_invalidCount() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromSize(1).toStrings(undefined, 0.1); });
        assert.throws(() => { ByteVector.fromSize(1).toStrings(undefined, -1); });
    }

    @test
    public toStrings_dangling() {
        // Arrange
        const bv = ByteVector.concatenate(
            TestConstants.testStrings.UTF8.bytes,
            0x00,
            TestConstants.testStrings.UTF8.bytes
        );

        // Act
        const strs = bv.toStrings(StringType.UTF8);

        // Assert
        assert.deepEqual(strs, [TestConstants.testStrings.UTF8.str, TestConstants.testStrings.UTF8.str]);
    }

    @test
    public toStrings_maxCount() {
        ByteVector_ConversionTests.testStrings(
            [TestConstants.testStrings.UTF8.str, TestConstants.testStrings.UTF8.str],
            StringType.UTF8,
            1,
            [TestConstants.testStrings.UTF8.str]
        );
    }

    @test
    public toStrings_utf8Single() {
        ByteVector_ConversionTests.testStrings(
            [TestConstants.testStrings.UTF8.str],
            StringType.UTF8,
            undefined,
            [TestConstants.testStrings.UTF8.str]
        );
    }

    @test
    public toStrings_utf8Multiple() {
        ByteVector_ConversionTests.testStrings(
            [TestConstants.testStrings.UTF8.str, TestConstants.testStrings.UTF8.str],
            StringType.UTF8,
            undefined,
            [TestConstants.testStrings.UTF8.str, TestConstants.testStrings.UTF8.str]
        );
    }

    @test
    public toStrings_utf16LittleEndianSingle() {
        ByteVector_ConversionTests.testStrings(
            [TestConstants.testStrings.UTF16LE.str],
            StringType.UTF16LE,
            undefined,
            [TestConstants.testStrings.UTF16LE.str]
        );
    }

    @test
    public toStrings_utf16LittleEndianMultiple() {
        ByteVector_ConversionTests.testStrings(
            [TestConstants.testStrings.UTF16LE.str, TestConstants.testStrings.UTF16LE.str],
            StringType.UTF16LE,
            undefined,
            [TestConstants.testStrings.UTF16LE.str, TestConstants.testStrings.UTF16LE.str]
        );
    }

    @test
    public toStrings_utf16BigEndianSingle() {
        ByteVector_ConversionTests.testStrings(
            [TestConstants.testStrings.UTF16BE.str],
            StringType.UTF16BE,
            undefined,
            [TestConstants.testStrings.UTF16BE.str]
        );
    }

    @test
    public toStrings_utf16BigEndianMultiple() {
        ByteVector_ConversionTests.testStrings(
            [TestConstants.testStrings.UTF16BE.str, TestConstants.testStrings.UTF16BE.str],
            StringType.UTF16BE,
            undefined,
            [TestConstants.testStrings.UTF16BE.str, TestConstants.testStrings.UTF16BE.str]
        );
    }

    @test
    public toStrings_utf16Single() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = Encoding["_lastUtf16Encoding"];
        Encoding["_lastUtf16Encoding"] = StringType.UTF16LE;

        try {
            ByteVector_ConversionTests.testStrings(
                [TestConstants.testStrings.UTF16LEWithBOM.str],
                StringType.UTF16,
                undefined,
                [TestConstants.testStrings.UTF16LEWithBOM.str]
            );
            assert.strictEqual(Encoding["_lastUtf16Encoding"], StringType.UTF16LE);
        } finally {
            // Cleanup
            Encoding["_lastUtf16Encoding"] = originalLastEncoding;
        }
    }

    @test
    public toStrings_utf16Multiple() {
        // This test will change the last used utf16 encoding, so we'll restore it afterward
        const originalLastEncoding = Encoding["_lastUtf16Encoding"];
        Encoding["_lastUtf16Encoding"] = StringType.UTF16LE;

        try {
            ByteVector_ConversionTests.testStrings(
                [TestConstants.testStrings.UTF16LEWithBOM.str, TestConstants.testStrings.UTF16LEWithBOM.str],
                StringType.UTF16,
                undefined,
                [TestConstants.testStrings.UTF16LEWithBOM.str, TestConstants.testStrings.UTF16LEWithBOM.str]
            );
            assert.strictEqual(Encoding["_lastUtf16Encoding"], StringType.UTF16LE);
        } finally {
            // Cleanup
            Encoding["_lastUtf16Encoding"] = originalLastEncoding;
        }
    }

    @test
    public toUint_empty() {
        const int = ByteVector.fromSize(0).toUint();
        assert.strictEqual(int, 0);
    }

    @test
    public toUint_emptyView() {
        const uint = ByteVector.fromByteArray(new Uint8Array([0xAA, 0xAA]))
            .subarray(1, 0)
            .toUint();
        assert.strictEqual(uint, 0);
    }

    @test
    public toUint_zero_complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0, 0x0, 0x0, 0xAA])).toUint();
        assert.strictEqual(int, 0);
    }

    @test
    public toUint_zero_completeView() {
        const short = ByteVector.fromByteArray(new Uint8Array([0xAA, 0x0, 0x0, 0x0, 0x0, 0xAA]))
            .subarray(1, 4)
            .toShort();
        assert.strictEqual(short,  0);
    }

    @test
    public toUint_zero_incomplete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0])).toUint();
        assert.strictEqual(int, 0);
    }

    @test
    public toUint_zero_incompleteView() {
        const short = ByteVector.fromByteArray(new Uint8Array([0xAA, 0x0, 0x0, 0xAA]))
            .subarray(1, 2)
            .toShort();
        assert.strictEqual(short,  0);
    }

    @test
    public toUint_positiveBigEndian_complete() {
        const int = this.uintPositiveCompleteBV.toUint();
        assert.strictEqual(int, 0x01020304);
    }

    @test
    public toUint_positiveBigEndian_completeView() {
        const short = ByteVector.concatenate(0xAA, this.uintPositiveCompleteBV, 0xAA)
            .subarray(1, this.uintPositiveCompleteBV.length)
            .toUint();
        assert.strictEqual(short,  0x01020304);
    }

    @test
    public toUint_positiveBigEndian_incomplete() {
        const int = this.uintPositiveIncompleteBV.toUint();
        assert.strictEqual(int, 0x00000102);
    }

    @test
    public toUint_positiveBigEndian_incompleteView() {
        const short = ByteVector.concatenate(0xAA, this.uintPositiveIncompleteBV, 0xAA)
            .subarray(1, this.uintPositiveIncompleteBV.length)
            .toUint();
        assert.strictEqual(short,  0x00000102);
    }

    @test
    public toUint_positiveLittleEndian_complete() {
        const int = this.uintPositiveCompleteBV.toUint(false);
        assert.strictEqual(int, 0x04030201);
    }

    @test
    public toUint_positiveLittleEndian_completeView() {
        const short = ByteVector.concatenate(0xAA, this.uintPositiveCompleteBV, 0xAA)
            .subarray(1, this.uintPositiveCompleteBV.length)
            .toUint(false);
        assert.strictEqual(short,  0x04030201);
    }

    @test
    public toUint_positiveLittleEndian_incomplete() {
        const int = this.uintPositiveIncompleteBV.toUint(false);
        assert.strictEqual(int, 0x00000201);
    }

    @test
    public toUint_positiveLittleEndian_incompleteView() {
        const short = ByteVector.concatenate(0xAA, this.uintPositiveIncompleteBV, 0xAA)
            .subarray(1, this.uintPositiveIncompleteBV.length)
            .toShort(false);
        assert.strictEqual(short,  0x00000201);
    }

    @test
    public toUint_unsignedRange_complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF])).toUint();
        assert.strictEqual(int, 0xFFFFFFFF);
    }

    @test
    public toUlong_empty() {
        const long = ByteVector.fromSize(0).toUlong();
        assert.strictEqual(long, BigInt(0));
    }

    @test
    public toUlong_emptyView() {
        const ulong = ByteVector.fromByteArray(new Uint8Array([0xAA, 0xAA]))
            .subarray(1, 0)
            .toUlong();
        assert.strictEqual(ulong, BigInt(0));
    }

    @test
    public toUlong_zero_complete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAA])
        ).toUlong();
        assert.strictEqual(long, BigInt(0));
    }

    @test
    public toUlong_zero_completeView() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0xAA, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAA])
        )
            .subarray(1, 8)
            .toUlong();
        assert.strictEqual(long, BigInt(0));
    }

    @test
    public toUlong_zero_incomplete() {
        const long = ByteVector.fromByteArray(new Uint8Array([0x00, 0x00, 0x00, 0x00])).toUlong();
        assert.strictEqual(long, BigInt(0));
    }

    @test
    public toUlong_zero_incompleteView() {
        const long = ByteVector.fromByteArray(new Uint8Array([0xAA, 0x00, 0x00, 0x00, 0x00, 0xAA]))
            .subarray(1, 4)
            .toUlong();
        assert.strictEqual(long, BigInt(0));
    }

    @test
    public toUlong_positiveBigEndian_complete() {
        const long = this.ulongPositiveCompleteBV.toUlong();
        assert.strictEqual(long, BigInt("0x0102030405060708"));
    }

    @test
    public toUlong_positiveBigEndian_completeView() {
        const long = ByteVector.concatenate(0xAA, this.ulongPositiveCompleteBV, 0xAA)
            .subarray(1, this.ulongPositiveCompleteBV.length)
            .toUlong();
        assert.strictEqual(long, BigInt("0x0102030405060708"));
    }

    @test
    public toUlong_positiveBigEndian_incomplete() {
        const long = this.ulongPositiveIncompleteBV.toUlong();
        assert.strictEqual(long, BigInt("0x01020304"));
    }

    @test
    public toUlong_positiveBigEndian_incompleteView() {
        const long = ByteVector.concatenate(0xAA, this.ulongPositiveIncompleteBV, 0xAA)
            .subarray(1, this.ulongPositiveIncompleteBV.length)
            .toUlong();
        assert.strictEqual(long, BigInt("0x01020304"));
    }

    @test
    public toUlong_positiveLittleEndian_complete() {
        const long = this.ulongPositiveCompleteBV.toUlong(false);
        assert.strictEqual(long, BigInt("0x0807060504030201"));
    }

    @test
    public toUlong_positiveLittleEndian_completeView() {
        const long = ByteVector.concatenate(0xAA, this.ulongPositiveCompleteBV, 0xAA)
            .subarray(1, this.ulongPositiveCompleteBV.length)
            .toUlong(false);
        assert.strictEqual(long, BigInt("0x0807060504030201"));
    }

    @test
    public toUlong_positiveLittleEndian_incomplete() {
        const long = this.ulongPositiveIncompleteBV.toUlong(false);
        assert.strictEqual(long, BigInt("0x04030201"));
    }

    @test
    public toUlong_positiveLittleEndian_incompleteView() {
        const long = ByteVector.concatenate(0xAA, this.ulongPositiveIncompleteBV, 0xAA)
            .subarray(1, this.ulongPositiveIncompleteBV.length)
            .toUlong(false);
        assert.strictEqual(long, BigInt("0x04030201"));
    }

    @test
    public toUlong_unsignedRange_complete() {
        const long = ByteVector.fromByteArray(
            new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF])
        ).toUlong();
        assert.strictEqual(long, BigInt("0xFFFFFFFFFFFFFFFF"));
    }

    @test
    public toUshort_empty() {
        const int = ByteVector.fromSize(0).toUshort();
        assert.strictEqual(int, 0);
    }

    @test
    public toUshort_emptyView() {
        const short = ByteVector.fromByteArray(new Uint8Array([0xAA, 0xAA]))
            .subarray(1, 0)
            .toUshort();
        assert.strictEqual(short, 0);
    }

    @test
    public toUshort_zero_complete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0, 0x0, 0xAA])).toUshort();
        assert.strictEqual(int, 0);
    }

    @test
    public toUshort_zero_completeView() {
        const short = ByteVector.fromByteArray(new Uint8Array([0xAA, 0x0, 0x0, 0xAA]))
            .subarray(1, 2)
            .toUshort();
        assert.strictEqual(short, 0);
    }

    @test
    public toUshort_zero_incomplete() {
        const int = ByteVector.fromByteArray(new Uint8Array([0x0])).toUshort();
        assert.strictEqual(int, 0);
    }

    @test
    public toUshort_zero_incompleteView() {
        const short = ByteVector.fromByteArray(new Uint8Array([0xAA, 0x00, 0xAA]))
            .subarray(1, 1)
            .toUshort();
        assert.strictEqual(short, 0);
    }

    @test
    public toUshort_positiveBigEndian_complete() {
        const int = this.ushortPositiveCompleteBV.toUshort();
        assert.strictEqual(int, 0x0102);
    }

    @test
    public toUshort_positiveBigEndian_completeView() {
        const short = ByteVector.concatenate(0xAA, this.ushortPositiveCompleteBV, 0xAA)
            .subarray(1, this.ushortPositiveCompleteBV.length)
            .toUshort();
        assert.strictEqual(short, 0x0102);
    }

    @test
    public toUshort_positiveBigEndian_incomplete() {
        const int = this.ushortPositiveIncompleteBV.toUshort();
        assert.strictEqual(int, 0x01);
    }

    @test
    public toUshort_positiveBigEndian_incompleteView() {
        const short = ByteVector.concatenate(0xAA, this.ushortPositiveIncompleteBV, 0xAA)
            .subarray(1, this.ushortPositiveIncompleteBV.length)
            .toUshort();
        assert.strictEqual(short, 0x01);
    }

    @test
    public toUshort_positiveLittleEndian_complete() {
        const int = this.ushortPositiveCompleteBV.toUshort(false);
        assert.strictEqual(int, 0x0201);
    }

    @test
    public toUshort_positiveLittleEndian_completeView() {
        const short = ByteVector.concatenate(0xAA, this.ushortPositiveCompleteBV, 0xAA)
            .subarray(1, this.ushortPositiveCompleteBV.length)
            .toUshort(false);
        assert.strictEqual(short, 0x0201);
    }

    @test
    public toUshort_positiveLittleEndian_incomplete() {
        const int = this.ushortPositiveIncompleteBV.toUshort(false);
        assert.strictEqual(int, 0x01);
    }
    @test
    public toUshort_positiveLittleEndian_incompleteView() {
        const short = ByteVector.concatenate(0xAA, this.ushortPositiveIncompleteBV, 0xAA)
            .subarray(1, this.ushortPositiveIncompleteBV.length)
            .toUshort(false);
        assert.strictEqual(short, 0x01);
    }

    @test
    public toUshort_unsignedRange_complete() {
        const short = ByteVector.fromByteArray(new Uint8Array([0xFF, 0xFF])).toUshort();
        assert.strictEqual(short, 0xFFFF);
    }

    private static testStrings(
        textInput: string[],
        stringType: StringType,
        count: number,
        expected: string[]
    ) {
        // Arrange
        const renderedStrings = [];
        for (const s of textInput) {
            renderedStrings.push(ByteVector.fromString(s, stringType));
            renderedStrings.push(ByteVector.getTextDelimiter(stringType));
        }
        const bv = ByteVector.concatenate(... renderedStrings);

        // Act
        const strs = bv.toStrings(stringType, count);

        // Assert
        assert.deepEqual(strs, expected);
    }
}
