[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfMetadataLibraryObject

# Class: AsfMetadataLibraryObject

This class provides a representation of an ASF metadata library object which can be read from
and written to disk.

## Hierarchy

- `BaseObject`

  ↳ **`AsfMetadataLibraryObject`**

## Table of contents

### Accessors

- [guid](asfmetadatalibraryobject.md#guid)
- [isEmpty](asfmetadatalibraryobject.md#isempty)
- [objectType](asfmetadatalibraryobject.md#objecttype)
- [originalSize](asfmetadatalibraryobject.md#originalsize)
- [records](asfmetadatalibraryobject.md#records)

### Methods

- [addRecord](asfmetadatalibraryobject.md#addrecord)
- [getRecords](asfmetadatalibraryobject.md#getrecords)
- [initializeFromFile](asfmetadatalibraryobject.md#initializefromfile)
- [initializeFromGuid](asfmetadatalibraryobject.md#initializefromguid)
- [removeRecords](asfmetadatalibraryobject.md#removerecords)
- [render](asfmetadatalibraryobject.md#render)
- [renderInternal](asfmetadatalibraryobject.md#renderinternal)
- [setRecords](asfmetadatalibraryobject.md#setrecords)
- [fromEmpty](asfmetadatalibraryobject.md#fromempty)
- [fromFile](asfmetadatalibraryobject.md#fromfile)

## Accessors

### guid

• `get` **guid**(): `default`

Gets the GUID that identifies the current instance.

#### Returns

`default`

___

### isEmpty

• `get` **isEmpty**(): `boolean`

Gets whether or not the current instance contains any records.

#### Returns

`boolean`

boolean `true` if the current instance does not contain any records, `false`
    otherwise.

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

### records

• `get` **records**(): [`AsfMetadataDescriptor`](asfmetadatadescriptor.md)[]

Gets all records stored in the current instance.

#### Returns

[`AsfMetadataDescriptor`](asfmetadatadescriptor.md)[]

## Methods

### addRecord

▸ **addRecord**(`record`): `void`

Adds a record to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `record` | [`AsfMetadataDescriptor`](asfmetadatadescriptor.md) | Record to add to the current instance |

#### Returns

`void`

___

### getRecords

▸ **getRecords**(`languageListIndex`, `streamNumber`, ...`names`): [`AsfMetadataDescriptor`](asfmetadatadescriptor.md)[]

Gets all records with a given language, stream, and any of a collection of names from the
current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageListIndex` | `number` | Index of the desired language in the language list |
| `streamNumber` | `number` | Index of the stream in the file the desired records applies to |
| `...names` | `string`[] | List of names of the records to return |

#### Returns

[`AsfMetadataDescriptor`](asfmetadatadescriptor.md)[]

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

### setRecords

▸ **setRecords**(`languageListIndex`, `streamNumber`, `name`, ...`records`): `void`

Sets a collection of records for a given language, language, ane name, removing the existing
records that match.

**`remarks`** All added entries in `records` should match the provided `languageListIndex`,
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
| `...records` | [`AsfMetadataDescriptor`](asfmetadatadescriptor.md)[] | Records to insert into the current instance |

#### Returns

`void`

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`AsfMetadataLibraryObject`](asfmetadatalibraryobject.md)

Constructs and initializes a new instance that does not contain any records.

#### Returns

[`AsfMetadataLibraryObject`](asfmetadatalibraryobject.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`AsfMetadataLibraryObject`](asfmetadatalibraryobject.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`File`](file.md) |
| `position` | `number` |

#### Returns

[`AsfMetadataLibraryObject`](asfmetadatalibraryobject.md)
