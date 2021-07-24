import CombinedTag from "../combinedTag";
import EndTag from "./endTag";
import StartTag from "./startTag";
import {ReadStyle} from "../file";
import {Tag, TagTypes} from "../tag";

/**
 * This class extends {@link CombinedTag}, combining {@link StartTag} and {@link EndTag} in such a way
 * as their children appear as its children.
 */
export default class NonContainerTag extends CombinedTag {
    private readonly _endTag: EndTag;
    private readonly _startTag: StartTag;

    /**
     * Constructs a new instance for a specified file.
     * Constructing a new instance does not automatically read the contents from the disk.
     * {@link read} must be called to read the tags
     * @param startTag Tag at the start of the file
     * @param endTag Tag at the end of the file
     */
    public constructor(startTag: StartTag, endTag: EndTag) {
        super();

        this._startTag = startTag;
        this._endTag = endTag;
        this.addTagInternal(this.startTag);
        this.addTagInternal(this.endTag);
    }

    // #region Properties

    /**
     * Gets the collection of tags appearing at the end of the file.
     */
    public get endTag(): EndTag { return this._endTag; }

    /**
     * Gets the collection of tags appearing at the start of the file.
     */
    public get startTag(): StartTag { return this._startTag; }

    /**
     * Gets the tags combined in the current instance.
     */
    public get tags(): Tag[] {
        const tags = [];
        tags.push(... this.startTag.tags);
        tags.push(... this.endTag.tags);
        return tags;
    }

    /**
     * Gets the tag types contained in the current instance.
     */
    public get tagTypes(): TagTypes { return this.startTag.tagTypes | this.endTag.tagTypes; }

    protected get supportedTagTypes(): TagTypes { return TagTypes.Ape | TagTypes.Id3v1 | TagTypes.Id3v2; }

    // #endregion

    // #region Public Methods

    /**
     * Removes a set of tag types from the current instance.
     * @param types Tag types to be removed from the file. To remove all tags from a file, use
     *     {@link TagTypes.AllTags}
     */
    public removeTags(types: TagTypes): void {
        this.startTag.removeTags(types);
        this.endTag.removeTags(types);
    }

    /**
     * Reads the tags at the start and end of the file.
     * @returns {start: number, end: number}
     *     start - Position in the file where tags at the beginning of the file end
     *     end - Position in the file where tags at the end of the file begin
     */
    public read(): {start: number, end: number} {
        return {
            end: this.readEnd(ReadStyle.None),
            start: this.readStart(ReadStyle.None)
        };
    }

    /**
     * Reads the tags stored at the end of the file into the current instance.
     * @returns number Position in the file where tags at the end of the file begin
     */
    public readEnd(style: ReadStyle): number {
        return this.endTag.read(style);
    }

    /**
     * Reads the tags stored at the beginning of the file into the current instance.
     * @returns number Position in the file where tags at the beginning of the file end
     */
    public readStart(style: ReadStyle): number {
        return this.startTag.read(style);
    }

    /**
     * Writes the tags to the start and end of the file.
     * @returns {start: number, end: number}
     *     start - Position in the file where tags at the beginning of the file end
     *     end - Position in the file where tags at the end of the file begin
     */
    public write(): { start: number, end: number} {
        // NOTE: As nice as it would be to do this in an object initialization block, we need to
        //     write the start tag first then the end tag. Otherwise we'll get the wrong position
        //     for the end of the media.
        const start = this.startTag.write();
        const end = this.endTag.write();
        return {
            end: end,
            start: start
        };
    }

    // #endregion
}
