import {ByteVector, StringType} from "../byteVector";
import {Guards} from "../utils";
import {File} from "../file";

export default class RiffList {
    private _dict: {[key: string]: ByteVector[]} = {};
    private _stringType: StringType = StringType.UTF8;

    /**
     * Constructs and initializes a new instance by reading the contents of a raw RIFF list stored
     * in a {@link ByteVector} object.
     * @param data Object containing a raw RIFF list to read into the new instance.
     */
    public static fromData(data: ByteVector): RiffList {
        Guards.truthy(data, "data");

        const list = new RiffList();

        let offset = 0;
        while (offset + 8 < data.length) {
            const id = data.mid(offset, 4).toString(4);
            let length = data.mid(offset + 4, 4).toUInt(false);

            if (list._dict[id] === undefined) {
                list._dict[id] = [];
            }
            list._dict[id].push(data.mid(offset + 8, length));

            if (length % 2 === 1) {
                length++;
            }

            offset += 8 + length;
        }

        return list;
    }

    /**
     * Constructs and initializes a new instance by reading the contents of a raw RIFF list from a
     * specified position in a file.
     * @param file File containing the contents of the new instance
     * @param position Index into the file where the the list begins, must be safe positive integer
     * @param length Length of the list in bytes, must be a positive integer
     */
    public static fromFile(file: File, position: number, length: number): RiffList {
        Guards.truthy(file, "file");
        Guards.safeUint(position, "position");
        Guards.uint(length, "length");
        if (position > file.length - length) {
            throw new Error("Argument out of range: position must be less than file length");
        }

        file.seek(position);
        return RiffList.fromData(file.readBlock(length));
    }

    /**
     * Gets the {@link StringType} value used for parsing and rendering the contents of this list.
     */
    public get stringType(): StringType { return this._stringType; }
    /**
     * Sets the {@link StringType} value used for parsing and rendering the contents of this list.
     */
    public set stringType(value: StringType) { this._stringType = value; }

    // #region Methods

    /**
     * Determines whether the current instance contains the specified key.
     * @param id Key to locate in the current instance
     * @returns `true` if key exists, `false` otherwise
     */
    public containsKey(id: string) {
        return !!this._dict[id];
    }

    /**
     * Gets the values for a specified item in the current instance as an array of
     * {@link ByteVector}.
     * @param id ID of the item of which to get the values. Must be 4 bytes
     */
    public getValues(id: string): ByteVector[] {
        RiffList.validateId(id);
        return this._dict[id] || [];
    }

    /**
     * Gets the values for a specified item as an array of strings.
     * @param id ID of the item of which to get the values. Must be 4 bytes
     */
    public getValuesAsStrings(id: string): string[] {
        const values = this.getValues(id);
        return values.map((value) => {
            return value
                ? value.toString(length, this._stringType)
                : "";
        });
    }

    /**
     * Gets the value for a specified item in the current instance as an unsigned integer. The
     * first value that can be parsed as an int will be returned. `0` is returned if no matching
     * values exist.
     * @param id ID of the item of which to get the values. Must be 4 bytes
     */
    public getValueAsUint(id: string): number {
        for (const value of this.getValuesAsStrings(id)) {
            const numberValue = Number.parseInt(value, 10);
            if (!Number.isNaN(numberValue) && numberValue > 0) {
                return numberValue;
            }
        }

        return 0;
    }

    /**
     * Removes the item with the specified ID from the current instance.
     * @param id ID of the item to remove. Must be 4 bytes
     */
    public removeValue(id: string): void {
        RiffList.validateId(id);
        delete this._dict[id];
    }

    /**
     * Renders the current instance as a raw RIFF list.
     */
    public render(): ByteVector {
        const renderedValues = [];
        for (const key in this._dict) {
            if (!this._dict.hasOwnProperty(key)) { continue; }

            for (const value of this._dict[key]) {
                // Omit any empty values
                if (value.length === 0) {
                    continue;
                }

                const data = ByteVector.concatenate(
                    ByteVector.fromString(key),
                    ByteVector.fromUInt(value.length, false),
                    value
                );

                // Pad odd length values
                if (value.length % 2 === 1) {
                    data.addByte(0x00);
                }

                renderedValues.push(data);
            }
        }

        return ByteVector.concatenate(... renderedValues);
    }

    /**
     * Renders the current instance enclosed in an item with a specified ID.
     * @param id ID of the item in which to enclose the current instance. Must be 4 bytes.
     */
    public renderEnclosed(id: string): ByteVector {
        RiffList.validateId(id);

        const data = this.render();
        if (data.length <= 8) {
            return ByteVector.empty();
        }

        const header = ByteVector.concatenate(
            ByteVector.fromString("LIST"),
            ByteVector.fromUInt(data.length + 4, false),
            ByteVector.fromString(id)
        );
        data.insertByteVector(0, header);

        return data;
    }

    /**
     * Sets the value for a specified item in the current instance to an array.
     * @param id ID of the item of which to get the values. Must be 4 bytes
     * @param values Array of {@link ByteVector} to store in the specified item. If falsey or
     *     undefined, the item will be removed
     */
    public setValue(id: string, ... values: ByteVector[]): void {
        RiffList.validateId(id);
        if (!values || values.length === 0) {
            this.removeValue(id);
        } else {
            this._dict[id] = values;
        }
    }

    /**
     * Sets the value for a specified item in the current instance to an array of strings.
     * @param id ID of the item of which to get the values. Must be 4 bytes
     * @param values Array of strings to store in the specified item. If falsey or undefined, the
     *     item will be removed
     */
    public setValueFromStrings(id: string, ... values: string[]): void {
        RiffList.validateId(id);

        if (!values) {
            this.removeValue(id);
            return;
        }

        const byteVectorValues = values
            .filter((v) => v !== undefined && v !== null)
            .map((v) => {
                return ByteVector.concatenate(
                    ByteVector.fromString(v, this._stringType),
                    0x00
                );
            });

        if (byteVectorValues.length === 0) {
            this.removeValue(id);
        } else {
            this.setValue(id, ... byteVectorValues);
        }
    }

    /**
     * Sets the value for a specified item in the current instance to a uint.
     * @param id ID of the item of which to get the values. Must be 4 bytes
     * @param value Value to store in the item. Must be an unsigned integer
     */
    public setValueFromUint(id: string, value: number) {
        RiffList.validateId(id);
        Guards.uint(value, "value");

        if (value === 0) {
            this.removeValue(id);
        } else {
            this.setValueFromStrings(id, value.toString(10));
        }
    }

    private static validateId(id: string) {
        Guards.truthy(id, "id");
        if (id.length !== 4) {
            throw new Error("Argument error: ID must be 4 bytes long");
        }
    }

    // #endregion


}
