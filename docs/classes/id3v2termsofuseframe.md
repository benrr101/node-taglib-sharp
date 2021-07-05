[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2TermsOfUseFrame

# Class: Id3v2TermsOfUseFrame

## Hierarchy

- [`Id3v2Frame`](id3v2frame.md)

  ↳ **`Id3v2TermsOfUseFrame`**

## Table of contents

### Properties

- [\_header](id3v2termsofuseframe.md#_header)

### Accessors

- [encryptionId](id3v2termsofuseframe.md#encryptionid)
- [flags](id3v2termsofuseframe.md#flags)
- [frameClassType](id3v2termsofuseframe.md#frameclasstype)
- [frameId](id3v2termsofuseframe.md#frameid)
- [groupId](id3v2termsofuseframe.md#groupid)
- [language](id3v2termsofuseframe.md#language)
- [size](id3v2termsofuseframe.md#size)
- [text](id3v2termsofuseframe.md#text)
- [textEncoding](id3v2termsofuseframe.md#textencoding)

### Methods

- [clone](id3v2termsofuseframe.md#clone)
- [fieldData](id3v2termsofuseframe.md#fielddata)
- [parseFields](id3v2termsofuseframe.md#parsefields)
- [render](id3v2termsofuseframe.md#render)
- [renderFields](id3v2termsofuseframe.md#renderfields)
- [setData](id3v2termsofuseframe.md#setdata)
- [toString](id3v2termsofuseframe.md#tostring)
- [correctEncoding](id3v2termsofuseframe.md#correctencoding)
- [find](id3v2termsofuseframe.md#find)
- [findPreferred](id3v2termsofuseframe.md#findpreferred)
- [fromFields](id3v2termsofuseframe.md#fromfields)
- [fromOffsetRawData](id3v2termsofuseframe.md#fromoffsetrawdata)
- [fromRawData](id3v2termsofuseframe.md#fromrawdata)

## Properties

### \_header

• `Protected` **\_header**: [`Id3v2FrameHeader`](id3v2frameheader.md)

#### Inherited from

[Id3v2Frame](id3v2frame.md).[_header](id3v2frame.md#_header)

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
[Id3v2FrameFlags.Compression](../enums/id3v2frameflags.md#compression), [render](id3v2termsofuseframe.md#render) will throw.

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

### language

• `get` **language**(): `string`

Gets the ISO-639-2 language code stored in the current instance.

#### Returns

`string`

• `set` **language**(`value`): `void`

Sets the ISO-639-2 language code stored in the current instance.
There should only be one frame with a matching ISO-639-2 language code per tag.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

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

___

### text

• `get` **text**(): `string`

Gets the text of the terms of use

#### Returns

`string`

• `set` **text**(`value`): `void`

Sets the text of the terms of use

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

___

### textEncoding

• `get` **textEncoding**(): [`StringType`](../enums/stringtype.md)

Gets the text encoding to use when storing the current instance.

#### Returns

[`StringType`](../enums/stringtype.md)

• `set` **textEncoding**(`value`): `void`

Sets the text encoding to use when storing the current instance.
This encoding is overridden when rendering if [Id3v2Settings.forceDefaultEncoding](id3v2settings.md#forcedefaultencoding) is
`true` or the render version does not support it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`StringType`](../enums/stringtype.md) | Text encoding to use when storing the current instance |

#### Returns

`void`

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

▸ `Protected` **parseFields**(`data`, `_version`): `void`

Populates the values in this frame by parsing its field data in a specified version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Extracted field data |
| `_version` | `number` | ID3v2 version the field data is encoded in |

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

Renders the values in the current instance into field data for a specified version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | ID3v2 version the field data is to be encoded in. |

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

### toString

▸ **toString**(): `string`

Returns a string representation of the frame.

#### Returns

`string`

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

### find

▸ `Static` **find**(`frames`, `language?`): [`Id3v2TermsOfUseFrame`](id3v2termsofuseframe.md)

Gets a specified terms of use frame from the list of frames

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | [`Id3v2TermsOfUseFrame`](id3v2termsofuseframe.md)[] | List of frames to search |
| `language?` | `string` | Optionally, the ISO-639-2 language code to match |

#### Returns

[`Id3v2TermsOfUseFrame`](id3v2termsofuseframe.md)

TermsOfUseFrame A matching frame if found or `undefined` if a matching frame was
    not found

___

### findPreferred

▸ `Static` **findPreferred**(`frames`, `language`): [`Id3v2TermsOfUseFrame`](id3v2termsofuseframe.md)

Gets a specified terms of use frame from the list of frames, trying to match the language but
accepting one with a different language if a match was not found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | [`Id3v2TermsOfUseFrame`](id3v2termsofuseframe.md)[] | List of frames to search |
| `language` | `string` | ISO-639-2 language code to match |

#### Returns

[`Id3v2TermsOfUseFrame`](id3v2termsofuseframe.md)

TermsOfUseFrame Frame containing the matching frame or `undefined` if a match was
    not found

___

### fromFields

▸ `Static` **fromFields**(`language`, `textEncoding?`): [`Id3v2TermsOfUseFrame`](id3v2termsofuseframe.md)

Constructs and initializes a new instance with a specified language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | ISO-639-2 language code for the new frame |
| `textEncoding` | [`StringType`](../enums/stringtype.md) | Optional, text encoding to use when rendering the new frame. If not     provided defaults to [Id3v2Settings.defaultEncoding](id3v2settings.md#defaultencoding) |

#### Returns

[`Id3v2TermsOfUseFrame`](id3v2termsofuseframe.md)

___

### fromOffsetRawData

▸ `Static` **fromOffsetRawData**(`data`, `offset`, `header`, `version`): [`Id3v2TermsOfUseFrame`](id3v2termsofuseframe.md)

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

[`Id3v2TermsOfUseFrame`](id3v2termsofuseframe.md)

___

### fromRawData

▸ `Static` **fromRawData**(`data`, `version`): [`Id3v2TermsOfUseFrame`](id3v2termsofuseframe.md)

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Raw representation of the new frame |
| `version` | `number` | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer |

#### Returns

[`Id3v2TermsOfUseFrame`](id3v2termsofuseframe.md)
