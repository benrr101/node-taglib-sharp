import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import PropertyTests from "../utilities/propertyTests";
import TestConstants from "../testConstants";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";
import {UrlLinkFrame} from "../../src/id3v2/frames/urlLinkFrame";

const getTestFrameData = (): ByteVector => {
    const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX);
    header.frameSize = 8;

    return ByteVector.concatenate(
        header.render(4),
        StringType.Latin1,
        ByteVector.fromString("foo", StringType.Latin1),
        ByteVector.getTextDelimiter(StringType.Latin1),
        ByteVector.fromString("bar", StringType.Latin1)
    );
};

const getTestUrlLinkFrame = (): UrlLinkFrame => {
    const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX);
    header.frameSize = 8;
    const frameData = getTestFrameData();
    return UrlLinkFrame.fromOffsetRawData(frameData, 0, header, 4);
};

@suite class Id3v2_UrlLinkFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return UrlLinkFrame.fromOffsetRawData;
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
        Id3v2_UrlLinkFrame_ConstructorTests.assertFrame(output, FrameIdentifiers.WCOM, undefined);
    }

    @test
    public fromOffsetRawData_notUserFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WCOM);
        header.frameSize = TestConstants.syncedUint;
        const data = ByteVector.concatenate(
            0x00, 0x00,
            header.render(4),
            ByteVector.fromString("foobar", StringType.Latin1),
            0x00, 0x00 // Some null bytes to trigger null cleanup
        );

        // Act
        const output = UrlLinkFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        Id3v2_UrlLinkFrame_ConstructorTests.assertFrame(output, FrameIdentifiers.WCOM, "foobar");
    }

    private static assertFrame(frame: UrlLinkFrame, ft: FrameIdentifier, t: string) {
        assert.ok(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UrlLinkFrame);
        assert.strictEqual(frame.frameId, ft);
        assert.strictEqual(frame.text, t);
    }
}

@suite class Id3v2_UrlLinkFrame_PropertyTests {
    @test
    public setText_falsyValues() {
        // Arrange
        const frame = getTestUrlLinkFrame();
        const set = (v: string) => { frame.text = v; };
        const get = () => frame.text;

        // Act / Assert
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public setText_values() {
        // Arrange
        const frame = getTestUrlLinkFrame();

        // Act
        frame.text = "fux";

        // Assert
        assert.strictEqual(frame.text, "fux");
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
        const frames = [getTestUrlLinkFrame()];

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
        const frames = [getTestUrlLinkFrame(), getTestUrlLinkFrame()]; // Type is WXXX

        // Act
        const result = UrlLinkFrame.findUrlLinkFrame(frames, FrameIdentifiers.WCOM);

        // Assert
        assert.isUndefined(result);
    }

    @test
    public findUrlLinkFrame_match_returnsFirstMatch() {
        // Arrange
        const frame1 = getTestUrlLinkFrame();
        const frame2 = getTestUrlLinkFrame();
        const frames = [frame1, frame2];

        // Act
        const result = UrlLinkFrame.findUrlLinkFrame(frames, FrameIdentifiers.WXXX);

        // Assert
        assert.equal(result, frame1);
    }

    @test
    public clone_withRawData_returnsCloneUsingRawData() {
        // Arrange
        const frame = getTestUrlLinkFrame();

        // Act
        const result = frame.clone();

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.frameId, frame.frameId);
        assert.strictEqual(result.text, frame.text);
    }

    @test
    public clone_withoutRawData_returnsClone() {
        // Arrange
        const frame = getTestUrlLinkFrame();
        // noinspection JSUnusedLocalSymbols Forces a read of the raw data
        const _ = frame.text;

        // Act
        const result = frame.clone();

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.frameId, frame.frameId);
        assert.strictEqual(result.text, frame.text);
    }

    @test
    public render_returnsByteVector() {
        // Arrange
        const frame = getTestUrlLinkFrame();

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);
        Testers.bvEqual(result, getTestFrameData());
    }
}
