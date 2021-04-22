import {ByteVector, StringType} from "../byteVector";
import {Guards} from "../utils";
import {File} from "../file";

export default class RiffList {
    private _dict: {[key: string]: ByteVector[]} = {};
    private _stringType: StringType = StringType.UTF8;

    /**
     * Constructs and initializes a new instance by reading the contents of a raw RIFF list stored
     * in a {@link ByteVector} object.
     * @param data Object containing a raw RIFF list to read into the new instance.
     */
    public static fromData(data: ByteVector): RiffList {
        Guards.truthy(data, "data");

        const list = new RiffList();

        let offset = 0;
        while (offset + 8 < data.length) {
            const id = data.mid(offset, 4).toString(4);
            let length = data.mid(offset + 4, 4).toUInt(false);

            if (list._dict[id] === undefined) {
                list._dict[id] = [];
            }
            list._dict[id].push(data.mid(offset + 8, length));

            if (length % 2 === 1) {
                length++;
            }

            offset += 8 + length;
        }

        return list;
    }

    /**
     * Constructs and initializes a new instance by reading the contents of a raw RIFF list from a
     * specified position in a file.
     * @param file File containing the contents of the new instance
     * @param position Index into the file where the the list begins, must be safe positive integer
     * @param length Length of the list in bytes, must be a positive integer
     */
    public static fromFile(file: File, position: number, length: number): RiffList {
        Guards.truthy(file, "file");
        Guards.safeUint(position, "position");
        Guards.uint(length, "length");
        if (position > file.length - length) {
            throw new Error("Argument out of range: position must be less than file length");
        }

        file.seek(position);
        return RiffList.fromData(file.readBlock(length));
    }

    /**
     * Gets the {@link StringType} value used for parsing and rendering the contents of this list.
     */
    public get stringType(): StringType { return this._stringType; }
    /**
     * Sets the {@link StringType} value used for parsing and rendering the contents of this list.
     */
    public set stringType(value: StringType) { this._stringType = value; }

    // #region Methods



    // #endregion

}
