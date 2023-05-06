import { ByteVector, StringType } from "../byteVector";
import { File } from "../file";
import { Guards } from "../utils";
import { IsoAudioSampleEntry, IsoHandlerBox, IsoMovieHeaderBox, IsoUserDataBox, IsoVisualSampleEntry, Mpeg4Box } from "./mpeg4Boxes";
import Mpeg4BoxFactory from "./mpeg4BoxFactory";
import Mpeg4BoxHeader from "./mpeg4BoxHeader";
import Mpeg4BoxType from "./mpeg4BoxType";
import Mpeg4Utils from "./mpeg4Utils";

/**
 * This class provides methods for reading important information from an MPEG-4 file.
 */
export default class Mpeg4FileParser {
    /**
     * Contains the file to read from.
     */
    private readonly _file: File;

    /**
     * Contains the first header found in the file.
     */
    private readonly _firstHeader: Mpeg4BoxHeader;

    /**
     * Contains the ISO movie header box.
     */
    private _mvhdBox: IsoMovieHeaderBox;

    /**
     * Contains the ISO user data boxes.
     */
    private _udtaBoxes: IsoUserDataBox[] = [];

    /**
     * Contains the box headers from the top of the file to the "moov" box.
     */
    private _moovTree: Mpeg4BoxHeader[];

    /**
     * Contains the box headers from the top of the file to the "udta" box.
     */
    private _udtaTree: Mpeg4BoxHeader[];

    /**
     * Contains the "stco" boxes found in the file.
     */
    private _stcoBoxes: Mpeg4Box[] = [];

    /**
     * Contains the "stsd" boxes found in the file.
     */
    private _stsdBoxes: Mpeg4Box[] = [];

    /**
     * Contains the position at which the "mdat" box starts.
     */
    private _mdatStart: number = -1;

    /**
     * Contains the position at which the "mdat" box ends.
     */
    private _mdatEnd: number = -1;

    /**
     * Constructs and initializes a new instance of @see FileParser for a specified file.
     * @param file A @see File object to perform operations on.
     */
    public constructor(file: File) {
        Guards.notNullOrUndefined(file, "File");

        this._file = file;
        this._firstHeader = Mpeg4BoxHeader.fromFileAndPosition(file, 0);

        if (this._firstHeader.boxType.toString(StringType.UTF8) !== "ftyp") {
            throw new Error("File does not start with 'ftyp' box.");
        }
    }

    /**
     * Gets the movie header box read by the current instance.
     */
    public get movieHeaderBox(): IsoMovieHeaderBox {
        return this._mvhdBox;
    }

    /**
     * Gets all user data boxes read by the current instance.
     */
    public get userDataBoxes(): IsoUserDataBox[] {
        return this._udtaBoxes;
    }

    /**
     * Gets the audio sample entry read by the current instance.
     */
    public get audioSampleEntry(): IsoAudioSampleEntry {
        for (const box of this._stsdBoxes) {
            for (const sub of box.children) {
                if (sub instanceof IsoAudioSampleEntry) {
                    return sub;
                }
            }
        }

        return undefined;
    }

    /**
     * Gets the visual sample entry read by the current instance.
     */
    public get visualSampleEntry(): IsoVisualSampleEntry {
        for (const box of this._stsdBoxes) {
            for (const sub of box.children) {
                if (sub instanceof IsoVisualSampleEntry) {
                    return sub;
                }
            }
        }

        return undefined;
    }

    /**
     * Gets the box headers for the first "moov" box and
     * all parent boxes up to the top of the file as read by the
     * current instance.
     */
    public get moovTree(): Mpeg4BoxHeader[] {
        return this._moovTree;
    }

    /**
     * Gets the box headers for the first "udta" box and
     * all parent boxes up to the top of the file as read by the
     * current instance.
     */
    public get udtaTree(): Mpeg4BoxHeader[] {
        return this._udtaTree;
    }

    /**
     * Gets all chunk offset boxes read by the current instance.
     */
    public get chunkOffsetBoxes(): Mpeg4Box[] {
        return this._stcoBoxes;
    }

