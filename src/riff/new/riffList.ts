import ILazy from "../../iLazy";
import IRiffChunk from "./iRiffChunk";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";
import {Guards} from "../../utils";

export default class RiffList implements IRiffChunk, ILazy {
    public static readonly identifierFourcc = "LIST";

    private _chunkStart: number;
    private _fileDataSize: number;
    private _values: Map<string, ByteVector[]> = new Map<string, ByteVector[]>();
    private _file: File;
    private _isLoaded: boolean;
    private _lists: Map<string, RiffList[]> = new Map<string, RiffList[]>();
    private _type: string;

    private constructor() {}

    public static fromEmpty(): RiffList {
        const list = new RiffList();
        list._isLoaded = true;
        return list;
    }

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
        list._chunkStart = position;
        list._fileDataSize = file.readBlock(4).toUInt(false);
        list._file = file;
        list._isLoaded = false;
        list._type = file.readBlock(4).toString();

        return list;
    }

    // #region Properties

    public get chunkStart(): number|undefined { return this._chunkStart; }

    public get fourcc(): string { return RiffList.identifierFourcc; }

    public get isLoaded(): boolean { return this._isLoaded; }

    public get listCount(): number {
        this.load();
        return this._lists.size;
    }

    public get originalTotalSize(): number|undefined {
        return this._fileDataSize !== undefined && this._fileDataSize !== null
            ? this._fileDataSize + 8 + (this._fileDataSize % 2 === 1 ? 1 : 0)
            : undefined;
    }

    public get type(): string { return this._type; }

    public get valueCount(): number {
        this.load();
        return this._values.size;
    }

    // #endregion

    // #region Methods

    public clear(): void {
        this._values.clear();
        this._lists.clear();
        this._isLoaded = true;
    }

    public getLists(id: string): RiffList[] {
        return this._lists.get(id);
    }

    public getValues(id: string): ByteVector[] {
        return this._values.get(id);
    }

    public load(): void {
        if (this.isLoaded) {
            return;
        }

        // Read the raw list from file
        let fileOffset = this._chunkStart + 12;
        this._file.seek(fileOffset);
        while (fileOffset + 8 <= this._chunkStart + this._fileDataSize) {
            // Read the value
            const headerBlock = this._file.readBlock(8);
            const id = headerBlock.toString(4);
            const length = headerBlock.mid(4, 4).toUInt(false);

            if (id === RiffList.identifierFourcc) {
                // The element is a list, create a nested riff list from it
                if (this._lists.get(id) === undefined) {
                    this._lists.set(id, []);
                }
                const nestedList = RiffList.fromFile(this._file, fileOffset);
                this._lists.get(id).push(nestedList);
            } else {
                // The element is just a key-value pair, store it
                if (this._values.get(id) === undefined) {
                    this._values.set(id, []);
                }
                const valueBlock = this._file.readBlock(length);
                this._values.get(id).push(valueBlock);
            }

            // Increment offset, including padding if necessary
            fileOffset += 8 + length + (length % 2 === 1 ? 1 : 0);
        }
    }

    public setLists(id: string, lists: RiffList[]): void {
        if (!lists || lists.length === 0) {
            this._lists.delete(id);
        } else {
            this._lists.set(id, lists);
        }
    }

    public setValues(id: string, values: ByteVector[]): void {
        if (!values || values.length === 0) {
            this._values.delete(id);
        } else {
            this._values.set(id, values);
        }
    }

    public render(): ByteVector {
        this.load();

        // Render all the values
        const valueData = Array.from(this._values.entries(), ([key, value]) => {
            const valuesBytes = value.map((v) => {
                const valueBytes = ByteVector.concatenate(
                    ByteVector.fromString(key),
                    ByteVector.fromUInt(v.length),
                    v
                );
                if (v.length % 2 === 1) {
                    valueBytes.addByte(0x00);
                }

                return valueBytes;
            });

            return ByteVector.concatenate(... valuesBytes);
        });

        // Render all the nested lists
        const listData = Array.from(this._lists.values(), (lists) => {
            const listsBytes = lists.map((l) => l.render());
            return ByteVector.concatenate(... listsBytes);
        });

        const allData = ByteVector.concatenate(
            ... valueData,
            ... listData
        );

        const data = ByteVector.concatenate(
            ByteVector.fromString(RiffList.identifierFourcc),
            ByteVector.fromUInt(allData.length),
            ByteVector.fromString(this._type),
            allData
        );
        if (allData.length + 4 % 2 === 1) {
            data.addByte(0x00);
        }

        return data;
    }

    // #endregion
}
