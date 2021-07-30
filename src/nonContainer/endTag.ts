import ApeTag from "../ape/apeTag";
import CombinedTag from "../combinedTag";
import Id3v2Settings from "../id3v2/id3v2Settings";
import Id3v1Tag from "../id3v1/id3v1Tag";
import Id3v2Tag from "../id3v2/id3v2Tag";
import Id3v2TagFooter from "../id3v2/id3v2TagFooter";
import TagParser from "../startEndTags/tagParsers";
import {ApeTagFooter, ApeTagFooterFlags} from "../ape/apeTagFooter";
import {ByteVector} from "../byteVector";
import {CorruptFileError} from "../errors";
import {File, ReadStyle} from "../file";
import {Id3v2TagHeaderFlags} from "../id3v2/id3v2TagHeader";
import {Tag, TagTypes} from "../tag";
import {Guards} from "../utils";

/**
 * Provides support for accessing and modifying a collection of tags appearing at the end of a
 * file.
 * This class is used by {@link NonContainerFile} to read all tags appearing at the end of the file
 * but could be used by other classes. It currently supports ID3v1, ID3v2, and APE tags.
 */
export default class EndTag extends CombinedTag {
    private readonly _file: File;

    public constructor(file: File) {
        super();
        Guards.truthy(file, "file");
        this._file = file;
    }

    // #region Public Methods

    /**
     * Adds a tag of a specified type to the current instance, optionally copying values from an
     * existing type.
     * Id3v1 tags are added at the end of the current instance, while other tags are added at the
     * beginning.
     * @param type Type of the tag to add to the current instance. At the time of this writing,
     *     this is limited to {@link TagTypes.Ape}, {@link TagTypes.Id3v1}, and {@link TagTypes.Id3v2}
     * @param copy Tag to copy values from using {@link Tag.copyTo}, or `undefined` if no tag is to
     *     be copied.
     * @returns Tag Tag added to the current instance. `undefined` if a tag could not be created.
     */
    public addTag(type: TagTypes, copy: Tag): Tag {
        let tag: Tag;

        if (type === TagTypes.Id3v1) {
            tag = Id3v1Tag.fromEmpty();
        }
        if (type === TagTypes.Id3v2) {
            const tag32 = Id3v2Tag.fromEmpty();
            tag32.version = 4;
            tag32.flags |= Id3v2TagHeaderFlags.FooterPresent;

            tag = tag32;
        }
        if (type === TagTypes.Ape) {
            tag = ApeTag.fromEmpty();
        }

        if (tag) {
            if (copy) {
                copy.copyTo(tag, true);
            }

            if (type === TagTypes.Id3v1) {
                this.addTagInternal(tag);
            } else {
                this.insertTag(0, tag);
            }
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
            const tag = this.tags[i];
            if (types === TagTypes.AllTags || (tag.tagTypes & types) === tag.tagTypes) {
                this.removeTag(tag);
            }
        }
    }

    /**
     * Renders the tags contained in the current instance.
     * The tags are rendered in the order that they are stored.
     * @returns ByteVector Physical representation of the tags stored in the current instance
     */
    public render(): ByteVector {
        const tagData = this.tags.map((t) => {
            switch (t.tagTypes) {
                case TagTypes.Ape:
                    return (<ApeTag> t).render();
                case TagTypes.Id3v2:
                    return (<Id3v2Tag> t).render();
                case TagTypes.Id3v1:
                    return (<Id3v1Tag> t).render();
            }
        });
        return ByteVector.concatenate(... tagData);
    }

    /**
     * Writes the tags contained in the current instance to the end of the file that created it,
     * overwriting the existing tags.
     * @returns number Seek position in the file at which the written tags begin. This also marks
     * the seek position at which the media ends.
     */
    public write(): number {
        const data = this.render();
        this._file.insert(data, this._file.length - this.sizeOnDisk, this.sizeOnDisk);
        return this._file.length - data.length;
    }

    // #endregion

    /**
     * Reads the tags stored at the end of the file into the current instance.
     * @returns number Seek position in the file at which the tags begin and the media contents end
     */
    protected read(style: ReadStyle): number {
        this.clearTags();

        const parser = new EndTagParser(this._file, style);
        while (parser.read()) {
            this.insertTag(0, parser.currentTag);
        }

        return parser.currentOffset;
    }
}

/**
 * Class for parsing sequential tags at the end of the file.
 * @internal
 */
class EndTagParser extends TagParser {
    // Size of the block to read when looking for a tag footer, this must be large enough to
    // contain the largest footer identifier (a the time of writing, this is ID3v1)
    private static readonly readSize = Math.max(
        ApeTagFooter.size,
        Id3v2Settings.footerSize,
        Id3v1Tag.size
    );
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
                    // TODO: Calculate offset...
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
