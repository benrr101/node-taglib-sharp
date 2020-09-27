**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/errors"](../modules/_src_errors_.md) / NotImplementedError

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

*Defined in src/errors.ts:14*

#### Parameters:

Name | Type |
------ | ------ |
`message?` | string |

**Returns:** [NotImplementedError](_src_errors_.notimplementederror.md)

## Properties

### isNotImplementedError

• `Readonly` **isNotImplementedError**: boolean = true

*Defined in src/errors.ts:14*

___

### message

•  **message**: string

*Inherited from [CorruptFileError](_src_errors_.corruptfileerror.md).[message](_src_errors_.corruptfileerror.md#message)*

*Defined in lib.es5.d.ts:974*

___

### name

•  **name**: string

*Inherited from [CorruptFileError](_src_errors_.corruptfileerror.md).[name](_src_errors_.corruptfileerror.md#name)*

*Defined in lib.es5.d.ts:973*

___

### stack

• `Optional` **stack**: string

*Inherited from [CorruptFileError](_src_errors_.corruptfileerror.md).[stack](_src_errors_.corruptfileerror.md#stack)*

*Overrides [CorruptFileError](_src_errors_.corruptfileerror.md).[stack](_src_errors_.corruptfileerror.md#stack)*

*Defined in lib.es5.d.ts:975*

___

### Error

▪ `Static` **Error**: ErrorConstructor

*Defined in lib.es5.d.ts:984*

## Methods

### errorIs

▸ `Static`**errorIs**(`e`: [Error](_src_errors_.corruptfileerror.md#error)): boolean

*Defined in src/errors.ts:20*

#### Parameters:

Name | Type |
------ | ------ |
`e` | [Error](_src_errors_.corruptfileerror.md#error) |

**Returns:** boolean
