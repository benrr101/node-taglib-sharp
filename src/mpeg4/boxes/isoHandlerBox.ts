import FullBox from "./fullBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector, StringType} from "../../byteVector";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {Guards} from "../../utils";

/**
 * This class extends @see FullBox to provide an implementation of a ISO/IEC 14496-12 FullBox.
 */
export default class IsoHandlerBox extends FullBox {
    /**
     * Contains the handler type of the current instance.
     */
    public handlerType: ByteVector;

    /**
     * Contains the name of the current instance.
     */
    public name: string;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoHandlerBox with a provided header and h
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see IsoHandlerBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): IsoHandlerBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoHandlerBox = new IsoHandlerBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);
        file.seek(instance.dataPosition + 4);
        const boxData: ByteVector = file.readBlock(instance.dataSize - 4);
        instance.handlerType = boxData.subarray(0, 4);

        let end: number = boxData.offsetFind(ByteVector.fromByte(0), 16);

        if (end < 16) {
            end = boxData.length;
        }

        instance.name = end > 16 ? boxData.subarray(16, end - 16).toString(StringType.UTF8) : "";

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see IsoHandlerBox with a specified type and name.
     * @param handlerType A @see ByteVector object specifying a 4 byte handler type.
     * @param name An object specifying the handler name.
     * @returns A new instance of @see IsoHandlerBox
     */
    public static fromHandlerTypeAndHandlerName(handlerType: ByteVector, name: string): IsoHandlerBox {
        Guards.notNullOrUndefined(handlerType, "handlerType");

        if (handlerType.length < 4) {
            throw new Error("The handler type must be four bytes long.");
        }

        const instance: IsoHandlerBox = new IsoHandlerBox();
        instance.initializeFromTypeVersionAndFlags(ByteVector.fromString("hdlr", StringType.UTF8), 0, 0);
        instance.handlerType = handlerType.subarray(0, 4);
        instance.name = name;

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.IsoHandlerBox; }

    /**
     * Gets the data contained in the current instance.
     */
    public get data(): ByteVector {
        return ByteVector.concatenate(
            ByteVector.fromSize(4),
            this.handlerType,
            ByteVector.fromSize(12),
            ByteVector.fromString(this.name, StringType.UTF8),
            ByteVector.fromSize(2)
        );
    }
}