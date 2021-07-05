[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfContentDescriptionObject

# Class: AsfContentDescriptionObject

This class extends {@see BaseObject} to provide a representation of an ASF content description
object. The content description object is optional and provides standard bibliographic
information such as title, author, copyright, description, rating information.

## Hierarchy

- `BaseObject`

  ↳ **`AsfContentDescriptionObject`**

## Table of contents

### Accessors

- [author](asfcontentdescriptionobject.md#author)
- [copyright](asfcontentdescriptionobject.md#copyright)
- [description](asfcontentdescriptionobject.md#description)
- [guid](asfcontentdescriptionobject.md#guid)
- [isEmpty](asfcontentdescriptionobject.md#isempty)
- [objectType](asfcontentdescriptionobject.md#objecttype)
- [originalSize](asfcontentdescriptionobject.md#originalsize)
- [rating](asfcontentdescriptionobject.md#rating)
- [title](asfcontentdescriptionobject.md#title)

### Methods

- [initializeFromFile](asfcontentdescriptionobject.md#initializefromfile)
- [initializeFromGuid](asfcontentdescriptionobject.md#initializefromguid)
- [render](asfcontentdescriptionobject.md#render)
- [renderInternal](asfcontentdescriptionobject.md#renderinternal)
- [fromEmpty](asfcontentdescriptionobject.md#fromempty)
- [fromFile](asfcontentdescriptionobject.md#fromfile)

## Accessors

### author

• `get` **author**(): `string`

Gets the author of the media described by the current instance.

#### Returns

`string`

Author of the media or `undefined` if it is not set.

• `set` **author**(`value`): `void`

Sets the author of the media described by the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Author of the media or `undefined` if it is not set.

___

### copyright

• `get` **copyright**(): `string`

Gets the copyright information of the media described by the current instance.

#### Returns

`string`

Copyright information of the media or `undefined` if it is not set.

• `set` **copyright**(`value`): `void`

Sets the copyright information of the media described by the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Copyright information of the media or `undefined` if it is not set.

___

### description

• `get` **description**(): `string`

Gets the description of the media described by the current instance.

#### Returns

`string`

Description of the media or `undefined` if it is not set.

• `set` **description**(`value`): `void`

Sets the description of the media described by the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Description of the media or `undefined` if it is not set.

___

### guid

• `get` **guid**(): `default`

Gets the GUID that identifies the current instance.

#### Returns

`default`

___

### isEmpty

• `get` **isEmpty**(): `boolean`

Gets whether or not the current instance is empty.

#### Returns

`boolean`

`true` if all the values are cleared. Otherwise `false` is returned.

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

### rating

• `get` **rating**(): `string`

Gets the rating of the media described by the current instance.

#### Returns

`string`

Rating of the media or `undefined` if it is not set.

• `set` **rating**(`value`): `void`

Sets the rating of the media described by the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Rating of the media or `undefined` if it is not set.

___

### title

• `get` **title**(): `string`

Gets the title of the media described by the current instance.

#### Returns

`string`

Title of the media or `undefined` if it is not set.

• `set` **title**(`value`): `void`

Sets the title of the media described by the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Title of the media or `undefined` if it is not set.

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

Renders the current instance as a raw ASF object.

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

### fromEmpty

▸ `Static` **fromEmpty**(): [`AsfContentDescriptionObject`](asfcontentdescriptionobject.md)

#### Returns

[`AsfContentDescriptionObject`](asfcontentdescriptionobject.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`AsfContentDescriptionObject`](asfcontentdescriptionobject.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`File`](file.md) |
| `position` | `number` |

#### Returns

[`AsfContentDescriptionObject`](asfcontentdescriptionobject.md)
