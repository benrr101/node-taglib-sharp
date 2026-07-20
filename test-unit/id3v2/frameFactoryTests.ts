import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {It, Mock, Times} from "typemoq";

import AttachmentFrame from "../../src/id3v2/frames/attachmentFrame";
import CommentsFrame from "../../src/id3v2/frames/commentsFrame";
import Frame from "../../src/id3v2/frames/frame";
import MusicCdIdentifierFrame from "../../src/id3v2/frames/musicCdIdentifierFrame";
import PlayCountFrame from "../../src/id3v2/frames/playCountFrame";
import PopularimeterFrame from "../../src/id3v2/frames/popularimeterFrame";
import PrivateFrame from "../../src/id3v2/frames/privateFrame";
import TermsOfUseFrame from "../../src/id3v2/frames/termsOfUseFrame";
import TestFile from "../utilities/testFile";
import TextInformationFrame from "../../src/id3v2/frames/textInformationFrame";
import UniqueFileIdentifierFrame from "../../src/id3v2/frames/uniqueFileIdentifierFrame";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import UnsynchronizedLyricsFrame from "../../src/id3v2/frames/unsynchronizedLyricsFrame";
import UrlLinkFrame from "../../src/id3v2/frames/urlLinkFrame";
import UserTextInformationFrame from "../../src/id3v2/frames/userTextInformationFrame";
import UserUrlLinkFrame from "../../src/id3v2/frames/userUrlLinkFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {EventTimeCodeFrame} from "../../src/id3v2/frames/eventTimeCodeFrame";
import {File} from "../../src/file";
import {FrameCreator, Id3v2FrameFactory} from "../../src/id3v2/frames/frameFactory";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {PictureType} from "../../src/picture";
import {RelativeVolumeFrame} from "../../src/id3v2/frames/relativeVolumeFrame";
import {SynchronizedLyricsFrame} from "../../src/id3v2/frames/synchronizedLyricsFrame";
import {Testers} from "../utilities/testers";
import {TimestampFormat} from "../../src/id3v2/utilTypes";
import {NumberUtils} from "../../src/utils";

@suite class FrameFactoryTests {
    private static readonly FRAME_BODY_APIC = ByteVector.concatenate(
        StringType.UTF16BE,
        ByteVector.fromString("image/gif", StringType.Latin1),
        ByteVector.getTextDelimiter(StringType.Latin1),
        PictureType.Artist,
        ByteVector.fromString("foobarbaz", StringType.UTF16BE),
        ByteVector.getTextDelimiter(StringType.UTF16BE),
        ByteVector.fromString("fuxbuxqux", StringType.Latin1)
    );
    private static readonly FRAME_BODY_GEOB = ByteVector.concatenate(
        StringType.UTF16BE,
        ByteVector.fromString("image/gif", StringType.Latin1),
        ByteVector.getTextDelimiter(StringType.Latin1),
        ByteVector.fromString("image.gif", StringType.UTF16BE),
        ByteVector.getTextDelimiter(StringType.UTF16BE),
        ByteVector.fromString("foobarbaz", StringType.UTF16BE),
        ByteVector.getTextDelimiter(StringType.UTF16BE),
        ByteVector.fromString("fuxbuxqux", StringType.Latin1)
    );

    // #region createFrameFromFile Tests

    @test
    public createFrameFromFile_falsyFile() {
        // Act / Assert
        Testers.testTruthy((v: File) => Id3v2FrameFactory.createFrameFromFile(v, 123, 4, false));
    }

    @test
    public createFrameFromFile_invalidOffset() {
        // Arrange
        const file = TestFile.mockFile();

        // Act / Assert
        Testers.testSafeUint((v) => Id3v2FrameFactory.createFrameFromFile(file, v, 4, false));
    }

