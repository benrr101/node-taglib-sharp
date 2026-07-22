import * as TypeMoq from "typemoq";
import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import AttachmentFrame from "../../src/id3v2/frames/attachmentFrame";
import CommentsFrame from "../../src/id3v2/frames/commentsFrame";
import GenreFrame from "../../src/id3v2/frames/genreFrame";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import Id3v2Tag from "../../src/id3v2/id3v2Tag";
import Id3v2TagFooter from "../../src/id3v2/tagFooter";
import PlayCountFrame from "../../src/id3v2/frames/playCountFrame";
import PrivateFrame from "../../src/id3v2/frames/privateFrame";
import PropertyTests from "../utilities/propertyTests";
import SyncData from "../../src/id3v2/syncData";
import TagHeader from "../../src/id3v2/tagHeader";
import TestFile from "../utilities/testFile";
import TextInformationFrame from "../../src/id3v2/frames/textInformationFrame";
import UniqueFileIdentifierFrame from "../../src/id3v2/frames/uniqueFileIdentifierFrame";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import UnsynchronizedLyricsFrame from "../../src/id3v2/frames/unsynchronizedLyricsFrame";
import UserTextInformationFrame from "../../src/id3v2/frames/userTextInformationFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {TagFlags} from "../../src/id3v2/enums";
import {File, ReadStyle} from "../../src/file";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {IPicture} from "../../src/picture";
import {TagTypes} from "../../src/tag";
import {Testers} from "../utilities/testers";

const getTestTagHeader = (version: number, flags: TagFlags, tagSize: number): ByteVector => {
    return ByteVector.concatenate(
        ByteVector.fromString("ID3", StringType.Latin1),
        version, 0x00,
        flags,
        SyncData.fromUint(tagSize)
    );
}

