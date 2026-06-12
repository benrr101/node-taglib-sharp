import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import UrlLinkFrame from "../../src/id3v2/frames/urlLinkFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

@suite class Id3v2_UrlLinkFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return UrlLinkFrame.fromFieldBytes;
    }

    @test
    public fromIdentity_falsyIdentity() {
        // Act/Assert
        Testers.testTruthy((v: FrameIdentifier) => { UrlLinkFrame.fromIdentity(v); });
    }

    @test
    public fromIdentity_validIdentity() {
        // Act
        const output = UrlLinkFrame.fromIdentity(FrameIdentifiers.WCOM);

        // Assert
        assert.ok(output);
        assert.strictEqual(output.frameClassType, FrameClassType.UrlLinkFrame);
        assert.strictEqual(output.frameId, FrameIdentifiers.WCOM);
        assert.strictEqual(output.text, undefined);
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
        assert.ok(output);
        assert.strictEqual(output.frameClassType, FrameClassType.UrlLinkFrame);
        assert.strictEqual(output.frameId, FrameIdentifiers.WCOM);
        assert.strictEqual(output.text, "foo");
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
        this.assertFrame(output, "foo");
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
        this.assertFrame(output, "foo");
    }

    private assertFrame(frame: UrlLinkFrame, text: string) {
        assert.ok(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UrlLinkFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.WCOM);
        assert.strictEqual(frame.text, text);
    }
}

@suite class Id3v2_UrlLinkFrame_PropertyTests {
    @params(undefined, "undefined")
    @params(null, "null")
    @params("", "empty_string")
    @params("bar", "truthy")
    public setText_falsyValues(value: string) {
        // Arrange
        const frame = UrlLinkFrame.fromIdentity(FrameIdentifiers.WCOM);

        // Act
        frame.text = value;

        // Assert
        assert.strictEqual(frame.text, value);
    }
}

@suite class Id3v2_UrlLinkFrame_MethodTests {
    @test
    public findUrlLinkFrame_falsyFrames_throws(): void {
        // Act/Assert
        Testers.testTruthy((v: UrlLinkFrame[]) => { UrlLinkFrame.findUrlLinkFrame(v, FrameIdentifiers.WCOM); });
    }

    @test
    public findUrlLinkFrame_falsyIdentity_throws(): void {
        // Arrange
        const frames = [UrlLinkFrame.fromIdentity(FrameIdentifiers.WCOM)];

        // Act/Assert
        Testers.testTruthy((v: FrameIdentifier) => { UrlLinkFrame.findUrlLinkFrame(frames, v); });
    }

    @test
    public findUrlLinkFrame_emptyFrames_returnsUndefined() {
        // Arrange
        const frames: UrlLinkFrame[] = [];

        // Act
        const result = UrlLinkFrame.findUrlLinkFrame(frames, FrameIdentifiers.WCOM);

        // Assert
        assert.isUndefined(result);
    }

    @test
    public findUrlLinkFrame_noMatch_returnsUndefined() {
        // Arrange
        const frames = [
            UrlLinkFrame.fromIdentity(FrameIdentifiers.WCOM),
            UrlLinkFrame.fromIdentity(FrameIdentifiers.WCOP)
        ];

        // Act
        const result = UrlLinkFrame.findUrlLinkFrame(frames, FrameIdentifiers.WPAY);

        // Assert
        assert.isUndefined(result);
    }

    @test
    public findUrlLinkFrame_match_returnsFirstMatch() {
        // Arrange
        const frame1 = UrlLinkFrame.fromIdentity(FrameIdentifiers.WCOM);
        const frame2 = UrlLinkFrame.fromIdentity(FrameIdentifiers.WCOM);
        const frames = [frame1, frame2];

        // Act
        const result = UrlLinkFrame.findUrlLinkFrame(frames, FrameIdentifiers.WCOM);

        // Assert
        assert.equal(result, frame1);
    }

    @test
    public clone_returnsCloneUsingRawData() {
        // Arrange
        const frame = UrlLinkFrame.fromIdentity(FrameIdentifiers.WCOM);
        frame.text = "foo";

        // Act
        const result = frame.clone();

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.frameId, frame.frameId);
        assert.strictEqual(result.text, frame.text);
    }

    @test
    public render_withoutText() {
        // Arrange
        const frame = UrlLinkFrame.fromIdentity(FrameIdentifiers.WCOM);

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.length, 0);
    }

    @test
    public render_withText() {
        // Arrange
        const frame = UrlLinkFrame.fromIdentity(FrameIdentifiers.WCOM);
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
        const frame = UrlLinkFrame.fromIdentity(FrameIdentifiers.WCOM);
        frame.text = text;

        // Act
        const result = frame.toString();

        // Assert
        assert.strictEqual(result, text);
    }
}
