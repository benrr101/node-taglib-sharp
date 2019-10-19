import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameTypes from "../../src/id3v2/frameTypes";
import UnsynchronizedLyricsFrame from "../../src/id3v2/frames/unsynchronizedLyricsFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

const getTestFrameData = (): ByteVector => {
    const header = new Id3v2FrameHeader(FrameTypes.USLT, 4);
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
class UnsynchronizedLyricsFrameConstructorsTests {
    @test
    public fromData() {
        // Arrange
        const encoding = StringType.Latin1;
        const language = "eng";
        const description = "foo";

        // Act
        const result = UnsynchronizedLyricsFrame.fromData(description, language, encoding);

        // Assert
        assert.isOk(result);
        assert.equal(result.frameClassType, FrameClassType.UnsynchronizedLyricsFrame);
        assert.isTrue(ByteVector.equal(result.frameId, FrameTypes.USLT));

        assert.strictEqual(result.description, description);
        assert.strictEqual(result.language, language);
        assert.strictEqual(result.text, "");
        assert.strictEqual(result.textEncoding, encoding);
    }

    @test
    public fromOffsetRawData_invalidData_throws() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.USLT, 4);
        const dataTooShort = ByteVector.empty();

        // Act/Assert
        assert.throws(() => { UnsynchronizedLyricsFrame.fromOffsetRawData(null, 0, header); });
        assert.throws(() => { UnsynchronizedLyricsFrame.fromOffsetRawData(undefined, 0, header); });
        assert.throws(() => { UnsynchronizedLyricsFrame.fromOffsetRawData(dataTooShort, 0, header); });
    }

    @test
    public fromOffsetRawData_invalidOffset_throws() {
        // Arrange
        const data = ByteVector.empty();
        const header = new Id3v2FrameHeader(FrameTypes.USLT, 4);

        // Act/Assert
        assert.throws(() => { UnsynchronizedLyricsFrame.fromOffsetRawData(data, -1, header); });
        assert.throws(() => { UnsynchronizedLyricsFrame.fromOffsetRawData(data, 1.23, header); });
        assert.throws(() => {
            UnsynchronizedLyricsFrame.fromOffsetRawData(data, Number.MAX_SAFE_INTEGER + 1, header);
        });
    }

    @test
    public fromOffsetRawData_invalidHeader_throws() {
        // Arrange
        const data = ByteVector.empty();

        // Act/Assert
        assert.throws(() => { UnsynchronizedLyricsFrame.fromOffsetRawData(data, 0, null); });
        assert.throws(() => { UnsynchronizedLyricsFrame.fromOffsetRawData(data, 0, undefined); });
    }

    @test
    public fromOffsetRawData_missingDescription_returnsValidFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.USLT, 4);
        header.frameSize = 7;
        const data = ByteVector.concatenate(
            0x00, 0x00,                                     // Offset bytes
            header.render(4),                               // Header
            StringType.Latin1,                                      // Encoding
            ByteVector.fromString("eng", StringType.Latin1),    // Language
            ByteVector.fromString("foo")                        // Content
        );

        // Act
        const frame = UnsynchronizedLyricsFrame.fromOffsetRawData(data, 2, header);

        // Assert
        assert.isOk(frame);
        assert.equal(frame.frameClassType, FrameClassType.UnsynchronizedLyricsFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.USLT));

        assert.strictEqual(frame.description, "");
        assert.strictEqual(frame.language, "eng");
        assert.strictEqual(frame.text, "foo");
        assert.strictEqual(frame.textEncoding, StringType.Latin1);
    }

    @test
    public fromOffsetRawData_withDescription_returnsValidFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.USLT, 4);
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
        const frame = UnsynchronizedLyricsFrame.fromOffsetRawData(data, 2, header);

        // Assert
        assert.isOk(frame);
        assert.equal(frame.frameClassType, FrameClassType.UnsynchronizedLyricsFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.USLT));

        assert.strictEqual(frame.description, "foo");
        assert.strictEqual(frame.language, "eng");
        assert.strictEqual(frame.text, "bar");
        assert.strictEqual(frame.textEncoding, StringType.Latin1);
    }

    @test
    public fromRawData_invalidData_throws() {
        // Act/Assert
        assert.throws(() => { UnsynchronizedLyricsFrame.fromRawData(null, 0); });
        assert.throws(() => { UnsynchronizedLyricsFrame.fromRawData(undefined, 0); });
    }

    @test
    public fromRawData_invalidVersion_throws() {
        // Arrange
        const data = ByteVector.empty();

        // Act/Assert
        assert.throws(() => { UnsynchronizedLyricsFrame.fromRawData(data, -1); });
        assert.throws(() => { UnsynchronizedLyricsFrame.fromRawData(data, 1.23); });
        assert.throws(() => { UnsynchronizedLyricsFrame.fromRawData(data, 0x100); });
    }

    @test
    public fromRawData_missingDescription_returnsValidFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.USLT, 4);
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
        assert.isOk(frame);
        assert.equal(frame.frameClassType, FrameClassType.UnsynchronizedLyricsFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.USLT));

        assert.strictEqual(frame.description, "");
        assert.strictEqual(frame.language, "eng");
        assert.strictEqual(frame.text, "foo");
        assert.strictEqual(frame.textEncoding, StringType.Latin1);
    }

    @test
    public fromRawData_withDescription_returnsValidFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.USLT, 4);
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
        assert.isOk(frame);
        assert.equal(frame.frameClassType, FrameClassType.UnsynchronizedLyricsFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.USLT));

        assert.strictEqual(frame.description, "foo");
        assert.strictEqual(frame.language, "eng");
        assert.strictEqual(frame.text, "bar");
        assert.strictEqual(frame.textEncoding, StringType.Latin1);
    }
}

