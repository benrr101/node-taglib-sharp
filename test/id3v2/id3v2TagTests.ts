import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import {slow, suite, test, timeout} from "mocha-typescript";

import Id3v2Tag from "../../src/id3v2/id3v2Tag";
import id3v2Tag from "../../src/id3v2/id3v2Tag";
import SyncData from "../../src/id3v2/syncData";
import TestFile from "../utilities/testFile";
import {ByteVector, StringType} from "../../src/byteVector";
import {File, ReadStyle} from "../../src/file";
import {Id3v2TagHeaderFlags} from "../../src/id3v2/id3v2TagHeader";
import PlayCountFrame from "../../src/id3v2/frames/playCountFrame";
import UniqueFileIdentifierFrame from "../../src/id3v2/frames/uniqueFileIdentifierFrame";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {FrameClassType} from "../../src/id3v2/frames/frame";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import PropertyTests from "../utilities/propertyTests";
import {TextInformationFrame, UserTextInformationFrame} from "../../src/id3v2/frames/textInformationFrame";
import {TagTypes} from "../../src/tag";
import CommentsFrame from "../../src/id3v2/frames/commentsFrame";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import UnsynchronizedLyricsFrame from "../../src/id3v2/frames/unsynchronizedLyricsFrame";

// Setup Chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

function getTestTagHeader(version: number, flags: Id3v2TagHeaderFlags, tagSize: number): ByteVector {
    return ByteVector.concatenate(
        ByteVector.fromString("ID3", StringType.Latin1),
        version, 0x00,
        flags,
        SyncData.fromUint(tagSize)
    );
}

@suite(slow(1000), timeout(3000))
class Id3v2_Tag_ConstructorTests {
    @test
    public fromData_falsyData() {
        // Act / Assert
        assert.throws(() => { Id3v2Tag.fromData(undefined); });
        assert.throws(() => { Id3v2Tag.fromData(null); });
    }

    @test
    public fromData_dataAbsolutelyTooShort() {
        // Arrange
        const data = ByteVector.fromSize(5);

        // Act / Assert
        assert.throws(() => { Id3v2Tag.fromData(data); });
    }

    @test
    public fromData_emptyTag() {
        // Arrange
        const data = getTestTagHeader(4, Id3v2TagHeaderFlags.None, 0);

        // Act
        const output = Id3v2Tag.fromData(data);

        // Assert
        assert.isOk(output);
    }

    @test
    public fromData_dataTooShortForTagLength() {
        // Arrange
        const data = ByteVector.concatenate(
            getTestTagHeader(4, Id3v2TagHeaderFlags.None, 5),
            0x00, 0x00
        );

        // Act / Assert
        assert.throws(() => { Id3v2Tag.fromData(data); });
    }

    @test
    public fromData_v4Tag() {
        // Arrange
        const frame1 = PlayCountFrame.fromEmpty().render(4);
        const frame2 = UniqueFileIdentifierFrame.fromData("foo", ByteVector.fromString("bar")).render(4);
        const emptyFrame = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.empty()).render(4);
        const data = ByteVector.concatenate(
            getTestTagHeader(4, Id3v2TagHeaderFlags.None, frame1.length + frame2.length + emptyFrame.length + 5),
            frame1,
            frame2,
            emptyFrame,
            0x00, 0x00, 0x00, 0x00, 0x00 // Padding at end of tag
        );

