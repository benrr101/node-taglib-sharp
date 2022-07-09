[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2TagFooter

# Class: Id3v2TagFooter

## Table of contents

### Constructors

- [constructor](Id3v2TagFooter.md#constructor)

### Properties

- [FILE\_IDENTIFIER](Id3v2TagFooter.md#file_identifier)

### Accessors

- [completeTagSize](Id3v2TagFooter.md#completetagsize)
- [flags](Id3v2TagFooter.md#flags)
- [majorVersion](Id3v2TagFooter.md#majorversion)
- [revisionNumber](Id3v2TagFooter.md#revisionnumber)
- [tagSize](Id3v2TagFooter.md#tagsize)

### Methods

- [render](Id3v2TagFooter.md#render)
- [fromData](Id3v2TagFooter.md#fromdata)
- [fromHeader](Id3v2TagFooter.md#fromheader)

## Constructors

### constructor

• **new Id3v2TagFooter**()

## Properties

### FILE\_IDENTIFIER

▪ `Static` `Readonly` **FILE\_IDENTIFIER**: [`ByteVector`](ByteVector.md)

Identifier used to recognize an ID3v2 footer.

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
| `value` | [`Id3v2TagHeaderFlags`](../enums/Id3v2TagHeaderFlags.md) | Bitwise combined [Id3v2TagHeaderFlags](../enums/Id3v2TagHeaderFlags.md) value containing the flags to apply     to the current instance. |

#### Returns

`void`

___

### majorVersion

• `get` **majorVersion**(): `number`

Sets the major version of the tag described by the current instance.

#### Returns

`number`

• `set` **majorVersion**(`value`): `void`

Sets the major version of the tag described by the current instance.
When the version is set, unsupported header flags will automatically be removed from the
tag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | ID3v2 version if tag described by the current instance. Footers are only     supported with version 4, so this value can only be 4. |

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
footer. NOTE THIS MUST BE AN 28-BIT UNSIGNED INTEGER.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Size of the tag in bytes. Must be an unsigned 28-bit integer |

#### Returns

`void`

## Methods

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromData

▸ `Static` **fromData**(`data`): [`Id3v2TagFooter`](Id3v2TagFooter.md)

Constructs and initializes a new instance by reading it from raw footer data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw data to build the instance from |

#### Returns

[`Id3v2TagFooter`](Id3v2TagFooter.md)

___

### fromHeader

▸ `Static` **fromHeader**(`header`): [`Id3v2TagFooter`](Id3v2TagFooter.md)

Constructs and initializes a new footer based on the contents of the header used for the
same tag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`Id3v2TagHeader`](Id3v2TagHeader.md) | Header from which to base the new footer |

#### Returns

[`Id3v2TagFooter`](Id3v2TagFooter.md)
