[node-taglib-sharp](../README.md) / [Exports](../modules.md) / XiphPicture

# Class: XiphPicture

## Implements

- [`IPicture`](../interfaces/ipicture.md)
- `ILazy`

## Table of contents

### Accessors

- [colorDepth](xiphpicture.md#colordepth)
- [data](xiphpicture.md#data)
- [description](xiphpicture.md#description)
- [filename](xiphpicture.md#filename)
- [height](xiphpicture.md#height)
- [indexedColors](xiphpicture.md#indexedcolors)
- [isLoaded](xiphpicture.md#isloaded)
- [mimeType](xiphpicture.md#mimetype)
- [type](xiphpicture.md#type)
- [width](xiphpicture.md#width)

### Methods

- [load](xiphpicture.md#load)
- [renderForFlacBlock](xiphpicture.md#renderforflacblock)
- [renderForXiphComment](xiphpicture.md#renderforxiphcomment)
- [fromFlacBlock](xiphpicture.md#fromflacblock)
- [fromPicture](xiphpicture.md#frompicture)
- [fromXiphComment](xiphpicture.md#fromxiphcomment)

## Accessors

### colorDepth

• `get` **colorDepth**(): `number`

Gets the color depth of the picture in the current instance.

#### Returns

`number`

• `set` **colorDepth**(`value`): `void`

Sets the color depth of the picture in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Color depth of the picture. Must be a positive 32-bit integer |

#### Returns

`void`

___

### data

• `get` **data**(): [`ByteVector`](bytevector.md)

Gets and sets the picture data stored in the current instance.

#### Returns

[`ByteVector`](bytevector.md)

#### Implementation of

[IPicture](../interfaces/ipicture.md).[data](../interfaces/ipicture.md#data)

• `set` **data**(`value`): `void`

Gets and sets the picture data stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ByteVector`](bytevector.md) |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[data](../interfaces/ipicture.md#data)

___

### description

• `get` **description**(): `string`

Gets and sets a description of the picture stored in the current instance. Optional.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[description](../interfaces/ipicture.md#description)

• `set` **description**(`value`): `void`

Gets and sets a description of the picture stored in the current instance. Optional.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[description](../interfaces/ipicture.md#description)

___

### filename

• `get` **filename**(): `string`

Gets and sets a filename of the picture stored in the current instance. Optional.

**`remarks`** This value is not stored in a XIPH picture and is only available if copied from
    another picture.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[filename](../interfaces/ipicture.md#filename)

• `set` **filename**(`value`): `void`

Gets and sets a filename of the picture stored in the current instance. Optional.

**`remarks`** This value is not stored in a XIPH picture so setting it has no impact.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[filename](../interfaces/ipicture.md#filename)

___

### height

• `get` **height**(): `number`

Gets the height of the picture in the current instance in pixels.

#### Returns

`number`

• `set` **height**(`value`): `void`

Sets the height of the picture in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | height of the picture in pixels, must be a positive 32-bit integer. |

#### Returns

`void`

___

### indexedColors

• `get` **indexedColors**(): `number`

Gets the number of indexed colors in the picture represented by the current instance.

#### Returns

`number`

• `set` **indexedColors**(`value`): `void`

Sets the number of indexed colors in the picture represented by the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of indexed colors in the pictures or `0` if the picture is not stored in     an indexed format. Must be a positive 32-bit integer |

#### Returns

`void`

___

### isLoaded

• `get` **isLoaded**(): `boolean`

**`inheritdoc`**

#### Returns

`boolean`

___

### mimeType

• `get` **mimeType**(): `string`

Gets and sets the mime-type of the picture data stored in the current instance.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[mimeType](../interfaces/ipicture.md#mimetype)

• `set` **mimeType**(`value`): `void`

Gets and sets the mime-type of the picture data stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[mimeType](../interfaces/ipicture.md#mimetype)

___

### type

• `get` **type**(): [`PictureType`](../enums/picturetype.md)

Gets and sets the type of the content visible in the picture stored in the current instance.

#### Returns

[`PictureType`](../enums/picturetype.md)

#### Implementation of

[IPicture](../interfaces/ipicture.md).[type](../interfaces/ipicture.md#type)

• `set` **type**(`value`): `void`

Gets and sets the type of the content visible in the picture stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`PictureType`](../enums/picturetype.md) |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/ipicture.md).[type](../interfaces/ipicture.md#type)

___

### width

• `get` **width**(): `number`

Gets the width of the picture in the current instance in pixels.

#### Returns

`number`

• `set` **width**(`value`): `void`

Sets the width of the picture in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Width of the picture in pixels, must be positive 32-bit integer. |

#### Returns

`void`

## Methods

### load

▸ **load**(): `void`

**`inheritdoc`**

#### Returns

`void`

#### Implementation of

ILazy.load

___

### renderForFlacBlock

▸ **renderForFlacBlock**(): [`ByteVector`](bytevector.md)

Renders the picture for use in a FLAC block.

#### Returns

[`ByteVector`](bytevector.md)

___

### renderForXiphComment

▸ **renderForXiphComment**(): `string`

Renders the picture for use in a XIPH comment block (ie, the same structure as a FLAC block,
but base64 encoded).

#### Returns

`string`

___

### fromFlacBlock

▸ `Static` **fromFlacBlock**(`block`, `isLazy?`): [`XiphPicture`](xiphpicture.md)

Constructs and initializes a new instance by reading the contents of the picture from a FLAC
block. Intended to be used by the [FlacTag](flactag.md) class.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `block` | [`FlacBlock`](flacblock.md) | `undefined` | FLAC block containing the Xiph image. |
| `isLazy` | `boolean` | `false` | Whether or not to lazily load the data. For FLAC blocks, this will chain into     the lazy loading capabilities of the block |

#### Returns

[`XiphPicture`](xiphpicture.md)

___

### fromPicture

▸ `Static` **fromPicture**(`picture`): [`XiphPicture`](xiphpicture.md)

Constructs and initializes a new instance by copying the properties of an [IPicture](../interfaces/ipicture.md)
object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `picture` | [`IPicture`](../interfaces/ipicture.md) | Object to copy properties from. |

#### Returns

[`XiphPicture`](xiphpicture.md)

___

### fromXiphComment

▸ `Static` **fromXiphComment**(`data`, `isLazy?`): [`XiphPicture`](xiphpicture.md)

Constructs and initializes a new instance by decoding and reading the contents of a raw Xiph
image structure. Intended to be used by the [XiphComment](xiphcomment.md) class.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | `string` | `undefined` | Object containing the raw, base64 encoded Xiph image |
| `isLazy` | `boolean` | `false` | Whether or not to lazily load the data. For xiph comments, this only delays     decoding the data from base64 |

#### Returns

[`XiphPicture`](xiphpicture.md)
