import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {test} from "mocha-typescript";

import {ByteVector} from "../../src/byteVector";
import {Frame} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import FrameTypes from "../../src/id3v2/frameIdentifiers";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

export default abstract class FrameConstructorTests {

    public abstract get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader) => Frame;
    public abstract get fromRawData(): (d: ByteVector, v: number) => Frame;

    @test
    public fromOffsetRawData_falsyData_throws() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WCOM, 4);

        // Act/Assert
        assert.throws(() => { this.fromOffsetRawData(null, 2, header); });
        assert.throws(() => { this.fromOffsetRawData(undefined, 2, header); });
    }

    @test
    public fromOffsetRawData_invalidVersion_throws() {
        // Arrange
        const data = ByteVector.empty();
        const header = new Id3v2FrameHeader(FrameTypes.WCOM, 4);

        // Act/Assert
        assert.throws(() => { this.fromOffsetRawData(data, -1, header); });
        assert.throws(() => { this.fromOffsetRawData(data, 1.5, header); });
        assert.throws(() => { this.fromOffsetRawData(data, 0x100, header); });
    }

    @test
    public fromOffsetRawData_falsyHeader_throws() {
        // Arrange
        const data = ByteVector.empty();

        // Act/Assert
        assert.throws(() => { this.fromOffsetRawData(data, 2, undefined); });
        assert.throws(() => { this.fromOffsetRawData(data, 2, null); });
    }

    @test
    public fromRawData_falsyData_throws() {
        // Act/Assert
        assert.throws(() => { this.fromRawData(null, 2); });
        assert.throws(() => { this.fromRawData(undefined, 2); });
    }

    @test
    public fromRawData_invalidVersion_throws() {
        // Arrange
        const data = ByteVector.empty();

        // Act/Assert
        assert.throws(() => { this.fromRawData(data, -1); });
        assert.throws(() => { this.fromRawData(data, 1.5); });
        assert.throws(() => { this.fromRawData(data, 0x100); });
    }
}
