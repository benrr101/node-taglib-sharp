import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import FrameHeader from "../../src/id3v2/frames/frameHeader";
import PropertyTests from "../utilities/propertyTests";
import UniqueFileIdentifierFrame from "../../src/id3v2/frames/uniqueFileIdentifierFrame";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {FrameFlags, Id3v2Version} from "../../src/id3v2/enums";
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
    Testers.bvEqual(frame.identifier, i);
}

@suite class Id3v2_UniqueFileIdentifierFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: FrameHeader, d: ByteVector, v: Id3v2Version) => Frame {
        return UniqueFileIdentifierFrame.fromFieldBytes;
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_empty_throws(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.empty();
        const header = new FrameHeader(FrameIdentifiers.UFID, FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => UniqueFileIdentifierFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_oneField_throws(version: Id3v2Version) {
        // Arrange
        const fieldBytes = testIdentifier;
        const header = new FrameHeader(FrameIdentifiers.UFID, FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => UniqueFileIdentifierFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_threeFields(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString(testOwner, StringType.Latin1), // Owner
            ByteVector.getTextDelimiter(StringType.Latin1),      // Delimiter
            testIdentifier, 0x00, testIdentifier                 // Identifier
        );
        const header = new FrameHeader(FrameIdentifiers.UFID, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = UniqueFileIdentifierFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        const expectedData = ByteVector.concatenate(testIdentifier, 0x00, testIdentifier);
        assertFrame(frame, testOwner, expectedData);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public fromFieldBytes_validData_returnsFrame(version: Id3v2Version) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString(testOwner, StringType.Latin1), // Owner
            ByteVector.getTextDelimiter(StringType.Latin1),      // Delimiter
            testIdentifier                                       // Identifier
        );
        const header = new FrameHeader(FrameIdentifiers.UFID, FrameFlags.None, fieldBytes.length);


        // Act
        const frame = UniqueFileIdentifierFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, testOwner, testIdentifier);
    }

    @test
    public fromFields_noParams() {
        // Act
        const frame = UniqueFileIdentifierFrame.fromFields();

        // Assert
        assertFrame(frame, "", ByteVector.empty());
    }

    @test
    public fromFields_withOwner() {
        // Act
        const frame = UniqueFileIdentifierFrame.fromFields("foo");

        // Assert
        assertFrame(frame, "foo", ByteVector.empty());
    }

    @test
    public fromFields_invalidIdentifier_throws() {
        // Act / Assert
        assert.throws(() => { UniqueFileIdentifierFrame.fromFields("foo", ByteVector.fromSize(65)); });
    }

    @test
    public fromFields_withOwnerIdentifier() {
        // Arrange
        const identifier = ByteVector.fromSize(32, 0x8);

        // Act
        const frame = UniqueFileIdentifierFrame.fromFields("foo", identifier);

        // Assert
        assertFrame(frame, "foo", identifier);
    }
}

@suite class Id3v2_UniqueFileIdentifierFrame_PropertyTests {
    @test
    public setIdentifier_tooLong_throws() {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromFields("fuxqux", ByteVector.fromSize(1));

        // Act/Assert
        PropertyTests.propertyThrows((v) => { frame.identifier = v; }, ByteVector.fromSize(65));
    }

    @test
    public setIdentifier_valid() {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromFields("fuxqux", ByteVector.fromSize(1));
        const identifier = ByteVector.fromString("quxx", StringType.UTF8);

        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => { frame.identifier = v; }, () => frame.identifier, identifier);
    }
}

@suite class Id3v2_UniqueFileIdentifierFrame_MethodTests {
    @test
    public clone_noIdentifier() {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromFields("fux", undefined);

        // Act
        const clone = <UniqueFileIdentifierFrame> frame.clone();

        // Assert
        assertFrame(clone, frame.owner, frame.identifier);
    }

    @test
    public clone_withIdentifier() {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromFields("fux", ByteVector.fromString("qux", StringType.UTF8));

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
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
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
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = UniqueFileIdentifierFrame.fromFields();
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
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = UniqueFileIdentifierFrame.fromFields();
        const frame3 = UniqueFileIdentifierFrame.fromFields();

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
        const frame1 = UniqueFileIdentifierFrame.fromFields();
        const frame2 = UniqueFileIdentifierFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = UniqueFileIdentifierFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    @params(Id3v2Version.V24, "v4")
    public render_returnsByteVector(version: Id3v2Version) {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromFields(testOwner, testIdentifier);

        // Act
        const result = frame.render(version);

        // Assert
        assert.ok(result);

        const fieldData = ByteVector.concatenate(
            ByteVector.fromString(testOwner, StringType.Latin1), // Owner
            0x00,                                                // Delimiter
            testIdentifier                                       // Identifier
        );
        const header = new FrameHeader(FrameIdentifiers.UFID, FrameFlags.None, fieldData.length);
        const expected = ByteVector.concatenate(header.render(version), fieldData);
        Testers.bvEqual(result, expected);
    }
}
