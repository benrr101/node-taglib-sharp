import {ByteVector} from "../../src/byteVector";
import {IStream, SeekOrigin} from "../../src/stream";

const AB2B = require("arraybuffer-to-buffer");

export default class TestStream implements IStream {
    private readonly _isWritable: boolean;
    private _data: ByteVector;
    private _position: number;

    public constructor(bytesToReturn: ByteVector, isWritable: boolean, cloneData: boolean = true) {
        this._data = cloneData ? ByteVector.fromByteVector(bytesToReturn) : bytesToReturn;
        this._position = 0;
        this._isWritable = isWritable;
    }

    public get canWrite(): boolean {
        return this._isWritable;
    }

    public get data(): ByteVector { return this._data; }

    public get length(): number {
        return this._data.length;
    }

    public get position(): number {
        return this._position;
    }
    public set position(value: number) {
        this._position = value;
    }

    public close(): void { /* no op */ }

    public read(buffer: Uint8Array, bufferOffset: number, length: number): number {
        let bytesRead = 0;
        while (bytesRead < length && this._position + bytesRead < this._data.length) {
            buffer[bufferOffset + bytesRead] = this._data.get(this._position + bytesRead);
            bytesRead++;
        }

        this._position += bytesRead;
        return bytesRead;
    }

    public seek(offset: number, origin: SeekOrigin): void {
        switch (origin) {
            case SeekOrigin.Begin:
                this._position = offset;
                break;
            case SeekOrigin.Current:
                this._position += offset;
                break;
            case SeekOrigin.End:
                this._position = this._data.length - offset;
                break;
        }
    }

    public setLength(length: number): void {
        if (this.length < length) {
            // Extend
            this._data.addByteVector(ByteVector.fromSize(length - this.length));
        } else if (this.length > length) {
            // Shrink
            const bytesToRemove = this.length - length;
            const startIndex = this.length - bytesToRemove;
            this._data.removeRange(startIndex, bytesToRemove);
        }
        this._position = Math.max(this.length, this._position);
    }

    public write(buffer: ByteVector | Uint8Array, bufferOffset: number, length: number): number {
        if (buffer instanceof ByteVector) {
            buffer = buffer.data;
        }

        if (!this._isWritable) {
            throw new Error("Invalid operation: this stream is a read-only stream");
        }

        const bytesToWrite = ByteVector.fromByteArray(AB2B(buffer.slice(bufferOffset, bufferOffset + length)));
        if (this._position < this._data.length) {
            this._data.removeRange(this._position, bytesToWrite.length);
        }
        this._data.insertByteVector(this._position, bytesToWrite);

        return length;
    }

}
