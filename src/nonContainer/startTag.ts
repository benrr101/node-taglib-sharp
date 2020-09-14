import CombinedTag from "../combinedTag";
import Id3v2Tag from "../id3v2/id3v2Tag";
import Id3v2Settings from "../id3v2/id3v2Settings";
import {ByteVector} from "../byteVector";
import {CorruptFileError} from "../errors";
import {File, ReadStyle} from "../file";
import {Id3v2TagHeader} from "../id3v2/id3v2TagHeader";
import {Tag, TagTypes} from "../tag";
import {Guards} from "../utils";

/**
 * Provides support for accessing and modifying a collection of tags appearing at the start of a
 * file.
 * This class is used by {@see NonContainerFile} to read all the tags appearing at the start of the
 * file but could be used by other classes. It currently supports ID3v2 and APE tags.
 * @TODO: JK NO IT DON'T SUPPORT APE YET.
 */
export default class StartTag extends CombinedTag {
    private readonly _file: File;
    private readonly _readSize = Math.max(/* TODO: APE */ Id3v2Settings.headerSize);

    /**
     * Constructs a new instance for a specified file.
     * @param file File on which the new instance will perform its operations
     */
    public constructor(file: File) {
        super();

        Guards.truthy(file, "file");
        this._file = file;
    }

    /**
     * Gets the total size of the tags located at the beginning of the file by reading from
     * the file.
     */
    public get totalSize(): number {
        let size = 0;
        let lastReadTagType = TagTypes.AllTags;
        while (lastReadTagType !== TagTypes.None) {
            const readResult = this.readTagInfo(size);
            lastReadTagType = readResult.tagType;
            size = readResult.position;
        }

        return size;
    }

    // #region Public Methods

    /**
     * Adds a tag of a specified type to the current instance, optionally copying values from an
     * existing type.
     * @param type Type of the tag to add to the current instance. At the time of this writing,
     *     this is limited to {@see TagTypes.Ape}, {@see TagTypes.Id3v1}, and {@see TagTypes.Id3v2}
     * @param copy Tag to copy values from using {@see Tag.copyTo}, or `undefined` if no tag is to
     *     be copied.
     * @returns Tag Tag added to the current instance. `undefined` if a tag could not be created.
     */
    public addTag(type: TagTypes, copy: Tag) {
        let tag: Tag;

        if (type === TagTypes.Id3v2) {
            tag = Id3v2Tag.fromEmpty();
        }
        // @TODO: Add APE

        if (tag) {
            if (copy) {
                copy.copyTo(tag, true);
            }

            this.addTagInternal(tag);
        }

        return tag;
    }

    /**
     * Reads the tags stored at the start of the file into the current instance.
     * @returns Seek position in the file at which the read tags end. This also marks where the
     *     media begins.
     */
    public read(style: ReadStyle): number {
        this.clearTags();

        let end = 0;
        let tag: Tag;
        do {
            const readResult = this.readTag(end, style);
            tag = readResult.tag;
            end = readResult.start;

            if (tag) {
                this.addTagInternal(tag);
            }
        } while (tag);

        return end;
    }

    /**
     * Removes a set of tag types from the current instance.
     * @param types Tag types to be removed from the file. To remove all tags, use
     *     {@see TagTypes.AllTags}
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
                // @TODO: Add APE
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
        this._file.insert(data, 0, this.totalSize);
        return data.length;
    }

    // #endregion

    // #region Protected/Private Methods

    private readTag(start: number, style: ReadStyle): {start: number, tag: Tag} {
        const readResult = this.readTagInfo(start);
        const end = readResult.position;
        let tag: Tag;

        switch (readResult.tagType) {
            // @TODO: APE
            case TagTypes.Id3v2:
                tag = Id3v2Tag.fromFile(this._file, start, style);
                break;
        }

        start = end;
        return {
            start: start,
            tag: tag
        };
    }

    private readTagInfo(position: number): {position: number, tagType: TagTypes} {
        this._file.seek(position);
        const data = this._file.readBlock(this._readSize);

        try {
            // @TODO: Add APE
            if (data.startsWith(Id3v2TagHeader.fileIdentifier)) {
                const header = Id3v2TagHeader.fromData(data);

                position += header.completeTagSize;
                return {
                    position: position,
                    tagType: TagTypes.Id3v2
                };
            }
        } catch (e) {
            if (!CorruptFileError.errorIs(e)) {
                throw e;
            }
        }

        return {
            position: position,
            tagType: TagTypes.None
        };
    }

    // #endregion
}
