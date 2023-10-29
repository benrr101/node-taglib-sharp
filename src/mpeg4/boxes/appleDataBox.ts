import FullBox from "./fullBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import Mpeg4BoxType from "../mpeg4BoxType";
import {ByteVector, StringType} from "../../byteVector";
import {File} from "../../file";
import {Guards, NumberUtils} from "../../utils";

/**
 * Specifies the type of data contained in a box.
 */
export enum AppleDataBoxFlagType {
    /**
     * The box contains binary data.
     */
    ContainsData = 0x00,

    /**
     * The box contains UTF-8 text.
     */
    ContainsText = 0x01,

    /**
     * The box contains a raw JPEG image.
     */
    ContainsJpegData = 0x0d,

    /**
     * The box contains a raw PNG image.
     */
    ContainsPngData = 0x0e,

    /**
     * The box contains data for a tempo box.
     */
    ForTempo = 0x15,

    /**
     * The box contains a raw BMP image.
     */
    ContainsBmpData = 0x1b,
}

/**
 * This class extends {@link FullBox} to provide an implementation of an Apple DataBox.
 */
export class AppleDataBox extends FullBox {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of {@link AppleDataBox} with a provided header and handler
     * by reading the contents from a specified file.
     * @param header A {@link Mpeg4BoxHeader}  object containing the header to use for the new instance.
     * @param file A {@link File} object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     */
    public static fromFile(header: Mpeg4BoxHeader, file: File, handlerType: ByteVector): AppleDataBox {
        const instance = new AppleDataBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);
        instance.increaseDataPosition(4);
        instance.data = instance.loadData(file);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of {@link AppleDataBox} with specified data and flags.
     * @param data A {@link ByteVector} object containing the data to store in the new instance.
     * @param flags A value containing flags to use for the new instance.
     */
    public static fromDataAndFlags(data: ByteVector, flags: number): AppleDataBox {
        Guards.truthy(data, "data");

        const instance = new AppleDataBox();
        instance.initializeFromTypeVersionAndFlags(Mpeg4BoxType.DATA, 0, flags);
        instance.increaseDataPosition(4);
        instance.data = data;

        return instance;
    }

    /**
     * Gets the text contained in the current instance.
     */
    public get text(): string {
        return NumberUtils.hasFlag(this.flags, AppleDataBoxFlagType.ContainsText)
            ? this.data.toString(StringType.UTF8)
            : undefined;
    }
    /**
     * Sets the text contained in the current instance.
     */
    public set text(v: string) {
        Guards.notNullOrUndefined(v, "v");
        this.flags = AppleDataBoxFlagType.ContainsText;
        this.data = ByteVector.fromString(v, StringType.UTF8);
    }

    /**
     * Renders the headers for the box.
     * @returns ByteVector Rendered headers of the current instance
     */
    public renderBoxHeaders(): ByteVector[] {
        return [
            ...super.renderBoxHeaders(),
            ByteVector.fromSize(4)
        ];
    }
}