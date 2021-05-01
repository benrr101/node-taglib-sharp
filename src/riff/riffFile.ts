import {File, FileAccessMode, ReadStyle} from "../file";
import CombinedTag from "../combinedTag";
import Id3v2Tag from "../id3v2/id3v2Tag";
import Properties from "../properties";
import {ByteVector} from "../byteVector";
import {IFileAbstraction} from "../fileAbstraction";
import {CorruptFileError} from "../errors";
import RiffWaveFormatEx from "./riffWaveFormatEx";
import {ICodec} from "../iCodec";
import {AviHeaderList} from "./aviHeaderList";

export default class RiffFile extends File {
    /**
     * Identifier used to recognize a RIFF file.
     */
    public static readonly FILE_IDENTIFIER = ByteVector.fromString("RIFF");

    private readonly _tag: CombinedTag = new CombinedTag();
    private _divxTag: DivxTag;
    private _id3v2Tag: Id3v2Tag;
    private _infoTag: InfoTag;
    private _properties: Properties;
    private _movieIdTag: MovieIdTag;

    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file);

        this.read(true, propertiesStyle);
        // TODO: create tags here? Look how MP3 is doing it
    }

    // #region Properties

    // #endregion

    // #region Methods

    private read(readTags: boolean, style: ReadStyle): void {
        this.mode = FileAccessMode.Read;

        try {
            // Make sure this is a RIFF file
            if (!ByteVector.equal(this.readBlock(4), RiffFile.FILE_IDENTIFIER)) {
                throw new CorruptFileError("File does not begin with RIFF identifier");
            }

            // Initialize our loop state
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
                                    this._infoTag = new InfoTag(this, position + 12, size - 4);
                                }

                                tagFound = true;
                                break;

                            case "MID ":
                                // "MID " is a tagging format handled by the MovieIdTag class
                                if (readTags && !this._movieIdTag) {
                                    this._movieIdTag = new MovieIdTag(this, position + 12, size - 4);
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
                            this._divxTag = new DivxTag(this, position + 8);
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



            } while ((position += 8 + size) + 8 < length);

        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    // #endregion
}
