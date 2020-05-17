import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameConstructorTests from "./frameConstructorTests";
import PropertyTests from "../utilities/propertyTests";
import UnsynchronizedLyricsFrame from "../../src/id3v2/frames/unsynchronizedLyricsFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

const getTestFrameData = (): ByteVector => {
    const header = new Id3v2FrameHeader(FrameIdentifiers.USLT);
    header.frameSize = 11;

    return ByteVector.concatenate(
        header.render(4),                               // Header
        StringType.Latin1,                                      // Encoding
        ByteVector.fromString("eng", StringType.Latin1),    // Language
        ByteVector.fromString("foo"),                       // Description
        ByteVector.getTextDelimiter(StringType.Latin1),         // Delimiter
        ByteVector.fromString("bar")                        // Content
    );
};

const getTestUnsynchronizedLyricsFrame = (): UnsynchronizedLyricsFrame => {
    const frameData = getTestFrameData();
    return UnsynchronizedLyricsFrame.fromRawData(frameData, 4);
};

@suite(timeout(3000), slow(1000))
class Id3v2_UnsynchronizedLyricsFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return UnsynchronizedLyricsFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return UnsynchronizedLyricsFrame.fromRawData;
    }

    @test
    public fromData() {
        // Arrange
        const encoding = StringType.Latin1;
        const language = "eng";
        const description = "foo";

        // Act
        const frame = UnsynchronizedLyricsFrame.fromData(description, language, encoding);

        // Assert
        this.assertFrame(frame, description, language, "", encoding);
    }

    @test
    public fromOffsetRawData_missingDescription_returnsValidFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT);
        header.frameSize = 7;
        const data = ByteVector.concatenate(
            0x00, 0x00,                                     // Offset bytes
            header.render(4),                               // Header
            StringType.Latin1,                                      // Encoding
            ByteVector.fromString("eng", StringType.Latin1),    // Language
            ByteVector.fromString("foo")                        // Content
        );

        // Act
        const frame = UnsynchronizedLyricsFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        this.assertFrame(frame, "", "eng", "foo", StringType.Latin1);
    }

    @test
    public fromOffsetRawData_withDescription_returnsValidFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            0x00, 0x00,                                     // Offset bytes
            header.render(4),                               // Header
            StringType.Latin1,                                      // Encoding
            ByteVector.fromString("eng", StringType.Latin1),    // Language
            ByteVector.fromString("foo"),                       // Description
            ByteVector.getTextDelimiter(StringType.Latin1),         // Delimiter
            ByteVector.fromString("bar")                        // Content
        );

        // Act
        const frame = UnsynchronizedLyricsFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        this.assertFrame(frame, "foo", "eng", "bar", StringType.Latin1);
    }

    @test
    public fromRawData_missingDescription_returnsValidFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT);
        header.frameSize = 7;
        const data = ByteVector.concatenate(
            header.render(4),                               // Header
            StringType.Latin1,                                      // Encoding
            ByteVector.fromString("eng", StringType.Latin1),    // Language
            ByteVector.fromString("foo")                        // Content
        );

        // Act
        const frame = UnsynchronizedLyricsFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, "", "eng", "foo", StringType.Latin1);
    }

    @test
    public fromRawData_withDescription_returnsValidFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.USLT);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),                               // Header
            StringType.Latin1,                                      // Encoding
            ByteVector.fromString("eng", StringType.Latin1),    // Language
            ByteVector.fromString("foo"),                       // Description
            ByteVector.getTextDelimiter(StringType.Latin1),         // Delimiter
            ByteVector.fromString("bar")                        // Content
        );

        // Act
        const frame = UnsynchronizedLyricsFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, "foo", "eng", "bar", StringType.Latin1);
    }

    private assertFrame(frame: UnsynchronizedLyricsFrame, d: string, l: string, t: string, te: StringType) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UnsynchronizedLyricsFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.USLT);

        assert.strictEqual(frame.description, d);
        assert.strictEqual(frame.language, l);
        assert.strictEqual(frame.text, t);
        assert.strictEqual(frame.textEncoding, te);
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_UnsynchronizedLyricsFrame_PropertyTests {
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

@suite(timeout(3000), slow(1000))
class Id3v2_UnsynchronizedLyricsFrame_MethodTests {
    @test
    public find_falsyFrames_throws() {
        // Act/Assert
        assert.throws(() => { UnsynchronizedLyricsFrame.find(null, "foo", "bar"); });
        assert.throws(() => { UnsynchronizedLyricsFrame.find(undefined, "foo", "bar"); });
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
        assert.throws(() => { UnsynchronizedLyricsFrame.findPreferred(null, "foo", "bar"); });
        assert.throws(() => { UnsynchronizedLyricsFrame.findPreferred(undefined, "foo", "bar"); });
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

    @test
    public render() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);
        assert.isTrue(ByteVector.equal(result, getTestFrameData()));
    }
}
