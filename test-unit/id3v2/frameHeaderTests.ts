import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {Testers} from "../utilities/testers";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";

@suite class FrameHeaderTests {
    @test
    public fromData_invalid() {
        // Arrange
        const testBytes = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => Id3v2FrameHeader.fromData(v, 3));
        Testers.testUint((v) => Id3v2FrameHeader.fromData(testBytes, v));
        assert.throws(() => Id3v2FrameHeader.fromData(testBytes, 1));
        assert.throws(() => Id3v2FrameHeader.fromData(testBytes, 5));
    }

    @test
    public fromData_v2_tooShort() {
        // Arrange
        const testBytes = ByteVector.fromSize(2);

        // Act / Assert
        assert.throws(() => Id3v2FrameHeader.fromData(testBytes, 2));
    }

    @test
    public fromData_v2_standardIdentifier() {
        // Arrange
        const testBytes = ByteVector.fromString("TT1", StringType.Latin1);

        // Act
        const header = Id3v2FrameHeader.fromData(testBytes, 2);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.frameId, FrameIdentifiers['TIT1']);
        assert.strictEqual(header.flags, 0);
        assert.strictEqual(header.frameSize, 0);
    }

    @test
    public fromData_v2_nonstandardIdentifier() {
        // Arrange
        const testBytes = ByteVector.fromString("NON", StringType.Latin1);

        // Act
        const header = Id3v2FrameHeader.fromData(testBytes, 2);

        // Assert
        assert.isOk(header);
        Testers.bvEqual(header.frameId.render(2), testBytes);
        assert.strictEqual(header.flags, 0);
        assert.strictEqual(header.frameSize, 0);
    }

    @test
    public fromData_v3_tooShort() {
        // Arrange
        const testBytes = ByteVector.fromSize(3);

        // Act / Assert
        assert.throws(() => Id3v2FrameHeader.fromData(testBytes, 3));
    }

    @test
    public fromData_v3_standardIdentifier() {
        // Arrange
        const testBytes = ByteVector.fromString("TIT1", StringType.Latin1);

        // Act
        const header = Id3v2FrameHeader.fromData(testBytes, 3);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.frameId, FrameIdentifiers['TIT1']);
        assert.strictEqual(header.flags, 0);
        assert.strictEqual(header.frameSize, 0);
    }

    @test
    public fromData_v3_nonstandardIdentifier() {
        // Arrange
        const testBytes = ByteVector.fromString("NON1", StringType.Latin1);

        // Act
        const header = Id3v2FrameHeader.fromData(testBytes, 3);

        // Assert
        assert.isOk(header);
        Testers.bvEqual(header.frameId.render(3), testBytes);
        assert.strictEqual(header.flags, 0);
        assert.strictEqual(header.frameSize, 0);
    }

    @test
    public fromData_v4_tooShort() {
        // Arrange
        const testBytes = ByteVector.fromSize(3);

        // Act / Assert
        assert.throws(() => Id3v2FrameHeader.fromData(testBytes, 4));
    }

    @test
    public fromData_v4_standardIdentifier() {
        // Arrange
        const testBytes = ByteVector.fromString("TIT1", StringType.Latin1);

        // Act
        const header = Id3v2FrameHeader.fromData(testBytes, 4);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.frameId, FrameIdentifiers['TIT1']);
        assert.strictEqual(header.flags, 0);
        assert.strictEqual(header.frameSize, 0);
    }

    @test
    public fromData_v4_nonstandardIdentifier() {
        // Arrange
        const testBytes = ByteVector.fromString("NON1", StringType.Latin1);

        // Act
        const header = Id3v2FrameHeader.fromData(testBytes, 4);

        // Assert
        assert.isOk(header);
        Testers.bvEqual(header.frameId.render(4), testBytes);
        assert.strictEqual(header.flags, 0);
        assert.strictEqual(header.frameSize, 0);
    }
}