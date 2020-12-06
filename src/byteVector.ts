import * as BigInt from "big-integer";
import * as IConv from "iconv-lite";
import * as fs from "fs";
import {IFileAbstraction} from "./fileAbstraction";
import {IStream} from "./stream";
import {Guards} from "./utils";

// TODO: Assess if this is needed
const AB2B = require("arraybuffer-to-buffer");

class IConvEncoding {
    public readonly encoding: string;

    constructor(encoding: string) {
        this.encoding = encoding;
    }

    public decode(data: Buffer): string {
        return IConv.decode(data, this.encoding);
    }

    public encode(text: string): Uint8Array {
        return IConv.encode(text, this.encoding);
    }
}

/**
 * @summary Specifies the text encoding used when converting betweenInclusive a string and a
 *          {@link ByteVector}.
 * @remarks This enumeration is used by {@link ByteVector.fromString} and
 *          {@link ByteVector.toString}
 */
export enum StringType {
    /**
     * @summary The string is to be Latin-1 encoded.
     */
    Latin1 = 0,

    /**
     * @summary The string is to be UTF-16 encoded.
     */
    UTF16 = 1,

    /**
     * @summary The string is to be UTF-16BE encoded.
     */
    UTF16BE = 2,

    /**
     * @summary The string is to be UTF-8 encoded.
     */
    UTF8 = 3,

    /**
     * @summary The string is to be UTF-16LE encoded.
     */
    UTF16LE = 4
}

export class ByteVector {

    // #region Member Fields

    /**
     * Contains values to use in CRC calculation
     */
    private static readonly _crcTable: Uint32Array = new Uint32Array([
        0x00000000, 0x04c11db7, 0x09823b6e, 0x0d4326d9,
        0x130476dc, 0x17c56b6b, 0x1a864db2, 0x1e475005,
        0x2608edb8, 0x22c9f00f, 0x2f8ad6d6, 0x2b4bcb61,
        0x350c9b64, 0x31cd86d3, 0x3c8ea00a, 0x384fbdbd,
        0x4c11db70, 0x48d0c6c7, 0x4593e01e, 0x4152fda9,
        0x5f15adac, 0x5bd4b01b, 0x569796c2, 0x52568b75,
        0x6a1936c8, 0x6ed82b7f, 0x639b0da6, 0x675a1011,
        0x791d4014, 0x7ddc5da3, 0x709f7b7a, 0x745e66cd,
        0x9823b6e0, 0x9ce2ab57, 0x91a18d8e, 0x95609039,
        0x8b27c03c, 0x8fe6dd8b, 0x82a5fb52, 0x8664e6e5,
        0xbe2b5b58, 0xbaea46ef, 0xb7a96036, 0xb3687d81,
        0xad2f2d84, 0xa9ee3033, 0xa4ad16ea, 0xa06c0b5d,
        0xd4326d90, 0xd0f37027, 0xddb056fe, 0xd9714b49,
        0xc7361b4c, 0xc3f706fb, 0xceb42022, 0xca753d95,
        0xf23a8028, 0xf6fb9d9f, 0xfbb8bb46, 0xff79a6f1,
        0xe13ef6f4, 0xe5ffeb43, 0xe8bccd9a, 0xec7dd02d,
        0x34867077, 0x30476dc0, 0x3d044b19, 0x39c556ae,
        0x278206ab, 0x23431b1c, 0x2e003dc5, 0x2ac12072,
        0x128e9dcf, 0x164f8078, 0x1b0ca6a1, 0x1fcdbb16,
        0x018aeb13, 0x054bf6a4, 0x0808d07d, 0x0cc9cdca,
        0x7897ab07, 0x7c56b6b0, 0x71159069, 0x75d48dde,
        0x6b93dddb, 0x6f52c06c, 0x6211e6b5, 0x66d0fb02,
        0x5e9f46bf, 0x5a5e5b08, 0x571d7dd1, 0x53dc6066,
        0x4d9b3063, 0x495a2dd4, 0x44190b0d, 0x40d816ba,
        0xaca5c697, 0xa864db20, 0xa527fdf9, 0xa1e6e04e,
        0xbfa1b04b, 0xbb60adfc, 0xb6238b25, 0xb2e29692,
        0x8aad2b2f, 0x8e6c3698, 0x832f1041, 0x87ee0df6,
        0x99a95df3, 0x9d684044, 0x902b669d, 0x94ea7b2a,
        0xe0b41de7, 0xe4750050, 0xe9362689, 0xedf73b3e,
        0xf3b06b3b, 0xf771768c, 0xfa325055, 0xfef34de2,
        0xc6bcf05f, 0xc27dede8, 0xcf3ecb31, 0xcbffd686,
        0xd5b88683, 0xd1799b34, 0xdc3abded, 0xd8fba05a,
        0x690ce0ee, 0x6dcdfd59, 0x608edb80, 0x644fc637,
        0x7a089632, 0x7ec98b85, 0x738aad5c, 0x774bb0eb,
        0x4f040d56, 0x4bc510e1, 0x46863638, 0x42472b8f,
        0x5c007b8a, 0x58c1663d, 0x558240e4, 0x51435d53,
        0x251d3b9e, 0x21dc2629, 0x2c9f00f0, 0x285e1d47,
        0x36194d42, 0x32d850f5, 0x3f9b762c, 0x3b5a6b9b,
        0x0315d626, 0x07d4cb91, 0x0a97ed48, 0x0e56f0ff,
        0x1011a0fa, 0x14d0bd4d, 0x19939b94, 0x1d528623,
        0xf12f560e, 0xf5ee4bb9, 0xf8ad6d60, 0xfc6c70d7,
        0xe22b20d2, 0xe6ea3d65, 0xeba91bbc, 0xef68060b,
        0xd727bbb6, 0xd3e6a601, 0xdea580d8, 0xda649d6f,
        0xc423cd6a, 0xc0e2d0dd, 0xcda1f604, 0xc960ebb3,
        0xbd3e8d7e, 0xb9ff90c9, 0xb4bcb610, 0xb07daba7,
        0xae3afba2, 0xaafbe615, 0xa7b8c0cc, 0xa379dd7b,
        0x9b3660c6, 0x9ff77d71, 0x92b45ba8, 0x9675461f,
        0x8832161a, 0x8cf30bad, 0x81b02d74, 0x857130c3,
        0x5d8a9099, 0x594b8d2e, 0x5408abf7, 0x50c9b640,
        0x4e8ee645, 0x4a4ffbf2, 0x470cdd2b, 0x43cdc09c,
        0x7b827d21, 0x7f436096, 0x7200464f, 0x76c15bf8,
        0x68860bfd, 0x6c47164a, 0x61043093, 0x65c52d24,
        0x119b4be9, 0x155a565e, 0x18197087, 0x1cd86d30,
        0x029f3d35, 0x065e2082, 0x0b1d065b, 0x0fdc1bec,
        0x3793a651, 0x3352bbe6, 0x3e119d3f, 0x3ad08088,
        0x2497d08d, 0x2056cd3a, 0x2d15ebe3, 0x29d4f654,
        0xc5a92679, 0xc1683bce, 0xcc2b1d17, 0xc8ea00a0,
        0xd6ad50a5, 0xd26c4d12, 0xdf2f6bcb, 0xdbee767c,
        0xe3a1cbc1, 0xe760d676, 0xea23f0af, 0xeee2ed18,
        0xf0a5bd1d, 0xf464a0aa, 0xf9278673, 0xfde69bc4,
        0x89b8fd09, 0x8d79e0be, 0x803ac667, 0x84fbdbd0,
        0x9abc8bd5, 0x9e7d9662, 0x933eb0bb, 0x97ffad0c,
        0xafb010b1, 0xab710d06, 0xa6322bdf, 0xa2f33668,
        0xbcb4666d, 0xb8757bda, 0xb5365d03, 0xb1f740b4
    ]);

