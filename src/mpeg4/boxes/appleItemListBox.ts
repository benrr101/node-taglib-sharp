import Mpeg4Box from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import Mpeg4BoxType from "../mpeg4BoxType";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {Guards} from "../../utils";

/**
 * This class extends @see Mpeg4Box to provide an implementation of an Apple ItemListBox.
 */
export default class AppleItemListBox extends Mpeg4Box {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see AppleItemListBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param file A @see File object to read the contents of the box from.
     *     new instance, or undefined if no handler applies.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     * @returns A new instance of @see AppleItemListBox
     */
    public static fromFile(file: File, header: Mpeg4BoxHeader, handlerType: ByteVector): AppleItemListBox {
        Guards.notNullOrUndefined(file, "file");

        const instance = new AppleItemListBox();
        instance.initializeFromHeaderAndHandler(header, handlerType);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see AppleItemListBox with no children.
     * @returns A new instance of @see AppleItemListBox
     */
    public static fromEmpty(): AppleItemListBox {
        const instance = new AppleItemListBox();
        instance.initializeFromType(Mpeg4BoxType.ILST);

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.AppleItemListBox; }
}