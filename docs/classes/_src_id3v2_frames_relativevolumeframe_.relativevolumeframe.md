**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/frames/relativeVolumeFrame"](../modules/_src_id3v2_frames_relativevolumeframe_.md) / RelativeVolumeFrame

# Class: RelativeVolumeFrame

## Hierarchy

* [Frame](_src_id3v2_frames_frame_.frame.md)

  ↳ **RelativeVolumeFrame**

## Index

### Properties

* [\_header](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#_header)

### Accessors

* [channels](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#channels)
* [encryptionId](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#encryptionid)
* [flags](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#flags)
* [frameClassType](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#frameclasstype)
* [frameId](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#frameid)
* [groupId](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#groupid)
* [identification](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#identification)
* [size](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#size)

### Methods

* [clone](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#clone)
* [fieldData](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#fielddata)
* [getPeakBits](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#getpeakbits)
* [getPeakVolume](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#getpeakvolume)
* [getVolumeAdjustment](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#getvolumeadjustment)
* [parseFields](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#parsefields)
* [render](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#render)
* [renderFields](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#renderfields)
* [setData](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#setdata)
* [setPeakBits](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#setpeakbits)
* [setPeakVolume](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#setpeakvolume)
* [setVolumeAdjustment](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#setvolumeadjustment)
* [toString](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#tostring)
* [correctEncoding](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#correctencoding)
* [find](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#find)
* [fromIdentification](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#fromidentification)
* [fromOffsetRawData](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#fromoffsetrawdata)
* [fromRawData](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#fromrawdata)

## Properties

### \_header

• `Protected` **\_header**: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[_header](_src_id3v2_frames_frame_.frame.md#_header)*

## Accessors

### channels

• get **channels**(): [ChannelData](_src_id3v2_frames_relativevolumeframe_.channeldata.md)[]

Gets the channels in the current instance that have a value

**Returns:** [ChannelData](_src_id3v2_frames_relativevolumeframe_.channeldata.md)[]

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
[Id3v2FrameFlags.Compression](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md#compression), [render](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md#render) will throw.

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

### identification

• get **identification**(): string

Gets the identification used for the current instance

**Returns:** string

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

### getPeakBits

▸ **getPeakBits**(`type`: [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md)): number

Gets the number of bits used to encode the peak volume

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md) | Which channel to get the value for  |

**Returns:** number

___

### getPeakVolume

▸ **getPeakVolume**(`type`: [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md)): BigInt.BigInteger

Gets the peak volume for a specified channel

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md) | Which channel to get the value for  |

**Returns:** BigInt.BigInteger

___

### getVolumeAdjustment

▸ **getVolumeAdjustment**(`type`: [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md)): number

Gets the volume adjustment for the specified channel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md) | Which channel to get the value for |

**Returns:** number

number Volume adjustment for the channel, can be betweenInclusive -64 and +64 decibels

___

### parseFields

▸ `Protected`**parseFields**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `_version`: number): void

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[parseFields](_src_id3v2_frames_frame_.frame.md#parsefields)*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) |
`_version` | number |

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

▸ `Protected`**renderFields**(`_version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[renderFields](_src_id3v2_frames_frame_.frame.md#renderfields)*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`_version` | number |

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

### setPeakBits

▸ **setPeakBits**(`type`: [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md), `value`: number): void

Sets the number of bits used to encode peak volume for a specified channel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md) | Which channel to set the value for |
`value` | number | Peak volume  |

**Returns:** void

___

### setPeakVolume

▸ **setPeakVolume**(`type`: [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md), `value`: BigInt.BigInteger): void

Sets the peak volume for a specified channel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md) | Which channel to set the value for |
`value` | BigInt.BigInteger | Peak volume  |

**Returns:** void

___

### setVolumeAdjustment

▸ **setVolumeAdjustment**(`type`: [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md), `value`: number): void

Sets the volume adjustment in decibels for the specified channel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md) | Which channel to set the value for |
`value` | number | Volume adjustment in decibels. Must be betweenInclusive -64 and +64  |

**Returns:** void

___

### toString

▸ **toString**(): string

Creates a text description of the current instance

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

▸ `Static`**find**(`frames`: [RelativeVolumeFrame](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md)[], `identification`: string): [RelativeVolumeFrame](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md)

Gets a specified volume adjustment frame from the list of relative volume frames

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [RelativeVolumeFrame](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md)[] | List of frames to search |
`identification` | string | Identification to match |

**Returns:** [RelativeVolumeFrame](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md)

RelativeVolumeFrame Frame containing the matching user or `undefined` if a match was
    not found

___

### fromIdentification

▸ `Static`**fromIdentification**(`identification`: string): [RelativeVolumeFrame](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md)

Constructs and initializes a new instance with a specified identifier

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`identification` | string | Identification ot use for the new frame  |

**Returns:** [RelativeVolumeFrame](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md), `version`: number): [RelativeVolumeFrame](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version starting a specified offset.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`offset` | number | Offset into `data` where the frame actually begins. Must be a     positive, 32-bit integer |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) | Header of the frame found at `offset` in `data` |
`version` | number | ID3v2 version the frame was originally encoded with  |

**Returns:** [RelativeVolumeFrame](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): [RelativeVolumeFrame](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`version` | number | ID3v2 version the frame is encoded with. Must be a positive 8-bit integer.  |

**Returns:** [RelativeVolumeFrame](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md)
