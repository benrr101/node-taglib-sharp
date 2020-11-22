**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/iCodec"](../modules/_src_icodec_.md) / IAudioCodec

# Interface: IAudioCodec

Interface that inherits the common codec information and adds audio-specific information.
When dealing with an [ICodec](_src_icodec_.icodec.md), if [ICodec.mediaTypes](_src_icodec_.icodec.md#mediatypes) contains
[MediaTypes.Audio](../enums/_src_icodec_.mediatypes.md#audio), it is safe to assume that the object also inherits [IAudioCodec](_src_icodec_.iaudiocodec.md)
and can be recast without issue.

## Hierarchy

* [ICodec](_src_icodec_.icodec.md)

  ↳ **IAudioCodec**

  ↳↳ [ILosslessAudioCodec](_src_icodec_.ilosslessaudiocodec.md)

## Implemented by

* [ApeStreamHeader](../classes/_src_ape_apestreamheader_.apestreamheader.md)
* [AudioHeader](../classes/_src_mpeg_audioheader_.audioheader.md)

## Index

### Properties

* [audioBitrate](_src_icodec_.iaudiocodec.md#audiobitrate)
* [audioChannels](_src_icodec_.iaudiocodec.md#audiochannels)
* [audioSampleRate](_src_icodec_.iaudiocodec.md#audiosamplerate)
* [description](_src_icodec_.iaudiocodec.md#description)
* [durationMilliseconds](_src_icodec_.iaudiocodec.md#durationmilliseconds)
* [mediaTypes](_src_icodec_.iaudiocodec.md#mediatypes)

## Properties

### audioBitrate

•  **audioBitrate**: number

Bitrate of the audio represented by the current instance.

___

### audioChannels

•  **audioChannels**: number

Number of channels in the audio represented by the current instance.

___

### audioSampleRate

•  **audioSampleRate**: number

Sample rate of the audio represented by the current instance.

___

### description

•  **description**: string

*Inherited from [ICodec](_src_icodec_.icodec.md).[description](_src_icodec_.icodec.md#description)*

Gets a text description of the media represented by the current instance.

___

### durationMilliseconds

•  **durationMilliseconds**: number

*Inherited from [ICodec](_src_icodec_.icodec.md).[durationMilliseconds](_src_icodec_.icodec.md#durationmilliseconds)*

Duration of the media in milliseconds represented by the current instance.

**`todo`** Ensure milliseconds is the right way to interpret this field

___

### mediaTypes

•  **mediaTypes**: [MediaTypes](../enums/_src_icodec_.mediatypes.md)

*Inherited from [ICodec](_src_icodec_.icodec.md).[mediaTypes](_src_icodec_.icodec.md#mediatypes)*

Types of media represented by the current instance, bitwise combined.
