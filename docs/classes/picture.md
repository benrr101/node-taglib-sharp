[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Picture

# Class: Picture

## Hierarchy

* **Picture**

## Implements

* [*IPicture*](../interfaces/ipicture.md)

## Table of contents

### Properties

- [data](picture.md#data)
- [description](picture.md#description)
- [filename](picture.md#filename)
- [mimeType](picture.md#mimetype)
- [type](picture.md#type)

### Methods

- [fromData](picture.md#fromdata)
- [fromFileAbstraction](picture.md#fromfileabstraction)
- [fromPath](picture.md#frompath)
- [getExtensionFromData](picture.md#getextensionfromdata)
- [getExtensionFromMimeType](picture.md#getextensionfrommimetype)
- [getMimeTypeFromFilename](picture.md#getmimetypefromfilename)

## Properties

### data

• **data**: [*ByteVector*](bytevector.md)

Implementation of: [IPicture](../interfaces/ipicture.md).[data](../interfaces/ipicture.md#data)

___

### description

• **description**: *string*

Implementation of: [IPicture](../interfaces/ipicture.md).[description](../interfaces/ipicture.md#description)

___

### filename

• **filename**: *string*

Implementation of: [IPicture](../interfaces/ipicture.md).[filename](../interfaces/ipicture.md#filename)

___

### mimeType

• **mimeType**: *string*

Implementation of: [IPicture](../interfaces/ipicture.md).[mimeType](../interfaces/ipicture.md#mimetype)

___

### type

• **type**: [*PictureType*](../enums/picturetype.md)

Implementation of: [IPicture](../interfaces/ipicture.md).[type](../interfaces/ipicture.md#type)

## Methods

### fromData

▸ `Static`**fromData**(`data`: [*ByteVector*](bytevector.md)): [*Picture*](picture.md)

#### Parameters:

Name | Type |
------ | ------ |
`data` | [*ByteVector*](bytevector.md) |

**Returns:** [*Picture*](picture.md)

___

### fromFileAbstraction

▸ `Static`**fromFileAbstraction**(`abstraction`: IFileAbstraction): [*Picture*](picture.md)

#### Parameters:

Name | Type |
------ | ------ |
`abstraction` | IFileAbstraction |

**Returns:** [*Picture*](picture.md)

___

### fromPath

▸ `Static`**fromPath**(`filePath`: *string*): [*Picture*](picture.md)

#### Parameters:

Name | Type |
------ | ------ |
`filePath` | *string* |

**Returns:** [*Picture*](picture.md)

___

### getExtensionFromData

▸ `Static`**getExtensionFromData**(`data`: [*ByteVector*](bytevector.md)): *string*

Retrieve a mimetype from raw file data by reading the first few bytes of the file. Less
accurate than [getExtensionFromMimeType](picture.md#getextensionfrommimetype) since this is limited to image file types.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Bytes of the file to read to identify the extension   |

**Returns:** *string*

string Extension of the file with dot at the beginning based on the first few bytes
    of the data. If the extension cannot be determined, `undefined` is returned

___

### getExtensionFromMimeType

▸ `Static`**getExtensionFromMimeType**(`mime`: *string*): *string*

Gets the file extension for a specific mimetype.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`mime` | *string* | Mimetype to lookup the extension for   |

**Returns:** *string*

string Extension of the file based on the mimetype with a dot at the beginning. If
    the extension cannot be determined, `undefined` is returned

___

### getMimeTypeFromFilename

▸ `Static`**getMimeTypeFromFilename**(`name`: *string*): *string*

Gets the mimetype of a file based on its extension. If the mimetype cannot be determined, it
is assumed to be a basic binary file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | *string* | Filename with extension or just the extension of the file   |

**Returns:** *string*

string Mimetype of the file based on the extension. If mimetype cannot be
    determined, application/octet-stream is returned.
