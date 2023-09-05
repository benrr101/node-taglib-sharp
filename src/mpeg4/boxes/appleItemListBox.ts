import Mpeg4Box, {ChildFactory} from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector, StringType} from "../../byteVector";
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
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     * @param childFactory Factory for creating child boxes
     * @returns A new instance of @see AppleItemListBox
     */
    public static fromHeaderFileAndHandler(
        header: Mpeg4BoxHeader,
        file: File,
        handlerType: ByteVector,
        childFactory: ChildFactory
    ): AppleItemListBox {
        Guards.notNullOrUndefined(file, "file");

        const instance = new AppleItemListBox();
        instance.initializeFromHeaderAndHandler(header, handlerType);
        instance.children = instance.loadChildren(file, childFactory);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see AppleItemListBox with no children.
     * @returns A new instance of @see AppleItemListBox
     */
    public static fromEmpty(): AppleItemListBox {
        const instance = new AppleItemListBox();
        instance.initializeFromType(ByteVector.fromString("ilst", StringType.UTF8));
        instance.children = [];

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.AppleItemListBox; }
}