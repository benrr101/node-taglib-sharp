/**
 * Specified the options to use when reading the media. Can be treated as flags.
 */
export enum ReadStyle {
    /**
     * The media properties will not be read.
     */
    None = 0,

    // Fast = 1,

    /**
     * The media properties will be read with average accuracy.
     */
    Average = 2,

    /**
     * Use the {@see PictureLazy} class in the the property {@see Tag.Pictures}. This will avoid
     * loading picture content when reading the tag. Picture will be read lazily, when the picture
     * content is accessed.
     */
    PictureLazy = 4
}

export interface IFileAbstraction {
    /**
     * Name or identifier used by the implementation
     * @description This value would typically represent a path or URL to be used when identifying
     *   the file system, but it could be any valud as appropriate for the implementation.
     */
    Name: string;

    /**
     * Readable, seekable stream for the file referenced by the current instance.
     * @description This property is typically used when constructing an instance of {@see File}.
     *   Upon completion of the constructor {@see closeStream} will be called to close the stream.
     *   If the stream is to be reused after this point, {@see closeStream} should be implemented
     *   in a way to keep it open.
     */
    ReadStream: NodeJS.ReadableStream;

    /**
     * Writable, seekable stream fo the file referenced by the current instance.
     * @description This property is typically used when saving a file with {@see File.save}. Upon
     *   completion of the method, {@see closeStream} will be called to close the stream. If the
     *   stream is to be reused after this point, {@see closeStream} should be implemented in a way
     *   to keep it open
     */
    WriteStream: NodeJS.WritableStream;

    closeStream(stream: NodeJS.ReadableStream | NodeJS.WritableStream): void;
}

/**
 * Specifies the type of file access operations currently permitted on an instance of {@see File}
 */
export enum FileAccessMode {
    /**
     * Read operations can be performed.
     */
    Read,

    /**
     * Read and write operations can be performed
     */
    Write,

    /**
     * The file is closed for both read and write operations
     */
    Closed
}

export abstract class File {
}
