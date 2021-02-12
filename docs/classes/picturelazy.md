[node-taglib-sharp](../README.md) / [Exports](../modules.md) / PictureLazy

# Class: PictureLazy

This class implements [IPicture](../interfaces/ipicture.md) and provides mechanisms for loading pictures from files.
Contrary to [Picture](picture.md), a reference to a file where the picture is located can be given and
the picture is lazily loaded from the file, meaning that it will be read from the file only when
needed. This saves time and memory if the picture loading is not required.

## Hierarchy

* **PictureLazy**

## Implements

* [*IPicture*](../interfaces/ipicture.md)
* *ILazy*

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

• **data**(): [*ByteVector*](bytevector.md)

**`inheritdoc`** 

**Returns:** [*ByteVector*](bytevector.md)

Implementation of: [IPicture](../interfaces/ipicture.md).[data](../interfaces/ipicture.md#data)

• **data**(`value`: [*ByteVector*](bytevector.md)): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | [*ByteVector*](bytevector.md) |

**Returns:** *void*

Implementation of: [IPicture](../interfaces/ipicture.md).[data](../interfaces/ipicture.md#data)

___

### description

• **description**(): *string*

**`inheritdoc`** 

**Returns:** *string*

Implementation of: [IPicture](../interfaces/ipicture.md).[description](../interfaces/ipicture.md#description)

• **description**(`value`: *string*): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Implementation of: [IPicture](../interfaces/ipicture.md).[description](../interfaces/ipicture.md#description)

___

### filename

• **filename**(): *string*

**`inheritdoc`** 

**Returns:** *string*

Implementation of: [IPicture](../interfaces/ipicture.md).[filename](../interfaces/ipicture.md#filename)

• **filename**(`value`: *string*): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Implementation of: [IPicture](../interfaces/ipicture.md).[filename](../interfaces/ipicture.md#filename)

___

### isLoaded

• **isLoaded**(): *boolean*

**`inheritdoc`** 

**Returns:** *boolean*

___

### mimeType

• **mimeType**(): *string*

**`inheritdoc`** 

**Returns:** *string*

Implementation of: [IPicture](../interfaces/ipicture.md).[mimeType](../interfaces/ipicture.md#mimetype)

• **mimeType**(`value`: *string*): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Implementation of: [IPicture](../interfaces/ipicture.md).[mimeType](../interfaces/ipicture.md#mimetype)

___

### type

• **type**(): [*PictureType*](../enums/picturetype.md)

**`inheritdoc`** 

**Returns:** [*PictureType*](../enums/picturetype.md)

Implementation of: [IPicture](../interfaces/ipicture.md).[type](../interfaces/ipicture.md#type)

• **type**(`value`: [*PictureType*](../enums/picturetype.md)): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`value` | [*PictureType*](../enums/picturetype.md) |

**Returns:** *void*

Implementation of: [IPicture](../interfaces/ipicture.md).[type](../interfaces/ipicture.md#type)

## Methods

### load

▸ **load**(): *void*

**`inheritdoc`** 

**Returns:** *void*

___

### fromData

▸ `Static`**fromData**(`data`: [*ByteVector*](bytevector.md)): [*PictureLazy*](picturelazy.md)

Constructs a new picture using data that's already been read into memory. The content
will not be lazily loaded.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | ByteVector Object containing picture data    |

**Returns:** [*PictureLazy*](picturelazy.md)

___

### fromFile

▸ `Static`**fromFile**(`file`: IFileAbstraction, `offset`: *number*, `size?`: *number*): [*PictureLazy*](picturelazy.md)

Constructs a new instance from a file abstraction. The content will be lazily loaded.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | IFileAbstraction | File abstraction containing the file to read   |
`offset` | *number* | Index into the file where the picture is located, must be a 32-bit integer   |
`size?` | *number* | Optionally, size of the picture in bytes. If omitted, all bytes of file will be     read when lazily loaded. Must be a 32-bit integer or `undefined`    |

**Returns:** [*PictureLazy*](picturelazy.md)

___

### fromPath

▸ `Static`**fromPath**(`path`: *string*): [*PictureLazy*](picturelazy.md)

Constructs a new instance that will be lazily loaded from the path provided.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | *string* | Path to the file to read    |

**Returns:** [*PictureLazy*](picturelazy.md)
