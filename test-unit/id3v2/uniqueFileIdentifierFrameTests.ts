import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import PropertyTests from "../utilities/propertyTests";
import UniqueFileIdentifierFrame from "../../src/id3v2/frames/uniqueFileIdentifierFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

// Test constants
const testIdentifier = ByteVector.fromString("foobarbaz", StringType.UTF8);
const testOwner = "https://github.com/benrr101/node-taglib-sharp";

@suite class Id3v2_UniqueFileIdentifierFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return UniqueFileIdentifierFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return UniqueFileIdentifierFrame.fromRawData;
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
        Id3v2_UniqueFileIdentifierFrame_ConstructorTests.assertFrame(frame, owner, identifier);
    }

    @test
    public fromOffsetRawData_tooFewFields_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.UFID);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            0x0, 0x0,
            testIdentifier
        );

        // Act
        const frame = UniqueFileIdentifierFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        Id3v2_UniqueFileIdentifierFrame_ConstructorTests.assertFrame(frame, undefined, undefined);
    }

    @test
    public fromOffsetRawData_tooManyFields_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.UFID);
        header.frameSize = 29;
        const data = ByteVector.concatenate(
            header.render(4),
            0x0, 0x0,
            testIdentifier,
            ByteVector.getTextDelimiter(StringType.Latin1),
            testIdentifier,
            ByteVector.getTextDelimiter(StringType.Latin1),
            testIdentifier,
            ByteVector.getTextDelimiter(StringType.Latin1)
        );

        // Act
        const frame = UniqueFileIdentifierFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        Id3v2_UniqueFileIdentifierFrame_ConstructorTests.assertFrame(frame, undefined, undefined);
    }

    @test
    public fromOffsetRawData_validData_returnsFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.UFID);
        header.frameSize = 55;
        const data = ByteVector.concatenate(
            header.render(4),
            0x0, 0x0,
            ByteVector.fromString(testOwner, StringType.UTF8),
            ByteVector.getTextDelimiter(StringType.Latin1),
            testIdentifier
        );

        // Act
        const frame = UniqueFileIdentifierFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        Id3v2_UniqueFileIdentifierFrame_ConstructorTests.assertFrame(frame, testOwner, testIdentifier);
    }

    @test
    public fromRawData_tooFewFields_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.UFID);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            testIdentifier
        );

        // Act
        const frame = UniqueFileIdentifierFrame.fromRawData(data, 4);

        // Assert
        Id3v2_UniqueFileIdentifierFrame_ConstructorTests.assertFrame(frame, undefined, undefined);
    }

    @test
    public fromRawData_tooManyFields_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.UFID);
        header.frameSize = 29;
        const data = ByteVector.concatenate(
            header.render(4),
            testIdentifier,
            ByteVector.getTextDelimiter(StringType.Latin1),
            testIdentifier,
            ByteVector.getTextDelimiter(StringType.Latin1),
            testIdentifier,
            ByteVector.getTextDelimiter(StringType.Latin1)
        );

        // Act
        const frame = UniqueFileIdentifierFrame.fromRawData(data, 4);

        // Assert
        Id3v2_UniqueFileIdentifierFrame_ConstructorTests.assertFrame(frame, undefined, undefined);
    }

    @test
    public fromRawData_validData_returnsFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.UFID);
        header.frameSize = 55;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString(testOwner, StringType.UTF8),
            ByteVector.getTextDelimiter(StringType.Latin1),
            testIdentifier
        );

        // Act
        const frame = UniqueFileIdentifierFrame.fromRawData(data, 4);

        // Assert
        Id3v2_UniqueFileIdentifierFrame_ConstructorTests.assertFrame(frame, testOwner, testIdentifier);
    }

    private static assertFrame(frame: UniqueFileIdentifierFrame, o: string, i: ByteVector) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UniqueFileIdentifierFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.UFID);

        assert.strictEqual(frame.owner, o);

        if (i !== undefined) {
            Testers.bvEqual(frame.identifier, i);
        } else {
            assert.isUndefined(frame.identifier);
        }
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
    public find_falsyFrames_throws() {
        // Act/Assert
        Testers.testTruthy((v: UniqueFileIdentifierFrame[]) => { UniqueFileIdentifierFrame.find(v, "fux"); });
    }

    @test
    public find_validParams_returnsFirstMatch() {
        // Arrange
        const frame1 = UniqueFileIdentifierFrame.fromData("fux", ByteVector.fromSize(1));
        const frame2 = UniqueFileIdentifierFrame.fromData("fux", ByteVector.fromSize(1));

        // Act
        const result = UniqueFileIdentifierFrame.find([frame1, frame2], "fux");

        // Assert
        assert.strictEqual(result, frame1);
    }

    @test
    public find_noMatches_returnsUndefined() {
        // Arrange
        const frame1 = UniqueFileIdentifierFrame.fromData("fux", ByteVector.fromSize(1));

        // Act
        const result = UniqueFileIdentifierFrame.find([frame1], "qux");

        // Assert
        assert.isUndefined(result);
    }

    @test
    public clone_noIdentifier() {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromData("fux", undefined);

        // Act
        const clone = <UniqueFileIdentifierFrame> frame.clone();

        // Assert
        assert.isOk(clone);
        assert.strictEqual(clone.frameClassType, FrameClassType.UniqueFileIdentifierFrame);
        assert.strictEqual(clone.frameId, FrameIdentifiers.UFID);

        assert.strictEqual(clone.identifier, frame.identifier);
        assert.strictEqual(clone.owner, frame.owner);
    }

    @test
    public clone_withIdentifier() {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromData("fux", ByteVector.fromString("qux", StringType.UTF8));

        // Act
        const clone = <UniqueFileIdentifierFrame> frame.clone();

        // Assert
        assert.isOk(clone);
        assert.strictEqual(clone.frameClassType, FrameClassType.UniqueFileIdentifierFrame);
        assert.strictEqual(clone.frameId, FrameIdentifiers.UFID);

        Testers.bvEqual(clone.identifier, frame.identifier);
        assert.strictEqual(clone.owner, frame.owner);
    }

    @test
    public render_returnsByteVector() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.UFID);
        header.frameSize = 55;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString(testOwner, StringType.UTF8),
            ByteVector.getTextDelimiter(StringType.Latin1),
            testIdentifier
        );
        const frame = UniqueFileIdentifierFrame.fromRawData(data, 4);

        // Act
        const result = frame.render(4);

        // Assert
        assert.ok(result);
        Testers.bvEqual(data, result);
    }
}
