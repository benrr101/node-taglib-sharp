import Id3v2Tag from "../id3v2/id3v2Tag";
import Properties from "../properties";
import {ByteVector} from "../byteVector";
import {File, FileAccessMode, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {Tag, TagTypes} from "../tag";
import {SeekOrigin} from "../stream";
import {CorruptFileError} from "../errors";
import AiffStreamHeader from "./aiffStreamHeader";

export default class AiffFile extends File {

    // #region Constants

    /**
     * Identifier used to recognize an AIFF form type.
     */
    // @TODO: Add support for AIFF-C files - it's pretty much the same
    public static readonly aiffFormType = ByteVector.fromString("AIFF", undefined, undefined, true);

    /**
     * Identifier used to recognize an AIFF common chunk.
     */
    public static readonly commIdentifier = ByteVector.fromString("COMM", undefined, undefined, true);

    /**
     * Identifier used to recognize an AIFF file.
     */
    public static readonly fileIdentifier = ByteVector.fromString("FORM", undefined, undefined, true);

    /**
     * Identifier used to recognize an AIFF ID3 chunk.
     */
    public static readonly id3Identifier = ByteVector.fromString("ID3 ", undefined, undefined, true);

    /**
     * Identifier used to recognize an AIFF sound data chunk.
     */
    public static readonly soundIdentifier = ByteVector.fromString("SSND", undefined, undefined, true);

    // #endregion

    private _headerBlock: ByteVector;
    private _properties: Properties;
    private _tag: Id3v2Tag;

    /**
     * Constructs and initializes a new instance of {@link AiffFile} for a specified file
     * abstraction and specified read style.
     * @param file File abstraction to use when reading and writing to the file
     * @param propertiesStyle Level of accuracy to read the media properties, or
     *     {@link ReadStyle.None} to ignore the properties
     */
    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file);

        // Read the file
        this.mode = FileAccessMode.Read;
        try {
            this.read(true, propertiesStyle);
        } finally {
            this.mode = FileAccessMode.Closed;
        }

        // Retrieve the tag
        this._tagTypesOnDisk = this.tagTypes;
        this.getTag(TagTypes.Id3v2, true);
    }

    // #region Properties

    /** @inheritDoc */
    public get properties(): Properties { return this._properties; }

    /** @inheritDoc */
    public get tag(): Tag { return this._tag; }

    // #endregion

    // #region Public Methods

    /** @inheritDoc */
    public getTag(type: TagTypes, create: boolean): Tag {
        let id3v2Tag: Tag;

        switch (type) {
            case TagTypes.Id3v2:
                if (!this._tag && create) {
                    this._tag = Id3v2Tag.fromEmpty();
                    this._tag.version = 2;
                }

                id3v2Tag = this._tag;
                break;
        }

        return id3v2Tag;
    }

    /** @inheritDoc */
    public removeTags(types: TagTypes): void {
        if ((types & TagTypes.Id3v2) > 0) {
            this._tag = undefined;
        }
    }

    /** @inheritDoc */
    public save(): void {
        this.preSave();

        this.mode = FileAccessMode.Write;
        try {
            const data = ByteVector.empty();

            // Add the ID3 chunk and ID3v2 tag to the vector
            if (!!this._tag) {
                const tagData = this._tag.render();
                if (tagData.length > 10) {
                    // Add padding if tag data length is odd
                    if (tagData.length % 2 === 1) {
                        tagData.addByte(0);
                    }

                    data.addByteVector(AiffFile.id3Identifier);
                    data.addByteVector(ByteVector.fromUInt(tagData.length, true));
                    data.addByteVector(tagData);
                }
            }

            const readResult = this.read(false, ReadStyle.None);

            // If tagging info cannot be found, place it at the end of the file
            if (readResult.tagStart < 12 || readResult.tagEnd < readResult.tagStart) {
                readResult.tagStart = readResult.tagEnd = this.length;
            }
            let length = readResult.tagEnd - readResult.tagStart + 8;

            // Insert the tagging data
            this.insert(data, readResult.tagStart, length);

            // If the data size changed, update the AIFF size
            if (data.length - length !== 0 && readResult.tagStart <= readResult.aiffSize) {
                // Depending, if a tag has been added or removed, the length needs to be adjusted
                if (!this._tag) {
                    length -= 16;
                } else {
                    length -= 8;
                }

                this.insert(ByteVector.fromUInt(readResult.aiffSize + data.length - length, true), 4, 4);
            }

            // Update the tag types
            this._tagTypesOnDisk = this.tagTypes;
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    // #endregion

    // #region Private Helpers

    private findChunk(chunkName: ByteVector, startPos: number): number {
        const initialPosition = this.position;
        try {
            // Start at the given position
            this.seek(startPos);

            // While we're not at the end of the file
            while (this.position < this.length) {
                // Read 4-byte chunk name
                const chunkHeader = this.readBlock(4);
                if (ByteVector.equal(chunkHeader, chunkName)) {
                    // We found a matching chunk, return the position of the header start
                    return this.position - 4;
                } else {
                    // This chunk is not the one we are looking for
                    // Continue the search, seeking over the chunk
                    const chunkSize = this.readBlock(4).toUInt();
                    this.seek(chunkSize, SeekOrigin.Current);
                }
            }

            // We did not find the chunk
            return -1;
        } finally {
            // Reset the position to where we started
            this.seek(initialPosition);
        }
    }

    private read(readTags: boolean, style: ReadStyle): {aiffSize: number, tagEnd: number, tagStart: number} {
        this.seek(0);
        if (!ByteVector.equal(this.readBlock(4), AiffFile.fileIdentifier)) {
            throw new CorruptFileError("File does not begin with AIFF identifier");
        }

        const aiffSize = this.readBlock(4).toUInt(true);
        let tagStart = -1;
        let tagEnd = -1;

        // Check form type
        if (!ByteVector.equal(this.readBlock(4), AiffFile.aiffFormType)) {
            throw new CorruptFileError("File form type is not AIFF");
        }
        const formBlockChunkPosition = this.position;

        // Read the properties of the file
        if (!this._headerBlock && style !== ReadStyle.None) {
            const commonChunkPos = this.findChunk(AiffFile.commIdentifier, formBlockChunkPosition);
            if (commonChunkPos === -1) {
                throw new CorruptFileError("No common chunk available in this AIFF file");
            }

            this.seek(commonChunkPos);
            this._headerBlock = this.readBlock(AiffStreamHeader.size);

            const header = new AiffStreamHeader(this._headerBlock, aiffSize);
            this._properties = new Properties(0, [header]);
        }

        // Search for the ID3 chunk
        const id3ChunkPos = this.findChunk(AiffFile.id3Identifier, formBlockChunkPosition);

        // Search for the sound chunk
        const soundChunkPos = this.findChunk(AiffFile.soundIdentifier, formBlockChunkPosition);

        // Ensure there is a sound chunk for the file to be valid
        if (soundChunkPos === -1) {
            throw new CorruptFileError("No sound chunk available in this AIFF file");
        }

        // Get the length of the sound chunk and use this as a start value to look for ID3 chunk
        this.seek(soundChunkPos + 4);

        // Read the ID3 chunk
        if (id3ChunkPos >= 0) {
            if (readTags && !this._tag) {
                this._tag = Id3v2Tag.fromFile(this, id3ChunkPos + 8, style);
            }

            // Get the length of the tag from the ID3 chunk
            this.seek(id3ChunkPos + 4);
            const tagSize = this.readBlock(4).toUInt(true) + 8;

            tagStart = this._invariantStartPosition = id3ChunkPos;
            tagEnd = this._invariantEndPosition = tagStart + tagSize;
        }

        return {
            aiffSize: aiffSize,
            tagEnd: tagEnd,
            tagStart: tagStart
        };
    }

    // #endregion
}

////////////////////////////////////////////////////////////////////////////
// Register the file type
[
    "taglib/aif",
    "taglib/aiff",
    "audio/x-aiff",
    "audio/aiff",
    "sound/aiff",
    "application/x-aiff"
].forEach((mt) => File.addFileType(mt, AiffFile));
