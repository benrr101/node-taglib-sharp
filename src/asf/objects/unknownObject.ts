import BaseObject from "./baseObject";
import UuidWrapper from "../../uuidWrapper";
import {ByteVector} from "../../byteVector";
import {ObjectType} from "../constants";
import {File} from "../../file";
import {Guards} from "../../utils";

/**
 * This class provides a representation of an ASF object that is unknown to the library, which can
 * be read from and written to disk.
 */
export default class UnknownObject extends BaseObject {
    private _data: ByteVector;

    private constructor(id: UuidWrapper, originalSize: number, data: ByteVector) {
        super(id, originalSize);
        this._data = data;
    }

    /**
     * Constructs and initializes a new instance by reading the contents from a specified file.
     * @param file File from which the contents of the new instance will be read
     * @param position Index into the file where the object begins
     */
    public static fromFile(file: File, position: number): UnknownObject {
        const objectProperties = this.readBaseProperties(file, position);

        const data = file.readBlock(objectProperties.originalSize - 24);
        return new UnknownObject(objectProperties.id, objectProperties.originalSize, data);
    }

    //#region Properties

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
    public get objectType(): ObjectType { return ObjectType.UnknownObject; }

    //#endregion

    /** @inheritDoc */
    public render(): ByteVector {
        return super.renderInternal(this._data);
    }
}
