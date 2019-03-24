import {ByteVector} from "./byteVector";

/**
 * This class extends {@see ByteVector} to provide an immutable version
 */
export class ReadOnlyByteVector extends ByteVector {
    // #region Constructors
    private constructor() { super(); }

    /**
     * Constructs and initializes a new instance of {@see ReadOnlyByteVector} by copying a
     * specified number of bytes from an array.
     * @param data An array of bytes to copy values from
     * @param length An integer specifying the number of bytes to copy
     */
    public static fromByteArray(data: Uint8Array, length: number = data.length): ReadOnlyByteVector {
        if (!Number.isInteger(length) || length > data.length || length < 0) {
            throw new Error("Argument out of range exception: Length is invalid");
        }

        const vector = new ReadOnlyByteVector();
        if (length === data.length) {
            vector._data = new Uint8Array(data.length);
            vector._data.set(data);
        } else {
            vector._data = new Uint8Array(length);
            vector._data.set(data.subarray(0, length));
        }
        return vector;
    }

    /**
     * Constructs and initializes a new instance of {@see ReadOnlyByteVector} by copying the
     * contents from another instance.
     * @param original Instance to copy values from
     */
    public static fromByteVector(original: ByteVector): ReadOnlyByteVector {
        return ReadOnlyByteVector.fromByteArray(original.data, original.data.length);
    }

    /**
     * Constructs and initializes a new instance of {@see ReadOnlyByteVector} of a specified length
     * filled with bytes of a specified value.
     * @param size  An integer specifying the number of bytes to add the the new instance
     * @param fill  A byte specifying the value to fill the new instance with.
     */
    public static fromSize(size: number, fill: number = 0x0): ReadOnlyByteVector {
        if (!Number.isInteger(size) || size < 0) {
            throw new Error("Argument out of range exception: ByteVector size is invalid uint");
        }
        if (!Number.isInteger(fill) || fill < 0 || fill > 0xff) {
            throw new Error("Argument out of range exception: ByteVector fill value cannot be used as a uint8");
        }

        const vector = new ReadOnlyByteVector();
        vector._data = new Uint8Array(size);
        vector._data.fill(fill);

        return vector;
    }

    // #endregion

    public get isReadOnly(): boolean { return true; }
    public get isFixedSize(): boolean { return true; }
}