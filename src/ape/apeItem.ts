import {ByteVector, StringType} from "../byteVector";
import {CorruptFileError} from "../errors";
import {Guards} from "../utils";

/**
 * Type of data stored in an {@see ApeItem}.
 */
export enum ApeItemType {
    /**
     * Item contains unicode text.
     */
    Text = 0,

    /**
     * Item contains binary data.
     */
    Binary = 1,

    /**
     * Item contains a locator (file path/URL) for external information
     */
    Locator = 2
}

/**
 * Representation of an APEv2 tag item which can be read from and written to disk.
 */
export class ApeItem {
    private _data: ByteVector;
    private _key: string;
    private _isReadOnly: boolean;
    private _size: number;
    private _text: string[];
    private _type: ApeItemType = ApeItemType.Text;

    // #region Constructors

    private constructor() { }

    /**
     * Clones an {@see ApeItem}.
     * @param item Item to clone
     */
    public static fromApeItem(item: ApeItem): ApeItem {
        Guards.truthy(item, "item");

        const newItem = new ApeItem();
        newItem._type = item._type;
        newItem._key = item._key;
        newItem._isReadOnly = item._isReadOnly;
        newItem._size = item._size;

        if (item._data) {
            newItem._data = ByteVector.fromByteVector(item._data, true);
        }
        if (item._text) {
            newItem._text = item._text.slice();
        }

        return item;
    }

    /**
     * Constructs and initializes a new instance of {@see ApeItem} with a specified key and value
     * consisting of binary data.
     * @param key Key of the item
     * @param value Value of the item
     */
    public static fromBinaryData(key: string, value: ByteVector): ApeItem {
        Guards.notNullOrUndefined(key, "key");
        Guards.truthy(value, "value");

        const item = new ApeItem();
        item._key = key;
        item._data = ByteVector.fromByteVector(value, true);

        return item;
    }

    /**
     * Constructs and initializes a new instance of {@see ApeItem} with a specified key and value
     * consisting of a list of text elements.
     * @param key Key of the item
     * @param value Value of the item
     */
    public static fromMultipleStrings(key: string, value: string[]): ApeItem {
        Guards.notNullOrUndefined(key, "key");
        Guards.truthy(value, "value");

        const item = new ApeItem();
        item._key = key;
        item._text = value.slice();

        return item;
    }

    /**
     * Constructs and initializes a new instance of {@see ApeItem} by reading in a raw APEv2 item.
     * @param data ByteVector with the item to read.
     * @param offset Offset into {@param data} at which the item data begins. Must be a positive,
     *     safe integer.
     */
    public static fromRawData(data: ByteVector, offset: number): ApeItem {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");

        const item = new ApeItem();
        item.parse(data, offset);

        return item;
    }

    /**
     * Constructs and initializes a new instance of {@see ApeItem} with a specified key and value
     * consisting of a single text element.
     * @param key Key of the item
     * @param value Value of the item
     */
    public static fromSingleString(key: string, value: string): ApeItem {
        Guards.notNullOrUndefined(key, "key");
        Guards.notNullOrUndefined(value, "value");

        const item = new ApeItem();
        item._key = key;
        item._text = [value];

        return item;
    }

    // #endregion

    // #region Properties

    /**
     * Gets whether or not the current instance is empty.
     */
    public get isEmpty(): boolean {
        if (this._type === ApeItemType.Binary) {
            return !this._data || this._data.isEmpty;
        }
        return !this._text || this._text.length === 0;
    }

    /**
     * Gets whether or not the current instance is flagged as read-only on disk.
     */
    public get isReadOnly(): boolean { return this._isReadOnly; }
    /**
     * Sets whether or not the current instance is flagges as read-only on disk.
     */
    public set isReadOnly(val: boolean) { this._isReadOnly = val; }

    /**
     * Gets the key used to identify the current instance.
     */
    public get key(): string { return this._key; }

    /**
     * Gets the size of the current instance as it last appeared on disk.
     */
    public get size(): number { return this._size; }

    /**
     * Gets the type of value contained in the current instance.
     */
    public get type(): ApeItemType { return this._type; }

    /**
     * Gets the binary value stored in the current instance. Returns `undefined` if the item
     * contains text.
     */
    public get value(): ByteVector { return this._type === ApeItemType.Binary ? this._data : undefined; }

    // #endregion

    // #region Public Methods

    /**
     * Renders the current instance as an APEv2 item
     */
    public render(): ByteVector {
        const flags = (this._isReadOnly ? 1 : 0) | (this._type << 1);

        if (this.isEmpty) {
            return ByteVector.fromSize(0);
        }

        let dataByteVector: ByteVector;

        if (this._type === ApeItemType.Binary && !this._text && this._data) {
            dataByteVector = this._data;
        }

        if (!dataByteVector && this._text) {
            dataByteVector = ByteVector.fromSize(0);
            for (let i = 0; i < this._text.length; i++) {
                if (i !== 0) {
                    dataByteVector.addByte(0);
                }
                dataByteVector.addByteVector(ByteVector.fromString(this._text[i], StringType.UTF8));
            }
        }

        // If no data is stored, don't write the item
        if (!dataByteVector || dataByteVector.length === 0) {
            return ByteVector.fromSize(0);
        }

        const output = ByteVector.fromUInt(dataByteVector.length, false);
        output.addByteVector(ByteVector.fromUInt(flags, false));
        output.addByteVector(ByteVector.fromString(this._key, StringType.UTF8));
        output.addByte(0);
        output.addByteVector(dataByteVector);

        this._size = output.length;
        return output;
    }

    /**
     * Gets the contents of the current instance as a {@see string}.
     */
    public toString(): string {
        if (this._type === ApeItemType.Binary && this._data.length >= 0) {
            return `[Binary(${this._data.length})]`;
        }
        if (this._type === ApeItemType.Text && this._text) {
            return this._text.join(", ");
        }
        return "null";
    }

    /**
     * Gets the contents of the current instance as an array of strings. If this item is storing
     * binary data or an empty list of strings, `undefined` is returned.
     */
    public toStringArray(): string[] {
        if (this._type === ApeItemType.Binary || !this._text) {
            return [];
        }
        return this._text;
    }

    // #endregion

    private parse(data: ByteVector, offset: number): void {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");

        // 11 bytes is the minimum size for an APE item
        if (data.length < offset + 11) {
            throw new CorruptFileError("Not enough data for an ApeItem");
        }

        const valueLength = data.mid(offset, 4).toUInt(false);
        const flags = data.mid(offset + 4, 4).toUInt(false);

        this._isReadOnly = (flags & 1) === 1;
        this._type = (flags >> 1) & 3;

        const pos = data.find(ByteVector.getTextDelimiter(StringType.UTF8), offset + 8);

        this._key = data.toString(StringType.UTF8, offset + 8, pos - offset - 8);
        if (valueLength > data.length - pos - 1) {
            throw new CorruptFileError("Invalid data length.");
        }

        this._size = pos + 1 + valueLength - offset;

        if (this._type === ApeItemType.Binary) {
            this._data = ByteVector.fromByteVector(data.mid(pos + 1, valueLength));
        } else {
            this._text = data.mid(pos + 1, valueLength).toStrings(StringType.UTF8, 0);
        }
    }
}
