[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2UserUrlLinkFrame

# Class: Id3v2UserUrlLinkFrame

Provides support for ID3v2 User URL Link frames (WXXX).

## Hierarchy

- [`Id3v2UrlLinkFrame`](Id3v2UrlLinkFrame.md)

  ↳ **`Id3v2UserUrlLinkFrame`**

## Table of contents

### Properties

- [\_encoding](Id3v2UserUrlLinkFrame.md#_encoding)
- [\_rawData](Id3v2UserUrlLinkFrame.md#_rawdata)
- [\_rawVersion](Id3v2UserUrlLinkFrame.md#_rawversion)
- [\_textFields](Id3v2UserUrlLinkFrame.md#_textfields)

### Accessors

- [description](Id3v2UserUrlLinkFrame.md#description)
- [encryptionId](Id3v2UserUrlLinkFrame.md#encryptionid)
- [flags](Id3v2UserUrlLinkFrame.md#flags)
- [frameClassType](Id3v2UserUrlLinkFrame.md#frameclasstype)
- [frameId](Id3v2UserUrlLinkFrame.md#frameid)
- [groupId](Id3v2UserUrlLinkFrame.md#groupid)
- [header](Id3v2UserUrlLinkFrame.md#header)
- [size](Id3v2UserUrlLinkFrame.md#size)
- [text](Id3v2UserUrlLinkFrame.md#text)
- [textEncoding](Id3v2UserUrlLinkFrame.md#textencoding)

### Methods

- [clone](Id3v2UserUrlLinkFrame.md#clone)
- [fieldData](Id3v2UserUrlLinkFrame.md#fielddata)
- [parseFields](Id3v2UserUrlLinkFrame.md#parsefields)
- [parseRawData](Id3v2UserUrlLinkFrame.md#parserawdata)
- [render](Id3v2UserUrlLinkFrame.md#render)
- [renderFields](Id3v2UserUrlLinkFrame.md#renderfields)
- [setData](Id3v2UserUrlLinkFrame.md#setdata)
- [toString](Id3v2UserUrlLinkFrame.md#tostring)
- [correctEncoding](Id3v2UserUrlLinkFrame.md#correctencoding)
- [findUrlLinkFrame](Id3v2UserUrlLinkFrame.md#findurllinkframe)
- [findUserUrlLinkFrame](Id3v2UserUrlLinkFrame.md#finduserurllinkframe)
- [fromDescription](Id3v2UserUrlLinkFrame.md#fromdescription)
- [fromIdentity](Id3v2UserUrlLinkFrame.md#fromidentity)
- [fromOffsetRawData](Id3v2UserUrlLinkFrame.md#fromoffsetrawdata)
- [fromRawData](Id3v2UserUrlLinkFrame.md#fromrawdata)

## Properties

### \_encoding

• `Protected` **\_encoding**: [`StringType`](../enums/StringType.md) = `StringType.Latin1`

Text encoding to use to store the text contents of the current instance.

#### Inherited from

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[_encoding](Id3v2UrlLinkFrame.md#_encoding)

___

### \_rawData

• `Protected` **\_rawData**: [`ByteVector`](ByteVector.md)

Raw data contents in the current instance.

#### Inherited from

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[_rawData](Id3v2UrlLinkFrame.md#_rawdata)

___

### \_rawVersion

• `Protected` **\_rawVersion**: `number`

ID3v2 version of the current instance.

#### Inherited from

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[_rawVersion](Id3v2UrlLinkFrame.md#_rawversion)

___

### \_textFields

• `Protected` **\_textFields**: `string`[] = `[]`

Decoded text contained in the current instance.

#### Inherited from

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[_textFields](Id3v2UrlLinkFrame.md#_textfields)

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

Value containing the encryption identifier for the current instance or
    `undefined` if not set.

#### Inherited from

UrlLinkFrame.encryptionId

• `set` **encryptionId**(`value`): `void`

Sets the encryption ID applied to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Value containing the encryption identifier for the current instance. Must be an 8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID |

#### Returns

`void`

#### Inherited from

UrlLinkFrame.encryptionId

___

### flags

• `get` **flags**(): [`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md)

Gets the frame flags applied to the current instance.

#### Returns

[`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md)

#### Inherited from

UrlLinkFrame.flags

• `set` **flags**(`value`): `void`

Sets the frame flags applied to the current instance.
If the value includes either [Encryption](../enums/Id3v2FrameFlags.md#encryption) or
[Compression](../enums/Id3v2FrameFlags.md#compression), [render](Id3v2UserUrlLinkFrame.md#render) will throw.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md) |

#### Returns

`void`

#### Inherited from

UrlLinkFrame.flags

___

### frameClassType

• `get` **frameClassType**(): [`Id3v2FrameClassType`](../enums/Id3v2FrameClassType.md)

Gets a flag indicating which type of frame the current instance is.

#### Returns

[`Id3v2FrameClassType`](../enums/Id3v2FrameClassType.md)

#### Overrides

UrlLinkFrame.frameClassType

___

### frameId

• `get` **frameId**(): [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md)

Gets the frame ID for the current instance.

#### Returns

[`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md)

Object representing of the identifier of the frame

#### Inherited from

UrlLinkFrame.frameId

___

### groupId

• `get` **groupId**(): `number`

Gets the grouping ID applied to the current instance.

#### Returns

`number`

Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

#### Inherited from

UrlLinkFrame.groupId

• `set` **groupId**(`value`): `void`

Sets the grouping ID applied to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Grouping identifier for the current instance. Must be an 8-bit unsigned integer. Setting to `undefined` will remove the grouping identity header and ID |

#### Returns

`void`

#### Inherited from

UrlLinkFrame.groupId

___

### header

• `Protected` `get` **header**(): [`Id3v2FrameHeader`](Id3v2FrameHeader.md)

Gets the header for the frame. For new frames this should not exist.

#### Returns

[`Id3v2FrameHeader`](Id3v2FrameHeader.md)

#### Inherited from

UrlLinkFrame.header

• `Protected` `set` **header**(`value`): `void`

Sets the header for the frame.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Id3v2FrameHeader`](Id3v2FrameHeader.md) | Header for the frame |

#### Returns

`void`

#### Inherited from

UrlLinkFrame.header

___

### size

• `get` **size**(): `number`

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

#### Returns

`number`

#### Inherited from

UrlLinkFrame.size

___

### text

• `get` **text**(): `string`[]

Gets the text contained in the current instance.
NOTE: Modifying the contents of the returned value will not modify the contents of the
current instance. The value must be reassigned for the value to change.

#### Returns

`string`[]

#### Overrides

UrlLinkFrame.text

• `set` **text**(`value`): `void`

Sets the text contained in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

#### Overrides

UrlLinkFrame.text

___

### textEncoding

• `get` **textEncoding**(): [`StringType`](../enums/StringType.md)

Gets the text encoding to use when rendering the current instance.

#### Returns

[`StringType`](../enums/StringType.md)

#### Inherited from

UrlLinkFrame.textEncoding

• `set` **textEncoding**(`value`): `void`

Sets the text encoding to use when rendering the current instance.
NOTE: This value will be overwritten if [forceDefaultEncoding](Id3v2Settings.md#forcedefaultencoding) is `true`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`StringType`](../enums/StringType.md) |

#### Returns

`void`

#### Inherited from

UrlLinkFrame.textEncoding

## Methods

### clone

▸ **clone**(): [`Id3v2UserUrlLinkFrame`](Id3v2UserUrlLinkFrame.md)

Creates a deep copy of the current instance.
This method is implemented by rendering the current instance as an ID3v2.4 frame and using
the frame factory to create a new frame. As such, this method should be overridden by child
classes.

#### Returns

[`Id3v2UserUrlLinkFrame`](Id3v2UserUrlLinkFrame.md)

#### Overrides

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[clone](Id3v2UrlLinkFrame.md#clone)

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

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[fieldData](Id3v2UrlLinkFrame.md#fielddata)

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

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[parseFields](Id3v2UrlLinkFrame.md#parsefields)

___

### parseRawData

▸ `Protected` **parseRawData**(): `void`

Performs the actual parsing of the raw data.

**`Remarks`**

Because of the high parsing cost and relatively low usage of the class,
    [parseFields](Id3v2UserUrlLinkFrame.md#parsefields) only stores the field data, so it can be parsed on demand. Whenever
    a property or method is called which requires the data, this method is called, and only
    on the first call does it actually parse the data.

#### Returns

`void`

#### Inherited from

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[parseRawData](Id3v2UrlLinkFrame.md#parserawdata)

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

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[render](Id3v2UrlLinkFrame.md#render)

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

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[renderFields](Id3v2UrlLinkFrame.md#renderfields)

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

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[setData](Id3v2UrlLinkFrame.md#setdata)

___

### toString

▸ **toString**(): `string`

Generates a string representation of the URL link frame.

#### Returns

`string`

#### Overrides

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[toString](Id3v2UrlLinkFrame.md#tostring)

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

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[correctEncoding](Id3v2UrlLinkFrame.md#correctencoding)

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

#### Inherited from

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[findUrlLinkFrame](Id3v2UrlLinkFrame.md#findurllinkframe)

___

### findUserUrlLinkFrame

▸ `Static` **findUserUrlLinkFrame**(`frames`, `description`): [`Id3v2UserUrlLinkFrame`](Id3v2UserUrlLinkFrame.md)

Gets a frame from a list of frames.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | [`Id3v2UserUrlLinkFrame`](Id3v2UserUrlLinkFrame.md)[] | List of frames to search |
| `description` | `string` | Description of the frame to match |

#### Returns

[`Id3v2UserUrlLinkFrame`](Id3v2UserUrlLinkFrame.md)

Frame containing the matching user, `undefined` if a match was not found

___

### fromDescription

▸ `Static` **fromDescription**(`description`): [`Id3v2UserUrlLinkFrame`](Id3v2UserUrlLinkFrame.md)

Constructs and initializes a new instance using the provided description as the text
of the frame.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | `string` | Description to use as text of the frame. |

#### Returns

[`Id3v2UserUrlLinkFrame`](Id3v2UserUrlLinkFrame.md)

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

#### Inherited from

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[fromIdentity](Id3v2UrlLinkFrame.md#fromidentity)

___

### fromOffsetRawData

▸ `Static` **fromOffsetRawData**(`data`, `offset`, `header`, `version`): [`Id3v2UserUrlLinkFrame`](Id3v2UserUrlLinkFrame.md)

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

[`Id3v2UserUrlLinkFrame`](Id3v2UserUrlLinkFrame.md)

#### Overrides

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[fromOffsetRawData](Id3v2UrlLinkFrame.md#fromoffsetrawdata)

___

### fromRawData

▸ `Static` **fromRawData**(`data`, `version`): [`Id3v2UserUrlLinkFrame`](Id3v2UserUrlLinkFrame.md)

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw representation of the new frame |
| `version` | `number` | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer |

#### Returns

[`Id3v2UserUrlLinkFrame`](Id3v2UserUrlLinkFrame.md)

#### Overrides

[Id3v2UrlLinkFrame](Id3v2UrlLinkFrame.md).[fromRawData](Id3v2UrlLinkFrame.md#fromrawdata)
