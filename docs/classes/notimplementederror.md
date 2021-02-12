[node-taglib-sharp](../README.md) / [Exports](../modules.md) / NotImplementedError

# Class: NotImplementedError

## Hierarchy

* *Error*

  ↳ **NotImplementedError**

## Table of contents

### Constructors

- [constructor](notimplementederror.md#constructor)

### Properties

- [isNotImplementedError](notimplementederror.md#isnotimplementederror)
- [message](notimplementederror.md#message)
- [name](notimplementederror.md#name)
- [prepareStackTrace](notimplementederror.md#preparestacktrace)
- [stack](notimplementederror.md#stack)
- [stackTraceLimit](notimplementederror.md#stacktracelimit)

### Methods

- [captureStackTrace](notimplementederror.md#capturestacktrace)
- [errorIs](notimplementederror.md#erroris)

## Constructors

### constructor

\+ **new NotImplementedError**(`message?`: *string*): [*NotImplementedError*](notimplementederror.md)

#### Parameters:

Name | Type |
------ | ------ |
`message?` | *string* |

**Returns:** [*NotImplementedError*](notimplementederror.md)

## Properties

### isNotImplementedError

• `Readonly` **isNotImplementedError**: *boolean*= true

___

### message

• **message**: *string*

___

### name

• **name**: *string*

___

### prepareStackTrace

• `Optional` **prepareStackTrace**: (`err`: Error, `stackTraces`: CallSite[]) => *any*

Optional override for formatting stack traces

**`see`** https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces

___

### stack

• `Optional` **stack**: *string*

___

### stackTraceLimit

• **stackTraceLimit**: *number*

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`: Object, `constructorOpt?`: Function): *void*

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
