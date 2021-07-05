[node-taglib-sharp](../README.md) / [Exports](../modules.md) / RiffWaveFormatEx

# Class: RiffWaveFormatEx

Defines the format of waveform-audio data. Only format information common to all waveform-audio
data formats is included in this structure.
https://docs.microsoft.com/en-us/previous-versions/dd757713(v=vs.85)

## Implements

- [`ILosslessAudioCodec`](../interfaces/ilosslessaudiocodec.md)

## Table of contents

### Constructors

- [constructor](riffwaveformatex.md#constructor)

### Properties

- [WAVE\_FORMAT\_TAGS](riffwaveformatex.md#wave_format_tags)

### Accessors

- [audioBitrate](riffwaveformatex.md#audiobitrate)
- [audioChannels](riffwaveformatex.md#audiochannels)
- [audioSampleRate](riffwaveformatex.md#audiosamplerate)
- [averageBytesPerSecond](riffwaveformatex.md#averagebytespersecond)
- [bitsPerSample](riffwaveformatex.md#bitspersample)
- [blockAlign](riffwaveformatex.md#blockalign)
- [description](riffwaveformatex.md#description)
- [durationMilliseconds](riffwaveformatex.md#durationmilliseconds)
- [formatTag](riffwaveformatex.md#formattag)
- [mediaTypes](riffwaveformatex.md#mediatypes)

## Constructors

### constructor

• **new RiffWaveFormatEx**(`data`, `offset`)

Constructs and initializes a new instance of a RIFF wave format header from the provided
data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Byte vector that contains the raw header |
| `offset` | `number` | Index into the data byte vector where the header begins |

## Properties

### WAVE\_FORMAT\_TAGS

▪ `Static` `Readonly` **WAVE\_FORMAT\_TAGS**: `Object`

#### Index signature

▪ [key: `number`]: `string`

## Accessors

### audioBitrate

• `get` **audioBitrate**(): `number`

Bitrate of the audio in kilobits per second represented by the current instance.

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ilosslessaudiocodec.md).[audioBitrate](../interfaces/ilosslessaudiocodec.md#audiobitrate)

___

### audioChannels

• `get` **audioChannels**(): `number`

Number of channels in the audio represented by the current instance.

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ilosslessaudiocodec.md).[audioChannels](../interfaces/ilosslessaudiocodec.md#audiochannels)

___

### audioSampleRate

• `get` **audioSampleRate**(): `number`

Sample rate of the audio represented by the current instance.

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ilosslessaudiocodec.md).[audioSampleRate](../interfaces/ilosslessaudiocodec.md#audiosamplerate)

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

**`remarks`** Some compression schemes cannot define a value for this field, so it may be `0`.
    This is especially common for MP3 audio embedded in an AVI.

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ilosslessaudiocodec.md).[bitsPerSample](../interfaces/ilosslessaudiocodec.md#bitspersample)

___

### blockAlign

• `get` **blockAlign**(): `number`

Gets the block alignment, in bytes. Block alignment is the minimum atomic unit of data for
{@see formatTag} format type.

#### Returns

`number`

___

### description

• `get` **description**(): `string`

Gets a text description of the media represented by the current instance.

#### Returns

`string`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ilosslessaudiocodec.md).[description](../interfaces/ilosslessaudiocodec.md#description)

___

### durationMilliseconds

• `get` **durationMilliseconds**(): `number`

Duration of the media in milliseconds represented by the current instance.

**`remarks`** Duration cannot be found from this object

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ilosslessaudiocodec.md).[durationMilliseconds](../interfaces/ilosslessaudiocodec.md#durationmilliseconds)

___

### formatTag

• `get` **formatTag**(): `number`

Gets the format tag of the audio described by the current instance.

**`remarks`** Format tags indicate the codec of the audio contained in the file and are
    contained in a Microsoft registry. For a description of the format, use
    [description](riffwaveformatex.md#description). The complete list can be found in the Win32 mmreg.h SDK header file

#### Returns

`number`

___

### mediaTypes

• `get` **mediaTypes**(): [`MediaTypes`](../enums/mediatypes.md)

Types of media represented by the current instance, bitwise combined.

**`remarks`** Technically any audio format can be encapsulated with a RIFF header since RIFF is
    simply a "Resource Interchange File Format". It is entirely possible to encapsulate a
    lossy format (and indeed, lossy WMA must be encapsulated) with a RIFF header. Therefore
    this designation as lossless is somewhat misleading and checking [description](riffwaveformatex.md#description) is
    necessary to verify the codec being used is lossless or not.

#### Returns

[`MediaTypes`](../enums/mediatypes.md)

#### Implementation of

[ILosslessAudioCodec](../interfaces/ilosslessaudiocodec.md).[mediaTypes](../interfaces/ilosslessaudiocodec.md#mediatypes)
