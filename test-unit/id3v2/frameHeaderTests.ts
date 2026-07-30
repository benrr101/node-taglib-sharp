import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameHeader from "../../src/id3v2/frames/frameHeader";
import PropertyTests from "../utilities/propertyTests";
import {ByteVector, StringType} from "../../src/byteVector";
import {Allow, Testers} from "../utilities/testers";
import {FrameFlags, Id3v2Version} from "../../src/id3v2/enums";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {NumberUtils} from "../../src/utils";

@suite class FrameHeaderTests {
    // #region Constructor Tests

    @test
    public fromData_invalid() {
        // Arrange
        const testBytes = ByteVector.empty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => FrameHeader.fromData(v, 3));
        Testers.testUint((v) => FrameHeader.fromData(testBytes, v));
        assert.throws(() => FrameHeader.fromData(testBytes, 1));
        assert.throws(() => FrameHeader.fromData(testBytes, 5));
    }

    @params([Id3v2Version.V22, 2], "v2")
    @params([Id3v2Version.V23, 3], "v3")
    @params([Id3v2Version.V24, 3], "v4")
    public fromData_tooShort([version, testLength]: [Id3v2Version, number]) {
        // Arrange
        const testBytes = ByteVector.fromSize(testLength);

        // Act / Assert
        assert.throws(() => FrameHeader.fromData(testBytes, version));
    }

    @params([Id3v2Version.V22, "TT1"], "v2")
    @params([Id3v2Version.V23, "TIT1"], "v3")
    @params([Id3v2Version.V24, "TIT1"], "v4")
    public fromData_standardIdentifier([version, testIdentifier]: [Id3v2Version, string]) {
        // Arrange
        const testBytes = ByteVector.fromString(testIdentifier, StringType.Latin1);

        // Act
        const header = FrameHeader.fromData(testBytes, version);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.frameId, FrameIdentifiers[testIdentifier]);
        assert.strictEqual(header.flags, 0);
        assert.strictEqual(header.frameSize, 0);
    }

    @params([Id3v2Version.V22, "NON"], "v2")
    @params([Id3v2Version.V23, "NON1"], "v3")
    @params([Id3v2Version.V24, "NON1"], "v4")
    public fromData_nonstandardIdentifier([version, testIdentifier]: [Id3v2Version, string]) {
        // Arrange
        const testBytes = ByteVector.fromString(testIdentifier, StringType.Latin1);

        // Act
        const header = FrameHeader.fromData(testBytes, version);

        // Assert
        assert.isOk(header);
        Testers.bvEqual(header.frameId.render(version), testBytes);
        assert.strictEqual(header.flags, 0);
        assert.strictEqual(header.frameSize, 0);
    }

    // #endregion

    // #region Property Tests

    @test
    public dataLength_invalid() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.APIC);

        // Act / Assert
        Testers.testSafeUint((v: number) => header.dataLength = v, Allow.Undefined);
    }

    @test
    public dataLength_valid() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.APIC);
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
        const header = new FrameHeader(FrameIdentifiers.APIC);

        // Act / Assert
        assert.throws(() => header.encryptionId = 123);
    }

    @test
    public frameSize_invalid() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.APIC);

        // Act / Assert
        Testers.testSafeUint((v: number) => header.frameSize = v);
    }

    @test
    public frameSize_valid() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.APIC);
        const set = (v: number) => header.frameSize = v;
        const get = () => header.frameSize;

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, 123);
    }

    @test
    public groupId_invalid() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.APIC);

        // Act / Assert
        Testers.testByte((v: number) => header.groupId = v);
    }

    @test
    public groupId_valid() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.APIC);
        const set = (v: number) => header.groupId = v;
        const get = () => header.groupId;

        // Act / Assert
        assert.isUndefined(header.groupId);
        assert.isFalse(NumberUtils.hasFlag(header.flags, FrameFlags.GroupingIdentity));

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.isTrue(NumberUtils.hasFlag(header.flags, FrameFlags.GroupingIdentity));

        PropertyTests.propertyRoundTrip(set, get, undefined);
        assert.isFalse(NumberUtils.hasFlag(header.flags, FrameFlags.GroupingIdentity));

        PropertyTests.propertyRoundTrip(set, get, 234);
        assert.isTrue(NumberUtils.hasFlag(header.flags, FrameFlags.GroupingIdentity));
    }

    @params(true, "true")
    @params(false, "false")
    public isUnsynchronizationApplied(hasFlag: boolean) {
        // Arrange
        const flags = hasFlag ? FrameFlags.Unsynchronized : FrameFlags.None;
        const header = new FrameHeader(FrameIdentifiers.APIC, flags);

        // Act
        const result = header.isUnsynchronizationApplied;

        // Assert
        assert.strictEqual(result, hasFlag);
    }

    // #endregion

    // #region Method Tests

    @params([Id3v2Version.V22, 6], "v2")
    @params([Id3v2Version.V23, 10], "v3")
    @params([Id3v2Version.V24, 10], "v4")
    public getBaseSize([version, size]: [Id3v2Version, number]) {
        // Act
        const result = FrameHeader.getBaseSize(version);

        // Assert
        assert.strictEqual(result, size);
    }

    @test
    public clone_withoutIdentifier() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.GEOB);
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
    public readExtendedHeaderFromPayloadBytes_v2(flags: FrameFlags) {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.APIC);
        header.flags = flags;

        // Act
        const result = header.readExtendedHeaderFromPayloadBytes(ByteVector.fromSize(10), Id3v2Version.V22);

        // Assert
        assert.strictEqual(result, 0);
        assert.isUndefined(header.dataLength);
        assert.isUndefined(header.encryptionId);
        assert.isUndefined(header.groupId);
    }

    @params([
        FrameFlags.None,
        0, undefined, undefined, undefined
    ], "None")
    @params([
        FrameFlags.Compression,
        4, 0x01020304, undefined, undefined
    ], "__C")
    @params([
        FrameFlags.Encryption,
        1, undefined, 0x01, undefined
    ], "_E_")
    @params([
        FrameFlags.Encryption|FrameFlags.Compression,
        5, 0x01020304, 0x05, undefined
    ], "_EC")
    @params([
        FrameFlags.GroupingIdentity,
        1, undefined, undefined, 0x01
    ], "G__")
    @params([
        FrameFlags.GroupingIdentity|FrameFlags.Compression,
        5, 0x01020304, undefined, 0x05
    ], "G_C")
    @params([
        FrameFlags.GroupingIdentity|FrameFlags.Encryption,
        2, undefined, 0x01, 0x02
    ], "GE_")
    @params([
        FrameFlags.GroupingIdentity|FrameFlags.Encryption|FrameFlags.Compression,
        6, 0x01020304, 0x05, 0x06
    ], "GEC")
    @params([
        0xFFFF,
        6, 0x01020304, 0x05, 0x06
    ], "All")
    public readExtendedHeaderFromPayloadBytes_v3(
        [flags, length, dataLength, encryptionId, groupId]:
            [FrameFlags, number, number|undefined, number|undefined, number|undefined]
    ) {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.APIC);
        header.flags = flags;

        const extendedBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);

        // Act
        const result = header.readExtendedHeaderFromPayloadBytes(extendedBytes, Id3v2Version.V23);

        // Assert
        assert.strictEqual(result, length);
        assert.strictEqual(header.dataLength, dataLength);
        assert.strictEqual(header.encryptionId, encryptionId);
        assert.strictEqual(header.groupId, groupId);
    }

    @params([
        FrameFlags.None,
        0, undefined, undefined, undefined
    ], "None")
    @params([
        FrameFlags.GroupingIdentity,
        1, 0x01, undefined, undefined
    ], "__G")
    @params([
        FrameFlags.Encryption,
        1, undefined, 0x01, undefined
    ], "_E_")
    @params([
        FrameFlags.Encryption|FrameFlags.GroupingIdentity,
        2, 0x01, 0x02, undefined
    ], "_EG")
    @params([
        FrameFlags.DataLengthIndicator,
        4, undefined, undefined, 0x00208184
    ], "D__")
    @params([
        FrameFlags.DataLengthIndicator|FrameFlags.GroupingIdentity,
        5, 0x01, undefined, 0x0040C205
    ], "D_G")
    @params([
        FrameFlags.DataLengthIndicator|FrameFlags.Encryption,
        5, undefined, 0x01, 0x0040C205
    ], "DE_")
    @params([
        FrameFlags.DataLengthIndicator|FrameFlags.Encryption|FrameFlags.GroupingIdentity,
        6, 0x01, 0x02, 0x00610286
    ], "GEC")
    @params([
        0xFFFF,
        6, 0x01, 0x02, 0x00610286
    ], "All")
    public readExtendedHeaderFromPayloadBytes_v4(
        [flags, length, groupId, encryptionId, dataLength]:
            [FrameFlags, number, number|undefined, number|undefined, number|undefined]) {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.APIC);
        header.flags = flags;

        const extendedBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);

        // Act
        const result = header.readExtendedHeaderFromPayloadBytes(extendedBytes, Id3v2Version.V24);

        // Assert
        assert.strictEqual(result, length);
        assert.strictEqual(header.dataLength, dataLength);
        assert.strictEqual(header.encryptionId, encryptionId);
        assert.strictEqual(header.groupId, groupId);
    }

    @test
    public readExtendedHeaderFromPayloadBytes_v4_notEnoughBytes() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.APIC, FrameFlags.DataLengthIndicator);
        const extendedBytes = ByteVector.fromByteArray([0x00, 0x00, 0x02]);

        // Act / Assert
        assert.throws(
            () => header.readExtendedHeaderFromPayloadBytes(extendedBytes, Id3v2Version.V24),
            "ID3v2 frame extended header does not contain enough bytes for fields set by flags"
        );
    }

    @test
    public renderExtendedHeader_v4_dataLengthIndicatorIsSyncSafe() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.APIC, FrameFlags.DataLengthIndicator);
        header.dataLength = 0x100;

        // Act
        const result = header.renderExtendedHeader(Id3v2Version.V24);

        // Assert
        Testers.bvEqual(result, [0x00, 0x00, 0x02, 0x00]);
    }

    // #endregion
}
