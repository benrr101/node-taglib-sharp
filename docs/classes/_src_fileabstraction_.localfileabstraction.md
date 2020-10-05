**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/fileAbstraction"](../modules/_src_fileabstraction_.md) / LocalFileAbstraction

# Class: LocalFileAbstraction

This class implements {@see IFileAbstraction} to provide support for accessing the local/
standard file.
This class is used as the standard file abstraction throughout the library.

## Hierarchy

* **LocalFileAbstraction**

## Implements

* [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md)

## Index

### Constructors

* [constructor](_src_fileabstraction_.localfileabstraction.md#constructor)

### Accessors

* [name](_src_fileabstraction_.localfileabstraction.md#name)
* [readStream](_src_fileabstraction_.localfileabstraction.md#readstream)
* [writeStream](_src_fileabstraction_.localfileabstraction.md#writestream)

### Methods

* [closeStream](_src_fileabstraction_.localfileabstraction.md#closestream)

## Constructors

### constructor

\+ **new LocalFileAbstraction**(`path`: string): [LocalFileAbstraction](_src_fileabstraction_.localfileabstraction.md)

*Defined in src/fileAbstraction.ts:50*

Constructs and initializes a new instance from a specified path in the local file system

**`throws`** Error Thrown if {@param path} is falsey

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | string | Path of the file to use in the new instance |

**Returns:** [LocalFileAbstraction](_src_fileabstraction_.localfileabstraction.md)

## Accessors

### name

• get **name**(): string

*Defined in src/fileAbstraction.ts:63*

Name or identifier used by the implementation

**`inheritdoc`** 

**Returns:** string

___

### readStream

• get **readStream**(): [IStream](../interfaces/_src_stream_.istream.md)

*Defined in src/fileAbstraction.ts:68*

Readable, seekable stream for the file referenced by the current instance.

**`inheritdoc`** 

**Returns:** [IStream](../interfaces/_src_stream_.istream.md)

___

### writeStream

• get **writeStream**(): [IStream](../interfaces/_src_stream_.istream.md)

*Defined in src/fileAbstraction.ts:73*

Writable, seekable stream fo the file referenced by the current instance.

**`inheritdoc`** 

**Returns:** [IStream](../interfaces/_src_stream_.istream.md)

## Methods

### closeStream

▸ **closeStream**(`stream`: [IStream](../interfaces/_src_stream_.istream.md)): void

*Implementation of [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md)*

*Defined in src/fileAbstraction.ts:78*

Closes a stream created by the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`stream` | [IStream](../interfaces/_src_stream_.istream.md) | Stream created by the current instance.  |

**Returns:** void
