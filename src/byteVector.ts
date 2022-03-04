import * as IConv from "iconv-lite";
import * as fs from "fs";
import crc32 from "crc/calculators/crc32";
import {IFileAbstraction} from "./fileAbstraction";
import {IStream} from "./stream";
import {Guards} from "./utils";

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

/**
 * Interface for a read-only array of bytes.
 * @remarks The instance this represents may be backed by a concrete instance of a `Uint8Array` or
 *     it may be backed by a `Uint8Array` that references another instance. Therefore, it is unsafe
 *     to cast this to a {@see ByteVector} and write to it as this may touch multiple instance. If
 *     a writable instance is needed, use {@see IReadOnlyByteVector.toByteVector} to "realize" the
 *     instance to one backed a concrete `Uint8Array` (in some cases, this may create a copy).
 */
export interface IReadOnlyByteVector {
    get checksum(): number;

    /**
     * Whether the current instance has 0 bytes stored.
     */
    get isEmpty(): boolean;

    /**
     * Whether the current instance is readonly.
     */
    get isReadOnly(): boolean;

    /**
     * Number of bytes currently in this instance.
     */
    get length(): number;

    /**
     * Gets iterator for iterating over bytes in the current instance.
     */
    [Symbol.iterator](): Iterator<number>;

    /**
     * Determines if `pattern` exists at a certain `offset` in this byte vector.
     * @param pattern ByteVector to search for at in this byte vector
     * @param offset Position in this byte vector to search for the pattern. If omitted, defaults
     *     to `0`
     */
    containsAt(
        pattern: IReadOnlyByteVector,
        offset: number
    ): boolean;

    /**
     * Compares the current instance to another byte vector. Returns a numeric result.
     * @param other Other byte vector to compare against the current instance.
     */
    compareTo(other: IReadOnlyByteVector): number;

    /**
     * Determines whether this byte vector ends with the provided `pattern`.
     * @param pattern ByteVector to look for at the end of this byte vector
     */
    endsWith(pattern: IReadOnlyByteVector): boolean;

    /**
     * Determines whether this byte vector ends with a part of the `pattern`.
     * NOTE: if this instance ends with `pattern` perfectly, it must end with n-1 or
     * fewer bytes.
     * @param pattern ByteVector to look for at the end of this byte vector
     */
    endsWithPartialMatch(pattern: IReadOnlyByteVector): number;

    /**
     * Determines if this instance has identical contents to the `other` instance.
     * @param other Other instance to compare against the current instance.
     */
    equals(other: IReadOnlyByteVector): boolean;

    /**
     * Searches this instance for the `pattern`. Returns the index of the first instance
     * of the pattern, or `-1` if it was not found. Providing a `byteAlign` requires the
     * pattern to appear at an index that is a multiple of the byteAlign parameter.
     * Example: searching "abcd" for "ab" with byteAlign 1 will return 0. Searching "abcd" for
     * "ab" with byteAlign 2 will return 1. Searching "00ab" for "ab" with byteAlign 2 will return
     * 2. Searching "0abc" with byteAlign 2 will return -1.
     * @param pattern Pattern of bytes to search this instance for
     * @param byteAlign Optional, byte alignment the pattern much align to
     */
    find(pattern: IReadOnlyByteVector, byteAlign?: number): number;

    /**
     * Gets the byte at the given `index`.
     * @param index Element index to return
     */
    get(index: number): number;

    /**
     * Gets the index of the first occurrence of the specified value.
     * @param item A byte to find within the current instance.
     * @returns An integer containing the first index at which the value was found, or -1 if it
     *          was not found/
     */
    indexOf(item: number): number;


    offsetFind(pattern: IReadOnlyByteVector, offset: number, byteAlign?: number ): number;

    /**
     * Finds a byte vector by searching from the end of this instance and working towards the
     * beginning of this instance. Returns the index of the first instance of the pattern, or `-1`
     * if it was not found. Providing a `byteAlign` requires the pattern to appear at an
     * index that is a multiple of the byteAlign parameter.
     * Example: searching "abcd" for "ab" with byteAlign 1 will return 0. Searching "abcd" for
     * "ab" with byteAlign 2 will return 1. Searching "00ab" for "ab" with byteAlign 2 will return
     * 2. Searching "0abc" with byteAlign 2 will return -1.
     * @param pattern Pattern of bytes to search this instance for
     * @param byteAlign Optional, byte alignment the pattern must align to
     */
    rFind(pattern: IReadOnlyByteVector, byteAlign?: number): number;

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
    split(separator: IReadOnlyByteVector, byteAlign?: number, max?: number): IReadOnlyByteVector[];

