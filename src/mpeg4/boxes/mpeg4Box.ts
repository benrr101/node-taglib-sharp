import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";
import {ArrayUtils, Guards} from "../../utils";

/**
 * This class provides a generic implementation of a ISO/IEC 14496-12 box.
 */
export default abstract class Mpeg4Box {
    private readonly _children: Mpeg4Box[];

    private _data: ByteVector;
    private _handlerType: ByteVector;
    private _header: Mpeg4BoxHeader;
    private _baseDataPosition: number;
    private _dataPosition: number;

    /**
     * Protected constructor to force construction via static functions.
     */
    protected constructor() {
        this._children = [];
    }

    /**
     * Initializes a new instance of @see Mpeg4Box with a specified header and handler.
     * @param header A @see Mpeg4BoxHeader object describing the new instance.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     * new instance, or undefined if no handler applies.
     */
    protected initializeFromHeader(header: Mpeg4BoxHeader, handlerType?: ByteVector): void {
        Guards.truthy(header, "header");

        this._header = header;
        this._baseDataPosition = header.position + header.headerSize;
        this._dataPosition = this._baseDataPosition;
        this._handlerType = handlerType;
    }

    /**
     * Initializes a new instance of @see Mpeg4Box with a specified box type.
     * @param type A @see ByteVector object containing the box type to use for the new instance.
     */
    protected initializeFromType(type: ByteVector): void {
        return this.initializeFromHeader(Mpeg4BoxHeader.fromType(type));
    }

    // #region Properties

    /**
     * Gets the MPEG-4 box type of the current instance.
     */
    public get boxType(): ByteVector { return this._header.boxType; }

    /**
     * Gets the child boxes of the current instance.
     * @internal
     */
    public get children(): Mpeg4Box[] { return this._children.slice(0); }

    /**
     * Gets the data contained in the current instance.
     */
    public get data(): ByteVector { return this._data; }
    /**
     * Sets the data contained in the current instance.
     */
    public set data(v: ByteVector) {
        Guards.truthy(v, "v");
        this._data = v;
    }

    /**
     * Gets the position of the data contained in the current instance, after any box specific headers.
     */
    public get dataPosition(): number {
        return this._dataPosition;
    }
    /**
     * Gets the size of the data contained in the current instance, minus the size of any box specific headers.
     */
    public get dataSize(): number { return this._header.dataSize + this._baseDataPosition - this.dataPosition; }

    /**
     * Gets the type of the handler box that applies to the current instance.
     */
    public get handlerType(): ByteVector { return this._handlerType; }

    /**
     * Gets whether the current instance has children.
     */
    public get hasChildren(): boolean { return this._children.length > 0; }

    /**
     * Gets the header of the current instance.
     */
    public get header(): Mpeg4BoxHeader { return this._header; }

    /**
     * Gets the total size of the current instance as it last appeared on disk.
     */
    public get size(): number { return this._header.totalBoxSize; }

    // #endregion

    // #region Public Methods

    /**
     * Adds a specified box to the current instance.
     * @param box A @see Mpeg4Box object to add to the current instance.
     */
    public addChild(box: Mpeg4Box): void {
        Guards.truthy(box, "box");
        this._children.push(box);
    }

    /**
     * Removes all children from the current instance.
     */
    public clearChildren(): void {
        this._children.splice(0, this._children.length);
    }

    /**
     * Gets a child box from the current instance by finding a matching box type.
     * @param type A @see ByteVector object containing the box type to match.
     * @param predicate Optional predicate to filter boxes with the provided type.
     * @returns TBox Box containing the matched box, or `undefined` if no match was found.
     */
    public getChild<TBox extends Mpeg4Box>(type: ByteVector, predicate?: (b: TBox) => boolean): TBox {
        return <TBox>this._children.find((b) => {
            return ByteVector.equals(b.boxType, type) && (!predicate || predicate(<TBox>b));
        });
    }

    /**
     * Gets a child box from the current instance by finding a matching box type, searching recursively.
     * @param type A @see ByteVector object containing the box type to match.
     * @returns Mpeg4Box Matching box, or `undefined` if no matching box was found
     */
    public getChildRecursively(type: ByteVector): Mpeg4Box {
        // Check local children for a match
        const localMatch = this._children.find(b => ByteVector.equals(b.boxType, type));
        if (localMatch) {
            return localMatch;
        }

        // Recurse
        for (const box of this._children) {
            const childBox = box.getChildRecursively(type);

            if (childBox) {
                return childBox;
            }
        }

        return undefined;
    }

    /**
     * Gets all child boxes from the current instance by finding a matching box type.
     * @param type A @see ByteVector object containing the box type to match.
     * @param predicate Optional predicate to filter boxes with the provided type.
     * @returns Mpeg4Box[] Array of matching boxes, or `undefined` if no matching boxes was found.
     */
    public getChildren<TBox extends Mpeg4Box>(type: ByteVector, predicate?: (b: TBox) => boolean): TBox[] {
        return <TBox[]>this._children.filter((b) => {
            return ByteVector.equals(b.boxType, type) && (!predicate || predicate(<TBox>b));
        });
    }

    /**
     * Removes a specified box from the current instance.
     * @param box Box to remove from the current instance.
     */
    public removeChildByBox(box: Mpeg4Box): void {
        const index = this._children.indexOf(box);

        if (index > -1) {
            this._children.splice(index, 1);
        }
    }

    /**
     * Removes all children with a specified box type from the current instance.
     * @param type Type of box to remove
     */
    public removeChildByType(type: ByteVector): void {
        for (let i = this._children.length - 1; i >= 0; i--) {
            if (ByteVector.equals(this._children[i].boxType, type)) {
                this._children.splice(i, 1);
            }
        }
    }

    /**
     * Removes all specified boxes from the current instance.
     * @param boxes Collection of boxes to remove from the current instance.
     */
    public removeChildrenByBox(boxes: Mpeg4Box[]): void {
        if (ArrayUtils.isFalsyOrEmpty(boxes)) {
            // Nothing to do.
            return;
        }

        ArrayUtils.remove(this._children, e => boxes.includes(e));
    }

    // #endregion

    /**
     * Loads the data of the current instance from a specified file using the internal data position and size.
     * @param file The @see File from which the current instance was read and from which to read the data.
     * @returns ByteVector Data read from the file.
     */
    public loadData(file: File): ByteVector {
        Guards.truthy(file, "file");

        file.seek(this.dataPosition);

        return file.readBlock(this.dataSize);
    }

    /**
     * Increases the data position by a given value. This function can be used by boxes
     * which extend from @see Mpeg4Box to increase the data position, because the data
     * is located after their box specific headers.
     * @param value The value to add to the data position.
     * @returns number Data position before the increase.
     */
    public increaseDataPosition(value: number): number {
        Guards.safeUint(value, "value");

        const dataPositionBeforeIncrease = this._dataPosition;
        this._dataPosition += value;

        return dataPositionBeforeIncrease;
    }

    /**
     * Generates the headers that are specific to the box type for use in rendering.
     * @internal
     */
    public renderBoxHeaders(): ByteVector[] {
        return undefined;
    }
}


