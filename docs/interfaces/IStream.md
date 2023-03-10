[node-taglib-sharp](../README.md) / [Exports](../modules.md) / IStream

# Interface: IStream

Interface for a stream, it wraps around a file descriptor to make reading and writing to files
using node IO a lot easier.

## Table of contents

### Properties

- [canWrite](IStream.md#canwrite)
- [length](IStream.md#length)
- [position](IStream.md#position)

### Methods

- [close](IStream.md#close)
- [read](IStream.md#read)
- [seek](IStream.md#seek)
- [setLength](IStream.md#setlength)
- [write](IStream.md#write)

## Properties

### canWrite

• `Readonly` **canWrite**: `boolean`

Whether or not the stream can be written to

___

### length

• `Readonly` **length**: `number`

Number of bytes currently stored in file this stream connects to

___

### position

• **position**: `number`

Position within the stream

## Methods

### close

▸ **close**(): `void`

Closes the stream

#### Returns

`void`

___

### read

▸ **read**(`buffer`, `offset`, `length`): `number`

Reads a block of bytes from the current stream and writes the data to a buffer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffer` | `Uint8Array` | When this method returns, contains the specified byte array with the values between `offset` and (`offset` + `length` - 1) replaced by the characters read from the current stream |
| `offset` | `number` | Zero-based byte offset in `buffer` at which to begin storing data from the current stream |
| `length` | `number` | The maximum number of bytes to read |

#### Returns

`number`

Total number of bytes written to the buffer. This can be less than the
    number of bytes requested if that number of bytes are not currently available or zero if
    the end of the stream is reached before any bytes are read

___

### seek

▸ **seek**(`offset`, `origin`): `void`

Sets the position within the current stream to the specified value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `offset` | `number` | New position within the stream. this is relative to the `origin` parameter and can be positive or negative |
| `origin` | [`SeekOrigin`](../enums/SeekOrigin.md) | Seek reference point [SeekOrigin](../enums/SeekOrigin.md) |

#### Returns

`void`

___

### setLength

▸ **setLength**(`length`): `void`

Sets the length of the current current stream to the specified value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `length` | `number` | Number of bytes to set the length of the stream to |

#### Returns

`void`

___

### write

▸ **write**(`buffer`, `bufferOffset`, `length`): `number`

Writes a block of bytes to the current stream using data read from a buffer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffer` | [`ByteVector`](../classes/ByteVector.md) \| `Uint8Array` | Buffer to write data from |
| `bufferOffset` | `number` | Zero-based byte offset in `buffer` at which to begin copying bytes to the current stream |
| `length` | `number` | Maximum number of bytes to write |

#### Returns

`number`
