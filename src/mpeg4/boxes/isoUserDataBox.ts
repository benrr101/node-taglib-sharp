import Mpeg4Box from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import Mpeg4BoxType from "../mpeg4BoxType";
import {ByteVector} from "../../byteVector";

/**
 * This class extends {@link Mpeg4Box} to provide an implementation of a ISO/IEC 14496-12 UserDataBox.
 */
export default class IsoUserDataBox extends Mpeg4Box {
    private _parentTree: Mpeg4BoxHeader[];

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of {@link IsoUserDataBox} with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A {@link Mpeg4BoxHeader} object containing the header to use for the new instance.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     */
    public static fromHeader(header: Mpeg4BoxHeader, handlerType: ByteVector): IsoUserDataBox {
        const instance = new IsoUserDataBox();
        instance.initializeFromHeader(header, handlerType);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see IsoUserDataBox with no children.
     */
    public static fromEmpty(): IsoUserDataBox {
        const instance = new IsoUserDataBox();
        instance.initializeFromType(Mpeg4BoxType.UDTA);

        return instance;
    }

    /**
     * Gets the box headers for the current "udta" box and all parent boxes up to the top of the file.
     * @remarks Changes to the returned object will not be honored. Set the property to change it.
     */
    public get parentTree(): Mpeg4BoxHeader[] { return this._parentTree.slice(); }
    /**
     * Sets the box headers for the current "udta" box and all parent boxes up to the top of the file.
     * @internal
     */
    public set parentTree(v: Mpeg4BoxHeader[]) { this._parentTree = v; }
}