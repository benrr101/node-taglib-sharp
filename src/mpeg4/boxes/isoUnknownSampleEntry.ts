import IsoSampleEntry from "./isoSampleEntry";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {Guards} from "../../utils";
import {ByteVector} from "../../byteVector";

/**
 * This class extends @see Mpeg4Box to provide an implementation of a ISO/IEC 14496-12 SampleEntry.
 */
export default class IsoUnknownSampleEntry extends IsoSampleEntry {
    /**
     * Protected constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.IsoSampleEntry; }

    /**
     * Constructs and initializes a new instance of @see IsoUnknownSampleEntry with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File to read the contents of the box from.
     *    new instance, or undefined if no handler applies.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     * @returns A new instance of @see IsoUnknownSampleEntry
     */
    public static fromHeaderFileAndHandler(
        header: Mpeg4BoxHeader,
        file: File,
        handlerType: ByteVector
    ): IsoUnknownSampleEntry {
        Guards.notNullOrUndefined(file, "file");

        const instance = new IsoUnknownSampleEntry();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);
        return instance;
    }
}