**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/frames/eventTimeCodeFrame"](../modules/_src_id3v2_frames_eventtimecodeframe_.md) / EventTimeCode

# Class: EventTimeCode

## Hierarchy

* **EventTimeCode**

## Index

### Constructors

* [constructor](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md#constructor)

### Accessors

* [eventType](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md#eventtype)
* [time](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md#time)

### Methods

* [clone](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md#clone)
* [render](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md#render)
* [fromEmpty](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md#fromempty)

## Constructors

### constructor

\+ **new EventTimeCode**(`eventType`: [EventType](../enums/_src_id3v2_utiltypes_.eventtype.md), `time`: number): [EventTimeCode](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventType` | [EventType](../enums/_src_id3v2_utiltypes_.eventtype.md) |
`time` | number |

**Returns:** [EventTimeCode](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md)

## Accessors

### eventType

• get **eventType**(): [EventType](../enums/_src_id3v2_utiltypes_.eventtype.md)

**Returns:** [EventType](../enums/_src_id3v2_utiltypes_.eventtype.md)

• set **eventType**(`value`: [EventType](../enums/_src_id3v2_utiltypes_.eventtype.md)): void

#### Parameters:

Name | Type |
------ | ------ |
`value` | [EventType](../enums/_src_id3v2_utiltypes_.eventtype.md) |

**Returns:** void

___

### time

• get **time**(): number

**Returns:** number

• set **time**(`value`: number): void

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

## Methods

### clone

▸ **clone**(): [EventTimeCode](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md)

Creates a copy of this instance

**Returns:** [EventTimeCode](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md)

___

### render

▸ **render**(): [ByteVector](_src_bytevector_.bytevector.md)

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromEmpty

▸ `Static`**fromEmpty**(): [EventTimeCode](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md)

**Returns:** [EventTimeCode](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md)
