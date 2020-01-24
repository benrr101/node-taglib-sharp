import * as BigInt from "big-integer";
import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as StreamBuffers from "stream-buffers";
import {slow, suite, test, timeout} from "mocha-typescript";

import TestConstants from "./testConstants";
import {ByteVector, StringType} from "../src/byteVector";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class Picture_StaticMethodTests {
    public
}