[node-taglib-sharp](../README.md) / [Exports](../modules.md) / PictureLazy

# Class: PictureLazy

This class implements [IPicture](../interfaces/IPicture.md) and provides mechanisms for loading pictures from files.
Contrary to [Picture](Picture.md), a reference to a file where the picture is located can be given and
the picture is lazily loaded from the file, meaning that it will be read from the file only when
needed. This saves time and memory if the picture loading is not required.

## Implements

- [`IPicture`](../interfaces/IPicture.md)
- [`ILazy`](../interfaces/ILazy.md)

## Table of contents

### Accessors

- [data](PictureLazy.md#data)
- [description](PictureLazy.md#description)
- [filename](PictureLazy.md#filename)
- [isLoaded](PictureLazy.md#isloaded)
- [mimeType](PictureLazy.md#mimetype)
- [type](PictureLazy.md#type)

### Methods

- [load](PictureLazy.md#load)
- [fromData](PictureLazy.md#fromdata)
- [fromFile](PictureLazy.md#fromfile)
- [fromPath](PictureLazy.md#frompath)

## Accessors

### data

• `get` **data**(): [`ByteVector`](ByteVector.md)

Gets and sets the picture data stored in the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

#### Implementation of

[IPicture](../interfaces/IPicture.md).[data](../interfaces/IPicture.md#data)

• `set` **data**(`value`): `void`

Gets and sets the picture data stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ByteVector`](ByteVector.md) |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[data](../interfaces/IPicture.md#data)

___

### description

• `get` **description**(): `string`

Gets and sets a description of the picture stored in the current instance. Optional.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[description](../interfaces/IPicture.md#description)

• `set` **description**(`value`): `void`

Gets and sets a description of the picture stored in the current instance. Optional.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[description](../interfaces/IPicture.md#description)

___

### filename

• `get` **filename**(): `string`

Gets and sets a filename of the picture stored in the current instance. Optional.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[filename](../interfaces/IPicture.md#filename)

• `set` **filename**(`value`): `void`

Gets and sets a filename of the picture stored in the current instance. Optional.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[filename](../interfaces/IPicture.md#filename)

___

### isLoaded

• `get` **isLoaded**(): `boolean`

Gets whether the object has been loaded.

#### Returns

`boolean`

#### Implementation of

[ILazy](../interfaces/ILazy.md).[isLoaded](../interfaces/ILazy.md#isloaded)

___

### mimeType

• `get` **mimeType**(): `string`

Gets and sets the mime-type of the picture data stored in the current instance.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[mimeType](../interfaces/IPicture.md#mimetype)

• `set` **mimeType**(`value`): `void`

Gets and sets the mime-type of the picture data stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[mimeType](../interfaces/IPicture.md#mimetype)

___

### type

• `get` **type**(): [`PictureType`](../enums/PictureType.md)

Gets and sets the type of the content visible in the picture stored in the current instance.

#### Returns

[`PictureType`](../enums/PictureType.md)

#### Implementation of

[IPicture](../interfaces/IPicture.md).[type](../interfaces/IPicture.md#type)

• `set` **type**(`value`): `void`

Gets and sets the type of the content visible in the picture stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`PictureType`](../enums/PictureType.md) |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[type](../interfaces/IPicture.md#type)

## Methods

### load

▸ **load**(): `void`

Loads the object.

#### Returns

`void`

#### Implementation of

[ILazy](../interfaces/ILazy.md).[load](../interfaces/ILazy.md#load)

___

### fromData

▸ `Static` **fromData**(`data`): [`PictureLazy`](PictureLazy.md)

Constructs a new picture using data that's already been read into memory. The content
will not be lazily loaded.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | ByteVector Object containing picture data |

#### Returns

[`PictureLazy`](PictureLazy.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `offset`, `size?`): [`PictureLazy`](PictureLazy.md)

Constructs a new instance from a file abstraction. The content will be lazily loaded.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`IFileAbstraction`](../interfaces/IFileAbstraction.md) | File abstraction containing the file to read |
| `offset` | `number` | Index into the file where the picture is located, must be a 32-bit integer |
| `size?` | `number` | Optionally, size of the picture in bytes. If omitted, all bytes of file will be read when lazily loaded. Must be a 32-bit integer or `undefined` |

#### Returns

[`PictureLazy`](PictureLazy.md)

___

### fromPath

▸ `Static` **fromPath**(`filePath`): [`PictureLazy`](PictureLazy.md)

Constructs a new instance that will be lazily loaded from the filePath provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to read |

#### Returns

[`PictureLazy`](PictureLazy.md)
