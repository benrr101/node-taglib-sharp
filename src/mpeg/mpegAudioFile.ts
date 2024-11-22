import MpegAudioFileSettings from "./mpegAudioFileSettings";
import MpegAudioHeader from "./mpegAudioHeader";
import SandwichFile from "../sandwich/sandwichFile";
import {CorruptFileError} from "../errors";
import {File, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {Properties} from "../properties";
import {TagTypes} from "../tag";
import {NumberUtils} from "../utils";

/**
 * This class extends {@link SandwichFile} to provide tagging and properties support for
 * MPEG-1, MPEG-2, and MPEG-2.5 non-containerized audio files.
 */
export default class MpegAudioFile extends SandwichFile {
    private static readonly DEFAULT_TAG_LOCATION_MAPPING = new Map<TagTypes, () => boolean>([
        [TagTypes.Ape, () => MpegAudioFileSettings.preferApeTagAtFileEnd],
        [TagTypes.Id3v1, () => true],
        [TagTypes.Id3v2, () => MpegAudioFileSettings.preferId3v2TagAtFileEnd]
    ]);

    private _firstHeader: MpegAudioHeader;

    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file, propertiesStyle, MpegAudioFile.DEFAULT_TAG_LOCATION_MAPPING, MpegAudioFileSettings.defaultTagTypes);
    }

    protected readProperties(readStyle: ReadStyle): Properties {
        if (!NumberUtils.hasFlag(readStyle, ReadStyle.Average)) {
            return undefined;
        }

        // @TODO: if readStyle is higher than average, scan the entire file to accurately calculate
        //    the duration and bitrate

        // Skip if we're not reading the properties
        this._firstHeader = MpegAudioHeader.fromFile(this, this.mediaStartPosition, this.mediaEndPosition, 0x4000);
        if (!this._firstHeader) {
            throw new CorruptFileError("MPEG audio header not found");
        }

        return new Properties(this._firstHeader.durationMilliseconds, [this._firstHeader]);
    }
}

// /////////////////////////////////////////////////////////////////////////
// Register the file type
[
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
].forEach((mt) => File.addFileType(mt, MpegAudioFile));
