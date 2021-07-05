import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import PropertyTests from "../utilities/propertyTests";
import {ApeTagFooter, ApeTagFooterFlags} from "../../src/ape/apeTagFooter";
import {ByteVector, StringType} from "../../src/byteVector";
import {Testers} from "../utilities/testers";

// Setup chai
const assert = Chai.assert;

const _sampleData = ByteVector.concatenate(
    ByteVector.fromString("APETAGEX", StringType.Latin1), // File Identifier
    ByteVector.fromUInt(1234, false), // Version
    ByteVector.fromUInt(2345, false), // Tag Size
    ByteVector.fromUInt(3456, false), // Item count
    ByteVector.fromUInt(ApeTagFooterFlags.IsHeader, false), // Flags
    ByteVector.fromSize(12)
);

@suite class Ape_TagFooter_ConstructorTests {
    @test
    public fromData_invalidParameters() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => ApeTagFooter.fromData(v));
        assert.throws(() => ApeTagFooter.fromData(ByteVector.fromSize(10)));
        assert.throws(() => ApeTagFooter.fromData(ByteVector.fromSize(40)));
    }

    @test
    public fromData_dataIsZero() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("APETAGEX", StringType.Latin1), // File Identifier
            ByteVector.fromUInt(1234, false), // Version
            ByteVector.fromUInt(10, false), // Tag Size
            ByteVector.fromUInt(3456, false), // Item count
            ByteVector.fromUInt(ApeTagFooterFlags.IsHeader, false), // Flags
            ByteVector.fromSize(12)
        );

        // Act / Assert
        assert.throws(() => { ApeTagFooter.fromData(data); });
    }

    @test
    public fromData_isHeaderVersionSet() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("APETAGEX", StringType.Latin1), // File Identifier
            ByteVector.fromUInt(1234, false), // Version
            ByteVector.fromUInt(2345, false), // Tag Size
            ByteVector.fromUInt(3456, false), // Item count
            ByteVector.fromUInt(ApeTagFooterFlags.IsHeader, false), // Flags
            ByteVector.fromSize(12)
        );

        // Act
        const footer = ApeTagFooter.fromData(data);

        // Assert
        assert.isOk(footer);
        assert.strictEqual(footer.flags, ApeTagFooterFlags.IsHeader);
        assert.strictEqual(footer.itemCount, 3456);
        assert.strictEqual(footer.itemSize, 2345 - ApeTagFooter.size);
        assert.strictEqual(footer.tagSize, 2345);
        assert.strictEqual(footer.version, 1234);
    }

    @test
    public fromData_headerPresentVersionNotSet() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromString("APETAGEX", StringType.Latin1), // File Identifier
            ByteVector.fromUInt(0, false), // Version
            ByteVector.fromUInt(2345, false), // Tag Size
            ByteVector.fromUInt(3456, false), // Item count
            ByteVector.fromUInt(ApeTagFooterFlags.HeaderPresent, false), // Flags
            ByteVector.fromSize(12)
        );

        // Act
        const footer = ApeTagFooter.fromData(data);

        // Assert
        assert.isOk(footer);
        assert.strictEqual(footer.flags, ApeTagFooterFlags.HeaderPresent);
        assert.strictEqual(footer.itemCount, 3456);
        assert.strictEqual(footer.itemSize, 2345 - ApeTagFooter.size);
        assert.strictEqual(footer.tagSize, 2345 + ApeTagFooter.size);
        assert.strictEqual(footer.version, 2000);
    }

    @test
    public fromEmpty() {
        // Act
        const footer = ApeTagFooter.fromEmpty();

        // Assert
        assert.isOk(footer);
        assert.strictEqual(footer.flags, 0);
        assert.strictEqual(footer.itemCount, 0);
        assert.strictEqual(footer.tagSize, ApeTagFooter.size);
        assert.strictEqual(footer.version, 2000);
    }
}

@suite class Ape_TagFooter_PropertyTests {
    @test
    public setItemSize_valid() {
        // Arrange
        const footer = ApeTagFooter.fromData(_sampleData);

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { footer.itemSize = v; },
            () => footer.itemSize,
            8086
        );
    }

    @test
    public setItemSize_invalid() {
        // Arrange
        const footer = ApeTagFooter.fromData(_sampleData);
        const setItemSize = (v: number) => { footer.itemSize = v; };

        // Act / Assert
        PropertyTests.propertyThrows(setItemSize, -1);
        PropertyTests.propertyThrows(setItemSize, 1.23);
        PropertyTests.propertyThrows(setItemSize, Number.MAX_SAFE_INTEGER + 1);
    }

    @test
    public setItemCount_valid() {
        // Arrange
        const footer = ApeTagFooter.fromData(_sampleData);

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v: number) => { footer.itemCount = v; },
            () => footer.itemCount,
            8086
        );
    }

    @test
    public setItemCount_invalid() {
        // Arrange
        const footer = ApeTagFooter.fromData(_sampleData);
        const setItemCount = (v: number) => { footer.itemCount = v; };

        // Act / Assert
        PropertyTests.propertyThrows(setItemCount, -1);
        PropertyTests.propertyThrows(setItemCount, 1.23);
        PropertyTests.propertyThrows(setItemCount, Number.MAX_SAFE_INTEGER + 1);
    }

    @test
    public setFlags() {
        // Arrange
        const footer = ApeTagFooter.fromData(_sampleData);

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { footer.flags = v; },
            () => footer.flags,
            ApeTagFooterFlags.FooterAbsent);
    }
}