    /**
     * Contains useful values when doing validation of different sized integers
     */
    private static readonly _maxInts: Array<{mask: number, max: number, min: number}> = [
        undefined,
        undefined,
        {mask: 0xFFFF, max: 0x7FFF, min: -0x8000},                                      // short
        undefined,
        {mask: 0xFFFFFFFF, max: 0x7FFFFFFF, min: -0x80000000},                          // int
        undefined,
        undefined,
        undefined,
        {mask: 0xFFFFFFFFFFFFFFFF, max: 0x7FFFFFFFFFFFFFFF, min: -0x8000000000000000}   // long
    ];

    /**
     * Contains a one byte text delimiter
     */
    private static readonly _td1: ByteVector = ByteVector.fromSize(1, undefined, true);

    /**
     * Contains a two byte text delimiter
     */
    private static readonly _td2: ByteVector = ByteVector.fromSize(2, undefined, true);

    /**
     * Contains the last generic UTF16 encoding read. Defaults to UTF16-LE
     * @remarks When reading a collection of UTF16 strings, sometimes only the first one will
     *              contain the BOM. In that case, this field will inform the file what encoding to
     *              use for the second string.
     */
    private static _lastUtf16IConvFunc: IConvEncoding = new IConvEncoding("utf16-le");

    /**
     * Contains the internal byte list
     */
    private _data: Uint8Array;

    /**
     * Whether or not this byte vector is readonly
     */
    private _isReadOnly: boolean;

    // #endregion

    // #region Constructors

    private constructor() { }

    /**
     * Creates a {@link ByteVector} from a collection of bytes, byte arrays, and byte vectors. This
     * method is better to use when a known quantity of byte vectors will be concatenated together,
     * since doing multiple calls to {@link ByteVector.addByteVector} results in the entire byte
     * vector being copied for each call.
     * @param vectors ByteVectors, byte arrays, or straight bytes to concatenate together into a
     *     new {@link ByteVector}
     * @returns ByteVector Single byte vector with the contents of the byte vectors in
     *     `vectors` concatenated together
     */
    // @TODO Remove usages of .addX when this can be substituted
    public static concatenate(... vectors: Array<Uint8Array|ByteVector|number>): ByteVector {
        // Get the length of the vector we need to create
        let totalLength = 0;
        for (const vector of vectors) {
            if (typeof(vector) === "number") {
                totalLength++;
            } else {
                totalLength += (<Uint8Array|ByteVector> vector).length;
            }
        }

        // Create a single big vector and copy the contents into it
        const result = ByteVector.fromSize(totalLength);
        let currentPosition = 0;
        for (const v of vectors) {
            if ((<any> v).length === undefined) {
                // We were given a single byte
                const byte = <number> v;
                Guards.byte(byte, "Byte values");
                result.data[currentPosition] = byte;
                currentPosition += 1;
            } else {
                // We were given an array of bytes
                const vector = <Uint8Array|ByteVector> v;
                for (let i = 0; i < vector.length; i++) {
                    result.data[currentPosition + i] = (<any> vector).get
                        ? (<ByteVector> vector).get(i)
                        : (<Uint8Array> vector)[i];
                }
                currentPosition += vector.length;
            }
        }

        return result;
    }

    /**
     * Creates an empty {@link ByteVector}
     */
    public static empty(): ByteVector {
        return this.fromSize(0);
    }

    /**
     * Creates a {@link ByteVector} from a Uint8Array
     * @param data Uint8Array of the bytes to put in the ByteVector
     * @param length Number of bytes to read
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromByteArray(
        data: Uint8Array,
        length: number = data.length,
        isReadOnly: boolean = false
    ): ByteVector {
        Guards.truthy(data, "data");
        Guards.uint(length, "length");
        if (length > data.length) {
            throw new Error("Argument out of range: length must be less than or equal to the length of the byte array");
        }

        const vector = new ByteVector();
        vector._data = new Uint8Array(length);
        vector._data.set(data.slice(0, length));
        vector._isReadOnly = isReadOnly;
        return vector;
    }

    /**
     * Creates a {@link ByteVector} as a copy of another ByteVector.
     * @param original Data from this ByteVector will be copied into the new one
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromByteVector(original: ByteVector, isReadOnly: boolean = false): ByteVector {
        if (!original) {
            throw new Error("Argument null exception: original was not provided");
        }
        return ByteVector.fromByteArray(original._data, original.length, isReadOnly);
    }

    /**
     * Creates a new instance by reading in the contents of a specified file abstraction.
     * @param abstraction File abstraction to read
     * @param isReadOnly Whether or not the resulting ByteVector is readonly
     */
    public static fromFileAbstraction(abstraction: IFileAbstraction, isReadOnly: boolean = false): ByteVector {
        Guards.truthy(abstraction, "abstraction");

        const stream = abstraction.readStream;
        const output = this.fromInternalStream(stream, isReadOnly);
        abstraction.closeStream(stream);
        return output;
    }

    /**
     * Creates a 4 byte {@link ByteVector} with a signed 32-bit integer as the data
     * @param value Signed 32-bit integer to use as the data. Must be a safe integer, storable in 4
     *        bytes, cannot be a floating point number.
     * @param mostSignificantByteFirst If `true`, `value` will be stored in big endian
     *        format. If `false`, `value` will be stored in little endian format
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromInt(
        value: number,
        mostSignificantByteFirst: boolean = true,
        isReadOnly: boolean = false
    ): ByteVector {
        return ByteVector.getByteVectorFromInteger(value, true, 4, mostSignificantByteFirst, isReadOnly);
    }

    /**
     * Creates a ByteVector using the contents of an TagLibSharp-node stream as the contents. This
     * method reads from the current offset of the stream, not the beginning of the stream
     * @param stream TagLibSharp-node internal stream object
     * @param isReadOnly Whether or not the bytevector is readonly
     */
    public static fromInternalStream(stream: IStream, isReadOnly: boolean = false): ByteVector {
        Guards.truthy(stream, "stream");

        const vector = ByteVector.empty();
        const bytes = new Uint8Array(4096);
        let totalBytesRead = 0;

        while (true) {
            const bytesRead = stream.read(bytes, 0, bytes.length);
            vector.addByteArray(bytes);
            totalBytesRead += bytesRead;

            if (bytesRead < bytes.length) {
                vector.resize(totalBytesRead);
                break;
            }
        }

        vector._isReadOnly = isReadOnly;
        return vector;
    }

