[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2UserTextInformationFrame

# Class: Id3v2UserTextInformationFrame

## Hierarchy

- [`Id3v2TextInformationFrame`](Id3v2TextInformationFrame.md)

  ↳ **`Id3v2UserTextInformationFrame`**

## Table of contents

### Properties

- [\_encoding](Id3v2UserTextInformationFrame.md#_encoding)
- [\_rawData](Id3v2UserTextInformationFrame.md#_rawdata)
- [\_rawVersion](Id3v2UserTextInformationFrame.md#_rawversion)
- [\_textFields](Id3v2UserTextInformationFrame.md#_textfields)

### Accessors

- [description](Id3v2UserTextInformationFrame.md#description)
- [encryptionId](Id3v2UserTextInformationFrame.md#encryptionid)
- [flags](Id3v2UserTextInformationFrame.md#flags)
- [frameClassType](Id3v2UserTextInformationFrame.md#frameclasstype)
- [frameId](Id3v2UserTextInformationFrame.md#frameid)
- [groupId](Id3v2UserTextInformationFrame.md#groupid)
- [header](Id3v2UserTextInformationFrame.md#header)
- [size](Id3v2UserTextInformationFrame.md#size)
- [text](Id3v2UserTextInformationFrame.md#text)
- [textEncoding](Id3v2UserTextInformationFrame.md#textencoding)

### Methods

- [clone](Id3v2UserTextInformationFrame.md#clone)
- [fieldData](Id3v2UserTextInformationFrame.md#fielddata)
- [parseFields](Id3v2UserTextInformationFrame.md#parsefields)
- [parseRawData](Id3v2UserTextInformationFrame.md#parserawdata)
- [render](Id3v2UserTextInformationFrame.md#render)
- [renderFields](Id3v2UserTextInformationFrame.md#renderfields)
- [setData](Id3v2UserTextInformationFrame.md#setdata)
- [toString](Id3v2UserTextInformationFrame.md#tostring)
- [correctEncoding](Id3v2UserTextInformationFrame.md#correctencoding)
- [findTextInformationFrame](Id3v2UserTextInformationFrame.md#findtextinformationframe)
- [findUserTextInformationFrame](Id3v2UserTextInformationFrame.md#findusertextinformationframe)
- [fromDescription](Id3v2UserTextInformationFrame.md#fromdescription)
- [fromIdentifier](Id3v2UserTextInformationFrame.md#fromidentifier)
- [fromOffsetRawData](Id3v2UserTextInformationFrame.md#fromoffsetrawdata)
- [fromRawData](Id3v2UserTextInformationFrame.md#fromrawdata)

## Properties

### \_encoding

• `Protected` **\_encoding**: [`StringType`](../enums/StringType.md) = `Id3v2Settings.defaultEncoding`

#### Inherited from

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[_encoding](Id3v2TextInformationFrame.md#_encoding)

___

### \_rawData

• `Protected` **\_rawData**: [`ByteVector`](ByteVector.md)

#### Inherited from

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[_rawData](Id3v2TextInformationFrame.md#_rawdata)

___

### \_rawVersion

• `Protected` **\_rawVersion**: `number`

#### Inherited from

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[_rawVersion](Id3v2TextInformationFrame.md#_rawversion)

___

### \_textFields

• `Protected` **\_textFields**: `string`[] = `[]`

#### Inherited from

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[_textFields](Id3v2TextInformationFrame.md#_textfields)

## Accessors

### description

• `get` **description**(): `string`

Gets the description stored in the current instance.

#### Returns

`string`

• `set` **description**(`value`): `void`

Sets the description stored in the current instance.
There should only be one frame with the specified description per tag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Description to store in the current instance. |

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

TextInformationFrame.encryptionId

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

TextInformationFrame.encryptionId

___

### flags

• `get` **flags**(): [`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md)

Gets the frame flags applied to the current instance.

#### Returns

[`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md)

#### Inherited from

TextInformationFrame.flags

• `set` **flags**(`value`): `void`

Sets the frame flags applied to the current instance.
If the value includes either [Id3v2FrameFlags.Encryption](../enums/Id3v2FrameFlags.md#encryption) or
[Id3v2FrameFlags.Compression](../enums/Id3v2FrameFlags.md#compression), [render](Id3v2UserTextInformationFrame.md#render) will throw.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md) |

#### Returns

`void`

#### Inherited from

TextInformationFrame.flags

___

### frameClassType

• `get` **frameClassType**(): [`Id3v2FrameClassType`](../enums/Id3v2FrameClassType.md)

#### Returns

[`Id3v2FrameClassType`](../enums/Id3v2FrameClassType.md)

#### Overrides

TextInformationFrame.frameClassType

___

### frameId

• `get` **frameId**(): [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md)

Gets the frame ID for the current instance.

#### Returns

[`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md)

FrameIdentifier Object representing of the identifier of the frame

#### Inherited from

TextInformationFrame.frameId

___

### groupId

• `get` **groupId**(): `number`

Gets the grouping ID applied to the current instance.

#### Returns

`number`

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

#### Inherited from

TextInformationFrame.groupId

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

TextInformationFrame.groupId

___

### header

• `Protected` `get` **header**(): [`Id3v2FrameHeader`](Id3v2FrameHeader.md)

Gets the header for the frame. For new frames this should not exist.

#### Returns

[`Id3v2FrameHeader`](Id3v2FrameHeader.md)

#### Inherited from

TextInformationFrame.header

• `Protected` `set` **header**(`value`): `void`

Sets the header for the frame.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Id3v2FrameHeader`](Id3v2FrameHeader.md) | Header for the frame |

#### Returns

`void`

#### Inherited from

TextInformationFrame.header

___

### size

• `get` **size**(): `number`

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

#### Returns

`number`

#### Inherited from

TextInformationFrame.size

___

### text

• `get` **text**(): `string`[]

Gets the text contained in the current instance.
NOTE: Modifying the contents of the returned value will not modify the contents of the
current instance. The value must be reassigned for the value to change.

#### Returns

`string`[]

#### Overrides

TextInformationFrame.text

• `set` **text**(`value`): `void`

Sets the text contained in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Array of text values to store in the current instance |

#### Returns

`void`

#### Overrides

TextInformationFrame.text

___

### textEncoding

• `get` **textEncoding**(): [`StringType`](../enums/StringType.md)

Gets the text encoding to use when rendering the current instance.

#### Returns

[`StringType`](../enums/StringType.md)

#### Inherited from

TextInformationFrame.textEncoding

• `set` **textEncoding**(`value`): `void`

Sets the text encoding to use when rendering the current instance.
This value will be overridden if [Id3v2Settings.forceDefaultEncoding](Id3v2Settings.md#forcedefaultencoding) is `true`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`StringType`](../enums/StringType.md) |

#### Returns

`void`

#### Inherited from

TextInformationFrame.textEncoding

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

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[clone](Id3v2TextInformationFrame.md#clone)

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

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[fieldData](Id3v2TextInformationFrame.md#fielddata)

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

#### Inherited from

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[parseFields](Id3v2TextInformationFrame.md#parsefields)

___

### parseRawData

▸ `Protected` **parseRawData**(): `void`

Performs the actual parsing of the raw data.
Because of the high parsing cost and relatively low usage of the class [parseFields](Id3v2UserTextInformationFrame.md#parsefields)
only stores the field data so it can be parsed on demand. Whenever a property or method is
called which requires the data, this method is called, and only on the first call does it
actually parse the data.

#### Returns

`void`

#### Inherited from

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[parseRawData](Id3v2TextInformationFrame.md#parserawdata)

___

### render

▸ **render**(`version`): [`ByteVector`](ByteVector.md)

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | ID3v2 version to use when encoding the current instance. Must be a positive     8-bit integer. |

#### Returns

[`ByteVector`](ByteVector.md)

ByteVector Rendered version of the current instance.

#### Inherited from

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[render](Id3v2TextInformationFrame.md#render)

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

#### Inherited from

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[renderFields](Id3v2TextInformationFrame.md#renderfields)

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

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[setData](Id3v2TextInformationFrame.md#setdata)

___

### toString

▸ **toString**(): `string`

Returns a text representation of the current instance by combining the text with semicolons.

#### Returns

`string`

#### Overrides

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[toString](Id3v2TextInformationFrame.md#tostring)

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

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[correctEncoding](Id3v2TextInformationFrame.md#correctencoding)

___

### findTextInformationFrame

▸ `Static` **findTextInformationFrame**(`frames`, `ident`): [`Id3v2TextInformationFrame`](Id3v2TextInformationFrame.md)

Gets a [TextInformationFrame](../enums/Id3v2FrameClassType.md#textinformationframe) object of a specified type from a specified type from a
list of text information frames.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | [`Id3v2TextInformationFrame`](Id3v2TextInformationFrame.md)[] | List of frames to search |
| `ident` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) | Frame identifier to search for |

#### Returns

[`Id3v2TextInformationFrame`](Id3v2TextInformationFrame.md)

TextInformationFrame Matching frame if it exists in `tag`, `undefined` if
    a matching frame was not found

#### Inherited from

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[findTextInformationFrame](Id3v2TextInformationFrame.md#findtextinformationframe)

___

### findUserTextInformationFrame

▸ `Static` **findUserTextInformationFrame**(`frames`, `description`, `caseSensitive?`): [`Id3v2UserTextInformationFrame`](Id3v2UserTextInformationFrame.md)

Gets a user text information frame from a specified tag

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `frames` | [`Id3v2UserTextInformationFrame`](Id3v2UserTextInformationFrame.md)[] | `undefined` | Object to search in |
| `description` | `string` | `undefined` | Description to use to match the frame in the `tag` |
| `caseSensitive` | `boolean` | `true` | Whether or not to search for the frame case-sensitively. |

#### Returns

[`Id3v2UserTextInformationFrame`](Id3v2UserTextInformationFrame.md)

UserTextInformationFrame Frame containing the matching user, `undefined` if a match
    was not found

___

### fromDescription

▸ `Static` **fromDescription**(`description`, `encoding?`): [`Id3v2UserTextInformationFrame`](Id3v2UserTextInformationFrame.md)

Constructs and initializes a new instance with a specified description and text encoding.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `description` | `string` | `undefined` | Description of the new frame |
| `encoding` | [`StringType`](../enums/StringType.md) | `Id3v2Settings.defaultEncoding` | Text encoding to use when rendering the new frame |

#### Returns

[`Id3v2UserTextInformationFrame`](Id3v2UserTextInformationFrame.md)

___

### fromIdentifier

▸ `Static` **fromIdentifier**(`identifier`, `encoding?`): [`Id3v2TextInformationFrame`](Id3v2TextInformationFrame.md)

Constructs and initializes a new instance with a specified identifier

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `identifier` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) | `undefined` | Byte vector containing the identifier for the frame |
| `encoding` | [`StringType`](../enums/StringType.md) | `Id3v2Settings.defaultEncoding` | Optionally, the encoding to use for the new instance. If omitted, defaults     to [Id3v2Settings.defaultEncoding](Id3v2Settings.md#defaultencoding) |

#### Returns

[`Id3v2TextInformationFrame`](Id3v2TextInformationFrame.md)

#### Inherited from

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[fromIdentifier](Id3v2TextInformationFrame.md#fromidentifier)

___

### fromOffsetRawData

▸ `Static` **fromOffsetRawData**(`data`, `offset`, `header`, `version`): [`Id3v2UserTextInformationFrame`](Id3v2UserTextInformationFrame.md)

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

[`Id3v2UserTextInformationFrame`](Id3v2UserTextInformationFrame.md)

#### Overrides

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[fromOffsetRawData](Id3v2TextInformationFrame.md#fromoffsetrawdata)

___

### fromRawData

▸ `Static` **fromRawData**(`data`, `version`): [`Id3v2UserTextInformationFrame`](Id3v2UserTextInformationFrame.md)

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw representation of the new frame |
| `version` | `number` | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer |

#### Returns

[`Id3v2UserTextInformationFrame`](Id3v2UserTextInformationFrame.md)

#### Overrides

[Id3v2TextInformationFrame](Id3v2TextInformationFrame.md).[fromRawData](Id3v2TextInformationFrame.md#fromrawdata)
