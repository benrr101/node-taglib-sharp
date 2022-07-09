[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2ExtendedHeader

# Class: Id3v2ExtendedHeader

## Table of contents

### Accessors

- [size](Id3v2ExtendedHeader.md#size)

### Methods

- [parse](Id3v2ExtendedHeader.md#parse)
- [fromData](Id3v2ExtendedHeader.md#fromdata)
- [fromEmpty](Id3v2ExtendedHeader.md#fromempty)

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
| `data` | [`ByteVector`](ByteVector.md) |
| `version` | `number` |

#### Returns

`void`

___

### fromData

▸ `Static` **fromData**(`data`, `version`): [`Id3v2ExtendedHeader`](Id3v2ExtendedHeader.md)

Constructs and initializes a new instance by reading the raw contents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw extended header structure |
| `version` | `number` | ID3v2 version. Must be an unsigned 8-bit integer. |

#### Returns

[`Id3v2ExtendedHeader`](Id3v2ExtendedHeader.md)

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`Id3v2ExtendedHeader`](Id3v2ExtendedHeader.md)

Constructs and initializes a new instance with no contents.

#### Returns

[`Id3v2ExtendedHeader`](Id3v2ExtendedHeader.md)
