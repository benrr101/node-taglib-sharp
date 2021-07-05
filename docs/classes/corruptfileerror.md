[node-taglib-sharp](../README.md) / [Exports](../modules.md) / CorruptFileError

# Class: CorruptFileError

## Hierarchy

- `Error`

  ↳ **`CorruptFileError`**

## Table of contents

### Constructors

- [constructor](corruptfileerror.md#constructor)

### Properties

- [isCorruptFileError](corruptfileerror.md#iscorruptfileerror)
- [message](corruptfileerror.md#message)
- [name](corruptfileerror.md#name)
- [stack](corruptfileerror.md#stack)
- [prepareStackTrace](corruptfileerror.md#preparestacktrace)
- [stackTraceLimit](corruptfileerror.md#stacktracelimit)

### Methods

- [captureStackTrace](corruptfileerror.md#capturestacktrace)
- [errorIs](corruptfileerror.md#erroris)

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
