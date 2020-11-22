**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/frames/frameHeader"](../modules/_src_id3v2_frames_frameheader_.md) / Id3v2FrameHeader

# Class: Id3v2FrameHeader

## Hierarchy

* **Id3v2FrameHeader**

## Index

### Constructors

* [constructor](_src_id3v2_frames_frameheader_.id3v2frameheader.md#constructor)

### Accessors

* [flags](_src_id3v2_frames_frameheader_.id3v2frameheader.md#flags)
* [frameId](_src_id3v2_frames_frameheader_.id3v2frameheader.md#frameid)
* [frameSize](_src_id3v2_frames_frameheader_.id3v2frameheader.md#framesize)

### Methods

* [render](_src_id3v2_frames_frameheader_.id3v2frameheader.md#render)
* [fromData](_src_id3v2_frames_frameheader_.id3v2frameheader.md#fromdata)
* [fromFrameIdentifier](_src_id3v2_frames_frameheader_.id3v2frameheader.md#fromframeidentifier)
* [getSize](_src_id3v2_frames_frameheader_.id3v2frameheader.md#getsize)

## Constructors

### constructor

\+ **new Id3v2FrameHeader**(`id`: [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md), `flags?`: [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md), `frameSize?`: number): [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

Constructs and initializes a new instance by processing the data for the frame header.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`id` | [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md) | - | Identifier of the frame |
`flags` | [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md) | Id3v2FrameFlags.None | Flags to assign to the frame (if omitted, defaults to     [Id3v2FrameFlags.None](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md#none)) |
`frameSize` | number | 0 | Size of the frame in bytes, excluding the size of the header (if omitted,     defaults to 0)  |

**Returns:** [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

## Accessors

### flags

• get **flags**(): [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

Gets the flags applied to the current instance.

**Returns:** [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

• set **flags**(`value`: [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)): void

Sets the flags applied to the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md) |

**Returns:** void

___

### frameId

• get **frameId**(): [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

Gets the identifier of the frame described by the current instance.

**Returns:** [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

• set **frameId**(`value`: [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)): void

Sets the identifier of the frame described by the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md) |

**Returns:** void

___

### frameSize

• get **frameSize**(): number

Gets the size of the frame described by the current instance, minus the header.

**Returns:** number

• set **frameSize**(`value`: number): void

Sets the size of the frame described by the current instance, minus the header.
Must be a positive, safe integer.

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

## Methods

### render

▸ **render**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | number | Version of ID3v2 to use when encoding the current instance.  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromData

▸ `Static`**fromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

Constructs and initializes a new instance of [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) by reading it from raw
header data of a specified version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw data to build the new instance from.     If the data size is smaller than the size of a full header, the data is just treated as     a frame identifier and the remaining values are zeroed. |
`version` | number | ID3v2 version with which the data in `data` was encoded.  |

**Returns:** [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

___

### fromFrameIdentifier

▸ `Static`**fromFrameIdentifier**(`id`: [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)): [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

#### Parameters:

Name | Type |
------ | ------ |
`id` | [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md) |

**Returns:** [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

___

### getSize

▸ `Static`**getSize**(`version`: number): 6 \| 10

Gets the size of a header for a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | number | Version of ID3v2 to get the size for. Must be a positive integer < 256  |

**Returns:** 6 \| 10