    /**
     * Creates an 8 byte {@link ByteVector} with a signed 64-bit integer as the data
     * @param value Signed 64-bit integer to use as the data. Since JavaScript does not support
     *        longs, we are using BigInts. Must be storable in 8 bytes.
     * @param mostSignificantByteFirst If `true`, `value` will be stored in big endian
     *        format. If `false`, `value` will be stored in little endian format
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromLong(
        value: BigInt.BigInteger,
        mostSignificantByteFirst: boolean = true,
        isReadOnly: boolean = false
    ): ByteVector {
        if (value === undefined || value === null) {
            throw new Error("Argument null exception: value is null");
        }
        if (value.gt(BigInt("9223372036854775807")) || value.lt(BigInt("-9223372036854775808"))) {
            throw new Error("Argument out of range: value is too large to fit in a signed long");
        }

        const digits = value.toArray(16);
        const byteArray = new Uint8Array(8);
        let carry = 1;
        for (let i = 0; i < 8; i++) {
            // Get the digits in the position
            const onesIndex = digits.value.length - i * 2 - 1;
            const tensIndex = digits.value.length - i * 2 - 2;
            const onesDigit = onesIndex < 0 ? 0 : digits.value[onesIndex];
            const tensDigit = tensIndex < 0 ? 0 : digits.value[tensIndex];

            // Calculate a byte value for it
            let byteValue = tensDigit * 16 + onesDigit;

            // If the number is negative, calculate 2's complement
            if (digits.isNegative) {
                const complement = (byteValue ^ 0xFF) + carry;
                carry = (complement & 0x100) >> 8;
                byteValue = complement & 0xFF;
            }

            // Store the byte value in the correct output position
            const outputIndex = mostSignificantByteFirst ? byteArray.length - 1 - i : i;
            byteArray[outputIndex] = byteValue;
        }

        return ByteVector.fromByteArray(byteArray, byteArray.length, isReadOnly);
    }

    /**
     * Creates a {@link ByteVector} using the contents of a file as the data
     * @param path Path to the file to store in the ByteVector
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromPath(path: string, isReadOnly: boolean = false): ByteVector {
        if (!path) {
            throw new Error("Argument null exception: Path was not provided");
        }

        // NOTE: We are doing this with read file b/c it removes the headache of working with streams
        const fileBuffer = fs.readFileSync(path);
        return ByteVector.fromByteArray(fileBuffer, fileBuffer.length, isReadOnly);
    }

    /**
     * Creates a 2 byte {@link ByteVector} with a signed 16-bit integer as the data
     * @param value Signed 16-bit integer to use as the data. Must be a safe integer, storable in 2
     *        bytes, cannot be a floating point number.
     * @param mostSignificantByteFirst If `true`, `value` will be stored in big endian
     *        format. If `false`, `value` will be stored in little endian format
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromShort(
        value: number,
        mostSignificantByteFirst: boolean = true,
        isReadOnly: boolean = false
    ): ByteVector {
        return ByteVector.getByteVectorFromInteger(value, true, 2, mostSignificantByteFirst, isReadOnly);
    }

    /**
     * Creates a {@link ByteVector} of a given length with a given value for all the elements
     * @param size Length of the ByteVector. Must be a positive safe integer, cannot be a float
     * @param fill Byte value to initialize all elements to. Must be a positive 8-bit integer,
     *        cannot be floating point
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromSize(
        size: number,
        fill: number = 0x0,
        isReadOnly: boolean = false
    ): ByteVector {
        if (!Number.isInteger(size) || size < 0 || !Number.isSafeInteger(size)) {
            throw new Error("Argument out of range exception: ByteVector size is invalid uint");
        }
        if (!Number.isInteger(fill) || fill < 0 || fill > 0xff) {
            throw new Error("Argument out of range exception: ByteVector fill value cannot be used as a uint8");
        }

        const vector = new ByteVector();
        vector._data = new Uint8Array(size);
        vector._data.fill(fill);

        vector._isReadOnly = isReadOnly;

        return vector;
    }

    /**
     * Creates {@link ByteVector} with the contents of a stream as the data. The stream will be read
     * to the end before the ByteVector is returned.
     * @param readStream Readable stream that will be read in entirety.
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromStream(readStream: NodeJS.ReadableStream, isReadOnly: boolean = false): Promise<ByteVector> {
        return new Promise<ByteVector>((complete, fail) => {
            if (!readStream) {
                 fail(new Error("Null argument exception: Stream was not provided"));
            }

            // Setup the output
            const output = new ByteVector();
            output._data = new Uint8Array(0);

            // Setup the events to read the stream
            readStream.on("readable", () => {
                const bytes = <Buffer> readStream.read();
                if (bytes) {
                    output.addByteArray(bytes);
                }
            });
            readStream.on("end", () => {
                output._isReadOnly = isReadOnly;
                complete(output);
            });
        });
    }

    /**
     * Creates {@link ByteVector} with the byte representation of a string as the data.
     * @param text String to store in the ByteVector
     * @param type StringType to use to encode the string. If {@link StringType.UTF16} is used, the
     *        string will be encoded as UTF16-LE.
     * @param length Number of characters from the string to store in the ByteVector. Must be a
     *        positive 32-bit integer.
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromString(
        text: string,
        type: StringType = StringType.UTF8,
        length: number = Number.MAX_SAFE_INTEGER,
        isReadOnly: boolean = false
    ): ByteVector {
        Guards.notNullOrUndefined(text, "text");
        if (!Number.isInteger(length) || !Number.isSafeInteger(length) || length < 0) {
            throw new Error("Argument out of range exception: length is invalid");
        }

        const vector = new ByteVector();
        vector._data = new Uint8Array(0);

        // If we're doing UTF16 w/o specifying an endian-ness, inject a BOM which also coerces
        // the converter to use UTF16LE
        if (type === StringType.UTF16) {
            vector.addByteArray(new Uint8Array([0xff, 0xfe]));
        }

        // NOTE: This mirrors the behavior from the original .NET implementation where empty
        //       strings return an empty ByteVector (possibly with UTF16LE BOM)
        if (!text) {
            vector._isReadOnly = isReadOnly;
            return vector;
        }

        if (text.length > length) {
            text = text.substr(0, length);
        }
        const textBytes = ByteVector.getIConvEncoding(type, vector).encode(text);
        vector.addByteArray(textBytes);

        vector._isReadOnly = isReadOnly;
        return vector;
    }

    /**
     * Creates a 4 byte {@link ByteVector} with a positive 32-bit integer as the data
     * @param value Positive 32-bit integer to use as the data. Must be a positive safe integer,
     *        storable in 4 bytes, cannot be a floating point number.
     * @param mostSignificantByteFirst If `true`, `value` will be stored in big endian
     *        format. If `false`, `value` will be stored in little endian format
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromUInt(
        value: number,
        mostSignificantByteFirst: boolean = true,
        isReadOnly: boolean = false
    ): ByteVector {
        return ByteVector.getByteVectorFromInteger(value, false, 4, mostSignificantByteFirst, isReadOnly);
    }

    /**
     * Creates an 8 byte {@link ByteVector} with a positive 64-bit integer as the data
     * @param value Positive 64-bit integer to use as the data. Since JavaScript does not support
     *        longs, we are using BigInts. Must be storable in 8 bytes.
     * @param mostSignificantByteFirst If `true`, `value` will be stored in big endian
     *        format. If `false`, `value` will be stored in little endian format
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromULong(
        value: BigInt.BigInteger,
        mostSignificantByteFirst: boolean = true,
        isReadOnly: boolean = false
    ): ByteVector {
        if (value === undefined || value === null) {
            throw new Error("Argument null exception: value is null");
        }
        if (value.gt(BigInt("18446744073709551615")) || value.lt(0)) {
            throw new Error("Argument out of range: value is too large to fit in an unsigned long");
        }

        const digits = value.toArray(16);
        const byteArray = new Uint8Array(8);
        for (let i = 0; i < 8; i++) {
            // Get the digits in the position
            const onesIndex = digits.value.length - i * 2 - 1;
            const tensIndex = digits.value.length - i * 2 - 2;
            const onesDigit = onesIndex < 0 ? 0 : digits.value[onesIndex];
            const tensDigit = tensIndex < 0 ? 0 : digits.value[tensIndex];
            const outputIndex = mostSignificantByteFirst ? byteArray.length - 1 - i : i;

            // Store the byte value in the correct output position

            byteArray[outputIndex] = tensDigit * 16 + onesDigit;
        }

        return ByteVector.fromByteArray(byteArray, byteArray.length, isReadOnly);
    }

    /**
     * Creates a 2 byte {@link ByteVector} with a positive 32-bit integer as the data
     * @param value Positive 32-bit integer to use as the data. Must be a positive safe integer,
     *        storable in 4 bytes, cannot be a floating point number.
     * @param mostSignificantByteFirst If `true`, `value` will be stored in big endian
     *        format. If `false`, `value` will be stored in little endian format
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromUShort(
        value: number,
        mostSignificantByteFirst: boolean = true,
        isReadOnly: boolean = false
    ): ByteVector {
        return ByteVector.getByteVectorFromInteger(value, false, 2, mostSignificantByteFirst, isReadOnly);
    }

    // #endregion

    // #region Properties

    public static get lastUtf16Encoding(): string { return ByteVector._lastUtf16IConvFunc.encoding; }
    public static set lastUtf16Encoding(encoding: string) {
        ByteVector._lastUtf16IConvFunc = new IConvEncoding(encoding);
    }

    public get checksum(): number {
        let sum = 0;
        for (const b of this._data) {
            sum = (sum << 8) ^ ByteVector._crcTable[((sum >> 24) & 0xFF) ^ b];
        }
        return sum;
    }

    /**
     * Array of bytes currently stored in the current instance
     */
    public get data(): Uint8Array { return this._data; }

