**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/picture"](../modules/_src_picture_.md) / Picture

# Class: Picture

## Hierarchy

* **Picture**

## Implements

* [IPicture](../interfaces/_src_picture_.ipicture.md)

## Index

### Properties

* [data](_src_picture_.picture.md#data)
* [description](_src_picture_.picture.md#description)
* [filename](_src_picture_.picture.md#filename)
* [mimeType](_src_picture_.picture.md#mimetype)
* [type](_src_picture_.picture.md#type)

### Methods

* [fromData](_src_picture_.picture.md#fromdata)
* [fromFileAbstraction](_src_picture_.picture.md#fromfileabstraction)
* [fromPath](_src_picture_.picture.md#frompath)
* [getExtensionFromData](_src_picture_.picture.md#getextensionfromdata)
* [getExtensionFromMimeType](_src_picture_.picture.md#getextensionfrommimetype)
* [getMimeTypeFromFilename](_src_picture_.picture.md#getmimetypefromfilename)

## Properties

### data

•  **data**: [ByteVector](_src_bytevector_.bytevector.md)

*Implementation of [IPicture](../interfaces/_src_picture_.ipicture.md).[data](../interfaces/_src_picture_.ipicture.md#data)*

___

### description

•  **description**: string

*Implementation of [IPicture](../interfaces/_src_picture_.ipicture.md).[description](../interfaces/_src_picture_.ipicture.md#description)*

___

### filename

•  **filename**: string

*Implementation of [IPicture](../interfaces/_src_picture_.ipicture.md).[filename](../interfaces/_src_picture_.ipicture.md#filename)*

___

### mimeType

•  **mimeType**: string

*Implementation of [IPicture](../interfaces/_src_picture_.ipicture.md).[mimeType](../interfaces/_src_picture_.ipicture.md#mimetype)*

___

### type

•  **type**: [PictureType](../enums/_src_picture_.picturetype.md)

*Implementation of [IPicture](../interfaces/_src_picture_.ipicture.md).[type](../interfaces/_src_picture_.ipicture.md#type)*

## Methods

### fromData

▸ `Static`**fromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md)): [Picture](_src_picture_.picture.md)

#### Parameters:

Name | Type |
------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) |

**Returns:** [Picture](_src_picture_.picture.md)

___

### fromFileAbstraction

▸ `Static`**fromFileAbstraction**(`abstraction`: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md)): [Picture](_src_picture_.picture.md)

#### Parameters:

Name | Type |
------ | ------ |
`abstraction` | [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) |

**Returns:** [Picture](_src_picture_.picture.md)

___

### fromPath

▸ `Static`**fromPath**(`filePath`: string): [Picture](_src_picture_.picture.md)

#### Parameters:

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** [Picture](_src_picture_.picture.md)

___

### getExtensionFromData

▸ `Static`**getExtensionFromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md)): string

Retrieve a mimetype from raw file data by reading the first few bytes of the file. Less
accurate than [getExtensionFromMimeType](_src_picture_.picture.md#getextensionfrommimetype) since this is limited to image file types.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Bytes of the file to read to identify the extension |

**Returns:** string

string Extension of the file with dot at the beginning based on the first few bytes
    of the data. If the extension cannot be determined, `undefined` is returned

___

### getExtensionFromMimeType

▸ `Static`**getExtensionFromMimeType**(`mime`: string): string

Gets the file extension for a specific mimetype.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`mime` | string | Mimetype to lookup the extension for |

**Returns:** string

string Extension of the file based on the mimetype with a dot at the beginning. If
    the extension cannot be determined, `undefined` is returned

___

### getMimeTypeFromFilename

▸ `Static`**getMimeTypeFromFilename**(`name`: string): string

Gets the mimetype of a file based on its extension. If the mimetype cannot be determined, it
is assumed to be a basic binary file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string | Filename with extension or just the extension of the file |

**Returns:** string

string Mimetype of the file based on the extension. If mimetype cannot be
    determined, application/octet-stream is returned.