    /**
     * Gets the position at which the mdat box starts.
     */
    public get mdatStartPosition(): number {
        return this._mdatStart;
    }

    /**
     * Gets the position at which the mdat box ends.
     */
    public get mdatEndPosition(): number {
        return this._mdatEnd;
    }

    /**
     * Get the User Data Box
     */
    public get userDataBox(): IsoUserDataBox {
        return this.userDataBoxes.length === 0 ? undefined : this.userDataBoxes[0];
    }

    /**
     * Parses the file referenced by the current instance,
     * searching for box headers that will be useful in saving
     * the file.
     */
    public parseBoxHeaders(): void {
        try {
            this.resetFields();
            this.parseBoxHeadersFromStartEndAndParents(this._firstHeader.totalBoxSize, this._file.length, undefined);
        } catch (e) {
            this._file.markAsCorrupt(e.message);
        }
    }

    /**
     * Parses the file referenced by the current instance, searching for tags.
     */
    public parseTag(): void {
        try {
            this.resetFields();
            this.parseTagFromStartEndAndParents(this._firstHeader.totalBoxSize, this._file.length, undefined);
        } catch (e) {
            this._file.markAsCorrupt(e.message);
        }
    }

    /**
     * Parses the file referenced by the current instance, searching for tags and properties.
     */
    public parseTagAndProperties(): void {
        try {
            this.resetFields();
            this.parseTagAndPropertiesFromStartEndHandlerAndParents(
                this._firstHeader.totalBoxSize,
                this._file.length,
                undefined,
                undefined
            );
        } catch (e) {
            this._file.markAsCorrupt(e.message);
        }
    }

    /**
     * Parses the file referenced by the current instance, searching for chunk offset boxes.
     */
    public parseChunkOffsets(): void {
        try {
            this.resetFields();
            this.ParseChunkOffsetsFromStartAndEnd(this._firstHeader.totalBoxSize, this._file.length);
        } catch (e) {
            this._file.markAsCorrupt(e.Message);
        }
    }

    /**
     * Parses boxes for a specified range, looking for headers.
     * @param start A value specifying the seek position at which to start reading.
     * @param end A value specifying the seek position at which to stop reading.
     * @param parents A @see Mpeg4BoxHeader[] object containing all the parent
     * handlers that apply to the range.
     */
    private parseBoxHeadersFromStartEndAndParents(start: number, end: number, parents: Mpeg4BoxHeader[]): void {
        let header: Mpeg4BoxHeader;

        for (let position = start; position < end; position += header.totalBoxSize) {
            header = Mpeg4BoxHeader.fromFileAndPosition(this._file, position);

            if ((this._moovTree === null || this._moovTree === undefined) && ByteVector.compare(header.boxType, Mpeg4BoxType.Moov) === 0) {
                const newParents: Mpeg4BoxHeader[] = Mpeg4Utils.addParent(parents, header);
                this._moovTree = newParents;
                this.parseBoxHeadersFromStartEndAndParents(header.headerSize + position, header.totalBoxSize + position, newParents);
            } else if (
                ByteVector.compare(header.boxType, Mpeg4BoxType.Mdia) === 0 ||
                ByteVector.compare(header.boxType, Mpeg4BoxType.Minf) === 0 ||
                ByteVector.compare(header.boxType, Mpeg4BoxType.Stbl) === 0 ||
                ByteVector.compare(header.boxType, Mpeg4BoxType.Trak) === 0
            ) {
                this.parseBoxHeadersFromStartEndAndParents(
                    header.headerSize + position,
                    header.totalBoxSize + position,
                    Mpeg4Utils.addParent(parents, header)
                );
            } else if (
                (this._udtaTree === null || this._udtaTree === undefined) &&
                ByteVector.compare(header.boxType, Mpeg4BoxType.Udta) === 0
            ) {
                // For compatibility, we still store the tree to the first udta
                // block. The proper way to get this info is from the individual
                // IsoUserDataBox.ParentTree member.
                this._udtaTree = Mpeg4Utils.addParent(parents, header);
            } else if (ByteVector.compare(header.boxType, Mpeg4BoxType.Mdat) === 0) {
                this._mdatStart = position;
                this._mdatEnd = position + header.totalBoxSize;
            }

            if (header.totalBoxSize === 0) {
                break;
            }
        }
    }