@suite class Ape_TagFooter_MethodTests {
    @test
    public renderFooter_headerPresent() {
        // Arrange
        const footer = ApeTagFooter.fromData(_sampleData);
        footer.flags = ApeTagFooterFlags.HeaderPresent;

        // Act
        const output = footer.renderFooter();

        // Assert
        const expected = ByteVector.concatenate(
            ByteVector.fromString("APETAGEX", StringType.Latin1), // File Identifier
            ByteVector.fromUInt(2000, false), // Version
            ByteVector.fromUInt(2345, false), // Tag Size
            ByteVector.fromUInt(3456, false), // Item count
            ByteVector.fromUInt(ApeTagFooterFlags.HeaderPresent, false), // Flags
            ByteVector.fromSize(8)
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public renderFooter_headerNotPresent() {
        // Arrange
        const footer = ApeTagFooter.fromData(_sampleData);
        footer.flags = 0;

        // Act
        const output = footer.renderFooter();

        // Assert
        const expected = ByteVector.concatenate(
            ByteVector.fromString("APETAGEX", StringType.Latin1), // File Identifier
            ByteVector.fromUInt(2000, false), // Version
            ByteVector.fromUInt(2345, false), // Tag Size
            ByteVector.fromUInt(3456, false), // Item count
            ByteVector.fromUInt(0, false), // Flags
            ByteVector.fromSize(8)
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public renderFooter_isHeader() {
        // Arrange
        const footer = ApeTagFooter.fromData(_sampleData);

        // Act
        const output = footer.renderFooter();

        // Assert
        const expected = ByteVector.concatenate(
            ByteVector.fromString("APETAGEX", StringType.Latin1), // File Identifier
            ByteVector.fromUInt(2000, false), // Version
            ByteVector.fromUInt(2345, false), // Tag Size
            ByteVector.fromUInt(3456, false), // Item count
            ByteVector.fromUInt(0, false), // Flags
            ByteVector.fromSize(8)
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public renderHeader_headerPresentIsNotHeader() {
        // Arrange
        const footer = ApeTagFooter.fromData(_sampleData);
        footer.flags = ApeTagFooterFlags.HeaderPresent;

        // Act
        const output = footer.renderHeader();

        // Assert
        const expectedFlags = (ApeTagFooterFlags.HeaderPresent | ApeTagFooterFlags.IsHeader) >>> 0;
        const expected = ByteVector.concatenate(
            ByteVector.fromString("APETAGEX", StringType.Latin1), // File Identifier
            ByteVector.fromUInt(2000, false), // Version
            ByteVector.fromUInt(2345, false), // Tag Size
            ByteVector.fromUInt(3456, false), // Item count
            ByteVector.fromUInt(expectedFlags, false), // Flags
            ByteVector.fromSize(8)
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public renderHeader_headerNotPresent() {
        // Arrange
        const footer = ApeTagFooter.fromData(_sampleData);
        footer.flags = 0;

        // Act
        const output = footer.renderHeader();

        // Assert
        assert.isTrue(ByteVector.equal(output, ByteVector.empty()));
    }

    @test
    public renderHeader_headerPresentIsHeader() {
        // Arrange
        const footer = ApeTagFooter.fromData(_sampleData);
        footer.flags = (ApeTagFooterFlags.HeaderPresent | ApeTagFooterFlags.IsHeader) >>> 0;

        // Act
        const output = footer.renderHeader();

        // Assert
        const expectedFlags = (ApeTagFooterFlags.HeaderPresent | ApeTagFooterFlags.IsHeader) >>> 0;
        const expected = ByteVector.concatenate(
            ByteVector.fromString("APETAGEX", StringType.Latin1), // File Identifier
            ByteVector.fromUInt(2000, false), // Version
            ByteVector.fromUInt(2345, false), // Tag Size
            ByteVector.fromUInt(3456, false), // Item count
            ByteVector.fromUInt(expectedFlags, false), // Flags
            ByteVector.fromSize(8)
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }
}
