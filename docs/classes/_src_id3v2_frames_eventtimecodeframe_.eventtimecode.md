**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/id3v2/frames/eventTimeCodeFrame"](../modules/_src_id3v2_frames_eventtimecodeframe_.md) / EventTimeCode

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

*Defined in src/id3v2/frames/eventTimeCodeFrame.ts:10*

#### Parameters:

Name | Type |
------ | ------ |
`eventType` | [EventType](../enums/_src_id3v2_utiltypes_.eventtype.md) |
`time` | number |

**Returns:** [EventTimeCode](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md)

## Accessors

### eventType

• get **eventType**(): [EventType](../enums/_src_id3v2_utiltypes_.eventtype.md)

*Defined in src/id3v2/frames/eventTimeCodeFrame.ts:28*

**Returns:** [EventType](../enums/_src_id3v2_utiltypes_.eventtype.md)

• set **eventType**(`value`: [EventType](../enums/_src_id3v2_utiltypes_.eventtype.md)): void

*Defined in src/id3v2/frames/eventTimeCodeFrame.ts:29*

#### Parameters:

Name | Type |
------ | ------ |
`value` | [EventType](../enums/_src_id3v2_utiltypes_.eventtype.md) |

**Returns:** void

___

### time

• get **time**(): number

*Defined in src/id3v2/frames/eventTimeCodeFrame.ts:22*

**Returns:** number

• set **time**(`value`: number): void

*Defined in src/id3v2/frames/eventTimeCodeFrame.ts:23*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

## Methods

### clone

▸ **clone**(): [EventTimeCode](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md)

*Defined in src/id3v2/frames/eventTimeCodeFrame.ts:34*

Creates a copy of this instance

**Returns:** [EventTimeCode](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md)

___

### render

▸ **render**(): [ByteVector](_src_bytevector_.bytevector.md)

*Defined in src/id3v2/frames/eventTimeCodeFrame.ts:38*

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromEmpty

▸ `Static`**fromEmpty**(): [EventTimeCode](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md)

*Defined in src/id3v2/frames/eventTimeCodeFrame.ts:18*

**Returns:** [EventTimeCode](_src_id3v2_frames_eventtimecodeframe_.eventtimecode.md)
