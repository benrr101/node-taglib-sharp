import Testers from "../utilities/testers";
import {test} from "mocha-typescript";

import {ByteVector} from "../../src/byteVector";
import {Frame} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";

export default abstract class FrameConstructorTests {

    public abstract get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame;
    public abstract get fromRawData(): (d: ByteVector, v: number) => Frame;

    @test
    public fromOffsetRawData_falsyData_throws() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WCOM);

        // Act/Assert
        Testers.testTruthy((v: ByteVector) => { this.fromOffsetRawData(v, 2, header, 4); });
    }

    @test
    public fromOffsetRawData_invalidVersion_throws() {
        // Arrange
        const data = ByteVector.empty();
        const header = new Id3v2FrameHeader(FrameIdentifiers.WCOM);

        // Act/Assert
        Testers.testUint((v: number) => { this.fromOffsetRawData(data, v, header, 4); });
    }

    @test
    public fromOffsetRawData_falsyHeader_throws() {
        // Arrange
        const data = ByteVector.empty();

        // Act/Assert
        Testers.testTruthy((v: Id3v2FrameHeader) => { this.fromOffsetRawData(data, 2, v, 4); });
    }

    @test
    public fromRawData_falsyData_throws() {
        // Act/Assert
        Testers.testTruthy((v: ByteVector) => { this.fromRawData(v, 2); });
    }

    @test
    public fromRawData_invalidVersion_throws() {
        // Arrange
        const data = ByteVector.empty();

        // Act/Assert
        Testers.testByte((v: number) => { this.fromRawData(data, v); });
    }
}