@suite(timeout(3000), slow(1000))
class UnsynchronizedLyricsFramePropertiesTests {
    @test
    public setDescription_undefined() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        frame.description = undefined;

        // Assert
        assert.strictEqual(frame.description, "");
    }

    @test
    public setDescription_null() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        frame.description = null;

        // Assert
        assert.strictEqual(frame.description, "");
    }

    @test
    public setDescription_value() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        frame.description = "fux";

        // Assert
        assert.strictEqual(frame.description, "fux");
    }

    @test
    public setLanguage_undefined_returnsXXX() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        frame.language = undefined;

        // Assert
        assert.strictEqual(frame.language, "XXX");
    }

    @test
    public setLanguage_null_returnsXXX() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        frame.language = null;

        // Assert
        assert.strictEqual(frame.language, "XXX");
    }

    @test
    public setLanguage_tooShort_returnsXXX() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        frame.language = "AB";

        // Assert
        assert.strictEqual(frame.language, "XXX");
    }

    @test
    public setLanguage_tooLong_returnsXXX() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        frame.language = "ABCD";

        // Assert
        assert.strictEqual(frame.language, "XXX");
    }

    @test
    public setLanguage_justRight_returnsValue() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        frame.language = "ABC";

        // Assert
        assert.strictEqual(frame.language, "ABC");
    }

    @test
    public setText_undefined() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        frame.text = undefined;

        // Assert
        assert.strictEqual(frame.text, "");
    }

    @test
    public setText_null() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        frame.text = null;

        // Assert
        assert.strictEqual(frame.text, "");
    }

    @test
    public setText_values() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        frame.text = "fux qux quxx";

        // Assert
        assert.strictEqual(frame.text, "fux qux quxx");
    }

    @test
    public setTextEncoding() {
        // Arrange
        const frame = getTestUnsynchronizedLyricsFrame();

        // Act
        frame.textEncoding = StringType.UTF16;

        // Assert
        assert.strictEqual(StringType.UTF16, frame.textEncoding);
    }
}

@suite(timeout(3000), slow(1000))
class UnsynchronizedLyricsFrameMethodTests {
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
        assert.equal(result.frameClassType, FrameClassType.UnsynchronizedLyricsFrame);
        assert.isTrue(ByteVector.equal(result.frameId, FrameTypes.USLT));

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
