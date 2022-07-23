[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfMetadataDescriptor

# Class: AsfMetadataDescriptor

This class provides a representation of an ASF description record to be used inside a
MetadataLibraryObject.

**`remarks`** This class can store various types of information. Although [toString](AsfMetadataDescriptor.md#tostring) provides
    a representation of all types of values, it is recommended to determine which of the `get*`
    methods to use by accessing [type](AsfMetadataDescriptor.md#type)

## Hierarchy

- `DescriptorBase`

  ↳ **`AsfMetadataDescriptor`**

## Table of contents

### Constructors

- [constructor](AsfMetadataDescriptor.md#constructor)

### Accessors

- [boolValue](AsfMetadataDescriptor.md#boolvalue)
- [byteValue](AsfMetadataDescriptor.md#bytevalue)
- [guidValue](AsfMetadataDescriptor.md#guidvalue)
- [languageListIndex](AsfMetadataDescriptor.md#languagelistindex)
- [name](AsfMetadataDescriptor.md#name)
- [streamNumber](AsfMetadataDescriptor.md#streamnumber)
- [stringValue](AsfMetadataDescriptor.md#stringvalue)
- [type](AsfMetadataDescriptor.md#type)
- [uintValue](AsfMetadataDescriptor.md#uintvalue)
- [ulongValue](AsfMetadataDescriptor.md#ulongvalue)
- [ushortValue](AsfMetadataDescriptor.md#ushortvalue)

### Methods

- [render](AsfMetadataDescriptor.md#render)
- [toString](AsfMetadataDescriptor.md#tostring)
- [fromFile](AsfMetadataDescriptor.md#fromfile)

## Constructors

### constructor

• **new AsfMetadataDescriptor**(`languageListIndex`, `streamNumber`, `name`, `type`, `value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `languageListIndex` | `number` |
| `streamNumber` | `number` |
| `name` | `string` |
| `type` | [`AsfObjectDataType`](../enums/AsfObjectDataType.md) |
| `value` | `DescriptorValue` |

#### Overrides

DescriptorBase.constructor

## Accessors

### boolValue

• `get` **boolValue**(): `boolean`

Gets the boolean value of the current instance.

#### Returns

`boolean`

boolean Boolean value of the current instance is returned if [type](AsfMetadataDescriptor.md#type) is
    {@link DataType.Bool}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.boolValue

___

### byteValue

• `get` **byteValue**(): [`ByteVector`](ByteVector.md)

Gets the binary contents of the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

ByteVector Byte contents of the current instance, if [type](AsfMetadataDescriptor.md#type) is
    {@link DataType.Bytes}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.byteValue

___

### guidValue

• `get` **guidValue**(): `default`

Gets the guid contents of the current instance.

#### Returns

`default`

UuidWrapper GUID contents of the current instance, if [type](AsfMetadataDescriptor.md#type) is
    {@link DataType.Guid}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.guidValue

___

### languageListIndex

• `get` **languageListIndex**(): `number`

Gets the index of the language associated with the current instance.

#### Returns

`number`

___

### name

• `get` **name**(): `string`

Gets the name of the current instance.

#### Returns

`string`

#### Inherited from

DescriptorBase.name

___

### streamNumber

• `get` **streamNumber**(): `number`

Gets the index of the stream associated with the current instance.

#### Returns

`number`

___

### stringValue

• `get` **stringValue**(): `string`

Gets the string contents of the current instance.

#### Returns

`string`

string String contents of the current instance if [type](AsfMetadataDescriptor.md#type) is
    {@link DataType.Unicode}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.stringValue

___

### type

• `get` **type**(): [`AsfObjectDataType`](../enums/AsfObjectDataType.md)

Gets the type of data contained in the current instance.

#### Returns

[`AsfObjectDataType`](../enums/AsfObjectDataType.md)

#### Inherited from

DescriptorBase.type

___

### uintValue

• `get` **uintValue**(): `number`

Gets the 32-bit double word contents of the current instance.

#### Returns

`number`

number Double word contents of the current instance, if [type](AsfMetadataDescriptor.md#type) is
     {@link DataType.DWord}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.uintValue

___

### ulongValue

• `get` **ulongValue**(): `bigint`

Gets the 64-bit quad word contents of the current instance.

#### Returns

`bigint`

bigint Quad word contents of the current instance, if [type](AsfMetadataDescriptor.md#type) is
    {@link DataType.QWord}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.ulongValue

___

### ushortValue

• `get` **ushortValue**(): `number`

Gets the 16-bit word contents of the current instance.

#### Returns

`number`

number Word contents of the current instance, if [type](AsfMetadataDescriptor.md#type) is
    {@link DataType.Word}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.ushortValue

## Methods

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

**`inheritdoc`**

#### Returns

[`ByteVector`](ByteVector.md)

#### Overrides

DescriptorBase.render

___

### toString

▸ **toString**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

DescriptorBase.toString

___

### fromFile

▸ `Static` **fromFile**(`file`): [`AsfMetadataDescriptor`](AsfMetadataDescriptor.md)

Instantiates a new instance by reading in the contents from a file.

**`internal`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | The file to read the raw ASF description record from |

#### Returns

[`AsfMetadataDescriptor`](AsfMetadataDescriptor.md)
