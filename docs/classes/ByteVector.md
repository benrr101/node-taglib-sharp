[node-taglib-sharp](../README.md) / [Exports](../modules.md) / ByteVector

# Class: ByteVector

Wrapper around a `Uint8Array` that provides functionality for reading and writing byte arrays.

**`Remarks`**

Implementation of this class uses a single `Uint8Array` to store bytes. Due to
    `Uint8Array`s being fixed length, any operation that inserts or removes values into the
    instance will result in a copy of the internal array being made. If multiple additions will
    be made, rather than using multiple inserts/adds, the [concatenate](ByteVector.md#concatenate) method
    is provided to group additions/inserts and therefore improve performance.

    The original .NET implementation had a ubiquitous `mid` method that would return a subset
    of the bytes in the current instance. In versions <5 of the node port, `mid` would make a
    copy of the subset of the bytes. Since this was frequently done right before reading a
    number or string, this copy was extremely wasteful. In version 5, the `mid` method was
    replaced with `subarray` which behaves identically to `Uint8Array.subarray` and returns
    an instance that is a 'view' of an existing instance - no copying involved. However, all
    write operations make copies, instances that are backed by 'views' may waste memory by
    referencing a `Uint8Array` that is much larger than the view.

    With this in mind, best practices for using `ByteVectors`:
    * Calling [subarray](ByteVector.md#subarray) is cheap, use it when possible
    * If storing a subset of a `ByteVector`, store a copy with [toByteVector](ByteVector.md#tobytevector)
    * If building a `ByteVector`, use [concatenate](ByteVector.md#concatenate) when possible
    * If the instance should be immutable, use [makeReadOnly](ByteVector.md#makereadonly)

## Table of contents

### Accessors

- [checksum](ByteVector.md#checksum)
- [isEmpty](ByteVector.md#isempty)
- [isReadOnly](ByteVector.md#isreadonly)
- [isView](ByteVector.md#isview)
- [length](ByteVector.md#length)

### Methods

- [[iterator]](ByteVector.md#[iterator])
- [addByte](ByteVector.md#addbyte)
- [addByteArray](ByteVector.md#addbytearray)
- [addByteVector](ByteVector.md#addbytevector)
- [clear](ByteVector.md#clear)
- [compareTo](ByteVector.md#compareto)
- [containsAt](ByteVector.md#containsat)
- [endsWith](ByteVector.md#endswith)
- [endsWithPartialMatch](ByteVector.md#endswithpartialmatch)
- [equals](ByteVector.md#equals)
- [find](ByteVector.md#find)
- [get](ByteVector.md#get)
- [indexOf](ByteVector.md#indexof)
- [makeReadOnly](ByteVector.md#makereadonly)
- [offsetFind](ByteVector.md#offsetfind)
- [rFind](ByteVector.md#rfind)
- [resize](ByteVector.md#resize)
- [set](ByteVector.md#set)
- [splice](ByteVector.md#splice)
- [split](ByteVector.md#split)
- [startsWith](ByteVector.md#startswith)
- [subarray](ByteVector.md#subarray)
- [toBase64String](ByteVector.md#tobase64string)
- [toByteVector](ByteVector.md#tobytevector)
- [toDouble](ByteVector.md#todouble)
- [toFloat](ByteVector.md#tofloat)
- [toInt](ByteVector.md#toint)
- [toLong](ByteVector.md#tolong)
- [toShort](ByteVector.md#toshort)
- [toString](ByteVector.md#tostring)
- [toStrings](ByteVector.md#tostrings)
- [toUint](ByteVector.md#touint)
- [toUlong](ByteVector.md#toulong)
- [toUshort](ByteVector.md#toushort)
- [compare](ByteVector.md#compare)
- [concatenate](ByteVector.md#concatenate)
- [empty](ByteVector.md#empty)
- [equals](ByteVector.md#equals-1)
- [fromBase64String](ByteVector.md#frombase64string)
- [fromByte](ByteVector.md#frombyte)
- [fromByteArray](ByteVector.md#frombytearray)
- [fromFileAbstraction](ByteVector.md#fromfileabstraction)
- [fromInt](ByteVector.md#fromint)
- [fromInternalStream](ByteVector.md#frominternalstream)
- [fromLong](ByteVector.md#fromlong)
- [fromPath](ByteVector.md#frompath)
- [fromShort](ByteVector.md#fromshort)
- [fromSize](ByteVector.md#fromsize)
- [fromStream](ByteVector.md#fromstream)
- [fromString](ByteVector.md#fromstring)
- [fromUint](ByteVector.md#fromuint)
- [fromUlong](ByteVector.md#fromulong)
- [fromUshort](ByteVector.md#fromushort)
- [getTextDelimiter](ByteVector.md#gettextdelimiter)

## Accessors

### checksum

• `get` **checksum**(): `number`

Calculates the CRC32 of the current instance.

#### Returns

`number`

___

### isEmpty

• `get` **isEmpty**(): `boolean`

Whether the current instance has 0 bytes stored.

#### Returns

`boolean`

___

### isReadOnly

• `get` **isReadOnly**(): `boolean`

Whether the current instance is read-only. If `true`, any call that will modify the instance
will throw.

#### Returns

`boolean`

___

### isView

• `get` **isView**(): `boolean`

Whether the current instance is a 'view' of another byte vector.

#### Returns

`boolean`

___

### length

• `get` **length**(): `number`

Number of bytes currently in this instance.

#### Returns

`number`

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`<`number`, `any`, `undefined`\>

Gets iterator for iterating over bytes in the current instance.

#### Returns

`Iterator`<`number`, `any`, `undefined`\>

___

### addByte

▸ **addByte**(`byte`): `void`

Adds a single byte to the end of the current instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `byte` | `number` | Value to add to the end of the ByteVector. Must be positive 8-bit integer. |

#### Returns

`void`

___

### addByteArray

▸ **addByteArray**(`data`, `length?`): `void`

Adds an array of bytes to the end of the current instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | Array of bytes to add to the end of the ByteVector |
| `length?` | `number` | Number of elements from `data` to copy into the current instance |

#### Returns

`void`

___

### addByteVector

▸ **addByteVector**(`data`): `void`

Adds a [ByteVector](ByteVector.md) to the end of this ByteVector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | ByteVector to add to the end of this ByteVector |

#### Returns

`void`

___

### clear

▸ **clear**(): `void`

Removes all elements from this [ByteVector](ByteVector.md)

**`Remarks`**

This method replaces the internal byte array with a new one.

#### Returns

`void`

___

### compareTo

▸ **compareTo**(`other`): `number`

Compares the current instance to another byte vector. Returns a numeric result.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`ByteVector`](ByteVector.md) | Other byte vector to compare against the current instance. |

#### Returns

`number`

___

### containsAt

▸ **containsAt**(`pattern`, `offset?`): `boolean`

Determines if `pattern` exists at a certain `offset` in this byte vector.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pattern` | [`ByteVector`](ByteVector.md) | `undefined` | ByteVector to search for at in this byte vector |
| `offset` | `number` | `0` | Position in this byte vector to search for the pattern. If omitted, defaults to `0` |

#### Returns

`boolean`

___

### endsWith

▸ **endsWith**(`pattern`): `boolean`

Determines whether this byte vector ends with the provided `pattern`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`ByteVector`](ByteVector.md) | ByteVector to look for at the end of this byte vector |

#### Returns

`boolean`

___

### endsWithPartialMatch

▸ **endsWithPartialMatch**(`pattern`): `number`

Determines whether this byte vector ends with a part of the `pattern`.
NOTE: if this instance ends with `pattern` perfectly, it must end with n-1 or
fewer bytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`ByteVector`](ByteVector.md) | ByteVector to look for at the end of this byte vector |

#### Returns

`number`

___

### equals

▸ **equals**(`other`): `boolean`

Determines if this instance has identical contents to the `other` instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`ByteVector`](ByteVector.md) | Other instance to compare against the current instance. |

#### Returns

`boolean`

___

### find

▸ **find**(`pattern`, `byteAlign?`): `number`

Searches this instance for the `pattern`. Returns the index of the first instance
of the pattern, or `-1` if it was not found. Providing a `byteAlign` requires the
pattern to appear at an index that is a multiple of the byteAlign parameter.
Example: searching "abcd" for "ab" with byteAlign 1 will return 0. Searching "abcd" for
"ab" with byteAlign 2 will return 1. Searching "00ab" for "ab" with byteAlign 2 will return
2. Searching "0abc" with byteAlign 2 will return -1.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pattern` | [`ByteVector`](ByteVector.md) | `undefined` | Pattern of bytes to search this instance for |
| `byteAlign` | `number` | `1` | Optional, byte alignment the pattern much align to |

#### Returns

`number`

___

### get

▸ **get**(`index`): `number`

Gets the byte at the given `index`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Element index to return |

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

An integer containing the first index at which the value was found, or -1 if it was not
    found

___

### makeReadOnly

▸ **makeReadOnly**(): [`ByteVector`](ByteVector.md)

Makes the current instance read-only, causing any call that would modify it or allow it to
be modified to throw.

#### Returns

[`ByteVector`](ByteVector.md)

___

### offsetFind

▸ **offsetFind**(`pattern`, `offset`, `byteAlign?`): `number`

Searches this instance for the `pattern` occurring after a given offset. Returns the index
of the first instance of the pattern, relative to the start of the array, or `-1` if it was
not found. Providing a `byteAlign` requires the pattern to appear at an index that is a
multiple of the byteAlign parameter. Example: searching "abcd" for "ab" with byteAlign 1
will return 0. Searching "abcd" for "ab" with byteAlign 2 will return 1. Searching "00ab"
for "ab" with byteAlign 2 will return 2. Searching "0abc" with byteAlign 2 will return -1.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`ByteVector`](ByteVector.md) | Pattern of bytes to search this instance for |
| `offset` | `number` | Index into the instance to begin searching for `pattern` |
| `byteAlign?` | `number` | Optional, byte alignment the pattern much align to |

#### Returns

`number`

___

### rFind

▸ **rFind**(`pattern`, `byteAlign?`): `number`

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
| `pattern` | [`ByteVector`](ByteVector.md) | `undefined` | Pattern of bytes to search this instance for |
| `byteAlign` | `number` | `1` | Optional, byte alignment the pattern must align to |

#### Returns

`number`

___

### resize

▸ **resize**(`size`, `padding?`): `void`

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

`void`

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

### splice

▸ **splice**(`start`, `deleteCount`, `items?`): `void`

Changes the contents of the current instance by removing or replacing existing elements
and/or adding new elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | Index at which to start changing the array. Must be less than the length of the instance |
| `deleteCount` | `number` | Number of elements in the array to remove from start. If greater than the remaining length of the element, it will be capped at the remaining length |
| `items?` | [`ByteVector`](ByteVector.md) \| `Uint8Array` \| `number`[] | Elements to add to the array beginning from start. If omitted, the method will only remove elements from the current instance. |

#### Returns

`void`

___

### split

▸ **split**(`separator`, `byteAlign?`, `max?`): [`ByteVector`](ByteVector.md)[]

Splits this byte vector into a list of byte vectors using a separator

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `separator` | [`ByteVector`](ByteVector.md) | `undefined` | Object to use to split this byte vector |
| `byteAlign` | `number` | `1` | Byte align to use when splitting. in order to split when a pattern is encountered, the index at which it is found must be divisible by this value. |
| `max` | `number` | `0` | Maximum number of objects to return or 0 to not limit the number. If that number is reached, the last value will contain the remainder of the file even if it contains more instances of `separator`. |

#### Returns

[`ByteVector`](ByteVector.md)[]

ByteVector[] The split contents of the current instance

___

### startsWith

▸ **startsWith**(`pattern`): `boolean`

Checks whether a pattern appears at the beginning of the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`ByteVector`](ByteVector.md) | ByteVector containing the pattern to check for in the current instance. |

#### Returns

`boolean`

`true` if the pattern was found at the beginning of the current instance, `false`
    otherwise.

___

### subarray

▸ **subarray**(`startIndex`, `length?`): [`ByteVector`](ByteVector.md)

Returns a window over the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startIndex` | `number` | Offset into this instance where the comprehension begins |
| `length` | `number` | Number of elements from the instance to include. If omitted, defaults to the remainder of the instance |

#### Returns

[`ByteVector`](ByteVector.md)

___

### toBase64String

▸ **toBase64String**(): `string`

Returns the current instance as a base64 encoded string.

#### Returns

`string`

___

### toByteVector

▸ **toByteVector**(): [`ByteVector`](ByteVector.md)

Returns a writable copy of the bytes represented by this instance.

**`Remarks`**

This is a **copy** of the data. Use sparingly.

#### Returns

[`ByteVector`](ByteVector.md)

___

### toDouble

▸ **toDouble**(`mostSignificantByteFirst?`): `number`

Converts the first eight bytes of the current instance to a double-precision floating-point
value.

**`Throws`**

Error If there are less than eight bytes in the current instance.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big endian format). |

#### Returns

`number`

A double value containing the value read from the current instance.

___

### toFloat

▸ **toFloat**(`mostSignificantByteFirst?`): `number`

Converts the first four bytes of the current instance to a single-precision floating-point
value.

**`Throws`**

Error If there are less than four bytes in the current instance

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big endian format). |

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
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big endian format) |

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
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big endian format) |

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
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big endian format) |

#### Returns

`number`

A signed short value containing the value read from the current instance

___

### toString

▸ **toString**(`type`): `string`

Converts a portion of the current instance to a string using a specified encoding

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`StringType`](../enums/StringType.md) | Value indicating the encoding to use when converting to a string. |

#### Returns

`string`

String containing the converted bytes

___

### toStrings

▸ **toStrings**(`type`, `count?`): `string`[]

Converts the current instance into an array of strings starting at the specified offset and
using the specified encoding, assuming the values are `null` separated and limiting it to a
specified number of items.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `type` | [`StringType`](../enums/StringType.md) | `undefined` | A [StringType](../enums/StringType.md) value indicating the encoding to use when converting |
| `count` | `number` | `Number.MAX_SAFE_INTEGER` | Value specifying a limit to the number of strings to create. Once the limit has been reached, the last string will be filled by the remainder of the data |

#### Returns

`string`[]

Array of strings containing the converted text.

___

### toUint

▸ **toUint**(`mostSignificantByteFirst?`): `number`

Converts the first four bytes of the current instance to an unsigned integer. If the current
instance is less than four bytes, the most significant bytes will be filled with 0x00.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big endian format) |

#### Returns

`number`

An unsigned integer value containing the value read from the current instance

___

### toUlong

▸ **toUlong**(`mostSignificantByteFirst?`): `bigint`

Converts the first eight bytes of the current instance to an unsigned long. If the current
instance is less than eight bytes, the most significant bytes will be filled with 0x00.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big endian format) |

#### Returns

`bigint`

An unsigned short value containing the value read from the current instance,
    represented as a BigInt due to JavaScript's 32-bit integer limitation

___

### toUshort

▸ **toUshort**(`mostSignificantByteFirst?`): `number`

Converts the first two bytes of the current instance to an unsigned short. If the current
instance is less than two bytes, the most significant bytes will be filled with 0x00.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mostSignificantByteFirst` | `boolean` | `true` | If `true` the most significant byte appears first (big endian format) |

#### Returns

`number`

An unsigned short value containing the value read from the current instance

___

### compare

▸ `Static` **compare**(`a`, `b`): `number`

Compares two byte vectors. Returns a numeric value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | [`ByteVector`](ByteVector.md) | Byte vector to compare against `b` |
| `b` | [`ByteVector`](ByteVector.md) | Byte vector to compare against `a` |

#### Returns

`number`

`0` if the two vectors are the same. Any other value indicates the two are
    different. If the two vectors differ by length, this will be the length of `a` minus the
    length of `b`. If the lengths are the same it will be the difference between the first
    element that differs.

___

### concatenate

▸ `Static` **concatenate**(`...vectors`): [`ByteVector`](ByteVector.md)

Creates a [ByteVector](ByteVector.md) from a collection of bytes, byte arrays, and byte vectors. This
method is better to use when a known quantity of byte vectors will be concatenated together,
since doing multiple calls to [addByteVector](ByteVector.md#addbytevector) results in the entire byte
vector being copied for each call.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...vectors` | (`number` \| [`ByteVector`](ByteVector.md) \| `Uint8Array`)[] | ByteVectors, byte arrays, or straight bytes to concatenate together into a new [ByteVector](ByteVector.md) |

#### Returns

[`ByteVector`](ByteVector.md)

Single byte vector with the contents of the byte vectors in `vectors` concatenated
    together

___

### empty

▸ `Static` **empty**(): [`ByteVector`](ByteVector.md)

Creates an empty [ByteVector](ByteVector.md)

#### Returns

[`ByteVector`](ByteVector.md)

___

### equals

▸ `Static` **equals**(`first`, `second`): `boolean`

Returns `true` if the contents of the two [ByteVector](ByteVector.md)s are identical, returns `false`
otherwise

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `first` | [`ByteVector`](ByteVector.md) | ByteVector to compare with `second` |
| `second` | [`ByteVector`](ByteVector.md) | ByteVector to compare with `first` |

#### Returns

`boolean`

___

### fromBase64String

▸ `Static` **fromBase64String**(`str`): [`ByteVector`](ByteVector.md)

Creates a [ByteVector](ByteVector.md) from a base64 string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | Base64 string to convert into a byte vector |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromByte

▸ `Static` **fromByte**(`value`): [`ByteVector`](ByteVector.md)

Creates a 1 byte [ByteVector](ByteVector.md) with an unsigned 8-bit integer as the data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Unsigned 8-bit integer to use as the data. |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromByteArray

▸ `Static` **fromByteArray**(`bytes`, `length?`): [`ByteVector`](ByteVector.md)

Creates a [ByteVector](ByteVector.md) from a `Uint8Array` or `Buffer`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bytes` | `Uint8Array` \| `Buffer` \| `number`[] | `undefined` | Uint8Array of the bytes to put in the ByteVector |
| `length` | `number` | `bytes.length` | Optionally, number of bytes to read. If this is not provided, it will default to the full length of `bytes`. If it is less than the length of `bytes`, `bytes` will be copied into the [ByteVector](ByteVector.md). |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromFileAbstraction

▸ `Static` **fromFileAbstraction**(`abstraction`): [`ByteVector`](ByteVector.md)

Creates a new instance by reading in the contents of a specified file abstraction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `abstraction` | [`IFileAbstraction`](../interfaces/IFileAbstraction.md) | File abstraction to read |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromInt

▸ `Static` **fromInt**(`value`, `isBigEndian?`): [`ByteVector`](ByteVector.md)

Creates a 4 byte [ByteVector](ByteVector.md) with a signed 32-bit integer as the data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` | `undefined` | Signed 32-bit integer to use as the data. |
| `isBigEndian` | `boolean` | `true` | If `true`, `value` will be stored in big endian format. If `false`, `value` will be stored in little endian format |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromInternalStream

▸ `Static` **fromInternalStream**(`stream`): [`ByteVector`](ByteVector.md)

Creates a ByteVector using the contents of an TagLibSharp-node stream as the contents. This
method reads from the current offset of the stream, not the beginning of the stream

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`IStream`](../interfaces/IStream.md) | TagLibSharp-node internal stream object |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromLong

▸ `Static` **fromLong**(`value`, `isBigEndian?`): [`ByteVector`](ByteVector.md)

Creates an 8 byte [ByteVector](ByteVector.md) with a signed 64-bit integer as the data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` \| `bigint` | `undefined` | Signed 64-bit integer to use as the data. If using a `bigint`, it must fit within 8 bytes. If using a `number`, it must be a safe integer. |
| `isBigEndian` | `boolean` | `true` | If `true`, `value` will be stored in big endian format. If `false`, `value` will be stored in little endian format |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromPath

▸ `Static` **fromPath**(`path`): [`ByteVector`](ByteVector.md)

Creates a [ByteVector](ByteVector.md) using the contents of a file as the data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the file to store in the ByteVector |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromShort

▸ `Static` **fromShort**(`value`, `isBigEndian?`): [`ByteVector`](ByteVector.md)

Creates a 2 byte [ByteVector](ByteVector.md) with a signed 16-bit integer as the data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` | `undefined` | Signed 16-bit integer to use as the data. |
| `isBigEndian` | `boolean` | `true` | If `true`, `value` will be stored in big endian format. If `false`, `value` will be stored in little endian format |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromSize

▸ `Static` **fromSize**(`size`, `fill?`): [`ByteVector`](ByteVector.md)

Creates a [ByteVector](ByteVector.md) of a given length with a given value for all the elements

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `size` | `number` | `undefined` | Length of the ByteVector. Must be a positive safe integer |
| `fill` | `number` | `0x0` | Byte value to initialize all elements to. Must be a positive 8-bit integer |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromStream

▸ `Static` **fromStream**(`readStream`): `Promise`<[`ByteVector`](ByteVector.md)\>

Creates [ByteVector](ByteVector.md) with the contents of a stream as the data. The stream will be read
to the end before the ByteVector is returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readStream` | `ReadableStream` | Readable stream that will be read in entirety. |

#### Returns

`Promise`<[`ByteVector`](ByteVector.md)\>

___

### fromString

▸ `Static` **fromString**(`text`, `type`, `length?`): [`ByteVector`](ByteVector.md)

Creates [ByteVector](ByteVector.md) with the byte representation of a string as the data.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `text` | `string` | `undefined` | String to store in the ByteVector |
| `type` | [`StringType`](../enums/StringType.md) | `undefined` | StringType to use to encode the string. If [UTF16](../enums/StringType.md#utf16) is used, the string will be encoded as UTF16-LE. |
| `length` | `number` | `Number.MAX_SAFE_INTEGER` | Number of characters from the string to store in the ByteVector. Must be a positive 32-bit integer. |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromUint

▸ `Static` **fromUint**(`value`, `isBigEndian?`): [`ByteVector`](ByteVector.md)

Creates a 4 byte [ByteVector](ByteVector.md) with a positive 32-bit integer as the data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` | `undefined` | Positive 32-bit integer to use as the data |
| `isBigEndian` | `boolean` | `true` | If `true`, `value` will be stored in big endian format. If `false`, `value` will be stored in little endian format |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromUlong

▸ `Static` **fromUlong**(`value`, `isBigEndian?`): [`ByteVector`](ByteVector.md)

Creates an 8 byte [ByteVector](ByteVector.md) with a positive 64-bit integer as the data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` \| `bigint` | `undefined` | Positive 64-bit integer to use as the data. If using a `bigint` it must fit within 8 bytes. |
| `isBigEndian` | `boolean` | `true` | If `true`, `value` will be stored in big endian format. If `false`, `value` will be stored in little endian format |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromUshort

▸ `Static` **fromUshort**(`value`, `isBigEndian?`): [`ByteVector`](ByteVector.md)

Creates a 2 byte [ByteVector](ByteVector.md) with a positive 16-bit integer as the data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` | `undefined` | Positive 16-bit integer to use as the data. |
| `isBigEndian` | `boolean` | `true` | If `true`, `value` will be stored in big endian format. If `false`, `value` will be stored in little endian format |

#### Returns

[`ByteVector`](ByteVector.md)

___

### getTextDelimiter

▸ `Static` **getTextDelimiter**(`type`): [`ByteVector`](ByteVector.md)

Gets the appropriate length null-byte text delimiter for the specified `type`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`StringType`](../enums/StringType.md) | String type to get delimiter for |

#### Returns

[`ByteVector`](ByteVector.md)
