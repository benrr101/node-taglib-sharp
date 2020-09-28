**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/id3v2/frames/attachmentFrame"](../modules/_src_id3v2_frames_attachmentframe_.md) / AttachmentFrame

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

*Defined in src/id3v2/frames/frame.ts:33*

## Accessors

### data

• get **data**(): [ByteVector](_src_bytevector_.bytevector.md)

*Defined in src/id3v2/frames/attachmentFrame.ts:129*

Gets the image data stored in the current instance.

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

• set **data**(`value`: [ByteVector](_src_bytevector_.bytevector.md)): void

*Defined in src/id3v2/frames/attachmentFrame.ts:136*

Sets the image data stored in the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [ByteVector](_src_bytevector_.bytevector.md) |

**Returns:** void

___

### description

• get **description**(): string

*Defined in src/id3v2/frames/attachmentFrame.ts:144*

Gets the description stored in the current instance.

**Returns:** string

• set **description**(`value`: string): void

*Defined in src/id3v2/frames/attachmentFrame.ts:152*

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

*Defined in src/id3v2/frames/frame.ts:55*

Gets the encryption ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the encryption identifer for the current instance or
    `undefined` if not set.

• set **encryptionId**(`value`: number \| undefined): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[encryptionId](_src_id3v2_frames_frame_.frame.md#encryptionid)*

*Defined in src/id3v2/frames/frame.ts:65*

Sets the encryption ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number \| undefined | Value containing the encryption identifier for the current instance. Must be an     8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID  |

**Returns:** void

number Value containing the encryption identifer for the current instance or
    `undefined` if not set.

___

### filename

• get **filename**(): string

*Defined in src/id3v2/frames/attachmentFrame.ts:160*

Gets a filename of the picture stored in the current instance.

**Returns:** string

• set **filename**(`value`: string): void

*Defined in src/id3v2/frames/attachmentFrame.ts:167*

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

*Defined in src/id3v2/frames/frame.ts:78*

Gets the frame flags applied to the current instance.

**Returns:** [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

• set **flags**(`value`: [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[flags](_src_id3v2_frames_frame_.frame.md#flags)*

*Defined in src/id3v2/frames/frame.ts:84*

Sets the frame flags applied to the current instance.
If the value includes either {@see Id3v2FrameFlags.Encryption} or
{@see Id3v2FrameFlags.Compression}, {@see render} will throw.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md) |

**Returns:** void

___

### frameClassType

• get **frameClassType**(): [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[frameClassType](_src_id3v2_frames_frame_.frame.md#frameclasstype)*

*Defined in src/id3v2/frames/attachmentFrame.ts:124*

**`inheritdoc`** 

**Returns:** [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

___

### frameId

• get **frameId**(): [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[frameId](_src_id3v2_frames_frame_.frame.md#frameid)*

*Defined in src/id3v2/frames/frame.ts:92*

Gets the frame ID for the current instance.

**Returns:** [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

FrameIdentifier Object representing of the identifier of the frame

___

### groupId

• get **groupId**(): number \| undefined

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[groupId](_src_id3v2_frames_frame_.frame.md#groupid)*

*Defined in src/id3v2/frames/frame.ts:99*

Gets the grouping ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

• set **groupId**(`value`: number \| undefined): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[groupId](_src_id3v2_frames_frame_.frame.md#groupid)*

*Defined in src/id3v2/frames/frame.ts:109*

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

*Defined in src/id3v2/frames/attachmentFrame.ts:175*

Gets the MimeType of the picture stored in the current instance.

**Returns:** string

• set **mimeType**(`value`: string): void

*Defined in src/id3v2/frames/attachmentFrame.ts:184*

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

*Defined in src/id3v2/frames/frame.ts:124*

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

**Returns:** number

___

### textEncoding

• get **textEncoding**(): [StringType](../enums/_src_bytevector_.stringtype.md)

*Defined in src/id3v2/frames/attachmentFrame.ts:193*

Gets the text encoding to use when storing the current instance.

**`value`** Text encoding to use when storing the current instance.

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

• set **textEncoding**(`value`: [StringType](../enums/_src_bytevector_.stringtype.md)): void

*Defined in src/id3v2/frames/attachmentFrame.ts:204*

Sets the text encoding to use when storing the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [StringType](../enums/_src_bytevector_.stringtype.md) | Text encoding to use when storing the current instance.     This encoding is overridden when rendering if     {@see Id3v2Settings.forceDefaultEncoding} is `true` or the render version does not     support it.  |

**Returns:** void

___

### type

• get **type**(): [PictureType](../enums/_src_picture_.picturetype.md)

*Defined in src/id3v2/frames/attachmentFrame.ts:212*

Gets the object type stored in the current instance.

**Returns:** [PictureType](../enums/_src_picture_.picturetype.md)

• set **type**(`value`: [PictureType](../enums/_src_picture_.picturetype.md)): void

*Defined in src/id3v2/frames/attachmentFrame.ts:221*

Sets the object type stored in the current instance.
For General Object Frame, use {@see PictureType.NotAPicture}. Other types will make it a
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

*Defined in src/id3v2/frames/attachmentFrame.ts:240*

**`inheritdoc`** 

**Returns:** [Frame](_src_id3v2_frames_frame_.frame.md)

___

### fieldData

▸ `Protected`**fieldData**(`frameData`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[fieldData](_src_id3v2_frames_frame_.frame.md#fielddata)*

*Defined in src/id3v2/frames/frame.ts:229*

Extracts the field data from the raw portion of an ID3v2 frame.
This method is necessary for extracting extra data prepended to the frame such the as
grouping ID.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frameData` | [ByteVector](_src_bytevector_.bytevector.md) | Raw frame data |
`offset` | number | Index at which the data is contained |
`version` | number | Version of the ID3v2 tag the data was originally encoded with  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### parseFields

▸ `Protected`**parseFields**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): void

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[parseFields](_src_id3v2_frames_frame_.frame.md#parsefields)*

*Defined in src/id3v2/frames/attachmentFrame.ts:297*

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

*Defined in src/id3v2/frames/frame.ts:140*

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

*Defined in src/id3v2/frames/attachmentFrame.ts:306*

#### Parameters:

Name | Type |
------ | ------ |
`version` | number |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### setData

▸ `Protected`**setData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `readHeader`: boolean, `version`: number): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[setData](_src_id3v2_frames_frame_.frame.md#setdata)*

*Defined in src/id3v2/frames/frame.ts:299*

Populates the current instance by reading the raw frame from disk, optionally reading the
header.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw ID3v2 frame |
`offset` | number | Offset in {@paramref data} at which the frame begins. |
`readHeader` | boolean | Whether or not to read the reader into the current instance. |
`version` | number | Version of the ID3v2 tag the data was encoded with  |

**Returns:** void

___

### toString

▸ **toString**(): string

*Defined in src/id3v2/frames/attachmentFrame.ts:282*

**Returns:** string

___

### correctEncoding

▸ `Static` `Protected`**correctEncoding**(`type`: [StringType](../enums/_src_bytevector_.stringtype.md), `version`: number): [StringType](../enums/_src_bytevector_.stringtype.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[correctEncoding](_src_id3v2_frames_frame_.frame.md#correctencoding)*

*Defined in src/id3v2/frames/frame.ts:209*

Converts an encoding to be a supported encoding for a specified tag version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [StringType](../enums/_src_bytevector_.stringtype.md) | Value containing the original encoding |
`version` | number | Value containing the ID3v2 version to be encoded. |

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

StringType Value containing the correct encoding to use, based on
    {@see Id3v2Settings.forceDefaultEncoding} and what is supported by
    {@paramref version}

___

### find

▸ `Static`**find**(`frames`: [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)[], `description?`: string, `type`: [PictureType](../enums/_src_picture_.picturetype.md)): [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

*Defined in src/id3v2/frames/attachmentFrame.ts:269*

Get a specified attachment frame from the specified tag, optionally creating it if it does
not exist.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`frames` | [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)[] | - | List of attachment frames to search |
`description?` | string | - | Description to match |
`type` | [PictureType](../enums/_src_picture_.picturetype.md) | PictureType.Other | Picture type to match |

**Returns:** [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

Matching frame or `undefined` if a match wasn't found and {@paramref create} is
    `false`

___

### fromFile

▸ `Static`**fromFile**(`file`: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md), `header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md), `frameStart`: number, `size`: number, `version`: number): [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

*Defined in src/id3v2/frames/attachmentFrame.ts:86*

Constructs and initializes a new attachment frame by populating it with the contents of a
section of a file. This constructor is only meant to be used by the {@see FrameFactory}
class. All loading is done lazily.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) | File to load frame data from |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) | ID3v2 frame header that defines the frame |
`frameStart` | number | Index into the file where the frame starts |
`size` | number | Length of the frame data |
`version` | number | ID3v2 version the frame was originally encoded with  |

**Returns:** [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md), `version`: number): [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

*Defined in src/id3v2/frames/attachmentFrame.ts:40*

Constructs and initializes a new attachment frame by reading its raw data in a specified
ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector containing the raw representation of the new frame |
`offset` | number | Index into {@paramref data} where the frame actually begins |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) | Header of the frame found at {@paramref offset} in the data |
`version` | number | ID3v2 version the frame was originally encoded with  |

**Returns:** [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

___

### fromPicture

▸ `Static`**fromPicture**(`picture`: [IPicture](../interfaces/_src_picture_.ipicture.md)): [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

*Defined in src/id3v2/frames/attachmentFrame.ts:65*

Constructs and initializes a new attachment frame by populating it with the contents of
another {@see IPicture} object.

**`description`** When a frame is created, it is not automatically added to the tag. Consider
    using {@see get} for more integrated frame creation.
    Additionally, see {@see Tag.pictures} provides a generic way of getting and setting
    attachments which is preferable to format specific code.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`picture` | [IPicture](../interfaces/_src_picture_.ipicture.md) | Value to use in the new instance. |

**Returns:** [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

*Defined in src/id3v2/frames/attachmentFrame.ts:110*

Constructs and initializes a new attachment frame by reading its raw data in a specified
Id3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector starting with the raw representation of the new frame |
`version` | number | ID3v2 version the raw frame is encoded with.  |

**Returns:** [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)
