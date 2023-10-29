import IsoSampleEntry from "./isoSampleEntry";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {File} from "../../file";
import {ByteVector} from "../../byteVector";

/**
 * This class extends {@link Mpeg4Box} to provide an implementation of a ISO/IEC 14496-12 SampleEntry.
 */
export default class IsoUnknownSampleEntry extends IsoSampleEntry {
    /**
     * Protected constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of {@link IsoUnknownSampleEntry} with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A {@link Mpeg4BoxHeader} object containing the header to use for the new instance.
     * @param file A {@link File} to read the contents of the box from.
     *    new instance, or undefined if no handler applies.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     */
    public static fromFile(header: Mpeg4BoxHeader, file: File, handlerType: ByteVector): IsoUnknownSampleEntry {
        const instance = new IsoUnknownSampleEntry();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);
        return instance;
    }
}