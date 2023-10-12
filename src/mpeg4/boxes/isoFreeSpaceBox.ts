import Mpeg4Box from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import Mpeg4BoxType from "../mpeg4BoxType";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";

/**
 *  This class extends @see Mpeg4Box to provide an implementation of a ISO/IEC 14496-12 FreeSpaceBox.
 */
export default class IsoFreeSpaceBox extends Mpeg4Box {
    private _padding: number;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoFreeSpaceBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file  A @see File object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     * @returns A new instance of @see IsoFreeSpaceBox
     */
    public static fromHeaderFileAndHandler(
        header: Mpeg4BoxHeader,
        file: File,
        handlerType: ByteVector
    ): IsoFreeSpaceBox {
        const instance = new IsoFreeSpaceBox();
        instance.initializeFromHeaderAndHandler(header, handlerType);
        instance._padding = instance.dataSize;

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see IsoFreeSpaceBox to occupy a specified number of bytes.
     * @param padding  A value specifying the number of bytes the new instance should occupy when rendered.
     * @returns A new instance of @see IsoFreeSpaceBox
     */
    public static fromPadding(padding: number): IsoFreeSpaceBox {
        const instance = new IsoFreeSpaceBox();
        instance.initializeFromType(Mpeg4BoxType.FREE);
        instance.paddingSize = padding;

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.IsoFreeSpaceBox; }

    /**
     * Gets the data contained in the current instance.
     */
    public get data(): ByteVector { return ByteVector.fromSize(this._padding); }
    /**
     * Sets the data contained in the current instance.
     */
    public set data(v: ByteVector) { this._padding = v ? v.length : 0; }

    /**
     * Gets the size the current instance will occupy when rendered.
     * @returns A value containing the size the current instance will occupy when rendered.
     */
    public get paddingSize(): number { return this._padding + 8; }
    /**
     * Sets the size the current instance will occupy when rendered.
     */
    public set paddingSize(v: number) { this._padding = v - 8; }
}