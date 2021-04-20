[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfMetadataDescriptor

# Class: AsfMetadataDescriptor

This class provides a representation of an ASF description record to be used inside a
MetadataLibraryObject.

**`remarks`** This class can store various types of information. Although [toString](asfmetadatadescriptor.md#tostring) provides
    a representation of all types of values, it is recommended to determine which of the `get*`
    methods to use by accessing [type](asfmetadatadescriptor.md#type)

## Hierarchy

* *DescriptorBase*

  ↳ **AsfMetadataDescriptor**

## Table of contents

### Constructors

- [constructor](asfmetadatadescriptor.md#constructor)

### Properties

- [\_boolValue](asfmetadatadescriptor.md#_boolvalue)
- [\_byteValue](asfmetadatadescriptor.md#_bytevalue)
- [\_dWordValue](asfmetadatadescriptor.md#_dwordvalue)
- [\_guidValue](asfmetadatadescriptor.md#_guidvalue)
- [\_name](asfmetadatadescriptor.md#_name)
- [\_qWordValue](asfmetadatadescriptor.md#_qwordvalue)
- [\_stringValue](asfmetadatadescriptor.md#_stringvalue)
- [\_type](asfmetadatadescriptor.md#_type)
- [\_wordValue](asfmetadatadescriptor.md#_wordvalue)

### Accessors

- [languageListIndex](asfmetadatadescriptor.md#languagelistindex)
- [name](asfmetadatadescriptor.md#name)
- [streamNumber](asfmetadatadescriptor.md#streamnumber)
- [type](asfmetadatadescriptor.md#type)

### Methods

- [getBool](asfmetadatadescriptor.md#getbool)
- [getBytes](asfmetadatadescriptor.md#getbytes)
- [getGuid](asfmetadatadescriptor.md#getguid)
- [getString](asfmetadatadescriptor.md#getstring)
- [getUint](asfmetadatadescriptor.md#getuint)
- [getUlong](asfmetadatadescriptor.md#getulong)
- [getUshort](asfmetadatadescriptor.md#getushort)
- [render](asfmetadatadescriptor.md#render)
- [toString](asfmetadatadescriptor.md#tostring)
- [fromFile](asfmetadatadescriptor.md#fromfile)

## Constructors

### constructor

\+ **new AsfMetadataDescriptor**(`languageListIndex`: *number*, `streamNumber`: *number*, `name`: *string*, `type`: [*AsfObjectDataType*](../enums/asfobjectdatatype.md), `value`: DescriptorValue): [*AsfMetadataDescriptor*](asfmetadatadescriptor.md)

#### Parameters:

Name | Type |
------ | ------ |
`languageListIndex` | *number* |
`streamNumber` | *number* |
`name` | *string* |
`type` | [*AsfObjectDataType*](../enums/asfobjectdatatype.md) |
`value` | DescriptorValue |

**Returns:** [*AsfMetadataDescriptor*](asfmetadatadescriptor.md)

## Properties

### \_boolValue

• `Protected` `Readonly` **\_boolValue**: *boolean*

___

### \_byteValue

• `Protected` `Readonly` **\_byteValue**: [*ByteVector*](bytevector.md)

___

### \_dWordValue

• `Protected` `Readonly` **\_dWordValue**: *number*

___

### \_guidValue

• `Protected` `Readonly` **\_guidValue**: *default*

___

### \_name

• `Protected` `Readonly` **\_name**: *string*

___

### \_qWordValue

• `Protected` `Readonly` **\_qWordValue**: *bigint*

___

### \_stringValue

• `Protected` `Readonly` **\_stringValue**: *string*

___

### \_type

• `Protected` `Readonly` **\_type**: [*AsfObjectDataType*](../enums/asfobjectdatatype.md)

___

### \_wordValue

• `Protected` `Readonly` **\_wordValue**: *number*

## Accessors

### languageListIndex

• **languageListIndex**(): *number*

Gets the index of the language associated with the current instance.

**Returns:** *number*

___

### name

• **name**(): *string*

Gets the name of the current instance.

**Returns:** *string*

___

### streamNumber

• **streamNumber**(): *number*

Gets the index of the stream associated with the current instance.

**Returns:** *number*

___

### type

• **type**(): [*AsfObjectDataType*](../enums/asfobjectdatatype.md)

Gets the type of data contained in the current instance.

**Returns:** [*AsfObjectDataType*](../enums/asfobjectdatatype.md)

## Methods

### getBool

▸ **getBool**(): *boolean*

Gets the boolean value of the current instance.

**Returns:** *boolean*

boolean Boolean value of the current instance is returned if [type](asfmetadatadescriptor.md#type) is
    {@link DataType.Bool}. `undefined` is returned otherwise.

___

### getBytes

▸ **getBytes**(): [*ByteVector*](bytevector.md)

Gets the binary contents of the current instance.

**Returns:** [*ByteVector*](bytevector.md)

ByteVector Byte contents of the current instance, if [type](asfmetadatadescriptor.md#type) is
    {@link DataType.Bytes}. `undefined` is returned otherwise.

___

### getGuid

▸ **getGuid**(): *default*

Gets the guid contents of the current instance.

**Returns:** *default*

UuidWrapper GUID contents of the current instance, if [type](asfmetadatadescriptor.md#type) is
    {@link DataType.Guid}. `undefined` is returned otherwise.

___

### getString

▸ **getString**(): *string*

Gets the string contents of the current instance.

**Returns:** *string*

string String contents of the current instance if [type](asfmetadatadescriptor.md#type) is
    {@link DataType.Unicode}. `undefined` is returned otherwise.

___

### getUint

▸ **getUint**(): *number*

Gets the 32-bit double word contents of the current instance.

**Returns:** *number*

number Double word contents of the current instance, if [type](asfmetadatadescriptor.md#type) is
     {@link DataType.DWord}. `undefined` is returned otherwise.

___

### getUlong

▸ **getUlong**(): *bigint*

Gets the 64-bit quad word contents of the current instance.

**Returns:** *bigint*

bigint Quad word contents of the current instance, if [type](asfmetadatadescriptor.md#type) is
    {@link DataType.QWord}. `undefined` is returned otherwise.

___

### getUshort

▸ **getUshort**(): *number*

Gets the 16-bit word contents of the current instance.

**Returns:** *number*

number Word contents of the current instance, if [type](asfmetadatadescriptor.md#type) is
    {@link DataType.Word}. `undefined` is returned otherwise.

___

### render

▸ **render**(): [*ByteVector*](bytevector.md)

**`inheritdoc`** 

**Returns:** [*ByteVector*](bytevector.md)

___

### toString

▸ **toString**(): *string*

**`inheritdoc`** 

**Returns:** *string*

___

### fromFile

▸ `Static`**fromFile**(`file`: [*File*](file.md)): [*AsfMetadataDescriptor*](asfmetadatadescriptor.md)

Instantiates a new instance by reading in the contents from a file.

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [*File*](file.md) | The file to read the raw ASF description record from   |

**Returns:** [*AsfMetadataDescriptor*](asfmetadatadescriptor.md)
