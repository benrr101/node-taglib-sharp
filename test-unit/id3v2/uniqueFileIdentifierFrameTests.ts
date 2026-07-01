import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import PropertyTests from "../utilities/propertyTests";
import UniqueFileIdentifierFrame from "../../src/id3v2/frames/uniqueFileIdentifierFrame";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

// Test constants
const testIdentifier = ByteVector.fromString("foobarbaz", StringType.UTF8);
const testOwner = "https://github.com/benrr101/node-taglib-sharp";

const assertFrame = (frame: UniqueFileIdentifierFrame, o: string, i: ByteVector) => {
    assert.isOk(frame);
    assert.instanceOf<UniqueFileIdentifierFrame>(frame, UniqueFileIdentifierFrame);
    assert.strictEqual(frame.frameId, FrameIdentifiers.UFID);

    assert.strictEqual(frame.owner, o);
    if (i !== undefined) {
        Testers.bvEqual(frame.identifier, i);
    } else {
        assert.isUndefined(frame.identifier);
    }
}

@suite class Id3v2_UniqueFileIdentifierFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return UniqueFileIdentifierFrame.fromFieldBytes;
    }

    @test
    public fromData_invalidOwner_throws() {
        // Arrange
        const identifier = ByteVector.empty();

        // Act/Assert
        Testers.testTruthy((v: string) => { UniqueFileIdentifierFrame.fromData(v, identifier); });
    }

    @test
    public fromData_invalidIdentifier_throws() {
        // Arrange
        const owner = "fuxqux";

        // Act/Assert
        assert.throws(() => { UniqueFileIdentifierFrame.fromData(owner, ByteVector.fromSize(65)); });
    }

    @test
    public fromData_validPrams() {
        // Arrange
        const owner = "fuxqux";
        const identifier = ByteVector.fromSize(32, 0x8);

        // Act
        const frame = UniqueFileIdentifierFrame.fromData(owner, identifier);

        // Assert
        assertFrame(frame, owner, identifier);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_empty_throws(version: number) {
        // Arrange
        const fieldBytes = ByteVector.empty();
        const header = new Id3v2FrameHeader(FrameIdentifiers.UFID, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => UniqueFileIdentifierFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_oneField_throws(version: number) {
        // Arrange
        const fieldBytes = testIdentifier;
        const header = new Id3v2FrameHeader(FrameIdentifiers.UFID, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => UniqueFileIdentifierFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_threeFields(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString(testOwner, StringType.Latin1), // Owner
            ByteVector.getTextDelimiter(StringType.Latin1),      // Delimiter
            testIdentifier, 0x00, testIdentifier                 // Identifier
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.UFID, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UniqueFileIdentifierFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        const expectedData = ByteVector.concatenate(testIdentifier, 0x00, testIdentifier);
        assertFrame(frame, testOwner, expectedData);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_validData_returnsFrame(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString(testOwner, StringType.Latin1), // Owner
            ByteVector.getTextDelimiter(StringType.Latin1),      // Delimiter
            testIdentifier                                       // Identifier
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.UFID, Id3v2FrameFlags.None, fieldBytes.length);


        // Act
        const frame = UniqueFileIdentifierFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, testOwner, testIdentifier);
    }
}

@suite class Id3v2_UniqueFileIdentifierFrame_PropertyTests {
    @test
    public setIdentifier_tooLong_throws() {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromData("fuxqux", ByteVector.fromSize(1));

        // Act/Assert
        PropertyTests.propertyThrows((v) => { frame.identifier = v; }, ByteVector.fromSize(65));
    }

    @test
    public setIdentifier_valid() {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromData("fuxqux", ByteVector.fromSize(1));
        const identifier = ByteVector.fromString("quxx", StringType.UTF8);

        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => { frame.identifier = v; }, () => frame.identifier, identifier);
    }
}

@suite class Id3v2_UniqueFileIdentifierFrame_MethodTests {
    @test
    public clone_noIdentifier() {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromData("fux", undefined);

        // Act
        const clone = <UniqueFileIdentifierFrame> frame.clone();

        // Assert
        assertFrame(clone, frame.owner, frame.identifier);
    }

    @test
    public clone_withIdentifier() {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromData("fux", ByteVector.fromString("qux", StringType.UTF8));

        // Act
        const clone = <UniqueFileIdentifierFrame> frame.clone();

        // Assert
        assertFrame(clone, frame.owner, frame.identifier);
    }

    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: UniqueFileIdentifierFrame[]) => { UniqueFileIdentifierFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = UniqueFileIdentifierFrame.filterFrames(frames);

        // Assert
        assert.isArray(output);
        assert.isEmpty(output);
    }

    @test
    public filterFrames_noMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(234));
        const frames = [frame1, frame2];

        // Act
        const result = UniqueFileIdentifierFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UniqueFileIdentifierFrame.fromData("foo", ByteVector.empty());
        const frames = [frame1, frame2];

        // Act
        const result = UniqueFileIdentifierFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UniqueFileIdentifierFrame.fromData("foo", ByteVector.empty());
        const frame3 = UniqueFileIdentifierFrame.fromData("foo", ByteVector.empty());

        const frames = [frame1, frame2, frame3];

        // Act
        const result = UniqueFileIdentifierFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = UniqueFileIdentifierFrame.fromData("foo", ByteVector.empty());
        const frame2 = UniqueFileIdentifierFrame.fromData("foo", ByteVector.empty());
        const frames = [frame1, frame2];

        // Act
        const result = UniqueFileIdentifierFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }
    
    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_returnsByteVector(version: number) {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromData(testOwner, testIdentifier);

        // Act
        const result = frame.render(version);

        // Assert
        assert.ok(result);

        const fieldData = ByteVector.concatenate(
            ByteVector.fromString(testOwner, StringType.Latin1), // Owner
            0x00,                                                // Delimiter
            testIdentifier                                       // Identifier
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.UFID, Id3v2FrameFlags.None, fieldData.length);
        const expected = ByteVector.concatenate(header.render(version), fieldData);
        Testers.bvEqual(result, expected);
    }
}
