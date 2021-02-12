[node-taglib-sharp](../README.md) / [Exports](../modules.md) / CorruptFileError

# Class: CorruptFileError

## Hierarchy

* *Error*

  ↳ **CorruptFileError**

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

\+ **new CorruptFileError**(`msg?`: *string*): [*CorruptFileError*](corruptfileerror.md)

#### Parameters:

Name | Type |
------ | ------ |
`msg?` | *string* |

**Returns:** [*CorruptFileError*](corruptfileerror.md)

## Properties

### isCorruptFileError

• `Readonly` **isCorruptFileError**: *boolean*= true

___

### message

• **message**: *string*

___

### name

• **name**: *string*

___

### stack

• `Optional` **stack**: *string*

___

### prepareStackTrace

▪ `Optional` `Static` **prepareStackTrace**: (`err`: Error, `stackTraces`: CallSite[]) => *any*

Optional override for formatting stack traces

**`see`** https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: *number*

## Methods

### captureStackTrace

▸ `Static`**captureStackTrace**(`targetObject`: Object, `constructorOpt?`: Function): *void*

Create .stack property on a target object

#### Parameters:

Name | Type |
------ | ------ |
`targetObject` | Object |
`constructorOpt?` | Function |

**Returns:** *void*

___

### errorIs

▸ `Static`**errorIs**(`e`: Error): *boolean*

#### Parameters:

Name | Type |
------ | ------ |
`e` | Error |

**Returns:** *boolean*
