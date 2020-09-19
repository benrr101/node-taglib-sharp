import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {suite, test} from "mocha-typescript";

import VbriHeader from "../../src/mpeg/vbriHeader";
import {ByteVector} from "../../src/byteVector";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class MpegXingHeaderTests {
    @test
    public fromInfo_invalidParameters() {
        // Act / Assert
        assert.throws(() => { VbriHeader.fromInfo(-1, 123); });
        assert.throws(() => { VbriHeader.fromInfo(1.23, 123); });
        assert.throws(() => { VbriHeader.fromInfo(Number.MAX_SAFE_INTEGER + 1, 123); });
        assert.throws(() => { VbriHeader.fromInfo(123, -1); });
        assert.throws(() => { VbriHeader.fromInfo(123, 1.23); });
        assert.throws(() => { VbriHeader.fromInfo(123, Number.MAX_SAFE_INTEGER + 1); });
    }

    @test
    public fromInfo_validParams() {
        // Act
        const header = VbriHeader.fromInfo(123, 234);

        // Assert
        assert.isOk(header);
        assert.strictEqual(header.totalFrames, 123);
        assert.strictEqual(header.totalSize, 234);
        assert.isFalse(header.isPresent);
    }

    @test
    public fromData_invalidParameters() {
        // Act / Assert
        assert.throws(() => { VbriHeader.fromData(undefined); });
        assert.throws(() => { VbriHeader.fromData(null); });
    }

    @test
    public fromData_invalidVbriHeader() {
        // Arrange
        const data = ByteVector.fromSize(16);

        // Act / Assert
        assert.throws(() => { VbriHeader.fromData(data); });
    }

    @test
    public fromData_validParameters() {
        // Arrange
        const data = ByteVector.concatenate(
            VbriHeader.fileIdentifier,
            ByteVector.fromSize(6),
            ByteVector.fromUInt(123),
            ByteVector.fromUInt(234)
        );

        // Act
        const header = VbriHeader.fromData(data);

        // Assert
        assert.strictEqual(header.totalFrames, 234);
        assert.strictEqual(header.totalSize, 123);
        assert.isTrue(header.isPresent);
    }
}

