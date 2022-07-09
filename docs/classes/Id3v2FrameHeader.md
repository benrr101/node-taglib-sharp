[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2FrameHeader

# Class: Id3v2FrameHeader

## Table of contents

### Constructors

- [constructor](Id3v2FrameHeader.md#constructor)

### Accessors

- [flags](Id3v2FrameHeader.md#flags)
- [frameId](Id3v2FrameHeader.md#frameid)
- [frameSize](Id3v2FrameHeader.md#framesize)

### Methods

- [render](Id3v2FrameHeader.md#render)
- [fromData](Id3v2FrameHeader.md#fromdata)
- [fromFrameIdentifier](Id3v2FrameHeader.md#fromframeidentifier)
- [getSize](Id3v2FrameHeader.md#getsize)

## Constructors

### constructor

• **new Id3v2FrameHeader**(`id`, `flags?`, `frameSize?`)

Constructs and initializes a new instance by processing the data for the frame header.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `id` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) | `undefined` | Identifier of the frame |
| `flags` | [`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md) | `Id3v2FrameFlags.None` | Flags to assign to the frame (if omitted, defaults to     [Id3v2FrameFlags.None](../enums/Id3v2FrameFlags.md#none)) |
| `frameSize` | `number` | `0` | Size of the frame in bytes, excluding the size of the header (if omitted,     defaults to 0) |

## Accessors

### flags

• `get` **flags**(): [`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md)

Gets the flags applied to the current instance.

#### Returns

[`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md)

• `set` **flags**(`value`): `void`

Sets the flags applied to the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Id3v2FrameFlags`](../enums/Id3v2FrameFlags.md) |

#### Returns

`void`

___

### frameId

• `get` **frameId**(): [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md)

Gets the identifier of the frame described by the current instance.

#### Returns

[`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md)

• `set` **frameId**(`value`): `void`

Sets the identifier of the frame described by the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) |

#### Returns

`void`

___

### frameSize

• `get` **frameSize**(): `number`

Gets the size of the frame described by the current instance, minus the header.

#### Returns

`number`

• `set` **frameSize**(`value`): `void`

Sets the size of the frame described by the current instance, minus the header.
Must be a positive, safe integer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

## Methods

### render

▸ **render**(`version`): [`ByteVector`](ByteVector.md)

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | Version of ID3v2 to use when encoding the current instance. |

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromData

▸ `Static` **fromData**(`data`, `version`): [`Id3v2FrameHeader`](Id3v2FrameHeader.md)

Constructs and initializes a new instance of [Id3v2FrameHeader](Id3v2FrameHeader.md) by reading it from raw
header data of a specified version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw data to build the new instance from.     If the data size is smaller than the size of a full header, the data is just treated as     a frame identifier and the remaining values are zeroed. |
| `version` | `number` | ID3v2 version with which the data in `data` was encoded. |

#### Returns

[`Id3v2FrameHeader`](Id3v2FrameHeader.md)

___

### fromFrameIdentifier

▸ `Static` **fromFrameIdentifier**(`id`): [`Id3v2FrameHeader`](Id3v2FrameHeader.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) |

#### Returns

[`Id3v2FrameHeader`](Id3v2FrameHeader.md)

___

### getSize

▸ `Static` **getSize**(`version`): `number`

Gets the size of a header for a specified ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | Version of ID3v2 to get the size for. Must be a positive integer < 256 |

#### Returns

`number`
