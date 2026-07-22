import * as TypeMoq from "typemoq";
import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import AttachmentFrame from "../../src/id3v2/frames/attachmentFrame";
import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import FrameHeader from "../../src/id3v2/frames/frameHeader";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import PropertyTests from "../utilities/propertyTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {FrameFlags} from "../../src/id3v2/enums";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {IPicture, Picture, PictureType} from "../../src/picture";
import {Testers} from "../utilities/testers";

const getTestFrame = () => getCustomTestFrame(
    ByteVector.fromString("foobarbaz", StringType.UTF8),
    "fux",
    "bux",
    "application/octet-stream",
    PictureType.FrontCover
);

const getCustomTestFrame = (
    data: ByteVector,
    desc: string,
    filename: string,
    mimeType: string,
    type: PictureType
): AttachmentFrame => {
    const mockPicture = TypeMoq.Mock.ofType<IPicture>();
    mockPicture.setup((p) => p.data).returns(() => data);
    mockPicture.setup((p) => p.description).returns(() => desc);
    mockPicture.setup((p) => p.filename).returns(() => filename);
    mockPicture.setup((p) => p.mimeType).returns(() => mimeType);
    mockPicture.setup((p) => p.type).returns(() => type);

    return AttachmentFrame.fromPicture(mockPicture.object);
}

const verifyFrame = (
    frame: AttachmentFrame,
    frameIdentifier: FrameIdentifier,
    data: ByteVector,
    description: string,
    filename: string,
    mimeType: string,
    encoding: StringType,
    pictureType: PictureType
): void => {
    assert.isOk(frame);
    assert.instanceOf<AttachmentFrame>(frame, AttachmentFrame);

    Testers.bvEqual(frame.data, data);
    assert.strictEqual(frame.description, description);
    assert.strictEqual(frame.filename, filename);
    assert.strictEqual(frame.mimeType, mimeType);
    assert.strictEqual(frame.textEncoding, encoding);
    assert.strictEqual(frame.type, pictureType);

    // NOTE: This happens last because the frame identifier can be changed after parsing.
    assert.strictEqual(frame.frameId, frameIdentifier);
}

@suite class Id3v2_AttachmentFrame_ConstructorTests extends FrameConstructorTests {
    get fromFieldBytes(): (h: FrameHeader, d: ByteVector, v: number) => Frame {
        return AttachmentFrame.fromFieldBytes;
    }

    @test
    public fromPicture_falsyPicture() {
        // Act / Assert
        Testers.testTruthy((v: IPicture) => AttachmentFrame.fromPicture(v));
    }

