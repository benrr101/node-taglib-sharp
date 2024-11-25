[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfExtendedContentDescriptionObject

# Class: AsfExtendedContentDescriptionObject

This class provides a representation of an ASF extended contend description object which can be
read from and written to disk.

## Hierarchy

- [`AsfBaseObject`](AsfBaseObject.md)

  ↳ **`AsfExtendedContentDescriptionObject`**

## Table of contents

### Accessors

- [descriptors](AsfExtendedContentDescriptionObject.md#descriptors)
- [guid](AsfExtendedContentDescriptionObject.md#guid)
- [isEmpty](AsfExtendedContentDescriptionObject.md#isempty)
- [objectType](AsfExtendedContentDescriptionObject.md#objecttype)
- [originalSize](AsfExtendedContentDescriptionObject.md#originalsize)

### Methods

- [addDescriptor](AsfExtendedContentDescriptionObject.md#adddescriptor)
- [getDescriptors](AsfExtendedContentDescriptionObject.md#getdescriptors)
- [initializeFromFile](AsfExtendedContentDescriptionObject.md#initializefromfile)
- [initializeFromGuid](AsfExtendedContentDescriptionObject.md#initializefromguid)
- [removeDescriptors](AsfExtendedContentDescriptionObject.md#removedescriptors)
- [render](AsfExtendedContentDescriptionObject.md#render)
- [renderInternal](AsfExtendedContentDescriptionObject.md#renderinternal)
- [setDescriptors](AsfExtendedContentDescriptionObject.md#setdescriptors)
- [fromEmpty](AsfExtendedContentDescriptionObject.md#fromempty)
- [fromFile](AsfExtendedContentDescriptionObject.md#fromfile)

## Accessors

### descriptors

• `get` **descriptors**(): [`AsfContentDescriptor`](AsfContentDescriptor.md)[]

Gets all descriptors stored in the current instance.

#### Returns

[`AsfContentDescriptor`](AsfContentDescriptor.md)[]

___

### guid

• `get` **guid**(): [`UuidWrapper`](UuidWrapper.md)

Gets the GUID that identifies the current instance.

#### Returns

[`UuidWrapper`](UuidWrapper.md)

#### Inherited from

BaseObject.guid

___

### isEmpty

• `get` **isEmpty**(): `boolean`

Gets whether the current instance contains any records.

#### Returns

`boolean`

`true` if the current instance does not contain any records, `false`
    otherwise.

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

### addDescriptor

▸ **addDescriptor**(`descriptor`): `void`

Adds a descriptor to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `descriptor` | [`AsfContentDescriptor`](AsfContentDescriptor.md) | Record to add to the current instance |

#### Returns

`void`

___

### getDescriptors

▸ **getDescriptors**(`...names`): [`AsfContentDescriptor`](AsfContentDescriptor.md)[]

Gets all descriptors with a name matching one of the provided collection of names the
current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...names` | `string`[] | List of names of the records to return |

#### Returns

[`AsfContentDescriptor`](AsfContentDescriptor.md)[]

___

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

### removeDescriptors

▸ **removeDescriptors**(`name`): `void`

Removes all descriptors with a given name from the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the descriptor to be removed |

#### Returns

`void`

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

Child classes implementing [()](AsfExtendedContentDescriptionObject.md#render) should render their contents and then
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

### setDescriptors

▸ **setDescriptors**(`name`, `...descriptors`): `void`

Sets a collection of descriptors for a given name, removing the existing matching records.

**`Remarks`**

All added descriptors should have their name set to `name` but this is not
    verified by the method. The descriptors will be added with their own names and not the
    one provided as an argument, which is only used for removing existing values and
    determining where to position the new descriptors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the descriptors to be added/removed |
| `...descriptors` | [`AsfContentDescriptor`](AsfContentDescriptor.md)[] | Descriptors to add to the new instance |

#### Returns

`void`

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`AsfExtendedContentDescriptionObject`](AsfExtendedContentDescriptionObject.md)

Constructs and initializes a new, empty extended content description object.

#### Returns

[`AsfExtendedContentDescriptionObject`](AsfExtendedContentDescriptionObject.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`AsfExtendedContentDescriptionObject`](AsfExtendedContentDescriptionObject.md)

Constructs and initializes a new instance that is read in from the provided file at the
provided position.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File to read the instance from. Must not be falsey |
| `position` | `number` | Position in the file where the instance begins. Must be a positive, safe integer. |

#### Returns

[`AsfExtendedContentDescriptionObject`](AsfExtendedContentDescriptionObject.md)