@suite class Id3v2_Tag_ConstructorTests {
    @test
    public fromData_falsyData() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => Id3v2Tag.fromData(v));
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
        const data = getTestTagHeader(4, TagFlags.None, 0);

        // Act
        const output = Id3v2Tag.fromData(data);

        // Assert
        assert.isOk(output);
        assert.isTrue(output.isEmpty);
    }

    @test
    public fromData_dataTooShortForTagLength() {
        // Arrange
        const data = ByteVector.concatenate(
            getTestTagHeader(4, TagFlags.None, 5),
            0x00, 0x00
        );

        // Act / Assert
        assert.throws(() => { Id3v2Tag.fromData(data); });
    }

    @test
    public fromData_v4Tag() {
        // Arrange
        const frameBytes = ByteVector.concatenate(
            PlayCountFrame.fromFields().render(4),
            UniqueFileIdentifierFrame.fromFields("foo", ByteVector.fromUint(123)).render(4),
            UnknownFrame.fromFields(FrameIdentifiers.RVRB, ByteVector.empty()).render(4),    // Empty frame
            ByteVector.fromSize(5)                                                           // Padding
        );
        const tagHeader = getTestTagHeader(4, TagFlags.None, frameBytes.length);
        const data = ByteVector.concatenate(tagHeader, frameBytes);

        // Act
        const tag = Id3v2Tag.fromData(data);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2);

        let playCountFrames = 0;
        let ufidFrames = 0;
        for (const f of tag.frames) {
            if (f instanceof PlayCountFrame) {
                playCountFrames++;
            } else if (f instanceof UniqueFileIdentifierFrame) {
                ufidFrames++;
            } else if (f instanceof UnknownFrame) {
                assert.fail("Empty frame found");
            } else {
                assert.fail("Unexpected frame found");
            }
        }

        assert.strictEqual(playCountFrames, 1);
        assert.strictEqual(ufidFrames, 1);
    }

    @test
    public fromData_extendedHeader() {
        // Arrange
        const frame1 = PlayCountFrame.fromFields().render(4);
        const data = ByteVector.concatenate(
            getTestTagHeader(4, TagFlags.ExtendedHeader, frame1.length + 10),
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
        assert.instanceOf(tag.frames[0], PlayCountFrame);
    }

    @test
    public fromData_needsResync() {
        // Arrange
        const frame1 = PlayCountFrame.fromFields(BigInt(123)).render(4);
        const data = ByteVector.concatenate(
            getTestTagHeader(3, TagFlags.Unsynchronization, frame1.length),
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
        assert.instanceOf(tag.frames[0], PlayCountFrame);
    }

    @test
    public fromFileStart_falsyFile() {
        // Act / Assert
        Testers.testTruthy((v: File) => Id3v2Tag.fromFileStart(v, 0, ReadStyle.None));
    }

    @test
    public fromFileStart_invalidPosition() {
        // Arrange
        const file = TestFile.getFile(ByteVector.empty());

        // Act / Assert
        Testers.testSafeUint((v) => Id3v2Tag.fromFileStart(file, v, ReadStyle.None));
    }

    @test
    public fromFileStart_positionTooFar() {
        // Arrange
        const mockFile = TypeMoq.Mock.ofType<File>();
        mockFile.setup((f: File) => f.length).returns(() => 14);

        // Act / Assert
        assert.throws(() => { Id3v2Tag.fromFileStart(mockFile.object, 5, ReadStyle.None); });
    }

    @test
    public fromFileStart_emptyTag() {
        // Arrange
        const data = getTestTagHeader(4, TagFlags.None, 0);
        const file = TestFile.getFile(data);

        // Act
        const output = Id3v2Tag.fromFileStart(file, 0, ReadStyle.None);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.tagTypes, TagTypes.Id3v2);
    }

    @params(0, "without_offset")
    @params(2, "with_offset")
    public fromFileStart_v4Tag(offset: number) {
        const frameBytes = ByteVector.concatenate(
            PlayCountFrame.fromFields(BigInt(123)).render(4),
            UniqueFileIdentifierFrame.fromFields("foo", ByteVector.fromUint(123)).render(4),
            UnknownFrame.fromFields(FrameIdentifiers.RVRB).render(4),                        // Empty frame
            ByteVector.fromSize(5)                                                           // Padding
        );
        const headerBytes = getTestTagHeader(4, TagFlags.None, frameBytes.length);
        const data = ByteVector.concatenate(ByteVector.fromSize(offset), headerBytes, frameBytes);
        const file = TestFile.getFile(data);

        // Act
        const tag = Id3v2Tag.fromFileStart(file, offset, ReadStyle.None);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.Id3v2);

        let playCountFrames = 0;
        let ufidFrames = 0;
        for (const f of tag.frames) {
            if (f instanceof PlayCountFrame) {
                playCountFrames++;
            } else if (f instanceof UniqueFileIdentifierFrame) {
                ufidFrames++;
            } else if (f instanceof UnknownFrame) {
                assert.fail("Empty frame found");
            } else {
                assert.fail("Unexpected frame found");
            }
        }

        assert.strictEqual(playCountFrames, 1);
        assert.strictEqual(ufidFrames, 1);
    }
}

