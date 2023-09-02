import IsoHandlerBox from "./isoHandlerBox";
import Mpeg4Box, {ChildFactory} from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector, StringType} from "../../byteVector";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {Guards} from "../../utils";

/**
 * This class extends @see Mpeg4Box to provide an implementation of a ISO/IEC 14496-12 UserDataBox.
 */
export default class IsoUserDataBox extends Mpeg4Box {
    /**
     *  Gets the box headers for the current "udta" box and all parent boxes up to the top of the file.
     */
    public parentTree: Mpeg4BoxHeader[];

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoUserDataBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @seeIsoHandlerBox object containing the handler that applies to the new instance.
     * @param childFactory Factory for creating child boxes
     * @returns A new instance of @see IsoUserDataBox
     */
    public static fromHeaderFileAndHandler(
        header: Mpeg4BoxHeader,
        file: File,
        handler: IsoHandlerBox,
        childFactory: ChildFactory
    ): IsoUserDataBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoUserDataBox = new IsoUserDataBox();
        instance.initializeFromHeaderAndHandler(header, handler);
        instance.children = instance.loadChildren(file, childFactory);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see IsoUserDataBox with no children.
     * @returns A new instance of @see IsoUserDataBox
     */
    public static fromEmpty(): IsoUserDataBox {
        const instance: IsoUserDataBox = new IsoUserDataBox();
        instance.initializeFromType(ByteVector.fromString("udta", StringType.UTF8));
        instance.children = [];

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.IsoUserDataBox; }
}