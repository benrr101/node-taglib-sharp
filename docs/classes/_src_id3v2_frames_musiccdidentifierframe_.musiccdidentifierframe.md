**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/frames/musicCdIdentifierFrame"](../modules/_src_id3v2_frames_musiccdidentifierframe_.md) / MusicCdIdentifierFrame

# Class: MusicCdIdentifierFrame

Class extends [Frame](_src_id3v2_frames_frame_.frame.md), implementing support for ID3v2 Music CD Identifier (MCDI) frames.
Music CD identifier frames should contain the table of contents data as stored on the physical
CD. It is primarily used for track information lookup through web sources like CDDB.

## Hierarchy

* [Frame](_src_id3v2_frames_frame_.frame.md)

  ↳ **MusicCdIdentifierFrame**

## Index

### Properties

* [\_header](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#_header)

### Accessors

* [data](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#data)
* [encryptionId](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#encryptionid)
* [flags](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#flags)
* [frameClassType](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#frameclasstype)
* [frameId](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#frameid)
* [groupId](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#groupid)
* [size](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#size)

### Methods

* [clone](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#clone)
* [fieldData](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#fielddata)
* [parseFields](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#parsefields)
* [render](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#render)
* [renderFields](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#renderfields)
* [setData](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#setdata)
* [correctEncoding](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#correctencoding)
* [fromOffsetRawData](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#fromoffsetrawdata)
* [fromRawData](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#fromrawdata)

## Properties

### \_header

• `Protected` **\_header**: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[_header](_src_id3v2_frames_frame_.frame.md#_header)*

## Accessors

### data

• get **data**(): [ByteVector](_src_bytevector_.bytevector.md)

Gets the identifier data stored in the current instance

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

• set **data**(`value`: [ByteVector](_src_bytevector_.bytevector.md)): void

Sets the identifier data stored in the current instance

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector containing the identifier stored in the current instance  |

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

### flags

• get **flags**(): [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[flags](_src_id3v2_frames_frame_.frame.md#flags)*

Gets the frame flags applied to the current instance.

**Returns:** [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

• set **flags**(`value`: [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[flags](_src_id3v2_frames_frame_.frame.md#flags)*

Sets the frame flags applied to the current instance.
If the value includes either [Id3v2FrameFlags.Encryption](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md#encryption) or
[Id3v2FrameFlags.Compression](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md#compression), [render](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md#render) will throw.

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

### size

• get **size**(): number

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[size](_src_id3v2_frames_frame_.frame.md#size)*

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

**Returns:** number

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

Populates the values in the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector containing the extracted field data. |
`version` | number | Ignored.  |

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

Renders the value in current instance into field data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | number | Ignored.  |

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

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md), `version`: number): [MusicCdIdentifierFrame](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md)

Constructs and initializes a new instance of MusicCdIdentifier frame by reading its raw data
in a specified ID3v2 version starting at a specified offset.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame. |
`offset` | number | Offset into `data` where the frame actually begins. Must be a     positive, safe integer |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) | Header of the frame found at `offset` in the data |
`version` | number | ID3v2 version the frame was originally encoded with  |

**Returns:** [MusicCdIdentifierFrame](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): [MusicCdIdentifierFrame](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md)

Constructs and initializes a new instance of MusicCdIdentifierFrame by reading its raw data
in a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector object starting with the raw representation of the new frame |
`version` | number | The ID3v2 version the raw frame is encoded in. Must be positive 8-bit integer  |

**Returns:** [MusicCdIdentifierFrame](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md)
