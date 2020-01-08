import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameConstructorTests from "./frameConstructorTests";
import FramePropertiesTests from "./framePropertiesTests";
import FrameTypes from "../../src/id3v2/frameTypes";
import Id3v2TagSettings from "../../src/id3v2/id3v2TagSettings";
import TermsOfUseFrame from "../../src/id3v2/frames/termsOfUseFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";


// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class TermsOfUseFrameConstructorsTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader) => Frame {
        return TermsOfUseFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return TermsOfUseFrame.fromRawData;
    }

    @test
    public fromFields_withoutTextEncoding() {
        // Act
        const output = TermsOfUseFrame.fromFields("fux");

        // Assert
        this.assertFrame(output, "fux", undefined, Id3v2TagSettings.defaultEncoding);
    }

    @test
    public fromFields_withTextEncoding() {
        // Act
        const output = TermsOfUseFrame.fromFields("fux", StringType.UTF16BE);

        // Assert
        this.assertFrame(output, "fux", undefined, StringType.UTF16BE);
    }

    @test
    public fromOffsetRawData_notEnoughBytes() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.USER, 4);
        header.frameSize = 2;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00, // Offset data
            0x00, 0x00
        );

        // Act / Assert
        assert.throws(() => { TermsOfUseFrame.fromOffsetRawData(data, 2, header); });
    }

    @test
    public fromOffsetRawData_enoughData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.USER, 4);
        header.frameSize = 10;
        const data = ByteVector.concatenate(
            header.render(4),
            0x01, 0x00, // Offset data
            StringType.Latin1,
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.fromString("buxqux", StringType.Latin1)
        );

        // Act
        const output = TermsOfUseFrame.fromOffsetRawData(data, 2, header);

        // Assert
        this.assertFrame(output, "fux", "buxqux", StringType.Latin1);
    }

    @test
    public fromRawData_notEnoughBytes() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.USER, 4);
        header.frameSize = 2;
        const data = ByteVector.concatenate(
            header.render(4),
            0x01, 0x02
        );

        // Act / Assert
        assert.throws(() => { TermsOfUseFrame.fromRawData(data, 4); });
    }

    @test
    public fromRawData_enoughData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.USER, 4);
        header.frameSize = 10;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.fromString("buxqux", StringType.Latin1)
        );

        // Act
        const output = TermsOfUseFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(output, "fux", "buxqux", StringType.Latin1);
    }

    private assertFrame(frame: TermsOfUseFrame, language: string, text: string, textEncoding: StringType) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.TermsOfUseFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.USER));

        assert.strictEqual(frame.language, language);
        assert.strictEqual(frame.text, text);
        assert.strictEqual(frame.textEncoding, textEncoding);
    }
}

@suite(timeout(3000), slow(1000))
class TermsOfUseFramePropertyTests {
    @test
    public language() {
        // Arrange
        const set = (v: string) => { frame.language = v; };
        const get = () => frame.language;

        // Act/Assert
        const frame = TermsOfUseFrame.fromFields("eng");
        FramePropertiesTests.propertyNormalized(set, get, "fu", "XXX");
        FramePropertiesTests.propertyNormalized(set, get, "fuxx", "fux");
        FramePropertiesTests.propertyNormalized(set, get, undefined, "XXX");
        FramePropertiesTests.propertyNormalized(set, get, null, "XXX");
        FramePropertiesTests.propertyRoundTrip(set, get, "fux");
    }

    @test
    public text() {
        const frame = TermsOfUseFrame.fromFields("eng");
        FramePropertiesTests.propertyRoundTrip((v) => { frame.text = v; }, () => frame.text, "fux");
        FramePropertiesTests.propertyRoundTrip((v) => { frame.text = v; }, () => frame.text, undefined);
    }

    @test
    public textEncoding() {
        const frame = TermsOfUseFrame.fromFields("eng", StringType.Latin1);
        FramePropertiesTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16
        );
    }
}

@suite(timeout(3000), slow(1000))
class TermsOfUseFrameMethodTests {
    @test
    public get_falsyFrames() {
        // Act/Assert
        assert.throws(() => { TermsOfUseFrame.find(undefined); });
    }

    @test
    public get_noFrames() {
        // Act
        const output = TermsOfUseFrame.find([]);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public get_matchWithFrames_returnsFirst() {
        // Arrange
        const frames = [
            TermsOfUseFrame.fromFields("eng"),
            TermsOfUseFrame.fromFields("jpn")
        ];

        // Act
        const output = TermsOfUseFrame.find(frames);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[0]);
    }

    @test
    public get_matchWithFramesWithLanguage() {
        // Arrange
        const frames = [
            TermsOfUseFrame.fromFields("eng"),
            TermsOfUseFrame.fromFields("jpn")
        ];

        // Act
        const output = TermsOfUseFrame.find(frames, "jpn");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[1]);
    }

    @test
    public getPreferred_falsyFrames() {
        // Act/Assert
        assert.throws(() => TermsOfUseFrame.findPreferred(undefined, "eng"));
    }

    @test
    public getPreferred_noFrames() {
        // Act
        const output = TermsOfUseFrame.findPreferred([], "eng");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public getPrefeerred_nonExactMatch() {
        // Arrange
        const frames = [
            TermsOfUseFrame.fromFields("eng"),
            TermsOfUseFrame.fromFields("jpn")
        ];

        // Act
        const output = TermsOfUseFrame.findPreferred(frames, "foo");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[0]);
    }

    @test
    public getPreferred_exactMatch() {
        // Arrange
        const frames = [
            TermsOfUseFrame.fromFields("eng"),
            TermsOfUseFrame.fromFields("jpn")
        ];

        // Act
        const output = TermsOfUseFrame.findPreferred(frames, "jpn");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[1]);
    }

    @test
    public clone() {
        // Arrange
        const frame = TermsOfUseFrame.fromFields("eng", StringType.Latin1);
        frame.text = "foobarbux";

        // Act
        const output = <TermsOfUseFrame> frame.clone();

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.frameClassType, frame.frameClassType);
        assert.isTrue(ByteVector.equal(output.frameId, frame.frameId));

        assert.strictEqual(output.language, frame.language);
        assert.strictEqual(output.text, frame.text);
        assert.strictEqual(output.textEncoding, frame.textEncoding);
    }

    @test
    public render() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.USER, 4);
        header.frameSize = 10;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.fromString("buxqux", StringType.Latin1)
        );
        const frame = TermsOfUseFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.isTrue(ByteVector.equal(output, data));
    }
}
