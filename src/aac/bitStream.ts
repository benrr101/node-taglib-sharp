import {Guards} from "../utils";

/**
 * Class used to help reading an arbitrary number of bits from a fixed array of bytes.
 */
export default class BitStream {
    private _bits: Uint8Array;
    private _bitIndex: number;

    /**
     * Constructs a new instance.
     * @param buffer Bytes to read, must be 7 bytes long
     */
    public constructor(buffer: Uint8Array) {
        Guards.truthy(buffer, "buffer");
        if (buffer.length !== 7) {
            throw new Error("Buffer size must be 7 bytes");
        }

        this._bits = buffer.reverse();
        this._bitIndex = 0;
    }

    /**
     * Reads a 32-bit integer from the bitstream
     * @param numberOfBits Number of bits to read from the bitstream
     */
    public readInt32(numberOfBits: number): number {
        Guards.uint(numberOfBits, "numberOfBits");
        if (numberOfBits > 32) {
            throw new Error("Number of bits to read must be <= 32");
        }

        let value = 0;
        let start = this._bitIndex + numberOfBits - 1;
        for (let i = 0; i < numberOfBits; i++) {
            value += this._bits[start] ? (1 << i) : 0;
            this._bitIndex++;
            start--;
        }

        return value;
    }
}
