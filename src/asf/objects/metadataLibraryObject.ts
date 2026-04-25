import BaseObject from "./baseObject";
import ReadWriteUtils from "../readWriteUtils";
import {ByteVector} from "../../byteVector";
import {Guids, ObjectType} from "../constants";
import {DataType, DescriptorBase, DescriptorValue} from "./descriptorBase";
import {CorruptFileError} from "../../errors";
import {File} from "../../file";
import {Guards} from "../../utils";

/**
 * This class provides a representation of an ASF description record to be used inside a
 * MetadataLibraryObject.
 * @remarks
 *     This class can store various types of information. Although {@link toString} provides
 *     a representation of all types of values, it is recommended to determine which of the `get*`
 *     methods to use by accessing {@link type}
 */
export class MetadataDescriptor<T extends DescriptorValue = DescriptorValue> extends DescriptorBase<T> {
    private readonly _languageListIndex: number;
    private readonly _streamNumber: number;

    //#region Constructors

    /**
     * Constructs and initializes a new instance.
     * @param languageListIndex Index of the language
     * @param streamNumber Index of the stream
     * @param name Name of the metadata library object
     * @param type Datatype of the object
     * @param value Value to store in the instance
     */
    public constructor(
        name: string,
        type: DataType,
        value: T,
        languageListIndex: number,
        streamNumber: number,
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
    public static fromFile(file: File): MetadataDescriptor {
        Guards.truthy(file, "file");

        // Field name          Field type Size (bits)
        // Language List Index WORD       16
        // Stream Number       WORD       16
        // Name Length         WORD       16
        // Data Type           WORD       16
        // Data Length         DWORD      32
        // Name                WCHAR      varies
        // Data                See below  varies
        const languageListIndex = ReadWriteUtils.readWord(file);
        const streamNumber = ReadWriteUtils.readWord(file);
        const nameLength = ReadWriteUtils.readWord(file);
        const dataType = ReadWriteUtils.readWord(file);
        const dataLength = ReadWriteUtils.readDWord(file);
        const name = ReadWriteUtils.readUnicode(file, nameLength);
        const value = this.readValue(file, dataType, dataLength, this.readBoolean);

        return new MetadataDescriptor(name, dataType, value, languageListIndex, streamNumber);
    }

    //#endregion

    //#region Properties

    /**
     * Gets the index of the language associated with the current instance.
     */
    public get languageListIndex(): number { return this._languageListIndex; }

    /**
     * Gets the index of the stream associated with the current instance.
     */
    public get streamNumber(): number { return this._streamNumber; }

    //#endregion

    //#region Methods

    /** @inheritDoc */
    public render(): ByteVector {
        const nameBytes = ReadWriteUtils.renderUnicode(this.name);
        const valueBytes = this.renderValue(MetadataDescriptor.renderBoolean);
        return ByteVector.concatenate(
            ReadWriteUtils.renderWord(this._languageListIndex),
            ReadWriteUtils.renderWord(this._streamNumber),
            ReadWriteUtils.renderWord(nameBytes.length),
            ReadWriteUtils.renderWord(this.type),
            ReadWriteUtils.renderDWord(valueBytes.length),
            nameBytes,
            valueBytes
        );
    }

    private static readBoolean(file: File, dataLength: number): boolean {
        // NOTE: The ASF specification says metadata description objects should be 2 bytes
        //    however the original .NET implementation reads them as DWORDs. It might be a
        //    bug in the .NET implementation, or could be some apps read/write them as
        //    DWORDs. So, let's hedge our bets and try to read either.
        return dataLength === 4
            ? ReadWriteUtils.readDWord(file) > 0
            : ReadWriteUtils.readWord(file) > 0;
    }

    private static renderBoolean(value: boolean): ByteVector {
        // NOTE: For whatever reason metadata content descriptions use WORDs for boolean?
        // @TODO: Verify this.
        return ReadWriteUtils.renderWord(value ? 1 : 0);
    }

    //#endregion
}

/**
 * This class provides a representation of an ASF metadata library object which can be read from
 * and written to disk.
 */
export class MetadataLibraryObject extends BaseObject {
    private readonly _records: MetadataDescriptor[] = [];

    //#region Constructors

    private constructor(originalSize: number) {
        super(Guids.ASF_METADATA_LIBRARY_OBJECT, originalSize);
    }

    /**
     * Constructs and initializes a new instance that does not contain any records.
     */
    public static fromEmpty(): MetadataLibraryObject {
        return new MetadataLibraryObject(0);
    }

    /**
     * Constructs and initializes a new instance by reading the object from a file.
     * @param file File to read the instance from
     * @param position Offset into the file where the object begins
     */
    public static fromFile(file: File, position: number): MetadataLibraryObject {
        const baseProperties = this.readBaseProperties(file, position);
        if (!baseProperties.id.equals(Guids.ASF_METADATA_LIBRARY_OBJECT)) {
            throw new CorruptFileError("Object GUID does not match expected metadata library object GUID");
        }
        if (baseProperties.originalSize < 26) {
            throw new CorruptFileError("Metadata library object is too small");
        }

        const instance = new MetadataLibraryObject(baseProperties.originalSize);
        const count = ReadWriteUtils.readWord(file);
        for (let i = 0; i < count; i++) {
            instance._records.push(MetadataDescriptor.fromFile(file));
        }

        return instance;
    }

    //#endregion

    //#region Properties

    /**
     * Gets whether the current instance contains any records.
     * @returns
     *     `true` if the current instance does not contain any records, `false`
     *     otherwise.
     */
    public get isEmpty(): boolean { return this._records.length === 0; }

    /** @inheritDoc */
    public get objectType(): ObjectType { return ObjectType.MetadataLibraryObject; }

    /**
     * Gets all records stored in the current instance.
     */
    public get records(): MetadataDescriptor[] { return this._records; }

    //#endregion

    //#region Methods

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
     * @param streamNumber Index of the stream in the file the desired records to remove
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
            ReadWriteUtils.renderWord(this._records.length),
            ... this._records.map((r) => r.render())
        );
        return super.renderInternal(output);
    }

    /**
     * Sets a collection of records for a given language, language, ane name, removing the existing
     * records that match.
     * @remarks
     *     All added entries in `records` should match the provided `languageListIndex`,
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

    //#endregion
}
