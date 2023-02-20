import EbmlParser from "./ebmlParser";
import EbmlParserOptions from "./ebmlParserOptions";
import {ByteVector, StringType} from "../byteVector";
import {File, FileAccessMode} from "../file";
import {ILazy} from "../interfaces";
import {Guards} from "../utils";

/**
 * An element that allows accessing typed information from a parser at a later time than parsing.
 */
export default class EbmlElement implements ILazy {
    private readonly _dataOffset: number;
    private readonly _dataSize: number;
    private readonly _file: File;
    private readonly _id: number;
    private readonly _options: EbmlParserOptions;
    private _data: ByteVector;

    /**
     * Constructs and initializes a new instance using a file, an offset where the target data
     * resides, and the number of bytes of data at that position.
     * @param file File containing the data
     * @param dataOffset Offset into the file where the data begins, must be a safe, positive integer
     * @param id ID of the EBML element
     * @param dataSize Size of the data in bytes, must be a safe, positive integer
     * @param parserOptions Options from the parser that read the element
     * @internal
     */
    public constructor(file: File, dataOffset: number, id: number, dataSize: number, parserOptions: EbmlParserOptions) {
        Guards.truthy(file, "file");
        Guards.safeUint(dataOffset, "offset");
        Guards.safeUint(dataSize, "size")

        this._file = file;
        this._dataOffset = dataOffset;
        this._dataSize = dataSize;
        this._id = id;
        this._options = parserOptions;
    }

    /**
     * Gets the ID of the EBML element represented by the current instance.
     */
    public get id(): number { return this._id; }

    /**
     * Gets the size of the data section of the current instance.
     */
    public get length(): number { return this._dataSize}

    /** @inheritDoc */
    public get isLoaded(): boolean { return !!this._data; }

    /**
     * Reads a boolean from the current element's data section.
     * @returns boolean `true` if the data stored in the element is > 0, `false` if 0 is stored
     */
    public getBool(): boolean {
        this.load();
        return this._data.toUint() > 0;
    }

    /**
     * Reads raw binary bytes from the current element's data section.
     * @returns ByteVector Raw bytes contained in the element.
     */
    public getBytes(): ByteVector {
        this.load();
        return this._data;
    }

    /**
     * Reads a double-precision or single-precision number from the current element's data section.
     * @returns number Floating point value contained in the element.
     */
    public getDouble(): number {
        this.load();

        switch (this._data.length) {
            case 4:
                return this._data.toFloat();
            case 8:
                return this._data.toDouble();
            default:
                throw new Error("Cannot read double from EBML element that is not 4 or 8 bytes long.");
        }
    }

    /**
     * Creates a parser from the
     */
    public getParser(): EbmlParser {
        return new EbmlParser(this._file, this._dataOffset, this._dataOffset + this._dataSize, this._options);
    }

    /**
     * Reads a UTF8 string from the current element's data section.
     * @returns string String value contained in the element.
     */
    public getString(): string {
        this.load();

        // Look for null termination
        const nullIndex = this._data.indexOf(0x00);
        return nullIndex >= 0
            ? this._data.subarray(0, nullIndex).toString(StringType.UTF8)
            : this._data.toString(StringType.UTF8);
    }

    /**
     * Read an integer from the current element's data section.
     * @remarks The EBML spec supports up to 64-bit unsigned integers. Due to javascript's
     *     implementation of `number`s and wanting to avoid using `BigInt`s everywhere an integer
     *     is needed in this implementation, we will only support up to 52-bit unsigned integers.
     * @returns number A `safe` integer contained in the element.
     */
    public getSafeUint(): number {
        this.load();

        // Cast to a "safe" integer
        const bigInt = this._data.toUlong();
        if (bigInt > Number.MAX_SAFE_INTEGER) {
            throw Error(`EBML value ${bigInt} is larger than can be supported by this version of node-taglib-sharp`);
        }

        return Number(bigInt);
    }

    /**
     * Read an integer from the data section.
     * @remarks Use this method if there's a high likelihood that the data will be >52 bits.
     * @returns number A `safe` integer contained in the element.
     */
    public getUlong(): bigint {
        this.load();
        return this._data.toUlong();
    }

    /** @inheritDoc */
    public load(): void {
        if (this._data) {
            return;
        }

        // Read the data from the file
        const originalFileMode = this._file.mode;
        try {
            this._file.mode = FileAccessMode.Read;
            this._file.seek(this._dataOffset);
            this._data = this._file.readBlock(this._dataSize).toByteVector();
        } finally {
            this._file.mode = originalFileMode;
        }
    }
}
