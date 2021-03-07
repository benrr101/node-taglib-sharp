import AsfFile from "../asfFile";
import UuidWrapper from "../../uuidWrapper";
import {ByteVector, StringType} from "../../byteVector";
import {Guards} from "../../utils";
import {UnsupportedFormatError} from "../../errors";

/**
 * Base object that provides a basic representation of an ASF object that can be written to and
 * read from the disk.
 */
export default abstract class BaseObject {
    private _id: UuidWrapper;
    private _originalSize: number;

    // #region Initializers

    protected constructor() {
    }

    /**
     * Initializes a new instance by reading the contents from a specified position in a specified
     * file.
     * @param file File which contains the details of the new instance to create
     * @param position Position in `file` where the object begins
     * @protected
     */
    protected initializeFromFile(file: AsfFile, position: number): void {
        Guards.truthy(file, "file");
        Guards.uint(position, "position");
        Guards.lessThanInclusive(position, file.length - 24, "position");

        file.seek(position);
        this._id = file.readGuid();

        const bigOriginalSize = file.readQWord();
        if (bigOriginalSize > BigInt(Number.MAX_SAFE_INTEGER)) {
            throw new UnsupportedFormatError("Object is too large to be handled with this version of library.");
        }
        this._originalSize = Number(bigOriginalSize);
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
    public static renderQWord(value: bigint): ByteVector {
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

    /**
     * Renders the current instance as a raw ASF object containing the specified data.
     * @param data Data to store in the rendered version of the current instance.
     * @remarks Child classes implementing {@see render()} should render their contents and then
     *     send the data through this method to produce the final output.
     */
    protected renderInternal(data: ByteVector): ByteVector {
        const length = BigInt((!!data ? data.length : 0) + 24);
        return ByteVector.concatenate(
            ByteVector.fromByteArray(this._id.toBytes()),
            BaseObject.renderQWord(length),
            data
        );
    }

    // #endregion
}