    /**
     * Returns a window over the current instance.
     * @param startIndex Offset into this instance where the comprehension begins
     * @param length Number of elements from the instance to include. If omitted, defaults to the
     *     remainder of the instance
     * @remarks This *references* the current instance so any changes to it will be reflected in
     *     the returned `IReadOnlyByteVector`. Calling {@link IReadOnlyByteVector.toByteVector}
     *     will copy the instance to a new {@link ByteVector} that does not reference the current
     *     instance.
     */
    subarray(startIndex: number, length?: number): IReadOnlyByteVector;

    /**
     * Checks whether or not a pattern appears at the beginning of the current instance.
     * @param pattern ByteVector containing the pattern to check for in the current instance.
     * @returns `true` if the pattern was found at the beginning of the current instance, `false`
     *     otherwise.
     */
    startsWith(pattern: IReadOnlyByteVector): boolean;

    /**
     * Returns a buffer view on the contents of the current instance. Very useful for interfacing
     * with Node's IO.
     */
    toBuffer(): Buffer;

    /**
     * Returns the current instance as a base64 encoded string.
     */
    toBase64String(): string;

    /**
     * Returns a writable copy of the bytes represented by this instance.
     * @remarks This is a **copy** of the data. Use sparingly.
     */
    toByteVector(): ByteVector;

    /**
     * Converts the first eight bytes of the current instance to a double-precision floating-point
     * value.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format).
     * @throws Error If there are less than eight bytes in the current instance.
     * @returns A double value containing the value read from the current instance.
     */
    toDouble(mostSignificantByteFirst?: boolean): number;

    /**
     * Converts the first four bytes of the current instance to a single-precision floating-point
     * value.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format).
     * @throws Error If there are less than four bytes in the current instance
     * @returns A float value containing the value read from the current instance.
     */
    toFloat(mostSignificantByteFirst?: boolean): number;

    /**
     * Converts the first four bytes of the current instance to a signed integer. If the current
     * instance is less than four bytes, the most significant bytes will be filled with 0x00.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format)
     * @returns A signed integer value containing the value read from the current instance
     */
    toInt(mostSignificantByteFirst?: boolean): number;

    /**
     * Converts the first eight bytes of the current instance to a signed long. If the current
     * instance is less than eight bytes, the most significant bytes will be filled with 0x00.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format)
     * @returns A signed long value containing the value read from the current instance,
     *          represented as a BigInt due to JavaScript's 52-bit integer limitation.
     */
    toLong(mostSignificantByteFirst?: boolean): bigint;

    /**
     * Converts the first two bytes of the current instance to a signed short. If the current
     * instance is less than two bytes, the most significant bytes will be filled with 0x00.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format)
     * @returns A signed short value containing the value read from the current instance
     */
    toShort(mostSignificantByteFirst?: boolean): number;

    /**
     * Converts a portion of the current instance to a string using a specified encoding
     * @param type Value indicating the encoding to use when converting to a string.
     * @returns string String containing the converted bytes
     */
    toString(type?: StringType): string;

    /**
     * Converts the current instance into an array of strings starting at the specified offset and
     * using the specified encoding, assuming the values are `null` separated and limiting it to a
     * specified number of items.
     * @param type A {@link StringType} value indicating the encoding to use when converting
     * @param count Value specifying a limit to the number of strings to create. Once the limit has
     *        been reached, the last string will be filled by the remainder of the data
     * @returns string[] Array of strings containing the converted text.
     * @remarks I'm not actually sure if this works as defined, but it behaves the same as the
     *       original .NET implementation, so that's good enough for now.
     */
    toStrings(type?: StringType, count?: number): string[];

    /**
     * Converts the first four bytes of the current instance to an unsigned integer. If the current
     * instance is less than four bytes, the most significant bytes will be filled with 0x00.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format)
     * @returns An unsigned integer value containing the value read from the current instance
     */
    toUint(mostSignificantByteFirst?: boolean): number;

    /**
     * Converts the first eight bytes of the current instance to an unsigned long. If the current
     * instance is less than eight bytes, the most significant bytes will be filled with 0x00.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format)
     * @returns An unsigned short value containing the value read from the current instance,
     *          represented as a BigInt due to JavaScript's 32-bit integer limitation
     */
    toUlong(mostSignificantByteFirst?: boolean): bigint;

    /**
     * Converts the first two bytes of the current instance to an unsigned short. If the current
     * instance is less than two bytes, the most significant bytes will be filled with 0x00.
     * @param mostSignificantByteFirst If `true` the most significant byte appears first (big
     *        endian format)
     * @returns An unsigned short value containing the value read from the current instance
     */
    toUshort(mostSignificantByteFirst?: boolean): number;
}

/**
 * Wrapper around the `iconv-lite` library to provide string encoding and decoding functionality.
 */
