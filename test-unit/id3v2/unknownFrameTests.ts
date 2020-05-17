import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameConstructorTests from "./frameConstructorTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class Id3v2_UnknownFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return UnknownFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return UnknownFrame.fromRawData;
    }

    @test
    public fromData_falsyType_throws() {
        // Act/Assert
        assert.throws(() => { UnknownFrame.fromData(undefined, undefined); });
        assert.throws(() => { UnknownFrame.fromData(null, undefined); });
    }

    @test
    public fromData_undefinedData_frameHasNoData() {
        // Arrange
        const frameType = FrameIdentifiers.WXXX;

        // Act
        const frame = UnknownFrame.fromData(frameType, undefined);

        // Assert
        this.assertFrame(frame, FrameIdentifiers.WXXX, undefined);
    }

    @test
    public fromData_nullData_frameHasNoData() {
        // Arrange
        const frameType = FrameIdentifiers.WXXX;

        // Act
        const frame = UnknownFrame.fromData(frameType, null);

        // Assert
        this.assertFrame(frame, FrameIdentifiers.WXXX, undefined);
    }

    @test
    public fromData_withData_frameHasData() {
        // Arrange
        const frameType = FrameIdentifiers.WXXX;
        const data = ByteVector.fromString("fux qux quxx");

        // Act
        const frame = UnknownFrame.fromData(frameType, data);

        // Assert
        this.assertFrame(frame, FrameIdentifiers.WXXX, data);
    }

    @test
    public fromOffsetData_validParams_returnsFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),
            0x0, 0x0,
            ByteVector.fromString("foo bar baz")
        );

        // Act
        const frame = UnknownFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        this.assertFrame(frame, FrameIdentifiers.WXXX, ByteVector.fromString("foo bar baz"));
    }

    @test
    public fromRawData_validParams_returnsFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("foo bar baz")
        );

        // Act
        const frame = UnknownFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, FrameIdentifiers.WXXX, ByteVector.fromString("foo bar baz"));
    }

    private assertFrame(frame: UnknownFrame, fi: FrameIdentifier, d: ByteVector) {
        assert.ok(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UnknownFrame);
        assert.strictEqual(frame.frameId, fi);

        if (d !== undefined) {
            assert.isTrue(ByteVector.equal(frame.data, d));
        } else {
            assert.isUndefined(frame.data);
        }
    }
}

@suite class Id3v2_UnknownFrame_MethodTests {
    @test
    public clone_returnsCopy() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("foo bar baz")
        );
        const frame = UnknownFrame.fromRawData(data, 4);

        // Act
        const result = <UnknownFrame> frame.clone();

        // Assert
        assert.ok(result);
        assert.strictEqual(result.frameClassType, FrameClassType.UnknownFrame);
        assert.strictEqual(result.frameId, FrameIdentifiers.WXXX);

        assert.isTrue(ByteVector.equal(result.data, result.data));
    }

    @test
    public render_returnsByteVector() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX);
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
