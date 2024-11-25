[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfHeaderObject

# Class: AsfHeaderObject

This class provides a representation of an ASF header object which can be read from and written
to disk.

## Hierarchy

- [`AsfBaseObject`](AsfBaseObject.md)

  ↳ **`AsfHeaderObject`**

## Table of contents

### Accessors

- [children](AsfHeaderObject.md#children)
- [extension](AsfHeaderObject.md#extension)
- [guid](AsfHeaderObject.md#guid)
- [hasContentDescriptors](AsfHeaderObject.md#hascontentdescriptors)
- [objectType](AsfHeaderObject.md#objecttype)
- [originalSize](AsfHeaderObject.md#originalsize)
- [properties](AsfHeaderObject.md#properties)

### Methods

- [addUniqueObject](AsfHeaderObject.md#adduniqueobject)
- [initializeFromFile](AsfHeaderObject.md#initializefromfile)
- [initializeFromGuid](AsfHeaderObject.md#initializefromguid)
- [removeContentDescriptor](AsfHeaderObject.md#removecontentdescriptor)
- [render](AsfHeaderObject.md#render)
- [renderInternal](AsfHeaderObject.md#renderinternal)
- [fromFile](AsfHeaderObject.md#fromfile)

## Accessors

### children

• `get` **children**(): [`AsfBaseObject`](AsfBaseObject.md)[]

Gets that child objects of this instance.

**`Remarks`**

The returned array is a copy of the array of children inside this object. Any
    changes to this array will not be reflected in the object.

    Only certain objects are valid inside a header object. Any objects that are not valid or
    not supported are read as UnknownObject.

#### Returns

[`AsfBaseObject`](AsfBaseObject.md)[]

___

### extension

• `get` **extension**(): [`AsfHeaderExtensionObject`](AsfHeaderExtensionObject.md)

Gets the header extension object contained in the current instance.

#### Returns

[`AsfHeaderExtensionObject`](AsfHeaderExtensionObject.md)

Header extension contained in this instance, if it exists.
    `undefined` is returned if it doesn't exist

___

### guid

• `get` **guid**(): [`UuidWrapper`](UuidWrapper.md)

Gets the GUID that identifies the current instance.

#### Returns

[`UuidWrapper`](UuidWrapper.md)

#### Inherited from

BaseObject.guid

___

### hasContentDescriptors

• `get` **hasContentDescriptors**(): `boolean`

Gets whether the current instance contains either type of content descriptors.

#### Returns

`boolean`

`true` if a content description object or extended content description
    object exists in this instance. `false` otherwise

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

___

### properties

• `get` **properties**(): [`Properties`](Properties.md)

Get the media properties contained within the current instance.

#### Returns

[`Properties`](Properties.md)

## Methods

### addUniqueObject

▸ **addUniqueObject**(`obj`): `void`

Adds a unique child object to the current instance, replacing an existing child if present.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | [`AsfBaseObject`](AsfBaseObject.md) | Object to add to the current instance |

#### Returns

`void`

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

### removeContentDescriptor

▸ **removeContentDescriptor**(): `void`

Removes the content description objects from the current instance.

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

Child classes implementing [()](AsfHeaderObject.md#render) should render their contents and then
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

▸ `Static` **fromFile**(`file`, `position`): [`AsfHeaderObject`](AsfHeaderObject.md)

Constructs and initializes a new instance by reading the contents from a specified position
in the provided file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File containing contents that will be read into the new instance |
| `position` | `number` | Position in the file where the instance begins |

#### Returns

[`AsfHeaderObject`](AsfHeaderObject.md)
