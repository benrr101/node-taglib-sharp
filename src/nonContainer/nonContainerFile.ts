import EndTag from "./endTag";
import NonContainerTag from "./nonContainerTag";
import Properties from "../properties";
import StartTag from "./startTag";
import {File as BaseFile, FileAccessMode, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {TagTypes} from "../tag";

/**
 * Abstract class that provides tagging and properties for files that contain an indeterminate
 * number of tags at their beginning or end.
 * When extending this class, {@see NonContainerFile.readStart},
 *
 * {@see NonContainerFile.readEnd}, and {@see NonContainerFile.readProperties} should overridden
 * and read the format specific information from the file.
 * The file is read upon construction in the following manner:
 * 1. The file is opened for reading
 * 2. The tags at the start of the file are read
 * 3. {@see NonContainerFile.readStart} is called
 * 4. The tags at the end of the file are read
 * 5. {@see NonContainerFile.readEnd} is called
 * 6. If reading with a style other than {@see ReadStyle.None},
 *    {@see NonContainerFile.readProperties} is called
 * 7. The file is closed
 */
export default abstract class NonContainerFile extends BaseFile {
    private _tag: NonContainerTag;
    private _properties: Properties;

    protected constructor(fileToRead: IFileAbstraction | string, propertiesStyle: ReadStyle = ReadStyle.Average) {
        super(fileToRead);

        this.read(propertiesStyle);
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
     * Gets an abstract representation of all tags stored in the current instance.
     */
    public get tag(): NonContainerTag { return this._tag; }

    /**
     * Gets the media properties of the file represented by the current instance.
     */
    public get properties(): Properties { return this._properties; }

    // #endregion

    // #region Public Methods

    /** @inheritDoc BaseFile.save */
    public save(): void {
        this.preSave();
        this.mode = FileAccessMode.Write;

        try {
            const writeResult = this._tag.write();
            this._invariantStartPosition = writeResult.start;
            this._invariantEndPosition = writeResult.end;
            this._tagTypesOnDisk = this.tagTypes;
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    /** @inheritDoc BaseFile.removeTags */
    public removeTags(types: TagTypes): void {
        this._tag.removeTags(types);
    }

    // #endregion

    // #region Private/Protected Methods

    /**
     * Reads format specific information at the end of the file.
     * This method is called by the constructor immediately after the tags at the end of the file
     * have been read and as such (so the internal seek mechanism is close to the end). It should
     * be used for reading any content-specific information such as an audio header from the end of
     * the file.
     * @param end Seek position at which the media data ends and the tags begin
     * @param propertiesStyle Level of accuracy to read the media properties or
     *     {@see ReadStyle.None} to ignore the properties
     */
    protected readEnd(end: number, propertiesStyle: ReadStyle): void {
        /* No-op in base implementation */
    }

    /**
     * Reads the audio properties from the file represented by the current instance.
     * This method is called ONLY IF the file is constructed with a read style other than
     * {@see ReadStyle.None}, and as such MUST NOT return `undefined`/`null`. It is guaranteed that
     * {@see readStart} and {@see readEnd} will have been called first and this method should be
     * strictly used to perform final processing on already read data.
     * @param start Seek position at which the tags end and the media data begins
     * @param end Seek position at which the media data ends and the tags begin
     * @param propertiesStyle Level of accuracy to read the media properties or
     *     {@see ReadStyle.None} to ignore the properties
     * @returns Properties Media properties of the file represented by the current instance
     */
    protected abstract readProperties(start: number, end: number, propertiesStyle: ReadStyle): Properties;

    /**
     * Reads format specific information from the start of the file.
     * This method is called by the constructor immediately after the tags at the start of the
     * file have been read (so the internal seek mechanism is close to the start). It should be
     * used for reading any content specific information, such as an audio header from the start of
     * the file.
     * @param start Seek position at which the tags end and the media data begins
     * @param propertiesStyle Level of accuracy to read the media properties or
     *     {@see ReadStyle.None} to ignore the properties
     */
    protected readStart(start: number, propertiesStyle: ReadStyle): void {
        /* No-op in base implementation */
    }

    private read(propertiesStyle: ReadStyle): void {
        this.mode = FileAccessMode.Read;

        try {
            this._tag = new NonContainerTag(this);

            // Read the tags and property data at the beginning of the file
            this._invariantStartPosition = this._tag.readStart(propertiesStyle);
            this._tagTypesOnDisk |= this.startTag.tagTypes;
            this.readStart(this.invariantStartPosition, propertiesStyle);

            // Read the tags and property data at the end of the file
            this._invariantEndPosition = this.invariantStartPosition === this.length
                ? this.length
                : this._tag.readEnd(propertiesStyle);
            this._tagTypesOnDisk |= this.endTag.tagTypes;
            this.readEnd(this._invariantEndPosition, propertiesStyle);

            // Read the audio properties
            this._properties = (propertiesStyle & ReadStyle.Average) !== 0
                ? this.readProperties(this.invariantStartPosition, this.invariantEndPosition, propertiesStyle)
                : undefined;
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    // #endregion
}
