import {ByteVector, StringType} from "../../byteVector";
import UuidWrapper from "../../uuidWrapper";
import {Guards} from "../../utils";
import {DataType} from "../dataType";
import AsfFile from "../asfFile";
import {CorruptFileError} from "../../errors";
import BaseObject from "./baseObject";

export class DescriptionRecord {
    private readonly _languageListIndex: number;
    private readonly _name: string;
    private readonly _streamNumber: number;
    private readonly _type: DataType;

    private _boolValue: boolean;
    private _byteValue: ByteVector;
    private _dWordValue: number;
    private _guidValue: UuidWrapper;
    private _qWordValue: bigint;
    private _stringValue: string;
    private _wordValue: number;

    // #region Constructors

    private constructor(languageListIndex: number, streamNumber: number, name: string, type: DataType) {
        Guards.ushort(languageListIndex, "languageListIndex");
        Guards.ushort(streamNumber, "streamNumber");

        this._languageListIndex = languageListIndex;
        this._streamNumber = streamNumber;
        this._name = name;
        this._type = type;
    }

    /**
     * Constructs and initializes a new instance with a specified language, stream, name and
     * boolean value.
     * @param languageListIndex Language list index of the new instance
     * @param streamNumber Stream number of the new instance
     * @param name Name of the new instance
     * @param value Boolean value for the new instance
     */
    public fromBool(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: boolean
    ): DescriptionRecord {
        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.Bool);
        this._boolValue = value;
        return instance;
    }

    /**
     * Constructs and initializes a new instance with a specified language, stream, name and
     * byte value.
     * @param languageListIndex Language list index of the new instance
     * @param streamNumber Stream number of the new instance
     * @param name Name of the new instance
     * @param value Byte value for the new instance
     */
    public fromBytes(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: ByteVector
    ): DescriptionRecord {
        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.Bytes);
        this._byteValue = value;
        return instance;
    }

    /**
     * Instantiates a new instance by reading in the contents from a file.
     * @param file The file to read the raw ASF description record from
     * @internal
     */
    public fromFile(file: AsfFile): DescriptionRecord {
        Guards.truthy(file, "file");

        // Field name          Field type Size (bits)
        // Language List Index WORD       16
        // Stream Number       WORD       16
        // Name Length         WORD       16
        // Data Type           WORD       16
        // Data Length         DWORD      32
        // Name                WCHAR      varies
        // Data                See below  varies

        const languageListIndex = file.readWord();
        const streamNumber = file.readWord();
        const nameLength = file.readWord();
        const dataType = file.readWord();
        const dataLength = file.readDWord();
        const name = file.readUnicode(nameLength);
        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, dataType);

        switch (dataType) {
            case DataType.Word:
                this._wordValue = file.readWord();
                break;
            case DataType.Bool:
                this._boolValue = file.readDWord() > 0;
                break;
            case DataType.DWord:
                this._dWordValue = file.readDWord();
                break;
            case DataType.QWord:
                this._qWordValue = file.readQWord();
                break;
            case DataType.Unicode:
                this._stringValue = file.readUnicode(dataLength);
                break;
            case DataType.Bytes:
                this._byteValue = file.readBlock(dataLength);
                break;
            case DataType.Guid:
                this._guidValue = file.readGuid();
                break;
            default:
                throw new CorruptFileError("Failed to parse description record.");
        }

        return instance;
    }

    /**
     * Constructs and initializes a new instance with a specified language, stream, name and
     * GUID value.
     * @param languageListIndex Language list index of the new instance
     * @param streamNumber Stream number of the new instance
     * @param name Name of the new instance
     * @param value GUID value for the new instance
     */
    public fromGuid(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: UuidWrapper
    ): DescriptionRecord {
        Guards.truthy(value, "value");

        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.Guid);
        this._guidValue = value;
        return instance;
    }

    /**
     * Constructs and initializes a new instance with a specified language, stream, name and
     * unicode value.
     * @param languageListIndex Language list index of the new instance
     * @param streamNumber Stream number of the new instance
     * @param name Name of the new instance
     * @param value Unicode string value for the new instance
     */
    public fromString(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: string
    ): DescriptionRecord {
        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.Unicode);
        this._stringValue = value;
        return instance;
    }

    /**
     * Constructs and initializes a new instance with a specified language, stream, name and
     * quad word (unsigned long) value.
     * @param languageListIndex Language list index of the new instance
     * @param streamNumber Stream number of the new instance
     * @param name Name of the new instance
     * @param value Quad word value for the new instance, expressed as a bigint
     */
    public fromUlong(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: bigint
    ): DescriptionRecord {
        Guards.ulong(value, "value");

        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.QWord);
        this._qWordValue = value;
        return instance;
    }

    /**
     * Constructs and initializes a new instance with a specified language, stream, name and
     * double word (unsigned integer) value.
     * @param languageListIndex Language list index of the new instance
     * @param streamNumber Stream number of the new instance
     * @param name Name of the new instance
     * @param value Boolean value for the new instance
     */
    public fromUint(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: number
    ): DescriptionRecord {
        Guards.uint(value, "value");

        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.DWord);
        this._dWordValue = value;
        return instance;
    }

    /**
     * Constructs and initializes a new instance with a specified language, stream, name and
     * word (unsigned short) value.
     * @param languageListIndex Language list index of the new instance
     * @param streamNumber Stream number of the new instance
     * @param name Name of the new instance
     * @param value Boolean value for the new instance
     */
    public fromUshort(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: number
    ): DescriptionRecord {
        Guards.ushort(value, "value");

        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.Word);
        this._wordValue = value;
        return instance;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the index of the language associated with the current instance.
     */
    public get languageListIndex(): number { return this._languageListIndex; }

    /**
     * Gets the name of the current instance.
     */
    public get name(): string { return this._name; }

    /**
     * Gets the index of the stream associated with the current instance.
     */
    public get streamNumber(): number { return this._streamNumber; }

    /**
     * Gets the type of data contained in the current instance.
     */
    public get type(): DataType { return this._type; }

    // #endregion

    // #region Methods

    /**
     * Gets the boolean value of the current instance.
     * @returns boolean Boolean value of the current instance is returned if {@link type} is
     *     {@link DataType.Bool}. `undefined` is returned otherwise.
     */
    public getBool(): boolean { return this._boolValue; }

    /**
     * Gets the binary contents of the current instance.
     * @returns ByteVector Byte contents of the current instance, if {@link type} is
     *     {@link DataType.Bytes}. `undefined` is returned otherwise.
     */
    public getByte(): ByteVector { return this._byteValue; }

    /**
     * Gets the guid contents of the current instance.
     * @returns UuidWrapper GUID contents of the current instance, if {@link type} is
     *     {@link DataType.Guid}. `undefined` is returned otherwise.
     */
    public getGuid(): UuidWrapper { return this._guidValue; }

    /**
     * Gets the 64-bit quad word contents of the current instance.
     * @returns bigint Quad word contents of the current instance, if {@link type} is
     *     {@link DataType.QWord}. `undefined` is returned otherwise.
     */
    public getLong(): bigint { return this._qWordValue; }

    /**
     * Gets the 16-bit word contents of the current instance.
     * @returns number Word contents of the current instance, if {@link type} is
     *     {@link DataType.Word}. `undefined` is returned otherwise.
     */
    public getShort(): number { return this._wordValue; }

    /**
     * Gets the 32-bit double word contents of the current instance.
     * @returns number Double word contents of the current instance, if {@link type} is
     *      {@link DataType.DWord}. `undefined` is returned otherwise.
     */
    public getUint(): number { return this._dWordValue; }

    public render(): ByteVector {
        let value: ByteVector;
        switch (this._type) {
            case DataType.QWord:
                value = BaseObject.renderQWord(this._qWordValue);
                break;
            case DataType.DWord:
                value = BaseObject.renderDWord(this._dWordValue);
                break;
            case DataType.Word:
                value = BaseObject.renderWord(this._wordValue);
                break;
            case DataType.Bool:
                value = BaseObject.renderWord(this._boolValue ? 1 : 0);
                break;
            case DataType.Unicode:
                value = BaseObject.renderUnicode(this._stringValue);
                break;
            case DataType.Bytes:
                value = this._byteValue;
                break;
            case DataType.Guid:
                value = ByteVector.fromByteArray(this._guidValue.toBytes());
                break;
        }

        return ByteVector.concatenate(
            BaseObject.renderWord(this._languageListIndex),
            BaseObject.renderWord(this._streamNumber),
            BaseObject.renderWord(this._name.length),
            BaseObject.renderWord(this._type),
            BaseObject.renderDWord(value.length),
            BaseObject.renderUnicode(this._name),
            value
        );
    }

    /** @inheritDoc */
    public toString(): string {
        switch (this._type) {
            case DataType.QWord:
                return this._qWordValue.toString();
            case DataType.DWord:
                return this._dWordValue.toString();
            case DataType.Word:
                return this._wordValue.toString();
            case DataType.Bool:
                return this._boolValue.toString();
            case DataType.Unicode:
                return this._stringValue;
            case DataType.Bytes:
                return this._byteValue.toString(undefined, StringType.UTF16LE);
            case DataType.Guid:
                return this._guidValue.toString();
        }
        return undefined;
    }

    // #endregion
}