export class Encoding {
    private static readonly _encodings = new Map<StringType, Encoding>([
        [StringType.Latin1, new Encoding("latin1")],
        [StringType.UTF8, new Encoding("utf8")],
        [StringType.UTF16BE, new Encoding("utf16-be")],
        [StringType.UTF16LE, new Encoding("utf16-le")]
    ]);

    /**
     * Contains the last generic UTF16 encoding read. Defaults to UTF16-LE
     */
    private static _lastUtf16Encoding: StringType = StringType.UTF16LE;

    private readonly _encoding: string;

    private constructor(encoding: string) {
        this._encoding = encoding;
    }

    /**
     * Gets the appropriate encoding instance for encoding and decoding strings, based on the
     * provided `type`.
     * @param type Type of string to get an {@link Encoding} class instance for
     * @param bom Optional, the byte order marker for the string. Used to determine UTF16 endianess
     */
    public static getEncoding(type: StringType, bom?: IReadOnlyByteVector): Encoding {
        // When reading a collection of UTF16 strings, sometimes only the first one will contain
        // the BOM. In that case, this field will inform the file what encoding to use for the
        // second string.
        if (type === StringType.UTF16) {
            // If we have a BOM, return the appropriate encoding.  Otherwise, assume we're
            // reading from a string that was already identified. In that case, we'll use
            // the last used encoding.
            if (bom && bom.length >= 2) {
                if (bom.get(0) === 0xFF && bom.get(1) === 0xFE) {
                    this._lastUtf16Encoding = StringType.UTF16LE;
                } else {
                    this._lastUtf16Encoding = StringType.UTF16BE;
                }
            }

            type = this._lastUtf16Encoding;
        }

        return this._encodings.get(type);

        // NOTE: The original .NET implementation has the notion of "broken" latin behavior that
        //       uses Encoding.Default. I have removed it in this port because 1) this behavior is
        //       not used anywhere in the library, 2) Encoding.Default could be anything depending
        //       on the machine's region, 3) in .NET Core this is always UTF8.
        //       If it turns out we need support for other non unicode encodings, we'll want to
        //       revisit this.
    }

    public decode(data: Uint8Array): string {
        // @TODO: The next version of iconv-lite will add Uint8Array to the types for decode. Until
        //    then, I have word it should work w/an 'unsafe' cast. See
        //    https://github.com/ashtuchkin/iconv-lite/issues/293
        return IConv.decode(<Buffer> data, this._encoding);
    }

    public encode(text: string): Uint8Array {
        return IConv.encode(text, this._encoding);
    }
}

/**
 * Wrapper around a `Uint8Array` that provides functionality for reading and writing byte arrays.
 * @remarks Implementation of this class uses a single `Uint8Array` to store bytes. Any operation
 *     that inserts, adds, or removes bytes to this instance will result in a copy of the existing
 *     bytes being made into a larger `Uint8Array`. This also means that any bytes added to the
 *     instance will be copied into it. This decision was made to improve read performance at the
 *     expense of write performance.
 *     The {@link ByteVector.concatenate} method is provided to improve performance when creating
 *     vectors made up of lots of unchanging elements. When possible, use this over creating an
 *     empty `ByteVector` and adding additional `ByteVector`s to it.
 */
export class ByteVector implements IReadOnlyByteVector {

    // #region Member Fields

    /**
     * Contains a one byte text delimiter
     */
    private static readonly _td1: ByteVector = ByteVector.fromSize(1, undefined, true);

    /**
     * Contains a two byte text delimiter
     */
    private static readonly _td2: ByteVector = ByteVector.fromSize(2, undefined, true);

    /**
     * Contains the internal byte list
     */
    private _bytes: Uint8Array;

    /**
     * Whether or not this byte vector is readonly
     */
    private _isReadOnly: boolean;

    // #endregion

    // #region Constructors

