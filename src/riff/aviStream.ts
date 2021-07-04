import RiffBitmapInfoHeader from "./riffBitmapInfoHeader";
import RiffWaveFormatEx from "./riffWaveFormatEx";
import {AviStreamHeader, AviStreamType} from "./aviStreamHeader";
import {ByteVector} from "../byteVector";
import {ICodec} from "../iCodec";
import {Guards} from "../utils";

/**
 * Base class representing a stream in an AVI file. Provides basic support for parsing a raw AVI
 * stream list.
 */
export abstract class AviStream {
    protected readonly _header: AviStreamHeader;
    protected _codec: ICodec;

    /**
     * Constructs and initializes a new instance with a specified stream header.
     * @param header The strean's header
     * @protected
     */
    protected constructor(header: AviStreamHeader) {
        this._header = header;
    }

    // #region Properties

    /**
     * Gets the codec information for this stream.
     */
    public get codec(): ICodec { return this._codec; }

    /**
     * Gets the header for this stream.
     */
    public get header(): AviStreamHeader { return this._header; }

    // #endregion

    // #region Methods

    /**
     * Parses a raw AVI stream list and returns the stream information
     * @param data
     */
    public static parseStreamList(data: ByteVector): AviStream {
        Guards.truthy(data, "data");

        // This must be a stream header list
        if (!data.startsWith(ByteVector.fromString("strl"))) {
            return undefined;
        }

        let stream: AviStream;
        let position = 4;
        while (position + 8 < data.length) {
            const id = data.mid(position, 4).toString();
            const blockLength = data.mid(position + 4, 4).toUInt(false);

            if (id === "strh" && !stream) {
                const streamHeader = new AviStreamHeader(data, position + 8);
                switch (streamHeader.type) {
                    case AviStreamType.VIDEO_STREAM:
                        stream = new AviVideoStream(streamHeader);
                        break;
                    case AviStreamType.AUDIO_STREAM:
                        stream = new AviAudioStream(streamHeader);
                        break;
                    case AviStreamType.MIDI_STREAM:
                    case AviStreamType.TEXT_STREAM:
                        // @TODO: Maybe support reading these?
                        break;
                }
            } else if (stream) {
                stream.parseItem(id, data, position + 8);
            }

            position += blockLength + 8;
        }

        return stream;
    }

    protected abstract parseItem(id: string, data: ByteVector, start: number): void;

    // #endregion
}

/**
 * Representation of an AVI audio stream to support reading audio stream data.
 */
export class AviAudioStream extends AviStream {
    /**
     * Constructs and initializes a new instance with a specified stream header.
     * @param header Header that defines the stream
     */
    public constructor(header: AviStreamHeader) {
        super(header);
    }

    protected parseItem(id: string, data: ByteVector, start: number) {
        if (id === "strf") {
            this._codec = new RiffWaveFormatEx(data, start);
        }
    }
}

/**
 * Representation of an AVI video stream to support reading video stream data.
 */
export class AviVideoStream extends AviStream {
    /**
     * Constructs and initializes a new instance with a specified stream header.
     * @param header Header that defines the stream
     */
    public constructor(header: AviStreamHeader) {
        super(header);
    }

    protected parseItem(id: string, data: ByteVector, start: number) {
        if (id === "strf") {
            this._codec = new RiffBitmapInfoHeader(data, start);
        }
    }
}
