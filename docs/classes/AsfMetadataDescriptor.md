[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfMetadataDescriptor

# Class: AsfMetadataDescriptor

This class provides a representation of an ASF description record to be used inside a
MetadataLibraryObject.

**`Remarks`**

This class can store various types of information. Although [toString](AsfMetadataDescriptor.md#tostring) provides
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

## Constructors

### constructor

• **new AsfMetadataDescriptor**(`languageListIndex`, `streamNumber`, `name`, `type`, `value`)

Constructs and initializes a new instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageListIndex` | `number` | Index of the language |
| `streamNumber` | `number` | Index of the stream |
| `name` | `string` | Name of the metadata library object |
| `type` | [`AsfObjectDataType`](../enums/AsfObjectDataType.md) | Datatype of the object |
| `value` | [`AsfDescriptorValue`](../modules.md#asfdescriptorvalue) | Value to store in the instance |

#### Overrides

DescriptorBase.constructor

## Accessors

### boolValue

• `get` **boolValue**(): `boolean`

Gets the boolean value of the current instance.

#### Returns

`boolean`

Boolean value of the current instance is returned if [type](AsfMetadataDescriptor.md#type) is
    DataType.Bool. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.boolValue

___

### byteValue

• `get` **byteValue**(): [`ByteVector`](ByteVector.md)

Gets the binary contents of the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

Byte contents of the current instance, if [type](AsfMetadataDescriptor.md#type) is
    DataType.Bytes. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.byteValue

___

### guidValue

• `get` **guidValue**(): [`UuidWrapper`](UuidWrapper.md)

Gets the guid contents of the current instance.

#### Returns

[`UuidWrapper`](UuidWrapper.md)

GUID contents of the current instance, if [type](AsfMetadataDescriptor.md#type) is
    DataType.Guid. `undefined` is returned otherwise.

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

String contents of the current instance if [type](AsfMetadataDescriptor.md#type) is
    DataType.Unicode. `undefined` is returned otherwise.

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

Double word contents of the current instance, if [type](AsfMetadataDescriptor.md#type) is
    DataType.DWord. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.uintValue

___

### ulongValue

• `get` **ulongValue**(): `bigint`

Gets the 64-bit quad word contents of the current instance.

#### Returns

`bigint`

Quad word contents of the current instance, if [type](AsfMetadataDescriptor.md#type) is
    DataType.QWord. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.ulongValue

___

### ushortValue

• `get` **ushortValue**(): `number`

Gets the 16-bit word contents of the current instance.

#### Returns

`number`

Word contents of the current instance, if [type](AsfMetadataDescriptor.md#type) is
    DataType.Word. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.ushortValue

## Methods

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

**`Inherit Doc`**

#### Returns

[`ByteVector`](ByteVector.md)

#### Overrides

DescriptorBase.render

___

### toString

▸ **toString**(): `string`

**`Inherit Doc`**

#### Returns

`string`

#### Inherited from

DescriptorBase.toString
