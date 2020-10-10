import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {suite, test} from "mocha-typescript";

import PropertyTests from "../utilities/propertyTests";
import {ApeTagFooter, ApeTagFooterFlags} from "../../src/ape/apeTagFooter";
import {ByteVector, StringType} from "../../src/byteVector";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

const _sampleData = ByteVector.concatenate(
    ByteVector.fromString("APETAGEX", StringType.Latin1), // File Identifier
    ByteVector.fromUInt(1234, false), // Version
    ByteVector.fromUInt(2345, false), // Tag Size
    ByteVector.fromUInt(3456, false), // Item count
    ByteVector.fromUInt(ApeTagFooterFlags.IsHeader, false), // Flags
    ByteVector.fromSize(12)
);

@suite class ApeTagFooter_ConstructorTests {
    @test
    public constructor_invalidParameters() {
        // Act / Assert
        assert.throws(() => { const _ = new ApeTagFooter(undefined); });
        assert.throws(() => { const _ = new ApeTagFooter(null); });
        assert.throws(() => { const _ = new ApeTagFooter(ByteVector.fromSize(10)); });
        assert.throws(() => { const _ = new ApeTagFooter(ByteVector.fromSize(40)); });
    }

    @test
    public constructor_isHeaderVersionSet() {
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
        const footer = new ApeTagFooter(data);

        // Assert
        assert.strictEqual(footer.completeTagSize, 2345);
        assert.strictEqual(footer.flags, ApeTagFooterFlags.IsHeader);
        assert.strictEqual(footer.itemCount, 3456);
        assert.strictEqual(footer.tagSize, 2345);
        assert.strictEqual(footer.version, 1234);
    }

    @test
    public constructor_headerPresentVersionNotSet() {
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
        const footer = new ApeTagFooter(data);

        // Assert
        assert.strictEqual(footer.completeTagSize, 2377);
        assert.strictEqual(footer.flags, ApeTagFooterFlags.HeaderPresent);
        assert.strictEqual(footer.itemCount, 3456);
        assert.strictEqual(footer.tagSize, 2345);
        assert.strictEqual(footer.version, 2000);
    }
}

@suite class ApeTagFooter_PropertyTests {
    @test
    public setItemCount_valid() {
        // Arrange
        const footer = new ApeTagFooter(_sampleData);

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v: number) => { footer.itemCount = v },
            () => footer.itemCount,
            8086
        );
    }

    @test
    public setItemCount_invalid() {
        // Arrange
        const footer = new ApeTagFooter(_sampleData);
        const setItemCount = (v: number) => { footer.itemCount = v; };

        // Act / Assert
        PropertyTests.propertyThrows(setItemCount, -1);
        PropertyTests.propertyThrows(setItemCount, 1.23);
        PropertyTests.propertyThrows(setItemCount, Number.MAX_SAFE_INTEGER + 1);
    }

    @test
    public setFlags() {
        // Arrange
        const footer = new ApeTagFooter(_sampleData);

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { footer.flags = v; },
            () => footer.flags,
            ApeTagFooterFlags.FooterAbsent);
    }

    @test
    public setTagSize_valid() {
        // Arrange
        const footer = new ApeTagFooter(_sampleData);

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { footer.flags = v; },
            () => footer.flags,
            8086
        );
    }

    @test
    public setTagSize_invalid() {
        // Arrange
        const footer = new ApeTagFooter(_sampleData);
        const setTagSize = (v: number) => { footer.tagSize = v; };

        // Act / Assert
        PropertyTests.propertyThrows(setTagSize, -1);
        PropertyTests.propertyThrows(setTagSize, 1.23);
        PropertyTests.propertyThrows(setTagSize, Number.MAX_SAFE_INTEGER + 1);
    }
}

@suite class ApeTagFooter_MethodTests {
    @test
    public renderFooter_headerPresent() {
        // Arrange
        const footer = new ApeTagFooter(_sampleData);
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
        const footer = new ApeTagFooter(_sampleData);
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
        const footer = new ApeTagFooter(_sampleData);

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
    public renderHeader_headerPresentisNotHeader() {
        // Arrange
        const footer = new ApeTagFooter(_sampleData);
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
        const footer = new ApeTagFooter(_sampleData);
        footer.flags = 0;

        // Act
        const output = footer.renderHeader();

        // Assert
        assert.isTrue(ByteVector.equal(output, ByteVector.empty()));
    }

    @test
    public renderHeader_headerPresentisHeader() {
        // Arrange
        const footer = new ApeTagFooter(_sampleData);
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
