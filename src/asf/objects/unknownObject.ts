import BaseObject from "./baseObject";
import {ByteVector} from "../../byteVector";
import AsfFile from "../asfFile";
import {Guards} from "../../utils";

/**
 * This class provides a representation of an ASF object that is unknown to the library, which can
 * be read from and written to disk.
 */
export default class UnknownObject extends BaseObject {
    private _data: ByteVector;

    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance by reading the contents from a specified file.
     * @param file File from which the contents of the new instance will be read
     * @param position Index into the file where the object begins
     */
    public fromFile(file: AsfFile, position: number): UnknownObject {
        const instance = new UnknownObject();
        instance.initializeFromFile(file, position);
        instance._data = file.readBlock(this.originalSize - 24);
        return instance;
    }

    /**
     * Gets the data contained in the current instance.
     */
    public get data(): ByteVector { return this._data; }
    /**
     * Sets the data contained in the current instance.
     * @param value Data to store in the current instance. Must be truthy.
     */
    public set data(value: ByteVector) {
        Guards.truthy(value, "value");
        this._data = value;
    }

    /** @inheritDoc */
    public render(): ByteVector {
        return super.renderInternal(this._data);
    }
}