import SyncData from "./syncData";
import {ByteVector} from "../byteVector";
import {Guards} from "../utils";

export default class ExtendedHeader {
    private _size: number;

    private constructor() {}

    /**
     * Constructs and initializes a new instance by reading the raw contents.
     * @param data Raw extended header structure
     * @param version ID3v2 version. Must be an unsigned 8-bit integer.
     */
    public static fromData(data: ByteVector, version: number): ExtendedHeader {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        const header = new ExtendedHeader();
        header.parse(data, version);
        return header;
    }

    /**
     * Constructs and initializes a new instance with no contents.
     */
    public static fromEmpty(): ExtendedHeader {
        return new ExtendedHeader();
    }

    /**
     * Gets the size of the data on disk in bytes.
     */
    public get size(): number { return this._size; }

    protected parse(data: ByteVector, version: number): void {
        this._size = (version === 3 ? 4 : 0)
            + SyncData.toUint(data.mid(0, 4));
    }
}
