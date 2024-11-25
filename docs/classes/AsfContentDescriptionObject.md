[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfContentDescriptionObject

# Class: AsfContentDescriptionObject

This class extends BaseObject to provide a representation of an ASF content description
object. The content description object is optional and provides standard bibliographic
information such as title, author, copyright, description, rating information.

## Hierarchy

- [`AsfBaseObject`](AsfBaseObject.md)

  ↳ **`AsfContentDescriptionObject`**

## Table of contents

### Accessors

- [author](AsfContentDescriptionObject.md#author)
- [copyright](AsfContentDescriptionObject.md#copyright)
- [description](AsfContentDescriptionObject.md#description)
- [guid](AsfContentDescriptionObject.md#guid)
- [isEmpty](AsfContentDescriptionObject.md#isempty)
- [objectType](AsfContentDescriptionObject.md#objecttype)
- [originalSize](AsfContentDescriptionObject.md#originalsize)
- [rating](AsfContentDescriptionObject.md#rating)
- [title](AsfContentDescriptionObject.md#title)

### Methods

- [initializeFromFile](AsfContentDescriptionObject.md#initializefromfile)
- [initializeFromGuid](AsfContentDescriptionObject.md#initializefromguid)
- [render](AsfContentDescriptionObject.md#render)
- [renderInternal](AsfContentDescriptionObject.md#renderinternal)
- [fromEmpty](AsfContentDescriptionObject.md#fromempty)
- [fromFile](AsfContentDescriptionObject.md#fromfile)

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

Gets whether the current instance is empty.

#### Returns

`boolean`

`true` if all the values are cleared. Otherwise, `false` is returned.

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

Child classes implementing [()](AsfContentDescriptionObject.md#render) should render their contents and then
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

### fromEmpty

▸ `Static` **fromEmpty**(): [`AsfContentDescriptionObject`](AsfContentDescriptionObject.md)

Constructs a blank content description object.

#### Returns

[`AsfContentDescriptionObject`](AsfContentDescriptionObject.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`AsfContentDescriptionObject`](AsfContentDescriptionObject.md)

Constructs a new instance by reading from a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File to read the content description object from |
| `position` | `number` | Offset into the file where the object begins |

#### Returns

[`AsfContentDescriptionObject`](AsfContentDescriptionObject.md)
