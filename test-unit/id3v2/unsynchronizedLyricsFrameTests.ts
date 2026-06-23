import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import PropertyTests from "../utilities/propertyTests";
import UnsynchronizedLyricsFrame from "../../src/id3v2/frames/unsynchronizedLyricsFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const getTestUnsynchronizedLyricsFrame = (): UnsynchronizedLyricsFrame => {
    const fieldBytes = ByteVector.concatenate(
        StringType.Latin1,                               // Encoding
        ByteVector.fromString("eng", StringType.Latin1), // Language
        ByteVector.fromString("foo", StringType.Latin1), // Description
        ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
        ByteVector.fromString("bar", StringType.Latin1)  // Content
    );
    const header = new Id3v2FrameHeader(FrameIdentifiers.USLT);
    return UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, 4);
};

@suite class Id3v2_UnsynchronizedLyricsFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return UnsynchronizedLyricsFrame.fromFieldBytes;
    }

    @test
    public fromData() {
        // @TODO: Add test cases for different values - especially undefined language.
        // Arrange
        const encoding = StringType.Latin1;
        const language = "eng";
        const description = "foo";

        // Act
        const frame = UnsynchronizedLyricsFrame.fromData(description, language, encoding);

        // Assert
        Id3v2_UnsynchronizedLyricsFrame_ConstructorTests.assertFrame(frame, description, language, "", encoding);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_tooFewBytes_throws() {
        // Arrange
        const fieldBytes = ByteVector.fromByte(StringType.Latin1);
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act/Assert
        assert.throws(() => { UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, 4); });
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_requitedBytesOnly(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                    // Encoding
            ByteVector.fromString("eng", StringType.Latin1),      // Language
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        Id3v2_UnsynchronizedLyricsFrame_ConstructorTests.assertFrame(frame, "", "eng", "", StringType.Latin1);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_descriptionOnly(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                    // Encoding
            ByteVector.fromString("eng", StringType.Latin1),      // Language
            ByteVector.fromString("foobarbaz", StringType.Latin1) // Description -> will become lyrics
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        Id3v2_UnsynchronizedLyricsFrame_ConstructorTests.assertFrame(frame, "", "eng", "foobarbaz", StringType.Latin1);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_lyricsOnly(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                    // Encoding
            ByteVector.fromString("eng", StringType.Latin1),      // Language
            ByteVector.getTextDelimiter(StringType.Latin1),       // Separator
            ByteVector.fromString("foobarbaz", StringType.Latin1) // Lyrics
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        Id3v2_UnsynchronizedLyricsFrame_ConstructorTests.assertFrame(frame, "", "eng", "foobarbaz", StringType.Latin1);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_descriptionAndLyrics(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                               // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("foo", StringType.Latin1), // Description
            ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
            ByteVector.fromString("bar", StringType.Latin1)  // Lyrics
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        Id3v2_UnsynchronizedLyricsFrame_ConstructorTests.assertFrame(frame, "foo", "eng", "bar", StringType.Latin1);
    }

    @params(StringType.Latin1, "single_byte_encoding")
    @params(StringType.UTF16BE, "multi_byte_encoding")
    public fromFieldData_encodingTest(encoding: StringType) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            encoding,                                        // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("foo", encoding),          // Description
            ByteVector.getTextDelimiter(encoding),           // Delimiter
            ByteVector.fromString("bar", encoding)           // Lyrics
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UnsynchronizedLyricsFrame.fromFieldBytes(header, fieldBytes, 4);

        // Assert
        Id3v2_UnsynchronizedLyricsFrame_ConstructorTests.assertFrame(frame, "foo", "eng", "bar", encoding);
    }

    private static assertFrame(frame: UnsynchronizedLyricsFrame, d: string, l: string, t: string, te: StringType) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UnsynchronizedLyricsFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.USLT);

        assert.strictEqual(frame.description, d);
        assert.strictEqual(frame.language, l);
        assert.strictEqual(frame.text, t);
        assert.strictEqual(frame.textEncoding, te);
    }
}