    /**
     * Parses boxes for a specified range, looking for tags.
     * @param start A value specifying the seek position at which to start reading.
     * @param end A value specifying the seek position at which to stop reading.
     * @param parents A @see Mpeg4BoxHeader[] of @see Mpeg4BoxHeader parents.
     */
    private parseTagFromStartEndAndParents(start: number, end: number, parents: Mpeg4BoxHeader[]): void {
        let header: Mpeg4BoxHeader;

        for (let position = start; position < end; position += header.totalBoxSize) {
            header = Mpeg4BoxHeader.fromFileAndPosition(this._file, position);

            if (ByteVector.compare(header.boxType, Mpeg4BoxType.Moov) === 0) {
                this.parseTagFromStartEndAndParents(
                    header.headerSize + position,
                    header.totalBoxSize + position,
                    Mpeg4Utils.addParent(parents, header)
                );
            } else if (
                ByteVector.compare(header.boxType, Mpeg4BoxType.Mdia) === 0 ||
                ByteVector.compare(header.boxType, Mpeg4BoxType.Minf) === 0 ||
                ByteVector.compare(header.boxType, Mpeg4BoxType.Stbl) === 0 ||
                ByteVector.compare(header.boxType, Mpeg4BoxType.Trak) === 0
            ) {
                this.parseTagFromStartEndAndParents(
                    header.headerSize + position,
                    header.totalBoxSize + position,
                    Mpeg4Utils.addParent(parents, header)
                );
            } else if (ByteVector.compare(header.boxType, Mpeg4BoxType.Udta) === 0) {
                const udtaBox = Mpeg4BoxFactory.createBoxFromFileAndHeader(this._file, header) as IsoUserDataBox;

                // Since we can have multiple udta boxes, save the parent for each one
                const newParents: Mpeg4BoxHeader[] = Mpeg4Utils.addParent(parents, header);
                udtaBox.parentTree = newParents;

                this._udtaBoxes.push(udtaBox);
            } else if (ByteVector.compare(header.boxType, Mpeg4BoxType.Mdat) === 0) {
                this._mdatStart = position;
                this._mdatEnd = position + header.totalBoxSize;
            }

            if (header.totalBoxSize === 0) {
                break;
            }
        }
    }

