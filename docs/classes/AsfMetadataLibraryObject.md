[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfMetadataLibraryObject

# Class: AsfMetadataLibraryObject

This class provides a representation of an ASF metadata library object which can be read from
and written to disk.

## Hierarchy

- [`AsfBaseObject`](AsfBaseObject.md)

  ↳ **`AsfMetadataLibraryObject`**

## Table of contents

### Accessors

- [guid](AsfMetadataLibraryObject.md#guid)
- [isEmpty](AsfMetadataLibraryObject.md#isempty)
- [objectType](AsfMetadataLibraryObject.md#objecttype)
- [originalSize](AsfMetadataLibraryObject.md#originalsize)
- [records](AsfMetadataLibraryObject.md#records)

### Methods

- [addRecord](AsfMetadataLibraryObject.md#addrecord)
- [getRecords](AsfMetadataLibraryObject.md#getrecords)
- [initializeFromFile](AsfMetadataLibraryObject.md#initializefromfile)
- [initializeFromGuid](AsfMetadataLibraryObject.md#initializefromguid)
- [removeRecords](AsfMetadataLibraryObject.md#removerecords)
- [render](AsfMetadataLibraryObject.md#render)
- [renderInternal](AsfMetadataLibraryObject.md#renderinternal)
- [setRecords](AsfMetadataLibraryObject.md#setrecords)
- [fromEmpty](AsfMetadataLibraryObject.md#fromempty)
- [fromFile](AsfMetadataLibraryObject.md#fromfile)

## Accessors

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

___

### records

• `get` **records**(): [`AsfMetadataDescriptor`](AsfMetadataDescriptor.md)[]

Gets all records stored in the current instance.

#### Returns

[`AsfMetadataDescriptor`](AsfMetadataDescriptor.md)[]

## Methods

### addRecord

▸ **addRecord**(`record`): `void`

Adds a record to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `record` | [`AsfMetadataDescriptor`](AsfMetadataDescriptor.md) | Record to add to the current instance |

#### Returns

`void`

___

### getRecords

▸ **getRecords**(`languageListIndex`, `streamNumber`, `...names`): [`AsfMetadataDescriptor`](AsfMetadataDescriptor.md)[]

Gets all records with a given language, stream, and any of a collection of names from the
current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageListIndex` | `number` | Index of the desired language in the language list |
| `streamNumber` | `number` | Index of the stream in the file the desired records applies to |
| `...names` | `string`[] | List of names of the records to return |

#### Returns

[`AsfMetadataDescriptor`](AsfMetadataDescriptor.md)[]

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

### removeRecords

▸ **removeRecords**(`languageListIndex`, `streamNumber`, `name`): `void`

Removes all records with a given language, stream, and name from the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageListIndex` | `number` | Language list index of the records to be removed |
| `streamNumber` | `number` | Index of the stream in the file the desired records to remove |
| `name` | `string` | Name of the records to remove |

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

Child classes implementing [()](AsfMetadataLibraryObject.md#render) should render their contents and then
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

### setRecords

▸ **setRecords**(`languageListIndex`, `streamNumber`, `name`, `...records`): `void`

Sets a collection of records for a given language, language, ane name, removing the existing
records that match.

**`Remarks`**

All added entries in `records` should match the provided `languageListIndex`,
    `streamNumber`, and `name`, but this will not be verified by the method. The records
    will be added with their own values and not those provided in the method arguments. The
    arguments are only used for removing existing values and determining where to position
    the new records.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageListIndex` | `number` | Index of the desired language in the language list |
| `streamNumber` | `number` | Index of the stream in the file the desired records applies to |
| `name` | `string` | Names of the records to remove |
| `...records` | [`AsfMetadataDescriptor`](AsfMetadataDescriptor.md)[] | Records to insert into the current instance |

#### Returns

`void`

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`AsfMetadataLibraryObject`](AsfMetadataLibraryObject.md)

Constructs and initializes a new instance that does not contain any records.

#### Returns

[`AsfMetadataLibraryObject`](AsfMetadataLibraryObject.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`AsfMetadataLibraryObject`](AsfMetadataLibraryObject.md)

Constructs and initializes a new instance by reading the object from a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File to read the instance from |
| `position` | `number` | Offset into the file where the object begins |

#### Returns

[`AsfMetadataLibraryObject`](AsfMetadataLibraryObject.md)
