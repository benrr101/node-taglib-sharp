import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameConstructorTests from "./frameConstructorTests";
import FrameTypes from "../../src/id3v2/frameTypes";
import TestConstants from "../testConstants";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {UrlLinkFrame} from "../../src/id3v2/frames/urlLinkFrame";
import FramePropertyTests from "./framePropertyTests";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

const getTestFrameData = (): ByteVector => {
    const header = new Id3v2FrameHeader(FrameTypes.WCOM, 4);
    header.frameSize = 7;

    return ByteVector.concatenate(
        header.render(4),
        ByteVector.fromString("foo", StringType.Latin1, undefined, true),
        ByteVector.getTextDelimiter(StringType.Latin1),
        ByteVector.fromString("bar", StringType.Latin1, undefined, true)
    );
};

const getTestUrlLinkFrame = (): UrlLinkFrame => {
    const frameData = getTestFrameData();
    return UrlLinkFrame.fromRawData(frameData, 4);
};

@suite(timeout(3000), slow(1000))
class Id3v2_UrlLinkFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader) => Frame {
        return UrlLinkFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return UrlLinkFrame.fromRawData;
    }

    @test
    public fromIdentity_falsyIdentity() {
        // Act/Assert
        assert.throws(() => { UrlLinkFrame.fromIdentity(null); });
        assert.throws(() => { UrlLinkFrame.fromIdentity(undefined); });
    }

    @test
    public fromIdentity_validIdentity() {
        // Act
        const output = UrlLinkFrame.fromIdentity(FrameTypes.WCOM);

        // Assert
        this.assertFrame(output, FrameTypes.WCOM, [], StringType.Latin1);
    }

    @test
    public fromOffsetRawData_notUserFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WCOM, 4);
        header.frameSize = TestConstants.syncedUint;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            ByteVector.fromString("foobar", StringType.Latin1, undefined, true),
            0x00, 0x00 // Some null bytes to trigger null cleanup
        );

        // Act
        const output = UrlLinkFrame.fromOffsetRawData(data, 2, header);

        // Assert
        this.assertFrame(output, FrameTypes.WCOM, ["foobar"], StringType.Latin1);
    }

    @test
    public fromOffsetRawData_userFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WXXX, 4);
        header.frameSize = 7;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            ByteVector.fromString("foo", StringType.Latin1, undefined, true),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar", StringType.Latin1, undefined, true)
        );

        // Act
        const output = UrlLinkFrame.fromOffsetRawData(data, 2, header);

        // Assert
        this.assertFrame(output, FrameTypes.WXXX, ["foo", "bar"], StringType.Latin1);
    }

    @test
    public fromRawData_notUserFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WCOM, 4);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("foobar", StringType.Latin1, undefined, true),    // - Data
            0x00, 0x00                                                              // - null bytes to test end byte
                                                                                    //   cleanup
        );

        // Act
        const output = UrlLinkFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(output, FrameTypes.WCOM, ["foobar"], StringType.Latin1);
    }

    @test
    public fromRawData_userFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WXXX, 4);
        header.frameSize = 7;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("foo", StringType.Latin1, undefined, true),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar", StringType.Latin1, undefined, true)
        );

        // Act
        const output = UrlLinkFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(output, FrameTypes.WXXX, ["foo", "bar"], StringType.Latin1);
    }

    private assertFrame(frame: UrlLinkFrame, ft: ByteVector, t: string[], te: StringType) {
        assert.ok(frame);
        assert.equal(frame.frameClassType, FrameClassType.UrlLinkFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, ft));

        assert.deepEqual(frame.text, t);
        assert.equal(frame.textEncoding, te);
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_UrlLinkFrame_PropertyTests {
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
        FramePropertyTests.propertyNormalized(set, get, undefined, []);
        FramePropertyTests.propertyNormalized(set, get, null, []);
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

@suite(timeout(3000), slow(1000))
class Id3v2_UrlLinkFrame_MethodTests {
    @test
    public findUrlLinkFrame_falsyFrames_throws(): void {
        // Act/Assert
        assert.throws(() => { UrlLinkFrame.findUrlLinkFrame(null, FrameTypes.WCOM); });
        assert.throws(() => { UrlLinkFrame.findUrlLinkFrame(undefined, FrameTypes.WCOM); });
    }

    @test
    public findUrlLinkFrame_falsyIdentity_throws(): void {
        // Arrange
        const frames = [getTestUrlLinkFrame()];

        // Act/Assert
        assert.throws(() => { UrlLinkFrame.findUrlLinkFrame(frames, null); });
        assert.throws(() => { UrlLinkFrame.findUrlLinkFrame(frames, undefined); });
    }

    @test
    public findUrlLinkFrame_invalidIdentity_throws() {
        // Arrange
        const frames = [getTestUrlLinkFrame()];

        // Act/Assert
        assert.throws(() => { UrlLinkFrame.findUrlLinkFrame(frames, ByteVector.empty()); });
        assert.throws(() => { UrlLinkFrame.findUrlLinkFrame(frames, ByteVector.fromSize(5)); });
    }

    @test
    public findUrlLinkFrame_emptyFrames_returnsUndefined() {
        // Arrange
        const frames: UrlLinkFrame[] = [];

        // Act
        const result = UrlLinkFrame.findUrlLinkFrame(frames, FrameTypes.WCOM);

        // Assert
        assert.isUndefined(result);
    }

    @test
    public findUrlLinkFrame_noMatch_returnsUndefined() {
        // Arrange
        const frames = [getTestUrlLinkFrame(), getTestUrlLinkFrame()]; // Type is WCOM

        // Act
        const result = UrlLinkFrame.findUrlLinkFrame(frames, FrameTypes.WXXX);

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
        const result = UrlLinkFrame.findUrlLinkFrame(frames, FrameTypes.WCOM);

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
        assert.isTrue(ByteVector.equal(result.frameId, frame.frameId));
        assert.deepEqual(result.text, frame.text);
        assert.deepEqual(result.textEncoding, frame.textEncoding);
    }

    @test
    public clone_withoutRawData_returnsClone() {
        // Arrange
        const frame = getTestUrlLinkFrame();
        const text = frame.text;    // Force reading raw data, and trashing it

        // Act
        const result = frame.clone();

        // Assert
        assert.isOk(result);
        assert.isTrue(ByteVector.equal(result.frameId, frame.frameId));
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
        assert.isTrue(ByteVector.equal(result, getTestFrameData()));
    }
}
