import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import TestFile from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {OggPageFlags, OggPageHeader} from "../../src/ogg/oggPageHeader";
import {Testers} from "../utilities/testers";


@suite class Ogg_PageHeaderTests {
    @test
    public fromFile_invalidParams() {
        // Arrange
        const file = Mock.ofType<File>().object;
        const position = 123;

        // Act / Assert
        Testers.testTruthy((v: File) => OggPageHeader.fromFile(v, position));
        Testers.testSafeUint((v) => OggPageHeader.fromFile(file, v));
    }

    @test
    public fromFile_fileTooShort() {
        // Arrange
        const file = TestFile.getFile(ByteVector.fromSize(27));

        // Act / Assert
        assert.throws(() => OggPageHeader.fromFile(file, 2));
    }

    @test
    public fromFile_doesNotStartWithHeader() {
        // Arrange
        const data = ByteVector.fromSize(50);
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => OggPageHeader.fromFile(file, 0));
    }

    @test
    public fromFile_unsupportedSize() {
        // Arrange
        const data = ByteVector.concatenate(
            OggPageHeader.HEADER_IDENTIFIER,
            0x05, 0x06,
            ByteVector.fromUlong(BigInt(0x100000000000000))
        );
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => OggPageHeader.fromFile(file, 0));
    }

    @test
    public fromFile_invalidPageSegmentCount() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Buffer
            OggPageHeader.HEADER_IDENTIFIER,
            0x05, // Version
            0x07, // Flags,
            ByteVector.fromUlong(0x123456, false), // Absolute granular position
            ByteVector.fromUint(0x1234, false), // Stream serial number
            ByteVector.fromUint(0x2345, false), // Page sequence number
            ByteVector.fromSize(4), // Checksum
            0x00, // Invalid page segment count
            ByteVector.fromSize(10)
        );
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => OggPageHeader.fromFile(file, 10));
    }

    @test
    public fromFile_lastPacketComplete() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Buffer
            OggPageHeader.HEADER_IDENTIFIER,
            0x05, // Version
            0x07, // Flags,
            ByteVector.fromUlong(0x123456, false), // Absolute granular position
            ByteVector.fromUint(0x1234, false), // Stream serial number
            ByteVector.fromUint(0x2345, false), // Page sequence number
            ByteVector.fromSize(4), // Checksum
            0x03, // Page segment count
            0x12, // Page segment 1 (complete)
            0xFF, // Page segment 2 (partial)
            0x34  // Page segment 3 (completes the previous)
        );
        const file = TestFile.getFile(data);

        // Act
        const header = OggPageHeader.fromFile(file, 10);

        // Assert
        assert.ok(header);
        assert.strictEqual(header.absoluteGranularPosition, 0x123456);
        assert.strictEqual(header.dataSize, 325);
        assert.strictEqual(header.flags, 0x07);
        assert.isTrue(header.lastPacketComplete);
        assert.deepStrictEqual(header.packetSizes, [0x12, 0x133]);
        assert.strictEqual(header.pageSequenceNumber, 0x2345);
        assert.strictEqual(header.size, 30);
        assert.strictEqual(header.streamSerialNumber, 0x1234);
    }

    @test
    public fromFile_lastPacketIncomplete() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Buffer
            OggPageHeader.HEADER_IDENTIFIER,
            0x05, // Version
            0x07, // Flags,
            ByteVector.fromUlong(0x123456, false), // Absolute granular position
            ByteVector.fromUint(0x1234, false), // Stream serial number
            ByteVector.fromUint(0x2345, false), // Page sequence number
            ByteVector.fromSize(4), // Checksum
            0x03, // Page segment count
            0x12, // Page segment 1 (complete)
            0xFF, // Page segment 2 (partial)
            0xFF  // Page segment 3 (partial)
        );
        const file = TestFile.getFile(data);

        // Act
        const header = OggPageHeader.fromFile(file, 10);

        // Assert
        assert.ok(header);
        assert.strictEqual(header.absoluteGranularPosition, 0x123456);
        assert.strictEqual(header.dataSize, 528);
        assert.strictEqual(header.flags, 0x07);
        assert.isFalse(header.lastPacketComplete);
        assert.deepStrictEqual(header.packetSizes, [0x12, 0x1FE]);
        assert.strictEqual(header.pageSequenceNumber, 0x2345);
        assert.strictEqual(header.size, 30);
        assert.strictEqual(header.streamSerialNumber, 0x1234);
    }

    @test
    public fromInfo_invalidParameters() {
        // Arrange
        const serialNumber = 1234;
        const pageNumber = 2345;

        // Act / Assert
        Testers.testUint((v) => OggPageHeader.fromInfo(v, pageNumber, OggPageFlags.None));
        Testers.testUint((v) => OggPageHeader.fromInfo(serialNumber, v, OggPageFlags.None));
    }

    @test
    public fromInfo_notFirstPageOfStream() {
        // Act
        const header = OggPageHeader.fromInfo(1234, 2345, OggPageFlags.None);

        // Assert
        assert.ok(header);
        assert.strictEqual(header.absoluteGranularPosition, 0);
        assert.strictEqual(header.dataSize, 0);
        assert.strictEqual(header.flags, OggPageFlags.None);
        assert.isFalse(header.lastPacketComplete);
        assert.deepStrictEqual(header.packetSizes, []);
        assert.strictEqual(header.pageSequenceNumber, 2345);
        assert.strictEqual(header.size, 0);
        assert.strictEqual(header.streamSerialNumber, 1234);
    }

    @test
    public fromInfo_firstPageOfStream() {
        // Act
        const header = OggPageHeader.fromInfo(1234, 0, OggPageFlags.None);

        // Assert
        assert.ok(header);
        assert.strictEqual(header.absoluteGranularPosition, 0);
        assert.strictEqual(header.dataSize, 0);
        assert.strictEqual(header.flags, OggPageFlags.FirstPageOfStream);
        assert.isFalse(header.lastPacketComplete);
        assert.deepStrictEqual(header.packetSizes, []);
        assert.strictEqual(header.pageSequenceNumber, 0);
        assert.strictEqual(header.size, 0);
        assert.strictEqual(header.streamSerialNumber, 1234);
    }

    @test
    public fromInfo_firstPageOfStreamContinued() {
        // Act
        const header = OggPageHeader.fromInfo(1234, 0, OggPageFlags.FirstPacketContinued);

        // Assert
        assert.ok(header);
        assert.strictEqual(header.absoluteGranularPosition, 0);
        assert.strictEqual(header.dataSize, 0);
        assert.strictEqual(header.flags, OggPageFlags.FirstPacketContinued);
        assert.isFalse(header.lastPacketComplete);
        assert.deepStrictEqual(header.packetSizes, []);
        assert.strictEqual(header.pageSequenceNumber, 0);
        assert.strictEqual(header.size, 0);
        assert.strictEqual(header.streamSerialNumber, 1234);
    }

    @test
    public fromPageHeader_invalidParameters() {
        // Arrange
        const header = OggPageHeader.fromInfo(1234, 0, OggPageFlags.None);

        // Act / Assert
        Testers.testTruthy((v: OggPageHeader) => OggPageHeader.fromPageHeader(v, 123, OggPageFlags.None));
        Testers.testUint((v) => OggPageHeader.fromPageHeader(header, v, OggPageFlags.None));
    }

    @test
    public fromPageHeader_notFirstPageOfStream() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Buffer
            OggPageHeader.HEADER_IDENTIFIER,
            0x05, // Version
            0x07, // Flags,
            ByteVector.fromUlong(0x123456, false), // Absolute granular position
            ByteVector.fromUint(0x1234, false), // Stream serial number
            ByteVector.fromUint(0x2345, false), // Page sequence number
            ByteVector.fromSize(4), // Checksum
            0x03, // Page segment count
            0x12, // Page segment 1 (complete)
            0xFF, // Page segment 2 (partial)
            0xFF  // Page segment 3 (partial)
        );
        const file = TestFile.getFile(data);
        const originalHeader = OggPageHeader.fromFile(file, 10);

        // Act
        const header = OggPageHeader.fromPageHeader(originalHeader, 123, OggPageFlags.None);

        // Assert
        assert.ok(header);
        assert.strictEqual(header.absoluteGranularPosition, 0x123456);
        assert.strictEqual(header.dataSize, 528);
        assert.strictEqual(header.flags, OggPageFlags.None);
        assert.isFalse(header.lastPacketComplete);
        assert.deepStrictEqual(header.packetSizes, []);
        assert.strictEqual(header.pageSequenceNumber, 9152);
        assert.strictEqual(header.size, 30);
        assert.strictEqual(header.streamSerialNumber, 0x1234);
    }

    @test
    public fromPageHeader_firstPageOfStream() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Buffer
            OggPageHeader.HEADER_IDENTIFIER,
            0x05, // Version
            0x07, // Flags,
            ByteVector.fromUlong(0x123456, false), // Absolute granular position
            ByteVector.fromUint(0x1234, false), // Stream serial number
            ByteVector.fromUint(0x00, false), // Page sequence number
            ByteVector.fromSize(4), // Checksum
            0x03, // Page segment count
            0x12, // Page segment 1 (complete)
            0xFF, // Page segment 2 (partial)
            0xFF  // Page segment 3 (partial)
        );
        const file = TestFile.getFile(data);
        const originalHeader = OggPageHeader.fromFile(file, 10);

        // Act
        const header = OggPageHeader.fromPageHeader(originalHeader, 0, OggPageFlags.None);

        // Assert
        assert.ok(header);
        assert.strictEqual(header.absoluteGranularPosition, 0x123456);
        assert.strictEqual(header.dataSize, 528);
        assert.strictEqual(header.flags, OggPageFlags.FirstPageOfStream);
        assert.isFalse(header.lastPacketComplete);
        assert.deepStrictEqual(header.packetSizes, []);
        assert.strictEqual(header.pageSequenceNumber, 0);
        assert.strictEqual(header.size, 30);
        assert.strictEqual(header.streamSerialNumber, 0x1234);
    }

    @test
    public fromPageHeader_firstPageOfStreamContinued() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Buffer
            OggPageHeader.HEADER_IDENTIFIER,
            0x05, // Version
            0x07, // Flags,
            ByteVector.fromUlong(0x123456, false), // Absolute granular position
            ByteVector.fromUint(0x1234, false), // Stream serial number
            ByteVector.fromUint(0x00, false), // Page sequence number
            ByteVector.fromSize(4), // Checksum
            0x03, // Page segment count
            0x12, // Page segment 1 (complete)
            0xFF, // Page segment 2 (partial)
            0xFF  // Page segment 3 (partial)
        );
        const file = TestFile.getFile(data);
        const originalHeader = OggPageHeader.fromFile(file, 10);

        // Act
        const header = OggPageHeader.fromPageHeader(originalHeader, 0, OggPageFlags.FirstPacketContinued);

        // Assert
        assert.ok(header);
        assert.strictEqual(header.absoluteGranularPosition, 0x123456);
        assert.strictEqual(header.dataSize, 528);
        assert.strictEqual(header.flags, OggPageFlags.FirstPacketContinued);
        assert.isFalse(header.lastPacketComplete);
        assert.deepStrictEqual(header.packetSizes, []);
        assert.strictEqual(header.pageSequenceNumber, 0);
        assert.strictEqual(header.size, 30);
        assert.strictEqual(header.streamSerialNumber, 0x1234);
    }

    @test
    public setPacketSizes_invalidParameters() {
        // Arrange
        const header = OggPageHeader.fromInfo(1234, 0, OggPageFlags.None);

        // Act / Assert
        Testers.testTruthy((v: number[]) => { header.packetSizes = v; });
        assert.throws(() => { header.packetSizes = [123, undefined]; });
    }

    @test
    public setPacketSizes_validParameters() {
        // Arrange
        const header = OggPageHeader.fromInfo(1234, 0, OggPageFlags.None);
        const value = [123, 234];

        // Act
        header.packetSizes = value;

        // Assert
        assert.sameMembers(header.packetSizes, [123, 234]);
        assert.notStrictEqual(header.packetSizes, value);
    }
}
