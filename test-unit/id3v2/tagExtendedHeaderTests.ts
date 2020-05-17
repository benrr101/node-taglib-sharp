import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import Id3v2ExtendedHeader from "../../src/id3v2/id3v2ExtendedHeader";
import {ByteVector} from "../../src/byteVector";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class Id3v2_TagExtendedHeaderTests {
    @test
    public fromData_falsyData() {
        // Act/Assert
        assert.throws(() => { Id3v2ExtendedHeader.fromData(null, 2); });
        assert.throws(() => { Id3v2ExtendedHeader.fromData(undefined, 2); });
    }

    @test
    public fromData_invalidVersion() {
        // Arrange
        const testData = ByteVector.empty();

        // Act/Assert
        assert.throws(() => { Id3v2ExtendedHeader.fromData(testData, -1); });
        assert.throws(() => { Id3v2ExtendedHeader.fromData(testData, 1.5); });
        assert.throws(() => { Id3v2ExtendedHeader.fromData(testData, 0x100); });
    }

    @test
    public fromData_version3() {
        // Arrange
        const testData = ByteVector.concatenate(0x10, 0x10, 0x10, 0x10);

        // Act
        const output = Id3v2ExtendedHeader.fromData(testData, 3);

        // Assert
        assert.equal(output.size, 4 + 0x2040810);
    }

    @test
    public fromData_version2() {
        // Arrange
        const testData = ByteVector.concatenate(0x10, 0x10, 0x10, 0x10);

        // Act
        const output = Id3v2ExtendedHeader.fromData(testData, 2);

        // Assert
        assert.equal(output.size, 0x2040810);
    }

    @test
    public fromData_version4() {
        // Arrange
        const testData = ByteVector.concatenate(0x10, 0x10, 0x10, 0x10);

        // Act
        const output = Id3v2ExtendedHeader.fromData(testData, 4);

        // Assert
        assert.equal(output.size, 0x2040810);
    }

    public fromEmpty() {
        // Act
        const output = Id3v2ExtendedHeader.fromEmpty();

        // Assert
        assert.equal(output.size, 0);
    }
}
