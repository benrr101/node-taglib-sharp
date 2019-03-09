/**
 * @summary Specifies the text encoding used when converting between a {@link string} and a
 *          {@link ByteVector}.
 * @remarks This enumeration is used by {@link ByteVector.FromString(string,StringType)} and
 *          {@link ByteVector.ToString(StringType)}
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
     * Contains a one byte text delimiter
     */
    private static readonly _td1: ReadOnlyByteVector = new ReadOnlyByteVector(1);

    /**
     * Contains a two byte text delimiter
     */
    private static readonly _td2: ReadOnlyByteVector = new ReadOnlyByteVector(2);

    /**
     * Specified whether or not to use a broken Latin-1 behavior
     */
    private static _useBrokenLatin1: boolean;

    /**
     * Contains the internal byte list
     */
    private _data: Uint8Array;

    // #endregion

    // #region Constructors

    private constructor() { }

    public static fromByteArray(data: Uint8Array): ByteVector {
        const vector = new ByteVector();
        vector._data = new Uint8Array(data.length);
        vector._data.set(data);
        return vector;
    }

    public static fromByteVector(original: ByteVector): ByteVector {
        return ByteVector.fromByteArray(original._data);
    }

    public static withSize(size: number, fill: number = 0x0): ByteVector {
        if (!Number.isInteger(size) || size < 0) {
            throw new Error("Argument out of range exception: ByteVector size is invalid uint");
        }
        if (!Number.isInteger(fill) || fill < 0 || fill > 0xff) {
            throw new Error("Argument out of range exception: ByteVector fill value cannot be used as a uint8");
        }

        const vector = new ByteVector();
        vector._data = new Uint8Array(size);
        vector._data.fill(fill);

        return vector;
    }

    // #endregion

    // #region Properties

    /**
     * @property useBrokenLatin1Behavior Gets and sets whether or not to use a broken behavior for
     *           Latin-1 strings, common to ID3v1 and ID3v2 tags.
     *           {@code true} if the broken behavior is to be used. Otherwise {@code false}
     * @description Many media players and taggers incorrectly treat Latin-1 fields as "default
     *              encoding" fields. As such, a tag may end up with Windows-1250 encoded text.
     *              While this problem would be apparent when moving a file from one computer to
     *              another, it would not be apparent on the original machine. By setting this
     *              property to {@code true}, your program will behave like Windows Media Player
     *              and others, who read tags with this broken behavior.
     *              Please note that TagLib# stores tag data in Unicode formats at every possible
     *              instance to avoid these problems in tags it has written.
     */
    public static get useBrokenLatin1Behavior(): boolean { return ByteVector._useBrokenLatin1; }
    public static set useBrokenLatin1Behavior(value: boolean) { ByteVector._useBrokenLatin1 = value; }

    public get checksum(): number {
        let sum = 0;
        for (const b of this._data) {
            sum = (sum << 8) ^ ByteVector._crcTable[((sum >> 24) & 0xFF) ^ b];
        }
        return sum;
    }

    public get data(): Uint8Array { return this._data; }

    public get isEmpty(): boolean { return !this._data || this._data.length === 0; }

    public get length(): number { return this._data.length; }

    // #endregion

    // #region Public Methods

    public mid(startIndex: number, length: number = this._data.length - startIndex): ByteVector {
        if (!Number.isInteger(startIndex) || startIndex < 0 || startIndex > this.length) {
            throw new Error("Argument out of range exception: startIndex is invalid");
        }
        if (!Number.isInteger(length) || length < 0 || startIndex + length > this.length) {
            throw new Error("Argument out of range exception: length is invalid");
        }

        if (length === 0) {
            return ByteVector.withSize(0);
        }

        return ByteVector.fromByteArray(this._data.subarray(startIndex, startIndex + length));
    }

    public find(pattern: ByteVector, offset: number = 0, byteAlign: number = 1): number {
        if (!pattern) {
            throw new Error("Argument null exception: pattern is null");
        }
        if (!Number.isInteger(offset) || offset < 0) {
            throw new Error("Argument out of range exception: offset is invalid");
        }
        if (!Number.isInteger(byteAlign) || byteAlign < 1) {
            throw new Error("Argument out of range exception: byteAlign is invalid");
        }

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

    public rFind(pattern: ByteVector, offset: number = 0, byteAlign: number = 1): number {
        if (!pattern) {
            throw new Error("Argument null exception: pattern is null");
        }
        if (!Number.isInteger(offset) || offset < 0) {
            throw new Error("Argument out of range exception: offset is invalid");
        }
        if (!Number.isInteger(byteAlign) || byteAlign < 1) {
            throw new Error("Argument out of range exception: byteAlign is invalid");
        }

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
            i -= firstOccurrence[pattern._data[i]];
            if ((offset - i) % byteAlign === 0 && this.containsAt(pattern, i)) {
                return i;
            }
        }

        return -1;
    }

    public containsAt(
        pattern: ByteVector,
        offset: number = 0,
        patternOffset: number = 0,
        patternLength: number = Number.MAX_SAFE_INTEGER
    ): boolean {
        if (!pattern) {
            throw new Error("Argument null exception: pattern is null");
        }
        if (!Number.isInteger(offset)) {
            throw new Error("Argument out of range exception: offset is invalid");
        }
        if (!Number.isInteger(patternOffset)) {
            throw new Error("Argument out of range exception: patternOffset is invalid");
        }
        if (!Number.isInteger(patternLength)) {
            throw new Error("Argument out of range exception: patternLength is invalid");
        }

        if (pattern.length < patternLength) {
            patternLength = pattern.length;
        }

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

    public endsWith(pattern: ByteVector): boolean {
        if (!pattern) {
            throw new Error("Argument null exception: pattern is null");
        }

        return this.containsAt(pattern, this.length - pattern.length);
    }

    public endsWithPartialMatch(pattern: ByteVector): number {
        if (!pattern) {
            throw new Error("Argument null exception: pattern is null");
        }

        if (pattern.length > this.length) {
            return -1;
        }

        const startIndex = this.length - pattern.length;

        // Try to match the last n-1bytes from the vector (where n is the pattern size)
        // continue trying to match n-2, n-3...1 bytes
        for (let i = 1; i < pattern.length; i++) {
            if (this.containsAt(pattern, startIndex)) {
                return startIndex + i;
            }
        }

        return -1;
    }

    public addByteVector(data: ByteVector): void {
        this.addByteArray(data._data);
    }

    public addByteArray(data: Uint8Array) {
        if (this.isReadOnly) {
            throw new Error("Not supported: Cannot edit readonly byte vectors");
        }

        if (data) {
            const oldData = this._data;
            this._data = new Uint8Array(oldData.length + data.length);
            this._data.set(oldData);
            this._data.set(data, oldData.length);
        }
    }

    public insertByteVector(other: ByteVector): void {
        this.addByteArray(other._data);
    }

    public insertByteArray(index: number, other: Uint8Array): void {
        if (this.isReadOnly) {
            throw new Error("Not supported: Cannot edit readonly byte vectors");
        }
        if (!Number.isInteger(index) || index < 0) {
            throw new Error("Argument out of range: index is invalid");
        }

        if (other) {
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
    }

    public resize(size: number, padding: number = 0x0): ByteVector {
        if (this.isReadOnly) {
            throw new Error("Not supported: Cannot edit readonly byte vectors");
        }
        if (!Number.isInteger(size) || size < 0) {
            throw new Error("Argument out of range: size is invalid");
        }
        if (!Number.isInteger(padding) || padding > 255 || padding < 0) {
            throw new Error("Argument out of range: padding is invalid");
        }

        if (this.length > size) {
            this.removeRange(size, this.length - size);
        }

        const oldData = this._data;
        this._data = new Uint8Array(size);
        this._data.set(oldData);
        this._data.fill(padding, oldData.length);

        return this;
    }

    public removeRange(index: number, count: number) {
        if (this.isReadOnly) {
            throw new Error("Not supported: Cannot edit readonly byte vectors");
        }
        if (!Number.isInteger(index) || index < 0 || index >= this.length) {
            throw new Error("Argument out of range: index is invalid");
        }
        if (!Number.isInteger(count) || count < 0) {
            throw new Error("Argument out of range: padding is invalid");
        }

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

    public get(index: number): number {
        if (!Number.isInteger(index)) {
            throw new Error("Argument out of range exception: index is invalid");
        }
        return this._data[index];
    }

    // #endregion

    // #region Conversions

    public toInt(mostSignificantByteFirst: boolean = true): number {
        return this.toNumber(4, true, mostSignificantByteFirst);
    }

    public toUint(mostSignificantByteFirst: boolean = true): number {
        return this.toNumber(4, false, mostSignificantByteFirst);
    }

    public toShort(mostSignificantByteFirst: boolean = true): number {
        return this.toNumber(2, true, mostSignificantByteFirst);
    }

    public toUShort(mostSignificantByteFirst: boolean = true): number {
        return this.toNumber(2, false, mostSignificantByteFirst);
    }

    public toLong(mostSignificantByteFirst: boolean = true): number {
        return this.toNumber(8, true, mostSignificantByteFirst);
    }

    public toULong(mostSignificantByteFirst: boolean = true): number {
        return this.toNumber(8, false, mostSignificantByteFirst);
    }

    private toNumber(size: number, signed: boolean, mostSignificatnByteFirst: boolean): number {
        const last = this.length > size ? size - 1 : this.length - 1;
        let sum = 0;
        for (let i = 0; i <= last; i++) {
            const offset = mostSignificatnByteFirst ? last - i : i;
            sum |= this._data[i] << (offset * 8);
        }

        if (!signed) {
            sum >>>= 0;
        }
        return sum;
    }

    // #endregion
}
