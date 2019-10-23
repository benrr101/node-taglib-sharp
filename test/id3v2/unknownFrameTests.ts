import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameTypes from "../../src/id3v2/frameTypes";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector} from "../../src/byteVector";
import {FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class UnknownFrameConstructorsTests {
    @test
    public fromData_falsyType_throws() {
        // Act/Assert
        assert.throws(() => { UnknownFrame.fromData(undefined, undefined); });
        assert.throws(() => { UnknownFrame.fromData(null, undefined); });
    }

    @test
    public fromData_undefinedData_frameHasNoData() {
        // Arrange
        const frameType = FrameTypes.WXXX;

        // Act
        const result = UnknownFrame.fromData(frameType, undefined);

        // Assert
        assert.ok(result);
        assert.strictEqual(result.frameClassType, FrameClassType.UnknownFrame);
        assert.isTrue(ByteVector.equal(result.frameId, frameType));
        assert.isUndefined(result.data);
    }

    @test
    public fromData_nullData_frameHasNoData() {
        // Arrange
        const frameType = FrameTypes.WXXX;

        // Act
        const result = UnknownFrame.fromData(frameType, null);

        // Assert
        assert.ok(result);
        assert.strictEqual(result.frameClassType, FrameClassType.UnknownFrame);
        assert.isTrue(ByteVector.equal(result.frameId, frameType));
        assert.isUndefined(result.data);
    }

    @test
    public fromData_withData_frameHasData() {
        // Arrange
        const frameType = FrameTypes.WXXX;
        const data = ByteVector.fromString("fux qux quxx");

        // Act
        const result = UnknownFrame.fromData(frameType, data);

        // Assert
        assert.ok(result);
        assert.strictEqual(result.frameClassType, FrameClassType.UnknownFrame);
        assert.isTrue(ByteVector.equal(result.frameId, frameType));
        assert.isTrue(ByteVector.equal(result.data, data));
    }

    @test
    public fromOffsetRawData_falsyData_throws() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WXXX, 4);

        // Act/Assert
        assert.throws(() => { UnknownFrame.fromOffsetRawData(undefined, 1, header); });
        assert.throws(() => { UnknownFrame.fromOffsetRawData(null, 1, header); });
    }

    @test
    public fromOffsetRawData_invalidOffset_throws() {
        // Arrange
        const data = ByteVector.fromSize(0);
        const header = new Id3v2FrameHeader(FrameTypes.WXXX, 4);

        // Act/Assert
        assert.throws(() => { UnknownFrame.fromOffsetRawData(data, -1, header); });
        assert.throws(() => { UnknownFrame.fromOffsetRawData(data, 1.23, header); });
        assert.throws(() => { UnknownFrame.fromOffsetRawData(data, Number.MAX_SAFE_INTEGER + 1, header); });
    }

    @test
    public fromOffsetData_falsyHeader_throws() {
        // Arrange
        const data = ByteVector.fromSize(0);

        // Act/Assert
        assert.throws(() => { UnknownFrame.fromOffsetRawData(data, 1, undefined); });
        assert.throws(() => { UnknownFrame.fromOffsetRawData(data, 1, null); });
    }

    @test
    public fromOffsetData_validParams_returnsFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WXXX, 4);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),
            0x0, 0x0,
            ByteVector.fromString("foo bar baz")
        );

        // Act
        const frame = UnknownFrame.fromOffsetRawData(data, 2, header);

        // Assert
        assert.ok(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UnknownFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.WXXX));

        assert.isTrue(ByteVector.equal(frame.data, ByteVector.fromString("foo bar baz")));
    }

    @test
    public fromRawData_falsyData_throws() {
        // Act/Assert
        assert.throws(() => { UnknownFrame.fromRawData(null, 4); });
        assert.throws(() => { UnknownFrame.fromRawData(undefined, 4); });
    }

    @test
    public fromRawData_invalidVersion_throws() {
        // Arrange
        const data = ByteVector.empty();

        // Act/Assert
        assert.throws(() => { UnknownFrame.fromRawData(data, -1); });
        assert.throws(() => { UnknownFrame.fromRawData(data, 1.23); });
        assert.throws(() => { UnknownFrame.fromRawData(data, Number.MAX_SAFE_INTEGER + 1); });
    }

    @test
    public fromRawData_validParams_returnsFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WXXX, 4);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("foo bar baz")
        );

        // Act
        const frame = UnknownFrame.fromRawData(data, 4);

        // Assert
        assert.ok(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UnknownFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.WXXX));

        assert.isTrue(ByteVector.equal(frame.data, ByteVector.fromString("foo bar baz")));
    }
}

@suite(timeout(3000), slow(1000))
class UnknownFrameMethodTests {
    @test
    public clone_returnsCopy() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WXXX, 4);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("foo bar baz")
        );
        const frame = UnknownFrame.fromRawData(data, 4);

        // Act
        const result = <UnknownFrame> frame.clone();

        // Assert
        assert.ok(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UnknownFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.WXXX));

        assert.isTrue(ByteVector.equal(frame.data, result.data));
    }

    @test
    public render_returnsByteVector() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WXXX, 4);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("foo bar baz")
        );
        const frame = UnknownFrame.fromRawData(data, 4);

        // Act
        const result = frame.render(4);

        // Assert
        assert.ok(result);
        assert.isTrue(ByteVector.equal(data, result));
    }
}
