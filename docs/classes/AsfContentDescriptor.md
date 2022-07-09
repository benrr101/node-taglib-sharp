[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfContentDescriptor

# Class: AsfContentDescriptor

This class provides a representation of an ASF content descriptor to be used in combination with
{@link ExtendedContentDescriptionObject}.

**`remarks`** This class can store various types of information. Although [toString](AsfContentDescriptor.md#tostring) provides
    a representation of all types of values, it is recommended to determine which of the `get*`
    methods to use by accessing [type](AsfContentDescriptor.md#type)

## Hierarchy

- `DescriptorBase`

  ↳ **`AsfContentDescriptor`**

## Table of contents

### Constructors

- [constructor](AsfContentDescriptor.md#constructor)

### Accessors

- [boolValue](AsfContentDescriptor.md#boolvalue)
- [byteValue](AsfContentDescriptor.md#bytevalue)
- [guidValue](AsfContentDescriptor.md#guidvalue)
- [name](AsfContentDescriptor.md#name)
- [stringValue](AsfContentDescriptor.md#stringvalue)
- [type](AsfContentDescriptor.md#type)
- [uintValue](AsfContentDescriptor.md#uintvalue)
- [ulongValue](AsfContentDescriptor.md#ulongvalue)
- [ushortValue](AsfContentDescriptor.md#ushortvalue)

### Methods

- [render](AsfContentDescriptor.md#render)
- [toString](AsfContentDescriptor.md#tostring)
- [fromFile](AsfContentDescriptor.md#fromfile)

## Constructors

### constructor

• **new AsfContentDescriptor**(`name`, `type`, `value`)

#### Parameters

| Name | Type |
| :------ | :------ |
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

boolean Boolean value of the current instance is returned if [type](AsfContentDescriptor.md#type) is
    {@link DataType.Bool}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.boolValue

___

### byteValue

• `get` **byteValue**(): [`ByteVector`](ByteVector.md)

Gets the binary contents of the current instance.

#### Returns

[`ByteVector`](ByteVector.md)

ByteVector Byte contents of the current instance, if [type](AsfContentDescriptor.md#type) is
    {@link DataType.Bytes}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.byteValue

___

### guidValue

• `get` **guidValue**(): `default`

Gets the guid contents of the current instance.

#### Returns

`default`

UuidWrapper GUID contents of the current instance, if [type](AsfContentDescriptor.md#type) is
    {@link DataType.Guid}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.guidValue

___

### name

• `get` **name**(): `string`

Gets the name of the current instance.

#### Returns

`string`

#### Inherited from

DescriptorBase.name

___

### stringValue

• `get` **stringValue**(): `string`

Gets the string contents of the current instance.

#### Returns

`string`

string String contents of the current instance if [type](AsfContentDescriptor.md#type) is
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

number Double word contents of the current instance, if [type](AsfContentDescriptor.md#type) is
     {@link DataType.DWord}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.uintValue

___

### ulongValue

• `get` **ulongValue**(): `bigint`

Gets the 64-bit quad word contents of the current instance.

#### Returns

`bigint`

bigint Quad word contents of the current instance, if [type](AsfContentDescriptor.md#type) is
    {@link DataType.QWord}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.ulongValue

___

### ushortValue

• `get` **ushortValue**(): `number`

Gets the 16-bit word contents of the current instance.

#### Returns

`number`

number Word contents of the current instance, if [type](AsfContentDescriptor.md#type) is
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

▸ `Static` **fromFile**(`file`): [`AsfContentDescriptor`](AsfContentDescriptor.md)

Instantiates a new instance by reading in the contents from a file.

**`internal`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | The file to read the raw ASF description record from |

#### Returns

[`AsfContentDescriptor`](AsfContentDescriptor.md)