    @test
    public fromPicture_validPicture() {
        // Arrange
        const data = ByteVector.fromString("foobarbaz", StringType.UTF8);
        const mockPicture = TypeMoq.Mock.ofType<IPicture>();
        mockPicture.setup((p) => p.data).returns(() => data);
        mockPicture.setup((p) => p.description).returns(() => "fux");
        mockPicture.setup((p) => p.filename).returns(() => "bux");
        mockPicture.setup((p) => p.mimeType).returns(() => "application/octet-stream");
        mockPicture.setup((p) => p.type).returns(() => PictureType.FrontCover);

        // Act
        const frame = AttachmentFrame.fromPicture(mockPicture.object);

        // Assert
        verifyFrame(
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
        const data = ByteVector.fromString("foobarbaz", StringType.UTF8);
        const mockPicture = TypeMoq.Mock.ofType<IPicture>();
        mockPicture.setup((p) => p.data).returns(() => data);
        mockPicture.setup((p) => p.description).returns(() => "fux");
        mockPicture.setup((p) => p.filename).returns(() => "bux");
        mockPicture.setup((p) => p.mimeType).returns(() => "application/octet-stream");
        mockPicture.setup((p) => p.type).returns(() => PictureType.NotAPicture);

        // Act
        const frame = AttachmentFrame.fromPicture(mockPicture.object);

        // Assert
        verifyFrame(
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

    // NOTE: If you're wondering why we have a test for latin1 vs other encodings, it's b/c the
    //    mimetype detection looks for a 0 to mark the end of the mimetype. If encoding is Latin1,
    //    the first byte of the picture is 0, which we want to make sure isn't mistaken for the end
    //    of the mimetype.

    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_apicV34_latin1Encoding(version: number) {
        // Arrange
        const testData = ByteVector.fromString("fuxbuxqux", StringType.Latin1);
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                      // Text encoding
            ByteVector.fromString("image/gif", StringType.Latin1),  // Mimetype
            ByteVector.getTextDelimiter(StringType.Latin1),         // Mimetype delimiter
            PictureType.Artist,                                     // Type
            ByteVector.fromString("foobarbaz", StringType.Latin1),  // Description
            ByteVector.getTextDelimiter(StringType.Latin1),         // Description delimiter
            testData                                                // Picture bytes
        );
        const header = new FrameHeader(FrameIdentifiers.APIC, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = AttachmentFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        verifyFrame(
            frame,
            FrameIdentifiers.APIC,
            testData,
            "foobarbaz",
            undefined,
            "image/gif",
            StringType.Latin1,
            PictureType.Artist
        );
    }

    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_apicV34_nonLatinEncoding(version: number) {
        // Arrange
        const testData = ByteVector.fromString("fuxbuxqux", StringType.Latin1);
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16BE,                                     // Text encoding
            ByteVector.fromString("image/gif", StringType.Latin1),  // Mimetype
            ByteVector.getTextDelimiter(StringType.Latin1),         // Mimetype delimiter
            PictureType.Artist,                                     // Type
            ByteVector.fromString("foobarbaz", StringType.UTF16BE), // Description
            ByteVector.getTextDelimiter(StringType.UTF16BE),        // Description delimiter
            testData                                                // Picture bytes
        );
        const header = new FrameHeader(FrameIdentifiers.APIC, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = AttachmentFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        verifyFrame(
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

    @params(StringType.Latin1, "single_byte")
    @params(StringType.UTF16BE, "multi_byte")
    public fromFieldBytes_apicV2(encoding: StringType) {
        // Arrange
        const testData = ByteVector.fromString("fuxbuxqux", StringType.Latin1);
        const fieldBytes = ByteVector.concatenate(
            encoding,                                        // Text encoding
            ByteVector.fromString("GIF", StringType.Latin1), // File extension
            PictureType.Artist,                              // Type
            ByteVector.fromString("foobarbaz", encoding),    // Description
            ByteVector.getTextDelimiter(encoding),           // Description delimiter
            testData                                         // Picture bytes
        );
        const header = new FrameHeader(FrameIdentifiers.APIC, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = AttachmentFrame.fromFieldBytes(header, fieldBytes, 2);

        // Assert
        verifyFrame(
            frame,
            FrameIdentifiers.APIC,
            testData,
            "foobarbaz",
            undefined,
            "image/gif",
            encoding,
            PictureType.Artist
        );
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_geob_latinEncoding(version: number) {
        // Arrange
        const testData = ByteVector.fromString("fuxbuxqux", StringType.Latin1);
        const fieldBytes = ByteVector.concatenate(
            StringType.Latin1,                                     // Encoding
            ByteVector.fromString("image/gif", StringType.Latin1), // Mimetype
            ByteVector.getTextDelimiter(StringType.Latin1),        // Mimetype delimiter
            ByteVector.fromString("image.gif", StringType.Latin1), // Filename
            ByteVector.getTextDelimiter(StringType.Latin1),        // Filename delimiter
            ByteVector.fromString("foobarbaz", StringType.Latin1), // Description
            ByteVector.getTextDelimiter(StringType.Latin1),        // Description delimiter
            testData                                               // Attachment bytes
        );
        const header = new FrameHeader(FrameIdentifiers.GEOB, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = AttachmentFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        verifyFrame(
            frame,
            FrameIdentifiers.GEOB,
            testData,
            "foobarbaz",
            "image.gif",
            "image/gif",
            StringType.Latin1,
            PictureType.NotAPicture
        );
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_geob_nonLatinEncoding(version: number) {
        // Arrange
        const testData = ByteVector.fromString("fuxbuxqux", StringType.Latin1);
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16BE,                                     // Encoding
            ByteVector.fromString("image/gif", StringType.Latin1),  // Mimetype
            ByteVector.getTextDelimiter(StringType.Latin1),         // Mimetype delimiter
            ByteVector.fromString("image.gif", StringType.UTF16BE), // Filename
            ByteVector.getTextDelimiter(StringType.UTF16BE),        // Filename delimiter
            ByteVector.fromString("foobarbaz", StringType.UTF16BE), // Description
            ByteVector.getTextDelimiter(StringType.UTF16BE),        // Description delimiter
            testData                                                // Attachment bytes
        );
        const header = new FrameHeader(FrameIdentifiers.GEOB, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = AttachmentFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        verifyFrame(
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
        const data = ByteVector.fromString("foobarbaz", StringType.UTF8);
        const mockPicture = TypeMoq.Mock.ofType<IPicture>();
        mockPicture.setup((p) => p.data).returns(() => data);
        mockPicture.setup((p) => p.description).returns(() => "fux");
        mockPicture.setup((p) => p.filename).returns(() => "bux");
        mockPicture.setup((p) => p.mimeType).returns(() => "application/octet-stream");
        mockPicture.setup((p) => p.type).returns(() => PictureType.FrontCover);

        const frame = AttachmentFrame.fromPicture(mockPicture.object);

        // Act
        const output = <AttachmentFrame> frame.clone();

        // Assert
        verifyFrame(
            output,
            frame.frameId,
            frame.data,
            frame.description,
            frame.filename,
            frame.mimeType,
            frame.textEncoding,
            frame.type
        );
    }

    @test
    public clone_fromFieldBytesUnread() {
        // Arrange
        const testData = ByteVector.fromString("fuxbuxqux", StringType.Latin1);
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16BE,                                     // Encoding
            ByteVector.fromString("image/gif", StringType.Latin1),  // Mimetype
            ByteVector.getTextDelimiter(StringType.Latin1),         // Mimetype delimiter
            PictureType.Artist,                                     // Type
            ByteVector.fromString("foobarbaz", StringType.UTF16BE), // Description
            ByteVector.getTextDelimiter(StringType.UTF16BE),        // Description delimiter
            testData                                                // Picture bytes
        );
        const header = new FrameHeader(FrameIdentifiers.APIC, FrameFlags.None, fieldBytes.length);
        const frame = AttachmentFrame.fromFieldBytes(header, fieldBytes, 4);

        // Act
        const output = <AttachmentFrame> frame.clone();

        // Assert
        verifyFrame(
            output,
            frame.frameId,
            frame.data,
            frame.description,
            frame.filename,
            frame.mimeType,
            frame.textEncoding,
            frame.type
        );
    }

    @test
    public clone_alreadyRead() {
        // Arrange
        const frame = getTestFrame();
        // noinspection JSUnusedLocalSymbols forces a raw load
        const _ = frame.data;

        // Act
        const output = <AttachmentFrame> frame.clone();

        // Assert
        verifyFrame(
            output,
            frame.frameId,
            frame.data,
            frame.description,
            frame.filename,
            frame.mimeType,
            frame.textEncoding,
            frame.type
        );
    }

    @test
    public filterFrames_falsyFrames() {
        Testers.testTruthy((v: Frame[]) => AttachmentFrame.filterFrames(v));
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = AttachmentFrame.filterFrames(frames);

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
        const result = AttachmentFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);

        const pic2 = Picture.fromData(ByteVector.fromUint(8888));
        const frame2 = AttachmentFrame.fromPicture(pic2);

        const frames = [frame1, frame2];

        // Act
        const result = AttachmentFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);

        const pic2 = Picture.fromData(ByteVector.fromUint(8888));
        const frame2 = AttachmentFrame.fromPicture(pic2);

        const pic3 = Picture.fromData(ByteVector.fromUint(9999));
        const frame3 = AttachmentFrame.fromPicture(pic3);

        const frames = [frame1, frame2, frame3];

        // Act
        const result = AttachmentFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const pic1 = Picture.fromData(ByteVector.fromUint(8888));
        const frame1 = AttachmentFrame.fromPicture(pic1);

        const pic2 = Picture.fromData(ByteVector.fromUint(9999));
        const frame2 = AttachmentFrame.fromPicture(pic2);

        const frames = [frame1, frame2];

        // Act
        const result = AttachmentFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @test
    public render_apicV2InvalidMimeType_correctsEncoding() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux", StringType.UTF8);
        const frame = getCustomTestFrame(data, "foo", "bar", "this/is_not/a_mimetype", PictureType.FrontCover);

        // Act
        const output = frame.render(2);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16,                                // Text encoding
            ByteVector.fromString("XXX", StringType.Latin1), // File extension
            PictureType.FrontCover,                          // Type
            ByteVector.fromString("foo", StringType.UTF16),  // Description
            ByteVector.getTextDelimiter(StringType.UTF16),   // Description delimiter
            data                                             // Picture bytes
        );
        const header = new FrameHeader(FrameIdentifiers.APIC, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(2), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @test
    public render_apicV2ValidMimeType_correctsEncoding() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux", StringType.UTF8);
        const frame = getCustomTestFrame(data, "foo", "bar", "image/gif", PictureType.FrontCover);

        // Act
        const output = frame.render(2);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16,                                // Text encoding (corrected)
            ByteVector.fromString("GIF", StringType.Latin1), // File extension
            PictureType.FrontCover,                          // Type
            ByteVector.fromString("foo", StringType.UTF16),  // Description
            ByteVector.getTextDelimiter(StringType.UTF16),   // Description delimiter
            data                                             // Picture bytes
        );
        const header = new FrameHeader(FrameIdentifiers.APIC, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(2), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @test
    public render_apic_v3() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux", StringType.UTF8);
        const frame = getCustomTestFrame(data, "foo", "bar", "image/gif", PictureType.FrontCover);

        // Act
        const output = frame.render(3);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16,                                      // Encoding
            ByteVector.fromString("image/gif", StringType.Latin1), // Mimetype
            ByteVector.getTextDelimiter(StringType.Latin1),        // Mimetype delimiter
            PictureType.FrontCover,                                // Type
            ByteVector.fromString("foo", StringType.UTF16),        // Description
            ByteVector.getTextDelimiter(StringType.UTF16),         // Description delimiter
            data                                                   // Picture bytes
        );
        const header = new FrameHeader(FrameIdentifiers.APIC, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(3), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @test
    public render_apicV4() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux", StringType.UTF8);
        const frame = getCustomTestFrame(data, "foo", "bar", "image/gif", PictureType.FrontCover);

        // Act
        const output = frame.render(4);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            Id3v2Settings.defaultEncoding,                         // Encoding
            ByteVector.fromString("image/gif", StringType.Latin1), // Mimetype
            ByteVector.getTextDelimiter(StringType.Latin1),        // Mimetype delimiter
            PictureType.FrontCover,                                // Type
            ByteVector.fromString("foo", StringType.Latin1),       // Description
            ByteVector.getTextDelimiter(StringType.Latin1),        // Description delimiter
            data                                                   // Picture bytes
        );
        const header = new FrameHeader(FrameIdentifiers.APIC, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(4), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(2, "v2")
    @params(3, "v3")
    public render_geobWithoutMimeType_v23(version: number) {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux", StringType.UTF8);
        const frame = getCustomTestFrame(data, undefined, undefined, undefined, PictureType.NotAPicture);

        // Act
        const output = frame.render(version);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16,                               // Encoding (corrected)
            ByteVector.getTextDelimiter(StringType.Latin1), // Mimetype delimiter
            ByteVector.getTextDelimiter(StringType.UTF16),  // Filename delimiter
            ByteVector.getTextDelimiter(StringType.UTF16),  // Description delimiter
            data                                            // Attachment bytes
        );
        const header = new FrameHeader(FrameIdentifiers.GEOB, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @test
    public render_geobWithoutMimeType_v4() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux", StringType.UTF8);
        const frame = getCustomTestFrame(data, undefined, undefined, undefined, PictureType.NotAPicture);

        // Act
        const output = frame.render(4);

        // Assert
        const fieldBytes = ByteVector.concatenate(Id3v2Settings.defaultEncoding,
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding), // Mimetype delimiter
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding), // Filename delimiter
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding), // Description delimiter
            data                                                        // Attachment bytes
        );
        const header = new FrameHeader(FrameIdentifiers.GEOB, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(4), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(2, "v2")
    @params(3, "v3")
    public render_geobWithMimeType_v23(version: number) {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux", StringType.UTF8);
        const frame = getCustomTestFrame(data, undefined, undefined, "image/gif", PictureType.NotAPicture);

        // Act
        const output = frame.render(version);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16,                                      // Encoding (corrected)
            ByteVector.fromString("image/gif", StringType.Latin1), // Mimetype
            ByteVector.getTextDelimiter(StringType.Latin1),        // Mimetype delimiter
            ByteVector.getTextDelimiter(StringType.UTF16),         // Filename delimiter
            ByteVector.getTextDelimiter(StringType.UTF16),         // Description delimiter
            data                                                   // Attachment bytes
        );
        const header = new FrameHeader(FrameIdentifiers.GEOB, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @test
    public render_geobWithMimeType_v4() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux", StringType.UTF8);
        const frame = getCustomTestFrame(data, undefined, undefined, "image/gif", PictureType.NotAPicture);

        // Act
        const output = frame.render(4);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            Id3v2Settings.defaultEncoding,                              // Encoding
            ByteVector.fromString("image/gif", StringType.Latin1),      // Mimetype
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding), // Mimetype delimiter
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding), // Filename delimiter
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding), // Description delimiter
            data                                                        // Attachment bytes
        );
        const header = new FrameHeader(FrameIdentifiers.GEOB, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(4), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(2, "v2")
    @params(3, "v3")
    public render_geobWithMimeTypeAndFileName_v23(version: number) {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux", StringType.UTF8);
        const frame = getCustomTestFrame(data, undefined, "file.gif", "image/gif", PictureType.NotAPicture);

        // Act
        const output = frame.render(version);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16,                                      // Encoding (encoding)
            ByteVector.fromString("image/gif", StringType.Latin1), // Mimetype
            ByteVector.getTextDelimiter(StringType.Latin1),        // Mimetype delimiter
            ByteVector.fromString("file.gif", StringType.UTF16),   // Filename
            ByteVector.getTextDelimiter(StringType.UTF16),         // Filename delimiter
            ByteVector.getTextDelimiter(StringType.UTF16),         // Description delimiter
            data                                                   // Attachment bytes
        )
        const header = new FrameHeader(FrameIdentifiers.GEOB, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @test
    public render_geobWithMimeTypeAndFileName_v4() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux", StringType.UTF8);
        const frame = getCustomTestFrame(data, undefined, "file.gif", "image/gif", PictureType.NotAPicture);

        // Act
        const output = frame.render(4);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            Id3v2Settings.defaultEncoding,                                    // Encoding
            ByteVector.fromString("image/gif", StringType.Latin1),            // Mimetype
            ByteVector.getTextDelimiter(StringType.Latin1),                   // Mimetype delimiter
            ByteVector.fromString("file.gif", Id3v2Settings.defaultEncoding), // Filename
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),       // Filename delimiter
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),       // Description delimiter
            data                                                              // Attachment bytes
        )
        const header = new FrameHeader(FrameIdentifiers.GEOB, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(4), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(2, "v2")
    @params(3, "v3")
    public render_geobWithMimeTypeAndFileNameAndDescription_v23(version: number) {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux", StringType.UTF8);
        const frame = getCustomTestFrame(data, "foobarbaz", "file.gif", "image/gif", PictureType.NotAPicture);

        // Act
        const output = frame.render(version);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            StringType.UTF16,                                      // Encoding (corrected)
            ByteVector.fromString("image/gif", StringType.Latin1), // Mimetype
            ByteVector.getTextDelimiter(StringType.Latin1),        // Mimetype delimiter
            ByteVector.fromString("file.gif", StringType.UTF16),   // Filename
            ByteVector.getTextDelimiter(StringType.UTF16),         // Filename delimiter
            ByteVector.fromString("foobarbaz", StringType.UTF16),  // Description
            ByteVector.getTextDelimiter(StringType.UTF16),         // Description delimiter
            data                                                   // Attachment bytes
        );
        const header = new FrameHeader(FrameIdentifiers.GEOB, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(4, "v4")
    public render_geobWithMimeTypeAndFileNameAndDescription_v4() {
        // Arrange
        const data = ByteVector.fromString("fuxbuxqux", StringType.UTF8);
        const frame = getCustomTestFrame(data, "foobarbaz", "file.gif", "image/gif", PictureType.NotAPicture);

        // Act
        const output = frame.render(4);

        // Assert
        const fieldBytes = ByteVector.concatenate(
            Id3v2Settings.defaultEncoding,                                     // Encoding
            ByteVector.fromString("image/gif", StringType.Latin1),             // Mimetype
            ByteVector.getTextDelimiter(StringType.Latin1),                    // Mimetype delimiter
            ByteVector.fromString("file.gif", Id3v2Settings.defaultEncoding),  // Filename
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),        // Filename delimiter
            ByteVector.fromString("foobarbaz", Id3v2Settings.defaultEncoding), // Description
            ByteVector.getTextDelimiter(Id3v2Settings.defaultEncoding),        // Description delimiter
            data                                                               // Attachment bytes
        );
        const header = new FrameHeader(FrameIdentifiers.GEOB, FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(4), fieldBytes);
        Testers.bvEqual(output, expected);
    }
}
