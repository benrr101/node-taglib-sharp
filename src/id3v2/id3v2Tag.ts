import {StringType} from "../byteVector";
import {Tag} from "../tag";
import {Frame, FrameClassType} from "./frames/frame";
import {Guards} from "../utils";

export default class Id3v2Tag extends Tag {
    private static _defaultEncoding: StringType = StringType.UTF8;
    private static _forceDefaultEncoding: boolean = false;
    private _extendedHeader: ExtendedHeader;
    private _frameList: Frame[] = [];
    private _header: Header;
    private _performersRole: string[];

    public static get defaultEncoding(): StringType { return Id3v2Tag._defaultEncoding; }
    public static set defaultEncoding(value: StringType) { Id3v2Tag._defaultEncoding = value; }
    public static get forceDefaultEncoding(): boolean { return Id3v2Tag._forceDefaultEncoding; }
    public static set forceDefaultEncoding(value: boolean) { Id3v2Tag._forceDefaultEncoding = value; }

    public addFrame(frame: Frame): void {
        Guards.truthy(frame, "frame");
        this._frameList.push(frame);
    }

    public getFramesByClassType<TFrame extends Frame>(type: FrameClassType): TFrame[] {
        return this._frameList.filter((f) => f.frameClassType === type)
            .map((f) => <TFrame> f);
    }
}