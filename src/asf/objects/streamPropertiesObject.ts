import BaseObject from "./baseObject";
import ReadWriteUtils from "../readWriteUtils";
import RiffBitmapInfoHeader from "../../riff/riffBitmapInfoHeader";
import RiffWaveFormatEx from "../../riff/riffWaveFormatEx";
import UuidWrapper from "../../uuidWrapper";
import {ByteVector} from "../../byteVector";
import {Guids, ObjectType} from "../constants";
import {CorruptFileError} from "../../errors";
import {File} from "../../file";
import {ICodec} from "../../properties";
import {NumberUtils} from "../../utils";

/**
 * This class provides a representation of an ASF properties object which can be read from and
 * written to disk.
 */
export default class StreamPropertiesObject extends BaseObject {
    private readonly _errorCorrectionData: ByteVector;
    private readonly _errorCorrectionType: UuidWrapper;
    private readonly _flags: number;
    private readonly _reserved: number;
    private readonly _streamType: UuidWrapper;
    private readonly _timeOffset: bigint;
    private readonly _typeSpecificData: ByteVector;

    private _codec: ICodec|undefined;

    //#region Constructors

    private constructor(file: File, position: number) {
        // Validate
        const baseProperties = BaseObject.readBaseProperties(file, position);
        if (!baseProperties.id.equals(Guids.ASF_STREAM_PROPERTIES_OBJECT)) {
            throw new CorruptFileError("Object GUID is not the expected stream properties object GUID");
        }
        if (baseProperties.originalSize < 78) {
            throw new CorruptFileError("Object size too small for stream properties object");
        }

        // Instantiate
        super(baseProperties.id, baseProperties.originalSize);

        // Read properties
        this._streamType = ReadWriteUtils.readGuid(file);
        this._errorCorrectionType = ReadWriteUtils.readGuid(file);
        this._timeOffset = ReadWriteUtils.readQWord(file);

        const typeSpecificDataLength = ReadWriteUtils.readDWord(file);
        const errorSpecificDataLength = ReadWriteUtils.readDWord(file);

        this._flags = ReadWriteUtils.readWord(file);
        this._reserved = ReadWriteUtils.readDWord(file);
        this._typeSpecificData = file.readBlock(typeSpecificDataLength).toByteVector();
        this._errorCorrectionData = file.readBlock(errorSpecificDataLength).toByteVector();
    }

    /**
     * Constructs and initializes a new instance by reading contents from a specified position in
     * the provided file.
     * @param file File from which the contents of the new instance will be read
     * @param position Index into the file where the stream properties object begins
     */
    public static fromFile(file: File, position: number): StreamPropertiesObject {
        // Note: There are too many small properties to set, it's cleaner to just do it in the ctor.
        return new StreamPropertiesObject(file, position);
    }

    //#endregion

    //#region Public Properties

    /**
     * Gets the codec information contained in the current instance.
     */
    public get codec(): ICodec|undefined {
        if (!this._codec) {
            // Read the codec info from the type specific data
            if (this._streamType.equals(Guids.ASF_AUDIO_MEDIA)) {
                this._codec = new RiffWaveFormatEx(this._typeSpecificData);
            }
            if (this._streamType.equals(Guids.ASF_VIDEO_MEDIA)) {
                this._codec = new RiffBitmapInfoHeader(this._typeSpecificData, 11);
            }

            // @TODO: We can use the Codec List Object to get a more user friendly description of the
            //    codec being used, if it is available. However, doing so would require making a new
            //    class for ASF codec info and using it to wrap the stream properties object and the
            //    codec list object.

            // @TODO: Is undefined a valid value to release? Are there types of streams we can't read?
        }

        return this._codec;
    }

    /**
     * Gets the error correction data contained in the current instance.
     */
    public get errorCorrectionData(): ByteVector { return this._errorCorrectionData; }

    /**
     * Gets the error correction type GUID of the current instance.
     */
    public get errorCorrectionType(): UuidWrapper { return this._errorCorrectionType; }

    /**
     * Gets the flags that apply to the current instance.
     * @remarks
     *     The `flags` field a 16-bit, double word, defined as follows:
     *     * LSB
     *       * Stream number - 7 bits
     *       * Reserved - 8 bits
     *       * Encrypted content flag - 1 bit
     */
    public get flags(): number { return this._flags; }

    /** @inheritDoc */
    public get objectType(): ObjectType { return ObjectType.StreamPropertiesObject; }

    /**
     * Gets the stream number for the current instance. Zero is invalid.
     */
    public get streamNumber(): number { return NumberUtils.uintAnd(this._flags, 0x3F); }

    /**
     * Gets the stream type GUID of the current instance.
     */
    public get streamType(): UuidWrapper { return this._streamType; }

    /**
     * Gets the time offset at which the stream described by the current instance begins.
     */
    public get timeOffsetMilliseconds(): number { return NumberUtils.ticksToMilli(this._timeOffset); }

    /**
     * Gets the type specific data contained in the current instance.
     * @remarks The parsed version of this data is available in {@link codec}.
     */
    public get typeSpecificData(): ByteVector { return this._typeSpecificData; }

    //#endregion

    /** @inheritDoc */
    public render(): ByteVector {
        const data = ByteVector.concatenate(
            this._streamType.toBytes(),
            this._errorCorrectionType.toBytes(),
            ReadWriteUtils.renderQWord(this._timeOffset),
            ReadWriteUtils.renderDWord(this._typeSpecificData.length),
            ReadWriteUtils.renderDWord(this._errorCorrectionData.length),
            ReadWriteUtils.renderWord(this._flags),
            ReadWriteUtils.renderDWord(this._reserved),
            this._typeSpecificData,
            this._errorCorrectionData
        );
        return super.renderInternal(data);
    }
}
