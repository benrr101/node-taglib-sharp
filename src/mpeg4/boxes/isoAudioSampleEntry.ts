import AppleElementaryStreamDescriptor from "./appleElementaryStreamDescriptor";
import IsoSampleEntry from "./isoSampleEntry";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import Mpeg4BoxType from "../mpeg4BoxType";
import {ByteVector, StringType} from "../../byteVector";
import {File} from "../../file";
import {IAudioCodec, MediaTypes} from "../../properties";
import {Guards, NumberUtils} from "../../utils";

/**
 * This class extends @see IsoSampleEntry and implements @see IAudioCodec to provide an implementation of a
 * ISO/IEC 14496-12 AudioSampleEntry and support for reading MPEG-4 video properties.
 */
export default class IsoAudioSampleEntry extends IsoSampleEntry implements IAudioCodec {
    private _audioChannels: number;
    private _audioSampleRate: number;
    private _audioSampleSize: number;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoVisualSampleEntry with a provided header and
     * handler by reading the contents from a specified file.
     * @param file A @see File to read the contents of the box from.
     *     new instance, or undefined if no handler applies.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     * @returns A new instance of @see IsoVisualSampleEntry
     */
    public static fromFile(file: File, header: Mpeg4BoxHeader, handlerType: ByteVector): IsoAudioSampleEntry {
        const instance = new IsoAudioSampleEntry();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);
        const dataPositionBeforeIncrease = instance.increaseDataPosition(20);

        file.seek(dataPositionBeforeIncrease + 8);
        instance._audioChannels = file.readBlock(2).toUshort();
        instance._audioSampleSize = file.readBlock(2).toUshort();

        file.seek(dataPositionBeforeIncrease + 16);
        const sampleRate = file.readBlock(4).toUint();
        instance._audioSampleRate = NumberUtils.uintRShift(sampleRate, 16);

        return instance;
    }

    /**
     * Gets the bitrate of the audio represented by the current instance.
     */
    public get audioBitrate(): number {
        const esds = this.getChildRecursively(Mpeg4BoxType.ESDS);

        // If we don't have a stream descriptor, we don't know what's what.
        if (!(esds instanceof AppleElementaryStreamDescriptor)) {
            return 0;
        }

        // Return from the elementary stream descriptor.
        return esds.averageBitrate;
    }

    /** @inheritDoc */
    public get audioChannels(): number { return this._audioChannels; }

    /** @inheritDoc */
    public get audioSampleRate(): number { return this._audioSampleRate; }

    /** @inheritDoc */
    public get audioSampleSize(): number { return this._audioSampleSize; }

    /** @inheritDoc */
    // @TODO I'm sure we can get a better description than this
    public get description(): string { return `MPEG-4 Audio (${this.boxType.toString(StringType.Latin1)})`; }

    /** @inheritDoc */
    public get durationMilliseconds(): number { return 0; }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.Audio; }
}