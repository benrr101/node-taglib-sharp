import {ByteVector, StringType} from "../byteVector";
import {File, FileAccessMode} from "../file";
import {IDisposable, ILazy} from "../interfaces"
import {Guards, NumberUtils} from "../utils";
import {UnsupportedFormatError} from "../errors";

/**
 * Reads a boolean from the current element's data section.
 * @returns boolean `true` if the data stored in the element is > 0, `false` if 0 is stored
 */
const getBool = (bytes: ByteVector): boolean => {
    return bytes.toUint() > 0;
}

/**
 * Reads a double-precision or single-precision number from the current element's data section.
 * @returns number Floating point value contained in the element.
 */
const getDouble = (bytes: ByteVector): number => {
    switch (bytes.length) {
        case 4:
            return bytes.toFloat();
        case 8:
            return bytes.toDouble();
        default:
            throw new Error("Cannot read double from EBML element that is not 4 or 8 bytes long.");
    }
}

/**
 * Reads a UTF8 string from the current element's data section.
 * @returns string String value contained in the element.
 */
const getString = (bytes: ByteVector): string => {
    // Look for null termination
    const nullIndex = bytes.indexOf(0x00);
    return nullIndex >= 0
        ? bytes.subarray(0, nullIndex).toString(StringType.UTF8)
        : bytes.toString(StringType.UTF8);
}

/**
 * Read an integer from the current element's data section.
 * @remarks The EMBL spec supports up to 64-bit unsigned integers. Due to javascript's
 *     implementation of `number`s and wanting to avoid using `BigInt`s everywhere an integer
 *     is needed in this implementation, we will only support up to 52-bit unsigned integers.
 * @returns number A `safe` integer contained in the element.
 */
const getUint = (bytes: ByteVector): number => {
    // Cast to a "safe" integer
    const bigInt = bytes.toUlong();
    if (bigInt > Number.MAX_SAFE_INTEGER) {
        throw Error(`EBML value ${bigInt} is larger than can be supported by this version of node-taglib-sharp`);
    }

    return Number(bigInt);
}

export class EbmlParserOptions {
    public maxSize?: number;
    public maxIdLength?: number;
    public maxSizeLength?: number;

    public clone(newLength: number): EbmlParserOptions {
        Guards.safeUint(newLength, "newLength");

        const clone = new EbmlParserOptions();
        clone.maxSize = newLength;
        clone.maxIdLength = this.maxIdLength;
        clone.maxSizeLength = this.maxSizeLength;
        return clone;
    }
}

/**
 * An element that allows accessing typed information from a parser at a later time than parsing.
 */
export class EbmlElementValue implements ILazy {
    private readonly _dataOffset: number;
    private readonly _dataSize: number;
    private readonly _file: File;
    private readonly _options: EbmlParserOptions;
    private _data: ByteVector;

    /**
     * Constructs and initializes a new instance using a file, an offset where the target data
     * resides, and the number of bytes of data at that position.
     * @param file File containing the data
     * @param offset Offset into the file where the data begins, must be a safe, positive integer
     * @param size Size of the data in bytes, must be a safe, positive integer
     * @param parserOptions Options from the parser that read the element
     * @internal
     */
    public constructor(file: File, offset: number, size: number, parserOptions: EbmlParserOptions) {
        Guards.truthy(file, "file");
        Guards.safeUint(offset, "offset");
        Guards.safeUint(size, "size")

        this._file = file;
        this._dataOffset = offset;
        this._dataSize = size;
        this._options = parserOptions;
    }

    /** @inheritDoc */
    public get isLoaded(): boolean { return !!this._data; }

    /**
     * Reads a boolean from the current element's data section.
     * @returns boolean `true` if the data stored in the element is > 0, `false` if 0 is stored
     */
    public getBool(): boolean {
        this.load();
        return getBool(this._data);
    }

