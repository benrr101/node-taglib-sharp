[node-taglib-sharp](../README.md) / [Exports](../modules.md) / FlacBlock

# Class: FlacBlock

Represents a FLAC metadata block

## Implements

- `ILazy`

## Table of contents

### Properties

- [headerSize](flacblock.md#headersize)

### Accessors

- [blockStart](flacblock.md#blockstart)
- [data](flacblock.md#data)
- [dataSize](flacblock.md#datasize)
- [isLastBlock](flacblock.md#islastblock)
- [isLoaded](flacblock.md#isloaded)
- [totalSize](flacblock.md#totalsize)
- [type](flacblock.md#type)

### Methods

- [load](flacblock.md#load)
- [render](flacblock.md#render)
- [fromData](flacblock.md#fromdata)
- [fromFile](flacblock.md#fromfile)

## Properties

### headerSize

▪ `Static` `Readonly` **headerSize**: ``4``

## Accessors

### blockStart

• `get` **blockStart**(): `number`

Offset into the file where the block begins. This is `undefined` if the instance is
constructed directly from data.

#### Returns

`number`

• `set` **blockStart**(`value`): `void`

Offset into the file where the block begins. This is `undefined` if the instance is
constructed directly from data.

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

___

### data

• `get` **data**(): [`ByteVector`](bytevector.md)

Gets the data contained in the current instance.

#### Returns

[`ByteVector`](bytevector.md)

___

### dataSize

• `get` **dataSize**(): `number`

Gets the size of the data contained in the current instance.

#### Returns

`number`

___

### isLastBlock

• `get` **isLastBlock**(): `boolean`

Gets whether or not the block represented by the current instance is the last metadata block
in the FLAC stream.

#### Returns

`boolean`

`true` if the block represented by the current instance was the last one to appear
    in the file and is followed immediately by the audio data, or `false` if another block
    appears after the current one or the block was not read from disk.

___

### isLoaded

• `get` **isLoaded**(): `boolean`

**`inheritdoc`**

#### Returns

`boolean`

___

### totalSize

• `get` **totalSize**(): `number`

Gets the total size of the block as it appears on disk. This equals the size of the data
plus the size of the header.

#### Returns

`number`

___

### type

• `get` **type**(): `FlacBlockType`

Gets the type of data contained in the current instance.

#### Returns

`FlacBlockType`

## Methods

### load

▸ **load**(): `void`

**`inheritdoc`**

#### Returns

`void`

#### Implementation of

ILazy.load

___

### render

▸ **render**(`isLastBlock`): [`ByteVector`](bytevector.md)

Renders the current instance as a raw FLAC metadata block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `isLastBlock` | `boolean` | Whether or not the block should be marked as the last metadata block. |

#### Returns

[`ByteVector`](bytevector.md)

___

### fromData

▸ `Static` **fromData**(`type`, `data`): [`FlacBlock`](flacblock.md)

Constructs and initializes a new instance using the type of the block and the data
contained in the block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `FlacBlockType` | Type of the block to construct |
| `data` | [`ByteVector`](bytevector.md) | Data the block will contain |

#### Returns

[`FlacBlock`](flacblock.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`FlacBlock`](flacblock.md)

Constructs and initializes a new instance, lazily, by reading it from a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](file.md) | File from which to read the current instance |
| `position` | `number` | Offset into the file where the block begins |

#### Returns

[`FlacBlock`](flacblock.md)
