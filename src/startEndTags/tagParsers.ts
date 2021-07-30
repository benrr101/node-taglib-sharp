import {Tag} from "../tag";
import {File, ReadStyle} from "../file";

/**
 * Common logic for parsing sequential tags at the start or end of a file. Classes that inherit
 * from this class are expected to provide `while(parser.read())` functionality. If {@link read}
 * returns `true` the tag that was just read can be read from {@link currentTag}.
 */
export default abstract class TagParser {
    protected _currentTag: Tag;
    protected _file: File;
    protected _fileOffset: number;
    protected _readStyle: ReadStyle;

    protected constructor(file: File, readStyle: ReadStyle) {
        this._file = file;
        this._readStyle = readStyle;
    }

    /**
     * Tag that was just read from the file. This will be `undefined` until {@link read} is called.
     * The value is not guaranteed if {@link read} returns `false`
     */
    public get currentTag(): Tag { return this._currentTag; }

    /**
     * Gets the position in the file where the last tag started or ended (depending on the
     * implementation).
     */
    public get currentOffset(): number { return this._fileOffset; }

    /**
     * Reads the next tag from the file.
     * @returns boolean `true` is returned if a tag is found, the tag can be accessed from
     *     {@link currentTag}. `false` is returned if no tag was found.
     */
    public abstract read(): boolean;
}
