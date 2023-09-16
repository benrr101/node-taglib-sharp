import FullBox from "./fullBox";
import IsoHandlerBox from "./isoHandlerBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import Mpeg4BoxType from "../mpeg4BoxType";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {Guards} from "../../utils";

/**
 * This class extends @see FullBox to provide an implementation of a ISO/IEC 14496-12 MetaBox.
 */
export default class IsoMetaBox extends FullBox {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoMetaBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param file A @see File object to read the contents of the box from.
     *     new instance, or undefined if no handler applies.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     * @returns A new instance of @see IsoMetaBox
     */
    public static fromFile(file: File, header: Mpeg4BoxHeader, handlerType: ByteVector): IsoMetaBox {
        const instance = new IsoMetaBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see IsoMetaBox with a specified handler.
     * @param handlerType A @see ByteVector object specifying a 4 byte handler type.
     * @param handlerName A @see string object specifying the handler name.
     * @returns A new instance of @see IsoMetaBox
     */
    public static fromHandler(handlerType: ByteVector, handlerName?: string): IsoMetaBox {
        Guards.notNullOrUndefined(handlerType, "handlerType");

        if (handlerType.length < 4) {
            throw new Error("The handler type must be four bytes long.");
        }

        const instance = new IsoMetaBox();
        instance.initializeFromTypeVersionAndFlags(Mpeg4BoxType.META, 0, 0);
        instance.addChild(IsoHandlerBox.fromHandlerTypeAndHandlerName(handlerType, handlerName));

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.IsoMetaBox; }
}