[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2MusicCdIdentifierFrame

# Class: Id3v2MusicCdIdentifierFrame

Class extends {@link Frame}, implementing support for ID3v2 Music CD Identifier (MCDI) frames.
Music CD identifier frames should contain the table of contents data as stored on the physical
CD. It is primarily used for track information lookup through web sources like CDDB.

## Hierarchy

- [`Id3v2Frame`](id3v2frame.md)

  ↳ **`Id3v2MusicCdIdentifierFrame`**

## Table of contents

### Properties

- [\_header](id3v2musiccdidentifierframe.md#_header)

### Accessors

- [data](id3v2musiccdidentifierframe.md#data)
- [encryptionId](id3v2musiccdidentifierframe.md#encryptionid)
- [flags](id3v2musiccdidentifierframe.md#flags)
- [frameClassType](id3v2musiccdidentifierframe.md#frameclasstype)
- [frameId](id3v2musiccdidentifierframe.md#frameid)
- [groupId](id3v2musiccdidentifierframe.md#groupid)
- [size](id3v2musiccdidentifierframe.md#size)

### Methods

- [clone](id3v2musiccdidentifierframe.md#clone)
- [fieldData](id3v2musiccdidentifierframe.md#fielddata)
- [parseFields](id3v2musiccdidentifierframe.md#parsefields)
- [render](id3v2musiccdidentifierframe.md#render)
- [renderFields](id3v2musiccdidentifierframe.md#renderfields)
- [setData](id3v2musiccdidentifierframe.md#setdata)
- [correctEncoding](id3v2musiccdidentifierframe.md#correctencoding)
- [fromOffsetRawData](id3v2musiccdidentifierframe.md#fromoffsetrawdata)
- [fromRawData](id3v2musiccdidentifierframe.md#fromrawdata)

## Properties

### \_header

• `Protected` **\_header**: [`Id3v2FrameHeader`](id3v2frameheader.md)

#### Inherited from

[Id3v2Frame](id3v2frame.md).[_header](id3v2frame.md#_header)

## Accessors

### data

• `get` **data**(): [`ByteVector`](bytevector.md)

Gets the identifier data stored in the current instance

#### Returns

[`ByteVector`](bytevector.md)

• `set` **data**(`value`): `void`

Sets the identifier data stored in the current instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`ByteVector`](bytevector.md) | ByteVector containing the identifier stored in the current instance |

#### Returns

`void`

___

### encryptionId

• `get` **encryptionId**(): `number`

Gets the encryption ID applied to the current instance.

#### Returns

`number`

number Value containing the encryption identifier for the current instance or
    `undefined` if not set.

• `set` **encryptionId**(`value`): `void`

Sets the encryption ID applied to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Value containing the encryption identifier for the current instance. Must be an     8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID |

#### Returns

`void`

number Value containing the encryption identifier for the current instance or
    `undefined` if not set.

___

### flags

• `get` **flags**(): [`Id3v2FrameFlags`](../enums/id3v2frameflags.md)

Gets the frame flags applied to the current instance.

#### Returns

[`Id3v2FrameFlags`](../enums/id3v2frameflags.md)

• `set` **flags**(`value`): `void`

Sets the frame flags applied to the current instance.
If the value includes either [Id3v2FrameFlags.Encryption](../enums/id3v2frameflags.md#encryption) or
[Id3v2FrameFlags.Compression](../enums/id3v2frameflags.md#compression), [render](id3v2musiccdidentifierframe.md#render) will throw.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Id3v2FrameFlags`](../enums/id3v2frameflags.md) |

#### Returns

`void`

___

### frameClassType

• `get` **frameClassType**(): [`Id3v2FrameClassType`](../enums/id3v2frameclasstype.md)

**`inheritdoc`**

#### Returns

[`Id3v2FrameClassType`](../enums/id3v2frameclasstype.md)

___

### frameId

• `get` **frameId**(): [`Id3v2FrameIdentifier`](id3v2frameidentifier.md)

Gets the frame ID for the current instance.

#### Returns

[`Id3v2FrameIdentifier`](id3v2frameidentifier.md)

FrameIdentifier Object representing of the identifier of the frame

___

### groupId

• `get` **groupId**(): `number`

Gets the grouping ID applied to the current instance.

#### Returns

`number`

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

• `set` **groupId**(`value`): `void`

Sets the grouping ID applied to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Grouping identifier for the current instance. Must be a 8-bit unsigned integer.     Setting to `undefined` will remove the grouping identity header and ID |

#### Returns

`void`

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

___

### size

• `get` **size**(): `number`

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

#### Returns

`number`

## Methods

### clone

▸ **clone**(): [`Id3v2Frame`](id3v2frame.md)

Creates a deep copy of the current instance.
This method is implemented by rendering the current instance as an ID3v2.4 frame and using
the frame factory to create a new frame. As such, this method should be overridden by child
classes.

#### Returns

[`Id3v2Frame`](id3v2frame.md)

#### Overrides

[Id3v2Frame](id3v2frame.md).[clone](id3v2frame.md#clone)

___

### fieldData

▸ `Protected` **fieldData**(`frameData`, `offset`, `version`, `dataIncludesHeader`): [`ByteVector`](bytevector.md)

Extracts the field data from the raw portion of an ID3v2 frame.
This method is necessary for extracting extra data prepended to the frame such the as
grouping ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frameData` | [`ByteVector`](bytevector.md) | Raw frame data |
| `offset` | `number` | Index at which the data is contained |
| `version` | `number` | Version of the ID3v2 tag the data was originally encoded with |
| `dataIncludesHeader` | `boolean` | `true` if `frameData` includes the header, `false`     otherwise |

#### Returns

[`ByteVector`](bytevector.md)

#### Inherited from

[Id3v2Frame](id3v2frame.md).[fieldData](id3v2frame.md#fielddata)

___

### parseFields

▸ `Protected` **parseFields**(`data`, `version`): `void`

Populates the values in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | ByteVector containing the extracted field data. |
| `version` | `number` | Ignored. |

#### Returns

`void`

#### Overrides

[Id3v2Frame](id3v2frame.md).[parseFields](id3v2frame.md#parsefields)

___

### render

▸ **render**(`version`): [`ByteVector`](bytevector.md)

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | Version of ID3v2 to use when encoding the current instance |

#### Returns

[`ByteVector`](bytevector.md)

#### Inherited from

[Id3v2Frame](id3v2frame.md).[render](id3v2frame.md#render)

___

### renderFields

▸ `Protected` **renderFields**(`version`): [`ByteVector`](bytevector.md)

Renders the value in current instance into field data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | Ignored. |

#### Returns

[`ByteVector`](bytevector.md)

#### Overrides

[Id3v2Frame](id3v2frame.md).[renderFields](id3v2frame.md#renderfields)

___

### setData

▸ `Protected` **setData**(`data`, `offset`, `readHeader`, `version`): `void`

Populates the current instance by reading the raw frame from disk, optionally reading the
header.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Raw ID3v2 frame |
| `offset` | `number` | Offset in `data` at which the frame begins. |
| `readHeader` | `boolean` | Whether or not to read the reader into the current instance. |
| `version` | `number` | Version of the ID3v2 tag the data was encoded with |

#### Returns

`void`

#### Inherited from

[Id3v2Frame](id3v2frame.md).[setData](id3v2frame.md#setdata)

___

### correctEncoding

▸ `Static` `Protected` **correctEncoding**(`type`, `version`): [`StringType`](../enums/stringtype.md)

Converts an encoding to be a supported encoding for a specified tag version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`StringType`](../enums/stringtype.md) | Value containing the original encoding |
| `version` | `number` | Value containing the ID3v2 version to be encoded. |

#### Returns

[`StringType`](../enums/stringtype.md)

StringType Value containing the correct encoding to use, based on
    [Id3v2Settings.forceDefaultEncoding](id3v2settings.md#forcedefaultencoding) and what is supported by
    `version`

#### Inherited from

[Id3v2Frame](id3v2frame.md).[correctEncoding](id3v2frame.md#correctencoding)

___

### fromOffsetRawData

▸ `Static` **fromOffsetRawData**(`data`, `offset`, `header`, `version`): [`Id3v2MusicCdIdentifierFrame`](id3v2musiccdidentifierframe.md)

Constructs and initializes a new instance of MusicCdIdentifier frame by reading its raw data
in a specified ID3v2 version starting at a specified offset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Raw representation of the new frame. |
| `offset` | `number` | Offset into `data` where the frame actually begins. Must be a     positive, safe integer |
| `header` | [`Id3v2FrameHeader`](id3v2frameheader.md) | Header of the frame found at `offset` in the data |
| `version` | `number` | ID3v2 version the frame was originally encoded with |

#### Returns

[`Id3v2MusicCdIdentifierFrame`](id3v2musiccdidentifierframe.md)

___

### fromRawData

▸ `Static` **fromRawData**(`data`, `version`): [`Id3v2MusicCdIdentifierFrame`](id3v2musiccdidentifierframe.md)

Constructs and initializes a new instance of MusicCdIdentifierFrame by reading its raw data
in a specified ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | ByteVector object starting with the raw representation of the new frame |
| `version` | `number` | The ID3v2 version the raw frame is encoded in. Must be positive 8-bit integer |

#### Returns

[`Id3v2MusicCdIdentifierFrame`](id3v2musiccdidentifierframe.md)
