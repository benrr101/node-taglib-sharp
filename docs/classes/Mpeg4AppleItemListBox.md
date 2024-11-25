[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Mpeg4AppleItemListBox

# Class: Mpeg4AppleItemListBox

This class extends [Mpeg4Box](Mpeg4Box.md) to provide an implementation of an Apple ItemListBox.

## Hierarchy

- [`Mpeg4Box`](Mpeg4Box.md)

  ↳ **`Mpeg4AppleItemListBox`**

## Table of contents

### Accessors

- [boxType](Mpeg4AppleItemListBox.md#boxtype)
- [data](Mpeg4AppleItemListBox.md#data)
- [dataPosition](Mpeg4AppleItemListBox.md#dataposition)
- [dataSize](Mpeg4AppleItemListBox.md#datasize)
- [handlerType](Mpeg4AppleItemListBox.md#handlertype)
- [hasChildren](Mpeg4AppleItemListBox.md#haschildren)
- [header](Mpeg4AppleItemListBox.md#header)
- [size](Mpeg4AppleItemListBox.md#size)

### Methods

- [addChild](Mpeg4AppleItemListBox.md#addchild)
- [clearChildren](Mpeg4AppleItemListBox.md#clearchildren)
- [getChild](Mpeg4AppleItemListBox.md#getchild)
- [getChildRecursively](Mpeg4AppleItemListBox.md#getchildrecursively)
- [getChildren](Mpeg4AppleItemListBox.md#getchildren)
- [getItunesTagBox](Mpeg4AppleItemListBox.md#getitunestagbox)
- [getItunesTagBoxes](Mpeg4AppleItemListBox.md#getitunestagboxes)
- [getItunesTagDataBoxes](Mpeg4AppleItemListBox.md#getitunestagdataboxes)
- [getQuickTimeDataBoxes](Mpeg4AppleItemListBox.md#getquicktimedataboxes)
- [increaseDataPosition](Mpeg4AppleItemListBox.md#increasedataposition)
- [initializeFromHeader](Mpeg4AppleItemListBox.md#initializefromheader)
- [initializeFromType](Mpeg4AppleItemListBox.md#initializefromtype)
- [loadData](Mpeg4AppleItemListBox.md#loaddata)
- [removeChildByBox](Mpeg4AppleItemListBox.md#removechildbybox)
- [removeChildByType](Mpeg4AppleItemListBox.md#removechildbytype)
- [removeChildrenByBox](Mpeg4AppleItemListBox.md#removechildrenbybox)
- [setItunesTagBoxes](Mpeg4AppleItemListBox.md#setitunestagboxes)
- [setQuickTimeBoxes](Mpeg4AppleItemListBox.md#setquicktimeboxes)
- [fromEmpty](Mpeg4AppleItemListBox.md#fromempty)
- [fromHeader](Mpeg4AppleItemListBox.md#fromheader)

## Accessors

### boxType

• `get` **boxType**(): [`ByteVector`](ByteVector.md)

Gets the MPEG-4 box type of the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

Mpeg4Box.boxType

___

### data

• `get` **data**(): [`ByteVector`](ByteVector.md)

Gets the data contained in the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

Mpeg4Box.data

• `set` **data**(`v`): `void`

Sets the data contained in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`ByteVector`](ByteVector.md) |

#### Returns

`void`

#### Inherited from

Mpeg4Box.data

___

### dataPosition

• `get` **dataPosition**(): `number`

Gets the position of the data contained in the current instance, after any box specific headers.

#### Returns

`number`

#### Inherited from

Mpeg4Box.dataPosition

___

### dataSize

• `get` **dataSize**(): `number`

Gets the size of the data contained in the current instance, minus the size of any box specific headers.

#### Returns

`number`

#### Inherited from

Mpeg4Box.dataSize

___

### handlerType

• `get` **handlerType**(): [`ByteVector`](ByteVector.md)

Gets the type of the handler box that applies to the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

Mpeg4Box.handlerType

___

### hasChildren

• `get` **hasChildren**(): `boolean`

Gets whether the current instance has children.

#### Returns

`boolean`

#### Inherited from

Mpeg4Box.hasChildren

___

### header

• `get` **header**(): [`Mpeg4BoxHeader`](Mpeg4BoxHeader.md)

Gets the header of the current instance.

#### Returns

[`Mpeg4BoxHeader`](Mpeg4BoxHeader.md)

#### Inherited from

Mpeg4Box.header

___

### size

• `get` **size**(): `number`

Gets the total size of the current instance as it last appeared on disk.

#### Returns

`number`

#### Inherited from

Mpeg4Box.size

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

[Mpeg4Box](Mpeg4Box.md).[addChild](Mpeg4Box.md#addchild)

___

### clearChildren

▸ **clearChildren**(): `void`

Removes all children from the current instance.

#### Returns

`void`

#### Inherited from

[Mpeg4Box](Mpeg4Box.md).[clearChildren](Mpeg4Box.md#clearchildren)

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

[Mpeg4Box](Mpeg4Box.md).[getChild](Mpeg4Box.md#getchild)

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

[Mpeg4Box](Mpeg4Box.md).[getChildRecursively](Mpeg4Box.md#getchildrecursively)

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

[Mpeg4Box](Mpeg4Box.md).[getChildren](Mpeg4Box.md#getchildren)

___

### getItunesTagBox

▸ **getItunesTagBox**(`meanString`, `nameString`): [`Mpeg4AppleAnnotationBox`](Mpeg4AppleAnnotationBox.md)

Returns the first itunes box object for a given mean/name combination

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `meanString` | `string` | String specifying text for mean box |
| `nameString` | `string` | String specifying text for name box |

#### Returns

[`Mpeg4AppleAnnotationBox`](Mpeg4AppleAnnotationBox.md)

AppleAnnotationBox First iTunes box that contains the desired mean/name combination
    or `undefined` if desired box was not found.

___

### getItunesTagBoxes

▸ **getItunesTagBoxes**(`meanString`, `nameString`): [`Mpeg4AppleAnnotationBox`](Mpeg4AppleAnnotationBox.md)[]

Returns all itunes boxes for a given mean/name string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `meanString` | `string` | MEAN box contents to search for |
| `nameString` | `string` | NAME box contents to search for |

#### Returns

[`Mpeg4AppleAnnotationBox`](Mpeg4AppleAnnotationBox.md)[]

AppleAnnotationBox[] All iTunes boxes that contain the desired mean/name
    combination. `[]` is returned if no matches were found.

___

### getItunesTagDataBoxes

▸ **getItunesTagDataBoxes**(`meanString`, `nameString`): [`Mpeg4AppleDataBox`](Mpeg4AppleDataBox.md)[]

Gets all DATA boxes that correspond to the specified iTunes MEAN and NAME values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `meanString` | `string` | String specifying text for MEAN box |
| `nameString` | `string` | String specifying text for NAME box |

#### Returns

[`Mpeg4AppleDataBox`](Mpeg4AppleDataBox.md)[]

AppleDataBox[] DATA boxes contained within the iTunes boxes with the given
    MEAN/NAME values. `[]` is returned if no matches are found.

___

### getQuickTimeDataBoxes

▸ **getQuickTimeDataBoxes**(`type`): [`Mpeg4AppleDataBox`](Mpeg4AppleDataBox.md)[]

Gets all DATA boxes that correspond to the specified QuickTime box type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ByteVector`](ByteVector.md) | Box type to search for |

#### Returns

[`Mpeg4AppleDataBox`](Mpeg4AppleDataBox.md)[]

AppleDataBox[] DATA boxes contained within the boxes with the givem type. `[]` is
    returned if no matches were found.

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

[Mpeg4Box](Mpeg4Box.md).[increaseDataPosition](Mpeg4Box.md#increasedataposition)

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

[Mpeg4Box](Mpeg4Box.md).[initializeFromHeader](Mpeg4Box.md#initializefromheader)

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

[Mpeg4Box](Mpeg4Box.md).[initializeFromType](Mpeg4Box.md#initializefromtype)

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

[Mpeg4Box](Mpeg4Box.md).[loadData](Mpeg4Box.md#loaddata)

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

[Mpeg4Box](Mpeg4Box.md).[removeChildByBox](Mpeg4Box.md#removechildbybox)

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

[Mpeg4Box](Mpeg4Box.md).[removeChildByType](Mpeg4Box.md#removechildbytype)

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

[Mpeg4Box](Mpeg4Box.md).[removeChildrenByBox](Mpeg4Box.md#removechildrenbybox)

___

### setItunesTagBoxes

▸ **setItunesTagBoxes**(`meanString`, `nameString`, `dataStrings`): `void`

Stores the given `dataStrings` as separate iTunes boxes. It clears any existing iTunes
boxes and replaces them with the provided data. Structure will look like:
```
- this
  - ----
    - MEAN meanString
    - NAME nameString
    - DATA dataStrings[0]
  - ----
    - MEAN meanString
    - NAME nameString
    - DATA dataStrings[1]
  ...
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `meanString` | `string` | String to use for MEAN box. |
| `nameString` | `string` | String to use for NAME box. |
| `dataStrings` | `string`[] | Strings to store in the DATA boxes. |

#### Returns

`void`

___

### setQuickTimeBoxes

▸ **setQuickTimeBoxes**(`type`, `dataBoxes`): `void`

Stores the given `dataBoxes` in the current instance inside a single box of the given
`type`. Any existing boxes of the given `type` will be removed. Structure will look like:
```
- this
  - type
    - dataBoxes[0]
    - dataBoxes[1]
    ...
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ByteVector`](ByteVector.md) | Type of the parent box that will house `dataBoxes` |
| `dataBoxes` | [`Mpeg4AppleDataBox`](Mpeg4AppleDataBox.md)[] | DATA boxes to store in a new parent box. |

#### Returns

`void`

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`Mpeg4AppleItemListBox`](Mpeg4AppleItemListBox.md)

Constructs and initializes a new instance of AppleItemListBox with no children.

#### Returns

[`Mpeg4AppleItemListBox`](Mpeg4AppleItemListBox.md)

___

### fromHeader

▸ `Static` **fromHeader**(`header`, `handlerType`): [`Mpeg4AppleItemListBox`](Mpeg4AppleItemListBox.md)

Constructs and initializes a new instance of AppleItemListBox with a provided header and
handler by reading the contents from a specified file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`Mpeg4BoxHeader`](Mpeg4BoxHeader.md) | A [Mpeg4BoxHeader](Mpeg4BoxHeader.md) object containing the header to use for the new instance. |
| `handlerType` | [`ByteVector`](ByteVector.md) | Type of the handler box object containing the handler that applies to the new instance, or undefined if no handler applies. |

#### Returns

[`Mpeg4AppleItemListBox`](Mpeg4AppleItemListBox.md)
