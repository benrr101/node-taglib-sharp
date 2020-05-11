import NonContainerTag from "../nonContainer/nonContainerTag";
import NonContainerFile from "../nonContainer/nonContainerFile";
import Properties from "../properties";
import {AudioHeader} from "./audioHeader";
import {CorruptFileError} from "../errors";
import {ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {Tag, TagTypes} from "../tag";

export default class AudioFile extends NonContainerFile {
    private _firstHeader: AudioHeader;

    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file, propertiesStyle);
    }

    /**
     * Gets a tag of a specified type from the current instance, optionally creating a new tag if
     * possible.
     * If an {@see Id3v2Tag} is added to the current instance, it will be placed at the start of
     * the file. On the other hand, {@see Id3v1Tag} and {@see ApeTag} will be added to the end of
     * the file. All other tag types will be ignored.
     * @param type Type of tag to create
     * @param create Whether or not to try and create the tag if one is not found
     * @returns Tag Tag that was found in or added to the current instance. If no matching tag was
     *     found and none was created, `undefined` is returned.
     */
    public getTag(type: TagTypes, create: boolean): Tag {
        // @TODO: Not sure about this
        const t = (<NonContainerTag> this.tag).getTag(type);
        if (t || !create) {
            return t;
        }

        switch (type) {
            case TagTypes.Id3v1:
                return this.endTag.addTag(type, this.tag);
            case TagTypes.Id3v2:
                return this.endTag.addTag(type, this.tag);
            case TagTypes.Ape:
                return this.endTag.addTag(type, this.tag);
            default:
                return undefined;
        }
    }

    protected readEnd(end: number, propertiesStyle: ReadStyle): void {
        // Make sure we have Id3v1 and Id3v2 tags
        this.getTag(TagTypes.Id3v1, true);
        this.getTag(TagTypes.Id3v2, true);
    }

    protected readProperties(start: number, end: number, propertiesStyle: ReadStyle): Properties {
        this._firstHeader.streamLength =  end - start;
        return new Properties(0, [this._firstHeader]);
    }

    protected readStart(start: number, propertiesStyle: ReadStyle): void {
        // Only check the first 16 bytes so we're not stuck reading a bad file forever
        if ((propertiesStyle & ReadStyle.Average) !== 0) {
            const findResult = AudioHeader.find(this, start, 0x4000);
            this._firstHeader = findResult.header;
            if (!findResult.success) {
                throw new CorruptFileError("MPEG audio header not found");
            }
        }
    }
}

// @TODO: Register this file type with the file resolver

