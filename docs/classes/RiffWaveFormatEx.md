[node-taglib-sharp](../README.md) / [Exports](../modules.md) / RiffWaveFormatEx

# Class: RiffWaveFormatEx

Defines the format of waveform-audio data. Only format information common to all waveform-audio
data formats is included in this structure.
https://docs.microsoft.com/en-us/previous-versions/dd757713(v=vs.85)

## Implements

- [`ILosslessAudioCodec`](../interfaces/ILosslessAudioCodec.md)

## Table of contents

### Constructors

- [constructor](RiffWaveFormatEx.md#constructor)

### Properties

- [CHUNK\_FOURCC](RiffWaveFormatEx.md#chunk_fourcc)
- [WAVE\_FORMAT\_TAGS](RiffWaveFormatEx.md#wave_format_tags)

### Accessors

- [audioBitrate](RiffWaveFormatEx.md#audiobitrate)
- [audioChannels](RiffWaveFormatEx.md#audiochannels)
- [audioSampleRate](RiffWaveFormatEx.md#audiosamplerate)
- [averageBytesPerSecond](RiffWaveFormatEx.md#averagebytespersecond)
- [bitsPerSample](RiffWaveFormatEx.md#bitspersample)
- [blockAlign](RiffWaveFormatEx.md#blockalign)
- [description](RiffWaveFormatEx.md#description)
- [durationMilliseconds](RiffWaveFormatEx.md#durationmilliseconds)
- [formatTag](RiffWaveFormatEx.md#formattag)
- [mediaTypes](RiffWaveFormatEx.md#mediatypes)

## Constructors

### constructor

• **new RiffWaveFormatEx**(`data`)

Constructs and initializes a new instance of a RIFF wave format header from the provided
data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Byte vector that contains the raw header |

## Properties

### CHUNK\_FOURCC

▪ `Static` `Readonly` **CHUNK\_FOURCC**: ``"fmt "``

FOURCC code that indicates the chunk is a RiffWaveFormatEx object.

___

### WAVE\_FORMAT\_TAGS

▪ `Static` `Readonly` **WAVE\_FORMAT\_TAGS**: `Map`<`number`, `string`\>

List of well-known wave format tags. This is similar to FOURCC codes but for audio codecs.

**`Remarks`**

This list was put together from the Windows 10 SDK mmreg.h header file
    If any of these descriptions are wrong or out of date, please open a PR.

## Accessors

### audioBitrate

• `get` **audioBitrate**(): `number`

Bitrate of the audio in kilobits per second represented by the current instance.

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ILosslessAudioCodec.md).[audioBitrate](../interfaces/ILosslessAudioCodec.md#audiobitrate)

___

### audioChannels

• `get` **audioChannels**(): `number`

Number of channels in the audio represented by the current instance.

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ILosslessAudioCodec.md).[audioChannels](../interfaces/ILosslessAudioCodec.md#audiochannels)

___

### audioSampleRate

• `get` **audioSampleRate**(): `number`

Sample rate of the audio represented by the current instance.

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ILosslessAudioCodec.md).[audioSampleRate](../interfaces/ILosslessAudioCodec.md#audiosamplerate)

___

### averageBytesPerSecond

• `get` **averageBytesPerSecond**(): `number`

Gets the average data-transfer rate, in bytes per second, of audio described by the current
instance.

#### Returns

`number`

___

### bitsPerSample

• `get` **bitsPerSample**(): `number`

Number of bits per sample in the audio represented by the current instance.

**`Remarks`**

Some compression schemes cannot define a value for this field, so it may be `0`.
    This is especially common for MP3 audio embedded in an AVI.

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ILosslessAudioCodec.md).[bitsPerSample](../interfaces/ILosslessAudioCodec.md#bitspersample)

___

### blockAlign

• `get` **blockAlign**(): `number`

Gets the block alignment, in bytes. Block alignment is the minimum atomic unit of data for
[formatTag](RiffWaveFormatEx.md#formattag) format type.

#### Returns

`number`

___

### description

• `get` **description**(): `string`

Gets a text description of the media represented by the current instance.

#### Returns

`string`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ILosslessAudioCodec.md).[description](../interfaces/ILosslessAudioCodec.md#description)

___

### durationMilliseconds

• `get` **durationMilliseconds**(): `number`

Duration of the media in milliseconds represented by the current instance.

**`Remarks`**

Duration cannot be found from this object

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ILosslessAudioCodec.md).[durationMilliseconds](../interfaces/ILosslessAudioCodec.md#durationmilliseconds)

___

### formatTag

• `get` **formatTag**(): `number`

Gets the format tag of the audio described by the current instance.

**`Remarks`**

Format tags indicate the codec of the audio contained in the file and are
    contained in a Microsoft registry. For a description of the format, use
    [description](RiffWaveFormatEx.md#description). The complete list can be found in the Win32 mmreg.h SDK header file

#### Returns

`number`

___

### mediaTypes

• `get` **mediaTypes**(): [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.

**`Remarks`**

Technically any audio format can be encapsulated with a RIFF header since RIFF is
    simply a "Resource Interchange File Format". It is entirely possible to encapsulate a
    lossy format (and indeed, lossy WMA must be encapsulated) with a RIFF header. Therefore,
    this designation as lossless is somewhat misleading and checking [description](RiffWaveFormatEx.md#description) is
    necessary to verify the codec being used is lossless or not.

#### Returns

[`MediaTypes`](../enums/MediaTypes.md)

#### Implementation of

[ILosslessAudioCodec](../interfaces/ILosslessAudioCodec.md).[mediaTypes](../interfaces/ILosslessAudioCodec.md#mediatypes)
