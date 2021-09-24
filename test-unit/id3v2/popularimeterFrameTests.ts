import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import FrameConstructorTests from "./frameConstructorTests";
import PopularimeterFrame from "../../src/id3v2/frames/popularimeterFrame";
import PropertyTests from "../utilities/propertyTests";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

// Setup chai
const assert = Chai.assert;

@suite class Id3v2_PopularimeterFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return PopularimeterFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return PopularimeterFrame.fromRawData;
    }

    @test
    public fromUser() {
        // Act
        const frame = PopularimeterFrame.fromUser("fux");

        // Assert
        this.assertFrame(frame, "fux", undefined, 0);
    }

    @test
    public fromRawData_noDelimiter() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM);
        header.frameSize = 3;
        const data = ByteVector.concatenate(
            header.render(4),
            0x01, 0x02, 0x03
        );

        // Act / Assert
        assert.throws(() => { PopularimeterFrame.fromRawData(data, 4); });
    }

    @test
    public fromRawData_tooShort() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM);
        header.frameSize = 3;
        const data = ByteVector.concatenate(
            header.render(4),
            0x01,
            ByteVector.getTextDelimiter(StringType.Latin1)
        );

        // Act / Assert
        assert.throws(() => { PopularimeterFrame.fromRawData(data, 4); });
    }

    @test
    public fromRawData_noPlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            0x05
        );

        // Act
        const frame = PopularimeterFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, "fux", undefined, 0x05);
    }

    @test
    public fromRawData_invalidPlayCountBytes() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            0x05,
            0x01, 0x02, 0x03
        );

        // Act / Assert
        assert.throws(() => { PopularimeterFrame.fromRawData(data, 4); });
    }

    @test
    public fromRawData_intSizedPlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            0x05,
            ByteVector.fromUInt(1234)
        );

        // Act
        const frame = PopularimeterFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, "fux", BigInt(1234), 0x05);
    }

    @test
    public fromRawData_longSizedPlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM);
        header.frameSize = 13;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            0x05,
            ByteVector.fromULong(BigInt(1234))
        );

        // Act
        const frame = PopularimeterFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, "fux", BigInt(1234), 0x05);
    }

    @test
    public fromOffsetRawData_longSizedPlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM);
        header.frameSize = 13;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            0x05,
            ByteVector.fromULong(BigInt(1234))
        );

        // Act
        const frame = PopularimeterFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        this.assertFrame(frame, "fux", BigInt(1234), 0x05);
    }

    private assertFrame(frame: PopularimeterFrame, u: string, p: bigint, r: number) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.PopularimeterFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.POPM);

        if (p === undefined) {
            assert.isUndefined(frame.playCount);
        } else {
            assert.isOk(frame.playCount);
            assert.strictEqual(p, frame.playCount);
        }

        assert.strictEqual(frame.rating, r);
        assert.strictEqual(frame.user, u);
    }
}

@suite class Id3v2_PopularimeterFrame_PropertyTests {
    @test
    public playCount() {
        // Arrange
        const frame = PopularimeterFrame.fromUser("fux");
        const set = (v: bigint) => { frame.playCount = v; };
        const get = () => frame.playCount;

        // Act
        PropertyTests.propertyRoundTrip(set, get, BigInt(1234));
        PropertyTests.propertyRoundTrip(set, get, undefined);
        PropertyTests.propertyNormalized(set, get, null, undefined);
        PropertyTests.propertyThrows(set, BigInt(-1));
    }

    @test
    public rating() {
        // Arrange
        const frame = PopularimeterFrame.fromUser("fux");
        const set = (v: number) => { frame.rating = v; };
        const get = () => frame.rating;

        // Act
        PropertyTests.propertyRoundTrip(set, get, 5);
        PropertyTests.propertyThrows(set, -1);
        PropertyTests.propertyThrows(set, 1.23);
        PropertyTests.propertyThrows(set, 0x100);
    }

    @test
    public user() {
        // Arrange
        const frame = PopularimeterFrame.fromUser("fux");
        const set = (v: string) => { frame.user = v; };
        const get = () => frame.user;

        // Act
        PropertyTests.propertyRoundTrip(set, get, "bux");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }
}

@suite class Id3v2_PopularimeterFrame_MethodTests {
    @test
    public find_falsyFrames() {
        // Act / Assert
        Testers.testTruthy((v: PopularimeterFrame[]) => { PopularimeterFrame.find(v, "fux"); });
    }

    @test
    public find_noFrames() {
        // Act
        const output = PopularimeterFrame.find([], "fux");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_noMatches() {
        // Arrange
        const frames = [
            PopularimeterFrame.fromUser("fux")
        ];

        // Act
        const output = PopularimeterFrame.find(frames, "bux");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_matches() {
        // Arrange
        const frames = [
            PopularimeterFrame.fromUser("fux"),
            PopularimeterFrame.fromUser("bux")
        ];

        // Act
        const output = PopularimeterFrame.find(frames, "bux");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[1]);
    }

    @test
    public clone() {
        // Arrange
        const frame = PopularimeterFrame.fromUser("fux");
        frame.playCount = BigInt(1234);
        frame.rating = 5;

        // Act
        const output = <PopularimeterFrame> frame.clone();

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.frameClassType, FrameClassType.PopularimeterFrame);
        assert.strictEqual(output.frameId, FrameIdentifiers.POPM);

        assert.isOk(output.playCount);
        assert.strictEqual(frame.playCount, output.playCount);

        assert.strictEqual(output.rating, frame.rating);
        assert.strictEqual(output.user, frame.user);
    }

    @test
    public render_noPlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM);
        header.frameSize = 5;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            0x05
        );
        const frame = PopularimeterFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.isOk(output);
        Testers.bvEqual(output, data);
    }

    @test
    public render_intPlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            0x05,
            ByteVector.fromUInt(1234)
        );
        const frame = PopularimeterFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.isOk(output);
        Testers.bvEqual(output, data);
    }

    @test
    public render_intermediateSizePlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM);
        header.frameSize = 10;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            0x05,
            0x01, 0x02, 0x03, 0x04, 0x05
        );
        const frame = PopularimeterFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.isOk(output);
        Testers.bvEqual(output, data);
    }

    @test
    public render_longPlayCount() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM);
        header.frameSize = 13;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            0x05,
            0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08
        );
        const frame = PopularimeterFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.isOk(output);
        Testers.bvEqual(output, data);
    }
}


