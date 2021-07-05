[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfHeaderObject

# Class: AsfHeaderObject

This class provides a representation of an ASF header object which can be read from and written
to disk.

## Hierarchy

- `BaseObject`

  ↳ **`AsfHeaderObject`**

## Table of contents

### Accessors

- [children](asfheaderobject.md#children)
- [extension](asfheaderobject.md#extension)
- [guid](asfheaderobject.md#guid)
- [hasContentDescriptors](asfheaderobject.md#hascontentdescriptors)
- [objectType](asfheaderobject.md#objecttype)
- [originalSize](asfheaderobject.md#originalsize)
- [properties](asfheaderobject.md#properties)

### Methods

- [addUniqueObject](asfheaderobject.md#adduniqueobject)
- [initializeFromFile](asfheaderobject.md#initializefromfile)
- [initializeFromGuid](asfheaderobject.md#initializefromguid)
- [removeContentDescriptor](asfheaderobject.md#removecontentdescriptor)
- [render](asfheaderobject.md#render)
- [renderInternal](asfheaderobject.md#renderinternal)
- [fromFile](asfheaderobject.md#fromfile)

## Accessors

### children

• `get` **children**(): `default`[]

Gets that child objects of this instance.

**`remarks`** The returned array is a copy of the array of children inside this object. Any
    changes to this array will not be reflected in the object.

    Only certain objects are valid inside a header object. Any objects that are not valid or
    not supported are read as {@link UnknownObject}.

#### Returns

`default`[]

___

### extension

• `get` **extension**(): [`AsfHeaderExtensionObject`](asfheaderextensionobject.md)

Gets the header extension object contained in the current instance.

#### Returns

[`AsfHeaderExtensionObject`](asfheaderextensionobject.md)

HeaderExtensionObject Header extension contained in this instance, if it exists.
    `undefined` is returned if it doesn't exist

___

### guid

• `get` **guid**(): `default`

Gets the GUID that identifies the current instance.

#### Returns

`default`

___

### hasContentDescriptors

• `get` **hasContentDescriptors**(): `boolean`

Gets whether or not the current instance contains either type of content descriptors.

#### Returns

`boolean`

boolean `true` if a content description object or extended content description
    object exists in this instance. `false` otherwise

___

### objectType

• `get` **objectType**(): `ObjectType`

**`inheritdoc`**

#### Returns

`ObjectType`

___

### originalSize

• `get` **originalSize**(): `number`

Gets the original size of the current instance.

#### Returns

`number`

___

### properties

• `get` **properties**(): [`Properties`](properties.md)

Get the media properties contained within the current instance.

#### Returns

[`Properties`](properties.md)

## Methods

### addUniqueObject

▸ **addUniqueObject**(`obj`): `void`

Adds a unique child object to the current instance, replacing an existing child if present.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `default` | Object to add to the current instance |

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

### removeContentDescriptor

▸ **removeContentDescriptor**(): `void`

Removes the content description objects from the current instance.

#### Returns

`void`

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

▸ `Static` **fromFile**(`file`, `position`): [`AsfHeaderObject`](asfheaderobject.md)

Constructs and initializes a new instance by reading the contents from a specified position
in the provided file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](file.md) | File containing contents that will be read into the new instance |
| `position` | `number` | Position in the file where the instance begins |

#### Returns

[`AsfHeaderObject`](asfheaderobject.md)
