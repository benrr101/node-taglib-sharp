[node-taglib-sharp](../README.md) / [Exports](../modules.md) / IFileAbstraction

# Interface: IFileAbstraction

This interface provides abstracted access to a file. It permits access to non-standard file
systems and data retrieval methods.

## Implemented by

- [`LocalFileAbstraction`](../classes/LocalFileAbstraction.md)

## Table of contents

### Properties

- [name](IFileAbstraction.md#name)
- [readStream](IFileAbstraction.md#readstream)
- [writeStream](IFileAbstraction.md#writestream)

### Methods

- [closeStream](IFileAbstraction.md#closestream)

## Properties

### name

• **name**: `string`

Name or identifier used by the implementation

**`Remarks`**

This value would typically represent a path or URL to be used when identifying
    the file system, but it could be any valid as appropriate for the implementation.

___

### readStream

• **readStream**: [`IStream`](IStream.md)

Readable, seekable stream for the file referenced by the current instance.

**`Remarks`**

This property is typically used when constructing an instance of [File](../classes/File.md).
    Upon completion of the constructor [closeStream](IFileAbstraction.md#closestream) will be called to close the stream.
    If the stream is to be reused after this point, [closeStream](IFileAbstraction.md#closestream) should be implemented
    in a way to keep it open.

___

### writeStream

• **writeStream**: [`IStream`](IStream.md)

Writable, seekable stream for the file referenced by the current instance.

**`Remarks`**

This property is typically used when saving a file with [save](../classes/File.md#save). Upon
    completion of the method, [closeStream](IFileAbstraction.md#closestream) will be called to close the stream. If the
    stream is to be reused after this point, [closeStream](IFileAbstraction.md#closestream) should be implemented in a way
    to keep it open

## Methods

### closeStream

▸ **closeStream**(`stream`): `void`

Closes a stream created by the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`IStream`](IStream.md) | Stream created by the current instance. |

#### Returns

`void`
