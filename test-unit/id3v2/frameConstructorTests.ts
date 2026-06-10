import {test} from "@testdeck/mocha";

import {ByteVector} from "../../src/byteVector";
import {Frame} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

export default abstract class FrameConstructorTests {

    public abstract get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame;

    @test
    public fromFieldBytes_falsyHeader_throws() {
        // Arrange
        const data = ByteVector.empty();

        // Act/Assert
        Testers.testTruthy((v: Id3v2FrameHeader) => { this.fromFieldBytes(v, data, 4); });
    }

    @test
    public fromFieldBytes_falsyFieldBytes_throws() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.WCOM);

        // Act/Assert
        Testers.testTruthy((v: ByteVector) => { this.fromFieldBytes(header, v, 4); });
    }

    @test
    public fromFieldBytes_invalidVersion_throws() {
        // Arrange
        const data = ByteVector.empty();
        const header = new Id3v2FrameHeader(FrameIdentifiers.WCOM);

        // Act/Assert
        Testers.testByte((v: number) => { this.fromFieldBytes(header, data, v); });
    }
}
