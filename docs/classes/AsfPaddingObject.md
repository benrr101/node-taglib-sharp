[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfPaddingObject

# Class: AsfPaddingObject

This class provides a representation of an ASF padding object which can be read from and
written to disk.

## Hierarchy

- `default`

  ↳ **`AsfPaddingObject`**

## Table of contents

### Properties

- [HEADER\_LENGTH](AsfPaddingObject.md#header_length)

### Accessors

- [guid](AsfPaddingObject.md#guid)
- [objectType](AsfPaddingObject.md#objecttype)
- [originalSize](AsfPaddingObject.md#originalsize)
- [size](AsfPaddingObject.md#size)

### Methods

- [initializeFromFile](AsfPaddingObject.md#initializefromfile)
- [initializeFromGuid](AsfPaddingObject.md#initializefromguid)
- [render](AsfPaddingObject.md#render)
- [renderInternal](AsfPaddingObject.md#renderinternal)
- [fromFile](AsfPaddingObject.md#fromfile)
- [fromSize](AsfPaddingObject.md#fromsize)

## Properties

### HEADER\_LENGTH

▪ `Static` `Readonly` **HEADER\_LENGTH**: ``24``

## Accessors

### guid

• `get` **guid**(): `default`

Gets the GUID that identifies the current instance.

#### Returns

`default`

#### Inherited from

BaseObject.guid

___

### objectType

• `get` **objectType**(): `ObjectType`

**`inheritdoc`**

#### Returns

`ObjectType`

#### Overrides

BaseObject.objectType

___

### originalSize

• `get` **originalSize**(): `number`

Gets the original size of the current instance.

#### Returns

`number`

#### Inherited from

BaseObject.originalSize

___

### size

• `get` **size**(): `number`

Gets the number of bytes the current instance will take up on disk. Note: this does *not*
include the header for the object.

#### Returns

`number`

• `set` **size**(`value`): `void`

Sets the number of padding bytes the current instance will contain. Note: this does *not*
include the header for the object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Size of the current instance in bytes, must be a safe, positive integer. |

#### Returns

`void`

## Methods

### initializeFromFile

▸ `Protected` **initializeFromFile**(`file`, `position`): `void`

Initializes a new instance by reading the contents from a specified position in a specified
file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File which contains the details of the new instance to create |
| `position` | `number` | Position in `file` where the object begins |

#### Returns

`void`

#### Inherited from

BaseObject.initializeFromFile

___

### initializeFromGuid

▸ `Protected` **initializeFromGuid**(`guid`): `void`

Initializes a new instance with a specified GUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guid` | `default` | GUID to use for the new instance. |

#### Returns

`void`

#### Inherited from

BaseObject.initializeFromGuid

___

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

**`inheritdoc`**

#### Returns

[`ByteVector`](ByteVector.md)

#### Overrides

BaseObject.render

___

### renderInternal

▸ `Protected` **renderInternal**(`data`): [`ByteVector`](ByteVector.md)

Renders the current instance as a raw ASF object containing the specified data.

**`remarks`** Child classes implementing {@see render()} should render their contents and then
    send the data through this method to produce the final output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Data to store in the rendered version of the current instance. |

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

BaseObject.renderInternal

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`AsfPaddingObject`](AsfPaddingObject.md)

Constructs and initializes a new instance by reading it from a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File to read the padding object from |
| `position` | `number` | Index into the file where the padding object starts from |

#### Returns

[`AsfPaddingObject`](AsfPaddingObject.md)

___

### fromSize

▸ `Static` **fromSize**(`size`): [`AsfPaddingObject`](AsfPaddingObject.md)

Constructs and initializes a new instance with a fixed size.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` | Number of padding bytes to store in the object not including the size of the     header |

#### Returns

[`AsfPaddingObject`](AsfPaddingObject.md)
