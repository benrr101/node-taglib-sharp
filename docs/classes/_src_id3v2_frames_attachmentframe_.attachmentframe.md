**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/frames/attachmentFrame"](../modules/_src_id3v2_frames_attachmentframe_.md) / AttachmentFrame

# Class: AttachmentFrame

## Hierarchy

* [Frame](_src_id3v2_frames_frame_.frame.md)

  ↳ **AttachmentFrame**

## Implements

* [IPicture](../interfaces/_src_picture_.ipicture.md)

## Index

### Properties

* [\_header](_src_id3v2_frames_attachmentframe_.attachmentframe.md#_header)

### Accessors

* [data](_src_id3v2_frames_attachmentframe_.attachmentframe.md#data)
* [description](_src_id3v2_frames_attachmentframe_.attachmentframe.md#description)
* [encryptionId](_src_id3v2_frames_attachmentframe_.attachmentframe.md#encryptionid)
* [filename](_src_id3v2_frames_attachmentframe_.attachmentframe.md#filename)
* [flags](_src_id3v2_frames_attachmentframe_.attachmentframe.md#flags)
* [frameClassType](_src_id3v2_frames_attachmentframe_.attachmentframe.md#frameclasstype)
* [frameId](_src_id3v2_frames_attachmentframe_.attachmentframe.md#frameid)
* [groupId](_src_id3v2_frames_attachmentframe_.attachmentframe.md#groupid)
* [mimeType](_src_id3v2_frames_attachmentframe_.attachmentframe.md#mimetype)
* [size](_src_id3v2_frames_attachmentframe_.attachmentframe.md#size)
* [textEncoding](_src_id3v2_frames_attachmentframe_.attachmentframe.md#textencoding)
* [type](_src_id3v2_frames_attachmentframe_.attachmentframe.md#type)

### Methods

* [clone](_src_id3v2_frames_attachmentframe_.attachmentframe.md#clone)
* [fieldData](_src_id3v2_frames_attachmentframe_.attachmentframe.md#fielddata)
* [parseFields](_src_id3v2_frames_attachmentframe_.attachmentframe.md#parsefields)
* [render](_src_id3v2_frames_attachmentframe_.attachmentframe.md#render)
* [renderFields](_src_id3v2_frames_attachmentframe_.attachmentframe.md#renderfields)
* [setData](_src_id3v2_frames_attachmentframe_.attachmentframe.md#setdata)
* [toString](_src_id3v2_frames_attachmentframe_.attachmentframe.md#tostring)
* [correctEncoding](_src_id3v2_frames_attachmentframe_.attachmentframe.md#correctencoding)
* [find](_src_id3v2_frames_attachmentframe_.attachmentframe.md#find)
* [fromFile](_src_id3v2_frames_attachmentframe_.attachmentframe.md#fromfile)
* [fromOffsetRawData](_src_id3v2_frames_attachmentframe_.attachmentframe.md#fromoffsetrawdata)
* [fromPicture](_src_id3v2_frames_attachmentframe_.attachmentframe.md#frompicture)
* [fromRawData](_src_id3v2_frames_attachmentframe_.attachmentframe.md#fromrawdata)

## Properties

### \_header

• `Protected` **\_header**: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[_header](_src_id3v2_frames_frame_.frame.md#_header)*

## Accessors

### data

• get **data**(): [ByteVector](_src_bytevector_.bytevector.md)

Gets the image data stored in the current instance.

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

• set **data**(`value`: [ByteVector](_src_bytevector_.bytevector.md)): void

Sets the image data stored in the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [ByteVector](_src_bytevector_.bytevector.md) |

**Returns:** void

___

### description

• get **description**(): string

Gets the description stored in the current instance.

**Returns:** string

• set **description**(`value`: string): void

Sets the description stored in the current instance.
There should only be one frame with a matching description and type per tag.

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### encryptionId

• get **encryptionId**(): number \| undefined

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[encryptionId](_src_id3v2_frames_frame_.frame.md#encryptionid)*

Gets the encryption ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the encryption identifier for the current instance or
    `undefined` if not set.

• set **encryptionId**(`value`: number \| undefined): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[encryptionId](_src_id3v2_frames_frame_.frame.md#encryptionid)*

Sets the encryption ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number \| undefined | Value containing the encryption identifier for the current instance. Must be an     8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID  |

**Returns:** void

number Value containing the encryption identifier for the current instance or
    `undefined` if not set.

___

### filename

• get **filename**(): string

Gets a filename of the picture stored in the current instance.

**Returns:** string

• set **filename**(`value`: string): void

Sets a filename of the picture stored in the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### flags

• get **flags**(): [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[flags](_src_id3v2_frames_frame_.frame.md#flags)*

Gets the frame flags applied to the current instance.

**Returns:** [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

• set **flags**(`value`: [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[flags](_src_id3v2_frames_frame_.frame.md#flags)*

Sets the frame flags applied to the current instance.
If the value includes either [Id3v2FrameFlags.Encryption](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md#encryption) or
[Id3v2FrameFlags.Compression](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md#compression), [render](_src_id3v2_frames_attachmentframe_.attachmentframe.md#render) will throw.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md) |

**Returns:** void

___

### frameClassType

• get **frameClassType**(): [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[frameClassType](_src_id3v2_frames_frame_.frame.md#frameclasstype)*

**`inheritdoc`** 

**Returns:** [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

___

### frameId

• get **frameId**(): [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[frameId](_src_id3v2_frames_frame_.frame.md#frameid)*

Gets the frame ID for the current instance.

**Returns:** [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

FrameIdentifier Object representing of the identifier of the frame

___

### groupId

• get **groupId**(): number \| undefined

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[groupId](_src_id3v2_frames_frame_.frame.md#groupid)*

Gets the grouping ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

• set **groupId**(`value`: number \| undefined): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[groupId](_src_id3v2_frames_frame_.frame.md#groupid)*

Sets the grouping ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number \| undefined | Grouping identifier for the current instance. Must be a 8-bit unsigned integer.     Setting to `undefined` will remove the grouping identity header and ID  |

**Returns:** void

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

___

### mimeType

• get **mimeType**(): string

Gets the MimeType of the picture stored in the current instance.

**Returns:** string

• set **mimeType**(`value`: string): void

Sets the MimeType of the picture stored in the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | string | MimeType of the picture stored in the current instance.  |

**Returns:** void

___

### size

• get **size**(): number

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[size](_src_id3v2_frames_frame_.frame.md#size)*

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

**Returns:** number

___

### textEncoding

• get **textEncoding**(): [StringType](../enums/_src_bytevector_.stringtype.md)

Gets the text encoding to use when storing the current instance.

**`value`** Text encoding to use when storing the current instance.

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

• set **textEncoding**(`value`: [StringType](../enums/_src_bytevector_.stringtype.md)): void

Sets the text encoding to use when storing the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [StringType](../enums/_src_bytevector_.stringtype.md) | Text encoding to use when storing the current instance.     This encoding is overridden when rendering if     [Id3v2Settings.forceDefaultEncoding](_src_id3v2_id3v2settings_.id3v2settings.md#forcedefaultencoding) is `true` or the render version does not     support it.  |

**Returns:** void

___

### type

• get **type**(): [PictureType](../enums/_src_picture_.picturetype.md)

Gets the object type stored in the current instance.

**Returns:** [PictureType](../enums/_src_picture_.picturetype.md)

• set **type**(`value`: [PictureType](../enums/_src_picture_.picturetype.md)): void

Sets the object type stored in the current instance.
For General Object Frame, use [PictureType.NotAPicture](../enums/_src_picture_.picturetype.md#notapicture). Other types will make it a
Picture Frame.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [PictureType](../enums/_src_picture_.picturetype.md) |

**Returns:** void

## Methods

### clone

▸ **clone**(): [Frame](_src_id3v2_frames_frame_.frame.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[clone](_src_id3v2_frames_frame_.frame.md#clone)*

**`inheritdoc`** 

**Returns:** [Frame](_src_id3v2_frames_frame_.frame.md)

___

### fieldData

▸ `Protected`**fieldData**(`frameData`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `version`: number, `dataIncludesHeader`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[fieldData](_src_id3v2_frames_frame_.frame.md#fielddata)*

Extracts the field data from the raw portion of an ID3v2 frame.
This method is necessary for extracting extra data prepended to the frame such the as
grouping ID.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frameData` | [ByteVector](_src_bytevector_.bytevector.md) | Raw frame data |
`offset` | number | Index at which the data is contained |
`version` | number | Version of the ID3v2 tag the data was originally encoded with |
`dataIncludesHeader` | boolean | `true` if `frameData` includes the header, `false`     otherwise  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### parseFields

▸ `Protected`**parseFields**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): void

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[parseFields](_src_id3v2_frames_frame_.frame.md#parsefields)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) |
`version` | number |

**Returns:** void

___

### render

▸ **render**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[render](_src_id3v2_frames_frame_.frame.md#render)*

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | number | Version of ID3v2 to use when encoding the current instance  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### renderFields

▸ `Protected`**renderFields**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[renderFields](_src_id3v2_frames_frame_.frame.md#renderfields)*

#### Parameters:

Name | Type |
------ | ------ |
`version` | number |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### setData

▸ `Protected`**setData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `readHeader`: boolean, `version`: number): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[setData](_src_id3v2_frames_frame_.frame.md#setdata)*

Populates the current instance by reading the raw frame from disk, optionally reading the
header.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw ID3v2 frame |
`offset` | number | Offset in `data` at which the frame begins. |
`readHeader` | boolean | Whether or not to read the reader into the current instance. |
`version` | number | Version of the ID3v2 tag the data was encoded with  |

**Returns:** void

___

### toString

▸ **toString**(): string

**Returns:** string

___

### correctEncoding

▸ `Static` `Protected`**correctEncoding**(`type`: [StringType](../enums/_src_bytevector_.stringtype.md), `version`: number): [StringType](../enums/_src_bytevector_.stringtype.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[correctEncoding](_src_id3v2_frames_frame_.frame.md#correctencoding)*

Converts an encoding to be a supported encoding for a specified tag version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [StringType](../enums/_src_bytevector_.stringtype.md) | Value containing the original encoding |
`version` | number | Value containing the ID3v2 version to be encoded. |

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

StringType Value containing the correct encoding to use, based on
    [Id3v2Settings.forceDefaultEncoding](_src_id3v2_id3v2settings_.id3v2settings.md#forcedefaultencoding) and what is supported by
    `version`

___

### find

▸ `Static`**find**(`frames`: [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)[], `description?`: string, `type?`: [PictureType](../enums/_src_picture_.picturetype.md)): [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

Get a specified attachment frame from the specified tag, optionally creating it if it does
not exist.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`frames` | [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)[] | - | List of attachment frames to search |
`description?` | string | - | Description to match |
`type` | [PictureType](../enums/_src_picture_.picturetype.md) | PictureType.Other | Picture type to match |

**Returns:** [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

Matching frame or `undefined` if a match wasn't found and `create` is
    `false`

___

### fromFile

▸ `Static`**fromFile**(`file`: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md), `header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md), `frameStart`: number, `size`: number, `version`: number): [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

Constructs and initializes a new attachment frame by populating it with the contents of a
section of a file. This constructor is only meant to be used internally. All loading is done
lazily.

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) | File to load frame data from |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) | ID3v2 frame header that defines the frame |
`frameStart` | number | Index into the file where the frame starts |
`size` | number | Length of the frame data |
`version` | number | ID3v2 version the frame was originally encoded with |

**Returns:** [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md), `version`: number): [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

Constructs and initializes a new attachment frame by reading its raw data in a specified
ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector containing the raw representation of the new frame |
`offset` | number | Index into `data` where the frame actually begins |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) | Header of the frame found at `offset` in the data |
`version` | number | ID3v2 version the frame was originally encoded with  |

**Returns:** [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

___

### fromPicture

▸ `Static`**fromPicture**(`picture`: [IPicture](../interfaces/_src_picture_.ipicture.md)): [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

Constructs and initializes a new attachment frame by populating it with the contents of
another [IPicture](../interfaces/_src_picture_.ipicture.md) object.

**`description`** When a frame is created, it is not automatically added to the tag. Consider
    using [get](_src_bytevector_.bytevector.md#get) for more integrated frame creation.
    Additionally, see [Tag.pictures](_src_tag_.tag.md#pictures) provides a generic way of getting and setting
    attachments which is preferable to format specific code.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`picture` | [IPicture](../interfaces/_src_picture_.ipicture.md) | Value to use in the new instance. |

**Returns:** [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

Constructs and initializes a new attachment frame by reading its raw data in a specified
Id3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector starting with the raw representation of the new frame |
`version` | number | ID3v2 version the raw frame is encoded with.  |

**Returns:** [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)
