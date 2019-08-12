import FrameType from "../frameTypes";
import SyncData from "../syncData";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError, NotImplementedError} from "../../errors";
import {Guards} from "../../utils";

export enum Id3v2FrameFlags {
    /**
     * Header contains no flags.
     */
    None = 0,

    /**
     * Frame is to be deleted if the tag is altered.
     */
    TagAlterPreservation = 0x4000,

    /**
     * Frame is to be deleted if the file is altered.
     */
    FileAlterPreservation = 0x2000,

    /**
     * Frame is read-only and should not be altered.
     */
    ReadOnly = 0x1000,

    /**
     * Frame has a grouping identity.
     */
    GroupingIdentity = 0x0040,

    /**
     * Frame data is compressed.
     */
    Compression = 0x0008,

    /**
     * Frame data is encrypted.
     */
    Encryption = 0x0004,

    /**
     * Frame data has been desynchronized.
     */
    Desynchronized = 0x0002,

    /**
     * Frame has a data length indicator.
     */
    DataLengthIndicator = 0x0001
}

export class Id3v2FrameHeader {
    // #region Member Variables

    private static readonly version2Frames: ByteVector[][] = [
        [
            ByteVector.fromString("BUF", StringType.UTF8, undefined, true),
            ByteVector.fromString("RBUF", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("CNT", StringType.UTF8, undefined, true),
            ByteVector.fromString("PCNT", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("COM", StringType.UTF8, undefined, true),
            ByteVector.fromString("COMM", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("CRA", StringType.UTF8, undefined, true),
            ByteVector.fromString("AENC", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("ETC", StringType.UTF8, undefined, true),
            ByteVector.fromString("ETCO", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("GEO", StringType.UTF8, undefined, true),
            ByteVector.fromString("GEOB", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("IPL", StringType.UTF8, undefined, true),
            ByteVector.fromString("TIPL", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("MCI", StringType.UTF8, undefined, true),
            ByteVector.fromString("MCDI", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("MLL", StringType.UTF8, undefined, true),
            ByteVector.fromString("MLLT", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("PIC", StringType.UTF8, undefined, true),
            ByteVector.fromString("APIC", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("POP", StringType.UTF8, undefined, true),
            ByteVector.fromString("POPM", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("REV", StringType.UTF8, undefined, true),
            ByteVector.fromString("RVRB", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("SLT", StringType.UTF8, undefined, true),
            ByteVector.fromString("SYLT", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("STC", StringType.UTF8, undefined, true),
            ByteVector.fromString("SYTC", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TAL", StringType.UTF8, undefined, true),
            ByteVector.fromString("TALB", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TBP", StringType.UTF8, undefined, true),
            ByteVector.fromString("TBPM", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TCM", StringType.UTF8, undefined, true),
            ByteVector.fromString("TCOM", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TCO", StringType.UTF8, undefined, true),
            ByteVector.fromString("TCON", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TCP", StringType.UTF8, undefined, true),
            ByteVector.fromString("TCMP", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TCR", StringType.UTF8, undefined, true),
            ByteVector.fromString("TCOP", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TDA", StringType.UTF8, undefined, true),
            ByteVector.fromString("TDAT", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TIM", StringType.UTF8, undefined, true),
            ByteVector.fromString("TIME", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TDY", StringType.UTF8, undefined, true),
            ByteVector.fromString("TDLY", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TEN", StringType.UTF8, undefined, true),
            ByteVector.fromString("TENC", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TFT", StringType.UTF8, undefined, true),
            ByteVector.fromString("TFLT", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TKE", StringType.UTF8, undefined, true),
            ByteVector.fromString("TKEY", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TLA", StringType.UTF8, undefined, true),
            ByteVector.fromString("TLAN", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TLE", StringType.UTF8, undefined, true),
            ByteVector.fromString("TLEN", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TMT", StringType.UTF8, undefined, true),
            ByteVector.fromString("TMED", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TOA", StringType.UTF8, undefined, true),
            ByteVector.fromString("TOAL", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TOF", StringType.UTF8, undefined, true),
            ByteVector.fromString("TOFN", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TOL", StringType.UTF8, undefined, true),
            ByteVector.fromString("TOLY", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TOR", StringType.UTF8, undefined, true),
            ByteVector.fromString("TDOR", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TOT", StringType.UTF8, undefined, true),
            ByteVector.fromString("TOAL", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TP1", StringType.UTF8, undefined, true),
            ByteVector.fromString("TPE1", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TP2", StringType.UTF8, undefined, true),
            ByteVector.fromString("TPE2", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TP3", StringType.UTF8, undefined, true),
            ByteVector.fromString("TPE3", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TP4", StringType.UTF8, undefined, true),
            ByteVector.fromString("TPE4", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TPA", StringType.UTF8, undefined, true),
            ByteVector.fromString("TPOS", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TPB", StringType.UTF8, undefined, true),
            ByteVector.fromString("TPUB", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TRC", StringType.UTF8, undefined, true),
            ByteVector.fromString("TSRC", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TRK", StringType.UTF8, undefined, true),
            ByteVector.fromString("TRCK", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TSS", StringType.UTF8, undefined, true),
            ByteVector.fromString("TSSE", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TT1", StringType.UTF8, undefined, true),
            ByteVector.fromString("TIT1", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TT2", StringType.UTF8, undefined, true),
            ByteVector.fromString("TIT2", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TT3", StringType.UTF8, undefined, true),
            ByteVector.fromString("TIT3", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TXT", StringType.UTF8, undefined, true),
            ByteVector.fromString("TOLY", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TXX", StringType.UTF8, undefined, true),
            ByteVector.fromString("TXXX", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TYE", StringType.UTF8, undefined, true),
            ByteVector.fromString("TDRC", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("UFI", StringType.UTF8, undefined, true),
            ByteVector.fromString("UFID", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("ULT", StringType.UTF8, undefined, true),
            ByteVector.fromString("USLT", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("WAF", StringType.UTF8, undefined, true),
            ByteVector.fromString("WOAF", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("WAR", StringType.UTF8, undefined, true),
            ByteVector.fromString("WOAR", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("WAS", StringType.UTF8, undefined, true),
            ByteVector.fromString("WOAS", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("WCM", StringType.UTF8, undefined, true),
            ByteVector.fromString("WCOM", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("WCP", StringType.UTF8, undefined, true),
            ByteVector.fromString("WCOP", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("WPB", StringType.UTF8, undefined, true),
            ByteVector.fromString("WPUB", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("WXX", StringType.UTF8, undefined, true),
            ByteVector.fromString("WXXX", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("XRV", StringType.UTF8, undefined, true),
            ByteVector.fromString("RVA2", StringType.UTF8, undefined, true)
        ]
    ];
    private static readonly version3Frames: ByteVector[][] = [
        [
            ByteVector.fromString("TORY", StringType.UTF8, undefined, true),
            ByteVector.fromString("TDOR", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("TYER", StringType.UTF8, undefined, true),
            ByteVector.fromString("TDRC", StringType.UTF8, undefined, true)
        ],
        [
            ByteVector.fromString("XRVA", StringType.UTF8, undefined, true),
            ByteVector.fromString("RVA2", StringType.UTF8, undefined, true)
        ]
    ];

    private _flags: Id3v2FrameFlags;
    private _frameId: ByteVector;
    private _frameSize: number;

    // #endregion

    /**
     * Constructs and initializes a new instance of {@see FrameHeader} by reading it from raw
     * header data of a specified version.
     * @param data Raw data to build the new instance from.
     *     If the data size is smaller than the size of a full header, the data is just treated as
     *     a frame identifer and the remaining values are zeroed.
     * @param version ID3v2 version with which the data in {@see data} was encoded.
     */
    public constructor(data: ByteVector, version: number) {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        this._flags = 0;
        this._frameSize = 0;

        if (version < 2 || version > 4) {
            throw new CorruptFileError("Unsupported tag version");
        }
        if (data.length < (version === 2 ? 3 : 4)) {
            throw new CorruptFileError("Data must contain at least a frame ID");
        }

        switch (version) {
            case 2:
                // Set frame ID -- first 3 bytes
                this._frameId = this.convertId(data.mid(0, 3), version, false);

                // If the full header information was not passed in, do not continue to the steps
                // to parse the frame size and flags.
                if (data.length < 6) {
                    return;
                }

                this._frameSize = data.mid(3, 3).toUInt();
                break;

            case 3:
                // Set the frame ID -- first 4 bytes
                this._frameId = this.convertId(data.mid(0, 4), version, false);

                // If the full header information was not passed in, do not continue to the steps
                // to parse the frame size and flags.
                if (data.length < 10) {
                    return;
                }

                // Store the flags internally as version 2.4
                this._frameSize = data.mid(4, 4).toUInt();
                this._flags = ((data.get(8) << 7) & 0x7000)
                    | ((data.get(9) >> 4) & 0x000C)
                    | ((data.get(9) << 1) & 0x0040);
                break;

            case 4:
                // Set the frame ID -- the first 4 bytes
                this._frameId = ByteVector.fromByteVector(data.mid(0, 4), true);

                // If the full header information was not passed in, do not continue to the steps to
                // ... eh, you probably get it by now.
                if (data.length < 10) {
                    return;
                }

                this._frameSize = SyncData.toUint(data.mid(4, 4));
                this._flags = data.mid(8, 2).toUShort();
                break;

            default:
                throw new CorruptFileError("Unsupported tag version.");
        }
    }

    // #region Properties

    /**
     * Gets the flags applied to the current instance.
     */
    public get flags(): Id3v2FrameFlags { return this._flags; }
    /**
     * Sets the flags applied to the current instance.
     */
    public set flags(value: Id3v2FrameFlags) {
        if ((value & (Id3v2FrameFlags.Compression | Id3v2FrameFlags.Encryption)) !== 0) {
            throw new Error("Argument invalid: Encryption and compression are not supported");
        }
        this._flags = value;
    }

    /**
     * Gets the identifier of the frame described by the current instance.
     */
    public get frameId(): ByteVector { return this._frameId; }
    /**
     * Sets the identifier of the frame described by the current instance.
     */
    public set frameId(value: ByteVector) {
        Guards.truthy(value, "value");
        this._frameId = value.length === 4
            ? ByteVector.fromByteVector(value, true)
            : ByteVector.fromByteVector(value.mid(0, 4), true);
    }

    /**
     * Gets the size of the frame described by the current instance, minus the header.
     */
    public get frameSize(): number { return this._frameSize; }
    /**
     * Sets the size of the frame described by the current instance, minus the header.
     * Must be a positive, safe integer.
     */
    public set frameSize(value: number) {
        Guards.uint(value, "value");
        this._frameSize = value;
    }

    // #endregion

    // #region Public Methods

    /**
     * Gets the size of a header for a specified ID3v2 version.
     * @param version Version of ID3v2 to get the size for. Must be a positive integer < 256
     */
    public static getSize(version: number) {
        Guards.byte(version, "version");
        return version < 3 ? 6 : 10;
    }

    /**
     * Renders the current instance, encoded in a specified ID3v2 version.
     * @param version Version of ID3v2 to use when encoding the current instance.
     */
    public render(version: number): ByteVector {
        const data = ByteVector.empty();
        const id = this.convertId(this._frameId, version, true);

        if (!id) {
            throw new NotImplementedError();
        }
        data.addByteVector(id);

        switch (version) {
            case 2:
                data.addByteVector(ByteVector.fromUInt(this._frameSize).mid(1, 3));
                break;

            case 3:
                const newFlags = (this._flags << 1) & 0xE000
                    | (this._flags << 4) & 0x00C0
                    | (this._flags >> 1) & 0x0020;

                data.addByteVector(ByteVector.fromUInt(this._frameSize));
                data.addByteVector(ByteVector.fromUShort(newFlags));
                break;

            case 4:
                data.addByteVector(SyncData.fromUint(this._frameSize));
                data.addByteVector(ByteVector.fromUShort(this._flags));
                break;

            default:
                throw new NotImplementedError("Unsuppoted tag version.");
        }

        return data;
    }

    // #endregion

    private convertId(id: ByteVector, version: number, toVersion: boolean) {
        if (version >= 4) {
            return ByteVector.fromByteVector(id);
        }

        if (!id || version < 2) {
            return undefined;
        }

        if (!toVersion && (
            ByteVector.equal(id, FrameType.EQUA) ||
            ByteVector.equal(id, FrameType.RVAD) ||
            ByteVector.equal(id, FrameType.TRDA) ||
            ByteVector.equal(id, FrameType.TSIZ)
        )) {
            return undefined;
        }

        if (version === 2) {
            const frame = Id3v2FrameHeader.version2Frames.find((f) => ByteVector.equal(f[toVersion ? 1 : 0], id));
            if (frame) { return frame[toVersion ? 0 : 1]; }
        }

        if (version === 3) {
            const frame = Id3v2FrameHeader.version3Frames.find((f) => ByteVector.equal(f[toVersion ? 1 : 0], id));
            if (frame) { return frame[toVersion ? 0 : 1]; }
        }

        if ((id.length !== 4 && version > 2) || (id.length !== 3 && version === 2)) {
            return undefined;
        }

        return ByteVector.fromByteVector(id, true);
    }
}
