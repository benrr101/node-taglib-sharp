import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import VbriHeader from "../../src/mpeg/vbriHeader";
import {ByteVector} from "../../src/byteVector";
import {Testers} from "../utilities/testers";

@suite class Mpeg_XingHeaderTests {
    @test
    public fromInfo_invalidParameters() {
        // Act / Assert
        Testers.testUint((v: number) => { VbriHeader.fromInfo(v, 123); });
        Testers.testUint((v: number) => { VbriHeader.fromInfo(123, v); });
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
            ByteVector.fromUint(123),
            ByteVector.fromUint(234)
        );

        // Act
        const header = VbriHeader.fromData(data);

        // Assert
        assert.strictEqual(header.totalFrames, 234);
        assert.strictEqual(header.totalSize, 123);
        assert.isTrue(header.isPresent);
    }
}

