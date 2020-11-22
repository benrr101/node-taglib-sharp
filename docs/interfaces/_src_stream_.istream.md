**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/stream"](../modules/_src_stream_.md) / IStream

# Interface: IStream

## Hierarchy

* **IStream**

## Implemented by

* [Stream](../classes/_src_stream_.stream.md)

## Index

### Properties

* [canWrite](_src_stream_.istream.md#canwrite)
* [length](_src_stream_.istream.md#length)
* [position](_src_stream_.istream.md#position)

### Methods

* [close](_src_stream_.istream.md#close)
* [read](_src_stream_.istream.md#read)
* [seek](_src_stream_.istream.md#seek)
* [setLength](_src_stream_.istream.md#setlength)
* [write](_src_stream_.istream.md#write)

## Properties

### canWrite

• `Readonly` **canWrite**: boolean

Whether or not the stream can be written to

___

### length

• `Readonly` **length**: number

Number of bytes currently stored in file this stream connects to

___

### position

•  **position**: number

Position within the stream

## Methods

### close

▸ **close**(): void

Closes the stream

**Returns:** void

___

### read

▸ **read**(`buffer`: Uint8Array, `offset`: number, `length`: number): number

Reads a block of bytes from the current stream and writes the data to a buffer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`buffer` | Uint8Array | When this method returns, contains the specified byte array with the values     between `offset` and (`offset` + `length` - 1) replaced by     the characters read from the current stream |
`offset` | number | Zero-based byte offset in `buffer` at which to begin storing data     from the current stream |
`length` | number | The maximum number of bytes to read |

**Returns:** number

number Total number of bytes written to the buffer. This can be less than the
    number of bytes requested if that number of bytes are not currently available or zero if
    the end of the stream is reached before any bytes are read

___

### seek

▸ **seek**(`offset`: number, `origin`: [SeekOrigin](../enums/_src_stream_.seekorigin.md)): void

Sets the position within the current stream to the specified value.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`offset` | number | New position within the stream. this is relative to the `origin`     parameter and can be positive or negative |
`origin` | [SeekOrigin](../enums/_src_stream_.seekorigin.md) | Seek reference point [SeekOrigin](../enums/_src_stream_.seekorigin.md)  |

**Returns:** void

___

### setLength

▸ **setLength**(`length`: number): void

Sets the length of the current current stream to the specified value.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`length` | number | Number of bytes to set the length of the stream to  |

**Returns:** void

___

### write

▸ **write**(`buffer`: fs.BinaryData, `bufferOffset`: number, `length`: number): number

Writes a block of bytes to the current stream using data read from a buffer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`buffer` | fs.BinaryData | Buffer to write data from |
`bufferOffset` | number | Zero-based byte offset in `buffer` at which to begin copying    bytes to the current stream |
`length` | number | Maximum number of bytes to write  |

**Returns:** number
