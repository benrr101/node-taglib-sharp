import { ByteVector } from "../byteVector";
import { File, FileAccessMode, ReadStyle } from "../file";
import { IFileAbstraction } from "../fileAbstraction";
import { Properties } from "../properties";
import { Tag, TagTypes } from "../tag";
import { NumberUtils } from "../utils";
import AppleTag from "./appleTag";
import {
    IsoAudioSampleEntry,
    IsoChunkLargeOffsetBox,
    IsoChunkOffsetBox,
    IsoMovieHeaderBox,
    IsoUserDataBox,
    IsoVisualSampleEntry,
} from "./mpeg4Boxes";
import Mpeg4BoxHeader from "./mpeg4BoxHeader";
import Mpeg4BoxType from "./mpeg4BoxType";
import Mpeg4FileParser from "./mpeg4FileParser";
import Mpeg4Tag from "./mpeg4Tag";

/**
 * Provides tagging and properties support for Mpeg4 files.
 */
export default class Mpeg4File extends File {
    /**
     * Contains the Apple tag.
     */
    private _appleTag: AppleTag;

    /**
     * Contains the combined tag.
     */
    private _tag: Mpeg4Tag;

    /**
     * Contains the media properties.
     */
    private _properties: Properties;

    /**
     * Contains the UDTA Boxes
     */
    private readonly _udtaBoxes: IsoUserDataBox[] = [];

    /**
     * The position at which the invariant portion of the current instance begins.
     */
    private _invariantStartPosition: number = -1;

    /**
     * The position at which the invariant portion of the current instance ends.
     */
    private _invariantEndPosition: number = -1;

    /** @inheritDoc */
    public constructor(file: IFileAbstraction | string, readStyle: ReadStyle) {
        super(file);

        this.read(readStyle);
    }

