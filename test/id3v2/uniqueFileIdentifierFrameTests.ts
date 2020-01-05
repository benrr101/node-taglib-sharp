import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameConstructorTests from "./frameConstructorTests";
import FramePropertyTests from "./framePropertyTests";
import FrameTypes from "../../src/id3v2/frameTypes";
import UniqueFileIdentifierFrame from "../../src/id3v2/frames/uniqueFileIdentifierFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

// Test constants
const testIdentifier = ByteVector.fromString("foobarbaz");
const testOwner = "http://github.com/benrr101/node-taglib-sharp";

@suite(timeout(3000), slow(1000))
class Id3v2_UniqueFileIdentifierFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader) => Frame {
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
        assert.throws(() => { UniqueFileIdentifierFrame.fromData(undefined, identifier); });
        assert.throws(() => { UniqueFileIdentifierFrame.fromData(null, identifier); });
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
        this.assertFrame(frame, owner, identifier);
    }

    @test
    public fromOffsetRawData_tooFewFields_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.UFID, 4);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            0x0, 0x0,
            testIdentifier
        );

        // Act
        const frame = UniqueFileIdentifierFrame.fromOffsetRawData(data, 2, header);

        // Assert
        this.assertFrame(frame, undefined, undefined);
    }

    @test
    public fromOffsetRawData_tooManyFields_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.UFID, 4);
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
        const frame = UniqueFileIdentifierFrame.fromOffsetRawData(data, 2, header);

        // Assert
        this.assertFrame(frame, undefined, undefined);
    }

    @test
    public fromOffsetRawData_validData_returnsFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.UFID, 4);
        header.frameSize = 54;
        const data = ByteVector.concatenate(
            header.render(4),
            0x0, 0x0,
            ByteVector.fromString(testOwner),
            ByteVector.getTextDelimiter(StringType.Latin1),
            testIdentifier
        );

        // Act
        const frame = UniqueFileIdentifierFrame.fromOffsetRawData(data, 2, header);

        // Assert
        this.assertFrame(frame, testOwner, testIdentifier);
    }

    @test
    public fromRawData_tooFewFields_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.UFID, 4);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            testIdentifier
        );

        // Act
        const frame = UniqueFileIdentifierFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, undefined, undefined);
    }

    @test
    public fromRawData_tooManyFields_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.UFID, 4);
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
        this.assertFrame(frame, undefined, undefined);
    }

    @test
    public fromRawData_validData_returnsFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.UFID, 4);
        header.frameSize = 54;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString(testOwner),
            ByteVector.getTextDelimiter(StringType.Latin1),
            testIdentifier
        );

        // Act
        const frame = UniqueFileIdentifierFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, testOwner, testIdentifier);
    }

    private assertFrame(frame: UniqueFileIdentifierFrame, o: string, i: ByteVector) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.UniqueFileIdentifierFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.UFID));

        assert.strictEqual(frame.owner, o);

        if (i !== undefined) {
            assert.isTrue(ByteVector.equal(frame.identifier, i));
        } else {
            assert.isUndefined(frame.identifier);
        }
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_UniqueFileIdentifierFrame_PropertyTests {
    @test
    public setIdentifier_tooLong_throws() {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromData("fuxqux", ByteVector.fromSize(1));

        // Act/Assert
        FramePropertyTests.propertyThrows((v) => { frame.identifier = v; }, ByteVector.fromSize(65));
    }

    @test
    public setIdentifier_valid() {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromData("fuxqux", ByteVector.fromSize(1));
        const identifier = ByteVector.fromString("quxx");

        // Act / Assert
        FramePropertyTests.propertyRoundTrip((v) => { frame.identifier = v; }, () => frame.identifier, identifier);
    }
}

@suite(timeout(3000), slow(1000))
class Id3v2_UniqueFileIdentifierFrame_MethodTests {
    @test
    public find_falsyFrames_throws() {
        // Act/Assert
        assert.throws(() => { UniqueFileIdentifierFrame.find(null, "fux"); });
        assert.throws(() => { UniqueFileIdentifierFrame.find(undefined, "fux"); });
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
        assert.equal(clone.frameClassType, FrameClassType.UniqueFileIdentifierFrame);
        assert.isTrue(ByteVector.equal(clone.frameId, FrameTypes.UFID));

        assert.strictEqual(clone.identifier, frame.identifier);
        assert.strictEqual(clone.owner, frame.owner);
    }

    @test
    public clone_withIdentifier() {
        // Arrange
        const frame = UniqueFileIdentifierFrame.fromData("fux", ByteVector.fromString("qux"));

        // Act
        const clone = <UniqueFileIdentifierFrame> frame.clone();

        // Assert
        assert.isOk(clone);
        assert.equal(clone.frameClassType, FrameClassType.UniqueFileIdentifierFrame);
        assert.isTrue(ByteVector.equal(clone.frameId, FrameTypes.UFID));

        assert.isTrue(ByteVector.equal(clone.identifier, frame.identifier));
        assert.strictEqual(clone.owner, frame.owner);
    }

    @test
    public render_returnsByteVector() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.UFID, 4);
        header.frameSize = 54;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString(testOwner),
            ByteVector.getTextDelimiter(StringType.Latin1),
            testIdentifier
        );
        const frame = UniqueFileIdentifierFrame.fromRawData(data, 4);

        // Act
        const result = frame.render(4);

        // Assert
        assert.ok(result);
        assert.isTrue(ByteVector.equal(data, result));
    }
}
