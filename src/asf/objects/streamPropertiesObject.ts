import AsfFile from "../asfFile";
import BaseObject from "./baseObject";
import Guids from "../guids";
import UuidWrapper from "../../uuidWrapper";
import {ByteVector} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {ICodec} from "../../iCodec";
import {NumberUtils} from "../../utils";
import RiffBitmapInfoHeader from "../../riff/riffBitmapInfoHeader";

/**
 * This class provides a representation of an ASF properties object which can be read from and
 * written to disk.
 */
export default class StreamPropertiesObject extends BaseObject {
    private _errorCorrectionData: ByteVector;
    private _errorCorrectionType: UuidWrapper;
    private _flags: number;
    private _reserved: number;
    private _streamType: UuidWrapper;
    private _timeOffset: bigint;
    private _typeSpecificData: ByteVector;

    // #region Constructors

    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance by reading contents from a specified position in
     * the provided file.
     * @param file File from which the contents of the new instance will be read
     * @param position Index into the file where the stream properties object begins
     */
    public static fromFile(file: AsfFile, position: number): StreamPropertiesObject {
        const instance = new StreamPropertiesObject();
        instance.initializeFromFile(file, position);

        if (!instance.guid.equals(Guids.AsfStreamPropertiesObject)) {
            throw new CorruptFileError("Object GUID is not the expected stream properties object GUID");
        }

        if (instance.originalSize < 78) {
            throw new CorruptFileError("Object size too small for stream properties object");
        }

        instance._streamType = file.readGuid();
        instance._errorCorrectionType = file.readGuid();
        instance._timeOffset = file.readQWord();

        const typeSpecificDataLength = file.readDWord();
        const errorSpecificDataLength = file.readDWord();

        instance._flags = file.readWord();
        instance._reserved = file.readDWord();
        instance._typeSpecificData = file.readBlock(typeSpecificDataLength);
        instance._errorCorrectionData = file.readBlock(errorSpecificDataLength);

        return instance;
    }

    // #endregion

    // #region Public Properties

    /**
     * Gets the codec information contained in the current instance.
     */
    public get codec(): ICodec {
        if (this._streamType.equals(Guids.AsfAudioMedia)) {
            return new RiffWaveFormatEx(this._typeSpecificData, 0);
        }
        if (this._streamType.equals(Guids.AsfVideoMedia)) {
            return new RiffBitmapInfoHeader(this._typeSpecificData, 11);
        }
        return undefined;
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
     */
    public get flags(): number { return this._flags; }

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

    // #endregion

    /** @inheritDoc */
    public render(): ByteVector {
        const data = ByteVector.concatenate(
            this._streamType.toBytes(),
            this._errorCorrectionType.toBytes(),
            BaseObject.renderQWord(this._timeOffset),
            BaseObject.renderDWord(this._typeSpecificData.length),
            BaseObject.renderDWord(this._errorCorrectionData.length),
            BaseObject.renderWord(this._flags),
            BaseObject.renderDWord(this._reserved),
            this._typeSpecificData,
            this._errorCorrectionData
        );
        return super.renderInternal(data);
    }
}
