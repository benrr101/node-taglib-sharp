import FullBox from "./fullBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {File} from "../../file";
import {ByteVector} from "../../byteVector";

/**
 * This class extends {@link FullBox} to provide an implementation of a ISO/IEC 14496-12 SampleDescriptionBox.
 */
export default class IsoSampleDescriptionBox extends FullBox {
    private _entryCount: number;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of {@link IsoSampleDescriptionBox} with a provided header
     * and handler by reading the contents from a specified file.
     * @param header A {@link Mpeg4BoxHeader} object containing the header to use for the new instance.
     * @param file A {@link File} object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     */
    public static fromFile(file: File, header: Mpeg4BoxHeader, handlerType: ByteVector): IsoSampleDescriptionBox {
        const instance = new IsoSampleDescriptionBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);
        instance.increaseDataPosition(4);
        instance._entryCount = file.readBlock(4).toUint();

        return instance;
    }

    /**
     * The number of boxes at the beginning of the children that will be stored as {@link IsoAudioSampleEntry}
     * of {@link IsoVisualSampleEntry} objects, depending on the handler.
     */
    public get entryCount(): number { return this._entryCount; }
}
