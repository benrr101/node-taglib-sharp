import EventTimeCode from "./eventTimeCode";
import FrameTypes from "../frameTypes";
import {ByteVector} from "../../byteVector";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "./frameHeader";
import {Guards} from "../../utils";
import {TimestampFormat} from "../utilTypes";

export default class EventTimeCodeFrame extends Frame {
    private _events: EventTimeCode[];
    private _timestampFormat: TimestampFormat;

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance without contents
     */
    public static fromEmpty(): EventTimeCodeFrame {
        const frame = new EventTimeCodeFrame(new Id3v2FrameHeader(FrameTypes.ETCO, 4));
        frame.flags = Id3v2FrameFlags.FileAlterPreservation;
        return frame;
    }

    /**
     * Constructs and initializes a timestamp format set
     * @param timestampFormat Timestamp format for the event codes stored in this frame
     */
    public static fromTimestampFormat(timestampFormat: TimestampFormat): EventTimeCodeFrame {
        const frame = new EventTimeCodeFrame(new Id3v2FrameHeader(FrameTypes.ETCO, 4));
        frame.flags = Id3v2FrameFlags.FileAlterPreservation;
        frame.timestampFormat = timestampFormat;
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified ID3v2
     * version. This method allows for offset reading from the data bytevector.
     * @param data Raw representation of the new frame
     * @param offset What offset in {@paramref data} the frame actually begins. Must be positive,
     *     safe integer
     * @param header Header of the frame found at {@paramref data} in the data
     */
    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader
    ) {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");

        const frame = new EventTimeCodeFrame(header);
        frame.setData(data, offset, false);
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified
     * ID3v2 version.
     * @param data Raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number) {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        const frame = new EventTimeCodeFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, true);
        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.EventTimeCodeFrame; }

    /**
     * Gets the event this frame contains. Each {@see EventTimeCode} represents a single event at a
     * certain point in time.
     */
    public get events(): EventTimeCode[] { return this._events; }
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

    /** @inheritDoc */
    public clone(): Frame {
        const frame = new EventTimeCodeFrame(this._header);
        frame.timestampFormat = this.timestampFormat;
        frame.events = this.events.map((i) => i.clone());
        return frame;
    }

    /** @inheritDoc */
    protected parseFields(data: ByteVector, version: number): void {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        this._events = [];
        this._timestampFormat = data.get(0);

        const incomingEventsData = data.mid(1);
        for (let i = 0; i < incomingEventsData.length; i += 5) {
            const eventType = incomingEventsData.get(i);

            const timestampData = ByteVector.concatenate(
                incomingEventsData.get(i + 1),
                incomingEventsData.get(i + 2),
                incomingEventsData.get(i + 3),
                incomingEventsData.get(i + 4)
            );
            const timestamp = timestampData.toInt();

            this._events.push(new EventTimeCode(eventType, timestamp));
        }
    }

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        const data: Array<ByteVector|number> = [this.timestampFormat];

        for (const event of this.events) {
            const timeData = ByteVector.fromInt(event.time);
            data.push(event.eventType);
            data.push(timeData);
        }

        return ByteVector.concatenate(... data);
    }

    // #endregion
}
