[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfBaseObject

# Class: AsfBaseObject

Base object that provides a basic representation of an ASF object that can be written to and
read from the disk.

## Hierarchy

- **`AsfBaseObject`**

  ↳ [`AsfContentDescriptionObject`](AsfContentDescriptionObject.md)

  ↳ [`AsfExtendedContentDescriptionObject`](AsfExtendedContentDescriptionObject.md)

  ↳ [`AsfFilePropertiesObject`](AsfFilePropertiesObject.md)

  ↳ [`AsfHeaderExtensionObject`](AsfHeaderExtensionObject.md)

  ↳ [`AsfHeaderObject`](AsfHeaderObject.md)

  ↳ [`AsfMetadataLibraryObject`](AsfMetadataLibraryObject.md)

  ↳ [`AsfPaddingObject`](AsfPaddingObject.md)

  ↳ [`AsfStreamPropertiesObject`](AsfStreamPropertiesObject.md)

  ↳ [`AsfUnknownObject`](AsfUnknownObject.md)

## Table of contents

### Constructors

- [constructor](AsfBaseObject.md#constructor)

### Accessors

- [guid](AsfBaseObject.md#guid)
- [objectType](AsfBaseObject.md#objecttype)
- [originalSize](AsfBaseObject.md#originalsize)

### Methods

- [initializeFromFile](AsfBaseObject.md#initializefromfile)
- [initializeFromGuid](AsfBaseObject.md#initializefromguid)
- [render](AsfBaseObject.md#render)
- [renderInternal](AsfBaseObject.md#renderinternal)

## Constructors

### constructor

• `Protected` **new AsfBaseObject**()

## Accessors

### guid

• `get` **guid**(): [`UuidWrapper`](UuidWrapper.md)

Gets the GUID that identifies the current instance.

#### Returns

[`UuidWrapper`](UuidWrapper.md)

___

### objectType

• `Abstract` `get` **objectType**(): [`AsfObjectType`](../enums/AsfObjectType.md)

Gets the type of the object for easy comparison.

#### Returns

[`AsfObjectType`](../enums/AsfObjectType.md)

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
| `file` | [`File`](File.md) | File which contains the details of the new instance to create |
| `position` | `number` | Position in `file` where the object begins |

#### Returns

`void`

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

___

### render

▸ `Abstract` **render**(): [`ByteVector`](ByteVector.md)

Renders the current instance as a raw ASF object.

#### Returns

[`ByteVector`](ByteVector.md)

___

### renderInternal

▸ `Protected` **renderInternal**(`data`): [`ByteVector`](ByteVector.md)

Renders the current instance as a raw ASF object containing the specified data.

**`Remarks`**

Child classes implementing [()](AsfBaseObject.md#render) should render their contents and then
    send the data through this method to produce the final output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Data to store in the rendered version of the current instance. |

#### Returns

[`ByteVector`](ByteVector.md)
