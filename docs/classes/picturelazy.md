[node-taglib-sharp](../README.md) / [Exports](../modules.md) / PictureLazy

# Class: PictureLazy

This class implements [IPicture](../interfaces/ipicture.md) and provides mechanisms for loading pictures from files.
Contrary to [Picture](picture.md), a reference to a file where the picture is located can be given and
the picture is lazily loaded from the file, meaning that it will be read from the file only when
needed. This saves time and memory if the picture loading is not required.

## Implements

- [`IPicture`](../interfaces/ipicture.md)
- `ILazy`

## Table of contents

### Accessors

- [data](picturelazy.md#data)
- [description](picturelazy.md#description)
- [filename](picturelazy.md#filename)
- [isLoaded](picturelazy.md#isloaded)
- [mimeType](picturelazy.md#mimetype)
- [type](picturelazy.md#type)

### Methods

- [load](picturelazy.md#load)
- [fromData](picturelazy.md#fromdata)
- [fromFile](picturelazy.md#fromfile)
- [fromPath](picturelazy.md#frompath)

## Accessors

### data

• `get` **data**(): [`ByteVector`](bytevector.md)

Gets and sets the picture data stored in the current instance.

#### Returns

[`ByteVector`](bytevector.md)

#### Implementation of

[IPicture](../interfaces/ipicture.md).[data](../interfaces/ipicture.md#data)

• `set` **data**(`value`): `void`

Gets and sets the picture data stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ByteVector`](bytevector.md) |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[data](../interfaces/ipicture.md#data)

___

### description

• `get` **description**(): `string`

Gets and sets a description of the picture stored in the current instance. Optional.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[description](../interfaces/ipicture.md#description)

• `set` **description**(`value`): `void`

Gets and sets a description of the picture stored in the current instance. Optional.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[description](../interfaces/ipicture.md#description)

___

### filename

• `get` **filename**(): `string`

Gets and sets a filename of the picture stored in the current instance. Optional.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[filename](../interfaces/ipicture.md#filename)

• `set` **filename**(`value`): `void`

Gets and sets a filename of the picture stored in the current instance. Optional.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[filename](../interfaces/ipicture.md#filename)

___

### isLoaded

• `get` **isLoaded**(): `boolean`

**`inheritdoc`**

#### Returns

`boolean`

___

### mimeType

• `get` **mimeType**(): `string`

Gets and sets the mime-type of the picture data stored in the current instance.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[mimeType](../interfaces/ipicture.md#mimetype)

• `set` **mimeType**(`value`): `void`

Gets and sets the mime-type of the picture data stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[mimeType](../interfaces/ipicture.md#mimetype)

___

### type

• `get` **type**(): [`PictureType`](../enums/picturetype.md)

Gets and sets the type of the content visible in the picture stored in the current instance.

#### Returns

[`PictureType`](../enums/picturetype.md)

#### Implementation of

[IPicture](../interfaces/ipicture.md).[type](../interfaces/ipicture.md#type)

• `set` **type**(`value`): `void`

Gets and sets the type of the content visible in the picture stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`PictureType`](../enums/picturetype.md) |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[type](../interfaces/ipicture.md#type)

## Methods

### load

▸ **load**(): `void`

**`inheritdoc`**

#### Returns

`void`

#### Implementation of

ILazy.load

___

### fromData

▸ `Static` **fromData**(`data`): [`PictureLazy`](picturelazy.md)

Constructs a new picture using data that's already been read into memory. The content
will not be lazily loaded.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | ByteVector Object containing picture data |

#### Returns

[`PictureLazy`](picturelazy.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `offset`, `size?`): [`PictureLazy`](picturelazy.md)

Constructs a new instance from a file abstraction. The content will be lazily loaded.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IFileAbstraction` | File abstraction containing the file to read |
| `offset` | `number` | Index into the file where the picture is located, must be a 32-bit integer |
| `size?` | `number` | Optionally, size of the picture in bytes. If omitted, all bytes of file will be     read when lazily loaded. Must be a 32-bit integer or `undefined` |

#### Returns

[`PictureLazy`](picturelazy.md)

___

### fromPath

▸ `Static` **fromPath**(`path`): [`PictureLazy`](picturelazy.md)

Constructs a new instance that will be lazily loaded from the path provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the file to read |

#### Returns

[`PictureLazy`](picturelazy.md)
