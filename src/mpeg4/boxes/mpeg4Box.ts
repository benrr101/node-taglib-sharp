import IsoFreeSpaceBox from "./isoFreeSpaceBox";
import IsoHandlerBox from "./isoHandlerBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import Mpeg4BoxType from "../mpeg4BoxType";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {Guards} from "../../utils";

export type ChildFactory = (
    file: File,
    position: number,
    parentHeader: Mpeg4BoxHeader,
    handler: IsoHandlerBox,
    index: number
) => Mpeg4Box;

/**
 * This class provides a generic implementation of a ISO/IEC 14496-12 box.
 */
export default abstract class Mpeg4Box {
    /**
     * Contains the data contained in the current instance.
     */
    private _data: ByteVector;

    /**
     * Contains the box header.
     */
    private _header: Mpeg4BoxHeader;

    /**
     * Contains the position of the box data.
     */
    private _baseDataPosition: number;

    /**
     * Contains the position of the data contained in the current instance, after any box specific headers.
     */
    private _dataPosition: number;

    /**
     * Gets the position of the data contained in the current instance, after any box specific headers.
     */
    public get dataPosition(): number {
        return this._dataPosition;
    }

    /**
     * The handler box that applies to the current instance.
     */
    private _handler: IsoHandlerBox;

    /**
     * The children of the current instance.
     */
    public children: Mpeg4Box[];

    /**
     * Gets a flag indicating which type of box the current instance is.
     */
    public abstract get boxClassType(): Mpeg4BoxClassType;

    /**
     * Protected constructor to force construction via static functions.
     */
    protected constructor() { /* no-op */ }

    /**
     * Initializes a new instance of @see Mpeg4Box with a specified header and handler.
     * @param header A @see Mpeg4BoxHeader object describing the new instance.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance,
     * or undefined if no handler applies.
     */
    protected initializeFromHeaderAndHandler(header: Mpeg4BoxHeader, handler: IsoHandlerBox): void {
        this._header = header;
        this._baseDataPosition = header.position + header.headerSize;
        this._dataPosition = this._baseDataPosition;
        this._handler = handler;
    }

    /**
     * Initializes a new instance of @see Mpeg4Box with a specified header.
     * @param header A @see Mpeg4BoxHeader object describing the new instance.
     */
    protected initializeFromHeader(header: Mpeg4BoxHeader): void {
        return this.initializeFromHeaderAndHandler(header, undefined);
    }

    /**
     * Initializes a new instance of @see Mpeg4Box with a specified box type.
     * @param type A @see ByteVector object containing the box type to use for the new instance.
     */
    protected initializeFromType(type: ByteVector): void {
        return this.initializeFromHeader(Mpeg4BoxHeader.fromType(type));
    }

    /**
     * Gets the MPEG-4 box type of the current instance.
     */
    public get boxType(): ByteVector {
        return this._header.boxType;
    }

    /**
     * Gets the total size of the current instance as it last appeared on disk.
     */
    public get size(): number {
        return this._header.totalBoxSize;
    }

    /**
     * Gets the data contained in the current instance.
     */
    public get data(): ByteVector { return this._data; }
    /**
     * Sets the data contained in the current instance.
     */
    public set data(v: ByteVector) { this._data = v; }

    /**
     * Gets whether or not the current instance has children.
     */
    public get hasChildren(): boolean { return this.children && this.children.length > 0; }

    /**
     * Gets the handler box that applies to the current instance.
     */
    public get handler(): IsoHandlerBox { return this._handler; }

    /**
     * Gets the size of the data contained in the current instance, minus the size of any box specific headers.
     */
    protected get dataSize(): number { return this._header.dataSize + this._baseDataPosition - this.dataPosition; }

    /**
     * Gets the header of the current instance.
     */
    protected get header(): Mpeg4BoxHeader { return this._header; }

    /**
     * Renders the current instance, including its children, to a new ByteVector object.
     * @returns A @see ByteVector object containing the rendered version of the current instance.
     */
    public render(): ByteVector {
        return this.renderUsingTopData(ByteVector.empty());
    }

    /**
     * Gets a child box from the current instance by finding a matching box type.
     * @param type  A @see ByteVector object containing the box type to match.
     * @returns  A @see Mpeg4Box object containing the matched box, or undefined if no matching box was found.
     */
    public getChild(type: ByteVector): Mpeg4Box {
        if (!this.children) {
            return undefined;
        }

        for (const box of this.children) {
            if (ByteVector.equals(box.boxType, type)) {
                return box;
            }
        }

        return undefined;
    }

    public getChildByBoxClassType<TBox extends Mpeg4Box>(boxClassType: Mpeg4BoxClassType, type: ByteVector): TBox {
        return <TBox>this.children.find(b => b.boxClassType === boxClassType && ByteVector.equals(b.boxType, type));
    }

    /**
     * Gets all child boxes with a specific box class type.
     * @param boxClassType Box class type of the child boxes to find
     * @returns TBox[] Array of child boxes with the specified box class type
     */
    public getChildrenByBoxClassType<TBox extends Mpeg4Box>(boxClassType: Mpeg4BoxClassType): TBox[] {
        Guards.notNullOrUndefined(boxClassType, "boxClassType");

        return <TBox[]>this.children.filter((c) => c.boxClassType === boxClassType);
    }

