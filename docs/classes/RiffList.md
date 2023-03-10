[node-taglib-sharp](../README.md) / [Exports](../modules.md) / RiffList

# Class: RiffList

Interface for chunks that appear in a RIFF file.

## Implements

- [`IRiffChunk`](../interfaces/IRiffChunk.md)
- [`ILazy`](../interfaces/ILazy.md)

## Table of contents

### Properties

- [IDENTIFIER\_FOURCC](RiffList.md#identifier_fourcc)

### Accessors

- [chunkStart](RiffList.md#chunkstart)
- [fourcc](RiffList.md#fourcc)
- [isLoaded](RiffList.md#isloaded)
- [listCount](RiffList.md#listcount)
- [originalDataSize](RiffList.md#originaldatasize)
- [originalTotalSize](RiffList.md#originaltotalsize)
- [type](RiffList.md#type)
- [valueCount](RiffList.md#valuecount)

### Methods

- [clear](RiffList.md#clear)
- [getLists](RiffList.md#getlists)
- [getValues](RiffList.md#getvalues)
- [load](RiffList.md#load)
- [render](RiffList.md#render)
- [setLists](RiffList.md#setlists)
- [setValues](RiffList.md#setvalues)
- [fromEmpty](RiffList.md#fromempty)
- [fromFile](RiffList.md#fromfile)
- [isChunkList](RiffList.md#ischunklist)

## Properties

### IDENTIFIER\_FOURCC

▪ `Static` `Readonly` **IDENTIFIER\_FOURCC**: ``"LIST"``

FOURCC code for a list chunk

## Accessors

### chunkStart

• `get` **chunkStart**(): `number`

Offset into the file where the chunk begins. This is `undefined` if the object was
constructed directly from data.

#### Returns

`number`

#### Implementation of

[IRiffChunk](../interfaces/IRiffChunk.md).[chunkStart](../interfaces/IRiffChunk.md#chunkstart)

• `set` **chunkStart**(`value`): `void`

Offset into the file where the chunk begins. This is `undefined` if the object was
constructed directly from data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Implementation of

[IRiffChunk](../interfaces/IRiffChunk.md).[chunkStart](../interfaces/IRiffChunk.md#chunkstart)

___

### fourcc

• `get` **fourcc**(): `string`

FOURCC code for the chunk.

#### Returns

`string`

#### Implementation of

[IRiffChunk](../interfaces/IRiffChunk.md).[fourcc](../interfaces/IRiffChunk.md#fourcc)

___

### isLoaded

• `get` **isLoaded**(): `boolean`

Gets whether the object has been loaded.

#### Returns

`boolean`

#### Implementation of

[ILazy](../interfaces/ILazy.md).[isLoaded](../interfaces/ILazy.md#isloaded)

___

### listCount

• `get` **listCount**(): `number`

Total number of nested lists contained in this instance.

#### Returns

`number`

___

### originalDataSize

• `get` **originalDataSize**(): `number`

Size of just the data contained within the current instance. Does not include the header or
padding byte. This value does not update if contents of the chunk changes.

#### Returns

`number`

#### Implementation of

[IRiffChunk](../interfaces/IRiffChunk.md).[originalDataSize](../interfaces/IRiffChunk.md#originaldatasize)

___

### originalTotalSize

• `get` **originalTotalSize**(): `number`

Original size of the chunk, including header and padding byte. This value does not update if
the contents of the chunk changes.

#### Returns

`number`

#### Implementation of

[IRiffChunk](../interfaces/IRiffChunk.md).[originalTotalSize](../interfaces/IRiffChunk.md#originaltotalsize)

___

### type

• `get` **type**(): `string`

ID that identifies the type of this list.

#### Returns

`string`

___

### valueCount

• `get` **valueCount**(): `number`

Total number of values contained in this instance.

#### Returns

`number`

## Methods

### clear

▸ **clear**(): `void`

Removes all values and nested lists from the current instance.

#### Returns

`void`

___

### getLists

▸ **getLists**(`id`): [`RiffList`](RiffList.md)[]

Retrieves a collection of lists by the lists' key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Key for looking up the desired lists |

#### Returns

[`RiffList`](RiffList.md)[]

Array of the nested lists with the provided key, or an empty array if
    the key does not exist in this instance.

___

### getValues

▸ **getValues**(`id`): [`ByteVector`](ByteVector.md)[]

Retrieves a collection of values by the values' key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Key for looking up the desired values |

#### Returns

[`ByteVector`](ByteVector.md)[]

Array of the values with the provided key, or an empty array if the
    key does not exist in the instance.

___

### load

▸ **load**(): `void`

Loads the object.

#### Returns

`void`

#### Implementation of

[ILazy](../interfaces/ILazy.md).[load](../interfaces/ILazy.md#load)

___

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

Renders the chunk, including the header and padding byte.

#### Returns

[`ByteVector`](ByteVector.md)

#### Implementation of

[IRiffChunk](../interfaces/IRiffChunk.md).[render](../interfaces/IRiffChunk.md#render)

___

### setLists

▸ **setLists**(`id`, `lists`): `void`

Stores a collection of lists in the current instance, overwriting any that currently exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Key for the lists to store |
| `lists` | [`RiffList`](RiffList.md)[] | Collection of lists to store in the current instance |

#### Returns

`void`

___

### setValues

▸ **setValues**(`id`, `values`): `void`

Stores a collection of values in the current instance, overwriting any that currently exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Key for the values to store |
| `values` | [`ByteVector`](ByteVector.md)[] | Collection of values to store in the current instance |

#### Returns

`void`

___

### fromEmpty

▸ `Static` **fromEmpty**(`type`): [`RiffList`](RiffList.md)

Constructs and initializes a new instance with no contents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | Type ID of the list |

#### Returns

[`RiffList`](RiffList.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`RiffList`](RiffList.md)

Constructs and initializes a new instance, lazily, from a position in a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File from which to read the current instance |
| `position` | `number` | Position in the file where the list begins |

#### Returns

[`RiffList`](RiffList.md)

___

### isChunkList

▸ `Static` **isChunkList**(`c`): `boolean`

Determines if a given chunk is a list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `c` | [`IRiffChunk`](../interfaces/IRiffChunk.md) | Chunk to check is a list. |

#### Returns

`boolean`
