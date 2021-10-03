[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AviStream

# Class: AviStream

Base class representing a stream in an AVI file. Provides basic support for parsing a raw AVI
stream list.

## Table of contents

### Constructors

- [constructor](avistream.md#constructor)

### Properties

- [formatChunkId](avistream.md#formatchunkid)
- [headerChunkId](avistream.md#headerchunkid)
- [listType](avistream.md#listtype)

### Accessors

- [bottom](avistream.md#bottom)
- [codec](avistream.md#codec)
- [flags](avistream.md#flags)
- [handler](avistream.md#handler)
- [initialFrames](avistream.md#initialframes)
- [language](avistream.md#language)
- [left](avistream.md#left)
- [length](avistream.md#length)
- [priority](avistream.md#priority)
- [quality](avistream.md#quality)
- [rate](avistream.md#rate)
- [right](avistream.md#right)
- [sampleSize](avistream.md#samplesize)
- [scale](avistream.md#scale)
- [start](avistream.md#start)
- [suggestedSampleSize](avistream.md#suggestedsamplesize)
- [top](avistream.md#top)
- [type](avistream.md#type)

## Constructors

### constructor

• **new AviStream**(`list`)

Constructs and initializes a new instance with a specified stream header.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | [`RiffList`](rifflist.md) | RiffList containing the stream headers |

## Properties

### formatChunkId

▪ `Static` `Readonly` **formatChunkId**: ``"strf"``

___

### headerChunkId

▪ `Static` `Readonly` **headerChunkId**: ``"strh"``

___

### listType

▪ `Static` `Readonly` **listType**: ``"strl"``

## Accessors

### bottom

• `get` **bottom**(): `number`

Gets the offset from the bottom of the main movie rectangle where this stream should be
positioned.

#### Returns

`number`

___

### codec

• `get` **codec**(): [`ICodec`](../interfaces/icodec.md)

Gets the codec information for this stream.

#### Returns

[`ICodec`](../interfaces/icodec.md)

___

### flags

• `get` **flags**(): `number`

Gets any flags for the data stream.

#### Returns

`number`

___

### handler

• `get` **handler**(): `number`

Gets an optional FOURCC that identifies a specific data handler. The data handler is the
preferred handler for the stream. For audio/video streams, this specifies the codec for
decoding the stream.

#### Returns

`number`

___

### initialFrames

• `get` **initialFrames**(): `number`

Gets how far audio data is skewed ahead of the video frames in an interleaved file. This
value generally 0 for non-interleaved files.

#### Returns

`number`

___

### language

• `get` **language**(): `number`

Gets the language tag for the stream.

#### Returns

`number`

___

### left

• `get` **left**(): `number`

Gets the offset from the left of the main movie rectangle where this stream should be
positioned.

#### Returns

`number`

___

### length

• `get` **length**(): `number`

Gets the length of the stream. The units are defined by `rate` and `scale` in the main file
header.

#### Returns

`number`

___

### priority

• `get` **priority**(): `number`

Gets the priority of a stream type. For example, in a file with multiple audio streams,
the one with the highest priority might be the default stream.

#### Returns

`number`

___

### quality

• `get` **quality**(): `number`

Gets an indicator of the quality of the data in the stream. Quality is represented as a
number between `0` and `10000`. -1 indicates the default quality values should be used.

**`remarks`** For compressed data, this typically represents the value of the quality parameter
    passed to the compression software.

#### Returns

`number`

___

### rate

• `get` **rate**(): `number`

Used with {@see scale} to specify the time scale that this stream will use.

**`remarks`** Dividing {@see rate} by this gives the number of samples per second. For video
    streams, this is the frame rate. For audio streams, this rate corresponds to the time
    needed to play {@see RiffWaveFormatEx.blockAlign} bytes of audio. For PCM audio this is
    just the sample rate.

#### Returns

`number`

___

### right

• `get` **right**(): `number`

Gets the offset from the right of the main movie rectangle where this stream should be
positioned.

#### Returns

`number`

___

### sampleSize

• `get` **sampleSize**(): `number`

Gets the size of a single sample of data. If the sample size varies, this will be `0`.

#### Returns

`number`

___

### scale

• `get` **scale**(): `number`

Used with {@see rate} to specify the time scale that this stream will use.

**`remarks`** Dividing {@see rate} by this gives the number of samples per second. For video
    streams, this is the frame rate. For audio streams, this rate corresponds to the time
    needed to play `nBlockAlign` bytes of audio. For PCM audio is just the sample rate.

#### Returns

`number`

___

### start

• `get` **start**(): `number`

Gets the starting time for this stream. The units are defined by `rate` and `scale` in the
main file header.

**`remarks`** Usually this is zero, but it can specify a delay time for a stream that does not
    start concurrently with the file.

#### Returns

`number`

___

### suggestedSampleSize

• `get` **suggestedSampleSize**(): `number`

Gets how large of a buffer should be used to read this stream.

**`remarks`** Typically, this contains a value corresponding to the largest chunk present in the
    stream.

#### Returns

`number`

___

### top

• `get` **top**(): `number`

Gets the offset from the top of the main movie rectangle where this stream should be
positioned.

#### Returns

`number`

___

### type

• `get` **type**(): [`AviStreamType`](../enums/avistreamtype.md)

Gets a FOURCC that species the type of data contained in the stream.

#### Returns

[`AviStreamType`](../enums/avistreamtype.md)
