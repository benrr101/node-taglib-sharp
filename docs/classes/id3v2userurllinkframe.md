[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2UserUrlLinkFrame

# Class: Id3v2UserUrlLinkFrame

Provides support for ID3v2 User URL Link frames (WXXX).

## Hierarchy

- [`Id3v2UrlLinkFrame`](id3v2urllinkframe.md)

  ↳ **`Id3v2UserUrlLinkFrame`**

## Table of contents

### Properties

- [\_encoding](id3v2userurllinkframe.md#_encoding)
- [\_header](id3v2userurllinkframe.md#_header)
- [\_rawData](id3v2userurllinkframe.md#_rawdata)
- [\_rawVersion](id3v2userurllinkframe.md#_rawversion)
- [\_textFields](id3v2userurllinkframe.md#_textfields)

### Accessors

- [description](id3v2userurllinkframe.md#description)
- [encryptionId](id3v2userurllinkframe.md#encryptionid)
- [flags](id3v2userurllinkframe.md#flags)
- [frameClassType](id3v2userurllinkframe.md#frameclasstype)
- [frameId](id3v2userurllinkframe.md#frameid)
- [groupId](id3v2userurllinkframe.md#groupid)
- [size](id3v2userurllinkframe.md#size)
- [text](id3v2userurllinkframe.md#text)
- [textEncoding](id3v2userurllinkframe.md#textencoding)

### Methods

- [clone](id3v2userurllinkframe.md#clone)
- [fieldData](id3v2userurllinkframe.md#fielddata)
- [parseFields](id3v2userurllinkframe.md#parsefields)
- [parseRawData](id3v2userurllinkframe.md#parserawdata)
- [render](id3v2userurllinkframe.md#render)
- [renderFields](id3v2userurllinkframe.md#renderfields)
- [setData](id3v2userurllinkframe.md#setdata)
- [toString](id3v2userurllinkframe.md#tostring)
- [correctEncoding](id3v2userurllinkframe.md#correctencoding)
- [findUrlLinkFrame](id3v2userurllinkframe.md#findurllinkframe)
- [findUserUrlLinkFrame](id3v2userurllinkframe.md#finduserurllinkframe)
- [fromDescription](id3v2userurllinkframe.md#fromdescription)
- [fromIdentity](id3v2userurllinkframe.md#fromidentity)
- [fromOffsetRawData](id3v2userurllinkframe.md#fromoffsetrawdata)
- [fromRawData](id3v2userurllinkframe.md#fromrawdata)

## Properties

### \_encoding

• `Protected` **\_encoding**: [`StringType`](../enums/stringtype.md)

#### Inherited from

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[_encoding](id3v2urllinkframe.md#_encoding)

___

### \_header

• `Protected` **\_header**: [`Id3v2FrameHeader`](id3v2frameheader.md)

#### Inherited from

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[_header](id3v2urllinkframe.md#_header)

___

### \_rawData

• `Protected` **\_rawData**: [`ByteVector`](bytevector.md)

#### Inherited from

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[_rawData](id3v2urllinkframe.md#_rawdata)

___

### \_rawVersion

• `Protected` **\_rawVersion**: `number`

#### Inherited from

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[_rawVersion](id3v2urllinkframe.md#_rawversion)

___

### \_textFields

• `Protected` **\_textFields**: `string`[] = `[]`

#### Inherited from

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[_textFields](id3v2urllinkframe.md#_textfields)

## Accessors

### description

• `get` **description**(): `string`

Gets the description stored in the current instance.

#### Returns

`string`

• `set` **description**(`value`): `void`

Sets the description stored in the current instance.
There should only be one frame with a matching description per tag.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

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
[Id3v2FrameFlags.Compression](../enums/id3v2frameflags.md#compression), [render](id3v2userurllinkframe.md#render) will throw.

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

___

### text

• `get` **text**(): `string`[]

Gets the text contained in the current instance.
NOTE: Modifying the contents of the returned value will not modify the contents of the
current instance. The value must be reassigned for the value to change.

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

• `get` **textEncoding**(): [`StringType`](../enums/stringtype.md)

Gets the text encoding to use when rendering the current instance.

#### Returns

[`StringType`](../enums/stringtype.md)

• `set` **textEncoding**(`value`): `void`

Sets the text encoding to use when rendering the current instance.
NOTE: This value will be overwritten if [Id3v2Settings.forceDefaultEncoding](id3v2settings.md#forcedefaultencoding) is `true`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`StringType`](../enums/stringtype.md) |

#### Returns

`void`

## Methods

### clone

▸ **clone**(): [`Id3v2UserUrlLinkFrame`](id3v2userurllinkframe.md)

Creates a deep copy of the current instance.
This method is implemented by rendering the current instance as an ID3v2.4 frame and using
the frame factory to create a new frame. As such, this method should be overridden by child
classes.

#### Returns

[`Id3v2UserUrlLinkFrame`](id3v2userurllinkframe.md)

#### Overrides

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[clone](id3v2urllinkframe.md#clone)

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

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[fieldData](id3v2urllinkframe.md#fielddata)

___

### parseFields

▸ `Protected` **parseFields**(`data`, `version`): `void`

Populates the values in this frame by parsing its field data in a specified version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Extracted field data |
| `version` | `number` | ID3v2 version the field data is encoded in |

#### Returns

`void`

#### Inherited from

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[parseFields](id3v2urllinkframe.md#parsefields)

___

### parseRawData

▸ `Protected` **parseRawData**(): `void`

#### Returns

`void`

#### Inherited from

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[parseRawData](id3v2urllinkframe.md#parserawdata)

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

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[render](id3v2urllinkframe.md#render)

___

### renderFields

▸ `Protected` **renderFields**(`version`): [`ByteVector`](bytevector.md)

Renders the values in the current instance into field data for a specified version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | ID3v2 version the field data is to be encoded in. |

#### Returns

[`ByteVector`](bytevector.md)

#### Inherited from

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[renderFields](id3v2urllinkframe.md#renderfields)

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

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[setData](id3v2urllinkframe.md#setdata)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[toString](id3v2urllinkframe.md#tostring)

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

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[correctEncoding](id3v2urllinkframe.md#correctencoding)

___

### findUrlLinkFrame

▸ `Static` **findUrlLinkFrame**(`frames`, `ident`): [`Id3v2UrlLinkFrame`](id3v2urllinkframe.md)

Gets the first frame that matches the provided type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | [`Id3v2UrlLinkFrame`](id3v2urllinkframe.md)[] | Object to search in |
| `ident` | [`Id3v2FrameIdentifier`](id3v2frameidentifier.md) | Frame identifier to search for |

#### Returns

[`Id3v2UrlLinkFrame`](id3v2urllinkframe.md)

UrlLinkFrame Frame containing the matching frameId, `undefined` if a match was
    not found

#### Inherited from

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[findUrlLinkFrame](id3v2urllinkframe.md#findurllinkframe)

___

### findUserUrlLinkFrame

▸ `Static` **findUserUrlLinkFrame**(`frames`, `description`): [`Id3v2UserUrlLinkFrame`](id3v2userurllinkframe.md)

Gets a frame from a list of frames.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | [`Id3v2UserUrlLinkFrame`](id3v2userurllinkframe.md)[] | List of frames to search |
| `description` | `string` | Description of the frame to match |

#### Returns

[`Id3v2UserUrlLinkFrame`](id3v2userurllinkframe.md)

UserUrlLinkFrame Frame containing the matching user, `undefined` if a match was not
    found

___

### fromDescription

▸ `Static` **fromDescription**(`description`): [`Id3v2UserUrlLinkFrame`](id3v2userurllinkframe.md)

Constructs and initializes a new instance using the provided description as the text
of the frame.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | `string` | Description to use as text of the frame. |

#### Returns

[`Id3v2UserUrlLinkFrame`](id3v2userurllinkframe.md)

___

### fromIdentity

▸ `Static` **fromIdentity**(`ident`): [`Id3v2UrlLinkFrame`](id3v2urllinkframe.md)

Constructs and initializes an empty frame with the provided frame identity

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ident` | [`Id3v2FrameIdentifier`](id3v2frameidentifier.md) | Identity of the frame to construct |

#### Returns

[`Id3v2UrlLinkFrame`](id3v2urllinkframe.md)

#### Inherited from

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[fromIdentity](id3v2urllinkframe.md#fromidentity)

___

### fromOffsetRawData

▸ `Static` **fromOffsetRawData**(`data`, `offset`, `header`, `version`): [`Id3v2UserUrlLinkFrame`](id3v2userurllinkframe.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version. This method allows for offset reading from the data byte vector.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Raw representation of the new frame |
| `offset` | `number` | What offset in `data` the frame actually begins. Must be positive,     safe integer |
| `header` | [`Id3v2FrameHeader`](id3v2frameheader.md) | Header of the frame found at `data` in the data |
| `version` | `number` | ID3v2 version the frame was originally encoded with |

#### Returns

[`Id3v2UserUrlLinkFrame`](id3v2userurllinkframe.md)

#### Overrides

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[fromOffsetRawData](id3v2urllinkframe.md#fromoffsetrawdata)

___

### fromRawData

▸ `Static` **fromRawData**(`data`, `version`): [`Id3v2UserUrlLinkFrame`](id3v2userurllinkframe.md)

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Raw representation of the new frame |
| `version` | `number` | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer |

#### Returns

[`Id3v2UserUrlLinkFrame`](id3v2userurllinkframe.md)

#### Overrides

[Id3v2UrlLinkFrame](id3v2urllinkframe.md).[fromRawData](id3v2urllinkframe.md#fromrawdata)
