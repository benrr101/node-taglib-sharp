import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {suite, test} from "mocha-typescript";

import PropertyTests from "../utilities/propertyTests";
import {ApeTagFooter, ApeTagFooterFlags} from "../../src/ape/apeTagFooter";
import {ByteVector, StringType} from "../../src/byteVector";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class ApeTagFooterTests {
    private static _sampleData = ByteVector.concatenate(
        ByteVector.fromString("APETAGEX", StringType.Latin1), // File Identifier
        ByteVector.fromUInt(1234, false), // Version
        ByteVector.fromUInt(2345, false), // Tag Size
        ByteVector.fromUInt(3456, false), // Item count
        ByteVector.fromUInt(ApeTagFooterFlags.IsHeader, false), // Flags
        ByteVector.fromSize(12)
    );

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

    @test
    public setFlags() {
        // Arrange
        const footer = new ApeTagFooter(ApeTagFooterTests._sampleData);

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { footer.flags = v; },
            () => footer.flags,
            ApeTagFooterFlags.FooterAbsent);
    }

    @test
    public setTagSize_valid() {
        // Arrange
        const footer = new ApeTagFooter(ApeTagFooterTests._sampleData);

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { footer.tagSize = v; },
            () => footer.flags,
            8086
        );
    }

    public setTagSize_invalid() {
        // Arrange
        const footer = new ApeTagFooter(ApeTagFooterTests._sampleData);
        const setTagSize = (v: number) => { footer.tagSize = v; };

        // Act / Assert
        PropertyTests.propertyThrows(setTagSize, -1);
        PropertyTests.propertyThrows(setTagSize, 1.23);
        PropertyTests.propertyThrows(setTagSize, Number.MAX_SAFE_INTEGER);
    }
}
