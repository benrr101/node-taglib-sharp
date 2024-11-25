[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2Frame

# Class: Id3v2Frame

Abstract class that represents an ID3v2 frame. Frames are the unit for storing information in
an ID3v2 tag. There are various types of frames that store differently structured information.

## Hierarchy

- **`Id3v2Frame`**

  ↳ [`Id3v2AttachmentFrame`](Id3v2AttachmentFrame.md)

  ↳ [`Id3v2CommentsFrame`](Id3v2CommentsFrame.md)

  ↳ [`Id3v2EventTimeCodeFrame`](Id3v2EventTimeCodeFrame.md)

  ↳ [`Id3v2MusicCdIdentifierFrame`](Id3v2MusicCdIdentifierFrame.md)

  ↳ [`Id3v2PlayCountFrame`](Id3v2PlayCountFrame.md)

  ↳ [`Id3v2PopularimeterFrame`](Id3v2PopularimeterFrame.md)

  ↳ [`Id3v2PrivateFrame`](Id3v2PrivateFrame.md)

  ↳ [`Id3v2RelativeVolumeFrame`](Id3v2RelativeVolumeFrame.md)

  ↳ [`Id3v2Synchronized`](Id3v2Synchronized.md)

  ↳ [`Id3v2TermsOfUseFrame`](Id3v2TermsOfUseFrame.md)

  ↳ [`Id3v2TextInformationFrame`](Id3v2TextInformationFrame.md)

  ↳ [`Id3v2UniqueFileIdentifierFrame`](Id3v2UniqueFileIdentifierFrame.md)

  ↳ [`Id3v2UnknownFrame`](Id3v2UnknownFrame.md)

  ↳ [`Id3v2UnsynchronizedLyricsFrame`](Id3v2UnsynchronizedLyricsFrame.md)

  ↳ [`Id3v2UrlLinkFrame`](Id3v2UrlLinkFrame.md)

## Table of contents

### Constructors

- [constructor](Id3v2Frame.md#constructor)

### Accessors

- [encryptionId](Id3v2Frame.md#encryptionid)
- [flags](Id3v2Frame.md#flags)
- [frameClassType](Id3v2Frame.md#frameclasstype)
- [frameId](Id3v2Frame.md#frameid)
- [groupId](Id3v2Frame.md#groupid)
- [header](Id3v2Frame.md#header)
- [size](Id3v2Frame.md#size)

### Methods

- [clone](Id3v2Frame.md#clone)
- [fieldData](Id3v2Frame.md#fielddata)
- [parseFields](Id3v2Frame.md#parsefields)
- [render](Id3v2Frame.md#render)
- [renderFields](Id3v2Frame.md#renderfields)
- [setData](Id3v2Frame.md#setdata)
- [correctEncoding](Id3v2Frame.md#correctencoding)

## Constructors

### constructor

• `Protected` **new Id3v2Frame**(`header`)

Constructs and initializes a new instance with a frame header.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`Id3v2FrameHeader`](Id3v2FrameHeader.md) | Header for the frame. |

## Accessors

### encryptionId

• `get` **encryptionId**(): `number`

Gets the encryption ID applied to the current instance.

#### Returns

`number`

Value containing the encryption identifier for the current instance or
    `undefined` if not set.

• `set` **encryptionId**(`value`): `void`

Sets the encryption ID applied to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Value containing the encryption identifier for the current instance. Must be an 8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID |

#### Returns

`void`

___

### flags

• `get` **flags**(): [`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md)

Gets the frame flags applied to the current instance.

#### Returns

[`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md)

• `set` **flags**(`value`): `void`

Sets the frame flags applied to the current instance.
If the value includes either [Encryption](../enums/Id3v2FrameFlags.md#encryption) or
[Compression](../enums/Id3v2FrameFlags.md#compression), [render](Id3v2Frame.md#render) will throw.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md) |

#### Returns

`void`

___

### frameClassType

• `Abstract` `get` **frameClassType**(): [`Id3v2FrameClassType`](../enums/Id3v2FrameClassType.md)

Gets a flag indicating which type of frame the current instance is.

#### Returns

[`Id3v2FrameClassType`](../enums/Id3v2FrameClassType.md)

___

### frameId

• `get` **frameId**(): [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md)

Gets the frame ID for the current instance.

#### Returns

[`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md)

Object representing of the identifier of the frame

___

### groupId

• `get` **groupId**(): `number`

Gets the grouping ID applied to the current instance.

#### Returns

`number`

Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

• `set` **groupId**(`value`): `void`

Sets the grouping ID applied to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Grouping identifier for the current instance. Must be an 8-bit unsigned integer. Setting to `undefined` will remove the grouping identity header and ID |

#### Returns

`void`

___

### header

• `Protected` `get` **header**(): [`Id3v2FrameHeader`](Id3v2FrameHeader.md)

Gets the header for the frame. For new frames this should not exist.

#### Returns

[`Id3v2FrameHeader`](Id3v2FrameHeader.md)

• `Protected` `set` **header**(`value`): `void`

Sets the header for the frame.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Id3v2FrameHeader`](Id3v2FrameHeader.md) | Header for the frame |

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

## Methods

### clone

▸ `Abstract` **clone**(): [`Id3v2Frame`](Id3v2Frame.md)

Creates a deep copy of the current instance.
This method is implemented by rendering the current instance as an ID3v2.4 frame and using
the frame factory to create a new frame. As such, this method should be overridden by child
classes.

#### Returns

[`Id3v2Frame`](Id3v2Frame.md)

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

___

### parseFields

▸ `Protected` `Abstract` **parseFields**(`data`, `version`): `void`

Populates the values in this frame by parsing its field data in a specified version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Extracted field data |
| `version` | `number` | ID3v2 version the field data is encoded in |

#### Returns

`void`

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

___

### renderFields

▸ `Protected` `Abstract` **renderFields**(`version`): [`ByteVector`](ByteVector.md)

Renders the values in the current instance into field data for a specified version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | ID3v2 version the field data is to be encoded in. |

#### Returns

[`ByteVector`](ByteVector.md)

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
