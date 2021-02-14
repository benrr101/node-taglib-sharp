import * as BigInt from "big-integer";
import BaseObject from "./baseObject";
import UuidWrapper from "../../uuidWrapper";
import {CorruptFileError} from "../../errors";
import Guids from "../guids";

/**
 * Extends {@see BaseObject} to provide a representation of an ASF file properties object. The
 * file properties object defines the global characteristics of the combined digital media streams
 * found within the Data object.
 */
export default class FilePropertiesObject extends BaseObject {
    // #region Member Variables

    private _creationDate: BigInt.BigInteger;
    private _dataPacketsCount: BigInt.BigInteger;
    private _fileId: UuidWrapper;
    private _fileSize: BigInt.BigInteger;
    private _flags: number;
    private _maximumBitrate: number;
    private _maximumDataPacketSize: number;
    private _minimumDataPacketSize: number;
    private _playDuration: BigInt.BigInteger;
    private _preroll: BigInt.BigInteger;
    private _sendDuration: BigInt.BigInteger;

    // #endregion

    // #region Constructors

    private constructor() {
        super();
    }

    public static fromFile(file: AsfFile, position: number): FilePropertiesObject {
        const instance = new FilePropertiesObject();
        instance.initializeFromFile(file, position);

        if (!instance.guid.equals(Guids.AsfFilePropertiesObject)) {
            throw new CorruptFileError("Object GUID is not the expected file properties object GUID");
        }

        if (instance.originalSize < 104) {
            throw new CorruptFileError("Object size too small for file properties object");
        }

        instance._fileId = file.readGuid();
        instance._fileSize = file.readQWord();
        instance._creationDate = file.readQWord();
        instance._dataPacketsCount = file.readQWord();
        instance._sendDuration = file.readQWord();
        instance._playDuration = file.readQWord();
        instance._preroll = file.readQWord();
        instance._flags = file.readDWord();
        instance._minimumDataPacketSize = file.readDWord();
        instance._maximumDataPacketSize = file.readDWord();
        instance._maximumBitrate = file.readDWord();

        return instance;
    }

    // #endregion

    // #region Properties

    public get creationDate(): Date {
        // Creation date is in nanoseconds from 1/1/0001 00:00:00, JS Date is in milliseconds from
        // 1/1/1970 00:00:00.
    }

    public get fileId(): UuidWrapper { return this._fileId; }

    public get fileSize(): BigInt.BigInteger { return this._fileSize; }

    // #endregion
}
