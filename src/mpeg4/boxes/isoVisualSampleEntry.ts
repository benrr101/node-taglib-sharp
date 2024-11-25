import IsoSampleEntry from "./isoSampleEntry";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector, StringType} from "../../byteVector";
import {File} from "../../file";
import {IVideoCodec, MediaTypes} from "../../properties";

/**
 * This class extends {@link IsoSampleEntry} and implements {@link IVideoCodec} to provide an implementation of a
 * ISO/IEC 14496-12 VisualSampleEntry and support for reading MPEG-4 video properties.
 */
export default class IsoVisualSampleEntry extends IsoSampleEntry implements IVideoCodec {
    private _videoHeight: number;
    private _videoWidth: number;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Initializes the instance using the box's header, and additional information read from the file.
     * @param header Header for the box.
     * @param file File to read additional information from.
     * @param handlerType Type of the handler for the box. Optional.
     */
    public static fromFile(header: Mpeg4BoxHeader, file: File, handlerType: ByteVector): IsoVisualSampleEntry {
        const instance = new IsoVisualSampleEntry();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);

        const dataPositionBeforeIncrease = instance.increaseDataPosition(62);
        file.seek(dataPositionBeforeIncrease + 16);
        instance._videoWidth = file.readBlock(2).toUshort();
        instance._videoHeight = file.readBlock(2).toUshort();

        return instance;
    }

    /** @inheritDoc */
    public get durationMilliseconds(): number { return 0; }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.Video; }

    /** @inheritDoc */
    // @TODO: I'm sure we can get a better description than this
    public get description(): string { return `MPEG-4 Video (${this.boxType.toString(StringType.Latin1)})`; }

    /** @inheritDoc */
    public get videoHeight(): number { return this._videoHeight; }

    /** @inheritDoc */
    public get videoWidth(): number { return this._videoWidth; }
}