    private constructor(bytes: Uint8Array, isReadOnly: boolean) {
        this._bytes = bytes;
        this._isReadOnly = isReadOnly;
    }

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
    public static concatenate(... vectors: Array<Uint8Array|IReadOnlyByteVector|number|undefined>): ByteVector {
        // Get the length of the vector we need to create
        const totalLength = vectors.reduce<number>((accum, vector) => {
            if (vector === undefined || vector === null) {
                // Ignore falsy values
                return accum;
            }
            if (typeof(vector) === "number") {
                // Add 1 for a single byte
                return accum + 1;
            }

            // Add length of vector to length
            return accum + vector.length;
        }, 0);

        // Create a single big vector and copy the contents into it
        const result = ByteVector.fromSize(totalLength);
        let currentPosition = 0;
        for (const v of vectors) {
            if (v === undefined || v === null) {
                // Ignore falsy values
                continue;
            }

            if ((<any> v).length === undefined) {
                // We were given a single byte
                const byte = <number> v;
                Guards.byte(byte, "Byte values");
                result._bytes[currentPosition] = byte;
                currentPosition += 1;
            } else {
                // We were given an array of bytes
                const vector = <Uint8Array|ByteVector> v;
                for (let i = 0; i < vector.length; i++) {
                    result._bytes[currentPosition + i] = (<any> vector).get
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
        return new ByteVector(new Uint8Array(0), false);
    }

    /**
     * Creates a {@link ByteVector} from a `Uint8Array` or node `Buffer`
     * @param data Uint8Array of the bytes to put in the ByteVector
     * @param copyValues If `true` the {@link ByteVector} is based on a copy of the values in
     *    `data`. If `false`, the {@link ByteVector} directly references `data`.
     * @param length Number of bytes to read
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromByteArray(
        data: Uint8Array | Buffer,
        copyValues: boolean,
        length: number = data.length,
        isReadOnly: boolean = false
    ): ByteVector {
        Guards.truthy(data, "data");
        Guards.uint(length, "length");
        if (length > data.length) {
            throw new Error("Argument out of range: length must be less than or equal to the length of the byte array");
        }

        const bytes = copyValues
            ? new Uint8Array(data, 0, length)
            : length < data.length
                ? data.subarray(0, length)
                : data;
        return new ByteVector(bytes, isReadOnly);
    }

    /**
     * Creates a {@link ByteVector} as a copy of another ByteVector.
     * @param original Data from this ByteVector will be copied into the new one
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromByteVector(original: IReadOnlyByteVector, isReadOnly: boolean = false): ByteVector {
        Guards.truthy(original, "original");

        // HACK: This is safe because only one type implements IReadOnlyByteVector ... for now
        return ByteVector.fromByteArray((<ByteVector> original)._bytes, true, original.length, isReadOnly);
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
        Guards.int(value, "value");

        const bytes = new Uint8Array(4);
        const dv = new DataView(bytes.buffer);
        dv.setInt32(0, value, !mostSignificantByteFirst);
        return new ByteVector(bytes, isReadOnly);
    }

    /**
     * Creates a ByteVector using the contents of an TagLibSharp-node stream as the contents. This
     * method reads from the current offset of the stream, not the beginning of the stream
     * @param stream TagLibSharp-node internal stream object
     * @param isReadOnly Whether or not the byte vector is readonly
     */
    public static fromInternalStream(stream: IStream, isReadOnly: boolean = false): ByteVector {
        Guards.truthy(stream, "stream");

        const vector = ByteVector.empty();
        const bytes = new Uint8Array(4096);
        while (true) {
            const bytesRead = stream.read(bytes, 0, bytes.length);
            if (bytesRead < bytes.length) {
                vector.addByteArray(bytes, bytesRead);
                break;
            } else {
                vector.addByteArray(bytes);
            }
        }

        vector._isReadOnly = isReadOnly;
        return vector;
    }

    /**
     * Creates an 8 byte {@link ByteVector} with a signed 64-bit integer as the data
     * @param value Signed 64-bit integer to use as the data. If using a `bigint`, it must fit
     *     within 8 bytes. If using a `number`, it must be a safe integer.
     * @param mostSignificantByteFirst If `true`, `value` will be stored in big endian
     *     format. If `false`, `value` will be stored in little endian format
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromLong(
        value: bigint | number,
        mostSignificantByteFirst: boolean = true,
        isReadOnly: boolean = false
    ): ByteVector {
        let bigIntValue: bigint;
        if (typeof(value) === "number") {
            Guards.safeInt(value, "value");
            bigIntValue = BigInt(value);
        } else {
            Guards.long(value, "value");
            bigIntValue = value;
        }

        const bytes = new Uint8Array(8);
        const dv = new DataView(bytes.buffer);
        dv.setBigInt64(0, bigIntValue, !mostSignificantByteFirst);
        return new ByteVector(bytes, isReadOnly);
    }

    /**
     * Creates a {@link ByteVector} using the contents of a file as the data
     * @param path Path to the file to store in the ByteVector
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromPath(path: string, isReadOnly: boolean = false): ByteVector {
        Guards.truthy(path, "path");

        // NOTE: We are doing this with read file b/c it removes the headache of working with streams
        // @TODO: Add support for async file reading
        const fileBuffer = fs.readFileSync(path);
        return ByteVector.fromByteArray(fileBuffer, false, fileBuffer.length, isReadOnly);
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
        Guards.short(value, "value");

        const bytes = new Uint8Array(2);
        const dv = new DataView(bytes.buffer);
        dv.setInt16(0, value, !mostSignificantByteFirst);
        return new ByteVector(bytes, isReadOnly);
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
        Guards.safeUint(size, "size");
        Guards.byte(fill, "fill");

        const bytes = new Uint8Array(size);
        bytes.fill(fill);
        return new ByteVector(bytes, isReadOnly);
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
            const output = ByteVector.empty();

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
            readStream.on("error", (error: Error) => {
                fail(error);
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
        // @TODO: Allow adding delimiters and find usages that immediately add a delimiter
        Guards.notNullOrUndefined(text, "text");
        if (!Number.isInteger(length) || !Number.isSafeInteger(length) || length < 0) {
            throw new Error("Argument out of range exception: length is invalid");
        }

        // If we're doing UTF16 w/o specifying an endian-ness, inject a BOM which also coerces
        // the converter to use UTF16LE
        const vector = type === StringType.UTF16
            ? new ByteVector(new Uint8Array([0xff, 0xfe]), false)
            : ByteVector.empty();

        // NOTE: This mirrors the behavior from the original .NET implementation where empty
        //       strings return an empty ByteVector (possibly with UTF16LE BOM)
        if (!text) {
            vector._isReadOnly = isReadOnly;
            return vector;
        }

        // Shorten text if only part of it was requested
        if (text.length > length) {
            text = text.substr(0, length);
        }

        // Encode the string into bytes
        const textBytes = Encoding.getEncoding(type, vector).encode(text);
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
    public static fromUint(
        value: number,
        mostSignificantByteFirst: boolean = true,
        isReadOnly: boolean = false
    ): ByteVector {
        Guards.uint(value, "value");

        const bytes = new Uint8Array(4);
        const dv = new DataView(bytes.buffer);
        dv.setUint32(0, value, !mostSignificantByteFirst);
        return new ByteVector(bytes, isReadOnly);
    }

    /**
     * Creates an 8 byte {@link ByteVector} with a positive 64-bit integer as the data
     * @param value Positive 64-bit integer to use as the data. If using a `bigint` it must fit
     *     within 8 bytes. If using a `number` it must be a safe, positive integer.
     * @param mostSignificantByteFirst If `true`, `value` will be stored in big endian
     *        format. If `false`, `value` will be stored in little endian format
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromULong(
        value: bigint | number,
        mostSignificantByteFirst: boolean = true,
        isReadOnly: boolean = false
    ): ByteVector {
        let bigIntValue: bigint;
        if (typeof(value) === "number") {
            Guards.safeUint(value, "value");
            bigIntValue = BigInt(value);
        } else {
            Guards.ulong(value, "value");
            bigIntValue = value;
        }

        const bytes = new Uint8Array(8);
        const dv = new DataView(bytes.buffer);
        dv.setBigUint64(0, bigIntValue, !mostSignificantByteFirst);
        return new ByteVector(bytes, isReadOnly);
    }

    /**
     * Creates a 2 byte {@link ByteVector} with a positive 32-bit integer as the data
     * @param value Positive 16-bit integer to use as the data. Must be a positive safe integer,
     *        storable in 2 bytes, cannot be a floating point number.
     * @param mostSignificantByteFirst If `true`, `value` will be stored in big endian
     *        format. If `false`, `value` will be stored in little endian format
     * @param isReadOnly If `true` then the ByteVector will be read only
     */
    public static fromUShort(
        value: number,
        mostSignificantByteFirst: boolean = true,
        isReadOnly: boolean = false
    ): ByteVector {
        Guards.ushort(value, "value");

        const bytes = new Uint8Array(2);
        const dv = new DataView(bytes.buffer);
        dv.setUint16(0, value, !mostSignificantByteFirst);
        return new ByteVector(bytes, isReadOnly);
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get checksum(): number { return crc32(this._bytes); }

    /** @inheritDoc */
    public get isEmpty(): boolean { return this._bytes?.length === 0; }

    /** @inheritDoc */
    public get isReadOnly(): boolean { return this._isReadOnly; }

    /** @inheritDoc */
    public get length(): number { return this._bytes.length; }

    // #endregion

    // #region Public Static Methods

    /**
     * Gets the appropriate length null-byte text delimiter for the specified `type`.
     * @param type String type to get delimiter for
     */
    public static getTextDelimiter(type: StringType): ByteVector {
        return type === StringType.UTF16 || type === StringType.UTF16BE || type === StringType.UTF16LE
            ? ByteVector._td2
            : ByteVector._td1;
    }

    /**
     * Compares two byte vectors. Returns a numeric value
     * @param a Byte vector to compare against `b`
     * @param b Byte vector to compare against `a`
     * @returns number `0` if the two vectors are the same. Any other value indicates the two are
     *     different. If the two vectors differ by length, this will be the length of `a` minus the
     *     length of `b`. If the lengths are the same it will be the difference between the first
     *     element that differs.
     */
    public static compare(a: IReadOnlyByteVector, b: IReadOnlyByteVector): number {
        Guards.truthy(a, "a");
        Guards.truthy(b, "b");

        let diff = a.length - b.length;
        for (let i = 0; diff === 0 && i < this.length; i++) {
            diff = a.get(i) - b.get(i);
        }

        return diff;
    }

    /**
     * Returns `true` if the contents of the two {@link ByteVector}s are identical, returns `false`
     * otherwise
     * @param first ByteVector to compare with `second`
     * @param second ByteVector to compare with `first`
     */
    public static equals(first: IReadOnlyByteVector, second: IReadOnlyByteVector): boolean {
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

        return ByteVector.compare(first, second) === 0;
    }

    // #endregion

    // #region Public Instance Methods

    /** @inheritDoc */
    public *[Symbol.iterator](): Iterator<number> {
        for (const b of this._bytes) {
            yield b;
        }
    }

    /**
     * Adds a single byte to the end of the current instance
     * @param byte Value to add to the end of the ByteVector. Must be positive 8-bit integer.
     */
    public addByte(byte: number): void {
        this.throwIfReadOnly();
        Guards.byte(byte, "byte");

        this.addByteArray(new Uint8Array([byte]));
    }

    /**
     * Adds an array of bytes to the end of the current instance
     * @param data Array of bytes to add to the end of the ByteVector
     * @param length Number of elements from `data` to copy into the current instance
     */
    public addByteArray(data: Uint8Array, length: number = data.length): void {
        this.throwIfReadOnly();
        Guards.truthy(data, "data");

        if (data.length === 0 || length === 0) {
            return;
        }

        // Create a copy of the existing byte array with additional space at the end for the new
        // byte array. Copy the new array into it.
        const oldData = this._bytes;
        this._bytes = new Uint8Array(oldData.length + data.length);
        this._bytes.set(oldData);
        this._bytes.set(data.subarray(0, length), oldData.length);
    }

    /**
     * Adds a {@link ByteVector} to the end of this ByteVector
     * @param data ByteVector to add to the end of this ByteVector
     */
    public addByteVector(data: IReadOnlyByteVector): void {
        this.throwIfReadOnly();
        Guards.truthy(data, "data");

        if (data.length === 0) {
            return;
        }

        // Create a copy of the existing byte array with additional space at the end for the new
        // byte array. Copy the new array into it.
        const oldData = this._bytes;
        this._bytes = new Uint8Array(oldData.length + data.length);
        this._bytes.set(oldData);
        for (let i = 0; i < data.length; i++) {
            this._bytes[i + oldData.length] = data.get(i);
        }
    }

    /**
     * Removes all elements from this {@link ByteVector}
     * @remarks NOTE: This method replaces the internal byte array with a new one. Any
     *              existing references to {@link ByteVector.data} will remain unchanged.
     */
    public clear(): void {
        this.throwIfReadOnly();
        this._bytes = new Uint8Array(0);
    }

    /** @inheritDoc */
    public containsAt(pattern: IReadOnlyByteVector, offset: number = 0): boolean {
        Guards.truthy(pattern, "pattern");
        Guards.int(offset, "offset");

        // Sanity check - make sure we're within the range of the comprehension
        if (offset < 0 || offset >= this.length) {
            return false;
        }

        // Look through looking for a mismatch
        for (let i = 0; i < pattern.length; i++) {
            if (this._bytes[i] !== pattern.get(i)) {
                return false;
            }
        }

        return true;
    }

    /** @inheritDoc */
    public compareTo(other: IReadOnlyByteVector): number {
        return ByteVector.compare(this, other);
    }

    /** @inheritDoc */
    public endsWith(pattern: IReadOnlyByteVector): boolean {
        return this.containsAt(pattern, this.length - pattern.length);
    }

    /** @inheritDoc */
    public endsWithPartialMatch(pattern: IReadOnlyByteVector): number {
        Guards.truthy(pattern, "pattern");

        // Short circuit impossible calls
        if (pattern.length > this.length) {
            return -1;
        }

        // Try to match the last n-1 bytes of the source (where n is the pattern length), if that
        // fails, try to match n-2, n-3... until there are no more to try.
        const startIndex = this.length - pattern.length;
        for (let i = 1; i < pattern.length; i++) {
            const patternSubset = pattern.subarray(0, pattern.length - i);
            if (this.containsAt(patternSubset, startIndex + i)) {
                return startIndex + i;
            }
        }

        return -1;
    }

    /** @inheritDoc */
    public equals(other: IReadOnlyByteVector): boolean {
        return ByteVector.equals(this, other);
    }

    /** @inheritDoc */
    public find(pattern: IReadOnlyByteVector, byteAlign: number = 1): number {
        Guards.truthy(pattern, "pattern");
        Guards.uint(byteAlign, "byteAlign");
        Guards.greaterThanInclusive(byteAlign, 1, "byteAlign");

        // Sanity check impossible matches
        if (pattern.length === 0 || pattern.length > this.length) {
            return -1;
        }

        for (let i = 0; i < this.length; i += byteAlign) {
            let j = 0;
            while (j < pattern.length) {
                if (this._bytes[i + j] !== pattern.get(j)) {
                    break;
                }

                j++;
            }

            if (j === pattern.length ) {
                return i;
            }
        }

        return -1;
    }

    /** @inheritDoc */
    public get(index: number): number {
        Guards.uint(index, "index");
        Guards.lessThanInclusive(index, this.length - 1, "index");
        return this._bytes[index];
    }

    /** @inheritDoc */
    public indexOf(item: number): number {
        return this._bytes.indexOf(item);
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

        const oldData = this._bytes;
        this._bytes = new Uint8Array(oldData.length + 1);

        if (index > 0) {
            this._bytes.set(oldData.subarray(0, index), 0);
        }
        this._bytes[index] = byte;
        if (index < oldData.length) {
            this._bytes.set(oldData.subarray(index), index + 1);
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

        const oldData = this._bytes;
        this._bytes = new Uint8Array(oldData.length + other.length);

        if (index > 0) {
            this._bytes.set(oldData.subarray(0, index), 0);
        }
        this._bytes.set(other, index);
        if (index < oldData.length) {
            this._bytes.set(oldData.subarray(index), index + other.length);
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
        this.insertByteArray(index, other._bytes);
    }

    /** @inheritDoc */
    public offsetFind(pattern: IReadOnlyByteVector, offset: number, byteAlign?: number): number {
        const findIndex = this.subarray(offset).find(pattern, byteAlign);
        return findIndex >= 0 ? findIndex + offset : findIndex;
    }

    /**
     * Removes a single byte from this {@ByteVector}
     * @param index Index that will be removed from the ByteVector
     */
    public removeAtIndex(index: number) {
        this.throwIfReadOnly();
        Guards.uint(index, "index");
        Guards.lessThanInclusive(index, this.length - 1, "index");

        const oldData = this._bytes;
        this._bytes = new Uint8Array(oldData.length - 1);
        if (index > 0) {
            this._bytes.set(oldData.subarray(0, index), 0);
        }
        if (index < oldData.length) {
            this._bytes.set(oldData.subarray(index + 1), index);
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

        const oldData = this._bytes;
        this._bytes = new Uint8Array(oldData.length - count);
        if (index > 0) {
            this._bytes.set(oldData.subarray(0, index), 0);
        }
        if (index < oldData.length) {
            this._bytes.set(oldData.subarray(index + count), index);
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
            const oldData = this._bytes;
            this._bytes = new Uint8Array(size);
            this._bytes.set(oldData);
            this._bytes.fill(padding, oldData.length);
        }
        // Do nothing on same size

        return this;
    }

    /** @inheritDoc */
    public rFind(pattern: IReadOnlyByteVector, byteAlign: number = 1): number {
        Guards.truthy(pattern, "pattern");
        Guards.uint(byteAlign, "byteAlign");
        Guards.greaterThanInclusive(byteAlign, 1, "byteAlign");

        // Sanity check impossible matches
        if (pattern.length === 0 || pattern.length > this.length) {
            return -1;
        }

        const alignOffset = (this.length % 2) === 0 ? 0 : 1;
        for (let i = this.length - 1 - alignOffset - pattern.length; i >= 0; i -= byteAlign) {
            let j = 0;
            while (j < pattern.length) {
                if (this._bytes[i + j] !== pattern.get(j)) {
                    break;
                }

                j++;
            }

            if (j === pattern.length) {
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
        this._bytes[index] = value;
    }

    /** @inheritDoc */
    public subarray(startIndex: number, length: number = this._bytes.length - startIndex): IReadOnlyByteVector {
        return new ByteVector(this._bytes.subarray(startIndex, startIndex + length), true);
    }

    /** @inheritDoc */
    public split(separator: IReadOnlyByteVector, byteAlign: number = 1, max: number = 0): IReadOnlyByteVector[] {
        Guards.truthy(separator, "separator");
        Guards.uint(byteAlign, "byteAlign");
        Guards.greaterThanInclusive(byteAlign, 1, "byteAlign");
        Guards.uint(max, "max");

        const list: IReadOnlyByteVector[] = [];
        let previousOffset = 0;

        let i = 0;
        while (i < this.length && (max < 1 || list.length < max)) {
            let j = 0;
            while (j < separator.length) {
                if (this._bytes[i + j] !== separator.get(j)) {
                    break;
                }

                j++;
            }

            if (j === separator.length) {
                // We found a separator. Everything before i is a split element
                list.push(this.subarray(previousOffset, i - previousOffset));
                i += separator.length;
                previousOffset = i;
            }
        }

        // Add any remaining bytes to the list
        if (previousOffset < this.length) {
            list.push(this.subarray(previousOffset));
        }

        return list;
    }

    /** @inheritDoc */
    public startsWith(pattern: IReadOnlyByteVector) {
        return this.containsAt(pattern, 0);
    }

    /** @inheritDoc */
    public toBuffer(): Buffer {
        return Buffer.from(this._bytes, this._bytes.byteOffset, this._bytes.byteLength);
    }

    /** @inheritDoc */
    public toBase64String(): string {
        return Buffer.from(this._bytes.buffer, this._bytes.byteOffset, this._bytes.byteLength)
            .toString("base64");
    }

    /** @inheritDoc */
    public toByteVector(): ByteVector {
        return ByteVector.fromByteVector(this);
    }

    /** @inheritDoc */
    public toDouble(mostSignificantByteFirst: boolean = true): number {
        // NOTE: This is the behavior from the .NET implementation, due to BitConverter behavior
        if (this.length < 8) {
            throw new Error("Invalid operation: Cannot convert a byte vector of <8 bytes to double");
        }
        const dv = new DataView(this._bytes);
        return dv.getFloat32(0, !mostSignificantByteFirst);
    }

    /** @inheritDoc */
    public toFloat(mostSignificantByteFirst: boolean = true): number {
        const dv = new DataView(this._bytes);
        return dv.getFloat32(0, !mostSignificantByteFirst);
    }

    /** @inheritDoc */
    public toInt(mostSignificantByteFirst: boolean = true): number {
        const dv = new DataView(this.getSizedBuffer(4, mostSignificantByteFirst));
        return dv.getInt32(0, !mostSignificantByteFirst);
    }

    /** @inheritDoc */
    public toLong(mostSignificantByteFirst: boolean = true): bigint {
        const dv = new DataView(this.getSizedBuffer(8, mostSignificantByteFirst));
        return dv.getBigInt64(0, !mostSignificantByteFirst);
    }

    /** @inheritDoc */
    public toShort(mostSignificantByteFirst: boolean = true): number {
        const dv = new DataView(this.getSizedBuffer(2, mostSignificantByteFirst));
        return dv.getInt16(0, !mostSignificantByteFirst);
    }

    /** @inheritDoc */
    public toString(type: StringType = StringType.UTF8): string {
        const bom = type === StringType.UTF16 && this.length > 1
            ? this.subarray(0, 2)
            : undefined;
        return Encoding.getEncoding(type, bom).decode(this._bytes);
    }

    /** @inheritDoc */
    public toStrings(type: StringType = StringType.UTF8, count: number = Number.MAX_SAFE_INTEGER): string[] {
        Guards.safeUint(count, "count");

        const chunk = 0;
        let position = 0;

        const list: string[] = [];
        const separator = ByteVector.getTextDelimiter(type);
        const align = separator.length;

        while (chunk < count && position < this.length) {
            const start = position;
            if (chunk + 1 === count) {
                position = count;
            } else {
                position = this.subarray(start).find(separator, align);
                if (position < 0) {
                    position = this.length;
                }
            }

            const length = position - start;

            if (length === 0) {
                list.push("");
            } else {
                list.push(this.subarray(start, length).toString(type));
            }

            position += align;
        }

        return list;
    }

    /** @inheritDoc */
    public toUint(mostSignificantByteFirst: boolean = true): number {
        const dv = new DataView(this.getSizedBuffer(4, mostSignificantByteFirst));
        return dv.getUint32(0, !mostSignificantByteFirst);
    }

    /** @inheritDoc */
    public toUlong(mostSignificantByteFirst: boolean = true): bigint {
        const dv = new DataView(this.getSizedBuffer(8, mostSignificantByteFirst));
        return dv.getBigUint64(0, !mostSignificantByteFirst);
    }

    /** @inheritDoc */
    public toUshort(mostSignificantByteFirst: boolean = true): number {
        const dv = new DataView(this.getSizedBuffer(2, mostSignificantByteFirst));
        return dv.getUint16(0, !mostSignificantByteFirst);
    }

    // #endregion

    // #region Private Helpers

    private throwIfReadOnly() {
        if (this._isReadOnly) {
            throw new Error("Invalid operation: Cannot edit readonly byte vectors");
        }
    }

    private getSizedBuffer(size: number, mostSignificantByteFirst: boolean): ArrayBufferLike {
        const difference = size - this._bytes.length;
        if (difference <= 0) {
            // Comprehension is at least the required size
            return this._bytes;
        }

        // Comprehension is too short. Pad it out.
        const fullSizeArray = new Uint8Array(size);
        fullSizeArray.set(this._bytes, difference);
        return fullSizeArray;
    }

    // #endregion
}
