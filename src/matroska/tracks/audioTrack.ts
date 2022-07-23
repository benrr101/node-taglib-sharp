import {EbmlElementValue} from "../../ebml/ebmlParser";
import {MatroskaIds} from "../matroskaIds";
import {ILosslessAudioCodec, MediaTypes} from "../../properties";
import {Track} from "./track";

export default class AudioTrack extends Track implements ILosslessAudioCodec {
    private readonly _bitDepth: number;
    private readonly _channels: number;
    private readonly _sampleRate: number;

    public constructor(trackElements: Map<number, EbmlElementValue>, audioElements: Map<number, EbmlElementValue>) {
        super(trackElements);

        // Read the relevant values
        this._channels = audioElements.get(MatroskaIds.CHANNELS)?.getUint();
        this._bitDepth = audioElements.get(MatroskaIds.BIT_DEPTH)?.getUint();
        this._sampleRate = audioElements.get(MatroskaIds.SAMPLING_FREQ)?.getDouble();
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
    public get bitsPerSample(): number { return this._bitDepth; }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes {
        // @TODO: Determine if the codec is lossless or not
        return MediaTypes.Audio;
    }
}
