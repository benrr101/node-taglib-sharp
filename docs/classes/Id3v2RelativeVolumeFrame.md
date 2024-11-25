[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2RelativeVolumeFrame

# Class: Id3v2RelativeVolumeFrame

Extends Frame, implementing support for ID3v2 relative volume (RVA2) frames.

## Hierarchy

- [`Id3v2Frame`](Id3v2Frame.md)

  ↳ **`Id3v2RelativeVolumeFrame`**

## Table of contents

### Accessors

- [channels](Id3v2RelativeVolumeFrame.md#channels)
- [encryptionId](Id3v2RelativeVolumeFrame.md#encryptionid)
- [flags](Id3v2RelativeVolumeFrame.md#flags)
- [frameClassType](Id3v2RelativeVolumeFrame.md#frameclasstype)
- [frameId](Id3v2RelativeVolumeFrame.md#frameid)
- [groupId](Id3v2RelativeVolumeFrame.md#groupid)
- [header](Id3v2RelativeVolumeFrame.md#header)
- [identification](Id3v2RelativeVolumeFrame.md#identification)
- [size](Id3v2RelativeVolumeFrame.md#size)

### Methods

- [clone](Id3v2RelativeVolumeFrame.md#clone)
- [fieldData](Id3v2RelativeVolumeFrame.md#fielddata)
- [getPeakBits](Id3v2RelativeVolumeFrame.md#getpeakbits)
- [getPeakVolume](Id3v2RelativeVolumeFrame.md#getpeakvolume)
- [getVolumeAdjustment](Id3v2RelativeVolumeFrame.md#getvolumeadjustment)
- [parseFields](Id3v2RelativeVolumeFrame.md#parsefields)
- [render](Id3v2RelativeVolumeFrame.md#render)
- [renderFields](Id3v2RelativeVolumeFrame.md#renderfields)
- [setData](Id3v2RelativeVolumeFrame.md#setdata)
- [setPeakBits](Id3v2RelativeVolumeFrame.md#setpeakbits)
- [setPeakVolume](Id3v2RelativeVolumeFrame.md#setpeakvolume)
- [setVolumeAdjustment](Id3v2RelativeVolumeFrame.md#setvolumeadjustment)
- [toString](Id3v2RelativeVolumeFrame.md#tostring)
- [correctEncoding](Id3v2RelativeVolumeFrame.md#correctencoding)
- [find](Id3v2RelativeVolumeFrame.md#find)
- [fromIdentification](Id3v2RelativeVolumeFrame.md#fromidentification)
- [fromOffsetRawData](Id3v2RelativeVolumeFrame.md#fromoffsetrawdata)
- [fromRawData](Id3v2RelativeVolumeFrame.md#fromrawdata)

## Accessors

### channels

• `get` **channels**(): [`Id3v2RelativeVolumeFrameChannelData`](Id3v2RelativeVolumeFrameChannelData.md)[]

Gets the channels in the current instance that have a value

#### Returns

[`Id3v2RelativeVolumeFrameChannelData`](Id3v2RelativeVolumeFrameChannelData.md)[]

___

### encryptionId

• `get` **encryptionId**(): `number`

Gets the encryption ID applied to the current instance.

#### Returns

`number`

Value containing the encryption identifier for the current instance or
    `undefined` if not set.

#### Inherited from

Frame.encryptionId

• `set` **encryptionId**(`value`): `void`

Sets the encryption ID applied to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Value containing the encryption identifier for the current instance. Must be an 8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID |

#### Returns

`void`

#### Inherited from

Frame.encryptionId

___

### flags

• `get` **flags**(): [`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md)

Gets the frame flags applied to the current instance.

#### Returns

[`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md)

#### Inherited from

Frame.flags

• `set` **flags**(`value`): `void`

Sets the frame flags applied to the current instance.
If the value includes either [Encryption](../enums/Id3v2FrameFlags.md#encryption) or
[Compression](../enums/Id3v2FrameFlags.md#compression), [render](Id3v2RelativeVolumeFrame.md#render) will throw.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md) |

#### Returns

`void`

#### Inherited from

Frame.flags

___

### frameClassType

• `get` **frameClassType**(): [`Id3v2FrameClassType`](../enums/Id3v2FrameClassType.md)

Gets a flag indicating which type of frame the current instance is.

#### Returns

[`Id3v2FrameClassType`](../enums/Id3v2FrameClassType.md)

#### Overrides

Frame.frameClassType

___

### frameId

• `get` **frameId**(): [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md)

Gets the frame ID for the current instance.

#### Returns

[`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md)

Object representing of the identifier of the frame

#### Inherited from

Frame.frameId

___

### groupId

• `get` **groupId**(): `number`

Gets the grouping ID applied to the current instance.

#### Returns

`number`

Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

#### Inherited from

Frame.groupId

• `set` **groupId**(`value`): `void`

Sets the grouping ID applied to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Grouping identifier for the current instance. Must be an 8-bit unsigned integer. Setting to `undefined` will remove the grouping identity header and ID |

#### Returns

`void`

#### Inherited from

Frame.groupId

___

### header

• `Protected` `get` **header**(): [`Id3v2FrameHeader`](Id3v2FrameHeader.md)

Gets the header for the frame. For new frames this should not exist.

#### Returns

[`Id3v2FrameHeader`](Id3v2FrameHeader.md)

#### Inherited from

Frame.header

• `Protected` `set` **header**(`value`): `void`

Sets the header for the frame.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Id3v2FrameHeader`](Id3v2FrameHeader.md) | Header for the frame |

#### Returns

`void`

#### Inherited from

Frame.header

___

### identification

• `get` **identification**(): `string`

Gets the identification used for the current instance

#### Returns

`string`

___

### size

• `get` **size**(): `number`

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

#### Returns

`number`

#### Inherited from

Frame.size

## Methods

### clone

▸ **clone**(): [`Id3v2Frame`](Id3v2Frame.md)

Creates a deep copy of the current instance.
This method is implemented by rendering the current instance as an ID3v2.4 frame and using
the frame factory to create a new frame. As such, this method should be overridden by child
classes.

#### Returns

[`Id3v2Frame`](Id3v2Frame.md)

#### Overrides

[Id3v2Frame](Id3v2Frame.md).[clone](Id3v2Frame.md#clone)

___

### fieldData

▸ `Protected` **fieldData**(`frameData`, `offset`, `version`, `dataIncludesHeader`): [`ByteVector`](ByteVector.md)

Extracts the field data from the raw portion of an ID3v2 frame.
This method is necessary for extracting extra data prepended to the frame such the as
grouping ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frameData` | [`ByteVector`](ByteVector.md) | Raw frame data |
| `offset` | `number` | Index at which the data is contained |
| `version` | `number` | Version of the ID3v2 tag the data was originally encoded with |
| `dataIncludesHeader` | `boolean` | `true` if `frameData` includes the header, `false` otherwise |

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

[Id3v2Frame](Id3v2Frame.md).[fieldData](Id3v2Frame.md#fielddata)

___

### getPeakBits

▸ **getPeakBits**(`type`): `number`

Gets the number of bits used to encode the peak volume

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`Id3v2RelativeVolumeFrameChannelType`](../enums/Id3v2RelativeVolumeFrameChannelType.md) | Which channel to get the value for |

#### Returns

`number`

___

### getPeakVolume

▸ **getPeakVolume**(`type`): `bigint`

Gets the peak volume for a specified channel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`Id3v2RelativeVolumeFrameChannelType`](../enums/Id3v2RelativeVolumeFrameChannelType.md) | Which channel to get the value for |

#### Returns

`bigint`

___

### getVolumeAdjustment

▸ **getVolumeAdjustment**(`type`): `number`

Gets the volume adjustment for the specified channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`Id3v2RelativeVolumeFrameChannelType`](../enums/Id3v2RelativeVolumeFrameChannelType.md) | Which channel to get the value for |

#### Returns

`number`

Volume adjustment for the channel, can be betweenInclusive -64 and +64 decibels

___

### parseFields

▸ `Protected` **parseFields**(`data`): `void`

Populates the values in this frame by parsing its field data in a specified version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Extracted field data |

#### Returns

`void`

#### Overrides

[Id3v2Frame](Id3v2Frame.md).[parseFields](Id3v2Frame.md#parsefields)

___

### render

▸ **render**(`version`): [`ByteVector`](ByteVector.md)

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | Version of ID3v2 to use when encoding the current instance |

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

[Id3v2Frame](Id3v2Frame.md).[render](Id3v2Frame.md#render)

___

### renderFields

▸ `Protected` **renderFields**(): [`ByteVector`](ByteVector.md)

Renders the values in the current instance into field data for a specified version.

#### Returns

[`ByteVector`](ByteVector.md)

#### Overrides

[Id3v2Frame](Id3v2Frame.md).[renderFields](Id3v2Frame.md#renderfields)

___

### setData

▸ `Protected` **setData**(`data`, `offset`, `readHeader`, `version`): `void`

Populates the current instance by reading the raw frame from disk, optionally reading the
header.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw ID3v2 frame |
| `offset` | `number` | Offset in `data` at which the frame begins. |
| `readHeader` | `boolean` | Whether or not to read the reader into the current instance. |
| `version` | `number` | Version of the ID3v2 tag the data was encoded with |

#### Returns

`void`

#### Inherited from

[Id3v2Frame](Id3v2Frame.md).[setData](Id3v2Frame.md#setdata)

___

### setPeakBits

▸ **setPeakBits**(`type`, `value`): `void`

Sets the number of bits used to encode peak volume for a specified channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`Id3v2RelativeVolumeFrameChannelType`](../enums/Id3v2RelativeVolumeFrameChannelType.md) | Which channel to set the value for |
| `value` | `number` | Peak volume |

#### Returns

`void`

___

### setPeakVolume

▸ **setPeakVolume**(`type`, `value`): `void`

Sets the peak volume for a specified channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`Id3v2RelativeVolumeFrameChannelType`](../enums/Id3v2RelativeVolumeFrameChannelType.md) | Which channel to set the value for |
| `value` | `bigint` | Peak volume |

#### Returns

`void`

___

### setVolumeAdjustment

▸ **setVolumeAdjustment**(`type`, `value`): `void`

Sets the volume adjustment in decibels for the specified channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`Id3v2RelativeVolumeFrameChannelType`](../enums/Id3v2RelativeVolumeFrameChannelType.md) | Which channel to set the value for |
| `value` | `number` | Volume adjustment in decibels. Must be betweenInclusive -64 and +64 |

#### Returns

`void`

___

### toString

▸ **toString**(): `string`

Creates a text description of the current instance

#### Returns

`string`

___

### correctEncoding

▸ `Static` `Protected` **correctEncoding**(`type`, `version`): [`StringType`](../enums/StringType.md)

Converts an encoding to be a supported encoding for a specified tag version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`StringType`](../enums/StringType.md) | Value containing the original encoding |
| `version` | `number` | Value containing the ID3v2 version to be encoded. |

#### Returns

[`StringType`](../enums/StringType.md)

Value containing the correct encoding to use, based on
    [forceDefaultEncoding](Id3v2Settings.md#forcedefaultencoding) and what is supported by
    `version`

#### Inherited from

[Id3v2Frame](Id3v2Frame.md).[correctEncoding](Id3v2Frame.md#correctencoding)

___

### find

▸ `Static` **find**(`frames`, `identification`): [`Id3v2RelativeVolumeFrame`](Id3v2RelativeVolumeFrame.md)

Gets a specified volume adjustment frame from the list of relative volume frames

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | [`Id3v2RelativeVolumeFrame`](Id3v2RelativeVolumeFrame.md)[] | List of frames to search |
| `identification` | `string` | Identification to match |

#### Returns

[`Id3v2RelativeVolumeFrame`](Id3v2RelativeVolumeFrame.md)

Frame containing the matching user or `undefined` if a match was not found

___

### fromIdentification

▸ `Static` **fromIdentification**(`identification`): [`Id3v2RelativeVolumeFrame`](Id3v2RelativeVolumeFrame.md)

Constructs and initializes a new instance with a specified identifier

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identification` | `string` | Identification ot use for the new frame |

#### Returns

[`Id3v2RelativeVolumeFrame`](Id3v2RelativeVolumeFrame.md)

___

### fromOffsetRawData

▸ `Static` **fromOffsetRawData**(`data`, `offset`, `header`, `version`): [`Id3v2RelativeVolumeFrame`](Id3v2RelativeVolumeFrame.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version starting a specified offset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw representation of the new frame |
| `offset` | `number` | Offset into `data` where the frame actually begins. Must be a positive, 32-bit integer |
| `header` | [`Id3v2FrameHeader`](Id3v2FrameHeader.md) | Header of the frame found at `offset` in `data` |
| `version` | `number` | ID3v2 version the frame was originally encoded with |

#### Returns

[`Id3v2RelativeVolumeFrame`](Id3v2RelativeVolumeFrame.md)

___

### fromRawData

▸ `Static` **fromRawData**(`data`, `version`): [`Id3v2RelativeVolumeFrame`](Id3v2RelativeVolumeFrame.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw representation of the new frame |
| `version` | `number` | ID3v2 version the frame is encoded with. Must be a positive 8-bit integer. |

#### Returns

[`Id3v2RelativeVolumeFrame`](Id3v2RelativeVolumeFrame.md)
