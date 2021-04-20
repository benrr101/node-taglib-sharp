[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfStreamPropertiesObject

# Class: AsfStreamPropertiesObject

This class provides a representation of an ASF properties object which can be read from and
written to disk.

## Hierarchy

* *BaseObject*

  ↳ **AsfStreamPropertiesObject**

## Table of contents

### Accessors

- [codec](asfstreampropertiesobject.md#codec)
- [errorCorrectionData](asfstreampropertiesobject.md#errorcorrectiondata)
- [errorCorrectionType](asfstreampropertiesobject.md#errorcorrectiontype)
- [flags](asfstreampropertiesobject.md#flags)
- [guid](asfstreampropertiesobject.md#guid)
- [objectType](asfstreampropertiesobject.md#objecttype)
- [originalSize](asfstreampropertiesobject.md#originalsize)
- [streamNumber](asfstreampropertiesobject.md#streamnumber)
- [streamType](asfstreampropertiesobject.md#streamtype)
- [timeOffsetMilliseconds](asfstreampropertiesobject.md#timeoffsetmilliseconds)
- [typeSpecificData](asfstreampropertiesobject.md#typespecificdata)

### Methods

- [initializeFromFile](asfstreampropertiesobject.md#initializefromfile)
- [initializeFromGuid](asfstreampropertiesobject.md#initializefromguid)
- [render](asfstreampropertiesobject.md#render)
- [renderInternal](asfstreampropertiesobject.md#renderinternal)
- [fromFile](asfstreampropertiesobject.md#fromfile)

## Accessors

### codec

• **codec**(): [*ICodec*](../interfaces/icodec.md)

Gets the codec information contained in the current instance.

**Returns:** [*ICodec*](../interfaces/icodec.md)

___

### errorCorrectionData

• **errorCorrectionData**(): [*ByteVector*](bytevector.md)

Gets the error correction data contained in the current instance.

**Returns:** [*ByteVector*](bytevector.md)

___

### errorCorrectionType

• **errorCorrectionType**(): *default*

Gets the error correction type GUID of the current instance.

**Returns:** *default*

___

### flags

• **flags**(): *number*

Gets the flags that apply to the current instance.

**`remarks`** The `flags` field a 16-bit, double word, defined as follows:
    -- LSB
    * Stream number - 7 bits
    * Reserved - 8 bits
    * Encrypted content flag - 1 bit

**Returns:** *number*

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

___

### streamNumber

• **streamNumber**(): *number*

Gets the stream number for the current instance. Zero is invalid.

**Returns:** *number*

___

### streamType

• **streamType**(): *default*

Gets the stream type GUID of the current instance.

**Returns:** *default*

___

### timeOffsetMilliseconds

• **timeOffsetMilliseconds**(): *number*

Gets the time offset at which the stream described by the current instance begins.

**Returns:** *number*

___

### typeSpecificData

• **typeSpecificData**(): [*ByteVector*](bytevector.md)

Gets the type specific data contained in the current instance.

**`remarks`** The parsed version of this data is available in [codec](asfstreampropertiesobject.md#codec).

**Returns:** [*ByteVector*](bytevector.md)

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

▸ `Static`**fromFile**(`file`: [*File*](file.md), `position`: *number*): [*AsfStreamPropertiesObject*](asfstreampropertiesobject.md)

Constructs and initializes a new instance by reading contents from a specified position in
the provided file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [*File*](file.md) | File from which the contents of the new instance will be read   |
`position` | *number* | Index into the file where the stream properties object begins    |

**Returns:** [*AsfStreamPropertiesObject*](asfstreampropertiesobject.md)
