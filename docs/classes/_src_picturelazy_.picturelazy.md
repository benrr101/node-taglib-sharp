**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/pictureLazy"](../modules/_src_picturelazy_.md) / PictureLazy

# Class: PictureLazy

This class implements [IPicture](../interfaces/_src_picture_.ipicture.md) and provides mechanisms for loading pictures from files.
Contrary to [Picture](_src_picture_.picture.md), a reference to a file where the picture is located can be given and
the picture is lazily loaded from the file, meaning that it will be read from the file only when
needed. This saves time and memory if the picture loading is not required.

## Hierarchy

* **PictureLazy**

## Implements

* [IPicture](../interfaces/_src_picture_.ipicture.md)
* [ILazy](../interfaces/_src_ilazy_.ilazy.md)

## Index

### Accessors

* [data](_src_picturelazy_.picturelazy.md#data)
* [description](_src_picturelazy_.picturelazy.md#description)
* [filename](_src_picturelazy_.picturelazy.md#filename)
* [isLoaded](_src_picturelazy_.picturelazy.md#isloaded)
* [mimeType](_src_picturelazy_.picturelazy.md#mimetype)
* [type](_src_picturelazy_.picturelazy.md#type)

### Methods

* [load](_src_picturelazy_.picturelazy.md#load)
* [fromData](_src_picturelazy_.picturelazy.md#fromdata)
* [fromFile](_src_picturelazy_.picturelazy.md#fromfile)
* [fromPath](_src_picturelazy_.picturelazy.md#frompath)

## Accessors

### data

• get **data**(): [ByteVector](_src_bytevector_.bytevector.md)

**`inheritdoc`** 

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

• set **data**(`value`: [ByteVector](_src_bytevector_.bytevector.md)): void

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | [ByteVector](_src_bytevector_.bytevector.md) |

**Returns:** void

___

### description

• get **description**(): string

**`inheritdoc`** 

**Returns:** string

• set **description**(`value`: string): void

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### filename

• get **filename**(): string

**`inheritdoc`** 

**Returns:** string

• set **filename**(`value`: string): void

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### isLoaded

• get **isLoaded**(): boolean

**`inheritdoc`** 

**Returns:** boolean

___

### mimeType

• get **mimeType**(): string

**`inheritdoc`** 

**Returns:** string

• set **mimeType**(`value`: string): void

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### type

• get **type**(): [PictureType](../enums/_src_picture_.picturetype.md)

**`inheritdoc`** 

**Returns:** [PictureType](../enums/_src_picture_.picturetype.md)

• set **type**(`value`: [PictureType](../enums/_src_picture_.picturetype.md)): void

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | [PictureType](../enums/_src_picture_.picturetype.md) |

**Returns:** void

## Methods

### load

▸ **load**(): void

*Implementation of [ILazy](../interfaces/_src_ilazy_.ilazy.md)*

**`inheritdoc`** 

**Returns:** void

___

### fromData

▸ `Static`**fromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md)): [PictureLazy](_src_picturelazy_.picturelazy.md)

Constructs a new picture using data that's already been read into memory. The content
will not be lazily loaded.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector Object containing picture data  |

**Returns:** [PictureLazy](_src_picturelazy_.picturelazy.md)

___

### fromFile

▸ `Static`**fromFile**(`file`: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md), `offset`: number, `size?`: number): [PictureLazy](_src_picturelazy_.picturelazy.md)

Constructs a new instance from a file abstraction. The content will be lazily loaded.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) | File abstraction containing the file to read |
`offset` | number | Index into the file where the picture is located, must be a 32-bit integer |
`size?` | number | Optionally, size of the picture in bytes. If omitted, all bytes of file will be     read when lazily loaded. Must be a 32-bit integer or `undefined`  |

**Returns:** [PictureLazy](_src_picturelazy_.picturelazy.md)

___

### fromPath

▸ `Static`**fromPath**(`path`: string): [PictureLazy](_src_picturelazy_.picturelazy.md)

Constructs a new instance that will be lazily loaded from the path provided.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | string | Path to the file to read  |

**Returns:** [PictureLazy](_src_picturelazy_.picturelazy.md)
