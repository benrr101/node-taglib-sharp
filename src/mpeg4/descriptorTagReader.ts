import { NumberUtils } from "../utils";
import { ByteVector } from "../byteVector";

/**
 * Provides methods to read descriptor tags
 */
export class DescriptorTagReader {
    private _length: number = 0;
    private _offset: number = 0;

    public constructor(private data: ByteVector) { }

    public get length(): number {
        return this._length;
    }

    public get offset(): number {
        return this._offset;
    }

    /**
     * Reads a section length and updates the offset to the end of of the length block.
     * @param data A @see ByteVector object to read from.
     * @param offset A value reference specifying the offset at which to read. This value gets updated to the
     * position following the size data.
     * @returns A value containing the length that was read.
     */
    public readLength(): number {
        let b: number = 0;
        const end: number = this._offset + 4;

        do {
            b = this.data.get(this._offset++);
            this._length = NumberUtils.uintOr(NumberUtils.uintLShift(this._length, 7), NumberUtils.uintAnd(b, 0x7f));
        } while (NumberUtils.uintAnd(b, 0x80) !== 0 && this._offset <= end); // The length could be between 1 and 4 bytes for each descriptor

        return this._length;
    }

    /**
     * Increases the current offset by a given value
     * @param value A number by which the offset should be increased
     * @returns A value containing the offset before increase
     */
    public increaseOffset(value: number): number {
        const previousOffset: number = this._offset;
        this._offset += value;

        return previousOffset;
    }
}