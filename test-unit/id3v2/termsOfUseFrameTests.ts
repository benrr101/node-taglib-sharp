import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import PropertyTests from "../utilities/propertyTests";
import TermsOfUseFrame from "../../src/id3v2/frames/termsOfUseFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

@suite class Id3v2_TermsOfUseFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return TermsOfUseFrame.fromFieldBytes;
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

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_notEnoughBytes(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(0x00, 0x00);
        const header = new Id3v2FrameHeader(FrameIdentifiers.USER, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => { TermsOfUseFrame.fromFieldBytes(header, fieldBytes, version); });
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_withoutText(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                              // Encoding
            ByteVector.fromString("eng", StringType.Latin1) // Language
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USER, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TermsOfUseFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        Id3v2_TermsOfUseFrame_ConstructorTests.assertFrame(frame, "eng", "", StringType.Latin1);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_withText(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                    // Encoding
            ByteVector.fromString("eng", StringType.Latin1),      // Language
            ByteVector.fromString("foobarbaz", StringType.Latin1) // Text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USER, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TermsOfUseFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        Id3v2_TermsOfUseFrame_ConstructorTests.assertFrame(frame, "eng", "foobarbaz", StringType.Latin1);
    }

    @params(StringType.Latin1, "single_byte")
    @params(StringType.UTF16BE, "multi_byte")
    public fromFieldBytes_encodingTest(encoding: StringType) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            encoding,                                        // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("foobarbaz", encoding)     // Text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USER, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TermsOfUseFrame.fromFieldBytes(header, fieldBytes, 4);

        // Assert
        Id3v2_TermsOfUseFrame_ConstructorTests.assertFrame(frame, "eng", "foobarbaz", encoding);
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
    public render_v2() {
        // Arrange
        const frame = TermsOfUseFrame.fromFields("foo", StringType.Latin1);

        // Act / Assert
        assert.throws(() => frame.render(2));
    }

    @params(undefined, "undefined")
    @params(null, "null")
    @params("", "empty")
    public render_noText(text: string) {
        // Arrange
        const frame = TermsOfUseFrame.fromFields("foo", StringType.Latin1);
        frame.text = text;

        // Act
        const result = frame.render(4);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                               // Encoding
            ByteVector.fromString("foo", StringType.Latin1), // Language
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USER, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(4), fieldBytes);
        Testers.bvEqual(result, expected);
    }

    @params(3, "v3")
    @params(4, "v4")
    public render_withText(version: number) {
        // Arrange
        const frame = TermsOfUseFrame.fromFields("foo", StringType.Latin1);
        frame.text = "bar";

        // Act
        const result = frame.render(version);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                               // Encoding
            ByteVector.fromString("foo", StringType.Latin1), // Language
            ByteVector.fromString("bar", StringType.Latin1)  // Text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USER, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(result, expected);
    }

    @params(StringType.Latin1, "single_byte")
    @params(StringType.UTF16BE, "multi_byte")
    public render_encodingTest(encoding: StringType) {
        // Arrange
        const frame = TermsOfUseFrame.fromFields("foo", encoding);
        frame.text = "bar";

        // Act
        const result = frame.render(4);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            encoding,                                        // Encoding
            ByteVector.fromString("foo", StringType.Latin1), // Language
            ByteVector.fromString("bar", encoding)           // Text
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USER, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(4), fieldBytes);
        Testers.bvEqual(result, expected);
    }
}
