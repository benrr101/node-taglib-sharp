import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import FrameConstructorTests from "./frameConstructorTests";
import PropertyTests from "../utilities/propertyTests";
import {Testers} from "../utilities/testers";
import {suite, test} from "mocha-typescript";

import AttachmentFrame from "../../src/id3v2/frames/attachmentFrame";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {IPicture, PictureType} from "../../src/iPicture";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

function getTestFrame() {
    return getCustomTestFrame(
        ByteVector.fromString("foobarbaz"),
        "fux",
        "bux",
        "application/octet-stream",
        PictureType.FrontCover
    );
}

function getCustomTestFrame(data: ByteVector, desc: string, filename: string, mimeType: string, type: PictureType) {
    const mockPicture = TypeMoq.Mock.ofType<IPicture>();
    mockPicture.setup((p) => p.data).returns(() => data);
    mockPicture.setup((p) => p.description).returns(() => desc);
    mockPicture.setup((p) => p.filename).returns(() => filename);
    mockPicture.setup((p) => p.mimeType).returns(() => mimeType);
    mockPicture.setup((p) => p.type).returns(() => type);

    return AttachmentFrame.fromPicture(mockPicture.object);
}

@suite class Id3v2_AttachmentFrame_ConstructorTests extends FrameConstructorTests {
    get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return AttachmentFrame.fromOffsetRawData;
    }

    get fromRawData(): (d: ByteVector, v: number) => Frame {
        return AttachmentFrame.fromRawData;
    }

    @test
    public fromPicture_falsyPicture() {
        // Act / Assert
        Testers.testTruthy((v: IPicture) => { const _ = AttachmentFrame.fromPicture(v); });
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
            Id3v2Settings.defaultEncoding,
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
            Id3v2Settings.defaultEncoding,
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
    public fromRawData_dataTooShort() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        header.frameSize = 3;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromSize(3, 0x00)
        );

        // Act / Assert
        assert.throws(() => { const _ = AttachmentFrame.fromRawData(data, 4); });
    }

    @test
    public fromRawData_apicV4() {
        // Arrange
        const testData = ByteVector.fromString("fuxbuxqux", StringType.Latin1);
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        header.frameSize = 41;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("image/gif", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
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
            PictureType.NotAPicture
        );
    }

    @test
    public fromOffsetRawData_apicV4() {
        // Arrange
        const testData = ByteVector.fromString("fuxbuxqux", StringType.Latin1);
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        header.frameSize = 41;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.UTF16BE,
            ByteVector.fromString("image/gif", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
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

        assert.isTrue(ByteVector.equal(frame.data, d));
        assert.strictEqual(frame.description, desc);
        assert.strictEqual(frame.filename, fn);
        assert.strictEqual(frame.mimeType, mt);
        assert.strictEqual(frame.textEncoding, te);
        assert.strictEqual(frame.type, t);

        assert.strictEqual(frame.frameId, ft);
    }
}

@suite class Id3v2_AttachmentFrame_PropertyTests {
    @test
    public data() {
        // Arrange
        const frame = getTestFrame();
        const get = () => frame.data;
        const set = (v: ByteVector) => { frame.data = v; };

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, ByteVector.fromString("xyz", StringType.Latin1));
        PropertyTests.propertyNormalized(set, get, undefined, ByteVector.empty());
        PropertyTests.propertyNormalized(set, get, null, ByteVector.empty());
    }

    @test
    public description() {
        // Arrange
        const frame = getTestFrame();
        const get = () => frame.description;
        const set = (v: string) => { frame.description = v; };

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, "its funky enough");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public filename() {
        // Arrange
        const frame = getTestFrame();
        const get = () => frame.filename;
        const set = (v: string) => { frame.filename = v; };

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, "the choice is yours (revisited)");
        PropertyTests.propertyRoundTrip(set, get, undefined);
        PropertyTests.propertyRoundTrip(set, get, null);
    }

    @test
    public mimeType() {
        // Arrange
        const frame = getTestFrame();
        const get = () => frame.mimeType;
        const set = (v: string) => { frame.mimeType = v; };

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, "chief rocka");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }

    @test
    public textEncoding() {
        // Arrange
        const frame = getTestFrame();

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF8
        );
    }

    @test
    public type_setToAPicture_frameIdDoesNotChange() {
        // Arrange
        const frame = getTestFrame();

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { frame.type = v; },
            () => frame.type,
            PictureType.BackCover
        );
        assert.strictEqual(frame.frameId, FrameIdentifiers.APIC);
    }

    @test
    public type_setToNotAPicture_frameIdChanges() {
        // Arrange
        const frame = getTestFrame();

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { frame.type = v; },
            () => frame.type,
            PictureType.NotAPicture
        );
        assert.strictEqual(frame.frameId, FrameIdentifiers.GEOB);
    }

    @test
    public type_setToNotAPictureAndBack_frameIdChanges() {
        // Arrange
        const frame = getTestFrame();
        const set = (v: PictureType) => { frame.type = v; };
        const get = () => frame.type;

        // Act
        PropertyTests.propertyRoundTrip(set, get, PictureType.NotAPicture);
        assert.strictEqual(frame.frameId, FrameIdentifiers.GEOB);
        PropertyTests.propertyRoundTrip(set, get, PictureType.BackCover);
        assert.strictEqual(frame.frameId, FrameIdentifiers.APIC);
    }
}

