import FullBox from "./fullBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector, StringType} from "../../byteVector";
import {File} from "../../file";
import {Guards, StringUtils} from "../../utils";

/**
 *  This class extends {@link FullBox} to provide an implementation of an Apple AdditionalInfoBox.
 */
export default class AppleAdditionalInfoBox extends FullBox {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of {@link AppleAdditionalInfoBox} with a provided header
     * and handler by reading the contents from a specified file.
     * @param header A {@link Mpeg4BoxHeader} object containing the header to use for the new instance.
     * @param file A {@link File} object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     */
    public static fromFile(header: Mpeg4BoxHeader, file: File, handlerType: ByteVector): AppleAdditionalInfoBox {
        const instance = new AppleAdditionalInfoBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);
        instance.data = file.readBlock(instance.dataSize > 0 ? instance.dataSize : 0);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of {@link FullBox} with a provided header, version, and flags.
     * @param type A {@link Mpeg4BoxHeader} object containing the header to use for the new instance.
     * @param version A value containing the version of the new instance.
     * @param flags A value containing the flags for the new instance.
     */
    public static fromTypeVersionAndFlags(type: ByteVector, version: number, flags: number): AppleAdditionalInfoBox {
        const instance = new AppleAdditionalInfoBox();
        instance.initializeFromTypeVersionAndFlags(type, version, flags);

        return instance;
    }

    /**
     * Gets the text contained in the current instance.
     */
    public get text(): string { return StringUtils.trimStart(this.data.toString(StringType.Latin1), "\0"); }
    /**
     * Sets the text contained in the current instance.
     */
    public set text(v: string) {
        Guards.notNullOrUndefined(v, "v");
        this.data = ByteVector.fromString(v, StringType.Latin1);
    }
}