@suite class Id3v2_Tag_PropertyTests {
    @test
    public flags() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { tag.flags = v; },
            () => tag.flags,
            TagFlags.ExperimentalIndicator
        );
    }

    @test
    public isCompilation() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const get = () => tag.isCompilation;
        const set = (v: boolean) => { tag.isCompilation = v; };

        // Act / Assert
        // 1) No frame => not a compilation
        assert.isFalse(tag.isCompilation);

        // 2) Set to true => creates a compilation frame
        PropertyTests.propertyRoundTrip(set, get, true);
        let compilationFrames = TextInformationFrame.filterFrames(tag.frames, FrameIdentifiers.TCMP);
        assert.strictEqual(compilationFrames.length, 1);
        assert.deepStrictEqual(compilationFrames[0].text, ["1"]);

        // 3) Frame is not "1" => not a compilation
        compilationFrames[0].text = ["0"];
        assert.strictEqual(tag.isCompilation, false);

        // 4) Set is compilator to false => frame is deleted
        PropertyTests.propertyRoundTrip(set, get, false);
        compilationFrames = TextInformationFrame.filterFrames(tag.frames, FrameIdentifiers.TCMP);
        assert.strictEqual(compilationFrames.length, 0);
    }

    @test
    public version_invalidValue() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const set = (v: number) => { tag.version = v; };

        // Act / Assert
        PropertyTests.propertyThrows(set, -1);
        PropertyTests.propertyThrows(set, 1.23);
        PropertyTests.propertyThrows(set, 0);
        PropertyTests.propertyThrows(set, 5);
        PropertyTests.propertyThrows(set, 1);
    }

    @test
    public version_validValue() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const set = (v: number) => { tag.version = v; };
        const get = () => tag.version;

        // Act / Assert
        Id3v2Settings.forceDefaultVersion = false;
        PropertyTests.propertyRoundTrip(set, get, 2);
        PropertyTests.propertyRoundTrip(set, get, 3);
        PropertyTests.propertyRoundTrip(set, get, 4);
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
        assert.instanceOf(tag.frames[0], UserTextInformationFrame);
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

        const tmclText = ["saxophone", "alice,bob", "flugelhorn", "alice"];
        const tmclFrame = TextInformationFrame.fromFields(FrameIdentifiers.TMCL, tmclText);
        tag.frames.push(tmclFrame);

        tag.performers = ["alice", "bob", "malory"];
        const expected = ["saxophone; flugelhorn", "saxophone", undefined];
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
        const frame1 = CommentsFrame.fromFields("foo", "bar", "jpn");
        const frame2 = CommentsFrame.fromFields("fux", "bux", "eng");
        const tag = Id3v2Tag.fromEmpty();
        tag.addFrame(frame1);
        tag.addFrame(frame2);

        const initialLanguage = Id3v2Tag.language;
        try {
            // Act
            Id3v2Tag.language = "eng";
            const output = tag.comment;

            // Assert
            assert.strictEqual(output, "bux");
        } finally {
            Id3v2Tag.language = initialLanguage;
        }
    }

    @test
    public comment_setToFalsy_removesAllFrames() {
        // Arrange
        const frame1 = CommentsFrame.fromFields("foo", "bar", "jpn");
        const frame2 = CommentsFrame.fromFields("fux", "bux", "eng");
        const tag = Id3v2Tag.fromEmpty();
        tag.addFrame(frame1);
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
        const frame1 = CommentsFrame.fromFields("foo", "bar", "jpn");
        const frame2 = CommentsFrame.fromFields("fux", "bux", "eng");
        const tag = Id3v2Tag.fromEmpty();
        tag.addFrame(frame1);
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
            assert.strictEqual(frame1.text, "bar");
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
            assert.instanceOf(tag.frames[0], CommentsFrame);
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
        const frame = GenreFrame.fromFields(["Classical", "foo"]);
        const tag = Id3v2Tag.fromEmpty();
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
        assert.instanceOf(tag.frames[0], GenreFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TCON);
        assert.deepStrictEqual((<GenreFrame> tag.frames[0]).text, ["Classical", "foo"]);
    }

    @test
    public genres_setValueWithFrame() {
        // Arrange
        const frame = GenreFrame.fromFields(["qux"]);
        const tag = Id3v2Tag.fromEmpty();
        tag.addFrame(frame);

        // Act
        tag.genres = ["Classical", "foo"];

        // Assert
        assert.strictEqual(tag.frames.length, 1);
        assert.instanceOf(tag.frames[0], GenreFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TCON);
        assert.deepStrictEqual((<GenreFrame> tag.frames[0]).text, ["Classical", "foo"]);
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
            assert.instanceOf(tag.frames[0], GenreFrame);
            assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TCON);
            assert.deepStrictEqual((<GenreFrame> tag.frames[0]).text, ["Classical", "foo"]);
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

        const tdrcFrame = TextInformationFrame.fromFields(FrameIdentifiers.TDRC, ["1234-04-25"]);
        tag.frames.push(tdrcFrame);
        assert.strictEqual(tag.year, 1234);

        const tyerFrame = TextInformationFrame.fromFields(FrameIdentifiers.TYER, ["2345"]);
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

        const tyerFrame = TextInformationFrame.fromFields(FrameIdentifiers.TYER, ["1234"]);
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
    public year_v4noExistingFrame() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        tag.version = 4;

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
    public year_v3noExistingFrame() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        tag.version = 3;

        // Act / Assert
        assert.strictEqual(tag.year, 0);

        tag.year = 1234;
        assert.strictEqual(tag.year, 1234);
        assert.strictEqual(tag.frames.length, 1);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TYER);
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
        assert.instanceOf(tag.frames[0], TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["02"]);

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.strictEqual(tag.frames.length, 1);
        assert.instanceOf(tag.frames[0], TextInformationFrame);
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
        assert.instanceOf(tag.frames[0], TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["02/123"]);

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.strictEqual(tag.frames.length, 1);
        assert.instanceOf(tag.frames[0], TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["123/123"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 1);
        assert.instanceOf(tag.frames[0], TextInformationFrame);
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
        assert.instanceOf(tag.frames[0], TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["0/2"]);

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.strictEqual(tag.frames.length, 1);
        assert.instanceOf(tag.frames[0], TextInformationFrame);
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
        assert.instanceOf(tag.frames[0], TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["12/2"]);

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.strictEqual(tag.frames.length, 1);
        assert.instanceOf(tag.frames[0], TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TRCK);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["12/123"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 1);
        assert.instanceOf(tag.frames[0], TextInformationFrame);
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
        assert.instanceOf(tag.frames[0], TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TPOS);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["2"]);

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.strictEqual(tag.frames.length, 1);
        assert.instanceOf(tag.frames[0], TextInformationFrame);
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
        assert.instanceOf(tag.frames[0], TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TPOS);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["2/123"]);

        PropertyTests.propertyRoundTrip(set, get, 123);
        assert.strictEqual(tag.frames.length, 1);
        assert.instanceOf(tag.frames[0], TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TPOS);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["123/123"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 1);
        assert.instanceOf(tag.frames[0], TextInformationFrame);
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
        assert.instanceOf(tag.frames[0], TextInformationFrame);
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
        assert.instanceOf(tag.frames[0], TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TPOS);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["12/2"]);

        PropertyTests.propertyRoundTrip(set, get, 0);
        assert.strictEqual(tag.frames.length, 1);
        assert.instanceOf(tag.frames[0], TextInformationFrame);
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
            assert.instanceOf(tag.frames[0], UnsynchronizedLyricsFrame);
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
    public lyrics_multipleFrames() {
        // Arrange
        const frame1 = UnsynchronizedLyricsFrame.fromFields("foo", undefined, "jpn"); // 0 Score
        const frame2 = UnsynchronizedLyricsFrame.fromFields("", undefined, "jpn");    // 1 Score
        const frame3 = UnsynchronizedLyricsFrame.fromFields("foo", undefined, "eng"); // 2 Score
        const frame4 = UnsynchronizedLyricsFrame.fromFields("", "foobarbaz", "eng");  // 3 Score

        const tag = Id3v2Tag.fromEmpty();
        tag.frames.push(frame1, frame2, frame3, frame4);

        const initialLanguage = Id3v2Tag.language;
        try {
            Id3v2Tag.language = "eng";

            // -------------------
            // Act 1
            const result1 = tag.lyrics;

            // Assert 1
            assert.strictEqual(result1, frame4.text);

            // -------------------
            // Act 2
            tag.lyrics = undefined;
            const result2 = tag.lyrics;

            // Assert 2
            assert.isUndefined(result2);
            assert.isArray(tag.frames);
            assert.isEmpty(tag.frames);
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
        assert.instanceOf(tag.frames[0], TextInformationFrame);
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
        assert.instanceOf(tag.frames[0], TextInformationFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.TDTG);
        assert.deepStrictEqual((<TextInformationFrame> tag.frames[0]).text, ["2020-04-25T12:34:56"]);

        (<TextInformationFrame> tag.frames[0]).text = ["buncha_garbage"];
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
        assert.instanceOf(tag.frames[0], UniqueFileIdentifierFrame);
        assert.strictEqual(tag.frames[0].frameId, FrameIdentifiers.UFID);
        assert.deepStrictEqual((<UniqueFileIdentifierFrame> tag.frames[0]).owner, "http://musicbrainz.org");
        const expectedBytes = ByteVector.fromString("abcd-ef12-3456-7890", StringType.UTF8);
        const actualBytes = (<UniqueFileIdentifierFrame> tag.frames[0]).identifier;
        Testers.bvEqual(actualBytes, expectedBytes);

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
        assert.instanceOf(tag.frames[0], UserTextInformationFrame);
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
        assert.instanceOf(tag.frames[0], UserTextInformationFrame);
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
        assert.instanceOf(tag.frames[0], UserTextInformationFrame);
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
        assert.instanceOf(tag.frames[0], UserTextInformationFrame);
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
        assert.instanceOf(tag.frames[0], AttachmentFrame);
        assert.instanceOf(tag.frames[1], AttachmentFrame);

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
        assert.instanceOf(tag.frames[0], TextInformationFrame);
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
        assert.instanceOf(tag.frames[0], TextInformationFrame);
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
        assert.instanceOf(tag.frames[0], UserTextInformationFrame);
        assert.strictEqual((<UserTextInformationFrame> tag.frames[0]).description, desc);
        assert.deepStrictEqual((<UserTextInformationFrame> tag.frames[0]).text, ["foo"]);

        PropertyTests.propertyRoundTrip(setProp, getProp, undefined);
        assert.strictEqual(tag.frames.length, 0);
    }
}

