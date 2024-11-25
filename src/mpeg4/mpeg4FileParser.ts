import IsoAudioSampleEntry from "./boxes/isoAudioSampleEntry";
import IsoHandlerBox from "./boxes/isoHandlerBox";
import IsoMovieHeaderBox from "./boxes/isoMovieHeaderBox";
import IsoUserDataBox from "./boxes/isoUserDataBox";
import IsoVisualSampleEntry from "./boxes/isoVisualSampleEntry";
import Mpeg4Box from "./boxes/mpeg4Box";
import Mpeg4BoxFactory from "./mpeg4BoxFactory";
import Mpeg4BoxHeader from "./mpeg4BoxHeader";
import Mpeg4BoxType from "./mpeg4BoxType";
import Mpeg4Utils from "./mpeg4Utils";
import { ByteVector } from "../byteVector";
import { File } from "../file";
import { Guards } from "../utils";

/**
 * This class provides methods for reading important information from an MPEG-4 file.
 * @internal
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
     * Contains the "stco" boxes found in the file.
     */
    private _stcoBoxes: Mpeg4Box[] = [];

    /**
     * Contains the "stsd" boxes found in the file.
     */
    private _stsdBoxes: Mpeg4Box[] = [];

    /**
     * Constructs and initializes a new instance of {{@link Mpeg4FileParser}} for a specified file.
     * @param file A {{@link File}} object to perform operations on.
     */
    public constructor(file: File) {
        Guards.truthy(file, "File");

        this._file = file;
        this._firstHeader = Mpeg4BoxHeader.fromFileAndPosition(file, 0);

        if (!ByteVector.equals(this._firstHeader.boxType, Mpeg4BoxType.FTYP)) {
            throw new Error("File does not start with 'ftyp' box.");
        }
    }

    /**
     * Gets the movie header box read by the current instance.
     */
    public get movieHeaderBox(): IsoMovieHeaderBox { return this._mvhdBox; }

    /**
     * Gets all user data boxes read by the current instance.
     */
    public get userDataBoxes(): IsoUserDataBox[] { return this._udtaBoxes; }

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
    public get moovTree(): Mpeg4BoxHeader[] { return this._moovTree; }

    /**
     * Gets all chunk offset boxes read by the current instance.
     */
    public get chunkOffsetBoxes(): Mpeg4Box[] { return this._stcoBoxes; }

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
            this.parseChunkOffsetsFromStartAndEnd(this._firstHeader.totalBoxSize, this._file.length);
        } catch (e) {
            this._file.markAsCorrupt(e.Message);
        }
    }

    /**
     * Parses boxes for a specified range, looking for headers.
     * @param start A value specifying the seek position at which to start reading.
     * @param end A value specifying the seek position at which to stop reading.
     * @param parents An array of {{@link Mpeg4BoxHeader}} containing all the parent handlers that
     *     apply to the range.
     */
    private parseBoxHeadersFromStartEndAndParents(start: number, end: number, parents: Mpeg4BoxHeader[]): void {
        let header: Mpeg4BoxHeader;

        for (let position = start; position < end; position += header.totalBoxSize) {
            header = Mpeg4BoxHeader.fromFileAndPosition(this._file, position);

            if (!this._moovTree && ByteVector.equals(header.boxType, Mpeg4BoxType.MOOV)) {
                const newParents = Mpeg4Utils.addParent(parents, header);
                this._moovTree = newParents;
                this.parseBoxHeadersFromStartEndAndParents(
                    header.headerSize + position,
                    header.totalBoxSize + position, newParents
                );
            } else if (
                ByteVector.equals(header.boxType, Mpeg4BoxType.MDIA) ||
                ByteVector.equals(header.boxType, Mpeg4BoxType.MINF) ||
                ByteVector.equals(header.boxType, Mpeg4BoxType.STBL) ||
                ByteVector.equals(header.boxType, Mpeg4BoxType.TRAK)
            ) {
                this.parseBoxHeadersFromStartEndAndParents(
                    header.headerSize + position,
                    header.totalBoxSize + position,
                    Mpeg4Utils.addParent(parents, header)
                );
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
     * @param parents An array of {{@link Mpeg4BoxHeader}} parents.
     */
    private parseTagFromStartEndAndParents(start: number, end: number, parents: Mpeg4BoxHeader[]): void {
        let header: Mpeg4BoxHeader;

        for (let position = start; position < end; position += header.totalBoxSize) {
            header = Mpeg4BoxHeader.fromFileAndPosition(this._file, position);

            if (ByteVector.equals(header.boxType, Mpeg4BoxType.MOOV)) {
                this.parseTagFromStartEndAndParents(
                    header.headerSize + position,
                    header.totalBoxSize + position,
                    Mpeg4Utils.addParent(parents, header)
                );
            } else if (
                ByteVector.equals(header.boxType, Mpeg4BoxType.MDIA) ||
                ByteVector.equals(header.boxType, Mpeg4BoxType.MINF) ||
                ByteVector.equals(header.boxType, Mpeg4BoxType.STBL) ||
                ByteVector.equals(header.boxType, Mpeg4BoxType.TRAK)
            ) {
                this.parseTagFromStartEndAndParents(
                    header.headerSize + position,
                    header.totalBoxSize + position,
                    Mpeg4Utils.addParent(parents, header)
                );
            } else if (ByteVector.equals(header.boxType, Mpeg4BoxType.UDTA)) {
                const udtaBox = Mpeg4BoxFactory.createBox(this._file, header) as IsoUserDataBox;

                // Since we can have multiple udta boxes, save the parent for each one
                udtaBox.parentTree = Mpeg4Utils.addParent(parents, header);

                this._udtaBoxes.push(udtaBox);
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
     * @param handler A {{@link IsoHandlerBox}} object that applied to the range being searched.
     * @param parents An array of {{@link Mpeg4BoxHeader}} parents.
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
            const type = header.boxType;

            if (ByteVector.equals(type, Mpeg4BoxType.MOOV)) {
                this.parseTagAndPropertiesFromStartEndHandlerAndParents(
                    header.headerSize + position,
                    header.totalBoxSize + position,
                    handler,
                    Mpeg4Utils.addParent(parents, header)
                );
            } else if (
                ByteVector.equals(type, Mpeg4BoxType.MDIA) ||
                ByteVector.equals(type, Mpeg4BoxType.MINF) ||
                ByteVector.equals(type, Mpeg4BoxType.STBL) ||
                ByteVector.equals(type, Mpeg4BoxType.TRAK)
            ) {
                this.parseTagAndPropertiesFromStartEndHandlerAndParents(
                    header.headerSize + position,
                    header.totalBoxSize + position,
                    handler,
                    Mpeg4Utils.addParent(parents, header)
                );
            } else if (ByteVector.equals(type, Mpeg4BoxType.STSD)) {
                this._stsdBoxes.push(Mpeg4BoxFactory.createBox(
                    this._file,
                    header,
                    handler?.dataHandlerType
                ));
            } else if (ByteVector.equals(type, Mpeg4BoxType.HDLR)) {
                handler = <IsoHandlerBox>Mpeg4BoxFactory.createBox(
                    this._file,
                    header,
                    handler?.dataHandlerType
                );
            } else if (!this._mvhdBox && ByteVector.equals(type, Mpeg4BoxType.MVHD)) {
                this._mvhdBox = <IsoMovieHeaderBox>Mpeg4BoxFactory.createBox(
                    this._file,
                    header,
                    handler?.dataHandlerType
                );
            } else if (ByteVector.equals(type, Mpeg4BoxType.UDTA)) {
                const udtaBox = <IsoUserDataBox>Mpeg4BoxFactory.createBox(
                    this._file,
                    header,
                    handler?.dataHandlerType
                );

                // Since we can have multiple udta boxes, save the parent for each one
                udtaBox.parentTree = Mpeg4Utils.addParent(parents, header);

                this._udtaBoxes.push(udtaBox);
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
    private parseChunkOffsetsFromStartAndEnd(start: number, end: number): void {
        let header: Mpeg4BoxHeader;

        for (let position = start; position < end; position += header.totalBoxSize) {
            header = Mpeg4BoxHeader.fromFileAndPosition(this._file, position);

            if (ByteVector.equals(header.boxType, Mpeg4BoxType.MOOV)) {
                this.parseChunkOffsetsFromStartAndEnd(header.headerSize + position, header.totalBoxSize + position);
            } else if (
                ByteVector.equals(header.boxType, Mpeg4BoxType.MOOV) ||
                ByteVector.equals(header.boxType, Mpeg4BoxType.MDIA) ||
                ByteVector.equals(header.boxType, Mpeg4BoxType.MINF) ||
                ByteVector.equals(header.boxType, Mpeg4BoxType.STBL) ||
                ByteVector.equals(header.boxType, Mpeg4BoxType.TRAK)
            ) {
                this.parseChunkOffsetsFromStartAndEnd(header.headerSize + position, header.totalBoxSize + position);
            } else if (
                ByteVector.equals(header.boxType, Mpeg4BoxType.STCO) ||
                ByteVector.equals(header.boxType, Mpeg4BoxType.CO64)
            ) {
                this._stcoBoxes.push(Mpeg4BoxFactory.createBox(this._file, header));
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
        this._stcoBoxes = [];
        this._stsdBoxes = [];
    }
}
