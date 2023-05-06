import { suite, test } from "@testdeck/mocha";
import { assert } from "chai";
import { ByteVector } from "../../src/byteVector";
import Mpeg4BoxHeader from "../../src/mpeg4/mpeg4BoxHeader";
import Mpeg4Utils from "../../src/mpeg4/mpeg4Utils";

@suite
class Mpeg4_Mpeg4UtilsTests {
    @test
    public fixId_withIdLengthOf4_returnsUnmodifiedId() {
        // Arrange
        const testByteVector = ByteVector.fromByteArray(new Uint8Array([0x0, 0x1, 0x2, 0x3]));

        // Act/Assert
        assert.strictEqual(Mpeg4Utils.fixId(testByteVector), testByteVector);
    }

    @test
    public fixId_withIdLengthOf3_returnsFixedId() {
        // Arrange
        const testByteVector = ByteVector.fromByteArray(new Uint8Array([0x0, 0x1, 0x2]));
        const expectedByteVector = ByteVector.fromByteArray(new Uint8Array([0xa9, 0x0, 0x1, 0x2]));

        // Act/Assert
        assert.deepEqual(Mpeg4Utils.fixId(testByteVector), expectedByteVector);
    }

    @test
    public fixId_withIdLengthDifferentFrom3And4_returnsUndefined() {
        // Arrange
        const testByteVector = ByteVector.fromByteArray(new Uint8Array([0x0, 0x1]));

        // Act/Assert
        assert.isUndefined(Mpeg4Utils.fixId(testByteVector));
    }

    @test
    public addParent_withParentsNull_returnsListContainingOnlyCurrent() {
        // Arrange
        const current: Mpeg4BoxHeader = Mpeg4BoxHeader.fromEmpty();

        // Act
        const headers: Mpeg4BoxHeader[] = Mpeg4Utils.addParent(null, current);

        // Assert
        assert.equal(headers.length, 1);
        assert.equal(headers[0], current);
    }

    @test
    public addParent_withParentsUndefined_returnsListContainingOnlyCurrent() {
        // Arrange
        const current: Mpeg4BoxHeader = Mpeg4BoxHeader.fromEmpty();

        // Act
        const headers: Mpeg4BoxHeader[] = Mpeg4Utils.addParent(undefined, current);

        // Assert
        assert.equal(headers.length, 1);
        assert.equal(headers[0], current);
    }

    @test
    public addParent_withParentsHaving2Elements_returnsListContainingParentsFollowedByCurrent() {
        // Arrange
        const parent1: Mpeg4BoxHeader = Mpeg4BoxHeader.fromEmpty();
        const parent2: Mpeg4BoxHeader = Mpeg4BoxHeader.fromEmpty();
        const parents: Mpeg4BoxHeader[] = [parent1, parent2];
        const current: Mpeg4BoxHeader = Mpeg4BoxHeader.fromEmpty();

        // Act
        const headers: Mpeg4BoxHeader[] = Mpeg4Utils.addParent(parents, current);

        // Assert
        assert.equal(headers.length, 3);
        assert.equal(headers[0], parent1);
        assert.equal(headers[1], parent2);
        assert.equal(headers[2], current);
    }
}
