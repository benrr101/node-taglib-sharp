import ApeTag from "../ape/apeTag";
import CombinedTag from "../combinedTag";
import Id3v2Settings from "../id3v2/id3v2Settings";
import Id3v1Tag from "../id3v1/id3v1Tag";
import Id3v2Tag from "../id3v2/id3v2Tag";
import Id3v2TagFooter from "../id3v2/id3v2TagFooter";
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
    private readonly _readSize: number = Math.max(
        ApeTagFooter.size,
        Id3v2Settings.footerSize,
        Id3v1Tag.size
    );

    public constructor(file: File) {
        super();
        Guards.truthy(file, "file");
        this._file = file;
    }

    /**
     * Gets the total size of the tags located at the end of the file by reading from the file.
     */
    public get totalSize(): number {
        let start = this._file.length;
        let lastReadTagType = TagTypes.AllTags;
        while (lastReadTagType !== TagTypes.None) {
            const readResult = this.readTagInfo(start);
            lastReadTagType = readResult.tagType;
            start = readResult.tagStarted;
        }

        return this._file.length - start;
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
     * Reads the tags stored at the end of the file into the current instance.
     * @returns number Seek position in the file at which the read tags begin
     */
    public read(style: ReadStyle): number {
        this.clearTags();

        let start = this._file.length;
        let tag: Tag;
        do {
            const readResult = this.readTag(start, style);
            tag = readResult.tag;
            start = readResult.tagStarted;

            if (tag) {
                this.insertTag(0, tag);
            }
        } while (tag);

        return start;
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
        const totalSize = this.totalSize;
        const data = this.render();
        this._file.insert(data, this._file.length - totalSize, totalSize);
        return this._file.length - data.length;
    }

    // #endregion

    // #region Private Methods

    private readTag(end: number, style: ReadStyle): {tagStarted: number, tag: Tag} {
        let start = end;

        const readResult = this.readTagInfo(start);
        start = readResult.tagStarted;

        let tag: Tag;
        try {
            switch (readResult.tagType) {
                case TagTypes.Ape:
                    tag = ApeTag.fromFile(this._file, readResult.tagStarted);
                    break;
                case TagTypes.Id3v2:
                    tag = Id3v2Tag.fromFile(this._file, readResult.tagStarted, style);
                    break;
                case TagTypes.Id3v1:
                    tag = Id3v1Tag.fromFile(this._file, readResult.tagStarted);
                    break;
            }

            end = start;
        } catch (e) {
            if (!CorruptFileError.errorIs(e)) {
                throw e;
            }
        }

        return {
            tag: tag,
            tagStarted: end
        };
    }

    private readTagInfo(position: number): {tagStarted: number, tagType: TagTypes} {
        if (position - this._readSize < 0) {
            return {
                tagStarted: position,
                tagType: TagTypes.None
            };
        }

        this._file.seek(position - this._readSize);
        const data = this._file.readBlock(this._readSize);

        try {
            let offset = data.length - ApeTagFooter.size;
            if (data.containsAt (ApeTagFooter.fileIdentifier, offset)) {
                const footer = ApeTagFooter.fromData(data.mid(offset));

                // If the complete tag size is zero or the tag is a header, this indicates some
                // sort of corruption.
                if (footer.tagSize === 0 || (footer.flags & ApeTagFooterFlags.IsHeader) != 0) {
                    return {
                        tagStarted: position,
                        tagType: TagTypes.None
                    };
                }

                position -= footer.tagSize;
                return {
                    tagStarted: position,
                    tagType: TagTypes.Ape
                };
            }

            // Try to find ID3v2 footer
            offset = data.length - Id3v2Settings.footerSize;
            if (data.containsAt(Id3v2TagFooter.fileIdentifier, offset)) {
                const footer = Id3v2TagFooter.fromData(data.mid(offset));
                position -= footer.completeTagSize;
                return {
                    tagStarted: position,
                    tagType: TagTypes.Id3v2
                };
            }

            // Try to find ID3v1 footer
            if (data.startsWith(Id3v1Tag.fileIdentifier)) {
                position -= Id3v1Tag.size;
                return {
                    tagStarted: position,
                    tagType: TagTypes.Id3v1
                };
            }
        } catch (e) {
            if (!CorruptFileError.errorIs(e)) {
                throw e;
            }
        }

        return {
            tagStarted: position,
            tagType: TagTypes.None
        };
    }

    // #endregion
}
