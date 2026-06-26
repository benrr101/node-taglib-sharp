import Frame from "./frame";
import {ByteVector} from "../../byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {ArrayUtils, Guards} from "../../utils";
import {EventType, TimestampFormat} from "../utilTypes";
import {CorruptFileError} from "../../errors";

/**
 * Class that represents an event for usage in a {@link EventTimeCodeFrame}.
 */
export class EventTimeCode {
    private _time: number;
    private _eventType: EventType;

    /**
     * Constructs and initializes a new instance.
     * @param eventType Type of event the instance represents
     * @param time Timestamp when the event occurs
     */
    public constructor(eventType: EventType, time: number) {
        Guards.int(time, "time");
        this._eventType = eventType;
        this._time = time;
    }

    /**
     * Constructs and initializes a blank new instance of type {@link EventType.Padding} at time 0.
     */
    public static fromEmpty(): EventTimeCode {
        return new EventTimeCode(EventType.Padding, 0);
    }

    /**
     * Gets the timestamp when the event occurs. The format of the value is determined by the
     * frame that contains the timecode event.
     */
    public get time(): number { return this._time; }
    /**
     * Sets the timestamp when the event occurs. The format of the value is determined by the
     * frame that contains the timecode event.
     * @param value Timestamp when the event occurs.
     */
    public set time(value: number) {
        Guards.int(value, "value");
        this._time = value;
    }

    /**
     * Gets the type of the event the current instance represents.
     */
    public get eventType(): EventType { return this._eventType; }
    /**
     * Sets the type of the event the current instance represents.
     * @param value Type of the event
     */
    public set eventType(value: EventType) { this._eventType = value; }

    /**
     * Creates a copy of this instance
     */
    public clone(): EventTimeCode {
        return new EventTimeCode(this.eventType, this.time);
    }

    /**
     * Generates the byte representation of the event time code.
     */
    public render(): ByteVector {
        // @TODO: Do we need to store 0 time as one byte 0? It's in the docs like that
        return ByteVector.concatenate(
            this.eventType,
            ByteVector.fromInt(this.time)
        );
    }
}

/**
 * Represents an ID3v2 event time code frame, which is used to store timestamps for events within
 * a track.
 */
export class EventTimeCodeFrame extends Frame {
    private _events: EventTimeCode[] = [];
    private _timestampFormat: TimestampFormat = TimestampFormat.Unknown;

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance without contents
     */
    public static fromEmpty(): EventTimeCodeFrame {
        // @TODO: Should we be mucking around with the flags like this?
        const frame = new EventTimeCodeFrame(new Id3v2FrameHeader(FrameIdentifiers.ETCO));
        frame.flags = Id3v2FrameFlags.FileAlterPreservation;
        return frame;
    }

    /**
     * Constructs and initializes a new instance by parsing the fields from the field bytes.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the fields of the frame
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(
        header: Id3v2FrameHeader,
        fieldBytes: ByteVector,
        version: number
    ): EventTimeCodeFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        if (fieldBytes.length < 1) {
            throw new CorruptFileError("Event time code frame must contain at least 1 byte.");
        }

        // Time stamp format    $xx
        // ---- Repeated for each key event --------------------------------
        // Type of event   $xx
        // Time stamp      $xx (xx ...)
        // ---- Repeated for each key event --------------------------------

        const frame = new EventTimeCodeFrame(header);

        // Read time code format
        frame._timestampFormat = fieldBytes.get(0);

        // Read the events
        let offset = 1;
        const events: EventTimeCode[] = [];
        while (offset < fieldBytes.length) {
            // @TODO: Allow ignoring partial event codes

            if (offset + 5 > fieldBytes.length) {
                throw new CorruptFileError("Event time code frame does not contain enough bytes for event");
            }

            const eventType = fieldBytes.get(offset);
            const timeStamp = fieldBytes.subarray(offset + 1, 4).toUint();

            events.push(new EventTimeCode(eventType, timeStamp));
            offset += 5;
        }

        frame._events = events;

        return frame;
    }

    /**
     * Constructs and initializes a timestamp format set
     * @param timestampFormat Timestamp format for the event codes stored in this frame
     */
    public static fromTimestampFormat(timestampFormat: TimestampFormat): EventTimeCodeFrame {
        const frame = new EventTimeCodeFrame(new Id3v2FrameHeader(FrameIdentifiers.ETCO));
        frame.flags = Id3v2FrameFlags.FileAlterPreservation;
        frame.timestampFormat = timestampFormat;
        return frame;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the event this frame contains. Each {@link EventTimeCode} represents a single event at a
     * certain point in time.
     */
    public get events(): EventTimeCode[] { return this._events || []; }
    /**
     * Sets the event this frame contains
     */
    public set events(value: EventTimeCode[]) { this._events = value; }

    /**
     * Gets the format of timestamps in this frame instance
     */
    public get timestampFormat(): TimestampFormat { return this._timestampFormat; }
    /**
     * Sets the format of timestamps in this frame instance
     */
    public set timestampFormat(value: TimestampFormat) { this._timestampFormat = value; }

    // #endregion

    // #region Methods

    public filterFrames(frames: Frame[]): EventTimeCodeFrame[] {
        Guards.truthy(frames, "frames");
        return ArrayUtils.ofType(frames, EventTimeCodeFrame);
    }

    /** @inheritDoc */
    public clone(): Frame {
        const frame = new EventTimeCodeFrame(this.header);
        frame.timestampFormat = this.timestampFormat;
        frame.events = this.events.map((i) => i.clone());
        return frame;
    }

    /** @inheritDoc */
    protected renderFields(): ByteVector {
        // Docs state event codes must be sorted chronologically
        const events = this.events
            .sort((a, b) => a.time - b.time)
            .map(e => e.render());

        return ByteVector.concatenate(
            this.timestampFormat,
            ... events
        );
    }

    // #endregion
}
