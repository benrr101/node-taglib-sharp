import AppleTag from "./appleTag";
import IsoChunkLargeOffsetBox from "./boxes/isoChunkLargeOffsetBox";
import IsoChunkOffsetBox from "./boxes/isoChunkOffsetBox";
import IsoUserDataBox from "./boxes/isoUserDataBox";
import Mpeg4BoxHeader from "./mpeg4BoxHeader";
import Mpeg4BoxRenderer from "./mpeg4BoxRenderer";
import Mpeg4BoxType from "./mpeg4BoxType";
import Mpeg4FileParser from "./mpeg4FileParser";
import { File, FileAccessMode, ReadStyle } from "../file";
import { IFileAbstraction } from "../fileAbstraction";
import { Properties } from "../properties";
import { Tag, TagTypes } from "../tag";
import { NumberUtils } from "../utils";

/**
 * Provides tagging and properties support for Mpeg4 files.
 */
export default class Mpeg4File extends File {
    /**
     * Contains the Apple tag.
     */
    private _tag: AppleTag;

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
    private _invariantStartPosition = -1;

    /**
     * The position at which the invariant portion of the current instance ends.
     */
    private _invariantEndPosition = -1;

    /** @inheritDoc */
    public constructor(file: IFileAbstraction | string, readStyle: ReadStyle) {
        super(file);

        this.read(readStyle);
    }

    /** @inheritDoc */
    public get tag(): AppleTag {
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
            if (!this._tag && create) {
                let udtaBox = this.findAppleTagUdta();
                if (!udtaBox) {
                    udtaBox = IsoUserDataBox.fromEmpty();
                }

                this._tag = new AppleTag(udtaBox);
            }

            return this._tag;
        }

        return undefined;
    }

    /** @inheritDoc */
    public removeTags(types: TagTypes): void {
        if ((types & TagTypes.Apple) !== TagTypes.Apple || !this._tag) {
            return;
        }

        this._tag.detachIlst();
        this._tag = undefined;
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

            let sizeChange: number;
            let writePosition: number;

            // To avoid rewriting udta blocks which might not have been modified,
            // the code here will work correctly if:
            // 1. There is a single udta for the entire file
            //   - OR -
            // 2. There are multiple utdtas, but only 1 of them contains the Apple ILST box.
            // We should be OK in the vast majority of cases

            let udtaBox = this.findAppleTagUdta();

            if (!udtaBox) {
                udtaBox = IsoUserDataBox.fromEmpty();
            }

            const tagData = Mpeg4BoxRenderer.renderBox(udtaBox);

            // If we don't have a "udta" box to overwrite...
            if (!udtaBox.parentTree || udtaBox.parentTree.length === 0) {
                // Stick the box at the end of the moov box.
                const moovHeader = parser.moovTree[parser.moovTree.length - 1];
                sizeChange = tagData.length;
                writePosition = moovHeader.position + moovHeader.totalBoxSize;
                this.insert(tagData, writePosition, 0);

                // Overwrite the parent box sizes.
                for (let i = parser.moovTree.length - 1; i >= 0; i--) {
                    sizeChange = parser.moovTree[i].overwrite(this, sizeChange);
                }
            } else {
                // Overwrite the old box.
                const udtaHeader = udtaBox.parentTree[udtaBox.parentTree.length - 1];
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
                        (<IsoChunkLargeOffsetBox>box).updatePosition(sizeChange, writePosition);

                        const updatedBox = Mpeg4BoxRenderer.renderBox(box);
                        this.insert(updatedBox, box.header.position, box.size);
                    } else if (box instanceof IsoChunkOffsetBox) {
                        (<IsoChunkOffsetBox>box).updatePositions(sizeChange, writePosition);

                        const updatedBox = Mpeg4BoxRenderer.renderBox(box);
                        this.insert(updatedBox, box.header.position, box.size);
                    }
                }
            }

            this.tagTypesOnDisk = this.tagTypes;
        } finally {
            this.mode = FileAccessMode.Closed;
        }
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
        const possibleUdtaBoxes = this.udtaBoxes
            .filter((box) => box.getChildRecursively(Mpeg4BoxType.ILST))
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
            if (udtaBox.getChild(Mpeg4BoxType.META)?.getChild(Mpeg4BoxType.ILST)) {
                return true;
            }
        }
        return false;
    }

    private read(readStyle: ReadStyle): void {
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
            let udtaBox = this.findAppleTagUdta();
            if (!udtaBox) {
                udtaBox = IsoUserDataBox.fromEmpty();
            }

            this._tag = new AppleTag(udtaBox);

            // If we're not reading properties, we're done.
            if ((readStyle & ReadStyle.Average) === 0) {
                return;
            }

            // Get the movie header box.
            const mvhdBox = parser.movieHeaderBox;

            if (!mvhdBox) {
                throw new Error("mvhd box not found.");
            }

            const audioSampleEntry = parser.audioSampleEntry;
            const visualSampleEntry = parser.visualSampleEntry;

            // Read the properties.
            this._properties = new Properties(mvhdBox.durationInMilliseconds, [audioSampleEntry, visualSampleEntry]);
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }
}

// /////////////////////////////////////////////////////////////////////////
// Register the file type
[
    "taglib/m4a",
    "taglib/m4b",
    "taglib/m4v",
    "taglib/m4p",
    "taglib/mp4",
    "audio/mp4",
    "audio/x-m4a",
    "video/mp4",
    "video/x-m4v"
].forEach(
    (mt) => File.addFileType(mt, Mpeg4File)
);
