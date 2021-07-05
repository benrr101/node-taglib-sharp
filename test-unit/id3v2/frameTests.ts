import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import PropertyTests from "../utilities/propertyTests";
import SyncData from "../../src/id3v2/syncData";
import {ByteVector} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";

// Setup chai
const assert = Chai.assert;

class TestFrame extends Frame {
    public static renderFieldData = ByteVector.concatenate(
        ByteVector.fromSize(10, 0x00),
        0xFF, 0xE0,
        ByteVector.fromSize(10, 0x00)
    );

    public constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    get frameClassType(): FrameClassType {
        return undefined;
    }

    public callFieldData(data: ByteVector, offset: number, version: number, includesHeader: boolean): ByteVector {
        return this.fieldData(data, offset, version, includesHeader);
    }

    public clone(): Frame {
        return undefined;
    }

    protected parseFields(_data: ByteVector, _version: number): void { /* no-op */ }

    protected renderFields(_version: number): ByteVector {
        return ByteVector.fromByteVector(TestFrame.renderFieldData);
    }
}

@suite class FrameTests {
    // NOTE: We're mostly ignoring test cases that were already covered by concrete frame classes

    @test
    public encryptionId_invalidValues() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX);
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
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.FileAlterPreservation);
        const frame = new TestFrame(header);
        const get = () => frame.encryptionId;
        const set = (v: number) => { frame.encryptionId = v; };

        // Act / Assert
        assert.isUndefined(frame.encryptionId);

        PropertyTests.propertyThrows(set, 0x88);
        assert.strictEqual(frame.flags, Id3v2FrameFlags.FileAlterPreservation);

        PropertyTests.propertyRoundTrip(set, get, undefined);
        assert.strictEqual(frame.flags, Id3v2FrameFlags.FileAlterPreservation);
    }

    @test
    public groupId_invalidValues() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX);
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
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.FileAlterPreservation);
        const frame = new TestFrame(header);
        const get = () => frame.groupId;
        const set = (v: number) => { frame.groupId = v; };

        // Act / Assert
        assert.isUndefined(frame.groupId);

        PropertyTests.propertyRoundTrip(set, get, 0x88);
        assert.strictEqual(frame.flags, Id3v2FrameFlags.FileAlterPreservation | Id3v2FrameFlags.GroupingIdentity);

        PropertyTests.propertyRoundTrip(set, get, undefined);
        assert.strictEqual(frame.flags, Id3v2FrameFlags.FileAlterPreservation);
    }

    @test
    public render_dataLengthIndicator() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.DataLengthIndicator);
        const frame = new TestFrame(header);

        // Act
        const output = frame.render(4);

        // Assert
        const expected = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromUInt(TestFrame.renderFieldData.length),
            TestFrame.renderFieldData
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public render_groupingIdentity() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.GroupingIdentity);
        const frame = new TestFrame(header);
        frame.groupId = 0x88;

        // Act
        const output = frame.render(4);

        // Assert
        const expected = ByteVector.concatenate(
            header.render(4),
            0x88,
            TestFrame.renderFieldData
        );
        assert.isTrue(ByteVector.equal(output, expected));
    }

    @test
    public fieldData_dataLengthIndicator() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.DataLengthIndicator);
        header.frameSize = TestFrame.renderFieldData.length + 4;
        const frame = new TestFrame(header);
        const data = ByteVector.concatenate(
            header.render(4),
            ByteVector.fromUInt(TestFrame.renderFieldData.length),
            TestFrame.renderFieldData
        );

        // Act
        const output = frame.callFieldData(data, 0, 4, true);

        // Assert
        assert.isTrue(ByteVector.equal(output, TestFrame.renderFieldData));
    }

    @test
    public fieldData_groupingIdentify() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.GroupingIdentity);
        header.frameSize = TestFrame.renderFieldData.length + 1;
        const frame = new TestFrame(header);
        const data = ByteVector.concatenate(
            header.render(4),
            0x88,
            TestFrame.renderFieldData
        );

        // Act
        const output = frame.callFieldData(data, 0, 4, true);

        // Assert
        assert.isTrue(ByteVector.equal(output, TestFrame.renderFieldData));
        assert.strictEqual(frame.groupId, 0x88);
    }

    @test
    public fieldData_desynchronized() {
        // Arrange
        const fieldData = ByteVector.fromByteVector(TestFrame.renderFieldData);
        SyncData.unsyncByteVector(fieldData);

        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.Desynchronized);
        header.frameSize = fieldData.length;
        const frame = new TestFrame(header);
        const data = ByteVector.concatenate(
            header.render(4),
            fieldData
        );

        // Act
        const output = frame.callFieldData(data, 0, 4, true);

        // Assert
        SyncData.resyncByteVector(fieldData);
        assert.isTrue(ByteVector.equal(output, fieldData));
    }

    @test
    public fieldData_noHeaderInData() {
        // Arrange
        const fieldData = ByteVector.concatenate(
            0x00, 0x00,
            TestFrame.renderFieldData
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX, Id3v2FrameFlags.None);
        header.frameSize = fieldData.length;
        const frame = new TestFrame(header);

        // Act
        const output = frame.callFieldData(fieldData, 2, 4, false);

        // Assert
        assert.isTrue(ByteVector.equal(output, TestFrame.renderFieldData));
    }
}
