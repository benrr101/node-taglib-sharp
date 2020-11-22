import NonContainerFile from "../nonContainer/nonContainerFile";
import NonContainerTag from "../nonContainer/nonContainerTag";
import Properties from "../properties";
import {ApeStreamHeader} from "./apeStreamHeader";
import {ByteVector} from "../byteVector";
import {File, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {Tag, TagTypes} from "../tag";

/**
 * Provides tagging and properties support for Monkey's Audio APE files.
 * Note, a {@link ApeTag} will be added automatically to any file that doesn't contain one. This
 * change does not affect the physical file until {@link File.save} is called and can be reversed
 * using the following method: `file.removeTags(file.tagTypes & ~file.tagTypesOnDisk);`
 */
export default class ApeFile extends NonContainerFile {
    private _headerBlock: ByteVector;

    /** @inheritDoc */
    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file, propertiesStyle);
    }

    /**
     * Gets a tag of a specified type from the current instance, optionally creating a new tag if
     * possible. If an {@link Id3v2Tag} is added to the current instance, it will be placed at the
     * start of the file. On the other hand, {@link Id3v1Tag} and {@link ApeTag} will be added to the
     * end of the file. All other tag types will be ignored.
     * @param type Type of tag to create
     * @param create Whether or not to create a tag if one is not found
     * @returns Tag Tag that was found in or added to the current instance. If no matching tag was
     *     found and none was created, `undefined` is returned.
     */
    public getTag(type: TagTypes, create: boolean): Tag {
        const t = (<NonContainerTag> this.tag).getTag(type);
        if (t || !create) {
            return t;
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

    /** @inheritDoc */
    protected readEnd(_end: number, _propertiesStyle: ReadStyle): void {
        this.getTag(TagTypes.Ape, true);
    }

    /** @inheritDoc */
    protected readProperties(start: number, end: number, _propertiesStyle: ReadStyle): Properties {
        const header = new ApeStreamHeader(this._headerBlock, end - start);
        return new Properties(0, [header]);
    }

    /** @inheritDoc */
    protected readStart(start: number, propertiesStyle: ReadStyle): void {
        if (this._headerBlock != null && (propertiesStyle & ReadStyle.Average) === 0) {
            return;
        }

        this.seek(start);
        this._headerBlock = this.readBlock(ApeStreamHeader.size);
    }
}

////////////////////////////////////////////////////////////////////////////
// Register the file type
[
    "taglib/ape",
    "audio/x-ape",
    "audio/ape",
    "application/x-ape"
].forEach((mt) => File.addFileType(mt, ApeFile));
