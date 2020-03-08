import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import {slow, suite, test, timeout} from "mocha-typescript";

import Id3v2Tag from "../../src/id3v2/id3v2Tag";
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
import {IPicture} from "../../src/picture";

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
        const tag = Id3v2Tag.fromData(data);

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
        const tag = Id3v2Tag.fromData(data);

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
        const tag = Id3v2Tag.fromData(data);

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
        const tag = Id3v2Tag.fromEmpty();

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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        // Arrange
        const tag = Id3v2Tag.fromEmpty();

        // Act / Assert
        assert.deepStrictEqual(tag.performersRole, []);

        const tmclFrame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TMCL);
        const tmclText = ["saxophone", "alice,bob", "flugelhorn", "alice"];
        tmclFrame.text = tmclText;
        tag.frames.push(tmclFrame);
        tag.performers = ["alice", "bob", "malory"];
        const expected = ["saxophone;flugelhorn", "saxophone", undefined];
        assert.deepStrictEqual(tag.performersRole, expected);

        const newData = ["saxophone", "flugelhorn", undefined];
        tag.performersRole = newData;
        assert.deepStrictEqual(tag.performersRole, newData);
        assert.deepStrictEqual(tmclFrame.text, tmclText);

        tag.performersRole = undefined;
        assert.deepStrictEqual(tag.performersRole, [undefined, undefined, undefined]);
        assert.deepStrictEqual(tmclFrame.text, tmclText);

        tag.performers = [];
        assert.deepStrictEqual(tag.performersRole, []);
        assert.deepStrictEqual(tmclFrame.text, tmclText);
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
        const tag = Id3v2Tag.fromEmpty();

        // Act
        const output = tag.comment;

        // Assert
        assert.isUndefined(output);
    }

    @test
    public comment_multipleFrames_picksBestLanguage() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();

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
        const tag = Id3v2Tag.fromEmpty();

        // Act
        const output = tag.genres;

        // Assert
        assert.deepStrictEqual(output, []);
    }

    @test
    public genres_withFrame() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();

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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();

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

    @test
    public year_invalidValues() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const set = (v: number) => { tag.year = v; };

        // Act / Assert
        PropertyTests.propertyThrows(set, undefined);
        PropertyTests.propertyThrows(set, -123);
        PropertyTests.propertyThrows(set, 1.23);
        PropertyTests.propertyThrows(set, Number.MAX_SAFE_INTEGER + 1);
    }

    @test
    public year_fromTrdc() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();

        // Act / Assert
        assert.strictEqual(tag.year, 0);

        const tdrcFrame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TDRC);
        tdrcFrame.text = ["1234-04-25"];
        tag.frames.push(tdrcFrame);
        assert.strictEqual(tag.year, 1234);

        const tyerFrame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TYER);
        tyerFrame.text = ["2345"];
        tag.frames.push(tyerFrame);
        assert.strictEqual(tag.year, 1234);

        tag.year = 3456;
        assert.strictEqual(tag.year, 3456);
        assert.deepStrictEqual(tdrcFrame.text, ["3456"]);
        assert.deepStrictEqual(tyerFrame.text, ["2345"]);
        assert.strictEqual(tag.frames.length, 2);

        tag.year = 99999;
        assert.strictEqual(tag.year, 0);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public year_fromTyer() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();

        // Act / Assert
        assert.strictEqual(tag.year, 0);

        const tyerFrame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TYER);
        tyerFrame.text = ["1234"];
        tag.frames.push(tyerFrame);
        assert.strictEqual(tag.year, 1234);

        tag.year = 2345;
        assert.strictEqual(tag.year, 2345);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0], tyerFrame);
        assert.deepStrictEqual(tyerFrame.text, ["2345"]);

        tag.year = 99999;
        assert.strictEqual(tag.year, 0);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public year_noExistingFrame() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();

        // Act / Assert
        assert.strictEqual(tag.year, 0);

        tag.year = 1234;
        assert.strictEqual(tag.year, 1234);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TDRC);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["1234"]);

        tag.year = 99999;
        assert.strictEqual(tag.year, 0);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public track_invalidValue() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
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
        const tag = Id3v2Tag.fromEmpty();
        const set = (v: number) => { tag.beatsPerMinute = v; };
        const get = () => tag.beatsPerMinute;

        // Act / Assert
        assert.strictEqual(tag.beatsPerMinute, 0);

        PropertyTests.propertyRoundTrip(set, get, 128);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TBPM);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["128"]);

        (<TextInformationFrame> tag.frames[0]).text = ["123.4"];
        assert.strictEqual(tag.beatsPerMinute, 123);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 0);
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

    @test
    public dateTagged() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const set = (v: Date) => { tag.dateTagged = v; };
        const get = () => tag.dateTagged;

        // Act / Assert
        assert.isUndefined(tag.dateTagged);

        PropertyTests.propertyRoundTrip(set, get, new Date("2020-04-25 12:34:56"));
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TDTG);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["2020-04-25T12:34:56"]);

        (<TextInformationFrame> tag.frames[0]).text = ["bunchagarbage"];
        assert.isUndefined(tag.dateTagged);

        PropertyTests.propertyRoundTrip(set, get, undefined);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public musicBrainzArtistId() {
        this.testUserTextFrameProperty(
            (t, v) => { t.musicBrainzArtistId = v; },
            (t) => t.musicBrainzArtistId,
            "MusicBrainz Artist Id"
        );
    }

    @test
    public musicBrainzReleaseGroupId() {
        this.testUserTextFrameProperty(
            (t, v) => { t.musicBrainzReleaseGroupId = v; },
            (t) => t.musicBrainzReleaseGroupId,
            "MusicBrainz Release Group Id"
        );
    }

    @test
    public musicBrainzReleaseId() {
        this.testUserTextFrameProperty(
            (t, v) => { t.musicBrainzReleaseId = v; },
            (t) => t.musicBrainzReleaseId,
            "MusicBrainz Album Id"
        );
    }

    @test
    public musicBrainzReleaseArtistId() {
        this.testUserTextFrameProperty(
            (t, v) => { t.musicBrainzReleaseArtistId = v; },
            (t) => t.musicBrainzReleaseArtistId,
            "MusicBrainz Album Artist Id"
        );
    }

    @test
    public musicBrainzTrackId() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const set = (v: string) => { tag.musicBrainzTrackId = v; };
        const get = () => tag.musicBrainzTrackId;

        // Act / Assert
        assert.isUndefined(tag.dateTagged);

        PropertyTests.propertyRoundTrip(set, get, "abcd-ef12-3456-7890");
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.UniqueFileIdentifierFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.UFID);
        assert.deepStrictEqual((<UniqueFileIdentifierFrame> tag.frames[0]).owner, "http://musicbrainz.org");
        const expectedBytes = ByteVector.fromString("abcd-ef12-3456-7890");
        const actualBytes = (<UniqueFileIdentifierFrame> tag.frames[0]).identifier;
        assert.isTrue(ByteVector.equal(actualBytes, expectedBytes));

        PropertyTests.propertyRoundTrip(set, get, undefined);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public musicBrainsDiscId() {
        this.testUserTextFrameProperty(
            (t, v) => { t.musicBrainzDiscId = v; },
            (t) => t.musicBrainzDiscId,
            "MusicBrainz Disc Id"
        );
    }

    @test
    public musicIpId() {
        this.testUserTextFrameProperty(
            (t, v) => { t.musicIpId = v; },
            (t) => t.musicIpId,
            "MusicIP PUID"
        );
    }

    @test
    public amazonId() {
        this.testUserTextFrameProperty(
            (t, v) => { t.amazonId = v; },
            (t) => t.amazonId,
            "ASIN"
        );
    }

    @test
    public musicBrainzReleaseStatus() {
        this.testUserTextFrameProperty(
            (t, v) => { t.musicBrainzReleaseStatus = v; },
            (t) => t.musicBrainzReleaseStatus,
            "MusicBrainz Album Status"
        );
    }

    @test
    public musicBrainzReleaseType() {
        this.testUserTextFrameProperty(
            (t, v) => { t.musicBrainzReleaseType = v; },
            (t) => t.musicBrainzReleaseType,
            "MusicBrainz Album Type"
        );
    }

    @test
    public musicBrainzReleaseCountry() {
        this.testUserTextFrameProperty(
            (t, v) => { t.musicBrainzReleaseCountry = v; },
            (t) => t.musicBrainzReleaseCountry,
            "MusicBrainz Album Release Country"
        );
    }

    @test
    public replayGainTrackGain() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const setProp = (v: number) => { tag.replayGainTrackGain = v; };
        const getProp = () => tag.replayGainTrackGain;

        // Act / Assert
        assert.isNaN(getProp());

        PropertyTests.propertyNormalized(setProp, getProp, 1.23456, 1.23);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.UserTextInformationFrame);
        assert.strictEqual((<UserTextInformationFrame> tag.frames[0]).description, "REPLAYGAIN_TRACK_GAIN");
        assert.deepStrictEqual((<UserTextInformationFrame> tag.frames[0]).text, ["1.23 dB"]);

        (<UserTextInformationFrame> tag.frames[0]).text = ["1.23"];
        assert.strictEqual(tag.replayGainTrackGain, 1.23);

        (<UserTextInformationFrame> tag.frames[0]).text = ["abcdef"];
        assert.isNaN(tag.replayGainTrackGain);

        PropertyTests.propertyNormalized(setProp, getProp, undefined, Number.NaN);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public replayGainTrackPeak() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const setProp = (v: number) => { tag.replayGainTrackPeak = v; };
        const getProp = () => tag.replayGainTrackPeak;

        // Act / Assert
        assert.isNaN(getProp());

        PropertyTests.propertyNormalized(setProp, getProp, 1.23456789, 1.234568);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.UserTextInformationFrame);
        assert.strictEqual((<UserTextInformationFrame> tag.frames[0]).description, "REPLAYGAIN_TRACK_PEAK");
        assert.deepStrictEqual((<UserTextInformationFrame> tag.frames[0]).text, ["1.234568"]);

        (<UserTextInformationFrame> tag.frames[0]).text = ["abcdef"];
        assert.isNaN(tag.replayGainTrackPeak);

        PropertyTests.propertyNormalized(setProp, getProp, undefined, Number.NaN);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public replayGainAlbumGain() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const setProp = (v: number) => { tag.replayGainAlbumGain = v; };
        const getProp = () => tag.replayGainAlbumGain;

        // Act / Assert
        assert.isNaN(getProp());

        PropertyTests.propertyNormalized(setProp, getProp, 1.23456, 1.23);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.UserTextInformationFrame);
        assert.strictEqual((<UserTextInformationFrame> tag.frames[0]).description, "REPLAYGAIN_ALBUM_GAIN");
        assert.deepStrictEqual((<UserTextInformationFrame> tag.frames[0]).text, ["1.23 dB"]);

        (<UserTextInformationFrame> tag.frames[0]).text = ["1.23"];
        assert.strictEqual(tag.replayGainAlbumGain, 1.23);

        (<UserTextInformationFrame> tag.frames[0]).text = ["abcdef"];
        assert.isNaN(tag.replayGainAlbumGain);

        PropertyTests.propertyNormalized(setProp, getProp, undefined, Number.NaN);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public replayGainAlbumPeak() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const setProp = (v: number) => { tag.replayGainAlbumPeak = v; };
        const getProp = () => tag.replayGainAlbumPeak;

        // Act / Assert
        assert.isNaN(getProp());

        PropertyTests.propertyNormalized(setProp, getProp, 1.23456789, 1.234568);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.UserTextInformationFrame);
        assert.strictEqual((<UserTextInformationFrame> tag.frames[0]).description, "REPLAYGAIN_ALBUM_PEAK");
        assert.deepStrictEqual((<UserTextInformationFrame> tag.frames[0]).text, ["1.234568"]);

        (<UserTextInformationFrame> tag.frames[0]).text = ["abcdef"];
        assert.isNaN(tag.replayGainAlbumPeak);

        PropertyTests.propertyNormalized(setProp, getProp, undefined, Number.NaN);
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public initialKey() {
        this.testTextFrameProperty(
            (t, v) => { t.initialKey = v; },
            (t) => t.initialKey,
            FrameIdentifiers.TKEY
        );
    }

    @test
    public remixedBy() {
        this.testTextFrameProperty(
            (t, v) => { t.remixedBy = v; },
            (t) => t.remixedBy,
            FrameIdentifiers.TPE4
        );
    }

    @test
    public publisher() {
        this.testTextFrameProperty(
            (t, v) => { t.publisher = v; },
            (t) => t.publisher,
            FrameIdentifiers.TPUB
        );
    }

    @test
    public isrc() {
        this.testTextFrameProperty(
            (t, v) => { t.isrc = v; },
            (t) => t.isrc,
            FrameIdentifiers.TSRC
        );
    }

    @test
    public pictures() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const mockPicture1 = TypeMoq.Mock.ofType<IPicture>();
        const mockPicture2 = TypeMoq.Mock.ofType<IPicture>();
        const pictures = [
            mockPicture1.object,
            mockPicture2.object
        ];

        // Act / Assert
        assert.ok(tag.pictures);
        assert.isEmpty(tag.pictures);

        tag.pictures = pictures;
        assert.strictEqual(tag.frames.length, 2);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.AttachmentFrame);
        assert.strictEqual(tag.frames[1].frameClassType, FrameClassType.AttachmentFrame);

        tag.pictures = undefined;
        assert.deepStrictEqual(tag.pictures, []);
    }

    @test
    public isEmpty() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();

        // Act / Assert
        assert.isTrue(tag.isEmpty);

        tag.isrc = "1234";
        assert.isFalse(tag.isEmpty);
    }

    private testArrayTextFrameProperty(
        set: (t: Id3v2Tag, v: string[]) => void,
        get: (t: Id3v2Tag) => string[],
        fId: FrameIdentifier
    ) {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
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

    private testTextFrameProperty(
        set: (t: Id3v2Tag, v: string) => void,
        get: (t: Id3v2Tag) => string,
        fId: FrameIdentifier
    ) {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
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

    private testUserTextFrameProperty(
        set: (t: Id3v2Tag, v: string) => void,
        get: (t: Id3v2Tag) => string,
        desc: string
    ) {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const setProp = (v: string) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.isUndefined(getProp());

        PropertyTests.propertyRoundTrip(setProp, getProp, "foo");
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameClassType, FrameClassType.UserTextInformationFrame);
        assert.strictEqual((<UserTextInformationFrame> tag.frames[0]).description, desc);
        assert.deepStrictEqual((<UserTextInformationFrame> tag.frames[0]).text, ["foo"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, undefined);
        assert.strictEqual(tag.frames.length, 0);
    }
}
