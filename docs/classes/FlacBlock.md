[node-taglib-sharp](../README.md) / [Exports](../modules.md) / FlacBlock

# Class: FlacBlock

Represents a FLAC metadata block

## Implements

- [`ILazy`](../interfaces/ILazy.md)

## Table of contents

### Properties

- [HEADER\_SIZE](FlacBlock.md#header_size)

### Accessors

- [blockStart](FlacBlock.md#blockstart)
- [data](FlacBlock.md#data)
- [dataSize](FlacBlock.md#datasize)
- [isLastBlock](FlacBlock.md#islastblock)
- [isLoaded](FlacBlock.md#isloaded)
- [totalSize](FlacBlock.md#totalsize)
- [type](FlacBlock.md#type)

### Methods

- [load](FlacBlock.md#load)
- [render](FlacBlock.md#render)
- [fromData](FlacBlock.md#fromdata)
- [fromFile](FlacBlock.md#fromfile)

## Properties

### HEADER\_SIZE

▪ `Static` `Readonly` **HEADER\_SIZE**: ``4``

Length of a FLAC block header in bytes.

## Accessors

### blockStart

• `get` **blockStart**(): `number`

Offset into the file where the block begins. This is `undefined` if the instance is
constructed directly from data.

#### Returns

`number`

___

### data

• `get` **data**(): [`ByteVector`](ByteVector.md)

Gets the data contained in the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

___

### dataSize

• `get` **dataSize**(): `number`

Gets the size of the data contained in the current instance.

#### Returns

`number`

___

### isLastBlock

• `get` **isLastBlock**(): `boolean`

Gets whether the block represented by the current instance is the last metadata block
in the FLAC stream.

#### Returns

`boolean`

`true` if the block represented by the current instance was the last one to appear
    in the file and is followed immediately by the audio data, or `false` if another block
    appears after the current one or the block was not read from disk.

___

### isLoaded

• `get` **isLoaded**(): `boolean`

Gets whether the object has been loaded.

#### Returns

`boolean`

#### Implementation of

[ILazy](../interfaces/ILazy.md).[isLoaded](../interfaces/ILazy.md#isloaded)

___

### totalSize

• `get` **totalSize**(): `number`

Gets the total size of the block as it appears on disk. This equals the size of the data
plus the size of the header.

#### Returns

`number`

___

### type

• `get` **type**(): [`FlacBlockType`](../enums/FlacBlockType.md)

Gets the type of data contained in the current instance.

#### Returns

[`FlacBlockType`](../enums/FlacBlockType.md)

## Methods

### load

▸ **load**(): `void`

Loads the object.

#### Returns

`void`

#### Implementation of

[ILazy](../interfaces/ILazy.md).[load](../interfaces/ILazy.md#load)

___

### render

▸ **render**(`isLastBlock`): [`ByteVector`](ByteVector.md)

Renders the current instance as a raw FLAC metadata block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `isLastBlock` | `boolean` | Whether or not the block should be marked as the last metadata block. |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromData

▸ `Static` **fromData**(`type`, `data`): [`FlacBlock`](FlacBlock.md)

Constructs and initializes a new instance using the type of the block and the data
contained in the block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`FlacBlockType`](../enums/FlacBlockType.md) | Type of the block to construct |
| `data` | [`ByteVector`](ByteVector.md) | Data the block will contain |

#### Returns

[`FlacBlock`](FlacBlock.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`FlacBlock`](FlacBlock.md)

Constructs and initializes a new instance, lazily, by reading it from a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File from which to read the current instance |
| `position` | `number` | Offset into the file where the block begins |

#### Returns

[`FlacBlock`](FlacBlock.md)
