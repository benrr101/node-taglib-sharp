import IsoSampleEntry from "./isoSampleEntry";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector, StringType} from "../../byteVector";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {IVideoCodec, MediaTypes} from "../../properties";
import {Guards} from "../../utils";

/**
 * This class extends @see IsoSampleEntry and implements @see IVideoCodec to provide an implementation of a
 * ISO/IEC 14496-12 VisualSampleEntry and support for reading MPEG-4 video properties.
 */
export default class IsoVisualSampleEntry extends IsoSampleEntry implements IVideoCodec {
    /**
     * Contains the width of the visual.
     */
    public videoWidth: number;

    /**
     * Contains the height of the visual.
     */
    public videoHeight: number;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    public static fromHeaderFileAndHandler(
        header: Mpeg4BoxHeader,
        file: File,
        handlerType: ByteVector
    ): IsoVisualSampleEntry {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoVisualSampleEntry = new IsoVisualSampleEntry();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);
        const dataPositionBeforeIncrease: number = instance.increaseDataPosition(62);
        file.seek(dataPositionBeforeIncrease + 16);
        instance.videoWidth = file.readBlock(2).toUshort();
        instance.videoHeight = file.readBlock(2).toUshort();

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.IsoVisualSampleEntry; }

    /**
     * Gets the duration of the media represented by the current instance.
     */
    public get durationMilliseconds(): number {
        return 0;
    }

    /**
     * Gets the types of media represented by the current instance.
     */
    public get mediaTypes(): MediaTypes {
        return MediaTypes.Video;
    }

    /**
     * Gets a text description of the media represented by the current instance.
     */
    public get description(): string {
        return `MPEG-4 Video (${this.boxType.toString(StringType.Latin1)})`;
    }
}