import ReadWriteUtils from "../readWriteUtils";
import UuidWrapper from "../../uuidWrapper";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {File} from "../../file";
import {Guards} from "../../utils";

/**
 * Indicates the type of data stored in a {@link ContentDescriptor} or {@link MetadataDescriptor} object.
 */
export enum DataType {
    /**
     * The descriptor contains Unicode (UTF-16LE) text.
     */
    Unicode = 0,

    /**
     * The descriptor contains binary data.
     */
    Bytes = 1,

    /**
     * The descriptor contains a boolean value.
     */
    Bool = 2,

    /**
     * The descriptor contains a 4-byte DWORD value.
     */
    DWord = 3,

    /**
     * The descriptor contains an 8-byte QWORD value.
     */
    QWord = 4,

    /**
     * The descriptor contains a 2-byte WORD value.
     */
    Word = 5,

    /**
     * The descriptor contains a 16-byte GUID value.
     */
    Guid = 6
}

export type DescriptorValue = bigint|boolean|ByteVector|number|string|UuidWrapper;

/**
 * Abstract class that forms the basis of extended content descriptors and metadata library records.
 */
// @TODO: Rename to BaseDescriptor and move all the descriptor objects to their own file.
export abstract class DescriptorBase<T extends DescriptorValue = DescriptorValue> {
    private readonly _name: string;
    private readonly _type: DataType;
    private readonly _value: T;

    protected constructor(name: string, type: DataType, value: T) {
        this._name = name;
        this._type = type;

        switch (type) {
            case DataType.Bool:
            case DataType.Bytes:
            case DataType.Guid:
            case DataType.Unicode:
                break;
            case DataType.DWord:
                Guards.uint(value as number, "value");
                break;
            case DataType.QWord:
                Guards.ulong(value as bigint, "value");
                break;
            case DataType.Word:
                Guards.ushort(value as number, "value");
                break;
            default:
                throw new CorruptFileError(`Invalid datatype ${type}`);
        }

        this._value = value;
    }

    //#region Properties

    /**
     * Gets the name of the current instance.
     */
    public get name(): string { return this._name; }

    /**
     * Gets the type of data contained in the current instance.
     */
    public get type(): DataType { return this._type; }

    /**
     * Gets the value of the data contained in the current instance.
     */
    public get value(): T { return this._value; }

    //#endregion

    //#region Methods

    public isBinary(): this is DescriptorBase<ByteVector> {
        return this._type === DataType.Bytes;
    }

    public isNumber(): this is DescriptorBase<number> {
        return this._type === DataType.Word
            || this._type === DataType.DWord;
    }

    public isString(): this is DescriptorBase<string> {
        return this._type === DataType.Unicode;
    }

    public abstract render(): ByteVector;

    /** @inheritDoc */
    public toString(): string {
        switch (this._type) {
            case DataType.Bool:
                return (this.value as boolean).toString();
            case DataType.Bytes:
                return this.value.toString(StringType.UTF16LE);
            case DataType.DWord:
            case DataType.QWord:
            case DataType.Word:
                return (this.value as number).toString();
            case DataType.Guid:
                return (this.value as UuidWrapper).toString();
            case DataType.Unicode:
                return this.value as string;
        }
    }

    //#endregion

    //#region Protected Methods

    protected static readValue(
        file: File,
        dataType: DataType,
        dataLength: number,
        booleanReader: (file: File, dataLength: number) => boolean
    ): DescriptorValue {
        switch (dataType) {
            case DataType.Word:
                return ReadWriteUtils.readWord(file);
            case DataType.Bool:
                return booleanReader(file, dataLength);
            case DataType.DWord:
                return ReadWriteUtils.readDWord(file);
            case DataType.QWord:
                return ReadWriteUtils.readQWord(file);
            case DataType.Unicode:
                return ReadWriteUtils.readUnicode(file, dataLength);
            case DataType.Bytes:
                return file.readBlock(dataLength);
            case DataType.Guid:
                return ReadWriteUtils.readGuid(file);
            default:
                throw new CorruptFileError("Failed to parse description record.");
        }
    }

    protected renderValue(booleanRenderer: (value: boolean) => ByteVector): ByteVector {
        switch (this._type) {
            case DataType.Bool:
                return booleanRenderer(this._value as boolean);
            case DataType.Bytes:
                return this._value as ByteVector;
            case DataType.DWord:
                return ReadWriteUtils.renderDWord(this._value as number);
            case DataType.Guid:
                return (this._value as UuidWrapper).toBytes();
            case DataType.QWord:
                return ReadWriteUtils.renderQWord(this._value as bigint);
            case DataType.Unicode:
                return ReadWriteUtils.renderUnicode(this._value as string);
            case DataType.Word:
                return ReadWriteUtils.renderWord(this._value as number);
        }
    }

    //#endregion
}
