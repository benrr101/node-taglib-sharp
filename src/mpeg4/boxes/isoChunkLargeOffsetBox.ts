import FullBox from "./fullBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {Guards} from "../../utils";

/**
 *  This class extends @see FullBox to provide an implementation of a ISO/IEC 14496-12 ChunkLargeOffsetBox.
 *  @TODO: Is this pretty much the same as the non-large offset box?
 */
export default class IsoChunkLargeOffsetBox extends FullBox {
    private _offsetTable: number[];

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoChunkLargeOffsetBox with a provided header
     * and handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     * @returns
     */
    public static fromHeaderFileAndHandler(
        header: Mpeg4BoxHeader,
        file: File,
        handlerType: ByteVector
    ): IsoChunkLargeOffsetBox {
        const instance: IsoChunkLargeOffsetBox = new IsoChunkLargeOffsetBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);

        const boxData = file.readBlock(instance.dataSize);
        instance._offsetTable = new Array(boxData.subarray(0, 4).toUint());

        for (let i = 0; i < instance._offsetTable.length; i++) {
            instance._offsetTable[i] = Number(boxData.subarray(4 + i * 8, 8).toUlong());
        }

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.IsoChunkLargeOffsetBox; }

    /**
     * Gets and sets the data contained in the current instance.
     */
    public get data(): ByteVector {
        const output: ByteVector = ByteVector.fromUint(this._offsetTable.length);
        for (let i = 0; i < this._offsetTable.length; i++) {
            output.addByteVector(ByteVector.fromUlong(this._offsetTable[i]));
        }

        return output;
    }

    /**
     * Updates the existing box position offsets.
     * @param sizeDifference A value containing the size change that occurred in the file.
     * @param after A value containing the position in the file after which offsets will be invalidated. If an
     *     offset is before this point, it won't be updated.
     * @internal
     */
    public updatePosition(sizeDifference: number, after: number): void {
        Guards.safeUint(sizeDifference, "sizeDifference");
        Guards.safeUint(after, "after");

        for (let i = 0; i < this._offsetTable.length; i++) {
            if (this._offsetTable[i] >= after) {
                this._offsetTable[i] = this._offsetTable[i] + sizeDifference;
            }
        }
    }
}