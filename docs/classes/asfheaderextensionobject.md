[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfHeaderExtensionObject

# Class: AsfHeaderExtensionObject

This class extends {@link BaseObject} to provide a representation of an ASF header extension
object which can be read from and written to disk.

## Hierarchy

* *BaseObject*

  ↳ **AsfHeaderExtensionObject**

## Table of contents

### Accessors

- [children](asfheaderextensionobject.md#children)
- [guid](asfheaderextensionobject.md#guid)
- [objectType](asfheaderextensionobject.md#objecttype)
- [originalSize](asfheaderextensionobject.md#originalsize)

### Methods

- [addUniqueObject](asfheaderextensionobject.md#adduniqueobject)
- [initializeFromFile](asfheaderextensionobject.md#initializefromfile)
- [initializeFromGuid](asfheaderextensionobject.md#initializefromguid)
- [render](asfheaderextensionobject.md#render)
- [renderInternal](asfheaderextensionobject.md#renderinternal)
- [fromFile](asfheaderextensionobject.md#fromfile)

## Accessors

### children

• **children**(): *default*[]

Gets the child ASF objects contained in the current instance.

**`remarks`** The returned array is a copy of the array of children inside this object. Any
    changes to this array will not be reflected in the object.

    Only certain objects are valid inside a header extension object. Any objects that are
    not valid or not supported are read as {@link UnknownObject}.

**Returns:** *default*[]

___

### guid

• **guid**(): *default*

Gets the GUID that identifies the current instance.

**Returns:** *default*

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

### addUniqueObject

▸ **addUniqueObject**(`obj`: *default*): *void*

Adds a unique child object to the current instance, replacing an existing child if present.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`obj` | *default* | Object to add to the current instance    |

**Returns:** *void*

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

### fromFile

▸ `Static`**fromFile**(`file`: [*File*](file.md), `position`: *number*): [*AsfHeaderExtensionObject*](asfheaderextensionobject.md)

Constructs and initialized a new instance by reading the contents from a specified position
in the provided file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [*File*](file.md) | File containing contents that will be read into the new instance   |
`position` | *number* | Position in the file where the instance begins    |

**Returns:** [*AsfHeaderExtensionObject*](asfheaderextensionobject.md)
