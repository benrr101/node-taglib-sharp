[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Mpeg4BoxHeader

# Class: Mpeg4BoxHeader

Provides support for reading and writing headers for ISO/IEC 14496-12 boxes.

## Table of contents

### Accessors

- [boxType](Mpeg4BoxHeader.md#boxtype)
- [dataSize](Mpeg4BoxHeader.md#datasize)
- [extendedType](Mpeg4BoxHeader.md#extendedtype)
- [headerSize](Mpeg4BoxHeader.md#headersize)
- [position](Mpeg4BoxHeader.md#position)
- [totalBoxSize](Mpeg4BoxHeader.md#totalboxsize)

### Methods

- [render](Mpeg4BoxHeader.md#render)
- [fromFileAndPosition](Mpeg4BoxHeader.md#fromfileandposition)
- [fromType](Mpeg4BoxHeader.md#fromtype)

## Accessors

### boxType

• `get` **boxType**(): [`ByteVector`](ByteVector.md)

Gets the type of box represented by the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

___

### dataSize

• `get` **dataSize**(): `number`

Gets the size of the data in the box described by the current instance.

#### Returns

`number`

___

### extendedType

• `get` **extendedType**(): [`ByteVector`](ByteVector.md)

Gets the extended type of the box represented by the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

___

### headerSize

• `get` **headerSize**(): `number`

Gets the size of the header represented by the current instance.

#### Returns

`number`

___

### position

• `get` **position**(): `number`

Gets the position box represented by the current instance in the file it comes from.

#### Returns

`number`

___

### totalBoxSize

• `get` **totalBoxSize**(): `number`

Gets the total size of the box described by the current instance.

#### Returns

`number`

## Methods

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

Renders the header represented by the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

ByteVector Rendered version of the current instance.

___

### fromFileAndPosition

▸ `Static` **fromFileAndPosition**(`file`, `position`): [`Mpeg4BoxHeader`](Mpeg4BoxHeader.md)

Constructs and initializes a new instance of [Mpeg4BoxHeader](Mpeg4BoxHeader.md) by reading it from a
specified seek position in a specified file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | A [File](File.md) object to read the new instance from. |
| `position` | `number` | A value specifying the seek position in File at which to start reading. |

#### Returns

[`Mpeg4BoxHeader`](Mpeg4BoxHeader.md)

___

### fromType

▸ `Static` **fromType**(`type`, `extendedType?`): [`Mpeg4BoxHeader`](Mpeg4BoxHeader.md)

Constructs and initializes a new instance of [Mpeg4BoxHeader](Mpeg4BoxHeader.md) with a specified box type
and optionally extended type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ByteVector`](ByteVector.md) | A [ByteVector](ByteVector.md) object containing the four byte box type. |
| `extendedType?` | [`ByteVector`](ByteVector.md) | A [ByteVector](ByteVector.md) object containing the four byte box type. |

#### Returns

[`Mpeg4BoxHeader`](Mpeg4BoxHeader.md)
