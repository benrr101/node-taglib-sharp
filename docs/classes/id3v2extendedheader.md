[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2ExtendedHeader

# Class: Id3v2ExtendedHeader

## Table of contents

### Accessors

- [size](id3v2extendedheader.md#size)

### Methods

- [parse](id3v2extendedheader.md#parse)
- [fromData](id3v2extendedheader.md#fromdata)
- [fromEmpty](id3v2extendedheader.md#fromempty)

## Accessors

### size

• `get` **size**(): `number`

Gets the size of the data on disk in bytes.

#### Returns

`number`

## Methods

### parse

▸ `Protected` **parse**(`data`, `version`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) |
| `version` | `number` |

#### Returns

`void`

___

### fromData

▸ `Static` **fromData**(`data`, `version`): [`Id3v2ExtendedHeader`](id3v2extendedheader.md)

Constructs and initializes a new instance by reading the raw contents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Raw extended header structure |
| `version` | `number` | ID3v2 version. Must be an unsigned 8-bit integer. |

#### Returns

[`Id3v2ExtendedHeader`](id3v2extendedheader.md)

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`Id3v2ExtendedHeader`](id3v2extendedheader.md)

Constructs and initializes a new instance with no contents.

#### Returns

[`Id3v2ExtendedHeader`](id3v2extendedheader.md)
