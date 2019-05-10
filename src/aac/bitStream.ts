/**
 * This class is used to help read arbitrary number of bits from a fixed array of bytes.
 */
export default class BitStream {
    private _bits: boolean[];
    private _bitIndex: number;

    public constructor(buffer: Uint8Array) {
        if (buffer.length !== 7) {
            throw new Error("Argument out of range: buffer must be exactly 7 bytes");
        }

        // Reverse bits
        this._bits = new Array<boolean>(56);    // 7 bytes, 8 bits/byte = 56 bits
        for (let i = 0; i < buffer.length; i++) {
            for (let j = 0; j < 8; j++) {
                this._bits[i * 8 + j] = (buffer[i] & (1 << (7 - j))) > 0;
            }
        }

        this._bitIndex = 0;
    }

    /**
     * Reads a 32-bit integer from the current position of the bitstream
     * @param numberOfBits Number of bits to read from the bitstream
     * @returns 32-bit integer based on the bits in the bitstream
     */
    public readInt32(numberOfBits: number): number {
        if (!Number.isSafeInteger(numberOfBits) || numberOfBits <= 0 || numberOfBits > 32) {
            throw new Error("Argument out of range exception: numberOfBits must be >0 and <32");
        }

        let value = 0;
        let start = this._bitIndex + numberOfBits - 1;
        for (let i = 0; i < numberOfBits; i++) {
            value += this._bits[start] ? (i << i) : 0;
            this._bitIndex++;
            start--;
        }

        return value;
    }
}
