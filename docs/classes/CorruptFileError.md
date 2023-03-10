[node-taglib-sharp](../README.md) / [Exports](../modules.md) / CorruptFileError

# Class: CorruptFileError

Error class that indicates the file is likely corrupt.

## Hierarchy

- `Error`

  ↳ **`CorruptFileError`**

## Table of contents

### Constructors

- [constructor](CorruptFileError.md#constructor)

### Properties

- [message](CorruptFileError.md#message)
- [name](CorruptFileError.md#name)
- [stack](CorruptFileError.md#stack)
- [prepareStackTrace](CorruptFileError.md#preparestacktrace)
- [stackTraceLimit](CorruptFileError.md#stacktracelimit)

### Methods

- [captureStackTrace](CorruptFileError.md#capturestacktrace)

## Constructors

### constructor

• **new CorruptFileError**(`msg?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg?` | `string` |

#### Overrides

Error.constructor

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

___

### name

• **name**: `string`

#### Inherited from

Error.name

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace
