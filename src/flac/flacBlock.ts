import {ByteVector} from "../byteVector";
import {File, FileAccessMode} from "../file";
import {ILazy} from "../interfaces";
import {Guards, NumberUtils} from "../utils";

/**
 * Specifies the contents of a FLAC block.
 */
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
 * Represents a FLAC metadata block
 */
export class FlacBlock implements ILazy {
    /**
     * Length of a FLAC block header in bytes.
     */
    public static readonly HEADER_SIZE = 4;

    private readonly _dataSize: number;
    private readonly _isLastBlock: boolean;
    private readonly _type: FlacBlockType;

    private _data: ByteVector|undefined;
    private _file: File|undefined;
    private _filePosition: number|undefined;

    //#region Constructors

    private constructor(type: FlacBlockType, dataSize: number, isLastBlock: boolean) {
        this._dataSize = dataSize;
        this._isLastBlock = isLastBlock;
        this._type = type;
    }

    /**
     * Constructs and initializes a new instance, lazily, by reading it from a file.
     * @param file File from which to read the current instance
     * @param position Offset into the file where the block begins
     */
    public static fromFile(file: File, position: number): FlacBlock {
        Guards.truthy(file, "file");
        Guards.safeUint(position, "position");
        if (position > file.length) {
            throw new Error("Argument out of range: position must be within size of file");
        }

        file.seek(position);

        const headerBytes = file.readBlock(4).toUint();
        const isLastBlock = !!NumberUtils.uintAnd(headerBytes, 0x80000000);
        const type = NumberUtils.uintAnd(headerBytes, 0x7f000000) >>> 24;
        const dataSize = NumberUtils.uintAnd(headerBytes, 0x00ffffff);

        const block = new FlacBlock(type, dataSize, isLastBlock);
        block._file = file;
        block._filePosition = position;

        return block;
    }

    /**
     * Constructs and initializes a new instance using the type of the block and the data
     * contained in the block.
     * @param type Type of the block to construct
     * @param data Data the block will contain
     */
    public static fromData(type: FlacBlockType, data: ByteVector): FlacBlock {
        Guards.truthy(data, "data");
        if (data.length > Math.pow(2, 24) - 1) {
            throw new Error("Argument out of range: FLAC block data cannot be larger than 2^24 bytes");
        }

        const block = new FlacBlock(type, data.length, false);
        block._data = data.toByteVector();

        return block;
    }

    //#endregion

    //#region Properties

    /** @internal **/
    // @TODO: It would be nice if this information was tracked in the flac file class, so we don't need to
    //    make it updatable here.
    public get bockStart(): number {
        if (this._filePosition === undefined) {
            throw new Error("FLAC block does not exist on disk yet.");
        }

        return this._filePosition;
    }
    /** @internal **/
    public set blockStart(value: number) { this._filePosition = value; }

    /**
     * Gets the data contained in the current instance.
     */
    public get data(): ByteVector {
        this.loadWithAssert(this._data);
        return this._data;
    }

    /**
     * Gets the size of the data contained in the current instance.
     */
    public get dataSize(): number { return this._dataSize; }

    /**
     * Gets whether the block represented by the current instance is the last metadata block
     * in the FLAC stream.
     * @returns
     *     `true` if the block represented by the current instance was the last one to appear
     *     in the file and is followed immediately by the audio data, or `false` if another block
     *     appears after the current one or the block was not read from disk.
     */
    // @TODO: UH... how are we tracking which block is the last?? Maybe we're just gambling that metadata will
    //     always at the top of the file?
    public get isLastBlock(): boolean {
        // DEV NOTE: We don't really care about the value after reading the file, and because we
        //    don't expose the raw blocks to the user, it's not useful to make it modifiable.
        //    If we ever *do* expose the raw blocks, this should become an internal set.
        return this._isLastBlock;
    }

    /** @inheritDoc */
    public get isLoaded(): boolean { return !!this._data; }

    /**
     * Gets the total size of the block as it appears on disk. This equals the size of the data
     * plus the size of the header.
     */
    public get totalSize(): number { return this.dataSize + FlacBlock.HEADER_SIZE; }

    /**
     * Gets the type of data contained in the current instance.
     */
    public get type(): FlacBlockType { return this._type; }

    //#endregion

    //#region Methods

    /** @inheritDoc */
    // @TODO: I think we could avoid a lot of the nullsy nonsense with lazy loading by implementing a Lazy type.
    public load(): void {
        if (this.isLoaded) {
            return;
        }

        if (!this._file || this._filePosition === undefined) {
            throw new Error("Cannot load FLAC block without file and position data");
        }

        // Read the data from the file
        const originalFileMode = this._file.mode;
        try {
            this._file.mode = FileAccessMode.Read;
            this._file.seek(this._filePosition + FlacBlock.HEADER_SIZE);
            this._data = this._file.readBlock(this._dataSize).toByteVector();
        } finally {
            this._file.mode = originalFileMode;
        }
    }

    /**
     * Renders the current instance as a raw FLAC metadata block.
     * @param isLastBlock Whether or not the block should be marked as the last metadata block.
     */
    public render(isLastBlock: boolean): ByteVector {
        this.loadWithAssert(this._data);

        // One last sanity check before we render
        if (this._data.length > Math.pow(2, 24) - 1) {
            throw new Error("Invalid operation: FLAC block data cannot be larger than 2^24 bytes");
        }

        const header = NumberUtils.uintOr(
            this._dataSize,
            NumberUtils.uintLShift(NumberUtils.uintOr(this._type, isLastBlock ? 0x80 : 0), 24)
        );

        return ByteVector.concatenate(
            ByteVector.fromUint(header),
            this._data
        );
    }

    /**
     * Calls the load method and asserts the passed in field is not `undefined`.
     * @param field Field to validate is not undefined.
     * @private
     */
    private loadWithAssert<T>(field: T|undefined): asserts field is T {
        this.load();
        if (field === undefined) {
            throw new Error("Lazy loading of Matroska attachment failed");
        }
    }

    //#endregion
}
