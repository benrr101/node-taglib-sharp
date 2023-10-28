import Mpeg4Box from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector} from "../../byteVector";

/**
 * This class extends @see Mpeg4Box to provide an implementation of a ISO/IEC 14496-12 SampleTableBox.
 */
export default class IsoSampleTableBox extends Mpeg4Box {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoSampleTableBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     * @returns A new instance of @see IsoSampleTableBox
     */
    public static fromHeader(header: Mpeg4BoxHeader, handlerType: ByteVector): IsoSampleTableBox {
        const instance = new IsoSampleTableBox();
        instance.initializeFromHeader(header, handlerType);

        return instance;
    }
}