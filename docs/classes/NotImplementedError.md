[node-taglib-sharp](../README.md) / [Exports](../modules.md) / NotImplementedError

# Class: NotImplementedError

## Hierarchy

- `Error`

  ↳ **`NotImplementedError`**

## Table of contents

### Constructors

- [constructor](NotImplementedError.md#constructor)

### Properties

- [isNotImplementedError](NotImplementedError.md#isnotimplementederror)
- [message](NotImplementedError.md#message)
- [name](NotImplementedError.md#name)
- [stack](NotImplementedError.md#stack)
- [stackTraceLimit](NotImplementedError.md#stacktracelimit)

### Methods

- [captureStackTrace](NotImplementedError.md#capturestacktrace)
- [errorIs](NotImplementedError.md#erroris)
- [prepareStackTrace](NotImplementedError.md#preparestacktrace)

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

### isNotImplementedError

• `Readonly` **isNotImplementedError**: `boolean` = `true`

___

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

___

### errorIs

▸ `Static` **errorIs**(`e`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `unknown` |

#### Returns

`boolean`

___

### prepareStackTrace

▸ `Static` `Optional` **prepareStackTrace**(`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

#### Returns

`any`

#### Inherited from

Error.prepareStackTrace
