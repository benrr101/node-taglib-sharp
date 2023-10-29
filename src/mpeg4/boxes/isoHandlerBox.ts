import FullBox from "./fullBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import Mpeg4BoxType from "../mpeg4BoxType";
import {ByteVector, StringType} from "../../byteVector";
import {File} from "../../file";
import {Guards} from "../../utils";

/**
 * This class extends {@link FullBox} to provide an implementation of a ISO/IEC 14496-12 FullBox.
 */
export default class IsoHandlerBox extends FullBox {
    private _dataHandlerType: ByteVector;
    private _name: string;

    // #region Constructors

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of {@link IsoHandlerBox} with a provided header and h
     * handler by reading the contents from a specified file.
     * @param header A {@link Mpeg4BoxHeader} object containing the header to use for the new instance.
     * @param file A {@link File} object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     */
    public static fromFile(header: Mpeg4BoxHeader, file: File, handlerType: ByteVector): IsoHandlerBox {
                const instance = new IsoHandlerBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);

        file.seek(instance.dataPosition + 4);
        const boxData = file.readBlock(instance.dataSize - 4);
        instance._dataHandlerType = boxData.subarray(0, 4);

        let end = boxData.offsetFind(ByteVector.fromByte(0), 16);
        if (end < 16) {
            end = boxData.length;
        }

        instance._name = end > 16
            ? boxData.subarray(16, end - 16).toString(StringType.UTF8)
            : "";

        return instance;
    }

    /**
     * Constructs and initializes a new instance of {@link IsoHandlerBox} with a specified type and name.
     * @param handlerType A {@link ByteVector} object specifying a 4 byte handler type.
     * @param name An object specifying the handler name.
     */
    public static fromHandlerTypeAndHandlerName(handlerType: ByteVector, name: string): IsoHandlerBox {
        Guards.truthy(handlerType, "handlerType");
        if (handlerType.length < 4) {
            throw new Error("The handler type must be four bytes long.");
        }

        const instance = new IsoHandlerBox();
        instance.initializeFromTypeVersionAndFlags(Mpeg4BoxType.HDLR, 0, 0);
        instance._dataHandlerType = handlerType.subarray(0, 4);
        instance._name = name;

        return instance;
    }

    // #endregion

    /**
     * Gets the data contained in the current instance.
     */
    public get data(): ByteVector {
        return ByteVector.concatenate(
            ByteVector.fromSize(4),
            this.dataHandlerType,
            ByteVector.fromSize(12),
            ByteVector.fromString(this.name, StringType.UTF8),
            ByteVector.fromSize(2)
        );
    }

    /**
     * Gets the handler type as described in the data of the current instance.
     */
    public get dataHandlerType(): ByteVector { return this._dataHandlerType; }

    /**
     * Gets the name of the current instance.
     */
    public get name(): string { return this._name; }
}