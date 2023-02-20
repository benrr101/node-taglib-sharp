import EbmlElement from "./ebmlElement";
import EbmlParserOptions from "./ebmlParserOptions";
import {ByteVector} from "../byteVector";
import {UnsupportedFormatError} from "../errors";
import {File} from "../file";
import {IDisposable} from "../interfaces"
import {Guards, NumberUtils} from "../utils";

export default class EbmlParser implements IDisposable {

    private readonly _file: File;
    private readonly _maxOffset: number;

    // private _childParser: EbmlParser;
    private _currentElement: EbmlElement;
    private _dataOffset: number;
    private _dataSize: number;
    private _headerSize: number;
    private _id: number;
    private _options: EbmlParserOptions;

    /**
     * Absolute position within the file where the reader is currently pointing. This will always
     * be the *next* element to read.
     * @private
     */
    private _offset: number;
    // private _parent: EbmlParser;

    // #region Constructors

    /**
     * Constructs and initializes a new instance using a file and optionally a position within the
     * file where the parser should begin reading. If the parser should process a subset of the
     * file, `length` can be provided.
     * @param file EBML file to process
     * @param offset Position in the file to begin parsing
     * @param maxOffset: Maximum position in the file to read up to
     * @param options Optional options for reading the EBML file
     */
    public constructor(file: File, offset: number, maxOffset: number, options?: EbmlParserOptions) {
        Guards.truthy(file, "file");
        Guards.safeUint(offset, "offset");
        Guards.safeUint(maxOffset, "maxOffset");

        this._file = file;
        this._offset = offset;
        this._maxOffset = maxOffset;

        this.setOptions(options?.maxIdLength ?? 4, options?.maxSizeLength ?? 8);
    }

    // #endregion

    // #region Properties

    public get currentElement(): EbmlElement { return this._currentElement; }

    // #endregion

    // #region Methods

    public static getAllElements(parser: EbmlParser): Map<number, EbmlElement> {
        try {
            const elements = new Map<number, EbmlElement>();
            while (parser.read()) {
                elements.set(
                    parser.currentElement.id,
                    parser.currentElement
                );
            }

            return elements;
        } finally {
            parser.dispose();
        }
    }

    public static processElements(parser: EbmlParser, actionMap: Map<number, (element: EbmlElement) => void>): void {
        try {
            while (parser.read()) {
                const action = actionMap.get(parser.currentElement.id);
                if (action) {
                    action(parser.currentElement);
                }
            }
        }
        finally {
            parser.dispose();
        }
    }

    public dispose(): void {
        // this._parent?.onChildDisposed();
    }

    /**
     * Reads the next element in the file at the current level.
     * @returns boolean `true` if an element was successfully read. `false` otherwise.
     */
    public read(): boolean {
        // if (this._childParser) {
        //     throw new Error("Cannot advance parser when child parser exists. Dispose existing one first.");
        // }

        if (this._offset >= (this._maxOffset - 1)) {
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
        this._currentElement = new EbmlElement(this._file, this._dataOffset, this._id, this._dataSize, this._options)

        return true;
    }

    public setOptions(maxIdLength: number|undefined, maxSizeLength: number|undefined): void {
        Guards.safeUint(maxIdLength, "options.maxIdLength");
        Guards.safeUint(maxSizeLength, "options.maxSizeLength");
        if (maxIdLength > 8 || maxSizeLength > 8) {
            throw new UnsupportedFormatError(
                "Not supported: This EBML file is not supported in this version of node-taglib-sharp."
            )
        }

        this._options = <EbmlParserOptions>{
            maxIdLength: maxIdLength,
            maxSizeLength: maxSizeLength
        };
    }

    // /**
    //  * Stores raw binary bytes in the current element's data section.
    //  * @param value Raw bytes to store in the element
    //  */
    // public setBytes(value: ByteVector): void {
    //     Guards.truthy(value, "value");
    //
    //     // Write the bytes, re-render the header
    //     this._file.insert(value, this._dataOffset, this._dataSize);
    //     const headerBytes = ByteVector.concatenate(
    //         this.renderVariableInteger(this._id),
    //         this.renderVariableInteger(value.length)
    //     )
    //     this._file.insert(headerBytes, this._dataOffset - this._headerSize, this._headerSize);
    //
    //     // Update the current state of the parser
    //     const headerDifference = headerBytes.length - this._headerSize;
    //     this._headerSize = headerBytes.length;
    //     const dataDifference = value.length - this._dataSize;
    //     this._dataSize = value.length;
    //     this._maxOffset += headerDifference + dataDifference;
    //
    //     // Update the parent if necessary
    //     this._parent?.onChildDataSizeChange(headerDifference + dataDifference);
    // }

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

    // private onChildDisposed(): void {
    //     this._childParser = undefined;
    // }
    //
    // private onChildDataSizeChange(difference: number): void {
    //     this._offset += difference;
    //     this._dataSize += difference;
    //     this._maxOffset += difference;
    // }

    private renderVariableInteger(value: number|bigint): ByteVector {
        // The theory behind this algorithm: The maximum size the EBML spec supports at time of
        // writing is 56-bits. Since this is greater than the maximum uint javascript safely
        // handles, we convert the number to bytes. If the uppermost 7 bits of a 56-bit value (the
        // 1st byte) contain something, then we are using 8 bytes to store the value (bytes 1-7 and
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
