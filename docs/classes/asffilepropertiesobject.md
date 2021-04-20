[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfFilePropertiesObject

# Class: AsfFilePropertiesObject

Extends {@see BaseObject} to provide a representation of an ASF file properties object. The
file properties object defines the global characteristics of the combined digital media streams
found within the Data object.

## Hierarchy

* *BaseObject*

  ↳ **AsfFilePropertiesObject**

## Table of contents

### Accessors

- [creationDate](asffilepropertiesobject.md#creationdate)
- [dataPacketsCount](asffilepropertiesobject.md#datapacketscount)
- [fileId](asffilepropertiesobject.md#fileid)
- [fileSize](asffilepropertiesobject.md#filesize)
- [flags](asffilepropertiesobject.md#flags)
- [guid](asffilepropertiesobject.md#guid)
- [maximumBitrate](asffilepropertiesobject.md#maximumbitrate)
- [maximumDataPacketSize](asffilepropertiesobject.md#maximumdatapacketsize)
- [minimumDataPacketSize](asffilepropertiesobject.md#minimumdatapacketsize)
- [objectType](asffilepropertiesobject.md#objecttype)
- [originalSize](asffilepropertiesobject.md#originalsize)
- [playDurationMilliseconds](asffilepropertiesobject.md#playdurationmilliseconds)
- [prerollMilliseconds](asffilepropertiesobject.md#prerollmilliseconds)
- [sendDurationMilliseconds](asffilepropertiesobject.md#senddurationmilliseconds)

### Methods

- [initializeFromFile](asffilepropertiesobject.md#initializefromfile)
- [initializeFromGuid](asffilepropertiesobject.md#initializefromguid)
- [render](asffilepropertiesobject.md#render)
- [renderInternal](asffilepropertiesobject.md#renderinternal)
- [fromFile](asffilepropertiesobject.md#fromfile)

## Accessors

### creationDate

• **creationDate**(): Date

Gets the creation date of the file described by the current instance.

**Returns:** Date

___

### dataPacketsCount

• **dataPacketsCount**(): *bigint*

Gets the number of packets in the data section of the file represented by the current
instance.

**Returns:** *bigint*

___

### fileId

• **fileId**(): *default*

Gets the GUID for the file described by the current instance.

**Returns:** *default*

___

### fileSize

• **fileSize**(): *bigint*

Gets the total size of the file described by the current instance in bytes.

**Returns:** *bigint*

___

### flags

• **flags**(): *number*

Gets whether the file described by the current instance is broadcast or seekable.

**`remarks`** This attribute applies to presentation descriptors for ASF content. The value is a
    bitwise OR of the flags in {@link FilePropertiesFlags}.
    * If {@link FilePropertiesFlags.Broadcast} is set, the following properties are not
      valid
      * [fileId](asffilepropertiesobject.md#fileid)
      * [creationDate](asffilepropertiesobject.md#creationdate)
      * [dataPacketsCount](asffilepropertiesobject.md#datapacketscount)
      * [playDurationMilliseconds](asffilepropertiesobject.md#playdurationmilliseconds)
      * [sendDurationMilliseconds](asffilepropertiesobject.md#senddurationmilliseconds)
      * [maximumDataPacketSize](asffilepropertiesobject.md#maximumdatapacketsize) and [minimumDataPacketSize](asffilepropertiesobject.md#minimumdatapacketsize) are set to the
        actual packet size
    * If {@link FilePropertiesFlags.Seekable} is set, an audio stream is present and the
      [maximumDataPacketSize](asffilepropertiesobject.md#maximumdatapacketsize) and [minimumDataPacketSize](asffilepropertiesobject.md#minimumdatapacketsize) are set to the same
      size. It can also be seekable if the file has an audio stream and a video stream with
      a matching simple index object.

**Returns:** *number*

___

### guid

• **guid**(): *default*

Gets the GUID that identifies the current instance.

**Returns:** *default*

___

### maximumBitrate

• **maximumBitrate**(): *number*

Gets the maximum instantaneous bit rate, in bits per second, for the file described by the
current instance.

**Returns:** *number*

___

### maximumDataPacketSize

• **maximumDataPacketSize**(): *number*

Gets the maximum packet size, in bytes, for the file described by the current instance.

**Returns:** *number*

___

### minimumDataPacketSize

• **minimumDataPacketSize**(): *number*

Gets the minimum packet size, in bytes, for the file described by the current instance.

**Returns:** *number*

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

### playDurationMilliseconds

• **playDurationMilliseconds**(): *number*

Get the time needed to play the file described by the current instance in milliseconds.

**Returns:** *number*

___

### prerollMilliseconds

• **prerollMilliseconds**(): *number*

Gets the amount of time, in milliseconds, to buffer data before playing the file described
by the current instance.

**Returns:** *number*

___

### sendDurationMilliseconds

• **sendDurationMilliseconds**(): *number*

Get the time needed to send the file described by the current instance in milliseconds. A
packet's "send time" is the time when the packet should be delivered over the network, it is
not the presentation of the packet.

**Returns:** *number*

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

▸ `Static`**fromFile**(`file`: [*File*](file.md), `position`: *number*): [*AsfFilePropertiesObject*](asffilepropertiesobject.md)

#### Parameters:

Name | Type |
------ | ------ |
`file` | [*File*](file.md) |
`position` | *number* |

**Returns:** [*AsfFilePropertiesObject*](asffilepropertiesobject.md)