    private read(readStyle: ReadStyle): void {
        // TODO: Support Id3v2 boxes!!!
        this._tag = new Mpeg4Tag();
        this.mode = FileAccessMode.Read;

        try {
            // Read the file
            const parser = new Mpeg4FileParser(this);

            if ((readStyle & ReadStyle.Average) === 0) {
                parser.parseTag();
            } else {
                parser.parseTagAndProperties();
            }

            this._invariantStartPosition = parser.mdatStartPosition;
            this._invariantEndPosition = parser.mdatEndPosition;

            this._udtaBoxes.push(...parser.userDataBoxes);

            // Ensure our collection contains at least a single empty box
            if (this._udtaBoxes.length === 0) {
                const dummy = IsoUserDataBox.fromEmpty();
                this._udtaBoxes.push(dummy);
            }

            // Check if a udta with ILST actually exists
            if (this.isAppleTagUdtaPresent()) {
                // There is an udta present with ILST info
                this.tagTypesOnDisk = NumberUtils.uintOr(this.tagTypesOnDisk, TagTypes.Apple);
            }

            // Find the udta box with the Apple Tag ILST
            let udtaBox: IsoUserDataBox = this.findAppleTagUdta();
            if (udtaBox === null || udtaBox === undefined) {
                udtaBox = IsoUserDataBox.fromEmpty();
            }

            this._appleTag = new AppleTag(udtaBox);
            this._tag.addTag(this._appleTag);

            // If we're not reading properties, we're done.
            if ((readStyle & ReadStyle.Average) === 0) {
                this.mode = FileAccessMode.Closed;

                return;
            }

            // Get the movie header box.
            const mvhd_box: IsoMovieHeaderBox = parser.movieHeaderBox;

            if (mvhd_box === null || mvhd_box === undefined) {
                this.mode = FileAccessMode.Closed;
                throw new Error("mvhd box not found.");
            }

            const audio_sample_entry: IsoAudioSampleEntry = parser.audioSampleEntry;
            const visual_sample_entry: IsoVisualSampleEntry = parser.visualSampleEntry;

            // Read the properties.
            this._properties = new Properties(mvhd_box.durationInMilliseconds, [audio_sample_entry, visual_sample_entry]);
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    /** @inheritDoc */
    public get tag(): Mpeg4Tag {
        return this._tag;
    }

    /** @inheritDoc */
    public get properties(): Properties {
        return this._properties;
    }

    protected get udtaBoxes(): IsoUserDataBox[] {
        return this._udtaBoxes;
    }

    /** @inheritDoc */
    public getTag(types: TagTypes, create: boolean): Tag {
        if (types === TagTypes.Apple) {
            if ((this._appleTag === null || this._appleTag === undefined) && create) {
                let udtaBox: IsoUserDataBox = this.findAppleTagUdta();

                if (udtaBox === null || udtaBox === undefined) {
                    udtaBox = IsoUserDataBox.fromEmpty();
                }

                this._appleTag = new AppleTag(udtaBox);
                this.tag.setTags(this._appleTag);
            }

            return this._appleTag;
        }

        return undefined;
    }

    /** @inheritDoc */
    public removeTags(types: TagTypes): void {
        if ((types & TagTypes.Apple) !== TagTypes.Apple || this._appleTag === null || this._appleTag === undefined) {
            return;
        }

        this._appleTag.detachIlst();
        this._appleTag = undefined;
        this.tag.setTags();
    }

    /** @inheritDoc */
    public save(): void {
        // Boilerplate
        this.preSave();

        if (this.udtaBoxes.length === 0) {
            const udtaBox = IsoUserDataBox.fromEmpty();
            this.udtaBoxes.push(udtaBox);
        }

        // Try to get into write mode.
        this.mode = FileAccessMode.Write;

        try {
            const parser = new Mpeg4FileParser(this);
            parser.parseBoxHeaders();

            this._invariantStartPosition = parser.mdatStartPosition;
            this._invariantEndPosition = parser.mdatEndPosition;

            let sizeChange: number = 0;
            let writePosition: number = 0;

            // To avoid rewriting udta blocks which might not have been modified,
            // the code here will work correctly if:
            // 1. There is a single udta for the entire file
            //   - OR -
            // 2. There are multiple utdtas, but only 1 of them contains the Apple ILST box.
            // We should be OK in the vast majority of cases

            let udtaBox: IsoUserDataBox = this.findAppleTagUdta();

            if (udtaBox === null || udtaBox === undefined) {
                udtaBox = IsoUserDataBox.fromEmpty();
            }

            const tagData: ByteVector = udtaBox.render();

            // If we don't have a "udta" box to overwrite...
            if (udtaBox.parentTree === null || udtaBox.parentTree === undefined || udtaBox.parentTree.length === 0) {
                // Stick the box at the end of the moov box.
                const moovHeader: Mpeg4BoxHeader = parser.moovTree[parser.moovTree.length - 1];
                sizeChange = tagData.length;
                writePosition = moovHeader.position + moovHeader.totalBoxSize;
                this.insert(tagData, writePosition, 0);

                // Overwrite the parent box sizes.
                for (let i = parser.moovTree.length - 1; i >= 0; i--) {
                    sizeChange = parser.moovTree[i].overwrite(this, sizeChange);
                }
            } else {
                // Overwrite the old box.
                const udtaHeader: Mpeg4BoxHeader = udtaBox.parentTree[udtaBox.parentTree.length - 1];
                sizeChange = tagData.length - udtaHeader.totalBoxSize;
                writePosition = udtaHeader.position;
                this.insert(tagData, writePosition, udtaHeader.totalBoxSize);

                // Overwrite the parent box sizes.
                for (let i = udtaBox.parentTree.length - 2; i >= 0; i--) {
                    sizeChange = udtaBox.parentTree[i].overwrite(this, sizeChange);
                }
            }

            // If we've had a size change, we may need to adjust chunk offsets.
            if (sizeChange !== 0) {
                // We may have moved the offset boxes, so we need to reread.
                parser.parseChunkOffsets();
                this._invariantStartPosition = parser.mdatStartPosition;
                this._invariantEndPosition = parser.mdatEndPosition;

                for (const box of parser.chunkOffsetBoxes) {
                    if (box instanceof IsoChunkLargeOffsetBox) {
                        box.overwrite(this, sizeChange, writePosition);
                        continue;
                    }

                    if (box instanceof IsoChunkOffsetBox) {
                        box.overwrite(this, sizeChange, writePosition);
                        continue;
                    }
                }
            }

            this.tagTypesOnDisk = this.tagTypes;
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    /**
     * Gets the position at which the invariant portion of the current instance begins.
     */
    public get invariantStartPosition(): number {
        return this._invariantStartPosition;
    }

    public get invariantEndPosition(): number {
        return this._invariantEndPosition;
    }

    /**
     * Find the udta box within our collection that contains the Apple ILST data.
     * @returns The udta box within our collection that contains the Apple ILST data.
     */
    private findAppleTagUdta(): IsoUserDataBox {
        if (this.udtaBoxes.length === 1) {
            return this.udtaBoxes[0]; // Single udta - just return it
        }

        // Multiple udta: pick out the shallowest node which has an ILst tag
        const possibleUdtaBoxes: IsoUserDataBox[] = this.udtaBoxes
            .filter((box) => box.getChildRecursively(Mpeg4BoxType.Ilst) !== undefined)
            .sort((box1, box2) => (box1.parentTree.length < box2.parentTree.length ? -1 : 1));

        if (possibleUdtaBoxes.length > 0) {
            return possibleUdtaBoxes[0];
        }

        return undefined;
    }

    /**
     * Gets if there is a udta with ILST present in our collection
     * @returns True if there is a udta with ILST present in our collection
     */
    private isAppleTagUdtaPresent(): boolean {
        for (const udtaBox of this._udtaBoxes) {
            if (
                udtaBox.getChild(Mpeg4BoxType.Meta) !== null &&
                udtaBox.getChild(Mpeg4BoxType.Meta) !== undefined &&
                udtaBox.getChild(Mpeg4BoxType.Meta).getChild(Mpeg4BoxType.Ilst) !== null &&
                udtaBox.getChild(Mpeg4BoxType.Meta).getChild(Mpeg4BoxType.Ilst) !== undefined
            ) {
                return true;
            }
        }
        return false;
    }
}

// /////////////////////////////////////////////////////////////////////////
// Register the file type
["taglib/m4a", "taglib/m4b", "taglib/m4v", "taglib/m4p", "taglib/mp4", "audio/mp4", "audio/x-m4a", "video/mp4", "video/x-m4v"].forEach(
    (mt) => File.addFileType(mt, Mpeg4File)
);