    @test
    public createFrameFromFile_invalidVersion() {
        // Arrange
        const file = TestFile.getFile([]);

        // Act / Assert
        Testers.testByte((v) => Id3v2FrameFactory.createFrameFromFile(file, 0, v, false));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public createFrameFromFile_noHeader(version: number) {
        // Arrange
        const size = Id3v2FrameHeader.getBaseSize(version);
        const data = ByteVector.fromSize(size - 1);
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => Id3v2FrameFactory.createFrameFromFile(file, 0, version, false));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public createFrameFromFile_noHeaderAfterOffset(version: number) {
        // Arrange
        const size = Id3v2FrameHeader.getBaseSize(version);
        const data = ByteVector.fromSize(size + 9, 0x00);
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => Id3v2FrameFactory.createFrameFromFile(file, 10, version, false));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public createFrameFromFile_padding(version: number) {
        // Arrange
        const size = Id3v2FrameHeader.getBaseSize(version);
        const data = ByteVector.fromSize(size + 1, 0x00);
        const file = TestFile.getFile(data);

        // Act
        const result = Id3v2FrameFactory.createFrameFromFile(file, 0, version, false);

        // Assert
        assert.isUndefined(result);
    }

    @test
    public createFrameFromFile_apic() {
        // Arrange
        const file = FrameFactoryTests.getTestFile(
            FrameIdentifiers.APIC,
            FrameFactoryTests.FRAME_BODY_APIC
        );

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, AttachmentFrame, 4);
    }

