[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Mpeg4IsoVisualSampleEntry

# Class: Mpeg4IsoVisualSampleEntry

This class extends IsoSampleEntry and implements [IVideoCodec](../interfaces/IVideoCodec.md) to provide an implementation of a
ISO/IEC 14496-12 VisualSampleEntry and support for reading MPEG-4 video properties.

## Hierarchy

- [`Mpeg4IsoSampleEntry`](Mpeg4IsoSampleEntry.md)

  ↳ **`Mpeg4IsoVisualSampleEntry`**

## Implements

- [`IVideoCodec`](../interfaces/IVideoCodec.md)

## Table of contents

### Accessors

- [boxType](Mpeg4IsoVisualSampleEntry.md#boxtype)
- [data](Mpeg4IsoVisualSampleEntry.md#data)
- [dataPosition](Mpeg4IsoVisualSampleEntry.md#dataposition)
- [dataReferenceIndex](Mpeg4IsoVisualSampleEntry.md#datareferenceindex)
- [dataSize](Mpeg4IsoVisualSampleEntry.md#datasize)
- [description](Mpeg4IsoVisualSampleEntry.md#description)
- [durationMilliseconds](Mpeg4IsoVisualSampleEntry.md#durationmilliseconds)
- [handlerType](Mpeg4IsoVisualSampleEntry.md#handlertype)
- [hasChildren](Mpeg4IsoVisualSampleEntry.md#haschildren)
- [header](Mpeg4IsoVisualSampleEntry.md#header)
- [mediaTypes](Mpeg4IsoVisualSampleEntry.md#mediatypes)
- [size](Mpeg4IsoVisualSampleEntry.md#size)
- [videoHeight](Mpeg4IsoVisualSampleEntry.md#videoheight)
- [videoWidth](Mpeg4IsoVisualSampleEntry.md#videowidth)

### Methods

- [addChild](Mpeg4IsoVisualSampleEntry.md#addchild)
- [clearChildren](Mpeg4IsoVisualSampleEntry.md#clearchildren)
- [getChild](Mpeg4IsoVisualSampleEntry.md#getchild)
- [getChildRecursively](Mpeg4IsoVisualSampleEntry.md#getchildrecursively)
- [getChildren](Mpeg4IsoVisualSampleEntry.md#getchildren)
- [increaseDataPosition](Mpeg4IsoVisualSampleEntry.md#increasedataposition)
- [initializeFromHeader](Mpeg4IsoVisualSampleEntry.md#initializefromheader)
- [initializeFromHeaderFileAndHandler](Mpeg4IsoVisualSampleEntry.md#initializefromheaderfileandhandler)
- [initializeFromType](Mpeg4IsoVisualSampleEntry.md#initializefromtype)
- [loadData](Mpeg4IsoVisualSampleEntry.md#loaddata)
- [removeChildByBox](Mpeg4IsoVisualSampleEntry.md#removechildbybox)
- [removeChildByType](Mpeg4IsoVisualSampleEntry.md#removechildbytype)
- [removeChildrenByBox](Mpeg4IsoVisualSampleEntry.md#removechildrenbybox)
- [fromFile](Mpeg4IsoVisualSampleEntry.md#fromfile)

## Accessors

### boxType

• `get` **boxType**(): [`ByteVector`](ByteVector.md)

Gets the MPEG-4 box type of the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

IsoSampleEntry.boxType

___

### data

• `get` **data**(): [`ByteVector`](ByteVector.md)

Gets the data contained in the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

IsoSampleEntry.data

• `set` **data**(`v`): `void`

Sets the data contained in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`ByteVector`](ByteVector.md) |

#### Returns

`void`

#### Inherited from

IsoSampleEntry.data

___

### dataPosition

• `get` **dataPosition**(): `number`

Gets the position of the data contained in the current instance, after any box specific headers.

#### Returns

`number`

#### Inherited from

IsoSampleEntry.dataPosition

___

### dataReferenceIndex

• `get` **dataReferenceIndex**(): `number`

Gets the data reference index of the current instance.

#### Returns

`number`

#### Inherited from

IsoSampleEntry.dataReferenceIndex

___

### dataSize

• `get` **dataSize**(): `number`

Gets the size of the data contained in the current instance, minus the size of any box specific headers.

#### Returns

`number`

#### Inherited from

IsoSampleEntry.dataSize

___

### description

• `get` **description**(): `string`

Gets a text description of the media represented by the current instance.

#### Returns

`string`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[description](../interfaces/IVideoCodec.md#description)

___

### durationMilliseconds

• `get` **durationMilliseconds**(): `number`

Duration of the media in milliseconds represented by the current instance.

#### Returns

`number`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[durationMilliseconds](../interfaces/IVideoCodec.md#durationmilliseconds)

___

### handlerType

• `get` **handlerType**(): [`ByteVector`](ByteVector.md)

Gets the type of the handler box that applies to the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

IsoSampleEntry.handlerType

___

### hasChildren

• `get` **hasChildren**(): `boolean`

Gets whether the current instance has children.

#### Returns

`boolean`

#### Inherited from

IsoSampleEntry.hasChildren

___

### header

• `get` **header**(): [`Mpeg4BoxHeader`](Mpeg4BoxHeader.md)

Gets the header of the current instance.

#### Returns

[`Mpeg4BoxHeader`](Mpeg4BoxHeader.md)

#### Inherited from

IsoSampleEntry.header

___

### mediaTypes

• `get` **mediaTypes**(): [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.

#### Returns

[`MediaTypes`](../enums/MediaTypes.md)

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[mediaTypes](../interfaces/IVideoCodec.md#mediatypes)

___

### size

• `get` **size**(): `number`

Gets the total size of the current instance as it last appeared on disk.

#### Returns

`number`

#### Inherited from

IsoSampleEntry.size

___

### videoHeight

• `get` **videoHeight**(): `number`

Height of the video in pixels represented by the current instance.

#### Returns

`number`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[videoHeight](../interfaces/IVideoCodec.md#videoheight)

___

### videoWidth

• `get` **videoWidth**(): `number`

Width of the video in pixels represented by the current instance.

#### Returns

`number`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[videoWidth](../interfaces/IVideoCodec.md#videowidth)

## Methods

### addChild

▸ **addChild**(`box`): `void`

Adds a specified box to the current instance.

**`See`**

Mpeg4Box object to add to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `box` | [`Mpeg4Box`](Mpeg4Box.md) | A |

#### Returns

`void`

#### Inherited from

[Mpeg4IsoSampleEntry](Mpeg4IsoSampleEntry.md).[addChild](Mpeg4IsoSampleEntry.md#addchild)

___

### clearChildren

▸ **clearChildren**(): `void`

Removes all children from the current instance.

#### Returns

`void`

#### Inherited from

[Mpeg4IsoSampleEntry](Mpeg4IsoSampleEntry.md).[clearChildren](Mpeg4IsoSampleEntry.md#clearchildren)

___

### getChild

▸ **getChild**<`TBox`\>(`type`, `predicate?`): `TBox`

Gets a child box from the current instance by finding a matching box type.

**`See`**

ByteVector object containing the box type to match.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TBox` | extends [`Mpeg4Box`](Mpeg4Box.md)<`TBox`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ByteVector`](ByteVector.md) | A |
| `predicate?` | (`b`: `TBox`) => `boolean` | Optional predicate to filter boxes with the provided type. |

#### Returns

`TBox`

TBox Box containing the matched box, or `undefined` if no match was found.

#### Inherited from

[Mpeg4IsoSampleEntry](Mpeg4IsoSampleEntry.md).[getChild](Mpeg4IsoSampleEntry.md#getchild)

___

### getChildRecursively

▸ **getChildRecursively**(`type`): [`Mpeg4Box`](Mpeg4Box.md)

Gets a child box from the current instance by finding a matching box type, searching recursively.

**`See`**

ByteVector object containing the box type to match.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ByteVector`](ByteVector.md) | A |

#### Returns

[`Mpeg4Box`](Mpeg4Box.md)

Mpeg4Box Matching box, or `undefined` if no matching box was found

#### Inherited from

[Mpeg4IsoSampleEntry](Mpeg4IsoSampleEntry.md).[getChildRecursively](Mpeg4IsoSampleEntry.md#getchildrecursively)

___

### getChildren

▸ **getChildren**<`TBox`\>(`type`, `predicate?`): `TBox`[]

Gets all child boxes from the current instance by finding a matching box type.

**`See`**

ByteVector object containing the box type to match.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TBox` | extends [`Mpeg4Box`](Mpeg4Box.md)<`TBox`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ByteVector`](ByteVector.md) | A |
| `predicate?` | (`b`: `TBox`) => `boolean` | Optional predicate to filter boxes with the provided type. |

#### Returns

`TBox`[]

Mpeg4Box[] Array of matching boxes, or `undefined` if no matching boxes was found.

#### Inherited from

[Mpeg4IsoSampleEntry](Mpeg4IsoSampleEntry.md).[getChildren](Mpeg4IsoSampleEntry.md#getchildren)

___

### increaseDataPosition

▸ **increaseDataPosition**(`value`): `number`

Increases the data position by a given value. This function can be used by boxes
which extend from

**`See`**

Mpeg4Box to increase the data position, because the data
is located after their box specific headers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value to add to the data position. |

#### Returns

`number`

number Data position before the increase.

#### Inherited from

[Mpeg4IsoSampleEntry](Mpeg4IsoSampleEntry.md).[increaseDataPosition](Mpeg4IsoSampleEntry.md#increasedataposition)

___

### initializeFromHeader

▸ `Protected` **initializeFromHeader**(`header`, `handlerType?`): `void`

Initializes a new instance of

**`See`**

 - Mpeg4Box with a specified header and handler.
 - Mpeg4BoxHeader object describing the new instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`Mpeg4BoxHeader`](Mpeg4BoxHeader.md) | A |
| `handlerType?` | [`ByteVector`](ByteVector.md) | Type of the handler box object containing the handler that applies to the new instance, or undefined if no handler applies. |

#### Returns

`void`

#### Inherited from

[Mpeg4IsoSampleEntry](Mpeg4IsoSampleEntry.md).[initializeFromHeader](Mpeg4IsoSampleEntry.md#initializefromheader)

___

### initializeFromHeaderFileAndHandler

▸ **initializeFromHeaderFileAndHandler**(`header`, `file`, `handlerType`): `void`

Constructs and initializes a new instance of IsoSampleEntry with a provided header and
handler by reading the contents from a specified file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`Mpeg4BoxHeader`](Mpeg4BoxHeader.md) | A [Mpeg4BoxHeader](Mpeg4BoxHeader.md) object containing the header to use for the new instance. |
| `file` | [`File`](File.md) | A [File](File.md) object to read the contents of the box from. |
| `handlerType` | [`ByteVector`](ByteVector.md) | Type of the handler box object containing the handler that applies to the new instance, or undefined if no handler applies. |

#### Returns

`void`

#### Inherited from

[Mpeg4IsoSampleEntry](Mpeg4IsoSampleEntry.md).[initializeFromHeaderFileAndHandler](Mpeg4IsoSampleEntry.md#initializefromheaderfileandhandler)

___

### initializeFromType

▸ `Protected` **initializeFromType**(`type`): `void`

Initializes a new instance of

**`See`**

 - Mpeg4Box with a specified box type.
 - ByteVector object containing the box type to use for the new instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ByteVector`](ByteVector.md) | A |

#### Returns

`void`

#### Inherited from

[Mpeg4IsoSampleEntry](Mpeg4IsoSampleEntry.md).[initializeFromType](Mpeg4IsoSampleEntry.md#initializefromtype)

___

### loadData

▸ **loadData**(`file`): [`ByteVector`](ByteVector.md)

Loads the data of the current instance from a specified file using the internal data position and size.

**`See`**

File from which the current instance was read and from which to read the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | The |

#### Returns

[`ByteVector`](ByteVector.md)

ByteVector Data read from the file.

#### Inherited from

[Mpeg4IsoSampleEntry](Mpeg4IsoSampleEntry.md).[loadData](Mpeg4IsoSampleEntry.md#loaddata)

___

### removeChildByBox

▸ **removeChildByBox**(`box`): `void`

Removes a specified box from the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `box` | [`Mpeg4Box`](Mpeg4Box.md) | Box to remove from the current instance. |

#### Returns

`void`

#### Inherited from

[Mpeg4IsoSampleEntry](Mpeg4IsoSampleEntry.md).[removeChildByBox](Mpeg4IsoSampleEntry.md#removechildbybox)

___

### removeChildByType

▸ **removeChildByType**(`type`): `void`

Removes all children with a specified box type from the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ByteVector`](ByteVector.md) | Type of box to remove |

#### Returns

`void`

#### Inherited from

[Mpeg4IsoSampleEntry](Mpeg4IsoSampleEntry.md).[removeChildByType](Mpeg4IsoSampleEntry.md#removechildbytype)

___

### removeChildrenByBox

▸ **removeChildrenByBox**(`boxes`): `void`

Removes all specified boxes from the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `boxes` | [`Mpeg4Box`](Mpeg4Box.md)[] | Collection of boxes to remove from the current instance. |

#### Returns

`void`

#### Inherited from

[Mpeg4IsoSampleEntry](Mpeg4IsoSampleEntry.md).[removeChildrenByBox](Mpeg4IsoSampleEntry.md#removechildrenbybox)

___

### fromFile

▸ `Static` **fromFile**(`header`, `file`, `handlerType`): [`Mpeg4IsoVisualSampleEntry`](Mpeg4IsoVisualSampleEntry.md)

Initializes the instance using the box's header, and additional information read from the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`Mpeg4BoxHeader`](Mpeg4BoxHeader.md) | Header for the box. |
| `file` | [`File`](File.md) | File to read additional information from. |
| `handlerType` | [`ByteVector`](ByteVector.md) | Type of the handler for the box. Optional. |

#### Returns

[`Mpeg4IsoVisualSampleEntry`](Mpeg4IsoVisualSampleEntry.md)
