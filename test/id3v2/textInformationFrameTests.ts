import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameConstructorTests from "./frameConstructorTests";
import FramePropertyTests from "./framePropertyTests";
import FrameTypes from "../../src/id3v2/frameTypes";
import Id3v2TagSettings from "../../src/id3v2/id3v2TagSettings";
import {TextInformationFrame} from "../../src/id3v2/frames/textInformationFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

function getTestFrame(): TextInformationFrame {
    const header = new Id3v2FrameHeader(FrameTypes.TCOP, 4);
    header.frameSize = 8;
    const data = ByteVector.concatenate(
        header.render(4),
        StringType.Latin1,
        ByteVector.fromString("foo", StringType.Latin1),
        ByteVector.getTextDelimiter(StringType.Latin1),
        ByteVector.fromString("bar", StringType.Latin1),
    );

    return TextInformationFrame.fromRawData(data, 4);
}

@suite(timeout(3000), slow(1000))
class Id3v2_TextInformationFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader) => Frame {
        return TextInformationFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return TextInformationFrame.fromRawData;
    }

    @test
    public fromIdentifier_noEncoding_returnsFrameWithDefaultEncoding() {
        // Act
        const frame = TextInformationFrame.fromIdentifier(FrameTypes.TCOP);

        // Assert
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.TextInformationFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.TCOP));

        assert.isOk(frame.text);
        assert.isArray(frame.text);
        assert.isEmpty(frame.text);
        assert.strictEqual(frame.textEncoding, Id3v2TagSettings.defaultEncoding);
    }

    @test
    public fromIdentifier_withEncoding_returnsFrameWithProvidedEncoding() {
        // Act
        const frame = TextInformationFrame.fromIdentifier(FrameTypes.TCOP, StringType.Latin1);

        // Assert
        this.assertFrame(frame, FrameTypes.TCOP, []);
    }

    @test
    public fromRawData_emptyFrameByLength_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.TCOP, 3);
        header.frameSize = 1;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.Latin1
        );

        // Act
        const frame = TextInformationFrame.fromRawData(data, 3);

        // Assert
        this.assertFrame(frame, FrameTypes.TCOP, []);
    }

    @test
    public fromRawData_emptyFrameByContents_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.TCOP, 3);
        header.frameSize = 3;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.Latin1,
            0x0, 0x0
        );

        // Act
        const frame = TextInformationFrame.fromRawData(data, 3);

        // Assert
        this.assertFrame(frame, FrameTypes.TCOP, []);
    }

    @test
    public fromRawData_v4NotTxxx_returnsFrameSplitByDelimiter() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.TCOP, 4);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bux", StringType.Latin1),
            0x0, 0x0,   // Extra nulls to trigger null stripping logic
        );

        // Act
        const frame = TextInformationFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, FrameTypes.TCOP, ["fux", "bux"]);
    }

    @test
    public fromRawData_txxx_returnsFrameSplitByDelimiter() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.TXXX, 3);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bux", StringType.Latin1),
            0x0, 0x0,   // Extra nulls to trigger null stripping logic
        );

        // Act
        const frame = TextInformationFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, FrameTypes.TXXX, ["fux", "bux"]);
    }

    @test
    public fromRawData_v3SplitType_returnsFrameSplitBySlash() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.TCOM, 3);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.Latin1,
            ByteVector.fromString("fux/bux", StringType.Latin1)
        );

        // Act
        const frame = TextInformationFrame.fromRawData(data, 3);

        // Assert
        this.assertFrame(frame, FrameTypes.TCOM, ["fux", "bux"]);
    }

    @test
    public fromRawData_v3Tcon_returnsListOfStrings() {
        // Arrange
        // - Let's get crazy and try to handle all the cases at once
        const header = new Id3v2FrameHeader(FrameTypes.TCON, 3);
        header.frameSize = 67;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.Latin1,
            ByteVector.fromString("SomeGenre(32)(32)Classical(CR)(RX)Whoa here's some cra((z)y string")
        );

        // Act
        const frame = TextInformationFrame.fromRawData(data, 3);

        // Assert
        this.assertFrame(frame, FrameTypes.TCON, [
            "SomeGenre",
            "32",
            "32",
            "Cover",
            "Remix",
            "Whoa here's some cra(z)y string"
        ]);
    }

    @test
    public fromOffsetRawData_v4_returnsFrameSplitByDelimiter() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.TCOP, 4);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.Latin1,
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bux", StringType.Latin1),
            0x0, 0x0,   // Extra nulls to trigger null stripping logic
        );

        // Act
        const frame = TextInformationFrame.fromOffsetRawData(data, 2, header);

        // Assert
        this.assertFrame(frame, FrameTypes.TCOP, ["fux", "bux"]);
    }

    private assertFrame(frame: TextInformationFrame, frameId: ByteVector, text: string[]): void {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.TextInformationFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, frameId));

        assert.isOk(frame.text);
        assert.deepStrictEqual(frame.text, text);
        assert.strictEqual(frame.textEncoding, StringType.Latin1);
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_TextInformationFrame_PropertyTests {
    @test
    public getText() {
        // Arrange
        const frame = getTestFrame();

        // Act
        const text = frame.text;
        text.push("new item");

        // Assert - new item not added to frame
        assert.notEqual(frame.text, text);
        assert.strictEqual(2, frame.text.length);
    }

    @test
    public settext() {
        // Arrange
        const frame = getTestFrame();

        // Act / Assert
        FramePropertyTests.propertyRoundTrip((v) => { frame.text = v; }, () => frame.text, ["bux", "fux"]);
    }

    @test
    public setEncoding_notRead() {
        // Arrange
        const frame = getTestFrame();

        // Act / Assert
        FramePropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16BE
        );
    }

    @test
    public setEncoding_read() {
        // Arrange
        const frame = getTestFrame();
        const _ = frame.text;   // Force a read

        // Act / Assert
        FramePropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16BE
        );
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_TextInformationFrame_MethodTests {
    @test
    public clone_returnsCopy() {
        // Arrange
        const frame = getTestFrame();

        // Act
        const output = <TextInformationFrame> frame.clone();

        // Assert
        assert.ok(output);
        assert.strictEqual(output.frameClassType, FrameClassType.TextInformationFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.TCOP));

        assert.deepStrictEqual(frame.text, output.text);
        assert.strictEqual(frame.textEncoding, output.textEncoding);
    }

    @test
    public find_falsyFrames() {
        // Act
        assert.throws(() => { TextInformationFrame.findTextInformationFrame(null, FrameTypes.TCOP); });
        assert.throws(() => { TextInformationFrame.findTextInformationFrame(undefined, FrameTypes.TCOP); });
    }

    @test
    public find_invalidIdentity() {
        // Act
        assert.throws(() => { TextInformationFrame.findTextInformationFrame([], null); });
        assert.throws(() => { TextInformationFrame.findTextInformationFrame([], undefined); });
        assert.throws(() => { TextInformationFrame.findTextInformationFrame([], ByteVector.empty()); });
        assert.throws(() => { TextInformationFrame.findTextInformationFrame([], ByteVector.fromSize(5)); });
    }

    @test
    public find_frameExists() {
        // Arrange
        const frames = [
            TextInformationFrame.fromIdentifier(FrameTypes.TCOP),
            TextInformationFrame.fromIdentifier(FrameTypes.TCOM)
        ];

        // Act
        const output = TextInformationFrame.findTextInformationFrame(frames, FrameTypes.TCOM);

        // Assert
        assert.isOk(output);
        assert.equal(output, frames[1]);
    }

    @test
    public find_frameDoesNotExist() {
        // Arrange
        const frames = [
            TextInformationFrame.fromIdentifier(FrameTypes.TCOP),
            TextInformationFrame.fromIdentifier(FrameTypes.TCOM)
        ];

        // Act
        const output = TextInformationFrame.findTextInformationFrame(frames, FrameTypes.TALB);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public render_invalidVersion_throws() {
        // Arrange
        const frame = getTestFrame();

        // Act/Assert
        assert.throws(() => { frame.render(-1); });
        assert.throws(() => { frame.render(1.23); });
        assert.throws(() => { frame.render(0x100); });
    }

    @test
    public render_notRead_returnsRawData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.TCOP, 4);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            Id3v2TagSettings.defaultEncoding,
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bux", StringType.Latin1),
        );
        const frame = TextInformationFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.ok(output);
        assert.isTrue(ByteVector.equal(output, data));
    }

    @test
    public render_readV4NotTxxx() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.TCOP, 4);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            Id3v2TagSettings.defaultEncoding,
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bux", StringType.Latin1),
        );
        const frame = TextInformationFrame.fromRawData(data, 4);
        const _ = frame.text; // Force a read

        // Act
        const output = frame.render(4);

        // Assert
        assert.ok(output);
        assert.isTrue(ByteVector.equal(output, data));
    }

    @test
    public render_readV3IsTxxxEmpty() {
        // Arrange
        let header = new Id3v2FrameHeader(FrameTypes.TXXX, 3);
        header.frameSize = 1;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.UTF8
        );
        const frame = TextInformationFrame.fromRawData(data, 3);
        const _ = frame.text; // Force a read

        // Act
        const output = frame.render(3);

        // Assert
        assert.ok(output);

        header = new Id3v2FrameHeader(FrameTypes.TXXX, 3);
        header.frameSize = 3;
        const expected = ByteVector.concatenate(
            header.render(3),
            StringType.UTF16,
            ByteVector.getTextDelimiter(StringType.UTF16)
        );

        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_readV3IsTxxxSingleValue() {
        // Arrange
        let header = new Id3v2FrameHeader(FrameTypes.TXXX, 3);
        header.frameSize = 4;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.UTF8,
            ByteVector.fromString("fux", StringType.UTF8)
        );
        const frame = TextInformationFrame.fromRawData(data, 3);
        const _ = frame.text; // Force a read

        // Act
        const output = frame.render(3);

        // Assert
        assert.ok(output);

        header = new Id3v2FrameHeader(FrameTypes.TXXX, 3);
        header.frameSize = 11;
        const expected = ByteVector.concatenate(
            header.render(3),
            StringType.UTF16,
            ByteVector.fromString("fux", StringType.UTF16),
            ByteVector.getTextDelimiter(StringType.UTF16)
        );

        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_readV3Tcon() {
        // Arrange
        let header = new Id3v2FrameHeader(FrameTypes.TCON, 3);
        header.frameSize = 67;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.Latin1,
            ByteVector.fromString(
                "SomeGenre(32)(32)Classical(CR)(RX)Whoa here's some cra((z)y string",
                StringType.Latin1
            )
        );
        const frame = TextInformationFrame.fromRawData(data, 3);
        const _ = frame.text; // Force a read

        // Act
        const output = frame.render(3);

        // Assert
        assert.ok(output);

        header = new Id3v2FrameHeader(FrameTypes.TCON, 3);
        header.frameSize = 58;
        const expected = ByteVector.concatenate(
            header.render(3),
            StringType.Latin1,
            ByteVector.fromString("SomeGenre(32)(32)(CR)(RX)Whoa here's some cra((z)y string", StringType.Latin1)
        );

        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_readV3WithSplit() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.TCOP, 3);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.Latin1,
            ByteVector.fromString("fux/bux", StringType.Latin1)
        );
        const frame = TextInformationFrame.fromRawData(data, 3);
        const _ = frame.text; // Force a read

        // Act
        const output = frame.render(3);

        // Assert
        assert.ok(output);
        assert.isTrue(ByteVector.equal(output, data));
    }

    @test
    public render_readV3WithoutSplit() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.TCOP, 3);
        header.frameSize = 4;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.Latin1,
            ByteVector.fromString("fux", StringType.Latin1)
        );
        const frame = TextInformationFrame.fromRawData(data, 3);
        const _ = frame.text; // Force a read

        // Act
        const output = frame.render(3);

        // Assert
        assert.ok(output);
        assert.isTrue(ByteVector.equal(output, data));
    }
}

