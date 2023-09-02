import FullBox from "./fullBox";
import IsoHandlerBox from "./isoHandlerBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {AppleDataBoxFlagType} from "../appleDataBoxFlagType";
import {ByteVector, StringType} from "../../byteVector";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {Guards, NumberUtils} from "../../utils";

/**
 * This class extends @see FullBox to provide an implementation of an Apple DataBox.
 */
export default class AppleDataBox extends FullBox {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see AppleDataBox with a provided header and handler
     * by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader  object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see AppleDataBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): AppleDataBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: AppleDataBox = new AppleDataBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);
        instance.increaseDataPosition(4);
        instance.data = instance.loadData(file);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see AppleDataBox with specified data and flags.
     * @param data A @see ByteVector object containing the data to store in the new instance.
     * @param flags A value containing flags to use for the new instance.
     * @returns
     */
    public static fromDataAndFlags(data: ByteVector, flags: number): AppleDataBox {
        const instance: AppleDataBox = new AppleDataBox();
        instance.initializeFromTypeVersionAndFlags(ByteVector.fromString("data", StringType.UTF8), 0, flags);
        instance.increaseDataPosition(4);
        instance.data = data;

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.AppleDataBox; }

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
        this.flags = <number>AppleDataBoxFlagType.ContainsText;
        this.data = ByteVector.fromString(v, StringType.UTF8);
    }

    /**
     * Renders the current instance, including its children, to a new @see ByteVector object, preceding the
     * contents with a specified block of data.
     * @param topData A @see ByteVector object containing box specific header data to precede the content.
     * @returns
     */
    protected renderUsingTopData(topData: ByteVector): ByteVector {
        const output: ByteVector = ByteVector.concatenate(ByteVector.fromSize(4), topData);

        return super.renderUsingTopData(output);
    }
}