/**
 * Specifies the contents of a FLAC block in {@link FlacBlockHeader}.
 */
import {ByteVector} from "../byteVector";
import {Guards, NumberUtils} from "../utils";
import {CorruptFileError} from "../errors";

export enum FlacBlockType {
    /**
     * Block contains stream information.
     */
    StreamInfo = 0,

    /**
     * Block contains padding.
     */
    Padding,

    /**
     * Block contains application data.
     */
    Application,

    /**
     * Block contains a seek table.
     */
    SeekTable,

    /**
     * Block contains a Xiph comment.
     */
    XiphComment,

    /**
     * Block contains a cue sheet.
     */
    CueSheet,

    /**
     * Block contains a picture.
     */
    Picture
}

/**
 * Provides a representation of a FLAC metadata block header.
 */
export class FlacBlockHeader {
    /**
     * Size of a block header in bytes.
     */
    public static readonly size = 4;

    private readonly _blockSize: number;
    private readonly _blockType: FlacBlockType;
    private readonly _isLastBlock: boolean;

    // #region Constructors

    private constructor(type: FlacBlockType, isLastBlock: boolean, blockSize: number) {
        this._blockSize = blockSize;
        this._blockType = type;
        this._isLastBlock = isLastBlock;
    }

    /**
     * Constructs and initializes a new instance by reading a raw header from a {@link ByteVector}
     * object.
     * @param data Object containing the raw block header. Cannot be null
     */
    public static fromData(data: ByteVector): FlacBlockHeader {
        Guards.truthy(data, "data");
        if (data.length < FlacBlockHeader.size) {
            throw new CorruptFileError("Not enough data in FLAC block header");
        }

        return new FlacBlockHeader(
            NumberUtils.uintAnd(data.get(0), 0x7F),
            NumberUtils.uintAnd(data.get(0), 0x80) !== 0,
            data.mid(1, 3).toUInt()
        );
    }

    /**
     * Constructs and initializes a new instance using the provided block type and block size.
     * @param type Type of the block this header describes
     * @param blockSize Size of the block in bytes. Must be a positive 24-bit integer.
     */
    public static fromTypeAndSize(type: FlacBlockType, blockSize: number): FlacBlockHeader {
        Guards.uint(blockSize, "blockSize");
        if (blockSize > 0xFFFFFF) {
            throw new Error("Argument error: blockSize must be a 24-bit unsigned integer");
        }

        return new FlacBlockHeader(type, false, blockSize);
    }

    // #endregion

    // #region Properties

    /**
     * Gets the size of the block in bytes.
     */
    public get blockSize(): number { return this._blockSize; }

    /**
     * Gets the type of the block this header represents.
     */
    public get blockType(): FlacBlockType { return this._blockType; }

    /**
     * Gets whether or not this is the last block in the file.
     * @remarks This value is only meaningful if the object was constructed during file read.
     */
    public get isLastBlock(): boolean { return this._isLastBlock; }

    // #endregion

    /**
     * Renders the current instance as a raw FLAC block header.
     * @param isLastBlock Whether or not the header should represent the last block in the
     */
    public render(isLastBlock: boolean): ByteVector {
        const data = ByteVector.fromUInt(this._blockSize);
        data.set(0, NumberUtils.uintOr(this._blockType, isLastBlock ? 0x80 : 0));
        return data;
    }
}
