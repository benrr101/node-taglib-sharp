[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2FrameHeader

# Class: Id3v2FrameHeader

## Hierarchy

* **Id3v2FrameHeader**

## Table of contents

### Constructors

- [constructor](id3v2frameheader.md#constructor)

### Accessors

- [flags](id3v2frameheader.md#flags)
- [frameId](id3v2frameheader.md#frameid)
- [frameSize](id3v2frameheader.md#framesize)

### Methods

- [render](id3v2frameheader.md#render)
- [fromData](id3v2frameheader.md#fromdata)
- [fromFrameIdentifier](id3v2frameheader.md#fromframeidentifier)
- [getSize](id3v2frameheader.md#getsize)

## Constructors

### constructor

\+ **new Id3v2FrameHeader**(`id`: [*Id3v2FrameIdentifier*](id3v2frameidentifier.md), `flags?`: [*Id3v2FrameFlags*](../enums/id3v2frameflags.md), `frameSize?`: *number*): [*Id3v2FrameHeader*](id3v2frameheader.md)

Constructs and initializes a new instance by processing the data for the frame header.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`id` | [*Id3v2FrameIdentifier*](id3v2frameidentifier.md) | - | Identifier of the frame   |
`flags` | [*Id3v2FrameFlags*](../enums/id3v2frameflags.md) | ... | Flags to assign to the frame (if omitted, defaults to     [Id3v2FrameFlags.None](../enums/id3v2frameflags.md#none))   |
`frameSize` | *number* | 0 | Size of the frame in bytes, excluding the size of the header (if omitted,     defaults to 0)    |

**Returns:** [*Id3v2FrameHeader*](id3v2frameheader.md)

## Accessors

### flags

• **flags**(): [*Id3v2FrameFlags*](../enums/id3v2frameflags.md)

Gets the flags applied to the current instance.

**Returns:** [*Id3v2FrameFlags*](../enums/id3v2frameflags.md)

• **flags**(`value`: [*Id3v2FrameFlags*](../enums/id3v2frameflags.md)): *void*

Sets the flags applied to the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [*Id3v2FrameFlags*](../enums/id3v2frameflags.md) |

**Returns:** *void*

___

### frameId

• **frameId**(): [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)

Gets the identifier of the frame described by the current instance.

**Returns:** [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)

• **frameId**(`value`: [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)): *void*

Sets the identifier of the frame described by the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [*Id3v2FrameIdentifier*](id3v2frameidentifier.md) |

**Returns:** *void*

___

### frameSize

• **frameSize**(): *number*

Gets the size of the frame described by the current instance, minus the header.

**Returns:** *number*

• **frameSize**(`value`: *number*): *void*

Sets the size of the frame described by the current instance, minus the header.
Must be a positive, safe integer.

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

## Methods

### render

▸ **render**(`version`: *number*): [*ByteVector*](bytevector.md)

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | *number* | Version of ID3v2 to use when encoding the current instance.    |

**Returns:** [*ByteVector*](bytevector.md)

___

### fromData

▸ `Static`**fromData**(`data`: [*ByteVector*](bytevector.md), `version`: *number*): [*Id3v2FrameHeader*](id3v2frameheader.md)

Constructs and initializes a new instance of [Id3v2FrameHeader](id3v2frameheader.md) by reading it from raw
header data of a specified version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw data to build the new instance from.     If the data size is smaller than the size of a full header, the data is just treated as     a frame identifier and the remaining values are zeroed.   |
`version` | *number* | ID3v2 version with which the data in `data` was encoded.    |

**Returns:** [*Id3v2FrameHeader*](id3v2frameheader.md)

___

### fromFrameIdentifier

▸ `Static`**fromFrameIdentifier**(`id`: [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)): [*Id3v2FrameHeader*](id3v2frameheader.md)

#### Parameters:

Name | Type |
------ | ------ |
`id` | [*Id3v2FrameIdentifier*](id3v2frameidentifier.md) |

**Returns:** [*Id3v2FrameHeader*](id3v2frameheader.md)

___

### getSize

▸ `Static`**getSize**(`version`: *number*): *6* \| *10*

Gets the size of a header for a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | *number* | Version of ID3v2 to get the size for. Must be a positive integer < 256    |

**Returns:** *6* \| *10*
