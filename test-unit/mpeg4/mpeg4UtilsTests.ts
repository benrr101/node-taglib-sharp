import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Mpeg4BoxHeader from "../../src/mpeg4/mpeg4BoxHeader";
import Mpeg4Utils from "../../src/mpeg4/mpeg4Utils";
import {ByteVector, StringType} from "../../src/byteVector";

@suite
class Mpeg4_Mpeg4UtilsTests {
    @test
    public addParent_withParentsNull_returnsListContainingOnlyCurrent() {
        // Arrange
        const current: Mpeg4BoxHeader = Mpeg4BoxHeader.fromType(ByteVector.fromString("xxxx", StringType.Latin1));

        // Act
        const headers: Mpeg4BoxHeader[] = Mpeg4Utils.addParent(null, current);

        // Assert
        assert.equal(headers.length, 1);
        assert.equal(headers[0], current);
    }

    @test
    public addParent_withParentsUndefined_returnsListContainingOnlyCurrent() {
        // Arrange
        const current: Mpeg4BoxHeader = Mpeg4BoxHeader.fromType(ByteVector.fromString("xxxx", StringType.Latin1));

        // Act
        const headers: Mpeg4BoxHeader[] = Mpeg4Utils.addParent(undefined, current);

        // Assert
        assert.equal(headers.length, 1);
        assert.equal(headers[0], current);
    }

    @test
    public addParent_withParentsHaving2Elements_returnsListContainingParentsFollowedByCurrent() {
        // Arrange
        const parent1: Mpeg4BoxHeader = Mpeg4BoxHeader.fromType(ByteVector.fromString("xxxx", StringType.Latin1));
        const parent2: Mpeg4BoxHeader = Mpeg4BoxHeader.fromType(ByteVector.fromString("xxxx", StringType.Latin1));
        const parents: Mpeg4BoxHeader[] = [parent1, parent2];
        const current: Mpeg4BoxHeader = Mpeg4BoxHeader.fromType(ByteVector.fromString("xxxx", StringType.Latin1));

        // Act
        const headers: Mpeg4BoxHeader[] = Mpeg4Utils.addParent(parents, current);

        // Assert
        assert.equal(headers.length, 3);
        assert.equal(headers[0], parent1);
        assert.equal(headers[1], parent2);
        assert.equal(headers[2], current);
    }
}
