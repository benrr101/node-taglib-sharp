[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfUnknownObject

# Class: AsfUnknownObject

This class provides a representation of an ASF object that is unknown to the library, which can
be read from and written to disk.

## Hierarchy

- `BaseObject`

  ↳ **`AsfUnknownObject`**

## Table of contents

### Accessors

- [data](asfunknownobject.md#data)
- [guid](asfunknownobject.md#guid)
- [objectType](asfunknownobject.md#objecttype)
- [originalSize](asfunknownobject.md#originalsize)

### Methods

- [initializeFromFile](asfunknownobject.md#initializefromfile)
- [initializeFromGuid](asfunknownobject.md#initializefromguid)
- [render](asfunknownobject.md#render)
- [renderInternal](asfunknownobject.md#renderinternal)
- [fromFile](asfunknownobject.md#fromfile)

## Accessors

### data

• `get` **data**(): [`ByteVector`](bytevector.md)

Gets the data contained in the current instance.

#### Returns

[`ByteVector`](bytevector.md)

• `set` **data**(`value`): `void`

Sets the data contained in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`ByteVector`](bytevector.md) | Data to store in the current instance. Must be truthy. |

#### Returns

`void`

___

### guid

• `get` **guid**(): `default`

Gets the GUID that identifies the current instance.

#### Returns

`default`

___

### objectType

• `get` **objectType**(): `ObjectType`

#### Returns

`ObjectType`

___

### originalSize

• `get` **originalSize**(): `number`

Gets the original size of the current instance.

#### Returns

`number`

## Methods

### initializeFromFile

▸ `Protected` **initializeFromFile**(`file`, `position`): `void`

Initializes a new instance by reading the contents from a specified position in a specified
file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](file.md) | File which contains the details of the new instance to create |
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

▸ **render**(): [`ByteVector`](bytevector.md)

**`inheritdoc`**

#### Returns

[`ByteVector`](bytevector.md)

#### Overrides

BaseObject.render

___

### renderInternal

▸ `Protected` **renderInternal**(`data`): [`ByteVector`](bytevector.md)

Renders the current instance as a raw ASF object containing the specified data.

**`remarks`** Child classes implementing {@see render()} should render their contents and then
    send the data through this method to produce the final output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Data to store in the rendered version of the current instance. |

#### Returns

[`ByteVector`](bytevector.md)

#### Inherited from

BaseObject.renderInternal

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`AsfUnknownObject`](asfunknownobject.md)

Constructs and initializes a new instance by reading the contents from a specified file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](file.md) | File from which the contents of the new instance will be read |
| `position` | `number` | Index into the file where the object begins |

#### Returns

[`AsfUnknownObject`](asfunknownobject.md)
