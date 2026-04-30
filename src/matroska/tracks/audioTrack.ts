import EbmlElement from "../../ebml/ebmlElement";
import {MatroskaIds} from "../matroskaIds";
import {ILosslessAudioCodec, MediaTypes} from "../../properties";
import {MatroskaTrackType, Track} from "./track";
import {CorruptFileError} from "../../errors";
import EbmlParser from "../../ebml/ebmlParser";

export default class AudioTrack extends Track implements ILosslessAudioCodec {
    private readonly _bitDepth: number|undefined;
    private readonly _channels: number;
    private readonly _sampleRate: number;

    public constructor(elements: Map<number, EbmlElement>) {
        super(elements);

        if (this.type !== MatroskaTrackType.Audio) {
            throw new Error(`Audio track constructor used to construct type ${this.type} track.`);
        }

        const audioElement = elements.get(MatroskaIds.AUDIO);
        if (!audioElement) {
            throw new CorruptFileError("Matroska audio track is missing required audio master element");
        }

        const audioElements = EbmlParser.getAllElements(audioElement.getParser());

        // Read the relevant values
        this._channels = audioElements.get(MatroskaIds.CHANNELS)?.getSafeUint() ?? 1;
        this._bitDepth = audioElements.get(MatroskaIds.BIT_DEPTH)?.getSafeUint();
        this._sampleRate = audioElements.get(MatroskaIds.SAMPLING_FREQ)?.getDouble() ?? 8000;
    }

    /** @inheritDoc */
    public get audioBitrate(): number {
        // @TODO How can we calculate that
        return 0;
    }

    /** @inheritDoc */
    public get audioChannels(): number { return this._channels; }

    /** @inheritDoc */
    public get audioSampleRate(): number { return this._sampleRate; }

    /** @inheritDoc */
    public get bitsPerSample(): number { return this._bitDepth || 0; }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes {
        // @TODO: Determine if the codec is lossless or not
        return MediaTypes.Audio;
    }
}
