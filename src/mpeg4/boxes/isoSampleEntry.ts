import Mpeg4Box from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {Guards} from "../../utils";
import {ByteVector} from "../../byteVector";

/**
 * This class extends @see Mpeg4Box to provide an implementation of a ISO/IEC 14496-12 SampleEntry.
 */
export default abstract class IsoSampleEntry extends Mpeg4Box {
    /**
     * The data reference index of the current instance.
     */
    private _dataReferenceIndex: number;

    /**
     * Protected constructor to force construction via static functions.
     */
    protected constructor() {
        super();
    }

    /** @inheritDoc */
    public abstract get boxClassType(): Mpeg4BoxClassType;

    /**
     * Constructs and initializes a new instance of @see IsoSampleEntry with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     */
    public initializeFromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handlerType: ByteVector): void {
        Guards.notNullOrUndefined(file, "file");

        this.initializeFromHeaderAndHandler(header, handlerType);
        const dataPositionBeforeIncrease: number = this.increaseDataPosition(8);
        file.seek(dataPositionBeforeIncrease + 6);
        this._dataReferenceIndex = file.readBlock(2).toUshort();
    }

    /**
     * Gets the data reference index of the current instance.
     * @return A value containing the data reference index of the current instance.
     */
    public get dataReferenceIndex(): number {
        return this._dataReferenceIndex;
    }
}