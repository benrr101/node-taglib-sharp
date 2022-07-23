[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2TagHeader

# Class: Id3v2TagHeader

## Table of contents

### Constructors

- [constructor](Id3v2TagHeader.md#constructor)

### Properties

- [FILE\_IDENTIFIER](Id3v2TagHeader.md#file_identifier)

### Accessors

- [completeTagSize](Id3v2TagHeader.md#completetagsize)
- [flags](Id3v2TagHeader.md#flags)
- [majorVersion](Id3v2TagHeader.md#majorversion)
- [revisionNumber](Id3v2TagHeader.md#revisionnumber)
- [tagSize](Id3v2TagHeader.md#tagsize)

### Methods

- [render](Id3v2TagHeader.md#render)
- [fromData](Id3v2TagHeader.md#fromdata)

## Constructors

### constructor

• **new Id3v2TagHeader**()

## Properties

### FILE\_IDENTIFIER

▪ `Static` `Readonly` **FILE\_IDENTIFIER**: [`ByteVector`](ByteVector.md)

The identifier used to recognize an ID3v2 header.

## Accessors

### completeTagSize

• `get` **completeTagSize**(): `number`

Gets the complete size of the tag described by the current instance including the header
and footer.

#### Returns

`number`

___

### flags

• `get` **flags**(): [`Id3v2TagHeaderFlags`](../enums/Id3v2TagHeaderFlags.md)

Gets the flags applied to the current instance.

#### Returns

[`Id3v2TagHeaderFlags`](../enums/Id3v2TagHeaderFlags.md)

• `set` **flags**(`value`): `void`

Sets the flags applied to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Id3v2TagHeaderFlags`](../enums/Id3v2TagHeaderFlags.md) | Bitwise combined [Id3v2TagHeaderFlags](../enums/Id3v2TagHeaderFlags.md) value containing the flags to apply to the     current instance. |

#### Returns

`void`

___

### majorVersion

• `get` **majorVersion**(): `number`

Gets the major version of the tag described by the current instance.

#### Returns

`number`

• `set` **majorVersion**(`value`): `void`

Sets the major version of the tag described by the current instance.
When the version is set, unsupported header flags will automatically be removed from the
tag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | ID3v2 version of tag. Must be a positive 8-bit integer betweenInclusive 2 and 4. |

#### Returns

`void`

___

### revisionNumber

• `get` **revisionNumber**(): `number`

Gets the version revision number of the tag represented by the current instance.

#### Returns

`number`

• `set` **revisionNumber**(`value`): `void`

Sets the version revision number of the tag represented by the current instance.
This value should always be zero. Non-zero values indicate an experimental or new version of
the format which may not be completely understood by the current version of
node-taglib-sharp. Some software may refuse to read tags with a non-zero value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Version revision number of the tag represented by the current instance. Must be     an 8-bit unsigned integer. |

#### Returns

`void`

___

### tagSize

• `get` **tagSize**(): `number`

Gets the complete size of the tag described by the current instance, minus the header and
footer.

#### Returns

`number`

• `set` **tagSize**(`value`): `void`

Sets the complete size of the tag described by the current instance, minus the header
footer. NOTE THIS MUST BE A 28-BIT UNSIGNED INTEGER.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Size of the tag in bytes. Must be an unsigned 28-bit integer |

#### Returns

`void`

## Methods

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

Renders the current instance as a raw ID3v2 header

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromData

▸ `Static` **fromData**(`data`): [`Id3v2TagHeader`](Id3v2TagHeader.md)

Constructs and initializes a new instance by reading it from the raw header data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Object containing the raw data to build the new instance from. |

#### Returns

[`Id3v2TagHeader`](Id3v2TagHeader.md)
