import * as fs from "fs";

// @TODO: Extract an interface to make it feasible to unit test this

/**
 * Wrapper around the Node.js internal file descriptors to mock behavior like .NET Streams
 */
export class Stream {
    private _fd: number;
    private _position: number;

    private constructor(fd: number) {
        this._fd = fd;
        this._position = 0;
    }

    public static createAsRead(path: string): Stream {
        const fd = fs.openSync(path, "r");
        return new Stream(fd);
    }

    public static createAsReadWrite(path: string): Stream {
        const fd = fs.openSync(path, "r+");
        return new Stream(fd);
    }
}