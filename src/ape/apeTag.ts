import {ApeTagFooter, ApeTagFooterFlags} from "./apeTagFooter";
import {ApeTagItem} from "./apeTagItem";
import {ByteVector} from "../byteVector";
import {CorruptFileError} from "../errors";
import {File, FileAccessMode} from "../file";
import {Tag} from "../tag";
import {Guards, StringComparison} from "../utils";

/**
 * Provides a representation of an APEv2 tag which can be read from and written to disk.
 */
export default class ApeTag extends Tag {
    /**
     * Names of picture fields, indexed to correspond to their picture item names.
     * @private
     */
    private static readonly pictureItemNames = [
        "Cover Art (other)",
        "Cover Art (icon)",
        "Cover Art (other icon)",
        "Cover Art (front)",
        "Cover Art (back)",
        "Cover Art (leaflet)",
        "Cover Art (media)",
        "Cover Art (lead)",
        "Cover Art (artist)",
        "Cover Art (conductor)",
        "Cover Art (band)",
        "Cover Art (composer)",
        "Cover Art (lyricist)",
        "Cover Art (studio)",
        "Cover Art (recording)",
        "Cover Art (performance)",
        "Cover Art (movie scene)",
        "Cover Art (colored fish)",
        "Cover Art (illustration)",
        "Cover Art (band logo)",
        "Cover Art (publisher logo)",
        "Embedded Object"
    ];

    private _footer: ApeTagFooter;
    private _items: ApeTagItem[] = [];

    // #region Constructors

    private constructor() {
        super();
    }

    /**
     * Constructs an empty APEv2 tag.
     */
    public static fromEmpty(): ApeTag {
        return new ApeTag();
    }

    /**
     * Constructs and initializes a new instance by reading the contents of a raw tag in a
     * specified {@see ByteVector} object.
     * @param data Object containing the raw tag
     */
    public static fromData(data: ByteVector): ApeTag {
        Guards.truthy(data, "data");
        if (data.length < ApeTagFooter.size) {
            throw new CorruptFileError("Does not contain enough footer data");
        }

        const tag = new ApeTag();

        // Read the footer
        tag._footer = new ApeTagFooter(data.mid(data.length - ApeTagFooter.size));
        if (tag._footer.tagSize === 0) {
            throw new CorruptFileError("Tag size is out of bounds");
        }

        // If we've read a header at the end of the block, the block is invalid
        if ((tag._footer.flags & ApeTagFooterFlags.IsHeader) !== 0) {
            throw new CorruptFileError("Footer was actually a header");
        }
        if ((data.length < tag._footer.tagSize)) {
            throw new CorruptFileError("Does not contain enough tag data");
        }

        tag.parse(data.mid(data.length - tag._footer.tagSize, tag._footer.tagSize - ApeTagFooter.size));

        return tag;
    }

    /**
     * Constructs a new instance by reading the contents from a specified position in a specified
     * file.
     * @param file File to read the tag from
     * @param position Position where the tag starts
     */
    public static fromFile(file: File, position: number) {
        Guards.truthy(file, "file");
        Guards.uint(position, "position");
        Guards.lessThanInclusive(position, file.length - ApeTagFooter.size, "position");

        file.mode = FileAccessMode.Read;
        file.seek(position);

        const tag = new ApeTag();

        // Read the footer in
        tag._footer = new ApeTagFooter(file.readBlock(ApeTagFooter.size));
        if (tag._footer.tagSize === 0) {
            throw new CorruptFileError("Tag size out of bounds");
        }

        // If we've read a header, we don't have to seek to read the content. If we've read a
        // footer, we need to move back to the start of the tag.
        if ((tag._footer.flags & ApeTagFooterFlags.IsHeader) === 0) {
            file.seek(position + ApeTagFooter.size - tag._footer.tagSize);
        }
        tag.parse(file.readBlock(tag._footer.tagSize - ApeTagFooter.size));

        return tag;
    }

    // #endregion

    // #region Properties

    /**
     * Gets whether or not the current instance has a header when rendered.
     */
    public get headerPresent(): boolean { return (this._footer.flags & ApeTagFooterFlags.HeaderPresent) !== 0; }
    /**
     * Sets whether or not the current instance has a header when rendered.
     */
    public set headerPresent(value: boolean) {
        if (value) {
            this._footer.flags |= ApeTagFooterFlags.HeaderPresent;
        } else {
            this._footer.flags &= ~ApeTagFooterFlags.HeaderPresent;
        }
    }

    // #endregion

    // #region Private Methods

    private getItem(key: string): ApeTagItem {
        return this._items.find((e) => StringComparison.CaseInsensitive(e.key, key));
    }

    private getItemAsString(key: string): string {
        const item = this.getItem(key);
        return item ? item.toString() : undefined;
    }

    private getItemAsStrings(key: string): string[] {
        const item = this.getItem(key);
        return item ? item.text : [];
    }

    private getItemAsUInt32(key: string, index: number): number {
        const text = this.getItemAsString(key);
        if (!text) {
            return 0;
        }

        const values = text.split("/", index + 2);
        if (values.length < index + 1) {
            return 0;
        }

        const uint = Number.parseInt(values[index], 10);
        return Number.isNaN(uint) || uint < 0
            ? 0
            : uint;
    }

    private getItemIndex(key: string): number {
        return this._items.findIndex((e) => StringComparison.CaseInsensitive(e.key, key));
    }



    private parse(data: ByteVector): void {
        try {
            let pos = 0;

            // 11 Bytes is the minimum size for an APE item
            for (let i = 0; i < this._footer.itemCount && pos <= data.length - 11; i++) {
                const item = ApeTagItem.fromData(data, pos);
                this.setItem(item);
                pos += item.size;
            }
        } catch (e) {
            if (!CorruptFileError.errorIs(e)) {
                throw e;
            }

            // A corrupt item was encountered, consider the tag finished with what was read.
        }
    }

    // #endregion
}
