[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Picture

# Class: Picture

This class implements [IPicture](../interfaces/ipicture.md) and provides a mechanism for loading pictures from files.

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
- [fromFullData](picture.md#fromfulldata)
- [fromPath](picture.md#frompath)
- [getExtensionFromData](picture.md#getextensionfromdata)
- [getExtensionFromMimeType](picture.md#getextensionfrommimetype)
- [getMimeTypeFromFilename](picture.md#getmimetypefromfilename)

## Properties

### data

• **data**: [*ByteVector*](bytevector.md)

Gets and sets the picture data stored in the current instance.

Implementation of: [IPicture](../interfaces/ipicture.md).[data](../interfaces/ipicture.md#data)

___

### description

• **description**: *string*

Gets and sets a description of the picture stored in the current instance. Optional.

Implementation of: [IPicture](../interfaces/ipicture.md).[description](../interfaces/ipicture.md#description)

___

### filename

• **filename**: *string*

Gets and sets a filename of the picture stored in the current instance. Optional.

Implementation of: [IPicture](../interfaces/ipicture.md).[filename](../interfaces/ipicture.md#filename)

___

### mimeType

• **mimeType**: *string*

Gets and sets the mime-type of the picture data stored in the current instance.

Implementation of: [IPicture](../interfaces/ipicture.md).[mimeType](../interfaces/ipicture.md#mimetype)

___

### type

• **type**: [*PictureType*](../enums/picturetype.md)

Gets and sets the type of the content visible in the picture stored in the current instance.

Implementation of: [IPicture](../interfaces/ipicture.md).[type](../interfaces/ipicture.md#type)

## Methods

### fromData

▸ `Static`**fromData**(`data`: [*ByteVector*](bytevector.md)): [*Picture*](picture.md)

Constructs and initializes a new instance from the data provided. The data is processed to
discover the type of the picture.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw bytes of the picture to store in the instance. Cannot be falsey    |

**Returns:** [*Picture*](picture.md)

___

### fromFileAbstraction

▸ `Static`**fromFileAbstraction**(`abstraction`: IFileAbstraction): [*Picture*](picture.md)

Constructs and initializes a new instance from a file abstraction. The description and type
of the file are determined by the name of the abstraction.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`abstraction` | IFileAbstraction | File abstraction to load the picture from.    |

**Returns:** [*Picture*](picture.md)

___

### fromFullData

▸ `Static`**fromFullData**(`data`: [*ByteVector*](bytevector.md), `type`: [*PictureType*](../enums/picturetype.md), `mimeType`: *string*, `description`: *string*): [*Picture*](picture.md)

Constructs a new instance with the data provided. No processing of the data is done.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw bytes of the picture to store in the instance. Cannot be falsey   |
`type` | [*PictureType*](../enums/picturetype.md) | Type of the picture. Cannot be null or undefined   |
`mimeType` | *string* | MimeType of the picture. Cannot be falsey   |
`description` | *string* | Description of the picture. Cannot be null or undefined    |

**Returns:** [*Picture*](picture.md)

___

### fromPath

▸ `Static`**fromPath**(`filePath`: *string*): [*Picture*](picture.md)

Constructs and initializes a new instance from a file located at the provided path. The type
and description of the picture are determined by the extension of the file. The file is
loaded completely.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`filePath` | *string* | Path to the file to use to use for the file    |

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