    /**
     * Reads raw binary bytes from the current element's data section.
     * @returns ByteVector Raw bytes contained in the element.
     */
    public getBytes(): ByteVector {
        this.load();
        return this._data;
    }

    /**
     * Reads a double-precision or single-precision number from the current element's data section.
     * @returns number Floating point value contained in the element.
     */
    public getDouble(): number {
        this.load();
        return getDouble(this._data);
    }

    public getParser(): EbmlParser {
        const newOptions = this._options.clone(this._dataSize);
        return new EbmlParser(this._file, this._dataOffset, newOptions);
    }

    /**
     * Reads a UTF8 string from the current element's data section.
     * @returns string String value contained in the element.
     */
    public getString(): string {
        this.load();
        return getString(this._data);
    }

    /**
     * Read an integer from the current element's data section.
     * @remarks The EMBL spec supports up to 64-bit unsigned integers. Due to javascript's
     *     implementation of `number`s and wanting to avoid using `BigInt`s everywhere an integer
     *     is needed in this implementation, we will only support up to 52-bit unsigned integers.
     * @returns number A `safe` integer contained in the element.
     */
    public getUint(): number {
        this.load();
        return getUint(this._data);
    }

    /** @inheritDoc */
    public load(): void {
        if (this._data) {
            return;
        }

        // Read the data from the file
        const originalFileMode = this._file.mode;
        try {
            this._file.mode = FileAccessMode.Read;
            this._file.seek(this._dataOffset);
            this._data = this._file.readBlock(this._dataSize).toByteVector();
        } finally {
            this._file.mode = originalFileMode;
        }

        // If we still don't have data, then give up
        if (!this._data) {
            throw new Error("EBML element value cannot be read from undefined data");
        }
    }
}

export class EbmlParser implements IDisposable {

    private readonly _file: File;
    private readonly _options: EbmlParserOptions;

    private _childParser: EbmlParser;
    private _data: ByteVector;
    private _dataOffset: number;
    private _dataSize: number;
    private _headerSize: number;
    private _id: number;
    /**
     * Length of all elements and headers that is readable by this instance.
     * @private
     */
    private _maxSize: number;
    /**
     * Absolute position within the file where the reader is currently pointing. This will always
     * be the *next* element to read.
     * @private
     */
    private _offset: number;
    private _parent: EbmlParser;

    // #region Constructors

