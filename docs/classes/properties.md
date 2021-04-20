[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Properties

# Class: Properties

## Hierarchy

* **Properties**

## Implements

* [*ILosslessAudioCodec*](../interfaces/ilosslessaudiocodec.md)
* [*IVideoCodec*](../interfaces/ivideocodec.md)
* [*IPhotoCodec*](../interfaces/iphotocodec.md)

## Table of contents

### Constructors

- [constructor](properties.md#constructor)

### Accessors

- [audioBitrate](properties.md#audiobitrate)
- [audioChannels](properties.md#audiochannels)
- [audioSampleRate](properties.md#audiosamplerate)
- [bitsPerSample](properties.md#bitspersample)
- [codecs](properties.md#codecs)
- [description](properties.md#description)
- [durationMilliseconds](properties.md#durationmilliseconds)
- [mediaTypes](properties.md#mediatypes)
- [photoHeight](properties.md#photoheight)
- [photoQuality](properties.md#photoquality)
- [photoWidth](properties.md#photowidth)
- [videoHeight](properties.md#videoheight)
- [videoWidth](properties.md#videowidth)

## Constructors

### constructor

\+ **new Properties**(`durationMilli?`: *number*, `codecs?`: [*ICodec*](../interfaces/icodec.md)[]): [*Properties*](properties.md)

Constructs and initializes a new instance of [Properties](properties.md) with the specified codecs and
duration.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`durationMilli` | *number* | 0 | Duration of the media in milliseconds or 0 if the duration is to be        read from the codecs.   |
`codecs` | [*ICodec*](../interfaces/icodec.md)[] | ... | Array of codecs to be used in the new instance.    |

**Returns:** [*Properties*](properties.md)

## Accessors

### audioBitrate

• **audioBitrate**(): *number*

Gets the bitrate of the audio represented by the current instance. This value is equal to
the first non-zero audio bitrate, or zero if no codecs with audio information were found.

**Returns:** *number*

Implementation of: [ILosslessAudioCodec](../interfaces/ilosslessaudiocodec.md).[audioBitrate](../interfaces/ilosslessaudiocodec.md#audiobitrate)

___

### audioChannels

• **audioChannels**(): *number*

Gets the number of channels in the audio represented by the current instance.

**Returns:** *number*

Implementation of: [ILosslessAudioCodec](../interfaces/ilosslessaudiocodec.md).[audioChannels](../interfaces/ilosslessaudiocodec.md#audiochannels)

___

### audioSampleRate

• **audioSampleRate**(): *number*

Gets the sample rate of the audio represented by the current instance. This value is equal
to the first non-zero audio bitrate, or zero if no audio codecs were found.

**Returns:** *number*

Implementation of: [ILosslessAudioCodec](../interfaces/ilosslessaudiocodec.md).[audioSampleRate](../interfaces/ilosslessaudiocodec.md#audiosamplerate)

___

### bitsPerSample

• **bitsPerSample**(): *number*

Gets the number of bits per sample in the audio represented by the current instance. This
value is equal to the first non-zero quantization, or zero if no lossless audio codecs were
found in the current instance.

**Returns:** *number*

Implementation of: [ILosslessAudioCodec](../interfaces/ilosslessaudiocodec.md).[bitsPerSample](../interfaces/ilosslessaudiocodec.md#bitspersample)

___

### codecs

• **codecs**(): [*ICodec*](../interfaces/icodec.md)[]

Gets the codecs contained in the current instance.

**`remarks`** The list of codecs should not be modified. As such, the returned codec list is a
    copy of codec list stored in this instance.

**Returns:** [*ICodec*](../interfaces/icodec.md)[]

___

### description

• **description**(): *string*

Gets a string description of the media represented by the current instance. Values are
joined by semi-colons.

**Returns:** *string*

Implementation of: [IPhotoCodec](../interfaces/iphotocodec.md).[description](../interfaces/iphotocodec.md#description)

___

### durationMilliseconds

• **durationMilliseconds**(): *number*

Gets the duration of the media represented by the current instance. If the value was set in
the constructor, that value is returned, otherwise the longest codec duration is used.

**Returns:** *number*

Implementation of: [IPhotoCodec](../interfaces/iphotocodec.md).[durationMilliseconds](../interfaces/iphotocodec.md#durationmilliseconds)

___

### mediaTypes

• **mediaTypes**(): [*MediaTypes*](../enums/mediatypes.md)

Gets the types of media represented by the current instance.

**Returns:** [*MediaTypes*](../enums/mediatypes.md)

Implementation of: [IPhotoCodec](../interfaces/iphotocodec.md).[mediaTypes](../interfaces/iphotocodec.md#mediatypes)

___

### photoHeight

• **photoHeight**(): *number*

Gets the height of the photo in pixels represented by the current instance.

**Returns:** *number*

Implementation of: [IPhotoCodec](../interfaces/iphotocodec.md).[photoHeight](../interfaces/iphotocodec.md#photoheight)

___

### photoQuality

• **photoQuality**(): *number*

Gets the format-specific quality identifier of the photo represented by the current
instance. A value of `0` means that there was no quality indicator for the format or file.

**Returns:** *number*

Implementation of: [IPhotoCodec](../interfaces/iphotocodec.md).[photoQuality](../interfaces/iphotocodec.md#photoquality)

___

### photoWidth

• **photoWidth**(): *number*

Gets the width of the photo in pixels represented by the current instance.

**Returns:** *number*

Implementation of: [IPhotoCodec](../interfaces/iphotocodec.md).[photoWidth](../interfaces/iphotocodec.md#photowidth)

___

### videoHeight

• **videoHeight**(): *number*

Gets the height of the video represented by the current instance.
This value is equal to the first non-zero video height;

**Returns:** *number*

Implementation of: [IVideoCodec](../interfaces/ivideocodec.md).[videoHeight](../interfaces/ivideocodec.md#videoheight)

___

### videoWidth

• **videoWidth**(): *number*

Gets the width of the video represented by the current instance.
This value is equal to the first non-zero video height.

**Returns:** *number*

Implementation of: [IVideoCodec](../interfaces/ivideocodec.md).[videoWidth](../interfaces/ivideocodec.md#videowidth)
