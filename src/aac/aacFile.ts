import AacAudioHeader from "./aacAudioHeader";
import AacSettings from "./aacSettings";
import NonContainerFile from "../nonContainer/nonContainerFile";
import Properties from "../properties";
import {CorruptFileError} from "../errors";
import {File, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {TagTypes} from "../tag";

/**
 * This class extends {@link File} to provide tagging and properties for ADTS AAC audio files.
 * @remarks A {@link Id3v1Tag} and {@link Id3v2Tag} will be added automatically to any file
 *     that doesn't contain one. This change does not affect the file until it is saved and can be
 *     reversed using the following method:
 *     `file.removeTags(file.tagTypes & ~file.tagTypesOnDisk);`
 */
export default class AacFile extends NonContainerFile {
    private static readonly _defaultTagLocationMapping = new Map<TagTypes, () => boolean>([
        [TagTypes.Ape, () => AacSettings.preferApeTagAtFileEnd],
        [TagTypes.Id3v1, () => true],
        [TagTypes.Id3v2, () => AacSettings.preferId3v2TagAtFileEnd]
    ]);

    private _firstHeader: AacAudioHeader;

    /** @inheritDoc */
    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file, propertiesStyle, AacFile._defaultTagLocationMapping, AacSettings.defaultTagTypes);
    }

    protected get defaultTagLocationMapping() { return AacFile._defaultTagLocationMapping; }

    protected get defaultTags() { return AacSettings.defaultTagTypes; }

    protected readProperties(readStyle: ReadStyle): Properties {
        // Skip if we're not reading the properties
        if ((readStyle & ReadStyle.Average) === 0) {
            return undefined;
        }

        // Only search the first 16k before giving up
        this._firstHeader = AacAudioHeader.find(this, this.mediaStartPosition, 0x4000);
        if (!this._firstHeader) {
            throw new CorruptFileError("ADTS audio header not found");
        }

        this._firstHeader.streamLength = this.mediaEndPosition - this.mediaStartPosition;
        return new Properties(this._firstHeader.durationMilliseconds, [this._firstHeader]);
    }
}

////////////////////////////////////////////////////////////////////////////
// Register the file type
[
    "taglib/aac",
    "audio/aac"
].forEach((mt) => File.addFileType(mt, AacFile));