        // Act
        const tag = id3v2Tag.fromData(data);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2);

        let frame1Found = false;
        let frame2Found = false;
        let emptyFrameFound = false;
        for (const f of tag.frames) {
            switch (f.frameClassType) {
                case FrameClassType.PlayCountFrame:
                    assert.isFalse(frame1Found);
                    frame1Found = true;
                    break;
                case FrameClassType.UniqueFileIdentifierFrame:
                    assert.isFalse(frame2Found);
                    frame2Found = true;
                    break;
                case FrameClassType.UnknownFrame:
                    emptyFrameFound = true;
                    break;
                default:
                    assert.fail(f.frameClassType, undefined, "Unexpected frame found");
            }
        }
        assert.isTrue(frame1Found);
        assert.isTrue(frame2Found);
        assert.isFalse(emptyFrameFound);
    }

    @test
    public fromData_extendedHeader() {
        // Arrange
        const frame1 = PlayCountFrame.fromEmpty().render(4);
        const data = ByteVector.concatenate(
            getTestTagHeader(4, Id3v2TagHeaderFlags.ExtendedHeader, frame1.length + 10),
            SyncData.fromUint(10),
            0x01,
            0x00,
            0x00, 0x00, 0x00, 0x00,
            frame1
        );

        // Act
        const tag = id3v2Tag.fromData(data);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2);

        // - Right frames
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.PlayCountFrame);
    }

    @test
    public fromData_needsResync() {
        // Arrange
        const frame1 = PlayCountFrame.fromEmpty().render(4);
        const data = ByteVector.concatenate(
            getTestTagHeader(3, Id3v2TagHeaderFlags.Unsynchronication, frame1.length),
            frame1
        );
        SyncData.unsyncByteVector(data);

        // Act
        const tag = id3v2Tag.fromData(data);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2);

        // - Right frames
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.PlayCountFrame);
    }

    @test
    public fromFile_falsyFile() {
        // Act / Assert
        assert.throws(() => { Id3v2Tag.fromFile(undefined, 0, ReadStyle.None); });
        assert.throws(() => { Id3v2Tag.fromFile(null, 0, ReadStyle.None); });
    }

    @test
    public fromFile_invalidPosition() {
        // Arrange
        const file = TestFile.getFile(ByteVector.empty());

        // Act / Assert
        assert.throws(() => { Id3v2Tag.fromFile(file, -1, ReadStyle.None); });
        assert.throws(() => { Id3v2Tag.fromFile(file, 1.23, ReadStyle.None); });
        assert.throws(() => { Id3v2Tag.fromFile(file, Number.MAX_SAFE_INTEGER + 1, ReadStyle.None); });
    }

    @test
    public fromFile_positionTooFar() {
        // Arrange
        const mockFile = TypeMoq.Mock.ofType<File>();
        mockFile.setup((f: File) => f.length).returns(() => 14);

        // Act / Assert
        assert.throws(() => { Id3v2Tag.fromFile(mockFile.object, 5, ReadStyle.None); });
    }

    @test
    public fromFile_emptyTag() {
        // Arrange
        const data = getTestTagHeader(4, Id3v2TagHeaderFlags.None, 0);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2Tag.fromFile(file, 0, ReadStyle.None);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.tagTypes, TagTypes.Id3v2);
    }

    @test
    public fromFile_v4Tag() {
        const frame1 = PlayCountFrame.fromEmpty().render(4);
        const frame2 = UniqueFileIdentifierFrame.fromData("foo", ByteVector.fromString("bar")).render(4);
        const emptyFrame = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.empty()).render(4);
        const data = ByteVector.concatenate(
            0x00, 0x00,
            getTestTagHeader(4, Id3v2TagHeaderFlags.None, frame1.length + frame2.length + emptyFrame.length + 5),
            frame1,
            frame2,
            emptyFrame,
            0x00, 0x00, 0x00, 0x00, 0x00 // Padding at end of tag
        );
        const file = TestFile.getFile(data);

        // Act
        const tag = Id3v2Tag.fromFile(file, 2, ReadStyle.None);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2);

        let frame1Found = false;
        let frame2Found = false;
        let emptyFrameFound = false;
        for (const f of tag.frames) {
            switch (f.frameClassType) {
                case FrameClassType.PlayCountFrame:
                    assert.isFalse(frame1Found);
                    frame1Found = true;
                    break;
                case FrameClassType.UniqueFileIdentifierFrame:
                    assert.isFalse(frame2Found);
                    frame2Found = true;
                    break;
                case FrameClassType.UnknownFrame:
                    emptyFrameFound = true;
                    break;
                default:
                    assert.fail(f.frameClassType, undefined, "Unexpected frame found");
            }
        }
        assert.isTrue(frame1Found);
        assert.isTrue(frame2Found);
        assert.isFalse(emptyFrameFound);
    }
}

