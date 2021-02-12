[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2TagFooter

# Class: Id3v2TagFooter

## Hierarchy

* **Id3v2TagFooter**

## Table of contents

### Constructors

- [constructor](id3v2tagfooter.md#constructor)

### Accessors

- [completeTagSize](id3v2tagfooter.md#completetagsize)
- [flags](id3v2tagfooter.md#flags)
- [majorVersion](id3v2tagfooter.md#majorversion)
- [revisionNumber](id3v2tagfooter.md#revisionnumber)
- [tagSize](id3v2tagfooter.md#tagsize)
- [fileIdentifier](id3v2tagfooter.md#fileidentifier)

### Methods

- [render](id3v2tagfooter.md#render)
- [fromData](id3v2tagfooter.md#fromdata)
- [fromHeader](id3v2tagfooter.md#fromheader)

## Constructors

### constructor

\+ **new Id3v2TagFooter**(): [*Id3v2TagFooter*](id3v2tagfooter.md)

**Returns:** [*Id3v2TagFooter*](id3v2tagfooter.md)

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
`value` | [*Id3v2TagHeaderFlags*](../enums/id3v2tagheaderflags.md) | Bitwise combined [Id3v2TagHeaderFlags](../enums/id3v2tagheaderflags.md) value containing the flags to apply     to the current instance.    |

**Returns:** *void*

___

### majorVersion

• **majorVersion**(): *number*

Sets the major version of the tag described by the current instance.

**Returns:** *number*

• **majorVersion**(`value`: *number*): *void*

Sets the major version of the tag described by the current instance.
When the version is set, unsupported header flags will automatically be removed from the
tag.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *number* | ID3v2 version if tag described by the current instance. Footers are only     supported with version 4, so this value can only be 4.    |

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
footer. NOTE THIS MUST BE AN 28-BIT UNSIGNED INTEGER.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *number* | Size of the tag in bytes. Must be an unsigned 28-bit integer    |

**Returns:** *void*

___

### fileIdentifier

• `Static`**fileIdentifier**(): [*ByteVector*](bytevector.md)

Identifier used to recognize an ID3v2 footer.

**Returns:** [*ByteVector*](bytevector.md)

## Methods

### render

▸ **render**(): [*ByteVector*](bytevector.md)

**Returns:** [*ByteVector*](bytevector.md)

___

### fromData

▸ `Static`**fromData**(`data`: [*ByteVector*](bytevector.md)): [*Id3v2TagFooter*](id3v2tagfooter.md)

Constructs and initializes a new instance by reading it from raw footer data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw data to build the instance from    |

**Returns:** [*Id3v2TagFooter*](id3v2tagfooter.md)

___

### fromHeader

▸ `Static`**fromHeader**(`header`: [*Id3v2TagHeader*](id3v2tagheader.md)): [*Id3v2TagFooter*](id3v2tagfooter.md)

Constructs and initializes a new footer based on the contents of the header used for the
same tag.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`header` | [*Id3v2TagHeader*](id3v2tagheader.md) | Header from which to base the new footer    |

**Returns:** [*Id3v2TagFooter*](id3v2tagfooter.md)
