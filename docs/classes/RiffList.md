[node-taglib-sharp](../README.md) / [Exports](../modules.md) / RiffList

# Class: RiffList

## Implements

- `default`
- `ILazy`

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

**`inheritdoc`**

#### Returns

`number`

#### Implementation of

IRiffChunk.chunkStart

• `set` **chunkStart**(`value`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Implementation of

IRiffChunk.chunkStart

___

### fourcc

• `get` **fourcc**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Implementation of

IRiffChunk.fourcc

___

### isLoaded

• `get` **isLoaded**(): `boolean`

**`inheritdoc`**

#### Returns

`boolean`

#### Implementation of

ILazy.isLoaded

___

### listCount

• `get` **listCount**(): `number`

Total number of nested lists contained in this instance.

#### Returns

`number`

___

### originalDataSize

• `get` **originalDataSize**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Implementation of

IRiffChunk.originalDataSize

___

### originalTotalSize

• `get` **originalTotalSize**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Implementation of

IRiffChunk.originalTotalSize

• `set` **originalTotalSize**(`value`): `void`

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Implementation of

IRiffChunk.originalTotalSize

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

RiffList[] Array of the nested lists with the provided key, or an empty array if
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

ByteVector[] Array of the values with the provided key, or an empty array if the
    key does not exist in the instance.

___

### load

▸ **load**(): `void`

**`inheritdoc`**

#### Returns

`void`

#### Implementation of

ILazy.load

___

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

**`inheritdoc`**

#### Returns

[`ByteVector`](ByteVector.md)

#### Implementation of

IRiffChunk.render

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | `default` |

#### Returns

`boolean`
