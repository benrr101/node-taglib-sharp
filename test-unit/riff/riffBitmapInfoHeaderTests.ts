import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import RiffBitmapInfoHeader from "../../src/riff/riffBitmapInfoHeader";
import {default as Resources} from "./resources";
import {ByteVector} from "../../src/byteVector";
import {MediaTypes} from "../../src/properties";
import {Testers} from "../utilities/testers";

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
        const data = Resources.getVideoFormatBlock(0x58564944);

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
        const data = Resources.getVideoFormatBlock(0x7C7C7C7C);

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
