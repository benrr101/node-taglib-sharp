import { ByteVector } from "../byteVector";
import {Guards, NumberUtils} from "../utils";

/**
 * Provides methods to read descriptor tags
 * @internal
 */
export class DescriptorTagReader {
    private _data: ByteVector;
    private _length: number;
    private _offset: number;

    public constructor(data: ByteVector) {
        Guards.truthy(data, "data");

        this._data = data;
        this._length = 0;
        this._offset = 0;
    }

    public get length(): number { return this._length; }

    public get offset(): number { return this._offset; }

    /**
     * Reads a section length and updates the offset to the end of of the length block.
     * @returns A value containing the length that was read.
     */
    public readLength(): number {
        let b = 0;
        const end = this._offset + 4;

        do {
            b = this._data.get(this._offset++);
            this._length = NumberUtils.uintOr(NumberUtils.uintLShift(this._length, 7), NumberUtils.uintAnd(b, 0x7f));
        } while (NumberUtils.uintAnd(b, 0x80) !== 0 && this._offset <= end);
        // The length could be between 1 and 4 bytes for each descriptor

        return this._length;
    }

    /**
     * Increases the current offset by a given value
     * @param value A number by which the offset should be increased
     * @returns A value containing the offset before increase
     */
    public increaseOffset(value: number): number {
        Guards.safeUint(value, "value");

        const previousOffset = this._offset;
        this._offset += value;

        return previousOffset;
    }
}