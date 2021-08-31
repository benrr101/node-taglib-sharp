import EndTag from "./endTag";
import NonContainerTag from "./nonContainerTag";
import Properties from "../properties";
import StartTag from "./startTag";
import {File, FileAccessMode, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {Tag, TagTypes} from "../tag";

/**
 * Abstract class that provides tagging and properties for files that can be wrapped with tags at
 * the beginning or end.
 */
export default abstract class NonContainerFile extends File {
    private readonly _properties: Properties;
    private readonly _tag: NonContainerTag;
    private _mediaEndPosition: number;
    private _mediaStartPosition: number;

    protected constructor(
        fileToRead: IFileAbstraction | string,
        readStyle: ReadStyle,
        defaultTagMappingTable: Map<TagTypes, () => boolean>,
        defaultTags: TagTypes
    ) {
        super(fileToRead);

        // Read existing tags and properties
        this.mode = FileAccessMode.Read;
        try {
            this._tag = new NonContainerTag(this, readStyle, defaultTagMappingTable);
            this._mediaStartPosition = this.startTag.sizeOnDisk;
            this._mediaEndPosition = this.length - this.endTag.sizeOnDisk;
            this._properties = this.readProperties(readStyle);
        } finally {
            this.mode = FileAccessMode.Closed;
        }

        // Create the default tags
        for (const tagType of defaultTagMappingTable.keys()) {
            // Don't create tag if its not desired or already exists
            if ((defaultTags & tagType) === 0 || (this._tag.tagTypes & tagType) !== 0) {
                continue;
            }

            // Tag is expected to exist
            this._tag.createTag(tagType, true);
        }
    }

    // #region Properties

    /**
     * Gets the collection of tags appearing at the end of the file.
     */
    protected get endTag(): EndTag { return this._tag.endTag; }

    /**
     * Gets the collection of tags appearing at the start of the file.
     */
    protected get startTag(): StartTag { return this._tag.startTag; }

    /**
     * Gets the position at which the media content of this file ends.
     */
    public get mediaEndPosition(): number { return this._mediaEndPosition; }

    /**
     * Gets the position at which the media content of this file starts.
     */
    public get mediaStartPosition(): number { return this._mediaStartPosition; }

    /**
     * Gets an abstract representation of all tags stored in the current instance.
     */
    public get tag(): NonContainerTag { return this._tag; }

    /**
     * Gets the media properties of the file represented by the current instance.
     */
    public get properties(): Properties { return this._properties; }

    // #endregion

    // #region Public Methods

    /** @inheritDoc */
    public getTag(type: TagTypes, create: boolean): Tag {
        // Try to get the tag in question
        const tag = this._tag.getTag(type);
        if (tag || !create) {
            return tag;
        }

        // Tag could not be found, create one
        return this._tag.createTag(type, false);
    }

    /** @inheritDoc */
    public save(): void {
        this.preSave();
        this.mode = FileAccessMode.Write;

        try {
            // Render the start tag and store it at the start of the file
            const startTagBytes = this.startTag.render();
            this.insert(startTagBytes, 0, this._mediaStartPosition);

            const mediaStartChange = startTagBytes.length - this._mediaStartPosition;
            this._mediaStartPosition = startTagBytes.length;
            this._mediaEndPosition += mediaStartChange;

            // Render the end tag and store it at the end of the file
            const endTagBytes = this.endTag.render();
            const endBytesToRemove = this.length - this._mediaEndPosition;
            this.insert(endTagBytes, this._mediaEndPosition, endBytesToRemove);
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    /** @inheritDoc BaseFile.removeTags */
    public removeTags(types: TagTypes): void {
        this._tag.removeTags(types);
    }

    // #endregion

    protected abstract readProperties(readStyle: ReadStyle): Properties;
}
