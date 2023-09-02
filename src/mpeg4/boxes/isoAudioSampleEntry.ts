import AppleElementaryStreamDescriptor from "./appleElementaryStreamDescriptor";
import IsoHandlerBox from "./isoHandlerBox";
import IsoSampleEntry from "./isoSampleEntry";
import Mpeg4Box, {ChildFactory} from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector, StringType} from "../../byteVector";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {IAudioCodec, MediaTypes} from "../../properties";
import {Guards} from "../../utils";

/**
 * This class extends @see IsoSampleEntry and implements @see IAudioCodec to provide an implementation of a
 * ISO/IEC 14496-12 AudioSampleEntry and support for reading MPEG-4 video properties.
 */
export default class IsoAudioSampleEntry extends IsoSampleEntry implements IAudioCodec {
    /**
     * The number of channels in the audio represented by the current instance.
     */
    public audioChannels: number;

    /**
     * The sample size of the audio represented by the current instance.
     */
    public audioSampleSize: number;

    /**
     * The sample rate of the audio represented by the current instance.
     */
    public audioSampleRate: number;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoVisualSampleEntry with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @param childFactory Factory that generates child boxes
     * @returns A new instance of @see IsoVisualSampleEntry
     */
    public static fromHeaderFileAndHandler(
        header: Mpeg4BoxHeader,
        file: File,
        handler: IsoHandlerBox,
        childFactory: ChildFactory
    ): IsoAudioSampleEntry {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoAudioSampleEntry = new IsoAudioSampleEntry();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);
        const dataPositionBeforeIncrease: number = instance.increaseDataPosition(20);

        file.seek(dataPositionBeforeIncrease + 8);
        instance.audioChannels = file.readBlock(2).toUshort();
        instance.audioSampleSize = file.readBlock(2).toUshort();

        file.seek(dataPositionBeforeIncrease + 16);
        const sampleRate: number = file.readBlock(4).toUint();
        instance.audioSampleRate = IsoAudioSampleEntry.calculateAudioSampleRate(sampleRate);
        instance.children = instance.loadChildren(file, childFactory);

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.IsoAudioSampleEntry; }

    /**
     * Gets the duration of the media represented by the current instance.
     */
    public get durationMilliseconds(): number { return 0; }

    /**
     *  Gets the types of media represented by the current instance.
     */
    public get mediaTypes(): MediaTypes { return MediaTypes.Audio; }

    /**
     *  Gets a text description of the media represented by the current instance.
     */
    public get description(): string { return `MPEG-4 Audio (${this.boxType.toString(StringType.Latin1)})`; }

    /**
     * Gets the bitrate of the audio represented by the current instance.
     */
    public get audioBitrate(): number {
        const esds: Mpeg4Box = this.getChildRecursively(ByteVector.fromString("esds", StringType.UTF8));

        // If we don't have a stream descriptor, we don't know what's what.
        if (!(esds instanceof AppleElementaryStreamDescriptor)) {
            return 0;
        }

        // Return from the elementary stream descriptor.
        return esds.averageBitrate;
    }

    private static calculateAudioSampleRate(sampleRate: number): number {
        return <number>(sampleRate >>> 16);
    }
}