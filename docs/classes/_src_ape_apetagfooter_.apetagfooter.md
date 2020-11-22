**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/ape/apeTagFooter"](../modules/_src_ape_apetagfooter_.md) / ApeTagFooter

# Class: ApeTagFooter

Representation of an APEv2 tag footer which can be read from and written to disk.

## Hierarchy

* **ApeTagFooter**

## Index

### Properties

* [fileIdentifier](_src_ape_apetagfooter_.apetagfooter.md#fileidentifier)
* [size](_src_ape_apetagfooter_.apetagfooter.md#size)

### Accessors

* [flags](_src_ape_apetagfooter_.apetagfooter.md#flags)
* [itemCount](_src_ape_apetagfooter_.apetagfooter.md#itemcount)
* [itemSize](_src_ape_apetagfooter_.apetagfooter.md#itemsize)
* [requiredDataSize](_src_ape_apetagfooter_.apetagfooter.md#requireddatasize)
* [tagSize](_src_ape_apetagfooter_.apetagfooter.md#tagsize)
* [version](_src_ape_apetagfooter_.apetagfooter.md#version)

### Methods

* [renderFooter](_src_ape_apetagfooter_.apetagfooter.md#renderfooter)
* [renderHeader](_src_ape_apetagfooter_.apetagfooter.md#renderheader)
* [fromData](_src_ape_apetagfooter_.apetagfooter.md#fromdata)
* [fromEmpty](_src_ape_apetagfooter_.apetagfooter.md#fromempty)

## Properties

### fileIdentifier

▪ `Static` `Readonly` **fileIdentifier**: [ByteVector](_src_bytevector_.bytevector.md) = ByteVector.fromString("APETAGEX", StringType.Latin1, undefined, true)

Identifier used to fina an APEv2 footer in a file.

___

### size

▪ `Static` `Readonly` **size**: 32 = 32

Size of an APEv2 footer.

## Accessors

### flags

• get **flags**(): [ApeTagFooterFlags](../enums/_src_ape_apetagfooter_.apetagfooterflags.md)

Gets the flags that apply to the current instance.

**Returns:** [ApeTagFooterFlags](../enums/_src_ape_apetagfooter_.apetagfooterflags.md)

• set **flags**(`value`: [ApeTagFooterFlags](../enums/_src_ape_apetagfooter_.apetagfooterflags.md)): void

Sets the flags that apply to the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [ApeTagFooterFlags](../enums/_src_ape_apetagfooter_.apetagfooterflags.md) |

**Returns:** void

___

### itemCount

• get **itemCount**(): number

Gets the number of items in the tag represented by this footer.

**Returns:** number

• set **itemCount**(`value`: number): void

Sets the number of items in the tag represented by this footer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number |   |

**Returns:** void

___

### itemSize

• get **itemSize**(): number

Gets the size in bytes of the items contained in the tag represented by this footer.

**Returns:** number

• set **itemSize**(`value`: number): void

Sets the size in bytes of the items contained in the tag represented by this footer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number |   |

**Returns:** void

___

### requiredDataSize

• get **requiredDataSize**(): number

Gets the size in bytes of the items contained in the tag and the footer. This is the minimum
amount of data required to read the entire tag.

**Returns:** number

___

### tagSize

• get **tagSize**(): number

Gets the complete size of the tag represented by the current instance, including the header
and footer.

**Returns:** number

___

### version

• get **version**(): number

Gets the version of APE tag described by the current instance.

**Returns:** number

## Methods

### renderFooter

▸ **renderFooter**(): [ByteVector](_src_bytevector_.bytevector.md)

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### renderHeader

▸ **renderHeader**(): [ByteVector](_src_bytevector_.bytevector.md)

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromData

▸ `Static`**fromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md)): [ApeTagFooter](_src_ape_apetagfooter_.apetagfooter.md)

Constructs and initializes a new instance of [ApeTagFooter](_src_ape_apetagfooter_.apetagfooter.md) by reading it from raw
footer data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw data to build the new instance from.  |

**Returns:** [ApeTagFooter](_src_ape_apetagfooter_.apetagfooter.md)

___

### fromEmpty

▸ `Static`**fromEmpty**(): [ApeTagFooter](_src_ape_apetagfooter_.apetagfooter.md)

Constructs and initializes a new, blank instance of [ApeTagFooter](_src_ape_apetagfooter_.apetagfooter.md).

**Returns:** [ApeTagFooter](_src_ape_apetagfooter_.apetagfooter.md)
