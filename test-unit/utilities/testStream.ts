import {ByteVector} from "../../src/byteVector";
import {IStream, SeekOrigin} from "../../src/stream";

export default class TestStream implements IStream {
    private readonly _isWritable: boolean;
    private readonly _data: ByteVector;
    private _position: number;

    public constructor(bytesToReturn: ByteVector, isWritable: boolean) {
        this._data = bytesToReturn;
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
        this._data.resize(length);
        this._position = Math.max(this.length, this._position);
    }

    public write(buffer: ByteVector | Uint8Array, bufferOffset: number, length: number): number {
        if (buffer instanceof Uint8Array) {
            buffer = ByteVector.fromByteArray(buffer);
        }

        if (!this._isWritable) {
            throw new Error("Invalid operation: this stream is a read-only stream");
        }

        const bufferStart = bufferOffset;
        const bufferEnd = bufferOffset + length;
        const bytesToWrite = buffer.subarray(bufferStart, bufferEnd);
        this._data.splice(this._position, bytesToWrite.length, bytesToWrite);
        this._position = bufferOffset + bytesToWrite.length;

        return bytesToWrite.length;
    }

}
