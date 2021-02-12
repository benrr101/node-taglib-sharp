[node-taglib-sharp](../README.md) / [Exports](../modules.md) / IAudioCodec

# Interface: IAudioCodec

Interface that inherits the common codec information and adds audio-specific information.
When dealing with an [ICodec](icodec.md), if [ICodec.mediaTypes](icodec.md#mediatypes) contains
[MediaTypes.Audio](../enums/mediatypes.md#audio), it is safe to assume that the object also inherits [IAudioCodec](iaudiocodec.md)
and can be recast without issue.

## Hierarchy

* [*ICodec*](icodec.md)

  ↳ **IAudioCodec**

  ↳↳ [*ILosslessAudioCodec*](ilosslessaudiocodec.md)

## Implemented by

* [*MpegAudioHeader*](../classes/mpegaudioheader.md)

## Table of contents

### Properties

- [audioBitrate](iaudiocodec.md#audiobitrate)
- [audioChannels](iaudiocodec.md#audiochannels)
- [audioSampleRate](iaudiocodec.md#audiosamplerate)
- [description](iaudiocodec.md#description)
- [durationMilliseconds](iaudiocodec.md#durationmilliseconds)
- [mediaTypes](iaudiocodec.md#mediatypes)

## Properties

### audioBitrate

• **audioBitrate**: *number*

Bitrate of the audio in kilobits per second represented by the current instance.

___

### audioChannels

• **audioChannels**: *number*

Number of channels in the audio represented by the current instance.

___

### audioSampleRate

• **audioSampleRate**: *number*

Sample rate of the audio represented by the current instance.

___

### description

• **description**: *string*

Gets a text description of the media represented by the current instance.

Inherited from: [ICodec](icodec.md).[description](icodec.md#description)

___

### durationMilliseconds

• **durationMilliseconds**: *number*

Duration of the media in milliseconds represented by the current instance.

**`todo`** Ensure milliseconds is the right way to interpret this field

Inherited from: [ICodec](icodec.md).[durationMilliseconds](icodec.md#durationmilliseconds)

___

### mediaTypes

• **mediaTypes**: [*MediaTypes*](../enums/mediatypes.md)

Types of media represented by the current instance, bitwise combined.

Inherited from: [ICodec](icodec.md).[mediaTypes](icodec.md#mediatypes)
