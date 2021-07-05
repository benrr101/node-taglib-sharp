[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfContentDescriptor

# Class: AsfContentDescriptor

This class provides a representation of an ASF content descriptor to be used in combination with
{@link ExtendedContentDescriptionObject}.

**`remarks`** This class can store various types of information. Although [toString](asfcontentdescriptor.md#tostring) provides
    a representation of all types of values, it is recommended to determine which of the `get*`
    methods to use by accessing [type](asfcontentdescriptor.md#type)

## Hierarchy

- `DescriptorBase`

  ↳ **`AsfContentDescriptor`**

## Table of contents

### Constructors

- [constructor](asfcontentdescriptor.md#constructor)

### Properties

- [\_boolValue](asfcontentdescriptor.md#_boolvalue)
- [\_byteValue](asfcontentdescriptor.md#_bytevalue)
- [\_dWordValue](asfcontentdescriptor.md#_dwordvalue)
- [\_guidValue](asfcontentdescriptor.md#_guidvalue)
- [\_name](asfcontentdescriptor.md#_name)
- [\_qWordValue](asfcontentdescriptor.md#_qwordvalue)
- [\_stringValue](asfcontentdescriptor.md#_stringvalue)
- [\_type](asfcontentdescriptor.md#_type)
- [\_wordValue](asfcontentdescriptor.md#_wordvalue)

### Accessors

- [name](asfcontentdescriptor.md#name)
- [type](asfcontentdescriptor.md#type)

### Methods

- [getBool](asfcontentdescriptor.md#getbool)
- [getBytes](asfcontentdescriptor.md#getbytes)
- [getGuid](asfcontentdescriptor.md#getguid)
- [getString](asfcontentdescriptor.md#getstring)
- [getUint](asfcontentdescriptor.md#getuint)
- [getUlong](asfcontentdescriptor.md#getulong)
- [getUshort](asfcontentdescriptor.md#getushort)
- [render](asfcontentdescriptor.md#render)
- [toString](asfcontentdescriptor.md#tostring)
- [fromFile](asfcontentdescriptor.md#fromfile)

## Constructors

### constructor

• **new AsfContentDescriptor**(`name`, `type`, `value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `type` | [`AsfObjectDataType`](../enums/asfobjectdatatype.md) |
| `value` | `DescriptorValue` |

#### Overrides

DescriptorBase.constructor

## Properties

### \_boolValue

• `Protected` `Readonly` **\_boolValue**: `boolean`

#### Inherited from

DescriptorBase.\_boolValue

___

### \_byteValue

• `Protected` `Readonly` **\_byteValue**: [`ByteVector`](bytevector.md)

#### Inherited from

DescriptorBase.\_byteValue

___

### \_dWordValue

• `Protected` `Readonly` **\_dWordValue**: `number`

#### Inherited from

DescriptorBase.\_dWordValue

___

### \_guidValue

• `Protected` `Readonly` **\_guidValue**: `default`

#### Inherited from

DescriptorBase.\_guidValue

___

### \_name

• `Protected` `Readonly` **\_name**: `string`

#### Inherited from

DescriptorBase.\_name

___

### \_qWordValue

• `Protected` `Readonly` **\_qWordValue**: `bigint`

#### Inherited from

DescriptorBase.\_qWordValue

___

### \_stringValue

• `Protected` `Readonly` **\_stringValue**: `string`

#### Inherited from

DescriptorBase.\_stringValue

___

### \_type

• `Protected` `Readonly` **\_type**: [`AsfObjectDataType`](../enums/asfobjectdatatype.md)

#### Inherited from

DescriptorBase.\_type

___

### \_wordValue

• `Protected` `Readonly` **\_wordValue**: `number`

#### Inherited from

DescriptorBase.\_wordValue

## Accessors

### name

• `get` **name**(): `string`

Gets the name of the current instance.

#### Returns

`string`

___

### type

• `get` **type**(): [`AsfObjectDataType`](../enums/asfobjectdatatype.md)

Gets the type of data contained in the current instance.

#### Returns

[`AsfObjectDataType`](../enums/asfobjectdatatype.md)

## Methods

### getBool

▸ **getBool**(): `boolean`

Gets the boolean value of the current instance.

#### Returns

`boolean`

boolean Boolean value of the current instance is returned if [type](asfcontentdescriptor.md#type) is
    {@link DataType.Bool}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.getBool

___

### getBytes

▸ **getBytes**(): [`ByteVector`](bytevector.md)

Gets the binary contents of the current instance.

#### Returns

[`ByteVector`](bytevector.md)

ByteVector Byte contents of the current instance, if [type](asfcontentdescriptor.md#type) is
    {@link DataType.Bytes}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.getBytes

___

### getGuid

▸ **getGuid**(): `default`

Gets the guid contents of the current instance.

#### Returns

`default`

UuidWrapper GUID contents of the current instance, if [type](asfcontentdescriptor.md#type) is
    {@link DataType.Guid}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.getGuid

___

### getString

▸ **getString**(): `string`

Gets the string contents of the current instance.

#### Returns

`string`

string String contents of the current instance if [type](asfcontentdescriptor.md#type) is
    {@link DataType.Unicode}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.getString

___

### getUint

▸ **getUint**(): `number`

Gets the 32-bit double word contents of the current instance.

#### Returns

`number`

number Double word contents of the current instance, if [type](asfcontentdescriptor.md#type) is
     {@link DataType.DWord}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.getUint

___

### getUlong

▸ **getUlong**(): `bigint`

Gets the 64-bit quad word contents of the current instance.

#### Returns

`bigint`

bigint Quad word contents of the current instance, if [type](asfcontentdescriptor.md#type) is
    {@link DataType.QWord}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.getUlong

___

### getUshort

▸ **getUshort**(): `number`

Gets the 16-bit word contents of the current instance.

#### Returns

`number`

number Word contents of the current instance, if [type](asfcontentdescriptor.md#type) is
    {@link DataType.Word}. `undefined` is returned otherwise.

#### Inherited from

DescriptorBase.getUshort

___

### render

▸ **render**(): [`ByteVector`](bytevector.md)

**`inheritdoc`**

#### Returns

[`ByteVector`](bytevector.md)

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

▸ `Static` **fromFile**(`file`): [`AsfContentDescriptor`](asfcontentdescriptor.md)

Instantiates a new instance by reading in the contents from a file.

**`internal`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](file.md) | The file to read the raw ASF description record from |

#### Returns

[`AsfContentDescriptor`](asfcontentdescriptor.md)
