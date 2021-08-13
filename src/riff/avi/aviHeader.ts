import {AviStream} from "./aviStream";
import RiffList from "../riffList";
import {CorruptFileError} from "../../errors";
import {ICodec} from "../../iCodec";
import {Guards} from "../../utils";

/**
 * This class represents the headers in an AVI file.
 */
export default class AviHeader {
    public static readonly headerListType = "hdrl";

    private readonly _durationMilliseconds: number;
    private readonly _flags: number;
    private readonly _height: number;
    private readonly _initialFrames: number;
    private readonly _maxBytesPerSecond: number;
    private readonly _microsecondsPerFrame: number;
    private readonly _streamCount: number;
    private readonly _streams: AviStream[];
    private readonly _suggestedBufferSize: number;
    private readonly _totalFrames;
    private readonly _width: number;

    /**
     * Constructs and initializes a new instance by reading information from a RIFF list.
     * @param list List containing the data for the AVI headers
     */
    public constructor(list: RiffList) {
        Guards.truthy(list, "list");
        if (list.type !== AviHeader.headerListType) {
            throw new CorruptFileError(`Expected ${AviHeader.headerListType} list but got ${list.type}`);
        }

        // Read the main header
        const mainHeaderValues = list.getValues("avih");
        if (mainHeaderValues.length === 0) {
            throw new CorruptFileError("Could not find AVI main header data");
        }
        const mainHeaderData = mainHeaderValues[0];
        if (mainHeaderData.length !== 40) {
            throw new CorruptFileError("AVI header is an invalid length");
        }
        this._microsecondsPerFrame = mainHeaderData.mid(0, 4).toUInt(false);
        this._maxBytesPerSecond = mainHeaderData.mid(4, 4).toUInt(false);
        this._flags = mainHeaderData.mid(12, 4).toUInt(false);
        this._totalFrames = mainHeaderData.mid(16, 4).toUInt(false);
        this._initialFrames = mainHeaderData.mid(20, 4).toUInt(false);
        this._streamCount = mainHeaderData.mid(24, 4).toUInt(false);
        this._suggestedBufferSize = mainHeaderData.mid(28, 4).toUInt(false);
        this._width = mainHeaderData.mid(32, 4).toUInt(false);
        this._height = mainHeaderData.mid(36, 4).toUInt(false);

        this._durationMilliseconds = this._totalFrames * this._microsecondsPerFrame / 1000;

        // Read the streams in the file
        const streamHeaderLists = list.getLists(AviStream.listType);
        this._streams = streamHeaderLists.map((l) => new AviStream(l));
    }

    /**
     * Gets the codecs read from the header list.
     */
    public get codecs(): ICodec[] { return this._streams.map((s) => s.codec); }

    /**
     * Gets the duration of the media in this file, in milliseconds.
     */
    public get durationMilliseconds(): number { return this._durationMilliseconds; }

    /**
     * Gets the file flags.
     */
    public get flags(): number { return this._flags; }

    /**
     * Gets the height of the video in the file, in pixels.
     */
    public get height(): number { return this._height; }

    /**
     * Gets how far ahead audio is from video.
     */
    public get initialFrames(): number { return this._initialFrames; }

    /**
     * Gets the maximum number of bytes per second.
     */
    public get maxBytesPerSecond(): number { return this._maxBytesPerSecond; }

    /**
     * Gets the number of microseconds per frame.
     */
    public get microsecondsPerFrame(): number { return this._microsecondsPerFrame; }

    /**
     * Gets the suggested buffer size for the file, in bytes.
     */
    public get suggestedBufferSize(): number { return this._suggestedBufferSize; }

    /**
     * Gets the number of frames in the file.
     */
    public get totalFrames(): number { return this._totalFrames; }

    /**
     * Gets the width of the video in the file, in pixels.
     */
    public get width(): number { return this._width; }

    /**
     * Gets the total number of streams in the current instance, including ones that are not
     * supported by this library.
     */
    public get streamCount(): number { return this._streamCount; }

    /**
     * Gets the (supported) streams that were read from the header list.
     */
    public get streams(): AviStream[] { return this._streams; }
}