@suite class Id3v2_UnsynchronizedLyricsFrame_PropertyTests {
    @test
    public description() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();
        const set = (v: string) => { frame.description = v; };
        const get = () => frame.description;

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, "fux");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public language() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();
        const set = (v: string) => { frame.language = v; };
        const get = () => frame.language;

        // Act / assert
        PropertyTests.propertyRoundTrip(set, get, "ABC");
        PropertyTests.propertyNormalized(set, get, undefined, "XXX");
        PropertyTests.propertyNormalized(set, get, null, "XXX");
        PropertyTests.propertyNormalized(set, get, "AB", "XXX");
        PropertyTests.propertyNormalized(set, get, "ABCD", "XXX");
    }

    @test
    public text() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();
        const set = (v: string) => { frame.text = v; };
        const get = () => frame.text;

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, "fux qux quxx");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public textEncoding() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16BE
        );
    }
}

@suite class Id3v2_UnsynchronizedLyricsFrame_MethodTests {
    @test
    public find_falsyFrames_throws() {
        // Act/Assert
        Testers.testTruthy((v: UnsynchronizedLyricsFrame[]) => { UnsynchronizedLyricsFrame.find(v, "foo", "bar"); });
    }

    @test
    public find_emptyFrames_returnsUndefined() {
        // Arrange
        const frames: UnsynchronizedLyricsFrame[] = [];

        // Act
        const result = UnsynchronizedLyricsFrame.find(frames, "foo", "bar");

        // Assert
        assert.isUndefined(result);
    }

    @test
    public find_noMatchByDescription_returnsUndefined() {
        // Arrange - Description is foo
        const frames = [getTestUnsynchronizedLyricsFrame(), getTestUnsynchronizedLyricsFrame()];

        // Act
        const result = UnsynchronizedLyricsFrame.find(frames, "fux", "eng");

        // Assert
        assert.isUndefined(result);
    }

    @test
    public find_noMatchByLanguage_returnsUndefined() {
        // Arrange - Language is eng
        const frames = [getTestUnsynchronizedLyricsFrame(), getTestUnsynchronizedLyricsFrame()];

        // Act
        const result = UnsynchronizedLyricsFrame.find(frames, "foo", "fux");

        // Assert
        assert.isUndefined(result);
    }

    @test
    public find_matchWithLanguage_returnsFirstMatch() {
        // Arrange
        const frames = [
            getTestUnsynchronizedLyricsFrame(),
            getTestUnsynchronizedLyricsFrame(),
            getTestUnsynchronizedLyricsFrame(),
            getTestUnsynchronizedLyricsFrame()
        ];
        frames[2].language = "jpn";
        frames[3].description = "fux";

        // Act
        const result = UnsynchronizedLyricsFrame.find(frames, "foo", "eng");

        // Assert
        assert.ok(result);
        assert.strictEqual(result, frames[0]);
    }

    @test
    public find_matchWithoutLanguage_returnsFirstMatch() {
        // Arrange
        const frames = [
            getTestUnsynchronizedLyricsFrame(),
            getTestUnsynchronizedLyricsFrame(),
            getTestUnsynchronizedLyricsFrame(),
            getTestUnsynchronizedLyricsFrame()
        ];
        frames[2].language = "jpn";
        frames[3].description = "fux";

        // Act
        const result = UnsynchronizedLyricsFrame.find(frames, "foo", undefined);

        // Assert
        assert.ok(result);
        assert.strictEqual(result, frames[0]);
    }

    @test
    public findAll_falsyFrames_throws() {
        // Act/Assert
        assert.throws(() => { UnsynchronizedLyricsFrame.findAll(null, "foo", "bar"); });
        assert.throws(() => { UnsynchronizedLyricsFrame.findAll(undefined, "foo", "bar"); });
    }

