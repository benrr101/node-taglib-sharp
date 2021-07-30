import ApeTag from "../ape/apeTag";
import Id3v2Settings from "../id3v2/id3v2Settings";
import Id3v1Tag from "../id3v1/id3v1Tag";
import Id3v2Tag from "../id3v2/id3v2Tag";
import Id3v2TagFooter from "../id3v2/id3v2TagFooter";
import {Tag} from "../tag";
import {File, ReadStyle} from "../file";
import {ApeTagFooter} from "../ape/apeTagFooter";
import {CorruptFileError, Id3v2TagHeader} from "..";

/**
 * Common logic for parsing sequential tags at the start or end of a file. Classes that inherit
 * from this class are expected to provide `while(parser.read())` functionality. If {@link read}
 * returns `true` the tag that was just read can be read from {@link currentTag}.
 */
abstract class TagParser {
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
     * Reads the next tag from the file.
     * @returns boolean `true` is returned if a tag is found, the tag can be accessed from
     *     {@link currentTag}. `false` is returned if no tag was found.
     */
    public abstract read(): boolean;
}

/**
 * Class for parsing sequential tags at the end of the file.
 * @internal
 */
export class EndTagParser extends TagParser {
    // Size of the block to read when looking for a tag footer, this must be large enough to
    // contain the largest footer identifier (a the time of writing, this is ID3v1)
    private static readonly readSize = 128;
    private static readonly identifierMappings = [
        {
            action: (f: File, p: number, rs: ReadStyle) => ApeTag.fromFile(f, p),
            identifier: ApeTagFooter.fileIdentifier,
            offset: ApeTagFooter.size,
        },
        {
            action: (f: File, p: number, rs: ReadStyle) => Id3v2Tag.fromFile(f, p, rs),
            identifier: Id3v2TagFooter.fileIdentifier,
            offset: Id3v2Settings.footerSize
        },
        {
            action: (f: File, p: number, rs: ReadStyle) => Id3v1Tag.fromFile(f, p),
            identifier: Id3v1Tag.fileIdentifier,
            offset: Id3v1Tag.size
        }
    ];

    public constructor(file: File, readStyle: ReadStyle) {
        super(file, readStyle);
        this._fileOffset = this._file.length - EndTagParser.readSize;
    }

    public read(): boolean {
        try {
            // Read a footer from the file
            this._file.seek(this._fileOffset);
            const tagFooterBlock = this._file.readBlock(EndTagParser.readSize);

            // Check for any identifiers of a tag
            for (const mapping of EndTagParser.identifierMappings) {
                // Calculate how far from the end of the block to check
                const offset = tagFooterBlock.length - mapping.offset;
                if (tagFooterBlock.containsAt(mapping.identifier, offset)) {
                    this._currentTag = mapping.action(this._file, offset, this._readStyle);
                }
            }
        } catch (e) {
            if (!CorruptFileError.errorIs(e)) {
                throw e;
            }
        }

        return false;
    }
}

/**
 * Class for parsing sequential tags at the beginning of the file.
 * @internal
 */
export class StartTagParser extends TagParser {
    // Size of the block to read when looking for a tag header, this must be large to contain the
    // largest header identifier (at the time of writing, this is APE).
    private static readonly readSize = 32;
    private static readonly identifierMappings = [
        {
            action: (f: File, p: number, rs: ReadStyle) => ApeTag.fromFile(f, p),
            identifier: ApeTagFooter.fileIdentifier,
        },
        {
            action: (f: File, p: number, rs: ReadStyle) => Id3v2Tag.fromFile(f, p, rs),
            identifier: Id3v2TagHeader.fileIdentifier
        }
    ];

    public constructor(file: File, readStyle: ReadStyle) {
        super(file, readStyle);
        this._fileOffset = 0;
    }

    public read(): boolean {
        try {
            // Read a header from the file
            this._file.seek(this._fileOffset);
            const tagHeaderBlock = this._file.readBlock(StartTagParser.readSize);

            // Check for any identifier of a tag
            for (const mapping of StartTagParser.identifierMappings) {
                if (tagHeaderBlock.startsWith(mapping.identifier)) {
                    this._currentTag = mapping.action(this._file, this._fileOffset, this._readStyle);
                    this._fileOffset += this._currentTag.sizeOnDisk;
                    return true;
                }
            }
        } catch (e) {
            if (!CorruptFileError.errorIs(e)) {
                throw e;
            }
        }

        return false;
    }
}
