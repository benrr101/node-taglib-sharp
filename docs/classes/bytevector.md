[node-taglib-sharp](../README.md) / [Exports](../modules.md) / ByteVector

# Class: ByteVector

## Table of contents

### Accessors

- [checksum](bytevector.md#checksum)
- [data](bytevector.md#data)
- [hashCode](bytevector.md#hashcode)
- [isEmpty](bytevector.md#isempty)
- [isReadOnly](bytevector.md#isreadonly)
- [length](bytevector.md#length)
- [lastUtf16Encoding](bytevector.md#lastutf16encoding)

### Methods

- [[iterator]](bytevector.md#[iterator])
- [addByte](bytevector.md#addbyte)
- [addByteArray](bytevector.md#addbytearray)
- [addByteVector](bytevector.md#addbytevector)
- [clear](bytevector.md#clear)
- [compareTo](bytevector.md#compareto)
- [containsAt](bytevector.md#containsat)
- [endsWith](bytevector.md#endswith)
- [endsWithPartialMatch](bytevector.md#endswithpartialmatch)
- [find](bytevector.md#find)
- [get](bytevector.md#get)
- [indexOf](bytevector.md#indexof)
- [insertByte](bytevector.md#insertbyte)
- [insertByteArray](bytevector.md#insertbytearray)
- [insertByteVector](bytevector.md#insertbytevector)
- [mid](bytevector.md#mid)
- [rFind](bytevector.md#rfind)
- [removeAtIndex](bytevector.md#removeatindex)
- [removeRange](bytevector.md#removerange)
- [resize](bytevector.md#resize)
- [set](bytevector.md#set)
- [split](bytevector.md#split)
- [startsWith](bytevector.md#startswith)
- [toDouble](bytevector.md#todouble)
- [toFloat](bytevector.md#tofloat)
- [toInt](bytevector.md#toint)
- [toLong](bytevector.md#tolong)
- [toShort](bytevector.md#toshort)
- [toString](bytevector.md#tostring)
- [toStrings](bytevector.md#tostrings)
- [toUInt](bytevector.md#touint)
- [toULong](bytevector.md#toulong)
- [toUShort](bytevector.md#toushort)
- [add](bytevector.md#add)
- [concatenate](bytevector.md#concatenate)
- [empty](bytevector.md#empty)
- [equal](bytevector.md#equal)
- [fromByteArray](bytevector.md#frombytearray)
- [fromByteVector](bytevector.md#frombytevector)
- [fromFileAbstraction](bytevector.md#fromfileabstraction)
- [fromInt](bytevector.md#fromint)
- [fromInternalStream](bytevector.md#frominternalstream)
- [fromLong](bytevector.md#fromlong)
- [fromPath](bytevector.md#frompath)
- [fromShort](bytevector.md#fromshort)
- [fromSize](bytevector.md#fromsize)
- [fromStream](bytevector.md#fromstream)
- [fromString](bytevector.md#fromstring)
- [fromUInt](bytevector.md#fromuint)
- [fromULong](bytevector.md#fromulong)
- [fromUShort](bytevector.md#fromushort)
- [getTextDelimiter](bytevector.md#gettextdelimiter)
- [greaterThan](bytevector.md#greaterthan)
- [greaterThanEqual](bytevector.md#greaterthanequal)
- [lessThan](bytevector.md#lessthan)
- [lessThanEqual](bytevector.md#lessthanequal)
- [notEqual](bytevector.md#notequal)

## Accessors

### checksum

• `get` **checksum**(): `number`

#### Returns

`number`

___

### data

• `get` **data**(): `Uint8Array`

Array of bytes currently stored in the current instance

#### Returns

`Uint8Array`

___

### hashCode

• `get` **hashCode**(): `number`

#### Returns

`number`

___

### isEmpty

• `get` **isEmpty**(): `boolean`

Whether or not the current instance has 0 bytes stored

#### Returns

`boolean`

___

### isReadOnly

• `get` **isReadOnly**(): `boolean`

Whether or not the current instance is readonly.

#### Returns

`boolean`

___

### length

• `get` **length**(): `number`

Number of bytes currently in this ByteVector

#### Returns

`number`

___

### lastUtf16Encoding

• `Static` `get` **lastUtf16Encoding**(): `string`

#### Returns

`string`

• `Static` `set` **lastUtf16Encoding**(`encoding`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | `string` |

#### Returns

`void`

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`<`number`, `any`, `undefined`\>

#### Returns

`Iterator`<`number`, `any`, `undefined`\>

___

### addByte

▸ **addByte**(`byte`): `void`

Adds a single byte to the end of the [ByteVector](bytevector.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `byte` | `number` | Value to add to the end of the ByteVector. Must be positive 8-bit integer. |

#### Returns

`void`

___

### addByteArray

▸ **addByteArray**(`data`): `void`

Adds an array of bytes to the end of the [ByteVector](bytevector.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | Array of bytes to add to the end of the ByteVector |

#### Returns

`void`

___

### addByteVector

▸ **addByteVector**(`data`): `void`

Adds a [ByteVector](bytevector.md) to the end of this ByteVector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | ByteVector to add to the end of this ByteVector |

#### Returns

`void`

___

### clear

▸ **clear**(): `void`

Removes all elements from this [ByteVector](bytevector.md)

**`remarks`** NOTE: This method replaces the internal byte array with a new one. Any
             existing references to [ByteVector.data](bytevector.md#data) will remain unchanged.

#### Returns

`void`

___

### compareTo

▸ **compareTo**(`other`): `number`

Compares this byte vector to a different byte vector. Returns a numeric value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`ByteVector`](bytevector.md) | ByteVector to compare to this byte vector |

#### Returns

`number`

___

### containsAt

▸ **containsAt**(`pattern`, `offset?`, `patternOffset?`, `patternLength?`): `boolean`

Determines if `pattern` exists at a certain `offset` in this byte vector.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pattern` | [`ByteVector`](bytevector.md) | `undefined` | ByteVector to search for at in this byte vector |
| `offset` | `number` | `0` | Position in this byte vector to search for the pattern. If omitted, defaults     to `0` |
| `patternOffset` | `number` | `0` | Position in `pattern` to begin matching. If omitted, defaults     to `0` |
| `patternLength` | `number` | `undefined` | Bytes of `pattern` to match. If omitted, defaults to all bytes     in the pattern minus the offset |

#### Returns

`boolean`

___

### endsWith

▸ **endsWith**(`pattern`): `boolean`

Determines whether or not this byte vector ends with the provided `pattern`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`ByteVector`](bytevector.md) | ByteVector to look for at the end of this byte vector |

#### Returns

`boolean`

___

### endsWithPartialMatch

▸ **endsWithPartialMatch**(`pattern`): `number`

Determines whether or not this byte vector ends with a part of the `pattern`.
NOTE: if this byte vector ends with `pattern` perfectly, it must end with n-1 or
less bytes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`ByteVector`](bytevector.md) | ByteVector to look for at the end of this byte vector |

#### Returns

`number`

___

### find

▸ **find**(`pattern`, `offset?`, `byteAlign?`): `number`

Searches this instance for the `pattern`. Returns the index of the first instance
of the pattern, or `-1` if it was not found. Providing a `byteAlign` requires the
pattern to appear at an index that is a multiple of the byteAlign parameter.
Example: searching "abcd" for "ab" with byteAlign 1 will return 0. Searching "abcd" for
"ab" with byteAlign 2 will return 1. Searching "00ab" for "ab" with byteAlign 2 will return
2. Searching "0abc" with byteAlign 2 will return -1.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pattern` | [`ByteVector`](bytevector.md) | `undefined` | Pattern of bytes to search this instance for |
| `offset` | `number` | `0` | Optional, offset into this instance to start searching |
| `byteAlign` | `number` | `1` | Optional, byte alignment the pattern much align to |

#### Returns

`number`

___

### get

▸ **get**(`index`): `number`

Gets the byte at the given `index`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index into the byte vector to return |

#### Returns

`number`

___

### indexOf

▸ **indexOf**(`item`): `number`

Gets the index of the first occurrence of the specified value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `number` | A byte to find within the current instance. |

#### Returns

`number`

An integer containing the first index at which the value was found, or -1 if it
         was not found/

___

### insertByte

▸ **insertByte**(`index`, `byte`): `void`

Inserts a single byte at the given index of this [ByteVector](bytevector.md), increasing the length of
the ByteVector by one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index into this ByteVector at which the value will be inserted. |
| `byte` | `number` | Value to insert into the ByteVector. Must be a positive integer <=0xFF |

#### Returns

`void`

___

### insertByteArray

▸ **insertByteArray**(`index`, `other`): `void`

Inserts an array of bytes into this [ByteVector](bytevector.md) at the given index, increasing the
length of this ByteVector by the length of the byte array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index into this ByteVector at which the bytes will be inserted. |
| `other` | `Uint8Array` | Array of bytes to insert into the ByteVector. |

#### Returns

`void`

___

### insertByteVector

▸ **insertByteVector**(`index`, `other`): `void`

Inserts another ByteVector into this [ByteVector](bytevector.md) at the given index, increasing the
length of this ByteVector by the length of the ByteVector.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index into this ByteVector at which the ByteVector will be inserted. |
| `other` | [`ByteVector`](bytevector.md) | ByteVector to insert into this ByteVector. |

#### Returns

`void`

___

### mid

▸ **mid**(`startIndex`, `length?`): [`ByteVector`](bytevector.md)

Returns a subarray of the current instance. This operation returns a new instance and does
not alter the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startIndex` | `number` | Index into the array to begin |
| `length` | `number` | Number of elements from the array to include. If omitted, defaults to the     remainder of the array |

#### Returns

[`ByteVector`](bytevector.md)

___

### rFind

▸ **rFind**(`pattern`, `offset?`, `byteAlign?`): `number`

Finds a byte vector by searching from the end of this instance and working towards the
beginning of this instance. Returns the index of the first instance of the pattern, or `-1`
if it was not found. Providing a `byteAlign` requires the pattern to appear at an
index that is a multiple of the byteAlign parameter.
Example: searching "abcd" for "ab" with byteAlign 1 will return 0. Searching "abcd" for
"ab" with byteAlign 2 will return 1. Searching "00ab" for "ab" with byteAlign 2 will return
2. Searching "0abc" with byteAlign 2 will return -1.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pattern` | [`ByteVector`](bytevector.md) | `undefined` | Pattern of bytes to search this instance for |
| `offset` | `number` | `0` | Optional, offset into this instance to start searching |
| `byteAlign` | `number` | `1` | Optional, byte alignment the pattern much align to |

#### Returns

`number`

___

### removeAtIndex

▸ **removeAtIndex**(`index`): `void`

Removes a single byte from this {@ByteVector}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index that will be removed from the ByteVector |

#### Returns

`void`

___

### removeRange

▸ **removeRange**(`index`, `count`): `void`

Removes a range of bytes from this {@ByteVector}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index into this ByteVector where the range to remove begins |
| `count` | `number` | Number of bytes to remove from this ByteVector |

#### Returns

`void`

___

### resize

▸ **resize**(`size`, `padding?`): [`ByteVector`](bytevector.md)

Resizes this instance to the length specified in `size`. If the desired size is
longer than the current length, it will be filled with the byte value in
`padding`. If the desired size is shorter than the current length, bytes will be
removed.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `size` | `number` | `undefined` | Length of the byte vector after resizing. Must be unsigned 32-bit integer |
| `padding` | `number` | `0x0` | Byte to fill any excess space created after resizing |

#### Returns

[`ByteVector`](bytevector.md)

___

### set

▸ **set**(`index`, `value`): `void`

Sets the value at a specified index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index to set the value of |
| `value` | `number` | Value to set at the index. Must be a valid integer betweenInclusive 0x0 and 0xff |

#### Returns

`void`

___

### split

▸ **split**(`separator`, `byteAlign?`, `max?`): [`ByteVector`](bytevector.md)[]

Splits this byte vector into a list of byte vectors using a separator

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `separator` | [`ByteVector`](bytevector.md) | `undefined` | Object to use to split this byte vector |
| `byteAlign` | `number` | `1` | Byte align to use when splitting. in order to split when a pattern is     encountered, the index at which it is found must be divisible by this value. |
| `max` | `number` | `0` | Maximum number of objects to return or 0 to not limit the number. If that number     is reached, the last value will contain the remainder of the file even if it contains     more instances of `separator`. |

#### Returns

[`ByteVector`](bytevector.md)[]

ByteVector[] The split contents of the current instance

___

### startsWith

▸ **startsWith**(`pattern`): `boolean`

Checks whether or not a pattern appears at the beginning of the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`ByteVector`](bytevector.md) | ByteVector containing the pattern to check for in the current instance. |

#### Returns

`boolean`

`true` if the pattern was found at the beginning of the current instance, `false`
    otherwise.

___

### toDouble

▸ **toDouble**(`mostSignificantByteFirst?`): `number`

Converts the first eight bytes of the current instance to a double-precision floating-point
value.

**`throws`** Error If there are less than eight bytes in the current instance.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big        endian format). |

#### Returns

`number`

A double value containing the value read from the current instance.

___

### toFloat

▸ **toFloat**(`mostSignificantByteFirst?`): `number`

Converts the first four bytes of the current instance to a single-precision floating-point
value.

**`throws`** Error If there are less than four bytes in the current instance

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big        endian format). |

#### Returns

`number`

A float value containing the value read from the current instance.

___

### toInt

▸ **toInt**(`mostSignificantByteFirst?`): `number`

Converts the first four bytes of the current instance to a signed integer. If the current
instance is less than four bytes, the most significant bytes will be filled with 0x00.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big        endian format) |

#### Returns

`number`

A signed integer value containing the value read from the current instance

___

### toLong

▸ **toLong**(`mostSignificantByteFirst?`): `bigint`

Converts the first eight bytes of the current instance to a signed long. If the current
instance is less than eight bytes, the most significant bytes will be filled with 0x00.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big        endian format) |

#### Returns

`bigint`

A signed long value containing the value read from the current instance,
         represented as a BigInt due to JavaScript's 52-bit integer limitation.

___

### toShort

▸ **toShort**(`mostSignificantByteFirst?`): `number`

Converts the first two bytes of the current instance to a signed short. If the current
instance is less than two bytes, the most significant bytes will be filled with 0x00.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big        endian format) |

#### Returns

`number`

A signed short value containing the value read from the current instance

___

### toString

▸ **toString**(`count?`, `type?`, `offset?`): `string`

Converts a portion of the current instance to a string using a specified encoding

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `count` | `number` | `undefined` | Integer value specifying the number of *bytes* to convert. |
| `type` | [`StringType`](../enums/stringtype.md) | `undefined` | Value indicating the encoding to use when converting to a string. |
| `offset` | `number` | `0` | Value specifying the index into the current instance at which to start        converting. |

#### Returns

`string`

string String containing the converted bytes

___

### toStrings

▸ **toStrings**(`type`, `offset`, `count?`): `string`[]

Converts the current instance into an array of strings starting at the specified offset and
using the specified encoding, assuming the values are `null` separated and limiting it to a
specified number of items.

**`remarks`** I'm not actually sure if this works as defined, but it behaves the same as the
      original .NET implementation, so that's good enough for now.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`StringType`](../enums/stringtype.md) | A [StringType](../enums/stringtype.md) value indicating the encoding to use when converting |
| `offset` | `number` | Value specifying the index into the current instance at which to start        converting. |
| `count` | `number` | Value specifying a limit to the number of strings to create. Once the limit has        been reached, the last string will be filled by the remainder of the data |

#### Returns

`string`[]

string[] Array of strings containing the converted text.

___

### toUInt

▸ **toUInt**(`mostSignificantByteFirst?`): `number`

Converts the first four bytes of the current instance to an unsigned integer. If the current
instance is less than four bytes, the most significant bytes will be filled with 0x00.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big        endian format) |

#### Returns

`number`

An unsigned integer value containing the value read from the current instance

___

### toULong

▸ **toULong**(`mostSignificantByteFirst?`): `bigint`

Converts the first eight bytes of the current instance to an unsigned long. If the current
instance is less than eight bytes, the most significant bytes will be filled with 0x00.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big        endian format) |

#### Returns

`bigint`

An unsigned short value containing the value read from the current instance,
         represented as a BigInt due to JavaScript's 32-bit integer limitation

___

### toUShort

▸ **toUShort**(`mostSignificantByteFirst?`): `number`

Converts the first two bytes of the current instance to an unsigned short. If the current
instance is less than two bytes, the most significant bytes will be filled with 0x00.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big        endian format) |

#### Returns

`number`

An unsigned short value containing the value read from the current instance

___

### add

▸ `Static` **add**(`first`, `second`): [`ByteVector`](bytevector.md)

Creates a new [ByteVector](bytevector.md) that contains the contents of `first` concatenated
with `second`. This operation can be thought of as `first + second`. Note: Regardless
of the value of [ByteVector.isReadOnly](bytevector.md#isreadonly), the created ByteVector will always be
read/write.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `first` | [`ByteVector`](bytevector.md) | ByteVector to which `second` will be added |
| `second` | [`ByteVector`](bytevector.md) | ByteVector which will be added to `first` |

#### Returns

[`ByteVector`](bytevector.md)

___

### concatenate

▸ `Static` **concatenate**(...`vectors`): [`ByteVector`](bytevector.md)

Creates a [ByteVector](bytevector.md) from a collection of bytes, byte arrays, and byte vectors. This
method is better to use when a known quantity of byte vectors will be concatenated together,
since doing multiple calls to [ByteVector.addByteVector](bytevector.md#addbytevector) results in the entire byte
vector being copied for each call.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...vectors` | (`number` \| [`ByteVector`](bytevector.md) \| `Uint8Array`)[] | ByteVectors, byte arrays, or straight bytes to concatenate together into a     new [ByteVector](bytevector.md) |

#### Returns

[`ByteVector`](bytevector.md)

ByteVector Single byte vector with the contents of the byte vectors in
    `vectors` concatenated together

___

### empty

▸ `Static` **empty**(): [`ByteVector`](bytevector.md)

Creates an empty [ByteVector](bytevector.md)

#### Returns

[`ByteVector`](bytevector.md)

___

### equal

▸ `Static` **equal**(`first`, `second`): `boolean`

Returns `true` if the contents of the two [ByteVector](bytevector.md)s are identical, returns `false`
otherwise

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `first` | [`ByteVector`](bytevector.md) | ByteVector to compare with `second` |
| `second` | [`ByteVector`](bytevector.md) | ByteVector to compare with `first` |

#### Returns

`boolean`

___

### fromByteArray

▸ `Static` **fromByteArray**(`data`, `length?`, `isReadOnly?`): [`ByteVector`](bytevector.md)

Creates a [ByteVector](bytevector.md) from a Uint8Array

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | `Uint8Array` | `undefined` | Uint8Array of the bytes to put in the ByteVector |
| `length` | `number` | `undefined` | Number of bytes to read |
| `isReadOnly` | `boolean` | `false` | If `true` then the ByteVector will be read only |

#### Returns

[`ByteVector`](bytevector.md)

___

### fromByteVector

▸ `Static` **fromByteVector**(`original`, `isReadOnly?`): [`ByteVector`](bytevector.md)

Creates a [ByteVector](bytevector.md) as a copy of another ByteVector.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `original` | [`ByteVector`](bytevector.md) | `undefined` | Data from this ByteVector will be copied into the new one |
| `isReadOnly` | `boolean` | `false` | If `true` then the ByteVector will be read only |

#### Returns

[`ByteVector`](bytevector.md)

___

### fromFileAbstraction

▸ `Static` **fromFileAbstraction**(`abstraction`, `isReadOnly?`): [`ByteVector`](bytevector.md)

Creates a new instance by reading in the contents of a specified file abstraction.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `abstraction` | `IFileAbstraction` | `undefined` | File abstraction to read |
| `isReadOnly` | `boolean` | `false` | Whether or not the resulting ByteVector is readonly |

#### Returns

[`ByteVector`](bytevector.md)

___

### fromInt

▸ `Static` **fromInt**(`value`, `mostSignificantByteFirst?`, `isReadOnly?`): [`ByteVector`](bytevector.md)

Creates a 4 byte [ByteVector](bytevector.md) with a signed 32-bit integer as the data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` | `undefined` | Signed 32-bit integer to use as the data. Must be a safe integer, storable in 4        bytes, cannot be a floating point number. |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true`, `value` will be stored in big endian        format. If `false`, `value` will be stored in little endian format |
| `isReadOnly` | `boolean` | `false` | If `true` then the ByteVector will be read only |

#### Returns

[`ByteVector`](bytevector.md)

___

### fromInternalStream

▸ `Static` **fromInternalStream**(`stream`, `isReadOnly?`): [`ByteVector`](bytevector.md)

Creates a ByteVector using the contents of an TagLibSharp-node stream as the contents. This
method reads from the current offset of the stream, not the beginning of the stream

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `stream` | `IStream` | `undefined` | TagLibSharp-node internal stream object |
| `isReadOnly` | `boolean` | `false` | Whether or not the byte vector is readonly |

#### Returns

[`ByteVector`](bytevector.md)

___

### fromLong

▸ `Static` **fromLong**(`value`, `mostSignificantByteFirst?`, `isReadOnly?`): [`ByteVector`](bytevector.md)

Creates an 8 byte [ByteVector](bytevector.md) with a signed 64-bit integer as the data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` \| `bigint` | `undefined` | Signed 64-bit integer to use as the data. If using a `bigint`, it must fit     within 8 bytes. If using a `number`, it must be a safe integer. |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true`, `value` will be stored in big endian     format. If `false`, `value` will be stored in little endian format |
| `isReadOnly` | `boolean` | `false` | If `true` then the ByteVector will be read only |

#### Returns

[`ByteVector`](bytevector.md)

___

### fromPath

▸ `Static` **fromPath**(`path`, `isReadOnly?`): [`ByteVector`](bytevector.md)

Creates a [ByteVector](bytevector.md) using the contents of a file as the data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string` | `undefined` | Path to the file to store in the ByteVector |
| `isReadOnly` | `boolean` | `false` | If `true` then the ByteVector will be read only |

#### Returns

[`ByteVector`](bytevector.md)

___

### fromShort

▸ `Static` **fromShort**(`value`, `mostSignificantByteFirst?`, `isReadOnly?`): [`ByteVector`](bytevector.md)

Creates a 2 byte [ByteVector](bytevector.md) with a signed 16-bit integer as the data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` | `undefined` | Signed 16-bit integer to use as the data. Must be a safe integer, storable in 2        bytes, cannot be a floating point number. |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true`, `value` will be stored in big endian        format. If `false`, `value` will be stored in little endian format |
| `isReadOnly` | `boolean` | `false` | If `true` then the ByteVector will be read only |

#### Returns

[`ByteVector`](bytevector.md)

___

### fromSize

▸ `Static` **fromSize**(`size`, `fill?`, `isReadOnly?`): [`ByteVector`](bytevector.md)

Creates a [ByteVector](bytevector.md) of a given length with a given value for all the elements

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `size` | `number` | `undefined` | Length of the ByteVector. Must be a positive safe integer, cannot be a float |
| `fill` | `number` | `0x0` | Byte value to initialize all elements to. Must be a positive 8-bit integer,        cannot be floating point |
| `isReadOnly` | `boolean` | `false` | If `true` then the ByteVector will be read only |

#### Returns

[`ByteVector`](bytevector.md)

___

### fromStream

▸ `Static` **fromStream**(`readStream`, `isReadOnly?`): `Promise`<[`ByteVector`](bytevector.md)\>

Creates [ByteVector](bytevector.md) with the contents of a stream as the data. The stream will be read
to the end before the ByteVector is returned.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `readStream` | `ReadableStream` | `undefined` | Readable stream that will be read in entirety. |
| `isReadOnly` | `boolean` | `false` | If `true` then the ByteVector will be read only |

#### Returns

`Promise`<[`ByteVector`](bytevector.md)\>

___

### fromString

▸ `Static` **fromString**(`text`, `type?`, `length?`, `isReadOnly?`): [`ByteVector`](bytevector.md)

Creates [ByteVector](bytevector.md) with the byte representation of a string as the data.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `text` | `string` | `undefined` | String to store in the ByteVector |
| `type` | [`StringType`](../enums/stringtype.md) | `undefined` | StringType to use to encode the string. If [StringType.UTF16](../enums/stringtype.md#utf16) is used, the        string will be encoded as UTF16-LE. |
| `length` | `number` | `undefined` | Number of characters from the string to store in the ByteVector. Must be a        positive 32-bit integer. |
| `isReadOnly` | `boolean` | `false` | If `true` then the ByteVector will be read only |

#### Returns

[`ByteVector`](bytevector.md)

___

### fromUInt

▸ `Static` **fromUInt**(`value`, `mostSignificantByteFirst?`, `isReadOnly?`): [`ByteVector`](bytevector.md)

Creates a 4 byte [ByteVector](bytevector.md) with a positive 32-bit integer as the data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` | `undefined` | Positive 32-bit integer to use as the data. Must be a positive safe integer,        storable in 4 bytes, cannot be a floating point number. |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true`, `value` will be stored in big endian        format. If `false`, `value` will be stored in little endian format |
| `isReadOnly` | `boolean` | `false` | If `true` then the ByteVector will be read only |

#### Returns

[`ByteVector`](bytevector.md)

___

### fromULong

▸ `Static` **fromULong**(`value`, `mostSignificantByteFirst?`, `isReadOnly?`): [`ByteVector`](bytevector.md)

Creates an 8 byte [ByteVector](bytevector.md) with a positive 64-bit integer as the data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` \| `bigint` | `undefined` | Positive 64-bit integer to use as the data. If using a `bigint` it must fit     within 8 bytes. If using a `number` it must be a safe, positive integer. |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true`, `value` will be stored in big endian        format. If `false`, `value` will be stored in little endian format |
| `isReadOnly` | `boolean` | `false` | If `true` then the ByteVector will be read only |

#### Returns

[`ByteVector`](bytevector.md)

___

### fromUShort

▸ `Static` **fromUShort**(`value`, `mostSignificantByteFirst?`, `isReadOnly?`): [`ByteVector`](bytevector.md)

Creates a 2 byte [ByteVector](bytevector.md) with a positive 32-bit integer as the data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` | `undefined` | Positive 16-bit integer to use as the data. Must be a positive safe integer,        storable in 2 bytes, cannot be a floating point number. |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true`, `value` will be stored in big endian        format. If `false`, `value` will be stored in little endian format |
| `isReadOnly` | `boolean` | `false` | If `true` then the ByteVector will be read only |

#### Returns

[`ByteVector`](bytevector.md)

___

### getTextDelimiter

▸ `Static` **getTextDelimiter**(`type`): [`ByteVector`](bytevector.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`StringType`](../enums/stringtype.md) |

#### Returns

[`ByteVector`](bytevector.md)

___

### greaterThan

▸ `Static` **greaterThan**(`first`, `second`): `boolean`

Returns `true` if `first` is greater than `second`. This is true if
`first` is longer than `second` or if the first element in `first`
that is different than the element at the same position in `second` is greater than.
Returns `false` if the two [ByteVector](bytevector.md)s are identical.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `first` | [`ByteVector`](bytevector.md) | ByteVector to compare with `second` |
| `second` | [`ByteVector`](bytevector.md) | ByteVector to compare with `first` |

#### Returns

`boolean`

___

### greaterThanEqual

▸ `Static` **greaterThanEqual**(`first`, `second`): `boolean`

Returns `true` if `first` is greater than `second`. This is true if
`first` is longer than `second` or if the first element in `first`
that is different than the element at the same position in `second` is greater than.
Returns `true` if the two [ByteVector](bytevector.md)s are identical.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `first` | [`ByteVector`](bytevector.md) | ByteVector to compare with `second` |
| `second` | [`ByteVector`](bytevector.md) | ByteVector to compare with `first` |

#### Returns

`boolean`

___

### lessThan

▸ `Static` **lessThan**(`first`, `second`): `boolean`

Returns `true` if `first` is less than `second`. This is true if
`first` is shorter than `second` or if the first element in `first`
that is different than the element at the same position in `second` is less than.
Returns `false` if the two [ByteVector](bytevector.md)s are identical.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `first` | [`ByteVector`](bytevector.md) | ByteVector to compare with `second` |
| `second` | [`ByteVector`](bytevector.md) | ByteVector to compare with `first` |

#### Returns

`boolean`

___

### lessThanEqual

▸ `Static` **lessThanEqual**(`first`, `second`): `boolean`

Returns `true` if `first` is less than `second`. This is true if
`first` is shorter than `second` or if the first element in `first`
that is different than the element at the same position in `second` is less than.
Returns `true` if the two [ByteVector](bytevector.md)s are identical.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `first` | [`ByteVector`](bytevector.md) | ByteVector to compare with `second` |
| `second` | [`ByteVector`](bytevector.md) | ByteVector to compare with `first` |

#### Returns

`boolean`

___

### notEqual

▸ `Static` **notEqual**(`first`, `second`): `boolean`

Returns `false` if the contents of the two [ByteVector](bytevector.md)s are identical, returns `true`
otherwise

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `first` | [`ByteVector`](bytevector.md) | ByteVector to compare with `second` |
| `second` | [`ByteVector`](bytevector.md) | ByteVector to compare with `first` |

#### Returns

`boolean`
