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
    const frameData = getTestFrameData();
    return UrlLinkFrame.fromRawData(frameData, 4);
};

@suite class Id3v2_UrlLinkFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return UrlLinkFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return UrlLinkFrame.fromRawData;
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
        Id3v2_UrlLinkFrame_ConstructorTests.assertFrame(output, FrameIdentifiers.WCOM, [], StringType.Latin1);
    }

    @test
    public fromOffsetRawData_notUserFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WCOM);
        header.frameSize = TestConstants.syncedUint;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            ByteVector.fromString("foobar", StringType.Latin1),
            0x00, 0x00 // Some null bytes to trigger null cleanup
        );

        // Act
        const output = UrlLinkFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        Id3v2_UrlLinkFrame_ConstructorTests.assertFrame(output, FrameIdentifiers.WCOM, ["foobar"], StringType.Latin1);
    }

    @test
    public fromOffsetRawData_userFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX);
        header.frameSize = 12;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.UTF16BE,
            ByteVector.fromString("foo", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("bar", StringType.Latin1)
        );

        // Act
        const output = UrlLinkFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        Id3v2_UrlLinkFrame_ConstructorTests.assertFrame(
            output,
            FrameIdentifiers.WXXX,
            ["foo", "bar"],
            StringType.Latin1
        );
    }

    @test
    public fromRawData_notUserFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WCOM);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("foobar", StringType.Latin1),    // - Data
            0x00, 0x00                                             // - null bytes to test end byte
                                                                   //   cleanup
        );

        // Act
        const output = UrlLinkFrame.fromRawData(data, 4);

        // Assert
        Id3v2_UrlLinkFrame_ConstructorTests.assertFrame(output, FrameIdentifiers.WCOM, ["foobar"], StringType.Latin1);
    }

    @test
    public fromRawData_userFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WXXX);
        header.frameSize = 12;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("foo", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("bar", StringType.Latin1)
        );

        // Act
        const output = UrlLinkFrame.fromRawData(data, 4);

        // Assert
        Id3v2_UrlLinkFrame_ConstructorTests.assertFrame(
            output,
            FrameIdentifiers.WXXX,
            ["foo", "bar"],
            StringType.Latin1
        );
    }

    private static assertFrame(frame: UrlLinkFrame, ft: FrameIdentifier, t: string[], te: StringType) {
        assert.ok(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UrlLinkFrame);
        assert.strictEqual(frame.frameId, ft);

        assert.deepEqual(frame.text, t);
        assert.equal(frame.textEncoding, te);
    }
}

@suite class Id3v2_UrlLinkFrame_PropertyTests {
    @test
    public getText_outputIsClone() {
        // Arrange
        const frame = getTestUrlLinkFrame();

        // Act
        const text = frame.text;
        text.push("baz");

        // Assert
        assert.deepEqual(frame.text, ["foo", "bar"]);
    }

    @test
    public setText_falsyValues() {
        // Arrange
        const frame = getTestUrlLinkFrame();
        const set = (v: string[]) => { frame.text = v; };
        const get = () => frame.text;

        // Act / Assert
        PropertyTests.propertyNormalized(set, get, undefined, []);
        PropertyTests.propertyNormalized(set, get, null, []);
    }

    @test
    public setText_values() {
        // Arrange
        const frame = getTestUrlLinkFrame();
        const values = ["fux", "qux"];

        // Act
        frame.text = values;

        // Assert
        assert.deepEqual(frame.text, values);

        // -- Ensure values are cloned
        // Act 2
        values.push("bux");

        // Assert 2
        assert.deepEqual(frame.text, ["fux", "qux"]);
    }

    @test
    public setEncoding() {
        // Arrange
        const frame = getTestUrlLinkFrame();

        // Act
        frame.textEncoding = StringType.UTF8;

        // Assert
        assert.equal(frame.textEncoding, StringType.UTF8);
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
        assert.deepEqual(result.text, frame.text);
        assert.deepEqual(result.textEncoding, frame.textEncoding);
    }

    @test
    public clone_withoutRawData_returnsClone() {
        // Arrange
        const frame = getTestUrlLinkFrame();
        const _ = frame.text;    // Force reading raw data, and trashing it

        // Act
        const result = frame.clone();

        // Assert
        assert.isOk(result);
        assert.strictEqual(result.frameId, frame.frameId);
        assert.deepEqual(result.text, frame.text);
        assert.deepEqual(result.textEncoding, frame.textEncoding);
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
