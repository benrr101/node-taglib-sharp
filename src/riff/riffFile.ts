import {File, FileAccessMode, ReadStyle} from "../file";
import CombinedTag from "../combinedTag";
import Id3v2Tag from "../id3v2/id3v2Tag";
import Properties from "../properties";
import {ByteVector} from "../byteVector";
import {IFileAbstraction} from "../fileAbstraction";
import {CorruptFileError} from "../errors";

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
            const streamFormat = this.readBlock(4);
            let tagStart = -1;
            let tagEnd = -1;
            let position = 12;
            let size = 0;
            let durationMilliseconds = 0;
            let codecs = [];

            // Read until there are less than 8 bytes to read
            do {

            } while ((position += 8 + size) + 8 < length);

        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    // #endregion
}