    /**
     * Constructs and initializes a new instance using a file and optionally a position within the
     * file where the parser should begin reading. If the parser should process a subset of the
     * file, `length` can be provided.
     * @param file EBML file to process
     * @param offset Position in the file to begin parsing
     * @param options Optional options for reading the EBML file
     */
    public constructor(file: File, offset: number = 0, options?: EbmlParserOptions) {
        Guards.truthy(file, "file");
        Guards.safeUint(offset, "offset");

        this._options = options || new EbmlParserOptions();
        this._options.maxIdLength = this._options.maxIdLength || 4;
        this._options.maxSizeLength = this._options.maxSizeLength || 8;

        Guards.safeUint(this._options.maxIdLength, "options.maxIdLength");
        Guards.safeUint(this._options.maxSizeLength, "options.maxSizeLength");
        if (this._options.maxIdLength > 8 || this._options.maxSizeLength > 8) {
            throw new UnsupportedFormatError(
                "Not supported: This EBML file is not supported in this version of node-taglib-sharp."
            )
        }

        this._file = file;
        this._offset = offset;
        this._maxSize = options?.maxSize || this._file.length;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the ID of the current EBML element.
     */
    public get id(): number { return this._id; }

    /**
     * Gets the total size of the current EBML element, header plus data.
     */
    public get length(): number { return this._headerSize + this._dataSize; }

    // #endregion

    // #region Methods

    public static getAllValues(parser: EbmlParser): Map<number, EbmlElementValue> {
        try {
            const elements = new Map<number, EbmlElementValue>();
            while (parser.read()) {
                elements.set(
                    parser.id,
                    parser.getValue()
                );
            }

            return elements;
        } finally {
            parser.dispose();
        }
    }

    public dispose(): void {
        this._parent?.onChildDisposed();
    }

    /**
     * Reads a boolean from the current element's data section.
     * @returns boolean `true` if the data stored in the element is > 0, `false` if 0 is stored or
     *     if an element has not been read, yet.
     */
    public getBool(): boolean {
        return this._dataSize === undefined
            ? false
            : getBool(this.getBytes());
    }

    /**
     * Reads raw binary bytes from the current element's data section.
     * @returns ByteVector Raw bytes contained in the element. `undefined` is returned if an
     *     element has not been read, yet.
     */
    public getBytes(): ByteVector {
        if (!this._file || this._dataSize === undefined) {
            return undefined;
        }

        if (!this._data) {
            this._file.seek(this._dataOffset);
            this._data = this._file.readBlock(this._dataSize);
        }

        return this._data;
    }

    /**
     * Reads a double-precision or single-precision number from the current element's data section.
     * @returns number Floating point value contained in the element. `0` is returned if an element
     *     has not been read, yet.
     */
    public getDouble(): number {
        return this._dataSize === undefined
            ? 0
            : getDouble(this.getBytes());
    }

    /**
     * Reads a UTF8 string from the current element's data section.
     * @returns string String value contained in the element. `undefined` is returned if an element
     *     has not been read, yet.
     */
    public getString(): string {
        return this._dataSize === undefined
            ? undefined
            : getString(this.getBytes());
    }

    /**
     * Generates a new parser for reading/writing nested elements.
     * @returns EbmlParser Parser for reading/writing nested elements. `undefined` is returned if
     *     an element has not been read, yet.
     */
    public getParser(): EbmlParser {
        if (this._childParser) {
            throw new Error("Cannot generate multiple child parsers. Dispose existing one first.");
        }

        if (!this._file || this._dataSize === undefined) {
            return undefined;
        }

        const options = this._options.clone(this._dataSize);
        const nestedParser = new EbmlParser(this._file, this._dataOffset, options);
        nestedParser._parent = this;
        return nestedParser;
    }

    /**
     * Read an integer from the current element's data section.
     * @remarks The EMBL spec supports up to 64-bit unsigned integers. Due to javascript's
     *     implementation of `number`s and wanting to avoid using `BigInt`s everywhere an integer
     *     is needed in this implementation, we will only support up to 52-bit unsigned integers.
     * @returns number A `safe` integer contained in the element. `0` is returned if an element
     *     has not been read, yet.
     */
    public getUint(): number {
        return this._dataSize === undefined
            ? 0
            : getUint(this.getBytes());
    }

    /**
     * Reads the bytes from the current element and packages them up into an object that allows
     * them to be converted at a later time than at reading.
     * @returns EbmlElementValue Object containing the data from the element. `undefined` will be
     *     returned if an element has not been read yet.
     */
    public getValue(): EbmlElementValue {
        return this._dataSize === undefined
            ? undefined
            : new EbmlElementValue(this._file, this._dataOffset, this._dataSize, this._options);
    }

    public processChildren(actionMap: Map<number, (parser: EbmlParser) => void>): void {
        const childrenParser = this.getParser();
        try {
            while(childrenParser.read()) {
                const action = actionMap.get(childrenParser.id);
                if (action) {
                    action(childrenParser);
                }
            }
        } finally {
            childrenParser.dispose();
        }
    }

    /**
     * Reads the next element in the file at the current level.
     * @returns boolean `true` if an element was successfully read. `false` otherwise.
     */
    public read(): boolean {
        if (this._childParser) {
            throw new Error("Cannot advance parser when child parser exists. Dispose existing one first.");
        }

        if (this._offset >= (this._maxSize - 1)) {
            // We've reached the end of the element
            return false;
        }

        // Read the ID
        this._file.seek(this._offset);
        const idReadResult = this.readElementId(this._options.maxIdLength);
        this._id = idReadResult.value;

        // Read the data size
        this._file.seek(this._offset + idReadResult.bytes);
        const dataSizeReadResult = this.readVariableInteger(this._options.maxSizeLength);
        this._dataSize = dataSizeReadResult.value;

        // Update the state of the reader within the file
        this._headerSize = idReadResult.bytes + dataSizeReadResult.bytes;
        this._dataOffset = this._offset + this._headerSize;
        this._offset = this._dataOffset + this._dataSize;
        this._data = undefined;

        return true;
    }

    public setBool(value: boolean): void {

    }

    public setUlong(vaoue: number): void {

    }

    public setUint(value: number): void {

    }

    /**
     * Stores raw binary bytes in the current element's data section.
     * @param value Raw bytes to store in the element
     */
    public setBytes(value: ByteVector): void {
        Guards.truthy(value, "value");

        // Write the bytes, re-render the header
        this._file.insert(value, this._dataOffset, this._dataSize);
        const headerBytes = ByteVector.concatenate(
            this.renderVariableInteger(this._id),
            this.renderVariableInteger(value.length)
        )
        this._file.insert(headerBytes, this._dataOffset - this._headerSize, this._headerSize);

        // Update the current state of the parser
        const headerDifference = headerBytes.length - this._headerSize;
        this._headerSize = headerBytes.length;
        const dataDifference = value.length - this._dataSize;
        this._dataSize = value.length;
        this._maxSize += headerDifference + dataDifference;

        // Update the parent if necessary
        this._parent?.onChildDataSizeChange(headerDifference + dataDifference);
    }

    private static lastSevenBitsTruthy(
        bytes: ByteVector,
        index: number,
        upperMask: number,
        lowerMask: number
    ): boolean {
        const upperByteCheck = index > 1
            ? NumberUtils.hasFlag(bytes.get(index - 1), upperMask)
            : false;
        return upperByteCheck || NumberUtils.hasFlag(bytes.get(index), lowerMask);

    }

    private onChildDisposed(): void {
        this._childParser = undefined;
    }

    private onChildDataSizeChange(difference: number): void {
        this._offset += difference;
        this._dataSize += difference;
        this._maxSize += difference;
    }

    private renderVariableInteger(value: number|bigint): ByteVector {
        // The theory behind this algorithm: The maximum size the EBML spec supports at time of
        // writing is 56-bits. Since this is greater than the maximum uint javascript safely
        // handles, we convert the number to bytes. If the uppermost 7 bits of a 56-bit value (the
        // 1th byte) contain something, then we are using 8 bytes to store the value (bytes 1-7 and
        // a 0x01 length descriptor). If those bits were empty, we check the next 7 bits. This
        // crosses a byte boundary, so we check it using a mask on the lower byte and a mask on the
        // upper byte. If those bits contained something, we OR the upper bits with the length
        // descriptor and take the 2-7 bytes. If the bits are empty, we shift the masks to the
        // left, shift the length descriptor, increment the lower byte index, and repeat.
        // FUCK this took too long to solve.

        const valueBytes = ByteVector.fromUlong(value);
        if (valueBytes.get(0)) {
            throw new Error("Not supported: Values > 56 bits are not supported by EBML spec at this time.")
        }

        let upperMask = 0x00;
        let lowerMask = 0xFE;
        let lengthDescriptor = 0x01;
        let lowerByteIndex = 1;
        while (lowerByteIndex < 8) {
            if (EbmlParser.lastSevenBitsTruthy(valueBytes, lowerByteIndex, upperMask, lowerMask)) {
                const upperMostByte = lowerByteIndex > 0 ? valueBytes.get(lowerByteIndex - 1) : 0x00;
                return ByteVector.concatenate(
                    NumberUtils.uintOr(lengthDescriptor, upperMostByte),
                    valueBytes.subarray(lowerByteIndex)
                )
            }

            upperMask = NumberUtils.uintAnd(NumberUtils.uintLShift(upperMask, 1) + 1, 0xFF);
            lowerMask = NumberUtils.uintAnd(NumberUtils.uintLShift(lowerMask, 1), 0xFF);
            lengthDescriptor = NumberUtils.uintLShift(lengthDescriptor, 1);
            lowerByteIndex++;
        }

        // If we made it this far, the value fits in 7 bits
        const byte = NumberUtils.uintOr(0x80, valueBytes.get(7));
        return ByteVector.fromByteArray([byte]);
    }

    private readElementId(maxBytes: number): { bytes: number, value: number } {
        // For whatever reason, element IDs seem to always include the variable integer length
        // bits. This isn't described in the specification, but all documented element IDs start
        // with the variable integer length bits, so that must be how it is. As such, we just need
        // to determine the length of the variable integer and return the entire thing as a number.
        const bytes = this.readVariableIntegerBytes(maxBytes);
        return {
            bytes: bytes.length,
            value: bytes.toUint()
        }
    }

    private readVariableInteger(maxBytes: number): { bytes: number, value: number } {
        const bytes = this.readVariableIntegerBytes(maxBytes);
        const additionalBytes = bytes.length - 1;

        // Put together the bytes into the output value
        let outputValue = BigInt(0);
        for (let i = 0; i < additionalBytes; i++) {
            const byteIndex = additionalBytes - i;
            const byte = bytes.get(byteIndex);

            // SPECIAL CASE: We operate under the assumption that data sizes will *not* be >52
            // bits. If we encounter too many bits in the number, give up.
            if (additionalBytes >= 7 && i >= 6 && NumberUtils.hasFlag(byte, 0xF0)) {
                throw new Error(
                    "Not supported: EBML data sizes > 52 bits are not supported in this version of node-taglib-sharp"
                );
            }

            outputValue |= BigInt(byte) << BigInt(i * 8)
        }

        // @TODO: Support unknown element size?

        const upperMostMask = NumberUtils.uintRShift(0xFF, additionalBytes + 1);
        const upperMostByte = NumberUtils.uintAnd(bytes.get(0), upperMostMask);
        outputValue |= BigInt(upperMostByte) << BigInt(additionalBytes * 8);

        return {
            bytes: additionalBytes + 1,
            value: Number(outputValue)
        };
    }

    private readVariableIntegerBytes(maxBytes: number): ByteVector {
        // The theory behind this algorithm: Certain numbers in EBML are stored like UTF8 values.
        // The first x bits are used to indicate how many bytes are used to store the value.
        // Starting from the most significant bit, a 1 in this position indicates the value only
        // uses one byte. If the first position is 0, the next bit is checked. A 1 in that position
        // indicates the value uses two bytes. If that position is 0, the next bit is checked, etc.
        // The remaining bits after the first 1 are used as the uppermost bits of the value.
        // For example, a value that uses at most 4 bytes:
        //    1xxx xxxx                                  - Value stored in 7 bits
        //    01xx xxxx  xxxx xxxx                       - Value stored in 14 bits
        //    001x xxxx  xxxx xxxx  xxxx xxxx            - Value stored in 21 bits
        //    0001 xxxx  xxxx xxxx  xxxx xxxx  xxxx xxxx - Value stored in 28 bits

        const bytes = this._file.readBlock(maxBytes);

        // Determine how many bytes are needed to store the value
        let mask = 0x80;
        let additionalBytes = 0
        while (additionalBytes <= maxBytes) {
            if (NumberUtils.hasFlag(bytes.get(0), mask)) {
                break;
            }

            additionalBytes++;
            mask = NumberUtils.uintRShift(mask, 1);
        }

        if (additionalBytes > maxBytes) {
            throw new Error("Invalid EBML format read: Missing length descriptor")
        }
        if (bytes.length < additionalBytes + 1) {
            throw new Error("Invalid EBML format read: Could not read enough bytes");
        }

        return bytes.subarray(0, additionalBytes + 1);
    }

    // #endregion
}
