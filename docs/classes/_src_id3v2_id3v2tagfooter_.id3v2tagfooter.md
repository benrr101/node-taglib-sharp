**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/id3v2/id3v2TagFooter"](../modules/_src_id3v2_id3v2tagfooter_.md) / Id3v2TagFooter

# Class: Id3v2TagFooter

## Hierarchy

* **Id3v2TagFooter**

## Index

### Accessors

* [completeTagSize](_src_id3v2_id3v2tagfooter_.id3v2tagfooter.md#completetagsize)
* [flags](_src_id3v2_id3v2tagfooter_.id3v2tagfooter.md#flags)
* [majorVersion](_src_id3v2_id3v2tagfooter_.id3v2tagfooter.md#majorversion)
* [revisionNumber](_src_id3v2_id3v2tagfooter_.id3v2tagfooter.md#revisionnumber)
* [tagSize](_src_id3v2_id3v2tagfooter_.id3v2tagfooter.md#tagsize)
* [fileIdentifier](_src_id3v2_id3v2tagfooter_.id3v2tagfooter.md#fileidentifier)

### Methods

* [render](_src_id3v2_id3v2tagfooter_.id3v2tagfooter.md#render)
* [fromData](_src_id3v2_id3v2tagfooter_.id3v2tagfooter.md#fromdata)
* [fromHeader](_src_id3v2_id3v2tagfooter_.id3v2tagfooter.md#fromheader)

## Accessors

### completeTagSize

• get **completeTagSize**(): number

*Defined in src/id3v2/id3v2TagFooter.ts:83*

Gets the complete size of the tag described by the current instance including the header
and footer.

**Returns:** number

___

### flags

• get **flags**(): [Id3v2TagHeaderFlags](../enums/_src_id3v2_id3v2tagheader_.id3v2tagheaderflags.md)

*Defined in src/id3v2/id3v2TagFooter.ts:90*

Gets the flags applied to the current instance.

**Returns:** [Id3v2TagHeaderFlags](../enums/_src_id3v2_id3v2tagheader_.id3v2tagheaderflags.md)

• set **flags**(`value`: [Id3v2TagHeaderFlags](../enums/_src_id3v2_id3v2tagheader_.id3v2tagheaderflags.md)): void

*Defined in src/id3v2/id3v2TagFooter.ts:96*

Sets the flags applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [Id3v2TagHeaderFlags](../enums/_src_id3v2_id3v2tagheader_.id3v2tagheaderflags.md) | Bitwise combined {@see HeaderFlags} value containing the flags to apply to the     current instance.  |

**Returns:** void

___

### majorVersion

• get **majorVersion**(): number

*Defined in src/id3v2/id3v2TagFooter.ts:112*

Sets the major version of the tag described by the current instance.

**Returns:** number

• set **majorVersion**(`value`: number): void

*Defined in src/id3v2/id3v2TagFooter.ts:124*

Sets the major version of the tag described by the current instance.
When the version is set, unsupported header flags will automatically be removed from the
tag.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number | ID3v2 version if tag described by the current instance. Footers are only     supported with version 4, so this value can only be 4.  |

**Returns:** void

___

### revisionNumber

• get **revisionNumber**(): number

*Defined in src/id3v2/id3v2TagFooter.ts:134*

Gets the version revision number of the tag represented by the current instance.

**Returns:** number

• set **revisionNumber**(`value`: number): void

*Defined in src/id3v2/id3v2TagFooter.ts:143*

Sets the version revision number of the tag represented by the current instance.
This value should always be zero. Non-zero values indicate an experimental or new version of
the format which may not be completely understood by the current version of
node-taglib-sharp. Some software may refuse to read tags with a non-zero value.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number | Version revision number of the tag represented by the current instance. Must be     an 8-bit unsigned integer.  |

**Returns:** void

___

### tagSize

• get **tagSize**(): number

*Defined in src/id3v2/id3v2TagFooter.ts:152*

Gets the complete size of the tag described by the current instance, minus the header and
footer.

**Returns:** number

• set **tagSize**(`value`: number): void

*Defined in src/id3v2/id3v2TagFooter.ts:158*

Sets the complete size of the tag described by the current instance, minus the header
footer. NOTE THIS MUST BE AN 28-BIT UNSIGNED INTEGER.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number | Size of the tag in bytes. Must be an unsigned 28-bit integer  |

**Returns:** void

___

### fileIdentifier

• `Static`get **fileIdentifier**(): [ByteVector](_src_bytevector_.bytevector.md)

*Defined in src/id3v2/id3v2TagFooter.ts:77*

Identifier used to recognize an ID3v2 footer.

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

## Methods

### render

▸ **render**(): [ByteVector](_src_bytevector_.bytevector.md)

*Defined in src/id3v2/id3v2TagFooter.ts:169*

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromData

▸ `Static`**fromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md)): [Id3v2TagFooter](_src_id3v2_id3v2tagfooter_.id3v2tagfooter.md)

*Defined in src/id3v2/id3v2TagFooter.ts:19*

Constructs and initializes a new instance by reading it from raw footer data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw data to build the instance from  |

**Returns:** [Id3v2TagFooter](_src_id3v2_id3v2tagfooter_.id3v2tagfooter.md)

___

### fromHeader

▸ `Static`**fromHeader**(`header`: [Id3v2TagHeader](_src_id3v2_id3v2tagheader_.id3v2tagheader.md)): [Id3v2TagFooter](_src_id3v2_id3v2tagfooter_.id3v2tagfooter.md)

*Defined in src/id3v2/id3v2TagFooter.ts:60*

Constructs and initializes a new footer based on the contents of the header used for the
same tag.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`header` | [Id3v2TagHeader](_src_id3v2_id3v2tagheader_.id3v2tagheader.md) | Header from which to base the new footer  |

**Returns:** [Id3v2TagFooter](_src_id3v2_id3v2tagfooter_.id3v2tagfooter.md)
