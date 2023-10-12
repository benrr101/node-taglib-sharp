import Mpeg4Box from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {Guards} from "../../utils";

/**
 * This class extends @see Mpeg4Box to provide an implementation of an Apple AnnotationBox.
 */
export default class AppleAnnotationBox extends Mpeg4Box {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see AppleAnnotationBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param file A @see File object to read the contents of the box from.
     *     new instance, or undefined if no handler applies.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     * @returns A new instance of @see AppleAnnotationBox
     */
    public static fromFile(file: File, header: Mpeg4BoxHeader, handlerType: ByteVector): AppleAnnotationBox {
        Guards.notNullOrUndefined(file, "file");

        const instance = new AppleAnnotationBox();
        instance.initializeFromHeaderAndHandler(header, handlerType);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see AppleAnnotationBox of specified type with no children.
     * @param type A @see ByteVector object containing a 4-byte box type.
     * @returns A new instance of @see AppleAnnotationBox
     */
    public static fromType(type: ByteVector): AppleAnnotationBox {
        const instance = new AppleAnnotationBox();
        instance.initializeFromType(type);

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.AppleAnnotationBox; }
}