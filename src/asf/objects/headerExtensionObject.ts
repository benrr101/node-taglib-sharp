import BaseObject from "./baseObject";
import Guids from "../guids";
import {CorruptFileError} from "../../errors";
import {ByteVector} from "../../byteVector";

/**
 * This class extends {@link BaseObject} to provide a representation of an ASF header extension
 * object which can be read from and written to disk.
 */
export default class HeaderExtensionObject extends BaseObject {
    private _children: BaseObject[] = [];

    private constructor() {
        super();
    }

    /**
     * Constructs and initialized a new instance by reading the contents from a specified position
     * in the provided file.
     * @param file File containing contents that will be read into the new instance
     * @param position Position in the file where the instance begins
     */
    public static fromFile(file: AsfFile, position: number): HeaderExtensionObject {
        const instance = new HeaderExtensionObject();
        instance.initializeFromFile(file, position);

        if (!instance.guid.equals(Guids.AsfHeaderExtensionObject)) {
            throw new CorruptFileError("Object GUID does not match expected header extension object GUID");
        }
        if (!file.readGuid().equals(Guids.AsfReserved1)) {
            throw new CorruptFileError("Expected reserved1 GUID was not found");
        }
        if (file.readWord() !== 6) {
            throw new CorruptFileError("Invalid reserved word, expected '6'");
        }

        let sizeRemaining = file.readDWord();
        position += 0x170 / 8;

        while (sizeRemaining > 0) {
            const obj = file.readObject(position);
            position += obj.originalSize;
            sizeRemaining -= obj.originalSize;
            instance._children.push(obj);
        }

        return instance;
    }

    /**
     * Gets the child ASF objects contained in the current instance.
     */
    public children(): BaseObject[] { return this._children; }

    /**
     * Adds a unique child object to the current instance, replacing an existing child if present.
     * @param obj Object to add to the current instance
     */
    public addUniqueObject(obj: BaseObject): void {
        const existingIndex = this._children.findIndex((o) => o.guid.equals(obj.guid));
        if (existingIndex >= 0) {
            this._children[existingIndex] = obj;
        } else {
            this._children.push(obj);
        }
    }

    /** @inheritDoc */
    public render(): ByteVector {
        const renderedChildren = ByteVector.concatenate(...(this._children.map(o => o.render())));
        const output = ByteVector.concatenate(
            Guids.AsfHeaderExtensionObject.bytes,
            BaseObject.renderWord(6),
            BaseObject.renderDWord(renderedChildren.length),
            renderedChildren
        );
        return super.renderInternal(output);
    }
}
