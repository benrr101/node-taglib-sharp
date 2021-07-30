import ApeTag from "../ape/apeTag";
import CombinedTag from "../combinedTag";
import Id3v2Tag from "../id3v2/id3v2Tag";
import Id3v2Settings from "../id3v2/id3v2Settings";
import {ApeTagFooter} from "../ape/apeTagFooter";
import {ByteVector} from "../byteVector";
import {CorruptFileError} from "../errors";
import {File, ReadStyle} from "../file";
import {Id3v2TagHeader} from "../id3v2/id3v2TagHeader";
import {Tag, TagTypes} from "../tag";
import {Guards} from "../utils";
import TagParser from "../startEndTags/tagParsers";

/**
 * Provides support for accessing and modifying a collection of tags appearing at the start of a
 * file.
 * This class is used by {@link NonContainerFile} to read all the tags appearing at the start of the
 * file but could be used by other classes. It currently supports ID3v2 and APE tags.
 */
export default class StartTag extends CombinedTag {
    private readonly _file: File;

    /**
     * Constructs a new instance for a specified file.
     * @param file File on which the new instance will perform its operations
     */
    public constructor(file: File) {
        super();

        Guards.truthy(file, "file");
        this._file = file;
    }

    // #region Public Methods

    /**
     * Adds a tag of a specified type to the current instance, optionally copying values from an
     * existing type.
     * @param type Type of the tag to add to the current instance. At the time of this writing,
     *     this is limited to {@link TagTypes.Ape}, {@link TagTypes.Id3v1}, and {@link TagTypes.Id3v2}
     * @param copy Tag to copy values from using {@link Tag.copyTo}, or `undefined` if no tag is to
     *     be copied.
     * @returns Tag Tag added to the current instance. `undefined` if a tag could not be created.
     */
    public addTag(type: TagTypes, copy: Tag) {
        let tag: Tag;

        if (type === TagTypes.Id3v2) {
            tag = Id3v2Tag.fromEmpty();
        } else if (type === TagTypes.Ape) {
            tag = ApeTag.fromEmpty();
            (<ApeTag> tag).isHeaderPresent = true;
        }

        if (tag) {
            if (copy) {
                copy.copyTo(tag, true);
            }

            this.addTagInternal(tag);
        }

        return tag;
    }

    /**
     * Removes a set of tag types from the current instance.
     * @param types Tag types to be removed from the file. To remove all tags, use
     *     {@link TagTypes.AllTags}
     */
    public removeTags(types: TagTypes): void {
        for (let i = this.tags.length - 1; i >= 0; i--) {
            const tag = this.tags[0];
            if (types === TagTypes.AllTags || (tag.tagTypes & types) === tag.tagTypes) {
                this.removeTag(tag);
            }
        }
    }

    /**
     * Renders the tags contained in the current instance.
     * The tags are rendered in the order that they are stored in the current instance.
     * @returns ByteVector Physical representation of the tags stored in the current instance
     */
    public render(): ByteVector {
        const tagData = this.tags.map((t) => {
            switch (t.tagTypes) {
                case TagTypes.Ape:
                    return (<ApeTag> t).render();
                case TagTypes.Id3v2:
                    return (<Id3v2Tag> t).render();
            }
        });
        return ByteVector.concatenate(... tagData);
    }

    /**
     * Writes the tags contained in the current instance to the beginning of the file that created
     * it, overwriting the existing tags.
     * @returns number Seek position in the file at which the written tags end. This also marks the
     *     seek position at which the media begins.
     */
    public write(): number {
        const data = this.render();
        this._file.insert(data, 0, this.sizeOnDisk);
        return data.length;
    }

    // #endregion

    /**
     * Reads the tags stored at the start of the file into the current instance.
     * @returns Seek position in the file at which the read tags end. This also marks where the
     *     media begins.
     */
    protected read(style: ReadStyle): number {
        this.clearTags();

        const parser = new StartTagParser(this._file, style);
        while (parser.read()) {
            this.addTagInternal(parser.currentTag);
        }

        return parser.currentOffset;
    }
}

/**
 * Class for parsing sequential tags at the beginning of the file.
 * @internal
 */
class StartTagParser extends TagParser {
    // Size of the block to read when looking for a tag header, this must be large to contain the
    // largest header identifier (at the time of writing, this is APE).
    private static readonly readSize = Math.max(
        ApeTagFooter.size,
        Id3v2Settings.headerSize
    );
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