    public get hashCode(): number { return this.checksum; }

    /**
     * Whether or not the current instance has 0 bytes stored
     */
    public get isEmpty(): boolean { return !this._data || this._data.length === 0; }

    /**
     * Whether or not the current instance is readonly.
     */
    public get isReadOnly(): boolean { return this._isReadOnly; }

    /**
     * Number of bytes currently in this ByteVector
     */
    public get length(): number { return this._data.length; }

    // #endregion

    // #region Public Methods

    public *[Symbol.iterator](): Iterator<number> {
        for (const b of this._data) {
            yield b;
        }
    }

    public static getTextDelimiter(type: StringType): ByteVector {
        return type === StringType.UTF16 || type === StringType.UTF16BE || type === StringType.UTF16LE
            ? ByteVector._td2
            : ByteVector._td1;
    }

    /**
     * Adds a single byte to the end of the {@link ByteVector}
     * @param byte Value to add to the end of the ByteVector. Must be positive 8-bit integer.
     */
    public addByte(byte: number): void {
        this.throwIfReadOnly();
        Guards.byte(byte, "byte");

        this.addByteArray(new Uint8Array([byte]));
    }

    /**
     * Adds an array of bytes to the end of the {@link ByteVector}
     * @param data Array of bytes to add to the end of the ByteVector
     */
    public addByteArray(data: Uint8Array): void {
        this.throwIfReadOnly();
        Guards.truthy(data, "data");

        if (data.length === 0) {
            return;
        }

        const oldData = this._data;
        this._data = new Uint8Array(oldData.length + data.length);
        this._data.set(oldData);
        this._data.set(data, oldData.length);
    }

    /**
     * Adds a {@link ByteVector} to the end of this ByteVector
     * @param data ByteVector to add to the end of this ByteVector
     */
    public addByteVector(data: ByteVector): void {
        this.throwIfReadOnly();
        Guards.truthy(data, "data");

        this.addByteArray(data._data);
    }

    /**
     * Removes all elements from this {@link ByteVector}
     * @remarks NOTE: This method replaces the internal byte array with a new one. Any
     *              existing references to {@link ByteVector.data} will remain unchanged.
     */
    public clear(): void {
        this.throwIfReadOnly();
        this._data = new Uint8Array(0);
    }

