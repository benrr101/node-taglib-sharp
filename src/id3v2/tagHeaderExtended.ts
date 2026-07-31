import SyncData from "./syncData";
import {ByteVector} from "../byteVector";
import {CorruptFileError} from "../errors";
import {Guards} from "../utils";
import {File} from "../file";
import {Id3v2Version} from "./enums";

/**
 * This class is a filler until support for reading and writing the ID3v2 extended header is
 * implemented.
 */
export default class TagHeaderExtended {
    private _size: number = 0;

    private constructor() { /* private to enforce construction via static methods */ }

    /**
     * Constructs and initializes a new instance by reading the raw contents.
     * @param data Raw extended header structure
     * @param version ID3v2 version
     */
    public static fromData(data: ByteVector, version: Id3v2Version): TagHeaderExtended {
        Guards.truthy(data, "data");
        if (data.length < 4) {
            throw new CorruptFileError("Provided data is smaller than extended header size field");
        }

        const header = new TagHeaderExtended();

        // Read extended header size
        const declaredSize = version === Id3v2Version.V23
            ? data.subarray(0, 4).toUint()
            : SyncData.toUint(data.subarray(0, 4));
        header._size = (version === Id3v2Version.V23 ? 4 : 0) + declaredSize;

        return header;
    }

    /**
     * Constructs and initializes a new instance by reading from file.
     * @param file File containing the extended header
     * @param position Offset into the file where the extended header begins.
     * @param version ID3v2 version
     */
    public static fromFile(file: File, position: number, version: Id3v2Version): TagHeaderExtended {
        Guards.truthy(file, "file");
        Guards.safeUint(position, "position");

        const header = new TagHeaderExtended();

        // Read extended header size
        file.seek(position);

        const sizeData = file.readBlock(4);
        if (sizeData.length < 4) {
            throw new CorruptFileError(
                `File does not contain enough bytes for ID3v2 extended header at position ${position}.`
            );
        }

        const declaredSize = version === Id3v2Version.V23
            ? sizeData.toUint()
            : SyncData.toUint(sizeData);
        header._size = (version === Id3v2Version.V23 ? 4 : 0) + declaredSize;

        return header;
    }

    /**
     * Constructs and initializes a new instance with no contents.
     */
    public static fromEmpty(): TagHeaderExtended {
        return new TagHeaderExtended();
    }

    /**
     * Gets the size of the data on disk in bytes.
     */
    public get size(): number { return this._size; }

    // :robot: implementation to read the fields from file... @TODO:
    // private static readExtendedHeaderFields(file: File, version: number, totalSize: number): void {
    //     let remainingSize = totalSize - 4;
    //     if (remainingSize <= 0) {
    //         return;
    //     }
    //
    //     if (version === 3) {
    //         // ID3v2.3: flags (2 bytes), padding size (4 bytes), then optional/extra bytes.
    //         if (remainingSize < 6) {
    //             throw new CorruptFileError("Extended header size is smaller than required fields");
    //         }
    //         Id3v2ExtendedHeader.readBlock(file, 2);
    //         Id3v2ExtendedHeader.readBlock(file, 4);
    //         remainingSize -= 6;
    //     } else if (version === 4) {
    //         // ID3v2.4: number of flag bytes, flag bytes, then optional flag data.
    //         if (remainingSize < 1) {
    //             throw new CorruptFileError("Extended header size is smaller than required fields");
    //         }
    //         const flagByteCount = Id3v2ExtendedHeader.readBlock(file, 1).get(0);
    //         remainingSize--;
    //         if (remainingSize < flagByteCount) {
    //             throw new CorruptFileError("Extended header size is smaller than required fields");
    //         }
    //         Id3v2ExtendedHeader.readBlock(file, flagByteCount);
    //         remainingSize -= flagByteCount;
    //     }
    //
    //     if (remainingSize < 0) {
    //         throw new CorruptFileError("Extended header size is smaller than required fields");
    //     }
    //
    //     Id3v2ExtendedHeader.readBlock(file, remainingSize);
    // }
}
