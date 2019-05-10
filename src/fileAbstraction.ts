import {Stream} from "./stream";

export interface IFileAbstraction {
    /**
     * Name or identifier used by the implementation
     * @description This value would typically represent a path or URL to be used when identifying
     *   the file system, but it could be any valud as appropriate for the implementation.
     */
    name: string;

    /**
     * Readable, seekable stream for the file referenced by the current instance.
     * @description This property is typically used when constructing an instance of {@see File}.
     *   Upon completion of the constructor {@see closeStream} will be called to close the stream.
     *   If the stream is to be reused after this point, {@see closeStream} should be implemented
     *   in a way to keep it open.
     */
    readStream: Stream;

    /**
     * Writable, seekable stream fo the file referenced by the current instance.
     * @description This property is typically used when saving a file with {@see File.save}. Upon
     *   completion of the method, {@see closeStream} will be called to close the stream. If the
     *   stream is to be reused after this point, {@see closeStream} should be implemented in a way
     *   to keep it open
     */
    writeStream: Stream;

    closeStream(stream: Stream): void;
}

export class LocalFileAbstraction implements IFileAbstraction {
    /**
     * Contains the name used to open the file
     */
    private readonly _name: string;

    /**
     * Constructs and initializes a new instance from a specified path in the local file system
     * @param path Path of the file to use in the new instance
     * @throws Error Thrown if {@param path} is falsey
     */
    public constructor(path: string) {
        if (!path) {
            throw new Error("Argument null: path was not provided");
        }
        this._name = path;
    }

    public get name(): string {
        return this._name;
    }

    public get readStream(): Stream {
        return Stream.createAsRead(this._name);
    }

    public get writeStream(): Stream {
        return Stream.createAsReadWrite(this._name);
    }

    public closeStream(stream: Stream): void {
        if (!stream) {
            throw new Error("Argument null: stream was not provided");
        }
        stream.close();
    }
}