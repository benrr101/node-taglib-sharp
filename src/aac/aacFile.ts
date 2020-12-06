import AacAudioHeader from "./aacAudioHeader";
import NonContainerFile from "../nonContainer/nonContainerFile";
import NonContainerTag from "../nonContainer/nonContainerTag";
import Properties from "../properties";
import {CorruptFileError} from "../errors";
import {File, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {Tag, TagTypes} from "../tag";

/**
 * This class extends {@link File} to provide tagging and properties for ADTS AAC audio files.
 * @remarks A {@link Id3v1Tag} and {@link Id3v2Tag} will be added automatically to any file
 *     that doesn't contain one. This change does not affect the file until it is saved and can be
 *     reversed using the following method:
 *     `file.removeTags(file.tagTypes & ~file.tagTypesOnDisk);`
 */
export default class AacFile extends NonContainerFile {
    private _firstHeader: AacAudioHeader;

    /** @inheritDoc */
    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file, propertiesStyle);
    }

    /**
     * Gets a tag of a specified type from the current instance, optionally creating a new tag if
     * possible. If a {@link Id3v2Tag} is added to the current instance, it will be placed at the
     * start of the file. On the other hand, {@link Id3v1Tag} and {@link ApeTag} will be added to
     * the end of the file. All other tag types will be ignored.
     * @param type Type of tag to read
     * @param create Whether or not to create a tag if one is not found
     * @returns Tag Tag that was found in or added to the current instance. If no matching tag was
     *     found and none was created, `undefined` is returned.
     */
    public getTag(type: TagTypes, create: boolean): Tag {
        const tag = (<NonContainerTag> this.tag).getTag(type);
        if (tag || !create) {
            return tag;
        }

        switch (type) {
            case TagTypes.Id3v1:
                return this.endTag.addTag(type, this.tag);
            case TagTypes.Id3v2:
                return this.startTag.addTag(type, this.tag);
            case TagTypes.Ape:
                return this.endTag.addTag(type, this.tag);
            default:
                return undefined;
        }
    }

    // #region Protected Methods

    /** @inheritDoc */
    protected readEnd(_end: number, _propertiesStyle: ReadStyle): void {
        // Make sure we have Id3v1 and Id3v2 tags
        this.getTag(TagTypes.Id3v1, true);
        this.getTag(TagTypes.Id3v2, true);
    }

    /** @inheritDoc */
    protected readProperties(start: number, end: number, _propertiesStyle: ReadStyle): Properties {
        this._firstHeader.streamLength = end - start;
        return new Properties(0, [this._firstHeader]);
    }

    /** @inheritDoc */
    protected readStart(start: number, propertiesStyle: ReadStyle): void {
        // Only check if the first 16 bytes so we're not stuck reading a bad file forever
        if ((propertiesStyle & ReadStyle.Average) !== 0) {
            this._firstHeader = AacAudioHeader.find(this, start, 0x4000);
            if (this._firstHeader === undefined) {
                throw new CorruptFileError("ADTS audio header not found.");
            }
        }
    }

    // #endregion
}

////////////////////////////////////////////////////////////////////////////
// Register the file type
[
    "taglib/aac",
    "audio/aac"
].forEach((mt) => File.addFileType(mt, AacFile));
