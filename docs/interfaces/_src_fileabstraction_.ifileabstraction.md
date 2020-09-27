**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/fileAbstraction"](../modules/_src_fileabstraction_.md) / IFileAbstraction

# Interface: IFileAbstraction

This interface provides abstracted access to a file. It permits access to non-standard file
systems and data retrieval methods.

## Hierarchy

* **IFileAbstraction**

## Implemented by

* [LocalFileAbstraction](../classes/_src_fileabstraction_.localfileabstraction.md)

## Index

### Properties

* [name](_src_fileabstraction_.ifileabstraction.md#name)
* [readStream](_src_fileabstraction_.ifileabstraction.md#readstream)
* [writeStream](_src_fileabstraction_.ifileabstraction.md#writestream)

### Methods

* [closeStream](_src_fileabstraction_.ifileabstraction.md#closestream)

## Properties

### name

•  **name**: string

*Defined in src/fileAbstraction.ts:14*

Name or identifier used by the implementation

**`description`** This value would typically represent a path or URL to be used when identifying
  the file system, but it could be any valud as appropriate for the implementation.

___

### readStream

•  **readStream**: [IStream](_src_stream_.istream.md)

*Defined in src/fileAbstraction.ts:23*

Readable, seekable stream for the file referenced by the current instance.

**`description`** This property is typically used when constructing an instance of {@see File}.
  Upon completion of the constructor {@see closeStream} will be called to close the stream.
  If the stream is to be reused after this point, {@see closeStream} should be implemented
  in a way to keep it open.

___

### writeStream

•  **writeStream**: [IStream](_src_stream_.istream.md)

*Defined in src/fileAbstraction.ts:32*

Writable, seekable stream fo the file referenced by the current instance.

**`description`** This property is typically used when saving a file with {@see File.save}. Upon
  completion of the method, {@see closeStream} will be called to close the stream. If the
  stream is to be reused after this point, {@see closeStream} should be implemented in a way
  to keep it open

## Methods

### closeStream

▸ **closeStream**(`stream`: [IStream](_src_stream_.istream.md)): void

*Defined in src/fileAbstraction.ts:38*

Closes a stream created by the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`stream` | [IStream](_src_stream_.istream.md) | Stream created by the current instance.  |

**Returns:** void
