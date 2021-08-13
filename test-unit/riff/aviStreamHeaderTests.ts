import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import {AviStreamHeader} from "../../src/riff/avi/aviStreamHeader";
import {ByteVector} from "../../src/byteVector";
import {Testers} from "../utilities/testers";

// Setup chai
const assert = Chai.assert;

@suite class Riff_AviStreamHeaderTests {

    @test
    public constructor_invalidData() {
        // Act / Assert
        Testers.testTruthy<ByteVector>((v) => new AviStreamHeader(v, 123));
    }

    @test
    public constructor_invalidOffset() {
        // Arrange
        const data = ByteVector.empty();

        // Act / Assert
        Testers.testUint((v) => new AviStreamHeader(data, v));
        assert.throws(() => new AviStreamHeader(data, 1));
    }

    @test
    public constructor_validParams() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            ByteVector.fromUInt(0x12345678, false), // FourCC
            ByteVector.fromUInt(0x23456789, false), // FourCC handler
            ByteVector.fromUInt(0x34567890, false), // Flags
            ByteVector.fromUShort(0x1234, false),   // Priority
            ByteVector.fromUShort(0x2345, false),   // Language
            ByteVector.fromUInt(0x45678901, false), // Initial Frames
            ByteVector.fromUInt(0x56789012, false), // Scale
            ByteVector.fromUInt(0x67890123, false), // Rate
            ByteVector.fromUInt(0x78901234, false), // Start
            ByteVector.fromUInt(0x89012345, false), // Length
            ByteVector.fromUInt(0x90123456, false), // Suggested Buffer Size
            ByteVector.fromUInt(0x01234567, false), // Quality
            ByteVector.fromUInt(0x11234567, false), // Sample size
            ByteVector.fromUShort(0x3456, false),   // left
            ByteVector.fromUShort(0x4567, false),   // top
            ByteVector.fromUShort(0x5678, false),   // right
            ByteVector.fromUShort(0x6789, false),   // bottom
        );

        // Act
        const result = new AviStreamHeader(data, 10);

        // Assert
        assert.strictEqual(result.bottom, 0x6789);
        assert.strictEqual(result.flags, 0x34567890);
        assert.strictEqual(result.handler, 0x23456789);
        assert.strictEqual(result.initialFrames, 0x45678901);
        assert.strictEqual(result.language, 0x2345);
        assert.strictEqual(result.left, 0x3456);
        assert.strictEqual(result.length, 0x89012345);
        assert.strictEqual(result.priority, 0x1234);
        assert.strictEqual(result.quality, 0x01234567);
        assert.strictEqual(result.rate, 0x67890123);
        assert.strictEqual(result.right, 0x5678);
        assert.strictEqual(result.sampleSize, 0x11234567);
        assert.strictEqual(result.scale, 0x56789012);
        assert.strictEqual(result.start, 0x78901234);
        assert.strictEqual(result.suggestedSampleSize, 0x90123456);
        assert.strictEqual(result.top, 0x4567);
        assert.strictEqual(result.type, 0x12345678);
    }
}
