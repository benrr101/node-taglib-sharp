import CombinedTag from "../combinedTag";
import DivxTag from "./divxTag";
import Id3v2Tag from "../id3v2/id3v2Tag";
import InfoTag from "./infoTag";
import MovieIdTag from "./movieIdTag";
import Properties from "../properties";
import RiffWaveFormatEx from "./riffWaveFormatEx";
import {AviHeaderList} from "./aviHeaderList";
import {ByteVector} from "../byteVector";
import {File, FileAccessMode, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {CorruptFileError, UnsupportedFormatError} from "../errors";
import {ICodec} from "../iCodec";
import {Id3v2TagHeaderFlags} from "../id3v2/id3v2TagHeader";
import {Tag, TagTypes} from "../tag";

export default class RiffFile extends File {
    /**
     * Identifier used to recognize a RIFF file.
     */
    public static readonly FILE_IDENTIFIER = ByteVector.fromString("RIFF", undefined, undefined, true);

    private readonly _tag: CombinedTag = new CombinedTag();
    private _divxTag: DivxTag;
    private _id3v2Tag: Id3v2Tag;
    private _infoTag: InfoTag;
    private _properties: Properties;
    private _movieIdTag: MovieIdTag;

    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file);

        this.read(true, propertiesStyle);

        // Make sure we have all the possible tags at our disposal
        // @TODO: Creating *all* the tag types should probably be optional
        this.getTag(TagTypes.Id3v2, true);
        this.getTag(TagTypes.RiffInfo, true);
        this.getTag(TagTypes.MovieId, true);
        this.getTag(TagTypes.DivX, true);
    }

    // #region Properties

    /** @inheritDoc */
    public get tag(): Tag { return this._tag; }

    /** @inheritDoc */
    public get properties(): Properties { return this._properties; }

    // #endregion

    // #region Methods

    /** @inheritDoc */
    public getTag(type: TagTypes, create: boolean): Tag {
        let tag: Tag;

        switch (type) {
            case TagTypes.Id3v2:
                if (!this._id3v2Tag && create) {
                    this._id3v2Tag = Id3v2Tag.fromEmpty();
                    this._id3v2Tag.version = 4; // @TODO: Is only v2.4 supported or should we fallback to default?
                    this._id3v2Tag.flags |= Id3v2TagHeaderFlags.FooterPresent;
                    this._tag.copyTo(this._id3v2Tag, true);
                }

                tag = this._id3v2Tag;
                break;

            case TagTypes.RiffInfo:
                if (!this._infoTag) {
                    this._infoTag = InfoTag.fromEmpty();
                    this._tag.copyTo(this._infoTag, true);
                }

                tag = this._infoTag;
                break;

            case TagTypes.MovieId:
                if (!this._movieIdTag) {
                    this._movieIdTag = MovieIdTag.fromEmpty();
                    this._tag.copyTo(this._movieIdTag, true);
                }

                tag = this._movieIdTag;
                break;

            case TagTypes.DivX:
                if (!this._divxTag) {
                    this._divxTag = DivxTag.fromEmpty();
                    this._tag.copyTo(this._divxTag, true);
                }

                tag = this._movieIdTag;
                break;
        }

        this._tag.setTags(this._id3v2Tag, this._infoTag, this._movieIdTag, this._divxTag);
        return tag;
    }

    /** @inheritDoc */
    public removeTags(types: TagTypes): void {
        if ((types && TagTypes.Id3v2) !== TagTypes.None) {
            this._id3v2Tag = undefined;
        }
        if ((types && TagTypes.RiffInfo) !== TagTypes.None) {
            this._infoTag = undefined;
        }
        if ((types && TagTypes.MovieId) !== TagTypes.None) {
            this._movieIdTag = undefined;
        }
        if ((types && TagTypes.DivX) !== TagTypes.None) {
            this._divxTag = undefined;
        }

        this._tag.setTags(this._id3v2Tag, this._infoTag, this._movieIdTag, this._divxTag);
    }

    /** @inheritDoc */
    public save(): void {
        this.preSave();

        this.mode = FileAccessMode.Write;
        try {
            const data = ByteVector.empty();

            // Enclose the ID3v2 tag in an "id3 " item and embed it as the first tag.
            if (this._id3v2Tag) {
                const id3v2TagData = this._id3v2Tag.render();
                if (id3v2TagData.length > 10) {
                    if (id3v2TagData.length % 2 === 1) {
                        id3v2TagData.addByte(0);
                    }
                    data.addByteVector(ByteVector.concatenate(
                        ByteVector.fromString("id3 "),
                        ByteVector.fromUInt(id3v2TagData.length, false),
                        id3v2TagData
                    ));
                }
            }

            // Embed "INFO" tag as the second tag
            if (this._infoTag) {
                data.addByteVector(this._infoTag.renderEnclosed());
            }

            // Embed MovieID as the third tag
            if (this._movieIdTag) {
                data.addByteVector(this._movieIdTag.renderEnclosed());
            }

            // Embed the DivX tag in "IDVX" as the fourth tag
            if (this._divxTag) {
                const divxTagData = this._divxTag.render();
                // NOTE: No need to pad odd sized tags, b/c DivX is always 128 bytes
                data.addByteVector(ByteVector.concatenate(
                    ByteVector.fromString("IDVX"),
                    ByteVector.fromUInt(divxTagData.length, false),
                    divxTagData
                ));
            }

            // Reread the file to figure out where the RIFF tag blocks should go
            // NOTE: I suppose we could just store this info in the class when we first read in the
            //    file, but this *does* prevent problems if the file changes in between reading and
            //    wring.
            const readInfo = this.read(false, ReadStyle.None);

            // If tagging info cannot be found, place it at the end of the file
            if (readInfo.tagStart < 12 || readInfo.tagEnd < readInfo.tagStart) {
                readInfo.tagStart = this.length;
                readInfo.tagEnd = this.length;
            }

            const originalTagLength = readInfo.tagEnd - readInfo.tagStart;

            // If the tag isn't at the end of the file, try appending using padding to improve
            // write time now or for subsequent writes.
            if (readInfo.tagEnd !== this.length) {
                let paddingSize = originalTagLength - data.length - 8;
                if (paddingSize < 0) {
                    paddingSize = 1024;
                }

                data.addByteVector(ByteVector.concatenate(
                    ByteVector.fromString("JUNK"),
                    ByteVector.fromUInt(paddingSize, false),
                    ByteVector.fromSize(paddingSize)
                ));
            }

            // Insert the tagging data
            this.insert(data, readInfo.tagStart, originalTagLength);

            // If the data size changed, and the tagging data is within the RIFF portion of the
            // file, update the riff size
            if (data.length - originalTagLength !== 0 && readInfo.tagStart <= readInfo.riffSize) {
                const newRiffSize = ByteVector.fromUInt(readInfo.riffSize + data.length - originalTagLength, false);
                this.insert(newRiffSize, 4, 4);
            }

            // Update the tag types on disk
            this._tagTypesOnDisk = this.tagTypes;
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    private read(readTags: boolean, style: ReadStyle): {riffSize: number, tagEnd: number, tagStart: number} {
        this.mode = FileAccessMode.Read;

        try {
            // Make sure this is a RIFF file
            if (!ByteVector.equal(this.readBlock(4), RiffFile.FILE_IDENTIFIER)) {
                throw new CorruptFileError("File does not begin with RIFF identifier");
            }

            // Initialize our loop state
            const riffSize = this.readBlock(4).toUInt(false);
            const streamFormat = this.readBlock(4).toString();
            let tagStart = -1;
            let tagEnd = -1;
            let position = 12;
            let size = 0;
            let durationMilliseconds = 0;
            let codecs: ICodec[] = [];

            // Read until there are less than 8 bytes to read
            do {
                let tagFound = false;

                // Check if the current position is an odd number and increment it so it is even.
                // This is done when the previous chunk size was an odd number. If this is not
                // done, the chunk being read after the odd chunk will not be read.
                if (position > 12 && (position % 2) === 1) {
                    position++;
                }

                this.seek(position);
                const fourcc = this.readBlock(4).toString();
                size = this.readBlock(4).toUInt(false);

                switch (fourcc) {
                    case "fmt ":
                        // "fmt " is used by wave files to hold the WaveFormatEx structure
                        if (style === ReadStyle.None || streamFormat !== "WAVE") {
                            break;
                        }

                        this.seek(position + 8);
                        codecs = [new RiffWaveFormatEx(this.readBlock(18), 0)];
                        break;

                    case "data":
                        // "data" contains the audio data for wave files. It's contents represent
                        // the invariant portion of the file and is used to determine the duration
                        // of a file. It should always appear after "fmt ".
                        if (streamFormat !== "WAVE") {
                            break;
                        }

                        this._invariantStartPosition = position;
                        this._invariantEndPosition = position + size;

                        if (
                            style === ReadStyle.None ||
                            codecs.length !== 1 ||
                            !(codecs[0] instanceof RiffWaveFormatEx)
                        ) {
                            break;
                        }

                        const durationSeconds = size / (<RiffWaveFormatEx> codecs[0]).averageBytesPerSecond;
                        durationMilliseconds += durationSeconds * 1000;
                        break;

                    case "LIST":
                        // Lists are used to store a variety of data collections. Read the type and
                        // act on it.
                        switch (this.readBlock(4).toString()) {
                            case "hdrl":
                                // "hdrl" is used by AVI files to hold a media header and
                                // BitmapInfoHeader and WaveFormatEv structures.
                                if (style === ReadStyle.None || streamFormat !== "AVI ") {
                                    continue;
                                }

                                const headerList = new AviHeaderList(this, position + 12, size - 4);
                                durationMilliseconds = headerList.header.durationMilliseconds;
                                codecs = headerList.codecs;
                                break;

                            case "INFO":
                                // "INFO" is a tagging format handled by the InfoTag class
                                if (readTags && !this._infoTag) {
                                    this._infoTag = InfoTag.fromFile(this, position + 12, size - 4);
                                }

                                tagFound = true;
                                break;

                            case "MID ":
                                // "MID " is a tagging format handled by the MovieIdTag class
                                if (readTags && !this._movieIdTag) {
                                    this._movieIdTag = MovieIdTag.fromFile(this, position + 12, size - 4);
                                }

                                tagFound = true;
                                break;

                            case "movi":
                                // "movi" contains the media data for an AVI and its contents
                                // represent the inavariant portion of the file
                                if (streamFormat !== "AVI ") {
                                    break;
                                }

                                this._invariantStartPosition = position;
                                this._invariantEndPosition = position + size;
                                break;
                        }
                        break;

                    case "id3 ":
                    case "ID3 ":
                    case "ID32":
                        // "ID32" is a custom box for this format that contains an ID3v2 tag.
                        // "ID3 " and "id3 " have become defacto standards.
                        if (readTags && !this._id3v2Tag) {
                            this._id3v2Tag = Id3v2Tag.fromFile(this, position + 8, style);
                        }

                        tagFound = true;
                        break;

                    case "IDVX":
                        // "IDVX" is used by DivX and holds an ID3v1 style tag
                        if (readTags && !this._divxTag) {
                            this._divxTag = DivxTag.fromFile(this, position + 8);
                        }

                        tagFound = true;
                        break;

                    case "JUNK":
                        // "JUNK" is a padding element that could be associated with tag data.
                        if (tagEnd === position) {
                            tagEnd = position + 8 + size;
                        }
                        break;
                }

                // Determine the region of the file that contains tags.
                if (tagFound) {
                    if (tagStart === -1) {
                        tagStart = position;
                        tagEnd = position + 8 + size;
                    } else if (tagEnd === position) {
                        tagEnd = position + 8 + size;
                    }
                }

                // Move to the next item
                position += 8 + size;
            } while (position + 8 < length);

            // If we're reading properties and one was found, throw an exception. Otherwise
            // create the properties object
            if (style !== ReadStyle.None) {
                if (codecs.length === 0) {
                    throw new UnsupportedFormatError("Unsupported RIFF type");
                }

                this._properties = new Properties(durationMilliseconds, codecs);
            }

            // If we're reading tags, update the combined tag
            if (readTags) {
                this._tag.setTags(this._id3v2Tag, this._infoTag, this._movieIdTag, this._divxTag);
            }

            return {
                riffSize: riffSize,
                tagEnd: tagEnd,
                tagStart: tagStart
            };

        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    // #endregion
}
