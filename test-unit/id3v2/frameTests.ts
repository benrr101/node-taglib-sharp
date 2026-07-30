import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameHeader from "../../src/id3v2/frames/frameHeader";
import PropertyTests from "../utilities/propertyTests";
import {ByteVector} from "../../src/byteVector";
import {FrameFlags, Id3v2Version} from "../../src/id3v2/enums";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

class TestFrame extends Frame {
    public static renderFieldData = ByteVector.concatenate(
        ByteVector.fromSize(10, 0x00),
        0xFF, 0xE0,
        ByteVector.fromSize(10, 0x00)
    );

    public constructor(header: FrameHeader) {
        super(header);
    }

    public clone(): Frame {
        return undefined;
    }

    protected parseFields(_data: ByteVector, _version: Id3v2Version): void { /* no-op */ }

    protected renderFields(_version: Id3v2Version): ByteVector {
        return TestFrame.renderFieldData;
    }
}

@suite class FrameTests {
    // NOTE: We're mostly ignoring test cases that were already covered by concrete frame classes

    @test
    public encryptionId_invalidValues() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.TXXX);
        const frame = new TestFrame(header);
        const set = (v: number) => { frame.encryptionId = v; };

        // Act / Assert
        PropertyTests.propertyThrows(set, 0x100);
        PropertyTests.propertyThrows(set, -1);
        PropertyTests.propertyThrows(set, 1.23);
    }

    @test
    public encryptionId() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.TXXX, FrameFlags.FileAlterPreservation);
        const frame = new TestFrame(header);
        const get = () => frame.encryptionId;
        const set = (v: number) => { frame.encryptionId = v; };

        // Act / Assert
        assert.isUndefined(frame.encryptionId);

        PropertyTests.propertyThrows(set, 0x88);
        assert.strictEqual(frame.flags, FrameFlags.FileAlterPreservation);

        PropertyTests.propertyRoundTrip(set, get, undefined);
        assert.strictEqual(frame.flags, FrameFlags.FileAlterPreservation);
    }

    @test
    public groupId_invalidValues() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.TXXX);
        const frame = new TestFrame(header);
        const set = (v: number) => { frame.groupId = v; };

        // Act / Assert
        PropertyTests.propertyThrows(set, 0x100);
        PropertyTests.propertyThrows(set, -1);
        PropertyTests.propertyThrows(set, 1.23);
    }

    @test
    public groupId() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.TXXX, FrameFlags.FileAlterPreservation);
        const frame = new TestFrame(header);
        const get = () => frame.groupId;
        const set = (v: number) => { frame.groupId = v; };

        // Act / Assert
        assert.isUndefined(frame.groupId);

        PropertyTests.propertyRoundTrip(set, get, 0x88);
        assert.strictEqual(frame.flags, FrameFlags.FileAlterPreservation | FrameFlags.GroupingIdentity);

        PropertyTests.propertyRoundTrip(set, get, undefined);
        assert.strictEqual(frame.flags, FrameFlags.FileAlterPreservation);
    }

    @test
    public render_dataLengthIndicator() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.TXXX, FrameFlags.DataLengthIndicator);
        const frame = new TestFrame(header);

        // Act
        const output = frame.render(Id3v2Version.V24);

        // Assert
        const expected = ByteVector.concatenate(
            header.render(Id3v2Version.V24),
            ByteVector.fromUint(TestFrame.renderFieldData.length),
            TestFrame.renderFieldData
        );
        Testers.bvEqual(output, expected);
    }

    @test
    public render_groupingIdentity() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.TXXX, FrameFlags.GroupingIdentity);
        const frame = new TestFrame(header);
        frame.groupId = 0x88;

        // Act
        const output = frame.render(Id3v2Version.V24);

        // Assert
        const expected = ByteVector.concatenate(
            header.render(Id3v2Version.V24),
            0x88,
            TestFrame.renderFieldData
        );
        Testers.bvEqual(output, expected);
    }
}
