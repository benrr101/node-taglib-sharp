import FullBox from "./fullBox";
import IsoHandlerBox from "./isoHandlerBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector, StringType} from "../../byteVector";
import {File} from "../../file";
import {ChildFactory} from "./mpeg4Box";
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
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     * @param childFactory Factory for creating child boxes
     * @returns A new instance of @see IsoMetaBox
     */
    public static fromHeaderFileAndHandler(
        header: Mpeg4BoxHeader,
        file: File,
        handlerType : ByteVector,
        childFactory: ChildFactory
    ): IsoMetaBox {
        const instance: IsoMetaBox = new IsoMetaBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);
        instance.children = instance.loadChildren(file, childFactory);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see IsoMetaBox with a specified handler.
     * @param handlerType A @see ByteVector object specifying a 4 byte handler type.
     * @param handlerName A @see string object specifying the handler name.
     * @returns A new instance of @see IsoMetaBox
     */
    public static fromHandlerTypeAndHandlerName(handlerType: ByteVector, handlerName: string): IsoMetaBox {
        Guards.notNullOrUndefined(handlerType, "handlerType");

        if (handlerType.length < 4) {
            throw new Error("The handler type must be four bytes long.");
        }

        const instance: IsoMetaBox = new IsoMetaBox();
        instance.initializeFromTypeVersionAndFlags(ByteVector.fromString("meta", StringType.UTF8), 0, 0);
        instance.children = [];
        instance.addChild(IsoHandlerBox.fromHandlerTypeAndHandlerName(handlerType, handlerName));

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.IsoMetaBox; }
}