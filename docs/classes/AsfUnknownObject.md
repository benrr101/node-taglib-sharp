[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfUnknownObject

# Class: AsfUnknownObject

This class provides a representation of an ASF object that is unknown to the library, which can
be read from and written to disk.

## Hierarchy

- [`AsfBaseObject`](AsfBaseObject.md)

  ↳ **`AsfUnknownObject`**

## Table of contents

### Accessors

- [data](AsfUnknownObject.md#data)
- [guid](AsfUnknownObject.md#guid)
- [objectType](AsfUnknownObject.md#objecttype)
- [originalSize](AsfUnknownObject.md#originalsize)

### Methods

- [initializeFromFile](AsfUnknownObject.md#initializefromfile)
- [initializeFromGuid](AsfUnknownObject.md#initializefromguid)
- [render](AsfUnknownObject.md#render)
- [renderInternal](AsfUnknownObject.md#renderinternal)
- [fromFile](AsfUnknownObject.md#fromfile)

## Accessors

### data

• `get` **data**(): [`ByteVector`](ByteVector.md)

Gets the data contained in the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

• `set` **data**(`value`): `void`

Sets the data contained in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`ByteVector`](ByteVector.md) | Data to store in the current instance. Must be truthy. |

#### Returns

`void`

___

### guid

• `get` **guid**(): [`UuidWrapper`](UuidWrapper.md)

Gets the GUID that identifies the current instance.

#### Returns

[`UuidWrapper`](UuidWrapper.md)

#### Inherited from

BaseObject.guid

___

### objectType

• `get` **objectType**(): [`AsfObjectType`](../enums/AsfObjectType.md)

Gets the type of the object for easy comparison.

#### Returns

[`AsfObjectType`](../enums/AsfObjectType.md)

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

[AsfBaseObject](AsfBaseObject.md).[initializeFromFile](AsfBaseObject.md#initializefromfile)

___

### initializeFromGuid

▸ `Protected` **initializeFromGuid**(`guid`): `void`

Initializes a new instance with a specified GUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guid` | [`UuidWrapper`](UuidWrapper.md) | GUID to use for the new instance. |

#### Returns

`void`

#### Inherited from

[AsfBaseObject](AsfBaseObject.md).[initializeFromGuid](AsfBaseObject.md#initializefromguid)

___

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

Renders the current instance as a raw ASF object.

#### Returns

[`ByteVector`](ByteVector.md)

#### Overrides

[AsfBaseObject](AsfBaseObject.md).[render](AsfBaseObject.md#render)

___

### renderInternal

▸ `Protected` **renderInternal**(`data`): [`ByteVector`](ByteVector.md)

Renders the current instance as a raw ASF object containing the specified data.

**`Remarks`**

Child classes implementing [()](AsfUnknownObject.md#render) should render their contents and then
    send the data through this method to produce the final output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Data to store in the rendered version of the current instance. |

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

[AsfBaseObject](AsfBaseObject.md).[renderInternal](AsfBaseObject.md#renderinternal)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`AsfUnknownObject`](AsfUnknownObject.md)

Constructs and initializes a new instance by reading the contents from a specified file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File from which the contents of the new instance will be read |
| `position` | `number` | Index into the file where the object begins |

#### Returns

[`AsfUnknownObject`](AsfUnknownObject.md)
