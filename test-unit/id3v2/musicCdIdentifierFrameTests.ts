import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import FrameConstructorTests from "./frameConstructorTests";
import MusicCdIdentifierFrame from "../../src/id3v2/frames/musicCdIdentifierFrame";
import PropertyTests from "../utilities/propertyTests";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

// Setup Chai
const assert = Chai.assert;

@suite class Id3v2_MusicCdIdentifierFrameTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return MusicCdIdentifierFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return MusicCdIdentifierFrame.fromRawData;
    }

    @test
    public fromRawData_validParameters() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.MCDI);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("12345abcd", StringType.Latin1)
        );

        // Act
        const frame = MusicCdIdentifierFrame.fromRawData(data, 4);

        // Assert
        Id3v2_MusicCdIdentifierFrameTests.assertFrame(frame, ByteVector.fromString("12345abcd", StringType.Latin1));
    }

    @test
    public fromOffsetRawData_validParameters() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.MCDI);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            ByteVector.fromString("12345abcd", StringType.Latin1)
        );

        // Act
        const frame = MusicCdIdentifierFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        Id3v2_MusicCdIdentifierFrameTests.assertFrame(frame, ByteVector.fromString("12345abcd", StringType.Latin1));
    }

    @test
    public data() {
        // Arrange
        const frame = Id3v2_MusicCdIdentifierFrameTests.getTestFrame();
        const data = ByteVector.fromString("fuxbuxqux", StringType.Latin1);

        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => { frame.data = v; }, () => frame.data, data);
    }

    @test
    public clone_withData() {
        // Arrange
        const frame = Id3v2_MusicCdIdentifierFrameTests.getTestFrame();

        // Act
        const output = <MusicCdIdentifierFrame> frame.clone();

        // Assert
        Id3v2_MusicCdIdentifierFrameTests.assertFrame(output, frame.data);
        assert.notEqual(output.data, frame.data);
    }

    @test
    public clone_withoutData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.MCDI);
        header.frameSize = 0;
        const frame = MusicCdIdentifierFrame.fromRawData(header.render(4), 4);

        // Act
        const output = <MusicCdIdentifierFrame> frame.clone();

        // Assert
        Id3v2_MusicCdIdentifierFrameTests.assertFrame(output, frame.data);
    }

    @test
    public render_withData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.MCDI);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("12345abcd", StringType.Latin1)
        );
        const frame = MusicCdIdentifierFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        Testers.bvEqual(output, data);
    }

    @test
    public render_withoutData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.MCDI);
        header.frameSize = 0;
        const frame = MusicCdIdentifierFrame.fromRawData(header.render(4), 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.strictEqual(output.length, 0);
    }

    private static assertFrame(frame: MusicCdIdentifierFrame, d: ByteVector) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.MusicCdIdentifierFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.MCDI);

        Testers.bvEqual(frame.data, d);
    }

    private static getTestFrame() {
        const header = new Id3v2FrameHeader(FrameIdentifiers.MCDI);
        header.frameSize = 9;
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromString("12345abcd", StringType.Latin1)
        );
        return MusicCdIdentifierFrame.fromRawData(data, 4);
    }
}
