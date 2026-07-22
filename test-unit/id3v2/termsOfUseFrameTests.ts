import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import FrameHeader from "../../src/id3v2/frames/frameHeader";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import PropertyTests from "../utilities/propertyTests";
import TermsOfUseFrame from "../../src/id3v2/frames/termsOfUseFrame";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {FrameFlags} from "../../src/id3v2/enums";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const assertFrame = (frame: TermsOfUseFrame, language: string, text: string, textEncoding: StringType) => {
    assert.isOk(frame);
    assert.instanceOf<TermsOfUseFrame>(frame, TermsOfUseFrame);
    assert.strictEqual(frame.frameId, FrameIdentifiers.USER);

    assert.strictEqual(frame.language, language);
    assert.strictEqual(frame.text, text);
    assert.strictEqual(frame.textEncoding, textEncoding);
}

@suite class Id3v2_TermsOfUseFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: FrameHeader, d: ByteVector, v: number) => Frame {
        return TermsOfUseFrame.fromFieldBytes;
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_notEnoughBytes(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(0x00, 0x00);
        const header = new FrameHeader(FrameIdentifiers.USER, FrameFlags.None, fieldBytes.length);

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
        const header = new FrameHeader(FrameIdentifiers.USER, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TermsOfUseFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, "eng", "", StringType.Latin1);
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
        const header = new FrameHeader(FrameIdentifiers.USER, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TermsOfUseFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, "eng", "foobarbaz", StringType.Latin1);
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
        const header = new FrameHeader(FrameIdentifiers.USER, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = TermsOfUseFrame.fromFieldBytes(header, fieldBytes, 4);

        // Assert
        assertFrame(frame, "eng", "foobarbaz", encoding);
    }

    @test
    public fromFields_noParams() {
        // Act
        const output = TermsOfUseFrame.fromFields();

        // Assert
        assertFrame(output, "XXX", "", Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withText() {
        // Act
        const output = TermsOfUseFrame.fromFields("foo");

        // Assert
        assertFrame(output, "XXX", "foo", Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withTextLanguage() {
        // Act
        const output = TermsOfUseFrame.fromFields("foo", "bar");

        // Assert
        assertFrame(output, "bar", "foo", Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withTextLanguageEncoding() {
        // Act
        const output = TermsOfUseFrame.fromFields("foo", "bar", StringType.UTF16BE);

        // Assert
        assertFrame(output, "bar", "foo", StringType.UTF16BE);
    }
}

@suite class Id3v2_TermsOfUseFrame_PropertyTests {
    @test
    public language() {
        // Arrange
        const set = (v: string) => { frame.language = v; };
        const get = () => frame.language;

        // Act/Assert
        const frame = TermsOfUseFrame.fromFields();
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

        const frame = TermsOfUseFrame.fromFields();
        PropertyTests.propertyRoundTrip(set, get, "fux");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public textEncoding() {
        const frame = TermsOfUseFrame.fromFields();
        PropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16
        );
    }
}

@suite class Id3v2_TermsOfUseFrame_MethodTests {
    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: TermsOfUseFrame[]) => { TermsOfUseFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = TermsOfUseFrame.filterFrames(frames);

        // Assert
        assert.isArray(output);
        assert.isEmpty(output);
    }

    @test
    public filterFrames_noMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frames = [frame1, frame2];

        // Act
        const result = TermsOfUseFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = TermsOfUseFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = TermsOfUseFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = TermsOfUseFrame.fromFields();
        const frame3 = TermsOfUseFrame.fromFields();

        const frames = [frame1, frame2, frame3];

        // Act
        const result = TermsOfUseFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = TermsOfUseFrame.fromFields();
        const frame2 = TermsOfUseFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = TermsOfUseFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @test
    public clone() {
        // Arrange
        const frame = TermsOfUseFrame.fromFields("foobarbaz", "eng", StringType.Latin1);

        // Act
        const output = <TermsOfUseFrame> frame.clone();

        // Assert
        assertFrame(output, frame.language, frame.text, frame.textEncoding);
    }

    @test
    public render_v2() {
        // Arrange
        const frame = TermsOfUseFrame.fromFields("foo", "bar", StringType.Latin1);

        // Act / Assert
        assert.throws(() => frame.render(2));
    }

    @params(undefined, "undefined")
    @params(null, "null")
    @params("", "empty")
    public render_noText(text: string) {
        // Arrange
        const frame = TermsOfUseFrame.fromFields(text, "foo", StringType.Latin1);

        // Act
        const result = frame.render(4);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                               // Encoding
            ByteVector.fromString("foo", StringType.Latin1), // Language
        );
        const header = new FrameHeader(FrameIdentifiers.USER, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(4), fieldBytes);
        Testers.bvEqual(result, expected);
    }

    @params(3, "v3")
    @params(4, "v4")
    public render_withText(version: number) {
        // Arrange
        const frame = TermsOfUseFrame.fromFields("bar", "foo", StringType.Latin1);

        // Act
        const result = frame.render(version);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                               // Encoding
            ByteVector.fromString("foo", StringType.Latin1), // Language
            ByteVector.fromString("bar", StringType.Latin1)  // Text
        );
        const header = new FrameHeader(FrameIdentifiers.USER, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(result, expected);
    }

    @params(StringType.Latin1, "single_byte")
    @params(StringType.UTF16BE, "multi_byte")
    public render_encodingTest(encoding: StringType) {
        // Arrange
        const frame = TermsOfUseFrame.fromFields("bar", "foo", encoding);

        // Act
        const result = frame.render(4);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            encoding,                                        // Encoding
            ByteVector.fromString("foo", StringType.Latin1), // Language
            ByteVector.fromString("bar", encoding)           // Text
        );
        const header = new FrameHeader(FrameIdentifiers.USER, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(4), fieldBytes);
        Testers.bvEqual(result, expected);
    }
}
