import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import MatroskaTag from "../../src/matroska/matroskaTag";
import MatroskaTagValue from "../../src/matroska/matroskaTagValue";
import {MatroskaTagTarget} from "../../src/matroska/matroskaTagTarget";
import {Testers} from "../utilities/testers";

@suite
class Matroska_TagTests {
    @test
    public constructor_invalidParams() {
        // Arrange
        const mockValue = Mock.ofType<MatroskaTagValue>();
        const mockTarget = Mock.ofType<MatroskaTagTarget>();

        // Act / Assert
        Testers.testTruthy<MatroskaTagValue>((v) => new MatroskaTag(v, mockTarget.object));
        Testers.testTruthy<MatroskaTagTarget>((v) => new MatroskaTag(mockValue.object, v));
    }

    @test
    public constructor_valid() {
        // Arrange
        const mockValue = Mock.ofType<MatroskaTagValue>();
        const mockTarget = Mock.ofType<MatroskaTagTarget>();

        // Act
        const tag = new MatroskaTag(mockValue.object, mockTarget.object);

        // Assert
        assert.strictEqual(tag.value, mockValue.object);
        assert.strictEqual(tag.target, mockTarget.object);
    }
}
