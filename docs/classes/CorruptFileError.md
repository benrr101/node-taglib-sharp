[node-taglib-sharp](../README.md) / [Exports](../modules.md) / CorruptFileError

# Class: CorruptFileError

## Hierarchy

- `Error`

  ↳ **`CorruptFileError`**

## Table of contents

### Constructors

- [constructor](CorruptFileError.md#constructor)

### Properties

- [isCorruptFileError](CorruptFileError.md#iscorruptfileerror)
- [message](CorruptFileError.md#message)
- [name](CorruptFileError.md#name)
- [stack](CorruptFileError.md#stack)
- [stackTraceLimit](CorruptFileError.md#stacktracelimit)

### Methods

- [captureStackTrace](CorruptFileError.md#capturestacktrace)
- [errorIs](CorruptFileError.md#erroris)
- [prepareStackTrace](CorruptFileError.md#preparestacktrace)

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

### isCorruptFileError

• `Readonly` **isCorruptFileError**: `boolean` = `true`

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
