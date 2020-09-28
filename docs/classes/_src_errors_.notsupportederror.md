**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/errors"](../modules/_src_errors_.md) / NotSupportedError

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

*Defined in src/errors.ts:26*

#### Parameters:

Name | Type |
------ | ------ |
`message?` | string |

**Returns:** [NotSupportedError](_src_errors_.notsupportederror.md)

## Properties

### isNotSupportedError

• `Readonly` **isNotSupportedError**: boolean = true

*Defined in src/errors.ts:26*

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

*Defined in src/errors.ts:32*

#### Parameters:

Name | Type |
------ | ------ |
`e` | [Error](_src_errors_.corruptfileerror.md#error) |

**Returns:** boolean
