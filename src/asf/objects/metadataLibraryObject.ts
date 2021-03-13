import AsfFile from "../asfFile";
import BaseObject from "./baseObject";
import Guids from "../guids";
import {ByteVector} from "../../byteVector";
import {DataType, DescriptorBase, DescriptorValue} from "./descriptorBase";
import {CorruptFileError} from "../../errors";
import {Guards} from "../../utils";

/**
 * This class provides a representation of an ASF description record to be used inside a
 * MetadataLibraryObject.
 * @remarks This class can store various types of information. Although {@link toString} provides
 *     a representation of all types of values, it is recommended to determine which of the `get*`
 *     methods to use by accessing {@link type}
 */
export class MetadataDescriptor extends DescriptorBase {
    private readonly _languageListIndex: number;
    private readonly _streamNumber: number;

    // #region Constructors

    public constructor(
        languageListIndex: number,
        streamNumber: number,
        name: string,
        type: DataType,
        value: DescriptorValue
    ) {
        super(name, type, value);
        Guards.ushort(languageListIndex, "languageListIndex");
        Guards.ushort(streamNumber, "streamNumber");

        this._languageListIndex = languageListIndex;
        this._streamNumber = streamNumber;
    }

    /**
     * Instantiates a new instance by reading in the contents from a file.
     * @param file The file to read the raw ASF description record from
     * @internal
     */
    public static fromFile(file: AsfFile): MetadataDescriptor {
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

        let value: DescriptorValue;
        switch (dataType) {
            case DataType.Word:
                value = file.readWord();
                break;
            case DataType.Bool:
                // NOTE: The ASF specification says metadata description objects should be 2 bytes
                //    however the original .NET implementation reads them as DWORDs. It might be a
                //    bug in the .NET implementation, or could be some apps read/write them as
                //    DWORDS. So, let's hedge our bets and try to read either.
                if (dataLength === 4) {
                    value = file.readDWord() > 0;
                } else {
                    value = file.readWord() > 0;
                }
                break;
            case DataType.DWord:
                value = file.readDWord();
                break;
            case DataType.QWord:
                value = file.readQWord();
                break;
            case DataType.Unicode:
                value = file.readUnicode(dataLength);
                break;
            case DataType.Bytes:
                value = file.readBlock(dataLength);
                break;
            case DataType.Guid:
                value = file.readGuid();
                break;
            default:
                throw new CorruptFileError("Failed to parse description record.");
        }

        return new MetadataDescriptor(languageListIndex, streamNumber, name, dataType, value);
    }

    // #endregion

    // #region Properties

    /**
     * Gets the index of the language associated with the current instance.
     */
    public get languageListIndex(): number { return this._languageListIndex; }

    /**
     * Gets the index of the stream associated with the current instance.
     */
    public get streamNumber(): number { return this._streamNumber; }

    // #endregion

    // #region Methods

    /** @inheritDoc */
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
                // NOTE: For whatever reason metadata content descriptions are WORDs.
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

        const nameBytes = BaseObject.renderUnicode(this._name);
        return ByteVector.concatenate(
            BaseObject.renderWord(this._languageListIndex),
            BaseObject.renderWord(this._streamNumber),
            BaseObject.renderWord(nameBytes.length),
            BaseObject.renderWord(this._type),
            BaseObject.renderDWord(value.length),
            nameBytes,
            value
        );
    }

    // #endregion
}

/**
 * This class provides a representation of an ASF metadata library object which can be read from
 * and written to disk.
 */
export class MetadataLibraryObject extends BaseObject {
    private readonly _records: MetadataDescriptor[] = [];

    // #region Constructors

    private constructor() {
        super();
    }

    public static fromEmpty(): MetadataLibraryObject {
        const instance = new MetadataLibraryObject();
        instance.initializeFromGuid(Guids.AsfMetadataLibraryObject);
        return instance;
    }

    public static fromFile(file: AsfFile, position: number): MetadataLibraryObject {
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
            instance._records.push(MetadataDescriptor.fromFile(file));
        }

        return instance;
    }

    // #endregion

    // #region Properties

    /**
     * Gets whether or not the current instance contains any records.
     * @returns boolean `true` if the current instance does not contain any records, `false`
     *     otherwise.
     */
    public get isEmpty(): boolean { return this._records.length === 0; }

    /**
     * Gets all records stored in the current instance.
     */
    public get records(): MetadataDescriptor[] { return this._records; }

    // #endregion

    // #region Methods

    /**
     * Adds a record to the current instance.
     * @param record Record to add to the current instance
     */
    public addRecord(record: MetadataDescriptor): void {
        Guards.truthy(record, "record");
        this._records.push(record);
    }

    /**
     * Gets all records with a given language, stream, and any of a collection of names from the
     * current instance.
     * @param languageListIndex Index of the desired language in the language list
     * @param streamNumber Index of the stream in the file the desired records applies to
     * @param names List of names of the records to return
     */
    public getRecords(languageListIndex: number, streamNumber: number, ... names: string[]): MetadataDescriptor[] {
        Guards.ushort(languageListIndex, "languageListIndex");
        Guards.ushort(streamNumber, "streamNumber");
        Guards.truthy(names, "names");

        return this._records.filter((r) =>
            r.languageListIndex === languageListIndex &&
            r.streamNumber === streamNumber &&
            names.indexOf(r.name) >= 0
        );
    }

    /**
     * Removes all records with a given language, stream, and name from the current instance.
     * @param languageListIndex Language list index of the records to be removed
     * @param streamNumber Index of the stream in the file the desired records to remve
     * @param name Name of the records to remove
     */
    public removeRecords(languageListIndex: number, streamNumber: number, name: string): void {
        Guards.ushort(languageListIndex, "languageListIndex");
        Guards.ushort(streamNumber, "streamNumber");

        for (let i = this._records.length - 1; i >= 0; i--) {
            // Remove matching records
            const rec = this._records[i];
            if (rec.languageListIndex === languageListIndex &&
                rec.streamNumber === streamNumber &&
                rec.name === name
            ) {
                this._records.splice(i, 1);
            }
        }
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
        name: string,
        ... records: MetadataDescriptor[]
    ): void {
        Guards.ushort(languageListIndex, "languageListIndex");
        Guards.ushort(streamNumber, "streamNumber");
        Guards.notNullOrUndefined(name, "name");

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
        }

        // Insert the new records
        this._records.splice(position, 0, ... records);
    }

    // #endregion
}