    /**
     * Gets all child boxes from the current instance by finding a matching box type.
     * @param type A @see ByteVector object containing the box type to match.
     * @returns A @see Mpeg4Box[] object containing the matched box, or undefined if no matching boxes was found.
     */
    public getChildren(type: ByteVector): Mpeg4Box[] {
        if (!this.children) {
            return undefined;
        }

        const boxes: Mpeg4Box[] = [];

        for (const box of this.children) {
            if (ByteVector.equals(box.boxType, type)) {
                boxes.push(box);
            }
        }

        if (boxes.length > 0) {
            return boxes;
        }

        return undefined;
    }

    /**
     * Gets a child box from the current instance by finding a matching box type, searching recursively.
     * @param type  A @see ByteVector object containing the box type to match.
     * @returns A @see Mpeg4Box object containing the matched box, or undefined if no matching box was found.
     */
    public getChildRecursively(type: ByteVector): Mpeg4Box {
        if (!this.children) {
            return undefined;
        }

        for (const box of this.children) {
            if (ByteVector.equals(box.boxType, type)) {
                return box;
            }
        }

        for (const box of this.children) {
            const childBox: Mpeg4Box = box.getChildRecursively(type);

            if (childBox) {
                return childBox;
            }
        }

        return undefined;
    }

    /**
     * Removes all children with a specified box type from the current instance.
     * @param type A @see ByteVector object containing the box type to remove.
     */
    public removeChildByType(type: ByteVector): void {
        if (!this.children) {
            return;
        }

        for (const box of this.children) {
            if (ByteVector.equals(box.boxType, type)) {
                const index = this.children.indexOf(box);

                if (index > -1) {
                    this.children.splice(index, 1);
                }
            }
        }
    }

    /**
     * Removes a specified box from the current instance.
     * @param box A @see Mpeg4Box object to remove from the current instance.
     */
    public removeChildByBox(box: Mpeg4Box): void {
        if (!this.children) {
            return;
        }

        const index = this.children.indexOf(box);

        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    /**
     * Adds a specified box to the current instance.
     * @param box A @see Mpeg4Box object to add to the current instance.
     */
    public addChild(box: Mpeg4Box): void {
        if (!this.children) {
            return;
        }

        this.children.push(box);
    }

    /**
     * Removes all children from the current instance.
     */
    public clearChildren(): void {
        if (!this.children) {
            return;
        }

        this.children = [];
    }

    /**
     * Loads the children of the current instance from a specified file using the internal data position and size.
     * @param file The File from which the current instance was read and from which to read the children.
     * @returns A @see Mpeg4Box[] object enumerating the boxes read from the file.
     */
    public loadChildren(file: File, childFactory: ChildFactory): Mpeg4Box[] {
        Guards.notNullOrUndefined(file, "file");

        const children: Mpeg4Box[] = [];

        let position: number = this.dataPosition;
        const end: number = position + this.dataSize;

        this._header.box = this;

        while (position < end) {
            const child: Mpeg4Box = childFactory(file, position, this._header, this.handler, children.length);
            if (child.size === 0) {
                break;
            }

            children.push(child);
            position += child.size;
        }

        this._header.box = undefined;

        return children;
    }

    /**
     * Loads the data of the current instance from a specified file using the internal data position and size.
     * @param file The @see File from which the current instance was read and from which to read the data.
     * @returns A @see ByteVector object containing the data read from the file.
     */
    public loadData(file: File): ByteVector {
        Guards.notNullOrUndefined(file, "file");

        file.seek(this.dataPosition);

        return file.readBlock(this.dataSize);
    }

    /**
     * Renders the current instance, including its children, to a new @see ByteVector object, preceding the
     * contents with a specified block of data.
     * @param topData  A @see ByteVector object containing box specific header data to precede the content.
     * @returns A @see ByteVector object containing the rendered version of the current instance.
     */
    protected renderUsingTopData(topData: ByteVector): ByteVector {
        let freeFound = false;
        const output: ByteVector = ByteVector.empty();

        if (this.children) {
            for (const box of this.children) {
                if (box instanceof IsoFreeSpaceBox) {
                    freeFound = true;
                } else {
                    output.addByteVector(box.render());
                }
            }
        } else if (this.data) {
            output.addByteVector(this.data);
        }

        // If there was a free, don't take it away, and let meta be a special case.
        if (freeFound || ByteVector.equals(this.boxType, Mpeg4BoxType.META)) {
            const sizeDifference: number = this.dataSize - output.length;

            if (this._header.dataSize !== 0 && sizeDifference >= 8) {
                // If we have room for free space, add it so we don't have to resize the file.
                output.addByteVector(IsoFreeSpaceBox.fromPadding(sizeDifference).render());
            } else {
                // If we're getting bigger, get a lot bigger so we might not have to again.
                output.addByteVector(IsoFreeSpaceBox.fromPadding(2048).render());
            }
        }

        // Adjust the header's data size to match the content.
        this._header.dataSize = topData.length + output.length;

        // Render the full box.
        output.splice(0, 0, topData);
        output.splice(0, 0, this._header.render());

        return output;
    }

    /**
     * Increases the data position by a given value. This function can be used by boxes
     * which extend from @see Mpeg4Box to increase the data position, because the data
     * is located after their box specific headers.
     * @param value The value to add to the data position.
     * @returns The value of the data position before the increase.
     */
    public increaseDataPosition(value: number): number {
        const dataPositionBeforeIncrease: number = this._dataPosition;

        this._dataPosition += value;

        return dataPositionBeforeIncrease;
    }
}
