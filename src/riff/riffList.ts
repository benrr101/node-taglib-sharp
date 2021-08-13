import ILazy from "../iLazy";
import IRiffChunk from "./iRiffChunk";
import {ByteVector} from "../byteVector";
import {File} from "../file";
import {Guards} from "../utils";

export default class RiffList implements IRiffChunk, ILazy {
    /**
     * FOURCC code for a list chunk
     */
    public static readonly identifierFourcc = "LIST";

    private _chunkStart: number;
    private _file: File;
    private _isLoaded: boolean;
    private _lists: Map<string, RiffList[]> = new Map<string, RiffList[]>();
    private _originalDataSize: number;
    private _type: string;
    private _values: Map<string, ByteVector[]> = new Map<string, ByteVector[]>();

    // #region Constructors

    private constructor() {}

    /**
     * Constructs and initializes a new instance with no contents.
     * @param type Type ID of the list
     */
    public static fromEmpty(type: string): RiffList {
        const list = new RiffList();
        list._isLoaded = true;
        list._type = type;
        list._originalDataSize = 4;
        return list;
    }

    /**
     * Constructs and initializes a new instance, lazily, from a position in a file.
     * @param file File from which to read the current instance
     * @param position Position in the file where the list begins
     */
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
        list._originalDataSize = file.readBlock(4).toUInt(false);
        list._file = file;
        list._isLoaded = false;
        list._type = file.readBlock(4).toString();

        return list;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get chunkStart(): number|undefined { return this._chunkStart; }
    /** @inheritDoc */
    public set chunkStart(value: number) {
        Guards.safeUint(value, "value");
        this._chunkStart = value;
    }

    /** @inheritDoc */
    public get fourcc(): string { return RiffList.identifierFourcc; }

    /** @inheritDoc */
    public get isLoaded(): boolean { return this._isLoaded; }

    /**
     * Total number of nested lists contained in this instance.
     */
    public get listCount(): number {
        this.load();
        return this._lists.size;
    }
    // @TODO: Just expose the values and lists?

    /** @inheritDoc */
    public get originalTotalSize(): number {
        return this._originalDataSize + 8 + (this._originalDataSize % 2 === 1 ? 1 : 0);
    }
    /** @internal */
    public set originalTotalSize(value: number) {
        Guards.safeUint(value, "value");
        this._originalDataSize = value - 8;
    }

    /**
     * ID that identifies the type of this list.
     */
    public get type(): string { return this._type; }

    /**
     * Total number of values contained in this instance.
     */
    public get valueCount(): number {
        this.load();
        return this._values.size;
    }

    // #endregion

    // #region Methods

    /**
     * Removes all values and nested lists from the current instance.
     */
    public clear(): void {
        this._values.clear();
        this._lists.clear();
        this._isLoaded = true;
    }

    /**
     * Retrieves a collection of lists by the lists' key.
     * @param id Key for looking up the desired lists
     * @returns RiffList[] Array of the nested lists with the provided key, or an empty array if
     *     the key does not exist in this instance.
     */
    public getLists(id: string): RiffList[] {
        this.load();
        return this._lists.get(id) || [];
    }

    /**
     * Retrieves a collection of values by the values' key.
     * @param id Key for looking up the desired values
     * @returns ByteVector[] Array of the values with the provided key, or an empty array if the
     *     key does not exist in the instance.
     */
    public getValues(id: string): ByteVector[] {
        this.load();
        return this._values.get(id) || [];
    }

    /** @inheritDoc */
    public load(): void {
        if (this.isLoaded) {
            return;
        }

        // Read the raw list from file
        let fileOffset = this._chunkStart + 12;
        this._file.seek(fileOffset);
        while (fileOffset + 8 <= this._chunkStart + this._originalDataSize) {
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

    /**
     * Stores a collection of lists in the current instance, overwriting any that currently exist.
     * @param id Key for the lists to store
     * @param lists Collection of lists to store in the current instance
     */
    public setLists(id: string, lists: RiffList[]): void {
        this.load();
        if (!lists || lists.length === 0) {
            this._lists.delete(id);
        } else {
            this._lists.set(id, lists);
        }
    }

    /**
     * Stores a collection of values in the current instance, overwriting any that currently exist.
     * @param id Key for the values to store
     * @param values Collection of values to store in the current instance
     */
    public setValues(id: string, values: ByteVector[]): void {
        this.load();
        if (!values || values.length === 0) {
            this._values.delete(id);
        } else {
            this._values.set(id, values);
        }
    }

    /** @inheritDoc */
    public render(): ByteVector {
        this.load();

        // Render all the values
        const valueData = Array.from(this._values.entries(), ([key, value]) => {
            const valuesBytes = value.map((v) => {
                const valueBytes = ByteVector.concatenate(
                    ByteVector.fromString(key),
                    ByteVector.fromUInt(v.length, false),
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
            ByteVector.fromUInt(allData.length, false),
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
