[node-taglib-sharp](../README.md) / [Exports](../modules.md) / LocalFileAbstraction

# Class: LocalFileAbstraction

This class implements {@link IFileAbstraction} to provide support for accessing the local/
standard file.
This class is used as the standard file abstraction throughout the library.

## Implements

- `IFileAbstraction`

## Table of contents

### Constructors

- [constructor](LocalFileAbstraction.md#constructor)

### Accessors

- [name](LocalFileAbstraction.md#name)
- [readStream](LocalFileAbstraction.md#readstream)
- [writeStream](LocalFileAbstraction.md#writestream)

### Methods

- [closeStream](LocalFileAbstraction.md#closestream)

## Constructors

### constructor

• **new LocalFileAbstraction**(`path`)

Constructs and initializes a new instance from a specified path in the local file system

**`throws`** Error Thrown if `path` is falsy

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path of the file to use in the new instance |

## Accessors

### name

• `get` **name**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Implementation of

IFileAbstraction.name

___

### readStream

• `get` **readStream**(): `IStream`

**`inheritdoc`**

#### Returns

`IStream`

#### Implementation of

IFileAbstraction.readStream

___

### writeStream

• `get` **writeStream**(): `IStream`

**`inheritdoc`**

#### Returns

`IStream`

#### Implementation of

IFileAbstraction.writeStream

## Methods

### closeStream

▸ **closeStream**(`stream`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `IStream` |

#### Returns

`void`

#### Implementation of

IFileAbstraction.closeStream
