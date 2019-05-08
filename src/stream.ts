import * as fs from "fs";

// @TODO: Extract an interface to make it feasible to unit test this

export enum SeekOrigin {
    Begin,
    Current,
    End
}

/**
 * Wrapper around the Node.js internal file descriptors to mock behavior like .NET Streams
 */
export class Stream {
    private readonly _canWrite: boolean;
    private readonly _fd: number;
    private _position: number;
    // @TODO: Add length

    // #region Constructors

    private constructor(fd: number, canWrite: boolean) {
        this._canWrite = canWrite;
        this._fd = fd;
        this._position = 0;
    }

    public static createAsRead(path: string): Stream {
        const fd = fs.openSync(path, "r");
        return new Stream(fd, false);
    }

    public static createAsReadWrite(path: string): Stream {
        const fd = fs.openSync(path, "r+");
        return new Stream(fd, true);
    }

    // #endregion

    // #region Properties

    public get canWrite(): boolean { return this._canWrite; }

    public get position(): number { return this._position; }
    public set position(position: number) {
        // @TODO: Make sure seek position is valid for the file
        if (!Number.isSafeInteger(position) || position < 0) {
            throw new Error("Argument out of range: position must be a positive, safe integer");
        }
        this._position = position;
    }

    // #endregion

    public read(buffer: fs.BinaryData, bufferOffset: number, length: number): number {
        const bytes = fs.readSync(this._fd, buffer, bufferOffset, length, this._position);
        this._position += bytes;
        return bytes;
    }

    public seek(offset: number, origin: SeekOrigin) {
        if (!Number.isSafeInteger(offset) || offset < 0) {
            throw new Error("Argument out of range: offset must be a safe, positive integer");
        }

        switch (origin) {
            case SeekOrigin.Begin:
                this.position = offset;
                break;
            case SeekOrigin.Current:
                this.position = this.position + offset;
                break;
            case SeekOrigin.End:
                // @TODO: Add support for end
        }
    }

    public setLength(length: number): void {
        if (!this._canWrite) {
            throw new Error("Invalid operation: this stream is a read-only stream");
        }
        if (!Number.isSafeInteger(length) || length < 0) {
            throw new Error("Argument out of range: length must be a safe, positive integer");
        }

        fs.ftruncateSync(this._fd, length);
    }

    public write(buffer: fs.BinaryData, bufferOffset: number, length: number): number {
        if (!this._canWrite) {
            throw new Error("Invalid operation: this stream is a read-only stream");
        }
        const bytes = fs.writeSync(this._fd, buffer, bufferOffset, length, this._position);
        this._position += bytes;
        return bytes;
    }
}