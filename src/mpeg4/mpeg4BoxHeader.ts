import Mpeg4BoxType from "./mpeg4BoxType";
import {ByteVector} from "../byteVector";
import {File} from "../file";
import {Guards, NumberUtils} from "../utils";

/**
 *  Provides support for reading and writing headers for ISO/IEC 14496-12 boxes.
 */
export default class Mpeg4BoxHeader {
    /**
     *  Contains the box size.
     */
    private _boxSize: number;

    /**
     * The type of box represented by the current instance.
     */
    private _boxType: ByteVector;

    /**
     * The extended type of the box represented by the current instance.
     */
    private _extendedType: ByteVector;

    /**
     *  Contains the header size.
     */
    private _headerSize: number;

    /**
     *  Contains the position of the header.
     */
    private _position: number;

    /**
     * Indicates that the header was read from a file.
     */
    private _fromDisk: boolean;

    // #region Constructors

    private constructor() { /* Private to enforce construction via static methods */ }

    /**
     * Constructs and initializes a new instance of {@link Mpeg4BoxHeader} by reading it from a
     * specified seek position in a specified file.
     * @param file A {@link File} object to read the new instance from.
     * @param position A value specifying the seek position in File at which to start reading.
     * @returns A new instance of {@link Mpeg4BoxHeader} by reading it from a specified seek position
     *     in a specified file.
     */
    public static fromFileAndPosition(file: File, position: number): Mpeg4BoxHeader {
        Guards.truthy(file, "file");

        const header = new Mpeg4BoxHeader();
        header._fromDisk = true;
        header._position = position;
        file.seek(position);

        const data = file.readBlock(32);
        let offset = 0;

        if (data.length < 8 + offset) {
            throw new Error("Not enough data in box header.");
        }

        header._headerSize = 8;
        header._boxSize = data.subarray(offset, 4).toUint();
        header._boxType = data.subarray(offset + 4, 4);

        // If the size is 1, that just tells us we have a massive ULONG size waiting for us in the next 8 bytes.
        if (header._boxSize === 1) {
            if (data.length < 8 + offset) {
                throw new Error("Not enough data in box header.");
            }

            header._headerSize += 8;
            offset += 8;
            header._boxSize = Number(data.subarray(offset, 8).toUlong());
        }

        // UUID has a special header with 16 extra bytes.
        if (ByteVector.equals(header.boxType, Mpeg4BoxType.UUID)) {
            if (data.length < 16 + offset) {
                throw new Error("Not enough data in box header.");
            }

            header._headerSize += 16;
            header._extendedType = data.subarray(offset, 16);
        } else {
            header._extendedType = undefined;

            if (header._boxSize > file.length - position) {
                throw new Error(
                    `Box header specified a size of ${header._boxSize} bytes ` +
                    `but only ${file.length - position} bytes left in the file`
                );
            }
        }

        return header;
    }

    /**
     * Constructs and initializes a new instance of {@link Mpeg4BoxHeader} with a specified box type
     * and optionally extended type.
     * @param type A {@link ByteVector} object containing the four byte box type.
     * @param extendedType A {@link ByteVector} object containing the four byte box type.
     * @returns A new instance of {@link Mpeg4BoxHeader} with a specified box type and optionally extended type.
     */
    public static fromType(type: ByteVector, extendedType?: ByteVector): Mpeg4BoxHeader {
        Guards.truthy(type, "type");
        Guards.equals(type.length, 4, "type.length");

        const header = new Mpeg4BoxHeader();
        header._position = -1;
        header._fromDisk = false;
        header._boxType = type;
        header._boxSize = 8;
        header._headerSize = 8;

        if (!ByteVector.equals(type, Mpeg4BoxType.UUID)) {
            if (extendedType) {
                throw new Error("Extended type only permitted for 'uuid'.");
            }

            header._extendedType = extendedType;
            return header;
        }

        Guards.truthy(extendedType, "extendedType");
        Guards.equals(extendedType.length, 16, "extendedType.length");

        header._boxSize = 24;
        header._headerSize = 24;
        header._extendedType = extendedType;

        return header;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the type of box represented by the current instance.
     */
    public get boxType(): ByteVector { return this._boxType; }

    /**
     * Gets the extended type of the box represented by the current instance.
     */
    public get extendedType(): ByteVector { return this._extendedType; }

    /**
     * Gets the size of the header represented by the current instance.
     */
    public get headerSize(): number { return this._headerSize; }

    /**
     * Gets the size of the data in the box described by the current instance.
     */
    public get dataSize(): number { return this._boxSize - this._headerSize; }
    /**
     * Gets the size of the data in the box described by the current instance.
     * @internal
     */
    public set dataSize(v: number) {
        Guards.safeUint(v, "v");
        this._boxSize = v + this._headerSize;
    }

    /**
     * Gets the total size of the box described by the current instance.
     */
    public get totalBoxSize(): number { return this._boxSize; }

    /**
     * Gets the position box represented by the current instance in the file it comes from.
     */
    public get position(): number { return this._fromDisk ? this._position : -1; }

    // #endregion

    /**
     *  Overwrites the header on disk, updating it to include a change in the size of the box.
     * @param file  A {@link File} object containing the file from which the box originates.
     * @param sizeChange A value indicating the change in the size of the box described by the
     *     current instance.
     * @returns  The size change encountered by the box that parents the box described the current
     *     instance, equal to the size change of the box plus any size change that should happen in
     *     the header.
     */
    public overwrite(file: File, sizeChange: number): number {
        Guards.truthy(file, "file");
        Guards.safeUint(sizeChange, "sizeChange");

        if (!this._fromDisk) {
            throw new Error("Cannot overwrite headers not on disk.");
        }

        const oldHeaderSize = this._headerSize;
        this.dataSize += sizeChange;
        file.insert(this.render(), this._position, oldHeaderSize);

        return sizeChange + this.headerSize - oldHeaderSize;
    }

    /**
     * Renders the header represented by the current instance.
     * @returns A {@link ByteVector} object containing the rendered version of the current instance.
     */
    public render(): ByteVector {
        // Enlarge for size if necessary.
        if ((this._headerSize === 8 || this._headerSize === 24) && this._boxSize > NumberUtils.MAX_UINT) {
            this._headerSize += 8;
            this._boxSize += 8;
        }

        // Calculate what needs to be rendered
        const boxSizeValue = (this._headerSize === 8 || this._headerSize === 24)
            ? this._boxSize
            : 1;
        const extendedSize = (this._headerSize === 16 || this._headerSize === 32)
            ? ByteVector.fromUlong(this._boxSize)
            : undefined;
        const extendedType = this.headerSize > 24
            ? this._extendedType
            : undefined;

        // Put it all together
        return ByteVector.concatenate(
            ByteVector.fromUint(boxSizeValue), // Box size of 1 if extended
            this._boxType,
            extendedSize,                      // Extended size or undefined if box is regular sized
            extendedType                       // Extended type or undefined if box is regular sized
        )
    }
}
