import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameFactory from "../../src/id3v2/frames/frameFactory";
import {ByteVector} from "../../src/byteVector";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(slow(1000), timeout(3000))
class FrameFactoryTests {
    @test
    public createFrame_invalidVersion()  {
        // Arrange
        const data = ByteVector.empty();

        // Act / Assert
        assert.throws(() => { FrameFactory.createFrame(data, undefined, 0, -1, false); });
        assert.throws(() => { FrameFactory.createFrame(data, undefined, 0, 1.23, false); });
        assert.throws(() => { FrameFactory.createFrame(data, undefined, 0, 0x100, false); });
    }
}
