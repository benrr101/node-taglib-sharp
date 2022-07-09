[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2EventTimeCode

# Class: Id3v2EventTimeCode

## Table of contents

### Constructors

- [constructor](Id3v2EventTimeCode.md#constructor)

### Accessors

- [eventType](Id3v2EventTimeCode.md#eventtype)
- [time](Id3v2EventTimeCode.md#time)

### Methods

- [clone](Id3v2EventTimeCode.md#clone)
- [render](Id3v2EventTimeCode.md#render)
- [fromEmpty](Id3v2EventTimeCode.md#fromempty)

## Constructors

### constructor

• **new Id3v2EventTimeCode**(`eventType`, `time`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventType` | [`Id3v2EventType`](../enums/Id3v2EventType.md) |
| `time` | `number` |

## Accessors

### eventType

• `get` **eventType**(): [`Id3v2EventType`](../enums/Id3v2EventType.md)

#### Returns

[`Id3v2EventType`](../enums/Id3v2EventType.md)

• `set` **eventType**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Id3v2EventType`](../enums/Id3v2EventType.md) |

#### Returns

`void`

___

### time

• `get` **time**(): `number`

#### Returns

`number`

• `set` **time**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

## Methods

### clone

▸ **clone**(): [`Id3v2EventTimeCode`](Id3v2EventTimeCode.md)

Creates a copy of this instance

#### Returns

[`Id3v2EventTimeCode`](Id3v2EventTimeCode.md)

___

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`Id3v2EventTimeCode`](Id3v2EventTimeCode.md)

#### Returns

[`Id3v2EventTimeCode`](Id3v2EventTimeCode.md)
