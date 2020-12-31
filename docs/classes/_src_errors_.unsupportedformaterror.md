**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/errors"](../modules/_src_errors_.md) / UnsupportedFormatError

# Class: UnsupportedFormatError

## Hierarchy

* [Error](_src_errors_.corruptfileerror.md#error)

  ↳ **UnsupportedFormatError**

## Index

### Constructors

* [constructor](_src_errors_.unsupportedformaterror.md#constructor)

### Properties

* [isNotSupportedError](_src_errors_.unsupportedformaterror.md#isnotsupportederror)
* [message](_src_errors_.unsupportedformaterror.md#message)
* [name](_src_errors_.unsupportedformaterror.md#name)
* [stack](_src_errors_.unsupportedformaterror.md#stack)
* [Error](_src_errors_.unsupportedformaterror.md#error)

### Methods

* [errorIs](_src_errors_.unsupportedformaterror.md#erroris)

## Constructors

### constructor

\+ **new UnsupportedFormatError**(`message?`: string): [UnsupportedFormatError](_src_errors_.unsupportedformaterror.md)

#### Parameters:

Name | Type |
------ | ------ |
`message?` | string |

**Returns:** [UnsupportedFormatError](_src_errors_.unsupportedformaterror.md)

## Properties

### isNotSupportedError

• `Readonly` **isNotSupportedError**: boolean = true

___

### message

•  **message**: string

*Inherited from [CorruptFileError](_src_errors_.corruptfileerror.md).[message](_src_errors_.corruptfileerror.md#message)*

___

### name

•  **name**: string

*Inherited from [CorruptFileError](_src_errors_.corruptfileerror.md).[name](_src_errors_.corruptfileerror.md#name)*

___

### stack

• `Optional` **stack**: string

*Inherited from [CorruptFileError](_src_errors_.corruptfileerror.md).[stack](_src_errors_.corruptfileerror.md#stack)*

*Overrides [CorruptFileError](_src_errors_.corruptfileerror.md).[stack](_src_errors_.corruptfileerror.md#stack)*

___

### Error

▪ `Static` **Error**: ErrorConstructor

## Methods

### errorIs

▸ `Static`**errorIs**(`e`: [Error](_src_errors_.corruptfileerror.md#error)): boolean

#### Parameters:

Name | Type |
------ | ------ |
`e` | [Error](_src_errors_.corruptfileerror.md#error) |

**Returns:** boolean
