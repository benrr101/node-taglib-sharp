**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/byteVector"](../modules/_src_bytevector_.md) / IConvEncoding

# Class: IConvEncoding

## Hierarchy

* **IConvEncoding**

## Index

### Constructors

* [constructor](_src_bytevector_.iconvencoding.md#constructor)

### Properties

* [encoding](_src_bytevector_.iconvencoding.md#encoding)

### Methods

* [decode](_src_bytevector_.iconvencoding.md#decode)
* [encode](_src_bytevector_.iconvencoding.md#encode)

## Constructors

### constructor

\+ **new IConvEncoding**(`encoding`: string): [IConvEncoding](_src_bytevector_.iconvencoding.md)

#### Parameters:

Name | Type |
------ | ------ |
`encoding` | string |

**Returns:** [IConvEncoding](_src_bytevector_.iconvencoding.md)

## Properties

### encoding

• `Readonly` **encoding**: string

## Methods

### decode

▸ **decode**(`data`: Buffer): string

#### Parameters:

Name | Type |
------ | ------ |
`data` | Buffer |

**Returns:** string

___

### encode

▸ **encode**(`text`: string): Uint8Array

#### Parameters:

Name | Type |
------ | ------ |
`text` | string |

**Returns:** Uint8Array
