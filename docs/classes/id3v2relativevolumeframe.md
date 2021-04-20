[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2RelativeVolumeFrame

# Class: Id3v2RelativeVolumeFrame

## Hierarchy

* [*Id3v2Frame*](id3v2frame.md)

  ↳ **Id3v2RelativeVolumeFrame**

## Table of contents

### Properties

- [\_header](id3v2relativevolumeframe.md#_header)

### Accessors

- [channels](id3v2relativevolumeframe.md#channels)
- [encryptionId](id3v2relativevolumeframe.md#encryptionid)
- [flags](id3v2relativevolumeframe.md#flags)
- [frameClassType](id3v2relativevolumeframe.md#frameclasstype)
- [frameId](id3v2relativevolumeframe.md#frameid)
- [groupId](id3v2relativevolumeframe.md#groupid)
- [identification](id3v2relativevolumeframe.md#identification)
- [size](id3v2relativevolumeframe.md#size)

### Methods

- [clone](id3v2relativevolumeframe.md#clone)
- [fieldData](id3v2relativevolumeframe.md#fielddata)
- [getPeakBits](id3v2relativevolumeframe.md#getpeakbits)
- [getPeakVolume](id3v2relativevolumeframe.md#getpeakvolume)
- [getVolumeAdjustment](id3v2relativevolumeframe.md#getvolumeadjustment)
- [parseFields](id3v2relativevolumeframe.md#parsefields)
- [render](id3v2relativevolumeframe.md#render)
- [renderFields](id3v2relativevolumeframe.md#renderfields)
- [setData](id3v2relativevolumeframe.md#setdata)
- [setPeakBits](id3v2relativevolumeframe.md#setpeakbits)
- [setPeakVolume](id3v2relativevolumeframe.md#setpeakvolume)
- [setVolumeAdjustment](id3v2relativevolumeframe.md#setvolumeadjustment)
- [toString](id3v2relativevolumeframe.md#tostring)
- [correctEncoding](id3v2relativevolumeframe.md#correctencoding)
- [find](id3v2relativevolumeframe.md#find)
- [fromIdentification](id3v2relativevolumeframe.md#fromidentification)
- [fromOffsetRawData](id3v2relativevolumeframe.md#fromoffsetrawdata)
- [fromRawData](id3v2relativevolumeframe.md#fromrawdata)

## Properties

### \_header

• `Protected` **\_header**: [*Id3v2FrameHeader*](id3v2frameheader.md)

Inherited from: [Id3v2Frame](id3v2frame.md).[_header](id3v2frame.md#_header)

## Accessors

### channels

• **channels**(): [*Id3v2RelativeVolumeFrameChannelData*](id3v2relativevolumeframechanneldata.md)[]

Gets the channels in the current instance that have a value

**Returns:** [*Id3v2RelativeVolumeFrameChannelData*](id3v2relativevolumeframechanneldata.md)[]

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

### flags

• **flags**(): [*Id3v2FrameFlags*](../enums/id3v2frameflags.md)

Gets the frame flags applied to the current instance.

**Returns:** [*Id3v2FrameFlags*](../enums/id3v2frameflags.md)

• **flags**(`value`: [*Id3v2FrameFlags*](../enums/id3v2frameflags.md)): *void*

Sets the frame flags applied to the current instance.
If the value includes either [Id3v2FrameFlags.Encryption](../enums/id3v2frameflags.md#encryption) or
[Id3v2FrameFlags.Compression](../enums/id3v2frameflags.md#compression), [render](id3v2relativevolumeframe.md#render) will throw.

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

### identification

• **identification**(): *string*

Gets the identification used for the current instance

**Returns:** *string*

___

### size

• **size**(): *number*

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

**Returns:** *number*

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

### getPeakBits

▸ **getPeakBits**(`type`: [*Id3v2RelativeVolumeFrameChannelType*](../enums/id3v2relativevolumeframechanneltype.md)): *number*

Gets the number of bits used to encode the peak volume

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [*Id3v2RelativeVolumeFrameChannelType*](../enums/id3v2relativevolumeframechanneltype.md) | Which channel to get the value for    |

**Returns:** *number*

___

### getPeakVolume

▸ **getPeakVolume**(`type`: [*Id3v2RelativeVolumeFrameChannelType*](../enums/id3v2relativevolumeframechanneltype.md)): *bigint*

Gets the peak volume for a specified channel

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [*Id3v2RelativeVolumeFrameChannelType*](../enums/id3v2relativevolumeframechanneltype.md) | Which channel to get the value for    |

**Returns:** *bigint*

___

### getVolumeAdjustment

▸ **getVolumeAdjustment**(`type`: [*Id3v2RelativeVolumeFrameChannelType*](../enums/id3v2relativevolumeframechanneltype.md)): *number*

Gets the volume adjustment for the specified channel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [*Id3v2RelativeVolumeFrameChannelType*](../enums/id3v2relativevolumeframechanneltype.md) | Which channel to get the value for   |

**Returns:** *number*

number Volume adjustment for the channel, can be betweenInclusive -64 and +64 decibels

___

### parseFields

▸ `Protected`**parseFields**(`data`: [*ByteVector*](bytevector.md), `_version`: *number*): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`data` | [*ByteVector*](bytevector.md) |
`_version` | *number* |

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

▸ `Protected`**renderFields**(`_version`: *number*): [*ByteVector*](bytevector.md)

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`_version` | *number* |

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

### setPeakBits

▸ **setPeakBits**(`type`: [*Id3v2RelativeVolumeFrameChannelType*](../enums/id3v2relativevolumeframechanneltype.md), `value`: *number*): *void*

Sets the number of bits used to encode peak volume for a specified channel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [*Id3v2RelativeVolumeFrameChannelType*](../enums/id3v2relativevolumeframechanneltype.md) | Which channel to set the value for   |
`value` | *number* | Peak volume    |

**Returns:** *void*

___

### setPeakVolume

▸ **setPeakVolume**(`type`: [*Id3v2RelativeVolumeFrameChannelType*](../enums/id3v2relativevolumeframechanneltype.md), `value`: *bigint*): *void*

Sets the peak volume for a specified channel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [*Id3v2RelativeVolumeFrameChannelType*](../enums/id3v2relativevolumeframechanneltype.md) | Which channel to set the value for   |
`value` | *bigint* | Peak volume    |

**Returns:** *void*

___

### setVolumeAdjustment

▸ **setVolumeAdjustment**(`type`: [*Id3v2RelativeVolumeFrameChannelType*](../enums/id3v2relativevolumeframechanneltype.md), `value`: *number*): *void*

Sets the volume adjustment in decibels for the specified channel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [*Id3v2RelativeVolumeFrameChannelType*](../enums/id3v2relativevolumeframechanneltype.md) | Which channel to set the value for   |
`value` | *number* | Volume adjustment in decibels. Must be betweenInclusive -64 and +64    |

**Returns:** *void*

___

### toString

▸ **toString**(): *string*

Creates a text description of the current instance

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

▸ `Static`**find**(`frames`: [*Id3v2RelativeVolumeFrame*](id3v2relativevolumeframe.md)[], `identification`: *string*): [*Id3v2RelativeVolumeFrame*](id3v2relativevolumeframe.md)

Gets a specified volume adjustment frame from the list of relative volume frames

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [*Id3v2RelativeVolumeFrame*](id3v2relativevolumeframe.md)[] | List of frames to search   |
`identification` | *string* | Identification to match   |

**Returns:** [*Id3v2RelativeVolumeFrame*](id3v2relativevolumeframe.md)

RelativeVolumeFrame Frame containing the matching user or `undefined` if a match was
    not found

___

### fromIdentification

▸ `Static`**fromIdentification**(`identification`: *string*): [*Id3v2RelativeVolumeFrame*](id3v2relativevolumeframe.md)

Constructs and initializes a new instance with a specified identifier

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`identification` | *string* | Identification ot use for the new frame    |

**Returns:** [*Id3v2RelativeVolumeFrame*](id3v2relativevolumeframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [*ByteVector*](bytevector.md), `offset`: *number*, `header`: [*Id3v2FrameHeader*](id3v2frameheader.md), `version`: *number*): [*Id3v2RelativeVolumeFrame*](id3v2relativevolumeframe.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version starting a specified offset.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw representation of the new frame   |
`offset` | *number* | Offset into `data` where the frame actually begins. Must be a     positive, 32-bit integer   |
`header` | [*Id3v2FrameHeader*](id3v2frameheader.md) | Header of the frame found at `offset` in `data`   |
`version` | *number* | ID3v2 version the frame was originally encoded with    |

**Returns:** [*Id3v2RelativeVolumeFrame*](id3v2relativevolumeframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [*ByteVector*](bytevector.md), `version`: *number*): [*Id3v2RelativeVolumeFrame*](id3v2relativevolumeframe.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw representation of the new frame   |
`version` | *number* | ID3v2 version the frame is encoded with. Must be a positive 8-bit integer.    |

**Returns:** [*Id3v2RelativeVolumeFrame*](id3v2relativevolumeframe.md)
