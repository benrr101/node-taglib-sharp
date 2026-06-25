import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {Allow, Testers} from "../utilities/testers";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import PropertyTests from "../utilities/propertyTests";
import {NumberUtils} from "../../src/utils";

@suite class FrameHeaderTests {
    // #region Constructor Tests

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

    // #endregion

    // #region Property Tests

    @test
    public dataLength_invalid() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);

        // Act / Assert
        Testers.testSafeUint((v: number) => header.dataLength = v, Allow.Undefined);
    }

    @test
    public dataLength_valid() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        const set = (v: number) => header.dataLength = v;
        const get = () => header.dataLength;

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, 123);
        PropertyTests.propertyRoundTrip(set, get, undefined);
        PropertyTests.propertyRoundTrip(set, get, 234);
    }

    @test
    public encryptionId_throws() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);

        // Act / Assert
        assert.throws(() => header.encryptionId = 123);
    }

    @test
    public frameSize_invalid() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);

        // Act / Assert
        Testers.testSafeUint((v: number) => header.frameSize = v);
    }

    @test
    public frameSize_valid() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        const set = (v: number) => header.frameSize = v;
        const get = () => header.frameSize;

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, 123);
    }

    @test
    public groupId_invalid() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);

        // Act / Assert
        Testers.testByte((v: number) => header.groupId = v);
    }

    @test
    public groupId_valid() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        const set = (v: number) => header.groupId = v;
        const get = () => header.groupId;

        // Act / Assert
        assert.isUndefined(header.groupId);
        assert.isFalse(NumberUtils.hasFlag(header.flags, Id3v2FrameFlags.GroupingIdentity));

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.isTrue(NumberUtils.hasFlag(header.flags, Id3v2FrameFlags.GroupingIdentity));

        PropertyTests.propertyRoundTrip(set, get, undefined);
        assert.isFalse(NumberUtils.hasFlag(header.flags, Id3v2FrameFlags.GroupingIdentity));

        PropertyTests.propertyRoundTrip(set, get, 234);
        assert.isTrue(NumberUtils.hasFlag(header.flags, Id3v2FrameFlags.GroupingIdentity));
    }

    @params(true, "true")
    @params(false, "false")
    public isUnsynchronizationApplied(hasFlag: boolean) {
        // Arrange
        const flags = hasFlag ? Id3v2FrameFlags.Unsynchronized : Id3v2FrameFlags.None;
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC, flags);

        // Act
        const result = header.isUnsynchronizationApplied;

        // Assert
        assert.strictEqual(result, hasFlag);
    }

    // #endregion

    // #region Method Tests

    @params([2, 6], "v2")
    @params([3, 10], "v3")
    @params([4, 10], "v4")
    public getBaseSize([version, size]: [number, number]) {
        // Act
        const result = Id3v2FrameHeader.getBaseSize(version);

        // Assert
        assert.strictEqual(result, size);
    }

    @test
    public clone_withoutIdentifier() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.GEOB);
        header.dataLength = 123;
        // header.encryptionId = 234;
        header.flags = 0xABCD;
        header.frameSize = 345;
        header.groupId = 0xDE;

        // Act
        const result = header.clone();

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.dataLength, header.dataLength);
        // assert.strictEqual(result.encryptionId, header.encryptionId);
        assert.strictEqual(result.frameSize, header.frameSize);
        assert.strictEqual(result.groupId, header.groupId);
    }

    @params(0x0000, "none")
    @params(0xFFFF, "all")
    public readExtendedHeaderFromPayloadBytes_v2(flags: Id3v2FrameFlags) {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        header.flags = flags;

        // Act
        const result = header.readExtendedHeaderFromPayloadBytes(ByteVector.fromSize(10), 2);

        // Assert
        assert.strictEqual(result, 0);
        assert.isUndefined(header.dataLength);
        assert.isUndefined(header.encryptionId);
        assert.isUndefined(header.groupId);
    }

    @params([
        Id3v2FrameFlags.None,
        0, undefined, undefined, undefined
    ], "None")
    @params([
        Id3v2FrameFlags.Compression,
        4, 0x01020304, undefined, undefined
    ], "__C")
    @params([
        Id3v2FrameFlags.Encryption,
        1, undefined, 0x01, undefined
    ], "_E_")
    @params([
        Id3v2FrameFlags.Encryption|Id3v2FrameFlags.Compression,
        5, 0x01020304, 0x05, undefined
    ], "_EC")
    @params([
        Id3v2FrameFlags.GroupingIdentity,
        1, undefined, undefined, 0x01
    ], "G__")
    @params([
        Id3v2FrameFlags.GroupingIdentity|Id3v2FrameFlags.Compression,
        5, 0x01020304, undefined, 0x05
    ], "G_C")
    @params([
        Id3v2FrameFlags.GroupingIdentity|Id3v2FrameFlags.Encryption,
        2, undefined, 0x01, 0x02
    ], "GE_")
    @params([
        Id3v2FrameFlags.GroupingIdentity|Id3v2FrameFlags.Encryption|Id3v2FrameFlags.Compression,
        6, 0x01020304, 0x05, 0x06
    ], "GEC")
    @params([
        0xFFFF,
        6, 0x01020304, 0x05, 0x06
    ], "All")
    public readExtendedHeaderFromPayloadBytes_v3(
        [flags, length, dataLength, encryptionId, groupId]:
            [Id3v2FrameFlags, number, number|undefined, number|undefined, number|undefined]
    ) {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        header.flags = flags;

        const extendedBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);

        // Act
        const result = header.readExtendedHeaderFromPayloadBytes(extendedBytes, 3);

        // Assert
        assert.strictEqual(result, length);
        assert.strictEqual(header.dataLength, dataLength);
        assert.strictEqual(header.encryptionId, encryptionId);
        assert.strictEqual(header.groupId, groupId);
    }

    @params([
        Id3v2FrameFlags.None,
        0, undefined, undefined, undefined
    ], "None")
    @params([
        Id3v2FrameFlags.GroupingIdentity,
        1, 0x01, undefined, undefined
    ], "__G")
    @params([
        Id3v2FrameFlags.Encryption,
        1, undefined, 0x01, undefined
    ], "_E_")
    @params([
        Id3v2FrameFlags.Encryption|Id3v2FrameFlags.GroupingIdentity,
        2, 0x01, 0x02, undefined
    ], "_EG")
    @params([
        Id3v2FrameFlags.DataLengthIndicator,
        4, undefined, undefined, 0x00208184
    ], "D__")
    @params([
        Id3v2FrameFlags.DataLengthIndicator|Id3v2FrameFlags.GroupingIdentity,
        5, 0x01, undefined, 0x0040C205
    ], "D_G")
    @params([
        Id3v2FrameFlags.DataLengthIndicator|Id3v2FrameFlags.Encryption,
        5, undefined, 0x01, 0x0040C205
    ], "DE_")
    @params([
        Id3v2FrameFlags.DataLengthIndicator|Id3v2FrameFlags.Encryption|Id3v2FrameFlags.GroupingIdentity,
        6, 0x01, 0x02, 0x00610286
    ], "GEC")
    @params([
        0xFFFF,
        6, 0x01, 0x02, 0x00610286
    ], "All")
    public readExtendedHeaderFromPayloadBytes_v4(
        [flags, length, groupId, encryptionId, dataLength]:
            [Id3v2FrameFlags, number, number|undefined, number|undefined, number|undefined]) {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        header.flags = flags;

        const extendedBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);

        // Act
        const result = header.readExtendedHeaderFromPayloadBytes(extendedBytes, 4);

        // Assert
        assert.strictEqual(result, length);
        assert.strictEqual(header.dataLength, dataLength);
        assert.strictEqual(header.encryptionId, encryptionId);
        assert.strictEqual(header.groupId, groupId);
    }

    @test
    public readExtendedHeaderFromPayloadBytes_notEnoughBytes() {
        // Arrange
        const header = new Id3v2FrameHeader(
            FrameIdentifiers.APIC,
            Id3v2FrameFlags.DataLengthIndicator
        );
        const extendedBytes = ByteVector.fromByteArray([0x00, 0x00, 0x02]);

        // Act / Assert
        assert.throws(
            () => header.readExtendedHeaderFromPayloadBytes(extendedBytes, 4),
            "ID3v2 frame extended header does not contain enough bytes for fields set by flags"
        );
    }

    @test
    public renderExtendedHeader_v4_dataLengthIndicatorIsSyncSafe() {
        // Arrange
        const header = new Id3v2FrameHeader(
            FrameIdentifiers.APIC,
            Id3v2FrameFlags.DataLengthIndicator
        );
        header.dataLength = 0x100;

        // Act
        const result = header.renderExtendedHeader(4);

        // Assert
        Testers.bvEqual(result, [0x00, 0x00, 0x02, 0x00]);
    }

    // #endregion
}
