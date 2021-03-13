import BaseObject from "./baseObject";
import Guids from "../guids";
import {ByteVector} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {File} from "../../file";
import {Guards} from "../../utils";

/**
 * This class provides a representation of an ASF padding object which can be read from and
 * written to disk.
 */
export default class PaddingObject extends BaseObject {

    private _size: number;

    // #region Constructors

    private constructor() {
        super();
    }

    public static fromFile(file: AsfFile, position: number): PaddingObject {
        const instance = new PaddingObject();
        instance.initializeFromFile(file, position);

        if (!instance.guid.equals(Guids.AsfPaddingObject)) {
            throw new CorruptFileError("Object GUID does not match expected padding object GUID");
        }
        if (instance.originalSize < 24) {
            throw new CorruptFileError("Padding object is too small");
        }

        instance._size = instance.originalSize;
        return instance;
    }

    public static fromSize(size: number): PaddingObject {
        Guards.safeUint(size, "size");

        const instance = new PaddingObject();
        instance.initializeFromGuid(Guids.AsfPaddingObject);
        instance._size = size;

        return instance;
    }

    // #endregion

    /**
     * Gets the number of bytes the current instance will take up on disk.
     */
    public get size(): number { return this._size; }
    /**
     * Sets the number of bytes the current instance will take up on disk.
     * @param value Size of the current instance in bytes, must be a safe, positive integer.
     */
    public set size(value: number) {
        Guards.safeUint(value, "value");
        this._size = value;
    }

    /** @inheritDoc */
    public render(): ByteVector {
        return super.renderInternal(ByteVector.fromSize(this._size - 24));
    }
}
