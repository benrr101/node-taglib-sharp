[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2UrlLinkFrame

# Class: Id3v2UrlLinkFrame

Provides ID3v2 URL Link frame implementation (section 4.3.1) covering `W000` to `WZZZ`,
excluding `WXXX`.
With these frames dynamic data such as webpages with touring information, price information,
or plain ordinary news can be added to the tag. There may only be one URL link frame of its kind
in a tag, except when stated otherwise in the frame description. If the text string is followed
by a string termination, all the following information should be ignored and not be displayed.
The following table contains the types and descriptions as found in the ID3 2.4.0 native frames
specification.
* WCOM - The 'Commercial Information' frame is a URL pointing at a webpage with information
  such as where the album can be bought. There may be more than one WCOM frame per tag, but not
  with the same content.
* WCOP - The 'Copyright/Legal information' frame is a URL pointing at a webpage where the terms
  of use and ownership of the field is described.
* WOAF - The 'Official audio file webpage' frame is a URL pointing at a file specific webpage.
* WOAR - The 'Official artist/performer webpage' frame is a URL pointing at the artists'
  official webpage. There may be more than one WOAR frame in a tag if the audio contains more
  than one performer, but not with the same content.
* WOAS - THe 'Official audio source webpage' frame is a URL pointing at the official webpage of
  the source of the audio file, eg, a movie.
* WORS - The 'Official internet radio station homepage' frame contains a URL pointing at the
  homepage of the internet radio station.
* WPAY - The 'Payment' frame is a URL pointing at a webpage that will handle the process of
  paying for this file.
* WPUB - The 'Publisher's official webpage' frame is a URL pointing at the official webpage
  for the publisher.

## Hierarchy

- [`Id3v2Frame`](Id3v2Frame.md)

  ↳ **`Id3v2UrlLinkFrame`**

  ↳↳ [`Id3v2UserUrlLinkFrame`](Id3v2UserUrlLinkFrame.md)

## Table of contents

### Constructors

- [constructor](Id3v2UrlLinkFrame.md#constructor)

### Properties

- [\_encoding](Id3v2UrlLinkFrame.md#_encoding)
- [\_rawData](Id3v2UrlLinkFrame.md#_rawdata)
- [\_rawVersion](Id3v2UrlLinkFrame.md#_rawversion)
- [\_textFields](Id3v2UrlLinkFrame.md#_textfields)

### Accessors

- [encryptionId](Id3v2UrlLinkFrame.md#encryptionid)
- [flags](Id3v2UrlLinkFrame.md#flags)
- [frameClassType](Id3v2UrlLinkFrame.md#frameclasstype)
- [frameId](Id3v2UrlLinkFrame.md#frameid)
- [groupId](Id3v2UrlLinkFrame.md#groupid)
- [header](Id3v2UrlLinkFrame.md#header)
- [size](Id3v2UrlLinkFrame.md#size)
- [text](Id3v2UrlLinkFrame.md#text)
- [textEncoding](Id3v2UrlLinkFrame.md#textencoding)

### Methods

- [clone](Id3v2UrlLinkFrame.md#clone)
- [fieldData](Id3v2UrlLinkFrame.md#fielddata)
- [parseFields](Id3v2UrlLinkFrame.md#parsefields)
- [parseRawData](Id3v2UrlLinkFrame.md#parserawdata)
- [render](Id3v2UrlLinkFrame.md#render)
- [renderFields](Id3v2UrlLinkFrame.md#renderfields)
- [setData](Id3v2UrlLinkFrame.md#setdata)
- [toString](Id3v2UrlLinkFrame.md#tostring)
- [correctEncoding](Id3v2UrlLinkFrame.md#correctencoding)
- [findUrlLinkFrame](Id3v2UrlLinkFrame.md#findurllinkframe)
- [fromIdentity](Id3v2UrlLinkFrame.md#fromidentity)
- [fromOffsetRawData](Id3v2UrlLinkFrame.md#fromoffsetrawdata)
- [fromRawData](Id3v2UrlLinkFrame.md#fromrawdata)

## Constructors

### constructor

• `Protected` **new Id3v2UrlLinkFrame**(`header`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `header` | [`Id3v2FrameHeader`](Id3v2FrameHeader.md) |

#### Overrides

[Id3v2Frame](Id3v2Frame.md).[constructor](Id3v2Frame.md#constructor)

## Properties

### \_encoding

• `Protected` **\_encoding**: [`StringType`](../enums/StringType.md) = `StringType.Latin1`

Text encoding to use to store the text contents of the current instance.

___

### \_rawData

• `Protected` **\_rawData**: [`ByteVector`](ByteVector.md)

Raw data contents in the current instance.

___

### \_rawVersion

• `Protected` **\_rawVersion**: `number`

ID3v2 version of the current instance.

___

### \_textFields

• `Protected` **\_textFields**: `string`[] = `[]`

Decoded text contained in the current instance.

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
[Compression](../enums/Id3v2FrameFlags.md#compression), [render](Id3v2UrlLinkFrame.md#render) will throw.

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

### text

• `get` **text**(): `string`[]

Gets the text contained in the current instance.
Modifying the contents of the returned value will not modify the contents of the current
instance. The value must be reassigned for the value to change.

#### Returns

`string`[]

• `set` **text**(`value`): `void`

Sets the text contained in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

___

### textEncoding

• `get` **textEncoding**(): [`StringType`](../enums/StringType.md)

Gets the text encoding to use when rendering the current instance.

#### Returns

[`StringType`](../enums/StringType.md)

• `set` **textEncoding**(`value`): `void`

Sets the text encoding to use when rendering the current instance.
NOTE: This value will be overwritten if [forceDefaultEncoding](Id3v2Settings.md#forcedefaultencoding) is `true`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`StringType`](../enums/StringType.md) |

#### Returns

`void`

## Methods

### clone

▸ **clone**(): [`Id3v2UrlLinkFrame`](Id3v2UrlLinkFrame.md)

Creates a deep copy of the current instance.
This method is implemented by rendering the current instance as an ID3v2.4 frame and using
the frame factory to create a new frame. As such, this method should be overridden by child
classes.

#### Returns

[`Id3v2UrlLinkFrame`](Id3v2UrlLinkFrame.md)

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

▸ `Protected` **parseFields**(`data`, `version`): `void`

Populates the values in this frame by parsing its field data in a specified version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Extracted field data |
| `version` | `number` | ID3v2 version the field data is encoded in |

#### Returns

`void`

#### Overrides

[Id3v2Frame](Id3v2Frame.md).[parseFields](Id3v2Frame.md#parsefields)

___

### parseRawData

▸ `Protected` **parseRawData**(): `void`

Performs the actual parsing of the raw data.

**`Remarks`**

Because of the high parsing cost and relatively low usage of the class,
    [parseFields](Id3v2UrlLinkFrame.md#parsefields) only stores the field data, so it can be parsed on demand. Whenever
    a property or method is called which requires the data, this method is called, and only
    on the first call does it actually parse the data.

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

#### Inherited from

[Id3v2Frame](Id3v2Frame.md).[render](Id3v2Frame.md#render)

___

### renderFields

▸ `Protected` **renderFields**(`version`): [`ByteVector`](ByteVector.md)

Renders the values in the current instance into field data for a specified version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | ID3v2 version the field data is to be encoded in. |

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

### toString

▸ **toString**(): `string`

Generates a string representation of the URL link frame.

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

### findUrlLinkFrame

▸ `Static` **findUrlLinkFrame**(`frames`, `ident`): [`Id3v2UrlLinkFrame`](Id3v2UrlLinkFrame.md)

Gets the first frame that matches the provided type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | [`Id3v2UrlLinkFrame`](Id3v2UrlLinkFrame.md)[] | Object to search in |
| `ident` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) | Frame identifier to search for |

#### Returns

[`Id3v2UrlLinkFrame`](Id3v2UrlLinkFrame.md)

Frame containing the matching frameId, `undefined` if a match was not found

___

### fromIdentity

▸ `Static` **fromIdentity**(`ident`): [`Id3v2UrlLinkFrame`](Id3v2UrlLinkFrame.md)

Constructs and initializes an empty frame with the provided frame identity

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ident` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) | Identity of the frame to construct |

#### Returns

[`Id3v2UrlLinkFrame`](Id3v2UrlLinkFrame.md)

___

### fromOffsetRawData

▸ `Static` **fromOffsetRawData**(`data`, `offset`, `header`, `version`): [`Id3v2UrlLinkFrame`](Id3v2UrlLinkFrame.md)

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

[`Id3v2UrlLinkFrame`](Id3v2UrlLinkFrame.md)

___

### fromRawData

▸ `Static` **fromRawData**(`data`, `version`): [`Id3v2UrlLinkFrame`](Id3v2UrlLinkFrame.md)

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw representation of the new frame |
| `version` | `number` | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer |

#### Returns

[`Id3v2UrlLinkFrame`](Id3v2UrlLinkFrame.md)
