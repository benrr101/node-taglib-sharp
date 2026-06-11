import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

@suite class Id3v2_UnknownFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return UnknownFrame.fromFieldBytes;
    }

    @test
    public fromData_falsyType_throws() {
        // Act/Assert
        Testers.testTruthy((v: FrameIdentifier) => { UnknownFrame.fromData(v, undefined); });
    }

    @params(undefined, "undefined")
    @params(null, "null")
    public fromData_falsyData_frameHasNoData(value: ByteVector) {
        // Arrange
        const frameType = FrameIdentifiers.WXXX;

        // Act
        const frame = UnknownFrame.fromData(frameType, value);

        // Assert
        Id3v2_UnknownFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.WXXX, undefined);
    }

    @test
    public fromData_withData_frameHasData() {
        // Arrange
        const frameType = FrameIdentifiers.WXXX;
        const data = ByteVector.fromString("fux qux quxx", StringType.UTF8);

        // Act
        const frame = UnknownFrame.fromData(frameType, data);

        // Assert
        Id3v2_UnknownFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.WXXX, data);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_validParams_returnsFrame(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromString("foo bar baz", StringType.UTF8);
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnknownFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        Id3v2_UnknownFrame_ConstructorTests.assertFrame(
            frame,
            FrameIdentifiers.WXXX,
            ByteVector.fromString("foo bar baz", StringType.UTF8)
        );
    }

    private static assertFrame(frame: UnknownFrame, fi: FrameIdentifier, d: ByteVector) {
        assert.ok(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UnknownFrame);
        assert.strictEqual(frame.frameId, fi);

        if (d !== undefined) {
            Testers.bvEqual(frame.data, d);
        } else {
            assert.isUndefined(frame.data);
        }
    }
}

@suite class Id3v2_UnknownFrame_MethodTests {
    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public clone_returnsCopy(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromString("foo bar baz", StringType.UTF8);
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX, Id3v2FrameFlags.None, fieldBytes.length);
        const frame = UnknownFrame.fromFieldBytes(header, fieldBytes, version);

        // Act
        const result = <UnknownFrame> frame.clone();

        // Assert
        assert.ok(result);
        assert.strictEqual(result.frameClassType, FrameClassType.UnknownFrame);
        assert.strictEqual(result.frameId, FrameIdentifiers.WXXX);

        Testers.bvEqual(result.data, result.data);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_returnsByteVector(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromString("foo bar baz", StringType.UTF8);
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX, Id3v2FrameFlags.None, fieldBytes.length);
        const frame = UnknownFrame.fromFieldBytes(header, fieldBytes, version);

        // Act
        const result = frame.render(version);

        // Assert
        assert.ok(result);

        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(result, expected);
    }
}
