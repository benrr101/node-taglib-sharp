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
    private _videoHeight: number;
    private _videoWidth: number;

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
        instance._videoWidth = file.readBlock(2).toUshort();
        instance._videoHeight = file.readBlock(2).toUshort();

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.IsoVisualSampleEntry; }

    /** @inheritDoc */
    public get durationMilliseconds(): number { return 0; }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.Video; }

    /** @inheritDoc */
    public get description(): string { return `MPEG-4 Video (${this.boxType.toString(StringType.Latin1)})`; }

    /** @inheritDoc */
    public get videoHeight(): number { return this._videoHeight };

    /** @inheritDoc */
    public get videoWidth(): number { return this._videoWidth; }
}