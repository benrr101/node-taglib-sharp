[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfExtendedContentDescriptionObject

# Class: AsfExtendedContentDescriptionObject

This class provides a representation of an ASF extended contend description object which can be
read from and written to disk.

## Hierarchy

* *BaseObject*

  ↳ **AsfExtendedContentDescriptionObject**

## Table of contents

### Accessors

- [descriptors](asfextendedcontentdescriptionobject.md#descriptors)
- [guid](asfextendedcontentdescriptionobject.md#guid)
- [isEmpty](asfextendedcontentdescriptionobject.md#isempty)
- [objectType](asfextendedcontentdescriptionobject.md#objecttype)
- [originalSize](asfextendedcontentdescriptionobject.md#originalsize)

### Methods

- [addDescriptor](asfextendedcontentdescriptionobject.md#adddescriptor)
- [getDescriptors](asfextendedcontentdescriptionobject.md#getdescriptors)
- [initializeFromFile](asfextendedcontentdescriptionobject.md#initializefromfile)
- [initializeFromGuid](asfextendedcontentdescriptionobject.md#initializefromguid)
- [removeDescriptors](asfextendedcontentdescriptionobject.md#removedescriptors)
- [render](asfextendedcontentdescriptionobject.md#render)
- [renderInternal](asfextendedcontentdescriptionobject.md#renderinternal)
- [setDescriptors](asfextendedcontentdescriptionobject.md#setdescriptors)
- [fromEmpty](asfextendedcontentdescriptionobject.md#fromempty)
- [fromFile](asfextendedcontentdescriptionobject.md#fromfile)

## Accessors

### descriptors

• **descriptors**(): [*AsfContentDescriptor*](asfcontentdescriptor.md)[]

Gets all descriptors stored in the current instance.

**Returns:** [*AsfContentDescriptor*](asfcontentdescriptor.md)[]

___

### guid

• **guid**(): *default*

Gets the GUID that identifies the current instance.

**Returns:** *default*

___

### isEmpty

• **isEmpty**(): *boolean*

Gets whether or not the current instance contains any records.

**Returns:** *boolean*

boolean `true` if the current instance does not contain any records, `false`
    otherwise.

___

### objectType

• **objectType**(): ObjectType

**`inheritdoc`** 

**Returns:** ObjectType

___

### originalSize

• **originalSize**(): *number*

Gets the original size of the current instance.

**Returns:** *number*

## Methods

### addDescriptor

▸ **addDescriptor**(`descriptor`: [*AsfContentDescriptor*](asfcontentdescriptor.md)): *void*

Adds a descriptor to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`descriptor` | [*AsfContentDescriptor*](asfcontentdescriptor.md) | Record to add to the current instance    |

**Returns:** *void*

___

### getDescriptors

▸ **getDescriptors**(...`names`: *string*[]): [*AsfContentDescriptor*](asfcontentdescriptor.md)[]

Gets all descriptors with a name matching one of the provided collection of names the
current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`...names` | *string*[] | List of names of the records to return    |

**Returns:** [*AsfContentDescriptor*](asfcontentdescriptor.md)[]

___

### initializeFromFile

▸ `Protected`**initializeFromFile**(`file`: [*File*](file.md), `position`: *number*): *void*

Initializes a new instance by reading the contents from a specified position in a specified
file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [*File*](file.md) | File which contains the details of the new instance to create   |
`position` | *number* | Position in `file` where the object begins   |

**Returns:** *void*

___

### initializeFromGuid

▸ `Protected`**initializeFromGuid**(`guid`: *default*): *void*

Initializes a new instance with a specified GUID.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`guid` | *default* | GUID to use for the new instance.   |

**Returns:** *void*

___

### removeDescriptors

▸ **removeDescriptors**(`name`: *string*): *void*

Removes all descriptors with a given name from the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | *string* | Name of the descriptor to be removed    |

**Returns:** *void*

___

### render

▸ **render**(): [*ByteVector*](bytevector.md)

**`inheritdoc`** 

**Returns:** [*ByteVector*](bytevector.md)

___

### renderInternal

▸ `Protected`**renderInternal**(`data`: [*ByteVector*](bytevector.md)): [*ByteVector*](bytevector.md)

Renders the current instance as a raw ASF object containing the specified data.

**`remarks`** Child classes implementing {@see render()} should render their contents and then
    send the data through this method to produce the final output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Data to store in the rendered version of the current instance.   |

**Returns:** [*ByteVector*](bytevector.md)

___

### setDescriptors

▸ **setDescriptors**(`name`: *string*, ...`descriptors`: [*AsfContentDescriptor*](asfcontentdescriptor.md)[]): *void*

Sets a collection of descriptors for a given name, removing the existing matching records.

**`remarks`** All added descriptors should have their name set to `name` but this is not
    verified by the method. The descriptors will be added with their own names and not the
    one provided as an argument, which is only used for removing existing values and
    determining where to position the new descriptors.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | *string* | Name of the descriptors to be added/removed   |
`...descriptors` | [*AsfContentDescriptor*](asfcontentdescriptor.md)[] | Descriptors to add to the new instance   |

**Returns:** *void*

___

### fromEmpty

▸ `Static`**fromEmpty**(): [*AsfExtendedContentDescriptionObject*](asfextendedcontentdescriptionobject.md)

Constructs and initializes a new, empty extended content description object.

**Returns:** [*AsfExtendedContentDescriptionObject*](asfextendedcontentdescriptionobject.md)

___

### fromFile

▸ `Static`**fromFile**(`file`: [*File*](file.md), `position`: *number*): [*AsfExtendedContentDescriptionObject*](asfextendedcontentdescriptionobject.md)

Constructs and initializes a new instance that is read in from the provided file at the
provided position.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [*File*](file.md) | File to read the instance from. Must not be falsey   |
`position` | *number* | Position in the file where the instance begins. Must be a positive, safe     integer.    |

**Returns:** [*AsfExtendedContentDescriptionObject*](asfextendedcontentdescriptionobject.md)
