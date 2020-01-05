import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameConstructorTests from "./frameConstructorTests";
import FramePropertyTests from "./framePropertyTests";
import FrameTypes from "../../src/id3v2/frameTypes";
import {ByteVector} from "../../src/byteVector";
import {EventTimeCode, EventTimeCodeFrame} from "../../src/id3v2/frames/eventTimeCodeFrame";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {EventType, TimestampFormat} from "../../src/id3v2/utilTypes";
import framePropertyTests from "./framePropertyTests";

// Setup Chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class EventTimeCodeTests {
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
        FramePropertyTests.propertyRoundTrip((v) => { output.time = v; }, () => output.time, 123);
    }

    @test
    public eventType() {
        // Arrange
        const output = EventTimeCode.fromEmpty();

        // Act/Assert
        FramePropertyTests.propertyRoundTrip(
            (v) => { output.eventType = v; },
            () => output.eventType,
            EventType.IntroEnd
        );
    }

    @test
    public render() {
        // Arrange
        const etc = new EventTimeCode(EventType.KeyChange, 123);

        // Act
        const output = etc.render();

        // Assert
        const expected = ByteVector.concatenate(
            EventType.KeyChange,
            ByteVector.fromInt(123)
        );
        assert.isTrue(ByteVector.equal(output, expected));
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

    @test
    public fromRawData_withEvents() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.ETCO, 4);
        header.frameSize = 11;
        const event1 = new EventTimeCode(EventType.Profanity, 123);
        const event2 = new EventTimeCode(EventType.KeyChange, 456);
        const data = ByteVector.concatenate(
            header.render(4),
            TimestampFormat.AbsoluteMilliseconds,
            event1.render(),
            event2.render()
        );

        // Act
        const frame = EventTimeCodeFrame.fromRawData(data, 4);

        // Assert
        this.assertFrame(frame, [event1, event2], TimestampFormat.AbsoluteMilliseconds);
    }

    @test
    public fromOffsetRawData_noEvents() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.ETCO, 4);
        header.frameSize = 1;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            TimestampFormat.AbsoluteMilliseconds
        );

        // Act
        const frame = EventTimeCodeFrame.fromOffsetRawData(data, 2, header);

        // Assert
        this.assertFrame(frame, [], TimestampFormat.AbsoluteMilliseconds);
    }

    @test
    public fromOffsetRawData_withEvents() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.ETCO, 4);
        header.frameSize = 11;
        const event1 = new EventTimeCode(EventType.Profanity, 123);
        const event2 = new EventTimeCode(EventType.KeyChange, 456);
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            TimestampFormat.AbsoluteMilliseconds,
            event1.render(),
            event2.render()
        );

        // Act
        const frame = EventTimeCodeFrame.fromOffsetRawData(data, 2, header);

        // Assert
        this.assertFrame(frame, [event1, event2], TimestampFormat.AbsoluteMilliseconds);
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

@suite(timeout(3000), slow(1000))
class EventTimeCodeFramePropertyTests {
    @test
    public events() {
        // Arrange
        const frame = EventTimeCodeFrame.fromTimestampFormat(TimestampFormat.AbsoluteMilliseconds);
        const set = (v: EventTimeCode[]) => { frame.events = v; };
        const get = () => frame.events;

        // Act / Assert
        FramePropertyTests.propertyRoundTrip(set, get, [new EventTimeCode(EventType.Profanity, 123)]);
        FramePropertyTests.propertyRoundTrip(set, get, []);
        framePropertyTests.propertyNormalized(set, get, undefined, []);
        FramePropertyTests.propertyNormalized(set, get, null, []);
    }

    @test
    public timeStampFormat() {
        // Arrange
        const frame = EventTimeCodeFrame.fromTimestampFormat(TimestampFormat.AbsoluteMilliseconds);

        // Act / Assert
        FramePropertyTests.propertyRoundTrip(
            (v) => { frame.timestampFormat = v; },
            () => frame.timestampFormat,
            TimestampFormat.AbsoluteMpegFrames
        );
    }
}

@suite(timeout(3000), slow(1000))
class EventTimeCodeFrameMethodTests {
    @test
    public clone() {
        // Arrange
        const frame = EventTimeCodeFrame.fromTimestampFormat(TimestampFormat.AbsoluteMilliseconds);
        const event1 = new EventTimeCode(EventType.Profanity, 123);
        const event2 = new EventTimeCode(EventType.ProfanityEnd, 456);
        frame.events = [event1, event2];

        // Act
        const output = <EventTimeCodeFrame> frame.clone();

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.frameClassType, FrameClassType.EventTimeCodeFrame);
        assert.isTrue(ByteVector.equal(output.frameId, FrameTypes.ETCO));
        assert.isTrue((output.flags | Id3v2FrameFlags.FileAlterPreservation) > 0);

        assert.deepStrictEqual(output.events, frame.events);
        assert.strictEqual(output.timestampFormat, frame.timestampFormat);
    }

    @test
    public render() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.ETCO, 4);
        header.frameSize = 11;
        const event2 = new EventTimeCode(EventType.KeyChange, 456);
        const event1 = new EventTimeCode(EventType.Profanity, 123);
        const data = ByteVector.concatenate(
            header.render(4),
            TimestampFormat.AbsoluteMilliseconds,
            event2.render(),    // Force events to be sorted
            event1.render()
        );
        const frame = EventTimeCodeFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        const expected = ByteVector.concatenate(
            header.render(4),
            TimestampFormat.AbsoluteMilliseconds,
            event1.render(),
            event2.render()
        );

        assert.isOk(output);
        assert.isTrue(ByteVector.equal(output, expected));
    }
}
