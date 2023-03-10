[node-taglib-sharp](../README.md) / [Exports](../modules.md) / IRiffChunk

# Interface: IRiffChunk

Interface for chunks that appear in a RIFF file.

## Implemented by

- [`RiffList`](../classes/RiffList.md)

## Table of contents

### Properties

- [chunkStart](IRiffChunk.md#chunkstart)
- [fourcc](IRiffChunk.md#fourcc)
- [originalDataSize](IRiffChunk.md#originaldatasize)
- [originalTotalSize](IRiffChunk.md#originaltotalsize)

### Methods

- [render](IRiffChunk.md#render)

## Properties

### chunkStart

• **chunkStart**: `number`

Offset into the file where the chunk begins. This is `undefined` if the object was
constructed directly from data.

___

### fourcc

• **fourcc**: `string`

FOURCC code for the chunk.

___

### originalDataSize

• **originalDataSize**: `number`

Size of just the data contained within the current instance. Does not include the header or
padding byte. This value does not update if contents of the chunk changes.

___

### originalTotalSize

• **originalTotalSize**: `number`

Original size of the chunk, including header and padding byte. This value does not update if
the contents of the chunk changes.

## Methods

### render

▸ **render**(): [`ByteVector`](../classes/ByteVector.md)

Renders the chunk, including the header and padding byte.

#### Returns

[`ByteVector`](../classes/ByteVector.md)
