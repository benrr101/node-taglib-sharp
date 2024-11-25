[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2PopularimeterFrame

# Class: Id3v2PopularimeterFrame

This class extends Frame implementing support for ID3v2 popularimeter (POPM) frames.

## Hierarchy

- [`Id3v2Frame`](Id3v2Frame.md)

  ↳ **`Id3v2PopularimeterFrame`**

## Table of contents

### Accessors

- [encryptionId](Id3v2PopularimeterFrame.md#encryptionid)
- [flags](Id3v2PopularimeterFrame.md#flags)
- [frameClassType](Id3v2PopularimeterFrame.md#frameclasstype)
- [frameId](Id3v2PopularimeterFrame.md#frameid)
- [groupId](Id3v2PopularimeterFrame.md#groupid)
- [header](Id3v2PopularimeterFrame.md#header)
- [playCount](Id3v2PopularimeterFrame.md#playcount)
- [rating](Id3v2PopularimeterFrame.md#rating)
- [size](Id3v2PopularimeterFrame.md#size)
- [user](Id3v2PopularimeterFrame.md#user)

### Methods

- [clone](Id3v2PopularimeterFrame.md#clone)
- [fieldData](Id3v2PopularimeterFrame.md#fielddata)
- [parseFields](Id3v2PopularimeterFrame.md#parsefields)
- [render](Id3v2PopularimeterFrame.md#render)
- [renderFields](Id3v2PopularimeterFrame.md#renderfields)
- [setData](Id3v2PopularimeterFrame.md#setdata)
- [correctEncoding](Id3v2PopularimeterFrame.md#correctencoding)
- [find](Id3v2PopularimeterFrame.md#find)
- [fromOffsetRawData](Id3v2PopularimeterFrame.md#fromoffsetrawdata)
- [fromRawData](Id3v2PopularimeterFrame.md#fromrawdata)
- [fromUser](Id3v2PopularimeterFrame.md#fromuser)

## Accessors

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
[Compression](../enums/Id3v2FrameFlags.md#compression), [render](Id3v2PopularimeterFrame.md#render) will throw.

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

### playCount

• `get` **playCount**(): `bigint`

Gets the play count of the current instance

#### Returns

`bigint`

• `set` **playCount**(`value`): `void`

Sets the play count of the current instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `bigint` | Play count of the current instance |

#### Returns

`void`

___

### rating

• `get` **rating**(): `number`

Gets the rating of the current instance

#### Returns

`number`

• `set` **rating**(`value`): `void`

Sets the rating of the current instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Rating of the current instance, must be an 8-bit unsigned integer. |

#### Returns

`void`

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

___

### user

• `get` **user**(): `string`

Gets the email address of the user to whom the current instance belongs

#### Returns

`string`

• `set` **user**(`value`): `void`

Sets the email address of the user to whom the current instance belongs

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

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

▸ `Static` **find**(`frames`, `user`): [`Id3v2PopularimeterFrame`](Id3v2PopularimeterFrame.md)

Gets a popularimeter frame from a specified tag that matches the given parameters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | [`Id3v2PopularimeterFrame`](Id3v2PopularimeterFrame.md)[] | List of frames to search |
| `user` | `string` | User email to use to match the frame in the `tag` |

#### Returns

[`Id3v2PopularimeterFrame`](Id3v2PopularimeterFrame.md)

Frame containing the matching user or `undefined` if a match was not found

___

### fromOffsetRawData

▸ `Static` **fromOffsetRawData**(`data`, `offset`, `header`, `version`): [`Id3v2PopularimeterFrame`](Id3v2PopularimeterFrame.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version. This method allows for offset reading from the data byte vector.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw representation of the new frame |
| `offset` | `number` | What offset in `data` the frame actually begins. Must be positive, safe integer |
| `header` | [`Id3v2FrameHeader`](Id3v2FrameHeader.md) | Header of the frame found at `data` in the data |
| `version` | `number` | ID3v2 version the frame was originally encoded with |

#### Returns

[`Id3v2PopularimeterFrame`](Id3v2PopularimeterFrame.md)

___

### fromRawData

▸ `Static` **fromRawData**(`data`, `version`): [`Id3v2PopularimeterFrame`](Id3v2PopularimeterFrame.md)

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw representation of the new frame |
| `version` | `number` | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer |

#### Returns

[`Id3v2PopularimeterFrame`](Id3v2PopularimeterFrame.md)

___

### fromUser

▸ `Static` **fromUser**(`user`): [`Id3v2PopularimeterFrame`](Id3v2PopularimeterFrame.md)

Constructs and initializes a new instance for a specified user with a rating and play count
of zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | Email of the user that gave the rating |

#### Returns

[`Id3v2PopularimeterFrame`](Id3v2PopularimeterFrame.md)
