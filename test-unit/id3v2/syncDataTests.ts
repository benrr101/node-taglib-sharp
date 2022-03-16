import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import SyncData from "../../src/id3v2/syncData";
import TestConstants from "../testConstants";
import {ByteVector} from "../../src/byteVector";
import {Testers} from "../utilities/testers";

@suite class Id3v2_SyncDataTests {
    @test
    public fromUint_InvalidValues() {
        // Act/Assert
        Testers.testUint((v: number) => { SyncData.fromUint(v); });
        assert.throws(() => { SyncData.fromUint(0xF0000000); });
    }

    @test
    public fromUint_Successful() {
        // Act
        const output = SyncData.fromUint(TestConstants.syncedUint);

        // Assert
        Testers.bvEqual(output, TestConstants.syncedUintBytes);
    }

    @test
    public resyncByteVector_FalsyData() {
        // Act/Assert
        assert.throws(() => { SyncData.resyncByteVector(null); });
        assert.throws(() => { SyncData.resyncByteVector(undefined); });
    }

    @test
    public resyncByteVector_validData() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10, 0xAA),
            0xFF, 0x00, 0xFF,
            ByteVector.fromSize(11, 0xBB),
            0xFF, 0x00, 0xFF,
            ByteVector.fromSize(9, 0xCC),
            0xFF, 0x00, 0xE5,
            ByteVector.fromSize(11, 0xDD),
            0xFF, 0x00, 0xE5,
            ByteVector.fromSize(9, 0xEE),
            0xFF, 0x00, 0x00,
            ByteVector.fromSize(11, 0x11),
            0xFF, 0x00, 0x00,
            ByteVector.fromSize(9, 0x22),
            0xFF, 0x00, 0xFF, 0x00, 0xFF,
            ByteVector.fromSize(7, 0x33),
            0xFF, 0x00, 0xFF, 0x00, 0xFF,
            ByteVector.fromSize(7, 0x33)
        );

        // Act
        const output = SyncData.resyncByteVector(data);

        // Assert
        const expected = ByteVector.concatenate(
            ByteVector.fromSize(10, 0xAA),
            0xFF, 0xFF, // Aligned to 2
            ByteVector.fromSize(11, 0xBB),
            0xFF, 0xFF, // Not aligned to 2
            ByteVector.fromSize(9, 0xCC),
            0xFF, 0xE5, // Aligned, second byte is 0b111xxxxx
            ByteVector.fromSize(11, 0xDD),
            0xFF, 0xE5, // Not aligned, second byte is 0b111xxxxx
            ByteVector.fromSize(9, 0xEE),
            0xFF, 0x00, // Aligned, second byte is 00
            ByteVector.fromSize(11, 0x11),
            0xFF, 0x00, // Not aligned, second byte is 00
            ByteVector.fromSize(9, 0x22),
            0xFF, 0xFF, 0xFF, // Multiple bytes
            ByteVector.fromSize(7, 0x33),
            0xFF, 0xFF, 0xFF, // Multiple bytes, not aligned
            ByteVector.fromSize(7, 0x33)
        );
        Testers.bvEqual(output, expected);
        assert.isFalse(ByteVector.equals(data, expected));
    }

    @test
    public toUint_FalsyData() {
        // Act/Assert
        Testers.testTruthy((v: ByteVector) => { SyncData.toUint(v); });
    }

    @test
    public toUint_TooFewBytes() {
        // Arrange
        const input = ByteVector.fromSize(2, 0x10);

        // Act
        const output = SyncData.toUint(input);

        // Assert
        assert.equal(output, 0x810);
    }

    @test
    public toUint_TooManyBytes() {
        // Arrange
        const input = ByteVector.fromSize(6, 0x10);

        // Act
        const output = SyncData.toUint(input);

        // Assert
        assert.equal(output, TestConstants.syncedUint);
    }

    @test
    public toUint_JustRightBytes() {
        // Arrange
        const input = ByteVector.fromSize(4, 0x10);

        // Act
        const output = SyncData.toUint(input);

        // Assert
        assert.equal(output, TestConstants.syncedUint);
    }

    @test
    public unsyncByteVector_falsyData() {
        // Act/Assert
        Testers.testTruthy((v: ByteVector) => { SyncData.unsyncByteVector(v); });
    }

    @test
    public unsyncByteVector_validData() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10, 0xAA),
            0xFF, 0xFF, // Aligned to 2
            ByteVector.fromSize(11, 0xBB),
            0xFF, 0xFF, // Not aligned to 2
            ByteVector.fromSize(9, 0xCC),
            0xFF, 0xE5, // Aligned, second byte is 0b111xxxxx
            ByteVector.fromSize(11, 0xDD),
            0xFF, 0xE5, // Not aligned, second byte is 0b111xxxxx
            ByteVector.fromSize(9, 0xEE),
            0xFF, 0x00, // Aligned, second byte is 00
            ByteVector.fromSize(11, 0x11),
            0xFF, 0x00, // Not aligned, second byte is 00
            ByteVector.fromSize(9, 0x22),
            0xFF, 0xFF, 0xFF, // Multiple bytes
            ByteVector.fromSize(7, 0x33),
            0xFF, 0xFF, 0xFF, // Multiple bytes, not aligned
            ByteVector.fromSize(7, 0x33)
        );

        // Act
        const output = SyncData.unsyncByteVector(data);

        // Assert
        const expected = ByteVector.concatenate(
            ByteVector.fromSize(10, 0xAA),
            0xFF, 0x00, 0xFF,
            ByteVector.fromSize(11, 0xBB),
            0xFF, 0x00, 0xFF,
            ByteVector.fromSize(9, 0xCC),
            0xFF, 0x00, 0xE5,
            ByteVector.fromSize(11, 0xDD),
            0xFF, 0x00, 0xE5,
            ByteVector.fromSize(9, 0xEE),
            0xFF, 0x00, 0x00,
            ByteVector.fromSize(11, 0x11),
            0xFF, 0x00, 0x00,
            ByteVector.fromSize(9, 0x22),
            0xFF, 0x00, 0xFF, 0x00, 0xFF,
            ByteVector.fromSize(7, 0x33),
            0xFF, 0x00, 0xFF, 0x00, 0xFF,
            ByteVector.fromSize(7, 0x33)
        );
        Testers.bvEqual(output, expected);
        assert.isFalse(ByteVector.equals(data, expected));
    }
}
