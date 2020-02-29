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
