import {IFileAbstraction} from "./fileAbstraction";
import {Tag} from "./tag";
import {Stream} from "./stream";
import Properties from "./properties";

/**
 * Specifies the options to use when reading the media. Can be treated as flags.
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

/**
 * Delegate is used for intervening in {@see File.createFromPath} by resolving the filetype before
 * any standard resolution operations.
 * @param abstraction File to be read.
 * @param mimeType MimeType of the file.
 * @param style How to read media properties from the file
 * @return New instance of {@see File} or `undefined` if the resolver could not be matched
 * @description A FileTypeResolver is one way of altering the behavior of
 *     {@see File.createFromPath} When {@see File.createFromPath} is called, the registered
 *     resolvers are invoked in reverse order in which they were registered. The resolver may then
 *     perform any operations necessary, including other type-finding methods. If the resolver
 *     returns a new {@see File} it will instantly be returned, by {@see File.createFromPath}. If
 *     it returns `undefined`, {@see File.createFromPath} will continue to process. If the resolver
 *     throws an exception, it will be uncaught. To register a resolver, use
 *     {@see File.addFileTypeResolver}.
 */
export type FileTypeResolver = (abstraction: IFileAbstraction, mimetype: string, style: ReadStyle) => File;

export abstract class File {
    // #region Member Variables

    private static readonly _bufferSize: number = 1024;
    private static readonly _fileTypeResolvers: FileTypeResolver[] = [];

    protected _fileAbstraction: IFileAbstraction;
    private _corruptionReasons: string[];
    private _fileStream: Stream;

    // #endregion

    // #region Properties

    /**
     * Gets the buffer size to use when reading large blocks of data
     */
    public static get bufferSize(): number { return File._bufferSize; }

    /**
     * Gets the media properties of the file represented by the current instance.
     */
     public abstract get properties(): Properties;

    /**
     * Gets an abstract representaion of all tags stored in the current instance.
     * @description This property provides generic and general access to the most common tagging
     *     features of a file. To access or add a specific type of tag in the file, use
     *     {@see File.getTag}.
     */
    public abstract get tag(): Tag;
}
