import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import PropertyTests from "../utilities/propertyTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector} from "../../src/byteVector";
import {EventTimeCode, EventTimeCodeFrame} from "../../src/id3v2/frames/eventTimeCodeFrame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";
import {EventType, TimestampFormat} from "../../src/id3v2/utilTypes";

const assertFrame = (frame: EventTimeCodeFrame, e: EventTimeCode[], t: TimestampFormat) => {
    assert.isOk(frame);
    assert.instanceOf<EventTimeCodeFrame>(frame, EventTimeCodeFrame);
    assert.strictEqual(frame.frameId, FrameIdentifiers.ETCO);
    assert.isTrue((frame.flags | Id3v2FrameFlags.FileAlterPreservation) > 0);

    assert.deepStrictEqual(frame.events, e);
    assert.strictEqual(frame.timestampFormat, t);
}

@suite class Id3v2_EventTimeCodeTests {
    @test
    public constructor_invalidTime() {
        // Act/Assert
        Testers.testInt((v: number) => new EventTimeCode(EventType.AudioEnd, v));
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
        PropertyTests.propertyRoundTrip((v) => { output.time = v; }, () => output.time, 123);
    }

    @test
    public eventType() {
        // Arrange
        const output = EventTimeCode.fromEmpty();

        // Act/Assert
        PropertyTests.propertyRoundTrip(
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
        Testers.bvEqual(output, expected);
    }
}

@suite class Id3v2_EventTimeCodeFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return EventTimeCodeFrame.fromFieldBytes;
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_notEnoughBytes(version: number) {
        // Arrange
        const fieldBytes = ByteVector.empty();
        const header = new Id3v2FrameHeader(FrameIdentifiers.ETCO, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => { EventTimeCodeFrame.fromFieldBytes(header, fieldBytes, version); });
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_noEvents(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromByte(TimestampFormat.AbsoluteMilliseconds);
        const header = new Id3v2FrameHeader(FrameIdentifiers.ETCO, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = EventTimeCodeFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, [], TimestampFormat.AbsoluteMilliseconds);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_withEvents(version: number) {
        // Arrange
        const event1 = new EventTimeCode(EventType.Profanity, 123);
        const event2 = new EventTimeCode(EventType.KeyChange, 456);
        const fieldBytes = ByteVector.concatenate(
            TimestampFormat.AbsoluteMilliseconds, // Timecode format
            event1.render(),                      // Event 1
            event2.render()                       // Event 2
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.ETCO, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = EventTimeCodeFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        assertFrame(frame, [event1, event2], TimestampFormat.AbsoluteMilliseconds);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_incompleteEvent(version: number) {
        // Arrange
        const event1 = new EventTimeCode(EventType.Profanity, 123);
        const event2 = new EventTimeCode(EventType.KeyChange, 456);
        const fieldBytes = ByteVector.concatenate(
            TimestampFormat.AbsoluteMilliseconds, // Timecode type
            event1.render(),                      // Event 1
            event2.render().subarray(0, 3)        // Event 2 (incomplete)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.ETCO, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => EventTimeCodeFrame.fromFieldBytes(header, fieldBytes, version));
    }

    @test
    public fromFields_withNothing() {
        // Act
        const output = EventTimeCodeFrame.fromFields();

        // Assert
        assertFrame(output, [], TimestampFormat.Unknown);
    }

    @test
    public fromFields_withTimestampFormat() {
        // Act
        const output = EventTimeCodeFrame.fromFields(TimestampFormat.AbsoluteMilliseconds);

        // Assert
        assertFrame(output, [], TimestampFormat.AbsoluteMilliseconds);
    }

    @test
    public fromFields_withTimestampFormatEvents() {
        // Arrange
        const events = [new EventTimeCode(EventType.Profanity, 12345)];

        // Act
        const output = EventTimeCodeFrame.fromFields(TimestampFormat.AbsoluteMilliseconds, events);

        // Assert
        assertFrame(output, events, TimestampFormat.AbsoluteMilliseconds);
    }
}

@suite class Id3v2_EventTimeCodeFrame_PropertyTests {
    @test
    public events() {
        // Arrange
        const frame = EventTimeCodeFrame.fromFields(TimestampFormat.AbsoluteMilliseconds);
        const set = (v: EventTimeCode[]) => { frame.events = v; };
        const get = () => frame.events;

        // Act / Assert
        PropertyTests.propertyRoundTrip(set, get, [new EventTimeCode(EventType.Profanity, 123)]);
        PropertyTests.propertyRoundTrip(set, get, []);
        PropertyTests.propertyNormalized(set, get, undefined, []);
        PropertyTests.propertyNormalized(set, get, null, []);
    }

    @test
    public timeStampFormat() {
        // Arrange
        const frame = EventTimeCodeFrame.fromFields(TimestampFormat.AbsoluteMilliseconds);

        // Act / Assert
        const get = () => frame.timestampFormat;
        const set = (v: TimestampFormat) => { frame.timestampFormat = v; };
        PropertyTests.propertyRoundTrip(set, get, TimestampFormat.AbsoluteMpegFrames);
    }
}

@suite class Id3v2_EventTimeCodeFrame_MethodTests {
    @test
    public clone() {
        // Arrange
        const frame = EventTimeCodeFrame.fromFields(
            TimestampFormat.AbsoluteMilliseconds,
            [new EventTimeCode(EventType.Profanity, 123), new EventTimeCode(EventType.ProfanityEnd, 456)]);

        // Act
        const output = <EventTimeCodeFrame> frame.clone();

        // Assert
        assertFrame(output, frame.events, frame.timestampFormat);
    }

    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: Frame[]) => { EventTimeCodeFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = EventTimeCodeFrame.filterFrames(frames);

        // Assert
        assert.isArray(output);
        assert.isEmpty(output);
    }

    @test
    public filterFrames_noMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frames = [frame1, frame2];

        // Act
        const result = EventTimeCodeFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = EventTimeCodeFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = EventTimeCodeFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = EventTimeCodeFrame.fromFields();
        const frame3 = EventTimeCodeFrame.fromFields();

        const frames = [frame1, frame2, frame3];

        // Act
        const result = EventTimeCodeFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = EventTimeCodeFrame.fromFields();
        const frame2 = EventTimeCodeFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = EventTimeCodeFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_withoutEvents(version: number) {
        // Arrange
        const frame = EventTimeCodeFrame.fromFields();
        frame.timestampFormat = TimestampFormat.AbsoluteMpegFrames;
        frame.events = [];

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.fromByte(TimestampFormat.AbsoluteMpegFrames);
        const header = new Id3v2FrameHeader(
            FrameIdentifiers.ETCO,
            Id3v2FrameFlags.FileAlterPreservation,
            fieldBytes.length
        );
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_withEvents(version: number) {
        // Arrange
        const event1 = new EventTimeCode(EventType.Profanity, 123);
        const event2 = new EventTimeCode(EventType.KeyChange, 456);

        const frame = EventTimeCodeFrame.fromFields();
        frame.timestampFormat = TimestampFormat.AbsoluteMpegFrames;
        frame.events = [event2, event1]; // Force events to be sorted

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.concatenate(
            TimestampFormat.AbsoluteMpegFrames, // Timecode format
            event1.render(),                    // Event 1
            event2.render()                     // Event 2
        );
        const header = new Id3v2FrameHeader(
            FrameIdentifiers.ETCO,
            Id3v2FrameFlags.FileAlterPreservation,
            fieldBytes.length
        );
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }
}
