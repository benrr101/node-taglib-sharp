[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2EventTimeCode

# Class: Id3v2EventTimeCode

Class that represents an event for usage in a EventTimeCodeFrame.

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

Constructs and initializes a new instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventType` | [`Id3v2EventType`](../enums/Id3v2EventType.md) | Type of event the instance represents |
| `time` | `number` | Timestamp when the event occurs |

## Accessors

### eventType

• `get` **eventType**(): [`Id3v2EventType`](../enums/Id3v2EventType.md)

Gets the type of the event the current instance represents.

#### Returns

[`Id3v2EventType`](../enums/Id3v2EventType.md)

• `set` **eventType**(`value`): `void`

Sets the type of the event the current instance represents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Id3v2EventType`](../enums/Id3v2EventType.md) | Type of the event |

#### Returns

`void`

___

### time

• `get` **time**(): `number`

Gets the timestamp when the event occurs. The format of the value is determined by the
frame that contains the timecode event.

#### Returns

`number`

• `set` **time**(`value`): `void`

Sets the timestamp when the event occurs. The format of the value is determined by the
frame that contains the timecode event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Timestamp when the event occurs. |

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

Generates the byte representation of the event time code.

#### Returns

[`ByteVector`](ByteVector.md)

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`Id3v2EventTimeCode`](Id3v2EventTimeCode.md)

Constructs and initializes a blank new instance of type EventType.Padding at time 0.

#### Returns

[`Id3v2EventTimeCode`](Id3v2EventTimeCode.md)
