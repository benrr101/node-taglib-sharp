import AsfFile from "../asfFile";
import BaseObject from "./baseObject";
import Guids from "../guids";
import UuidWrapper from "../../uuidWrapper";
import {ByteVector, StringType} from "../../byteVector";
import {DataType} from "../dataType";
import {CorruptFileError} from "../../errors";
import {Guards} from "../../utils";

/**
 * This class provides a representation of an ASF description record to be used inside a
 * MetadataLibraryObject.
 * @remarks This class can store various types of information. Although {@link toString} provides
 *     a representation of all types of values, it is recommended to determine which of the `get*`
 *     methods to use by accessing {@link type}
 */
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
    public static fromBool(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: boolean
    ): DescriptionRecord {
        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.Bool);
        instance._boolValue = value;
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
    public static fromBytes(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: ByteVector
    ): DescriptionRecord {
        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.Bytes);
        instance._byteValue = value;
        return instance;
    }

    /**
     * Instantiates a new instance by reading in the contents from a file.
     * @param file The file to read the raw ASF description record from
     * @internal
     */
    public static fromFile(file: AsfFile): DescriptionRecord {
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
                instance._wordValue = file.readWord();
                break;
            case DataType.Bool:
                instance._boolValue = file.readDWord() > 0;
                break;
            case DataType.DWord:
                instance._dWordValue = file.readDWord();
                break;
            case DataType.QWord:
                instance._qWordValue = file.readQWord();
                break;
            case DataType.Unicode:
                instance._stringValue = file.readUnicode(dataLength);
                break;
            case DataType.Bytes:
                instance._byteValue = file.readBlock(dataLength);
                break;
            case DataType.Guid:
                instance._guidValue = file.readGuid();
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
    public static fromGuid(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: UuidWrapper
    ): DescriptionRecord {
        Guards.truthy(value, "value");

        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.Guid);
        instance._guidValue = value;
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
    public static fromString(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: string
    ): DescriptionRecord {
        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.Unicode);
        instance._stringValue = value;
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
    public static fromUlong(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: bigint
    ): DescriptionRecord {
        Guards.ulong(value, "value");

        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.QWord);
        instance._qWordValue = value;
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
    public static fromUint(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: number
    ): DescriptionRecord {
        Guards.uint(value, "value");

        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.DWord);
        instance._dWordValue = value;
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
    public static fromUshort(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        value: number
    ): DescriptionRecord {
        Guards.ushort(value, "value");

        const instance = new DescriptionRecord(languageListIndex, streamNumber, name, DataType.Word);
        instance._wordValue = value;
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

/**
 * This class provides a representation of an ASF metadata library object which can be read from
 * and written to disk.
 */
export class MetadataLibraryObject extends BaseObject {
    private readonly _records: DescriptionRecord[] = [];

    // #region Constructors

    private constructor() {
        super();
    }

    public fromEmpty(): MetadataLibraryObject {
        const instance = new MetadataLibraryObject();
        instance.initializeFromGuid(Guids.AsfMetadataLibraryObject);
        return instance;
    }

    public fromFile(file: AsfFile, position: number): MetadataLibraryObject {
        const instance = new MetadataLibraryObject();
        instance.initializeFromFile(file, position);

        if (!instance.guid.equals(Guids.AsfMetadataLibraryObject)) {
            throw new CorruptFileError("Object GUID does not match expected metadata library object GUID");
        }
        if (instance.originalSize < 26) {
            throw new CorruptFileError("Metadata library object is too small");
        }

        const count = file.readWord();
        for (let i = 0; i < count; i++) {
            instance._records.push(DescriptionRecord.fromFile(file));
        }

        return instance;
    }

    // #endregion

    // #region Properties

    /**
     * Gets whether or not the current instance contains any records.
     * @returns boolean `true` if the current isntance does not contain any records, `false`
     *     otherwise.
     */
    public get isEmpty(): boolean { return this._records.length === 0; }

    /**
     * Gets all records stored in the current instance.
     */
    public get records(): DescriptionRecord[] { return this._records; }

    // #endregion

    // #region Methods

    /**
     * Adds a record to the current instance.
     * @param record Record to add to the current instance
     */
    public addRecord(record: DescriptionRecord): void {
        this._records.push(record);
    }

    /**
     * Gets all records with a given language, stream, and any of a collection of names from the
     * current instance.
     * @param languageListIndex Index of the desired language in the language list
     * @param streamNumber Index of the stream in the file the desired records applies to
     * @param names List of names of the records to return
     */
    public getRecords(languageListIndex: number, streamNumber: number, ... names: string[]): DescriptionRecord[] {
        Guards.ushort(languageListIndex, "languageListIndex");
        Guards.ushort(streamNumber, "streamNumber");

        return this._records.filter((r) =>
            r.languageListIndex === languageListIndex &&
            r.streamNumber === streamNumber &&
            names.indexOf(r.name) >= 0
        );
    }

    /** @inheritDoc */
    public render(): ByteVector {
        const output = ByteVector.concatenate(
            BaseObject.renderWord(this._records.length),
            ... this._records.map((r) => r.render())
        );
        return super.renderInternal(output);
    }

    /**
     * Sets a collection of records for a given language, language, ane name, removing the existing
     * records that match.
     * @remarks All added entries in `records` should match the provided `languageListIndex`,
     *     `streamNumber`, and `name`, but this will not be verified by the method. The records
     *     will be added with their own values and not those provided in the method arguments. The
     *     arguments are only used for removing existing values and determining where to position
     *     the new records.
     * @param languageListIndex Index of the desired language in the language list
     * @param streamNumber Index of the stream in the file the desired records applies to
     * @param name Names of the records to remove
     * @param records Records to insert into the current instance
     */
    public setRecords(
        languageListIndex: number,
        streamNumber: number,
        name: string, ... records: DescriptionRecord[]
    ): void {
        let position = this._records.length;
        for (let i = this._records.length - 1; i >= 0; i--) {
            // Remove matching records
            const record = this._records[i];
            if (record.languageListIndex === languageListIndex &&
                record.streamNumber === streamNumber &&
                record.name === name
            ) {
                this._records.splice(i, 1);
                position = i;
            }

            // Insert the new records
            this._records.splice(position, 0, ... records);
        }
    }

    // #endregion
}
