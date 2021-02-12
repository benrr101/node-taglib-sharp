[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2AttachmentFrame

# Class: Id3v2AttachmentFrame

## Hierarchy

* [*Id3v2Frame*](id3v2frame.md)

  ↳ **Id3v2AttachmentFrame**

## Implements

* [*IPicture*](../interfaces/ipicture.md)

## Table of contents

### Properties

- [\_header](id3v2attachmentframe.md#_header)

### Accessors

- [data](id3v2attachmentframe.md#data)
- [description](id3v2attachmentframe.md#description)
- [encryptionId](id3v2attachmentframe.md#encryptionid)
- [filename](id3v2attachmentframe.md#filename)
- [flags](id3v2attachmentframe.md#flags)
- [frameClassType](id3v2attachmentframe.md#frameclasstype)
- [frameId](id3v2attachmentframe.md#frameid)
- [groupId](id3v2attachmentframe.md#groupid)
- [mimeType](id3v2attachmentframe.md#mimetype)
- [size](id3v2attachmentframe.md#size)
- [textEncoding](id3v2attachmentframe.md#textencoding)
- [type](id3v2attachmentframe.md#type)

### Methods

- [clone](id3v2attachmentframe.md#clone)
- [fieldData](id3v2attachmentframe.md#fielddata)
- [parseFields](id3v2attachmentframe.md#parsefields)
- [render](id3v2attachmentframe.md#render)
- [renderFields](id3v2attachmentframe.md#renderfields)
- [setData](id3v2attachmentframe.md#setdata)
- [toString](id3v2attachmentframe.md#tostring)
- [correctEncoding](id3v2attachmentframe.md#correctencoding)
- [find](id3v2attachmentframe.md#find)
- [fromFile](id3v2attachmentframe.md#fromfile)
- [fromOffsetRawData](id3v2attachmentframe.md#fromoffsetrawdata)
- [fromPicture](id3v2attachmentframe.md#frompicture)
- [fromRawData](id3v2attachmentframe.md#fromrawdata)

## Properties

### \_header

• `Protected` **\_header**: [*Id3v2FrameHeader*](id3v2frameheader.md)

Inherited from: [Id3v2Frame](id3v2frame.md).[_header](id3v2frame.md#_header)

## Accessors

### data

• **data**(): [*ByteVector*](bytevector.md)

Gets the image data stored in the current instance.

**Returns:** [*ByteVector*](bytevector.md)

Implementation of: [IPicture](../interfaces/ipicture.md).[data](../interfaces/ipicture.md#data)

• **data**(`value`: [*ByteVector*](bytevector.md)): *void*

Sets the image data stored in the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [*ByteVector*](bytevector.md) |

**Returns:** *void*

Implementation of: [IPicture](../interfaces/ipicture.md).[data](../interfaces/ipicture.md#data)

___

### description

• **description**(): *string*

Gets the description stored in the current instance.

**Returns:** *string*

Implementation of: [IPicture](../interfaces/ipicture.md).[description](../interfaces/ipicture.md#description)

• **description**(`value`: *string*): *void*

Sets the description stored in the current instance.
There should only be one frame with a matching description and type per tag.

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Implementation of: [IPicture](../interfaces/ipicture.md).[description](../interfaces/ipicture.md#description)

___

### encryptionId

• **encryptionId**(): *number*

Gets the encryption ID applied to the current instance.

**Returns:** *number*

number Value containing the encryption identifier for the current instance or
    `undefined` if not set.

• **encryptionId**(`value`: *number*): *void*

Sets the encryption ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *number* | Value containing the encryption identifier for the current instance. Must be an     8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID    |

**Returns:** *void*

number Value containing the encryption identifier for the current instance or
    `undefined` if not set.

___

### filename

• **filename**(): *string*

Gets a filename of the picture stored in the current instance.

**Returns:** *string*

Implementation of: [IPicture](../interfaces/ipicture.md).[filename](../interfaces/ipicture.md#filename)

• **filename**(`value`: *string*): *void*

Sets a filename of the picture stored in the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Implementation of: [IPicture](../interfaces/ipicture.md).[filename](../interfaces/ipicture.md#filename)

___

### flags

• **flags**(): [*Id3v2FrameFlags*](../enums/id3v2frameflags.md)

Gets the frame flags applied to the current instance.

**Returns:** [*Id3v2FrameFlags*](../enums/id3v2frameflags.md)

• **flags**(`value`: [*Id3v2FrameFlags*](../enums/id3v2frameflags.md)): *void*

Sets the frame flags applied to the current instance.
If the value includes either [Id3v2FrameFlags.Encryption](../enums/id3v2frameflags.md#encryption) or
[Id3v2FrameFlags.Compression](../enums/id3v2frameflags.md#compression), [render](id3v2attachmentframe.md#render) will throw.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [*Id3v2FrameFlags*](../enums/id3v2frameflags.md) |

**Returns:** *void*

___

### frameClassType

• **frameClassType**(): [*Id3v2FrameClassType*](../enums/id3v2frameclasstype.md)

**`inheritdoc`** 

**Returns:** [*Id3v2FrameClassType*](../enums/id3v2frameclasstype.md)

___

### frameId

• **frameId**(): [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)

Gets the frame ID for the current instance.

**Returns:** [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)

FrameIdentifier Object representing of the identifier of the frame

___

### groupId

• **groupId**(): *number*

Gets the grouping ID applied to the current instance.

**Returns:** *number*

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

• **groupId**(`value`: *number*): *void*

Sets the grouping ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *number* | Grouping identifier for the current instance. Must be a 8-bit unsigned integer.     Setting to `undefined` will remove the grouping identity header and ID    |

**Returns:** *void*

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

___

### mimeType

• **mimeType**(): *string*

Gets the MimeType of the picture stored in the current instance.

**Returns:** *string*

Implementation of: [IPicture](../interfaces/ipicture.md).[mimeType](../interfaces/ipicture.md#mimetype)

• **mimeType**(`value`: *string*): *void*

Sets the MimeType of the picture stored in the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *string* | MimeType of the picture stored in the current instance.    |

**Returns:** *void*

Implementation of: [IPicture](../interfaces/ipicture.md).[mimeType](../interfaces/ipicture.md#mimetype)

___

### size

• **size**(): *number*

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

**Returns:** *number*

___

### textEncoding

• **textEncoding**(): [*StringType*](../enums/stringtype.md)

Gets the text encoding to use when storing the current instance.

**`value`** Text encoding to use when storing the current instance.

**Returns:** [*StringType*](../enums/stringtype.md)

• **textEncoding**(`value`: [*StringType*](../enums/stringtype.md)): *void*

Sets the text encoding to use when storing the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [*StringType*](../enums/stringtype.md) | Text encoding to use when storing the current instance.     This encoding is overridden when rendering if     [Id3v2Settings.forceDefaultEncoding](id3v2settings.md#forcedefaultencoding) is `true` or the render version does not     support it.    |

**Returns:** *void*

___

### type

• **type**(): [*PictureType*](../enums/picturetype.md)

Gets the object type stored in the current instance.

**Returns:** [*PictureType*](../enums/picturetype.md)

Implementation of: [IPicture](../interfaces/ipicture.md).[type](../interfaces/ipicture.md#type)

• **type**(`value`: [*PictureType*](../enums/picturetype.md)): *void*

Sets the object type stored in the current instance.
For General Object Frame, use [PictureType.NotAPicture](../enums/picturetype.md#notapicture). Other types will make it a
Picture Frame.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [*PictureType*](../enums/picturetype.md) |

**Returns:** *void*

Implementation of: [IPicture](../interfaces/ipicture.md).[type](../interfaces/ipicture.md#type)

## Methods

### clone

▸ **clone**(): [*Id3v2Frame*](id3v2frame.md)

**`inheritdoc`** 

**Returns:** [*Id3v2Frame*](id3v2frame.md)

Overrides: [Id3v2Frame](id3v2frame.md)

___

### fieldData

▸ `Protected`**fieldData**(`frameData`: [*ByteVector*](bytevector.md), `offset`: *number*, `version`: *number*, `dataIncludesHeader`: *boolean*): [*ByteVector*](bytevector.md)

Extracts the field data from the raw portion of an ID3v2 frame.
This method is necessary for extracting extra data prepended to the frame such the as
grouping ID.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frameData` | [*ByteVector*](bytevector.md) | Raw frame data   |
`offset` | *number* | Index at which the data is contained   |
`version` | *number* | Version of the ID3v2 tag the data was originally encoded with   |
`dataIncludesHeader` | *boolean* | `true` if `frameData` includes the header, `false`     otherwise    |

**Returns:** [*ByteVector*](bytevector.md)

Inherited from: [Id3v2Frame](id3v2frame.md)

___

### parseFields

▸ `Protected`**parseFields**(`data`: [*ByteVector*](bytevector.md), `version`: *number*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`data` | [*ByteVector*](bytevector.md) |
`version` | *number* |

**Returns:** *void*

Overrides: [Id3v2Frame](id3v2frame.md)

___

### render

▸ **render**(`version`: *number*): [*ByteVector*](bytevector.md)

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | *number* | Version of ID3v2 to use when encoding the current instance    |

**Returns:** [*ByteVector*](bytevector.md)

Inherited from: [Id3v2Frame](id3v2frame.md)

___

### renderFields

▸ `Protected`**renderFields**(`version`: *number*): [*ByteVector*](bytevector.md)

#### Parameters:

Name | Type |
------ | ------ |
`version` | *number* |

**Returns:** [*ByteVector*](bytevector.md)

Overrides: [Id3v2Frame](id3v2frame.md)

___

### setData

▸ `Protected`**setData**(`data`: [*ByteVector*](bytevector.md), `offset`: *number*, `readHeader`: *boolean*, `version`: *number*): *void*

Populates the current instance by reading the raw frame from disk, optionally reading the
header.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw ID3v2 frame   |
`offset` | *number* | Offset in `data` at which the frame begins.   |
`readHeader` | *boolean* | Whether or not to read the reader into the current instance.   |
`version` | *number* | Version of the ID3v2 tag the data was encoded with    |

**Returns:** *void*

Inherited from: [Id3v2Frame](id3v2frame.md)

___

### toString

▸ **toString**(): *string*

**Returns:** *string*

___

### correctEncoding

▸ `Protected` `Static`**correctEncoding**(`type`: [*StringType*](../enums/stringtype.md), `version`: *number*): [*StringType*](../enums/stringtype.md)

Converts an encoding to be a supported encoding for a specified tag version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [*StringType*](../enums/stringtype.md) | Value containing the original encoding   |
`version` | *number* | Value containing the ID3v2 version to be encoded.   |

**Returns:** [*StringType*](../enums/stringtype.md)

StringType Value containing the correct encoding to use, based on
    [Id3v2Settings.forceDefaultEncoding](id3v2settings.md#forcedefaultencoding) and what is supported by
    `version`

Inherited from: [Id3v2Frame](id3v2frame.md)

___

### find

▸ `Static`**find**(`frames`: [*Id3v2AttachmentFrame*](id3v2attachmentframe.md)[], `description?`: *string*, `type?`: [*PictureType*](../enums/picturetype.md)): [*Id3v2AttachmentFrame*](id3v2attachmentframe.md)

Get a specified attachment frame from the specified tag, optionally creating it if it does
not exist.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`frames` | [*Id3v2AttachmentFrame*](id3v2attachmentframe.md)[] | - | List of attachment frames to search   |
`description?` | *string* | - | Description to match   |
`type` | [*PictureType*](../enums/picturetype.md) | ... | Picture type to match   |

**Returns:** [*Id3v2AttachmentFrame*](id3v2attachmentframe.md)

Matching frame or `undefined` if a match wasn't found and `create` is
    `false`

___

### fromFile

▸ `Static`**fromFile**(`file`: IFileAbstraction, `header`: [*Id3v2FrameHeader*](id3v2frameheader.md), `frameStart`: *number*, `size`: *number*, `version`: *number*): [*Id3v2AttachmentFrame*](id3v2attachmentframe.md)

Constructs and initializes a new attachment frame by populating it with the contents of a
section of a file. This constructor is only meant to be used internally. All loading is done
lazily.

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | IFileAbstraction | File to load frame data from   |
`header` | [*Id3v2FrameHeader*](id3v2frameheader.md) | ID3v2 frame header that defines the frame   |
`frameStart` | *number* | Index into the file where the frame starts   |
`size` | *number* | Length of the frame data   |
`version` | *number* | ID3v2 version the frame was originally encoded with   |

**Returns:** [*Id3v2AttachmentFrame*](id3v2attachmentframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [*ByteVector*](bytevector.md), `offset`: *number*, `header`: [*Id3v2FrameHeader*](id3v2frameheader.md), `version`: *number*): [*Id3v2AttachmentFrame*](id3v2attachmentframe.md)

Constructs and initializes a new attachment frame by reading its raw data in a specified
ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | ByteVector containing the raw representation of the new frame   |
`offset` | *number* | Index into `data` where the frame actually begins   |
`header` | [*Id3v2FrameHeader*](id3v2frameheader.md) | Header of the frame found at `offset` in the data   |
`version` | *number* | ID3v2 version the frame was originally encoded with    |

**Returns:** [*Id3v2AttachmentFrame*](id3v2attachmentframe.md)

___

### fromPicture

▸ `Static`**fromPicture**(`picture`: [*IPicture*](../interfaces/ipicture.md)): [*Id3v2AttachmentFrame*](id3v2attachmentframe.md)

Constructs and initializes a new attachment frame by populating it with the contents of
another [IPicture](../interfaces/ipicture.md) object.

**`remarks`** When a frame is created, it is not automatically added to the tag. Consider
    using [get](bytevector.md#get) for more integrated frame creation.
    Additionally, see [Tag.pictures](tag.md#pictures) provides a generic way of getting and setting
    attachments which is preferable to format specific code.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`picture` | [*IPicture*](../interfaces/ipicture.md) | Value to use in the new instance.   |

**Returns:** [*Id3v2AttachmentFrame*](id3v2attachmentframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [*ByteVector*](bytevector.md), `version`: *number*): [*Id3v2AttachmentFrame*](id3v2attachmentframe.md)

Constructs and initializes a new attachment frame by reading its raw data in a specified
Id3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | ByteVector starting with the raw representation of the new frame   |
`version` | *number* | ID3v2 version the raw frame is encoded with.    |

**Returns:** [*Id3v2AttachmentFrame*](id3v2attachmentframe.md)
