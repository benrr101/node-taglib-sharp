**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/iCodec"](../modules/_src_icodec_.md) / ILosslessAudioCodec

# Interface: ILosslessAudioCodec

This interface provides information specific to lossless audio codecs.
When dealing with an [ICodec](_src_icodec_.icodec.md), if [ICodec.mediaTypes](_src_icodec_.icodec.md#mediatypes) contains
[MediaTypes.LosslessAudio](../enums/_src_icodec_.mediatypes.md#losslessaudio), it is safe to assume that the object also inherits
[ILosslessAudioCodec](_src_icodec_.ilosslessaudiocodec.md) and can be recast without issue.

## Hierarchy

* [IAudioCodec](_src_icodec_.iaudiocodec.md)

  ↳ **ILosslessAudioCodec**

## Implemented by

* [ApeStreamHeader](../classes/_src_ape_apestreamheader_.apestreamheader.md)
* [Properties](../classes/_src_properties_.properties.md)

## Index

### Properties

* [audioBitrate](_src_icodec_.ilosslessaudiocodec.md#audiobitrate)
* [audioChannels](_src_icodec_.ilosslessaudiocodec.md#audiochannels)
* [audioSampleRate](_src_icodec_.ilosslessaudiocodec.md#audiosamplerate)
* [bitsPerSample](_src_icodec_.ilosslessaudiocodec.md#bitspersample)
* [description](_src_icodec_.ilosslessaudiocodec.md#description)
* [durationMilliseconds](_src_icodec_.ilosslessaudiocodec.md#durationmilliseconds)
* [mediaTypes](_src_icodec_.ilosslessaudiocodec.md#mediatypes)

## Properties

### audioBitrate

•  **audioBitrate**: number

*Inherited from [IAudioCodec](_src_icodec_.iaudiocodec.md).[audioBitrate](_src_icodec_.iaudiocodec.md#audiobitrate)*

Bitrate of the audio in kilibits per second represented by the current instance.

___

### audioChannels

•  **audioChannels**: number

*Inherited from [IAudioCodec](_src_icodec_.iaudiocodec.md).[audioChannels](_src_icodec_.iaudiocodec.md#audiochannels)*

Number of channels in the audio represented by the current instance.

___

### audioSampleRate

•  **audioSampleRate**: number

*Inherited from [IAudioCodec](_src_icodec_.iaudiocodec.md).[audioSampleRate](_src_icodec_.iaudiocodec.md#audiosamplerate)*

Sample rate of the audio represented by the current instance.

___

### bitsPerSample

•  **bitsPerSample**: number

Number of bits per sample in the audio represented by the current instance.

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
