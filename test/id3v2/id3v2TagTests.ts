import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import {slow, suite, test, timeout} from "mocha-typescript";

import Id3v2Tag from "../../src/id3v2/id3v2Tag";
import id3v2Tag from "../../src/id3v2/id3v2Tag";
import SyncData from "../../src/id3v2/syncData";
import {ByteVector, StringType} from "../../src/byteVector";
import {File, ReadStyle} from "../../src/file";
import {Id3v2TagHeaderFlags} from "../../src/id3v2/id3v2TagHeader";
import PlayCountFrame from "../../src/id3v2/frames/playCountFrame";
import UniqueFileIdentifierFrame from "../../src/id3v2/frames/uniqueFileIdentifierFrame";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {FrameClassType} from "../../src/id3v2/frames/frame";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";

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

    // @test
    // public fromData_fullyUnsynchronized() {
    //     // Arrange
    //     const data = ByteVector.concatenate(
    //         getTestTagHeader(3, Id3v2TagHeaderFlags.Unsynchronication, ),
    //
    //     )
    // }

    @test
    public fromFile_falsyFile() {
        // Act / Assert
        assert.throws(() => { Id3v2Tag.fromFile(undefined, 0, ReadStyle.None); });
        assert.throws(() => { Id3v2Tag.fromFile(null, 0, ReadStyle.None); });
    }

    @test
    public fromFile_positionTooFar() {
        // Arrange
        const mockFile = TypeMoq.Mock.ofType<File>();
        mockFile.setup((f: File) => f.length).returns(() => 14);

        // Act / Assert
        assert.throws(() => { Id3v2Tag.fromFile(mockFile.object, 5, ReadStyle.None); });
    }
}