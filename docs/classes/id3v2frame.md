[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2Frame

# Class: Id3v2Frame

## Hierarchy

- **`Id3v2Frame`**

  ↳ [`Id3v2AttachmentFrame`](id3v2attachmentframe.md)

  ↳ [`Id3v2CommentsFrame`](id3v2commentsframe.md)

  ↳ [`Id3v2EventTimeCodeFrame`](id3v2eventtimecodeframe.md)

  ↳ [`Id3v2MusicCdIdentifierFrame`](id3v2musiccdidentifierframe.md)

  ↳ [`Id3v2PlayCountFrame`](id3v2playcountframe.md)

  ↳ [`Id3v2PopularimeterFrame`](id3v2popularimeterframe.md)

  ↳ [`Id3v2PrivateFrame`](id3v2privateframe.md)

  ↳ [`Id3v2RelativeVolumeFrame`](id3v2relativevolumeframe.md)

  ↳ [`Id3v2Synchronized`](id3v2synchronized.md)

  ↳ [`Id3v2TermsOfUseFrame`](id3v2termsofuseframe.md)

  ↳ [`Id3v2TextInformationFrame`](id3v2textinformationframe.md)

  ↳ [`Id3v2UniqueFileIdentifierFrame`](id3v2uniquefileidentifierframe.md)

  ↳ [`Id3v2UnknownFrame`](id3v2unknownframe.md)

  ↳ [`Id3v2UnsynchronizedFrame`](id3v2unsynchronizedframe.md)

  ↳ [`Id3v2UrlLinkFrame`](id3v2urllinkframe.md)

## Table of contents

### Constructors

- [constructor](id3v2frame.md#constructor)

### Properties

- [\_header](id3v2frame.md#_header)

### Accessors

- [encryptionId](id3v2frame.md#encryptionid)
- [flags](id3v2frame.md#flags)
- [frameClassType](id3v2frame.md#frameclasstype)
- [frameId](id3v2frame.md#frameid)
- [groupId](id3v2frame.md#groupid)
- [size](id3v2frame.md#size)

### Methods

- [clone](id3v2frame.md#clone)
- [fieldData](id3v2frame.md#fielddata)
- [parseFields](id3v2frame.md#parsefields)
- [render](id3v2frame.md#render)
- [renderFields](id3v2frame.md#renderfields)
- [setData](id3v2frame.md#setdata)
- [correctEncoding](id3v2frame.md#correctencoding)

## Constructors

### constructor

• `Protected` **new Id3v2Frame**(`header`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `header` | [`Id3v2FrameHeader`](id3v2frameheader.md) |

## Properties

### \_header

• `Protected` **\_header**: [`Id3v2FrameHeader`](id3v2frameheader.md)

## Accessors

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
[Id3v2FrameFlags.Compression](../enums/id3v2frameflags.md#compression), [render](id3v2frame.md#render) will throw.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Id3v2FrameFlags`](../enums/id3v2frameflags.md) |

#### Returns

`void`

___

### frameClassType

• `Abstract` `get` **frameClassType**(): [`Id3v2FrameClassType`](../enums/id3v2frameclasstype.md)

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

▸ `Abstract` **clone**(): [`Id3v2Frame`](id3v2frame.md)

Creates a deep copy of the current instance.
This method is implemented by rendering the current instance as an ID3v2.4 frame and using
the frame factory to create a new frame. As such, this method should be overridden by child
classes.

#### Returns

[`Id3v2Frame`](id3v2frame.md)

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

___

### parseFields

▸ `Protected` `Abstract` **parseFields**(`data`, `version`): `void`

Populates the values in this frame by parsing its field data in a specified version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Extracted field data |
| `version` | `number` | ID3v2 version the field data is encoded in |

#### Returns

`void`

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

___

### renderFields

▸ `Protected` `Abstract` **renderFields**(`version`): [`ByteVector`](bytevector.md)

Renders the values in the current instance into field data for a specified version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | ID3v2 version the field data is to be encoded in. |

#### Returns

[`ByteVector`](bytevector.md)

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
