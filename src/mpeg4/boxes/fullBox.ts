import Mpeg4Box from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";
import {Guards, NumberUtils} from "../../utils";

/**
 * This class extends @see Mpeg4Box to provide an implementation of a ISO/IEC 14496-12 FullBox.
 */
export default abstract class FullBox extends Mpeg4Box {
    /**
     * Gets and sets the version number of the current instance.
     */
    public version: number;

    /**
     * Gets and sets the flags that apply to the current instance.
     */
    public flags: number;

    /**
     * Protected constructor to force construction via static functions.
     */
    protected constructor() {
        super();
    }

    /**
     * Initializes a new instance of @see FullBox with a provided header and handler
     * by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     */
    protected initializeFromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handlerType: ByteVector): void {
        Guards.notNullOrUndefined(file, "file");

        this.initializeFromHeaderAndHandler(header, handlerType);
        const dataPositionBeforeIncrease: number = this.increaseDataPosition(4);

        file.seek(dataPositionBeforeIncrease);
        const headerData: ByteVector = file.readBlock(4);

        this.version = headerData.get(0);
        this.flags = headerData.subarray(1, 3).toUint();
    }

    /**
     * Initializes a new instance of @see FullBox with a provided header, version, and flags.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param version A value containing the version of the new instance.
     * @param flags Flags for the box
     */
    protected initializeFromHeaderVersionAndFlags(header: Mpeg4BoxHeader, version: number, flags: number): void {
        this.initializeFromHeader(header);
        this.increaseDataPosition(4);

        this.version = version;
        this.flags = flags;
    }

    /**
     * Initializes a new instance of @see FullBox with a provided header, version, and flags.
     * @param type A @see ByteVector object containing the four byte box type.
     * @param version A value containing the version of the new instance.
     * @param flags A value containing the flags for the new instance.
     * @returns A new instance of @see FullBox.
     */
    protected initializeFromTypeVersionAndFlags(type: ByteVector, version: number, flags: number): void {
        return this.initializeFromHeaderVersionAndFlags(Mpeg4BoxHeader.fromType(type), version, flags);
    }

    public renderBoxHeaders(): ByteVector[] {
        // Generate |<ver>|<    |flags|    >|
        const flagsWithVersion = NumberUtils.uintOr(
            this.flags,
            NumberUtils.uintLShift(this.version, 24)
        );
        return [ByteVector.fromUint(flagsWithVersion)];
    }
}