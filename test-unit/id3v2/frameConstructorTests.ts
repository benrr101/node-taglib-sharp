import {test} from "@testdeck/mocha";

import Frame from "../../src/id3v2/frames/frame";
import FrameHeader from "../../src/id3v2/frames/frameHeader";
import {ByteVector} from "../../src/byteVector";
import {Id3v2Version} from "../../src/id3v2/enums";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

export default abstract class FrameConstructorTests {

    public abstract get fromFieldBytes(): (h: FrameHeader, d: ByteVector, v: Id3v2Version) => Frame;

    @test
    public fromFieldBytes_falsyHeader_throws() {
        // Arrange
        const data = ByteVector.empty();

        // Act/Assert
        Testers.testTruthy((v: FrameHeader) => { this.fromFieldBytes(v, data, Id3v2Version.V24); });
    }

    @test
    public fromFieldBytes_falsyFieldBytes_throws() {
        // Arrange
        const header = new FrameHeader(FrameIdentifiers.WCOM);

        // Act/Assert
        Testers.testTruthy((v: ByteVector) => { this.fromFieldBytes(header, v, Id3v2Version.V24); });
    }
}
