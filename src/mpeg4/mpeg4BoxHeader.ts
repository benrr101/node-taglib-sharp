import { ByteVector, StringType } from "../byteVector";
import { File } from "../file";
import { Guards } from "../utils";
import { Mpeg4Box } from "./mpeg4Boxes";
import Mpeg4BoxType from "./mpeg4BoxType";

/**
 *  Provides support for reading and writing headers for ISO/IEC 14496-12 boxes.
 */
export default class Mpeg4BoxHeader {
    /**
     * The type of box represented by the current instance.
     */
    private _boxType: ByteVector;

    /**
     * The extended type of the box represented by the current instance.
     */
    private _extendedType: ByteVector;

    /**
     *  Contains the box size.
     */
    private _boxSize: number;

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

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {}

    /**
     * Gets and sets the box represented by the current instance as a means of temporary storage for internal uses.
     */
    public box: Mpeg4Box;

    /**
     * Gets the type of box represented by the current instance.
     */
    public get boxType(): ByteVector {
        return this._boxType;
    }

    /**
     * Gets the extended type of the box represented by the current instance.
     */
    public get extendedType(): ByteVector {
        return this._extendedType;
    }

    /**
     * Gets the size of the header represented by the current instance.
     */
    public get headerSize(): number {
        return this._headerSize;
    }

    /**
     * Gets and sets the size of the data in the box described by the current instance.
     * @returns A value containing the size of the data in the box described by the current instance.
     */
    public get dataSize(): number {
        return this._boxSize - this._headerSize;
    }

    public set dataSize(v: number) {
        this._boxSize = v + this._headerSize;
    }

    /**
     * Gets the total size of the box described by the current instance.
     * @returns A value containing the total size of the box described by the current instance.
     */
    public get totalBoxSize(): number {
        return this._boxSize;
    }

    /**
     * Gets the position box represented by the current instance in the file it comes from.
     * @returns A value containing the position box represented by the current instance in the file it comes from.
     */
    public get position(): number {
        return this._fromDisk ? this._position : -1;
    }

    /**
     * Constructs and initializes a new instance of @see Mpeg4BoxHeader that is empty.
     * @returns A new instance of @see Mpeg4BoxHeader that is empty.
     */
    public static fromEmpty(): Mpeg4BoxHeader {
        return Mpeg4BoxHeader.fromType(ByteVector.fromString("xxxx", StringType.UTF8));
    }

    /**
     * Constructs and initializes a new instance of @see Mpeg4BoxHeader by reading it from a specified seek position in a specified file.
     * @param file A @see File object to read the new instance from.
     * @param position A value specifying the seek position in File at which to start reading.
     * @returns A new instance of @see Mpeg4BoxHeader by reading it from a specified seek position in a specified file.
     */
    public static fromFileAndPosition(file: File, position: number): Mpeg4BoxHeader {
        Guards.notNullOrUndefined(file, "file");

        const header = new Mpeg4BoxHeader();
        header.box = undefined;
        header._fromDisk = true;
        header._position = position;
        file.seek(position);

        const data: ByteVector = file.readBlock(32);
        let offset: number = 0;

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

            // UUID has a special header with 16 extra bytes.
            if (ByteVector.compare(header.boxType, Mpeg4BoxType.Uuid) === 0) {
                if (data.length < 16 + offset) {
                    throw new Error("Not enough data in box header.");
                }

                header._headerSize += 16;
                header._extendedType = data.subarray(offset, 16);
            } else {
                header._extendedType = undefined;
            }

            if (header._boxSize > file.length - position) {
                throw new Error(
                    `Box header specified a size of ${header._boxSize} bytes but only ${file.length - position} bytes left in the file`
                );
            }
        }

        return header;
    }

    /**
     * Constructs and initializes a new instance of @see Mpeg4BoxHeader with a specified box type.
     * @param type  A ByteVector object containing the four byte box type.
     * @returns A new instance of Mpeg4BoxHeader with a specified box type.
     */
    public static fromType(type: ByteVector): Mpeg4BoxHeader {
        return Mpeg4BoxHeader.fromTypeAndExtendedType(type, undefined);
    }

    /**
     * Constructs and initializes a new instance of @see Mpeg4BoxHeader with a specified box type and optionally extended type.
     * @param type A @see ByteVector object containing the four byte box type.
     * @param extendedType A @see ByteVector object containing the four byte box type.
     * @returns A new instance of @see Mpeg4BoxHeader with a specified box type and optionally extended type.
     */
    public static fromTypeAndExtendedType(type: ByteVector, extendedType: ByteVector): Mpeg4BoxHeader {
        const header = new Mpeg4BoxHeader();
        header._position = -1;
        header.box = undefined;
        header._fromDisk = false;
        header._boxType = type;

        Guards.notNullOrUndefined(type, "type");
        Guards.equals(type.length, 4, "type.length");

        header._boxSize = 8;
        header._headerSize = 8;

        if (ByteVector.compare(type, Mpeg4BoxType.Uuid) !== 0) {
            if (extendedType !== null && extendedType !== undefined) {
                throw new Error("Extended type only permitted for 'uuid'.");
            }

            header._extendedType = extendedType;
            return header;
        }

        Guards.notNullOrUndefined(extendedType, "extendedType");
        Guards.equals(extendedType.length, 16, "extendedType.length");

        header._boxSize = 24;
        header._headerSize = 24;

        header._extendedType = extendedType;

        return header;
    }

    /**
     *  Overwrites the header on disk, updating it to include a change in the size of the box.
     * @param file  A @see File object containing the file from which the box originates.
     * @param sizeChange A value indicating the change in the size of the box described by the current instance.
     * @returns  The size change encountered by the box that parents the box described the the current instance, equal to the
     * size change of the box plus any size change that should happen in the header.
     */
    public overwrite(file: File, sizeChange: number): number {
        Guards.notNullOrUndefined(file, "file");

        if (!this._fromDisk) {
            throw new Error("Cannot overwrite headers not on disk.");
        }

        const oldHeaderSize: number = this.headerSize;
        this.dataSize += sizeChange;
        file.insert(this.render(), this._position, oldHeaderSize);

        return sizeChange + this.headerSize - oldHeaderSize;
    }

    /**
     * Renders the header represented by the current instance.
     * @returns A @see ByteVector object containing the rendered version of the current instance.
     */
    public render(): ByteVector {
        // Enlarge for size if necessary.
        if ((this._headerSize === 8 || this._headerSize === 24) && this._boxSize > Number.MAX_VALUE) {
            this._headerSize += 8;
            this._boxSize += 8;
        }

        // Add the box size and type to the output.
        const output: ByteVector = ByteVector.fromUint(this._headerSize === 8 || this._headerSize === 24 ? this._boxSize : 1);
        output.addByteVector(this.boxType);

        // If the box size is 16 or 32, we must have more a large header to append.
        if (this._headerSize === 16 || this._headerSize === 32) {
            output.addByteVector(ByteVector.fromUlong(this._boxSize));
        }

        // The only reason for such a big size is an extended type. Extend!!!
        if (this._headerSize >= 24) {
            output.addByteVector(this.extendedType);
        }

        return output;
    }
}
