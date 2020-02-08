import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import {slow, suite, test, timeout} from "mocha-typescript";

import AttachmentFrame from "../../src/id3v2/frames/attachmentFrame";
import FrameConstructorTests from "./frameConstructorTests";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {IPicture, PictureType} from "../../src/picture";
import Id3v2TagSettings from "../../src/id3v2/id3v2TagSettings";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class Id3v2_AttachmentFrame_ConstructorTests extends FrameConstructorTests {
    get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return AttachmentFrame.fromOffsetRawData;
    }

    get fromRawData(): (d: ByteVector, v: number) => Frame {
        return AttachmentFrame.fromRawData;
    }

    @test
    public fromPicture_falsyPicture() {
        // Act / Assert
        assert.throws(() => { const _ = AttachmentFrame.fromPicture(null); });
        assert.throws(() => { const _ = AttachmentFrame.fromPicture(undefined); });
    }

    @test
    public fromPicture_validPicture() {
        // Arrange
        const data = ByteVector.fromString("foobarbaz");
        const mockPicture = TypeMoq.Mock.ofType<IPicture>();
        mockPicture.setup((p) => p.data).returns(() => data);
        mockPicture.setup((p) => p.description).returns(() => "fux");
        mockPicture.setup((p) => p.filename).returns(() => "bux");
        mockPicture.setup((p) => p.mimeType).returns(() => "application/octet-stream");
        mockPicture.setup((p) => p.type).returns(() => PictureType.FrontCover);

        // Act
        const frame = AttachmentFrame.fromPicture(mockPicture.object);

        // Assert
        this.verifyFrame(
            frame,
            FrameIdentifiers.APIC,
            data,
            "fux",
            "bux",
            "application/octet-stream",
            Id3v2TagSettings.defaultEncoding,
            PictureType.FrontCover
        );
    }

    @test
    public fromPicture_notAPicture() {
        // Arrange
        const data = ByteVector.fromString("foobarbaz");
        const mockPicture = TypeMoq.Mock.ofType<IPicture>();
        mockPicture.setup((p) => p.data).returns(() => data);
        mockPicture.setup((p) => p.description).returns(() => "fux");
        mockPicture.setup((p) => p.filename).returns(() => "bux");
        mockPicture.setup((p) => p.mimeType).returns(() => "application/octet-stream");
        mockPicture.setup((p) => p.type).returns(() => PictureType.NotAPicture);

        // Act
        const frame = AttachmentFrame.fromPicture(mockPicture.object);

        // Assert
        this.verifyFrame(
            frame,
            FrameIdentifiers.GEOB,
            data,
            "fux",
            "bux",
            "application/octet-stream",
            Id3v2TagSettings.defaultEncoding,
            PictureType.NotAPicture
        );
    }

    @test
    public fromRawData_invalidFrameIdentifier() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX);
        header.frameSize = 10;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromSize(10)
        );

        // Act / Assert
        const frame = AttachmentFrame.fromRawData(data, 4);
        assert.throws(() => { const _ = frame.type; });
    }

    @test
    public fromRawData_apicV4() {
        // Arrange
        const testData = ByteVector.fromString("fuxbuxqux", StringType.Latin1);
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        header.frameSize = 40;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("image/gif", StringType.Latin1),
            PictureType.Artist,
            ByteVector.fromString("foobarbaz", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            testData
        );

        // Act
        const frame = AttachmentFrame.fromRawData(data, 4);

        // Assert
        this.verifyFrame(
            frame,
            FrameIdentifiers.APIC,
            testData,
            "foobarbaz",
            undefined,
            "image/gif",
            StringType.UTF16BE,
            PictureType.Artist
        );
    }

    @test
    public fromRawData_apicV2() {
        // Arrange
        const testData = ByteVector.fromString("fuxbuxqux", StringType.Latin1);
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        header.frameSize = 34;
        const data = ByteVector.concatenate(
            header.render(2),
            StringType.UTF16BE,
            ByteVector.fromString("GIF", StringType.Latin1),
            PictureType.Artist,
            ByteVector.fromString("foobarbaz", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            testData
        );

        // Act
        const frame = AttachmentFrame.fromRawData(data, 2);

        // Assert
        this.verifyFrame(
            frame,
            FrameIdentifiers.APIC,
            testData,
            "foobarbaz",
            undefined,
            "image/gif",
            StringType.UTF16BE,
            PictureType.Artist
        );
    }

    @test
    public fromRawData_geob() {
        // Arrange
        const testData = ByteVector.fromString("fuxbuxqux", StringType.Latin1);
        const header = new Id3v2FrameHeader(FrameIdentifiers.GEOB);
        header.frameSize = 60;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("image/gif", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("image.gif", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("foobarbaz", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            testData
        );

        // Act
        const frame = AttachmentFrame.fromRawData(data, 4);

        // Assert
        this.verifyFrame(
            frame,
            FrameIdentifiers.GEOB,
            testData,
            "foobarbaz",
            "image.gif",
            "image/gif",
            StringType.UTF16BE,
            PictureType.Artist
        );
    }

    @test
    public fromOffsetRawData_apicV4() {
        // Arrange
        const testData = ByteVector.fromString("fuxbuxqux", StringType.Latin1);
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        header.frameSize = 40;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.UTF16BE,
            ByteVector.fromString("image/gif", StringType.Latin1),
            PictureType.Artist,
            ByteVector.fromString("foobarbaz", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            testData
        );

        // Act
        const frame = AttachmentFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        this.verifyFrame(
            frame,
            FrameIdentifiers.APIC,
            testData,
            "foobarbaz",
            undefined,
            "image/gif",
            StringType.UTF16BE,
            PictureType.Artist
        );
    }

    private verifyFrame(
        frame: AttachmentFrame,
        ft: FrameIdentifier,
        d: ByteVector,
        desc: string,
        fn: string,
        mt: string,
        te: StringType,
        t: PictureType
    ) {
        assert.isOk(frame);
        assert.equal(frame.frameClassType, FrameClassType.AttachmentFrame);
        assert.strictEqual(frame.frameId, ft);

        assert.isTrue(ByteVector.equal(frame.data, d));
        assert.strictEqual(frame.description, desc);
        assert.strictEqual(frame.filename, fn);
        assert.strictEqual(frame.mimeType, mt);
        assert.strictEqual(frame.textEncoding, te);
        assert.strictEqual(frame.type, t);
    }
}


