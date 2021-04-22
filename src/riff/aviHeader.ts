import {ByteVector} from "../byteVector";
import {CorruptFileError} from "../errors";
import {Guards} from "../utils";

/**
 * Representation of a Microsoft AviMainHeader structure, minus the first 8 bytes.
 */
export default class AviHeader {
    private readonly _durationMilliseconds: number;
    private readonly _flags: number;
    private readonly _height: number;
    private readonly _initialFrames: number;
    private readonly _microsecondsPerFrame: number;
    private readonly _maxBytesPerSeconds: number;
    private readonly _streams: number;
    private readonly _suggestedBufferSize: number;
    private readonly _totalFrames: number;
    private readonly _width: number;

    /**
     * Constructs and initializes a new instance by reading the raw structure from a specified in a
     * {@see ByteVector} object.
     * @param data ByteStructure containing the raw structure
     * @param offset Index into `data` where the structure begins
     */
    public constructor(data: ByteVector, offset: number) {
        Guards.truthy(data, "data");
        Guards.safeUint(offset, "offset");
        if (offset + 40 > data.length) {
            throw new CorruptFileError("Data is too short for AVI header, expected 40 bytes");
        }

        this._microsecondsPerFrame = data.mid(offset, 4).toUInt(false);
        this._maxBytesPerSeconds = data.mid(offset + 4, 4).toUInt(false);
        this._flags = data.mid(offset + 12, 4).toUInt(false);
        this._totalFrames = data.mid(offset + 16, 4).toUInt(false);
        this._initialFrames = data.mid(offset + 20, 4).toUInt(false);
        this._streams = data.mid(offset + 24, 4).toUInt(false);
        this._suggestedBufferSize = data.mid(offset + 28, 4).toUInt(false);
        this._width = data.mid(offset + 32, 4).toUInt(false);
        this._height = data.mid(offset + 36, 4).toUInt(false);

        this._durationMilliseconds = this._totalFrames * this._microsecondsPerFrame / 1000;
    }

    // #region Properties

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
    public get maxBytesPerSecond(): number { return this._maxBytesPerSeconds; }

    /**
     * Gets the number of microseconds per frame.
     */
    public get microsecondsPerFrame(): number { return this._microsecondsPerFrame; }

    /**
     * Gets the number of stream in the file.
     */
    public get streams(): number { return this._streams; }

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

    // #endregion
}
