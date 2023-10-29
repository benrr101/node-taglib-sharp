import Mpeg4Box from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";

export default class UnknownBox extends Mpeg4Box {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see UnknownBox with a provided header and handler
     * by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     */
    public static fromFile(header: Mpeg4BoxHeader, file: File, handlerType: ByteVector): UnknownBox {
        const instance = new UnknownBox();
        instance.initializeFromHeader(header, handlerType);
        instance.data = file.readBlock(instance.dataSize > 0 ? instance.dataSize : 0);

        return instance;
    }
}