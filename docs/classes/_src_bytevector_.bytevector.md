**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/byteVector"](../modules/_src_bytevector_.md) / ByteVector

# Class: ByteVector

## Hierarchy

* **ByteVector**

## Index

### Accessors

* [checksum](_src_bytevector_.bytevector.md#checksum)
* [data](_src_bytevector_.bytevector.md#data)
* [hashCode](_src_bytevector_.bytevector.md#hashcode)
* [isEmpty](_src_bytevector_.bytevector.md#isempty)
* [isReadOnly](_src_bytevector_.bytevector.md#isreadonly)
* [length](_src_bytevector_.bytevector.md#length)
* [lastUtf16Encoding](_src_bytevector_.bytevector.md#lastutf16encoding)

### Methods

* [[Symbol.iterator]](_src_bytevector_.bytevector.md#[symbol.iterator])
* [addByte](_src_bytevector_.bytevector.md#addbyte)
* [addByteArray](_src_bytevector_.bytevector.md#addbytearray)
* [addByteVector](_src_bytevector_.bytevector.md#addbytevector)
* [clear](_src_bytevector_.bytevector.md#clear)
* [compareTo](_src_bytevector_.bytevector.md#compareto)
* [containsAt](_src_bytevector_.bytevector.md#containsat)
* [endsWith](_src_bytevector_.bytevector.md#endswith)
* [endsWithPartialMatch](_src_bytevector_.bytevector.md#endswithpartialmatch)
* [find](_src_bytevector_.bytevector.md#find)
* [get](_src_bytevector_.bytevector.md#get)
* [indexOf](_src_bytevector_.bytevector.md#indexof)
* [insertByte](_src_bytevector_.bytevector.md#insertbyte)
* [insertByteArray](_src_bytevector_.bytevector.md#insertbytearray)
* [insertByteVector](_src_bytevector_.bytevector.md#insertbytevector)
* [mid](_src_bytevector_.bytevector.md#mid)
* [rFind](_src_bytevector_.bytevector.md#rfind)
* [removeAtIndex](_src_bytevector_.bytevector.md#removeatindex)
* [removeRange](_src_bytevector_.bytevector.md#removerange)
* [resize](_src_bytevector_.bytevector.md#resize)
* [set](_src_bytevector_.bytevector.md#set)
* [split](_src_bytevector_.bytevector.md#split)
* [startsWith](_src_bytevector_.bytevector.md#startswith)
* [toDouble](_src_bytevector_.bytevector.md#todouble)
* [toFloat](_src_bytevector_.bytevector.md#tofloat)
* [toInt](_src_bytevector_.bytevector.md#toint)
* [toLong](_src_bytevector_.bytevector.md#tolong)
* [toShort](_src_bytevector_.bytevector.md#toshort)
* [toString](_src_bytevector_.bytevector.md#tostring)
* [toStrings](_src_bytevector_.bytevector.md#tostrings)
* [toUInt](_src_bytevector_.bytevector.md#touint)
* [toULong](_src_bytevector_.bytevector.md#toulong)
* [toUShort](_src_bytevector_.bytevector.md#toushort)
* [add](_src_bytevector_.bytevector.md#add)
* [concatenate](_src_bytevector_.bytevector.md#concatenate)
* [empty](_src_bytevector_.bytevector.md#empty)
* [equal](_src_bytevector_.bytevector.md#equal)
* [fromByteArray](_src_bytevector_.bytevector.md#frombytearray)
* [fromByteVector](_src_bytevector_.bytevector.md#frombytevector)
* [fromFileAbstraction](_src_bytevector_.bytevector.md#fromfileabstraction)
* [fromInt](_src_bytevector_.bytevector.md#fromint)
* [fromInternalStream](_src_bytevector_.bytevector.md#frominternalstream)
* [fromLong](_src_bytevector_.bytevector.md#fromlong)
* [fromPath](_src_bytevector_.bytevector.md#frompath)
* [fromShort](_src_bytevector_.bytevector.md#fromshort)
* [fromSize](_src_bytevector_.bytevector.md#fromsize)
* [fromStream](_src_bytevector_.bytevector.md#fromstream)
* [fromString](_src_bytevector_.bytevector.md#fromstring)
* [fromUInt](_src_bytevector_.bytevector.md#fromuint)
* [fromULong](_src_bytevector_.bytevector.md#fromulong)
* [fromUShort](_src_bytevector_.bytevector.md#fromushort)
* [getTextDelimiter](_src_bytevector_.bytevector.md#gettextdelimiter)
* [greaterThan](_src_bytevector_.bytevector.md#greaterthan)
* [greaterThanEqual](_src_bytevector_.bytevector.md#greaterthanequal)
* [lessThan](_src_bytevector_.bytevector.md#lessthan)
* [lessThanEqual](_src_bytevector_.bytevector.md#lessthanequal)
* [notEqual](_src_bytevector_.bytevector.md#notequal)

## Accessors

### checksum

• get **checksum**(): number

**Returns:** number

___

### data

• get **data**(): Uint8Array

Array of bytes currently stored in the current instance

**Returns:** Uint8Array

___

### hashCode

• get **hashCode**(): number

**Returns:** number

___

### isEmpty

• get **isEmpty**(): boolean

Whether or not the current instance has 0 bytes stored

**Returns:** boolean

___

### isReadOnly

• get **isReadOnly**(): boolean

Whether or not the current instance is readonly.

**Returns:** boolean

___

### length

• get **length**(): number

Number of bytes currently in this ByteVector

**Returns:** number

___

### lastUtf16Encoding

• `Static`get **lastUtf16Encoding**(): string

**Returns:** string

• `Static`set **lastUtf16Encoding**(`encoding`: string): void

#### Parameters:

Name | Type |
------ | ------ |
`encoding` | string |

**Returns:** void

## Methods

### [Symbol.iterator]

▸ **[Symbol.iterator]**(): Iterator\<number>

**Returns:** Iterator\<number>

___

### addByte

▸ **addByte**(`byte`: number): void

Adds a single byte to the end of the [ByteVector](_src_bytevector_.bytevector.md)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`byte` | number | Value to add to the end of the ByteVector. Must be positive 8-bit integer.  |

**Returns:** void

___

### addByteArray

▸ **addByteArray**(`data`: Uint8Array): void

Adds an array of bytes to the end of the [ByteVector](_src_bytevector_.bytevector.md)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | Uint8Array | Array of bytes to add to the end of the ByteVector  |

**Returns:** void

___

### addByteVector

▸ **addByteVector**(`data`: [ByteVector](_src_bytevector_.bytevector.md)): void

Adds a [ByteVector](_src_bytevector_.bytevector.md) to the end of this ByteVector

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to add to the end of this ByteVector  |

**Returns:** void

___

### clear

▸ **clear**(): void

Removes all elements from this [ByteVector](_src_bytevector_.bytevector.md)

**`remarks`** NOTE: This method replaces the internal byte array with a new one. Any
             existing references to [ByteVector.data](_src_bytevector_.bytevector.md#data) will remain unchanged.

**Returns:** void

___

### compareTo

▸ **compareTo**(`other`: [ByteVector](_src_bytevector_.bytevector.md)): number

Compares this byte vector to a different byte vector. Returns a numeric value

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`other` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to compare to this byte vector  |

**Returns:** number

___

### containsAt

▸ **containsAt**(`pattern`: [ByteVector](_src_bytevector_.bytevector.md), `offset?`: number, `patternOffset?`: number, `patternLength?`: number): boolean

Determines if `pattern` exists at a certain `offset` in this byte vector.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`pattern` | [ByteVector](_src_bytevector_.bytevector.md) | - | ByteVector to search for at in this byte vector |
`offset` | number | 0 | Position in this byte vector to search for the pattern. If omitted, defaults     to `0` |
`patternOffset` | number | 0 | Position in `pattern` to begin matching. If omitted, defaults     to `0` |
`patternLength` | number | pattern.length - patternOffset | Bytes of `pattern` to match. If omitted, defaults to all bytes     in the pattern minus the offset  |

**Returns:** boolean

___

### endsWith

▸ **endsWith**(`pattern`: [ByteVector](_src_bytevector_.bytevector.md)): boolean

Determines whether or not this byte vector ends with the provided `pattern`.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`pattern` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to look for at the end of this byte vector  |

**Returns:** boolean

___

### endsWithPartialMatch

▸ **endsWithPartialMatch**(`pattern`: [ByteVector](_src_bytevector_.bytevector.md)): number

Determines whether or not this byte vector ends with a part of the `pattern`.
NOTE: if this byte vector ends with `pattern` perfectly, it must end with n-1 or
less bytes

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`pattern` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to look for at the end of this byte vector  |

**Returns:** number

___

### find

▸ **find**(`pattern`: [ByteVector](_src_bytevector_.bytevector.md), `offset?`: number, `byteAlign?`: number): number

Searches this instance for the `pattern`. Returns the index of the first instance
of the pattern, or `-1` if it was not found. Providing a `byteAlign` requires the
pattern to appear at an index that is a multiple of the byteAlign parameter.
Example: searching "abcd" for "ab" with byteAlign 1 will return 0. Searching "abcd" for
"ab" with byteAlign 2 will return 1. Searching "00ab" for "ab" with byteAlign 2 will return
2. Searching "0abc" with byteAlign 2 will return -1.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`pattern` | [ByteVector](_src_bytevector_.bytevector.md) | - | Pattern of bytes to search this instance for |
`offset` | number | 0 | Optional, offset into this instance to start searching |
`byteAlign` | number | 1 | Optional, byte alignment the pattern much align to  |

**Returns:** number

___

### get

▸ **get**(`index`: number): number

Gets the byte at the given `index`

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | Index into the byte vector to return  |

**Returns:** number

___

### indexOf

▸ **indexOf**(`item`: number): number

Gets the index of the first occurrence of the specified value.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`item` | number | A byte to find within the current instance. |

**Returns:** number

An integer containing the first index at which the value was found, or -1 if it
         was not found/

___

### insertByte

▸ **insertByte**(`index`: number, `byte`: number): void

Inserts a single byte at the given index of this [ByteVector](_src_bytevector_.bytevector.md), increasing the length of
the ByteVector by one.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | Index into this ByteVector at which the value will be inserted. |
`byte` | number | Value to insert into the ByteVector. Must be a positive integer <=0xFF  |

**Returns:** void

___

### insertByteArray

▸ **insertByteArray**(`index`: number, `other`: Uint8Array): void

Inserts an array of bytes into this [ByteVector](_src_bytevector_.bytevector.md) at the given index, increasing the
length of this ByteVector by the length of the byte array.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | Index into this ByteVector at which the bytes will be inserted. |
`other` | Uint8Array | Array of bytes to insert into the ByteVector.  |

**Returns:** void

___

### insertByteVector

▸ **insertByteVector**(`index`: number, `other`: [ByteVector](_src_bytevector_.bytevector.md)): void

Inserts another ByteVector into this [ByteVector](_src_bytevector_.bytevector.md) at the given index, increasing the
length of this ByteVector by the length of the ByteVector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | Index into this ByteVector at which the ByteVector will be inserted. |
`other` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to insert into this ByteVector.  |

**Returns:** void

___

### mid

▸ **mid**(`startIndex`: number, `length?`: number): [ByteVector](_src_bytevector_.bytevector.md)

Returns a subarray of the current instance. This operation returns a new instance and does
not alter the current instance.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`startIndex` | number | - | Index into the array to begin |
`length` | number | this.\_data.length - startIndex | Number of elements from the array to include. If omitted, defaults to the     remainder of the array  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### rFind

▸ **rFind**(`pattern`: [ByteVector](_src_bytevector_.bytevector.md), `offset?`: number, `byteAlign?`: number): number

Finds a byte vector by searching from the end of this instance and working towards the
beginning of this instance. Returns the index of the first instance of the pattern, or `-1`
if it was not found. Providing a `byteAlign` requires the pattern to appear at an
index that is a multiple of the byteAlign parameter.
Example: searching "abcd" for "ab" with byteAlign 1 will return 0. Searching "abcd" for
"ab" with byteAlign 2 will return 1. Searching "00ab" for "ab" with byteAlign 2 will return
2. Searching "0abc" with byteAlign 2 will return -1.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`pattern` | [ByteVector](_src_bytevector_.bytevector.md) | - | Pattern of bytes to search this instance for |
`offset` | number | 0 | Optional, offset into this instance to start searching |
`byteAlign` | number | 1 | Optional, byte alignment the pattern much align to  |

**Returns:** number

___

### removeAtIndex

▸ **removeAtIndex**(`index`: number): void

Removes a single byte from this {@ByteVector}

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | Index that will be removed from the ByteVector  |

**Returns:** void

___

### removeRange

▸ **removeRange**(`index`: number, `count`: number): void

Removes a range of bytes from this {@ByteVector}

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | Index into this ByteVector where the range to remove begins |
`count` | number | Number of bytes to remove from this ByteVector  |

**Returns:** void

___

### resize

▸ **resize**(`size`: number, `padding?`: number): [ByteVector](_src_bytevector_.bytevector.md)

Resizes this instance to the length specified in `size`. If the desired size is
longer than the current length, it will be filled with the byte value in
`padding`. If the desired size is shorter than the current length, bytes will be
removed.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`size` | number | - | Length of the byte vector after resizing. Must be unsigned 32-bit integer |
`padding` | number | 0 | Byte to fill any excess space created after resizing  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### set

▸ **set**(`index`: number, `value`: number): void

Sets the value at a specified index

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | Index to set the value of |
`value` | number | Value to set at the index. Must be a valid integer betweenInclusive 0x0 and 0xff  |

**Returns:** void

___

### split

▸ **split**(`separator`: [ByteVector](_src_bytevector_.bytevector.md), `byteAlign?`: number, `max?`: number): [ByteVector](_src_bytevector_.bytevector.md)[]

Splits this byte vector into a list of byte vectors using a separator

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`separator` | [ByteVector](_src_bytevector_.bytevector.md) | - | Object to use to split this byte vector |
`byteAlign` | number | 1 | Byte align to use when splitting. in order to split when a pattern is     encountered, the index at which it is found must be divisible by this value. |
`max` | number | 0 | Maximum number of objects to return or 0 to not limit the number. If that number     is reached, the last value will contain the remainder of the file even if it contains     more instances of `separator`. |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)[]

ByteVector[] The split contents of the current instance

___

### startsWith

▸ **startsWith**(`pattern`: [ByteVector](_src_bytevector_.bytevector.md)): boolean

Checks whether or not a pattern appears at the beginning of the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`pattern` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector containing the pattern to check for in the current instance. |

**Returns:** boolean

`true` if the pattern was found at the beginning of the current instance, `false`
    otherwise.

___

### toDouble

▸ **toDouble**(`mostSignificantByteFirst?`: boolean): number

Converts the first eight bytes of the current instance to a double-precision floating-point
value.

**`throws`** Error If there are less than eight bytes in the current instance.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`mostSignificantByteFirst` | boolean | true | If `true` the most significant byte appears first (big        endian format). |

**Returns:** number

A double value containing the value read from the current instance.

___

### toFloat

▸ **toFloat**(`mostSignificantByteFirst?`: boolean): number

Converts the first four bytes of the current instance to a single-precision floating-point
value.

**`throws`** Error If there are less than four bytes in the current instance

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`mostSignificantByteFirst` | boolean | true | If `true` the most significant byte appears first (big        endian format). |

**Returns:** number

A float value containing the value read from the current instance.

___

### toInt

▸ **toInt**(`mostSignificantByteFirst?`: boolean): number

Converts the first four bytes of the current instance to a signed integer. If the current
instance is less than four bytes, the most significant bytes will be filled with 0x00.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`mostSignificantByteFirst` | boolean | true | If `true` the most significant byte appears first (big        endian format) |

**Returns:** number

A signed integer value containing the value read from the current instance

___

### toLong

▸ **toLong**(`mostSignificantByteFirst?`: boolean): BigInt.BigInteger

Converts the first eight bytes of the current instance to a signed long. If the current
instance is less than eight bytes, the most significant bytes will be filled with 0x00.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`mostSignificantByteFirst` | boolean | true | If `true` the most significant byte appears first (big        endian format) |

**Returns:** BigInt.BigInteger

A signed long value containing the value read from the current instance,
         represented as a BigInt due to JavaScript's 32-bit integer limitation

___

### toShort

▸ **toShort**(`mostSignificantByteFirst?`: boolean): number

Converts the first two bytes of the current instance to a signed short. If the current
instance is less than two bytes, the most significant bytes will be filled with 0x00.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`mostSignificantByteFirst` | boolean | true | If `true` the most significant byte appears first (big        endian format) |

**Returns:** number

A signed short value containing the value read from the current instance

___

### toString

▸ **toString**(`count?`: number, `type?`: [StringType](../enums/_src_bytevector_.stringtype.md), `offset?`: number): string

Converts a portion of the current instance to a string using a specified encoding

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`count` | number | this.length | Integer value specifying the number of *bytes* to convert. |
`type` | [StringType](../enums/_src_bytevector_.stringtype.md) | StringType.UTF8 | Value indicating the encoding to use when converting to a string. |
`offset` | number | 0 | Value specifying the index into the current instance at which to start        converting. |

**Returns:** string

string String containing the converted bytes

___

### toStrings

▸ **toStrings**(`type`: [StringType](../enums/_src_bytevector_.stringtype.md), `offset`: number, `count?`: number): string[]

Converts the current instance into an array of strings starting at the specified offset and
using the specified encoding, assuming the values are `null` separated and limiting it to a
specified number of items.

**`remarks`** I'm not actually sure if this works as defined, but it behaves the same as the
      original .NET implementation, so that's good enough for now.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`type` | [StringType](../enums/_src_bytevector_.stringtype.md) | - | A [StringType](../enums/_src_bytevector_.stringtype.md) value indicating the encoding to use when converting |
`offset` | number | - | Value specifying the index into the current instance at which to start        converting. |
`count` | number | Number.MAX\_SAFE\_INTEGER | Value specifying a limit to the number of strings to create. Once the limit has        been reached, the last string will be filled by the remainder of the data |

**Returns:** string[]

string[] Array of strings containing the converted text.

___

### toUInt

▸ **toUInt**(`mostSignificantByteFirst?`: boolean): number

Converts the first four bytes of the current instance to an unsigned integer. If the current
instance is less than four bytes, the most significant bytes will be filled with 0x00.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`mostSignificantByteFirst` | boolean | true | If `true` the most significant byte appears first (big        endian format) |

**Returns:** number

An unsigned integer value containing the value read from the current instance

___

### toULong

▸ **toULong**(`mostSignificantByteFirst?`: boolean): BigInt.BigInteger

Converts the first eight bytes of the current instance to an unsigned long. If the current
instance is less than eight bytes, the most significant bytes will be filled with 0x00.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`mostSignificantByteFirst` | boolean | true | If `true` the most significant byte appears first (big        endian format) |

**Returns:** BigInt.BigInteger

An unsigned short value containing the value read from the current instance,
         represented as a BigInt due to JavaScript's 32-bit integer limitation

___

### toUShort

▸ **toUShort**(`mostSignificantByteFirst?`: boolean): number

Converts the first two bytes of the current instance to an unsigned short. If the current
instance is less than two bytes, the most significant bytes will be filled with 0x00.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`mostSignificantByteFirst` | boolean | true | If `true` the most significant byte appears first (big        endian format) |

**Returns:** number

An unsigned short value containing the value read from the current instance

___

### add

▸ `Static`**add**(`first`: [ByteVector](_src_bytevector_.bytevector.md), `second`: [ByteVector](_src_bytevector_.bytevector.md)): [ByteVector](_src_bytevector_.bytevector.md)

Creates a new [ByteVector](_src_bytevector_.bytevector.md) that contains the contents of `first` concatenated
with `second`. This operation can be thought of as `first + second`. Note: Regardless
of the value of [ByteVector.isReadOnly](_src_bytevector_.bytevector.md#isreadonly), the created ByteVector will always be
read/write.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`first` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to which `second` will be added |
`second` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector which will be added to `first`  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### concatenate

▸ `Static`**concatenate**(...`vectors`: Array\<Uint8Array \| [ByteVector](_src_bytevector_.bytevector.md) \| number>): [ByteVector](_src_bytevector_.bytevector.md)

Creates a [ByteVector](_src_bytevector_.bytevector.md) from a collection of bytes, byte arrays, and byte vectors. This
method is better to use when a known quantity of byte vectors will be concatenated together,
since doing multiple calls to [ByteVector.addByteVector](_src_bytevector_.bytevector.md#addbytevector) results in the entire byte
vector being copied for each call.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`...vectors` | Array\<Uint8Array \| [ByteVector](_src_bytevector_.bytevector.md) \| number> | ByteVectors, byte arrays, or straight bytes to concatenate together into a     new [ByteVector](_src_bytevector_.bytevector.md) |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

ByteVector Single byte vector with the contents of the byte vectors in
    `vectors` concatenated together

___

### empty

▸ `Static`**empty**(): [ByteVector](_src_bytevector_.bytevector.md)

Creates an empty [ByteVector](_src_bytevector_.bytevector.md)

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### equal

▸ `Static`**equal**(`first`: [ByteVector](_src_bytevector_.bytevector.md), `second`: [ByteVector](_src_bytevector_.bytevector.md)): boolean

Returns `true` if the contents of the two [ByteVector](_src_bytevector_.bytevector.md)s are identical, returns `false`
otherwise

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`first` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to compare with `second` |
`second` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to compare with `first`  |

**Returns:** boolean

___

### fromByteArray

▸ `Static`**fromByteArray**(`data`: Uint8Array, `length?`: number, `isReadOnly?`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

Creates a [ByteVector](_src_bytevector_.bytevector.md) from a Uint8Array

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`data` | Uint8Array | - | Uint8Array of the bytes to put in the ByteVector |
`length` | number | data.length | Number of bytes to read |
`isReadOnly` | boolean | false | If `true` then the ByteVector will be read only  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromByteVector

▸ `Static`**fromByteVector**(`original`: [ByteVector](_src_bytevector_.bytevector.md), `isReadOnly?`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

Creates a [ByteVector](_src_bytevector_.bytevector.md) as a copy of another ByteVector.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`original` | [ByteVector](_src_bytevector_.bytevector.md) | - | Data from this ByteVector will be copied into the new one |
`isReadOnly` | boolean | false | If `true` then the ByteVector will be read only  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromFileAbstraction

▸ `Static`**fromFileAbstraction**(`abstraction`: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md), `isReadOnly?`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

Creates a new instance by reading in the contents of a specified file abstraction.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`abstraction` | [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) | - | File abstraction to read |
`isReadOnly` | boolean | false | Whether or not the resulting ByteVector is readonly  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromInt

▸ `Static`**fromInt**(`value`: number, `mostSignificantByteFirst?`: boolean, `isReadOnly?`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

Creates a 4 byte [ByteVector](_src_bytevector_.bytevector.md) with a signed 32-bit integer as the data

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`value` | number | - | Signed 32-bit integer to use as the data. Must be a safe integer, storable in 4        bytes, cannot be a floating point number. |
`mostSignificantByteFirst` | boolean | true | If `true`, `value` will be stored in big endian        format. If `false`, `value` will be stored in little endian format |
`isReadOnly` | boolean | false | If `true` then the ByteVector will be read only  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromInternalStream

▸ `Static`**fromInternalStream**(`stream`: [IStream](../interfaces/_src_stream_.istream.md), `isReadOnly?`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

Creates a ByteVector using the contents of an TagLibSharp-node stream as the contents. This
method reads from the current offset of the stream, not the beginning of the stream

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`stream` | [IStream](../interfaces/_src_stream_.istream.md) | - | TagLibSharp-node internal stream object |
`isReadOnly` | boolean | false | Whether or not the bytevector is readonly  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromLong

▸ `Static`**fromLong**(`value`: BigInt.BigInteger, `mostSignificantByteFirst?`: boolean, `isReadOnly?`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

Creates an 8 byte [ByteVector](_src_bytevector_.bytevector.md) with a signed 64-bit integer as the data

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`value` | BigInt.BigInteger | - | Signed 64-bit integer to use as the data. Since JavaScript does not support        longs, we are using BigInts. Must be storable in 8 bytes. |
`mostSignificantByteFirst` | boolean | true | If `true`, `value` will be stored in big endian        format. If `false`, `value` will be stored in little endian format |
`isReadOnly` | boolean | false | If `true` then the ByteVector will be read only  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromPath

▸ `Static`**fromPath**(`path`: string, `isReadOnly?`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

Creates a [ByteVector](_src_bytevector_.bytevector.md) using the contents of a file as the data

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`path` | string | - | Path to the file to store in the ByteVector |
`isReadOnly` | boolean | false | If `true` then the ByteVector will be read only  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromShort

▸ `Static`**fromShort**(`value`: number, `mostSignificantByteFirst?`: boolean, `isReadOnly?`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

Creates a 2 byte [ByteVector](_src_bytevector_.bytevector.md) with a signed 16-bit integer as the data

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`value` | number | - | Signed 16-bit integer to use as the data. Must be a safe integer, storable in 2        bytes, cannot be a floating point number. |
`mostSignificantByteFirst` | boolean | true | If `true`, `value` will be stored in big endian        format. If `false`, `value` will be stored in little endian format |
`isReadOnly` | boolean | false | If `true` then the ByteVector will be read only  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromSize

▸ `Static`**fromSize**(`size`: number, `fill?`: number, `isReadOnly?`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

Creates a [ByteVector](_src_bytevector_.bytevector.md) of a given length with a given value for all the elements

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`size` | number | - | Length of the ByteVector. Must be a positive safe integer, cannot be a float |
`fill` | number | 0 | Byte value to initialize all elements to. Must be a positive 8-bit integer,        cannot be floating point |
`isReadOnly` | boolean | false | If `true` then the ByteVector will be read only  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromStream

▸ `Static`**fromStream**(`readStream`: ReadableStream, `isReadOnly?`: boolean): Promise\<[ByteVector](_src_bytevector_.bytevector.md)>

Creates [ByteVector](_src_bytevector_.bytevector.md) with the contents of a stream as the data. The stream will be read
to the end before the ByteVector is returned.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`readStream` | ReadableStream | - | Readable stream that will be read in entirety. |
`isReadOnly` | boolean | false | If `true` then the ByteVector will be read only  |

**Returns:** Promise\<[ByteVector](_src_bytevector_.bytevector.md)>

___

### fromString

▸ `Static`**fromString**(`text`: string, `type?`: [StringType](../enums/_src_bytevector_.stringtype.md), `length?`: number, `isReadOnly?`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

Creates [ByteVector](_src_bytevector_.bytevector.md) with the byte representation of a string as the data.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`text` | string | - | String to store in the ByteVector |
`type` | [StringType](../enums/_src_bytevector_.stringtype.md) | StringType.UTF8 | StringType to use to encode the string. If [StringType.UTF16](../enums/_src_bytevector_.stringtype.md#utf16) is used, the        string will be encoded as UTF16-LE. |
`length` | number | Number.MAX\_SAFE\_INTEGER | Number of characters from the string to store in the ByteVector. Must be a        positive 32-bit integer. |
`isReadOnly` | boolean | false | If `true` then the ByteVector will be read only  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromUInt

▸ `Static`**fromUInt**(`value`: number, `mostSignificantByteFirst?`: boolean, `isReadOnly?`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

Creates a 4 byte [ByteVector](_src_bytevector_.bytevector.md) with a positive 32-bit integer as the data

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`value` | number | - | Positive 32-bit integer to use as the data. Must be a positive safe integer,        storable in 4 bytes, cannot be a floating point number. |
`mostSignificantByteFirst` | boolean | true | If `true`, `value` will be stored in big endian        format. If `false`, `value` will be stored in little endian format |
`isReadOnly` | boolean | false | If `true` then the ByteVector will be read only  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromULong

▸ `Static`**fromULong**(`value`: BigInt.BigInteger, `mostSignificantByteFirst?`: boolean, `isReadOnly?`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

Creates an 8 byte [ByteVector](_src_bytevector_.bytevector.md) with a positive 64-bit integer as the data

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`value` | BigInt.BigInteger | - | Positive 64-bit integer to use as the data. Since JavaScript does not support        longs, we are using BigInts. Must be storable in 8 bytes. |
`mostSignificantByteFirst` | boolean | true | If `true`, `value` will be stored in big endian        format. If `false`, `value` will be stored in little endian format |
`isReadOnly` | boolean | false | If `true` then the ByteVector will be read only  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromUShort

▸ `Static`**fromUShort**(`value`: number, `mostSignificantByteFirst?`: boolean, `isReadOnly?`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

Creates a 2 byte [ByteVector](_src_bytevector_.bytevector.md) with a positive 32-bit integer as the data

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`value` | number | - | Positive 32-bit integer to use as the data. Must be a positive safe integer,        storable in 4 bytes, cannot be a floating point number. |
`mostSignificantByteFirst` | boolean | true | If `true`, `value` will be stored in big endian        format. If `false`, `value` will be stored in little endian format |
`isReadOnly` | boolean | false | If `true` then the ByteVector will be read only  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### getTextDelimiter

▸ `Static`**getTextDelimiter**(`type`: [StringType](../enums/_src_bytevector_.stringtype.md)): [ByteVector](_src_bytevector_.bytevector.md)

#### Parameters:

Name | Type |
------ | ------ |
`type` | [StringType](../enums/_src_bytevector_.stringtype.md) |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### greaterThan

▸ `Static`**greaterThan**(`first`: [ByteVector](_src_bytevector_.bytevector.md), `second`: [ByteVector](_src_bytevector_.bytevector.md)): boolean

Returns `true` if `first` is greater than `second`. This is true if
`first` is longer than `second` or if the first element in `first`
that is different than the element at the same position in `second` is greater than.
Returns `false` if the two [ByteVector](_src_bytevector_.bytevector.md)s are identical.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`first` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to compare with `second` |
`second` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to compare with `first`  |

**Returns:** boolean

___

### greaterThanEqual

▸ `Static`**greaterThanEqual**(`first`: [ByteVector](_src_bytevector_.bytevector.md), `second`: [ByteVector](_src_bytevector_.bytevector.md)): boolean

Returns `true` if `first` is greater than `second`. This is true if
`first` is longer than `second` or if the first element in `first`
that is different than the element at the same position in `second` is greater than.
Returns `true` if the two [ByteVector](_src_bytevector_.bytevector.md)s are identical.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`first` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to compare with `second` |
`second` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to compare with `first`  |

**Returns:** boolean

___

### lessThan

▸ `Static`**lessThan**(`first`: [ByteVector](_src_bytevector_.bytevector.md), `second`: [ByteVector](_src_bytevector_.bytevector.md)): boolean

Returns `true` if `first` is less than `second`. This is true if
`first` is shorter than `second` or if the first element in `first`
that is different than the element at the same position in `second` is less than.
Returns `false` if the two [ByteVector](_src_bytevector_.bytevector.md)s are identical.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`first` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to compare with `second` |
`second` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to compare with `first`  |

**Returns:** boolean

___

### lessThanEqual

▸ `Static`**lessThanEqual**(`first`: [ByteVector](_src_bytevector_.bytevector.md), `second`: [ByteVector](_src_bytevector_.bytevector.md)): boolean

Returns `true` if `first` is less than `second`. This is true if
`first` is shorter than `second` or if the first element in `first`
that is different than the element at the same position in `second` is less than.
Returns `true` if the two [ByteVector](_src_bytevector_.bytevector.md)s are identical.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`first` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to compare with `second` |
`second` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to compare with `first`  |

**Returns:** boolean

___

### notEqual

▸ `Static`**notEqual**(`first`: [ByteVector](_src_bytevector_.bytevector.md), `second`: [ByteVector](_src_bytevector_.bytevector.md)): boolean

Returns `false` if the contents of the two [ByteVector](_src_bytevector_.bytevector.md)s are identical, returns `true`
otherwise

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`first` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to compare with `second` |
`second` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector to compare with `first`  |

**Returns:** boolean
