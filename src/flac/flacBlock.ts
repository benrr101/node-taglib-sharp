import {FlacBlockHeader, FlacBlockType} from "./flacBlockHeader";
import {ByteVector} from "../byteVector";
import {Guards} from "../utils";
import {CorruptFileError} from "../errors";

/**
 * Represents a FLAC metadata block
 */
export default class FlacBlock {
    private readonly _header: FlacBlockHeader;
    private readonly _data: ByteVector;

    // #region Constructors

    private constructor(header: FlacBlockHeader, data: ByteVector) {
        this._header = header;
        this._data = data;
    }

    /**
     * Constructs and initializes a new instance using a header and the data of the block.
     * @param header Header that defines this block
     * @param data Data contained in the block
     */
    public static fromHeaderAndData(header: FlacBlockHeader, data: ByteVector): FlacBlock {
        Guards.truthy(header, "header");
        Guards.truthy(data, "data");
        if (header.blockSize !== data.length) {
            throw new CorruptFileError("Data length did not equal length defined in block header");
        }

        return new FlacBlock(header, data);
    }

    /**
     * Constructs and initializes a new instance using the type of the block and the data
     * contained in the block.
     * @param type Type of the block to construct
     * @param data Data the block will contain
     */
    public static fromTypeAndData(type: FlacBlockType, data: ByteVector): FlacBlock {
        Guards.truthy(data, "data");
        return new FlacBlock(
            FlacBlockHeader.fromTypeAndSize(type, data.length),
            data
        );
    }

    // #endregion

    // #region Properties

    /**
     * Gets the data contained in the current instance.
     */
    public get data(): ByteVector { return this._data; }

    /**
     * Gets the size of the data contained in the current instance.
     */
    public get dataSize(): number { return this._header.blockSize; }

    /**
     * Gets ehether or not the block represented by the current instance is the last metadata block
     * in the FLAC stream.
     * @returns `true` if the block represented by the current instance was the last one to appear
     *     in the file and is followed immediately by the audio data, or `false` if another block
     *     appears after the current one or the block was not read from disk.
     */
    public get isLastBlock(): boolean { return this._header.isLastBlock; }

    /**
     * Gets the total size of the block as it appears on disk. This equals the size of the data
     * plus the size of the header.
     */
    public get totalSize(): number { return this.dataSize + FlacBlockHeader.size; }

    /**
     * Gets the type of data contained in the current instance.
     */
    public get type(): FlacBlockType { return this._header.blockType; }

    // #endregion

    /**
     * Renders the current instance as a raw FLAC metadata block.
     * @param isLastBlock Whether or not the block should be marked as the last metadata block.
     */
    public render(isLastBlock: boolean): ByteVector {
        if (!this._data) {
            throw new Error("Cannot render empty block");
        }

        return ByteVector.concatenate(
            this._header.render(isLastBlock),
            this._data
        );
    }
}
