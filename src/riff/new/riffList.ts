import IRiffChunk from "./iRiffChunk";
import {File} from "../../file";
import {Guards} from "../../utils";
import {ByteVector} from "../../byteVector";

export default class RiffList implements IRiffChunk {
    public static readonly identifierFourcc = "LIST";

    private _chunkStart: number;
    private _fileDataSize: number;
    private _dict: Map<string, ByteVector[]> = new Map<string, ByteVector[]>();
    private _file: File;
    private _type: string;

    private constructor() {}

    public static fromFile(file: File, position: number): RiffList {
        Guards.truthy(file, "file");
        Guards.safeUint(position, "position");
        if (position > file.length) {
            throw new Error("Argument out of range: position must be within size of file");
        }

        file.seek(position);
        if (file.readBlock(4).toString() !== RiffList.identifierFourcc) {
            throw new Error("Cannot read RIFF list from non-list chunk");
        }

        const list = new RiffList();
        list._fileDataSize = file.readBlock(4).toUInt(false);
        list._type = file.readBlock(4).toString();
        list._file = file;
        list._chunkStart = position;

        return list;
    }

    public static fromDictionary(type: string, dictionary: Map<string, ByteVector[]>) {
        Guards.truthy(type, "type");
        if (type.length !== 4) {
            throw new Error("Argument error: type must be 4 characters");
        }
        Guards.truthy(dictionary, "dictionary");

        const list = new RiffList();
        list._dict = dictionary;
        list._type = type;

        return list;
    }

    // #region Properties

    public get chunkStart(): number|undefined { return this._chunkStart; }

    public get dictionary(): Map<string, ByteVector[]> {
        // Load data if we don't already have it
        if (!this._dict) {
            this.readFromFile();
        }

        return this._dict;
    }

    public get fourcc(): string { return RiffList.identifierFourcc; }

    public get originalTotalSize(): number|undefined {
        return this._fileDataSize !== undefined && this._fileDataSize !== null
            ? this._fileDataSize + 8 + (this._fileDataSize % 2 === 1 ? 1 : 0)
            : undefined;
    }

    public get type(): string { return this._type; }

    // #endregion

    // #region Methods

    public render(): ByteVector {

    }

    private readFromFile(): void {
        // Read the raw list from file
        this._file.seek(this._chunkStart + 12);
        const data = this._file.readBlock(this._fileDataSize - 4);

        let offset = 0;
        while (offset + 8 <= data.length) {
            // Read the value
            const id = data.mid(offset, 4).toString(4);
            const length = data.mid(offset + 4, 4).toUInt(false);

            // Store the value
            if (this._dict.get(id) === undefined) {
                this._dict.set(id, []);
            }
            this._dict.get(id).push(data.mid(offset + 8, length));

            // Increment offset, including padding if necessary
            offset += 8 + length + (length % 2 === 1 ? 1 : 0);
        }
    }

    // #endregion
}
