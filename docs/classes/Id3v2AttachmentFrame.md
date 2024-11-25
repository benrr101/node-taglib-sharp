[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2AttachmentFrame

# Class: Id3v2AttachmentFrame

Interface that provides generic information about a picture, including its contents, as used by
various formats.

## Hierarchy

- [`Id3v2Frame`](Id3v2Frame.md)

  ↳ **`Id3v2AttachmentFrame`**

## Implements

- [`IPicture`](../interfaces/IPicture.md)

## Table of contents

### Accessors

- [data](Id3v2AttachmentFrame.md#data)
- [description](Id3v2AttachmentFrame.md#description)
- [encryptionId](Id3v2AttachmentFrame.md#encryptionid)
- [filename](Id3v2AttachmentFrame.md#filename)
- [flags](Id3v2AttachmentFrame.md#flags)
- [frameClassType](Id3v2AttachmentFrame.md#frameclasstype)
- [frameId](Id3v2AttachmentFrame.md#frameid)
- [groupId](Id3v2AttachmentFrame.md#groupid)
- [header](Id3v2AttachmentFrame.md#header)
- [mimeType](Id3v2AttachmentFrame.md#mimetype)
- [size](Id3v2AttachmentFrame.md#size)
- [textEncoding](Id3v2AttachmentFrame.md#textencoding)
- [type](Id3v2AttachmentFrame.md#type)

### Methods

- [clone](Id3v2AttachmentFrame.md#clone)
- [fieldData](Id3v2AttachmentFrame.md#fielddata)
- [parseFields](Id3v2AttachmentFrame.md#parsefields)
- [render](Id3v2AttachmentFrame.md#render)
- [renderFields](Id3v2AttachmentFrame.md#renderfields)
- [setData](Id3v2AttachmentFrame.md#setdata)
- [toString](Id3v2AttachmentFrame.md#tostring)
- [correctEncoding](Id3v2AttachmentFrame.md#correctencoding)
- [find](Id3v2AttachmentFrame.md#find)
- [fromOffsetRawData](Id3v2AttachmentFrame.md#fromoffsetrawdata)
- [fromPicture](Id3v2AttachmentFrame.md#frompicture)
- [fromRawData](Id3v2AttachmentFrame.md#fromrawdata)

## Accessors

### data

• `get` **data**(): [`ByteVector`](ByteVector.md)

Gets the image data stored in the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

#### Implementation of

[IPicture](../interfaces/IPicture.md).[data](../interfaces/IPicture.md#data)

• `set` **data**(`value`): `void`

Sets the image data stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ByteVector`](ByteVector.md) |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[data](../interfaces/IPicture.md#data)

___

### description

• `get` **description**(): `string`

Gets the description stored in the current instance.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[description](../interfaces/IPicture.md#description)

• `set` **description**(`value`): `void`

Sets the description stored in the current instance.
There should only be one frame with a matching description and type per tag.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[description](../interfaces/IPicture.md#description)

___

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

### filename

• `get` **filename**(): `string`

Gets a filename of the picture stored in the current instance.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[filename](../interfaces/IPicture.md#filename)

• `set` **filename**(`value`): `void`

Sets a filename of the picture stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[filename](../interfaces/IPicture.md#filename)

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
[Compression](../enums/Id3v2FrameFlags.md#compression), [render](Id3v2AttachmentFrame.md#render) will throw.

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

### mimeType

• `get` **mimeType**(): `string`

Gets the MimeType of the picture stored in the current instance.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[mimeType](../interfaces/IPicture.md#mimetype)

• `set` **mimeType**(`value`): `void`

Sets the MimeType of the picture stored in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MimeType of the picture stored in the current instance. |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[mimeType](../interfaces/IPicture.md#mimetype)

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

### textEncoding

• `get` **textEncoding**(): [`StringType`](../enums/StringType.md)

Gets the text encoding to use when storing the current instance.

**`Value`**

Text encoding to use when storing the current instance.

#### Returns

[`StringType`](../enums/StringType.md)

• `set` **textEncoding**(`value`): `void`

Sets the text encoding to use when storing the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`StringType`](../enums/StringType.md) | Text encoding to use when storing the current instance. This encoding is overridden when rendering if [forceDefaultEncoding](Id3v2Settings.md#forcedefaultencoding) is `true` or the render version does not support it. |

#### Returns

`void`

___

### type

• `get` **type**(): [`PictureType`](../enums/PictureType.md)

Gets the object type stored in the current instance.

#### Returns

[`PictureType`](../enums/PictureType.md)

#### Implementation of

[IPicture](../interfaces/IPicture.md).[type](../interfaces/IPicture.md#type)

• `set` **type**(`value`): `void`

Sets the object type stored in the current instance.
For General Object Frame, use [NotAPicture](../enums/PictureType.md#notapicture). Other types will make it a
Picture Frame.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`PictureType`](../enums/PictureType.md) |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[type](../interfaces/IPicture.md#type)

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

Generates a string representation of the current instance.

**`Deprecated`**

No need for this.

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

### find

▸ `Static` **find**(`frames`, `description?`, `type?`): [`Id3v2AttachmentFrame`](Id3v2AttachmentFrame.md)

Get a specified attachment frame from the specified tag, optionally creating it if it does
not exist.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `frames` | [`Id3v2AttachmentFrame`](Id3v2AttachmentFrame.md)[] | `undefined` | List of attachment frames to search |
| `description?` | `string` | `undefined` | Description to match |
| `type` | [`PictureType`](../enums/PictureType.md) | `PictureType.Other` | Picture type to match |

#### Returns

[`Id3v2AttachmentFrame`](Id3v2AttachmentFrame.md)

Matching frame or `undefined` if a match wasn't found and `create` is `false`

___

### fromOffsetRawData

▸ `Static` **fromOffsetRawData**(`data`, `offset`, `header`, `version`): [`Id3v2AttachmentFrame`](Id3v2AttachmentFrame.md)

Constructs and initializes a new attachment frame by reading its raw data in a specified
ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | ByteVector containing the raw representation of the new frame |
| `offset` | `number` | Index into `data` where the frame actually begins |
| `header` | [`Id3v2FrameHeader`](Id3v2FrameHeader.md) | Header of the frame found at `offset` in the data |
| `version` | `number` | ID3v2 version the frame was originally encoded with |

#### Returns

[`Id3v2AttachmentFrame`](Id3v2AttachmentFrame.md)

___

### fromPicture

▸ `Static` **fromPicture**(`picture`): [`Id3v2AttachmentFrame`](Id3v2AttachmentFrame.md)

Constructs and initializes a new attachment frame by populating it with the contents of
another [IPicture](../interfaces/IPicture.md) object.

**`Remarks`**

When a frame is created, it is not automatically added to the tag.
    Additionally, see [pictures](Tag.md#pictures) provides a generic way of getting and setting
    attachments which is preferable to format specific code.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `picture` | [`IPicture`](../interfaces/IPicture.md) | Value to use in the new instance. |

#### Returns

[`Id3v2AttachmentFrame`](Id3v2AttachmentFrame.md)

___

### fromRawData

▸ `Static` **fromRawData**(`data`, `version`): [`Id3v2AttachmentFrame`](Id3v2AttachmentFrame.md)

Constructs and initializes a new attachment frame by reading its raw data in a specified
Id3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | ByteVector starting with the raw representation of the new frame |
| `version` | `number` | ID3v2 version the raw frame is encoded with. |

#### Returns

[`Id3v2AttachmentFrame`](Id3v2AttachmentFrame.md)
