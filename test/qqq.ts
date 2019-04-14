import * as chai from "chai";
import {suite, test, slow, timeout} from "mocha-typescript";

import {ByteVector} from "../src/byteVector";

const assert = chai.assert;
@suite(timeout(3000), slow(1000)) class Test {
    @test
    public fromByteArray_noData() {
        // Arrange, Act, Assert
        assert.throws(() => { ByteVector.fromByteArray(undefined); });
        assert.throws(() => { ByteVector.fromByteArray(null); });
    }

    @test
    public fromByteArray_emptyData() {
        // Arrange, Act
        const data = new Uint8Array();
        const bv = ByteVector.fromByteArray(data);

        // Assert
        assert.isOk(bv);
        assert.strictEqual(bv.length, 0);
        assert.isFalse(bv.isEmpty);
        assert.isFalse(bv.isReadOnly);
        assert.equal(bv.data, data);
    }
}
