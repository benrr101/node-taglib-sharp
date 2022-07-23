[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfFilePropertiesObject

# Class: AsfFilePropertiesObject

Extends {@see BaseObject} to provide a representation of an ASF file properties object. The
file properties object defines the global characteristics of the combined digital media streams
found within the Data object.

## Hierarchy

- `default`

  ↳ **`AsfFilePropertiesObject`**

## Table of contents

### Accessors

- [creationDate](AsfFilePropertiesObject.md#creationdate)
- [dataPacketsCount](AsfFilePropertiesObject.md#datapacketscount)
- [fileId](AsfFilePropertiesObject.md#fileid)
- [fileSize](AsfFilePropertiesObject.md#filesize)
- [flags](AsfFilePropertiesObject.md#flags)
- [guid](AsfFilePropertiesObject.md#guid)
- [maximumBitrate](AsfFilePropertiesObject.md#maximumbitrate)
- [maximumDataPacketSize](AsfFilePropertiesObject.md#maximumdatapacketsize)
- [minimumDataPacketSize](AsfFilePropertiesObject.md#minimumdatapacketsize)
- [objectType](AsfFilePropertiesObject.md#objecttype)
- [originalSize](AsfFilePropertiesObject.md#originalsize)
- [playDurationMilliseconds](AsfFilePropertiesObject.md#playdurationmilliseconds)
- [prerollMilliseconds](AsfFilePropertiesObject.md#prerollmilliseconds)
- [sendDurationMilliseconds](AsfFilePropertiesObject.md#senddurationmilliseconds)

### Methods

- [initializeFromFile](AsfFilePropertiesObject.md#initializefromfile)
- [initializeFromGuid](AsfFilePropertiesObject.md#initializefromguid)
- [render](AsfFilePropertiesObject.md#render)
- [renderInternal](AsfFilePropertiesObject.md#renderinternal)
- [fromFile](AsfFilePropertiesObject.md#fromfile)

## Accessors

### creationDate

• `get` **creationDate**(): `Date`

Gets the creation date of the file described by the current instance.

#### Returns

`Date`

___

### dataPacketsCount

• `get` **dataPacketsCount**(): `bigint`

Gets the number of packets in the data section of the file represented by the current
instance.

#### Returns

`bigint`

___

### fileId

• `get` **fileId**(): `default`

Gets the GUID for the file described by the current instance.

#### Returns

`default`

___

### fileSize

• `get` **fileSize**(): `bigint`

Gets the total size of the file described by the current instance in bytes.

#### Returns

`bigint`

___

### flags

• `get` **flags**(): `number`

Gets whether the file described by the current instance is broadcast or seekable.

**`remarks`** This attribute applies to presentation descriptors for ASF content. The value is a
    bitwise OR of the flags in {@link FilePropertiesFlags}.
    * If {@link FilePropertiesFlags.Broadcast} is set, the following properties are not
      valid
      * [fileId](AsfFilePropertiesObject.md#fileid)
      * [creationDate](AsfFilePropertiesObject.md#creationdate)
      * [dataPacketsCount](AsfFilePropertiesObject.md#datapacketscount)
      * [playDurationMilliseconds](AsfFilePropertiesObject.md#playdurationmilliseconds)
      * [sendDurationMilliseconds](AsfFilePropertiesObject.md#senddurationmilliseconds)
      * [maximumDataPacketSize](AsfFilePropertiesObject.md#maximumdatapacketsize) and [minimumDataPacketSize](AsfFilePropertiesObject.md#minimumdatapacketsize) are set to the
        actual packet size
    * If {@link FilePropertiesFlags.Seekable} is set, an audio stream is present and the
      [maximumDataPacketSize](AsfFilePropertiesObject.md#maximumdatapacketsize) and [minimumDataPacketSize](AsfFilePropertiesObject.md#minimumdatapacketsize) are set to the same
      size. It can also be seekable if the file has an audio stream and a video stream with
      a matching simple index object.

#### Returns

`number`

___

### guid

• `get` **guid**(): `default`

Gets the GUID that identifies the current instance.

#### Returns

`default`

#### Inherited from

BaseObject.guid

___

### maximumBitrate

• `get` **maximumBitrate**(): `number`

Gets the maximum instantaneous bit rate, in bits per second, for the file described by the
current instance.

#### Returns

`number`

___

### maximumDataPacketSize

• `get` **maximumDataPacketSize**(): `number`

Gets the maximum packet size, in bytes, for the file described by the current instance.

#### Returns

`number`

___

### minimumDataPacketSize

• `get` **minimumDataPacketSize**(): `number`

Gets the minimum packet size, in bytes, for the file described by the current instance.

#### Returns

`number`

___

### objectType

• `get` **objectType**(): `ObjectType`

**`inheritdoc`**

#### Returns

`ObjectType`

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

### playDurationMilliseconds

• `get` **playDurationMilliseconds**(): `number`

Get the time needed to play the file described by the current instance in milliseconds.

#### Returns

`number`

___

### prerollMilliseconds

• `get` **prerollMilliseconds**(): `number`

Gets the amount of time, in milliseconds, to buffer data before playing the file described
by the current instance.

#### Returns

`number`

___

### sendDurationMilliseconds

• `get` **sendDurationMilliseconds**(): `number`

Get the time needed to send the file described by the current instance in milliseconds. A
packet's "send time" is the time when the packet should be delivered over the network, it is
not the presentation of the packet.

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

▸ **render**(): [`ByteVector`](ByteVector.md)

**`inheritdoc`**

#### Returns

[`ByteVector`](ByteVector.md)

#### Overrides

BaseObject.render

___

### renderInternal

▸ `Protected` **renderInternal**(`data`): [`ByteVector`](ByteVector.md)

Renders the current instance as a raw ASF object containing the specified data.

**`remarks`** Child classes implementing {@see render()} should render their contents and then
    send the data through this method to produce the final output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Data to store in the rendered version of the current instance. |

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

BaseObject.renderInternal

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`AsfFilePropertiesObject`](AsfFilePropertiesObject.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`File`](File.md) |
| `position` | `number` |

#### Returns

[`AsfFilePropertiesObject`](AsfFilePropertiesObject.md)
