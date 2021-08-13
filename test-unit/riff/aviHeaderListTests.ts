import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import RiffList from "../../src/riff/riffList";
import TestFile from "../utilities/testFile";
import {AviHeader, AviHeaderList} from "../../src/riff/avi/aviHeader";
import {AviStream} from "../../src/riff/avi/aviStream";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {ICodec} from "../../src/iCodec";
import {Testers} from "../utilities/testers";

// Setup chai
const assert = Chai.assert;

function getTestAviHeader(): ByteVector {
    return ByteVector.concatenate(
        ByteVector.fromUInt(1234, false), // Microseconds per frame
        ByteVector.fromUInt(2345, false), // Max bytes per second
        ByteVector.fromUInt(3456, false), // Padding granularity
        ByteVector.fromUInt(4567, false), // Flags
        ByteVector.fromUInt(5678, false), // Total frames
        ByteVector.fromUInt(6789, false), // Initial frames
        ByteVector.fromUInt(7890, false), // Streams
        ByteVector.fromUInt(8901, false), // Suggested buffer size
        ByteVector.fromUInt(9012, false), // Width
        ByteVector.fromUInt(123, false), // Height
        ByteVector.fromSize(16), // Reserved
    );
}

@suite class Riff_AviHeaderTests {
    @test
    public constructor_invalidParams() {
        // Arrange
        const data = ByteVector.fromSize(43);

        // Act / Assert
        Testers.testTruthy<ByteVector>((v) => new AviHeader(v, 0));
        Testers.testUint((v) => new AviHeader(data, v));
        assert.throws(() => new AviHeader(data, 4));
    }

    @test
    public constructor_validParams() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(4),
            getTestAviHeader()
        );

        // Act
        const header = new AviHeader(data, 4);

        // Assert
        assert.approximately(header.durationMilliseconds, 7006, 1);
        assert.strictEqual(header.flags, 4567);
        assert.strictEqual(header.height, 123);
        assert.strictEqual(header.initialFrames, 6789);
        assert.strictEqual(header.maxBytesPerSecond, 2345);
        assert.strictEqual(header.microsecondsPerFrame, 1234);
        assert.strictEqual(header.streams, 7890);
        assert.strictEqual(header.suggestedBufferSize, 8901);
        assert.strictEqual(header.totalFrames, 5678);
        assert.strictEqual(header.width, 9012);
    }
}

@suite class Riff_AviHeaderListTests {
    @test
    public constructor_invalidParams() {
        // Arrange
        const file = TestFile.getFile(ByteVector.empty());

        // Act / Assert
        Testers.testTruthy<File>((v) => new AviHeaderList(v, 0, 0));
        Testers.testSafeUint((v) => new AviHeaderList(file, v, 0));
        Testers.testUint((v) => new AviHeaderList(file, 0, v));
        assert.throws(() => new AviHeaderList(file, 10, 10));
    }

    @test
    public constructor_invalidHeaderFourCC() {
        // Arrange
        const riffList = new RiffList();
        riffList.setValuesFromStrings("abcd", "foo", "bar", "baz");
        const data = riffList.render();
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => new AviHeaderList(file, 0, data.length));
    }

    @test
    public constructor_aviHeaderTooShort() {
        // Arrange
        const riffList = new RiffList();
        riffList.setValues("avih", ByteVector.fromSize(10));
        const data = riffList.render();
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => new AviHeaderList(file, 0, data.length));
    }

    @test
    public constructor_noCodecs() {
        const streamHeaderData = getTestAviHeader();
        const riffList = new RiffList();
        riffList.setValues("avih", streamHeaderData);
        const data = riffList.render();
        const file = TestFile.getFile(data);

        // Act
        const headerList = new AviHeaderList(file, 0, data.length);

        // Assert
        assert.isOk(headerList.codecs);
        assert.isEmpty(headerList.codecs);

        assert.isOk(headerList.header);
        assert.strictEqual(headerList.header.flags, 4567);
    }

    @test
    public constructor_hasCodecs() {
        // Arrange
        // NOTE: This looks kinda nasty, but we're monkey patching the AviStream.parseStreamList
        //    with a mock. Using the base implementation gets too complex.
        const origImpl = AviStream.parseStreamList;

        try {
            const aviHeader = getTestAviHeader();

            const listData1 = ByteVector.concatenate(ByteVector.fromString("strl"));
            const listData2 = ByteVector.concatenate(ByteVector.fromString("strl"));
            const listData3 = ByteVector.concatenate(ByteVector.fromString("fooo"));

            // Monkey patch that will just return a test stream
            const codec = <ICodec> {};
            const stream = new AviTestStream(codec);
            AviStream.parseStreamList = () => stream;

            const riffList = new RiffList();
            riffList.setValues("avih", aviHeader);
            riffList.setValues("LIST", listData1, listData2, listData3);
            const data = riffList.render();
            const file = TestFile.getFile(data);

            // Act
            const headerList = new AviHeaderList(file, 0, data.length);

            // Assert
            assert.isOk(headerList.codecs);
            assert.strictEqual(headerList.codecs.length, 2);
            assert.strictEqual(headerList.codecs[0], codec);
            assert.strictEqual(headerList.codecs[1], codec);

            assert.isOk(headerList.header);
            assert.strictEqual(headerList.header.flags, 4567);
        } finally {
            // Teardown
            AviStream.parseStreamList = origImpl;
        }
    }
}

class AviTestStream extends AviStream {
    public constructor(codec: ICodec) {
        super(undefined);
        this._codec = codec;
    }

    public parseItem(_id: string, _data: ByteVector, _start: number) { /* no-op */ }
}
