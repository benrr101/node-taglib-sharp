import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameConstructorTests from "./frameConstructorTests";
import FramePropertiesTests from "./framePropertiesTests";
import FrameTypes from "../../src/id3v2/frameTypes";
import {ByteVector} from "../../src/byteVector";
import {EventTimeCode, EventTimeCodeFrame} from "../../src/id3v2/frames/eventTimeCodeFrame";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {EventType, TimestampFormat} from "../../src/id3v2/utilTypes";

// Setup Chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class EventTimeCodeTests extends FramePropertiesTests {
    @test
    public constructor_invalidTime() {
        // Act/Assert
        assert.throws(() => { const _ = new EventTimeCode(EventType.AudioEnd, 1.23); });
        assert.throws(() => { const _ = new EventTimeCode(EventType.AudioEnd, Number.MAX_SAFE_INTEGER + 1); });
    }

    @test
    public construct_valid() {
        // Act
        const output = new EventTimeCode(EventType.AudioFileEnd, 123);

        // Assert
        assert.strictEqual(output.eventType, EventType.AudioFileEnd);
        assert.strictEqual(output.time, 123);
    }

    @test
    public fromEmpty() {
        // Act
        const output = EventTimeCode.fromEmpty();

        // Assert
        assert.strictEqual(output.eventType, EventType.Padding);
        assert.strictEqual(output.time, 0);
    }

    @test
    public time_invalid() {
        // Arrange
        const output = EventTimeCode.fromEmpty();

        // Act/Assert
        assert.throws(() => { output.time = 1.23; });
        assert.throws(() => { output.time = Number.MAX_SAFE_INTEGER + 1; });
    }

    @test
    public time_valid() {
        // Arrange
        const output = EventTimeCode.fromEmpty();

        // Act/Assert
        this.propertyRoundTrip((v) => { output.time = v; }, () => output.time, 123);
    }

    @test
    public eventType() {
        // Arrange
        const output = EventTimeCode.fromEmpty();

        // Act/Assert
        this.propertyRoundTrip((v) => { output.eventType = v; }, () => output.eventType, EventType.IntroEnd);
    }
}

@suite(timeout(3000), slow(1000))
class EventTimeCodeFrameConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader) => Frame {
        return EventTimeCodeFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return EventTimeCodeFrame.fromRawData;
    }

    @test
    public fromEmpty() {
        // Act
        const output = EventTimeCodeFrame.fromEmpty();

        // Assert
        this.assertFrame(output, [], TimestampFormat.Unknown);
    }

    @test
    public fromTimestampFormat() {
        // Act
        const output = EventTimeCodeFrame.fromTimestampFormat(TimestampFormat.AbsoluteMilliseconds);

        // Assert
        this.assertFrame(output, [], TimestampFormat.AbsoluteMilliseconds);
    }

    @test
    public fromRawData_noEvents() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.ETCO, 4);
        header.frameSize = 1;
        const data = ByteVector.concatenate(
            header.render(4),
            TimestampFormat.AbsoluteMilliseconds
        );

        // Act
        const frame = EventTimeCodeFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, [], TimestampFormat.AbsoluteMilliseconds);
    }

    private assertFrame(frame: EventTimeCodeFrame, e: EventTimeCode[], t: TimestampFormat) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.EventTimeCodeFrame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.ETCO));
        assert.isTrue((frame.flags | Id3v2FrameFlags.FileAlterPreservation) > 0);

        assert.deepStrictEqual(frame.events, e);
        assert.strictEqual(frame.timestampFormat, t);
    }
}

