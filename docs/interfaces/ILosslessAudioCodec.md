[node-taglib-sharp](../README.md) / [Exports](../modules.md) / ILosslessAudioCodec

# Interface: ILosslessAudioCodec

This interface provides information specific to lossless audio codecs.
When dealing with an [ICodec](ICodec.md), if [ICodec.mediaTypes](ICodec.md#mediatypes) contains
[MediaTypes.LosslessAudio](../enums/MediaTypes.md#losslessaudio), it is safe to assume that the object also inherits
[ILosslessAudioCodec](ILosslessAudioCodec.md) and can be recast without issue.

## Hierarchy

- [`IAudioCodec`](IAudioCodec.md)

  ↳ **`ILosslessAudioCodec`**

## Implemented by

- [`Properties`](../classes/Properties.md)
- [`RiffWaveFormatEx`](../classes/RiffWaveFormatEx.md)

## Table of contents

### Properties

- [audioBitrate](ILosslessAudioCodec.md#audiobitrate)
- [audioChannels](ILosslessAudioCodec.md#audiochannels)
- [audioSampleRate](ILosslessAudioCodec.md#audiosamplerate)
- [bitsPerSample](ILosslessAudioCodec.md#bitspersample)
- [description](ILosslessAudioCodec.md#description)
- [durationMilliseconds](ILosslessAudioCodec.md#durationmilliseconds)
- [mediaTypes](ILosslessAudioCodec.md#mediatypes)

## Properties

### audioBitrate

• **audioBitrate**: `number`

Bitrate of the audio in kilobits per second represented by the current instance.

#### Inherited from

[IAudioCodec](IAudioCodec.md).[audioBitrate](IAudioCodec.md#audiobitrate)

___

### audioChannels

• **audioChannels**: `number`

Number of channels in the audio represented by the current instance.

#### Inherited from

[IAudioCodec](IAudioCodec.md).[audioChannels](IAudioCodec.md#audiochannels)

___

### audioSampleRate

• **audioSampleRate**: `number`

Sample rate of the audio represented by the current instance.

#### Inherited from

[IAudioCodec](IAudioCodec.md).[audioSampleRate](IAudioCodec.md#audiosamplerate)

___

### bitsPerSample

• **bitsPerSample**: `number`

Number of bits per sample in the audio represented by the current instance.

___

### description

• **description**: `string`

Gets a text description of the media represented by the current instance.

#### Inherited from

[IAudioCodec](IAudioCodec.md).[description](IAudioCodec.md#description)

___

### durationMilliseconds

• **durationMilliseconds**: `number`

Duration of the media in milliseconds represented by the current instance.

**`todo`** Ensure milliseconds is the right way to interpret this field

#### Inherited from

[IAudioCodec](IAudioCodec.md).[durationMilliseconds](IAudioCodec.md#durationmilliseconds)

___

### mediaTypes

• **mediaTypes**: [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.

#### Inherited from

[IAudioCodec](IAudioCodec.md).[mediaTypes](IAudioCodec.md#mediatypes)
