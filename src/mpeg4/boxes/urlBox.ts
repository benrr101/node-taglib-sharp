import Mpeg4Box from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";

/**
 * Represent a MP4 URL box
 */
export default class UrlBox extends Mpeg4Box {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     *  Constructs and initializes a new instance of @see UrlBox with a provided header and handler
     * by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     * @returns A new instance of @see UrlBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handlerType: ByteVector): UrlBox {
        const instance = new UrlBox();
        instance.initializeFromHeader(header, handlerType);
        instance.data = instance.loadData(file);

        return instance;
    }
}