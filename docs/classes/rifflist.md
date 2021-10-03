[node-taglib-sharp](../README.md) / [Exports](../modules.md) / RiffList

# Class: RiffList

## Implements

- `IRiffChunk`
- `ILazy`

## Table of contents

### Properties

- [identifierFourcc](rifflist.md#identifierfourcc)

### Accessors

- [chunkStart](rifflist.md#chunkstart)
- [fourcc](rifflist.md#fourcc)
- [isLoaded](rifflist.md#isloaded)
- [listCount](rifflist.md#listcount)
- [originalDataSize](rifflist.md#originaldatasize)
- [originalTotalSize](rifflist.md#originaltotalsize)
- [type](rifflist.md#type)
- [valueCount](rifflist.md#valuecount)

### Methods

- [clear](rifflist.md#clear)
- [getLists](rifflist.md#getlists)
- [getValues](rifflist.md#getvalues)
- [load](rifflist.md#load)
- [render](rifflist.md#render)
- [setLists](rifflist.md#setlists)
- [setValues](rifflist.md#setvalues)
- [fromEmpty](rifflist.md#fromempty)
- [fromFile](rifflist.md#fromfile)
- [isChunkList](rifflist.md#ischunklist)

## Properties

### identifierFourcc

▪ `Static` `Readonly` **identifierFourcc**: ``"LIST"``

FOURCC code for a list chunk

## Accessors

### chunkStart

• `get` **chunkStart**(): `number`

**`inheritdoc`**

#### Returns

`number`

• `set` **chunkStart**(`value`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

___

### fourcc

• `get` **fourcc**(): `string`

**`inheritdoc`**

#### Returns

`string`

___

### isLoaded

• `get` **isLoaded**(): `boolean`

**`inheritdoc`**

#### Returns

`boolean`

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

___

### originalTotalSize

• `get` **originalTotalSize**(): `number`

**`inheritdoc`**

#### Returns

`number`

• `set` **originalTotalSize**(`value`): `void`

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

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

▸ **getLists**(`id`): [`RiffList`](rifflist.md)[]

Retrieves a collection of lists by the lists' key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Key for looking up the desired lists |

#### Returns

[`RiffList`](rifflist.md)[]

RiffList[] Array of the nested lists with the provided key, or an empty array if
    the key does not exist in this instance.

___

### getValues

▸ **getValues**(`id`): [`ByteVector`](bytevector.md)[]

Retrieves a collection of values by the values' key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Key for looking up the desired values |

#### Returns

[`ByteVector`](bytevector.md)[]

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

▸ **render**(): [`ByteVector`](bytevector.md)

**`inheritdoc`**

#### Returns

[`ByteVector`](bytevector.md)

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
| `lists` | [`RiffList`](rifflist.md)[] | Collection of lists to store in the current instance |

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
| `values` | [`ByteVector`](bytevector.md)[] | Collection of values to store in the current instance |

#### Returns

`void`

___

### fromEmpty

▸ `Static` **fromEmpty**(`type`): [`RiffList`](rifflist.md)

Constructs and initializes a new instance with no contents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | Type ID of the list |

#### Returns

[`RiffList`](rifflist.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`RiffList`](rifflist.md)

Constructs and initializes a new instance, lazily, from a position in a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](file.md) | File from which to read the current instance |
| `position` | `number` | Position in the file where the list begins |

#### Returns

[`RiffList`](rifflist.md)

___

### isChunkList

▸ `Static` **isChunkList**(`c`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | `default` |

#### Returns

`boolean`
