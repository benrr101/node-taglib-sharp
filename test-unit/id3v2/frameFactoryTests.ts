import * as Chai from "chai";
import * as TypeMoq from "typemoq";
import {suite, test} from "@testdeck/mocha";

import CommentsFrame from "../../src/id3v2/frames/commentsFrame";
import FrameFactory, {FrameCreator} from "../../src/id3v2/frames/frameFactory";
import PlayCountFrame from "../../src/id3v2/frames/playCountFrame";
import PopularimeterFrame from "../../src/id3v2/frames/popularimeterFrame";
import PrivateFrame from "../../src/id3v2/frames/privateFrame";
import TermsOfUseFrame from "../../src/id3v2/frames/termsOfUseFrame";
import TestFile from "../utilities/testFile";
import UniqueFileIdentifierFrame from "../../src/id3v2/frames/uniqueFileIdentifierFrame";
import UnsynchronizedLyricsFrame from "../../src/id3v2/frames/unsynchronizedLyricsFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {EventTimeCodeFrame} from "../../src/id3v2/frames/eventTimeCodeFrame";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {PictureType} from "../../src/iPicture";
import {RelativeVolumeFrame} from "../../src/id3v2/frames/relativeVolumeFrame";
import {TextInformationFrame, UserTextInformationFrame} from "../../src/id3v2/frames/textInformationFrame";
import {SynchronizedLyricsFrame} from "../../src/id3v2/frames/synchronizedLyricsFrame";
import {UrlLinkFrame, UserUrlLinkFrame} from "../../src/id3v2/frames/urlLinkFrame";
import {SynchronizedTextType, TimestampFormat} from "../../src/id3v2/utilTypes";

// Setup chai
const assert = Chai.assert;

@suite class FrameFactoryTests {
    @test
    public createFrame_invalidVersion() {
        // Arrange
        const data = ByteVector.empty();

        // Act / Assert
        assert.throws(() => { FrameFactory.createFrame(data, undefined, 0, -1, false); });
        assert.throws(() => { FrameFactory.createFrame(data, undefined, 0, 1.23, false); });
        assert.throws(() => { FrameFactory.createFrame(data, undefined, 0, 0x100, false); });
    }

    @test
    public createFrame_invalidOffset() {
        // Arrange
        const data = ByteVector.empty();

        // Act / Assert
        assert.throws(() => { FrameFactory.createFrame(data, undefined, -1, 4, false); });
        assert.throws(() => { FrameFactory.createFrame(data, undefined, 1.23, 4, false); });
        assert.throws(() => { FrameFactory.createFrame(data, undefined, Number.MAX_SAFE_INTEGER + 1, 4, false); });
    }

    @test
    public createFrame_missingSource() {
        // Act / Assert
        assert.throws(() => { FrameFactory.createFrame(undefined, undefined, 0, 4, false); });
        assert.throws(() => { FrameFactory.createFrame(null, null, 0, 4, false); });
    }

    @test
    public createFrame_allZero() {
        // Arrange
        const data = ByteVector.fromSize(10, 0x00);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public createFrame_compressed() {
        // Arrange
        const data = ByteVector.concatenate(
            FrameIdentifiers.TXXX.render(4),
            0x00, 0x00, 0x00, 0x0A,
            (Id3v2FrameFlags.Compression & 0xFF >> 16), (Id3v2FrameFlags.Compression & 0xFF)
        );

        // Act / Assert
        assert.throws(() => { FrameFactory.createFrame(data, undefined, 0, 4, false); });
    }

    @test
    public createFrame_encrypted() {
        // Arrange
        const data = ByteVector.concatenate(
            FrameIdentifiers.TXXX.render(4),
            0x00, 0x00, 0x00, 0x0A,
            (Id3v2FrameFlags.Encryption & 0xFF >> 16), (Id3v2FrameFlags.Encryption & 0xFF)
        );

        // Act / Assert
        assert.throws(() => { FrameFactory.createFrame(data, undefined, 0, 4, false); });
    }

    @test
    public createFrame_fromData_txxx() {
        // Arrange
        const data = UserTextInformationFrame.fromDescription("foo").render(4);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.UserTextInformationFrame, data.length);
    }

