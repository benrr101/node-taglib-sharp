import * as Chai from "chai";
import {suite, test} from "mocha-typescript";

import RiffBitmapInfoHeader from "../../src/riff/riffBitmapInfoHeader";
import {ByteVector} from "../../src/byteVector";
import {MediaTypes} from "../../src/iCodec";
import {Testers} from "../utilities/testers";

// Setup chai
const assert = Chai.assert;

@suite class Riff_BitmapInfoHeaderTests {
    @test
    public constructor_invalidParams() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => new RiffBitmapInfoHeader(v, 0));
        Testers.testUint((v) => new RiffBitmapInfoHeader(ByteVector.empty(), v));
    }

    @test
    public constructor_tooShort() {
        // Arrange
        const data = ByteVector.fromSize(40);

        // Act / Assert
        assert.throws(() => new RiffBitmapInfoHeader(data, 20));
    }

    @test
    public constructor_knownFourCC() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            ByteVector.fromUInt(40, false), // Size of the struct
            ByteVector.fromUInt(123, false), // Width of image
            ByteVector.fromUInt(234, false), // Height of image
            ByteVector.fromUShort(345, false), // Number of planes
            ByteVector.fromUShort(456, false), // Average bits per pixel
            ByteVector.fromUInt(0x58564944, false), // FOURCC [DIVX]
            ByteVector.fromUInt(567, false), // Size of the image
            ByteVector.fromUInt(678, false), // Pixels per meter X
            ByteVector.fromUInt(789, false), // Pixels per meter Y
            ByteVector.fromUInt(890, false), // Colors used
            ByteVector.fromUInt(1234, false), // Important colors
        );

        // Act
        const output = new RiffBitmapInfoHeader(data, 10);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.bitCount, 456);
        assert.strictEqual(output.colorsUsed, 890);
        assert.strictEqual(output.compressionId, 0x58564944);
        assert.isTrue(output.description.indexOf("DivX") >= 0);
        assert.isTrue(output.description.indexOf("[DIVX]") >= 0);
        assert.strictEqual(output.durationMilliseconds, 0);
        assert.strictEqual(output.imageSize, 567);
        assert.strictEqual(output.importantColors, 1234);
        assert.strictEqual(output.mediaTypes, MediaTypes.Video);
        assert.strictEqual(output.planes, 345);
        assert.strictEqual(output.videoHeight, 234);
        assert.strictEqual(output.videoWidth, 123);
        assert.strictEqual(output.xPixelsPerMeter, 678);
        assert.strictEqual(output.yPixelsPerMeter, 789);
    }

    @test
    public constructor_unknownFourCC() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            ByteVector.fromUInt(40, false), // Size of the struct
            ByteVector.fromUInt(123, false), // Width of image
            ByteVector.fromUInt(234, false), // Height of image
            ByteVector.fromUShort(345, false), // Number of planes
            ByteVector.fromUShort(456, false), // Average bits per pixel
            ByteVector.fromUInt(0x7C7C7C7C, false), // FOURCC [||||]
            ByteVector.fromUInt(567, false), // Size of the image
            ByteVector.fromUInt(678, false), // Pixels per meter X
            ByteVector.fromUInt(789, false), // Pixels per meter Y
            ByteVector.fromUInt(890, false), // Colors used
            ByteVector.fromUInt(1234, false), // Important colors
        );

        // Act
        const output = new RiffBitmapInfoHeader(data, 10);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.bitCount, 456);
        assert.strictEqual(output.colorsUsed, 890);
        assert.strictEqual(output.compressionId, 0x7C7C7C7C);
        assert.isTrue(output.description.indexOf("Unknown") >= 0);
        assert.isTrue(output.description.indexOf("[||||]") >= 0);
        assert.strictEqual(output.durationMilliseconds, 0);
        assert.strictEqual(output.imageSize, 567);
        assert.strictEqual(output.importantColors, 1234);
        assert.strictEqual(output.mediaTypes, MediaTypes.Video);
        assert.strictEqual(output.planes, 345);
        assert.strictEqual(output.videoHeight, 234);
        assert.strictEqual(output.videoWidth, 123);
        assert.strictEqual(output.xPixelsPerMeter, 678);
        assert.strictEqual(output.yPixelsPerMeter, 789);
    }
}
