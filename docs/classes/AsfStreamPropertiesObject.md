[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfStreamPropertiesObject

# Class: AsfStreamPropertiesObject

This class provides a representation of an ASF properties object which can be read from and
written to disk.

## Hierarchy

- `default`

  ↳ **`AsfStreamPropertiesObject`**

## Table of contents

### Accessors

- [codec](AsfStreamPropertiesObject.md#codec)
- [errorCorrectionData](AsfStreamPropertiesObject.md#errorcorrectiondata)
- [errorCorrectionType](AsfStreamPropertiesObject.md#errorcorrectiontype)
- [flags](AsfStreamPropertiesObject.md#flags)
- [guid](AsfStreamPropertiesObject.md#guid)
- [objectType](AsfStreamPropertiesObject.md#objecttype)
- [originalSize](AsfStreamPropertiesObject.md#originalsize)
- [streamNumber](AsfStreamPropertiesObject.md#streamnumber)
- [streamType](AsfStreamPropertiesObject.md#streamtype)
- [timeOffsetMilliseconds](AsfStreamPropertiesObject.md#timeoffsetmilliseconds)
- [typeSpecificData](AsfStreamPropertiesObject.md#typespecificdata)

### Methods

- [initializeFromFile](AsfStreamPropertiesObject.md#initializefromfile)
- [initializeFromGuid](AsfStreamPropertiesObject.md#initializefromguid)
- [render](AsfStreamPropertiesObject.md#render)
- [renderInternal](AsfStreamPropertiesObject.md#renderinternal)
- [fromFile](AsfStreamPropertiesObject.md#fromfile)

## Accessors

### codec

• `get` **codec**(): [`ICodec`](../interfaces/ICodec.md)

Gets the codec information contained in the current instance.

#### Returns

[`ICodec`](../interfaces/ICodec.md)

___

### errorCorrectionData

• `get` **errorCorrectionData**(): [`ByteVector`](ByteVector.md)

Gets the error correction data contained in the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

___

### errorCorrectionType

• `get` **errorCorrectionType**(): `default`

Gets the error correction type GUID of the current instance.

#### Returns

`default`

___

### flags

• `get` **flags**(): `number`

Gets the flags that apply to the current instance.

**`remarks`** The `flags` field a 16-bit, double word, defined as follows:
    -- LSB
    * Stream number - 7 bits
    * Reserved - 8 bits
    * Encrypted content flag - 1 bit

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

### streamNumber

• `get` **streamNumber**(): `number`

Gets the stream number for the current instance. Zero is invalid.

#### Returns

`number`

___

### streamType

• `get` **streamType**(): `default`

Gets the stream type GUID of the current instance.

#### Returns

`default`

___

### timeOffsetMilliseconds

• `get` **timeOffsetMilliseconds**(): `number`

Gets the time offset at which the stream described by the current instance begins.

#### Returns

`number`

___

### typeSpecificData

• `get` **typeSpecificData**(): [`ByteVector`](ByteVector.md)

Gets the type specific data contained in the current instance.

**`remarks`** The parsed version of this data is available in [codec](AsfStreamPropertiesObject.md#codec).

#### Returns

[`ByteVector`](ByteVector.md)

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

▸ `Static` **fromFile**(`file`, `position`): [`AsfStreamPropertiesObject`](AsfStreamPropertiesObject.md)

Constructs and initializes a new instance by reading contents from a specified position in
the provided file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File from which the contents of the new instance will be read |
| `position` | `number` | Index into the file where the stream properties object begins |

#### Returns

[`AsfStreamPropertiesObject`](AsfStreamPropertiesObject.md)