    @test
    public findAll_emptyFrames_returnsUndefined() {
        // Arrange
        const frames: UnsynchronizedLyricsFrame[] = [];

        // Act
        const result = UnsynchronizedLyricsFrame.findAll(frames, "foo", "bar");

        // Assert
        assert.isOk(result);
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public findAll_noMatchByDescription_returnsUndefined() {
        // Arrange - Description is foo
        const frames = [getTestUnsynchronizedLyricsFrame(), getTestUnsynchronizedLyricsFrame()];

        // Act
        const result = UnsynchronizedLyricsFrame.findAll(frames, "fux", "eng");

        // Assert
        assert.isOk(result);
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public findAll_noMatchByLanguage_returnsUndefined() {
        // Arrange - Language is eng
        const frames = [getTestUnsynchronizedLyricsFrame(), getTestUnsynchronizedLyricsFrame()];

        // Act
        const result = UnsynchronizedLyricsFrame.findAll(frames, "foo", "fux");

        // Assert
        assert.isOk(result);
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public findAll_matchWithLanguage_returnsFirstMatch() {
        // Arrange
        const frames = [
            getTestUnsynchronizedLyricsFrame(),
            getTestUnsynchronizedLyricsFrame(),
            getTestUnsynchronizedLyricsFrame(),
            getTestUnsynchronizedLyricsFrame()
        ];
        frames[2].language = "jpn";
        frames[3].description = "fux";

        // Act
        const result = UnsynchronizedLyricsFrame.findAll(frames, "foo", "eng");

        // Assert
        assert.ok(result);
        assert.isArray(result);
        assert.sameMembers(result, frames.slice(0, 2));
    }

    @test
    public findAll_matchWithoutLanguage_returnsFirstMatch() {
        // Arrange
        const frames = [
            getTestUnsynchronizedLyricsFrame(),
            getTestUnsynchronizedLyricsFrame(),
            getTestUnsynchronizedLyricsFrame(),
            getTestUnsynchronizedLyricsFrame()
        ];
        frames[2].language = "jpn";
        frames[3].description = "fux";

        // Act
        const result = UnsynchronizedLyricsFrame.findAll(frames, "foo", undefined);

        // Assert
        assert.ok(result);
        assert.isArray(result);
        assert.sameMembers(result, frames.slice(0, 3));
    }

    @test
    public findPreferred_falsyFrames_throws() {
        // Act/Assert
        Testers.testTruthy((v: UnsynchronizedLyricsFrame[]) => {
            UnsynchronizedLyricsFrame.findPreferred(v, "foo", "bar");
        });
    }

    @test
    public findPreferred_noFrames_returnsUndefined() {
        // Arrange
        const frames: UnsynchronizedLyricsFrame[] = [];

        // Act
        const result = UnsynchronizedLyricsFrame.findPreferred(frames, "fux", "qux");

        // Assert
        assert.isUndefined(result);
    }

    @test
    public findPreferred_perfectMatch_() {
        // Arrange
        const frames: UnsynchronizedLyricsFrame[] = [
            getTestUnsynchronizedLyricsFrame(), // Wrong description, wrong language
            getTestUnsynchronizedLyricsFrame(), // Correct description, wrong language
            getTestUnsynchronizedLyricsFrame(), // Wrong description, correct language
            getTestUnsynchronizedLyricsFrame()  // Correct description, correct language
        ];
        frames[0].language = "jpn";
        frames[0].description = "fux";
        frames[1].language = "jpn";
        frames[2].description = "fux";

        // Act
        const result = UnsynchronizedLyricsFrame.findPreferred(frames, "foo", "eng");

        // Assert
        assert.ok(result);
        assert.strictEqual(result, frames[3]);
    }

    @test
    public findPreferred_matchByLanguage() {
        // Arrange
        const frames: UnsynchronizedLyricsFrame[] = [
            getTestUnsynchronizedLyricsFrame(), // Wrong description, wrong language
            getTestUnsynchronizedLyricsFrame(), // Correct description, wrong language
            getTestUnsynchronizedLyricsFrame(), // Wrong description, correct language
        ];
        frames[0].language = "jpn";
        frames[0].description = "fux";
        frames[1].language = "jpn";
        frames[2].description = "fux";

        // Act
        const result = UnsynchronizedLyricsFrame.findPreferred(frames, "foo", "eng");

        // Assert
        assert.ok(result);
        assert.strictEqual(result, frames[2]);
    }

    @test
    public findPreferred_matchByDescription() {
        // Arrange
        const frames: UnsynchronizedLyricsFrame[] = [
            getTestUnsynchronizedLyricsFrame(), // Wrong description, wrong language
            getTestUnsynchronizedLyricsFrame(), // Correct description, wrong language
        ];
        frames[0].language = "jpn";
        frames[0].description = "fux";
        frames[1].language = "jpn";

        // Act
        const result = UnsynchronizedLyricsFrame.findPreferred(frames, "foo", "eng");

        // Assert
        assert.ok(result);
        assert.strictEqual(result, frames[1]);
    }

    @test
    public findPreferred_matchFirst() {
        // Arrange
        const frames: UnsynchronizedLyricsFrame[] = [
            getTestUnsynchronizedLyricsFrame(), // Wrong description, wrong language
            getTestUnsynchronizedLyricsFrame(), // Wrong description, wrong language
        ];

        // Act
        const result = UnsynchronizedLyricsFrame.findPreferred(frames, "fux", "jpn");

        // Assert
        assert.ok(result);
        assert.strictEqual(result, frames[0]);
    }

    @test
    public clone() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        const result = <UnsynchronizedLyricsFrame> frame.clone();

        // Assert
        assert.ok(result);
        assert.strictEqual(result.frameClassType, FrameClassType.UnsynchronizedLyricsFrame);
        assert.strictEqual(result.frameId, FrameIdentifiers.USLT);

        assert.strictEqual(result.description, frame.description);
        assert.strictEqual(result.language, frame.language);
        assert.strictEqual(result.text, frame.text);
        assert.strictEqual(result.textEncoding, frame.textEncoding);
    }

    @params([2, StringType.Latin1], "v2_single_byte")
    @params([2, StringType.UTF16BE], "v2_multibyte")
    @params([3, StringType.Latin1], "v3_single_byte")
    @params([3, StringType.UTF16BE], "v3_multibyte")
    @params([4, StringType.Latin1], "v4_single_byte")
    @params([4, StringType.UTF16BE], "v4_multibyte")
    public render([version, encoding]: [number, StringType]) {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromData("foo", "eng", encoding);
        frame.text = "bar";

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const expectedFieldBytes = ByteVector.concatenate(
            encoding,                                        // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("foo", encoding),          // Description
            ByteVector.getTextDelimiter(encoding),           // Delimiter
            ByteVector.fromString("bar", encoding)           // Lyrics
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(version), expectedFieldBytes);
        Testers.bvEqual(output, expectedBytes);
    }

    @params([2, StringType.UTF16], "v2")
    @params([3, StringType.UTF16], "v3")
    @params([4, StringType.UTF8], "v4")
    public render_utf8([version, outputEncoding]: [number, StringType]) {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromData("foo", "eng", StringType.UTF8);
        frame.text = "bar";

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const expectedFieldBytes = ByteVector.concatenate(
            outputEncoding,                                  // Encoding
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("foo", outputEncoding),    // Description
            ByteVector.getTextDelimiter(outputEncoding),     // Delimiter
            ByteVector.fromString("bar", outputEncoding)     // Lyrics
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(version), expectedFieldBytes);
        Testers.bvEqual(output, expectedBytes);
    }

    @test
    public render_descriptionOnly() {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromData("foo", "eng", StringType.Latin1);

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expectedFieldBytes = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.fromString("foo", StringType.Latin1), // Description
            ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(4), expectedFieldBytes);
        Testers.bvEqual(result, expectedBytes);
    }

    @test
    public render_lyricsOnly() {
        // Arrange
        const frame = UnsynchronizedLyricsFrame.fromData("", "eng", StringType.Latin1);
        frame.text = "foo";

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);

        const expectedFieldBytes = ByteVector.concatenate(
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1), // Language
            ByteVector.getTextDelimiter(StringType.Latin1),  // Delimiter
            ByteVector.fromString("foo", StringType.Latin1), // Lyrics
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT, Id3v2FrameFlags.None, expectedFieldBytes.length);
        const expectedBytes = ByteVector.concatenate(header.render(4), expectedFieldBytes);
        Testers.bvEqual(result, expectedBytes);
    }
}