    /**
     * Parses boxes for a specified range, looking for tags and properties.
     * @param start A value specifying the seek position at which to start reading.
     * @param end A value specifying the seek position at which to stop reading.
     * @param handler A @see IsoHandlerBox object that applied to the range being searched.
     * @param parents A @see Mpeg4BoxHeader[] of @see Mpeg4BoxHeader parents.
     */
    private parseTagAndPropertiesFromStartEndHandlerAndParents(
        start: number,
        end: number,
        handler: IsoHandlerBox,
        parents: Mpeg4BoxHeader[]
    ): void {
        let header: Mpeg4BoxHeader;

        for (let position = start; position < end; position += header.totalBoxSize) {
            header = Mpeg4BoxHeader.fromFileAndPosition(this._file, position);
            const type: ByteVector = header.boxType;

            if (ByteVector.compare(type, Mpeg4BoxType.Moov) === 0) {
                this.parseTagAndPropertiesFromStartEndHandlerAndParents(
                    header.headerSize + position,
                    header.totalBoxSize + position,
                    handler,
                    Mpeg4Utils.addParent(parents, header)
                );
            } else if (
                ByteVector.compare(type, Mpeg4BoxType.Mdia) === 0 ||
                ByteVector.compare(type, Mpeg4BoxType.Minf) === 0 ||
                ByteVector.compare(type, Mpeg4BoxType.Stbl) === 0 ||
                ByteVector.compare(type, Mpeg4BoxType.Trak) === 0
            ) {
                this.parseTagAndPropertiesFromStartEndHandlerAndParents(
                    header.headerSize + position,
                    header.totalBoxSize + position,
                    handler,
                    Mpeg4Utils.addParent(parents, header)
                );
            } else if (ByteVector.compare(type, Mpeg4BoxType.Stsd) === 0) {
                this._stsdBoxes.push(Mpeg4BoxFactory.createBoxFromFileHeaderAndHandler(this._file, header, handler));
            } else if (ByteVector.compare(type, Mpeg4BoxType.Hdlr) === 0) {
                handler = Mpeg4BoxFactory.createBoxFromFileHeaderAndHandler(this._file, header, handler) as IsoHandlerBox;
            } else if ((this._mvhdBox === null || this._mvhdBox === undefined) && ByteVector.compare(type, Mpeg4BoxType.Mvhd) === 0) {
                this._mvhdBox = Mpeg4BoxFactory.createBoxFromFileHeaderAndHandler(this._file, header, handler) as IsoMovieHeaderBox;
            } else if (ByteVector.compare(type, Mpeg4BoxType.Udta) === 0) {
                const udtaBox: IsoUserDataBox = Mpeg4BoxFactory.createBoxFromFileHeaderAndHandler(
                    this._file,
                    header,
                    handler
                ) as IsoUserDataBox;

                // Since we can have multiple udta boxes, save the parent for each one
                const newParents: Mpeg4BoxHeader[] = Mpeg4Utils.addParent(parents, header);
                udtaBox.parentTree = newParents;

                this._udtaBoxes.push(udtaBox);
            } else if (ByteVector.compare(type, Mpeg4BoxType.Mdat) === 0) {
                this._mdatStart = position;
                this._mdatEnd = position + header.totalBoxSize;
            }

            if (header.totalBoxSize === 0) {
                break;
            }
        }
    }

    /**
     * Parses boxes for a specified range, looking for chunk offset boxes.
     * @param start A value specifying the seek position at which to start reading.
     * @param end A value specifying the seek position at which to stop reading.
     */
    private ParseChunkOffsetsFromStartAndEnd(start: number, end: number): void {
        let header: Mpeg4BoxHeader;

        for (let position = start; position < end; position += header.totalBoxSize) {
            header = Mpeg4BoxHeader.fromFileAndPosition(this._file, position);

            if (ByteVector.compare(header.boxType, Mpeg4BoxType.Moov) === 0) {
                this.ParseChunkOffsetsFromStartAndEnd(header.headerSize + position, header.totalBoxSize + position);
            } else if (
                ByteVector.compare(header.boxType, Mpeg4BoxType.Moov) === 0 ||
                ByteVector.compare(header.boxType, Mpeg4BoxType.Mdia) === 0 ||
                ByteVector.compare(header.boxType, Mpeg4BoxType.Minf) === 0 ||
                ByteVector.compare(header.boxType, Mpeg4BoxType.Stbl) === 0 ||
                ByteVector.compare(header.boxType, Mpeg4BoxType.Trak) === 0
            ) {
                this.ParseChunkOffsetsFromStartAndEnd(header.headerSize + position, header.totalBoxSize + position);
            } else if (
                ByteVector.compare(header.boxType, Mpeg4BoxType.Stco) === 0 ||
                ByteVector.compare(header.boxType, Mpeg4BoxType.Co64) === 0
            ) {
                this._stcoBoxes.push(Mpeg4BoxFactory.createBoxFromFileAndHeader(this._file, header));
            } else if (ByteVector.compare(header.boxType, Mpeg4BoxType.Mdat) === 0) {
                this._mdatStart = position;
                this._mdatEnd = position + header.totalBoxSize;
            }

            if (header.totalBoxSize === 0) {
                break;
            }
        }
    }

    /**
     * Resets all internal fields.
     */
    private resetFields(): void {
        this._mvhdBox = undefined;
        this._udtaBoxes = [];
        this._moovTree = undefined;
        this._udtaTree = undefined;
        this._stcoBoxes = [];
        this._stsdBoxes = [];
        this._mdatStart = -1;
        this._mdatEnd = -1;
    }
}
