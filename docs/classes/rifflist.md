[node-taglib-sharp](../README.md) / [Exports](../modules.md) / RiffList

# Class: RiffList

## Table of contents

### Constructors

- [constructor](rifflist.md#constructor)

### Accessors

- [length](rifflist.md#length)
- [stringType](rifflist.md#stringtype)

### Methods

- [clear](rifflist.md#clear)
- [containsKey](rifflist.md#containskey)
- [getValueAsUint](rifflist.md#getvalueasuint)
- [getValues](rifflist.md#getvalues)
- [getValuesAsStrings](rifflist.md#getvaluesasstrings)
- [removeValue](rifflist.md#removevalue)
- [render](rifflist.md#render)
- [renderEnclosed](rifflist.md#renderenclosed)
- [setValueFromUint](rifflist.md#setvaluefromuint)
- [setValues](rifflist.md#setvalues)
- [setValuesFromStrings](rifflist.md#setvaluesfromstrings)
- [fromData](rifflist.md#fromdata)
- [fromFile](rifflist.md#fromfile)

## Constructors

### constructor

• **new RiffList**()

## Accessors

### length

• `get` **length**(): `number`

Gets the number of items in the current instance.

#### Returns

`number`

___

### stringType

• `get` **stringType**(): [`StringType`](../enums/stringtype.md)

Gets the [StringType](../enums/stringtype.md) value used for parsing and rendering the contents of this list.

#### Returns

[`StringType`](../enums/stringtype.md)

• `set` **stringType**(`value`): `void`

Sets the [StringType](../enums/stringtype.md) value used for parsing and rendering the contents of this list.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`StringType`](../enums/stringtype.md) |

#### Returns

`void`

## Methods

### clear

▸ **clear**(): `void`

Removes all elements from the list.

#### Returns

`void`

___

### containsKey

▸ **containsKey**(`id`): `boolean`

Determines whether the current instance contains the specified key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Key to locate in the current instance |

#### Returns

`boolean`

`true` if key exists, `false` otherwise

___

### getValueAsUint

▸ **getValueAsUint**(`id`): `number`

Gets the value for a specified item in the current instance as an unsigned integer. The
first value that can be parsed as an int will be returned. `0` is returned if no matching
values exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item of which to get the values. Must be 4 bytes |

#### Returns

`number`

___

### getValues

▸ **getValues**(`id`): [`ByteVector`](bytevector.md)[]

Gets the values for a specified item in the current instance as an array of
[ByteVector](bytevector.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item of which to get the values. Must be 4 bytes |

#### Returns

[`ByteVector`](bytevector.md)[]

___

### getValuesAsStrings

▸ **getValuesAsStrings**(`id`): `string`[]

Gets the values for a specified item as an array of strings.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item of which to get the values. Must be 4 bytes |

#### Returns

`string`[]

___

### removeValue

▸ **removeValue**(`id`): `void`

Removes the item with the specified ID from the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item to remove. Must be 4 bytes |

#### Returns

`void`

___

### render

▸ **render**(): [`ByteVector`](bytevector.md)

Renders the current instance as a raw RIFF list.

#### Returns

[`ByteVector`](bytevector.md)

___

### renderEnclosed

▸ **renderEnclosed**(`id`): [`ByteVector`](bytevector.md)

Renders the current instance enclosed in an item with a specified ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item in which to enclose the current instance. Must be 4 bytes. |

#### Returns

[`ByteVector`](bytevector.md)

___

### setValueFromUint

▸ **setValueFromUint**(`id`, `value`): `void`

Sets the value for a specified item in the current instance to a uint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item of which to get the values. Must be 4 bytes |
| `value` | `number` | Value to store in the item. Must be an unsigned integer |

#### Returns

`void`

___

### setValues

▸ **setValues**(`id`, ...`values`): `void`

Sets the value for a specified item in the current instance to an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item of which to get the values. Must be 4 bytes |
| `...values` | [`ByteVector`](bytevector.md)[] | Array of [ByteVector](bytevector.md) to store in the specified item. If falsey or     undefined, the item will be removed |

#### Returns

`void`

___

### setValuesFromStrings

▸ **setValuesFromStrings**(`id`, ...`values`): `void`

Sets the value for a specified item in the current instance to an array of strings.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item of which to get the values. Must be 4 bytes |
| `...values` | `string`[] | Array of strings to store in the specified item. If falsey or undefined, the     item will be removed |

#### Returns

`void`

___

### fromData

▸ `Static` **fromData**(`data`): [`RiffList`](rifflist.md)

Constructs and initializes a new instance by reading the contents of a raw RIFF list stored
in a [ByteVector](bytevector.md) object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Object containing a raw RIFF list to read into the new instance. |

#### Returns

[`RiffList`](rifflist.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`, `length`): [`RiffList`](rifflist.md)

Constructs and initializes a new instance by reading the contents of a raw RIFF list from a
specified position in a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](file.md) | File containing the contents of the new instance |
| `position` | `number` | Index into the file where the the list begins, must be safe positive integer |
| `length` | `number` | Length of the list in bytes, must be a positive integer |

#### Returns

[`RiffList`](rifflist.md)