@suite class Id3v2_Tag_MethodTests {
    @test
    public clear() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        tag.frames.push(PlayCountFrame.fromFields());
        tag.frames.push(PlayCountFrame.fromFields());

        // Act
        tag.clear();

        // Assert
        assert.isOk(tag.frames);
        assert.isEmpty(tag.frames);
    }

    @test
    public copyTo_invalidDestination() {
        // Arrange
        const source = Id3v2Tag.fromEmpty();

        // Act / Assert
        assert.throws(() => { source.copyTo(undefined, true); });
        assert.throws(() => { source.copyTo(null, true); });
        // TODO: Add a test for wrong tag type when we have more tag types.
    }

    @test
    public copyTo_noOverwrite() {
        // Arrange
        const sFrame1 = PlayCountFrame.fromFields(BigInt(123));
        const sFrame2 = TextInformationFrame.fromFields(FrameIdentifiers.TCOM, ["foo", "bar"]);
        const source = Id3v2Tag.fromEmpty();
        source.frames.push(sFrame1, sFrame2);

        const dFrame1 = TextInformationFrame.fromFields(FrameIdentifiers.TCOM);
        const dest = Id3v2Tag.fromEmpty();
        dest.frames.push(dFrame1);

        // Act
        source.copyTo(dest, false);

        // Assert
        assert.strictEqual(source.frames.length, 2);
        assert.sameMembers(source.frames, [sFrame1, sFrame2]);

        assert.strictEqual(dest.frames.length, 2);
        assert.notOwnInclude(dest.frames, sFrame1);
        assert.notOwnInclude(dest.frames, sFrame2);
        assert.ownInclude(dest.frames, dFrame1);

        const dPcnt = PlayCountFrame.filterFrames(dest.frames)[0];
        assert.strictEqual(dPcnt.playCount, sFrame1.playCount);
    }

    @test
    public copyTo_overwrite() {
        // Arrange
        const sFrame1 = PlayCountFrame.fromFields(BigInt(123));
        const sFrame2 = TextInformationFrame.fromFields(FrameIdentifiers.TCOM, ["foo", "bar"]);
        const source = Id3v2Tag.fromEmpty();
        source.frames.push(sFrame1, sFrame2);

        const dFrame1 = TextInformationFrame.fromFields(FrameIdentifiers.TCOM);
        const dest = Id3v2Tag.fromEmpty();
        dest.frames.push(dFrame1);

        // Act
        source.copyTo(dest, true);

        // Assert
        assert.strictEqual(source.frames.length, 2);
        assert.sameMembers(source.frames, [sFrame1, sFrame2]);

        assert.strictEqual(dest.frames.length, 2);
        assert.notOwnInclude(dest.frames, sFrame1);
        assert.notOwnInclude(dest.frames, sFrame2);

        const dTcom = TextInformationFrame.filterFrames(dest.frames, FrameIdentifiers.TCOM)[0];
        assert.deepStrictEqual(dTcom.text, ["foo", "bar"]);

        const dPcnt = PlayCountFrame.filterFrames(dest.frames)[0];
        assert.strictEqual(dPcnt.playCount, sFrame1.playCount);
    }

    @test
    public removeFrame_invalidFrame() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();

        // Act / Assert
        assert.throws(() => tag.removeFrame(undefined));
        assert.throws(() => tag.removeFrame(null));
    }

    @test
    public removeFrame_frameExists() {
        // Arrange
        const frame = PlayCountFrame.fromFields();
        const tag = Id3v2Tag.fromEmpty();
        tag.frames.push(frame);

        // Act
        tag.removeFrame(frame);

        // Assert
        assert.isEmpty(tag.frames);
    }

    @test
    public removeFrame_frameDoesNotExist() {
        // Arrange
        const frame2 = TextInformationFrame.fromFields(FrameIdentifiers.TCOM);
        const tag = Id3v2Tag.fromEmpty();
        tag.frames.push(frame2);

        const frame1 = PlayCountFrame.fromFields();

        // Act
        tag.removeFrame(frame1);

        // Assert
        assert.strictEqual(tag.frames.length, 1);
        assert.deepStrictEqual(tag.frames, [frame2]);
    }

    @test
    public render_v4_noFooter() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        tag.version = 4;

        const frame1 = TextInformationFrame.fromFields(FrameIdentifiers.TCOM);
        const frame2 = TextInformationFrame.fromFields(FrameIdentifiers.TCON);
        tag.frames.push(frame1, frame2);

        // Act
        const output = tag.render();

        // Assert
        const frameBytes = ByteVector.concatenate(
            frame1.render(4),
            frame2.render(4),
            ByteVector.fromSize(1024, 0x00)
        );
        const header = new TagHeader(4, 0, TagFlags.None, frameBytes.length);
        const expected = ByteVector.concatenate(header.render(), frameBytes);

        Testers.bvEqual(output, expected);
    }

    @test
    public render_v4_hasFooter() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        tag.version = 4;
        tag.flags = TagFlags.FooterPresent;

        const frame1 = TextInformationFrame.fromFields(FrameIdentifiers.TCOM);
        const frame2 = TextInformationFrame.fromFields(FrameIdentifiers.TCON);
        tag.frames.push(frame1, frame2);

        // Act
        const output = tag.render();

        // Assert
        const frameBytes = ByteVector.concatenate(
            frame1.render(4),
            frame2.render(4)
        );
        const header = new TagHeader(4, 0, TagFlags.FooterPresent, frameBytes.length);
        const expected = ByteVector.concatenate(
            header.render(),
            frameBytes,
            Id3v2TagFooter.fromHeader(header).render()
        );

        Testers.bvEqual(output, expected);
    }

    @test
    public render_v4_unsyncAtFrameLevel() {
        // Arrange
        const frame1 = TextInformationFrame.fromFields(FrameIdentifiers.TCOM);
        const frame2 = TextInformationFrame.fromFields(FrameIdentifiers.TCON);

        const tag = Id3v2Tag.fromEmpty();
        tag.version = 4;
        tag.flags = TagFlags.Unsynchronization;
        tag.frames.push(frame1, frame2);

        // Act
        const output = tag.render();

        // Assert
        const frameBytes = ByteVector.concatenate(
            frame1.render(4),
            frame2.render(4),
            ByteVector.fromSize(1024)
        );
        const header = new TagHeader(4, 0, TagFlags.Unsynchronization, frameBytes.length);
        const expected = ByteVector.concatenate(header.render(), frameBytes);

        Testers.bvEqual(output, expected);
    }

    @test
    public render_v3_unsyncAtTagLevel() {
        // Arrange
        const frame1 = PrivateFrame.fromFields("foobarbaz", ByteVector.fromByteArray([0xAA, 0xFF, 0x00, 0xAA]));
        const frame2 = PrivateFrame.fromFields("fuxbuxqux", ByteVector.fromByteArray([0xAA, 0x12, 0x34, 0xAA]));

        const tag = Id3v2Tag.fromEmpty();
        tag.version = 3;
        tag.flags = TagFlags.Unsynchronization;
        tag.frames.push(frame1, frame2);

        // Act
        const output = tag.render();

        // Assert
        const frameData = SyncData.unsyncByteVector(ByteVector.concatenate(
            frame1.render(3),
            frame2.render(3),
            ByteVector.fromSize(1024)
        ));
        const header = new TagHeader(3, 0, TagFlags.Unsynchronization, frameData.length);
        const expected = ByteVector.concatenate(header.render(), frameData);

        Testers.bvEqual(output, expected);
    }

    @test
    public render_v4_unsupportedFrameForVersion_disallowedViaSettings() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        tag.version = 4;

        const originalSetting = Id3v2Settings.strictFrameForVersion;
        Id3v2Settings.strictFrameForVersion = true;

        const frame1 = TextInformationFrame.fromFields(FrameIdentifiers.TYER);
        frame1.text = ["foo"];
        tag.frames.push(frame1);

        try {
            // Act / Assert
            assert.throws(() => tag.render());
        } finally {
            Id3v2Settings.strictFrameForVersion = originalSetting;
        }
    }

    @test
    public render_v4_unsupportedFrameForVersion_allowedViaSettings() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        tag.version = 4;

        const originalSetting = Id3v2Settings.strictFrameForVersion;
        Id3v2Settings.strictFrameForVersion = false;

        const frame1 = TextInformationFrame.fromFields(FrameIdentifiers.TYER);
        tag.frames.push(frame1);

        try {
            // Act
            const bytes = tag.render();
            const rehydratedTag = Id3v2Tag.fromData(bytes);

            // Assert
            assert.strictEqual(rehydratedTag.version, 4);
            assert.strictEqual(rehydratedTag.frames.length, 0);
        } finally {
            Id3v2Settings.strictFrameForVersion = originalSetting;
        }
    }

    @test
    public replaceFrame_invalidFrames() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const frame = PlayCountFrame.fromFields(BigInt(123));

        // Act / Assert
        assert.throws(() => { tag.replaceFrame(undefined, frame); });
        assert.throws(() => { tag.replaceFrame(null, frame); });
        assert.throws(() => { tag.replaceFrame(frame, undefined); });
        assert.throws(() => { tag.replaceFrame(frame, null); });
    }

    @test
    public replaceFrame_sameFrame() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const frame = PlayCountFrame.fromFields(BigInt(123));

        // Act
        tag.replaceFrame(frame, frame);

        // Assert
        assert.strictEqual(tag.frames.length, 0);
    }

    @test
    public replaceFrame_frameExists() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const oldFrame = PlayCountFrame.fromFields(BigInt(123));
        const newFrame = TextInformationFrame.fromFields(FrameIdentifiers.TCOM, ["foo"]);

        tag.frames.push(oldFrame);

        // Act
        tag.replaceFrame(oldFrame, newFrame);

        // Assert
        assert.sameMembers(tag.frames, [newFrame]);
    }

    @test
    public replaceFrame_frameDoesNotExist() {
        // Arrange
        const tag = Id3v2Tag.fromEmpty();
        const oldFrame = PlayCountFrame.fromFields(BigInt(123));
        const newFrame = TextInformationFrame.fromFields(FrameIdentifiers.TCOM, ["foo"]);
        const otherFrame = PlayCountFrame.fromFields(BigInt(234));

        tag.frames.push(otherFrame);

        // Act
        tag.replaceFrame(oldFrame, newFrame);

        // Assert
        assert.sameMembers(tag.frames, [otherFrame, newFrame]);
    }
}
