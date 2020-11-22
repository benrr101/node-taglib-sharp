**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/id3v2ExtendedHeader"](../modules/_src_id3v2_id3v2extendedheader_.md) / Id3v2ExtendedHeader

# Class: Id3v2ExtendedHeader

## Hierarchy

* **Id3v2ExtendedHeader**

## Index

### Accessors

* [size](_src_id3v2_id3v2extendedheader_.id3v2extendedheader.md#size)

### Methods

* [parse](_src_id3v2_id3v2extendedheader_.id3v2extendedheader.md#parse)
* [fromData](_src_id3v2_id3v2extendedheader_.id3v2extendedheader.md#fromdata)
* [fromEmpty](_src_id3v2_id3v2extendedheader_.id3v2extendedheader.md#fromempty)

## Accessors

### size

• get **size**(): number

Gets the size of the data on disk in bytes.

**Returns:** number

## Methods

### parse

▸ `Protected`**parse**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): void

#### Parameters:

Name | Type |
------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) |
`version` | number |

**Returns:** void

___

### fromData

▸ `Static`**fromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): [Id3v2ExtendedHeader](_src_id3v2_id3v2extendedheader_.id3v2extendedheader.md)

Constructs and initializes a new instance by reading the raw contents.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw extended header structure |
`version` | number | ID3v2 version. Must be an unsigned 8-bit integer.  |

**Returns:** [Id3v2ExtendedHeader](_src_id3v2_id3v2extendedheader_.id3v2extendedheader.md)

___

### fromEmpty

▸ `Static`**fromEmpty**(): [Id3v2ExtendedHeader](_src_id3v2_id3v2extendedheader_.id3v2extendedheader.md)

Constructs and initializes a new instance with no contents.

**Returns:** [Id3v2ExtendedHeader](_src_id3v2_id3v2extendedheader_.id3v2extendedheader.md)
