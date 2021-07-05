[node-taglib-sharp](../README.md) / [Exports](../modules.md) / NotImplementedError

# Class: NotImplementedError

## Hierarchy

- `Error`

  ↳ **`NotImplementedError`**

## Table of contents

### Constructors

- [constructor](notimplementederror.md#constructor)

### Properties

- [isNotImplementedError](notimplementederror.md#isnotimplementederror)
- [message](notimplementederror.md#message)
- [name](notimplementederror.md#name)
- [stack](notimplementederror.md#stack)
- [prepareStackTrace](notimplementederror.md#preparestacktrace)
- [stackTraceLimit](notimplementederror.md#stacktracelimit)

### Methods

- [captureStackTrace](notimplementederror.md#capturestacktrace)
- [errorIs](notimplementederror.md#erroris)

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

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

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

___

### errorIs

▸ `Static` **errorIs**(`e`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `Error` |

#### Returns

`boolean`
