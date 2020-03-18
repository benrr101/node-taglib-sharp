import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import CommentsFrame from "../../src/id3v2/frames/commentsFrame";
import FrameConstructorTests from "./frameConstructorTests";
import PropertyTests from "../utilities/propertyTests";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";

// Setup Chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

function getTestFrame(): CommentsFrame {
    const header = new Id3v2FrameHeader(FrameIdentifiers.COMM);
    header.frameSize = 11;
    const data = ByteVector.concatenate(
        header.render(4),
        StringType.Latin1,
        ByteVector.fromString("eng", StringType.Latin1),
        ByteVector.fromString("foo", StringType.Latin1),
        ByteVector.getTextDelimiter(StringType.Latin1),
        ByteVector.fromString("bar", StringType.Latin1)
    );

    return CommentsFrame.fromRawData(data, 4);
}

@suite(timeout(3000), slow(1000))
class Id3v2_CommentsFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return CommentsFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return CommentsFrame.fromRawData;
    }

    @test
    public fromDescription_falsyDescription() {
        // Act/Assert
        assert.throws(() => { CommentsFrame.fromDescription(undefined, undefined, undefined); });
        assert.throws(() => { CommentsFrame.fromDescription(null, undefined, undefined); });
    }

    @test
    public fromDescription_withoutLanguage() {
        // Arrange
        const description = "fux";

        // Act
        const frame = CommentsFrame.fromDescription(description);

        // Assert
        this.validateFrame(frame, description, "XXX", Id3v2Settings.defaultEncoding, "");
    }

    @test
    public fromDescription_withLanguageWithoutEncoding() {
        // Arrange
        const description = "fux";
        const language = "bux";

        // Act
        const frame = CommentsFrame.fromDescription(description, language);

        // Assert
        this.validateFrame(frame, description, language, Id3v2Settings.defaultEncoding, "");
    }

    @test
    public fromDescription_withLanguageWithEncoding() {
        // Arrange
        const description = "fux";
        const language = "bux";
        const encoding = StringType.Latin1;

        // Act
        const frame = CommentsFrame.fromDescription(description, language, encoding);

        // Assert
        this.validateFrame(frame, description, language, encoding, "");
    }

    @test
    public fromOffsetRawData_tooFewBytes_throws() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM);
        header.frameSize = 1;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.Latin1
        );

        // Act/Assert
        assert.throws(() => { CommentsFrame.fromOffsetRawData(data, 2, header, 4); });
    }

    @test
    public fromOffsetRawData_noData_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM);
        header.frameSize = 4;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1)
        );

        // Act
        const frame = CommentsFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        this.validateFrame(frame, "", "eng", StringType.Latin1, "");
    }

    @test
    public fromOffsetRawData_oneData_returnsFrameWithoutDescription() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM);
        header.frameSize = 7;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1),
            ByteVector.fromString("fux", StringType.Latin1)
        );

        // Act
        const frame = CommentsFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        this.validateFrame(frame, "", "eng", StringType.Latin1, "fux");
    }

    @test
    public fromOffsetRawData_twoData_returnsFrameWithDescriptionAndText() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bux", StringType.Latin1)
        );

        // Act
        const frame = CommentsFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        this.validateFrame(frame, "fux", "eng", StringType.Latin1, "bux");
    }

    @test
    public fromOffsetRawData_threeData_returnsFrameWithDescriptionAndText() {
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM);
        header.frameSize = 12;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            0x00, 0x00,
            ByteVector.fromString("eng", StringType.Latin1),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1)
        );

        // Act
        const frame = CommentsFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        this.validateFrame(frame, "fux", "eng", StringType.Latin1, "bux");
    }

    @test
    public fromRawData_tooFewBytes_throws() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM);
        header.frameSize = 1;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1
        );

        // Act/Assert
        assert.throws(() => { CommentsFrame.fromRawData(data, 4); });
    }

    @test
    public fromRawData_noData_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM);
        header.frameSize = 4;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1)
        );

        // Act
        const frame = CommentsFrame.fromRawData(data, 4);

        // Assert
        this.validateFrame(frame, "", "eng", StringType.Latin1, "");
    }

    @test
    public fromRawData_oneData_returnsFrameWithoutDescription() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM);
        header.frameSize = 7;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1),
            ByteVector.fromString("fux", StringType.Latin1),
        );

        // Act
        const frame = CommentsFrame.fromRawData(data, 4);

        // Assert
        this.validateFrame(frame, "", "eng", StringType.Latin1, "fux");
    }

    @test
    public fromRawData_twoData_returnsFrameWithDescriptionAndText() {
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bux", StringType.Latin1)
        );

        // Act
        const frame = CommentsFrame.fromRawData(data, 4);

        // Assert
        this.validateFrame(frame, "fux", "eng", StringType.Latin1, "bux");
    }

    @test
    public fromRawData_threeData_returnsFrameWithDescriptionAndText() {
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM);
        header.frameSize = 12;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1)
        );

        // Act
        const frame = CommentsFrame.fromRawData(data, 4);

        // Assert
        this.validateFrame(frame, "fux", "eng", StringType.Latin1, "bux");
    }

    private validateFrame(
        frame: CommentsFrame,
        expectedDesc: string,
        expectedLang: string,
        expectedEncoding: StringType,
        expectedText: string
    ) {
        assert.isOk(frame);
        assert.equal(frame.frameClassType, FrameClassType.CommentsFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.COMM);

        assert.strictEqual(frame.description, expectedDesc);
        assert.strictEqual(frame.language, expectedLang);
        assert.strictEqual(frame.textEncoding, expectedEncoding);
        assert.strictEqual(frame.text, expectedText);
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_CommentsFrame_PropertyTests {
    @test
    public description() {
        const frame = getTestFrame();

        const set = (v: string) => { frame.description = v; };
        const get = () => frame.description;
        PropertyTests.propertyRoundTrip(set, get, "fux");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public language() {
        const frame = getTestFrame();

        const set = (v: string) => { frame.language = v; };
        const get = () => frame.language;
        PropertyTests.propertyRoundTrip(set, get, "jpn");
        PropertyTests.propertyNormalized(set, get, undefined, "XXX");
        PropertyTests.propertyNormalized(set, get, null, "XXX");
        PropertyTests.propertyNormalized(set, get, "ab", "XXX");
        PropertyTests.propertyNormalized(set, get, "abcd", "abc");
    }

    @test
    public text() {
        const frame = getTestFrame();

        const set = (v: string) => { frame.text = v; };
        const get = () => frame.text;
        PropertyTests.propertyRoundTrip(set, get, "fux");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public textEncoding() {
        const frame = getTestFrame();

        PropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16
        );
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_CommentsFrame_MethodTests {
    @test
    public find_falsyFrames() {
        // Act/Assert
        assert.throws(() => { CommentsFrame.find(undefined, "fux"); });
        assert.throws(() => { CommentsFrame.find(null, "fux"); });
    }

    @test
    public find_frameDoesNotExist() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "jpn"),    // nothing matches
            CommentsFrame.fromDescription("bux", "jpn"),    // desc matches, not language
            CommentsFrame.fromDescription("qux", "eng")     // language matches, not desc
        ];

        // Act
        const output = CommentsFrame.find(frames, "bux", "eng");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_frameExistsWithoutLanguage() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "jpn"),    // nothing matches
            CommentsFrame.fromDescription("bux", "jpn"),    // desc matches, not language
            CommentsFrame.fromDescription("qux", "jpn")     // desc does not match
        ];

        // Act
        const output = CommentsFrame.find(frames, "bux");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[1]);
    }

    @test
    public find_frameExistsWithLanguage() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "jpn"),    // nothing matches
            CommentsFrame.fromDescription("bux", "jpn"),    // desc matches, not language
            CommentsFrame.fromDescription("qux", "eng"),    // language matches, not desc
            CommentsFrame.fromDescription("bux", "eng")     // everything matches
        ];

        // Act
        const output = CommentsFrame.find(frames, "bux", "eng");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[3]);
    }

    @test
    public findAll_falsyFrames() {
        // Act/Assert
        assert.throws(() => { CommentsFrame.findAll(undefined, "fux"); });
        assert.throws(() => { CommentsFrame.findAll(null, "fux"); });
    }

    @test
    public findAll_frameDoesNotExist() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "jpn"),
            CommentsFrame.fromDescription("bux", "jpn"),
            CommentsFrame.fromDescription("qux", "eng")
        ];

        // Act
        const output = CommentsFrame.findAll(frames, "fux", "eng");

        // Assert
        assert.isArray(output);
        assert.isEmpty(output);
    }

    @test
    public findAll_frameExistsWithoutLanguage() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "jpn"),
            CommentsFrame.fromDescription("bux", "jpn"),
            CommentsFrame.fromDescription("bux", "eng"),
            CommentsFrame.fromDescription("qux", "eng")
        ];

        // Act
        const output = CommentsFrame.findAll(frames, "bux");

        // Assert
        assert.isArray(output);
        assert.sameMembers(output, [frames[1], frames[2]]);
    }

    @test
    public findAll_frameExistsWithLanguage() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "jpn"),
            CommentsFrame.fromDescription("bux", "jpn"),
            CommentsFrame.fromDescription("bux", "eng"),
            CommentsFrame.fromDescription("qux", "eng")
        ];

        // Act
        const output = CommentsFrame.findAll(frames, "bux", "eng");

        // Assert
        assert.isArray(output);
        assert.sameMembers(output, [frames[2]]);
    }

    @test
    public findPreferred_noFrames_returnsUndefined() {
        // Arrange
        const frames: CommentsFrame[] = [];

        // Act
        const output = CommentsFrame.findPreferred(frames, "fux", "eng");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public findPreferred_firstFrameMatch() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "eng")
        ];

        // Act
        const output = CommentsFrame.findPreferred(frames, "bux", "jpn");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[0]);
    }

    @test
    public findPreferred_languageMatch() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "eng"),
            CommentsFrame.fromDescription("bux", "eng"),
            CommentsFrame.fromDescription("fux", "jpn"),
        ];

        // Act
        const output = CommentsFrame.findPreferred(frames, "bux", "jpn");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[2]);
    }

    @test
    public findPreferred_descriptionMatch() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "eng"),
            CommentsFrame.fromDescription("bux", "eng"),
        ];

        // Act
        const output = CommentsFrame.findPreferred(frames, "bux", "jpn");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[1]);
    }

    @test
    public findPreferred_perfectMatch() {
        // Arrange
        const frames = [
            CommentsFrame.fromDescription("fux", "eng"),
            CommentsFrame.fromDescription("fux", "jpn"),
            CommentsFrame.fromDescription("bux", "eng"),
            CommentsFrame.fromDescription("bux", "jpn"),
        ];

        // Act
        const output = CommentsFrame.findPreferred(frames, "bux", "jpn");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[3]);
    }

    @test
    public clone() {
        // Arrange
        const frame = CommentsFrame.fromDescription("fux", "bux", StringType.UTF16BE);
        frame.text = "qux";

        // Act
        const output = <CommentsFrame> frame.clone();

        // Assert
        assert.isOk(output);
        assert.equal(output.frameClassType, FrameClassType.CommentsFrame);
        assert.strictEqual(output.frameId, FrameIdentifiers.COMM);

        assert.strictEqual(output.description, frame.description);
        assert.strictEqual(output.language, frame.language);
        assert.strictEqual(output.textEncoding, frame.textEncoding);
        assert.strictEqual(output.text, frame.text);
    }

    @test
    public render() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.COMM);
        header.frameSize = 11;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bux", StringType.Latin1)
        );
        const frame = CommentsFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.isOk(output);
        assert.isTrue(ByteVector.equal(output, data));

    }
}