    @test
    public createFrameFromFile_comm() {
        // Arrange
        const data = CommentsFrame.fromFields("foo", "bar").render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, CommentsFrame, 4);
    }

    @test
    public createFrameFromFile_etco() {
        // Arrange
        const data = EventTimeCodeFrame.fromFields(TimestampFormat.AbsoluteMilliseconds).render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, EventTimeCodeFrame, 4);
    }

    @test
    public createFrame_fromFile_geob() {
        // Arrange
        const file = FrameFactoryTests.getTestFile(
            FrameIdentifiers.GEOB,
            FrameFactoryTests.FRAME_BODY_GEOB
        );

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, AttachmentFrame, 4);
    }

    @test
    public createFrameFromFile_mcdi() {
        // Arrange
        const file = FrameFactoryTests.getTestFile(
            FrameIdentifiers.MCDI,
            ByteVector.fromString("12345abcd", StringType.Latin1)
        );

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, MusicCdIdentifierFrame, 4);
    }

    @test
    public createFrameFromFile_pcnt() {
        // Arrange
        const data = PlayCountFrame.fromFields(BigInt(123)).render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, PlayCountFrame, 4);
    }

    @test
    public createFrameFromFile_popm() {
        // Arrange
        const data = PopularimeterFrame.fromFields("foo", 123).render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, PopularimeterFrame, 4);
    }

    @test
    public createFrameFromFile_priv() {
        // Arrange
        const data = PrivateFrame.fromFields("foo", ByteVector.fromUint(123)).render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, PrivateFrame, 4);
    }

    @test
    public createFrameFromFile_rva2() {
        // Arrange
        const data = RelativeVolumeFrame.fromFields("foo").render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, RelativeVolumeFrame, 4);
    }

    @test
    public createFrameFromFrame_sylt() {
        // Arrange
        const data = SynchronizedLyricsFrame.fromFields("foo").render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, SynchronizedLyricsFrame, 4);
    }

    @test
    public createFrameFromFile_textFrame() {
        // Arrange
        const data = TextInformationFrame.fromFields(FrameIdentifiers.TCOM, ["foo"]).render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, TextInformationFrame, 4);
    }

    @test
    public createFrameFromFile_txxx() {
        // Arrange
        const data = UserTextInformationFrame.fromFields("foo", ["foo"]).render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UserTextInformationFrame, 4);
    }

    @test
    public createFrameFromFile_ufid() {
        // Arrange
        const data = UniqueFileIdentifierFrame.fromFields("foo", ByteVector.fromByte(0x05)).render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UniqueFileIdentifierFrame, 4);
    }

    @test
    public createFrameFromFile_ufidWithOffset() {
        // Arrange
        const data = ByteVector.concatenate(
            0x00, 0x00,
            UniqueFileIdentifierFrame.fromFields("foo", ByteVector.fromByte(0x05)).render(4)
        );
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 2, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UniqueFileIdentifierFrame, 4);
    }

    @test
    public createFrameFromFile_unknown() {
        // Arrange
        const file = FrameFactoryTests.getTestFile(
            FrameIdentifiers.RVRB,
            ByteVector.fromString("foo", StringType.UTF8)
        );

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UnknownFrame, 4);
    }

    @test
    public createFrameFromFile_urlFrame() {
        // Arrange
        const data = UrlLinkFrame.fromFields(FrameIdentifiers.WCOM, "foo").render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UrlLinkFrame, 4);
    }

    @test
    public createFrameFromFile_user() {
        // Arrange
        const data = TermsOfUseFrame.fromFields("foo").render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, TermsOfUseFrame, 4);
    }

    @test
    public createFrameFromFile_uslt() {
        // Arrange
        const data = UnsynchronizedLyricsFrame.fromFields("foo", "bar").render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UnsynchronizedLyricsFrame, 4);
    }

    @test
    public createFrameFromFile_wxxx() {
        // Arrange
        const data = UserUrlLinkFrame.fromFields("foo", "bar").render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UserUrlLinkFrame, 4);
    }

    @test
    public createFrameFromFile_customThrows() {
        // Arrange
        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03]);
        const header = new Id3v2FrameHeader(FrameIdentifiers.RVRB, Id3v2FrameFlags.None, fieldBytes.length);
        const data = ByteVector.concatenate(header.render(3), fieldBytes);
        const file = TestFile.getFile(data);

        const mockCreator = Mock.ofType<FrameCreator>();
        mockCreator.setup(c => c(It.isValue<ByteVector>(fieldBytes), It.isValue(0), It.isAny(), It.isValue(3)))
            .throws(new Error());
        Id3v2FrameFactory.addFrameCreator(mockCreator.object);

        try {
            // Act
            const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 3, false);

            // Assert
            FrameFactoryTests.validateOutput(output, UnknownFrame, data.length);
            mockCreator.verify(
                (c) => c(It.isValue<ByteVector>(fieldBytes), It.isValue(0), It.isAny(), It.isValue(3)),
                Times.atLeastOnce()
            );
        } finally {
            // Cleanup
            // @TODO: Is there a risk of race condition with this test and the previous?
            Id3v2FrameFactory.clearFrameCreators();
        }
    }

    @test
    public createFrameFromFile_customWithMatch() {
        // Arrange
        const frame = PlayCountFrame.fromFields();
        const data = frame.render(4);
        const file = TestFile.getFile(data);

        const fieldBytes = data.subarray(Id3v2FrameHeader.getBaseSize(4));

        const mockCreator = Mock.ofType<FrameCreator>();
        mockCreator.setup((c) => c(It.isValue<ByteVector>(fieldBytes), It.isValue(0), It.isAny(), It.isValue(4)))
            .returns(() => frame);

        Id3v2FrameFactory.addFrameCreator(mockCreator.object);

        try {
            // Act
            const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

            // Assert
            assert.isOk(output)
            assert.strictEqual(output.frame, frame);
            assert.strictEqual(output.totalSize, data.length);

            mockCreator.verify(
                (c) => c(It.isValue<ByteVector>(fieldBytes), It.isValue(0), It.isAny(), It.isValue(4)),
                Times.atLeastOnce()
            );

        } finally {
            // Cleanup
            // @TODO: Is there a risk of race condition with this test and the next?
            Id3v2FrameFactory.clearFrameCreators();
        }
    }

    @test
    public createFrameFromFile_customWithoutMatch() {
        // Arrange
        const frame = UnknownFrame.fromFields(FrameIdentifiers.RVRB, ByteVector.fromByteArray([0x01, 0x02, 0x03]));
        const data = frame.render(4);
        const file = TestFile.getFile(data);

        const fieldBytes = data.subarray(Id3v2FrameHeader.getBaseSize(4));

        const mockCreator = Mock.ofType<FrameCreator>();
        mockCreator.setup((c) => c(It.isValue<ByteVector>(fieldBytes), It.isValue(0), It.isAny(), It.isValue(4)))
            .returns(() => undefined);

        Id3v2FrameFactory.addFrameCreator(mockCreator.object);

        try {
            // Act
            const output = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

            // Assert
            FrameFactoryTests.validateOutput(output, UnknownFrame, data.length);
            assert.notStrictEqual(output.frame, frame);
            assert.strictEqual(output.totalSize, data.length);

            mockCreator.verify(
                (c) => c(It.isValue<ByteVector>(fieldBytes), It.isValue(0), It.isAny(), It.isValue(4)),
                Times.atLeastOnce()
            );

        } finally {
            // Cleanup
            // @TODO: Is there a risk of race condition with this test and the previous?
            Id3v2FrameFactory.clearFrameCreators();
        }
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public createFrameFromFile_fieldBytesHeaderMismatch(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromSize(10);
        const header = new Id3v2FrameHeader(FrameIdentifiers.RVRB, Id3v2FrameFlags.None, fieldBytes.length + 5);
        const data = ByteVector.concatenate(header.render(version), fieldBytes);
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => Id3v2FrameFactory.createFrameFromFile(file, 0, version, false));
    }

    @test
    public createFrameFromFile_unsyncAtTagLevel() {
        // Arrange
        // Note: Tag-level unsynchronization is only available in ID3v2.3
        const fieldBytes = ByteVector.fromSize(10);
        const header = new Id3v2FrameHeader(FrameIdentifiers.RVRB, Id3v2FrameFlags.Unsynchronized, fieldBytes.length);
        const data = ByteVector.concatenate(header.render(3), fieldBytes);
        const file = TestFile.getFile(data);

        // Act
        const result = Id3v2FrameFactory.createFrameFromFile(file, 0, 3, true);

        // Assert
        assert.isOk(result);

        assert.strictEqual(result.totalSize, data.length);

        assert.isOk(result.frame);
        assert.isFalse(NumberUtils.hasFlag(result.frame.flags, Id3v2FrameFlags.Unsynchronized));
    }

    @test
    public createFrameFromFile_resyncRequired() {
        // Arrange
        // Note: Frame-level unsynchronization is only available in ID3v2.4
        const fieldBytes = ByteVector.fromByteArray([0xFF, 0x00, 0xE0]);
        const header = new Id3v2FrameHeader(FrameIdentifiers.RVRB, Id3v2FrameFlags.Unsynchronized, fieldBytes.length);
        const data = ByteVector.concatenate(header.render(4), fieldBytes);
        const file = TestFile.getFile(data);

        // Act
        const result = Id3v2FrameFactory.createFrameFromFile(file, 0, 4, false);

        // Assert
        assert.isOk(result);

        assert.strictEqual(result.totalSize, data.length);

        assert.isOk(result.frame);
        assert.instanceOf<UnknownFrame>((<UnknownFrame>result.frame), UnknownFrame);
        assert.isTrue(NumberUtils.hasFlag(result.frame.flags, Id3v2FrameFlags.Unsynchronized))
        Testers.bvEqual((<UnknownFrame>result.frame).data, ByteVector.fromByteArray([0xFF, 0xE0]));
    }

    @params(3, "v3")
    @params(4, "v4")
    public createFrameFromFile_v4ExtendedHeader(version: number) {
        // Arrange
        // Note: v2 does not support extended frame header
        const fieldBytes = ByteVector.fromSize(10);
        const extendedHeaderBytes = ByteVector.fromByte(0x12);
        const header = new Id3v2FrameHeader(
            FrameIdentifiers.RVRB,
            Id3v2FrameFlags.GroupingIdentity,
            fieldBytes.length + extendedHeaderBytes.length
        );
        const data = ByteVector.concatenate(header.render(version), extendedHeaderBytes, fieldBytes);
        const file = TestFile.getFile(data);

        // Act
        const result = Id3v2FrameFactory.createFrameFromFile(file, 0, version, false);

        // Assert
        assert.isOk(result);

        assert.strictEqual(result.totalSize, data.length);

        assert.isOk(result.frame);
        assert.instanceOf<UnknownFrame>((<UnknownFrame>result.frame), UnknownFrame);
        Testers.bvEqual((<UnknownFrame>result.frame).data, fieldBytes);
    }

    // #endregion

    // #region createFrameFromTagBytes Tests

    @test
    public createFrameFromTagBytes_falsyData() {
        // Act / Assert
        Testers.testTruthy<ByteVector>((v) => Id3v2FrameFactory.createFrameFromTagBytes(v, 0, 2, false));
    }

    @test
    public createFrameFromTagBytes_invalidOffset() {
        // Arrange
        const data = ByteVector.empty();

        // Act / Assert
        Testers.testSafeUint((v) => Id3v2FrameFactory.createFrameFromTagBytes(data, v, 2, false));
    }

    @test
    public createFrameFromTagBytes_invalidVersion() {
        // Arrange
        const data = ByteVector.empty();

        // Act / Assert
        Testers.testByte((v) => Id3v2FrameFactory.createFrameFromTagBytes(data, 0, v, false));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public createFrameFromTagBytes_noHeader(version: number) {
        // Arrange
        const size = Id3v2FrameHeader.getBaseSize(version);
        const data = ByteVector.fromSize(size - 1);

        // Act / Assert
        assert.throws(() => Id3v2FrameFactory.createFrameFromTagBytes(data, 0, version, false));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public createFrameFroMTagBytes_noHeaderAfterOffset(version: number) {
        // Arrange
        const size = Id3v2FrameHeader.getBaseSize(version);
        const data = ByteVector.fromSize(size + 9, 0x00);

        // Act / Assert
        assert.throws(() => Id3v2FrameFactory.createFrameFromTagBytes(data, 10, version, false));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public createFrameFromTagBytes_padding(version: number) {
        // Arrange
        const size = Id3v2FrameHeader.getBaseSize(version);
        const data = ByteVector.fromSize(size + 1, 0x00);

        // Act
        const result = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, version, false);

        // Assert
        assert.isUndefined(result);
    }

    @test
    public createFrameFromTagBytes_apic() {
        // Arrange
        const data = FrameFactoryTests.getTestData(
            FrameIdentifiers.APIC,
            FrameFactoryTests.FRAME_BODY_APIC
        );

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, AttachmentFrame, 4);
    }

    @test
    public createFrameFromTagBytes_comm() {
        // Arrange
        const data = CommentsFrame.fromFields("foo", "bar").render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, CommentsFrame, 4);
    }

    @test
    public createFrameFromTagBytes_etco() {
        // Arrange
        const data = EventTimeCodeFrame.fromFields().render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, EventTimeCodeFrame, 4);
    }

    @test
    public createFrameFromTagBytes_geob() {
        // Arrange
        const data = FrameFactoryTests.getTestData(
            FrameIdentifiers.GEOB,
            FrameFactoryTests.FRAME_BODY_GEOB
        );

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, AttachmentFrame, 4);
    }

    @test
    public createFrameFromTagBytes_mcdi() {
        // Arrange
        const data = FrameFactoryTests.getTestData(
            FrameIdentifiers.MCDI,
            ByteVector.fromString("12345abcd", StringType.Latin1)
        );

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, MusicCdIdentifierFrame, 4);
    }

    @test
    public createFrameFromTagBytes_pcnt() {
        // Arrange
        const data = PlayCountFrame.fromFields(BigInt(123)).render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, PlayCountFrame, 4);
    }

    @test
    public createFrameFromTagBytes_popm() {
        // Arrange
        const data = PopularimeterFrame.fromFields("foo", 123).render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, PopularimeterFrame, 4);
    }

    @test
    public createFrameFromTagBytes_priv() {
        // Arrange
        const data = PrivateFrame.fromFields("foo", ByteVector.fromUint(123)).render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, PrivateFrame, 4);
    }

    @test
    public createFrameFromTagBytes_rva2() {
        // Arrange
        const data = RelativeVolumeFrame.fromFields("foo").render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, RelativeVolumeFrame, 4);
    }

    @test
    public createFrameFromTagBytes_sylt() {
        // Arrange
        const data = SynchronizedLyricsFrame.fromFields("foo").render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, SynchronizedLyricsFrame, 4);
    }

    @test
    public createFrameFromTagBytes_textFrame() {
        // Arrange
        const frame = TextInformationFrame.fromFields(FrameIdentifiers.TCOM, ["foo"]);
        const data = frame.render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, TextInformationFrame, 4);
    }

    @test
    public createFrameFromTagBytes_txxx() {
        // Arrange
        const data = UserTextInformationFrame.fromFields("foo", ["bar"]).render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UserTextInformationFrame, 4);
    }

    @test
    public createFrameFromTagBytes_ufid() {
        // Arrange
        const data = UniqueFileIdentifierFrame.fromFields("foo", ByteVector.fromByte(0x08)).render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UniqueFileIdentifierFrame, 4);
    }

    @test
    public createFrameFromTagBytes_unknown() {
        // Arrange
        const data = FrameFactoryTests.getTestData(
            FrameIdentifiers.RVRB,
            ByteVector.fromString("foo", StringType.UTF8)
        );

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UnknownFrame, 4);
    }

    @test
    public createFrameFromTagBytes_unknownWithOffset() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10),
            FrameFactoryTests.getTestData(
                FrameIdentifiers.RVRB,
                ByteVector.fromString("foo", StringType.Latin1)
            )
        );

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 10, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UnknownFrame, 4);
    }

    @test
    public createFrameFromTagBytes_urlFrame() {
        // Arrange
        const frame = UrlLinkFrame.fromFields(FrameIdentifiers.WCOM, "foo");
        const data = frame.render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UrlLinkFrame, 4);
    }

    @test
    public createFrameFromTagBytes_user() {
        // Arrange
        const data = TermsOfUseFrame.fromFields("foo").render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, TermsOfUseFrame, 4);
    }

    @test
    public createFrameFromTagBytes_uslt() {
        // Arrange
        const data = UnsynchronizedLyricsFrame.fromFields("foo", "bar").render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UnsynchronizedLyricsFrame, 4);
    }

    @test
    public createFrameFromTagBytes_wxxx() {
        // Arrange
        const data = UserUrlLinkFrame.fromFields("foo", "bar").render(4);

        // Act
        const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, UserUrlLinkFrame, 4);
    }

    @test
    public createFrameFromTagBytes_customThrows() {
        // Arrange
        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03]);
        const header = new Id3v2FrameHeader(FrameIdentifiers.RVRB, Id3v2FrameFlags.None, fieldBytes.length);
        const data = ByteVector.concatenate(header.render(3), fieldBytes);

        const mockCreator = Mock.ofType<FrameCreator>();
        mockCreator.setup(c => c(It.isValue<ByteVector>(fieldBytes), It.isValue(0), It.isAny(), It.isValue(3)))
            .throws(new Error());
        Id3v2FrameFactory.addFrameCreator(mockCreator.object);

        try {
            // Act
            const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 3, false);

            // Assert
            FrameFactoryTests.validateOutput(output, UnknownFrame, data.length);
            mockCreator.verify(
                (c) => c(It.isValue<ByteVector>(fieldBytes), It.isValue(0), It.isAny(), It.isValue(3)),
                Times.atLeastOnce()
            );
        } finally {
            // Cleanup
            // @TODO: Is there a risk of race condition with this test and the previous?
            Id3v2FrameFactory.clearFrameCreators();
        }
    }

    @test
    public createFrameFromTagBytes_customWithMatch() {
        // Arrange
        const frame = PlayCountFrame.fromFields(BigInt(123));
        const data = frame.render(4);

        const fieldBytes = data.subarray(Id3v2FrameHeader.getBaseSize(4));

        const mockCreator = Mock.ofType<FrameCreator>();
        mockCreator.setup((c) => c(It.isValue<ByteVector>(fieldBytes), It.isValue(0), It.isAny(), It.isValue(4)))
            .returns(() => frame);

        Id3v2FrameFactory.addFrameCreator(mockCreator.object);

        try {
            // Act
            const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

            // Assert
            assert.isOk(output)
            assert.strictEqual(output.frame, frame);
            assert.strictEqual(output.totalSize, data.length);

            mockCreator.verify(
                (c) => c(It.isValue<ByteVector>(fieldBytes), It.isValue(0), It.isAny(), It.isValue(4)),
                Times.atLeastOnce()
            );

        } finally {
            // Cleanup
            // @TODO: Is there a risk of race condition with this test and the next?
            Id3v2FrameFactory.clearFrameCreators();
        }
    }

    @test
    public createFrameFromTagBytes_customWithoutMatch() {
        // Arrange
        const frame = UnknownFrame.fromFields(FrameIdentifiers.RVRB, ByteVector.fromByteArray([0x01, 0x02, 0x03]));
        const data = frame.render(4);

        const fieldBytes = data.subarray(Id3v2FrameHeader.getBaseSize(4));

        const mockCreator = Mock.ofType<FrameCreator>();
        mockCreator.setup((c) => c(It.isValue<ByteVector>(fieldBytes), It.isValue(0), It.isAny(), It.isValue(4)))
            .returns(() => undefined);

        Id3v2FrameFactory.addFrameCreator(mockCreator.object);

        try {
            // Act
            const output = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

            // Assert
            FrameFactoryTests.validateOutput(output, UnknownFrame, data.length);
            assert.notStrictEqual(output.frame, frame);
            assert.strictEqual(output.totalSize, data.length);

            mockCreator.verify(
                (c) => c(It.isValue<ByteVector>(fieldBytes), It.isValue(0), It.isAny(), It.isValue(4)),
                Times.atLeastOnce()
            );

        } finally {
            // Cleanup
            // @TODO: Is there a risk of race condition with this test and the previous?
            Id3v2FrameFactory.clearFrameCreators();
        }
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public createFrameFromTagBytes_fieldBytesHeaderMismatch(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromSize(10);
        const header = new Id3v2FrameHeader(FrameIdentifiers.RVRB, Id3v2FrameFlags.None, fieldBytes.length + 5);
        const data = ByteVector.concatenate(header.render(version), fieldBytes);

        // Act / Assert
        assert.throws(() => Id3v2FrameFactory.createFrameFromTagBytes(data, 0, version, false));
    }

    @test
    public createFrameFromTagBytes_unsyncAtTagLevel() {
        // Arrange
        // Note: Tag-level unsynchronization is only available in ID3v2.3
        const fieldBytes = ByteVector.fromSize(10);
        const header = new Id3v2FrameHeader(FrameIdentifiers.RVRB, Id3v2FrameFlags.Unsynchronized, fieldBytes.length);
        const data = ByteVector.concatenate(header.render(3), fieldBytes);

        // Act
        const result = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 3, true);

        // Assert
        assert.isOk(result);

        assert.strictEqual(result.totalSize, data.length);

        assert.isOk(result.frame);
        assert.isFalse(NumberUtils.hasFlag(result.frame.flags, Id3v2FrameFlags.Unsynchronized));
    }

    @test
    public createFrameFromTagBytes_resyncRequired() {
        // Arrange
        // Note: Frame-level unsynchronization is only available in ID3v2.4
        const fieldBytes = ByteVector.fromByteArray([0xFF, 0x00, 0xE0]);
        const header = new Id3v2FrameHeader(FrameIdentifiers.RVRB, Id3v2FrameFlags.Unsynchronized, fieldBytes.length);
        const data = ByteVector.concatenate(header.render(4), fieldBytes);

        // Act
        const result = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, 4, false);

        // Assert
        assert.isOk(result);

        assert.strictEqual(result.totalSize, data.length);

        assert.isOk(result.frame);
        assert.instanceOf<UnknownFrame>((<UnknownFrame>result.frame), UnknownFrame);
        assert.isTrue(NumberUtils.hasFlag(result.frame.flags, Id3v2FrameFlags.Unsynchronized))
        Testers.bvEqual((<UnknownFrame>result.frame).data, ByteVector.fromByteArray([0xFF, 0xE0]));
    }

    @params(3, "v3")
    @params(4, "v4")
    public createFrameFromTagBytes_v4ExtendedHeader(version: number) {
        // Arrange
        // Note: v2 does not support extended frame header
        const fieldBytes = ByteVector.fromSize(10);
        const extendedHeaderBytes = ByteVector.fromByte(0x12);
        const header = new Id3v2FrameHeader(
            FrameIdentifiers.RVRB,
            Id3v2FrameFlags.GroupingIdentity,
            fieldBytes.length + extendedHeaderBytes.length
        );
        const data = ByteVector.concatenate(header.render(version), extendedHeaderBytes, fieldBytes);

        // Act
        const result = Id3v2FrameFactory.createFrameFromTagBytes(data, 0, version, false);

        // Assert
        assert.isOk(result);

        assert.strictEqual(result.totalSize, data.length);

        assert.isOk(result.frame);
        assert.instanceOf<UnknownFrame>((<UnknownFrame>result.frame), UnknownFrame);
        Testers.bvEqual((<UnknownFrame>result.frame).data, fieldBytes);
    }

    // #endregion

    private static getTestData(frameIdentifier: FrameIdentifier, fieldBytes: ByteVector): ByteVector {
        const header = new Id3v2FrameHeader(frameIdentifier, Id3v2FrameFlags.None, fieldBytes.length);
        return ByteVector.concatenate(header.render(4), fieldBytes);
    }

    private static getTestFile(frameIdentifier: FrameIdentifier, fieldBytes: ByteVector): File {
        const frameBytes = this.getTestData(frameIdentifier, fieldBytes);
        return TestFile.getFile(frameBytes);
    }

    private static validateOutput(
        output: {frame: Frame; totalSize: number},
        // eslint-disable-next-line @typescript-eslint/ban-types
        classType: Function,
        id3v2Version: number
    ) {
        assert.ok(output);

        const frame = output.frame;
        assert.ok(frame);
        assert.instanceOf(frame, classType);

        const expectedSize = frame.size + Id3v2FrameHeader.getBaseSize(id3v2Version)
        assert.strictEqual(output.totalSize, expectedSize);
    }
}
