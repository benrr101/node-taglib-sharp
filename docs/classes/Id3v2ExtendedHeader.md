[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2ExtendedHeader

# Class: Id3v2ExtendedHeader

This class is a filler until support for reading and writing the ID3v2 extended header is
implemented.

## Table of contents

### Accessors

- [size](Id3v2ExtendedHeader.md#size)

### Methods

- [fromData](Id3v2ExtendedHeader.md#fromdata)
- [fromEmpty](Id3v2ExtendedHeader.md#fromempty)

## Accessors

### size

• `get` **size**(): `number`

Gets the size of the data on disk in bytes.

#### Returns

`number`

## Methods

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
