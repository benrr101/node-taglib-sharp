**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/errors"](../modules/_src_errors_.md) / NotImplementedError

# Class: NotImplementedError

## Hierarchy

* [Error](_src_errors_.corruptfileerror.md#error)

  ↳ **NotImplementedError**

## Index

### Constructors

* [constructor](_src_errors_.notimplementederror.md#constructor)

### Properties

* [isNotImplementedError](_src_errors_.notimplementederror.md#isnotimplementederror)
* [message](_src_errors_.notimplementederror.md#message)
* [name](_src_errors_.notimplementederror.md#name)
* [stack](_src_errors_.notimplementederror.md#stack)
* [Error](_src_errors_.notimplementederror.md#error)

### Methods

* [errorIs](_src_errors_.notimplementederror.md#erroris)

## Constructors

### constructor

\+ **new NotImplementedError**(`message?`: string): [NotImplementedError](_src_errors_.notimplementederror.md)

#### Parameters:

Name | Type |
------ | ------ |
`message?` | string |

**Returns:** [NotImplementedError](_src_errors_.notimplementederror.md)

## Properties

### isNotImplementedError

• `Readonly` **isNotImplementedError**: boolean = true

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
