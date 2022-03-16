import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import AviHeader from "../../src/riff/avi/aviHeader";
import RiffList from "../../src/riff/riffList";
import {default as Resources} from "./resources";
import {AviStream, AviStreamType} from "../../src/riff/avi/aviStream";
import {ByteVector} from "../../src/byteVector";
import {Testers} from "../utilities/testers";

@suite class Riff_AviHeaderTests {
    @test
    public constructor_invalidParams() {
        // Act / Assert
        Testers.testTruthy<RiffList>((v) => new AviHeader(v));
    }

    @test
    public constructor_wrongListType() {
        // Arrange
        const list = RiffList.fromEmpty("fooo");

        // Act / Assert
        assert.throws(() => new AviHeader(list));
    }

    @test
    public constructor_headerChunkMissing() {
        // Arrange
        const list = RiffList.fromEmpty(AviHeader.headerListType);

        // Act / Assert
        assert.throws(() => new AviHeader(list));
    }

    @test
    public constructor_headerInfoTooShort() {
        // Arrange
        const list = RiffList.fromEmpty(AviHeader.headerListType);
        list.setValues(AviHeader.headerChunkId, [ByteVector.empty()]);

        // Act / Assert
        assert.throws(() => new AviHeader(list));
    }

    @test
    public constructor_noStreams() {
        // Arrange
        const list = RiffList.fromEmpty(AviHeader.headerListType);
        list.setValues(AviHeader.headerChunkId, [Resources.getAviHeader()]);

        // Act
        const header = new AviHeader(list);

        // Assert
        assert.isOk(header);
        Riff_AviHeaderTests.assertTestHeader(header);

        assert.isOk(header.streams);
        assert.isEmpty(header.streams);

        assert.isOk(header.codecs);
        assert.isEmpty(header.codecs);
    }

    @test
    public constructor_hasUnsupportedStreams() {
        // Arrange
        const list = RiffList.fromEmpty(AviHeader.headerListType);
        list.setValues(AviHeader.headerChunkId, [Resources.getAviHeader()]);

        const header1Data = ByteVector.concatenate(
            ByteVector.fromUint(AviStreamType.MIDI_STREAM, false),
            ByteVector.fromSize(52)
        );
        const streamList1 = RiffList.fromEmpty(AviStream.listType);
        streamList1.setValues(AviStream.headerChunkId, [header1Data]);
        streamList1.setValues(AviStream.formatChunkId, [ByteVector.empty()]);

        const header2Data = ByteVector.concatenate(
            ByteVector.fromUint(AviStreamType.TEXT_STREAM, false),
            ByteVector.fromSize(52)
        );
        const streamList2 = RiffList.fromEmpty(AviStream.listType);
        streamList2.setValues(AviStream.headerChunkId, [header2Data]);
        streamList2.setValues(AviStream.formatChunkId, [ByteVector.empty()]);

        list.setLists(AviStream.listType, [streamList1, streamList2]);

        // Act
        const header = new AviHeader(list);

        // Assert
        assert.isOk(header);
        Riff_AviHeaderTests.assertTestHeader(header);

        assert.isOk(header.codecs);
        assert.strictEqual(header.codecs.length, 0);

        assert.isOk(header.streams);
        assert.strictEqual(header.streams.length, 2);
        assert.isOk(header.streams.find((s) => s.type === AviStreamType.MIDI_STREAM));
        assert.isOk(header.streams.find((s) => s.type === AviStreamType.TEXT_STREAM));
    }

    @test
    public constructor_hasSupportedStreams() {
        // Arrange
        const list = RiffList.fromEmpty(AviHeader.headerListType);
        list.setValues(AviHeader.headerChunkId, [Resources.getAviHeader()]);

        const header1Data = ByteVector.concatenate(
            ByteVector.fromUint(AviStreamType.AUDIO_STREAM, false),
            ByteVector.fromSize(52)
        );
        const streamList1 = RiffList.fromEmpty(AviStream.listType);
        streamList1.setValues(AviStream.headerChunkId, [header1Data]);
        streamList1.setValues(AviStream.formatChunkId, [ByteVector.fromSize(16)]);
        list.setLists(AviStream.listType, [streamList1]);

        // Act
        const header = new AviHeader(list);

        // Assert
        assert.isOk(header);
        Riff_AviHeaderTests.assertTestHeader(header);

        assert.isOk(header.codecs);
        assert.strictEqual(header.codecs.length, 1);

        assert.isOk(header.streams);
        assert.strictEqual(header.streams.length, 1);
        assert.isOk(header.streams.find((s) => s.type === AviStreamType.AUDIO_STREAM));
    }

    private static assertTestHeader(header: AviHeader) {
        assert.approximately(header.durationMilliseconds, 7006, 1);
        assert.strictEqual(header.flags, 4567);
        assert.strictEqual(header.height, 123);
        assert.strictEqual(header.initialFrames, 6789);
        assert.strictEqual(header.maxBytesPerSecond, 2345);
        assert.strictEqual(header.microsecondsPerFrame, 1234);
        assert.strictEqual(header.streamCount, 7890);
        assert.strictEqual(header.suggestedBufferSize, 8901);
        assert.strictEqual(header.totalFrames, 5678);
        assert.strictEqual(header.width, 9012);
    }
}