    /**
     * Determines if `pattern` exists at a certain `offset` in this byte vector.
     * @param pattern ByteVector to search for at in this byte vector
     * @param offset Position in this byte vector to search for the pattern. If omitted, defaults
     *     to `0`
     * @param patternOffset Position in `pattern` to begin matching. If omitted, defaults
     *     to `0`
     * @param patternLength Bytes of `pattern` to match. If omitted, defaults to all bytes
     *     in the pattern minus the offset
     */
    public containsAt(
        pattern: ByteVector,
        offset: number = 0,
        patternOffset: number = 0,
        patternLength: number = pattern.length - patternOffset
    ): boolean {
        Guards.truthy(pattern, "pattern");
        Guards.int(offset, "offset");
        Guards.int(patternOffset, "patternOffset");
        Guards.int(patternLength, "patternLength");

        // Do some sanity checking -- all of these things are needed for the search to be valid
        if (
            patternLength > this.length ||
            offset >= this.length ||
            patternOffset >= pattern.length ||
            patternLength <= 0 ||
            offset < 0
        ) {
            return false;
        }

        // Loop through looking for a mismatch
        for (let i = 0; i < patternLength - patternOffset; i++) {
            if (this._data[i + offset] !== pattern._data[i + patternOffset]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Compares this byte vector to a different byte vector. Returns a numeric value
     * @param other ByteVector to compare to this byte vector
     */
    public compareTo(other: ByteVector): number {
        Guards.truthy(other, "other");

        let diff = this.length - other.length;

        for (let i = 0; diff === 0 && i < this.length; i++) {
            diff = this.get(i) - other.get(i);
        }

        return diff;
    }

    /**
     * Determines whether or not this byte vector ends with the provided `pattern`.
     * @param pattern ByteVector to look for at the end of this byte vector
     */
    public endsWith(pattern: ByteVector): boolean {
        Guards.truthy(pattern, "pattern");
        return this.containsAt(pattern, this.length - pattern.length);
    }

    /**
     * Determines whether or not this byte vector ends with a part of the `pattern`.
     * NOTE: if this byte vector ends with `pattern` perfectly, it must end with n-1 or
     * less bytes
     * @param pattern ByteVector to look for at the end of this byte vector
     */
    public endsWithPartialMatch(pattern: ByteVector): number {
        Guards.truthy(pattern, "pattern");

        if (pattern.length > this.length) {
            return -1;
        }

        const startIndex = this.length - pattern.length;

        // Try to match the last n-1bytes from the vector (where n is the pattern size)
        // continue trying to match n-2, n-3...1 bytes
        for (let i = 1; i < pattern.length; i++) {
            if (this.containsAt(pattern, startIndex + i, 0, pattern.length - i)) {
                return startIndex + i;
            }
        }

        return -1;
    }

    /**
     * Searches this instance for the `pattern`. Returns the index of the first instance
     * of the pattern, or `-1` if it was not found. Providing a `byteAlign` requires the
     * pattern to appear at an index that is a multiple of the byteAlign parameter.
     * Example: searching "abcd" for "ab" with byteAlign 1 will return 0. Searching "abcd" for
     * "ab" with byteAlign 2 will return 1. Searching "00ab" for "ab" with byteAlign 2 will return
     * 2. Searching "0abc" with byteAlign 2 will return -1.
     * @param pattern Pattern of bytes to search this instance for
     * @param offset Optional, offset into this instance to start searching
     * @param byteAlign Optional, byte alignment the pattern much align to
     */
    public find(pattern: ByteVector, offset: number = 0, byteAlign: number = 1): number {
        Guards.truthy(pattern, "pattern");
        Guards.uint(offset, "offset");
        Guards.uint(byteAlign, "byteAlign");
        Guards.greaterThanInclusive(byteAlign, 1, "byteAlign");

        if (pattern.length > this.length - offset) {
            return -1;
        }

        // Let's go ahead and special case a pattern of size one since that' common and easy to make fast
        if (pattern.length === 1) {
            const p = pattern._data[0];
            for (let i = offset; i < this.length; i += byteAlign) {
                if (this._data[i] === p) {
                    return i;
                }
            }
            return -1;
        }

        // Non-special cases
        const lastOccurrence = new Int32Array(256);
        lastOccurrence.fill(pattern.length);

        for (let i = 0; i < pattern.length - 1; ++i) {
            lastOccurrence[pattern._data[i]] = pattern.length - i - 1;
        }

        for (let i = pattern.length - 1 + offset; i < this.length; i += lastOccurrence[this._data[i]]) {
            let iBuffer = i;
            let iPattern = pattern.length - 1;

            while (iPattern >= 0 && this._data[iBuffer] === pattern._data[iPattern]) {
                --iBuffer;
                --iPattern;
            }

            if (iPattern === -1 && (iBuffer + 1 - offset) % byteAlign === 0) {
                return iBuffer + 1;
            }
        }

        return -1;
    }

    /**
     * Gets the byte at the given `index`
     * @param index Index into the byte vector to return
     */
    public get(index: number): number {
        Guards.uint(index, "index");
        Guards.lessThanInclusive(index, this.length - 1, "index");
        return this._data[index];
    }

    /**
     * Gets the index of the first occurrence of the specified value.
     * @param item A byte to find within the current instance.
     * @returns An integer containing the first index at which the value was found, or -1 if it
     *          was not found/
     */
    public indexOf(item: number): number {
        return this._data.indexOf(item);
    }

    /**
     * Inserts a single byte at the given index of this {@link ByteVector}, increasing the length of
     * the ByteVector by one.
     * @param index Index into this ByteVector at which the value will be inserted.
     * @param byte Value to insert into the ByteVector. Must be a positive integer <=0xFF
     */
    public insertByte(index: number, byte: number): void {
        this.throwIfReadOnly();
        Guards.uint(index, "index");
        Guards.lessThanInclusive(index, this.length, "index");
        Guards.byte(byte, "byte");

        const oldData = this._data;
        this._data = new Uint8Array(oldData.length + 1);

        if (index > 0) {
            this._data.set(oldData.subarray(0, index), 0);
        }
        this._data[index] = byte;
        if (index < oldData.length) {
            this._data.set(oldData.subarray(index), index + 1);
        }
    }

    /**
     * Inserts an array of bytes into this {@link ByteVector} at the given index, increasing the
     * length of this ByteVector by the length of the byte array.
     * @param index Index into this ByteVector at which the bytes will be inserted.
     * @param other Array of bytes to insert into the ByteVector.
     */
    public insertByteArray(index: number, other: Uint8Array): void {
        this.throwIfReadOnly();
        Guards.uint(index, "index");
        Guards.lessThanInclusive(index, this.length, "index");
        Guards.truthy(other, "other");

        if (other.length === 0 ) {
            return;
        }

        const oldData = this._data;
        this._data = new Uint8Array(oldData.length + other.length);

        if (index > 0) {
            this._data.set(oldData.subarray(0, index), 0);
        }
        this._data.set(other, index);
        if (index < oldData.length) {
            this._data.set(oldData.subarray(index), index + other.length);
        }
    }

    /**
     * Inserts another ByteVector into this {@link ByteVector} at the given index, increasing the
     * length of this ByteVector by the length of the ByteVector.
     * @param index Index into this ByteVector at which the ByteVector will be inserted.
     * @param other ByteVector to insert into this ByteVector.
     */
    public insertByteVector(index: number, other: ByteVector): void {
        Guards.truthy(other, "other");
        this.insertByteArray(index, other._data);
    }

    /**
     * Returns a subarray of the current instance. This operation returns a new instance and does
     * not alter the current instance.
     * @param startIndex Index into the array to begin
     * @param length Number of elements from the array to include. If omitted, defaults to the
     *     remainder of the array
     */
    public mid(startIndex: number, length: number = this._data.length - startIndex): ByteVector {
        Guards.uint(startIndex, "startIndex");
        Guards.uint(length, "length");

        if (length === 0) {
            return ByteVector.fromSize(0);
        }

        Guards.lessThanInclusive(startIndex, this.length - 1, "startIndex");
        Guards.lessThanInclusive(length, this.length - startIndex, "length");

        return ByteVector.fromByteArray(this._data.subarray(startIndex, startIndex + length));
    }

    /**
     * Removes a single byte from this {@ByteVector}
     * @param index Index that will be removed from the ByteVector
     */
    public removeAtIndex(index: number) {
        this.throwIfReadOnly();
        Guards.uint(index, "index");
        Guards.lessThanInclusive(index, this.length - 1, "index");

        const oldData = this._data;
        this._data = new Uint8Array(oldData.length - 1);
        if (index > 0) {
            this._data.set(oldData.subarray(0, index), 0);
        }
        if (index < oldData.length) {
            this._data.set(oldData.subarray(index + 1), index);
        }
    }

    /**
     * Removes a range of bytes from this {@ByteVector}
     * @param index Index into this ByteVector where the range to remove begins
     * @param count Number of bytes to remove from this ByteVector
     */
    public removeRange(index: number, count: number) {
        this.throwIfReadOnly();
        Guards.uint(index, "index");
        Guards.lessThanInclusive(index, this.length - 1, "index");
        Guards.uint(count, "count");

        if (index + count > this.length) {
            count = this.length - index;
        }

        const oldData = this._data;
        this._data = new Uint8Array(oldData.length - count);
        if (index > 0) {
            this._data.set(oldData.subarray(0, index), 0);
        }
        if (index < oldData.length) {
            this._data.set(oldData.subarray(index + count), index);
        }
    }

    /**
     * Resizes this instance to the length specified in `size`. If the desired size is
     * longer than the current length, it will be filled with the byte value in
     * `padding`. If the desired size is shorter than the current length, bytes will be
     * removed.
     * @param size Length of the byte vector after resizing. Must be unsigned 32-bit integer
     * @param padding Byte to fill any excess space created after resizing
     */
    public resize(size: number, padding: number = 0x0): ByteVector {
        this.throwIfReadOnly();
        Guards.uint(size, "size");
        Guards.byte(padding, "padding");

        if (this.length > size) {
            this.removeRange(size, this.length - size);
        } else if (this.length < size) {
            const oldData = this._data;
            this._data = new Uint8Array(size);
            this._data.set(oldData);
            this._data.fill(padding, oldData.length);
        }
        // Do nothing on same size

        return this;
    }

    /**
     * Finds a byte vector by searching from the end of this instance and working towards the
     * beginning of this instance. Returns the index of the first instance of the pattern, or `-1`
     * if it was not found. Providing a `byteAlign` requires the pattern to appear at an
     * index that is a multiple of the byteAlign parameter.
     * Example: searching "abcd" for "ab" with byteAlign 1 will return 0. Searching "abcd" for
     * "ab" with byteAlign 2 will return 1. Searching "00ab" for "ab" with byteAlign 2 will return
     * 2. Searching "0abc" with byteAlign 2 will return -1.
     * @param pattern Pattern of bytes to search this instance for
     * @param offset Optional, offset into this instance to start searching
     * @param byteAlign Optional, byte alignment the pattern much align to
     */
    public rFind(pattern: ByteVector, offset: number = 0, byteAlign: number = 1): number {
        Guards.truthy(pattern, "pattern");
        Guards.uint(offset, "offset");
        Guards.uint(byteAlign, "byteAlign");
        Guards.greaterThanInclusive(byteAlign, 1, "byteAlign");

        if (pattern.length === 0 || pattern.length > this.length - offset) {
            return -1;
        }

        // Let's go ahead and special case a pattern of size one since that' common and easy to make fast
        if (pattern.length === 1) {
            const p = pattern._data[0];
            for (let i = this.length - offset - 1; i >= 0; i -= byteAlign) {
                if (this._data[i] === p) {
                    return i;
                }
            }
        }

        // Non-special cases
        const firstOccurrence = new Int32Array(256);
        firstOccurrence.fill(pattern.length);

        for (let i = pattern.length - 1; i > 0; --i) {
            firstOccurrence[pattern.get(i)] = i;
        }

        for (let i = this.length - offset - pattern.length; i >= 0; i -= firstOccurrence[this.get(i)]) {
            if ((offset - i) % byteAlign === 0 && this.containsAt(pattern, i)) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Sets the value at a specified index
     * @param index Index to set the value of
     * @param value Value to set at the index. Must be a valid integer betweenInclusive 0x0 and 0xff
     */
    public set(index: number, value: number): void {
        this.throwIfReadOnly();
        Guards.uint(index, "index");
        Guards.lessThanInclusive(index, this.length, "index");
        Guards.byte(value, "value");
        this._data[index] = value;
    }

    /**
     * Splits this byte vector into a list of byte vectors using a separator
     * @param separator Object to use to split this byte vector
     * @param byteAlign Byte align to use when splitting. in order to split when a pattern is
     *     encountered, the index at which it is found must be divisible by this value.
     * @param max Maximum number of objects to return or 0 to not limit the number. If that number
     *     is reached, the last value will contain the remainder of the file even if it contains
     *     more instances of `separator`.
     * @returns ByteVector[] The split contents of the current instance
     */
    public split(separator: ByteVector, byteAlign: number = 1, max: number = 0): ByteVector[] {
        Guards.truthy(separator, "separator");
        Guards.uint(byteAlign, "byteAlign");
        Guards.greaterThanInclusive(byteAlign, 1, "byteAlign");
        Guards.uint(max, "max");

        const list: ByteVector[] = [];
        let previousOffset = 0;

        for (
            let offset = this.find(separator, 0, byteAlign);
            offset !== -1 && (max < 1 || max > list.length + 1);
            offset = this.find(separator, offset + separator.length, byteAlign)
        ) {
            list.push(this.mid(previousOffset, offset - previousOffset));
            previousOffset = offset + separator.length;
        }

        if (previousOffset < this.length) {
            list.push(this.mid(previousOffset, this.length - previousOffset));
        }

        return list;
    }

    /**
     * Checks whether or not a pattern appears at the beginning of the current instance.
     * @param pattern ByteVector containing the pattern to check for in the current instance.
     * @returns `true` if the pattern was found at the beginning of the current instance, `false`
     *     otherwise.
     */
    public startsWith(pattern: ByteVector) {
        return this.containsAt(pattern, 0);
    }

    // #endregion

    // #region Conversions

    /**
     * Converts the first eight bytes of the current instance to a double-precision floating-point
     * value.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format).
     * @throws Error If there are less than eight bytes in the current instance.
     * @returns A double value containing the value read from the current instance.
     */
    public toDouble(mostSignificantByteFirst: boolean = true): number {
        // NOTE: This is the behavior from the .NET implementation, due to BitConverter behavior
        if (this.length < 8) {
            throw new Error("Invalid operation: Cannot convert a byte vector of <8 bytes to double");
        }
        const array = this.getSizedArray(8, mostSignificantByteFirst);
        const dv = new DataView(array.buffer);
        return dv.getFloat64(0);
    }

    /**
     * Converts the first four bytes of the current instance to a single-precision floating-point
     * value.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format).
     * @throws Error If there are less than four bytes in the current instance
     * @returns A float value containing the value read from the current instance.
     */
    public toFloat(mostSignificantByteFirst: boolean = true): number {
        // NOTE: This is the behavior from the .NET implementation, due to BitConverter behavior
        if (this.length < 4) {
            throw new Error("Invalid operation: Cannot convert a byte vector of <4 bytes to float");
        }
        const dv = new DataView(this.getSizedArray(4, mostSignificantByteFirst).buffer);
        return dv.getFloat32(0);
    }

    /**
     * Converts the first four bytes of the current instance to a signed integer. If the current
     * instance is less than four bytes, the most significant bytes will be filled with 0x00.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format)
     * @returns A signed integer value containing the value read from the current instance
     */
    public toInt(mostSignificantByteFirst: boolean = true): number {
        const dv = new DataView(this.getSizedArray(4, mostSignificantByteFirst).buffer);
        return dv.getInt32(0);
    }

    /**
     * Converts the first eight bytes of the current instance to a signed long. If the current
     * instance is less than eight bytes, the most significant bytes will be filled with 0x00.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format)
     * @returns A signed long value containing the value read from the current instance,
     *          represented as a BigInt due to JavaScript's 32-bit integer limitation
     */
    public toLong(mostSignificantByteFirst: boolean = true): BigInt.BigInteger {
        // The theory here is to get the unsigned value first, then if the number is negative, we
        // we calculate the two's complement and return that * -1
        const uLong = this.toULong(mostSignificantByteFirst);
        const highestOrderBit = BigInt("8000000000000000", 16);

        if (uLong.and(highestOrderBit).isZero()) {
            // Number is positive, no need to calculate two's complement
            return uLong;
        }

        // Number is negative, need to calculate two's complement
        const allBits = BigInt("FFFFFFFFFFFFFFFF", 16);
        return uLong.xor(allBits).add(1).and(allBits).times(-1);
    }

    /**
     * Converts the first two bytes of the current instance to a signed short. If the current
     * instance is less than two bytes, the most significant bytes will be filled with 0x00.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format)
     * @returns A signed short value containing the value read from the current instance
     */
    public toShort(mostSignificantByteFirst: boolean = true): number {
        const dv = new DataView(this.getSizedArray(2, mostSignificantByteFirst).buffer);
        return dv.getInt16(0);
    }

    /**
     * Converts a portion of the current instance to a string using a specified encoding
     * @param count Integer value specifying the number of *bytes* to convert.
     * @param type Value indicating the encoding to use when converting to a string.
     * @param offset Value specifying the index into the current instance at which to start
     *        converting.
     * @returns string String containing the converted bytes
     */
    public toString(count: number = this.length, type: StringType = StringType.UTF8, offset: number = 0): string {
        if (!Number.isInteger(offset) || offset < 0 || offset > this.length) {
            throw new Error("Argument out of range exception: offset is invalid");
        }
        if (!Number.isInteger(count) || count < 0 || count + offset > this.length) {
            throw new Error("Argument out of range exception: count is invalid");
        }

        const bom = type === StringType.UTF16 && this.length - offset > 1 ? this.mid(offset, 2) : null;
        const buffer = AB2B(this.mid(offset, count)._data.buffer);
        return ByteVector.getIConvEncoding(type, bom).decode(buffer);

        // NOTE: Original .NET implementation had explicit BOM stripping, which is unnecessary when
        //       we use IConv.
    }

    /**
     * Converts the current instance into an array of strings starting at the specified offset and
     * using the specified encoding, assuming the values are `null` separated and limiting it to a
     * specified number of items.
     * @param type A {@link StringType} value indicating the encoding to use when converting
     * @param offset Value specifying the index into the current instance at which to start
     *        converting.
     * @param count Value specifying a limit to the number of strings to create. Once the limit has
     *        been reached, the last string will be filled by the remainder of the data
     * @returns string[] Array of strings containing the converted text.
     * @remarks I'm not actually sure if this works as defined, but it behaves the same as the
     *       original .NET implementation, so that's good enough for now.
     */
    public toStrings(type: StringType, offset: number, count: number = Number.MAX_SAFE_INTEGER) {
        if (!Number.isInteger(offset) || offset < 0 || offset > this.length) {
            throw new Error("Argument out of range exception: offset is invalid");
        }
        if (!Number.isInteger(count) || count < 0) {
            throw new Error("Argument out of range exception: count is invalid");
        }

        const chunk = 0;
        let position = offset;

        const list: string[] = [];
        const separator = ByteVector.getTextDelimiter(type);
        const align = separator.length;

        while (chunk < count && position < this.length) {
            const start = position;
            if (chunk + 1 === count) {
                position = offset + count;
            } else {
                position = this.find(separator, start, align);
                if (position < 0) {
                    position = this.length;
                }
            }

            const length = position - start;

            if (length === 0) {
                list.push("");
            } else {
                list.push(this.toString(length, type, start));
            }

            position += align;
        }

        return list;
    }

    /**
     * Converts the first four bytes of the current instance to an unsigned integer. If the current
     * instance is less than four bytes, the most significant bytes will be filled with 0x00.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format)
     * @returns An unsigned integer value containing the value read from the current instance
     */
    public toUInt(mostSignificantByteFirst: boolean = true): number {
        const dv = new DataView(this.getSizedArray(4, mostSignificantByteFirst).buffer);
        return dv.getUint32(0);
    }

    /**
     * Converts the first eight bytes of the current instance to an unsigned long. If the current
     * instance is less than eight bytes, the most significant bytes will be filled with 0x00.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format)
     * @returns An unsigned short value containing the value read from the current instance,
     *          represented as a BigInt due to JavaScript's 32-bit integer limitation
     */
    public toULong(mostSignificantByteFirst: boolean = true): BigInt.BigInteger {
        const sizedArray = this.getSizedArray(8, mostSignificantByteFirst);

        // Convert the bytes into a string first
        let str = "";
        for (const element of sizedArray) {
            str += element.toString(16).padStart(2, "0");
        }
        return BigInt(str, 16);
    }

    /**
     * Converts the first two bytes of the current instance to an unsigned short. If the current
     * instance is less than two bytes, the most significant bytes will be filled with 0x00.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format)
     * @returns An unsigned short value containing the value read from the current instance
     */
    public toUShort(mostSignificantByteFirst: boolean = true): number {
        const dv = new DataView(this.getSizedArray(2, mostSignificantByteFirst).buffer);
        return dv.getUint16(0);
    }

    // #endregion

    // #region Operator-Like Methods

    /**
     * Creates a new {@link ByteVector} that contains the contents of `first` concatenated
     * with `second`. This operation can be thought of as `first + second`. Note: Regardless
     * of the value of {@link ByteVector.isReadOnly}, the created ByteVector will always be
     * read/write.
     * @param first ByteVector to which `second` will be added
     * @param second ByteVector which will be added to `first`
     */
    public static add(first: ByteVector, second: ByteVector): ByteVector {
        const sum = ByteVector.fromByteVector(first);   // Will throw on null/undefined
        sum.addByteVector(second);                      // Will throw on null/undefined
        return sum;
    }

    /**
     * Returns `true` if the contents of the two {@link ByteVector}s are identical, returns `false`
     * otherwise
     * @param first ByteVector to compare with `second`
     * @param second ByteVector to compare with `first`
     */
    public static equal(first: ByteVector, second: ByteVector): boolean {
        const fNull = !first;
        const sNull = !second;
        if (fNull && sNull) {
            // Since (f|s)null could be true with `undefined` OR `null`, we'll just let === decide it for us
            return first === second;
        }

        if (fNull || sNull) {
            // If only one is null/undefined, then they are not equal
            return false;
        }

        return first.compareTo(second) === 0;
    }

    /**
     * Returns `false` if the contents of the two {@link ByteVector}s are identical, returns `true`
     * otherwise
     * @param first ByteVector to compare with `second`
     * @param second ByteVector to compare with `first`
     */
    public static notEqual(first: ByteVector, second: ByteVector): boolean {
        return !ByteVector.equal(first, second);
    }

    /**
     * Returns `true` if `first` is greater than `second`. This is true if
     * `first` is longer than `second` or if the first element in `first`
     * that is different than the element at the same position in `second` is greater than.
     * Returns `false` if the two {@link ByteVector}s are identical.
     * @param first ByteVector to compare with `second`
     * @param second ByteVector to compare with `first`
     */
    public static greaterThan(first: ByteVector, second: ByteVector): boolean {
        if (!first) {
            throw new Error("Argument null exception: first is null");
        }
        if (!second) {
            throw new Error("Argument null exception: second is null");
        }

        return first.compareTo(second) > 0;
    }

    /**
     * Returns `true` if `first` is greater than `second`. This is true if
     * `first` is longer than `second` or if the first element in `first`
     * that is different than the element at the same position in `second` is greater than.
     * Returns `true` if the two {@link ByteVector}s are identical.
     * @param first ByteVector to compare with `second`
     * @param second ByteVector to compare with `first`
     */
    public static greaterThanEqual(first: ByteVector, second: ByteVector): boolean {
        if (!first) {
            throw new Error("Argument null exception: first is null");
        }
        if (!second) {
            throw new Error("Argument null exception: second is null");
        }

        return first.compareTo(second) >= 0;
    }

    /**
     * Returns `true` if `first` is less than `second`. This is true if
     * `first` is shorter than `second` or if the first element in `first`
     * that is different than the element at the same position in `second` is less than.
     * Returns `false` if the two {@link ByteVector}s are identical.
     * @param first ByteVector to compare with `second`
     * @param second ByteVector to compare with `first`
     */
    public static lessThan(first: ByteVector, second: ByteVector): boolean {
        if (!first) {
            throw new Error("Argument null exception: first is null");
        }
        if (!second) {
            throw new Error("Argument null exception: second is null");
        }

        return first.compareTo(second) < 0;
    }

    /**
     * Returns `true` if `first` is less than `second`. This is true if
     * `first` is shorter than `second` or if the first element in `first`
     * that is different than the element at the same position in `second` is less than.
     * Returns `true` if the two {@link ByteVector}s are identical.
     * @param first ByteVector to compare with `second`
     * @param second ByteVector to compare with `first`
     */
    public static lessThanEqual(first: ByteVector, second: ByteVector): boolean {
        if (!first) {
            throw new Error("Argument null exception: first is null");
        }
        if (!second) {
            throw new Error("Argument null exception: second is null");
        }

        return first.compareTo(second) <= 0;
    }

    // #endregion

    // #region Private Helpers

    private static getByteVectorFromInteger(
        value: number,
        signed: boolean,
        count: number,
        mostSignificantByteFirst: boolean,
        isReadOnly: boolean
    ): ByteVector {
        if (!Number.isInteger(value) || !Number.isSafeInteger(value)) {
            throw new Error("Argument out of range: value is not a valid integer");
        }

        // Look for overflows
        if (signed && (value > ByteVector._maxInts[count].max || value < ByteVector._maxInts[count].min)) {
            throw new Error(`Argument out of range: value overflows a signed ${count} byte integer`);
        }
        if (!signed && (value > ByteVector._maxInts[count].mask || value < 0)) {
            throw new Error(`Argument out of range: value overflows an unsigned ${count} byte integer`);
        }

        const bytes = new Uint8Array(count);
        for (let i = 0; i < count; i++) {
            const offset = mostSignificantByteFirst ? count - i - 1 : i;
            bytes[offset] = (value >> (i * 8) & 0xFF);
        }

        return ByteVector.fromByteArray(bytes, undefined, isReadOnly);
    }

    private static getIConvEncoding(type: StringType, bom: ByteVector): IConvEncoding {
        switch (type) {
            case StringType.UTF16:
                // If we have a BOM, return the appropriate encoding.  Otherwise, assume we're
                // reading from a string that was already identified. In that case, we'll use
                // the last used encoding.
                if (bom) {
                    if (bom.get(0) === 0xFF && bom.get(1) === 0xFE) {
                        ByteVector._lastUtf16IConvFunc = new IConvEncoding("utf16-le");
                    } else if ( bom.get(0) === 0xFE && bom.get(1) === 0xFF) {
                        ByteVector._lastUtf16IConvFunc = new IConvEncoding("utf16-be");
                    }
                }
                return ByteVector._lastUtf16IConvFunc;
            case StringType.UTF16BE:
                return new IConvEncoding("utf16-be");
            case StringType.UTF8:
                return new IConvEncoding("utf8");
            case StringType.UTF16LE:
                return new IConvEncoding("utf16-le");
        }

        // NOTE: The original .NET implementation has the notion of "broken" latin behavior that
        //       uses Encoding.Default. I have removed it in this port because 1) this behavior is
        //       not used anywhere in the library, 2) Encoding.Default could be anything depending
        //       on the machine's region, 3) in .NET Core this is always UTF8.
        //       If it turns out we need support for other non unicode encodings, we'll want to
        //       revisit this.
        return new IConvEncoding("latin1");
    }

    private getSizedArray(size: number, mostSignificantByteFirst: boolean): Uint8Array {
        const last = this.length > size ? size - 1 : this.length - 1;
        const pad = size - (last + 1);

        const output = new Uint8Array(size);
        for (let i = 0; i <= last; i++) {
            const outIndex = pad + (mostSignificantByteFirst ? i : last - i);
            output[outIndex] = this._data[i];
        }

        return output;
    }

    private throwIfReadOnly() {
        if (this._isReadOnly) {
            throw new Error("Not supported: Cannot edit readonly byte vectors");
        }
    }

    // #endregion
}
