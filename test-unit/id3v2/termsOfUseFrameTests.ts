import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import FrameConstructorTests from "./frameConstructorTests";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import PropertyTests from "../utilities/propertyTests";
import TermsOfUseFrame from "../../src/id3v2/frames/termsOfUseFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";

// Setup chai
const assert = Chai.assert;

@suite class Id3v2_TermsOfUseFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
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
        Id3v2_TermsOfUseFrame_ConstructorTests.assertFrame(output, "fux", "", Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withTextEncoding() {
        // Act
        const output = TermsOfUseFrame.fromFields("fux", StringType.UTF16BE);

        // Assert
        Id3v2_TermsOfUseFrame_ConstructorTests.assertFrame(output, "fux", "", StringType.UTF16BE);
    }

    @test
    public fromOffsetRawData_notEnoughBytes() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.USER);
        header.frameSize = 2;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00, // Offset data
            0x00, 0x00
        );

        // Act / Assert
        assert.throws(() => { TermsOfUseFrame.fromOffsetRawData(data, 2, header, 4); });
    }

    @test
    public fromOffsetRawData_enoughData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.USER);
        header.frameSize = 10;
        const data = ByteVector.concatenate(
            header.render(4),
            0x01, 0x00, // Offset data
            StringType.Latin1,
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.fromString("buxqux", StringType.Latin1)
        );

        // Act
        const output = TermsOfUseFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        Id3v2_TermsOfUseFrame_ConstructorTests.assertFrame(output, "fux", "buxqux", StringType.Latin1);
    }

    @test
    public fromRawData_notEnoughBytes() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.USER);
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
        const header = new Id3v2FrameHeader(FrameIdentifiers.USER);
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
        Id3v2_TermsOfUseFrame_ConstructorTests.assertFrame(output, "fux", "buxqux", StringType.Latin1);
    }

    private static assertFrame(frame: TermsOfUseFrame, language: string, text: string, textEncoding: StringType) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.TermsOfUseFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.USER);

        assert.strictEqual(frame.language, language);
        assert.strictEqual(frame.text, text);
        assert.strictEqual(frame.textEncoding, textEncoding);
    }
}

@suite class Id3v2_TermsOfUseFrame_PropertyTests {
    @test
    public language() {
        // Arrange
        const set = (v: string) => { frame.language = v; };
        const get = () => frame.language;

        // Act/Assert
        const frame = TermsOfUseFrame.fromFields("eng");
        PropertyTests.propertyNormalized(set, get, "fu", "XXX");
        PropertyTests.propertyNormalized(set, get, "fuxx", "fux");
        PropertyTests.propertyNormalized(set, get, undefined, "XXX");
        PropertyTests.propertyNormalized(set, get, null, "XXX");
        PropertyTests.propertyRoundTrip(set, get, "fux");
    }

    @test
    public text() {
        // Arrange
        const set = (v: string) => { frame.text = v; };
        const get = () => frame.text;

        const frame = TermsOfUseFrame.fromFields("eng");
        PropertyTests.propertyRoundTrip(set, get, "fux");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public textEncoding() {
        const frame = TermsOfUseFrame.fromFields("eng", StringType.Latin1);
        PropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16
        );
    }
}

@suite class Id3v2_TermsOfUseFrame_MethodTests {
    @test
    public find_falsyFrames() {
        // Act/Assert
        assert.throws(() => { TermsOfUseFrame.find(undefined); });
    }

    @test
    public find_noFrames() {
        // Act
        const output = TermsOfUseFrame.find([]);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_matchWithFrames_returnsFirst() {
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
    public find_matchWithFramesWithLanguage() {
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
    public findPreferred_falsyFrames() {
        // Act/Assert
        assert.throws(() => TermsOfUseFrame.findPreferred(undefined, "eng"));
    }

    @test
    public findPreferred_noFrames() {
        // Act
        const output = TermsOfUseFrame.findPreferred([], "eng");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public findPreferred_nonExactMatch() {
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
    public findPreferred_exactMatch() {
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
        assert.strictEqual(output.frameId, frame.frameId);

        assert.strictEqual(output.language, frame.language);
        assert.strictEqual(output.text, frame.text);
        assert.strictEqual(output.textEncoding, frame.textEncoding);
    }

    @test
    public render() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.SYLT);
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
