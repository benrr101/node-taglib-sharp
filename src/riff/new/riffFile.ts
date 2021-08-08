import RiffChunk from "./riffChunk";
import {File, FileAccessMode, ReadStyle} from "../../file";
import {ByteVector} from "../../byteVector";
import {CorruptFileError, UnsupportedFormatError} from "../../errors";
import {ICodec} from "../../iCodec";
import RiffWaveFormatEx from "../riffWaveFormatEx";
import RiffList from "./riffList";
import Properties from "../../properties";
import DivxTag from "../divxTag";
import Id3v2Tag from "../../id3v2/id3v2Tag";
import InfoTag from "./infoTag";
import MovieIdTag from "../movieIdTag";
import IRiffChunk from "./iRiffChunk";

export default class RiffFile extends File {
    public static readonly fileIdentifier = ByteVector.fromString("RIFF", undefined, undefined, true);

    private _divxTag: DivxTag;
    private _fileType: string;
    private _id3v2Tag: Id3v2Tag;
    private _infoTag: InfoTag;
    private _movieIdTag: MovieIdTag;
    private _rawChunks: IRiffChunk[] = [];
    private _riffSize: number;

    private read(readStyle: ReadStyle): void {
        this.mode = FileAccessMode.Read;

        try {
            // Read the header of the file
            if (!ByteVector.equal(this.readBlock(4), RiffFile.fileIdentifier)) {
                throw new CorruptFileError("File does not begin with RIFF identifier");
            }
            this._riffSize = this.readBlock(4).toUInt(false);
            this._fileType = this.readBlock(4).toString();

            // Read chunks until there are less than 8 bytes to read
            let position = this.position;
            while (position + 8 < this.length) {
                const fourcc = this.readBlock(4).toString();
                const chunk = fourcc === RiffList.identifierFourcc
                    ? RiffList.fromFile(this, position)
                    : RiffChunk.fromFile(this, fourcc, position);
                position += chunk.totalSize;
                this._rawChunks.push(chunk);
            }

            // Process the properties of the file
            let codecs: ICodec[];
            if ((readStyle & ReadStyle.Average) !== 0) {
                switch (this._fileType) {
                    case "WAVE":
                        // This is a wav file, search for fmt chunk
                        const fmtChunk = this._rawChunks.find((c) => c.fourcc === "fmt ");
                        if (!fmtChunk) {
                            throw new CorruptFileError("WAV file is missing header chunk");
                        }

                        codecs = [new RiffWaveFormatEx(fmtChunk.data, 0)];
                        break;
                    case "AVI ":
                        // This is an AVI file, search for the hdrl list
                    default:
                        throw new UnsupportedFormatError("Unsupported RIFF type");
                }
            }

            this._properties = new Properties(, codecs);

            // Process tags
            // 1) DivX
            const divxTagChunk = this._rawChunks.find((c) => c.fourcc === "IDVX");
            if (divxTagChunk) {
                this._divxTag = DivxTag.fromData((<RiffChunk> divxTagChunk).data);
            }

            // 2) ID3v2
            const id3ChunkFourcc = ["id3 ", "ID3 ", "ID32"];
            const id3v2TagChunk = this._rawChunks.find((c) => id3ChunkFourcc.indexOf(c.fourcc) >= 0);
            if (id3ChunkFourcc) {
                // @TODO: Switch to fromFile and using chunk start/data length to allow lazy picture loading
                this._id3v2Tag = Id3v2Tag.fromData((<RiffChunk> id3v2TagChunk).data);
            }

            // 3) Info tag
            const infoTagChunk = this._rawChunks.find((c) => {
                return c.fourcc === RiffList.identifierFourcc
                    && (<RiffList> c).type === InfoTag.listType;
            });
            if (infoTagChunk) {
                this._infoTag = InfoTag.fromDictionary((<RiffList> infoTagChunk).dictionary);
            }

            // 4) MovieID tag
            const movieIdTagChunk = this._rawChunks.find((c) => {
                return c.fourcc === RiffList.identifierFourcc
                    && (<RiffList> c).type === MovieIdTag.listType;
            });
            if (movieIdTagChunk) {
                this._movieIdTag = MovieIdTag.fromDictionary((<RiffList> movieIdTagChunk).dictionary);
            }

        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }
}
