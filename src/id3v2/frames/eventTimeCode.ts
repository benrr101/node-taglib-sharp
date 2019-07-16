import {Guards} from "../../utils";
import {EventType} from "../utilTypes";

export default class EventTimeCode {
    private _time: number;
    private _eventType: EventType;

    public constructor(eventType: EventType, time: number) {
        Guards.int(time, "time");
        this._eventType = eventType;
        this._time = time;
    }

    public static fromEmpty(): EventTimeCode {
        return new EventTimeCode(EventType.Padding, 0);
    }

    public get time(): number { return this._time; }
    public set time(value: number) {
        Guards.int(value, "value");
        this._time = value;
    }

    public get eventType(): EventType { return this._eventType; }
    public set eventType(value: EventType) { this._eventType = value; }
}
