[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Mpeg4IsoMovieHeaderBox

# Class: Mpeg4IsoMovieHeaderBox

This class extends FullBox to provide an implementation of a ISO/IEC 14496-12 MovieHeaderBox.

## Hierarchy

- [`Mpeg4FullBox`](Mpeg4FullBox.md)

  ↳ **`Mpeg4IsoMovieHeaderBox`**

## Table of contents

### Accessors

- [boxType](Mpeg4IsoMovieHeaderBox.md#boxtype)
- [creationTime](Mpeg4IsoMovieHeaderBox.md#creationtime)
- [data](Mpeg4IsoMovieHeaderBox.md#data)
- [dataPosition](Mpeg4IsoMovieHeaderBox.md#dataposition)
- [dataSize](Mpeg4IsoMovieHeaderBox.md#datasize)
- [durationInMilliseconds](Mpeg4IsoMovieHeaderBox.md#durationinmilliseconds)
- [flags](Mpeg4IsoMovieHeaderBox.md#flags)
- [handlerType](Mpeg4IsoMovieHeaderBox.md#handlertype)
- [hasChildren](Mpeg4IsoMovieHeaderBox.md#haschildren)
- [header](Mpeg4IsoMovieHeaderBox.md#header)
- [modificationTime](Mpeg4IsoMovieHeaderBox.md#modificationtime)
- [nextTrackId](Mpeg4IsoMovieHeaderBox.md#nexttrackid)
- [rate](Mpeg4IsoMovieHeaderBox.md#rate)
- [size](Mpeg4IsoMovieHeaderBox.md#size)
- [version](Mpeg4IsoMovieHeaderBox.md#version)
- [volume](Mpeg4IsoMovieHeaderBox.md#volume)

### Methods

- [addChild](Mpeg4IsoMovieHeaderBox.md#addchild)
- [clearChildren](Mpeg4IsoMovieHeaderBox.md#clearchildren)
- [getChild](Mpeg4IsoMovieHeaderBox.md#getchild)
- [getChildRecursively](Mpeg4IsoMovieHeaderBox.md#getchildrecursively)
- [getChildren](Mpeg4IsoMovieHeaderBox.md#getchildren)
- [increaseDataPosition](Mpeg4IsoMovieHeaderBox.md#increasedataposition)
- [initializeFromHeader](Mpeg4IsoMovieHeaderBox.md#initializefromheader)
- [initializeFromHeaderFileAndHandler](Mpeg4IsoMovieHeaderBox.md#initializefromheaderfileandhandler)
- [initializeFromType](Mpeg4IsoMovieHeaderBox.md#initializefromtype)
- [initializeFromTypeVersionAndFlags](Mpeg4IsoMovieHeaderBox.md#initializefromtypeversionandflags)
- [loadData](Mpeg4IsoMovieHeaderBox.md#loaddata)
- [removeChildByBox](Mpeg4IsoMovieHeaderBox.md#removechildbybox)
- [removeChildByType](Mpeg4IsoMovieHeaderBox.md#removechildbytype)
- [removeChildrenByBox](Mpeg4IsoMovieHeaderBox.md#removechildrenbybox)
- [fromFile](Mpeg4IsoMovieHeaderBox.md#fromfile)

## Accessors

### boxType

• `get` **boxType**(): [`ByteVector`](ByteVector.md)

Gets the MPEG-4 box type of the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

FullBox.boxType

___

### creationTime

• `get` **creationTime**(): `number`

Gets the creation time of the movie.

#### Returns

`number`

___

### data

• `get` **data**(): [`ByteVector`](ByteVector.md)

Gets the data contained in the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

FullBox.data

• `set` **data**(`v`): `void`

Sets the data contained in the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`ByteVector`](ByteVector.md) |

#### Returns

`void`

#### Inherited from

FullBox.data

___

### dataPosition

• `get` **dataPosition**(): `number`

Gets the position of the data contained in the current instance, after any box specific headers.

#### Returns

`number`

#### Inherited from

FullBox.dataPosition

___

### dataSize

• `get` **dataSize**(): `number`

Gets the size of the data contained in the current instance, minus the size of any box specific headers.

#### Returns

`number`

#### Inherited from

FullBox.dataSize

___

### durationInMilliseconds

• `get` **durationInMilliseconds**(): `number`

Gets the duration of the movie represented by the current instance.

#### Returns

`number`

___

### flags

• `get` **flags**(): `number`

Gets the flags that apply to the current instance.

#### Returns

`number`

#### Inherited from

FullBox.flags

• `set` **flags**(`value`): `void`

Sets the flags that apply to the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

FullBox.flags

___

### handlerType

• `get` **handlerType**(): [`ByteVector`](ByteVector.md)

Gets the type of the handler box that applies to the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

FullBox.handlerType

___

### hasChildren

• `get` **hasChildren**(): `boolean`

Gets whether the current instance has children.

#### Returns

`boolean`

#### Inherited from

FullBox.hasChildren

___

### header

• `get` **header**(): [`Mpeg4BoxHeader`](Mpeg4BoxHeader.md)

Gets the header of the current instance.

#### Returns

[`Mpeg4BoxHeader`](Mpeg4BoxHeader.md)

#### Inherited from

FullBox.header

___

### modificationTime

• `get` **modificationTime**(): `number`

Gets the modification time of the movie.

#### Returns

`number`

___

### nextTrackId

• `get` **nextTrackId**(): `number`

Gets the ID of the next track in the movie represented by the current instance.

#### Returns

`number`

___

### rate

• `get` **rate**(): `number`

Gets the playback rate of the movie represented by the current instance.

#### Returns

`number`

___

### size

• `get` **size**(): `number`

Gets the total size of the current instance as it last appeared on disk.

#### Returns

`number`

#### Inherited from

FullBox.size

___

### version

• `get` **version**(): `number`

Gets the version number of the current instance.

#### Returns

`number`

#### Inherited from

FullBox.version

___

### volume

• `get` **volume**(): `number`

Gets the playback volume of the movie represented by the current instance.

#### Returns

`number`

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

[Mpeg4FullBox](Mpeg4FullBox.md).[addChild](Mpeg4FullBox.md#addchild)

___

### clearChildren

▸ **clearChildren**(): `void`

Removes all children from the current instance.

#### Returns

`void`

#### Inherited from

[Mpeg4FullBox](Mpeg4FullBox.md).[clearChildren](Mpeg4FullBox.md#clearchildren)

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

[Mpeg4FullBox](Mpeg4FullBox.md).[getChild](Mpeg4FullBox.md#getchild)

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

[Mpeg4FullBox](Mpeg4FullBox.md).[getChildRecursively](Mpeg4FullBox.md#getchildrecursively)

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

[Mpeg4FullBox](Mpeg4FullBox.md).[getChildren](Mpeg4FullBox.md#getchildren)

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

[Mpeg4FullBox](Mpeg4FullBox.md).[increaseDataPosition](Mpeg4FullBox.md#increasedataposition)

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

[Mpeg4FullBox](Mpeg4FullBox.md).[initializeFromHeader](Mpeg4FullBox.md#initializefromheader)

___

### initializeFromHeaderFileAndHandler

▸ `Protected` **initializeFromHeaderFileAndHandler**(`header`, `file`, `handlerType`): `void`

Initializes a new instance of FullBox with a provided header and handler
by reading the contents from a specified file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`Mpeg4BoxHeader`](Mpeg4BoxHeader.md) | A [Mpeg4BoxHeader](Mpeg4BoxHeader.md) object containing the header to use for the new instance. |
| `file` | [`File`](File.md) | A [File](File.md) object to read the contents of the box from. |
| `handlerType` | [`ByteVector`](ByteVector.md) | Type of the handler box object containing the handler that applies to the new instance, or undefined if no handler applies. |

#### Returns

`void`

#### Inherited from

[Mpeg4FullBox](Mpeg4FullBox.md).[initializeFromHeaderFileAndHandler](Mpeg4FullBox.md#initializefromheaderfileandhandler)

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

[Mpeg4FullBox](Mpeg4FullBox.md).[initializeFromType](Mpeg4FullBox.md#initializefromtype)

___

### initializeFromTypeVersionAndFlags

▸ `Protected` **initializeFromTypeVersionAndFlags**(`type`, `version`, `flags`): `void`

Initializes a new instance of FullBox with a provided header, version, and flags.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ByteVector`](ByteVector.md) | A [ByteVector](ByteVector.md) object containing the four byte box type. |
| `version` | `number` | A value containing the version of the new instance. |
| `flags` | `number` | A value containing the flags for the new instance. |

#### Returns

`void`

#### Inherited from

[Mpeg4FullBox](Mpeg4FullBox.md).[initializeFromTypeVersionAndFlags](Mpeg4FullBox.md#initializefromtypeversionandflags)

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

[Mpeg4FullBox](Mpeg4FullBox.md).[loadData](Mpeg4FullBox.md#loaddata)

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

[Mpeg4FullBox](Mpeg4FullBox.md).[removeChildByBox](Mpeg4FullBox.md#removechildbybox)

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

[Mpeg4FullBox](Mpeg4FullBox.md).[removeChildByType](Mpeg4FullBox.md#removechildbytype)

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

[Mpeg4FullBox](Mpeg4FullBox.md).[removeChildrenByBox](Mpeg4FullBox.md#removechildrenbybox)

___

### fromFile

▸ `Static` **fromFile**(`header`, `file`, `handlerType`): [`Mpeg4IsoMovieHeaderBox`](Mpeg4IsoMovieHeaderBox.md)

Constructs and initializes a new instance of IsoMovieHeaderBox with a provided header and
handler by reading the contents from a specified file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`Mpeg4BoxHeader`](Mpeg4BoxHeader.md) | A [Mpeg4BoxHeader](Mpeg4BoxHeader.md) object containing the header to use for the new instance. |
| `file` | [`File`](File.md) | A [File](File.md) object to read the contents of the box from. |
| `handlerType` | [`ByteVector`](ByteVector.md) | Type of the handler box object containing the handler that applies to the new instance, or undefined if no handler applies. |

#### Returns

[`Mpeg4IsoMovieHeaderBox`](Mpeg4IsoMovieHeaderBox.md)