@suite class Id3v2_AttachmentFrame_MethodTests {
    @test
    public clone_fromPictureUnread() {
        // Arrange
        const data = ByteVector.fromString("foobarbaz");
        const mockPicture = TypeMoq.Mock.ofType<IPicture>();
        mockPicture.setup((p) => p.data).returns(() => data);
        mockPicture.setup((p) => p.description).returns(() => "fux");
        mockPicture.setup((p) => p.filename).returns(() => "bux");
        mockPicture.setup((p) => p.mimeType).returns(() => "application/octet-stream");
        mockPicture.setup((p) => p.type).returns(() => PictureType.FrontCover);

        const frame =  AttachmentFrame.fromPicture(mockPicture.object);

        // Act
        const output = <AttachmentFrame> frame.clone();

        // Assert
        assert.isOk(output);
        assert.equal(output.frameClassType, FrameClassType.AttachmentFrame);

        assert.isTrue(ByteVector.equal(output.data, frame.data));
        assert.strictEqual(output.description, frame.description);
        assert.strictEqual(output.filename, frame.filename);
        assert.strictEqual(output.mimeType, frame.mimeType);
        assert.strictEqual(output.textEncoding, frame.textEncoding);
        assert.strictEqual(output.type, frame.type);
        assert.strictEqual(frame.frameId, frame.frameId);
    }

