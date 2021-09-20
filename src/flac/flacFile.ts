import EndTag from "../sandwich/endTag";
import FlacFileSettings from "./flacFileSettings";
import FlacStreamHeader from "./flacStreamHeader";
import FlacTag from "./flacTag";
import Properties from "../properties";
import StartTag from "../sandwich/startTag";
import XiphComment from "../xiph/xiphComment";
import XiphPicture from "../xiph/xiphPicture";
import {ByteVector, StringType} from "../byteVector";
import {CorruptFileError} from "../errors";
import {File, FileAccessMode, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {FlacBlock, FlacBlockType} from "./flacBlock";
import {ISandwichFile} from "../sandwich/sandwichFile";
import {Tag, TagTypes} from "../tag";

/**
 * This class extends {@link File} to provide tagging and properties for FLAC audio files.
 * @remarks A FLAC file is usually tagged using a Xiph comment block with pictures stored in
 *     special FLAC picture blocks. Additionally, like many other file types, ID3v1, ID3v2, and APE
 *     tags can be added to used to tag a FLAC file by storing them at the beginning or end of the
 *     file. To control the type of tags that are created by default when opening the file, see
 *     {@link FlacFileSettings}.
 */
export default class FlacFile extends File implements ISandwichFile {
    public static readonly fileIdentifier = ByteVector.fromString("fLaC", StringType.Latin1, undefined, true);

    private readonly _blocks: FlacBlock[];
    private readonly _properties: Properties;
    private readonly _tag: FlacTag;
    private _mediaEndPosition: number;
    private _mediaStartPosition: number;

    /**
     * Constructs and initializes a new instance of a FLAC file based on the provided file.
     * @param file File abstraction or path to a file to open as a FLAC file
     * @param propertiesStyle How in-depth to read the properties of the file
     */
    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file);

        this.mode = FileAccessMode.Read;
        try {
            // Read start and end tags to determine the media start/end position
            const startTag = new StartTag(this, propertiesStyle);
            this._mediaStartPosition = startTag.sizeOnDisk;
            const endTag = new EndTag(this, propertiesStyle);
            this._mediaEndPosition = this.length - endTag.sizeOnDisk;

            // Read blocks
            this._blocks = this.readMetadataBlocks();

            // Read properties, flac pictures, and Xiph comment
            this._properties = this.readProperties(propertiesStyle);
            const pictures = this.readPictures(propertiesStyle);
            const xiphComment = this.readXiphComments(propertiesStyle);

            this._tag = new FlacTag(startTag, endTag, xiphComment, pictures);
            this._tagTypesOnDisk = this._tag.tagTypes;
        } finally {
            this.mode = FileAccessMode.Closed;
        }

        // Create default tags
        // NOTE: We are adding ID3v1 tag last because it is the least flexible and will not store
        //    complete tag information.
        const allTagTypes = [TagTypes.Xiph, TagTypes.Id3v2, TagTypes.Ape, TagTypes.Id3v1];
        for (const tagType of allTagTypes) {
            if ((FlacFileSettings.defaultTagTypes & tagType) === 0 || (this._tag.tagTypes & tagType) !== 0) {
                continue;
            }

            // Desired tag does not exist, create it
            this._tag.createTag(tagType, true);
        }
    }

    // #region Properties

    public get mediaEndPosition(): number { return this._mediaEndPosition; }

    public get mediaStartPosition(): number { return this._mediaStartPosition; }

    public get properties(): Properties { return this._properties; }

    public get tag(): FlacTag { return this._tag; }

    // #endregion

    // #region Methods

    /** @inheritDoc */
    public getTag(type: TagTypes, create: boolean): Tag {
        // Try to get the desired tag
        const tag = this._tag.getTag(type);
        if (tag || !create) {
            return tag;
        }

        // Tag could not be found, create one
        return this._tag.createTag(type, false);
    }

    /** @inheritDoc */
    public removeTags(types: TagTypes): void {
        this._tag.removeTags(types);
    }

    /** @inheritDoc */
    public save(): void {
        this.preSave();

        this.mode = FileAccessMode.Write;
        try {
            // Step 1) Remove the FLAC picture and Xiph comment blocks
            const typesToRemove = FlacBlockType.XiphComment | FlacBlockType.Picture;
            for (let i = this._blocks.length - 1; i >= 0; i--) {
                const block = this._blocks[i];
                if ((block.type & typesToRemove) === 0) {
                    continue;
                }

                // Remove block from the file, block list, and update the other blocks
                this.removeBlock(block.blockStart, block.totalSize);
                this._blocks.splice(i, 1);
                this.updateBlockPositions(i, -block.totalSize);
                this._mediaEndPosition -= block.totalSize;
            }

            // Step 2) Write out XIPH comment and FLAC pictures
            // 2.1) Render and write the tags
            const taggingBlocks = this._tag.renderPictures()
                .map((p) => FlacBlock.fromData(FlacBlockType.Picture, p));
            const pictureBlocksBytes = taggingBlocks.map((b) => b.render(false));
            const taggingBytes = ByteVector.concatenate(... pictureBlocksBytes);

            if (this._tag.xiphComment) {
                const xiphData = this._tag.xiphComment.render(false);
                const xiphBlock = FlacBlock.fromData(FlacBlockType.XiphComment, xiphData);
                taggingBlocks.unshift(xiphBlock);

                const xiphBytes = xiphBlock.render(false);
                taggingBytes.insertByteVector(0, xiphBytes);
            }

            this.insert(taggingBytes, this._mediaStartPosition, 0);

            // 2.2) Update the block state
            this.updateBlockPositions(0, taggingBytes.length);
            this._mediaEndPosition += taggingBytes.length;
            this._blocks.unshift(... taggingBlocks);

            let runningOffset = this._mediaStartPosition;
            for (const block of taggingBlocks) {
                block.blockStart = runningOffset;
                runningOffset += block.totalSize;
            }

            // Step 3) Write out the tags at the end of the file
            const endTagBytes = this._tag.endTag.render();
            const endBytesToRemove = this.length - this._mediaEndPosition;
            this.insert(endTagBytes, this._mediaEndPosition, endBytesToRemove);

            // Step 4) Write out the tags at the start of the file
            const startTagBytes = this._tag.startTag.render();
            this.insert(startTagBytes, 0, this._mediaStartPosition);

            // Step 5) Calculate new start and end positions, update blocks one last time
            const oldMediaStart = this._mediaStartPosition;
            this._mediaStartPosition = startTagBytes.length;
            this._mediaEndPosition = this.length - endTagBytes.length;

            this.updateBlockPositions(0, this._mediaStartPosition - oldMediaStart);

            this._tagTypesOnDisk = this.tagTypes;

        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    private readMetadataBlocks(): FlacBlock[] {
        // Make sure we've got the header at the beginning of the file
        this.seek(this._mediaStartPosition);
        if (ByteVector.notEqual(this.readBlock(4), FlacFile.fileIdentifier)) {
            throw new CorruptFileError("FLAC header not found after any starting tags");
        }

        // Read the blocks of the file
        let position = this.position;
        const blocks: FlacBlock[] = [];
        do {
            const block = FlacBlock.fromFile(this, position);
            blocks.push(block);

            position += block.totalSize;
        } while (!blocks[blocks.length - 1].isLastBlock && position < this.length);

        return blocks;
    }

    private readPictures(readStyle: ReadStyle): XiphPicture[] {
        return this._blocks.filter((b) => b.type === FlacBlockType.Picture)
            .map((b) => XiphPicture.fromFlacBlock(b, (readStyle & ReadStyle.PictureLazy) !== 0));
    }

    private readProperties(readStyle: ReadStyle): Properties {
        if ((readStyle & ReadStyle.Average) === 0) {
            return undefined;
        }

        // Check that the first block is a METADATA_BLOCK_STREAMINFO
        if (this._blocks.length === 0 || this._blocks[0].type !== FlacBlockType.StreamInfo) {
            throw new CorruptFileError("FLAC stream does not begin with StreamInfo block");
        }

        // @TODO: For precise calculation, read the audio frames
        const lastBlock = this._blocks[this._blocks.length - 1];
        const metadataEndPosition = lastBlock.blockStart + lastBlock.dataSize + FlacBlock.headerSize;
        const streamLength = this._mediaEndPosition - metadataEndPosition;
        const header = new FlacStreamHeader(this._blocks[0].data, streamLength);

        return new Properties(header.durationMilliseconds, [header]);
    }

    private readXiphComments(_readStyle: ReadStyle): XiphComment {
        // Collect all the xiph comments
        const xiphComments = this._blocks.filter((b) => b.type === FlacBlockType.XiphComment)
            .map((b) => XiphComment.fromData(b.data));

        // If we don't have any Xiph comments, just return undefined
        if (xiphComments.length === 0) {
            return undefined;
        }

        // If we only have one Xiph comment (as should be the norm), just return it
        if (xiphComments.length === 1) {
            return xiphComments[0];
        }

        // We have more than one xiph comment. Copy them all into one to normalize
        return xiphComments.reduce(
            (accum, xc) => {
                xc.copyTo(accum, true);
                return accum;
            },
            XiphComment.fromEmpty()
        );
    }

    private updateBlockPositions(blockIndex: number, filePositionOffset: number ): void {
        for (let i = blockIndex; i < this._blocks.length; i++) {
            this._blocks[i].blockStart += filePositionOffset;
        }
    }

    // #endregion
}

////////////////////////////////////////////////////////////////////////////
// Register the file type
[
    "taglib/flac",
    "audio/x-flac",
    "audio/flc",
    "application/x-flac"
].forEach((mt) => File.addFileType(mt, FlacFile));
