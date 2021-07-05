[node-taglib-sharp](../README.md) / [Exports](../modules.md) / ILosslessAudioCodec

# Interface: ILosslessAudioCodec

This interface provides information specific to lossless audio codecs.
When dealing with an [ICodec](icodec.md), if [ICodec.mediaTypes](icodec.md#mediatypes) contains
[MediaTypes.LosslessAudio](../enums/mediatypes.md#losslessaudio), it is safe to assume that the object also inherits
[ILosslessAudioCodec](ilosslessaudiocodec.md) and can be recast without issue.

## Hierarchy

- [`IAudioCodec`](iaudiocodec.md)

  ↳ **`ILosslessAudioCodec`**

## Implemented by

- [`Properties`](../classes/properties.md)
- [`RiffWaveFormatEx`](../classes/riffwaveformatex.md)

## Table of contents

### Properties

- [audioBitrate](ilosslessaudiocodec.md#audiobitrate)
- [audioChannels](ilosslessaudiocodec.md#audiochannels)
- [audioSampleRate](ilosslessaudiocodec.md#audiosamplerate)
- [bitsPerSample](ilosslessaudiocodec.md#bitspersample)
- [description](ilosslessaudiocodec.md#description)
- [durationMilliseconds](ilosslessaudiocodec.md#durationmilliseconds)
- [mediaTypes](ilosslessaudiocodec.md#mediatypes)

## Properties

### audioBitrate

• **audioBitrate**: `number`

Bitrate of the audio in kilobits per second represented by the current instance.

#### Inherited from

[IAudioCodec](iaudiocodec.md).[audioBitrate](iaudiocodec.md#audiobitrate)

___

### audioChannels

• **audioChannels**: `number`

Number of channels in the audio represented by the current instance.

#### Inherited from

[IAudioCodec](iaudiocodec.md).[audioChannels](iaudiocodec.md#audiochannels)

___

### audioSampleRate

• **audioSampleRate**: `number`

Sample rate of the audio represented by the current instance.

#### Inherited from

[IAudioCodec](iaudiocodec.md).[audioSampleRate](iaudiocodec.md#audiosamplerate)

___

### bitsPerSample

• **bitsPerSample**: `number`

Number of bits per sample in the audio represented by the current instance.

___

### description

• **description**: `string`

Gets a text description of the media represented by the current instance.

#### Inherited from

[IAudioCodec](iaudiocodec.md).[description](iaudiocodec.md#description)

___

### durationMilliseconds

• **durationMilliseconds**: `number`

Duration of the media in milliseconds represented by the current instance.

**`todo`** Ensure milliseconds is the right way to interpret this field

#### Inherited from

[IAudioCodec](iaudiocodec.md).[durationMilliseconds](iaudiocodec.md#durationmilliseconds)

___

### mediaTypes

• **mediaTypes**: [`MediaTypes`](../enums/mediatypes.md)

Types of media represented by the current instance, bitwise combined.

#### Inherited from

[IAudioCodec](iaudiocodec.md).[mediaTypes](iaudiocodec.md#mediatypes)
