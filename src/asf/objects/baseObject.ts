import * as BigInt from "big-integer";
import UuidWrapper from "../../uuidWrapper";
import {Guards} from "../../utils";
import {ByteVector, StringType} from "../../byteVector";

/**
 * Base object that provides a basic representation of an ASF object that can be written to and
 * read from the disk.
 */
export default abstract class BaseObject {
    private _id: UuidWrapper;
    private _originalSize: number;

    // #region Initializers

    /**
     * Initializes a new instance by reading the contents from a specified position in a specified
     * file.
     * @param file File which contains the details of the new instance to create
     * @param position Position in `file` where the object begins
     * @protected
     */
    protected initializeFromFile(file: AsfFile, position: number): void {
        Guards.truthy(file, "file");
        Guards.lessThanInclusive(position, -1, "position");
        Guards.greaterThanInclusive(position, file.length - 25, "position");

        file.seek(position);
        this._id = file.readGuid();
        this._originalSize = file.readQWord();
        // TODO: warn if too big
    }

    /**
     * Initializes a new instance with a specified GUID.
     * @param guid GUID to use for the new instance.
     * @protected
     */
    protected initializeFromGuid(guid: UuidWrapper): void {
        this._id = guid;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the GUID that identifies the current instance.
     */
    public get guid(): UuidWrapper { return this._id; }

    /**
     * Gets the original size of the current instance.
     */
    public get originalSize(): number { return this._originalSize; }

    // #endregion

    // #region Methods

    /**
     * Renders a 4-byte double word.
     * @param value Double word to render
     */
    public static renderDWord(value: number): ByteVector {
        return ByteVector.fromUInt(value, false);
    }

    /**
     * Renders an 8-byte quad word.
     * @param value Quad word to render
     */
    public static renderQWord(value: BigInt.BigInteger): ByteVector {
        return ByteVector.fromULong(value, false);
    }

    /**
     * Renders a unicode string.
     * @param value Text to render
     */
    public static renderUnicode(value: string): ByteVector {
        return ByteVector.concatenate(
            ByteVector.fromString(value, StringType.UTF16LE),
            ByteVector.fromUShort(0, false)
        );
    }

    /**
     * Renders a 2-byte word.
     * @param value Word to render
     */
    public static renderWord(value: number): ByteVector {
        return ByteVector.fromUShort(value, false);
    }

    /**
     * Renders the current instance as a raw ASF object.
     */
    public abstract render(): ByteVector;

    // #endregion
}
