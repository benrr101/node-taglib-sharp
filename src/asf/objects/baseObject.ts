import ReadWriteUtils from "../readWriteUtils";
import UuidWrapper from "../../uuidWrapper";
import {ByteVector} from "../../byteVector";
import {ObjectType} from "../constants";
import {UnsupportedFormatError} from "../../errors";
import {File} from "../../file";
import {Guards} from "../../utils";

/**
 * Base object that provides a basic representation of an ASF object that can be written to and
 * read from the disk.
 */
export default abstract class BaseObject {
    // @TODO: Should _originalSize be 0 if it's not written to disk?
    // @TODO: Double check that we reset _originalSize after we save to disk (probably via re-reading after save)

    private readonly _id: UuidWrapper;
    private readonly _originalSize: number;

    //#region Initializers

    protected constructor(id: UuidWrapper, originalSize: number) {
        this._id = id;
        this._originalSize = originalSize;
    }

    //#endregion

    //#region Properties

    /**
     * Gets the GUID that identifies the current instance.
     */
    public get guid(): UuidWrapper { return this._id; }

    /**
     * Gets the type of the object for easy comparison.
     */
    public abstract get objectType(): ObjectType;

    /**
     * Gets the original size of the current instance.
     */
    public get originalSize(): number { return this._originalSize; }

    //#endregion

    //#region Methods

    /**
     * Renders the current instance as a raw ASF object.
     */
    public abstract render(): ByteVector;

    protected static readBaseProperties(file: File, position: number): {id: UuidWrapper, originalSize: number} {
        Guards.truthy(file, "file");
        Guards.uint(position, "position");
        Guards.lessThanInclusive(position, file.length - 24, "position");

        file.seek(position);
        const id = ReadWriteUtils.readGuid(file);

        const bigOriginalSize = ReadWriteUtils.readQWord(file);
        if (bigOriginalSize > BigInt(Number.MAX_SAFE_INTEGER)) {
            throw new UnsupportedFormatError("Object is too large to be handled with this version of library.");
        }
        const originalSize = Number(bigOriginalSize);

        return {id: id, originalSize: originalSize};
    }

    /**
     * Renders the current instance as a raw ASF object containing the specified data.
     * @remarks
     *     Child classes implementing {@link render()} should render their contents and then
     *     send the data through this method to produce the final output.
     * @param data Data to store in the rendered version of the current instance.
     */
    protected renderInternal(data: ByteVector): ByteVector {
        const length = BigInt((!!data ? data.length : 0) + 24);
        return ByteVector.concatenate(
            this._id.toBytes(),
            ReadWriteUtils.renderQWord(length),
            data
        );
    }

    //#endregion
}
