import {AviStream} from "./aviStream";
import RiffList from "./riffList";
import {ByteVector} from "../byteVector";
import {CorruptFileError} from "../errors";
import {File} from "../file";
import {ICodec} from "../iCodec";
import {Guards} from "../utils";

/**
 * Representation of a Microsoft AviMainHeader structure, minus the first 8 bytes.
 */
export class AviHeader {
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

/**
 * This class provides support for reading an AVI header list to extract stream information.
 */
export class AviHeaderList {
    private readonly _codecs: ICodec[] = [];
    private readonly _header: AviHeader;

    /**
     * Constructs and initializes a new instance by reading the contents of a raw RIFF list from a
     * specified position in a file.
     * @param file File that contains AVI headers that will be read into the new instance
     * @param position Index into the file where the header list begins
     * @param length Number of bytes to read
     */
    public constructor(file: File, position: number, length: number) {
        Guards.truthy(file, "file");
        Guards.uint(length, "length");
        Guards.safeUint(position, "position");
        if (position > file.length - length) {
            throw new Error("Argument out of range: position must be less than length of file");
        }

        const list = RiffList.fromFile(file, position, length);

        // Read the header
        if (!list.containsKey("avih")) {
            throw new CorruptFileError("AVI header not found");
        }
        const headerData = list.getValues("avih")[0];
        if (headerData.length !== 0x38) {
            throw new CorruptFileError("AVI header is an invalid length");
        }
        this._header = new AviHeader(headerData, 0);

        // Read the streams in the file
        const searchPattern = ByteVector.fromString("strl");
        for (const listData of list.getValues("LIST")) {
            if (!listData.startsWith(searchPattern)) {
                continue;
            }

            const stream = AviStream.parseStreamList(listData);
            if (stream) {
                this._codecs.push(stream.codec);
            }
        }
    }

    /**
     * Gets the codecs read in from the file used to construct the current instance.
     */
    public get codecs(): ICodec[] { return this._codecs; }

    /**
     * Gets the AVI header read in from the file used to construct the current instance.
     */
    public get header(): AviHeader { return this._header; }
}
