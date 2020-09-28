**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/iCodec"](../modules/_src_icodec_.md) / ILosslessAudioCodec

# Interface: ILosslessAudioCodec

This interface provides information specific to lossless audio codecs.
When dealing with an {@see ICodec}, if {@see ICodec.mediaTypes} contains
{@see MediaTypes.LosslessAudio}, it is safe to assume that the object also inherits
{@see ILosslessAudioCodec} and can be recast without issue.

## Hierarchy

* [IAudioCodec](_src_icodec_.iaudiocodec.md)

  ↳ **ILosslessAudioCodec**

## Implemented by

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

*Defined in src/iCodec.ts:68*

Bitrate of the audio represented by the current instance.

___

### audioChannels

•  **audioChannels**: number

*Inherited from [IAudioCodec](_src_icodec_.iaudiocodec.md).[audioChannels](_src_icodec_.iaudiocodec.md#audiochannels)*

*Defined in src/iCodec.ts:73*

Number of channels in the audio represented by the current instance.

___

### audioSampleRate

•  **audioSampleRate**: number

*Inherited from [IAudioCodec](_src_icodec_.iaudiocodec.md).[audioSampleRate](_src_icodec_.iaudiocodec.md#audiosamplerate)*

*Defined in src/iCodec.ts:78*

Sample rate of the audio represented by the current instance.

___

### bitsPerSample

•  **bitsPerSample**: number

*Defined in src/iCodec.ts:91*

Number of bits per sample in the audio represented by the current instance.

___

### description

•  **description**: string

*Inherited from [ICodec](_src_icodec_.icodec.md).[description](_src_icodec_.icodec.md#description)*

*Defined in src/iCodec.ts:44*

Gets a text description of the media represented by the current instance.

___

### durationMilliseconds

•  **durationMilliseconds**: number

*Inherited from [ICodec](_src_icodec_.icodec.md).[durationMilliseconds](_src_icodec_.icodec.md#durationmilliseconds)*

*Defined in src/iCodec.ts:50*

Duration of the media in milliseconds represented by the current instance.

**`todo`** Ensure milliseconds is the right way to interpret this field

___

### mediaTypes

•  **mediaTypes**: [MediaTypes](../enums/_src_icodec_.mediatypes.md)

*Inherited from [ICodec](_src_icodec_.icodec.md).[mediaTypes](_src_icodec_.icodec.md#mediatypes)*

*Defined in src/iCodec.ts:55*

Types of media represented by the current instance, bitwise combined.