    @test
    public clone_fromRawDataUnread() {
        // Arrange
        const testData = ByteVector.fromString("fuxbuxqux", StringType.Latin1);
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        header.frameSize = 41;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("image/gif", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            PictureType.Artist,
            ByteVector.fromString("foobarbaz", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            testData
        );
        const frame = AttachmentFrame.fromRawData(data, 4);

        // Act
        const output = <AttachmentFrame> frame.clone();

        // Assert
        assert.isOk(output);
        assert.equal(output.frameClassType, FrameClassType.AttachmentFrame);

        assert.isTrue(ByteVector.equal(output.data, frame.data));
        assert.strictEqual(output.description, frame.description);
        assert.strictEqual(output.filename, frame.filename);
        assert.strictEqual(output.mimeType, frame.mimeType);
        assert.strictEqual(output.textEncoding, frame.textEncoding);
        assert.strictEqual(output.type, frame.type);
        assert.strictEqual(frame.frameId, frame.frameId);
    }

    @test
    public clone_alreadyRead() {
        // Arrange
        const frame = getTestFrame();
        const _ = frame.data;    // force a raw load

        // Act
        const output = <AttachmentFrame> frame.clone();

        // Assert
        assert.isOk(output);
        assert.equal(output.frameClassType, FrameClassType.AttachmentFrame);

        assert.isTrue(ByteVector.equal(output.data, frame.data));
        assert.strictEqual(output.description, frame.description);
        assert.strictEqual(output.filename, frame.filename);
        assert.strictEqual(output.mimeType, frame.mimeType);
        assert.strictEqual(output.textEncoding, frame.textEncoding);
        assert.strictEqual(output.type, frame.type);
        assert.strictEqual(frame.frameId, frame.frameId);
    }

    @test
    public find_falsyFrames() {
        // Act / Assert
        assert.throws(() => { AttachmentFrame.find(undefined); });
        assert.throws(() => { AttachmentFrame.find(null); });
    }

    @test
    public find_noFrames() {
        // Arrange
        const frames: AttachmentFrame[] = [];

        // Act
        const output = AttachmentFrame.find(frames);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_noMatchByDescription() {
        // Arrange
        const frame1 = getTestFrame();
        frame1.description = "fux";
        frame1.type = PictureType.Artist;
        const frame2 = getTestFrame();
        frame2.description = "bux";
        frame2.type = PictureType.Artist;

        const frames = [frame1, frame2];

        // Act
        const output = AttachmentFrame.find(frames, "qux", PictureType.Artist);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_noMatchByType() {
        const frame1 = getTestFrame();
        frame1.description = "qux";
        frame1.type = PictureType.FrontCover;
        const frame2 = getTestFrame();
        frame2.description = "qux";
        frame2.type = PictureType.BackCover;

        const frames = [frame1, frame2];

        // Act
        const output = AttachmentFrame.find(frames, "qux", PictureType.Artist);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_matchWithoutDescription() {
        const frame1 = getTestFrame();
        frame1.type = PictureType.FrontCover;
        const frame2 = getTestFrame();
        frame2.type = PictureType.BackCover;

        const frames = [frame1, frame2];

        // Act
        const output = AttachmentFrame.find(frames, undefined, PictureType.BackCover);

        // Assert
        assert.strictEqual(output, frame2);
    }

    @test
    public find_matchWithoutType() {
        const frame1 = getTestFrame();
        frame1.description = "bux";
        frame1.type = PictureType.FrontCover;
        const frame2 = getTestFrame();
        frame2.description = "qux";
        frame2.type = PictureType.BackCover;

        const frames = [frame1, frame2];

        // Act
        const output = AttachmentFrame.find(frames, "qux");

        // Assert
        assert.strictEqual(output, frame2);
    }

    @test
    public find_matchWithoutEither() {
        const frame1 = getTestFrame();
        frame1.description = "bux";
        frame1.type = PictureType.FrontCover;
        const frame2 = getTestFrame();
        frame2.description = "qux";
        frame2.type = PictureType.BackCover;

        const frames = [frame1, frame2];

        // Act
        const output = AttachmentFrame.find(frames);

        // Assert
        assert.strictEqual(output, frame1);
    }

    @test
    public render_apicV2InvalidMimeType_correctsEncoding() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux");
        const frame = getCustomTestFrame(data, "foo", "bar", "this/is_not/a_mimetype", PictureType.FrontCover);

        // Act
        const output = frame.render(2);

        // Assert
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        header.frameSize = 24;
        const expected = ByteVector.concatenate(
            header.render(2),
            StringType.UTF16,
            ByteVector.fromString("XXX"),
            PictureType.FrontCover,
            ByteVector.fromString("foo", StringType.UTF16),
            ByteVector.getTextDelimiter(StringType.UTF16),
            data
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_apicV2ValidMimeType_correctsEncoding() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux");
        const frame = getCustomTestFrame(data, "foo", "bar", "image/gif", PictureType.FrontCover);

        // Act
        const output = frame.render(2);

        // Assert
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        header.frameSize = 24;
        const expected = ByteVector.concatenate(
            header.render(2),
            StringType.UTF16,
            ByteVector.fromString("GIF"),
            PictureType.FrontCover,
            ByteVector.fromString("foo", StringType.UTF16),
            ByteVector.getTextDelimiter(StringType.UTF16),
            data
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_apicV4() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux");
        const frame = getCustomTestFrame(data, "foo", "bar", "image/gif", PictureType.FrontCover);

        // Act
        const output = frame.render(4);

        // Assert
        const header = new Id3v2FrameHeader(FrameIdentifiers.APIC);
        header.frameSize = 25;
        const expected = ByteVector.concatenate(
            header.render(4),
            Id3v2Settings.defaultEncoding,
            ByteVector.fromString("image/gif"),
            ByteVector.getTextDelimiter(StringType.Latin1),
            PictureType.FrontCover,
            ByteVector.fromString("foo", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            data
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_geobNoMimeType() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux");
        const frame = getCustomTestFrame(data, undefined, undefined, undefined, PictureType.NotAPicture);

        // Act
        const output = frame.render(4);

        // Assert
        const header = new Id3v2FrameHeader(FrameIdentifiers.GEOB);
        header.frameSize = 13;
        const expected = ByteVector.concatenate(
            header.render(4),
            Id3v2Settings.defaultEncoding,
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),
            data
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_geobWithMimeType() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux");
        const frame = getCustomTestFrame(data, undefined, undefined, "image/gif", PictureType.NotAPicture);

        // Act
        const output = frame.render(4);

        // Assert
        const header = new Id3v2FrameHeader(FrameIdentifiers.GEOB);
        header.frameSize = 22;
        const expected = ByteVector.concatenate(
            header.render(4),
            Id3v2Settings.defaultEncoding,
            ByteVector.fromString("image/gif", Id3v2Settings.defaultEncoding),
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),
            data
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_geobWithMimeTypeAndFileName() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux");
        const frame = getCustomTestFrame(data, undefined, "file.gif", "image/gif", PictureType.NotAPicture);

        // Act
        const output = frame.render(4);

        // Assert
        const header = new Id3v2FrameHeader(FrameIdentifiers.GEOB);
        header.frameSize = 30;
        const expected = ByteVector.concatenate(
            header.render(4),
            Id3v2Settings.defaultEncoding,
            ByteVector.fromString("image/gif", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("file.gif", Id3v2Settings.defaultEncoding),
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),
            data
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_geobWithMimeTypeAndFileNameAndDescription() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux");
        const frame = getCustomTestFrame(data, "foobarbaz", "file.gif", "image/gif", PictureType.NotAPicture);

        // Act
        const output = frame.render(4);

        // Assert
        const header = new Id3v2FrameHeader(FrameIdentifiers.GEOB);
        header.frameSize = 39;
        const expected = ByteVector.concatenate(
            header.render(4),
            Id3v2Settings.defaultEncoding,
            ByteVector.fromString("image/gif", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("file.gif", Id3v2Settings.defaultEncoding),
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),
            ByteVector.fromString("foobarbaz", Id3v2Settings.defaultEncoding),
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),
            data
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }
}
