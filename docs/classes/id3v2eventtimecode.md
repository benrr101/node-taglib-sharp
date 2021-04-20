[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2EventTimeCode

# Class: Id3v2EventTimeCode

## Hierarchy

* **Id3v2EventTimeCode**

## Table of contents

### Constructors

- [constructor](id3v2eventtimecode.md#constructor)

### Accessors

- [eventType](id3v2eventtimecode.md#eventtype)
- [time](id3v2eventtimecode.md#time)

### Methods

- [clone](id3v2eventtimecode.md#clone)
- [render](id3v2eventtimecode.md#render)
- [fromEmpty](id3v2eventtimecode.md#fromempty)

## Constructors

### constructor

\+ **new Id3v2EventTimeCode**(`eventType`: [*Id3v2EventType*](../enums/id3v2eventtype.md), `time`: *number*): [*Id3v2EventTimeCode*](id3v2eventtimecode.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventType` | [*Id3v2EventType*](../enums/id3v2eventtype.md) |
`time` | *number* |

**Returns:** [*Id3v2EventTimeCode*](id3v2eventtimecode.md)

## Accessors

### eventType

• **eventType**(): [*Id3v2EventType*](../enums/id3v2eventtype.md)

**Returns:** [*Id3v2EventType*](../enums/id3v2eventtype.md)

• **eventType**(`value`: [*Id3v2EventType*](../enums/id3v2eventtype.md)): *void*

#### Parameters:

Name | Type |
------ | ------ |
`value` | [*Id3v2EventType*](../enums/id3v2eventtype.md) |

**Returns:** *void*

___

### time

• **time**(): *number*

**Returns:** *number*

• **time**(`value`: *number*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

## Methods

### clone

▸ **clone**(): [*Id3v2EventTimeCode*](id3v2eventtimecode.md)

Creates a copy of this instance

**Returns:** [*Id3v2EventTimeCode*](id3v2eventtimecode.md)

___

### render

▸ **render**(): [*ByteVector*](bytevector.md)

**Returns:** [*ByteVector*](bytevector.md)

___

### fromEmpty

▸ `Static`**fromEmpty**(): [*Id3v2EventTimeCode*](id3v2eventtimecode.md)

**Returns:** [*Id3v2EventTimeCode*](id3v2eventtimecode.md)
