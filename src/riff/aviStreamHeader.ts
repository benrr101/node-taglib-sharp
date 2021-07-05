import {ByteVector} from "../byteVector";
import {CorruptFileError} from "../errors";
import {Guards} from "../utils";

export enum AviStreamType {
    /** Audio Stream */
    /* auds*/ AUDIO_STREAM = 0x73647561,

    /** MIDI Stream */
    /* mids */ MIDI_STREAM = 0x7264696D,

    /** Text stream */
    /* txts */ TEXT_STREAM = 0x73747874,

    /** Video stream */
    /* vids */ VIDEO_STREAM = 0x73646976
}

/**
 * Contains information about one stream in an AVI file.
 * @link https://docs.microsoft.com/en-us/previous-versions/windows/desktop/api/avifmt/ns-avifmt-avistreamheader
 */
export class AviStreamHeader {
    private readonly _bottom: number;
    private readonly _flags: number;
    private readonly _handler: number;
    private readonly _initialFrames: number;
    private readonly _language: number;
    private readonly _left: number;
    private readonly _length: number;
    private readonly _priority: number;
    private readonly _quality: number;
    private readonly _rate: number;
    private readonly _right: number;
    private readonly _sampleSize: number;
    private readonly _scale: number;
    private readonly _start: number;
    private readonly _suggestedBufferSize: number;
    private readonly _top: number;
    private readonly _type: number;

    /**
     * Constructs and initializes a new instance by reading the raw structure from a specified
     * position in the provided data.
     * @param data Data that contains the raw stream header
     * @param offset Position into `data` where the stream header begins
     */
    public constructor(data: ByteVector, offset: number) {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        if (offset + 56 > data.length) {
            throw new CorruptFileError("Expected 56 bytes for AVI stream header");
        }

        this._type = data.mid(offset, 4).toUInt(false);
        this._handler = data.mid(offset + 4, 4).toUInt(false);
        this._flags = data.mid(offset + 8, 4).toUInt(false);
        this._priority = data.mid(offset + 12, 2).toUShort(false);
        this._language = data.mid(offset + 14, 2).toUShort(false);
        this._initialFrames = data.mid(offset + 16, 4).toUInt(false);
        this._scale = data.mid(offset + 20, 4).toUInt(false);
        this._rate = data.mid(offset + 24, 4).toUInt(false);
        this._start = data.mid(offset + 28, 4).toUInt(false);
        this._length = data.mid(offset + 32, 4).toUInt(false);
        this._suggestedBufferSize = data.mid(offset + 36, 4).toUInt(false);
        this._quality = data.mid(offset + 40, 4).toUInt(false);
        this._sampleSize = data.mid(offset + 44, 4).toUInt(false);
        this._left = data.mid(offset + 48, 2).toUShort(false);
        this._top = data.mid(offset + 50, 2).toUShort(false);
        this._right = data.mid(offset + 52, 2).toUShort(false);
        this._bottom = data.mid(offset + 54, 2).toUShort(false);
    }

    /**
     * Gets the offset from the bottom of the main movie rectangle where this stream should be
     * positioned.
     */
    public get bottom(): number { return this._bottom; }

    /**
     * Gets any flags for the data stream.
     */
    public get flags(): number { return this._flags; }

    /**
     * Gets an optional FOURCC that identifies a specific data handler. The data handler is the
     * preferred handler for the stream. For audio/video streams, this specifies the codec for
     * decoding the stream.
     */
    public get handler(): number { return this._handler; }

    /**
     * Gets how far audio data is skewed ahead of the video frames in an interleaved file. This
     * value generally 0 for non-interleaved files.
     */
    public get initialFrames(): number { return this._initialFrames; }

    /**
     * Gets the language tag for the stream.
     */
    public get language(): number { return this._language; }

    /**
     * Gets the offset from the left of the main movie rectangle where this stream should be
     * positioned.
     */
    public get left(): number { return this._left; }

    /**
     * Gets the length of the stream. The units are defined by `rate` and `scale` in the main file
     * header.
     */
    public get length(): number { return this._length; }

    /**
     * Gets the priority of a stream type. For example, in a file with multiple audio streams,
     * the one with the highest priority might be the default stream.
     */
    public get priority(): number { return this._priority; }

    /**
     * Gets an indicator of the quality of the data in the stream. Quality is represented as a
     * number between `0` and `10000`. -1 indicates the default quality values should be used.
     * @remarks For compressed data, this typically represents the value of the quality parameter
     *     passed to the compression software.
     */
    public get quality(): number { return this._quality; }

    /**
     * Used with {@see scale} to specify the time scale that this stream will use.
     * @remarks Dividing {@see rate} by this gives the number of samples per second. For video
     *     streams, this is the frame rate. For audio streams, this rate corresponds to the time
     *     needed to play {@see RiffWaveFormatEx.blockAlign} bytes of audio. For PCM audio this is
     *     just the sample rate.
     */
    public get rate(): number { return this._rate; }

    /**
     * Gets the offset from the right of the main movie rectangle where this stream should be
     * positioned.
     */
    public get right(): number { return this._right; }

    /**
     * Gets the size of a single sample of data. If the sample size varies, this will be `0`.
     */
    public get sampleSize(): number { return this._sampleSize; }

    /**
     * Used with {@see rate} to specify the time scale that this stream will use.
     * @remarks Dividing {@see rate} by this gives the number of samples per second. For video
     *     streams, this is the frame rate. For audio streams, this rate corresponds to the time
     *     needed to play `nBlockAlign` bytes of audio. For PCM audio is just the sample rate.
     */
    public get scale(): number { return this._scale; }

    /**
     * Gets the starting time for this stream. The units are defined by `rate` and `scale` in the
     * main file header.
     * @remarks Usually this is zero, but it can specify a delay time for a stream that does not
     *     start concurrently with the file.
     */
    public get start(): number { return this._start; }

    /**
     * Gets how large of a buffer should be used to read this stream.
     * @remarks Typically, this contains a value corresponding to the largest chunk present in the
     *     stream.
     */
    public get suggestedSampleSize(): number { return this._suggestedBufferSize; }

    /**
     * Gets the offset from the top of the main movie rectangle where this stream should be
     * positioned.
     */
    public get top(): number { return this._top; }

    /**
     * Gets a FOURCC that species the type of data contained in the stream.
     */
    public get type(): AviStreamType { return this._type; }
}
