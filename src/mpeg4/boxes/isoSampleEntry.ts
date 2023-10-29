import Mpeg4Box from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {File} from "../../file";
import {Guards} from "../../utils";
import {ByteVector} from "../../byteVector";

/**
 * This class extends {@link Mpeg4Box} to provide an implementation of a ISO/IEC 14496-12 SampleEntry.
 */
export default abstract class IsoSampleEntry extends Mpeg4Box {
    private _dataReferenceIndex: number;

    /**
     * Protected constructor to force construction via static functions.
     */
    protected constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of {@link IsoSampleEntry} with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A {@link Mpeg4BoxHeader} object containing the header to use for the new instance.
     * @param file A {@link File} object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     */
    public initializeFromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handlerType: ByteVector): void {
        Guards.truthy(file, "file");

        this.initializeFromHeader(header, handlerType);
        const dataPositionBeforeIncrease = this.increaseDataPosition(8);
        file.seek(dataPositionBeforeIncrease + 6);
        this._dataReferenceIndex = file.readBlock(2).toUshort();
    }

    /**
     * Gets the data reference index of the current instance.
     */
    public get dataReferenceIndex(): number { return this._dataReferenceIndex; }
}