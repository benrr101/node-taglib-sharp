[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfPaddingObject

# Class: AsfPaddingObject

This class provides a representation of an ASF padding object which can be read from and
written to disk.

## Hierarchy

* *BaseObject*

  ↳ **AsfPaddingObject**

## Table of contents

### Properties

- [HEADER\_LENGTH](asfpaddingobject.md#header_length)

### Accessors

- [guid](asfpaddingobject.md#guid)
- [objectType](asfpaddingobject.md#objecttype)
- [originalSize](asfpaddingobject.md#originalsize)
- [size](asfpaddingobject.md#size)

### Methods

- [initializeFromFile](asfpaddingobject.md#initializefromfile)
- [initializeFromGuid](asfpaddingobject.md#initializefromguid)
- [render](asfpaddingobject.md#render)
- [renderInternal](asfpaddingobject.md#renderinternal)
- [fromFile](asfpaddingobject.md#fromfile)
- [fromSize](asfpaddingobject.md#fromsize)

## Properties

### HEADER\_LENGTH

▪ `Readonly` `Static` **HEADER\_LENGTH**: *24*= 24

## Accessors

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

___

### size

• **size**(): *number*

Gets the number of bytes the current instance will take up on disk. Note: this does *not*
include the header for the object.

**Returns:** *number*

• **size**(`value`: *number*): *void*

Sets the number of padding bytes the current instance will contain. Note: this does *not*
include the header for the object.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *number* | Size of the current instance in bytes, must be a safe, positive integer.    |

**Returns:** *void*

## Methods

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

▸ `Static`**fromFile**(`file`: [*File*](file.md), `position`: *number*): [*AsfPaddingObject*](asfpaddingobject.md)

Constructs and initializes a new instance by reading it from a file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [*File*](file.md) | File to read the padding object from   |
`position` | *number* | Index into the file where the padding object starts from    |

**Returns:** [*AsfPaddingObject*](asfpaddingobject.md)

___

### fromSize

▸ `Static`**fromSize**(`size`: *number*): [*AsfPaddingObject*](asfpaddingobject.md)

Constructs and initializes a new instance with a fixed size.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`size` | *number* | Number of padding bytes to store in the object not including the size of the     header    |

**Returns:** [*AsfPaddingObject*](asfpaddingobject.md)
