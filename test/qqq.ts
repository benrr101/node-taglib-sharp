import {suite, test, slow, timeout} from "mocha-typescript";
import {ByteVector} from "../src/byteVector";

@suite(timeout(3000), slow(1000)) class Test {
    @test
    public someTest() {
        const q = ByteVector.fromString("haha");

    }
}
