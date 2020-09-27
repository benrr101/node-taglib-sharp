import AudioHeader from "./audioHeader";
import NonContainerTag from "../nonContainer/nonContainerTag";
import NonContainerFile from "../nonContainer/nonContainerFile";
import Properties from "../properties";
import {CorruptFileError} from "../errors";
import {File, ReadStyle} from "../file";
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

    protected readEnd(end: number, propertiesStyle: ReadStyle): void {
        // Make sure we have Id3v1 and Id3v2 tags
        // @TODO: This is a kinda sleazy way of adding a ID3v2 tag if we didn't read one at the start
        // NOTE: The reason for adding the ID3v1 and ID3v2 tags is because this library is meant to
        //    be tag type agnostic if desired. That means, a user should be able to just add
        //    whatever fields they want and it goes into the right tag. Since ID3v1 doesn't support
        //    many fields, we need to create an ID3v2 tag to ensure all fields can be written to.
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

////////////////////////////////////////////////////////////////////////////
// Register the file type
const mimeTypes = [
    "taglib/mp3",
    "audio/x-mp3",
    "application/x-id3",
    "audio/mpeg",
    "audio/x-mpeg",
    "audio/x-mpeg-3",
    "audio/mpeg3",
    "audio/mp3",
    "taglib/m2a",
    "taglib/mp2",
    "taglib/mp1",
    "audio/x-mp2",
    "audio/x-mp1"
];
for (const mimeType of mimeTypes) {
    File.addFileType(mimeType, AudioFile);
}
