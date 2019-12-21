import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import CommentsFrame from "../../src/id3v2/frames/commentsFrame";
import FrameConstructorTests from "./frameConstructorTests";
import FrameTypes from "../../src/id3v2/frameTypes";
import Id3v2TagSettings from "../../src/id3v2/id3v2TagSettings";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";

// Setup Chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class CommentsFrameConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader) => Frame {
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
        CommentsFrameConstructorTests.validateFrame(frame, description, "XXX", Id3v2TagSettings.defaultEncoding, "");
    }

    @test
    public fromDescription_withLanguageWithoutEncoding() {
        // Arrange
        const description = "fux";
        const language = "bux";

        // Act
        const frame = CommentsFrame.fromDescription(description, language);

        // Assert
        CommentsFrameConstructorTests.validateFrame(frame, description, language, Id3v2TagSettings.defaultEncoding, "");
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
        CommentsFrameConstructorTests.validateFrame(frame, description, language, encoding, "");
    }

    @test
    public fromOffsetRawData_tooFewBytes_throws() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.COMM, 4);
        header.frameSize = 1;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.Latin1
        );

        // Act/Assert
        assert.throws(() => { CommentsFrame.fromOffsetRawData(data, 2, header); });
    }

    @test
    public fromOffsetRawData_noData_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.COMM, 4);
        header.frameSize = 4;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1)
        );

        // Act
        const frame = CommentsFrame.fromOffsetRawData(data, 2, header);

        // Assert
        CommentsFrameConstructorTests.validateFrame(frame, "", "eng", StringType.Latin1, "");
    }

    @test
    public fromOffsetRawData_oneData_returnsFrameWithoutDescription() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.COMM, 4);
        header.frameSize = 7;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1),
            ByteVector.fromString("fux", StringType.Latin1)
        );

        // Act
        const frame = CommentsFrame.fromOffsetRawData(data, 2, header);

        // Assert
        CommentsFrameConstructorTests.validateFrame(frame, "", "eng", StringType.Latin1, "fux");
    }

    @test
    public fromOffsetRawData_twoData_returnsFrameWithDescriptionAndText() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.COMM, 4);
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
        const frame = CommentsFrame.fromOffsetRawData(data, 2, header);

        // Assert
        CommentsFrameConstructorTests.validateFrame(frame, "fux", "eng", StringType.Latin1, "bux");
    }

    @test
    public fromOffsetRawData_threeData_returnsFrameWithDescriptionAndText() {
        const header = new Id3v2FrameHeader(FrameTypes.COMM, 4);
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
        const frame = CommentsFrame.fromOffsetRawData(data, 2, header);

        // Assert
        CommentsFrameConstructorTests.validateFrame(frame, "fux", "eng", StringType.Latin1, "bux");
    }

    @test
    public fromRawData_tooFewBytes_throws() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.COMM, 4);
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
        const header = new Id3v2FrameHeader(FrameTypes.COMM, 4);
        header.frameSize = 4;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.Latin1,
            ByteVector.fromString("eng", StringType.Latin1)
        );

        // Act
        const frame = CommentsFrame.fromRawData(data, 4);

        // Assert
        CommentsFrameConstructorTests.validateFrame(frame, "", "eng", StringType.Latin1, "");
    }

    @test
    public fromRawData_oneData_returnsFrameWithoutDescription() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.COMM, 4);
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
        CommentsFrameConstructorTests.validateFrame(frame, "", "eng", StringType.Latin1, "fux");
    }

    @test
    public fromRawData_twoData_returnsFrameWithDescriptionAndText() {
        const header = new Id3v2FrameHeader(FrameTypes.COMM, 4);
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
        CommentsFrameConstructorTests.validateFrame(frame, "fux", "eng", StringType.Latin1, "bux");
    }

    @test
    public fromRawData_threeData_returnsFrameWithDescriptionAndText() {
        const header = new Id3v2FrameHeader(FrameTypes.COMM, 4);
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
        CommentsFrameConstructorTests.validateFrame(frame, "fux", "eng", StringType.Latin1, "bux");
    }

    private static validateFrame(
        frame: CommentsFrame,
        expectedDesc: string,
        expectedLang: string,
        expectedEncoding: StringType,
        expectedText: string
    ) {
        assert.isOk(frame);
        assert.equal(frame.frameClassType, FrameClassType.CommentsFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.COMM));

        assert.strictEqual(frame.description, expectedDesc);
        assert.strictEqual(frame.language, expectedLang);
        assert.strictEqual(frame.textEncoding, expectedEncoding);
        assert.strictEqual(frame.text, expectedText);
    }
}
