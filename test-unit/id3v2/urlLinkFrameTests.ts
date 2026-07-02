import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import UrlLinkFrame from "../../src/id3v2/frames/urlLinkFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const assertFrame = (frame: UrlLinkFrame, identifier: FrameIdentifier, text: string|undefined) => {
    assert.ok(frame);
    assert.instanceOf<UrlLinkFrame>(frame, UrlLinkFrame);
    assert.strictEqual(frame.frameId, identifier);
    assert.strictEqual(frame.text, text);
}

@suite class Id3v2_UrlLinkFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return UrlLinkFrame.fromFieldBytes;
    }

    @test
    public fromIdentifier_falsyIdentity() {
        // Act/Assert
        Testers.testTruthy((v: FrameIdentifier) => { UrlLinkFrame.fromIdentifier(v); });
    }

    @test
    public fromIdentifier_validIdentity() {
        // Act
        const output = UrlLinkFrame.fromIdentifier(FrameIdentifiers.WCOM);

        // Assert
        assertFrame(output, FrameIdentifiers.WCOM, undefined);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_itsGood(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromString("foo", StringType.Latin1);
        const header = new Id3v2FrameHeader(FrameIdentifiers.WCOM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const output = UrlLinkFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(output, FrameIdentifiers.WCOM, "foo");
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_trailingNullBytes(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foo", StringType.Latin1),
            0x00, 0x00
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.WCOM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const output = UrlLinkFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(output, FrameIdentifiers.WCOM, "foo");
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_multipleFields(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foo", StringType.Latin1),
            0x00,
            ByteVector.fromString("bar", StringType.Latin1),
            0x00, 0x00
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.WCOM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const output = UrlLinkFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(output, FrameIdentifiers.WCOM, "foo");
    }
}

@suite class Id3v2_UrlLinkFrame_PropertyTests {
    @params(undefined, "undefined")
    @params(null, "null")
    @params("", "empty_string")
    @params("bar", "truthy")
    public setText_falsyValues(value: string) {
        // Arrange
        const frame = UrlLinkFrame.fromIdentifier(FrameIdentifiers.WCOM);

        // Act
        frame.text = value;

        // Assert
        assert.strictEqual(frame.text, value);
    }
}

@suite class Id3v2_UrlLinkFrame_MethodTests {
    @test
    public clone_returnsCloneUsingRawData() {
        // Arrange
        const frame = UrlLinkFrame.fromIdentifier(FrameIdentifiers.WCOM);
        frame.text = "foo";

        // Act
        const result = frame.clone();

        // Assert
        assertFrame(result, frame.frameId, frame.text);
    }

    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: UrlLinkFrame[]) => { UrlLinkFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noIdentifier_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = UrlLinkFrame.filterFrames(frames);

        // Assert
        assert.isArray(output);
        assert.isEmpty(output);
    }

    @test
    public filterFrames_noIdentifier_noMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(234));
        const frames = [frame1, frame2];

        // Act
        const result = UrlLinkFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_noIdentifier_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOP);
        const frames = [frame1, frame2];

        // Act
        const result = UrlLinkFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_noIdentifier_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOP);
        const frame3 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOP);

        const frames = [frame1, frame2, frame3];

        // Act
        const result = UrlLinkFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_noIdentifier_allMatches() {
        // Arrange
        const frame1 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOP);
        const frame2 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOP);
        const frames = [frame1, frame2];

        // Act
        const result = UrlLinkFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @test
    public filterFrames_withIdentifier_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = UrlLinkFrame.filterFrames(frames);

        // Assert
        assert.isArray(output);
        assert.isEmpty(output);
    }

    @test
    public filterFrames_withIdentifier_noMatch() {
        // Arrange
        const frame1 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOM);
        const frame2 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOM);
        const frames = [frame1, frame2];

        // Act
        const result = UrlLinkFrame.filterFrames(frames, FrameIdentifiers.TCOP);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_withIdentifier_singleMatch() {
        // Arrange
        const frame1 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOM);
        const frame2 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOP);
        const frames = [frame1, frame2];

        // Act
        const result = UrlLinkFrame.filterFrames(frames, FrameIdentifiers.TCOP);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_withIdentifier_multipleMatches() {
        // Arrange
        const frame1 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOM);
        const frame2 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOP);
        const frame3 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOP);

        const frames = [frame1, frame2, frame3];

        // Act
        const result = UrlLinkFrame.filterFrames(frames, FrameIdentifiers.TCOP);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_withIdentifier_allMatches() {
        // Arrange
        const frame1 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOP);
        const frame2 = UrlLinkFrame.fromIdentifier(FrameIdentifiers.TCOP);
        const frames = [frame1, frame2];

        // Act
        const result = UrlLinkFrame.filterFrames(frames, FrameIdentifiers.TCOP);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @test
    public render_withoutText() {
        // Arrange
        const frame = UrlLinkFrame.fromIdentifier(FrameIdentifiers.WCOM);

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.length, 0);
    }

    @test
    public render_withText() {
        // Arrange
        const frame = UrlLinkFrame.fromIdentifier(FrameIdentifiers.WCOM);
        frame.text = "foo";

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expectedBytes = ByteVector.concatenate(
            FrameIdentifiers.WCOM.render(4),
            ByteVector.fromUint(3),
            ByteVector.fromUshort(Id3v2FrameFlags.None),
            ByteVector.fromString("foo", StringType.Latin1)
        );
        Testers.bvEqual(result, expectedBytes);
    }

    @params("", "empty_string")
    @params("foo", "foo")
    public toString_returnsText(text: string) {
        // Arrange
        const frame = UrlLinkFrame.fromIdentifier(FrameIdentifiers.WCOM);
        frame.text = text;

        // Act
        const result = frame.toString();

        // Assert
        assert.strictEqual(result, text);
    }
}
