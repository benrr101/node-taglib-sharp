import {Tag} from "../tag";
import RiffList from "./riffList";
import {Guards} from "../utils";
import {ByteVector, StringType} from "../byteVector";
import {File} from "../file";

/**
 * Abstract class that provides support for reading/writing tags in the RIFF list format.
 */
export default abstract class RiffListTag extends Tag {
    // @TODO: I think this can safely inherit from RiffList
    private _fields: RiffList;

    // #region Constructors

    protected constructor() {
        super();
    }

    protected initializeFromEmpty(): void {
        this._fields = new RiffList();
    }

    protected initializeFromList(fields: RiffList): void {
        Guards.truthy(fields, "fields");
        this._fields = fields;
    }

    protected initializeFromData(data: ByteVector): void {
        this._fields = RiffList.fromData(data);
    }

    protected initializeFromFile(file: File, position: number, length: number): void {
        this._fields = RiffList.fromFile(file, position, length);
    }

    // #endregion

    // #region Properties

    /**
     * Gets the type of string used for parsing and rendering the contents of this tag.
     */
    public get stringType(): StringType { return this._fields.stringType; }
    /**
     * Sets the type of string used for parsing and rendering the contents of this tag.
     * @remarks The value must be `StringType.Latin1` or `StringType.UTF8`.
     */
    public set stringType(value: StringType) {
        // @TODO: Add a guard here?
        this._fields.stringType = value;
    }

    // #endregion

    // #region Methods

    /**
     * Gets the value for a specified item in the current instance as an unsigned integer.
     * @param id ID of the item for which to get the value
     */
    public getValueAsUint(id: string): number {
        return this._fields.getValueAsUint(id);
    }

    /**
     * Gets the values for a specified item in the current instance.
     * @param id ID of the item of which to get the values
     */
    public getValues(id: string): ByteVector[] {
        return this._fields.getValues(id);
    }

    /**
     * Gets the values for a specified item in the current instance as strings.
     * @param id ID of the item of which to get the values
     */
    public getValuesAsStrings(id: string): string[] {
        return this._fields.getValuesAsStrings(id);
    }

    /**
     * Removed the item with the specified ID from the current instance.
     * @param id ID of the item to remove
     */
    public removeValue(id: ByteVector): void {
        this._fields.removeValue(id);
    }

    /**
     * Renders the current instance as a raw RIFF list.
     */
    public render(): ByteVector {
        return this._fields.render();
    }

    /**
     * Renders the current instance enclosed in the appropriate item.
     */
    public abstract renderEnclosed(): ByteVector;

    /**
     * Sets the value for a specified item in the current instance using an unsigned integer.
     * @param id ID of the item to set
     * @param value Value to store in the specified item, must be an unsigned 32-bit integer
     */
    public setValueFromUint(id: string, value: number): void {
        this._fields.setValueFromUint(id, value);
    }

    /**
     * Sets the value for a specified item in the current instance
     * @param id ID of the item to set
     * @param values Values to store in the specified item
     */
    public setValues(id: string, ... values: ByteVector[]): void {
        this._fields.setValues(id, ... values);
    }

    /**
     * Sets the value for a specified item in the current instance using a list of strings.
     * @param id ID of the item to set
     * @param values Values to store in the specified item
     */
    public setValuesFromStrings(id: string, ... values: string[]): void {
        this._fields.setValuesFromStrings(id, ... values);
    }

    /**
     * Renders the current instance enclosed in an item with a specified ID.
     * @param id ID of the item to enclose the current instance in when rendering
     */
    protected renderEnclosedInternal(id: string): ByteVector {
        Guards.truthy(id, "id");
        if (id.length !== 4) {
            throw new Error("ID must be 4 bytes long");
        }

        return this._fields.renderEnclosed(id);
    }

    // #endregion

}
