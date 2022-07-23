[node-taglib-sharp](../README.md) / [Exports](../modules.md) / IAudioCodec

# Interface: IAudioCodec

Interface that inherits the common codec information and adds audio-specific information.
When dealing with an [ICodec](ICodec.md), if [ICodec.mediaTypes](ICodec.md#mediatypes) contains
[MediaTypes.Audio](../enums/MediaTypes.md#audio), it is safe to assume that the object also inherits [IAudioCodec](IAudioCodec.md)
and can be recast without issue.

## Hierarchy

- [`ICodec`](ICodec.md)

  ↳ **`IAudioCodec`**

  ↳↳ [`ILosslessAudioCodec`](ILosslessAudioCodec.md)

## Implemented by

- [`MpegAudioHeader`](../classes/MpegAudioHeader.md)
- [`OggOpusCodec`](../classes/OggOpusCodec.md)
- [`OggVorbisCodec`](../classes/OggVorbisCodec.md)

## Table of contents

### Properties

- [audioBitrate](IAudioCodec.md#audiobitrate)
- [audioChannels](IAudioCodec.md#audiochannels)
- [audioSampleRate](IAudioCodec.md#audiosamplerate)
- [description](IAudioCodec.md#description)
- [durationMilliseconds](IAudioCodec.md#durationmilliseconds)
- [mediaTypes](IAudioCodec.md#mediatypes)

## Properties

### audioBitrate

• **audioBitrate**: `number`

Bitrate of the audio in kilobits per second represented by the current instance.

___

### audioChannels

• **audioChannels**: `number`

Number of channels in the audio represented by the current instance.

___

### audioSampleRate

• **audioSampleRate**: `number`

Sample rate of the audio represented by the current instance.

___

### description

• **description**: `string`

Gets a text description of the media represented by the current instance.

#### Inherited from

[ICodec](ICodec.md).[description](ICodec.md#description)

___

### durationMilliseconds

• **durationMilliseconds**: `number`

Duration of the media in milliseconds represented by the current instance.

**`todo`** Ensure milliseconds is the right way to interpret this field

#### Inherited from

[ICodec](ICodec.md).[durationMilliseconds](ICodec.md#durationmilliseconds)

___

### mediaTypes

• **mediaTypes**: [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.

#### Inherited from

[ICodec](ICodec.md).[mediaTypes](ICodec.md#mediatypes)
