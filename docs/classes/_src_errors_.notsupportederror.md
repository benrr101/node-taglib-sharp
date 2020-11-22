**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/errors"](../modules/_src_errors_.md) / NotSupportedError

# Class: NotSupportedError

## Hierarchy

* [Error](_src_errors_.corruptfileerror.md#error)

  ↳ **NotSupportedError**

## Index

### Constructors

* [constructor](_src_errors_.notsupportederror.md#constructor)

### Properties

* [isNotSupportedError](_src_errors_.notsupportederror.md#isnotsupportederror)
* [message](_src_errors_.notsupportederror.md#message)
* [name](_src_errors_.notsupportederror.md#name)
* [stack](_src_errors_.notsupportederror.md#stack)
* [Error](_src_errors_.notsupportederror.md#error)

### Methods

* [errorIs](_src_errors_.notsupportederror.md#erroris)

## Constructors

### constructor

\+ **new NotSupportedError**(`message?`: string): [NotSupportedError](_src_errors_.notsupportederror.md)

#### Parameters:

Name | Type |
------ | ------ |
`message?` | string |

**Returns:** [NotSupportedError](_src_errors_.notsupportederror.md)

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
