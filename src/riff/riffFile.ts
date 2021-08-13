import AviHeader from "./avi/aviHeader";
import CombinedTag from "../combinedTag";
import DivxTag from "./divxTag";
import Id3v2Tag from "../id3v2/id3v2Tag";
import InfoTag from "./infoTag";
import IRiffChunk from "./iRiffChunk";
import MovieIdTag from "./movieIdTag";
import Properties from "../properties";
import RiffChunk from "./riffChunk";
import RiffList from "./riffList";
import RiffWaveFormatEx from "./riffWaveFormatEx";
import {ByteVector} from "../byteVector";
import {CorruptFileError, UnsupportedFormatError} from "../errors";
import {File, FileAccessMode, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {ICodec} from "../iCodec";
import {Id3v2TagHeaderFlags} from "../id3v2/id3v2TagHeader";
import {Tag, TagTypes} from "../tag";
import {NumberUtils} from "../utils";

export default class RiffFile extends File {
    public static readonly fileIdentifier = ByteVector.fromString("RIFF", undefined, undefined, true);

    private readonly _combinedTag: CombinedTag;
    private _divxChunkIndex: number;
    private _divxTag: DivxTag;
    private _fileType: string;
    private _id3v2ChunkIndex: number;
    private _id3v2Tag: Id3v2Tag;
    private _infoTagListIndex: number;
    private _infoTag: InfoTag;
    private _movidIdListIndex: number;
    private _movieIdTag: MovieIdTag;
    private _originalReadStyle: ReadStyle;
    private _properties: Properties;
    private _rawChunks: IRiffChunk[] = [];
    private _riffSize: number;

    /**
     * Constructs and initializes a new instance of a RIFF file based on the provided file/file path.
     * @param file File abstraction or path to a file to open as a RIFF file
     * @param propertiesStyle How in-depth to read the properties of the file
     */
    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file);

        // Read the file
        this.read(propertiesStyle);
        this._combinedTag = new CombinedTag();
        this._combinedTag.setTags(this._id3v2Tag, this._infoTag, this._movieIdTag, this._divxTag);
        this._originalReadStyle = propertiesStyle;

        // Make sure we have all the possible tags at our disposal
        // @TODO: Creating *all* the tag types sould probably be optional
        this.getTag(TagTypes.Id3v2, true);
        this.getTag(TagTypes.RiffInfo, true);
        this.getTag(TagTypes.MovieId, true);
        this.getTag(TagTypes.DivX, true);
    }

    // #region Properties

    /** @inheritDoc */
    public get properties(): Properties { return this._properties; }

    /** @inheritDoc */
    public get tag(): Tag { return this._combinedTag; }

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
                    this._combinedTag.copyTo(this._id3v2Tag, true);
                }

                tag = this._id3v2Tag;
                break;

            case TagTypes.RiffInfo:
                if (!this._infoTag) {
                    this._infoTag = InfoTag.fromEmpty();
                    this._combinedTag.copyTo(this._infoTag, true);
                }

                tag = this._infoTag;
                break;

            case TagTypes.MovieId:
                if (!this._movieIdTag) {
                    this._movieIdTag = MovieIdTag.fromEmpty();
                    this._combinedTag.copyTo(this._movieIdTag, true);
                }

                tag = this._movieIdTag;
                break;

            case TagTypes.DivX:
                if (!this._divxTag) {
                    this._divxTag = DivxTag.fromEmpty();
                    this._combinedTag.copyTo(this._divxTag, true);
                }

                tag = this._movieIdTag;
                break;
        }

        this._combinedTag.setTags(this._id3v2Tag, this._infoTag, this._movieIdTag, this._divxTag);
        return tag;
    }

    /** @inheritDoc */
    public removeTags(types: TagTypes): void {
        if (NumberUtils.uintAnd(types, TagTypes.Id3v2) !== TagTypes.None) {
            this._id3v2Tag = undefined;
        }
        if (NumberUtils.uintAnd(types, TagTypes.RiffInfo) !== TagTypes.None) {
            this._infoTag = undefined;
        }
        if (NumberUtils.uintAnd(types, TagTypes.MovieId) !== TagTypes.None) {
            this._movieIdTag = undefined;
        }
        // noinspection JSSuspiciousNameCombination
        if (NumberUtils.uintAnd(types, TagTypes.DivX) !== TagTypes.None) {
            this._divxTag = undefined;
        }

        this._combinedTag.setTags(this._id3v2Tag, this._infoTag, this._movieIdTag, this._divxTag);
    }

    /** @inheritDoc */
    public save(): void {
        this.preSave();

        this.mode = FileAccessMode.Write;
        try {
            // Determine the boundaries of the tagging chunks
            const taggingChunkIndexes = [];
            if (this._divxChunkIndex !== undefined) { taggingChunkIndexes.push(this._divxChunkIndex); }
            if (this._id3v2ChunkIndex !== undefined) { taggingChunkIndexes.push(this._id3v2ChunkIndex); }
            if (this._infoTagListIndex !== undefined) { taggingChunkIndexes.push(this._infoTagListIndex); }
            if (this._movidIdListIndex !== undefined ) { taggingChunkIndexes.push(this._movidIdListIndex); }
            taggingChunkIndexes.sort();

            // Render the tags we have
            const renderedTags = [];
            const replacedChunks: Array<{chunk: IRiffChunk, newTotalSize: number}> = [];
            if (this._id3v2Tag) {
                // @TODO: Allow chunk ID to be configurable
                const id3v2TagBytes = this._id3v2Tag.render();
                const id3v2TagChunk = RiffChunk.fromData("id3 ", id3v2TagBytes);
                replacedChunks.push({ chunk: id3v2TagChunk, newTotalSize: id3v2TagBytes.length });
                renderedTags.push(id3v2TagBytes);
            }
            if (this._infoTag) {
                const infoTagBytes = this._infoTag.render();
                replacedChunks.push({ chunk: this._infoTag.list, newTotalSize: infoTagBytes.length });
                renderedTags.push(infoTagBytes);

            }
            if (this._movieIdTag) {
                const movieIdBytes = this._movieIdTag.render();
                replacedChunks.push({ chunk: this._movieIdTag.list, newTotalSize: movieIdBytes.length });
                renderedTags.push(movieIdBytes);

            }
            if (this._divxTag) {
                const divxTagBytes = this._divxTag.render();
                const divxTagChunk = RiffChunk.fromData(DivxTag.CHUNK_FOURCC, divxTagBytes);
                replacedChunks.push({ chunk: divxTagChunk, newTotalSize: divxTagBytes.length });
                renderedTags.push(divxTagBytes);
            }
            const renderedTagBytes = ByteVector.concatenate(... renderedTags);

            // Did the file originally have tags?
            let taggingChunkStartIndex: number;
            let taggingChunkStart: number;
            let taggingChunkLength: number = 0;
            if (taggingChunkIndexes.length > 0) {
                // Determine if the chunks are contiguous
                let taggingChunksAreContiguous = true;
                for (let i = 1; i < taggingChunkIndexes.length && taggingChunksAreContiguous; i++) {
                    const chunkIndexA = taggingChunkIndexes[i - 1];
                    const chunkIndexB = taggingChunkIndexes[i];
                    let chunkIndexC = chunkIndexA + 1;
                    while (chunkIndexC < chunkIndexB) {
                        // It's ok if we have A-JUNK-JUNK-JUNK-B, but A-X-B is not ok
                        const chunkC = this._rawChunks[chunkIndexC];
                        if (chunkC.fourcc !== "JUNK") {
                            taggingChunksAreContiguous = false;
                            break;
                        }

                        chunkIndexC++;
                    }
                }

                // Are the chunks contiguous?
                if (taggingChunksAreContiguous) {
                    // Awesome, the chunks are contiguous, we can update this in one big write
                    // operation
                    // Find any trailing JUNK chunks
                    let lastChunkIndex = taggingChunkIndexes[taggingChunkIndexes.length - 1];
                    let junkSize = 0;
                    while (lastChunkIndex + 1 < this._rawChunks.length && this._rawChunks[lastChunkIndex + 1].fourcc === "JUNK") {
                        lastChunkIndex++;
                        junkSize += this._rawChunks[lastChunkIndex].originalTotalSize;
                    }

                    // Calculate tagging chunks start/length
                    taggingChunkStartIndex = taggingChunkIndexes[0];
                    taggingChunkStart = this._rawChunks[taggingChunkStartIndex].chunkStart;
                    taggingChunkLength = this._rawChunks[lastChunkIndex].chunkStart
                        + this._rawChunks[lastChunkIndex].originalTotalSize
                        - taggingChunkStart;

                    // Remove the chunks from the chunk list
                    // NOTE: After this point, the chunk list and file contents have diverged (but
                    //    it's ok b/c we will update the whole thing as part of writing the tags
                    //    back out)
                    this._rawChunks.splice(taggingChunkStartIndex, lastChunkIndex - taggingChunkIndexes[0]);
                } else {
                    // Crud, we can't update in one big write. Let's delete each tagging chunk,
                    // then write them all in a giant block later. This process will be slow on
                    // large files, but future saves should be improved.
                    for (const chunkIndex of taggingChunkIndexes) {
                        // Find any trailing JUNK chunks
                        let lastChunkIndex = chunkIndex;
                        while (
                            lastChunkIndex + 1 < this._rawChunks.length &&
                            this._rawChunks[lastChunkIndex + 1].fourcc === "JUNK"
                        ) {
                            lastChunkIndex++;
                        }

                        // Remove the tag chunk and any JUNK chunks, update start positions for
                        // subsequent chunks
                        const blockStart = this._rawChunks[chunkIndex].chunkStart;
                        const blockLength = this._rawChunks[lastChunkIndex].chunkStart
                            + this._rawChunks[lastChunkIndex].originalTotalSize
                            - blockStart;
                        this.removeBlock(blockStart, blockLength);
                        this._rawChunks.splice(chunkIndex, lastChunkIndex - chunkIndex);
                        this.updateChunkPositions(chunkIndex, -blockLength);
                    }
                }
            }

            // If we don't know where to insert the tags, try to insert them before movi/data chunk,
            // failing that, insert at end of the file.
            if (taggingChunkStart === undefined) {
                const moviChunkId = this._rawChunks.findIndex((c) => c.fourcc === "movi" || c.fourcc === "data");
                if (moviChunkId >= 0) {
                    taggingChunkStartIndex = moviChunkId;
                    taggingChunkStart = this._rawChunks[taggingChunkStartIndex].chunkStart;
                } else {
                    taggingChunkStartIndex = this._rawChunks.length;
                    taggingChunkStart = this.length;
                }
            }

            // Determine new JUNK chunk size
            let junkLength: number;
            if (renderedTagBytes.length + 8 < taggingChunkLength) {
                // New tags are smaller, so use the difference as the size of the JUNK chunk
                junkLength = taggingChunkLength - renderedTagBytes.length + 8;
            } else {
                // New tags are same size or larger, so insert a JUNK chunk for future padding
                // @TODO: Let padding size be configurable
                junkLength = 1024;
            }
            const junkChunk = RiffChunk.fromData("JUNK", ByteVector.fromSize(junkLength));
            const junkBytes = junkChunk.render();
            renderedTagBytes.addByteVector(junkBytes);
            replacedChunks.push({ chunk: junkChunk, newTotalSize: junkBytes.length });

            // Write the big block to the file
            this.insert(renderedTagBytes, taggingChunkStart, taggingChunkLength);

            // Update the chunk list
            this.updateChunkPositions(taggingChunkStartIndex, renderedTagBytes.length - taggingChunkLength);
            this._rawChunks.splice(taggingChunkStartIndex, 0, ... replacedChunks.map((rc) => rc.chunk));
            let filePosition = taggingChunkStart;
            for (const replacedChunk of replacedChunks) {
                replacedChunk.chunk.chunkStart = filePosition;
                replacedChunk.chunk.originalTotalSize = replacedChunk.newTotalSize;
                filePosition += replacedChunk.chunk.originalTotalSize;
            }
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

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
                position += chunk.originalTotalSize;
                this._rawChunks.push(chunk);
            }

            // Process the properties of the file
            let codecs: ICodec[];
            let durationMilliseconds = 0;
            if ((readStyle & ReadStyle.Average) !== 0) {
                switch (this._fileType) {
                    case "WAVE":
                        // This is a wav file, search for fmt chunk
                        const fmtChunk = this._rawChunks.find((c) => c.fourcc === RiffWaveFormatEx.CHUNK_FOURCC);
                        if (!fmtChunk) {
                            throw new CorruptFileError("WAV file is missing header chunk");
                        }

                        const waveHeader = new RiffWaveFormatEx((<RiffChunk> fmtChunk).data);
                        codecs = [waveHeader];
                        durationMilliseconds = waveHeader.durationMilliseconds;
                        break;

                    case "AVI ":
                        // This is an AVI file, search for the hdrl list
                        const aviHeaderList = this._rawChunks.find((c) => {
                            return c.fourcc === RiffList.identifierFourcc
                                && (<RiffList> c).type === AviHeader.headerListType;
                        });
                        const aviHeader = new AviHeader(<RiffList> aviHeaderList);
                        codecs = aviHeader.codecs;
                        durationMilliseconds = aviHeader.durationMilliseconds;
                        break;

                    default:
                        throw new UnsupportedFormatError("Unsupported RIFF type");
                }
            }

            this._properties = new Properties(durationMilliseconds, codecs);

            // Process tags
            // 1) DivX
            this._divxChunkIndex = this._rawChunks.findIndex((c) => c.fourcc === DivxTag.CHUNK_FOURCC);
            if (this._divxChunkIndex !== undefined) {
                this._divxTag = DivxTag.fromData((<RiffChunk> this._rawChunks[this._divxChunkIndex]).data);
            }

            // 2) ID3v2
            const id3v2ChunkFourcc = ["id3 ", "ID3 ", "ID32"];
            this._id3v2ChunkIndex = this._rawChunks.findIndex((c) => id3v2ChunkFourcc.indexOf(c.fourcc) >= 0);
            if (this._id3v2ChunkIndex !== undefined) {
                // @TODO: Switch to fromFile and using chunk start/data length to allow lazy picture loading
                this._id3v2Tag = Id3v2Tag.fromData((<RiffChunk> this._rawChunks[this._id3v2ChunkIndex]).data);
            }

            // 3) Info tag
            this._infoTagListIndex = this._rawChunks.findIndex((c) => {
                return c.fourcc === RiffList.identifierFourcc
                    && (<RiffList> c).type === InfoTag.listType;
            });
            if (this._infoTagListIndex !== undefined) {
                this._infoTag = InfoTag.fromList(<RiffList> this._rawChunks[this._infoTagListIndex]);
            }

            // 4) MovieID tag
            this._movidIdListIndex = this._rawChunks.findIndex((c) => {
                return c.fourcc === RiffList.identifierFourcc
                    && (<RiffList> c).type === MovieIdTag.listType;
            });
            if (this._movidIdListIndex !== undefined) {
                this._movieIdTag = MovieIdTag.fromList(<RiffList> this._rawChunks[this._movidIdListIndex]);
            }

        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    private updateChunkPositions(chunkIndex: number, filePositionOffset: number): void {
        for (let i = chunkIndex; i < this._rawChunks.length; i++) {
            this._rawChunks[i].chunkStart += filePositionOffset;
        }
    }

    // #endregion
}

////////////////////////////////////////////////////////////////////////////
// Register the file type
[
    "taglib/avi",
    "taglib/wav",
    "taglib/divx",
    "video/avi",
    "video/msvideo",
    "video/x-msvideo",
    "image/avi",
    "application/x-troff-msvideo",
    "audio/avi",
    "audio/wav",
    "audio/wave",
    "audio/x-wav"
].forEach((mt) => File.addFileType(mt, RiffFile));
