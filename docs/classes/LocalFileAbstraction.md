[node-taglib-sharp](../README.md) / [Exports](../modules.md) / LocalFileAbstraction

# Class: LocalFileAbstraction

This class implements [IFileAbstraction](../interfaces/IFileAbstraction.md) to provide support for accessing the local/
standard file.
This class is used as the standard file abstraction throughout the library.

## Implements

- [`IFileAbstraction`](../interfaces/IFileAbstraction.md)

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

**`Throws`**

Error Thrown if `path` is falsy

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path of the file to use in the new instance |

## Accessors

### name

• `get` **name**(): `string`

Name or identifier used by the implementation

#### Returns

`string`

#### Implementation of

[IFileAbstraction](../interfaces/IFileAbstraction.md).[name](../interfaces/IFileAbstraction.md#name)

___

### readStream

• `get` **readStream**(): [`IStream`](../interfaces/IStream.md)

Readable, seekable stream for the file referenced by the current instance.

#### Returns

[`IStream`](../interfaces/IStream.md)

#### Implementation of

[IFileAbstraction](../interfaces/IFileAbstraction.md).[readStream](../interfaces/IFileAbstraction.md#readstream)

___

### writeStream

• `get` **writeStream**(): [`IStream`](../interfaces/IStream.md)

Writable, seekable stream for the file referenced by the current instance.

#### Returns

[`IStream`](../interfaces/IStream.md)

#### Implementation of

[IFileAbstraction](../interfaces/IFileAbstraction.md).[writeStream](../interfaces/IFileAbstraction.md#writestream)

## Methods

### closeStream

▸ **closeStream**(`stream`): `void`

Closes a stream created by the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`IStream`](../interfaces/IStream.md) | Stream created by the current instance. |

#### Returns

`void`

#### Implementation of

[IFileAbstraction](../interfaces/IFileAbstraction.md).[closeStream](../interfaces/IFileAbstraction.md#closestream)