@suite(slow(1000), timeout(3000))
class Id3v2_Tag_PropertyTests {
    @test
    public flags() {
        // Arrange
        const tag = new Id3v2Tag();

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { tag.flags = v; },
            () => tag.flags,
            Id3v2TagHeaderFlags.ExperimentalIndicator
        );
    }

    @test
    public isCompilation() {
        // Arrange
        const tag = new Id3v2Tag();
        const get = () => tag.isCompilation;
        const set = (v: boolean) => { tag.isCompilation = v; };

        // Act / Assert
        assert.isFalse(tag.isCompilation);

        PropertyTests.propertyRoundTrip(set, get, true);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TCMP);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["1"]);

        PropertyTests.propertyRoundTrip(set, get, false);
        assert.strictEqual(tag.frames.length, 0);

        tag.setTextFrame(FrameIdentifiers.TCMP, "0");
        assert.strictEqual(tag.isCompilation, false);
    }

    @test
    public version() {
        // TODO: Need to figure out what to do if header doesn't exist
    }

    @test
    public title() {
        this.testTextFrameProperty(
            (t, v) => { t.title = v; },
            (t) => t.title,
            FrameIdentifiers.TIT2
        );
    }

    @test
    public titleSort() {
        this.testTextFrameProperty(
            (t, v) => { t.titleSort = v; },
            (t) => t.titleSort,
            FrameIdentifiers.TSOT
        );
    }

    @test
    public subtitle() {
        this.testTextFrameProperty(
            (t, v) => { t.subtitle = v; },
            (t) => t.subtitle,
            FrameIdentifiers.TIT3
        );
    }

    @test
    public description() {
        // Arrange
        const tag = new Id3v2Tag();
        const set = (v: string) => { tag.description = v; };
        const get = () => tag.description;

        // Act / Assert
        assert.isUndefined(tag.description);

        PropertyTests.propertyRoundTrip(set, get, "foo");
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.UserTextInformationFrame);
        assert.strictEqual((<UserTextInformationFrame> tag.frames[0]).description, "Description");
        assert.deepStrictEqual((<UserTextInformationFrame> tag.frames[0]).text, ["foo"]);

        PropertyTests.propertyRoundTrip(set, get, undefined);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public performers() {
        this.testArrayTextFrameProperty(
            (t, v) => { t.performers = v; },
            (t) => t.performers,
            FrameIdentifiers.TPE1
        );
    }

    @test
    public performersSort() {
        this.testArrayTextFrameProperty(
            (t, v) => { t.performersSort = v; },
            (t) => t.performersSort,
            FrameIdentifiers.TSOP
        );
    }

    @test
    public performersRole() {
        // TODO: Write test
    }

    @test
    public albumArtists() {
        this.testArrayTextFrameProperty(
            (t, v) => { t.albumArtists = v; },
            (t) => t.albumArtists,
            FrameIdentifiers.TPE2
        );
    }

    @test
    public albumArtistsSort() {
        this.testArrayTextFrameProperty(
            (t, v) => { t.albumArtistsSort = v; },
            (t) => t.albumArtistsSort,
            FrameIdentifiers.TSO2
        );
    }

    @test
    public composers() {
        this.testArrayTextFrameProperty(
            (t, v) => { t.composers = v; },
            (t) => t.composers,
            FrameIdentifiers.TCOM
        );
    }

    @test
    public composersSort() {
        this.testArrayTextFrameProperty(
            (t, v) => { t.composersSort = v; },
            (t) => t.composersSort,
            FrameIdentifiers.TSOC
        );
    }

    @test
    public album() {
        this.testTextFrameProperty(
            (t, v) => { t.album = v; },
            (t) => t.album,
            FrameIdentifiers.TALB
        );
    }

    @test
    public albumSort() {
        this.testTextFrameProperty(
            (t, v) => { t.albumSort = v; },
            (t) => t.albumSort,
            FrameIdentifiers.TSOA
        );
    }

    @test
    public comment_noCommentFrames() {
        // Arrange
        const tag = new Id3v2Tag();

        // Act
        const output = tag.comment;

        // Assert
        assert.isUndefined(output);
    }

    @test
    public comment_multipleFrames_picksBestLanguage() {
        // Arrange
        const tag = new Id3v2Tag();
        const frame1 = CommentsFrame.fromDescription("", "jpn");
        frame1.text = "foo";
        tag.addFrame(frame1);
        const frame2 = CommentsFrame.fromDescription("", "eng");
        frame2.text = "bar";
        tag.addFrame(frame2);

        const initialLanguage = Id3v2Tag.language;
        try {
            // Act
            Id3v2Tag.language = "eng";
            const output = tag.comment;

            // Assert
            assert.strictEqual(output, "bar");
        } finally {
            Id3v2Tag.language = initialLanguage;
        }
    }

    @test
    public comment_setToFalsy_removesFrames() {
        // Arrange
        const tag = new Id3v2Tag();
        const frame1 = CommentsFrame.fromDescription("", "jpn");
        frame1.text = "foo";
        tag.addFrame(frame1);
        const frame2 = CommentsFrame.fromDescription("", "eng");
        frame2.text = "bar";
        tag.addFrame(frame2);

        const initialLanguage = Id3v2Tag.language;
        try {
            // Act
            Id3v2Tag.language = "eng";
            tag.comment = undefined;

            // Assert
            assert.strictEqual(tag.comment, undefined);
            assert.strictEqual(tag.frames.length, 0);
        } finally {
            Id3v2Tag.language = initialLanguage;
        }
    }

    @test
    public comment_setToTruthy_setsLanguageFrame() {
        // Arrange
        const tag = new Id3v2Tag();
        const frame1 = CommentsFrame.fromDescription("", "jpn");
        frame1.text = "foo";
        tag.addFrame(frame1);
        const frame2 = CommentsFrame.fromDescription("", "eng");
        frame2.text = "bar";
        tag.addFrame(frame2);

        const initialLanguage = Id3v2Tag.language;
        try {
            // Act
            Id3v2Tag.language = "eng";
            tag.comment = "qux";

            // Assert
            assert.strictEqual(tag.comment, "qux");
            assert.strictEqual(tag.frames.length, 2);
            assert.strictEqual(frame2.text, "qux");
            assert.strictEqual(frame1.text, "foo");
        } finally {
            Id3v2Tag.language = initialLanguage;
        }
    }

    @test
    public comment_setToTruthy_addsLanguageFrame() {
        // Arrange
        const tag = new Id3v2Tag();

        const initialLanguage = Id3v2Tag.language;
        try {
            // Act
            Id3v2Tag.language = "eng";
            tag.comment = "foo";

            // Assert
            assert.strictEqual(tag.comment, "foo");
            assert.strictEqual(tag.frames.length, 1);
            assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.CommentsFrame);
            assert.strictEqual((<CommentsFrame> tag.frames[0]).text, "foo");
            assert.strictEqual((<CommentsFrame> tag.frames[0]).language, "eng");
            assert.strictEqual((<CommentsFrame> tag.frames[0]).description, "");
        } finally {
            Id3v2Tag.language = initialLanguage;
        }
    }

    @test
    public genres_noFrame() {
        // Arrange
        const tag = new Id3v2Tag();

        // Act
        const output = tag.genres;

        // Assert
        assert.deepStrictEqual(output, []);
    }

    @test
    public genres_withFrame() {
        // Arrange
        const tag = new Id3v2Tag();
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCON);
        frame.text = ["32", "foo"];
        tag.addFrame(frame);

        // Act
        const output = tag.genres;

        // Assert
        assert.deepStrictEqual(output, ["Classical", "foo"]);
    }

    @test
    public genres_setValueWithNoFrame() {
        // Arrange
        const tag = new Id3v2Tag();

        // Act
        tag.genres = ["Classical", "foo"];

        // Assert
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TCON);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["32", "foo"]);
    }

    @test
    public genres_setValueWithFrame() {
        // Arrange
        const tag = new Id3v2Tag();
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCON);
        frame.text = ["qux"];
        tag.addFrame(frame);

        // Act
        tag.genres = ["Classical", "foo"];

        // Assert
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TCON);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["32", "foo"]);
    }

    @test
    public genres_setValueWithNumericGenresTurnedOff() {
        // Arrange
        const tag = new Id3v2Tag();

        const initialSetting = Id3v2Settings.useNumericGenres;
        try {
            // Act
            Id3v2Settings.useNumericGenres = false;
            tag.genres = ["Classical", "foo"];

            // Assert
            assert.strictEqual(tag.frames.length, 1);
            assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
            assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TCON);
            assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["Classical", "foo"]);
        } finally {
            Id3v2Settings.useNumericGenres = initialSetting;
        }
    }

    public year() {
        // TODO: do it.
    }

    @test
    public track_invalidValue() {
        // Arrange
        const tag = new Id3v2Tag();
        const set = (v: number) => { tag.track = v; };

        // Act / Assert
        PropertyTests.propertyThrows(set, undefined);
        PropertyTests.propertyThrows(set, null);
        PropertyTests.propertyThrows(set, 1.23);
        PropertyTests.propertyThrows(set, -1);
        PropertyTests.propertyThrows(set, Number.MAX_SAFE_INTEGER + 1);
    }

    @test
    public track_noTrackCount() {
        // Arrange
        const tag = new Id3v2Tag();
        const set = (v: number) => { tag.track = v; };
        const get = () => tag.track;

        // Act / Assert
        assert.strictEqual(tag.track, 0);

        PropertyTests.propertyRoundTrip(set, get, 2);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["02"]);

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["123"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public track_withTrackCount() {
        // Arrange
        const tag = new Id3v2Tag();
        tag.trackCount = 123;
        const set = (v: number) => { tag.track = v; };
        const get = () => tag.track;

        // Act / Assert
        assert.strictEqual(tag.track, 0);

        PropertyTests.propertyRoundTrip(set, get, 2);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["02/123"]);

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["123/123"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["00/123"]);
    }

    @test
    public trackCount_invalidValue() {
        // Arrange
        const tag = new Id3v2Tag();
        const set = (v: number) => { tag.trackCount = v; };

        // Act / Assert
        PropertyTests.propertyThrows(set, undefined);
        PropertyTests.propertyThrows(set, null);
        PropertyTests.propertyThrows(set, 1.23);
        PropertyTests.propertyThrows(set, -1);
        PropertyTests.propertyThrows(set, Number.MAX_SAFE_INTEGER + 1);
    }

    @test
    public trackCount_noTrack() {
        // Arrange
        const tag = new Id3v2Tag();
        const set = (v: number) => { tag.trackCount = v; };
        const get = () => tag.trackCount;

        // Act / Assert
        assert.strictEqual(tag.trackCount, 0);

        PropertyTests.propertyRoundTrip(set, get, 2);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["0/2"]);

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["0/123"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public trackCount_withTrack() {
        // Arrange
        const tag = new Id3v2Tag();
        tag.track = 12;
        const set = (v: number) => { tag.trackCount = v; };
        const get = () => tag.trackCount;

        // Act / Assert
        assert.strictEqual(tag.trackCount, 0);

        PropertyTests.propertyRoundTrip(set, get, 2);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["12/2"]);

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["12/123"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["12"]);
    }

    @test
    public disc_invalidValue() {
        // Arrange
        const tag = new Id3v2Tag();
        const set = (v: number) => { tag.disc = v; };

        // Act / Assert
        PropertyTests.propertyThrows(set, undefined);
        PropertyTests.propertyThrows(set, null);
        PropertyTests.propertyThrows(set, 1.23);
        PropertyTests.propertyThrows(set, -1);
        PropertyTests.propertyThrows(set, Number.MAX_SAFE_INTEGER + 1);
    }

    @test
    public disc_noDiscCount() {
        // Arrange
        const tag = new Id3v2Tag();
        const set = (v: number) => { tag.disc = v; };
        const get = () => tag.disc;

        // Act / Assert
        assert.strictEqual(tag.disc, 0);

        PropertyTests.propertyRoundTrip(set, get, 2);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TPOS);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["2"]);

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TPOS);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["123"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public disc_withDiscCount() {
        // Arrange
        const tag = new Id3v2Tag();
        tag.discCount = 123;
        const set = (v: number) => { tag.disc = v; };
        const get = () => tag.disc;

        // Act / Assert
        assert.strictEqual(tag.disc, 0);

        PropertyTests.propertyRoundTrip(set, get, 2);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TPOS);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["2/123"]);

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TPOS);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["123/123"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TPOS);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["0/123"]);
    }

    @test
    public discCount_invalidValue() {
        // Arrange
        const tag = new Id3v2Tag();
        const set = (v: number) => { tag.discCount = v; };

        // Act / Assert
        PropertyTests.propertyThrows(set, undefined);
        PropertyTests.propertyThrows(set, null);
        PropertyTests.propertyThrows(set, 1.23);
        PropertyTests.propertyThrows(set, -1);
        PropertyTests.propertyThrows(set, Number.MAX_SAFE_INTEGER + 1);
    }

    @test
    public discCount_noDisc() {
        // Arrange
        const tag = new Id3v2Tag();
        const set = (v: number) => { tag.discCount = v; };
        const get = () => tag.discCount;

        // Act / Assert
        assert.strictEqual(tag.discCount, 0);

        PropertyTests.propertyRoundTrip(set, get, 2);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TPOS);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["0/2"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public discCount_withDisc() {
        // Arrange
        const tag = new Id3v2Tag();
        tag.disc = 12;
        const set = (v: number) => { tag.discCount = v; };
        const get = () => tag.discCount;

        // Act / Assert
        assert.strictEqual(tag.discCount, 0);

        PropertyTests.propertyRoundTrip(set, get, 2);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TPOS);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["12/2"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TPOS);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["12"]);
    }

    @test
    public lyrics() {
        // Arrange
        const tag = new Id3v2Tag();
        const set = (v: string) => { tag.lyrics = v; };
        const get = () => tag.lyrics;

        const initialLanguage = Id3v2Tag.language;
        try {
            Id3v2Tag.language = "eng";

            // Act / Assert
            assert.strictEqual(tag.lyrics, undefined);

            PropertyTests.propertyRoundTrip(set, get, "lyrics");
            assert.strictEqual(tag.frames.length, 1);
            assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.UnsynchronizedLyricsFrame);
            assert.strictEqual((<UnsynchronizedLyricsFrame> tag.frames[0]).description, "");
            assert.deepStrictEqual((<UnsynchronizedLyricsFrame> tag.frames[0]).text, "lyrics");
            assert.strictEqual((<UnsynchronizedLyricsFrame> tag.frames[0]).textEncoding, Id3v2Settings.defaultEncoding);

            PropertyTests.propertyRoundTrip(set, get, undefined);
            assert.strictEqual(tag.frames.length, 0);
        } finally {
            Id3v2Tag.language = initialLanguage;
        }
    }

    @test
    public grouping() {
        this.testTextFrameProperty(
            (t, v) => { t.grouping = v; },
            (t) => t.grouping,
            FrameIdentifiers.TIT1
        );
    }

    @test
    public bpm() {
        // Arrange
        const tag = new Id3v2Tag();
        const set = (v: number) => { tag.beatsPerMinute = v; };
        const get = () => tag.beatsPerMinute;

        // Act / Assert
        assert.strictEqual(tag.beatsPerMinute, 0);

        PropertyTests.propertyRoundTrip(set, get, 128);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TBPM);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["123"]);

        (<TextInformationFrame> tag.frames[0]).text = ["123.4"];
        assert.strictEqual(tag.beatsPerMinute, 123);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 1);
    }

    @test
    public conductor() {
        this.testTextFrameProperty(
            (t, v) => { t.conductor = v; },
            (t) => t.conductor,
            FrameIdentifiers.TPE3
        );
    }

    @test
    public copyright() {
        this.testTextFrameProperty(
            (t, v) => { t.copyright = v; },
            (t) => t.copyright,
            FrameIdentifiers.TCOP
        );
    }

    // @test
    // public

    private testTextFrameProperty(
        set: (t: Id3v2Tag, v: string) => void,
        get: (t: Id3v2Tag) => string,
        fId: FrameIdentifier
    ) {
        // Arrange
        const tag = new Id3v2Tag();
        const setProp = (v: string) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.isUndefined(getProp());

        PropertyTests.propertyRoundTrip(setProp, getProp, "foo");
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, fId);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["foo"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, undefined);
        assert.strictEqual(tag.frames.length, 0);
    }

    private testArrayTextFrameProperty(
        set: (t: Id3v2Tag, v: string[]) => void,
        get: (t: Id3v2Tag) => string[],
        fId: FrameIdentifier
    ) {
        // Arrange
        const tag = new Id3v2Tag();
        const setProp = (v: string[]) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.deepStrictEqual(getProp(), []);

        PropertyTests.propertyRoundTrip(setProp, getProp, ["foo", "bar", "baz"]);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, fId);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["foo", "bar", "baz"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, []);
        assert.strictEqual(tag.frames.length, 0);
    }
}