    @test
    public createFrame_fromData_textFrame() {
        // Arrange
        const data = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOM).render(4);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.TextInformationFrame, data.length);
    }

    @test
    public createFrame_fromData_ufid() {
        // Arrange
        const data = UniqueFileIdentifierFrame.fromData("foo", ByteVector.empty()).render(4);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.UniqueFileIdentifierFrame, data.length);
    }

    @test
    public createFrame_fromData_mcdi() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.MCDI);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("12345abcd", StringType.Latin1)
        );

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.MusicCdIdentifierFrame, data.length);
    }

    @test
    public createFrame_fromData_uslt() {
        // Arrange
        const data = UnsynchronizedLyricsFrame.fromData("foo").render(4);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.UnsynchronizedLyricsFrame, data.length);
    }

    @test
    public createFrame_fromData_sylt() {
        // Arrange
        const data = SynchronizedLyricsFrame.fromInfo("foo", "bar", SynchronizedTextType.Lyrics).render(4);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.SynchronizedLyricsFrame, data.length);
    }

    @test
    public createFrame_fromData_comm() {
        // Arrange
        const data = CommentsFrame.fromDescription("foo").render(4);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.CommentsFrame, data.length);
    }

    @test
    public createFrame_fromData_rva2() {
        // Arrange
        const data = RelativeVolumeFrame.fromIdentification("foo").render(4);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.RelativeVolumeFrame, data.length);
    }

    @test
    public createFrame_fromData_apic() {
        // Arrange
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
            ByteVector.fromString("fuxbuxqux", StringType.Latin1)
        );

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.AttachmentFrame, data.length);
    }

    @test
    public createFrame_fromData_geob() {
        // Arrange
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
            ByteVector.fromString("fuxbuxqux", StringType.Latin1)
        );

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.AttachmentFrame, data.length);
    }

    @test
    public createFrame_fromData_pcnt() {
        // Arrange
        const data = PlayCountFrame.fromEmpty().render(4);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.PlayCountFrame, data.length);
    }

    @test
    public createFrame_fromData_popm() {
        // Arrange
        const data = PopularimeterFrame.fromUser("foo").render(4);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.PopularimeterFrame, data.length);
    }

    @test
    public createFrame_fromData_user() {
        // Arrange
        const data = TermsOfUseFrame.fromFields("foo").render(4);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.TermsOfUseFrame, data.length);
    }

    @test
    public createFrame_fromData_priv() {
        // Arrange
        const data = PrivateFrame.fromOwner("foo").render(4);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.PrivateFrame, data.length);
    }

    @test
    public createFrame_fromData_wxxx() {
        // Arrange
        const data = UserUrlLinkFrame.fromDescription("foo").render(4);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.UserUrlLinkFrame, data.length);
    }

    @test
    public createFrame_fromData_urlFrame() {
        // Arrange
        const frame = UrlLinkFrame.fromIdentity(FrameIdentifiers.WCOM);
        frame.text = ["foo"];
        const data = frame.render(4);


        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.UrlLinkFrame, data.length);
    }

    @test
    public createFrame_fromData_etco() {
        // Arrange
        const data = EventTimeCodeFrame.fromTimestampFormat(TimestampFormat.AbsoluteMilliseconds).render(4);

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.EventTimeCodeFrame, data.length);
    }

    @test
    public createFrame_fromData_unknown() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.RVRB);
        header.frameSize = 3;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("foo")
        );

        // Act
        const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.UnknownFrame, data.length);
    }

    @test
    public createFrame_fromOffsetData() {
        // Arrange
        const data = ByteVector.concatenate(
            0x00, 0x00,
            UniqueFileIdentifierFrame.fromData("foo", ByteVector.empty()).render(4)
        );

        // Act
        const output = FrameFactory.createFrame(data, undefined, 2, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.UniqueFileIdentifierFrame, data.length);
    }

    @test
    public createFrame_fromFileNoOffset_ufid() {
        // Arrange
        const data = UniqueFileIdentifierFrame.fromData("foo", ByteVector.empty()).render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = FrameFactory.createFrame(undefined, file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.UniqueFileIdentifierFrame, data.length);
    }

    @test
    public createFrame_fromFileWithOffset_ufid() {
        // Arrange
        const data = ByteVector.concatenate(
            0x00, 0x00,
            UniqueFileIdentifierFrame.fromData("foo", ByteVector.empty()).render(4)
        );
        const file = TestFile.getFile(data);

        // Act
        const output = FrameFactory.createFrame(undefined, file, 2, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.UniqueFileIdentifierFrame, data.length);
    }

    @test
    public createFrame_fromFile_apic() {
        // Arrange
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
            ByteVector.fromString("fuxbuxqux", StringType.Latin1)
        );
        const file = TestFile.getFile(data);

        // Act
        const output = FrameFactory.createFrame(undefined, file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.AttachmentFrame, data.length);
    }

    @test
    public createFrame_fromFile_geob() {
        // Arrange
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
            ByteVector.fromString("fuxbuxqux", StringType.Latin1)
        );
        const file = TestFile.getFile(data);

        // Act
        const output = FrameFactory.createFrame(undefined, file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.AttachmentFrame, data.length);

    }

    @test
    public createFrame_fromFile_nonLazy() {
        // Arrange
        const data = PlayCountFrame.fromEmpty().render(4);
        const file = TestFile.getFile(data);

        // Act
        const output = FrameFactory.createFrame(undefined, file, 0, 4, false);

        // Assert
        FrameFactoryTests.validateOutput(output, FrameClassType.PlayCountFrame, data.length);
    }

    @test
    public createFrame_fromData_customFrameCreatorMatch() {
        try {
            // Arrange
            const frame = PlayCountFrame.fromEmpty();
            const data = frame.render(4);
            const mockCreator = TypeMoq.Mock.ofType<FrameCreator>();
            mockCreator.setup(
                (c) => c(TypeMoq.It.isAny(), TypeMoq.It.isValue(0), TypeMoq.It.isAny(), TypeMoq.It.isValue(4))
            ).returns(() => frame);

            // Act
            FrameFactory.addFrameCreator(mockCreator.object);
            const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

            // Assert
            assert.isOk(output);
            assert.strictEqual(output.frame, frame);
            assert.strictEqual(output.offset, data.length);

            mockCreator.verify(
                (c) => c(
                    TypeMoq.It.is<ByteVector>((d) => ByteVector.equal(d, data)),
                    TypeMoq.It.isValue(0),
                    TypeMoq.It.isAny(),
                    TypeMoq.It.isValue(4)
                ),
                TypeMoq.Times.once()
            );
        } finally {
            FrameFactory.clearFrameCreators();
        }
    }

    @test
    public createFrame_fromData_customFrameCreatorNoMatch() {
        try {
            // Arrange
            const frame = PlayCountFrame.fromEmpty();
            const data = frame.render(4);
            const mockCreator = TypeMoq.Mock.ofType<FrameCreator>();
            mockCreator.setup(
                (c) => c(TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny())
            ).returns(() => undefined);

            // Act
            FrameFactory.addFrameCreator(mockCreator.object);
            const output = FrameFactory.createFrame(data, undefined, 0, 4, false);

            // Assert
            FrameFactoryTests.validateOutput(output, FrameClassType.PlayCountFrame, data.length);
            assert.notStrictEqual(output.frame, frame);

            mockCreator.verify(
                (c) => c(
                    TypeMoq.It.is<ByteVector>((d) => ByteVector.equal(d, data)),
                    TypeMoq.It.isValue(0),
                    TypeMoq.It.isAny(),
                    TypeMoq.It.isValue(4)
                ),
                TypeMoq.Times.once()
            );
        } finally {
            FrameFactory.clearFrameCreators();
        }
    }

    private static validateOutput(output: {frame: Frame, offset: number}, fct: FrameClassType, o: number) {
        assert.ok(output);
        assert.strictEqual(output.frame.frameClassType, fct);
        assert.strictEqual(output.offset, o);
    }
}
