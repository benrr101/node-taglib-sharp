**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/stream"](../modules/_src_stream_.md) / Stream

# Class: Stream

Wrapper around the Node.js internal file descriptors to mock behavior like .NET Streams

## Hierarchy

* **Stream**

## Implements

* [IStream](../interfaces/_src_stream_.istream.md)

## Index

### Accessors

* [canWrite](_src_stream_.stream.md#canwrite)
* [length](_src_stream_.stream.md#length)
* [position](_src_stream_.stream.md#position)

### Methods

* [close](_src_stream_.stream.md#close)
* [read](_src_stream_.stream.md#read)
* [seek](_src_stream_.stream.md#seek)
* [setLength](_src_stream_.stream.md#setlength)
* [write](_src_stream_.stream.md#write)
* [createAsRead](_src_stream_.stream.md#createasread)
* [createAsReadWrite](_src_stream_.stream.md#createasreadwrite)

## Accessors

### canWrite

• get **canWrite**(): boolean

*Defined in src/stream.ts:103*

Whether or not the stream can be written to

**`inheritdoc`** 

**Returns:** boolean

___

### length

• get **length**(): number

*Defined in src/stream.ts:106*

Number of bytes currently stored in file this stream connects to

**`inheritdoc`** 

**Returns:** number

___

### position

• get **position**(): number

*Defined in src/stream.ts:109*

Position within the stream

**`inheritdoc`** 

**Returns:** number

• set **position**(`position`: number): void

*Defined in src/stream.ts:111*

Position within the stream

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`position` | number |

**Returns:** void

## Methods

### close

▸ **close**(): void

*Implementation of [IStream](../interfaces/_src_stream_.istream.md)*

*Defined in src/stream.ts:122*

Closes the stream

**Returns:** void

___

### read

▸ **read**(`buffer`: Uint8Array, `bufferOffset`: number, `length`: number): number

*Implementation of [IStream](../interfaces/_src_stream_.istream.md)*

*Defined in src/stream.ts:127*

Reads a block of bytes from the current stream and writes the data to a buffer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`buffer` | Uint8Array | When this method returns, contains the specified byte array with the values     between {@paramref offset} and ({@paramref offset} + {@paramref length} - 1) replaced by     the characters read from the current stream |
`bufferOffset` | number | Zero-based byte offset in {@paramref buffer} at which to begin storing data     from the current stream |
`length` | number | The maximum number of bytes to read |

**Returns:** number

number Total number of bytes written to the buffer. This can be less than the
    number of bytes requested if that number of bytes are not currently available or zero if
    the end of the stream is reached before any bytes are read

___

### seek

▸ **seek**(`offset`: number, `origin`: [SeekOrigin](../enums/_src_stream_.seekorigin.md)): void

*Implementation of [IStream](../interfaces/_src_stream_.istream.md)*

*Defined in src/stream.ts:134*

Sets the position within the current stream to the specified value.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`offset` | number | New positioon within the stream. this is relative to the {@paramref origin}     paramter and can be positive or negative |
`origin` | [SeekOrigin](../enums/_src_stream_.seekorigin.md) | Seek reference point {@see SeekOrigin}  |

**Returns:** void

___

### setLength

▸ **setLength**(`length`: number): void

*Implementation of [IStream](../interfaces/_src_stream_.istream.md)*

*Defined in src/stream.ts:149*

Sets the length of the current current stream to the specified value.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`length` | number | Number of bytes to set the length of the stream to  |

**Returns:** void

___

### write

▸ **write**(`buffer`: fs.BinaryData, `bufferOffset`: number, `length`: number): number

*Implementation of [IStream](../interfaces/_src_stream_.istream.md)*

*Defined in src/stream.ts:167*

Writes a block of bytes to the current stream using data read from a buffer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`buffer` | fs.BinaryData | Buffer to write data from |
`bufferOffset` | number | Zero-based byte offset in {@paramref buffer} at which to begin copying    bytes to the current stream |
`length` | number | Maximum number of bytes to write  |

**Returns:** number

___

### createAsRead

▸ `Static`**createAsRead**(`path`: string): [Stream](_src_stream_.stream.md)

*Defined in src/stream.ts:88*

#### Parameters:

Name | Type |
------ | ------ |
`path` | string |

**Returns:** [Stream](_src_stream_.stream.md)

___

### createAsReadWrite

▸ `Static`**createAsReadWrite**(`path`: string): [Stream](_src_stream_.stream.md)

*Defined in src/stream.ts:93*

#### Parameters:

Name | Type |
------ | ------ |
`path` | string |

**Returns:** [Stream](_src_stream_.stream.md)
