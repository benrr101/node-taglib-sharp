**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/pictureLazy"](../modules/_src_picturelazy_.md) / PictureLazy

# Class: PictureLazy

This class implements {@see IPicture} and provides mechanisms for loading pictures from files.
Contrary to {@see Picture}, a reference to a file where the picture is located can be given and
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

*Defined in src/pictureLazy.ts:106*

**`inheritdoc`** 

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

• set **data**(`value`: [ByteVector](_src_bytevector_.bytevector.md)): void

*Defined in src/pictureLazy.ts:111*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | [ByteVector](_src_bytevector_.bytevector.md) |

**Returns:** void

___

### description

• get **description**(): string

*Defined in src/pictureLazy.ts:114*

**`inheritdoc`** 

**Returns:** string

• set **description**(`value`: string): void

*Defined in src/pictureLazy.ts:116*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### filename

• get **filename**(): string

*Defined in src/pictureLazy.ts:119*

**`inheritdoc`** 

**Returns:** string

• set **filename**(`value`: string): void

*Defined in src/pictureLazy.ts:124*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### isLoaded

• get **isLoaded**(): boolean

*Defined in src/pictureLazy.ts:127*

**`inheritdoc`** 

**Returns:** boolean

___

### mimeType

• get **mimeType**(): string

*Defined in src/pictureLazy.ts:130*

**`inheritdoc`** 

**Returns:** string

• set **mimeType**(`value`: string): void

*Defined in src/pictureLazy.ts:135*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### type

• get **type**(): [PictureType](../enums/_src_picture_.picturetype.md)

*Defined in src/pictureLazy.ts:138*

**`inheritdoc`** 

**Returns:** [PictureType](../enums/_src_picture_.picturetype.md)

• set **type**(`value`: [PictureType](../enums/_src_picture_.picturetype.md)): void

*Defined in src/pictureLazy.ts:143*

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

*Defined in src/pictureLazy.ts:150*

**`inheritdoc`** 

**Returns:** void

___

### fromData

▸ `Static`**fromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md)): [PictureLazy](_src_picturelazy_.picturelazy.md)

*Defined in src/pictureLazy.ts:35*

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

*Defined in src/pictureLazy.ts:62*

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

*Defined in src/pictureLazy.ts:88*

Constructs a new instance that will be lazily loaded from the path provided.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | string | Path to the file to read  |

**Returns:** [PictureLazy](_src_picturelazy_.picturelazy.md)
