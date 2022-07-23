[node-taglib-sharp](../README.md) / [Exports](../modules.md) / XiphPicture

# Class: XiphPicture

## Implements

- [`IPicture`](../interfaces/IPicture.md)
- `ILazy`

## Table of contents

### Accessors

- [colorDepth](XiphPicture.md#colordepth)
- [data](XiphPicture.md#data)
- [description](XiphPicture.md#description)
- [filename](XiphPicture.md#filename)
- [height](XiphPicture.md#height)
- [indexedColors](XiphPicture.md#indexedcolors)
- [isLoaded](XiphPicture.md#isloaded)
- [mimeType](XiphPicture.md#mimetype)
- [type](XiphPicture.md#type)
- [width](XiphPicture.md#width)

### Methods

- [load](XiphPicture.md#load)
- [renderForFlacBlock](XiphPicture.md#renderforflacblock)
- [renderForXiphComment](XiphPicture.md#renderforxiphcomment)
- [fromFlacBlock](XiphPicture.md#fromflacblock)
- [fromPicture](XiphPicture.md#frompicture)
- [fromXiphComment](XiphPicture.md#fromxiphcomment)

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

• `get` **data**(): [`ByteVector`](ByteVector.md)

Gets and sets the picture data stored in the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

#### Implementation of

[IPicture](../interfaces/IPicture.md).[data](../interfaces/IPicture.md#data)

• `set` **data**(`value`): `void`

Gets and sets the picture data stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ByteVector`](ByteVector.md) |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[data](../interfaces/IPicture.md#data)

___

### description

• `get` **description**(): `string`

Gets and sets a description of the picture stored in the current instance. Optional.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[description](../interfaces/IPicture.md#description)

• `set` **description**(`value`): `void`

Gets and sets a description of the picture stored in the current instance. Optional.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[description](../interfaces/IPicture.md#description)

___

### filename

• `get` **filename**(): `string`

Gets and sets a filename of the picture stored in the current instance. Optional.

**`remarks`** This value is not stored in a XIPH picture and is only available if copied from
    another picture.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[filename](../interfaces/IPicture.md#filename)

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

[IPicture](../interfaces/IPicture.md).[filename](../interfaces/IPicture.md#filename)

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

#### Implementation of

ILazy.isLoaded

___

### mimeType

• `get` **mimeType**(): `string`

Gets and sets the mime-type of the picture data stored in the current instance.

#### Returns

`string`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[mimeType](../interfaces/IPicture.md#mimetype)

• `set` **mimeType**(`value`): `void`

Gets and sets the mime-type of the picture data stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[mimeType](../interfaces/IPicture.md#mimetype)

___

### type

• `get` **type**(): [`PictureType`](../enums/PictureType.md)

Gets and sets the type of the content visible in the picture stored in the current instance.

#### Returns

[`PictureType`](../enums/PictureType.md)

#### Implementation of

[IPicture](../interfaces/IPicture.md).[type](../interfaces/IPicture.md#type)

• `set` **type**(`value`): `void`

Gets and sets the type of the content visible in the picture stored in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`PictureType`](../enums/PictureType.md) |

#### Returns

`void`

#### Implementation of

[IPicture](../interfaces/IPicture.md).[type](../interfaces/IPicture.md#type)

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

▸ **renderForFlacBlock**(): [`ByteVector`](ByteVector.md)

Renders the picture for use in a FLAC block.

#### Returns

[`ByteVector`](ByteVector.md)

___

### renderForXiphComment

▸ **renderForXiphComment**(): `string`

Renders the picture for use in a XIPH comment block (ie, the same structure as a FLAC block,
but base64 encoded).

#### Returns

`string`

___

### fromFlacBlock

▸ `Static` **fromFlacBlock**(`block`, `isLazy?`): [`XiphPicture`](XiphPicture.md)

Constructs and initializes a new instance by reading the contents of the picture from a FLAC
block. Intended to be used by the [FlacTag](FlacTag.md) class.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `block` | [`FlacBlock`](FlacBlock.md) | `undefined` | FLAC block containing the Xiph image. |
| `isLazy` | `boolean` | `false` | Whether or not to lazily load the data. For FLAC blocks, this will chain into     the lazy loading capabilities of the block |

#### Returns

[`XiphPicture`](XiphPicture.md)

___

### fromPicture

▸ `Static` **fromPicture**(`picture`): [`XiphPicture`](XiphPicture.md)

Constructs and initializes a new instance by copying the properties of an [IPicture](../interfaces/IPicture.md)
object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `picture` | [`IPicture`](../interfaces/IPicture.md) | Object to copy properties from. |

#### Returns

[`XiphPicture`](XiphPicture.md)

___

### fromXiphComment

▸ `Static` **fromXiphComment**(`data`, `isLazy?`): [`XiphPicture`](XiphPicture.md)

Constructs and initializes a new instance by decoding and reading the contents of a raw Xiph
image structure. Intended to be used by the [XiphComment](XiphComment.md) class.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | `string` | `undefined` | Object containing the raw, base64 encoded Xiph image |
| `isLazy` | `boolean` | `false` | Whether or not to lazily load the data. For xiph comments, this only delays     decoding the data from base64 |

#### Returns

[`XiphPicture`](XiphPicture.md)
