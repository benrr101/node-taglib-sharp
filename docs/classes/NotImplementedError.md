[node-taglib-sharp](../README.md) / [Exports](../modules.md) / NotImplementedError

# Class: NotImplementedError

Error class that indicates a piece of functionality is not implemented in the current version.

## Hierarchy

- `Error`

  ↳ **`NotImplementedError`**

## Table of contents

### Constructors

- [constructor](NotImplementedError.md#constructor)

### Properties

- [message](NotImplementedError.md#message)
- [name](NotImplementedError.md#name)
- [stack](NotImplementedError.md#stack)
- [prepareStackTrace](NotImplementedError.md#preparestacktrace)
- [stackTraceLimit](NotImplementedError.md#stacktracelimit)

### Methods

- [captureStackTrace](NotImplementedError.md#capturestacktrace)

## Constructors

### constructor

• **new NotImplementedError**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

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
