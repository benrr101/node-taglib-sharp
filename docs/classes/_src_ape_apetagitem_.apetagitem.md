**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/ape/apeTagItem"](../modules/_src_ape_apetagitem_.md) / ApeTagItem

# Class: ApeTagItem

## Hierarchy

* **ApeTagItem**

## Index

### Accessors

* [isEmpty](_src_ape_apetagitem_.apetagitem.md#isempty)
* [isReadOnly](_src_ape_apetagitem_.apetagitem.md#isreadonly)
* [key](_src_ape_apetagitem_.apetagitem.md#key)
* [size](_src_ape_apetagitem_.apetagitem.md#size)
* [text](_src_ape_apetagitem_.apetagitem.md#text)
* [type](_src_ape_apetagitem_.apetagitem.md#type)
* [value](_src_ape_apetagitem_.apetagitem.md#value)

### Methods

* [clone](_src_ape_apetagitem_.apetagitem.md#clone)
* [render](_src_ape_apetagitem_.apetagitem.md#render)
* [toString](_src_ape_apetagitem_.apetagitem.md#tostring)
* [fromBinaryValue](_src_ape_apetagitem_.apetagitem.md#frombinaryvalue)
* [fromData](_src_ape_apetagitem_.apetagitem.md#fromdata)
* [fromTextValues](_src_ape_apetagitem_.apetagitem.md#fromtextvalues)

## Accessors

### isEmpty

• get **isEmpty**(): boolean

Gets whether or not the current instance is empty.

**Returns:** boolean

___

### isReadOnly

• get **isReadOnly**(): boolean

Gets whether or not the current instance is flagged as read-only on disk.

**Returns:** boolean

___

### key

• get **key**(): string

Gets the key that specified the contents of the item.

**`remarks`** This value is used for specifying the contents of the item in a common and
    consistent fashion. For example, `TITLE` specifies that the item contains the title of
    the track.

**Returns:** string

___

### size

• get **size**(): number

Size of the current instance as it last appeared on disk.

**Returns:** number

___

### text

• get **text**(): string[]

Gets the string values stored in the current item, if the current item is a text item, or
an empty array if the current item is a binary item or no text is stored.

**Returns:** string[]

___

### type

• get **type**(): [ApeTagItemType](../enums/_src_ape_apetagitem_.apetagitemtype.md)

Gets the type of value contained in the current instance.

**Returns:** [ApeTagItemType](../enums/_src_ape_apetagitem_.apetagitemtype.md)

___

### value

• get **value**(): [ByteVector](_src_bytevector_.bytevector.md)

Gets the binary value stored in the current item, if the current item is a binary item, or
`undefined` if the current item is a text item.

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

## Methods

### clone

▸ **clone**(): [ApeTagItem](_src_ape_apetagitem_.apetagitem.md)

Creates a deep copy of the current instance.

**Returns:** [ApeTagItem](_src_ape_apetagitem_.apetagitem.md)

___

### render

▸ **render**(): [ByteVector](_src_bytevector_.bytevector.md)

Renders the current instance as an APEv2 item.

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### toString

▸ **toString**(): string

Gets the contents of the current instance as a string. If the current instance is binary or
does not have a text array, `undefined` will be returned. Otherwise, the text values will be
joined into a single, comma separated list.

**Returns:** string

___

### fromBinaryValue

▸ `Static`**fromBinaryValue**(`key`: string, `value`: [ByteVector](_src_bytevector_.bytevector.md)): [ApeTagItem](_src_ape_apetagitem_.apetagitem.md)

Constructs and initializes a new instance of [ApeTagItem](_src_ape_apetagitem_.apetagitem.md) with a specified key and binary
data to use as the value.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Key to use for the item |
`value` | [ByteVector](_src_bytevector_.bytevector.md) | Binary data to store as the value  |

**Returns:** [ApeTagItem](_src_ape_apetagitem_.apetagitem.md)

___

### fromData

▸ `Static`**fromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number): [ApeTagItem](_src_ape_apetagitem_.apetagitem.md)

Constructs a new instance of [ApeTagItem](_src_ape_apetagitem_.apetagitem.md) by reading in a raw APEv2 item.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | [ByteVector](_src_bytevector_.bytevector.md) containing the item to read |
`offset` | number | Index into `data` at which to begin reading the item data. Must be     a positive 32-bit integer.  |

**Returns:** [ApeTagItem](_src_ape_apetagitem_.apetagitem.md)

___

### fromTextValues

▸ `Static`**fromTextValues**(`key`: string, ...`values`: string[]): [ApeTagItem](_src_ape_apetagitem_.apetagitem.md)

Constructs and initializes a new instance of [ApeTagItem](_src_ape_apetagitem_.apetagitem.md) with a specified key and collection
of text values.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Key to use for the item |
`...values` | string[] | Values to store in the item  |

**Returns:** [ApeTagItem](_src_ape_apetagitem_.apetagitem.md)
