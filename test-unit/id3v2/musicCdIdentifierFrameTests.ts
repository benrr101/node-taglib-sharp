import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import MusicCdIdentifierFrame from "../../src/id3v2/frames/musicCdIdentifierFrame";
import PropertyTests from "../utilities/propertyTests";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

@suite class Id3v2_MusicCdIdentifierFrameTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return MusicCdIdentifierFrame.fromFieldBytes;
    }

    @params(undefined, "undefined")
    @params(null, "null")
    public fromData_falsyData_frameHasNoData(value: ByteVector) {
        // Act
        const frame = MusicCdIdentifierFrame.fromData(value);

        // Assert
        Id3v2_MusicCdIdentifierFrameTests.assertFrame(frame, value);
    }

    @test
    public fromData_withData_frameHasData() {
        // Arrange
        const data = ByteVector.fromString("fux qux quxx", StringType.UTF8);

        // Act
        const frame = MusicCdIdentifierFrame.fromData(data);

        // Assert
        Id3v2_MusicCdIdentifierFrameTests.assertFrame(frame, data);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_validParams(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromString("foo bar baz", StringType.UTF8);
        const header = new Id3v2FrameHeader(FrameIdentifiers.MCDI, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = MusicCdIdentifierFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        Id3v2_MusicCdIdentifierFrameTests.assertFrame(frame, ByteVector.fromString("foo bar baz", StringType.Latin1));
    }

    @params(undefined, "undefined")
    @params(null, "null")
    @params(ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04]), "truthy")
    public data(value: ByteVector|null|undefined) {
        // Arrange
        const frame = MusicCdIdentifierFrame.fromData(value);

        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => { frame.data = v; }, () => frame.data, value);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public clone_returnsCopy(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromString("foo bar baz", StringType.UTF8);
        const header = new Id3v2FrameHeader(FrameIdentifiers.MCDI, Id3v2FrameFlags.None, fieldBytes.length);
        const frame = MusicCdIdentifierFrame.fromFieldBytes(header, fieldBytes, version);

        // Act
        const result = frame.clone();

        // Assert
        assert.ok(result);
        assert.strictEqual(result.frameClassType, FrameClassType.MusicCdIdentifierFrame);
        assert.strictEqual(result.frameId, FrameIdentifiers.MCDI);

        Testers.bvEqual(result.data, fieldBytes);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_returnsByteVector(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromString("foo bar baz", StringType.UTF8);
        const header = new Id3v2FrameHeader(FrameIdentifiers.MCDI, Id3v2FrameFlags.None, fieldBytes.length);
        const frame = MusicCdIdentifierFrame.fromFieldBytes(header, fieldBytes, version);

        // Act
        const result = frame.render(version);

        // Assert
        assert.ok(result);

        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(result, expected);
    }

    private static assertFrame(frame: MusicCdIdentifierFrame, d: ByteVector) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.MusicCdIdentifierFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.MCDI);

        Testers.bvEqual(frame.data, d);
    }
}
