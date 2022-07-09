[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2UnsynchronizedFrame

# Class: Id3v2UnsynchronizedFrame

## Hierarchy

- [`Id3v2Frame`](Id3v2Frame.md)

  ↳ **`Id3v2UnsynchronizedFrame`**

## Table of contents

### Accessors

- [description](Id3v2UnsynchronizedFrame.md#description)
- [encryptionId](Id3v2UnsynchronizedFrame.md#encryptionid)
- [flags](Id3v2UnsynchronizedFrame.md#flags)
- [frameClassType](Id3v2UnsynchronizedFrame.md#frameclasstype)
- [frameId](Id3v2UnsynchronizedFrame.md#frameid)
- [groupId](Id3v2UnsynchronizedFrame.md#groupid)
- [header](Id3v2UnsynchronizedFrame.md#header)
- [language](Id3v2UnsynchronizedFrame.md#language)
- [size](Id3v2UnsynchronizedFrame.md#size)
- [text](Id3v2UnsynchronizedFrame.md#text)
- [textEncoding](Id3v2UnsynchronizedFrame.md#textencoding)

### Methods

- [clone](Id3v2UnsynchronizedFrame.md#clone)
- [fieldData](Id3v2UnsynchronizedFrame.md#fielddata)
- [parseFields](Id3v2UnsynchronizedFrame.md#parsefields)
- [render](Id3v2UnsynchronizedFrame.md#render)
- [renderFields](Id3v2UnsynchronizedFrame.md#renderfields)
- [setData](Id3v2UnsynchronizedFrame.md#setdata)
- [toString](Id3v2UnsynchronizedFrame.md#tostring)
- [correctEncoding](Id3v2UnsynchronizedFrame.md#correctencoding)
- [find](Id3v2UnsynchronizedFrame.md#find)
- [findAll](Id3v2UnsynchronizedFrame.md#findall)
- [findPreferred](Id3v2UnsynchronizedFrame.md#findpreferred)
- [fromData](Id3v2UnsynchronizedFrame.md#fromdata)
- [fromOffsetRawData](Id3v2UnsynchronizedFrame.md#fromoffsetrawdata)
- [fromRawData](Id3v2UnsynchronizedFrame.md#fromrawdata)

## Accessors

### description

• `get` **description**(): `string`

Gets the description of the contents of the current instance.

#### Returns

`string`

• `set` **description**(`value`): `void`

Sets the description of the contents of the current instance.
There should only be one frame with a this description and ISO-639-2 code per tag.

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

#### Inherited from

Frame.encryptionId

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
If the value includes either [Id3v2FrameFlags.Encryption](../enums/Id3v2FrameFlags.md#encryption) or
[Id3v2FrameFlags.Compression](../enums/Id3v2FrameFlags.md#compression), [render](Id3v2UnsynchronizedFrame.md#render) will throw.

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

**`inheritdoc`**

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

FrameIdentifier Object representing of the identifier of the frame

#### Inherited from

Frame.frameId

___

### groupId

• `get` **groupId**(): `number`

Gets the grouping ID applied to the current instance.

#### Returns

`number`

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

#### Inherited from

Frame.groupId

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

### language

• `get` **language**(): `string`

Gets the ISO-639-2 language code for the contents of this instance.

#### Returns

`string`

• `set` **language**(`value`): `void`

Sets the ISO-639-2 language code for the contents of this instance.

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

#### Inherited from

Frame.size

___

### text

• `get` **text**(): `string`

Gets the text stored in the current instance.

#### Returns

`string`

• `set` **text**(`value`): `void`

Sets the text stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

___

### textEncoding

• `get` **textEncoding**(): [`StringType`](../enums/StringType.md)

Gets the text encoding to use when storing the current instance.

#### Returns

[`StringType`](../enums/StringType.md)

• `set` **textEncoding**(`value`): `void`

Sets the text encoding to use when storing the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`StringType`](../enums/StringType.md) |

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
| `dataIncludesHeader` | `boolean` | `true` if `frameData` includes the header, `false`     otherwise |

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

StringType Value containing the correct encoding to use, based on
    [Id3v2Settings.forceDefaultEncoding](Id3v2Settings.md#forcedefaultencoding) and what is supported by
    `version`

#### Inherited from

[Id3v2Frame](Id3v2Frame.md).[correctEncoding](Id3v2Frame.md#correctencoding)

___

### find

▸ `Static` **find**(`frames`, `description`, `language`): [`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)

Gets the first unsynchronized lyrics frame from a list of frames that matches the provided
parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | [`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)[] | List of frames to search |
| `description` | `string` | Description to match |
| `language` | `string` | Optionally, ISO-639-2 language code to match |

#### Returns

[`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)

UnsynchronizedLyricsFrame Frame that matches provided parameters, `undefined` if a
    match was not found

___

### findAll

▸ `Static` **findAll**(`frames`, `description`, `language`): [`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)[]

Gets all unsynchronized lyrics frames that match the provided parameters from a list of
frames

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | [`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)[] | List of frames to search |
| `description` | `string` | Description to match |
| `language` | `string` | Optionally, ISO-639-2 language code to match |

#### Returns

[`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)[]

UnsynchronizedLyricsFrame[] List of frames matching provided parameters, empty
    array if no matches were found

___

### findPreferred

▸ `Static` **findPreferred**(`frames`, `description`, `language`): [`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)

Gets a specified unsynchronized frame from the list of frames, trying to match the
description and language but, failing a perfect match, accepting an incomplete match.
The method tries matching with the following order of precedence:
* First frame with a matching description and language
* First frame with a matching language
* First frame with a matching description
* First frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | [`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)[] | List of frames to search |
| `description` | `string` | Description to match |
| `language` | `string` | ISO-639-2 language code to match |

#### Returns

[`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)

___

### fromData

▸ `Static` **fromData**(`description`, `language?`, `encoding?`): [`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)

Constructs and initializes a new instance from the provided data

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `description` | `string` | `undefined` | Description of the frame |
| `language?` | `string` | `undefined` | ISO-639-2 language code for the content of the frame |
| `encoding` | [`StringType`](../enums/StringType.md) | `Id3v2Settings.defaultEncoding` | Encoding to use when storing the content of the frame |

#### Returns

[`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)

___

### fromOffsetRawData

▸ `Static` **fromOffsetRawData**(`data`, `offset`, `header`, `version`): [`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version. This method allows for offset reading from the data byte vector.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw representation of the new frame |
| `offset` | `number` | What offset in `data` the frame actually begins. Must be positive,     safe integer |
| `header` | [`Id3v2FrameHeader`](Id3v2FrameHeader.md) | Header of the frame found at `data` in the data |
| `version` | `number` | ID3v2 version the frame was originally encoded with |

#### Returns

[`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)

___

### fromRawData

▸ `Static` **fromRawData**(`data`, `version`): [`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw representation of the new frame |
| `version` | `number` | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer |

#### Returns

[`Id3v2UnsynchronizedFrame`](Id3v2UnsynchronizedFrame.md)
