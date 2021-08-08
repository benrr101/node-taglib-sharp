import {File} from "../../file";
import {Guards} from "../../utils";
import {ByteVector} from "../../byteVector";
import IRiffChunk from "./iRiffChunk";

/**
 * Represents a block of data in a RIFF file. Used primarily for reading and writing files.
 */
export default class RiffChunk implements IRiffChunk {
    private _chunkStart: number;
    private _fileDataSize: number;
    private _file: File;
    private _fourcc: string;
    private _data: ByteVector;

    private constructor() {}

    /**
     * Creates and initializes a new instance, lazily, from a position of a file.
     * @param file File from which to read the current instance
     * @param fourcc FOURCC code for the chunk
     * @param position Position in the file where the chunk begins
     */
    public static fromFile(file: File, fourcc: string, position: number): RiffChunk {
        Guards.truthy(file, "file");
        Guards.truthy(fourcc, "fourcc");
        if (fourcc.length !== 4) {
            throw new Error("Argument error: fourcc must be 4 characters");
        }
        Guards.safeUint(position, "position");
        if (position > file.length) {
            throw new Error("Argument out of range: position must be within size of file");
        }

        const chunk = new RiffChunk();
        file.seek(position + 4);
        chunk._fileDataSize = file.readBlock(4).toUInt();
        chunk._file = file;
        chunk._fourcc = fourcc;
        chunk._chunkStart = position;
        return chunk;
    }

    /**
     * Creates and initializes a new instance from the provided data.
     * @param fourcc FOURCC code for the chunk
     * @param data Data to contain in the chunk, not includeing FOURCC or size
     */
    public static fromData(fourcc: string, data: ByteVector) {
        Guards.truthy(fourcc, "fourcc");
        if (fourcc.length !== 4) {
            throw new Error("Argument error: fourcc must be 4 characters");
        }
        Guards.truthy(data, "data");

        const chunk = new RiffChunk();
        chunk._data = data;
        chunk._fourcc = fourcc;
        return chunk;
    }

    public get data(): ByteVector {
        // Load data if we don't already have it
        if (!this._data) {
          this._file.seek(this._chunkStart + 8);
          this._data = this._file.readBlock(this._fileDataSize);
        }

        return this._data;
    }

    public get chunkStart(): number { return this._chunkStart; }

    public get fourcc(): string { return this._fourcc; }

    public get originalTotalSize(): number|undefined {
        return this._fileDataSize !== undefined && this._fileDataSize !== null
            ? this._fileDataSize + 8 + (this._fileDataSize % 2 === 1 ? 1 : 0)
            : undefined;
    }

    public render(): ByteVector {
        return ByteVector.concatenate(

        );
    }
}
