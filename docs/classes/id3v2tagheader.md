[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2TagHeader

# Class: Id3v2TagHeader

## Hierarchy

* **Id3v2TagHeader**

## Table of contents

### Constructors

- [constructor](id3v2tagheader.md#constructor)

### Accessors

- [completeTagSize](id3v2tagheader.md#completetagsize)
- [flags](id3v2tagheader.md#flags)
- [majorVersion](id3v2tagheader.md#majorversion)
- [revisionNumber](id3v2tagheader.md#revisionnumber)
- [tagSize](id3v2tagheader.md#tagsize)
- [fileIdentifier](id3v2tagheader.md#fileidentifier)

### Methods

- [render](id3v2tagheader.md#render)
- [fromData](id3v2tagheader.md#fromdata)

## Constructors

### constructor

\+ **new Id3v2TagHeader**(): [*Id3v2TagHeader*](id3v2tagheader.md)

**Returns:** [*Id3v2TagHeader*](id3v2tagheader.md)

## Accessors

### completeTagSize

• **completeTagSize**(): *number*

Gets the complete size of the tag described by the current instance including the header
and footer.

**Returns:** *number*

___

### flags

• **flags**(): [*Id3v2TagHeaderFlags*](../enums/id3v2tagheaderflags.md)

Gets the flags applied to the current instance.

**Returns:** [*Id3v2TagHeaderFlags*](../enums/id3v2tagheaderflags.md)

• **flags**(`value`: [*Id3v2TagHeaderFlags*](../enums/id3v2tagheaderflags.md)): *void*

Sets the flags applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [*Id3v2TagHeaderFlags*](../enums/id3v2tagheaderflags.md) | Bitwise combined [Id3v2TagHeaderFlags](../enums/id3v2tagheaderflags.md) value containing the flags to apply to the     current instance.    |

**Returns:** *void*

___

### majorVersion

• **majorVersion**(): *number*

Gets the major version of the tag described by the current instance.

**Returns:** *number*

• **majorVersion**(`value`: *number*): *void*

Sets the major version of the tag described by the current instance.
When the version is set, unsupported header flags will automatically be removed from the
tag.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *number* | ID3v2 version of tag. Must be a positive 8-bit integer betweenInclusive 2 and 4.    |

**Returns:** *void*

___

### revisionNumber

• **revisionNumber**(): *number*

Gets the version revision number of the tag represented by the current instance.

**Returns:** *number*

• **revisionNumber**(`value`: *number*): *void*

Sets the version revision number of the tag represented by the current instance.
This value should always be zero. Non-zero values indicate an experimental or new version of
the format which may not be completely understood by the current version of
node-taglib-sharp. Some software may refuse to read tags with a non-zero value.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *number* | Version revision number of the tag represented by the current instance. Must be     an 8-bit unsigned integer.    |

**Returns:** *void*

___

### tagSize

• **tagSize**(): *number*

Gets the complete size of the tag described by the current instance, minus the header and
footer.

**Returns:** *number*

• **tagSize**(`value`: *number*): *void*

Sets the complete size of the tag described by the current instance, minus the header
footer. NOTE THIS MUST BE A 28-BIT UNSIGNED INTEGER.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *number* | Size of the tag in bytes. Must be an unsigned 28-bit integer    |

**Returns:** *void*

___

### fileIdentifier

• `Static`**fileIdentifier**(): [*ByteVector*](bytevector.md)

The identifier used to recognize an ID3v2 header.

**Returns:** [*ByteVector*](bytevector.md)

## Methods

### render

▸ **render**(): [*ByteVector*](bytevector.md)

Renders the current instance as a raw ID3v2 header

**Returns:** [*ByteVector*](bytevector.md)

___

### fromData

▸ `Static`**fromData**(`data`: [*ByteVector*](bytevector.md)): [*Id3v2TagHeader*](id3v2tagheader.md)

Constructs and initializes a new instance by reading it from the raw header data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Object containing the raw data to build the new instance from.    |

**Returns:** [*Id3v2TagHeader*](id3v2tagheader.md)
